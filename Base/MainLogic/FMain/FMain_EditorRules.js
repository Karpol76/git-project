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
    var BaseEditor = (function (_super) {
        __extends(BaseEditor, _super);
        function BaseEditor(id, _document) {
            var _this = _super.call(this, EditorProObjectTypes.Editor, id) || this;
            _this._document = _document;
            _this._mode = null;
            _this._systemEditor = null;
            return _this;
        }
        Object.defineProperty(BaseEditor.prototype, "SystemEditor", {
            get: function () {
                if (this._systemEditor == null) {
                    this._systemEditor = this._document.Editors.getValue(this.Id);
                }
                return this._systemEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseEditor.prototype, "Sheets", {
            get: function () {
                return this.SystemEditor.Sheets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseEditor.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseEditor.prototype, "Mode", {
            get: function () {
                return this._mode == null ? +this.SystemEditor.Mode : this._mode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseEditor.prototype, "IsPreviewMode", {
            get: function () {
                return this._mode === EditorShowMode.Preview;
            },
            enumerable: true,
            configurable: true
        });
        BaseEditor.prototype.ResetMode = function () {
            this._mode = null;
        };
        BaseEditor.prototype.CommonGetIsReadonlyEventHandler = function (sheetId, tableId, fieldId, isReadonly) {
            if (this.IsPreviewMode) {
                return true;
            }
            else {
                return isReadonly;
            }
        };
        BaseEditor.prototype.CommonGetIsVisibleEventHandler = function (sheetId, tableId, fieldId, isVisible) {
            if (this.IsPreviewMode) {
                return true;
            }
            else {
                return isVisible;
            }
        };
        BaseEditor.prototype.CommonGetButtonVisible = function (tableId, fieldId, buttonId, isVisible) {
            switch (this.Mode) {
                case EditorShowMode.Preview:
                    return buttonId.indexOf("PreviewButton") > -1;
                default:
                    return isVisible;
            }
        };
        BaseEditor.prototype.GetMainButtonVisible = function (tableId, fieldId, buttonId, isVisible) {
            switch (buttonId) {
                case ClientButton.EditorOkButton.Id:
                    return !this.IsPreviewMode;
                default:
                    return true;
            }
        };
        BaseEditor.prototype.GetMainButtonCaption = function (tableId, fieldId, buttonId, caption) {
            switch (buttonId) {
                case ClientButton.EditorCancelButton.Id:
                    return this.IsPreviewMode ? "OK" : ClientButton.EditorCancelButton.DefaultCaption;
                default:
                    return caption;
            }
        };
        BaseEditor.prototype.Show = function (mode) {
            this._mode = mode;
            var result;
            switch (mode) {
                case EditorShowMode.Create:
                    result = this.SystemEditor.Show(EditorMode.Create);
                    break;
                case EditorShowMode.Edit:
                    result = this.SystemEditor.Show(EditorMode.Edit);
                    break;
                default:
                    result = this.SystemEditor.Show();
            }
            this.ResetMode();
            return result;
        };
        return BaseEditor;
    }(BaseObject));
    FMain.BaseEditor = BaseEditor;
    var BaseOutlayVersionsEditor = (function (_super) {
        __extends(BaseOutlayVersionsEditor, _super);
        function BaseOutlayVersionsEditor(id, document, _sourceTable) {
            var _this = _super.call(this, id, document) || this;
            _this._sourceTable = _sourceTable;
            return _this;
        }
        Object.defineProperty(BaseOutlayVersionsEditor.prototype, "SourceTable", {
            get: function () {
                return this._sourceTable;
            },
            enumerable: true,
            configurable: true
        });
        BaseOutlayVersionsEditor.prototype.IsApproved = function () {
            return this._sourceTable.Status === OutlayStatuses.Approved;
        };
        BaseOutlayVersionsEditor.prototype.IsAgreed = function () {
            return this._sourceTable.Status === OutlayStatuses.Agreed;
        };
        BaseOutlayVersionsEditor.prototype.FilterStatuses = function () {
            var status = ObasTableCollection.OutlayStatusSprTable.Status;
            switch (this._sourceTable.Status) {
                case OutlayStatuses.Draft:
                    return (status === OutlayStatuses.Draft ||
                        status === OutlayStatuses.AgreeSubmit);
                case OutlayStatuses.AgreeSubmit:
                    return (status === OutlayStatuses.Draft ||
                        status === OutlayStatuses.AgreeSubmit ||
                        status === OutlayStatuses.Agreed);
                case OutlayStatuses.Agreed:
                    return (status === OutlayStatuses.AgreeSubmit ||
                        status === OutlayStatuses.Agreed ||
                        status === OutlayStatuses.ApproveSubmit);
                case OutlayStatuses.ApproveSubmit:
                    return (status === OutlayStatuses.Agreed ||
                        status === OutlayStatuses.ApproveSubmit ||
                        status === OutlayStatuses.Approved);
                default:
                    return true;
            }
        };
        BaseOutlayVersionsEditor.prototype.CloseEventHandler = function (isSuccess) {
            if (isSuccess) {
                switch (this._sourceTable.Status) {
                    case OutlayStatuses.Approved:
                        this._sourceTable.ApproveVersion();
                        break;
                }
            }
        };
        return BaseOutlayVersionsEditor;
    }(BaseEditor));
    FMain.BaseOutlayVersionsEditor = BaseOutlayVersionsEditor;
    var SumOutlayVersionsEditor = (function (_super) {
        __extends(SumOutlayVersionsEditor, _super);
        function SumOutlayVersionsEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SumOutlayVersionsEditor;
    }(BaseOutlayVersionsEditor));
    FMain.SumOutlayVersionsEditor = SumOutlayVersionsEditor;
    var OutlayVersionsEditor = (function (_super) {
        __extends(OutlayVersionsEditor, _super);
        function OutlayVersionsEditor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._canLockOutlay = false;
            _this._canUnLockOutlay = false;
            return _this;
        }
        OutlayVersionsEditor.prototype.EditFieldEventHandler = function (sheetId, fieldId, newValue, oldValue) {
            switch (fieldId) {
                case this.SourceTable.StatusSprField.ForeignKey.Id:
                    this.EditStatusEventHandler(newValue, oldValue);
                    break;
            }
            return true;
        };
        OutlayVersionsEditor.prototype.EditStatusEventHandler = function (newValue, oldValue) {
            if (oldValue === OutlayStatuses.Draft && newValue === OutlayStatuses.AgreeSubmit) {
                if (this.SourceTable.HasFullData() || Client.ShowMessage("Внимание", "Распределены не все доведенные ЛБО. Отправить на согласование?", MessageIcons.Warning, MessageButtons.YesNo) === MessageResults.Yes) {
                    this._canLockOutlay = true;
                }
                else {
                    this.SourceTable.Status = oldValue;
                }
            }
            if (oldValue > OutlayStatuses.Draft && newValue === OutlayStatuses.Draft) {
                this._canUnLockOutlay = true;
            }
        };
        OutlayVersionsEditor.prototype.CloseEventHandler = function (isSuccess) {
            var _this = this;
            if (isSuccess) {
                switch (this.SourceTable.Status) {
                    case OutlayStatuses.Approved:
                        ObasHelper.DoLongOperation(function () {
                            _this.SourceTable.ApproveVersion();
                        });
                        break;
                    case OutlayStatuses.AgreeSubmit:
                        this.LockOutlay(this._canLockOutlay, true);
                        break;
                    case OutlayStatuses.Draft:
                        this.LockOutlay(this._canUnLockOutlay, false);
                        break;
                }
            }
            this.ResetState();
        };
        OutlayVersionsEditor.prototype.LockOutlay = function (canDoIt, canLock) {
            var _this = this;
            if (canDoIt) {
                ObasHelper.DoLongOperation(function () {
                    _this.SourceTable.LockOutlay(canLock);
                });
            }
        };
        OutlayVersionsEditor.prototype.ResetState = function () {
            this._canLockOutlay = false;
            this._canUnLockOutlay = false;
        };
        return OutlayVersionsEditor;
    }(BaseOutlayVersionsEditor));
    FMain.OutlayVersionsEditor = OutlayVersionsEditor;
    var RecipientDetailsEditor = (function (_super) {
        __extends(RecipientDetailsEditor, _super);
        function RecipientDetailsEditor(document) {
            var _this = _super.call(this, ObasTableCollection.SelectedFoivTable.Id + "Editor", document) || this;
            _this._sourceTable = ObasTableCollection.SelectedFoivTable;
            _this._canClose = true;
            return _this;
        }
        Object.defineProperty(RecipientDetailsEditor.prototype, "SourceTable", {
            get: function () {
                return this._sourceTable;
            },
            enumerable: true,
            configurable: true
        });
        RecipientDetailsEditor.prototype.IsRecipient = function () {
            return this.SourceTable.IsRecipient();
        };
        RecipientDetailsEditor.prototype.IsManager = function () {
            return this.SourceTable.IsManager() || this.IsRecipient();
        };
        RecipientDetailsEditor.prototype.IsMainManager = function () {
            return this.SourceTable.IsMainManager();
        };
        RecipientDetailsEditor.prototype.CanCloseEventHandler = function (buttonResult) {
            return (this._canClose && buttonResult === MessageResults.Cancel) || buttonResult === MessageResults.Ok;
        };
        RecipientDetailsEditor.prototype.CloseEventHandler = function (exitResult) {
            if (this.SourceTable.RowCount === 0) {
                Client.Exit();
            }
        };
        RecipientDetailsEditor.prototype.GetMainButtonVisible = function (tableId, fieldId, buttonId, isVisible) {
            switch (buttonId) {
                case ClientButton.EditorCancelButton.Id:
                    return this._canClose;
                default:
                    return true;
            }
        };
        RecipientDetailsEditor.prototype.Show = function (mode, canClose) {
            if (canClose === void 0) { canClose = true; }
            this._canClose = canClose;
            var result = _super.prototype.Show.call(this, mode);
            this._canClose = true;
            return result;
        };
        return RecipientDetailsEditor;
    }(BaseEditor));
    FMain.RecipientDetailsEditor = RecipientDetailsEditor;
    var KbkEditor = (function (_super) {
        __extends(KbkEditor, _super);
        function KbkEditor(document) {
            var _this = _super.call(this, "KBKEditor", document) || this;
            _this._sourceTable = ObasTableCollection.RroDataTable;
            return _this;
        }
        KbkEditor.prototype.OnCanCloseEventHandler = function (buttonResult) {
            var isValid = this._sourceTable.GetObasKey() != null;
            if ((!isValid) && (buttonResult === MessageResults.Ok)) {
                Client.ShowMessage("Некорректный КБК", "Выберите корректный набор элементов КБК!");
            }
            return buttonResult === MessageResults.Cancel || (isValid && buttonResult === MessageResults.Ok);
        };
        KbkEditor.prototype.CloseEventHandler = function (isSuccess) {
            if (isSuccess) {
                this._sourceTable.CreateSynonym();
            }
        };
        return KbkEditor;
    }(BaseEditor));
    FMain.KbkEditor = KbkEditor;
    var SumEditor = (function (_super) {
        __extends(SumEditor, _super);
        function SumEditor(id, document, _sourceTable, _sourceTableCaption, _sumTableCaption) {
            var _this = _super.call(this, id, document) || this;
            _this._sourceTable = _sourceTable;
            _this._sourceTableCaption = _sourceTableCaption;
            _this._sumTableCaption = _sumTableCaption;
            _this._sumTable = new AggrTransposedObasTable("tSum" + _sourceTable.Id, [], []);
            return _this;
        }
        SumEditor.prototype.CanCloseEventHandler = function (buttonResult) {
            if (buttonResult === MessageResults.Cancel) {
                return true;
            }
            else {
                var message = null;
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    var borderVal = this.GetBorderValue(i) || 0;
                    var curVal = this._sumTable.GetFieldValue(BaseObasTableFields.YearDataField.GenerateId(i));
                    if (curVal > borderVal) {
                        message = "\u0421\u0443\u043C\u043C\u0430 \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u0445 " + this._sourceTableCaption + ": " + ObasHelper.ConvertToString(curVal, 2) + " \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u0443\u044E \u0441\u0443\u043C\u043C\u0443 \u043F\u043E " + this._sumTableCaption + ": " + ObasHelper.ConvertToString(borderVal, 2);
                        break;
                    }
                }
                if (message) {
                    Client.ShowMessage("Ошибка", message, MessageIcons.Error);
                }
                return (message == null && buttonResult === MessageResults.Ok);
            }
        };
        return SumEditor;
    }(BaseEditor));
    var OutlayKosguSumEditor = (function (_super) {
        __extends(OutlayKosguSumEditor, _super);
        function OutlayKosguSumEditor(id, document) {
            return _super.call(this, id, document, ObasTableCollection.RroOutlayKosguTable, "КОСГУ", "форме") || this;
        }
        OutlayKosguSumEditor.prototype.GetBorderValue = function (yearIndex) {
            return ObasTableCollection.RroOutlayKosguTable.RroObasVersion.SourceTable
                .GetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearIndex));
        };
        return OutlayKosguSumEditor;
    }(SumEditor));
    FMain.OutlayKosguSumEditor = OutlayKosguSumEditor;
    var ObasAddAnalysisIndicatorSumEditor = (function (_super) {
        __extends(ObasAddAnalysisIndicatorSumEditor, _super);
        function ObasAddAnalysisIndicatorSumEditor(id, document) {
            return _super.call(this, id, document, ObasTableCollection.RroObasAddAnalysisIndicatorTable, "аналитических показателей", "КОСГУ") || this;
        }
        ObasAddAnalysisIndicatorSumEditor.prototype.GetBorderValue = function (yearIndex) {
            return ObasTableCollection.RroObasAddAnalysisIndicatorTable.RroOutlayKosguKey.SourceTable
                .GetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearIndex));
        };
        return ObasAddAnalysisIndicatorSumEditor;
    }(SumEditor));
    FMain.ObasAddAnalysisIndicatorSumEditor = ObasAddAnalysisIndicatorSumEditor;
})(FMain || (FMain = {}));
