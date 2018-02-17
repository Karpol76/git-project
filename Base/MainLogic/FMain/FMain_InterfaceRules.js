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
var FMain;
(function (FMain) {
    var ExportTypes;
    (function (ExportTypes) {
        ExportTypes[ExportTypes["ToBars"] = 0] = "ToBars";
        ExportTypes[ExportTypes["ToExcel"] = 1] = "ToExcel";
    })(ExportTypes || (ExportTypes = {}));
    var InterfaceRules = (function () {
        function InterfaceRules(document) {
            this._document = document;
        }
        InterfaceRules.prototype.SilentFormExport = function (exportType, fileType, obasVersion, exportDirectory) {
            var result = false;
            var fileId = this.OpenObasFile(fileType, obasVersion, false, false, true);
            var exportHandler;
            switch (exportType) {
                case ExportTypes.ToBars:
                    exportHandler = "ExportRules";
                    break;
                case ExportTypes.ToExcel:
                    exportHandler = "CommonRules";
                    break;
                default:
                    throw new Error("Указанный массовый экспорт не поддерживается!");
            }
            if (fileId != null) {
                Client.SendMessage(fileId, "%Doc%." + exportHandler + ".SilentExport" + ExportTypes[exportType], [exportDirectory]);
                Client.CloseDocument(fileId);
                result = true;
            }
            return result;
        };
        InterfaceRules.prototype.CalcExclamatorySign = function (value1, value2) {
            var result = "";
            if (value1 !== value2) {
                result = "!";
            }
            return result;
        };
        InterfaceRules.prototype.SelectFoiv = function () {
            var editor = this._document.RecipientDetailsEditor;
            if (editor.SourceTable.RowCount === 0) {
                var result = this._document.RecipientDetailsEditor.Show();
                if (!result) {
                    Client.Exit();
                }
            }
            this.SetFormLables();
        };
        InterfaceRules.prototype.SetFormLables = function () {
            Client.SetComponentText(ClientComponents.lblFoiv, ObasTableCollection.SelectedFoivTable.Foiv.Name);
        };
        InterfaceRules.prototype.ExportAllForms = function (exportType, fileType) {
            var _this = this;
            var exportDirectory = ObasHelper.GetExportDirectory();
            var count = 0;
            var exportResult;
            switch (exportType) {
                case ExportTypes.ToBars:
                    exportResult = {
                        Result: "завершена",
                        Type: { NomName: "Выгрузка", GenName: "выгрузки" }
                    };
                    break;
                case ExportTypes.ToExcel:
                    exportResult = {
                        Result: "завершен",
                        Type: { NomName: "Экспорт", GenName: "экспорта" }
                    };
                    break;
                default:
                    throw new Error("Указанный массовый экспорт не поддерживается!");
            }
            if (exportDirectory != null) {
                var obasSheet_1 = this._document.ObasSheet;
                var obasSheetTable_1 = obasSheet_1.Table;
                if (obasSheetTable_1.RowCount > 0) {
                    var obasVersions_1 = ObasTableCollection.RroObasVersionsTable;
                    var iterateHandler = function () {
                        if (!obasVersions_1.IsSynonymRow.Value) {
                            var obasVersion = obasVersions_1.Version.Value;
                            if (!obasSheet_1.IsRowFiltered(obasSheetTable_1.LookupBySourceTable(obasVersions_1, obasVersion, BaseObasTableFields.RecordKeyField.Id))) {
                                if (_this.SilentFormExport(exportType, fileType, obasVersion, exportDirectory)) {
                                    count++;
                                }
                            }
                        }
                    };
                    obasVersions_1.Iterate(iterateHandler, true);
                }
                var message = void 0;
                if (count > 0) {
                    message = exportResult.Type
                        .NomName + " " + count + " \u0444\u0430\u0439\u043B\u0430(\u043E\u0432) \u0443\u0441\u043F\u0435\u0448\u043D\u043E " + exportResult
                        .Result + ".\n\u0424\u0430\u0439\u043B\u044B \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u043F\u043E \u043F\u0443\u0442\u0438: " + (Client.GetCurrentDirectory() + exportDirectory);
                }
                else {
                    message = "\u041D\u0435\u0442 \u0444\u0430\u0439\u043B\u043E\u0432 \u0434\u043B\u044F " + exportResult.Type.GenName;
                }
                Client.ShowMessage(exportResult.Type
                    .NomName + " " + exportResult.Result, message, MessageIcons.Information);
            }
        };
        InterfaceRules.prototype.UpdateAllObasFilesMenuItemClickEventHandler = function () {
            var _this = this;
            var obasVersions = ObasTableCollection.RroObasVersionsTable;
            var updateVersionHandler = function () {
                if (!obasVersions.IsSynonymRow.Value) {
                    var obasVersion = obasVersions.Version.Value;
                    var outlayStatus = obasVersions.RroOutlayKey.SourceTable.Status;
                    var isApproved = outlayStatus === OutlayStatuses.Approved;
                    _this._document.UpdateRules.SaveUpdatedFile(isApproved ? DocumentFileType.Source : ObasStageSettings.FileType, obasVersion);
                    _this._document.UpdateRules.SaveUpdatedFile(ObasStageSettings.DeltaFileType, obasVersion);
                }
            };
            obasVersions.Iterate(updateVersionHandler, true);
        };
        InterfaceRules.prototype.ExportAttach = function (num) {
            var docId = Client.OpenDocument("OutlayAttach" + num + "Template.xml", "OutlayAttach" + num + "Template.xml", true);
            Client.SetDocumentTitle(docId, "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 " + num);
            Client.SendMessage(docId, "%Doc%.InterfaceRules.HideLables", []);
            Client.SendMessage(docId, "%Doc%.InterfaceRules.SilentExport", [ObasHelper.GetExportDirectory()]);
            Client.CloseDocument(docId);
        };
        InterfaceRules.prototype.ExportAttach1ToExcelMenuItemClickEventHandler = function () {
            this.ExportAttach(1);
        };
        InterfaceRules.prototype.ExportAttach2ToExcelMenuItemClickEventHandler = function () {
            this.ExportAttach(2);
        };
        InterfaceRules.prototype.ExportAllToExcelMenuItemClickEventHandler = function () {
            this.ExportAllForms(ExportTypes.ToExcel, ObasStageSettings.FileType);
        };
        InterfaceRules.prototype.ExportAllDeltaToExcelMenuItemClickEventHandler = function () {
            this.ExportAllForms(ExportTypes.ToExcel, ObasStageSettings.DeltaFileType);
        };

        InterfaceRules.prototype.ExportAddAnalysisIndicator = function (exportDirectory) {
            var xlsTemplateFileName = ObasStageSettings.ExcelTemplateDirectory + "\\AddAnalysisIndicatorList.xls";
            var xlsFileName = "\u0421\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A \u043A\u043E\u0434\u043E\u0432 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0435\u0439.xls";
            this._document.ExportToExcel(xlsTemplateFileName, xlsFileName, false, false, exportDirectory);
        };
        InterfaceRules.prototype.ExportAddAnalysisIndicatorToExcelMenuItemClickEventHandler = function () {
            var docId = Client.OpenDocument("AddAnalysisIndicatorTemplate.xml", "AddAnalysisIndicatorTemplate.xml", true);
            Client.SetDocumentTitle(docId, "\u0421\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A \u043A\u043E\u0434\u043E\u0432 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0435\u0439");
            Client.SendMessage(docId, "%Doc%.InterfaceRules.ExportAddAnalysisIndicator", [ObasHelper.GetExportDirectory()]);
            Client.CloseDocument(docId);
        };
        InterfaceRules.prototype.ImportToAddAnalysisIndicatorMenuItemClickEventHandler = function () {
            var filePath = Client.SelectFile("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A \u043A\u043E\u0434\u043E\u0432 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0435\u0439", "\u0414\u0430\u043D\u043D\u044B\u0435 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430 (*.xls) | *.xls");
            if (filePath && Client.IsFileExists(filePath)) {
                var count = 0;
                Client.SetCursorType(TypeCursor.crHourGlass);
                count = ObasTableCollection.AddAnalysisIndicatorSprTable.ImportData(this._document.LoadExcelFile(filePath));
//                count = ObasTableCollection.AddAnalysisIndicatorSprTable.ImportData(Client.GetFileData(filePath));
                Client.SetCursorType(TypeCursor.crDefault);
                if (count > 0) {
                    Client.ShowMessage("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F", "\u0418\u0437 \u0444\u0430\u0439\u043B\u0430: " + filePath + "\n\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E " + count + " \u0441\u0442\u0440\u043E\u043A", MessageIcons.Information);
                }
                else {
                    Client.ShowMessage("\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435", "\u0412 \u0444\u0430\u0439\u043B\u0435: " + filePath + "\n\u0414\u0430\u043D\u043D\u044B\u0445 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430 \u043A\u043E\u0434\u043E\u0432 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0435\u0439 \u043D\u0435\u0442", MessageIcons.Warning);
                }
            }
            else {
                Client.ShowMessage("\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435", "\u0424\u0430\u0439\u043B \u0441 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D.\n\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430.", MessageIcons.Warning);
            }
            //            this._document.ShowEditor("AddAnalysisIndicator");
        };
        InterfaceRules.prototype.ImportToOKPDMenuItemClickEventHandler = function () {
            var filePath = Client.SelectFile("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A \u041E\u041A\u041F\u0414", "\u0414\u0430\u043D\u043D\u044B\u0435 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430 (*.xls) | *.xls");
            if (filePath && Client.IsFileExists(filePath)) {
                var count = 0;
                Client.SetCursorType(TypeCursor.crHourGlass);
                count = ObasTableCollection.OkpdSprTable.ImportData(this._document.LoadExcelFile(filePath));
                Client.SetCursorType(TypeCursor.crDefault);
                if (count > 0) {
                    Client.ShowMessage("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F", "\u0418\u0437 \u0444\u0430\u0439\u043B\u0430: " + filePath + "\n\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E " + count + " \u0441\u0442\u0440\u043E\u043A", MessageIcons.Information);
                }
                else {
                    Client.ShowMessage("\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435", "\u0412 \u0444\u0430\u0439\u043B\u0435: " + filePath + "\n\u0414\u0430\u043D\u043D\u044B\u0445 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430 \u041E\u041A\u041F\u0414 \u043D\u0435\u0442", MessageIcons.Warning);
                }
            }
            else {
                Client.ShowMessage("\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435", "\u0424\u0430\u0439\u043B \u0441 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D.\n\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430.", MessageIcons.Warning);
            }
        };

        InterfaceRules.prototype.PrintSettingsMenuItemClickEventHandler = function () {
            this._document.ShowEditor("PrintSettingsEditor");
        };
        InterfaceRules.prototype.UpdateRROMenuItemClickEventHandler = function () {
            var _this = this;
            var versions = ObasTableCollection.RroObasVersionsTable;
            var rroObas = ObasTableCollection.RroObasTable;
            var canRefreshSheets = false;
            var progressBar = new ProgressBar("\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0420\u0420\u041E...", rroObas.RowCount + versions.RowCount);
            versions.Iterate(function () {
                if (!versions.IsSynonymRow.Value) {
                    var obasVersion = versions.Version.Value;
                    _this._document.TableRules.UpdateVersionFromFile(ObasStageSettings.FileType, obasVersion);
                    _this._document.TableRules.UpdateVersionFromFile(ObasStageSettings.DeltaFileType, obasVersion);
                }
                progressBar.DoStep();
            }, true);
            rroObas.Iterate(function () {
                if (versions.LocateByKeys(rroObas.LastApprovedVersion.Value)) {
                    for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                        rroObas.SetFieldValue("Y" + i + "_D", versions.GetFieldValue("Y" + i + "_D"));
                        rroObas.SetFieldValue("Y" + i, versions.GetFieldValue("Y" + i));
                        canRefreshSheets = true;
                    }
                }
                progressBar.DoStep();
            }, true);
            if (canRefreshSheets) {
                this._document.ObasSheet.Refresh();
            }
            progressBar.Hide();
        };
        InterfaceRules.prototype.ObasCanAddEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var result = true;
            if (column < 9) {
                result = !this._document.IsReadOnly;
            }
            return result;
        };
        InterfaceRules.prototype.ObasCanEditEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheetTable = this._document.Sheets.getValue(sheetId).Table;
            if (column < 9 || column === 13) {
                return (!this._document.IsReadOnly && sheetTable.GetFieldValue(fieldId) != null);
            }
            else {
                return sheetTable.GetKeyBySourceTable(ObasTableCollection.RroObasVersionsTable) != null;
            }
        };
        InterfaceRules.prototype.ObasCanDeleteEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheetTable = this._document.Sheets.getValue(sheetId).Table;
            return (column >= 9 || (column < 9 && !this._document.IsReadOnly && sheetTable.GetFieldValue(fieldId) != null));
        };
        InterfaceRules.prototype.GetNextYearsRangeEventHandler = function () {
            var result = [];
            for (var i = 2; i <= ObasStageSettings.YearsCount; i++) {
                result.push(i.toString());
            }
            return result;
        };
        InterfaceRules.prototype.GetNextYearsCaptionEventHandler = function (sheetId, index, fieldId, partName) {
            return (ObasStageSettings.CurrentYear + index + 1).toString();
        };
        InterfaceRules.prototype.GetCurrYearsRangeEventHandler = function () {
            return ["1"];
        };
        InterfaceRules.prototype.GetCurrYearsCaptionEventHandler = function (sheetId, index, fieldId, partName) {
            return ObasStageSettings.CurrentYear.toString();
        };
        InterfaceRules.prototype.AuthDetailsSprMenuItemClick = function () {
            var result = this._document.RecipientDetailsEditor.Show();
            if (result) {
                this.SetFormLables();
            }
        };
        InterfaceRules.prototype.AnalyticIndicatorsSprMenuItemClick = function () {
            this._document.AnalyticIndicatorsListEditor.Show();
        };
        InterfaceRules.prototype.SignsSprMenuItemClick = function () {
            this._document.ShowEditor(ObasTableCollection.RroObasRecvisitsTable.Id);
        };
        InterfaceRules.prototype.OKPDSprMenuItemClick = function () {
            this._document.OKPDListEditor.Show();
        };
        InterfaceRules.prototype.VultureSprMenuItemClick = function () {
            this._document.ShowEditor(ObasTableCollection.RroSecurityTypeTable.Id);
        };
        InterfaceRules.prototype.SetupRequisitesMenuItemClickEventHandler = function () {
            this._document.ShowEditor("SetupRequisites_Editor");
        };
        InterfaceRules.prototype.UpdateFormMenuItemClickEventHandler = function () {
            var fileToUpdate = Client.SelectFile("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F", "*.xml");
            if (fileToUpdate != null) {
                var templateFile = Client.SelectFile("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0431\u043B\u043E\u043D \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F", "*.xml");
                if (templateFile != null) {
                    Client.UpdateDocument(templateFile, fileToUpdate);
                    Client.ShowMessage("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F", "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E", MessageIcons.Information);
                }
            }
        };
        InterfaceRules.prototype.ObasShowEditorInListEventHandler = function (sheetId, row, column, fieldId, rowLevel, editorId) {
            var result = !this._document.IsReadOnly;
            switch (editorId) {
                case "KBKEditor":
                    result = (result && (column <= 6 || column === 13));
                    break;
                case "OBASEditor":
                    result = (result && (column === 7 || column === 8));
                    break;
                default:
                    result = column > 8;
            }
            return result;
        };
        InterfaceRules.prototype.CheckFoivCanCloseEventHandler = function (modalResult) {
            var selectedFoivTable = ObasTableCollection.SelectedFoivTable;
            var foivKey = selectedFoivTable.Foiv.ForeignKey.Value;
            if (foivKey == null) {
                foivKey = 0;
            }
            if (foivKey === 0 || modalResult === MessageResults.Cancel) {
                if (Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0413\u0420\u0411\u0421 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0439 \u0440\u0430\u0431\u043E\u0442\u044B. \u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B?", MessageIcons.Error, MessageButtons.YesNoCancel) ===
                    MessageResults.Yes) {
                    Client.Exit();
                }
                return false;
            }
            else {
                Client.SetComponentText(ClientComponents.lblFoiv, selectedFoivTable.Foiv.Name);
                return true;
            }
        };
        InterfaceRules.prototype.ChangeExportDirectoryClickEventHandler = function () {
            var defaultDir = ObasHelper.GetStartExportDirectiry();
            var result = Client.SelectDirectory("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0430\u043F\u043A\u0443 \u0434\u043B\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432", defaultDir);
            if (result != null && result.length > 0 && Client.IsDirectoryExists(result)) {
                ObasTableCollection.BuildParamsTable.ExportDirectory.Value = result;
            }
        };
        InterfaceRules.prototype.CheckDuplicateKeysMenuItemClickEventHandler = function () {
            var _this = this;
            var versTable = ObasTableCollection.RroObasVersionsTable;
            var message;
            versTable.Iterate(function (table, key) {
                var fileId = _this.OpenObasFile(ObasStageSettings.FileType, key, false, false, true);
                if (fileId != null) {
                    var result = Client.ChangeDuplicateKeys(fileId);
                    if (result != null) {
                        message += fileId + "\n\n" + result + "\n\n";
                    }
                    Client.CloseDocument(fileId);
                }
            });
            if (message == null) {
                message = "Документы не содержат дублирующихся ключей";
            }
            Client.ShowMessage("Результат проверки", message, MessageIcons.Information);
        };
        InterfaceRules.prototype.FixMultiRowObasMenuItemClickEventHandler = function () {
            var rroObasTable = ObasTableCollection.RroObasTable;
            var rroDataTable = ObasTableCollection.RroDataTable;
            var versTable = ObasTableCollection.RroObasVersionsTable;
            var rroKosguTable = ObasTableCollection.RroObasKosguTable;
            var yearsCnt = ObasStageSettings.YearsCount;
            while (rroObasTable.Locate(rroObasTable.IsMultiRow.Id, true, true)) {
                if (rroDataTable.LocateByKeys(rroObasTable.RroDataKey.Value)) {
                    var rroObasKey = rroObasTable.RecordKey.Value;
                    var costTypeCode = rroDataTable.CostType.Code;
                    var isInsuranceRow = ObasHelper.IsInsuranceCode(costTypeCode);
                    while (versTable.Locate(versTable.RroObasKey.Id, rroObasKey, true)) {
                        var data = [];
                        for (var k = 0; k < yearsCnt; k++) {
                            data[k] = {
                                Delta: 0,
                                Main: 0
                            };
                        }
                        var curVersion = versTable.Version.Value;
                        var kosguVersion = curVersion;
                        if (isInsuranceRow) {
                            kosguVersion = ObasHelper.GetSynonymVersion(curVersion);
                            versTable.LocateByKeys(curVersion);
                        }
                        while (rroKosguTable.Locate(rroKosguTable.RroVersionKey.Id, kosguVersion, true)) {
                            if ((isInsuranceRow && rroKosguTable.Kosgu.Code === "213") ||
                                !(isInsuranceRow || rroKosguTable.Kosgu.Code === "213")) {
                                for (var i = 0; i < yearsCnt; i++) {
                                    var fieldId = "Y" + (i + 1);
                                    var value = data[i];
                                    value.Main += rroKosguTable.GetFieldValue(fieldId);
                                    value.Delta += rroKosguTable.GetFieldValue(fieldId + "_D");
                                }
                            }
                        }
                        rroKosguTable.ClearLocateFlag();
                        for (var j = 0; j < yearsCnt; j++) {
                            var value = data[j];
                            var fieldId = "Y" + (j + 1);
                            versTable.SetFieldValue(fieldId, value.Main);
                            versTable.SetFieldValue(fieldId + "_D", value.Delta);
                        }
                    }
                }
            }
            versTable.ClearLocateFlag();
            rroObasTable.ClearLocateFlag();
        };
        InterfaceRules.prototype.RecodeCostTypeMenuItemClickEventHandler = function () {
            this._document.TableRules.RecodeDirectionCost(Client.GetCurrentDirectory() + "NR_RecodeTable.xls", Client.GetCurrentDirectory() + "Table_99999_to_99998.xls");
        };
        InterfaceRules.prototype.LoadControlNumbersMenuItemClickEventHandler = function () {
            var excelFilePath = Client.GetCurrentDirectory() + "ControlNumbers.xls";
            if (Client.IsFileExists(excelFilePath)) {
                this._document.TableRules.LoadControlNumbers(excelFilePath);
            }
            else {
                Client.ShowMessage("Ошибка", "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0444\u0430\u0439\u043B \"" + excelFilePath + "\" \u0432 \u043F\u0430\u043F\u043A\u0435 \u0441\u0431\u043E\u0440\u043A\u0438!", MessageIcons.Error);
            }
        };
        InterfaceRules.prototype.ObasSprFilterEventHandler = function () {
            var result = false;
            var rroData = ObasTableCollection.RroDataTable;
            var obasKbkLinks = ObasTableCollection.ObasKbkLinksTable;
            var obasKey = ObasTableCollection.ObasSprTable.RecordKey.Value;
            var csrCode = rroData.GetCSRCode();
            var costTypeCode = rroData.CostType.Code;
            var foivCode = rroData.Foiv.Code;
            var reader = obasKbkLinks.CreateReader();
            while (reader.Read()) {
                result = obasKbkLinks.Obas.ForeignKey.Value === obasKey &&
                    ObasHelper.CheckObasKbkLink(csrCode, costTypeCode, foivCode);
                if (result) {
                    break;
                }
            }
            return result;
        };
        InterfaceRules.prototype.IsManagerAuth = function () {
            return ObasTableCollection.SelectedFoivTable.BudgetAuthority === BudgetAuthority.Manager;
        };
        InterfaceRules.prototype.IsNotRecipientAuth = function () {
            return !this.IsRecipientAuth();
        };
        InterfaceRules.prototype.IsRecipientAuth = function () {
            return ObasTableCollection.SelectedFoivTable.BudgetAuthority === BudgetAuthority.Recipient;
        };
        InterfaceRules.prototype.OpenObasFile = function (fileType, obasVersion, mustOpenLinkedFiles, mustCreateGroup, openOnlyExists) {
            var versionsTable = ObasTableCollection.RroObasVersionsTable;
            var rroObas = ObasTableCollection.RroObasTable;
            if (mustOpenLinkedFiles == null) {
                mustOpenLinkedFiles = ObasStageSettings.CurrentStage === ObasStageType.First && versionsTable.SourceVersion.LookupByKeys(obasVersion) != null;
            }
            if (mustCreateGroup == null) {
                mustCreateGroup = mustOpenLinkedFiles;
            }
            if (openOnlyExists == null) {
                openOnlyExists = false;
            }
            var vrCode = "";
            var templateFileName = null;
            if (versionsTable.LocateByKeys(obasVersion) && rroObas.LocateByKeys(versionsTable.RroObasKey.Value)) {
                vrCode = rroObas.CostType.Code;
                templateFileName = ObasHelper.GetTemplateFileName(fileType, rroObas.Obas.ForeignKey.Value, true);
            }
            var result = templateFileName != null;
            var fileId;
            if (result) {
                if (ObasHelper.IsInsuranceCode(vrCode)) {
                    var sourceVersion = versionsTable.RecordKey.Value;
                    obasVersion = ObasHelper.GetSynonymVersion(obasVersion);
                    versionsTable.LocateByKeys(sourceVersion);
                }
                var docDirectory = ObasHelper.GetFullDirectoryPath(obasVersion);
                fileId = ObasHelper.GetFileName(fileType, obasVersion, undefined, undefined, undefined, undefined, true);
                var attachFileName = docDirectory + (versionsTable.GetAttachFileName(true) + ".xls");
                var fileName = docDirectory + (fileId + ".xml");
                result = !openOnlyExists || (openOnlyExists && Client.IsFileExists(fileName));
                if (result) {
                    if (!Client.IsFileExists(templateFileName)) {
                        if (attachFileName && Client.IsFileExists(attachFileName)) {
                            Client.OpenExternalFile(Client.GetCurrentDirectory() + attachFileName);
                        }
                        else {
                            if (Client.ShowMessage("Приложение", "\u0428\u0430\u0431\u043B\u043E\u043D: " + templateFileName + " \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442!\n\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 excel \u0441 \u0434\u0430\u043D\u043D\u044B\u043C\u0438?", MessageIcons.Warning, MessageButtons.YesNo) ===
                                MessageResults.Yes) {
                                var attachPath = Client
                                    .SelectFile("Добавление приложения", "Приложение с данными сметного расчета (*.xls) | *.xls");
                                if (attachPath) {
                                    Client.CopyFile(attachPath, attachFileName, true);
                                    Client.OpenExternalFile(Client.GetCurrentDirectory() + attachFileName);
                                }
                            }
                            else {
                                Client.ShowMessage("Ошибка", "\u0428\u0430\u0431\u043B\u043E\u043D: " + templateFileName + " \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442!\n\u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0443.", MessageIcons.Error);
                            }
                        }
                        return undefined;
                    }
                    var canChange = versionsTable.RroObasKey.SourceTable.RroDataKey.SourceTable.RroOutlayKey.SourceTable.IsDraft();
                    fileId = Client.OpenDocument(templateFileName, fileName, !canChange);
                    Client.SendMessage(fileId, "%Doc%.CommonRules.SetOBASMasterKbk", [fileType, obasVersion, canChange]);
                    var docTitle = Client.SendMessage(fileId, "%Doc%.CommonRules.GetExcelFileName", []);
                    Client.SetDocumentTitle(fileId, docTitle);
                    if (mustOpenLinkedFiles && Client.IsDocumentOpened(fileId)) {
                        var rroObasKey = versionsTable.RroObasKey.LookupByKeys(obasVersion);
                        var approvedVersion = versionsTable.SourceVersion.Value;
                        var approvedFileId = undefined;
                        if (approvedVersion) {
                            approvedFileId = ObasHelper.GetFileName(fileType, approvedVersion);
                            var approvedFileName = docDirectory + (approvedFileId + ".xml");
                            if (Client.IsFileExists(approvedFileName) && !Client.IsDocumentOpened(approvedFileId)) {
                                approvedFileId = Client.OpenDocument(templateFileName, approvedFileName, true);
                                Client.SendMessage(approvedFileId, "%Doc%.CommonRules.SetOBASMasterKbk", [fileType, approvedVersion, false]);
                                docTitle = Client.SendMessage(approvedFileId, "%Doc%.CommonRules.GetExcelFileName", []);
                                Client.SetDocumentTitle(approvedFileId, docTitle);
                            }
                        }
                        var isDeltaOpen = false;
                        var deltaFileId = undefined;
                        if (Client.IsDocumentOpened(approvedFileId)) {
                            var deltaFileName = ObasHelper.GetFileName(ObasStageSettings.DeltaFileType, obasVersion, undefined, undefined, undefined, undefined, true);
                            deltaFileName = docDirectory + (deltaFileName + ".xml");
                            if (versionsTable.AutoFillDelta.Value) {
                                deltaFileId = Client.OpenDocument(templateFileName, deltaFileName, true);
                                Client.SendMessage(deltaFileId, "%Doc%.CommonRules.SetOBASMasterKbk", [ObasStageSettings.DeltaFileType, obasVersion, canChange]);
                                docTitle = Client.SendMessage(deltaFileId, "%Doc%.CommonRules.GetExcelFileName", []);
                                Client.SetDocumentTitle(deltaFileId, docTitle);
                                isDeltaOpen = deltaFileId != null;
                            }
                        }
                        if (mustCreateGroup) {
                            if (isDeltaOpen || Client.IsDocumentOpened(approvedFileId)) {
                                var groupFileName = ObasHelper.GetGroupFileId(rroObasKey) + ".xml";
                                var groupFileId = Client
                                    .OpenDocument(ObasStageSettings.GroupTemplateFileName, groupFileName);
                                Client.SendMessage(groupFileId, "%Doc%.InterfaceRules.SetRroObasKey", [rroObasKey]);
                                Client.SetDocumentTitle(groupFileId, groupFileName);
                                Client.AddDocumentToGroup(fileId, groupFileId);
                                Client.SetDocumentTitle(fileId, "\u041D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F");
                                if (isDeltaOpen) {
                                    Client.AddDocumentToGroup(deltaFileId, groupFileId);
                                    Client.SetDocumentTitle(deltaFileId, "\u0414\u0435\u043B\u044C\u0442\u0430");
                                }
                                if (Client.IsDocumentOpened(approvedFileId)) {
                                    Client.AddDocumentToGroup(approvedFileId, groupFileId);
                                    Client.SetDocumentTitle(approvedFileId, "\u0423\u0442\u0432\u0435\u0440\u0436\u0434. \u0432\u0435\u0440\u0441\u0438\u044F");
                                }
                                Client.SendMessage(fileId, "%Doc%.CommonRules.SetupLinkedDocuments", [deltaFileId, approvedFileId]);
                            }
                            else {
                                Client.SendMessage(fileId, "%Doc%.CommonRules.SetupLinkedDocuments", [fileId]);
                            }
                        }
                        Client.ActivateDocument(fileId);
                    }
                }
                else {
                    fileId = null;
                }
            }
            return fileId;
        };
        InterfaceRules.prototype.PostUpdate = function () {
            if (ObasTableCollection.BuildParamsTable.CanPrepareVersions.Value) {
                var rroObas = ObasTableCollection.RroObasTable;
                rroObas.Iterate(this._document.TableRules.PrepareSingleVersion);
                ObasTableCollection.BuildParamsTable.CanPrepareVersions.Value = false;
            }
        };
        return InterfaceRules;
    }());
    InterfaceRules._startObasNotifColumn = 2;
    InterfaceRules._startObasDataColumn = 3;
    FMain.InterfaceRules = InterfaceRules;
    var YearSheet = (function (_super) {
        __extends(YearSheet, _super);
        function YearSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YearSheet.prototype.GetYearsFieldRangeEventHandler = function (sheetId) {
            if (sheetId === void 0) { sheetId = ""; }
            return ObasHelper.GenerateYearsRange();
        };
        YearSheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return ObasHelper.CalcYearColumnCaption(index);
        };
        return YearSheet;
    }(Sheet));
    var BaseMainSheet = (function (_super) {
        __extends(BaseMainSheet, _super);
        function BaseMainSheet(id, _document, _startDataColumn, _blockColumnCount) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            _this._startDataColumn = _startDataColumn;
            _this._blockColumnCount = _blockColumnCount;
            return _this;
        }
        Object.defineProperty(BaseMainSheet.prototype, "ActiveOutlayKey", {
            get: function () {
                return ObasTableCollection.RroOutlayTable.GetActive();
            },
            enumerable: true,
            configurable: true
        });
        BaseMainSheet.prototype.CalcStartBlockColumn = function (block) {
            return this._startDataColumn + this._blockColumnCount * block;
        };
        BaseMainSheet.prototype.CalcEndBlockColumn = function (block) {
            return this._startDataColumn + this._blockColumnCount * (block + 1) - 1;
        };
        BaseMainSheet.prototype.IsDataColumn = function (column) {
            return this.CalcOffsetCol(column) >= 0;
        };
        BaseMainSheet.prototype.CalcDataColumnBlock = function (column) {
            return (this.CalcOffsetCol(column) / this._blockColumnCount) | 0;
        };
        BaseMainSheet.prototype.IsColumnInDataBlock = function (column, block) {
            return ((this.CalcDataColumnBlock(column) === block) && this.IsDataColumn(column));
        };
        BaseMainSheet.prototype.CalcRelColumn = function (column) {
            return this.CalcOffsetCol(column) % this._blockColumnCount;
        };
        BaseMainSheet.prototype.CalcOffsetCol = function (column) {
            return column - this._startDataColumn;
        };
        Object.defineProperty(BaseMainSheet.prototype, "RroObasVersion", {
            get: function () {
                return this.Table.GetKeyBySourceTable(ObasTableCollection.RroObasVersionsTable);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseMainSheet.prototype, "RroDataKey", {
            get: function () {
                return this.Table.GetKeyBySourceTable(ObasTableCollection.RroDataTable);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseMainSheet.prototype, "RroObasKey", {
            get: function () {
                return this.Table.GetKeyBySourceTable(ObasTableCollection.RroObasTable);
            },
            enumerable: true,
            configurable: true
        });
        BaseMainSheet.prototype.OpenObasMenuItemClickEventHandler = function () {
            var fileId = this._document.InterfaceRules.OpenObasFile(ObasStageSettings.FileType, this.RroObasVersion, undefined, undefined, false);
//            var fileId = this._document.InterfaceRules.OpenObasFile(ObasStageSettings.FileType, this.RroObasVersion, undefined, undefined, this.IsReadOnly);
            if (this.IsReadOnly && fileId == null) {
                Client.ShowMessage("Информация", "Доведенные ЛБО не были распределены. ОПСП не был сформирован и утверждён", MessageIcons.Information);
            }
        };
        BaseMainSheet.prototype.OpenDeltaObasMenuItemClickEventHandler = function () {
            this._document.InterfaceRules.OpenObasFile(ObasStageSettings.DeltaFileType, this.RroObasVersion);
        };
        BaseMainSheet.prototype.IsObasHasVersion = function () {
            return this.RroObasVersion != null;
        };
        BaseMainSheet.prototype.CanAddEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.ReadOnlyEventHandler(sheetId, false) && ((column < 5) || (column === 5 && this.RroDataKey != null && this.RroObasVersion == null));
        };
        BaseMainSheet.prototype.ReadOnlyEventHandler = function (sheetId, isReadOnly) {
            return !this.IsReadOnly;
        };
        Object.defineProperty(BaseMainSheet.prototype, "IsReadOnly", {
            get: function () {
                var rroOtlayTable = ObasTableCollection.RroOutlayTable;
                return rroOtlayTable.GetActive() == null || rroOtlayTable.Status !== OutlayStatuses.Draft;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseMainSheet.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        return BaseMainSheet;
    }(YearSheet));
    var MainSheetDataColumns;
    (function (MainSheetDataColumns) {
        MainSheetDataColumns[MainSheetDataColumns["Bring"] = 0] = "Bring";
        MainSheetDataColumns[MainSheetDataColumns["ApproveRub"] = 1] = "ApproveRub";
        MainSheetDataColumns[MainSheetDataColumns["ApproveUsd"] = 2] = "ApproveUsd";
        MainSheetDataColumns[MainSheetDataColumns["ChangeRub"] = 3] = "ChangeRub";
        MainSheetDataColumns[MainSheetDataColumns["ChangeUsd"] = 4] = "ChangeUsd";
        MainSheetDataColumns[MainSheetDataColumns["CurrentRub"] = 5] = "CurrentRub";
        MainSheetDataColumns[MainSheetDataColumns["CurrentUsd"] = 6] = "CurrentUsd";
        MainSheetDataColumns[MainSheetDataColumns["Notification"] = 7] = "Notification";
    })(MainSheetDataColumns || (MainSheetDataColumns = {}));
    var MainSheet = (function (_super) {
        __extends(MainSheet, _super);
        function MainSheet(id, document) {
            return _super.call(this, id, document, 6, ObasHelper.GetEnumLength(MainSheetDataColumns)) || this;
        }
        MainSheet.prototype.CalcDeviation = function (val1, val2) {
            return ObasHelper.ConvertToNumber(val2) - ObasHelper.ConvertToNumber(val1);
        };
        MainSheet.prototype.CalcNotification = function (val1, val2) {
            return this.CalcDeviation(val1, val2) === 0 ? "" : "!";
        };
        MainSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column) && (this.GetCellValue(row, 5, true) || "").length === 0) {
                var relColumn = this.CalcRelColumn(column);
                switch (relColumn) {
                    case MainSheetDataColumns.Notification:
                        if (this.GetCellValue(row, column - 2) !== this.GetCellValue(row, column - 7)) {
                            return SheetFormatCollection.GetCustomFormat(false, SheetFormatColors.Red);
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        MainSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsDataColumn(column) && (this.GetCellValue(row, 5, true) || "").length === 0) {
                var relColumn = this.CalcRelColumn(column);
                switch (relColumn) {
                    case MainSheetDataColumns.Notification:
                        var result = new SheetCalcResult("%Doc%.ObasSheet.CalcNotification");
                        result.AddCoordinates(new CellCoordinate(row, column - 2));
                        result.AddCoordinates(new CellCoordinate(row, column - 7));
                        return result.ToArray();
                }
            }
            return undefined;
        };
        MainSheet.prototype.ChangeObasDataMenuItemClickEventHandler = function () {
            var obasVersion = this.RroObasVersion;
            var rroObasVersionstable = ObasTableCollection.RroObasVersionsTable;
            rroObasVersionstable.LocateByKeys(obasVersion);
            this.Document.ShowEditor("OBASSumEditor");
        };
        MainSheet.prototype.ChangeObasDataMenuItemShowEventHandler = function () {
            var obasVersion = this.RroObasVersion;
            var rroObasVersionstable = ObasTableCollection.RroObasVersionsTable;
            rroObasVersionstable.LocateByKeys(obasVersion);
            var rroObasTable = rroObasVersionstable.RroObasKey.SourceTable;
            var templateFileName = ObasHelper.GetTemplateFileName(ObasStageSettings.FileType, rroObasTable.Obas.ForeignKey.Value, true);
            return this.IsObasHasVersion() && !Client.IsFileExists(templateFileName) && !this.IsReadOnly;
        };
        MainSheet.prototype.ChangeObasLBOMenuItemClickEventHandler = function () {
            var rroDataKey = this.RroDataKey;
            var rroExpendSheduleTable = ObasTableCollection.RroExpendSheduleTable;
            if (!rroExpendSheduleTable.Locate(rroExpendSheduleTable.RroDataKey.Id, rroDataKey)) {
                rroExpendSheduleTable.AddRow();
                rroExpendSheduleTable.RroDataKey.Value = rroDataKey;
                rroExpendSheduleTable.LoadDate.Value = new Date();
                rroExpendSheduleTable.PostRow();
            }
            this.Document.ShowEditor("LBOSumEditor");
        };
        MainSheet.prototype.ChangeObasLBOMenuItemShowEventHandler = function () {
            var rroOtlayTable = ObasTableCollection.RroOutlayTable;
            return this.IsObasHasVersion() && !(rroOtlayTable.StatusSprField.ForeignKey.Locate(OutlayStatuses.Approved) ||
                rroOtlayTable.StatusSprField.ForeignKey.Locate(OutlayStatuses.ApproveSubmit) ||
                rroOtlayTable.StatusSprField.ForeignKey.Locate(OutlayStatuses.Agreed) ||
                rroOtlayTable.StatusSprField.ForeignKey.Locate(OutlayStatuses.AgreeSubmit));
        };
        return MainSheet;
    }(BaseMainSheet));
    FMain.MainSheet = MainSheet;
    var BaseVersionsSheet = (function (_super) {
        __extends(BaseVersionsSheet, _super);
        function BaseVersionsSheet(id, _document, _editor, _childSheet) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            _this._editor = _editor;
            _this._childSheet = _childSheet;
            _this._sourceTable = null;
            _this._sourceTable = _editor.SourceTable;
            return _this;
        }
        Object.defineProperty(BaseVersionsSheet.prototype, "KbkPackTable", {
            get: function () {
                return ObasTableCollection.OutlayExchangeDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseVersionsSheet.prototype, "AddAnalysisIndicatorPackTable", {
            get: function () {
                return ObasTableCollection.OutlayAnalysisIndicatorExchangeDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseVersionsSheet.prototype, "SourceTable", {
            get: function () {
                return this._sourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseVersionsSheet.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseVersionsSheet.prototype, "OutlayKey", {
            get: function () {
                return this.Table.GetKeyBySourceTable(this._sourceTable);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseVersionsSheet.prototype, "IsReadOnlyRecord", {
            get: function () {
                return this.IsApprovedVersion();
            },
            enumerable: true,
            configurable: true
        });
        BaseVersionsSheet.prototype.SyncSource = function () {
            this._sourceTable.LocateByKeys(this.OutlayKey);
            return this._sourceTable;
        };
        BaseVersionsSheet.prototype.CheckStatus = function (status) {
            return this.SyncSource().Status === status;
        };
        BaseVersionsSheet.prototype.IsApprovedVersion = function () {
            return this.CheckStatus(OutlayStatuses.Approved);
        };
        BaseVersionsSheet.prototype.IsDraftVersion = function () {
            return this.CheckStatus(OutlayStatuses.Draft);
        };
        BaseVersionsSheet.prototype.IsNotDraftVersion = function () {
            return !this.CheckStatus(OutlayStatuses.Draft);
        };
        BaseVersionsSheet.prototype.SetActiveMenuItemClickEventHandler = function () {
            this.ActivateOtlay(this.OutlayKey);
        };
        BaseVersionsSheet.prototype.SetActiveMenuItemShowEventHandler = function () {
            return this.HasVersion() && !this.SyncSource().IsActive;
        };
        BaseVersionsSheet.prototype.CreateVersionMenuItemClickEventHandler = function () {
            this._sourceTable.AddRow();
            this._sourceTable.PostRow();
            this.ShowEditor(this._sourceTable.RecordKey.Value);
        };
        BaseVersionsSheet.prototype.CreateDeltaMenuItemClickEventHandler = function () {
            var _this = this;
            var newVersion = null;
            ObasHelper.DoLongOperation(function () {
                _this._document.NormalMode = false;
                newVersion = _this._sourceTable.CreateNewVersion(_this.OutlayKey);
                _this._document.NormalMode = true;
            });
            this.ShowEditor(newVersion);
        };
        BaseVersionsSheet.prototype.ActivateOtlay = function (outlayKey) {
            this._sourceTable.SetActive(outlayKey);
            this._childSheet.Refresh();
            this.Document.Sheets.getValue("ExpendSheduleHistory").Refresh();
        };
        BaseVersionsSheet.prototype.ShowEditor = function (recordKey) {
            if (this._sourceTable.LocateByKeys(recordKey) && !this._editor.Show()) {
                this._sourceTable.DeleteRow();
            }
            else {
                this.ActivateOtlay(recordKey);
            }
        };
        BaseVersionsSheet.prototype.CreateDeltaMenuItemShowEventHandler = function () {
            return this.IsReadOnlyRecord;
        };
        BaseVersionsSheet.prototype.CanEditEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return !this.IsReadOnlyRecord;
        };
        BaseVersionsSheet.prototype.HasVersion = function () {
            return this.OutlayKey != null;
        };
        BaseVersionsSheet.prototype.SendOutlayToPack = function (outlayKey) {
            if (outlayKey === void 0) { outlayKey = this.OutlayKey; }
            this.KbkPackTable.DeleteAllRow();
            this.AddAnalysisIndicatorPackTable.DeleteAllRow();
            var rroOutlaysTable = this.SyncSource();
            rroOutlaysTable.SendToPack(outlayKey);
        };
        BaseVersionsSheet.prototype.CreatePackMenuItemClickEventHandler = function () {
            var rroOutlaysTable = this.SyncSource();
            this.SendOutlayToPack();
            Client.SaveDocument(ObasDocumentCollection.ExchangeDataDocumentId);
            var userCode = ObasTableCollection.SelectedFoivTable.UserRegCode;
            var destFilePath = ObasHelper.GetMachineExportDirectiry() + "\\Pril" + (rroOutlaysTable.SourceOutlayKey.Value ? "2" : "1") + "_" + userCode + "_v" + rroOutlaysTable.RecordKey.Value + "_" + ObasHelper.ConvertToString(rroOutlaysTable.ApprovedDate.Value, DateFormat.Short) + ".pxml";
            Client.CopyFile(ObasStageSettings.ExchangeDataTemplatePath, destFilePath, true);
        };
        return BaseVersionsSheet;
    }(Sheet));
    var OutlayVersionsSheet = (function (_super) {
        __extends(OutlayVersionsSheet, _super);
        function OutlayVersionsSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OutlayVersionsSheet.prototype.SyncSource = function () {
            return _super.prototype.SyncSource.call(this);
        };
        OutlayVersionsSheet.prototype.AddToSumOutlayMenuItemClickEventHandler = function () {
            var rroOutlayTable = this.SyncSource();
            if (this.Document.SumOutlayVersionsListEditor.Show()) {
                this.SendOutlayToPack();
                var destSumOutlayVersion = rroOutlayTable.LastRroSumOutlayRecipientKey.Value;
                rroOutlayTable.LastRroSumOutlayRecipientKey.SourceTable.RroDataTable.RestoreData(this.KbkPackTable, this.AddAnalysisIndicatorPackTable, destSumOutlayVersion);
            }
        };
        OutlayVersionsSheet.prototype.LoadExpendSheduleMenuItemClickEventHandler = function () {
            var _this = this;
            var filePath = Client.SelectFile("Загрузить расходное расписание", "Расходное расписание (*.AP*) | *.AP*");
            if (filePath && Client.IsFileExists(filePath)) {
                var count_1 = 0;
                ObasHelper.DoLongOperation(function () {
                    var loader = new FMain.ExpendSheduleParser(Client.GetFileData(filePath));
                    count_1 = loader.Load(_this.OutlayKey);
                });
                if (count_1 > 0) {
                    Client.ShowMessage("Информация", "\u0418\u0437 \u0444\u0430\u0439\u043B\u0430: " + filePath + "\n\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E " + count_1 + " \u041A\u0411\u041A", MessageIcons.Information);
                    this.SyncSource().IsExpendSheduleLoaded.Value = true;
                }
                else {
                    Client.ShowMessage("Внимание", "\u0412 \u0444\u0430\u0439\u043B\u0435: " + filePath + "\n\u0414\u0430\u043D\u043D\u044B\u0445 \u043F\u043E \u041A\u0411\u041A \u043D\u0435\u0442", MessageIcons.Warning);
                }
            }
            else {
                Client.ShowMessage("Внимание", "Расходное расписание не выбрано.\nЗагрузка отменена.", MessageIcons.Warning);
            }
        };
        OutlayVersionsSheet.prototype.LoadExpendSheduleMenuItemShowEventHandler = function () {
            return this.HasVersion();
        };
        OutlayVersionsSheet.prototype.CreateVersionMenuItemShowEventHandler = function () {
            return !this.HasVersion();
        };
        return OutlayVersionsSheet;
    }(BaseVersionsSheet));
    FMain.OutlayVersionsSheet = OutlayVersionsSheet;
    var SumOutlayVersionsSheet = (function (_super) {
        __extends(SumOutlayVersionsSheet, _super);
        function SumOutlayVersionsSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SumOutlayVersionsSheet.prototype.LoadOutlaysMenuItemClickEventHandler = function () {
            var files = Client.SelectFiles("Выберите пакет(ы) данных", "Пакет(ы) данных (*.pxml) | *.pxml");
            if (files == null || files.length === 0) {
                Client.ShowMessage("Внимание", "Пакеты данных не выбраны.\nЗагрузка отменена.", MessageIcons.Warning);
            }
            else {
                var exhangeDataTableId = ObasTableCollection.OutlayExchangeDataTable.Id;
                var exhangeAddAnalysisIndicatorDataTableId = ObasTableCollection.OutlayAnalysisIndicatorExchangeDataTable.Id;
                var rroOutlayTable = this.SyncSource();
                var rroOutlayKey = this.OutlayKey;
                var rroDataTable = rroOutlayTable.RroDataTable;
                var count = 0;
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    var newId = exhangeDataTableId + "_" + count++;
                    var table = this.Document.LoadTableFromFile(file, exhangeDataTableId, newId);
                    var exhangeHelper = new OutlayExchangeDataTable(table.Id);
                    newId = exhangeAddAnalysisIndicatorDataTableId + "_" + count++;
                    var addTable = this.Document.LoadTableFromFile(file, exhangeAddAnalysisIndicatorDataTableId, newId);
                    var exhangeAddAnalysisIndicatorDHelper = new OutlayAnalysisIndicatorExchangeDataTable(addTable.Id, exhangeHelper);
                    rroDataTable.RestoreData(exhangeHelper, exhangeAddAnalysisIndicatorDHelper, rroOutlayKey);
                    this.Document.DeleteTemporaryTable(table);
                }
                if (count > 0) {
                    Client.ShowMessage("Информация", "\u0412 \u0441\u0432\u043E\u0434 \u0441\u043C\u0435\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E " + count + " \u0441\u043C\u0435\u0442", MessageIcons.Information);
                }
                else {
                    Client.ShowMessage("Внимание", "\u0412 \u0444\u0430\u0439\u043B\u0430\u0445 \u043D\u0435\u0442 \u0441\u043C\u0435\u0442 \u0434\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0432 \u0441\u0432\u043E\u0434 \u0441\u043C\u0435\u0442", MessageIcons.Warning);
                }
            }
        };
        return SumOutlayVersionsSheet;
    }(BaseVersionsSheet));
    FMain.SumOutlayVersionsSheet = SumOutlayVersionsSheet;
    var SumOutlaysMainSheetDataColumns;
    (function (SumOutlaysMainSheetDataColumns) {
        SumOutlaysMainSheetDataColumns[SumOutlaysMainSheetDataColumns["ApproveRub"] = 0] = "ApproveRub";
        SumOutlaysMainSheetDataColumns[SumOutlaysMainSheetDataColumns["ApproveUsd"] = 1] = "ApproveUsd";
        SumOutlaysMainSheetDataColumns[SumOutlaysMainSheetDataColumns["ChangeRub"] = 2] = "ChangeRub";
        SumOutlaysMainSheetDataColumns[SumOutlaysMainSheetDataColumns["ChangeUsd"] = 3] = "ChangeUsd";
        SumOutlaysMainSheetDataColumns[SumOutlaysMainSheetDataColumns["CurrentRub"] = 4] = "CurrentRub";
        SumOutlaysMainSheetDataColumns[SumOutlaysMainSheetDataColumns["CurrentUsd"] = 5] = "CurrentUsd";
    })(SumOutlaysMainSheetDataColumns || (SumOutlaysMainSheetDataColumns = {}));
    var SumOutlaysMainSheet = (function (_super) {
        __extends(SumOutlaysMainSheet, _super);
        function SumOutlaysMainSheet(id, document, startDataCol) {
            if (startDataCol === void 0) { startDataCol = 7; }
            return _super.call(this, id, document, startDataCol, ObasHelper.GetEnumLength(SumOutlaysMainSheetDataColumns)) || this;
        }
        SumOutlaysMainSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsDataColumn(column)) {
                var relColumn = this.CalcRelColumn(column);
                switch (relColumn) {
                    case SumOutlaysMainSheetDataColumns.ChangeRub:
                    case SumOutlaysMainSheetDataColumns.ChangeUsd:
                        var result = new SheetCalcResult(BaseFormulas.SUB);
                        result.AddCoordinates(new CellCoordinate(row, column + 2));
                        result.AddCoordinates(new CellCoordinate(row, column - 2));
                        return result.ToArray();
                }
            }
            return undefined;
        };
        return SumOutlaysMainSheet;
    }(BaseMainSheet));
    FMain.SumOutlaysMainSheet = SumOutlaysMainSheet;
    var DapSheet = (function (_super) {
        __extends(DapSheet, _super);
        function DapSheet(id, document) {
            return _super.call(this, id, document, 8) || this;
        }
        Object.defineProperty(DapSheet.prototype, "RroObasVersionKey", {
            get: function () {
                return this.Table.GetKeyBySourceTable(ObasTableCollection.RroObasVersionsTable);
            },
            enumerable: true,
            configurable: true
        });
        DapSheet.prototype.CanAddEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.ReadOnlyEventHandler(sheetId, false) || (this.ReadOnlyEventHandler(sheetId, false) && (column === 6 || column === 7) && this.RroObasVersionKey != null);
        };
        return DapSheet;
    }(SumOutlaysMainSheet));
    FMain.DapSheet = DapSheet;
    var ExpendSheduleSheetDataColumns;
    (function (ExpendSheduleSheetDataColumns) {
        ExpendSheduleSheetDataColumns[ExpendSheduleSheetDataColumns["Bring"] = 0] = "Bring";
        ExpendSheduleSheetDataColumns[ExpendSheduleSheetDataColumns["Distibuted"] = 1] = "Distibuted";
        ExpendSheduleSheetDataColumns[ExpendSheduleSheetDataColumns["Deviation"] = 2] = "Deviation";
        ExpendSheduleSheetDataColumns[ExpendSheduleSheetDataColumns["Notification"] = 3] = "Notification";
    })(ExpendSheduleSheetDataColumns || (ExpendSheduleSheetDataColumns = {}));
    var ExpendSheduleSheet = (function (_super) {
        __extends(ExpendSheduleSheet, _super);
        function ExpendSheduleSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExpendSheduleSheet.prototype.CalcStartBlockColumn = function (block) {
            return ExpendSheduleSheet._startDataColumn + ExpendSheduleSheet._blockColumnCount * block;
        };
        ExpendSheduleSheet.prototype.CalcEndBlockColumn = function (block) {
            return ExpendSheduleSheet._startDataColumn + ExpendSheduleSheet._blockColumnCount * (block + 1) - 1;
        };
        ExpendSheduleSheet.prototype.IsDataColumn = function (column) {
            return this.CalcOffsetCol(column) >= 0;
        };
        ExpendSheduleSheet.prototype.CalcDataColumnBlock = function (column) {
            return (this.CalcOffsetCol(column) / ExpendSheduleSheet._blockColumnCount) | 0;
        };
        ExpendSheduleSheet.prototype.IsColumnInDataBlock = function (column, block) {
            return ((this.CalcDataColumnBlock(column) === block) && this.IsDataColumn(column));
        };
        ExpendSheduleSheet.prototype.CalcRelColumn = function (column) {
            return this.CalcOffsetCol(column) % ExpendSheduleSheet._blockColumnCount;
        };
        ExpendSheduleSheet.prototype.CalcOffsetCol = function (column) {
            return column - ExpendSheduleSheet._startDataColumn;
        };
        ExpendSheduleSheet.prototype.CalcDeviation = function (val1, val2) {
            return ObasHelper.ConvertToNumber(val2) - ObasHelper.ConvertToNumber(val1);
        };
        ExpendSheduleSheet.prototype.CalcNotification = function (val1, val2) {
            return this.CalcDeviation(val1, val2) === 0 ? "" : "!";
        };
        ExpendSheduleSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if ((this.GetCellValue(row, column) || "").toString().indexOf("!") > -1) {
                return SheetFormatCollection.GetCustomFormat(false, SheetFormatColors.Red);
            }
            return SheetFormatCollection.Default;
        };
        ExpendSheduleSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var result;
            if (this.IsDataColumn(column)) {
                var relColumn = this.CalcRelColumn(column);
                switch (relColumn) {
                    case ExpendSheduleSheetDataColumns.Deviation:
                        result = new SheetCalcResult("%Doc%.ExpendSheduleSheet.CalcDeviation");
                        result.AddCoordinates(new CellCoordinate(row, column - 1));
                        result.AddCoordinates(new CellCoordinate(row, column - 2));
                        return result.ToArray();
                    case ExpendSheduleSheetDataColumns.Notification:
                        result = new SheetCalcResult("%Doc%.ExpendSheduleSheet.CalcNotification");
                        result.AddCoordinates(new CellCoordinate(row, column - 2));
                        result.AddCoordinates(new CellCoordinate(row, column - 3));
                        return result.ToArray();
                }
            }
            return undefined;
        };
        return ExpendSheduleSheet;
    }(YearSheet));
    ExpendSheduleSheet._startDataColumn = 6;
    ExpendSheduleSheet._blockColumnCount = ObasHelper.GetEnumLength(ExpendSheduleSheetDataColumns);
    FMain.ExpendSheduleSheet = ExpendSheduleSheet;
    
    var AddAnalysisIndicatorSheet = (function (_super) {
        __extends(AddAnalysisIndicatorSheet, _super);
        function AddAnalysisIndicatorSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AddAnalysisIndicatorSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 0) {
                return row+1;
            }
        };
        return AddAnalysisIndicatorSheet;
    }(Sheet));
    FMain.AddAnalysisIndicatorSheet = AddAnalysisIndicatorSheet;
    
})(FMain || (FMain = {}));
