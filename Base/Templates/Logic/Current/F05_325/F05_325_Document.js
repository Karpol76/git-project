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
var F05325;
(function (F05325) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Sheet = null;
            _this._p2Sheet = null;
            _this._p3Sheet = null;
            _this._p5GroupSheet = null;
            _this._p4GroupSheet = null;
            _this._p1TotalTable = null;
            _this._subjectsTable = null;
            _this._p3DataTable = null;
            _this._p4DataTable = null;
            _this._p5DataTable = null;
            _this._tableRules = new F05325.TableRules(_this);
            _this._interfaceRules = new F05325.InterfaceRules(_this);
            _this._updateRules = new F05325.UpdateRules(_this);
            _this._exportRules = new F05325.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P5DataTable", {
            get: function () {
                if (this._p5DataTable == null) {
                    this._p5DataTable = new F05325.P5DataTable("F05_325_P5", this, this.SubjectsTable, this.P3DataTable);
                }
                return this._p5DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4DataTable", {
            get: function () {
                if (this._p4DataTable == null) {
                    this._p4DataTable = new F05325.P4DataTable("F05_325_P4", this, this.SubjectsTable, this.P3DataTable);
                }
                return this._p4DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3DataTable", {
            get: function () {
                if (this._p3DataTable == null) {
                    this._p3DataTable = new F05325.P3DataTable("F05_325_P3", this, this.SubjectsTable);
                }
                return this._p3DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SubjectsTable", {
            get: function () {
                if (this._subjectsTable == null) {
                    this._subjectsTable = new F05325.SubjectsTable("F05_325_Subjects", this);
                }
                return this._subjectsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new SubsidiesSubventions.P1TotalTable("F05_325_P1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4GroupSheet", {
            get: function () {
                if (this._p4GroupSheet == null) {
                    this._p4GroupSheet = new F05325.P4GroupSheet(this);
                }
                return this._p4GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5GroupSheet", {
            get: function () {
                if (this._p5GroupSheet == null) {
                    this._p5GroupSheet = new F05325.P5GroupSheet(this);
                }
                return this._p5GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sheet", {
            get: function () {
                if (this._p3Sheet == null) {
                    this._p3Sheet = new F05325.P3Sheet("SHT_P3", this);
                }
                return this._p3Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new SubsidiesSubventions.P2Sheet("SHT_P2", this, new SubsidiesSubventions.FSheetOptions(undefined, SheetFormatCollection.Related, SheetFormatCollection.Related));
                }
                return this._p2Sheet;
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
    F05325.FDocument = FDocument;
})(F05325 || (F05325 = {}));
