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
var F01290;
(function (F01290) {
    var MonthsTable = F012XX.MonthsTable;
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1TotalTable = null;
            _this._p2Sp1Table = null;
            _this._p2Sp2Table = null;
            _this._monthsTable = null;
            _this._p2Sp1Sheet = null;
            _this._p2Sp2Sheet = null;
            _this._tableRules = new F01290.TableRules(_this);
            _this._interfaceRules = new F01290.InterfaceRules(_this);
            _this._updateRules = new F01290.UpdateRules(_this);
            _this._exportRules = new F01290.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F01290.P1TotalTable("F01_290_1_1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Table", {
            get: function () {
                if (this._p2Sp1Table == null) {
                    this._p2Sp1Table = new F01290.P2Sp1Table("F01_290_2_1_Values", this, F01290.P1StrKeys.FundWage, FDocument._keyFieldIs, this.MonthsTable, this.P2Sp2Table);
                }
                return this._p2Sp1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2Table", {
            get: function () {
                if (this._p2Sp2Table == null) {
                    this._p2Sp2Table = new F01290.P2Sp2Table("F01_290_2_2_Values", this, this.P1TotalTable);
                }
                return this._p2Sp2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "MonthsTable", {
            get: function () {
                if (this._monthsTable == null) {
                    this._monthsTable = new MonthsTable("F01_290_Months", this);
                }
                return this._monthsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F01290.P1Sheet("SHT_F01_290_1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Sheet", {
            get: function () {
                if (this._p2Sp1Sheet == null) {
                    this._p2Sp1Sheet = new F01290.P2Sp1Sheet("SHT_F01_290_2_1", this);
                }
                return this._p2Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2Sheet", {
            get: function () {
                if (this._p2Sp2Sheet == null) {
                    this._p2Sp2Sheet = new InsuranceSheet("SHT_F01_290_2_2", this);
                }
                return this._p2Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sheet", {
            get: function () {
                if (this._p3Sheet == null) {
                    this._p3Sheet = new F01290.P3Sheet("SHT_F01_290_3", this);
                }
                return this._p3Sheet;
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
    FDocument._keyFieldIs = [BaseObasTableFields.StrKeyField.Id];
    F01290.FDocument = FDocument;
})(F01290 || (F01290 = {}));
