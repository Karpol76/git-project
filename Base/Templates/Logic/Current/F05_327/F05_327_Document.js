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
var F05327;
(function (F05327) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1 = null;
            _this._tableP2 = null;
            _this._sheetP1 = null;
            _this._sheetP2 = null;
            _this._tableRules = new F05327.TableRules(_this);
            _this._interfaceRules = new F05327.InterfaceRules(_this);
            _this._updateRules = new F05327.UpdateRules(_this);
            _this._exportRules = new F05327.ExportRules(_this);
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
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new SubsidiesSubventions.P1TotalTable("F05_327_R1_SumValues", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2", {
            get: function () {
                if (this._tableP2 == null) {
                    this._tableP2 = new SubsidiesSubventions.FRegionsTable("F05_327_R2", this);
                }
                return this._tableP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP1", {
            get: function () {
                if (this._sheetP1 == null) {
                    this._sheetP1 = new SubsidiesSubventions.P1Sheet("SHT_F05_327_R1", this);
                }
                return this._sheetP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new SubsidiesSubventions.FSheet("SHT_F05_327_R2", this, new SubsidiesSubventions.FSheetOptions(2), this.TableP2, new SubsidiesSubventions.EditorsSubjects("F05_327_R2_Subject_Editor", "F05_327_R2_ScienceCityName_Editor", "F05_327_R2_SecurityAdmTerrEntityName_Editor", "F05_327_R2_MunicipalEntityName_Editor"));
                }
                return this._sheetP2;
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
    F05327.FDocument = FDocument;
})(F05327 || (F05327 = {}));
