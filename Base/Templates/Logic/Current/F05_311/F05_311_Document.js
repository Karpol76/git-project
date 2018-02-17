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
var F05311;
(function (F05311) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1 = null;
            _this._tableP3Rows = null;
            _this._tableP3 = null;
            _this._subjectsDataTable = null;
            _this._sheetP1 = null;
            _this._sheetP2 = null;
            _this._sheetP3 = null;
            _this._sheetP4 = null;
            _this._tableRules = new F05311.TableRules(_this);
            _this._interfaceRules = new F05311.InterfaceRules(_this);
            _this._updateRules = new F05311.UpdateRules(_this);
            _this._exportRules = new F05311.ExportRules(_this);
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
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new SubsidiesSubventions.P1TotalTable("F05_311_R1_SumValues", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3Rows", {
            get: function () {
                if (this._tableP3Rows == null) {
                    this._tableP3Rows = new ObasTable("F05_311_R3_Rows");
                }
                return this._tableP3Rows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3", {
            get: function () {
                if (this._tableP3 == null) {
                    this._tableP3 = new SubsidiesSubventions.CoefficientsTable("F05_311_R3_Values", this);
                }
                return this._tableP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SubjectsDataTable", {
            get: function () {
                if (this._subjectsDataTable == null) {
                    this._subjectsDataTable = new F05311.SubjectsDataTable("F05_311_Subjects_Data", this, this.TableP3);
                }
                return this._subjectsDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP1", {
            get: function () {
                if (this._sheetP1 == null) {
                    this._sheetP1 = new SubsidiesSubventions.P1Sheet("SHT_F05_311_R1", this);
                }
                return this._sheetP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new SubsidiesSubventions.P2Sheet("SHT_F05_311_R2", this, new SubsidiesSubventions
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
                    this._sheetP3 = new F05311.P3Sheet("SHT_F05_311_R3", this, 0);
                }
                return this._sheetP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4", {
            get: function () {
                if (this._sheetP4 == null) {
                    this._sheetP4 = new F05311.P4Sheet("SHT_F05_311_R4", this);
                }
                return this._sheetP4;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F05311.FDocument = FDocument;
})(F05311 || (F05311 = {}));
