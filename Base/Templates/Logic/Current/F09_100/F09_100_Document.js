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
var F09100;
(function (F09100) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1 = null;
            _this._tableP2 = null;
            _this._tableP3 = null;
            _this._sheetP2Sp1 = null;
            _this._sheetP2Sp2 = null;
            _this._tableP2Sp1 = null;
            _this._tableRules = new F09100.TableRules(_this);
            _this._interfaceRules = new F09100.InterfaceRules(_this);
            _this._updateRules = new F09100.UpdateRules(_this);
            _this._exportRules = new F09100.ExportRules(_this);
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
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new F09100.ObasTableP1("F09_100_R1_SumValues", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2", {
            get: function () {
                if (this._tableP2 == null) {
                    this._tableP2 = new F09100.TableP2("F09_100_R2_V3");
                }
                return this._tableP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2Sp1", {
            get: function () {
                if (this._tableP2Sp1 == null) {
                    this._tableP2Sp1 = new F09100.NpaTableWithDataP2("F09_100_R2_1_V2", this.TableP2, this);
                }
                return this._tableP2Sp1;
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
        Object.defineProperty(FDocument.prototype, "TableP3", {
            get: function () {
                if (this._tableP3 == null) {
                    this._tableP3 = new F09100.TableP3("F09_100_R3", this);
                }
                return this._tableP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2Sp1", {
            get: function () {
                if (this._sheetP2Sp1 == null) {
                    this._sheetP2Sp1 = new F09100.P2Sp1Sheet("SHT_F09_100_R2", this);
                }
                return this._sheetP2Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2Sp2", {
            get: function () {
                if (this._sheetP2Sp2 == null) {
                    this._sheetP2Sp2 = new F09100.P2Sp2Sheet("SHT_F09_100_R3", this);
                }
                return this._sheetP2Sp2;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F09100.FDocument = FDocument;
})(F09100 || (F09100 = {}));
