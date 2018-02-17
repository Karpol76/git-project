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
var F01110;
(function (F01110) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p2Sp3ValuesTable = null;
            _this._p2Sp4ObasTable = null;
            _this._onlyInsurValuesTable = null;
            _this._p1TotalTable = null;
            _this._postNameSprTable = null;
            _this._p1Sheet = null;
            _this._p2Sp3GroupSheet = null;
            _this._insuranceSheet = null;
            _this._onlyInsuranceSheet = null;
            _this._tableRules = new F01110.TableRules(_this);
            _this._interfaceRules = new F01110.InterfaceRules(_this);
            _this._updateRules = new F01110.UpdateRules(_this);
            _this._exportRules = new F01110.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument, "IndexationFieldId", {
            get: function () {
                return this._indexationFieldId;
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
        Object.defineProperty(FDocument.prototype, "PostNameSprTable", {
            get: function () {
                if (this._postNameSprTable == null) {
                    this._postNameSprTable = new F01110.PostNameSprTable();
                }
                return this._postNameSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3ValuesTable", {
            get: function () {
                if (this._p2Sp3ValuesTable == null) {
                    this._p2Sp3ValuesTable = new F01110.P2Sp3DataTable("F01_110_R2_Data_V2", this, this.P2Sp4ValuesTable);
                }
                return this._p2Sp3ValuesTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp4ValuesTable", {
            get: function () {
                if (this._p2Sp4ObasTable == null) {
                    this._p2Sp4ObasTable = new F01110.P2Sp4ObasTable("F01_110_R3_SumValues", this, this.P1TotalTable);
                }
                return this._p2Sp4ObasTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "OnlyInsurValuesTable", {
            get: function () {
                if (this._onlyInsurValuesTable == null) {
                    this
                        ._onlyInsurValuesTable = new F01110.OnlyInsuranceTable("F01_110_OnlyFormInsurValues", this, this.P1TotalTable, F01110.P1TotalStrKeys.OtherIns);
                }
                return this._onlyInsurValuesTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F01110.P1TotalTable("F01_110_FinalTotalValues", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "OnlyInsuranceSheet", {
            get: function () {
                if (this._onlyInsuranceSheet == null) {
                    this._onlyInsuranceSheet = new OnlyInsuranceSheet("SHT_01_110_OnlyFormInsurValues", this);
                }
                return this._onlyInsuranceSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InsuranceSheet", {
            get: function () {
                if (this._insuranceSheet == null) {
                    this._insuranceSheet = new InsuranceSheet("SHT_01_110_R3", this);
                }
                return this._insuranceSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3GroupSheet", {
            get: function () {
                if (this._p2Sp3GroupSheet == null) {
                    this._p2Sp3GroupSheet = new F01110.P2Sp3GroupSheet(this);
                }
                return this._p2Sp3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F01110.P1Sheet("SHT_01_110_FinalTotal", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    FDocument._indexationFieldId = "Value_Federals";
    F01110.FDocument = FDocument;
})(F01110 || (F01110 = {}));
