var FMain;
(function (FMain) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
            this._dirCostRecodeTable = null;
            this._dirCost9To8Table = null;
            this._dirCostRecodingTable = null;
        }
        TableRules.prototype.CreateRroObasVersion = function () {
            var rroObasVersionsTable = ObasTableCollection.RroObasVersionsTable;
            if (this._document.NormalMode) {
                rroObasVersionsTable.AddRow();
                rroObasVersionsTable.PostRow();
            }
        };
        TableRules.prototype.CreateRroObas = function () {
            var rroDataTable = ObasTableCollection.RroDataTable;
            if (this._document.NormalMode) {
                rroDataTable.CreateRroObasRow();
            }
        };
        TableRules.prototype.CreateRroExpendShedule = function () {
            var rroDataTable = ObasTableCollection.RroDataTable;
            if (this._document.NormalMode) {
                rroDataTable.CreateExpendShedule();
            }
        };
        TableRules.prototype.UpdateRROIndicateBudget = function (fileType, obasVersion, data) {
            var dataTable = ObasTableCollection.RroPartIndicateBudgetValues;
            var isMainObas = ObasTableCollection.FileTypeTable.IsMain.LookupByKeys(fileType);
            var isDelta = !isMainObas;
            for (var i = 0; i < data.length; i++) {
                var record = data[i];
                if (!dataTable.Locate([dataTable.RroVersionKey.Id, dataTable.PartKey.Id], [obasVersion, record.Key])) {
                    dataTable.AddRow();
                    dataTable.RroVersionKey.Value = obasVersion;
                    dataTable.PartKey.Value = record.Key;
                    dataTable.PostRow();
                }
                for (var j = 0; j < ObasStageSettings.YearsCount; j++) {
                    var fieldId = "Y" + (j + 1) + (isDelta ? "_D" : "");
                    dataTable.SetFieldValue(fieldId, record.Data[j] || 0);
                }
            }
        };
        TableRules.prototype.UpdateRRO = function (fileType, obasVersion, data) {
            var obasVersionsTable = ObasTableCollection.RroObasVersionsTable;
            if (obasVersionsTable.LocateByKeys(obasVersion)) {
                var isMainObas = ObasTableCollection.FileTypeTable.IsMain.LookupByKeys(fileType);
                for (var i = 0; i < data.length; i++) {
                    var fieldId = "Y" + (i + 1);
                    if (!isMainObas) {
                        fieldId += "_D";
                    }
                    obasVersionsTable.LocateByKeys(obasVersion);
                    obasVersionsTable.SetFieldValue(fieldId, data[i]);
                }
            }
        };
        TableRules.prototype.UpdateRROKosgu = function (fileType, obasVersion, data) {
            var dataTable = ObasTableCollection.RroObasKosguTable;
            var isMainObas = ObasTableCollection.FileTypeTable.IsMain.LookupByKeys(fileType);
            var isDelta = !isMainObas;
            for (var i = 0; i < data.length; i++) {
                var record = data[i];
                if (!dataTable.Locate([dataTable.RroVersionKey.Id, dataTable.Kosgu.ForeignKey.Id], [obasVersion, record.Key])) {
                    dataTable.AddRow();
                    dataTable.RroVersionKey.Value = obasVersion;
                    dataTable.Kosgu.ForeignKey.Value = record.Key;
                    dataTable.PostRow();
                }
                for (var j = 0; j < ObasStageSettings.YearsCount; j++) {
                    var fieldId = "Y" + (j + 1) + (isDelta ? "_D" : "");
                    dataTable.SetFieldValue(fieldId, record.Data[j] || 0);
                }
            }
        };
        TableRules.prototype.IsSecretForm = function (filePath) {
            var result = false;
            if (Client.IsFileExists(filePath)) {
                var formParams = new FormParametersTable(this._document, filePath);
                result = formParams.IsSecretForm;
                this._document.DeleteTemporaryTable(formParams);
            }
            return result;
        };
        TableRules.prototype.UpdateVersionFromFile = function (fileType, obasVersion) {
            var obasVersions = ObasTableCollection.RroObasVersionsTable;
            var filePath = ObasHelper.GetFileName(fileType, obasVersion, false, true);
            var fieldPostfix = "";
            if (!ObasTableCollection.FileTypeTable.IsMain.LookupByKeys(fileType)) {
                fieldPostfix = "_D";
            }
            if (Client.IsFileExists(filePath)) {
                var formParams = new FormParametersTable(this._document, filePath);
                if (this._document.Tables.containsKey(formParams.Id)) {
                    var totalTable = formParams.TotalTable;
                    if (totalTable != null) {
                        if (totalTable.Locate(BaseObasTableFields.TotalRowFlagField.Id, 1)) {
                            if (!obasVersions.IsMultiRow.Value) {
                                for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
                                    var fieldId = "Y" + (i + 1);
                                    var value = totalTable.GetFieldsIds().indexOf(fieldId) > -1
                                        ? totalTable.GetFieldValue(fieldId)
                                        : totalTable.GetFieldValue("g" + (i + 2));
                                    obasVersions.SetFieldValue("Y" + (i + 1) + fieldPostfix, value || 0);
                                }
                            }
                            var kosguTable = formParams.KosguTable;
                            if (kosguTable != null) {
                                var data = ObasHelper.CollectKosguData(kosguTable);
                                this._document.TableRules.UpdateRROKosgu(fileType, obasVersion, data);
                                this._document.DeleteTemporaryTable(kosguTable);
                            }
                        }
                        this._document.DeleteTemporaryTable(totalTable);
                    }
                    this._document.DeleteTemporaryTable(formParams);
                }
            }
            else {
                for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
                    obasVersions.SetFieldValue("Y" + (i + 1) + fieldPostfix, 0);
                }
                var rroKosgu = ObasTableCollection.RroObasKosguTable;
                while (rroKosgu.Locate(rroKosgu.RroVersionKey.Id, obasVersion, true)) {
                    for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
                        rroKosgu.SetFieldValue("Y" + (i + 1) + fieldPostfix, 0);
                    }
                }
                rroKosgu.ClearLocateFlag();
            }
        };
        TableRules.prototype.PrepareSingleVersion = function (rroObas, recordKey) {
            var obasVersions = ObasTableCollection.RroObasVersionsTable;
            if (!obasVersions.Locate(obasVersions.RroObasKey.Id, recordKey)) {
                obasVersions.AddRow();
                obasVersions.RroObasKey.Value = recordKey;
                obasVersions.PostRow();
                rroObas.LocateByKeys(recordKey);
                obasVersions.Locate(obasVersions.RroObasKey.Id, recordKey);
            }
            rroObas.LastApprovedVersion.Value = obasVersions.Version.Value;
        };
        TableRules.prototype.RecodeDirectionCost = function (fpRecodeCostType, fpCostType9To8) {
            this._dirCostRecodeTable = this._document.LoadExcelFile(fpRecodeCostType);
            this._dirCost9To8Table = this._document.LoadExcelFile(fpCostType9To8);
            if (this._document.Tables.containsKey("RecodingTable")) {
                this._dirCostRecodingTable = this._document.Tables.getValue("RecodingTable");
            }
            else {
                this._dirCostRecodingTable = this._document.LoadTableFromFile("Spr_Temp.xml", "RecodingTable");
            }
            ObasTableCollection.RroDataTable.Iterate(this.CollectRecodedDirectionCostKbks);
            if (this._dirCostRecodingTable != null) {
                this._dirCostRecodingTable.Iterate(this.RecodeDirectionCostKbks);
            }
        };
        TableRules.prototype.CollectRecodedDirectionCostKbks = function (srcTable, recordKey) {
            var rroData = ObasTableCollection.RroDataTable;
            var oldCode = rroData.DirectionCost.Code;
            var addToList = this._dirCostRecodeTable.Locate("Col1", oldCode);
            var newCode = addToList ? this._dirCostRecodeTable.GetFieldValue("Col3") : oldCode;
            if (this._dirCost9To8Table.Locate(["Col1", "Col2", "Col3", "Col4"], [rroData.GovermentProgram.Code, rroData.CalcSubprogramCode(), rroData.MainAction.Code, newCode])) {
                newCode = "99998";
                addToList = true;
            }
            if (addToList) {
                this._dirCostRecodingTable.AddRow();
                this._dirCostRecodingTable.SetFieldValue(BaseObasTableFields.RecordKeyField
                    .Id, rroData.RecordKey.Value);
                this._dirCostRecodingTable.SetFieldValue("OldCode", oldCode);
                this._dirCostRecodingTable.SetFieldValue("NewCode", newCode);
                this._dirCostRecodingTable.PostRow();
            }
        };
        TableRules.prototype.RecodeDirectionCostKbks = function (srcTable, recordKey) {
            var rroData = ObasTableCollection.RroDataTable;
            var versTable = ObasTableCollection.RroObasVersionsTable;
            var rroObasTable = ObasTableCollection.RroObasTable;
            var dirCostSpr = ObasTableCollection.DirectionCostTable;
            if (rroData.LocateByKeys(this._dirCostRecodingTable.GetFieldValue(BaseObasTableFields.RecordKeyField.Id))) {
                var version = versTable.Lookup(versTable.RroObasKey.Id, rroObasTable.Lookup(rroObasTable.RroDataKey.Id, rroData.RecordKey.Value, rroObasTable.RecordKey.Id), versTable.Version.Id);
                var oldFilePath = ObasHelper.GetFileName(ObasStageSettings.CurrentStage * 2, version, true, true);
                var oldDirectoryPath = ObasHelper.GetFullDirectoryPath(version, false);
                rroData.DirectionCost.ForeignKey.Value = dirCostSpr.Lookup(dirCostSpr.Code.Id, this._dirCostRecodingTable.GetFieldValue("NewCode"), dirCostSpr.RecordKey.Id);
                var newFilePath = ObasHelper.GetFileName(ObasStageSettings.CurrentStage * 2, version, true, true);
                var newDirectoryPath = ObasHelper.GetFullDirectoryPath(version, false);
                if (Client.IsFileExists(oldFilePath)) {
                    Client.CreateDirectory(newDirectoryPath);
                    Client.CopyFile(oldFilePath, newFilePath, true);
                    Client.DeleteDirectory(oldDirectoryPath);
                }
            }
        };
        TableRules.prototype.LoadControlNumbers = function (excelFilePath) {
            var controlNumbers = this._document.LoadExcelFile(excelFilePath);
            var limitsTable = ObasTableCollection.RroLimitsDetailsTable;
            var fcrSpr = ObasTableCollection.FcrTable;
            var costTypeSpr = ObasTableCollection.CostTypeTable;
            var actionSpr = ObasTableCollection.MainActionTable;
            var dirCostSpr = ObasTableCollection.DirectionCostTable;
            var govProgSpr = ObasTableCollection.GovermentProgramTable;
            var subProgSpr = ObasTableCollection.SubProgramTable;
            var rroData = ObasTableCollection.RroDataTable;
            limitsTable.DeleteAllRow();
            var reader = controlNumbers.CreateReader();
            while (reader.Read()) {
                var fcrCode = controlNumbers.GetFieldValue("col3") + controlNumbers.GetFieldValue("col4");
                var costTypeCode = controlNumbers.GetFieldValue("col6");
                var csrCode = controlNumbers.GetFieldValue("col5");
                var govProgCode = csrCode.substr(0, 2);
                var subProgCode = csrCode.substr(0, 3);
                var actionCode = csrCode.substr(0, 5);
                var dirCostCode = csrCode.substr(5, 5);
                limitsTable.AddRow();
                limitsTable.Fcr.ForeignKey.Value = fcrSpr.LookupKeyByCode(fcrCode);
                limitsTable.CostType.ForeignKey.Value = costTypeSpr.LookupKeyByCode(costTypeCode);
                limitsTable.SubProgram.ForeignKey.Value = subProgSpr.LookupKeyByCode(subProgCode);
                limitsTable.GovermentProgram.ForeignKey.Value = govProgSpr.LookupKeyByCode(govProgCode);
                limitsTable.DirectionCost.ForeignKey.Value = dirCostSpr.LookupKeyByCode(dirCostCode);
                limitsTable.MainAction.ForeignKey.Value = actionSpr.LookupKeyByCode(actionCode);
                limitsTable.Limit.Value = controlNumbers.GetFieldValue("col11");
                limitsTable.PostRow();
                var rroDataKey = rroData.Lookup([
                    rroData.Fcr.CodeFieldId, rroData.CostType.CodeFieldId,
                    rroData.MainActionFullCode.Id, rroData.DirectionCost.CodeFieldId
                ], [fcrCode, costTypeCode, actionCode, dirCostCode], rroData.RecordKey.Id);
                if (rroDataKey != null) {
                    limitsTable.RecordKey.Value = rroDataKey;
                }
            }
            this._document.DeleteTemporaryTable(controlNumbers);
        };
        return TableRules;
    }());
    FMain.TableRules = TableRules;
    var ExpendSheduleParser = (function () {
        function ExpendSheduleParser(expendSheduleData) {
            this._elems = [];
            var apElems = expendSheduleData.split("AP|");
            for (var _i = 0, apElems_1 = apElems; _i < apElems_1.length; _i++) {
                var apElem = apElems_1[_i];
                if (apElem.indexOf("APRC") > -1) {
                    this._elems.push(new ExpendSheduleElement(apElem));
                }
            }
        }
        ExpendSheduleParser.prototype.Load = function (rroOutlayVersion) {
            var userRegCode = ObasTableCollection.SelectedFoivTable.UserRegCode;
            var count = 0;
            var elem = this._elems.filter(function (value) {
                return value.UserRegCode === userRegCode;
            })[0];
            if (elem) {
                count = ObasTableCollection.RroExpendSheduleTable.LoadShedule(elem, rroOutlayVersion);
            }
            return count;
        };
        return ExpendSheduleParser;
    }());
    FMain.ExpendSheduleParser = ExpendSheduleParser;
})(FMain || (FMain = {}));
