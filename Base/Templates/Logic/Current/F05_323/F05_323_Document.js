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
var F05323;
(function (F05323) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Sheet = null;
            _this._p1TotalTable = null;
            _this._p3Sheet = null;
            _this._p4Sheet = null;
            _this._p5Sheet = null;
            _this._p2Sheet = null;
            _this._subjectsDataTable = null;
            _this._tableRules = new F05323.TableRules(_this);
            _this._interfaceRules = new F05323.InterfaceRules(_this);
            _this._updateRules = new F05323.UpdateRules(_this);
            _this._exportRules = new F05323.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "SubjectsDataTable", {
            get: function () {
                if (this._subjectsDataTable == null) {
                    this._subjectsDataTable = new F05323.SubjectsDataTable("F05_323_Subjects_Data", this);
                }
                return this._subjectsDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new F05323.P2Sheet("SHT_P2", this, new SubsidiesSubventions.FSheetOptions(3, SheetFormatCollection.Related, SheetFormatCollection.Related, SheetFormatCollection.Free));
                }
                return this._p2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sheet", {
            get: function () {
                if (this._p5Sheet == null) {
                    this._p5Sheet = new F05323.P4P5Sheet("SHT_P5", this);
                }
                return this._p5Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sheet", {
            get: function () {
                if (this._p4Sheet == null) {
                    this._p4Sheet = new F05323.P4P5Sheet("SHT_P4", this);
                }
                return this._p4Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sheet", {
            get: function () {
                if (this._p3Sheet == null) {
                    this._p3Sheet = new F05323.P3Sheet("SHT_P3", this, this.SubjectsDataTable, new SubsidiesSubventions.EditorsSubjects("F05_323_R2_Subject_Editor", "F05_323_R2_ScienceCityName_Editor", "F05_323_R2_SecurityAdmTerrEntityName_Editor", "F05_323_R2_MunicipalEntityName_Editor"));
                }
                return this._p3Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new SubsidiesSubventions.P1TotalTable("F05_323_P1_Values", this);
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
    F05323.FDocument = FDocument;
})(F05323 || (F05323 = {}));
