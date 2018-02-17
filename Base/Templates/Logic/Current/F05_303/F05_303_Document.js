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
var F05303;
(function (F05303) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._regionsTable = null;
            _this._tableP1 = null;
            _this._tableP2 = null;
            _this._tableP3 = null;
            _this._tableP4 = null;
            _this._sheetP1 = null;
            _this._sheetP2 = null;
            _this._sheetP3 = null;
            _this._sheetP4 = null;
            _this._tableRules = new F05303.TableRules(_this);
            _this._interfaceRules = new F05303.InterfaceRules(_this);
            _this._updateRules = new F05303.UpdateRules(_this);
            _this._exportRules = new F05303.ExportRules(_this);
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
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.TableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RegionsTable", {
            get: function () {
                if (this._regionsTable == null) {
                    this._regionsTable = new SubsidiesSubventions.FSubjectTable("F05_303_Regions", this);
                }
                return this._regionsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new SubsidiesSubventions.P1TotalTable("F05_303_R1_SumValues", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2", {
            get: function () {
                if (this._tableP2 == null) {
                    this._tableP2 = new YearTransposedObasTable("tF05_303_R4", ["OwnerKey"]);
                }
                return this._tableP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3", {
            get: function () {
                if (this._tableP3 == null) {
                    this._tableP3 = new SubsidiesSubventions.CoefficientsTable("F05_303_R3_Values", this);
                }
                return this._tableP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4", {
            get: function () {
                if (this._tableP4 == null) {
                    this._tableP4 = new F05303.P4Table("F05_303_R4", this, this.TableP3, this.RegionsTable);
                }
                return this._tableP4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP1", {
            get: function () {
                if (this._sheetP1 == null) {
                    this._sheetP1 = new SubsidiesSubventions.P1Sheet("SHT_F05_303_R1", this);
                }
                return this._sheetP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new F05303.P2Sheet("SHT_F05_303_R2", this);
                }
                return this._sheetP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP3", {
            get: function () {
                if (this._sheetP3 == null) {
                    this._sheetP3 = new SubsidiesSubventions.CoefficientsSheet("SHT_F05_303_R3", this);
                }
                return this._sheetP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4", {
            get: function () {
                if (this._sheetP4 == null) {
                    this._sheetP4 = new F05303.P4GroupSheet(this, new SubsidiesSubventions
                        .FSheetOptions(1, SheetFormatCollection.Spr, SheetFormatCollection.Free, SheetFormatCollection.Default));
                }
                return this._sheetP4;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F05303.FDocument = FDocument;
})(F05303 || (F05303 = {}));
