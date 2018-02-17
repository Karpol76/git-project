var FMain;
(function (FMain) {
    var PatchInfo = (function () {
        function PatchInfo(Table, PatchPath) {
            this.Table = Table;
            this.PatchPath = PatchPath;
            this._patchData = null;
        }
        Object.defineProperty(PatchInfo.prototype, "PatchData", {
            get: function () {
                if (this._patchData == null) {
                    this._patchData = Client.GetFileData(this.PatchPath);
                }
                return this._patchData;
            },
            enumerable: true,
            configurable: true
        });
        return PatchInfo;
    }());
    var UpdateRules = (function () {
        function UpdateRules(_document) {
            this._document = _document;
        }
        UpdateRules.prototype.UpdateTemplate = function (oldVersion, currentVersion) { };
        UpdateRules.prototype.UpdateAllForms = function () {
            var _this = this;
            var rroVersionsTable = ObasTableCollection.RroObasVersionsTable;
            rroVersionsTable.Iterate(function () {
                if (!rroVersionsTable.IsSynonymRow.Value) {
                    _this.UpdateVersionFiles(rroVersionsTable.Version.Value);
                }
            }, true);
            if (ObasHelper.CanUpdateTo(this._document, "1.0.9")) {
                this.PatchAllApprovedVersions([
                    new PatchInfo(ObasTableCollection.DualTable, "MainLogic\\Patching\\PatchDual.js"),
                    new PatchInfo(ObasTableCollection.RateDollarActualTable, "MainLogic\\Patching\\PatchRateDollarActual.js")
                ]);
            }
            if (ObasHelper.CanUpdateTo(this._document, "1.0.12")) {
                this.PatchAllApprovedVersions([
                    new PatchInfo(ObasTableCollection.PaymentTypeSprTable, "MainLogic\\Patching\\PatchPaymentType.js")
                ]);
            }
        };
        UpdateRules.prototype.PatchAllApprovedVersions = function (patches) {
            var _this = this;
            var rroVersionsTable = ObasTableCollection.RroObasVersionsTable;
            rroVersionsTable.Iterate(function () {
                var outlayStatus = rroVersionsTable.RroOutlayKey.SourceTable.Status;
                var isApproved = outlayStatus === OutlayStatuses.Approved;
                if (!rroVersionsTable.IsSynonymRow.Value && isApproved) {
                    _this.UpdateApprovedVersionFiles(rroVersionsTable.Version.Value, patches);
                }
            }, true);
        };
        UpdateRules.prototype.UpdateVersionFiles = function (obasVersion) {
            var _this = this;
            var obasVersions = ObasTableCollection.RroObasVersionsTable;
            var outlayStatus = obasVersions.RroOutlayKey.SourceTable.Status;
            var isApproved = outlayStatus === OutlayStatuses.Approved;
            var isReadOnly = !(outlayStatus === OutlayStatuses.Draft || isApproved);
            var fileType = isApproved ? DocumentFileType.Source : ObasStageSettings.FileType;
            var filePath = ObasHelper.GetFileName(fileType, obasVersion, false, true, false, false, false);
            var templatePath = ObasHelper.GetTemplateFileName(ObasStageSettings.FileType, obasVersions.RroObasKey.SourceTable.Obas.ForeignKey.Value, true);
            var updateHandler = function (inTemplatePath, inFilePath, inFileType, inObasVersion) {
                Client.UpdateDocument(inTemplatePath, inFilePath);
                var fileId = _this._document.InterfaceRules.OpenObasFile(inFileType, inObasVersion, false, false, true);
                if (fileId) {
                    Client.SaveDocument(fileId);
                    Client.CloseDocument(fileId);
                }
            };
            if (filePath && Client.IsFileExists(filePath)) {
                if (isReadOnly) {
                    Client.SetFileReadOnly(filePath, false);
                }
                updateHandler(templatePath, filePath, fileType, obasVersion);
                if (isReadOnly) {
                    Client.SetFileReadOnly(filePath, true);
                }
            }
            fileType = ObasStageSettings.DeltaFileType;
            filePath = ObasHelper.GetFileName(fileType, obasVersion, false, true, false, false, false);
            if (filePath && Client.IsFileExists(filePath)) {
                updateHandler(templatePath, filePath, fileType, obasVersion);
            }
        };
        UpdateRules.prototype.SaveUpdatedFile = function (fileType, obasVersion) {
            var filePath = ObasHelper.GetFileName(fileType, obasVersion, false, true, false, false, false);
            if (filePath && Client.IsFileExists(filePath)) {
                var fileId = this._document.InterfaceRules.OpenObasFile(fileType, obasVersion, false, false, true);
                if (fileId) {
                    Client.SaveDocument(fileId);
                    Client.CloseDocument(fileId);
                }
            }
        };
        UpdateRules.prototype.UpdateApprovedVersionFiles = function (obasVersion, patches) {
            var fileType = ObasStageSettings.FileType;
            var filePath = ObasHelper.GetFileName(fileType, obasVersion, false, true, false, false, false);
            if (Client.IsFileExists(filePath)) {
                Client.SetFileReadOnly(filePath, false);
                var fileId = this._document.InterfaceRules.OpenObasFile(fileType, obasVersion, false, false, true);
                if (fileId) {
                    for (var _i = 0, patches_1 = patches; _i < patches_1.length; _i++) {
                        var patch = patches_1[_i];
                        if (Client.SendMessage(fileId, "%Doc%.Tables.containsKey", [patch.Table.Id])) {
                            Client.SendMessage(fileId, "eval", [patch.PatchData]);
                        }
                    }
                    Client.SaveDocument(fileId);
                    Client.CloseDocument(fileId);
                }
                Client.SetFileReadOnly(filePath, true);
            }
        };
        return UpdateRules;
    }());
    FMain.UpdateRules = UpdateRules;
})(FMain || (FMain = {}));
