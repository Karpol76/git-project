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
var F05105;
(function (F05105) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._insuranceSheet = null;
            _this._p1Sheet = null;
            _this._p2Sheet = null;
            _this._p3GroupSheet = null;
            _this._p1TotalTable = null;
            _this._insuranceValuesTable = null;
            _this._p3DataTable = null;
            _this._tableRules = new F05105.TableRules(_this);
            _this._interfaceRules = new F05105.InterfaceRules(_this);
            _this._updateRules = new F05105.UpdateRules(_this);
            _this._exportRules = new F05105.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P3DataTable", {
            get: function () {
                if (this._p3DataTable == null) {
                    this._p3DataTable = new F05105.P3DataTable("F05_105_P3_Values", this, new ObasTable("F05_105_P3_Rows"), this.P1TotalTable, this.InsuranceValuesTable);
                }
                return this._p3DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InsuranceValuesTable", {
            get: function () {
                if (this._insuranceValuesTable == null) {
                    this._insuranceValuesTable = new F05105.InsuranceValuesTable("F05_105_InsuranceValues", this, this.P1TotalTable);
                }
                return this._insuranceValuesTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F05105.P1TotalTable("F05_105_P1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3GroupSheet", {
            get: function () {
                if (this._p3GroupSheet == null) {
                    this._p3GroupSheet = new F05105.P3GroupSheet(this);
                }
                return this._p3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new F05105.P2Sheet("SHT_P2", this);
                }
                return this._p2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F05105.P1Sheet("SHT_P1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InsuranceSheet", {
            get: function () {
                if (this._insuranceSheet == null) {
                    this._insuranceSheet = new InsuranceSheet("SHT_P4", this);
                }
                return this._insuranceSheet;
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
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F05105.FDocument = FDocument;
})(F05105 || (F05105 = {}));
