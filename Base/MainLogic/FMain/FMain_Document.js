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
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._mainSheet = null;
            _this._outlayVersionsEditor = null;
            _this._recipientDetailsEditor = null;
            _this._analyticIndicatorsListEditor = null;
            _this._versionsSheet = null;
            _this._normalMode = true;
            _this._kbkEditor = null;
            _this._sumOutlayVersionsSheet = null;
            _this._sumOutlaysMainSheet = null;
            _this._sumOutlayVersionsEditor = null;
            _this._sumOutlayVersionsListEditor = null;
            _this._dapSheet = null;
            _this._expendSheduleSheet = null;
            _this._outlayKosguSumEditor = null;
            _this._obasAddAnalysisIndicatorSumEditor = null;
            _this._addAnalysisIndicatorSheet = null;
            _this._tableRules = new FMain.TableRules(_this);
            _this._interfaceRules = new FMain.InterfaceRules(_this);
            _this._updateRules = new FMain.UpdateRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "ObasAddAnalysisIndicatorSumEditor", {
            get: function () {
                if (this._obasAddAnalysisIndicatorSumEditor == null) {
                    this._obasAddAnalysisIndicatorSumEditor = new FMain.ObasAddAnalysisIndicatorSumEditor("RROAddAnalysisIndicatorEditor", this);
                }
                return this._obasAddAnalysisIndicatorSumEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "OutlayKosguSumEditor", {
            get: function () {
                if (this._outlayKosguSumEditor == null) {
                    this._outlayKosguSumEditor = new FMain.OutlayKosguSumEditor("RROKosguEditor", this);
                }
                return this._outlayKosguSumEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ExpendSheduleSheet", {
            get: function () {
                if (this._expendSheduleSheet == null) {
                    this._expendSheduleSheet = new FMain.ExpendSheduleSheet("ExpendShedule", false);
                }
                return this._expendSheduleSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "DapSheet", {
            get: function () {
                if (this._dapSheet == null) {
                    this._dapSheet = new FMain.DapSheet("DAP", this);
                }
                return this._dapSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "NormalMode", {
            get: function () {
                return this._normalMode;
            },
            set: function (value) {
                this._normalMode = value;
                Client.SendMessage(ObasDocumentCollection.RroDocumentId, "%Doc%.SetNormalMode", [value]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SumOutlayVersionsListEditor", {
            get: function () {
                if (this._sumOutlayVersionsListEditor == null) {
                    this._sumOutlayVersionsListEditor = new FMain.BaseEditor("SumOutlayVersionsListEditor", this);
                }
                return this._sumOutlayVersionsListEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SumOutlayVersionsEditor", {
            get: function () {
                if (this._sumOutlayVersionsEditor == null) {
                    this._sumOutlayVersionsEditor = new FMain.SumOutlayVersionsEditor("SumOutlayVersionsEditor", this, ObasTableCollection.RroSumOutlayTable);
                }
                return this._sumOutlayVersionsEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SumOutlaysMainSheet", {
            get: function () {
                if (this._sumOutlaysMainSheet == null) {
                    this._sumOutlaysMainSheet = new FMain.SumOutlaysMainSheet("SumOutlaysMain", this);
                }
                return this._sumOutlaysMainSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SumOutlayVersionsSheet", {
            get: function () {
                if (this._sumOutlayVersionsSheet == null) {
                    this._sumOutlayVersionsSheet = new FMain.SumOutlayVersionsSheet("SumOutlaysVersions", this, this.SumOutlayVersionsEditor, this.SumOutlaysMainSheet);
                }
                return this._sumOutlayVersionsSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "KbkEditor", {
            get: function () {
                if (this._kbkEditor == null) {
                    this._kbkEditor = new FMain.KbkEditor(this);
                }
                return this._kbkEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "VersionsSheet", {
            get: function () {
                if (this._versionsSheet == null) {
                    this._versionsSheet = new FMain.OutlayVersionsSheet("Versions", this, this.OutlayVersionsEditor, this.ObasSheet);
                }
                return this._versionsSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "AnalyticIndicatorsListEditor", {
            get: function () {
                if (this._analyticIndicatorsListEditor == null) {
                    this._analyticIndicatorsListEditor = new FMain.BaseEditor("AddAnalysisIndicatorListEditor", this);
                }
                return this._analyticIndicatorsListEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RecipientDetailsEditor", {
            get: function () {
                if (this._recipientDetailsEditor == null) {
                    this._recipientDetailsEditor = new FMain.RecipientDetailsEditor(this);
                }
                return this._recipientDetailsEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "OutlayVersionsEditor", {
            get: function () {
                if (this._outlayVersionsEditor == null) {
                    this._outlayVersionsEditor = new FMain.OutlayVersionsEditor("OutlayVersionsEditor", this, ObasTableCollection.RroOutlayTable);
                }
                return this._outlayVersionsEditor;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(FDocument.prototype, "AddAnalysisIndicatorSheet", {
            get: function () {
                if (this._addAnalysisIndicatorSheet == null) {
                    this._addAnalysisIndicatorSheet = new FMain.AddAnalysisIndicatorSheet("AddAnalysisIndicatorSheet", this);
                }
                return this._addAnalysisIndicatorSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "OKPDListEditor", {
            get: function () {
                if (this._okpdListEditor == null) {
                    this._okpdListEditor = new FMain.BaseEditor("OKPDListEditor", this);
                }
                return this._okpdListEditor;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(FDocument.prototype, "AddAnalisisIndicatorSheet", {
            get: function () {
                if (this._addAnalisisIndicatorSheet == null) {
                    this._addAnalisisIndicatorSheet = new FMain.AddAnalisisIndicatorSheet("AddAnalysisIndicatorSheet", this);
                }
                return this._addAnalisisIndicatorSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableRules", {
            get: function () {
                return this._tableRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "UpdateRules", {
            get: function () {
                return this._updateRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InterfaceRules", {
            get: function () {
                return this._interfaceRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ObasSheet", {
            get: function () {
                if (this._mainSheet == null) {
                    this._mainSheet = new FMain.MainSheet("Main", this);
                }
                return this._mainSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "IsReadOnly", {
            get: function () {
                return this.Tables.getValue("WorkParams").GetFieldValue("ReadOnly");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "UndefinedElementsTable", {
            get: function () {
                if (this._undefinedElsTable == null) {
                    this._undefinedElsTable = new UndefinedElementsTable();
                }
                return this._undefinedElsTable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(DocumentObject));
    FMain.FDocument = FDocument;
    var SprElement = (function () {
        function SprElement(_sprTable, _journal) {
            this._sprTable = _sprTable;
            this._journal = _journal;
            this._key = null;
            this.Name = null;
            this.Code = null;
        }
        Object.defineProperty(SprElement.prototype, "Key", {
            get: function () {
                if (this._key == null) {
                    this.InitKey();
                }
                return this._key;
            },
            enumerable: true,
            configurable: true
        });
        SprElement.prototype.InitKey = function () {
            if (this.Code != null) {
                this._key = this._sprTable.LookupKeyByCode(this.Code);
            }
            else if (this.Name != null) {
                this._key = this._sprTable.LookupKeyByName(this.Name);
            }
            if (this._key == null) {
                this._journal.AddElement(this);
            }
        };
        Object.defineProperty(SprElement.prototype, "SprTable", {
            get: function () {
                return this._sprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SprElement.prototype, "HasKey", {
            get: function () {
                return this.Key != null;
            },
            enumerable: true,
            configurable: true
        });
        return SprElement;
    }());
    var UndefinedElementsTable = (function (_super) {
        __extends(UndefinedElementsTable, _super);
        function UndefinedElementsTable(id) {
            if (id === void 0) { id = "UndefinedSprElements"; }
            var _this = _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], "ElCode", "ElName") || this;
            _this._sprName = new ObasTableField("SprName", _this);
            return _this;
        }
        Object.defineProperty(UndefinedElementsTable.prototype, "SprName", {
            get: function () {
                return this._sprName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UndefinedElementsTable.prototype, "TemplatePath", {
            get: function () {
                return Client.GetCurrentDirectory() + ObasStageSettings.ExcelTemplateDirectory + "\\" + this.Id + ".xls";
            },
            enumerable: true,
            configurable: true
        });
        UndefinedElementsTable.prototype.AddElement = function (element) {
            var sprName = element.SprTable.Caption;
            if (sprName != null &&
                (element.Code != null || element.Name != null) &&
                !(this.Locate([this.SprName.Id, this.Code.Id], [sprName, element.Code]) ||
                    this.Locate([this.SprName.Id, this.Name.Id], [sprName, element.Name]) ||
                    this.Locate([this.SprName.Id, this.Code.Id, this.Name.Id], [sprName, element.Code, element.Name]))) {
                this.AddRow();
                this.SprName.Value = sprName;
                this.Code.Value = element.Code;
                this.Name.Value = element.Name;
                this.PostRow();
            }
        };
        return UndefinedElementsTable;
    }(SprTable));
})(FMain || (FMain = {}));
