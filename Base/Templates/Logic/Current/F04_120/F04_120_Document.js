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
var F04120;
(function (F04120) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p2Sp1Sheet = null;
            _this._p2Sp3Sheet = null;
            _this._p2Sp2Sheet = null;
            _this._p1TotalTable = null;
            _this._p2ObjectDataTable = null;
            _this._p2InvestDataTable = null;
            _this._addYearsHelper = null;
            _this._addDataYearsCount = FDocument.AddYearsCount;
            _this._mainDataYearsCount = ObasStageSettings.YearsCount;
            _this.Settings.YearsCount = _this._mainDataYearsCount + _this._addDataYearsCount;
            _this._tableRules = new F04120.TableRules(_this);
            _this._interfaceRules = new F04120.InterfaceRules(_this);
            _this._updateRules = new F04120.UpdateRules(_this);
            _this._exportRules = new F04120.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "AddYearsHelper", {
            get: function () {
                if (this._addYearsHelper == null) {
                    this._addYearsHelper = new AddYearsDocumentHelper(this);
                }
                return this._addYearsHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2InvestDataTable", {
            get: function () {
                if (this._p2InvestDataTable == null) {
                    this._p2InvestDataTable = new F04120.P2InvestDataTable("F04_120_R2_2", this, this.P2ObjectDataTable);
                }
                return this._p2InvestDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2ObjectDataTable", {
            get: function () {
                if (this._p2ObjectDataTable == null) {
                    this._p2ObjectDataTable = new F04120.P2ObjectDataTable("F04_120_R2_1", this, this.P1TotalTable);
                }
                return this._p2ObjectDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F04120.P1TotalTable("F04_120_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2Sheet", {
            get: function () {
                if (this._p2Sp2Sheet == null) {
                    this._p2Sp2Sheet = new F04120.P2Sp2Sheet("SHT_F04_120_R2_2", this.P2InvestDataTable);
                }
                return this._p2Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3Sheet", {
            get: function () {
                if (this._p2Sp3Sheet == null) {
                    this._p2Sp3Sheet = new F04120.P2Sp3Sheet("SHT_F04_120_R2_3", this);
                }
                return this._p2Sp3Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Sheet", {
            get: function () {
                if (this._p2Sp1Sheet == null) {
                    this._p2Sp1Sheet = new F04120.P2Sp1Sheet("SHT_F04_120_R2_1", this);
                }
                return this._p2Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "AddDataYearsCount", {
            get: function () {
                return this._addDataYearsCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "MainDataYearsCount", {
            get: function () {
                return this._mainDataYearsCount;
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
        Object.defineProperty(FDocument.prototype, "InterfaceRules", {
            get: function () {
                return this._interfaceRules;
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
        Object.defineProperty(FDocument.prototype, "ExportRules", {
            get: function () {
                return this._exportRules;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    FDocument.AddYearsCount = 1;
    F04120.FDocument = FDocument;
})(F04120 || (F04120 = {}));
