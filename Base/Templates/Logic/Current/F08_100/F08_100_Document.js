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
var F08100;
(function (F08100) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1 = null;
            _this._tableP2 = null;
            _this._tableP3 = null;
            _this._tableP4 = null;
            _this._tableP5 = null;
            _this._subsSprTable = null;
            _this._p1Sheet = null;
            _this._sheetP2 = null;
            _this._sheetP3 = null;
            _this._sheetP4 = null;
            _this._sheetP5 = null;
            _this._tableRules = new F08100.TableRules(_this);
            _this._interfaceRules = new F08100.InterfaceRules(_this);
            _this._updateRules = new F08100.UpdateRules(_this);
            _this._exportRules = new F08100.ExportRules(_this);
            _this._importRules = new F08100.ImportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.TableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2", {
            get: function () {
                if (this._tableP2 == null) {
                    this._tableP2 = new F08100.P2Table("F08_100_R2", this, this.TableP1);
                }
                return this._tableP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3", {
            get: function () {
                if (this._tableP3 == null) {
                    this._tableP3 = new F08100.P3Table("F08_100_R3", this, this.TableP1);
                }
                return this._tableP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4", {
            get: function () {
                if (this._tableP4 == null) {
                    this._tableP4 = new F08100.P4Table("F08_100_R4", this, this.TableP1);
                }
                return this._tableP4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP5", {
            get: function () {
                if (this._tableP5 == null) {
                    this._tableP5 = new F08100.P5Table("F08_100_R5", this, this.TableP1);
                }
                return this._tableP5;
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
        Object.defineProperty(FDocument.prototype, "ImportRules", {
            get: function () {
                return this._importRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new F08100.ObasTableP1("F08_100_R1_SumValues", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SubsidiesSprTable", {
            get: function () {
                if (this._subsSprTable == null) {
                    this._subsSprTable = new SprTable("subsidies_spr");
                }
                return this._subsSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F08100.P1Sheet("SHT_F08_100_R1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new F08100.P2GroupSheet(this);
                }
                return this._sheetP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP3", {
            get: function () {
                if (this._sheetP3 == null) {
                    this._sheetP3 = new F08100.P3GroupSheet(this);
                }
                return this._sheetP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4", {
            get: function () {
                if (this._sheetP4 == null) {
                    this._sheetP4 = new F08100.P4GroupSheet(this);
                }
                return this._sheetP4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP5", {
            get: function () {
                if (this._sheetP5 == null) {
                    this._sheetP5 = new F08100.P5Sheet("SHT_F08_100_R5", this);
                }
                return this._sheetP5;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F08100.FDocument = FDocument;
})(F08100 || (F08100 = {}));
