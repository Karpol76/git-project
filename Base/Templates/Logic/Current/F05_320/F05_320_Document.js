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
var F05320;
(function (F05320) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Sheet = null;
            _this._p1TotalTable = null;
            _this._p3Sp1Sheet = null;
            _this._p3Sp2Sheet = null;
            _this._p4Sp1Sheet = null;
            _this._p4Sp2Sheet = null;
            _this._p3Sheet = null;
            _this._p4Sheet = null;
            _this._p2Sheet = null;
            _this._p5Sheet = null;
            _this._subjectsTable = null;
            _this._subjectsDataTable = null;
            _this._p3Sp1DataTable = null;
            _this._p3Sp2DataTable = null;
            _this._p4Sp1DataTable = null;
            _this._p4Sp2DataTable = null;
            _this._p5DataTable = null;
            _this._editorsSubject = null;
            _this._tableRules = new F05320.TableRules(_this);
            _this._interfaceRules = new F05320.InterfaceRules(_this);
            _this._updateRules = new F05320.UpdateRules(_this);
            _this._exportRules = new F05320.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "EditorsSubject", {
            get: function () {
                if (this._editorsSubject == null) {
                    this._editorsSubject = new SubsidiesSubventions.EditorsSubjects("F05_320_R2_Subject_Editor", "F05_320_R2_ScienceCityName_Editor", "F05_320_R2_SecurityAdmTerrEntityName_Editor", "F05_320_R2_MunicipalEntityName_Editor");
                }
                return this._editorsSubject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SubjectsTable", {
            get: function () {
                if (this._subjectsTable == null) {
                    this._subjectsTable = new SubsidiesSubventions.FRegionsTable("F05_320_Subjects", this);
                }
                return this._subjectsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SubjectsDataTable", {
            get: function () {
                if (this._subjectsDataTable == null) {
                    this._subjectsDataTable = new F05320.SubjectsDataTable("F05_320_Subjects_Data", this, this.SubjectsTable);
                }
                return this._subjectsDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp1DataTable", {
            get: function () {
                if (this._p3Sp1DataTable == null) {
                    this._p3Sp1DataTable = new F05320.PXSp1Sp2DataTable("F05_320_Invalid_Protez_Data", this, this.SubjectsTable, this.SubjectsDataTable);
                }
                return this._p3Sp1DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp2DataTable", {
            get: function () {
                if (this._p3Sp2DataTable == null) {
                    this._p3Sp2DataTable = new F05320.PXSp1Sp2DataTable("F05_320_Invalid_Service_Data", this, this.SubjectsTable, this.SubjectsDataTable);
                }
                return this._p3Sp2DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp1DataTable", {
            get: function () {
                if (this._p4Sp1DataTable == null) {
                    this._p4Sp1DataTable = new F05320.PXSp1Sp2DataTable("F05_320_Veteran_Protez_Data", this, this.SubjectsTable, this.SubjectsDataTable);
                }
                return this._p4Sp1DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp2DataTable", {
            get: function () {
                if (this._p4Sp2DataTable == null) {
                    this._p4Sp2DataTable = new F05320.PXSp1Sp2DataTable("F05_320_Veteran_Service_Data", this, this.SubjectsTable, this.SubjectsDataTable);
                }
                return this._p4Sp2DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5DataTable", {
            get: function () {
                if (this._p5DataTable == null) {
                    this._p5DataTable = new F05320.P5Table("F05_320_AdmCosts_Data", this, this.SubjectsTable, this.SubjectsDataTable);
                }
                return this._p5DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new F05320.P2Sheet("SHT_P2", this, new SubsidiesSubventions.FSheetOptions(3, SheetFormatCollection.Related, SheetFormatCollection.Related, SheetFormatCollection.Free));
                }
                return this._p2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sheet", {
            get: function () {
                if (this._p3Sheet == null) {
                    this._p3Sheet = new F05320.P3P4Sheet("SHT_P3", this);
                }
                return this._p3Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sheet", {
            get: function () {
                if (this._p4Sheet == null) {
                    this._p4Sheet = new F05320.P3P4Sheet("SHT_P4", this);
                }
                return this._p4Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sheet", {
            get: function () {
                if (this._p5Sheet == null) {
                    this._p5Sheet = new F05320.P5Sheet(this);
                }
                return this._p5Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp1Sheet", {
            get: function () {
                if (this._p3Sp1Sheet == null) {
                    this._p3Sp1Sheet = new F05320.P3Sp1Sheet("SHT_P3_1", this, this.SubjectsTable, this.EditorsSubject);
                }
                return this._p3Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp2Sheet", {
            get: function () {
                if (this._p3Sp2Sheet == null) {
                    this._p3Sp2Sheet = new F05320.PXSp1Sp2Sheet("SHT_P3_2", this);
                }
                return this._p3Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp1Sheet", {
            get: function () {
                if (this._p4Sp1Sheet == null) {
                    this._p4Sp1Sheet = new F05320.PXSp1Sp2Sheet("SHT_P4_1", this);
                }
                return this._p4Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp2Sheet", {
            get: function () {
                if (this._p4Sp2Sheet == null) {
                    this._p4Sp2Sheet = new F05320.PXSp1Sp2Sheet("SHT_P4_2", this);
                }
                return this._p4Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new SubsidiesSubventions.P1TotalTable("F05_320_P1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new SubsidiesSubventions.P1Sheet("SHT_P1", this);
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
        Object.defineProperty(FDocument.prototype, "ExportRules", {
            get: function () {
                return this._exportRules;
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
        return FDocument;
    }(BaseDocumentObject));
    F05320.FDocument = FDocument;
})(F05320 || (F05320 = {}));
