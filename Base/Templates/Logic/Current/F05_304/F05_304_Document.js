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
var F05304;
(function (F05304) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._regionsTable = null;
            _this._p1TotalTable = null;
            _this._coefsTransTable = null;
            _this._coefsDataTable = null;
            _this._coefsTopDataTable = null;
            _this._p1Sheet = null;
            _this._p2Sheet = null;
            _this._p4Sheet = null;
            _this._p3GroupSheet = null;
            _this._tableRules = new F05304.TableRules(_this);
            _this._interfaceRules = new F05304.InterfaceRules(_this);
            _this._updateRules = new F05304.UpdateRules(_this);
            _this._exportRules = new F05304.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "CoefsTopDataTable", {
            get: function () {
                if (this._coefsTopDataTable == null) {
                    this._coefsTopDataTable = new F05304.CoefsTopDataTable("F05_304_P4_TopValues", this, null);
                }
                return this._coefsTopDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "CoefsDataTable", {
            get: function () {
                if (this._coefsDataTable == null) {
                    this._coefsDataTable = new F05304.CoefsDataTable("F05_304_R3", this, this.RegionsTable, this.CoefsTopDataTable, this.P4Sheet);
                }
                return this._coefsDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3GroupSheet", {
            get: function () {
                if (this._p3GroupSheet == null) {
                    this._p3GroupSheet = new F05304.P3GroupSheet(this, new SubsidiesSubventions.FSheetOptions(1), this.RegionsTable, new SubsidiesSubventions.EditorsSubjects("F05_304_R4_Subject_Editor", "F05_304_R4_ScienceCityName_Editor", "F05_304_R4_SecurityAdmTerrEntityName_Editor", "F05_304_R4_MunicipalEntityName_Editor"));
                }
                return this._p3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sheet", {
            get: function () {
                if (this._p4Sheet == null) {
                    this._p4Sheet = new F05304.P4Sheet("SHT_P4", this);
                }
                return this._p4Sheet;
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
        Object.defineProperty(FDocument.prototype, "CoefsTransTable", {
            get: function () {
                if (this._coefsTransTable == null) {
                    this._coefsTransTable = new YearTransposedObasTable("tF05_304_R3", ["OwnerKey"]);
                }
                return this._coefsTransTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RegionsTable", {
            get: function () {
                if (this._regionsTable == null) {
                    this._regionsTable = new F05304.RegionsTable("F05_304_Regions", this);
                }
                return this._regionsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new SubsidiesSubventions.P1TotalTable("F05_304_P1_TopValues", this);
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
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new SubsidiesSubventions.P2Sheet("SHT_P2", this, new SubsidiesSubventions
                        .FSheetOptions(3, SheetFormatCollection.Related, SheetFormatCollection.Related, SheetFormatCollection.Free));
                }
                return this._p2Sheet;
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
    F05304.FDocument = FDocument;
})(F05304 || (F05304 = {}));
