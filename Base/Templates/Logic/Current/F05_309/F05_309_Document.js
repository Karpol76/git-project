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
var F05309;
(function (F05309) {
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
            _this._tableRules = new F05309.TableRules(_this);
            _this._interfaceRules = new F05309.InterfaceRules(_this);
            _this._updateRules = new F05309.UpdateRules(_this);
            _this._exportRules = new F05309.ExportRules(_this);
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
                    this._regionsTable = new F05309.RegionsTable("F05_309_Regions", this);
                }
                return this._regionsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new SubsidiesSubventions.P1TotalTable("F05_309_R1_SumValues", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2", {
            get: function () {
                if (this._tableP2 == null) {
                    this._tableP2 = new YearTransposedObasTable("tF05_309_R4", ["OwnerKey"]);
                }
                return this._tableP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3", {
            get: function () {
                if (this._tableP3 == null) {
                    this._tableP3 = new F05309.P3Table("F05_309_R3_Values", this);
                }
                return this._tableP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4", {
            get: function () {
                if (this._tableP4 == null) {
                    this._tableP4 = new F05309.P4Table("F05_309_R4", this, this.TableP3, this.RegionsTable);
                }
                return this._tableP4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP1", {
            get: function () {
                if (this._sheetP1 == null) {
                    this._sheetP1 = new SubsidiesSubventions.P1Sheet("SHT_F05_309_R1", this);
                }
                return this._sheetP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new SubsidiesSubventions.P2Sheet("SHT_F05_309_R2", this, new SubsidiesSubventions
                        .FSheetOptions(3, SheetFormatCollection.Related, SheetFormatCollection.Related, SheetFormatCollection.Free));
                }
                return this._sheetP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP3", {
            get: function () {
                if (this._sheetP3 == null) {
                    this._sheetP3 = new SubsidiesSubventions.CoefficientsSheet("SHT_F05_309_R3", this);
                }
                return this._sheetP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4", {
            get: function () {
                if (this._sheetP4 == null) {
                    this._sheetP4 = new F05309.P4GroupSheet(this, new SubsidiesSubventions
                        .FSheetOptions(1, SheetFormatCollection.Spr, SheetFormatCollection.Free, SheetFormatCollection.Default), this.RegionsTable, new SubsidiesSubventions.EditorsSubjects("F05_309_R4_Subject_Editor", "F05_309_R4_ScienceCityName_Editor", "F05_309_R4_SecurityAdmTerrEntityName_Editor", "F05_309_R4_MunicipalEntityName_Editor"));
                }
                return this._sheetP4;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F05309.FDocument = FDocument;
})(F05309 || (F05309 = {}));
