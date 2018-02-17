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
var F05312;
(function (F05312) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._editorsCostTable = null;
            _this._tableSubject = null;
            _this._tableP1 = null;
            _this._tableCost = null;
            _this._tableP3 = null;
            _this._tableNorm = null;
            _this._tableCostYear = null;
            _this._tTableCostYear = null;
            _this._tableCostPba = null;
            _this._sheetP7 = null;
            _this._sheetP6 = null;
            _this._sheetP5 = null;
            _this._sheetP4Sp6 = null;
            _this._sheetP4Sp5 = null;
            _this._sheetP4Sp4 = null;
            _this._sheetOptionsP4 = null;
            _this._sheetP4Sp3 = null;
            _this._sheetP4Sp2Sp3 = null;
            _this._sheetP4Sp2Sp2 = null;
            _this._sheetP4Sp2Sp1 = null;
            _this._sheetP4Sp1Sp3 = null;
            _this._sheetP4Sp1Sp2 = null;
            _this._sheetP4Sp1Sp1 = null;
            _this._sheetP3 = null;
            _this._sheetP2 = null;
            _this._sheetP1 = null;
            _this._tableRules = new F05312.TableRules(_this);
            _this._interfaceRules = new F05312.InterfaceRules(_this);
            _this._updateRules = new F05312.UpdateRules(_this);
            _this._exportRules = new F05312.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "EditorsCostTable", {
            get: function () {
                if (this._editorsCostTable == null) {
                    this._editorsCostTable = new SubsidiesSubventions.EditorsSubjects("F05_312_Subject_Editor", "F05_312_ScienceCityName_Editor", "F05_312_SecurityAdmTerrEntityName_Editor", "F05_312_MunicipalEntityName_Editor");
                }
                return this._editorsCostTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetOptionsP4", {
            get: function () {
                if (this._sheetOptionsP4 == null) {
                    this._sheetOptionsP4 = new SubsidiesSubventions.FSheetOptions(1, SheetFormatCollection.Related, SheetFormatCollection.Free, SheetFormatCollection.Default);
                }
                return this._sheetOptionsP4;
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
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new SubsidiesSubventions.P1TotalTable("F05_312_R1_SumValues", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableSubject", {
            get: function () {
                if (this._tableSubject == null) {
                    this._tableSubject = new F05312.TableSubject("F05_312_Subject", this);
                }
                return this._tableSubject;
            },
            enumerable: true,
            configurable: true
        });
        FDocument.prototype.CreateTables = function () {
            this._tableP3 = new F05312.TableP3("F05_312_R3_Values", this);
            this._tableCost = new F05312.TableCost("F05_312_Cost", this, this.TableSubject, this._tableP3);
            this._tableNorm = new F05312.FTableNorm("F05_312_Norm_Values", this);
            this._tableCostYear = new F05312.TableCostYear("F05_312_CostYear", this, this.TableSubject, this._tableCost, this._tableNorm);
            this._tableCostPba = new F05312.TableCostPba("F05_312_CostPBA", this, this.TableSubject, this._tableCost, this._tableCostYear, this._tableNorm);
        };
        Object.defineProperty(FDocument.prototype, "TableCost", {
            get: function () {
                if (this._tableCost == null) {
                    this.CreateTables();
                }
                return this._tableCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3", {
            get: function () {
                if (this._tableP3 == null) {
                    this.CreateTables();
                }
                return this._tableP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableNorm", {
            get: function () {
                if (this._tableNorm == null) {
                    this.CreateTables();
                }
                return this._tableNorm;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableCostYear", {
            get: function () {
                if (this._tableCostYear == null) {
                    this.CreateTables();
                }
                return this._tableCostYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TransTableCostYear", {
            get: function () {
                if (this._tTableCostYear == null) {
                    this._tTableCostYear = new F05312.TranspondedTableCostYear("tF05_312_R7");
                }
                return this._tTableCostYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableCostPba", {
            get: function () {
                if (this._tableCostPba == null) {
                    this.CreateTables();
                }
                return this._tableCostPba;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP1", {
            get: function () {
                if (this._sheetP1 == null) {
                    this._sheetP1 = new SubsidiesSubventions.P1Sheet("SHT_F05_312_R1", this, 1);
                }
                return this._sheetP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new F05312.P2Sheet("SHT_F05_312_R2", this, new SubsidiesSubventions.FSheetOptions(3, SheetFormatCollection.Related, SheetFormatCollection.Calc, SheetFormatCollection.Free), this.TableSubject, this.EditorsCostTable);
                }
                return this._sheetP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP3", {
            get: function () {
                if (this._sheetP3 == null) {
                    this._sheetP3 = new SubsidiesSubventions.CoefficientsSheet("SHT_F05_312_R3", this);
                }
                return this._sheetP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp1Sp1", {
            get: function () {
                if (this._sheetP4Sp1Sp1 == null) {
                    this._sheetP4Sp1Sp1 = new F05312.P4Sp1Sp1Sheet("SHT_F05_312_R4_1_1", this, new SubsidiesSubventions.FSheetOptions(1, SheetFormatCollection.Spr, SheetFormatCollection.Free, SheetFormatCollection.Default), this.TableSubject, this.EditorsCostTable);
                }
                return this._sheetP4Sp1Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp1Sp2", {
            get: function () {
                if (this._sheetP4Sp1Sp2 == null) {
                    this._sheetP4Sp1Sp2 = new F05312.P4Sp1Sp2Sheet("SHT_F05_312_R4_1_2", this, this.SheetOptionsP4);
                }
                return this._sheetP4Sp1Sp2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp1Sp3", {
            get: function () {
                if (this._sheetP4Sp1Sp3 == null) {
                    this._sheetP4Sp1Sp3 = new F05312.P4Sp1Sp3Sheet("SHT_F05_312_R4_1_3", this, this.SheetOptionsP4);
                }
                return this._sheetP4Sp1Sp3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp2Sp1", {
            get: function () {
                if (this._sheetP4Sp2Sp1 == null) {
                    this._sheetP4Sp2Sp1 = new F05312.P4Sp2Sp1Sheet("SHT_F05_312_R4_2_1", this, this.SheetOptionsP4, this.TableSubject, this.EditorsCostTable);
                }
                return this._sheetP4Sp2Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp2Sp2", {
            get: function () {
                if (this._sheetP4Sp2Sp2 == null) {
                    this._sheetP4Sp2Sp2 = new F05312.P4Sp2Sp2Sheet("SHT_F05_312_R4_2_2", this, this.SheetOptionsP4);
                }
                return this._sheetP4Sp2Sp2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp2Sp3", {
            get: function () {
                if (this._sheetP4Sp2Sp3 == null) {
                    this._sheetP4Sp2Sp3 = new F05312.P4Sp2Sp3Sheet("SHT_F05_312_R4_2_3", this, this.SheetOptionsP4);
                }
                return this._sheetP4Sp2Sp3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp3", {
            get: function () {
                if (this._sheetP4Sp3 == null) {
                    this._sheetP4Sp3 = new F05312.P4Sp3Sheet("SHT_F05_312_R4_3", this, this.SheetOptionsP4);
                }
                return this._sheetP4Sp3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp4", {
            get: function () {
                if (this._sheetP4Sp4 == null) {
                    this._sheetP4Sp4 = new F05312.P4Sp4Sheet("SHT_F05_312_R4_4", this, new F05312.BlockNormOptions());
                }
                return this._sheetP4Sp4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp5", {
            get: function () {
                if (this._sheetP4Sp5 == null) {
                    this._sheetP4Sp5 = new F05312.P4Sp5Sheet("SHT_F05_312_R4_5", this, new F05312.BlockNormOptions(SheetFormatCollection.Free, SheetFormatCollection.Related));
                }
                return this._sheetP4Sp5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4Sp6", {
            get: function () {
                if (this._sheetP4Sp6 == null) {
                    this._sheetP4Sp6 = new F05312.P4Sp6Sheet("SHT_F05_312_R4_6", this, new F05312.BlockNormOptions(SheetFormatCollection.Free, SheetFormatCollection.Related));
                }
                return this._sheetP4Sp6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP5", {
            get: function () {
                if (this._sheetP5 == null) {
                    this._sheetP5 = new F05312.P5Sheet(this);
                }
                return this._sheetP5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP6", {
            get: function () {
                if (this._sheetP6 == null) {
                    this._sheetP6 = new F05312.P6Sheet(this);
                }
                return this._sheetP6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP7", {
            get: function () {
                if (this._sheetP7 == null) {
                    this._sheetP7 = new F05312.P7Sheet("SHT_F05_312_R7", this, this.SheetOptionsP4);
                }
                return this._sheetP7;
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
    F05312.FDocument = FDocument;
})(F05312 || (F05312 = {}));
