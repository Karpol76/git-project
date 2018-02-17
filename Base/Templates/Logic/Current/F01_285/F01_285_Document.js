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
var F01285;
(function (F01285) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._sheetP1 = null;
            _this._sheetP3 = null;
            _this._p1TotalTable = null;
            _this._postSprTable = null;
            _this._p2DataTable = null;
            _this._p3Table = null;
            _this._p2GroupSheet = null;
            _this._p5Sheet = null;
            _this._tableRules = new F01285.TableRules(_this);
            _this._interfaceRules = new F01285.InterfaceRules(_this);
            _this._updateRules = new F01285.UpdateRules(_this);
            _this._exportRules = new F01285.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P2GroupSheet", {
            get: function () {
                if (this._p2GroupSheet == null) {
                    this._p2GroupSheet = new F01285.P2GroupSheet(this);
                }
                return this._p2GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Table", {
            get: function () {
                if (this._p3Table == null) {
                    this._p3Table = new F01285.TableP3("F01_285_R3", this, this.P1TotalTable);
                }
                return this._p3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2DataTable", {
            get: function () {
                if (this._p2DataTable == null) {
                    this._p2DataTable = new F01285.P2DataTable("F01_285_r1_2_V2", this, this.P1TotalTable, this.P3Table);
                }
                return this._p2DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PostSprTable", {
            get: function () {
                if (this._postSprTable == null) {
                    this._postSprTable = new SprTable("PostName");
                }
                return this._postSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F01285.P1TotalTable("F01_285_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP3", {
            get: function () {
                if (this._sheetP3 == null) {
                    this._sheetP3 = new F01285.SheetP3("SHT_F01_285_3", this);
                }
                return this._sheetP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP1", {
            get: function () {
                if (this._sheetP1 == null) {
                    this._sheetP1 = new F01285.SheetP1("SHT_F01_285_1", this);
                }
                return this._sheetP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sheet", {
            get: function () {
                if (this._p5Sheet == null) {
                    this._p5Sheet = new F01285.P5Sheet(this);
                }
                return this._p5Sheet;
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
    F01285.FDocument = FDocument;
})(F01285 || (F01285 = {}));
