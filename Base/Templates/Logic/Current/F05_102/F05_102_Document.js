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
var F05102;
(function (F05102) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1 = null;
            _this._p1TotalTable = null;
            _this._tableP2 = null;
            _this._sheetP2 = null;
            _this._sheetP1 = null;
            _this._tableRules = new F05102.TableRules(_this);
            _this._interfaceRules = new F05102.InterfaceRules(_this);
            _this._updateRules = new F05102.UpdateRules(_this);
            _this._exportRules = new F05102.ExportRules(_this);
            return _this;
        }
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
        FDocument.prototype.GetKeyDictionary = function () {
            var codeCsr = this.MainParametersTable.GetCSRCode();
            switch (codeCsr) {
                case "1430451580":
                    return F05102.KeyDictionary.ScienceCity;
                case "3620450100":
                case "0540335700":
                    return F05102.KeyDictionary.Zato;
                case "3050751560":
                    return F05102.KeyDictionary.Municipal;
                default:
                    return F05102.KeyDictionary.Subject;
            }
        };
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new F05102.P1TotalTableExt("F05_102_R1_SumValues", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F05102.FObasTableP1Total("F05_102_R1_TotalSumValues", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2", {
            get: function () {
                if (this._tableP2 == null) {
                    this._tableP2 = new F05102.TableP2("F05_102_R2", this);
                }
                return this._tableP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP1", {
            get: function () {
                if (this._sheetP1 == null) {
                    this._sheetP1 = new F05102.P1Sheet("SHT_F05_102_R1", this);
                }
                return this._sheetP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new F05102.P2Sheet("SHT_F05_102_R2", this);
                }
                return this._sheetP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.TableP1;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F05102.FDocument = FDocument;
})(F05102 || (F05102 = {}));
