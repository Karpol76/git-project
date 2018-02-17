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
var BaseRroOutlayTable = (function (_super) {
    __extends(BaseRroOutlayTable, _super);
    function BaseRroOutlayTable(id) {
        var _this = _super.call(this, id) || this;
        _this._name = null;
        _this._createDateField = null;
        _this._approvedDate = null;
        _this._statusSprField = null;
        _this._isActiveField = null;
        _this._sourceOutlayKey = null;
        _this._agreedDate = null;
        return _this;
    }
    Object.defineProperty(BaseRroOutlayTable.prototype, "AgreedDate", {
        get: function () {
            if (this._agreedDate == null) {
                this._agreedDate = new ObasTableField("AgreedDate", this);
            }
            return this._agreedDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "SourceOutlayKey", {
        get: function () {
            if (this._sourceOutlayKey == null) {
                this._sourceOutlayKey = new NumberObasTableField("SrcOutlayKey", this);
            }
            return this._sourceOutlayKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "IsActiveField", {
        get: function () {
            if (this._isActiveField == null) {
                this._isActiveField = new ObasTableField("IsActive", this, false);
            }
            return this._isActiveField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "IsActive", {
        get: function () {
            return this.IsActiveField.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "StatusSprField", {
        get: function () {
            if (this._statusSprField == null) {
                this._statusSprField = new ObasSprTableField(ObasTableCollection.OutlayStatusSprTable, this);
            }
            return this._statusSprField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "Status", {
        get: function () {
            return this.StatusSprField.ForeignKey.Value;
        },
        set: function (value) {
            this.StatusSprField.ForeignKey.Value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "ApprovedDate", {
        get: function () {
            if (this._approvedDate == null) {
                this._approvedDate = new ObasTableField("ApprovedDate", this, false);
            }
            return this._approvedDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "CreateDate", {
        get: function () {
            return this.CreateDateField.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "CreateDateField", {
        get: function () {
            if (this._createDateField == null) {
                this._createDateField = new ObasTableField("CreateDate", this, true);
            }
            return this._createDateField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayTable.prototype, "Name", {
        get: function () {
            if (this._name == null) {
                this._name = new ObasTableField("Name", this, true);
            }
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    BaseRroOutlayTable.prototype.InitStatusEventHandler = function (tableId, fieldId) {
        return OutlayStatuses.Draft;
    };
    BaseRroOutlayTable.prototype.InitIsActiveEventHandler = function (tableId, fieldId) {
        return true;
    };
    BaseRroOutlayTable.prototype.InitCreateDateEventHandler = function (tableId, fieldId) {
        return ObasHelper.GetToday().toJSON();
    };
    BaseRroOutlayTable.prototype.SetActive = function (key) {
        if (key === void 0) { key = this.RecordKey.Value; }
        var currentActiveKey = this.GetActive();
        if (!(currentActiveKey == null || currentActiveKey === key)) {
            this.IsActiveField.Value = false;
        }
        if (this.LocateByKeys(key)) {
            this.IsActiveField.Value = true;
        }
    };
    BaseRroOutlayTable.prototype.GetActive = function (locate) {
        if (locate === void 0) { locate = true; }
        if (locate) {
            if (this.Locate(this.IsActiveField.Id, true)) {
                return this.RecordKey.Value;
            }
            return null;
        }
        else {
            return this.Lookup(this.IsActiveField.Id, true, this.RecordKey.Id);
        }
    };
    BaseRroOutlayTable.prototype.AddEventHandler = function (tableId) {
        this.SetActive();
    };
    BaseRroOutlayTable.prototype.StatusChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        if (newValue !== OutlayStatuses.Approved) {
            this.ApprovedDate.Value = null;
        }
        if (newValue !== OutlayStatuses.Agreed) {
            this.AgreedDate.Value = null;
        }
    };
    BaseRroOutlayTable.prototype.CreateNewVersion = function (sourceKey) {
        this.AddRow();
        this.SourceOutlayKey.DefferedSetValue(sourceKey);
        this.PostRow();
        var newKey = this.RecordKey.Value;
        this.RroDataTable.CreateNewVersions(sourceKey, newKey);
        return newKey;
    };
    BaseRroOutlayTable.prototype.SendToPack = function (outlayKey) {
        if (outlayKey === void 0) { outlayKey = this.RecordKey.Value; }
        this.RroObasVersionsTable.SendToPack(outlayKey);
    };
    BaseRroOutlayTable.prototype.IsDraft = function () {
        return this.Status === OutlayStatuses.Draft;
    };
    return BaseRroOutlayTable;
}(ObasTable));
var RroOutlayTable = (function (_super) {
    __extends(RroOutlayTable, _super);
    function RroOutlayTable() {
        var _this = _super.call(this, "RRO_Outlays") || this;
        _this._lastRroSumOutlayRecipientKey = null;
        _this._isExpendSheduleLoaded = null;
        return _this;
    }
    Object.defineProperty(RroOutlayTable.prototype, "IsExpendSheduleLoaded", {
        get: function () {
            if (this._isExpendSheduleLoaded == null) {
                this._isExpendSheduleLoaded = new ObasTableField("IsExpendSheduleLoaded", this);
            }
            return this._isExpendSheduleLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroOutlayTable.prototype, "LastRroSumOutlayRecipientKey", {
        get: function () {
            if (this._lastRroSumOutlayRecipientKey == null) {
                this._lastRroSumOutlayRecipientKey = new ObasForeignKeyTableFieldTyped(ObasTableCollection.RroSumOutlayTable, this, "LastSumOutlayRecipientKey", false, false);
            }
            return this._lastRroSumOutlayRecipientKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroOutlayTable.prototype, "RroDataTable", {
        get: function () {
            return ObasTableCollection.RroDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroOutlayTable.prototype, "RroObasVersionsTable", {
        get: function () {
            return ObasTableCollection.RroObasVersionsTable;
        },
        enumerable: true,
        configurable: true
    });
    RroOutlayTable.prototype.LockOutlay = function (flag) {
        this.RroObasVersionsTable.LockFiles(this.RecordKey.Value, flag);
    };
    RroOutlayTable.prototype.ApproveVersion = function () {
        this.RroObasVersionsTable.ApproveVersions(this.RecordKey.Value);
    };
    RroOutlayTable.prototype.HasFullData = function () {
        var _this = this;
        var result = false;
        this.DoWithRestorePosition(function () {
            result = _this.RroObasVersionsTable.IsAllVersionsHasFiles(_this.RecordKey.Value, DocumentFileType.Obas);
        });
        return result;
    };
    return RroOutlayTable;
}(BaseRroOutlayTable));
var RroSumOutlayTable = (function (_super) {
    __extends(RroSumOutlayTable, _super);
    function RroSumOutlayTable() {
        return _super.call(this, "RRO_SumOutlays") || this;
    }
    Object.defineProperty(RroSumOutlayTable.prototype, "RroDataTable", {
        get: function () {
            return ObasTableCollection.RroSumDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroSumOutlayTable.prototype, "RroObasVersionsTable", {
        get: function () {
            return ObasTableCollection.RroSumObasVersionsTable;
        },
        enumerable: true,
        configurable: true
    });
    RroSumOutlayTable.prototype.ApproveVersion = function () { };
    return RroSumOutlayTable;
}(BaseRroOutlayTable));
var BaseRroObasVersionsTable = (function (_super) {
    __extends(BaseRroObasVersionsTable, _super);
    function BaseRroObasVersionsTable(id, _rroObasTable) {
        var _this = _super.call(this, id) || this;
        _this._rroObasTable = _rroObasTable;
        _this._deletedObasKey = null;
        _this._changeType = null;
        _this._status = null;
        _this._fileNameMainField = null;
        _this._fileNameDeltaField = null;
        _this._sourceVersion = null;
        _this._fileNameSourceField = null;
        _this._rroPedKey = new ObasForeignKeyTableField(ObasTableCollection.RroPedTable, _this);
        _this._versionNumber = new ObasTableField("VerNum", _this);
        _this._dateApprove = new ObasTableField("DateApprove", _this);
        _this._ownerKbkCode = new ObasTableField("KBK_OwnerVR", _this);
        _this._kbkCode = new ObasTableField("KBK", _this);
        _this._prevVersion = new ObasTableField("PREV_OBAS_VERSION_KEY", _this);
        _this._autoFillDelta = new ObasTableField("AutoFillDeltaOBAS", _this);
        _this._isMultiRow = new ObasTableField("isMultiRow", _this);
        _this._isSynonymRow = new ObasTableField("isSynonymRow", _this);
        _this._issueContent = new ObasTableField("IssueContents", _this);
        _this._issueJustification = new ObasTableField("IssueJustification", _this);
        _this._issueComment = new ObasTableField("IssueComment", _this);
        return _this;
    }
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "FileNameSourceField", {
        get: function () {
            if (this._fileNameSourceField == null) {
                this._fileNameSourceField = new ObasTableField("FileName_Source", this);
            }
            return this._fileNameSourceField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "RroOutlayKey", {
        get: function () {
            return this.RroObasKey.SourceTable.RroOutlayKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "SourceVersion", {
        get: function () {
            if (this._sourceVersion == null) {
                this._sourceVersion = new NumberObasTableField("PARENT_OBAS_VERSION_KEY", this);
            }
            return this._sourceVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "FileNameDeltaField", {
        get: function () {
            if (this._fileNameDeltaField == null) {
                this._fileNameDeltaField = new ObasTableField("FileName_D", this);
            }
            return this._fileNameDeltaField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "FileNameMainField", {
        get: function () {
            if (this._fileNameMainField == null) {
                this._fileNameMainField = new ObasTableField("FileName", this);
            }
            return this._fileNameMainField;
        },
        enumerable: true,
        configurable: true
    });
    BaseRroObasVersionsTable.prototype.CreateFileName = function () {
        return Client.GenerateGuid();
    };
    BaseRroObasVersionsTable.prototype.GetFileNameField = function (fileType) {
        var isMainObas = ObasTableCollection.FileTypeTable.IsMain.LookupByKeys(fileType);
        if (fileType === DocumentFileType.Source) {
            return this.FileNameSourceField;
        }
        else if (isMainObas) {
            return this.FileNameMainField;
        }
        else {
            return this.FileNameDeltaField;
        }
    };
    BaseRroObasVersionsTable.prototype.GetFileName = function (fileType, autoGenerate) {
        if (autoGenerate === void 0) { autoGenerate = false; }
        var field = this.GetFileNameField(fileType);
        var fileName = field.Value;
        if (!fileName && autoGenerate) {
            fileName = this.CreateFileName();
            field.Value = fileName;
        }
        return fileName;
    };
    BaseRroObasVersionsTable.prototype.SetFileName = function (fileType, fileName) {
        this.GetFileNameField(fileType).Value = fileName;
    };
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "RroObasTable", {
        get: function () {
            return this._rroObasTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "IsMultiRow", {
        get: function () {
            return this._isMultiRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "IsSynonymRow", {
        get: function () {
            return this._isSynonymRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "AutoFillDelta", {
        get: function () {
            return this._autoFillDelta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "RroObasKey", {
        get: function () {
            if (this._rroObasKey == null) {
                this._rroObasKey = new ObasForeignKeyTableFieldTyped(this._rroObasTable, this);
            }
            return this._rroObasKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "RroPedKey", {
        get: function () {
            return this._rroPedKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "RroDataKey", {
        get: function () {
            if (this._rroDataKey == null) {
                this._rroDataKey = new ObasForeignKeyTableFieldTyped(this._rroObasTable.RroDataTable, this);
            }
            return this._rroDataKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "VersionNumber", {
        get: function () {
            return this._versionNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "Version", {
        get: function () {
            return this.RecordKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "PreviosVersion", {
        get: function () {
            return this._prevVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "DateApprove", {
        get: function () {
            return this._dateApprove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "ChangeType", {
        get: function () {
            if (this._changeType == null)
                this._changeType = new ObasSprTableField(ObasTableCollection.ChangeTypeTable, this);
            return this._changeType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "Status", {
        get: function () {
            if (this._status == null)
                this._status = new ObasSprTableField(ObasTableCollection.StatusSprTable, this);
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "VersionStatus", {
        get: function () {
            return this.Status.ForeignKey.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "OwnerKbkCode", {
        get: function () {
            return this._ownerKbkCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "IssueComment", {
        get: function () {
            return this._issueComment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "IssueContent", {
        get: function () {
            return this._issueContent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "IssueJustification", {
        get: function () {
            return this._issueJustification;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasVersionsTable.prototype, "KbkCode", {
        get: function () {
            return this._kbkCode;
        },
        enumerable: true,
        configurable: true
    });
    BaseRroObasVersionsTable.prototype.DateApproveChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var obasTable = this._rroObasTable;
        if (obasTable.LocateByKeys(this.RroObasKey.Value)) {
            this.PreviosVersion.Value = obasTable.LastApprovedVersion.Value;
            obasTable.LastApprovedVersion.Value = this.Version.Value;
            obasTable.DateApprove.Value = this.DateApprove.Value;
        }
    };
    BaseRroObasVersionsTable.prototype.DateApproveCheckEventHandler = function (tableId) {
        var obasTable = this._rroObasTable;
        var errorTxt = undefined;
        if (obasTable.LocateByKeys(this.RroObasKey.Value)) {
            var maxApproveDate = obasTable.DateApprove.Value;
            if (maxApproveDate != null) {
                if (obasTable.LastApprovedVersion.Value === this.Version.Value) {
                    if (this.DateApprove.Value < maxApproveDate) {
                        errorTxt = "\u0414\u0430\u0442\u0430 \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u0430 " + ObasHelper.ConvertToString(maxApproveDate);
                    }
                }
                else {
                    if (this.DateApprove.Value <= maxApproveDate) {
                        errorTxt = "\u0414\u0430\u0442\u0430 \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 " + ObasHelper.ConvertToString(maxApproveDate);
                    }
                }
            }
        }
        return errorTxt;
    };
    BaseRroObasVersionsTable.prototype.AutoFillDeltaOBASInitEventHandler = function (tableId, fieldId) {
        return ObasStageSettings.CurrentStage === ObasStageType.First;
    };
    BaseRroObasVersionsTable.prototype.AddEventHandler = function (tableId) {
        var rroObas = this._rroObasTable;
        var rroData = this._rroObasTable.RroDataTable;
        var maxVersionNum = rroObas.LastVersionNumber.Value;
        if (maxVersionNum == null)
            maxVersionNum = 0;
        maxVersionNum++;
        rroObas.LastVersionNumber.Value = maxVersionNum;
        this.VersionNumber.Value = maxVersionNum;
        if (rroData.LocateByKeys(rroObas.RroDataKey.Value)) {
            this.KbkCode.Value = rroData.GetKbkCode();
        }
        if (this.IsMultiRow.Value && ObasHelper.IsInsuranceCode(this.RroObasKey.SourceTable.RroDataKey.SourceTable.CostType.Code)) {
            this.IsSynonymRow.Value = true;
        }
    };
    BaseRroObasVersionsTable.prototype.DeleteFile = function (fileType) {
        var filePath = this.GetFilePath(fileType);
        if (filePath) {
            Client.DeleteFile(filePath);
        }
    };
    BaseRroObasVersionsTable.prototype.DeleteEventHandler = function (tableId) {
        this._deletedObasKey = this.RroObasKey.Value;
        this.DeleteFile(ObasStageSettings.FileType);
        this.DeleteFile(ObasStageSettings.DeltaFileType);
        this.DeleteFile(DocumentFileType.Source);
    };
    BaseRroObasVersionsTable.prototype.AfterDeleteEventHandler = function (tableId) {
        var rroObas = this._rroObasTable;
        if (rroObas.Locate(rroObas.RecordKey.Id, this._deletedObasKey)) {
            rroObas.LastVersionNumber.Value = this.GetMaxVersionNumber(this._deletedObasKey);
        }
    };
    BaseRroObasVersionsTable.prototype.RroPedKeyChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var statusKey;
        if (newValue == null) {
            statusKey = ObasTableCollection.StatusSprTable.FirstStatusInitEventHandler(this.Id);
        }
        else {
            var rroPed = ObasTableCollection.RroPedTable;
            statusKey = rroPed.PedStatus.ForeignKey.LookupByKeys(newValue);
        }
        this.Status.ForeignKey.Value = statusKey;
    };
    BaseRroObasVersionsTable.prototype.KbkCodeChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.OwnerKbkCode.Value = newValue.substr(0, newValue.length - 2) + "00";
    };
    BaseRroObasVersionsTable.prototype.YearValueChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        if (this.VersionNumber.Value === 1) {
            var rroObas = this._rroObasTable;
            if (rroObas.LocateByKeys(this.RroObasKey.Value)) {
                var index = fieldId.indexOf("_D");
                var destFieldId = (index > -1 ? fieldId.substring(0, index) : fieldId + "_First");
                rroObas.SetFieldValue(destFieldId, newValue);
            }
        }
    };
    BaseRroObasVersionsTable.prototype.CalcVersionName = function () {
        var result = "";
        if (this.VersionStatus === VersionStatus.Approved) {
            result += "\u0423\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E " + ObasHelper.ConvertToString(this.DateApprove.Value);
        }
        else {
            result += this.Status.Name + " (\u0412\u0435\u0440\u0441\u0438\u044F " + this.VersionNumber.Value + ")";
        }
        return result;
    };
    BaseRroObasVersionsTable.prototype.GetMaxVersionNumber = function (rroObasKey) {
        var result = 0;
        while (this.Locate(this.RroObasKey.Id, rroObasKey, true)) {
            var versionNumber = this.VersionNumber.Value;
            if (versionNumber > result)
                result = versionNumber;
        }
        this.ClearLocateFlag();
        return result;
    };
    BaseRroObasVersionsTable.prototype.GetFilePath = function (fileType, autoGenerate) {
        if (autoGenerate === void 0) { autoGenerate = false; }
        var result = "" + ObasHelper.GetFullDirectoryPath(undefined) + this.GetFileName(fileType, autoGenerate) + ".xml";
        if (autoGenerate || Client.IsFileExists(result)) {
            return result;
        }
        else {
            this.SetFileName(fileType, undefined);
        }
        return undefined;
    };
    BaseRroObasVersionsTable.prototype.CloneFile = function (fileType) {
        var srcFilePath = this.GetFilePath(fileType);
        if (srcFilePath) {
            var newFileName = this.CreateFileName();
            var destDir = ObasHelper.GetFullDirectoryPath(undefined);
            Client.CopyFile(srcFilePath, "" + destDir + newFileName + ".xml", true);
            this.SetFileName(fileType, newFileName);
        }
    };
    BaseRroObasVersionsTable.prototype.CreateNewVersion = function (sourceVersionKey, destRroObasKey) {
        var newKey = this.CloneRow(sourceVersionKey, false);
        this.RroObasKey.DefferedSetValue(destRroObasKey);
        this.VersionNumber.DefferedSetValue(1);
        this.SourceVersion.DefferedSetValue(sourceVersionKey);
        var yearField = BaseObasTableFields.YearDataField;
        for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
            this.SetFieldValue(yearField.GenerateId(i) + "_D", 0, false);
        }
        this.PostRow();
        this.SetFileName(ObasStageSettings.FileType, this.GetFileName(DocumentFileType.Source, true));
        this.SetFileName(ObasStageSettings.DeltaFileType, undefined);
        this.CloneFile(ObasStageSettings.FileType);
        this.RroOutlayKosguTable.CreateNewVersions(sourceVersionKey, newKey);
        return newKey;
    };
    BaseRroObasVersionsTable.prototype.LockFile = function (fileType, isReadOnly) {
        var filePath = this.GetFilePath(ObasStageSettings.FileType);
        if (filePath) {
            Client.SetFileReadOnly(filePath, isReadOnly);
        }
    };
    BaseRroObasVersionsTable.prototype.IterateByOutlay = function (rroOutlayKey, handler) {
        var outlayKeyFieldId = this.RroOutlayKey.Id;
        while (this.Locate(outlayKeyFieldId, rroOutlayKey, true)) {
            handler(this, this.RecordKey.Value);
        }
        this.ClearLocateFlag();
    };
    BaseRroObasVersionsTable.prototype.LockFiles = function (rroOutlayKey, isReadOnly) {
        var _this = this;
        this.IterateByOutlay(rroOutlayKey, function () {
            _this.LockFile(ObasStageSettings.FileType, isReadOnly);
        });
    };
    BaseRroObasVersionsTable.prototype.ApproveVersions = function (rroOutlayKey) {
        var _this = this;
        this.IterateByOutlay(rroOutlayKey, function () {
            _this.ApproveVersion();
        });
    };
    BaseRroObasVersionsTable.prototype.IsAllVersionsHasFiles = function (rroOutlayKey, fileType) {
        var outlayKeyFieldId = this.RroOutlayKey.Id;
        var result = true;
        while (result && this.Locate(outlayKeyFieldId, rroOutlayKey, true)) {
            result = this.IsVersionHasFile(fileType);
        }
        this.ClearLocateFlag();
        return result;
    };
    BaseRroObasVersionsTable.prototype.IsVersionHasFile = function (fileType) {
        return Client.IsFileExists(this.GetFilePath(fileType));
    };
    BaseRroObasVersionsTable.prototype.ApproveVersion = function () {
        var rroObasTable = this.RroObasKey.SourceTable;
        var fileType = ObasStageSettings.FileType;
        rroObasTable.LastApprovedVersion.Value = this.RecordKey.Value;
        if (!this.IsSynonymRow.Value) {
            var approvedFilePath = this.GetFilePath(fileType);
            if (approvedFilePath) {
                var sourceFilePath = this.GetFilePath(DocumentFileType.Source, true);
                Client.CopyFile(approvedFilePath, sourceFilePath, false);
                Client.SetFileReadOnly(approvedFilePath, false);
                var approvedDocId = Client.OpenDocument(ObasHelper.GetTemplateFileName(fileType, this.RroObasKey.SourceTable.Obas.ForeignKey.Value, true), approvedFilePath);
                Client.SendMessage(approvedDocId, "%Doc%.CommonRules.FreezeDocument", []);
                Client.SaveDocument(approvedDocId);
                Client.CloseDocument(approvedDocId);
                Client.SetFileReadOnly(approvedFilePath, true);
            }
        }
    };
    BaseRroObasVersionsTable.prototype.GetUserRegCode = function () {
        return ObasTableCollection.SelectedFoivTable.UserRegCode;
    };
    BaseRroObasVersionsTable.prototype.AddToPack = function () {
        var _this = this;
        var destTable = ObasTableCollection.OutlayExchangeDataTable;
        var rroObasTable = this.RroObasKey.SourceTable;
        var rroDataTable = rroObasTable.RroDataKey.SourceTable;
        if (destTable.GetRecordKey(destTable.GetKeys(rroDataTable.Fcr.ForeignKey.Value, rroDataTable.GovermentProgram.ForeignKey.Value, rroDataTable.SubProgram.ForeignKey.Value, rroDataTable.MainAction.ForeignKey.Value, rroDataTable.DirectionCost.ForeignKey.Value, rroDataTable.CostType.ForeignKey.Value, rroObasTable.Obas.ForeignKey.Value, this.GetUserRegCode()), true)) {
            destTable.SecurityType.ForeignKey.Value = rroDataTable.SecurityType.ForeignKey.Value;
            destTable.Okv.ForeignKey.Value = rroObasTable.Okv.ForeignKey.Value;
            var yearDataField = BaseObasTableFields.YearDataField;
            var usdDataField = BaseObasTableFields.UsdYearDataField;
            var fieldChange_1 = function (fieldId) {
                var oldValue = destTable.GetFieldValue(fieldId) || 0;
                var newValue = oldValue + _this.GetFieldValue(fieldId) || 0;
                destTable.SetFieldValue(fieldId, newValue);
            };
            var fieldGen = function (field, yearIndex) {
                var fieldId = field.GenerateId(yearIndex);
                fieldChange_1(fieldId);
                fieldId = fieldId + "_D";
                fieldChange_1(fieldId);
            };
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                fieldGen(yearDataField, i);
                fieldGen(usdDataField, i);
            }
            this.RroOutlayKosguTable.SendToPack(this.RecordKey.Value, destTable.RecordKey.Value);
            return destTable.RecordKey.Value;
        }
        return null;
    };
    return BaseRroObasVersionsTable;
}(ObasTable));
var RroObasVersionsTable = (function (_super) {
    __extends(RroObasVersionsTable, _super);
    function RroObasVersionsTable() {
        var _this = _super.call(this, "RRO_OBAS_VERSIONS", ObasTableCollection.RroObasTable) || this;
        _this._outlayCreateDate = null;
        _this._excelAttachFileName = null;
        return _this;
    }
    Object.defineProperty(RroObasVersionsTable.prototype, "ExcelAttachFileName", {
        get: function () {
            if (this._excelAttachFileName == null) {
                this._excelAttachFileName = new ObasTableField("ExcelAttachFileName", this);
            }
            return this._excelAttachFileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasVersionsTable.prototype, "OutlayCreateDate", {
        get: function () {
            if (this._outlayCreateDate == null) {
                this._outlayCreateDate = new ObasTableField("OutlayCreateDate", this);
            }
            return this._outlayCreateDate.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasVersionsTable.prototype, "RroOutlayKosguTable", {
        get: function () {
            return ObasTableCollection.RroOutlayKosguTable;
        },
        enumerable: true,
        configurable: true
    });
    RroObasVersionsTable.prototype.SendToPack = function (rroOutlayKey) {
        var _this = this;
        this.IterateByOutlay(rroOutlayKey, function () {
            var approvedVersKey = _this.RroObasKey.SourceTable.LastApprovedVersion.Value;
            if (_this.Version.Value === approvedVersKey) {
                _this.AddToPack();
            }
        });
    };
    RroObasVersionsTable.prototype.CreateNewVersion = function (sourceVersionKey, destRroObasKey) {
        var newKey = _super.prototype.CreateNewVersion.call(this, sourceVersionKey, destRroObasKey);
        this.ExcelAttachFileName.Value = undefined;
        ObasTableCollection.RroObasKosguTable.CreateNewVersions(sourceVersionKey, newKey);
        return newKey;
    };
    RroObasVersionsTable.prototype.GetAttachFileName = function (autoGenerate) {
        if (autoGenerate === void 0) { autoGenerate = false; }
        var field = this.ExcelAttachFileName;
        var fileName = field.Value;
        if (!fileName && autoGenerate) {
            fileName = this.CreateFileName();
            field.Value = fileName;
        }
        return fileName;
    };
    return RroObasVersionsTable;
}(BaseRroObasVersionsTable));
var RroSumObasVersionsTable = (function (_super) {
    __extends(RroSumObasVersionsTable, _super);
    function RroSumObasVersionsTable() {
        var _this = _super.call(this, "RRO_SumOBAS_VERSIONS", ObasTableCollection.RroSumObasTable) || this;
        _this._senderCode = null;
        return _this;
    }
    Object.defineProperty(RroSumObasVersionsTable.prototype, "RroOutlayKosguTable", {
        get: function () {
            return ObasTableCollection.RroSumOutlayKosguTable;
        },
        enumerable: true,
        configurable: true
    });
    RroSumObasVersionsTable.prototype.SendToPack = function (rroOutlayKey) {
        var _this = this;
        this.IterateByOutlay(rroOutlayKey, function () {
            _this.AddToPack();
        });
    };
    Object.defineProperty(RroSumObasVersionsTable.prototype, "SenderCode", {
        get: function () {
            if (this._senderCode == null) {
                this._senderCode = new ObasTableField("Sender_Code", this);
            }
            return this._senderCode;
        },
        enumerable: true,
        configurable: true
    });
    RroSumObasVersionsTable.prototype.GetRecordKey = function (senderCode, rroObasKey, addIfNotExists) {
        return ObasHelper.GetValueByKeys(this, [this.SenderCode.Id, this.RroObasKey.Id], [senderCode, rroObasKey], this.RecordKey.Id, addIfNotExists);
    };
    RroSumObasVersionsTable.prototype.CreateNewVersions = function (sourceRroObasKey, destRroObasKey) {
        while (this.Locate(this.RroObasKey.Id, sourceRroObasKey, true)) {
            _super.prototype.CreateNewVersion.call(this, this.RecordKey.Value, destRroObasKey);
        }
        this.ClearLocateFlag();
    };
    return RroSumObasVersionsTable;
}(BaseRroObasVersionsTable));
var BaseRroObasTable = (function (_super) {
    __extends(BaseRroObasTable, _super);
    function BaseRroObasTable(id, _rroDataTable) {
        var _this = _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], false) || this;
        _this._rroDataTable = _rroDataTable;
        _this._obas = null;
        _this._costTypeKey = null;
        _this._okv = null;
        _this._rroDataKey = new ObasForeignKeyTableFieldTyped(_this._rroDataTable, _this);
        _this._lastApprovedVersion = new ObasTableField("LAST_APPROVED_OBAS_VERSION_KEY", _this);
        _this._lastVersionNumber = new ObasTableField("LAST_OBAS_VERSION_NUM", _this);
        _this._dateApprove = new ObasTableField("DateApprove", _this);
        _this._isMultiRow = new ObasTableField("isMultiRow", _this);
        return _this;
    }
    Object.defineProperty(BaseRroObasTable.prototype, "Okv", {
        get: function () {
            if (this._okv == null) {
                this._okv = new ObasSprTableFieldTyped(ObasTableCollection.OkvSprTable, this);
            }
            return this._okv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "RroOutlayKey", {
        get: function () {
            return this.RroDataKey.SourceTable.RroOutlayKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "RroDataTable", {
        get: function () {
            return this._rroDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "IsMultiRow", {
        get: function () {
            return this._isMultiRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "CostType", {
        get: function () {
            if (this._costTypeKey == null)
                this._costTypeKey = new ObasSprTableField(ObasTableCollection.CostTypeTable, this);
            return this._costTypeKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "DateApprove", {
        get: function () {
            return this._dateApprove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "Obas", {
        get: function () {
            if (this._obas == null)
                this._obas = new ObasSprTableField(ObasTableCollection.ObasSprTable, this);
            return this._obas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "RroDataKey", {
        get: function () {
            return this._rroDataKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "LastApprovedVersion", {
        get: function () {
            return this._lastApprovedVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasTable.prototype, "LastVersionNumber", {
        get: function () {
            return this._lastVersionNumber;
        },
        enumerable: true,
        configurable: true
    });
    BaseRroObasTable.prototype.InitOkvEventHandler = function (tableId, fieldId) {
        return this.Okv.SprTable.RubleKey;
    };
    BaseRroObasTable.prototype.CreateNewVersions = function (sourceRroDataKey, destRroDataKey) {
        while (this.Locate(this.RroDataKey.Id, sourceRroDataKey, true)) {
            this.CreateNewVersion(this.RecordKey.Value, destRroDataKey);
        }
        this.ClearLocateFlag();
    };
    BaseRroObasTable.prototype.CreateNewVersion = function (sourceKey, destRroDataKey) {
        var newKey = this.CloneRow(sourceKey, false);
        this.RroDataKey.DefferedSetValue(destRroDataKey);
        this.LastApprovedVersion.DefferedSetValue(undefined);
        this.LastVersionNumber.DefferedSetValue(undefined);
        this.PostRow();
        this.InnerCreateNewVersion(newKey, sourceKey, destRroDataKey);
        return newKey;
    };
    BaseRroObasTable.prototype.GetRecordKey = function (obasKey, rroDataKey, addIfNotExists) {
        return ObasHelper.GetValueByKeys(this, [this.Obas.ForeignKey.Id, this.RroDataKey.Id], [obasKey, rroDataKey], this.RecordKey.Id, addIfNotExists);
    };
    return BaseRroObasTable;
}(ObasTable));
var RroObasTable = (function (_super) {
    __extends(RroObasTable, _super);
    function RroObasTable() {
        return _super.call(this, "RRO_OBAS", ObasTableCollection.RroDataTable) || this;
    }
    Object.defineProperty(RroObasTable.prototype, "RroObasVersionsTable", {
        get: function () {
            return ObasTableCollection.RroObasVersionsTable;
        },
        enumerable: true,
        configurable: true
    });
    RroObasTable.prototype.InnerCreateNewVersion = function (destKey, sourceKey, destRroDataKey) {
        var sourceRroObasVersion = this.LastApprovedVersion.LookupByKeys(sourceKey);
        this.RroObasVersionsTable.CreateNewVersion(sourceRroObasVersion, destKey);
    };
    return RroObasTable;
}(BaseRroObasTable));
var RroSumObasTable = (function (_super) {
    __extends(RroSumObasTable, _super);
    function RroSumObasTable() {
        return _super.call(this, "RRO_SumOBAS", ObasTableCollection.RroSumDataTable) || this;
    }
    Object.defineProperty(RroSumObasTable.prototype, "RroObasVersionsTable", {
        get: function () {
            return ObasTableCollection.RroSumObasVersionsTable;
        },
        enumerable: true,
        configurable: true
    });
    RroSumObasTable.prototype.InnerCreateNewVersion = function (destKey, sourceKey, destRroDataKey) {
        this.RroObasVersionsTable.CreateNewVersions(sourceKey, destKey);
    };
    return RroSumObasTable;
}(BaseRroObasTable));
var BaseRroDataTable = (function (_super) {
    __extends(BaseRroDataTable, _super);
    function BaseRroDataTable(id, _rroOutlayTable, keyFields) {
        var _this = _super.call(this, id, keyFields) || this;
        _this._rroOutlayTable = _rroOutlayTable;
        _this._securityType = null;
        _this._department = null;
        _this._prfNpaRequisites = null;
        _this._prfNpaLink = null;
        _this._costNpaRequisites = null;
        _this._costNpaLink = null;
        _this._rroOutlayKey = null;
        _this._synonymKey = null;
        _this._mainActionFullCode = new ObasTableField("MainAction_FullCode", _this);
        _this._costTypeOwnerCode = new ObasTableField("ParentVR_Code", _this);
        _this._dirCostOwnerCode = new ObasTableField("ParentDirCost_Code", _this);
        _this._spenObligCode = new ObasTableField("PO_Code", _this);
        _this._spenObligName = new ObasTableField("PO_Name", _this);
        return _this;
    }
    Object.defineProperty(BaseRroDataTable.prototype, "RroOutlayKey", {
        get: function () {
            if (this._rroOutlayKey == null) {
                this._rroOutlayKey = new ObasForeignKeyTableFieldTyped(this._rroOutlayTable, this);
            }
            return this._rroOutlayKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "CostNpaLink", {
        get: function () {
            if (this._costNpaLink == null) {
                this._costNpaLink = new EndingNpaLinkFields(this, "N2");
            }
            return this._costNpaLink;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "CostNpaRequisites", {
        get: function () {
            if (this._costNpaRequisites == null) {
                this._costNpaRequisites = new NpaRequisitesFields(this, "N2Num", "N2Name", "N2Date", "N2Type");
            }
            return this._costNpaRequisites;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "PrfNpaLink", {
        get: function () {
            if (this._prfNpaLink == null) {
                this._prfNpaLink = new NpaLinkFields(this, "N1");
            }
            return this._prfNpaLink;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "PrfNpaRequisites", {
        get: function () {
            if (this._prfNpaRequisites == null) {
                this._prfNpaRequisites = new PrfNpaRequisitesFields(this, "N1Num", "N1Name", "N1Date", "N1Type");
            }
            return this._prfNpaRequisites;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "SpendObligationCode", {
        get: function () {
            return this._spenObligCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "SpendObligationName", {
        get: function () {
            return this._spenObligName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "SecurityType", {
        get: function () {
            if (this._securityType == null)
                this._securityType = new ObasSprTableField(ObasTableCollection.SecurityTypesTable, this);
            return this._securityType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "Department", {
        get: function () {
            if (this._department == null)
                this._department = new ObasSprTableField(ObasTableCollection.DepartmentSprTable, this);
            return this._department;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "MainActionFullCode", {
        get: function () {
            return this._mainActionFullCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "CostTypeOwnerCode", {
        get: function () {
            return this._costTypeOwnerCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroDataTable.prototype, "DirectionCostOwnerCode", {
        get: function () {
            return this._dirCostOwnerCode;
        },
        enumerable: true,
        configurable: true
    });
    BaseRroDataTable.prototype.RroOutlayInitEventHandler = function (tableId, fieldId) {
        return this._rroOutlayTable.GetActive();
    };
    BaseRroDataTable.prototype.FoivInitEventHandler = function (tableId, fieldId) {
        return ObasTableCollection.SelectedFoivTable.Foiv.ForeignKey.Value;
    };
    BaseRroDataTable.prototype.CostTypeChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var ctSoLinks = ObasTableCollection.CostTypeSpendObligationLinksTable;
        if (ctSoLinks.Locate(ctSoLinks.CostTypeCode.Id, this.CostType.Code)) {
            this.SpendObligationCode.Value = ctSoLinks.SpendObligationCode.Value;
            this.SpendObligationName.Value = ctSoLinks.SpendObligationName.Value;
        }
        this.KbkChangeEventHandler(tableId, oldValue, newValue, fieldId);
    };
    BaseRroDataTable.prototype.KbkChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        switch (fieldId) {
            case this.CostType.ForeignKey.Id:
                this.CostTypeOwnerCode.Value = this.CalcOwnerCostTypeCode();
                break;
            case this.DirectionCost.ForeignKey.Id:
                this.DirectionCostOwnerCode.Value = this.CalcOwnerDirectionCostCode();
                break;
        }
        Client.SendMessage(Client.MainDocumentId, "%Doc%.TableRules.CreateRroObas", []);
    };
    BaseRroDataTable.prototype.IsActiveOutlayLoadEventHandler = function (tableId) {
        return this.RroOutlayKey.SourceTable.IsActive;
    };
    BaseRroDataTable.prototype.DeleteEventHandler = function (tableId) {
        var curKey = this.RecordKey.Value;
        this._synonymKey = ObasHelper.GetSynonymRROKey(curKey);
        this.LocateByKeys(curKey);
    };
    BaseRroDataTable.prototype.AfterDeleteEventHandler = function (tableId) {
        if (this._synonymKey != null) {
            if (this.LocateByKeys(this._synonymKey)) {
                this.DeleteRow();
            }
        }
    };
    BaseRroDataTable.prototype.CreateSynonym = function (srcKey) {
        if (srcKey === void 0) { srcKey = this.RecordKey.Value; }
        var costTypeCode = this.CostType.Code;
        var needCode = ObasHelper.GetSynonymCostType(costTypeCode);
        if (needCode) {
            var needCostTypeKey = ObasTableCollection.CostTypeTable.LookupKeyByCode(needCode);
            if (needCostTypeKey && (ObasHelper.GetSynonymRROKey(srcKey) == null)) {
                this.CloneRow(srcKey, false);
                this.CostType.ForeignKey.DefferedSetValue(needCostTypeKey);
                this.PostRow();
            }
        }
    };
    BaseRroDataTable.prototype.GetRecordKeyByKbk = function (fcrKey, programKey, subprogramKey, mainActionKey, directionCostKey, costTypeKey, rroOutlayKey, addIfNotExists) {
        var locateFieldIds = this.GetKbkKeyFieldsId();
        locateFieldIds.push(this.RroOutlayKey.Id);
        return ObasHelper.GetValueByKeys(this, locateFieldIds, [fcrKey, programKey, subprogramKey, directionCostKey, costTypeKey, mainActionKey, rroOutlayKey], this.RecordKey.Id, addIfNotExists);
    };
    BaseRroDataTable.prototype.CreateNewVersions = function (sourceOutlayKey, destOutlayKey) {
        while (this.Locate(this.RroOutlayKey.Id, sourceOutlayKey, true)) {
            this.CreateNewVersion(this.RecordKey.Value, destOutlayKey);
        }
        this.ClearLocateFlag();
    };
    BaseRroDataTable.prototype.CreateNewVersion = function (sourceKey, destOutlayKey) {
        var newKey = this.CloneRow(sourceKey, false);
        this.RroOutlayKey.DefferedSetValue(destOutlayKey);
        this.PostRow();
        this.RroObasTable.CreateNewVersions(sourceKey, newKey);
        return newKey;
    };
    Object.defineProperty(BaseRroDataTable.prototype, "Status", {
        get: function () {
            return this.GetFieldValue("Outlay_Status_ID");
        },
        enumerable: true,
        configurable: true
    });
    BaseRroDataTable.prototype.IsDraft = function () {
        return this.Status === OutlayStatuses.Draft;
    };
    return BaseRroDataTable;
}(ObasTableWithKbkData));
var RroDataTable = (function (_super) {
    __extends(RroDataTable, _super);
    function RroDataTable() {
        return _super.call(this, "RRO_DATA", ObasTableCollection.RroOutlayTable) || this;
    }
    Object.defineProperty(RroDataTable.prototype, "RroObasTable", {
        get: function () {
            return ObasTableCollection.RroObasTable;
        },
        enumerable: true,
        configurable: true
    });
    RroDataTable.prototype.GetObasKey = function () {
        var obasKbkLinks = ObasTableCollection.ObasKbkLinksTable;
        var reader = obasKbkLinks.CreateReader();
        var csrCode = this.GetCSRCode();
        var costTypeCode = this.CostType.Code;
        var foivCode = this.Foiv.Code;
        while (reader.Read()) {
            if (ObasHelper.CheckObasKbkLink(csrCode, costTypeCode, foivCode)) {
                return obasKbkLinks.Obas.ForeignKey.Value;
            }
        }
        return null;
    };
    RroDataTable.prototype.CreateRroObasRow = function () {
        var obasKey = this.GetObasKey();
        if (obasKey != null) {
            var rroObas = ObasTableCollection.RroObasTable;
            if (!rroObas.Locate(rroObas.RroDataKey.Id, this.RecordKey.Value)) {
                rroObas.AddRow();
                rroObas.Obas.ForeignKey.DefferedSetValue(obasKey);
                rroObas.PostRow();
            }
        }
    };
    RroDataTable.prototype.CreateRroKuDataRow = function () {
        var kbkKeyValues = this.GetKbkKeyFieldsValue();
        var kbkKeyIds = this.GetKbkKeyFieldsId();
        var index = kbkKeyIds.indexOf(this.CostType.ForeignKey.Id);
        if (index > -1) {
            var costTypeSpr = ObasTableCollection.CostTypeTable;
            kbkKeyValues[index] = costTypeSpr.LookupKeyByCode(this.CostTypeOwnerCode.Value);
        }
        index = kbkKeyIds.indexOf(this.DirectionCost.ForeignKey.Id);
        if (index > -1) {
            var dirCostSpr = ObasTableCollection.DirectionCostTable;
            kbkKeyValues[index] = dirCostSpr.LookupKeyByCode(this.DirectionCostOwnerCode.Value);
        }
        var notFullKbk = kbkKeyValues.some(function (value) {
            return value == null;
        });
        if (!notFullKbk) {
            var rroKuData = ObasTableCollection.RroKUDataTable;
            if (!rroKuData.Locate(kbkKeyIds, kbkKeyValues)) {
                rroKuData.AddRow();
                for (var i = 0; i < kbkKeyIds.length; i++) {
                    rroKuData.SetFieldValue(kbkKeyIds[i], kbkKeyValues[i]);
                }
                rroKuData.KbkWithKosguCode.Value = rroKuData.GetKbkCode();
                rroKuData.PostRow();
            }
        }
    };
    RroDataTable.prototype.CreateNewVersion = function (sourceKey, destOutlayKey) {
        var newKey = _super.prototype.CreateNewVersion.call(this, sourceKey, destOutlayKey);
        ObasTableCollection.RroExpendSheduleTable.CreateNewVersion(sourceKey, newKey);
        return newKey;
    };
    RroDataTable.prototype.CreateExpendShedule = function () {
        var expendTable = ObasTableCollection.RroExpendSheduleTable;
        expendTable.AddRow();
        expendTable.RroDataKey.DefferedSetValue(this.RecordKey.Value);
        expendTable.PostRow();
    };
    return RroDataTable;
}(BaseRroDataTable));
var RroSumDataTable = (function (_super) {
    __extends(RroSumDataTable, _super);
    function RroSumDataTable() {
        return _super.call(this, "RRO_SumDATA", ObasTableCollection.RroSumOutlayTable) || this;
    }
    Object.defineProperty(RroSumDataTable.prototype, "RroObasTable", {
        get: function () {
            return ObasTableCollection.RroSumObasTable;
        },
        enumerable: true,
        configurable: true
    });
    RroSumDataTable.prototype.RestoreData = function (exchangeDataTable, exchangeAnalysisDataTable, rroOutlayKey) {
        var _this = this;
        var rroObasTable = this.RroObasTable;
        var rroObasVersionsTable = rroObasTable.RroObasVersionsTable;
        var rroOutlayKosguTable = rroObasVersionsTable.RroOutlayKosguTable;
        var rroObasAddAnalysisIndicatorTable = rroOutlayKosguTable.RroAddAnalysisIndicatorTable;
        var yearDataField = BaseObasTableFields.YearDataField;
        var usdDataField = BaseObasTableFields.UsdYearDataField;
        var fieldGen = function (sourcetable, destTable, field, yearIndex) {
            var fieldId = field.GenerateId(yearIndex);
            destTable.SetFieldValue(fieldId, sourcetable.GetFieldValue(fieldId));
            fieldId = fieldId + "_D";
            destTable.SetFieldValue(fieldId, sourcetable.GetFieldValue(fieldId));
        };
        exchangeDataTable.Iterate(function () {
            var rroDataKey = _this.GetRecordKeyByKbk(exchangeDataTable.Fcr.ForeignKey.Value, exchangeDataTable.GovermentProgram.ForeignKey.Value, exchangeDataTable.SubProgram.ForeignKey.Value, exchangeDataTable.MainAction.ForeignKey.Value, exchangeDataTable.DirectionCost.ForeignKey.Value, exchangeDataTable.CostType.ForeignKey.Value, rroOutlayKey, true);
            if (rroDataKey) {
                _this.SecurityType.ForeignKey.Value = exchangeDataTable.SecurityType.ForeignKey.Value;
                var rroObasKey = rroObasTable.GetRecordKey(exchangeDataTable.Obas.ForeignKey.Value, rroDataKey, true);
                if (rroObasKey) {
                    rroObasTable.Okv.ForeignKey.Value = exchangeDataTable.Okv.ForeignKey.Value;
                    var rroObasVersionKey = rroObasVersionsTable.GetRecordKey(exchangeDataTable.SenderCode.Value, rroObasKey, true);
                    if (rroObasVersionKey) {
                        for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                            fieldGen(exchangeDataTable, rroObasVersionsTable, yearDataField, i);
                            fieldGen(exchangeDataTable, rroObasVersionsTable, usdDataField, i);
                        }
                        while (exchangeAnalysisDataTable.Locate(exchangeAnalysisDataTable.OwnerKey.Id, exchangeDataTable.RecordKey.Value, true)) {
                            var rroObasAddAnalysisIndicatorKey = rroObasAddAnalysisIndicatorTable
                                .GetRecordKey(rroObasVersionKey, exchangeAnalysisDataTable.AddAnalyticIndicator.ForeignKey.Value, true);
                            if (rroObasAddAnalysisIndicatorKey) {
                                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                                    fieldGen(exchangeAnalysisDataTable, rroObasAddAnalysisIndicatorTable, yearDataField, i);
                                    fieldGen(exchangeAnalysisDataTable, rroObasAddAnalysisIndicatorTable, usdDataField, i);
                                }
                            }
                        }
                    }
                }
            }
            exchangeAnalysisDataTable.ClearLocateFlag();
        }, true);
    };
    return RroSumDataTable;
}(BaseRroDataTable));
var RroSecurityTypeTable = (function (_super) {
    __extends(RroSecurityTypeTable, _super);
    function RroSecurityTypeTable() {
        var _this = _super.call(this, "RRO_OBAS_SC", [BaseObasTableFields.RecordKeyField.Id], false) || this;
        _this._securityType = null;
        _this._securityBase = null;
        return _this;
    }
    Object.defineProperty(RroSecurityTypeTable.prototype, "SecurityType", {
        get: function () {
            if (this._securityType == null)
                this._securityType = new ObasSprTableField(ObasTableCollection.SecurityTypesTable, this);
            return this._securityType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroSecurityTypeTable.prototype, "SecurityBase", {
        get: function () {
            if (this._securityBase == null) {
                this._securityBase = new ObasTableField("SecBase", this);
            }
            return this._securityBase;
        },
        enumerable: true,
        configurable: true
    });
    return RroSecurityTypeTable;
}(ObasTable));
var RroPlanTable = (function (_super) {
    __extends(RroPlanTable, _super);
    function RroPlanTable() {
        return _super.call(this, "RRO_PLAN") || this;
    }
    return RroPlanTable;
}(ObasTableWithKbkData));
var RroKuDataTable = (function (_super) {
    __extends(RroKuDataTable, _super);
    function RroKuDataTable() {
        var _this = _super.call(this, "RRO_KU_Data") || this;
        _this._dataType = null;
        _this._kbkWithKosguCode = new ObasTableField("FullKBK_KOSGU", _this);
        return _this;
    }
    Object.defineProperty(RroKuDataTable.prototype, "KbkWithKosguCode", {
        get: function () {
            return this._kbkWithKosguCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroKuDataTable.prototype, "DataType", {
        get: function () {
            if (this._dataType == null) {
                this._dataType = new ObasSprTableField(ObasTableCollection.KuDataTypeSprTable, this);
            }
            return this._dataType;
        },
        enumerable: true,
        configurable: true
    });
    RroKuDataTable.prototype.KbkWithKosguCodeChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        if (newValue != null && this.DataType.ForeignKey.Value === KuDataType.LBO) {
            var kbkCode = newValue.substr(0, 16);
            var obasVersions = ObasTableCollection.RroObasVersionsTable;
            var rroObasKosgu = ObasTableCollection.RroObasKosguTable;
            while (obasVersions.Locate(obasVersions.KbkCode.Id, kbkCode, true)) {
                while (rroObasKosgu.Locate(rroObasKosgu.RroVersionKey.Id, obasVersions.Version.Value, true)) {
                    rroObasKosgu.RroKuKey.Value = this.RecordKey.Value;
                }
            }
            rroObasKosgu.ClearLocateFlag();
            obasVersions.ClearLocateFlag();
        }
    };
    return RroKuDataTable;
}(ObasTableWithKbkData));
var RroLboTable = (function (_super) {
    __extends(RroLboTable, _super);
    function RroLboTable() {
        return _super.call(this, "RRO_LBO") || this;
    }
    return RroLboTable;
}(ObasTableWithCSRData));
var RroObasNumbersTable = (function (_super) {
    __extends(RroObasNumbersTable, _super);
    function RroObasNumbersTable() {
        var _this = _super.call(this, "RRO_OBAS_Numbers", [BaseObasTableFields.RecordKeyField.Id], false) || this;
        _this._copyNumber = new ObasTableField("CopyNumber", _this);
        _this._strNumber = new ObasTableField("StrNumber", _this);
        return _this;
    }
    Object.defineProperty(RroObasNumbersTable.prototype, "CopyNumber", {
        get: function () {
            return this._copyNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasNumbersTable.prototype, "StringNumber", {
        get: function () {
            return this._strNumber;
        },
        enumerable: true,
        configurable: true
    });
    return RroObasNumbersTable;
}(ObasTable));
var RroObasRecvisitsTable = (function (_super) {
    __extends(RroObasRecvisitsTable, _super);
    function RroObasRecvisitsTable() {
        var _this = _super.call(this, "RRO_OBAS_Recvisits") || this;
        _this._boss = null;
        _this._executor = null;
        _this._cfo = null;
        _this._agreed = null;
        _this._approved = null;
        return _this;
    }
    Object.defineProperty(RroObasRecvisitsTable.prototype, "Approved", {
        get: function () {
            if (this._approved == null) {
                this._approved = new ObasPersonInfoTableFields("OutlayApprovedRecvisits_", this);
            }
            return this._approved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasRecvisitsTable.prototype, "Agreed", {
        get: function () {
            if (this._agreed == null) {
                this._agreed = new ObasPersonInfoTableFields("OutlayAgreedRecvisits_", this);
            }
            return this._agreed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasRecvisitsTable.prototype, "CFO", {
        get: function () {
            if (this._cfo == null) {
                this._cfo = new ObasForeignKeyTableFieldTyped(new ObasPersonInfoTable("RRO_FinanceChiefRecvisits"), this);
            }
            return this._cfo.SourceTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasRecvisitsTable.prototype, "Executor", {
        get: function () {
            if (this._executor == null) {
                this._executor = new ObasForeignKeyTableFieldTyped(new ObasPersonInfoTable("RRO_ExecutorRecvisits"), this);
            }
            return this._executor.SourceTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasRecvisitsTable.prototype, "Boss", {
        get: function () {
            if (this._boss == null) {
                this._boss = new ObasForeignKeyTableFieldTyped(new ObasPersonInfoTable("RRO_OfficeChiefRecvisits"), this);
            }
            return this._boss.SourceTable;
        },
        enumerable: true,
        configurable: true
    });
    return RroObasRecvisitsTable;
}(ObasTable));
var RroObasKosguTable = (function (_super) {
    __extends(RroObasKosguTable, _super);
    function RroObasKosguTable() {
        var _this = _super.call(this, "RRO_OBAS_KOSGU", [BaseObasTableFields.RecordKeyField.Id], false) || this;
        _this._kosgu = null;
        _this._obasVersion = new ObasForeignKeyTableField(ObasTableCollection.RroObasVersionsTable, _this);
        _this._lboKey = new ObasForeignKeyTableField(ObasTableCollection.RroKUDataTable, _this);
        return _this;
    }
    Object.defineProperty(RroObasKosguTable.prototype, "Kosgu", {
        get: function () {
            if (this._kosgu == null) {
                this._kosgu = new ObasSprTableField(ObasTableCollection.KosguSprTable, this);
            }
            return this._kosgu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasKosguTable.prototype, "RroVersionKey", {
        get: function () {
            return this._obasVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroObasKosguTable.prototype, "RroKuKey", {
        get: function () {
            return this._lboKey;
        },
        enumerable: true,
        configurable: true
    });
    RroObasKosguTable.prototype.RroVersionKeyChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var rroVersions = ObasTableCollection.RroObasVersionsTable;
        var rroData = ObasTableCollection.RroDataTable;
        if (rroData.LocateByKeys(rroVersions.RroDataKey.LookupByKeys(newValue))) {
            var kbkCode = rroData.GetKbkCode();
            kbkCode += " ";
            kbkCode += this.Kosgu.Code;
            var rroKuTable = ObasTableCollection.RroKUDataTable;
            this.RroKuKey.Value = rroKuTable.Lookup(rroKuTable.KbkWithKosguCode.Id, kbkCode, rroKuTable.RecordKey.Id);
        }
    };
    RroObasKosguTable.prototype.YearValueChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var obasVersions = ObasTableCollection.RroObasVersionsTable;
        var obasVersion = this.RroVersionKey.Value;
        if (obasVersions.IsMultiRow.LookupByKeys(obasVersion)) {
            if (this.Kosgu.Code === "213") {
                obasVersion = ObasHelper.GetSynonymVersion(obasVersion);
            }
            if (obasVersion != null) {
                ObasHelper.SetSumByKeys(obasVersions, [obasVersions.RecordKey.Id], [obasVersion], fieldId, oldValue, newValue);
            }
        }
    };
    RroObasKosguTable.prototype.CalcY2Delta = function () {
        return this.GetRealDelta(ObasStageSettings.CurrentYear + 1);
    };
    RroObasKosguTable.prototype.CalcY3Delta = function () {
        return this.GetRealDelta(ObasStageSettings.CurrentYear + 2);
    };
    RroObasKosguTable.prototype.CalcY4Delta = function () {
        return this.GetRealDelta(ObasStageSettings.CurrentYear + 3);
    };
    RroObasKosguTable.prototype.GetRealDelta = function (year) {
        var yearOffset = year - ObasStageSettings.CurrentYear + 1;
        var sourceValue = this.GetFieldValue("Y" + yearOffset + "_D");
        var result = (sourceValue == null ? 0 : sourceValue);
        if (result < 0) {
            var negativeLBO = this.GetFieldValue("SUM_Y" + yearOffset);
            negativeLBO = (negativeLBO == null ? 0 : -1 * negativeLBO);
            if (result < negativeLBO) {
                result = negativeLBO;
            }
        }
        return result;
    };
    RroObasKosguTable.prototype.CreateNewVersions = function (sourceVersionKey, destVersionKey) {
        while (this.Locate(this.RroVersionKey.Id, sourceVersionKey, true)) {
            this.CreateNewVersion(this.RecordKey.Value, destVersionKey);
        }
        this.ClearLocateFlag();
    };
    RroObasKosguTable.prototype.CreateNewVersion = function (sourceKey, destVersionKey) {
        var newKey = this.CloneRow(sourceKey, false);
        this.RroVersionKey.Value = destVersionKey;
        this.PostRow();
        return newKey;
    };
    return RroObasKosguTable;
}(ObasTable));
var BaseRroOutlayKosguTable = (function (_super) {
    __extends(BaseRroOutlayKosguTable, _super);
    function BaseRroOutlayKosguTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._kosgu = null;
        _this._rroObasVersion = null;
        _this._sourceOutlayKosgu = null;
        return _this;
    }
    Object.defineProperty(BaseRroOutlayKosguTable.prototype, "SourceOutlayKosgu", {
        get: function () {
            if (this._sourceOutlayKosgu == null) {
                this._sourceOutlayKosgu = new NumberObasTableField("PARENT_Outlay_KOSGU_KEY", this);
            }
            return this._sourceOutlayKosgu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayKosguTable.prototype, "RroObasVersion", {
        get: function () {
            if (this._rroObasVersion == null) {
                this._rroObasVersion = new ObasForeignKeyTableFieldTyped(this.RroObasVersions, this);
            }
            return this._rroObasVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroOutlayKosguTable.prototype, "Kosgu", {
        get: function () {
            if (this._kosgu == null) {
                this._kosgu = new ObasSprTableFieldTyped(ObasTableCollection.KosguSprTable, this);
            }
            return this._kosgu;
        },
        enumerable: true,
        configurable: true
    });
    BaseRroOutlayKosguTable.prototype.SendToPack = function (rroObasVersion, sourcePackKey) {
        var versionKeyId = this.RroObasVersion.Id;
        while (this.Locate(versionKeyId, rroObasVersion, true)) {
            this.AddToPack(sourcePackKey);
        }
        this.ClearLocateFlag();
    };
    BaseRroOutlayKosguTable.prototype.AddToPack = function (sourcePackKey) {
        return null;
    };
    BaseRroOutlayKosguTable.prototype.CreateNewVersions = function (sourceVersionKey, destVersionKey) {
        while (this.Locate(this.RroObasVersion.Id, sourceVersionKey, true)) {
            this.CreateNewVersion(this.RecordKey.Value, destVersionKey);
        }
        this.ClearLocateFlag();
    };
    BaseRroOutlayKosguTable.prototype.CreateNewVersion = function (sourceKey, destVersionKey) {
        var newKey = this.CloneRow(sourceKey, false);
        this.RroObasVersion.DefferedSetValue(destVersionKey);
        this.SourceOutlayKosgu.DefferedSetValue(sourceKey);
        this.PostRow();
        this.RroAddAnalysisIndicatorTable.CreateNewVersions(sourceKey, newKey);
        return newKey;
    };
    BaseRroOutlayKosguTable.prototype.FilterKosgu = function () {
        var rroObasTable = this.RroObasVersion.SourceTable.RroObasKey.SourceTable;
        var costCode = rroObasTable.RroDataKey.SourceTable.CostType.Code;
        return ObasTableCollection.KosguSprTable.Filter(rroObasTable.Obas.ForeignKey.Value, costCode);
    };
    return BaseRroOutlayKosguTable;
}(ObasTable));
var RroOutlayKosguTable = (function (_super) {
    __extends(RroOutlayKosguTable, _super);
    function RroOutlayKosguTable() {
        return _super.call(this, "RRO_Outlay_KOSGU") || this;
    }
    Object.defineProperty(RroOutlayKosguTable.prototype, "RroObasVersions", {
        get: function () {
            return ObasTableCollection.RroObasVersionsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroOutlayKosguTable.prototype, "RroAddAnalysisIndicatorTable", {
        get: function () {
            return ObasTableCollection.RroObasAddAnalysisIndicatorTable;
        },
        enumerable: true,
        configurable: true
    });
    return RroOutlayKosguTable;
}(BaseRroOutlayKosguTable));
var RroSumOutlayKosguTable = (function (_super) {
    __extends(RroSumOutlayKosguTable, _super);
    function RroSumOutlayKosguTable() {
        return _super.call(this, "RRO_SumOutlay_KOSGU") || this;
    }
    Object.defineProperty(RroSumOutlayKosguTable.prototype, "RroObasVersions", {
        get: function () {
            return ObasTableCollection.RroSumObasVersionsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroSumOutlayKosguTable.prototype, "RroAddAnalysisIndicatorTable", {
        get: function () {
            return ObasTableCollection.RroSumObasAddAnalysisIndicatorTable;
        },
        enumerable: true,
        configurable: true
    });
    return RroSumOutlayKosguTable;
}(BaseRroOutlayKosguTable));
var BaseRroObasAddAnalysisIndicatorTable = (function (_super) {
    __extends(BaseRroObasAddAnalysisIndicatorTable, _super);
    function BaseRroObasAddAnalysisIndicatorTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._addAnalyticIndicator = null;
        _this._rroOutlayKosgu = null;
        return _this;
    }
    Object.defineProperty(BaseRroObasAddAnalysisIndicatorTable.prototype, "RroOutlayKosguKey", {
        get: function () {
            if (this._rroOutlayKosgu == null) {
                this._rroOutlayKosgu = new ObasForeignKeyTableFieldTyped(this.RroOutlayKosguTable, this);
            }
            return this._rroOutlayKosgu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroObasAddAnalysisIndicatorTable.prototype, "AddAnalyticIndicator", {
        get: function () {
            if (this._addAnalyticIndicator == null) {
                this._addAnalyticIndicator = new ObasSprTableFieldTyped(ObasTableCollection.AddAnalysisIndicatorSprTable, this);
            }
            return this._addAnalyticIndicator;
        },
        enumerable: true,
        configurable: true
    });
    BaseRroObasAddAnalysisIndicatorTable.prototype.IsKosguChild = function (kosguKey) {
        if (kosguKey === void 0) { kosguKey = this.RroOutlayKosguTable.Kosgu.ForeignKey.Value; }
        return ObasTableCollection.AddAnalysisIndicatorSprTable.IsKosguChild(kosguKey);
    };
    BaseRroObasAddAnalysisIndicatorTable.prototype.SendToPack = function (rroKosguKey, sourcePackKey) {
        var versionKeyId = this.RroOutlayKosguKey.Id;
        while (this.Locate(versionKeyId, rroKosguKey, true)) {
            this.AddToPack(sourcePackKey);
        }
        this.ClearLocateFlag();
    };
    BaseRroObasAddAnalysisIndicatorTable.prototype.AddToPack = function (sourcePackKey) {
        var _this = this;
        var destTable = ObasTableCollection.OutlayAnalysisIndicatorExchangeDataTable;
        if (destTable.GetRecordKey(destTable.GetKeys(sourcePackKey, this.AddAnalyticIndicator.ForeignKey.Value), true)) {
            var fieldChange_2 = function (fieldId) {
                var oldValue = destTable.GetFieldValue(fieldId) || 0;
                var newValue = oldValue + _this.GetFieldValue(fieldId) || 0;
                destTable.SetFieldValue(fieldId, newValue);
            };
            var fieldGen = function (field, yearIndex) {
                var fieldId = field.GenerateId(yearIndex);
                fieldChange_2(fieldId);
                fieldId = fieldId + "_D";
                fieldChange_2(fieldId);
            };
            var yearDataField = BaseObasTableFields.YearDataField;
            var usdDataField = BaseObasTableFields.UsdYearDataField;
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                fieldGen(yearDataField, i);
                fieldGen(usdDataField, i);
            }
            return destTable.RecordKey.Value;
        }
        return null;
    };
    BaseRroObasAddAnalysisIndicatorTable.prototype.CreateNewVersions = function (sourceRroKosguKey, destRroKosguKey) {
        while (this.Locate(this.RroOutlayKosguKey.Id, sourceRroKosguKey, true)) {
            this.CreateNewVersion(this.RecordKey.Value, destRroKosguKey);
        }
        this.ClearLocateFlag();
    };
    BaseRroObasAddAnalysisIndicatorTable.prototype.CreateNewVersion = function (sourceKey, destRroKosguKey) {
        var newKey = this.CloneRow(sourceKey, false);
        this.RroOutlayKosguKey.DefferedSetValue(destRroKosguKey);
        this.PostRow();
        return newKey;
    };
    return BaseRroObasAddAnalysisIndicatorTable;
}(ObasTable));
var RroObasAddAnalysisIndicatorTable = (function (_super) {
    __extends(RroObasAddAnalysisIndicatorTable, _super);
    function RroObasAddAnalysisIndicatorTable() {
        return _super.call(this, "RRO_OBAS_AddAnalysisIndicator") || this;
    }
    Object.defineProperty(RroObasAddAnalysisIndicatorTable.prototype, "RroOutlayKosguTable", {
        get: function () {
            return ObasTableCollection.RroOutlayKosguTable;
        },
        enumerable: true,
        configurable: true
    });
    return RroObasAddAnalysisIndicatorTable;
}(BaseRroObasAddAnalysisIndicatorTable));
var RroSumObasAddAnalysisIndicatorTable = (function (_super) {
    __extends(RroSumObasAddAnalysisIndicatorTable, _super);
    function RroSumObasAddAnalysisIndicatorTable() {
        return _super.call(this, "RRO_SumOBAS_AddAnalysisIndicator") || this;
    }
    Object.defineProperty(RroSumObasAddAnalysisIndicatorTable.prototype, "RroOutlayKosguTable", {
        get: function () {
            return ObasTableCollection.RroSumOutlayKosguTable;
        },
        enumerable: true,
        configurable: true
    });
    RroSumObasAddAnalysisIndicatorTable.prototype.GetRecordKey = function (rroObasVersionKey, addAnalysisIndicatorKey, addIfNotExists) {
        return ObasHelper.GetValueByKeys(this, [this.RroOutlayKosguKey.Id, this.AddAnalyticIndicator.ForeignKey.Id], [rroObasVersionKey, addAnalysisIndicatorKey], this.RecordKey.Id, addIfNotExists);
    };
    return RroSumObasAddAnalysisIndicatorTable;
}(BaseRroObasAddAnalysisIndicatorTable));
var RroPedCountTable = (function (_super) {
    __extends(RroPedCountTable, _super);
    function RroPedCountTable() {
        var _this = _super.call(this, "RRO_PED_Count", [BaseObasTableFields.RecordKeyField.Id], false) || this;
        _this._docsCount = new ObasTableField("DocsCount", _this);
        _this._pedType = new ObasSprTableField(ObasTableCollection.PedTypeSprTable, _this);
        return _this;
    }
    Object.defineProperty(RroPedCountTable.prototype, "DocumentsCount", {
        get: function () {
            return this._docsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroPedCountTable.prototype, "PedType", {
        get: function () {
            return this._pedType;
        },
        enumerable: true,
        configurable: true
    });
    return RroPedCountTable;
}(ObasTable));
var RroPedTable = (function (_super) {
    __extends(RroPedTable, _super);
    function RroPedTable() {
        var _this = _super.call(this, "RRO_PED", [BaseObasTableFields.RecordKeyField.Id], false) || this;
        _this._pedType = null;
        _this._pedStatus = null;
        _this._dateApprove = new ObasTableField("DateApprove", _this);
        _this._pedNumber = new ObasTableField("Spr_Num", _this);
        return _this;
    }
    Object.defineProperty(RroPedTable.prototype, "PedNumber", {
        get: function () {
            return this._pedNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroPedTable.prototype, "DateApprove", {
        get: function () {
            return this._dateApprove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroPedTable.prototype, "PedType", {
        get: function () {
            if (this._pedType == null) {
                this._pedType = new ObasSprTableField(ObasTableCollection.PedTypeSprTable, this);
            }
            return this._pedType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroPedTable.prototype, "PedStatus", {
        get: function () {
            if (this._pedStatus == null) {
                this._pedStatus = new ObasSprTableField(ObasTableCollection.StatusSprTable, this);
            }
            return this._pedStatus;
        },
        enumerable: true,
        configurable: true
    });
    RroPedTable.prototype.ChangeTypeChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var versionTable = ObasTableCollection.RroObasVersionsTable;
        var locateValues = this.RecordKey.Value;
        while (versionTable.Locate(versionTable.RroPedKey.Id, locateValues, true)) {
            versionTable.ChangeType.ForeignKey.Value = newValue;
        }
        versionTable.ClearLocateFlag();
    };
    RroPedTable.prototype.PedTypeChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var pedSpr = ObasTableCollection.PedTypeSprTable;
        var pedTypesKey = new Array();
        var attachNum = pedSpr.AttachNumber.LookupByKeys(this.PedType.ForeignKey.Value);
        while (pedSpr.Locate(pedSpr.AttachNumber.Id, attachNum, true)) {
            pedTypesKey.push(pedSpr.RecordKey.Value);
        }
        pedSpr.ClearLocateFlag();
        var pedCountTable = ObasTableCollection.RroPedCountTable;
        var result = 0;
        for (var i = 0; i < pedTypesKey.length; i++) {
            var pedTypeKey = pedTypesKey[i];
            if (!pedCountTable.Locate(pedCountTable.PedType.Id, pedTypeKey)) {
                pedCountTable.AddRow();
                pedCountTable.PedType.ForeignKey.Value = pedTypeKey;
                pedCountTable.DocumentsCount.Value = 0;
                pedCountTable.PostRow();
            }
            if (pedCountTable.PedType.ForeignKey.Value === pedTypeKey) {
                pedCountTable.DocumentsCount.Value++;
            }
            result += pedCountTable.DocumentsCount.Value;
        }
        var strNumber = "";
        strNumber += "3-";
        strNumber += attachNum;
        strNumber += "-";
        strNumber += ObasTableCollection.SelectedFoivTable.Foiv.Code;
        strNumber += "//";
        strNumber += ObasHelper.FillWithCharacter(result.toString(), 4);
        this.PedNumber.Value = strNumber;
    };
    RroPedTable.prototype.PedStatusChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var rroVersions = ObasTableCollection.RroObasVersionsTable;
        var curPedKey = this.RecordKey.Value;
        while (rroVersions.Locate(rroVersions.RroPedKey.Id, curPedKey, true)) {
            rroVersions.Status.ForeignKey.Value = newValue;
        }
        rroVersions.ClearLocateFlag();
    };
    RroPedTable.prototype.PedStatusInitEventHandler = function (tableId, fieldId) {
        return VersionStatus.Draft;
    };
    return RroPedTable;
}(ObasTable));
var BuildParamsTable = (function (_super) {
    __extends(BuildParamsTable, _super);
    function BuildParamsTable() {
        var _this = _super.call(this, "BuildParams", [BaseObasTableFields.RecordKeyField.Id], false) || this;
        _this._canPrepareVersions = null;
        _this._exportFolder = new ObasTableField("ExportFolder", _this);
        _this._canSyncRroDataChanges = new ObasTableField("CanSyncRroDataChanges", _this);
        return _this;
    }
    Object.defineProperty(BuildParamsTable.prototype, "ExportDirectory", {
        get: function () {
            return this._exportFolder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildParamsTable.prototype, "CanPrepareVersions", {
        get: function () {
            if (this._canPrepareVersions == null) {
                this._canPrepareVersions = new ObasTableField("CanPrepareVersions", this);
            }
            return this._canPrepareVersions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildParamsTable.prototype, "CanSyncRroDataChanges", {
        get: function () {
            return this._canSyncRroDataChanges;
        },
        enumerable: true,
        configurable: true
    });
    BuildParamsTable.prototype.ExportDirectoryInitEventHandler = function (tableId, fieldId) {
        var result = ObasStageSettings.ExportExcelDirectory;
        if (!Client.IsDirectoryExists(result)) {
            Client.CreateDirectory(result);
        }
        return result;
    };
    BuildParamsTable.prototype.ExportDirectoryChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        if (!Client.IsDirectoryExists(newValue)) {
            Client.CreateDirectory(newValue);
        }
    };
    BuildParamsTable.prototype.CanPrepareVersionsInitEventHandler = function (tableId, fieldId) {
        return ObasTableCollection.RroObasVersionsTable.RowCount === 0;
    };
    return BuildParamsTable;
}(ObasTable));
var SelectedFoivTable = (function (_super) {
    __extends(SelectedFoivTable, _super);
    function SelectedFoivTable() {
        var _this = _super.call(this, "SELECTED_FOIV", [BaseObasTableFields.RecordKeyField.Id], false) || this;
        _this._foiv = null;
        _this._budgetAuthorityField = null;
        _this._recipient = null;
        _this._manager = null;
        _this._foivRegCode = null;
        _this._foivInfo = null;
        _this._budgetName = null;
        _this._calcRecipientName = null;
        return _this;
    }
    Object.defineProperty(SelectedFoivTable.prototype, "BudgetName", {
        get: function () {
            if (this._budgetName == null) {
                this._budgetName = new ObasTableField("BudgetName", this);
            }
            return this._budgetName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "FoivInfo", {
        get: function () {
            if (this._foivInfo == null) {
                this._foivInfo = new UserInfoTableField("FOIV", this);
            }
            return this._foivInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "Manager", {
        get: function () {
            if (this._manager == null) {
                this._manager = new UserInfoTableField("Manager", this);
            }
            return this._manager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "Recipient", {
        get: function () {
            if (this._recipient == null) {
                this._recipient = new UserInfoTableField("Recipient", this);
            }
            return this._recipient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "BudgetAuthorityField", {
        get: function () {
            if (this._budgetAuthorityField == null) {
                this._budgetAuthorityField = new ObasSprTableField(ObasTableCollection.BudgetAuthoritySprTable, this);
            }
            return this._budgetAuthorityField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "CalcRecipientName", {
        get: function () {
            if (this._calcRecipientName == null) {
                this._calcRecipientName = new ObasTableField("cRecipient_Name", this);
            }
            return this._calcRecipientName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "Foiv", {
        get: function () {
            if (this._foiv == null) {
                this._foiv = new ObasSprTableField(ObasTableCollection.FoivTable, this);
            }
            return this._foiv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "BudgetAuthority", {
        get: function () {
            return this.BudgetAuthorityField.ForeignKey.Value;
        },
        set: function (value) {
            this.BudgetAuthorityField.ForeignKey.Value = value;
        },
        enumerable: true,
        configurable: true
    });
    SelectedFoivTable.prototype.InitBudgetNameEventHandler = function (tableId, fieldId) {
        return "Федеральный бюджет";
    };
    Object.defineProperty(SelectedFoivTable.prototype, "UserField", {
        get: function () {
            switch (this.BudgetAuthority) {
                case BudgetAuthority.Recipient:
                    return this.Recipient;
                case BudgetAuthority.Manager:
                    return this.Manager;
                case BudgetAuthority.MainManager:
                    return this.FoivInfo;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "ManagerField", {
        get: function () {
            switch (this.BudgetAuthority) {
                case BudgetAuthority.Recipient:
                case BudgetAuthority.Manager:
                    return this.Manager;
                case BudgetAuthority.MainManager:
                    return this.FoivInfo;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "UserRegCode", {
        get: function () {
            var field = this.UserField;
            return field ? field.RegCodeField.Value : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "UserOktmoCode", {
        get: function () {
            var field = this.UserField;
            return field ? field.OktmoCodeField.Value : null;
        },
        enumerable: true,
        configurable: true
    });
    SelectedFoivTable.prototype.CheckCode = function (code, length) {
        return (code || "").length === length;
    };
    SelectedFoivTable.prototype.CheckRegCode = function (auth, userField) {
        var code = userField.RegCodeField.Value;
        if (this.BudgetAuthority !== auth || this.CheckCode(code, 8)) {
            return undefined;
        }
        else {
            return "Код по перечню должен составлять 8 знаков";
        }
    };
    SelectedFoivTable.prototype.CheckFOIVRegCode = function () {
        return this.CheckRegCode(BudgetAuthority.MainManager, this.FoivInfo);
    };
    SelectedFoivTable.prototype.CheckManagerRegCode = function () {
        return this.CheckRegCode(BudgetAuthority.Manager, this.Manager);
    };
    SelectedFoivTable.prototype.IsMainManager = function () {
        return this.BudgetAuthority === BudgetAuthority.MainManager;
    };
    SelectedFoivTable.prototype.IsManager = function () {
        return this.BudgetAuthority === BudgetAuthority.Manager;
    };
    SelectedFoivTable.prototype.IsRecipient = function () {
        return this.BudgetAuthority === BudgetAuthority.Recipient;
    };
    SelectedFoivTable.prototype.CheckOktmoCode = function (tableId, fieldId) {
        if (this.IsRecipient() && fieldId === this.Recipient.OktmoCodeField.Id) {
            return this.Recipient.CheckOktmoCode();
        }
        else if (this.IsManager() && fieldId === this.Manager.OktmoCodeField.Id) {
            return this.Manager.CheckOktmoCode();
        }
        else if (this.IsMainManager() && fieldId === this.FoivInfo.OktmoCodeField.Id) {
            return this.FoivInfo.CheckOktmoCode();
        }
        return undefined;
    };
    Object.defineProperty(SelectedFoivTable.prototype, "RecipientName", {
        get: function () {
            var field = this.UserField;
            return field ? field.Name.Value : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "RecipientRegCode", {
        get: function () {
            var field = this.UserField;
            return field ? field.RegCodeField.Value : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "ManagerName", {
        get: function () {
            var field = this.ManagerField;
            return field ? field.Name.Value : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedFoivTable.prototype, "ManagerRegCode", {
        get: function () {
            var field = this.ManagerField;
            return field ? field.RegCodeField.Value : "";
        },
        enumerable: true,
        configurable: true
    });
    SelectedFoivTable.prototype.RecipientNameChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.CalcRecipientName.Value = this.RecipientName;
    };
    SelectedFoivTable.prototype.InitcRecipientNameEventHandler = function (tableId, fieldId) {
        return this.RecipientName;
    };
    return SelectedFoivTable;
}(ObasTable));
var RroLimitsDetailsTable = (function (_super) {
    __extends(RroLimitsDetailsTable, _super);
    function RroLimitsDetailsTable() {
        var _this = _super.call(this, "RRO_LIMITS_DETAIL") || this;
        _this._limit = new ObasTableField("Y2_Plan", _this);
        return _this;
    }
    Object.defineProperty(RroLimitsDetailsTable.prototype, "Limit", {
        get: function () {
            return this._limit;
        },
        enumerable: true,
        configurable: true
    });
    return RroLimitsDetailsTable;
}(ObasTableWithKbkData));
var RroNpaTable = (function (_super) {
    __extends(RroNpaTable, _super);
    function RroNpaTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._prfNpaRequisites = null;
        _this._prfNpaLink = null;
        _this._costNpaRequisites = null;
        _this._costNpaLink = null;
        _this._rroDataKey = null;
        return _this;
    }
    Object.defineProperty(RroNpaTable.prototype, "RroDataKey", {
        get: function () {
            if (this._rroDataKey == null) {
                this._rroDataKey = new ObasForeignKeyTableFieldTyped(ObasTableCollection.RroDataTable, this);
            }
            return this._rroDataKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroNpaTable.prototype, "CostNpaLink", {
        get: function () {
            if (this._costNpaLink == null) {
                this._costNpaLink = new EndingNpaLinkFields(this, "N2");
            }
            return this._costNpaLink;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroNpaTable.prototype, "CostNpaRequisites", {
        get: function () {
            if (this._costNpaRequisites == null) {
                this._costNpaRequisites = new NpaRequisitesFields(this, "N2Num", "N2Name", "N2Date", "N2Type");
            }
            return this._costNpaRequisites;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroNpaTable.prototype, "PrfNpaLink", {
        get: function () {
            if (this._prfNpaLink == null) {
                this._prfNpaLink = new NpaLinkFields(this, "N1");
            }
            return this._prfNpaLink;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroNpaTable.prototype, "PrfNpaRequisites", {
        get: function () {
            if (this._prfNpaRequisites == null) {
                this._prfNpaRequisites = new PrfNpaRequisitesFields(this, "N1Num", "N1Name", "N1Date", "N1Type");
            }
            return this._prfNpaRequisites;
        },
        enumerable: true,
        configurable: true
    });
    return RroNpaTable;
}(ObasTable));
var OutlayExchangeDataTableKeys = (function (_super) {
    __extends(OutlayExchangeDataTableKeys, _super);
    function OutlayExchangeDataTableKeys(FcrKey, ProgramKey, SubprogramKey, MainActionKey, DirectionCostKey, CostTypeKey, ObasKey, SenderCode) {
        var _this = _super.call(this) || this;
        _this.FcrKey = FcrKey;
        _this.ProgramKey = ProgramKey;
        _this.SubprogramKey = SubprogramKey;
        _this.MainActionKey = MainActionKey;
        _this.DirectionCostKey = DirectionCostKey;
        _this.CostTypeKey = CostTypeKey;
        _this.ObasKey = ObasKey;
        _this.SenderCode = SenderCode;
        return _this;
    }
    return OutlayExchangeDataTableKeys;
}(ObasTableKeys));
var OutlayExchangeDataTable = (function (_super) {
    __extends(OutlayExchangeDataTable, _super);
    function OutlayExchangeDataTable(id) {
        if (id === void 0) { id = "OutlayExchangeData"; }
        var _this = _super.call(this, id, ["FCR_ID", "Program_ID", "SubProgram_ID", "MainAction_ID", "DirectionCost_ID", "VR_ID", "OBAS_SPR_ID", "Sender_Code"]) || this;
        _this._obas = null;
        _this._senderCode = null;
        _this._securityType = null;
        _this._kbkHelper = null;
        _this._okv = null;
        return _this;
    }
    Object.defineProperty(OutlayExchangeDataTable.prototype, "Okv", {
        get: function () {
            if (this._okv == null) {
                this._okv = new ObasSprTableFieldTyped(ObasTableCollection.OkvSprTable, this);
            }
            return this._okv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "KbkHelper", {
        get: function () {
            if (this._kbkHelper == null) {
                this._kbkHelper = new ObasTableWithKbkData(this.Id, this.KeyFieldIds);
            }
            return this._kbkHelper;
        },
        enumerable: true,
        configurable: true
    });
    OutlayExchangeDataTable.prototype.GetKbkKeyFieldsValue = function () {
        return this.KbkHelper.GetKbkKeyFieldsValue();
    };
    Object.defineProperty(OutlayExchangeDataTable.prototype, "SecurityType", {
        get: function () {
            if (this._securityType == null) {
                this._securityType = new ObasSprTableFieldTyped(ObasTableCollection.SecurityTypesTable, this);
            }
            return this._securityType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "SenderCode", {
        get: function () {
            if (this._senderCode == null) {
                this._senderCode = new ObasTableField("Sender_Code", this);
            }
            return this._senderCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "Obas", {
        get: function () {
            if (this._obas == null) {
                this._obas = new ObasSprTableFieldTyped(ObasTableCollection.ObasSprTable, this);
            }
            return this._obas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "Fcr", {
        get: function () {
            return this.KbkHelper.Fcr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "GovermentProgram", {
        get: function () {
            return this.KbkHelper.GovermentProgram;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "SubProgram", {
        get: function () {
            return this.KbkHelper.SubProgram;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "MainAction", {
        get: function () {
            return this.KbkHelper.MainAction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "DirectionCost", {
        get: function () {
            return this.KbkHelper.DirectionCost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayExchangeDataTable.prototype, "CostType", {
        get: function () {
            return this.KbkHelper.CostType;
        },
        enumerable: true,
        configurable: true
    });
    OutlayExchangeDataTable.prototype.SenderCodeInitEventhandler = function (tableId, fieldId) {
        return ObasTableCollection.SelectedFoivTable.UserRegCode;
    };
    OutlayExchangeDataTable.prototype.GetKeys = function (fcrKey, programKey, subprogramKey, mainActionKey, directionCostKey, costTypeKey, obasKey, senderCode) {
        if (fcrKey === void 0) { fcrKey = this.Fcr.ForeignKey.Value; }
        if (programKey === void 0) { programKey = this.GovermentProgram.ForeignKey.Value; }
        if (subprogramKey === void 0) { subprogramKey = this.SubProgram.ForeignKey.Value; }
        if (mainActionKey === void 0) { mainActionKey = this.MainAction.ForeignKey.Value; }
        if (directionCostKey === void 0) { directionCostKey = this.DirectionCost.ForeignKey.Value; }
        if (costTypeKey === void 0) { costTypeKey = this.CostType.ForeignKey.Value; }
        if (obasKey === void 0) { obasKey = this.Obas.ForeignKey.Value; }
        if (senderCode === void 0) { senderCode = this.SenderCode.Value; }
        if (this._keys == null) {
            this._keys = new OutlayExchangeDataTableKeys(fcrKey, programKey, subprogramKey, mainActionKey, directionCostKey, costTypeKey, obasKey, senderCode);
        }
        else {
            this._keys.FcrKey = fcrKey;
            this._keys.ProgramKey = programKey;
            this._keys.SubprogramKey = subprogramKey;
            this._keys.MainActionKey = mainActionKey;
            this._keys.DirectionCostKey = directionCostKey;
            this._keys.CostTypeKey = costTypeKey;
            this._keys.ObasKey = obasKey;
            this._keys.SenderCode = senderCode;
        }
        return this._keys;
    };
    return OutlayExchangeDataTable;
}(BaseObasTableWithKeys));
var OutlayAnalysisIndicatorExchangeDataTableKeys = (function (_super) {
    __extends(OutlayAnalysisIndicatorExchangeDataTableKeys, _super);
    function OutlayAnalysisIndicatorExchangeDataTableKeys(OwnerKey, AddAnalysisIndicatorKey) {
        var _this = _super.call(this) || this;
        _this.OwnerKey = OwnerKey;
        _this.AddAnalysisIndicatorKey = AddAnalysisIndicatorKey;
        return _this;
    }
    return OutlayAnalysisIndicatorExchangeDataTableKeys;
}(ObasTableKeys));
var OutlayAnalysisIndicatorExchangeDataTable = (function (_super) {
    __extends(OutlayAnalysisIndicatorExchangeDataTable, _super);
    function OutlayAnalysisIndicatorExchangeDataTable(id, _parentTable) {
        var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, "AddAnalysisIndicator_ID"]) || this;
        _this._parentTable = _parentTable;
        _this._ownerKey = null;
        _this._addAnalyticIndicator = null;
        return _this;
    }
    Object.defineProperty(OutlayAnalysisIndicatorExchangeDataTable.prototype, "OwnerKey", {
        get: function () {
            if (this._ownerKey == null) {
                this._ownerKey = new ObasForeignKeyTableFieldTyped(this._parentTable, this, BaseObasTableFields.OwnerKeyField.Id, false, true);
            }
            return this._ownerKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutlayAnalysisIndicatorExchangeDataTable.prototype, "AddAnalyticIndicator", {
        get: function () {
            if (this._addAnalyticIndicator == null) {
                this._addAnalyticIndicator = new ObasSprTableFieldTyped(ObasTableCollection.AddAnalysisIndicatorSprTable, this);
            }
            return this._addAnalyticIndicator;
        },
        enumerable: true,
        configurable: true
    });
    OutlayAnalysisIndicatorExchangeDataTable.prototype.GetKeys = function (ownerKey, addAnalysisIndicatorKey) {
        if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
        if (addAnalysisIndicatorKey === void 0) { addAnalysisIndicatorKey = this.AddAnalyticIndicator.ForeignKey.Value; }
        if (this._keys == null) {
            this._keys = new OutlayAnalysisIndicatorExchangeDataTableKeys(ownerKey, addAnalysisIndicatorKey);
        }
        else {
            this._keys.OwnerKey = ownerKey;
            this._keys.AddAnalysisIndicatorKey = addAnalysisIndicatorKey;
        }
        return this._keys;
    };
    return OutlayAnalysisIndicatorExchangeDataTable;
}(BaseObasTableWithKeys));
var BaseRroExpendSheduleTable = (function (_super) {
    __extends(BaseRroExpendSheduleTable, _super);
    function BaseRroExpendSheduleTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._documentDate = null;
        _this._documentNumber = null;
        _this._loadDate = null;
        return _this;
    }
    Object.defineProperty(BaseRroExpendSheduleTable.prototype, "LoadDate", {
        get: function () {
            if (this._loadDate == null) {
                this._loadDate = new ObasTableField("LoadDate", this);
            }
            return this._loadDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroExpendSheduleTable.prototype, "DocumentNumber", {
        get: function () {
            if (this._documentNumber == null) {
                this._documentNumber = new ObasTableField("DocNumber", this);
            }
            return this._documentNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRroExpendSheduleTable.prototype, "DocumentDate", {
        get: function () {
            if (this._documentDate == null) {
                this._documentDate = new ObasTableField("DocDate", this);
            }
            return this._documentDate;
        },
        enumerable: true,
        configurable: true
    });
    return BaseRroExpendSheduleTable;
}(ObasTable));
var ExpendSheduleElement = (function () {
    function ExpendSheduleElement(expendSheduleElementData) {
        this._docDate = null;
        this._docNumber = null;
        this._regCode = null;
        this._secType = null;
        this._kbks = [];
        var apRcElemParts = expendSheduleElementData.match(/APRC.*/gm)[0].split("|");
        this._docNumber = apRcElemParts[2];
        this._docDate = ObasHelper.ConvertStringToDate(apRcElemParts[3], DateFormat.Short);
        this._regCode = apRcElemParts[6];
        this._secType = this.ParseSecretType(apRcElemParts[5]);
        var apLboStrElems = expendSheduleElementData.match(/APLBOSTR.*/gm);
        for (var _i = 0, apLboStrElems_1 = apLboStrElems; _i < apLboStrElems_1.length; _i++) {
            var apLboStrElem = apLboStrElems_1[_i];
            this._kbks.push(new ExpendSheduleKbkElement(apLboStrElem));
        }
    }
    ExpendSheduleElement.prototype.ParseSecretType = function (code) {
        switch (code) {
            case "0":
                return SecurityTypes.NotSecret;
            case "1":
                return SecurityTypes.DSP;
            case "2":
                return SecurityTypes.Secret;
            case "3":
                return SecurityTypes.TopSecret;
            default:
                return null;
        }
    };
    Object.defineProperty(ExpendSheduleElement.prototype, "SecurityType", {
        get: function () {
            return this._secType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleElement.prototype, "DocumentDate", {
        get: function () {
            return this._docDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleElement.prototype, "DocumentNumber", {
        get: function () {
            return this._docNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleElement.prototype, "UserRegCode", {
        get: function () {
            return this._regCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleElement.prototype, "KbkData", {
        get: function () {
            return this._kbks;
        },
        enumerable: true,
        configurable: true
    });
    return ExpendSheduleElement;
}());
var ExpendSheduleKbkElement = (function () {
    function ExpendSheduleKbkElement(expendSheduleLboElementData) {
        var apLboElemParts = expendSheduleLboElementData.split("|");
        this._code = apLboElemParts[1];
        this._lboData = [
            parseFloat(apLboElemParts[3]) || 0,
            parseFloat(apLboElemParts[4]) || 0,
            parseFloat(apLboElemParts[5]) || 0
        ];
    }
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "FullKbkCode", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "LboData", {
        get: function () {
            return this._lboData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "FoivCode", {
        get: function () {
            return this._code.substr(0, 3);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "FcrCode", {
        get: function () {
            return this._code.substr(3, 4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "ProgramCode", {
        get: function () {
            return this._code.substr(7, 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "FullSubProgramCode", {
        get: function () {
            return this._code.substr(7, 3);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "FullMainActionCode", {
        get: function () {
            return this._code.substr(7, 5);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "DirectionCostCode", {
        get: function () {
            return this._code.substr(12, 5);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpendSheduleKbkElement.prototype, "TypeCostCode", {
        get: function () {
            return this._code.substr(17, 3);
        },
        enumerable: true,
        configurable: true
    });
    return ExpendSheduleKbkElement;
}());
var RroExpendSheduleTable = (function (_super) {
    __extends(RroExpendSheduleTable, _super);
    function RroExpendSheduleTable() {
        var _this = _super.call(this, "RRO_Expend_Shedule") || this;
        _this._rroDataKey = null;
        _this._historyTable = null;
        return _this;
    }
    Object.defineProperty(RroExpendSheduleTable.prototype, "HistoryTable", {
        get: function () {
            if (this._historyTable == null) {
                this._historyTable = new RroExpendSheduleHistoryTable();
            }
            return this._historyTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroExpendSheduleTable.prototype, "RroDataKey", {
        get: function () {
            if (this._rroDataKey == null) {
                this._rroDataKey = new ObasForeignKeyTableFieldTyped(ObasTableCollection.RroDataTable, this);
            }
            return this._rroDataKey;
        },
        enumerable: true,
        configurable: true
    });
    RroExpendSheduleTable.prototype.GetRecordKey = function (rroDataKey, addIfNotExists) {
        return ObasHelper.GetValueByKeys(this, [this.RroDataKey.Id], [rroDataKey], this.RecordKey.Id, addIfNotExists);
    };
    RroExpendSheduleTable.prototype.CreateNewVersion = function (srcRroDataKey, destRroDataKey) {
        var srcKey = this.GetRecordKey(srcRroDataKey);
        var newKey = this.CloneRow(srcKey, false);
        this.RroDataKey.DefferedSetValue(destRroDataKey);
        return newKey;
    };
    RroExpendSheduleTable.prototype.SetSum = function (fieldId, newValue) {
        var oldValue = this.GetFieldValue(fieldId) || 0;
        this.SetFieldValue(fieldId, oldValue + newValue);
    };
    RroExpendSheduleTable.prototype.LoadShedule = function (shedule, rroOutlayVersion) {
        var count = 0;
        var rroDataTable = ObasTableCollection.RroDataTable;
        var fcrSprTable = ObasTableCollection.FcrTable;
        var programSprTable = ObasTableCollection.GovermentProgramTable;
        var subprogramSprTable = ObasTableCollection.SubProgramTable;
        var mainActionSprTable = ObasTableCollection.MainActionTable;
        var directionCostSprTable = ObasTableCollection.DirectionCostTable;
        var typeCostSprTable = ObasTableCollection.CostTypeTable;
        var yearDataField = BaseObasTableFields.YearDataField;
        for (var _i = 0, _a = shedule.KbkData; _i < _a.length; _i++) {
            var kbkElem = _a[_i];
            if (rroDataTable.GetRecordKeyByKbk(fcrSprTable.LookupKeyByCode(kbkElem.FcrCode), programSprTable.LookupKeyByCode(kbkElem.ProgramCode), subprogramSprTable.LookupKeyByCode(kbkElem.FullSubProgramCode), mainActionSprTable.LookupKeyByCode(kbkElem.FullMainActionCode), directionCostSprTable.LookupKeyByCode(kbkElem.DirectionCostCode), typeCostSprTable.LookupKeyByCode(kbkElem.TypeCostCode), rroOutlayVersion, true)) {
                rroDataTable.SecurityType.ForeignKey.Value = shedule.SecurityType;
                if (this.GetRecordKey(rroDataTable.RecordKey.Value, true)) {
                    this.DocumentDate.Value = shedule.DocumentDate;
                    this.DocumentNumber.Value = shedule.DocumentNumber;
                    this.LoadDate.Value = new Date();
                    this.SaveVersion();
                    count++;
                    for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
                        var fieldId = yearDataField.GenerateId(i + 1);
                        var value = kbkElem.LboData[i] || 0;
                        this.SetSum(fieldId, value);
                        this.HistoryTable.SetFieldValue(fieldId, value);
                    }
                }
            }
        }
        return count;
    };
    RroExpendSheduleTable.prototype.SaveVersion = function () {
        var _this = this;
        this.HistoryTable.AddRow();
        this.HistoryTable.RroSheduleKey.DefferedSetValue(this.RecordKey.Value);
        this.HistoryTable.LoadDate.DefferedSetValue(this.LoadDate.Value);
        this.HistoryTable.DocumentNumber.DefferedSetValue(this.DocumentNumber.Value);
        this.HistoryTable.DocumentDate.DefferedSetValue(this.DocumentDate.Value);
        var prevDataField = RroExpendSheduleHistoryTable.PrevYearDataField;
        var yearDataField = BaseObasTableFields.YearDataField;
        ObasStageSettings.IterateByYears(function (yearIndex) {
            _this.HistoryTable.SetFieldValue(prevDataField.GenerateId(yearIndex), _this.GetFieldValue(yearDataField.GenerateId(yearIndex)) || 0, false);
        });
        this.HistoryTable.PostRow();
    };
    return RroExpendSheduleTable;
}(BaseRroExpendSheduleTable));
var RroExpendSheduleHistoryTable = (function (_super) {
    __extends(RroExpendSheduleHistoryTable, _super);
    function RroExpendSheduleHistoryTable() {
        var _this = _super.call(this, "RRO_Expend_Shedule_History") || this;
        _this._rroSheduleKey = null;
        return _this;
    }
    Object.defineProperty(RroExpendSheduleHistoryTable, "PrevYearDataField", {
        get: function () {
            if (this._prevYearDataField == null) {
                this._prevYearDataField = new BaseGenericObasTableField("Prev_Y");
            }
            return this._prevYearDataField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroExpendSheduleHistoryTable.prototype, "RroSheduleKey", {
        get: function () {
            if (this._rroSheduleKey == null) {
                this._rroSheduleKey = new ObasForeignKeyTableFieldTyped(ObasTableCollection.RroExpendSheduleTable, this);
            }
            return this._rroSheduleKey;
        },
        enumerable: true,
        configurable: true
    });
    return RroExpendSheduleHistoryTable;
}(BaseRroExpendSheduleTable));
RroExpendSheduleHistoryTable._prevYearDataField = null;
var PartIndicateBudgetTypes;
(function (PartIndicateBudgetTypes) {
    PartIndicateBudgetTypes[PartIndicateBudgetTypes["Part1"] = 1] = "Part1";
    PartIndicateBudgetTypes[PartIndicateBudgetTypes["Part3"] = 2] = "Part3";
})(PartIndicateBudgetTypes || (PartIndicateBudgetTypes = {}));
var RroPartIndicateBudgetValues = (function (_super) {
    __extends(RroPartIndicateBudgetValues, _super);
    function RroPartIndicateBudgetValues() {
        var _this = _super.call(this, "RRO_PartIndicateBudgetValues") || this;
        _this._rroVersionKey = null;
        _this._partKey = null;
        return _this;
    }
    Object.defineProperty(RroPartIndicateBudgetValues.prototype, "PartKey", {
        get: function () {
            if (this._partKey == null) {
                this._partKey = new ObasTableField("RRO_PartIndicateBudgetStrCode_ID", this);
            }
            return this._partKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RroPartIndicateBudgetValues.prototype, "RroVersionKey", {
        get: function () {
            if (this._rroVersionKey == null) {
                this._rroVersionKey = new ObasForeignKeyTableFieldTyped(ObasTableCollection.RroObasVersionsTable, this);
            }
            return this._rroVersionKey;
        },
        enumerable: true,
        configurable: true
    });
    RroPartIndicateBudgetValues.prototype.IsPart3 = function () {
        return this.PartKey.Value === PartIndicateBudgetTypes.Part3;
    };
    RroPartIndicateBudgetValues.prototype.IsPart1 = function () {
        return this.PartKey.Value === PartIndicateBudgetTypes.Part1;
    };
    return RroPartIndicateBudgetValues;
}(ObasTable));
