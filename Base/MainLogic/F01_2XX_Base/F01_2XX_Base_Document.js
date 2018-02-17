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
var F012XX;
(function (F012XX) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion, uniqOrgTableId) {
            var _this = _super.call(this, id, version, oldVersion, uniqOrgTableId) || this;
            _this._spr0103 = null;
            _this._p1RowsTable = null;
            _this._p1TotalTable = null;
            _this._onlyInsTable = null;
            _this._p1Sheet = null;
            _this._onlyInsuranceSheet = null;
            _this._tableRules = new F012XX.TableRules(_this);
            _this._interfaceRules = new F012XX.InterfaceRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "OnlyInsuranceSheet", {
            get: function () {
                if (this._onlyInsuranceSheet == null) {
                    this._onlyInsuranceSheet = new OnlyInsuranceSheet("SHT_OnlyIns", this);
                }
                return this._onlyInsuranceSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F012XX.P1Sheet("SHT_F01_211_1", this);
                }
                return this._p1Sheet;
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
        Object.defineProperty(FDocument, "Spr0105", {
            get: function () {
                if (this._spr0105 == null) {
                    this._spr0105 = new SprTable("Spr_01_05");
                }
                return this._spr0105;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Spr0103", {
            get: function () {
                if (this._spr0103 == null) {
                    this._spr0103 = new F012XX.SprTable0103(this);
                }
                return this._spr0103;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1RowsTable", {
            get: function () {
                if (this._p1RowsTable == null) {
                    this._p1RowsTable = new F012XX.P1RowsObasTable("F01_211_1_Rows");
                }
                return this._p1RowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F012XX.P1TotalTable("F01_211_1_Values", this);
                }
                return this._p1TotalTable;
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
        Object.defineProperty(FDocument.prototype, "OnlyInsuranceTable", {
            get: function () {
                if (this._onlyInsTable == null) {
                    this
                        ._onlyInsTable = new F012XX.OnlyInsuranceTable("F01_222_OnlyFormInsurValues", this, this.P1TotalTable, F012XX.P1TotalStrKeys.OtherIns);
                }
                return this._onlyInsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "KeyFieldIds", {
            get: function () {
                throw new Error("Abstract getter");
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseTypedOrgDocumentObject));
    FDocument._spr0105 = null;
    F012XX.FDocument = FDocument;
})(F012XX || (F012XX = {}));
