var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CommonRulesCollection = (function () {
    function CommonRulesCollection(document) {
        var _this = this;
        this.ShiftFieldGenerator = function (yearIndex, srcField, destField) {
            var fields = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                fields[_i - 3] = arguments[_i];
            }
            var yearsCount = _this._document.Settings.YearsCount;
            for (var _a = 0, fields_1 = fields; _a < fields_1.length; _a++) {
                var field = fields_1[_a];
                destField.push(field.GenerateId(yearIndex));
                if (yearIndex === yearsCount) {
                    srcField.push(null);
                }
                else {
                    srcField.push(field.GenerateId(yearIndex + 1));
                }
            }
        };
        this._document = document;
    }
    CommonRulesCollection.prototype.GetSheetYear = function (sheetId) {
        var yearOffset = ObasHelper.GetYearOffsetById(sheetId);
        return ObasStageSettings.CurrentYear + (yearOffset == null ? 0 : yearOffset);
    };
    CommonRulesCollection.prototype.FilterTableByYear = function (param, year) {
        var realTable = this.GetTableFromParam(param);
        return realTable.GetFieldValue(DocumentSettings.YearFieldId) === year;
    };
    CommonRulesCollection.prototype.InitCustomStandardcalcResult = function (row, cellInfo) {
        var result = new SheetCalcResult(cellInfo.FormulaId);
        var columns = cellInfo.SourceColumns;
        for (var i = 0; i < columns.length; i++) {
            result.AddCoordinates(new CellCoordinate(row, columns[i]));
        }
        return result.ToArray();
    };
    CommonRulesCollection.prototype.StandardCalcStrCode = function (param, row, column, info) {
        var sheet = this.GetSheetFromParam(param);
        var curLvl = sheet.GetRowLevel(row) - 1;
        var lvlInc = curLvl > 0 ? info.LevelIncs[curLvl - 1] : 0;
        var prevLvl = -1;
        var prevCode = 0;
        var curCode;
        if (row > 0) {
            prevLvl = sheet.GetRowLevel(row - 1) - 1;
            prevCode = parseInt(sheet.GetCellValue(row - 1, column), 10);
        }
        if (prevLvl === curLvl) {
            curCode = prevCode + lvlInc;
        }
        else if (curLvl === 0) {
            curCode = info.CalcTotalCode(sheet, row, column);
        }
        else {
            if (lvlInc === 0) {
                curCode = 0;
            }
            else {
                curCode = (((prevCode / lvlInc) | 0) + 1) * lvlInc;
            }
        }
        return ObasHelper.FillWithCharacter(curCode.toString(), info.Length);
    };
    CommonRulesCollection.prototype.TotalSumTableEditNotify = function (param, fieldId, onlyTotal) {
        if (onlyTotal === void 0) { onlyTotal = true; }
        if (ObasStageSettings.CanShowWarning && this._document.Settings.CanShowWarning) {
            var canCheck = true;
            if (onlyTotal) {
                var realTable = this.GetTableFromParam(param);
                canCheck = realTable.GetFieldValue(BaseObasTableFields.TotalRowFlagField.Id) === 1;
            }
            if (canCheck && this._document.Settings.CanShowFieldWarning.containsKey(fieldId)) {
                if (this._document.Settings.CanShowFieldWarning.getValue(fieldId)) {
                    this._document.Settings.CanShowFieldWarning.setValue(fieldId, false);
                    var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
                    var message = "\u0412\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438 \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430 " + (ObasStageSettings.CurrentYear + yearOffset) + " \u0433\u043E\u0434";
                    Client.ShowMessage("\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435", message, MessageIcons.Information);
                }
            }
        }
    };
    CommonRulesCollection.prototype.SetOBASMasterKbk = function (fileType, obasVersion, canChange) {
        if (canChange === void 0) { canChange = true; }
        var versionsTable = ObasTableCollection.RroObasVersionsTable;
        versionsTable.LocateByKeys(obasVersion);
        var rroData = versionsTable.RroObasKey.SourceTable.RroDataKey.SourceTable;
        if (canChange) {
            var paramTable = this._document.MainParametersTable;
            paramTable.IsReadOnly = false;
            paramTable.FileType.Value = ObasTableCollection.FileTypeTable.LookupKeyByCode(fileType.toString());
            paramTable.ObasVersion.Value = obasVersion;
            var kbkFieldIds = rroData.GetKbkKeyFieldsId();
            for (var i = 0; i < kbkFieldIds.length; i++) {
                var fieldId = kbkFieldIds[i];
                paramTable.SetFieldValue(fieldId, rroData.GetFieldValue(fieldId));
            }
            paramTable.Foiv.ForeignKey.Value = rroData.Foiv.ForeignKey.Value;
            var costTypeSpt = ObasTableCollection.CostTypeTable;
            var costTypeCode = ObasHelper.GetVRCodeFOT(rroData.CostType.Code);
            paramTable.CostType.ForeignKey.Value = costTypeSpt
                .Lookup(costTypeSpt.Code.Id, costTypeCode, costTypeSpt.RecordKey.Id);
            paramTable.Csr.ForeignKey.Value = paramTable.Csr.SprTable.LookupKeyByCode(paramTable.GetCSRCode());
            paramTable.IsReadOnly = true;
        }
        this.SetFormLables();
    };
    CommonRulesCollection.prototype.CalcIndexationByYear = function (value, year, fieldId) {
        if (fieldId === void 0) { fieldId = "Value"; }
        var indexTable = this._document.Tables.getValue("Indexation_Calced");
        return value * indexTable.Lookup(DocumentSettings.YearFieldId, year, fieldId) || 0;
    };
    CommonRulesCollection.prototype.CalcAdjustment = function (obasVal, obasDeltaVal, correction) {
        var corVal = correction || ObasStageSettings.Correction;
        return (obasVal + obasDeltaVal) * -1 * corVal;
    };
    CommonRulesCollection.prototype.CalcContribution = function (value, param) {
        var percent;
        if (typeof param === "number") {
            percent = param;
        }
        else {
            var table = this.GetTableFromParam(param);
            percent = table.GetFieldValue("Rate");
        }
        return ObasHelper.ModRound(value * (percent || 0) / 100, 1);
    };
    CommonRulesCollection.prototype.FilterKosgu = function () {
        return ObasTableCollection.KosguSprTable.Filter(this._document.ObasKey, this._document.MainParametersTable.CostType.Code);
    };
    CommonRulesCollection.prototype.FreezeDocument = function () {
        this._document.FreezeDocument();
    };
    CommonRulesCollection.prototype.GetFileName = function (fileType, obasVersion, ignoreApprove, withFolder, usePostfix, includeVersionNumber) {
        if (fileType == null) {
            fileType = this._document.FileType;
        }
        if (obasVersion == null) {
            obasVersion = this._document.ObasVersion;
        }
        return ObasHelper.GetFileName(fileType, obasVersion, ignoreApprove, withFolder, usePostfix, includeVersionNumber);
    };
    CommonRulesCollection.prototype.GetExcelFileName = function () {
        var version = this._document.ObasVersion;
        var rroObasVersionsTable = ObasTableCollection.RroObasVersionsTable;
        rroObasVersionsTable.LocateByKeys(version);
        var rroObasTable = rroObasVersionsTable.RroObasKey.SourceTable;
        var isMain = ObasTableCollection.FileTypeTable.IsMain.LookupByKeys(this._document.FileType);
        return (isMain ? "" : "Дельта_") + "\u041E\u041F\u0421\u041F_" + rroObasTable.Obas.Code + "_v" + rroObasVersionsTable.RroOutlayKey.Value + "_" + ObasHelper.ConvertToString(rroObasVersionsTable.OutlayCreateDate, DateFormat.Short);
    };
    CommonRulesCollection.prototype.GetExcelTemplateFileName = function () {
        var code = ObasTableCollection.ObasSprTable.Code.LookupByKeys(this._document.ObasKey);
        return ObasStageSettings.TemplateDirectory + "\\" + ObasStageSettings.ExcelTemplateDirectory + "\\F" + code.substring(1) + ".xls";
    };
    CommonRulesCollection.prototype.GetExportDirectory = function () {
        return ObasHelper.GetExportDirectory();
    };
    CommonRulesCollection.prototype.SaveTotalTable = function (tableId) {
        var formTotalTable = this._document.FormParametersTable.TotalTable;
        if (formTotalTable.Id.indexOf(tableId) > -1 &&
            formTotalTable.Locate([BaseObasTableFields.TotalRowFlagField.Id], [1])) {
            this.UpdateMainForm(tableId);
        }
    };
    CommonRulesCollection.prototype.UpdateMainForm = function (tableId) {
        ObasHelper.GetFullDirectoryPath(this._document.ObasVersion);
        var params = [];
        params.push(this._document.FileType);
        params.push(this._document.ObasVersion);
        var table = this._document.Tables.getValue(tableId);
        var data = [];
        for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
            var fieldId = "Y" + (i + 1);
            var value = table.GetFieldsIds().indexOf(fieldId) > -1
                ? table.GetFieldValue(fieldId)
                : table.GetFieldValue("g" + (i + 2));
            data[i] = value;
        }
        params.push(data);
        Client.SendMessage(Client.MainDocumentId, "%Doc%.TableRules.UpdateRRO", params);
        this.SetFormLables();
    };
    CommonRulesCollection.prototype.SetFormLables = function () {
        var obasSprTable = ObasTableCollection.ObasSprTable;
        var paramTable = this._document.MainParametersTable;
        obasSprTable.LocateByKeys(this._document.ObasKey);
        Client.SetComponentText(ClientComponents.lbCode, "");
        Client.SetComponentText(ClientComponents.lblNameLbl, "");
        Client.SetComponentText(ClientComponents.lblName, obasSprTable.Name.Value);
        var id = paramTable.Foiv.ForeignKey.Value;
        var foivSprTable = ObasTableCollection.FoivTable;
        foivSprTable.LocateByKeys(id);
        var txt = foivSprTable.Name.Value;
        Client.SetComponentText(ClientComponents.lblFoiv, txt);
        var kbkCodes = [];
        kbkCodes.push(foivSprTable.Code.Value);
        kbkCodes.push(paramTable.Fcr.Code);
        kbkCodes.push(this.GetCSRCode());
        kbkCodes.push(paramTable.CostType.Code);
        Client.SetComponentText(ClientComponents.lblKBK, kbkCodes.join(" "));
    };
    CommonRulesCollection.prototype.SetupLinkedDocuments = function (deltaDocId, approvedDocId) {
        this._document.DeltaDocId = deltaDocId === "null" ? null : deltaDocId;
        this._document.ApprovedDocId = approvedDocId === "null" ? null : approvedDocId;
    };
    CommonRulesCollection.prototype.DocumentSaveEventHandler = function () {
        if (!this._document.IsDeltaObas) {
            if (!(this._document.Id == null || this._document.DeltaDocId == null)) {
                if (this._document.ApprovedDocId) {
                    Client.CreateDeltaDocument(this._document.DeltaDocId, this._document.ApprovedDocId, this._document.Id);
                    Client.SaveDocument(this._document.DeltaDocId);
                }
                else if (this._document.Id === this._document.DeltaDocId) {
                    var fileType = DocumentFileType.DeltaObas;
                    var rroObasVersions = ObasTableCollection.RroObasVersionsTable;
                    rroObasVersions.LocateByKeys(this._document.ObasVersion);
                    var fileName = ObasHelper.GetFileName(fileType, this._document.ObasVersion, undefined, true, undefined, undefined, true);
                    if (Client.IsFileExists(fileName)) {
                        Client.DeleteFile(fileName);
                    }
                    var deltaDocId = Client.OpenDocument(ObasHelper.GetTemplateFileName(fileType, rroObasVersions.RroObasKey.SourceTable.Obas.ForeignKey.Value, true), fileName, false);
                    Client.SendMessage(deltaDocId, "%Doc%.CommonRules.SetOBASMasterKbk", [ObasStageSettings.DeltaFileType, this._document.ObasVersion, true]);
                    Client.ApplyDeltaDocument(deltaDocId, this._document.Id);
                    Client.SaveDocument(deltaDocId);
                    Client.CloseDocument(deltaDocId);
                }
            }
        }
    };
    CommonRulesCollection.prototype.CheckVersionData = function (rroObasVersion) {
        var result = true;
        var versionsTable = ObasTableCollection.RroObasVersionsTable;
        if (versionsTable.LocateByKeys(rroObasVersion)) {
            var expedSheduleTable = ObasTableCollection.RroExpendSheduleTable;
            var versionSumTable = ObasTableCollection.ObasVersionSumTable;
            var rroDataTable = versionsTable.RroObasKey.SourceTable.RroDataKey.SourceTable;
            var locateFieldIds = rroDataTable.GetKbkKeyFieldsId();
            locateFieldIds.push(rroDataTable.RroOutlayKey.Id);
            var locateValues = rroDataTable.GetKbkKeyFieldsValue();
            locateValues.push(rroDataTable.RroOutlayKey.Value);
            var sumtable = this._document.TotalTable;
            if (expedSheduleTable.Locate(locateFieldIds, locateValues) &&
                versionSumTable.Locate(locateFieldIds, locateValues) && sumtable.LocateTotalRow()) {
                var yearDataField = BaseObasTableFields.YearDataField;
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    var fieldId = yearDataField.GenerateId(i);
                    result = ((versionSumTable.GetFieldValue(fieldId) || 0) -
                        (versionsTable.GetFieldValue(fieldId) || 0) +
                        (sumtable.GetDataByVersion(rroObasVersion, i) || 0)) <=
                        (expedSheduleTable.GetFieldValue(fieldId) || 0);
                    if (!result) {
                        break;
                    }
                }
            }
        }
        return result;
    };
    CommonRulesCollection.prototype.CheckChangeType = function () {
        var result = true;
        var versionsTable = ObasTableCollection.RroObasVersionsTable;
        var version = this._document.ObasVersion;
        if (versionsTable.LocateByKeys(version)) {
            if (versionsTable.IsMultiRow.Value) {
                result = this.CheckVersionData(version);
                if (result) {
                    var synonimVersion = ObasHelper.GetSynonymVersion(version);
                    result = this.CheckVersionData(synonimVersion);
                }
            }
            else {
                result = this.CheckVersionData(version);
            }
        }
        if (!result) {
            Client.ShowMessage("\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435", "\u0421\u0443\u043C\u043C\u0430 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432 \u043F\u043E \u0441\u043C\u0435\u0442\u043D\u043E\u043C\u0443 \u0440\u0430\u0441\u0447\u0435\u0442\u0443 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0441\u0443\u043C\u043C\u0443 \u043B\u0438\u043C\u0438\u0442\u043E\u0432 \u0431\u044E\u0434\u0436\u0435\u0442\u043D\u044B\u0445 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432, \u0434\u043E\u0432\u0435\u0434\u0435\u043D\u043D\u0443\u044E \u0440\u0430\u0441\u0445\u043E\u0434\u043D\u044B\u043C \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435\u043C", MessageIcons.Warning);
        }
        return true;
    };
    CommonRulesCollection.prototype.KosguDocumentSaveEventHandler = function () {
        var totalTable = this._document.FormParametersTable.TotalTable;
        var localKosguTable = this._document.FormParametersTable.KosguTable;
        var reader = localKosguTable.CreateReader();
        while (reader.Read()) {
            if (totalTable.Locate(BaseObasTableFields.TotalRowFlagField.Id, reader.GetFieldValue("SrcKey"))) {
                for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
                    var fieldId = "Y" + (i + 1);
                    var value = totalTable.GetFieldsIds().indexOf(fieldId) > -1
                        ? totalTable.GetFieldValue(fieldId)
                        : totalTable.GetFieldValue("g" + (i + 2));
                    localKosguTable.SetFieldValue(fieldId, value);
                }
            }
        }
        this.DocumentSaveEventHandler();
    };
    CommonRulesCollection.prototype.FotInsDocumentSaveEventHandler = function () {
        var _this = this;
        var sumTable = this._document.TotalTable;
        if (sumTable.Locate(["StrKey"], [100])) {
            sumTable.SetFieldValue("IsTotal", 0);
        }
        var kosguSprTable = ObasTableCollection.KosguSprTable;
        var data = [];
        var record211 = {
            Key: kosguSprTable.LookupKeyByCode("211"),
            Data: []
        };
        data.push(record211);
        var record213 = {
            Key: kosguSprTable.LookupKeyByCode("213"),
            Data: []
        };
        data.push(record213);
        var fotField = BaseObasTableFields.FotYearDataField;
        var insField = BaseObasTableFields.InsuranceYearDataField;
        sumTable.IterateByNotTotalRow(function () {
            _this._document.IterateByYears(function (i) {
                record211.Data[i] = (sumTable.GetFieldValue(fotField.GenerateId(i + 1)) || 0) + (record211.Data[i] || 0);
                record213.Data[i] = (sumTable.GetFieldValue(insField.GenerateId(i + 1)) || 0) + (record213.Data[i] || 0);
            }, false);
        });
        this._document.CommonRules.UpdateKosguTable(data);
        this._document.CommonRules.DocumentSaveEventHandler();
    };
    CommonRulesCollection.prototype.UpdateKosguTable = function (data) {
        var kosguTable = this._document.FormParametersTable.KosguTable;
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if (!kosguTable.Locate(["KOSGU_Id"], [record.Key])) {
                kosguTable.AddRow();
                kosguTable.SetFieldValue("KOSGU_Id", record.Key);
                kosguTable.PostRow();
            }
            for (var j = 0; j < ObasStageSettings.YearsCount; j++) {
                kosguTable.SetFieldValue("Y" + (j + 1), record.Data[j]);
            }
        }
    };
    CommonRulesCollection.prototype.SaveKosguTable = function (tableId) {
        this.UpdateMainKosguValues();
    };
    CommonRulesCollection.prototype.UpdateMainKosguValues = function (obasVersion, fileType) {
        if (obasVersion == null) {
            obasVersion = this._document.ObasVersion;
        }
        if (fileType == null) {
            fileType = this._document.FileType;
        }
        var data = ObasHelper.CollectKosguData(this._document.FormParametersTable.KosguTable);
        Client.SendMessage(Client.MainDocumentId, "%Doc%.TableRules.UpdateRROKosgu", [fileType, obasVersion, data]);
    };
    CommonRulesCollection.prototype.YearInitEventHandler = function (tableId, fieldId) {
        return this._document.Settings.ActiveYear;
    };
    CommonRulesCollection.prototype.ShiftTableData = function (param, sourceFieldsArray, destFieldsArray) {
        var table = this.GetTableFromParam(param);
        var reader = table.CreateReader();
        while (reader.Read()) {
            for (var i = 0; i < sourceFieldsArray.length; i++) {
                if (sourceFieldsArray[i] == null) {
                    table.SetFieldValue(destFieldsArray[i], 0);
                }
                else {
                    table.SetFieldValue(destFieldsArray[i], table.GetFieldValue(sourceFieldsArray[i]));
                }
            }
        }
    };
    CommonRulesCollection.prototype.CopyTableData = function (table, srcYear, destYear, filter) {
        var fields = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            fields[_i - 4] = arguments[_i];
        }
        var yearsCount = this._document.Settings.YearsCount;
        var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : yearsCount - 1;
        var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : yearsCount;
        var srcFieldIds = [];
        var destFieldIds = [];
        for (var _a = 0, fields_2 = fields; _a < fields_2.length; _a++) {
            var field = fields_2[_a];
            srcFieldIds.push(field.GenerateId(srcIndex));
            destFieldIds.push(field.GenerateId(destIndex));
        }
        var fieldsCount = fields.length;
        var copy = function () {
            if (filter == null || filter(table, table.RecordKey.Value)) {
                for (var i = 0; i < fieldsCount; i++) {
                    table.SetFieldValue(destFieldIds[i], table.GetFieldValue(srcFieldIds[i]));
                }
            }
        };
        table.Iterate(copy);
    };
    CommonRulesCollection.prototype.ResetTableData = function (table, fields, locateHandler, converToYearIndex) {
        var _this = this;
        if (converToYearIndex === void 0) { converToYearIndex = true; }
        var resetDataHandler = function () {
            _this._document.IterateByYears(function (i) {
                for (var _i = 0, fields_3 = fields; _i < fields_3.length; _i++) {
                    var field = fields_3[_i];
                    table.SetFieldValue(field.GenerateId(i), 0);
                }
            }, converToYearIndex);
        };
        if (locateHandler == null) {
            table.Iterate(resetDataHandler, true);
        }
        else if (locateHandler()) {
            resetDataHandler();
        }
    };
    CommonRulesCollection.prototype.ResetTableDataWithKeys = function (table, keys) {
        var fields = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fields[_i - 2] = arguments[_i];
        }
        this.ResetTableData(table, fields, keys ? function () { return table.LocateByKeys(keys.ToArray()); } : null);
    };
    CommonRulesCollection.prototype.SetSumByKeys = function (param, keyfieldIds, keyFieldValues, datafieldId, oldValue, newValue, addIfNotExist) {
        if (addIfNotExist === void 0) { addIfNotExist = true; }
        var table = this.GetTableFromParam(param);
        ObasHelper.SetSumByKeys(table, keyfieldIds, keyFieldValues, datafieldId, oldValue, newValue, addIfNotExist);
    };
    CommonRulesCollection.prototype.SetValueByKeys = function (param, keyfieldIds, keyFieldValues, datafieldId, value, addIfNotExist) {
        if (addIfNotExist === void 0) { addIfNotExist = true; }
        var table = this.GetTableFromParam(param);
        if (table.Locate(keyfieldIds, keyFieldValues)) {
            table.SetFieldValue(datafieldId, value);
        }
        else if (addIfNotExist) {
            table.AddRow();
            for (var i = 0; i < keyfieldIds.length; i++) {
                table.SetFieldValue(keyfieldIds[i], keyFieldValues[i]);
            }
            table.PostRow();
            table.SetFieldValue(datafieldId, value);
        }
    };
    CommonRulesCollection.prototype.GetValueByKeys = function (param, keyfieldIds, keyFieldValues, datafieldId, addIfNotExist) {
        if (addIfNotExist === void 0) { addIfNotExist = true; }
        return ObasHelper.GetValueByKeys(this.GetTableFromParam(param), keyfieldIds, keyFieldValues, datafieldId, addIfNotExist);
    };
    CommonRulesCollection.prototype.DeleteOldLink = function (uniqueTableId, srcTableIds, srcFieldIds, srcFieldValues, uniqueFieldIds) {
        if (uniqueFieldIds == null) {
            uniqueFieldIds = srcFieldIds;
        }
        var recordExists = false;
        for (var i = 0; i < srcTableIds.length; i++) {
            var table = this._document.Tables.getValue(srcTableIds[i]);
            recordExists = table.Locate(srcFieldIds, srcFieldValues);
            if (recordExists) {
                break;
            }
        }
        var uniqTable = this._document.Tables.getValue(uniqueTableId);
        if (!recordExists && uniqTable.Locate(uniqueFieldIds, srcFieldValues)) {
            uniqTable.DeleteRow();
        }
    };
    CommonRulesCollection.prototype.AddNewLink = function (uniqueTableId, uniqueFieldIds, srcFieldValues) {
        var uniqTable = this._document.Tables.getValue(uniqueTableId);
        if (!uniqTable.Locate(uniqueFieldIds, srcFieldValues)) {
            uniqTable.AddRow();
            for (var i = 0; i < uniqueFieldIds.length; i++) {
                uniqTable.SetFieldValue(uniqueFieldIds[i], srcFieldValues[i]);
            }
            uniqTable.PostRow();
        }
    };
    CommonRulesCollection.prototype.CopyTableRows = function (param, destTable, mapParam, filter) {
        var srcTable = this.GetTableFromParam(param);
        destTable.DeleteAllRow();
        var copy = function (table, recordKey) {
            if (filter == null || filter(table, recordKey)) {
                table.CopyRow(destTable, recordKey, mapParam);
            }
        };
        srcTable.Iterate(copy);
    };
    CommonRulesCollection.prototype.GetDollarRateByYear = function (year) {
        if (year == null) {
            year = this._document.Settings.ActiveYear;
        }
        var fieldId = "Val" + (year - ObasStageSettings.CurrentYear);
        return ObasTableCollection.DollarRateTable.GetFieldValue(fieldId);
    };
    CommonRulesCollection.prototype.ConvertDollarToRuble = function (dollarValue, year) {
        return dollarValue * this.GetDollarRateByYear(year);
    };
    CommonRulesCollection.prototype.ConvertDollarToRubleY1 = function (dollarValue) {
        return dollarValue * this.GetDollarRateByYear(ObasStageSettings.CurrentYear);
    };
    CommonRulesCollection.prototype.ConvertDollarToRubleY2 = function (dollarValue) {
        return dollarValue * this.GetDollarRateByYear(ObasStageSettings.CurrentYear + 1);
    };
    CommonRulesCollection.prototype.ConvertDollarToRubleY3 = function (dollarValue) {
        return dollarValue * this.GetDollarRateByYear(ObasStageSettings.CurrentYear + 2);
    };
    CommonRulesCollection.prototype.ConvertDollarToRubleY4 = function (dollarValue) {
        return dollarValue * this.GetDollarRateByYear(ObasStageSettings.CurrentYear + 3);
    };
    CommonRulesCollection.prototype.GetCalcDollarToRuble = function (coordinate, yearOffset) {
        if (yearOffset === void 0) { yearOffset = 0; }
        var result = new SheetCalcResult("%Doc%.CommonRules.ConvertDollarToRubleY" + (yearOffset + 1));
        result.AddCoordinates(coordinate);
        return result.ToArray();
    };
    CommonRulesCollection.prototype.GetDollarRateFormat = function (sheetId, row, column, groupIndex) {
        return SheetFormatCollection.Related;
    };
    CommonRulesCollection.prototype.GetDollarRateYearsFieldRangeEventHandler = function (sheetId, yearsCount) {
        if (sheetId === void 0) { sheetId = ""; }
        if (yearsCount === void 0) { yearsCount = this._document.Settings.YearsCount; }
        var result = [];
        for (var i = 0; i < yearsCount; i++) {
            result.push(i);
        }
        return result;
    };
    CommonRulesCollection.prototype.UpdateDollarTable = function (param, dollarFieldsInfo) {
        var table = this.GetTableFromParam(param);
        var reader = table.CreateReader();
        while (reader.Read()) {
            for (var i = 0; i < dollarFieldsInfo.length; i++) {
                var info = dollarFieldsInfo[i];
                table.SetFieldValue(info.RubleFieldId, table.GetFieldValue(info.DollarFieldId) * this.GetDollarRateByYear(info.Year));
            }
        }
    };
    CommonRulesCollection.prototype.GetSheetFromParam = function (param) {
        if (param instanceof Sheet) {
            return param;
        }
        else if (typeof param === "string") {
            return this._document.Sheets.getValue(param);
        }
        throw new Error("\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C Sheet");
    };
    CommonRulesCollection.prototype.GetTableFromParam = function (param) {
        if (param instanceof Table) {
            return param;
        }
        else if (typeof param === "string") {
            return this._document.Tables.getValue(param);
        }
        throw new Error("\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C Table");
    };
    CommonRulesCollection.prototype.IsFooterRow = function (param, row, footerCount) {
        if (footerCount === void 0) { footerCount = 1; }
        var realSheet = this.GetSheetFromParam(param);
        return row >= realSheet.RowCount - footerCount;
    };
    CommonRulesCollection.prototype.GetFooterSum = function (param, row, column, options) {
        if (options == null) {
            options = {
                StartRow: 0,
                Step: 1,
                EndRow: row
            };
        }
        var filter = options.Filter;
        var startRow = options.StartRow || 0;
        var step = options.Step || 1;
        var endRow = options.EndRow || row;
        var result = new SheetCalcResult(BaseFormulas.SUM);
        var useFilter = !(filter == null);
        var realSheet = useFilter ? this.GetSheetFromParam(param) : null;
        for (var i = startRow; i < endRow; i += step) {
            var rowFiltered = false;
            if (useFilter) {
                rowFiltered = filter(realSheet, i, column, this._document);
            }
            if (!rowFiltered) {
                result.AddCoordinates(new CellCoordinate(i, column));
            }
        }
        return result.ToArray();
    };
    CommonRulesCollection.prototype.InsuranceValuesSheetCalcEventHandler = function (sheetId, row, column, fieldId, orgColCount) {
        if (orgColCount === void 0) { orgColCount = 0; }
        var result;
        var relRow = row % CommonRulesCollection._insuranceRowCount;
        var relCol = column - orgColCount;
        if (relRow === 12) {
            if (relCol > 5) {
                result = new SheetCalcResult(BaseFormulas.SUM);
                result.AddCoordinates(new CellCoordinate(row - 5, column));
                result.AddCoordinates(new CellCoordinate(row - 6, column));
                result.AddCoordinates(new CellCoordinate(row - 9, column));
                result.AddCoordinates(new CellCoordinate(row - 12, column));
                return result.ToArray();
            }
            if (relCol > 1) {
                return ObasHelper.X;
            }
        }
        else if (CommonRulesCollection._insuranceCalcInfo.XRows.indexOf(relRow) > -1
            && CommonRulesCollection._insuranceCalcInfo.XColumns.indexOf(relCol) > -1) {
            return ObasHelper.X;
        }
        else if (relCol > 5) {
            switch (relRow) {
                case 0:
                case 3:
                case 7:
                    var length_1 = (relRow === 7 ? 5 : 3);
                    result = new SheetCalcResult(BaseFormulas.SUM);
                    for (var i = 1; i < length_1; i++) {
                        result.AddCoordinates(new CellCoordinate(row + i, column));
                    }
                    return result.ToArray();
            }
        }
        return undefined;
    };
    CommonRulesCollection.prototype.InsuranceValuesSheetFormatEventHandler = function (sheetId, row, column, groupIndex, fillUser) {
        if (fillUser === void 0) { fillUser = false; }
        if (column === 0 || column === 1 || (CommonRulesCollection._insuranceCalcInfo.XRows.indexOf(row) > -1
            && CommonRulesCollection._insuranceCalcInfo.XColumns.indexOf(column) > -1)) {
            return SheetFormatCollection.Default;
        }
        else if (this.IsFooterRow(sheetId, row)) {
            if (column > 5) {
                return SheetFormatCollection.Calc;
            }
        }
        else if (column > 5 && CommonRulesCollection._insuranceCalcInfo.FreeRows.indexOf(row) > -1) {
            return SheetFormatCollection.Free;
        }
        else {
            if (fillUser && column < 6) {
                return SheetFormatCollection.Free;
            }
            else {
                return SheetFormatCollection.Calc;
            }
        }
        return SheetFormatCollection.Default;
    };
    CommonRulesCollection.prototype.OnlyInsuranceValuesSheetFormatEventHandler = function (sheetId, row, column, groupIndex) {
        return this.InsuranceValuesSheetFormatEventHandler(sheetId, row, column, groupIndex, true);
    };
    CommonRulesCollection.prototype.InsuranceValuesSheetEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
        var relRow = row % CommonRulesCollection._insuranceRowCount;
        return ((column < 6 && row < 7) ||
            (column > 5 && CommonRulesCollection._insuranceCalcInfo.FreeRows.indexOf(relRow) > -1));
    };
    CommonRulesCollection.prototype.InsuranceOrgValuesSheetFormatEventHandler = function (sheetId, row, column, orgColCount) {
        if (orgColCount === void 0) { orgColCount = 1; }
        var isLastRow = this._document.CommonRules.IsFooterRow(sheetId, row);
        if (column < orgColCount) {
            if (isLastRow) {
                return SheetFormatCollection.Default;
            }
            else {
                return SheetFormatCollection.Related;
            }
        }
        var defColumn = column - orgColCount;
        var relRow = row % CommonRulesCollection._insuranceRowCount;
        switch (defColumn) {
            case 0:
                return SheetFormatCollection.Default;
            case 1:
                return SheetFormatCollection.Calc;
        }
        if (isLastRow) {
            if (defColumn > 5) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Default;
            }
        }
        if (CommonRulesCollection._insuranceCalcInfo.XRows.indexOf(relRow) > -1
            && CommonRulesCollection._insuranceCalcInfo.XColumns.indexOf(defColumn) > -1) {
            return SheetFormatCollection.Default;
        }
        else if (defColumn > 5 && CommonRulesCollection._insuranceCalcInfo.FreeRows.indexOf(relRow) > -1) {
            return SheetFormatCollection.Free;
        }
        else {
            return SheetFormatCollection.Calc;
        }
    };
    CommonRulesCollection.prototype.InsuranceOrgCalcStrCode = function (sheetId, row, column, info) {
        var sheet = this._document.Sheets.getValue(sheetId);
        var code;
        if (this.IsFooterRow(sheet, row)) {
            code = info.CalcTotalCode(sheet, row, column);
        }
        else {
            var relRow = row % CommonRulesCollection._insuranceRowCount;
            var orgNum = (row / CommonRulesCollection._insuranceRowCount) | 0;
            code = parseInt(sheet.GetCellValue(row, column, false), 10);
            if (relRow === (CommonRulesCollection._insuranceRowCount - 1)) {
                code = 90;
            }
            code += orgNum * 100;
        }
        return ObasHelper.FillWithCharacter(code.toString(), info.Length);
    };
    CommonRulesCollection.prototype.InsuranceOrgValuesSheetCalcEventHandler = function (sheetId, row, column, fieldId, info) {
        if (fieldId === BaseObasTableFields.StrCodeField.Id) {
            return this._document.CommonRules.InsuranceOrgCalcStrCode(sheetId, row, column, info.CodeInfo);
        }
        else {
            if (this.IsFooterRow(sheetId, row)) {
                var relCol = column - info.OrgColCount;
                if (column === info.OrgColCount) {
                    return "Всего";
                }
                else if (relCol > 5) {
                    return this.GetFooterSum(sheetId, row, column, {
                        StartRow: CommonRulesCollection._insuranceRowCount - 1,
                        Step: CommonRulesCollection._insuranceRowCount
                    });
                }
                else if (CommonRulesCollection._insuranceCalcInfo.XColumns.indexOf(relCol) > -1) {
                    return ObasHelper.X;
                }
            }
            else {
                var relRow = row % CommonRulesCollection._insuranceRowCount;
                if (relRow === (CommonRulesCollection._insuranceRowCount - 1) && column === info.OrgColCount) {
                    return info.OrgTotalName;
                }
                else {
                    return this._document.CommonRules.InsuranceValuesSheetCalcEventHandler(sheetId, row, column, fieldId, info.OrgColCount);
                }
            }
        }
        return undefined;
    };
    CommonRulesCollection.prototype.CalcRelRowCode = function (row, relRowCount, info) {
        var relRow = (row + 1) % relRowCount;
        var relRow2 = ((row + 1) / relRowCount) | 0;
        var code = relRow2 * info.LevelIncs[0];
        if (relRow !== 0) {
            code += relRow * info.LevelIncs[1];
        }
        return ObasHelper.FillWithCharacter(code, info.Length);
    };
    CommonRulesCollection.prototype.AnalyticsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var table = this._document.Tables.getValue(tableId);
        var isHasParentRows = table.IsFieldExists("ParentKey");
        if (isHasParentRows) {
            var parentKey = table.GetFieldValue("ParentKey");
            if (!(oldValue === newValue || parentKey === -1)) {
                if (parentKey !== 0) {
                    this._document.CommonRules.SetSumByKeys(table, ["StrKey"], [parentKey], fieldId, oldValue, newValue);
                }
            }
        }
    };
    CommonRulesCollection.prototype.OnlyTotalLoadEventHandler = function (tableId) {
        return (this._document.Tables.getValue(tableId).GetFieldValue(BaseObasTableFields.TotalRowFlagField.Id) === 1);
    };
    CommonRulesCollection.prototype.InsuranceTaxPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var table = this.GetTableFromParam(tableId);
        var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
        var strKey = table.GetFieldValue(BaseObasTableFields.StrKeyField.Id);
        var sumVal = table.GetFieldValue(BaseObasTableFields.FotYearDataField.GenerateId(1 + yearOffset)) || 0;
        var countVal = table.GetFieldValue(BaseObasTableFields.CountYearDataField.GenerateId(1 + yearOffset)) || 0;
        var fotVal = countVal === 0 ? 0 : sumVal / countVal;
        var destFieldId = BaseObasTableFields.TaxYearDataField.GenerateId(1 + yearOffset);
        if (strKey === StrKeysPInsurance.SocialAccidents ||
            strKey === StrKeysPInsurance.Health) {
            table.SetFieldValue(destFieldId, sumVal);
        }
        else {
            var year = ObasStageSettings.CurrentYear + yearOffset;
            var taxBaseTable = this._document.Tables.getValue("BaseInsurancePremiums");
            var baseMax = taxBaseTable.Lookup([DocumentSettings.YearFieldId, "Type"], [year, table.GetFieldValue("StrType")], "Val") || 0;
            if (fotVal <= baseMax) {
                if (strKey === StrKeysPInsurance.Pension10) {
                    table.SetFieldValue(destFieldId, 0);
                }
                else {
                    table.SetFieldValue(destFieldId, sumVal);
                }
            }
            else {
                switch (strKey) {
                    case StrKeysPInsurance.Pension22:
                    case StrKeysPInsurance.SocialDisability:
                        table.SetFieldValue(destFieldId, countVal * baseMax);
                        break;
                    case StrKeysPInsurance.Pension10:
                        table.SetFieldValue(destFieldId, sumVal - countVal * baseMax);
                        break;
                }
            }
        }
    };
    CommonRulesCollection.prototype.InsuranceTaxBaseChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var table = this.GetTableFromParam(tableId);
        table.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), this.CalcContribution(newValue, table));
    };
    CommonRulesCollection.prototype.StandardCalc = function (param, row, column, info) {
        var sheet = this.GetSheetFromParam(param);
        if (column === info.CodeInfo.Column) {
            return this.StandardCalcStrCode(sheet, row, column, info.CodeInfo);
        }
        else {
            var curLvl = sheet.GetRowLevel(row) - 1;
            var columnInfo = info.ColumnsInfo[column];
            if (columnInfo != null) {
                var cellInfo = columnInfo.Cell;
                var result = void 0;
                if (curLvl === info.MaxLevel) {
                    if (cellInfo.FormulaId != null) {
                        return this.InitCustomStandardcalcResult(row, cellInfo);
                    }
                }
                else {
                    var rowInfo = void 0;
                    if (curLvl === 0) {
                        rowInfo = columnInfo.TotalRow;
                    }
                    else {
                        if (columnInfo.SubTotalRow instanceof Array) {
                            rowInfo = columnInfo.SubTotalRow[curLvl - 1];
                        }
                        else {
                            var temp = columnInfo.SubTotalRow;
                            rowInfo = temp;
                        }
                    }
                    if (!rowInfo.IsCalculated && rowInfo.Name != null) {
                        return rowInfo.Name;
                    }
                    else if (rowInfo.IsCalculated) {
                        if (cellInfo.FormulaId) {
                            return this.InitCustomStandardcalcResult(row, cellInfo);
                        }
                        else {
                            result = new SheetCalcResult(BaseFormulas.SUM);
                            result.AddCoordinates(sheet.GetChildRows(row, column));
                            return result.ToArray();
                        }
                    }
                }
            }
        }
        return undefined;
    };
    CommonRulesCollection.prototype.StandardFormat = function (param, row, column, info) {
        var sheet = this.GetSheetFromParam(param);
        var curLvl = sheet.GetRowLevel(row) - 1;
        var columnInfo = info.ColumnsInfo[column];
        if (columnInfo != null) {
            if (curLvl === info.MaxLevel) {
                var cellInfo = columnInfo.Cell;
                if (cellInfo.Format != null) {
                    return cellInfo.Format;
                }
                else {
                    return SheetFormatCollection.GetFormat(cellInfo.Type);
                }
            }
            var rowInfo = void 0;
            if (curLvl === 0) {
                rowInfo = columnInfo.TotalRow;
            }
            else {
                if (columnInfo.SubTotalRow instanceof Array) {
                    rowInfo = columnInfo.SubTotalRow[curLvl - 1];
                }
                else {
                    var temp = columnInfo.SubTotalRow;
                    rowInfo = temp;
                }
            }
            if (rowInfo.Format != null) {
                return rowInfo.Format;
            }
            else {
                return SheetFormatCollection.Calc;
            }
        }
        return SheetFormatCollection.Default;
    };
    CommonRulesCollection.prototype.ActivateSheetEventHandler = function (sheetId) {
        this._document.Settings.SetActiveYear(ObasHelper.GetYearOffsetById(sheetId));
    };
    CommonRulesCollection.prototype.ViewYearLoadEventHandler = function (tableId) {
        return this.FilterTableByYear(tableId, this._document.Settings.ActiveYear);
    };
    CommonRulesCollection.prototype.GetSheetYearText = function (sheetId, oldText) {
        var sheetYear = this.GetSheetYear(sheetId);
        oldText = oldText.replace(DocumentSettings.YearSign, sheetYear.toString());
        oldText = oldText.replace(DocumentSettings.YearSignIndex, (sheetYear - this._document.Settings.StartYear + 1).toString());
        return oldText;
    };
    CommonRulesCollection.prototype.GetYearsFieldRangeEventHandler = function (sheetIs, yearsCount) {
        if (sheetIs === void 0) { sheetIs = ""; }
        if (yearsCount === void 0) { yearsCount = this._document.Settings.YearsCount; }
        return ObasHelper.GenerateYearsRange(yearsCount);
    };
    CommonRulesCollection.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
        return ObasHelper.CalcYearColumnCaption(index, this._document.Settings.StartYear);
    };
    CommonRulesCollection.prototype.CalcColumnCaption = function (index, startColumn, blockCount, yearsCount) {
        if (yearsCount === void 0) { yearsCount = this._document.Settings.YearsCount; }
        var formulaParts = [];
        var realStartColumn = startColumn + index;
        for (var i = 0; i < blockCount; i++) {
            formulaParts.push("\u0433\u0440. " + (realStartColumn + i * yearsCount));
        }
        return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(" + formulaParts.join(" + ") + ")";
    };
    CommonRulesCollection.prototype.GetYearsIsReadOnlyEventHandler = function (tableId, index, defaultValue) {
        if (defaultValue === "true") {
            return defaultValue;
        }
        return (ObasStageSettings.BlockCurrentYear &&
            (this._document.Settings.StartYear + index) < (ObasStageSettings.CurrentYear + 1))
            ? "true"
            : "false";
    };
    CommonRulesCollection.prototype.CantAddPrevCurYearsEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
        return !this.SheetByYearsReadOnlyEventHandler(sheetId, false);
    };
    CommonRulesCollection.prototype.SheetByYearsReadOnlyEventHandler = function (sheetId, isReadOnly) {
        return ObasStageSettings.BlockCurrentYear && (this._document.Settings.ActiveYear <= ObasStageSettings.CurrentYear);
    };
    CommonRulesCollection.prototype.CantEditPrevCurYearsEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
        var result = this.CantAddPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
        var sheet = this.GetSheetFromParam(sheetId);
        if (row === (sheet.RowCount - 1)) {
            result = result && (sheet.Table.GetKeyBySourceTable(ObasTableCollection.DualTable) == null);
        }
        return result;
    };
    CommonRulesCollection.prototype.SilentExportToExcel = function (exportDirectory) {
                Client.ShowMessage(this.GetExcelTemplateFileName()+ "     "+ this.GetExcelFileName()+ "     "+exportDirectory);
        this._document.ExportToExcel(this.GetExcelTemplateFileName(), this.GetExcelFileName(), false, true, exportDirectory);
    };
    CommonRulesCollection.prototype.GetAttachName = function () {
        var result = ObasTableCollection.ObasSprTable.Name.LookupByKeys(this._document.ObasKey);
        result += "\n\u043D\u0430 " + ObasStageSettings.CurrentYear + " \u0433\u043E\u0434 \u0438 \u043D\u0430 \u043F\u043B\u0430\u043D\u043E\u0432\u044B\u0439 \u043F\u0435\u0440\u0438\u043E\u0434 " + (ObasStageSettings.CurrentYear + 1) + " \u0438 " + (ObasStageSettings.CurrentYear + 2) + " \u0433\u043E\u0434\u043E\u0432";
        return result;
    };
    CommonRulesCollection.prototype.GetShortFormAnalyticTitle = function () {
        var result = ObasTableCollection.ObasSprTable.Name.LookupByKeys(this._document.ObasKey);
        result = "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0440\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043E\u0431\u044A\u0435\u043C\u0430 \u0431\u044E\u0434\u0436\u0435\u0442\u043D\u044B\u0445 \u0430\u0441\u0441\u0438\u0433\u043D\u043E\u0432\u0430\u043D\u0438\u0439 " + result.toString().replace("Обоснования бюджетных ассигнований", "");
        return result;
    };
    CommonRulesCollection.prototype.GetFoivName = function () {
        return this._document.MainParametersTable.Foiv.Name;
    };
    CommonRulesCollection.prototype.GetFCRName = function () {
        return this._document.MainParametersTable.CalcFcrSectionName();
    };
    CommonRulesCollection.prototype.GetSubFCRName = function () {
        return this._document.MainParametersTable.CalcFcrSubSectionName();
    };
    CommonRulesCollection.prototype.GetVRName = function () {
        return this._document.MainParametersTable.CostType.Name;
    };
    CommonRulesCollection.prototype.GetActionName = function () {
        return this._document.MainParametersTable.MainAction.Name;
    };
    CommonRulesCollection.prototype.GetTypeName = function () {
        return ObasTableCollection.FileTypeTable.IsMain.LookupByKeys(this._document.FileType)
            ? "основной документ"
            : "изменения к документу";
    };
    CommonRulesCollection.prototype.GetCSRName = function () {
        var actionTable = ObasTableCollection.MainActionTable;
        var paramTable = this._document.MainParametersTable;
        var actionShortCode = "00";
        if (actionTable.LocateByKeys(paramTable.MainAction.ForeignKey.Value)) {
            actionShortCode = actionTable.ShortCode.Value;
        }
        var actionName = (actionShortCode === "00" ? "-" : actionTable.Name.Value);
        var result = [];
        result.push(paramTable.GovermentProgram.Name);
        result.push(paramTable.SubProgram.Name);
        result.push(actionName);
        result.push(paramTable.DirectionCost.Name);
        return result.join("/ ");
    };
    CommonRulesCollection.prototype.GetRecipientName = function () {
        return ObasExportHelper.GetRecipientName();
    };
    CommonRulesCollection.prototype.GetManagerName = function () {
        return ObasExportHelper.GetManagerName();
    };
    CommonRulesCollection.prototype.GetRecipientCode = function () {
        return ObasExportHelper.GetRecipientCode();
    };
    CommonRulesCollection.prototype.GetManagerCode = function () {
        return ObasExportHelper.GetManagerCode();
    };
    CommonRulesCollection.prototype.GetFoivCode = function () {
        return this._document.MainParametersTable.Foiv.Code;
    };
    CommonRulesCollection.prototype.GetVRCode = function () {
        return this._document.MainParametersTable.CostType.Code;
    };
    CommonRulesCollection.prototype.GetFCRCode = function () {
        return this._document.MainParametersTable.CalcFcrSectionCode();
    };
    CommonRulesCollection.prototype.GetSubFCRCode = function () {
        return this._document.MainParametersTable.CalcFcrSubSectionCode();
    };
    CommonRulesCollection.prototype.GetCSRCode = function () {
        return this._document.MainParametersTable.GetCSRCode();
    };
    CommonRulesCollection.prototype.GetActionCode = function () {
        return ObasExportHelper.GetActionCode(this._document.MainParametersTable);
    };
    CommonRulesCollection.prototype.GetTypeCode = function () {
        return ObasHelper.FillWithCharacter(ObasTableCollection.FileTypeTable.IsMain
            .LookupByKeys(this._document.FileType)
            ? 1
            : 2, 2);
    };
    CommonRulesCollection.prototype.GetOkudCode = function () {
        var result = ObasTableCollection.ObasSprTable.Okud.LookupByKeys(this._document.ObasKey);
        return result;
    };
    CommonRulesCollection.prototype.GetInnerSecurityClassification = function () {
        var result = "";
        var rroDataTable = ObasTableCollection.RroDataTable;
        var rroVersionTable = ObasTableCollection.RroObasVersionsTable;
        if (rroDataTable.LocateByKeys(rroVersionTable.RroDataKey.LookupByKeys(this._document.ObasVersion))) {
            result = ObasHelper.ConvertToString(rroDataTable.SecurityType.Name);
        }
        return result;
    };
    CommonRulesCollection.prototype.GetSecurityClassification = function () {
        return ObasExportHelper.GetSecurityType();
    };
    CommonRulesCollection.prototype.GetTotalValueForExport = function (sheetId, column, rowOffset) {
        if (rowOffset === void 0) { rowOffset = "0"; }
        var sheet = this._document.Sheets.getValue(sheetId);
        var row = sheet.RowCount - (1 + parseInt(rowOffset, 10));
        return ObasHelper.ConvertToString(sheet.GetCellValue(row, parseInt(column, 10) - 1));
    };
    CommonRulesCollection.prototype.GetValueForExport = function (sheetId, row, column) {
        var sheet = this._document.Sheets.getValue(sheetId);
        return ObasHelper.ConvertToString(sheet.GetCellValue(parseInt(row, 10) - 1, parseInt(column, 10) - 1));
    };
    CommonRulesCollection.prototype.GetSumForExport = function (sheetIdsStr, columnStr, rowStr) {
        if (rowStr === void 0) { rowStr = null; }
        var result = 0;
        var sheetIds = sheetIdsStr.split(";");
        var nColumn = parseInt(columnStr, 10) - 1;
        var nRow = parseInt(rowStr, 10) - 1;
        if (isNaN(nRow)) {
            nRow = 0;
        }
        for (var _i = 0, sheetIds_1 = sheetIds; _i < sheetIds_1.length; _i++) {
            var sheetId = sheetIds_1[_i];
            var sheet = this._document.Sheets.getValue(sheetId);
            var row = nRow < 0 ? (sheet.RowCount - 1) + nRow : nRow;
            result += ObasHelper.ConvertToNumber(sheet.GetCellValue(row, nColumn, true));
        }
        return ObasHelper.ConvertToString(result);
    };
    CommonRulesCollection.prototype.GetTableValue = function (tableId, keysIdsStr, keysValuesStr, dataFieldId) {
        return ObasHelper.ConvertToString(this._document.Tables.getValue(tableId).Lookup(keysIdsStr.split(";"), keysValuesStr.split(";"), dataFieldId));
    };
    return CommonRulesCollection;
}());
CommonRulesCollection._insuranceCalcInfo = {
    FreeRows: [8, 9, 10, 11],
    XRows: [0, 3, 7, 8, 9, 10, 11, 12],
    XColumns: [2, 3, 4, 5]
};
CommonRulesCollection._insuranceRowCount = 13;
var FormExportToBarsTypes;
(function (FormExportToBarsTypes) {
    FormExportToBarsTypes[FormExportToBarsTypes["Simple"] = 0] = "Simple";
    FormExportToBarsTypes[FormExportToBarsTypes["WithOrganizations"] = 1] = "WithOrganizations";
})(FormExportToBarsTypes || (FormExportToBarsTypes = {}));
var BxmlExportValueTypes;
(function (BxmlExportValueTypes) {
    BxmlExportValueTypes[BxmlExportValueTypes["Const"] = 0] = "Const";
    BxmlExportValueTypes[BxmlExportValueTypes["Field"] = 1] = "Field";
    BxmlExportValueTypes[BxmlExportValueTypes["ModField"] = 2] = "ModField";
})(BxmlExportValueTypes || (BxmlExportValueTypes = {}));
var BxmlExportTemplate = (function () {
    function BxmlExportTemplate(id, _idType) {
        if (id === void 0) { id = "order"; }
        if (_idType === void 0) { _idType = BxmlExportValueTypes.ModField; }
        this._idType = _idType;
        this._templateBody = "";
        this._fieldIds = [];
        switch (this._idType) {
            case BxmlExportValueTypes.Const:
                this._templateId = id;
                break;
            case BxmlExportValueTypes.Field:
                this._fieldIds.push(id);
            case BxmlExportValueTypes.ModField:
                this._templateId = "{{" + id + "}}";
                break;
            default:
                this._templateId = "";
        }
    }
    BxmlExportTemplate.prototype.AddToTemplate = function (barsIndex, fieldId, type, helper) {
        var helperParams = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            helperParams[_i - 4] = arguments[_i];
        }
        var fieldTemplate = null;
        if (type === BxmlExportValueTypes.Const) {
            fieldTemplate = fieldId;
        }
        else {
            if (helper) {
                fieldTemplate = helper + " @field";
                if (helperParams) {
                    for (var _a = 0, helperParams_1 = helperParams; _a < helperParams_1.length; _a++) {
                        var param = helperParams_1[_a];
                        fieldTemplate += " " + param;
                    }
                }
            }
            if (type === BxmlExportValueTypes.Field) {
                this._fieldIds.push(fieldId);
            }
            fieldTemplate = "{{" + (fieldTemplate ? fieldTemplate.replace("@field", fieldId) : fieldId) + "}}";
        }
        this._templateBody += " b" + barsIndex + "=\"" + fieldTemplate + "\"";
    };
    BxmlExportTemplate.prototype.InsertField = function (barsIndex, fieldParam, helper) {
        var helperParams = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            helperParams[_i - 3] = arguments[_i];
        }
        var fieldId = typeof fieldParam === "string" ? fieldParam : fieldParam.Id;
        this.AddToTemplate.apply(this, [barsIndex, fieldId, BxmlExportValueTypes.Field, helper].concat(helperParams));
    };
    BxmlExportTemplate.prototype.InsertGenField = function (barsIndex, year, fieldParam, helper) {
        var helperParams = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            helperParams[_i - 4] = arguments[_i];
        }
        var fieldId = fieldParam instanceof BaseGenericObasTableField
            ? fieldParam.GenerateId(year)
            : "" + fieldParam.Id + year;
        this.AddToTemplate.apply(this, [barsIndex, fieldId, BxmlExportValueTypes.Field, helper].concat(helperParams));
    };
    BxmlExportTemplate.prototype.InsertDynField = function (barsIndex, fieldId, helper) {
        var helperParams = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            helperParams[_i - 3] = arguments[_i];
        }
        this.AddToTemplate.apply(this, [barsIndex, fieldId, BxmlExportValueTypes.ModField, helper].concat(helperParams));
    };
    BxmlExportTemplate.prototype.InsertConst = function (barsIndex, value) {
        this.AddToTemplate(barsIndex, value, BxmlExportValueTypes.Const);
    };
    Object.defineProperty(BxmlExportTemplate.prototype, "Template", {
        get: function () {
            return "<a ID=\"" + this._templateId + "\"" + this._templateBody + " />";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BxmlExportTemplate.prototype, "FieldIds", {
        get: function () {
            return this._fieldIds;
        },
        enumerable: true,
        configurable: true
    });
    return BxmlExportTemplate;
}());
var BxmlExportHelper = (function () {
    function BxmlExportHelper() {
    }
    BxmlExportHelper.InsertRequiredData = function (data, requiredIds, template) {
        var insertIds = requiredIds.filter(function (id) {
            return !data.Data.some(function (bxmlRow) {
                return bxmlRow.indexOf("ID=\"" + id + "\"") > -1;
            });
        });
        for (var _i = 0, insertIds_1 = insertIds; _i < insertIds_1.length; _i++) {
            var id = insertIds_1[_i];
            data.Data.push(template.replace(/{{${BxmlExportHelper.RegisteredHelpers.NumberToStr} [a - z_\s\d] *}}/gi, "0").replace(/{{[a-z_\s\d]*}}/gi, "").replace(/ID="[a-z_0-9]*"/, "ID=\"" + id + "\""));
        }
        return data;
    };
    BxmlExportHelper.ExportYearToBars = function (year) {
        if (year == null) {
            return "";
        }
        var date = new Date(year || 0, 0, 1);
        return ObasHelper.ConvertToString(date);
    };
    return BxmlExportHelper;
}());
BxmlExportHelper.RegisteredHelpers = {
    DateToStr: "DateToStr",
    YearToBars: "YearToBars",
    NumberToStr: "NumberToStr",
    EscapeExp: "EscapeExp"
};
var BaseExportRules = (function () {
    function BaseExportRules(_formExportType, _document) {
        this._formExportType = _formExportType;
        this._document = _document;
        this._formId = null;
        this._templatesPath = ObasStageSettings.TemplateDirectory + "\\bxml\\";
    }
    Object.defineProperty(BaseExportRules.prototype, "FormId", {
        get: function () {
            if (this._formId == null) {
                var versions = ObasTableCollection.RroObasVersionsTable;
                if (versions.LocateByKeys(this._document.ObasVersion)) {
                    this._formId = "\u041E\u0411\u0410\u0421";
                    var rroObas = ObasTableCollection.RroObasTable;
                    if (rroObas.LocateByKeys(versions.RroObasKey.Value)) {
                        var obasSpr = ObasTableCollection.ObasSprTable;
                        if (obasSpr.LocateByKeys(rroObas.Obas.ForeignKey.Value)) {
                            var obasCodeParts = obasSpr.OldCode.Value.split(".");
                            if (obasCodeParts.length >= 3) {
                                this._formId += BaseExportRules.Delimiter;
                                this._formId += obasCodeParts[1];
                                this._formId += BaseExportRules.Delimiter;
                                this._formId += obasCodeParts[2];
                            }
                        }
                    }
                }
            }
            return this._formId;
        },
        enumerable: true,
        configurable: true
    });
    BaseExportRules.prototype.GenerateBxmlData = function () {
        var templateName;
        switch (this._formExportType) {
            case FormExportToBarsTypes.WithOrganizations:
                templateName = "BaseOrgTemplate";
                break;
            default:
                templateName = "BaseTemplate";
        }
        var templateData = Client.GetFileData(this._templatesPath + (templateName + ".xml"));
        var innerTemplate = Client.GetFileData(this._templatesPath + "InnerTemplate.txt");
        Handlebars.registerPartial("innerData", innerTemplate);
        Handlebars.registerHelper(BxmlExportHelper.RegisteredHelpers.DateToStr, ObasHelper.ConvertToString);
        Handlebars.registerHelper(BxmlExportHelper.RegisteredHelpers.YearToBars, BxmlExportHelper.ExportYearToBars);
        Handlebars.registerHelper(BxmlExportHelper.RegisteredHelpers.NumberToStr, function (value, precision) {
            return ObasHelper.ConvertToString(value || 0, precision);
        });
        Handlebars.registerHelper(BxmlExportHelper.RegisteredHelpers.EscapeExp, Handlebars.escapeExpression);
        var templateObj = Handlebars.compile(templateData);
        return templateObj(this.CreateFormInfo());
    };
    BaseExportRules.prototype.SilentExportToBars = function (exportDirectory) {
        return this.ExportToBars(false, false, exportDirectory);
    };
    BaseExportRules.prototype.ExportToBars = function (showMessage, showDialog, exportDirectory) {
        if (showMessage === void 0) { showMessage = true; }
        if (showDialog === void 0) { showDialog = false; }
        var fileName;
        if (exportDirectory == null) {
            exportDirectory = ObasHelper.GetExportDirectory();
        }
        if (showDialog || exportDirectory == null || exportDirectory.length === 0) {
            exportDirectory = Client.SelectDirectory("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0430\u043F\u043A\u0443 \u0434\u043B\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432", exportDirectory);
        }
        if (exportDirectory != null && exportDirectory.length > 0) {
            if (exportDirectory.lastIndexOf("\\") !== (exportDirectory.length - 1)) {
                exportDirectory += "\\";
            }
            var fileNameParts = [];
            var params = this._document.MainParametersTable;
            var fileType = this._document.FileType;
            fileNameParts.push((fileType === DocumentFileType.Stage1Obas ? 3 : fileType).toString());
            if (fileType === DocumentFileType.IssuesStage1Obas) {
                fileNameParts.push(this._document.MainParametersTable.ObasVersion.SourceTable.VersionNumber.Value.toString());
            }
            fileNameParts.push(params.Foiv.Code);
            fileNameParts.push(params.CalcFcrSectionCode());
            fileNameParts.push(params.CalcFcrSubSectionCode());
            fileNameParts.push(params.GovermentProgram.Code);
            fileNameParts.push(params.CalcSubprogramCode());
            fileNameParts.push(ObasExportHelper.GetActionCode(params));
            fileNameParts.push(params.DirectionCost.Code);
            fileNameParts.push(params.CostType.Code);
            var versions = ObasTableCollection.RroObasVersionsTable;
            if (versions.LocateByKeys(this._document.ObasVersion)) {
                var rroData = ObasTableCollection.RroDataTable;
                if (rroData.LocateByKeys(versions.RroDataKey.Value)) {
                    fileNameParts.push(rroData.Department.Code);
                }
            }
            fileNameParts.push(this.FormId);
            var now = new Date();
            fileNameParts.push(ObasHelper.FillWithCharacter(now.getDate(), 2));
            fileNameParts.push(ObasHelper.FillWithCharacter(now.getMonth() + 1, 2));
            fileNameParts.push(ObasHelper.FillWithCharacter(now.getFullYear(), 2));
            fileNameParts.push(ObasHelper.FillWithCharacter(now.getHours(), 2));
            fileNameParts.push(ObasHelper.FillWithCharacter(now.getMinutes(), 2));
            fileNameParts.push(ObasHelper.FillWithCharacter(now.getSeconds(), 2));
            fileName = exportDirectory + fileNameParts.join(BaseExportRules.Delimiter) + ".bxml";
            Client.SetFileData(fileName, this.GenerateBxmlData());
            if (showMessage) {
                Client.ShowMessage("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F", "\u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u044B\u0433\u0440\u0443\u0436\u0435\u043D\u044B \u0432:\n" + (Client.GetCurrentDirectory() + fileName), MessageIcons.Information);
            }
        }
        return fileName;
    };
    BaseExportRules.prototype.CreateTableInfo = function (source, fieldsId, template, id, recordModifier, recordFilter) {
        if (id == null) {
            id = source.Id;
        }
        var templateObj = Handlebars.compile(template);
        var srcData = source.GetData(fieldsId, recordModifier, recordFilter).map(function (item) {
            return templateObj(item);
        });
        return { Id: id, Data: srcData };
    };
    BaseExportRules.prototype.CreateLocatedTableInfo = function (source, fieldsId, template, keyFieldIds, keyFieldValuesCollection, id, recordModifier) {
        if (id == null) {
            id = source.Id;
        }
        var templateObj = Handlebars.compile(template);
        var srcData = [];
        for (var i = 0; i < keyFieldValuesCollection.length; i++) {
            srcData = srcData.concat(source.GetLocatedData(keyFieldIds, keyFieldValuesCollection[i], fieldsId, recordModifier).map(function (item) {
                return templateObj(item);
            }));
        }
        return { Id: id, Data: srcData };
    };
    BaseExportRules.prototype.CreateCustomTableInfo = function (id, template, tableData) {
        var templateObj = Handlebars.compile(template);
        var srcData = [];
        for (var i = 0; i < tableData.length; i++) {
            srcData = srcData.concat(templateObj(tableData[i]));
        }
        return { Id: id, Data: srcData };
    };
    return BaseExportRules;
}());
BaseExportRules.Delimiter = "_";
var SimpleFormExportRules = (function (_super) {
    __extends(SimpleFormExportRules, _super);
    function SimpleFormExportRules(document) {
        return _super.call(this, FormExportToBarsTypes.Simple, document) || this;
    }
    SimpleFormExportRules.prototype.CreateFormInfo = function () {
        var formInfo = {
            Id: this.FormId,
            Foiv: this._document.MainParametersTable.Foiv.Name,
            IsSecret: this._document.IsSecret,
            Tables: this.GetTables(),
            IsIssuesStage1Obas: this._document.FileType === DocumentFileType.IssuesStage1Obas,
            IssueContent: ObasTableCollection.RroObasVersionsTable.IssueContent.LookupByKeys(this._document.ObasVersion),
            IssueJustification: ObasTableCollection.RroObasVersionsTable.IssueJustification.LookupByKeys(this._document.ObasVersion),
            IssueComment: ObasTableCollection.RroObasVersionsTable.IssueComment.LookupByKeys(this._document.ObasVersion)
        };
        return formInfo;
    };
    return SimpleFormExportRules;
}(BaseExportRules));
var BaseOrgFormExportRules = (function (_super) {
    __extends(BaseOrgFormExportRules, _super);
    function BaseOrgFormExportRules(document) {
        return _super.call(this, FormExportToBarsTypes.WithOrganizations, document) || this;
    }
    BaseOrgFormExportRules.prototype.CreateFormInfo = function () {
        var formInfo = {
            Id: this.FormId,
            Organizations: this.GetOrgs()
        };
        return formInfo;
    };
    BaseOrgFormExportRules.prototype.GetOrgs = function () {
        var result = [];
        var doTable = this._document.UniqueOrgsTable;
        var reader = doTable.CreateReader();
        var foiv = this._document.MainParametersTable.Foiv.Name;
        var isSecret = this._document.IsSecret;
        while (reader.Read()) {
            var orgInfo = {
                Id: doTable.Org.Code,
                Foiv: foiv,
                IsSecret: isSecret,
                AuthType: this.GetAuthType(),
                Tables: this.GetTables(doTable.RecordKey.Value)
            };
            result.push(orgInfo);
        }
        this._document.ClearAllLocateFlags();
        return result;
    };
    return BaseOrgFormExportRules;
}(BaseExportRules));
var SpecialOrgFormExportRules = (function (_super) {
    __extends(SpecialOrgFormExportRules, _super);
    function SpecialOrgFormExportRules(document) {
        return _super.call(this, FormExportToBarsTypes.WithOrganizations, document) || this;
    }
    SpecialOrgFormExportRules.prototype.CreateFormInfo = function () {
        var formInfo = {
            Id: this.FormId,
            Organizations: this.GetOrgs()
        };
        return formInfo;
    };
    SpecialOrgFormExportRules.prototype.GetOrgs = function () {
        var result = [];
        var paramTable = this._document.MainParametersTable;
        var orgSpr = ObasTableCollection.OrganizationTable;
        var orgKey = orgSpr.GetGrbsOrg(paramTable.Foiv.ForeignKey.Value);
        var orgInfo = {
            Id: orgSpr.Code.Value,
            Foiv: paramTable.Foiv.Name,
            IsSecret: true,
            Tables: this.GetTables(),
            IsIssuesStage1Obas: this._document.FileType === DocumentFileType.IssuesStage1Obas,
            IssueContent: ObasTableCollection.RroObasVersionsTable.IssueContent.LookupByKeys(this._document.ObasVersion),
            IssueJustification: ObasTableCollection.RroObasVersionsTable.IssueJustification.LookupByKeys(this._document.ObasVersion),
            IssueComment: ObasTableCollection.RroObasVersionsTable.IssueComment.LookupByKeys(this._document.ObasVersion)
        };
        result.push(orgInfo);
        this._document.ClearAllLocateFlags();
        return result;
    };
    return SpecialOrgFormExportRules;
}(BaseExportRules));
var OrgFormExportRules = (function (_super) {
    __extends(OrgFormExportRules, _super);
    function OrgFormExportRules() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrgFormExportRules.prototype.GetAuthType = function () {
        return null;
    };
    return OrgFormExportRules;
}(BaseOrgFormExportRules));
var TypedOrgFormExportRules = (function (_super) {
    __extends(TypedOrgFormExportRules, _super);
    function TypedOrgFormExportRules(document) {
        return _super.call(this, document) || this;
    }
    TypedOrgFormExportRules.prototype.GetAuthType = function () {
        return this._document.UniqueOrgsTable.AuthorityType.Code;
    };
    return TypedOrgFormExportRules;
}(BaseOrgFormExportRules));
var BaseImportRules = (function () {
    function BaseImportRules(_document) {
        this._document = _document;
        this._isStandardMode = true;
    }
    BaseImportRules.prototype.ImportBarsData = function (fileName) {
        if (fileName.indexOf(this._document.ExportRules.FormId) > -1) {
            this._document.StartUpdate();
            this._document.EnableRules = true;
            this.InnerImport();
            this._document.EndUpdate();
            this._document.Sheets.forEach(function (sheetId, sheet) {
                sheet.Refresh();
            });
            if (this._isStandardMode) {
                Client.ShowMessage("Информация", "Данные успешно загружены в форму!", MessageIcons.Information);
            }
        }
        else if (this._isStandardMode) {
            Client.ShowMessage("Ошибка", "Выбранный файл не подходит для импорта данных в данную форму ОБАС!", MessageIcons.Error);
        }
    };
    BaseImportRules.prototype.SilentImportBarsData = function (filePath) {
        this._isStandardMode = false;
        var result = this.Document.LoadBarsTables(filePath);
        this._isStandardMode = true;
        return result;
    };
    Object.defineProperty(BaseImportRules.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    BaseImportRules.prototype.GetTable = function (barsTableId) {
        return new BarsObasTable(barsTableId);
    };
    return BaseImportRules;
}());
var BaseInterfaceRules = (function () {
    function BaseInterfaceRules(_document) {
        this._document = _document;
    }
    Object.defineProperty(BaseInterfaceRules.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    BaseInterfaceRules.prototype.ShiftDataMenuItemClickEventHandler = function () {
        this.Document.UpdateRules.ShiftData();
        this.Document.RefreshSeet();
    };
    BaseInterfaceRules.prototype.CopyDataMenuItemClickEventHandler = function () {
        this.Document.UpdateRules.CopyData();
        this.Document.RefreshSeet();
    };
    BaseInterfaceRules.prototype.RecalcDataMenuItemClickEventHandler = function () {
        this.Document.UpdateRules.RecalcData();
        this.Document.RefreshSeet();
    };
    return BaseInterfaceRules;
}());
var BaseUpdateRules = (function () {
    function BaseUpdateRules(_document) {
        this._document = _document;
    }
    Object.defineProperty(BaseUpdateRules.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    BaseUpdateRules.prototype.UpdateTemplate = function (oldVersion, currentVersion) {
        this._document.StartUpdate();
        this.InnerUpdate(oldVersion, currentVersion);
        this._document.EndUpdate();
    };
    BaseUpdateRules.prototype.RecalcData = function () {
        var curState = new UpdateDocSettingsState(this._document);
        this._document.StartUpdate();
        var collectedData = new collections.Dictionary();
        for (var _i = 0, _a = this.RecalcedDataTables; _i < _a.length; _i++) {
            var table = _a[_i];
            collectedData.setValue(table.Id, table.CollectUserData());
        }
        for (var _b = 0, _c = this.RecalcedDataTables; _b < _c.length; _b++) {
            var table = _c[_b];
            table.ResetData();
        }
        for (var _d = 0, _e = this.ResetDataTables; _d < _e.length; _d++) {
            var table = _e[_d];
            table.ResetData();
        }
        this._document.EnableRules = true;
        for (var _f = 0, _g = this.RecalcedDataTables; _f < _g.length; _f++) {
            var table = _g[_f];
            table.SetupTableData(collectedData.getValue(table.Id));
        }
        this._document.EndUpdate();
        curState.RestoreState();
    };
    BaseUpdateRules.prototype.CopyData = function (srcYear, destYear) {
        for (var _i = 0, _a = this.CopyDataTables; _i < _a.length; _i++) {
            var table = _a[_i];
            table.CopyData(srcYear, destYear);
        }
    };
    BaseUpdateRules.prototype.ShiftData = function () {
        var _this = this;
        var curState = new UpdateDocSettingsState(this._document);
        this._document.StartUpdate();
        this._document.EnableRules = true;
        ObasHelper.DeleteOldData.apply(ObasHelper, this.DeleteYearTables);
        this._document.EnableRules = false;
        var _loop_1 = function (info) {
            var srcFields = [];
            var destFields = [];
            this_1._document.IterateByYears(function (yearIndex) {
                (_a = _this._document.CommonRules).ShiftFieldGenerator.apply(_a, [yearIndex, srcFields, destFields].concat(info.GenericFields));
                var _a;
            });
            this_1._document.CommonRules.ShiftTableData(info.Table, srcFields, destFields);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.ShiftYearTables; _i < _a.length; _i++) {
            var info = _a[_i];
            _loop_1(info);
        }
        this._document.EndUpdate();
        curState.RestoreState();
    };
    BaseUpdateRules.prototype.CanUpdateTo = function (version) {
        return ObasHelper.CanUpdateTo(this.Document, version);
    };
    return BaseUpdateRules;
}());
var AddYearsDocumentHelper = (function () {
    function AddYearsDocumentHelper(_document) {
        this._document = _document;
    }
    AddYearsDocumentHelper.prototype.GetDollarRateYearsFieldRangeEventHandler = function (sheetId) {
        if (sheetId === void 0) { sheetId = ""; }
        return this._document.CommonRules.GetDollarRateYearsFieldRangeEventHandler(sheetId, this._document.MainDataYearsCount);
    };
    AddYearsDocumentHelper.prototype.GetAddDollarRateYearsFieldRangeEventHandler = function (sheetId) {
        if (sheetId === void 0) { sheetId = ""; }
        var result = [];
        for (var i = ObasStageSettings.YearsCount; i < this._document.Settings.YearsCount; i++) {
            result.push(i);
        }
        return result;
    };
    AddYearsDocumentHelper.prototype.GetYearsFieldRangeEventHandler = function (sheetId) {
        if (sheetId === void 0) { sheetId = ""; }
        return this._document.CommonRules.GetYearsFieldRangeEventHandler(sheetId, this._document.MainDataYearsCount);
    };
    AddYearsDocumentHelper.prototype.GetAddYearsFieldRangeEventHandler = function (sheetId) {
        if (sheetId === void 0) { sheetId = ""; }
        var result = [];
        for (var i = ObasStageSettings.YearsCount + 1; i <= this._document.Settings.YearsCount; i++) {
            result.push(i);
        }
        return result;
    };
    return AddYearsDocumentHelper;
}());
