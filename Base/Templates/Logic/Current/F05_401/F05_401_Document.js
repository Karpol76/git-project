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
var F05401;
(function (F05401) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1TotalTable = null;
            _this._p2Table = null;
            _this._p1Sheet = null;
            _this._p2Sp1Sheet = null;
            _this._p2Sp3Sheet = null;
            _this._p2Sp2Sheet = null;
            _this._tableRules = new F05401.TableRules(_this);
            _this._interfaceRules = new F05401.InterfaceRules(_this);
            _this._updateRules = new F05401.UpdateRules(_this);
            _this._exportRules = new F05401.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P2Sp2Sheet", {
            get: function () {
                if (this._p2Sp2Sheet == null) {
                    this._p2Sp2Sheet = new F05401.P2Sp2Sheet("SHT_P2_2", this);
                }
                return this._p2Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3Sheet", {
            get: function () {
                if (this._p2Sp3Sheet == null) {
                    this._p2Sp3Sheet = new SubsidiesSubventions
                        .P2Sheet("SHT_P2_3", this, new SubsidiesSubventions
                        .FSheetOptions(2, SheetFormatCollection.Related, SheetFormatCollection.Free, SheetFormatCollection.Free));
                }
                return this._p2Sp3Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Sheet", {
            get: function () {
                if (this._p2Sp1Sheet == null) {
                    this._p2Sp1Sheet = new SubsidiesSubventions
                        .P2Sheet("SHT_P2_1", this, new SubsidiesSubventions
                        .FSheetOptions(2, SheetFormatCollection.Spr, SheetFormatCollection.Related, SheetFormatCollection.Related));
                }
                return this._p2Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F05401.P1Sheet("SHT_P1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Table", {
            get: function () {
                if (this._p2Table == null) {
                    this._p2Table = new F05401.P2Table("F05_401_ScienceCitys", this.P1TotalTable);
                }
                return this._p2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F05401.P1TotalTable("F05_401_P1_Values", this);
                }
                return this._p1TotalTable;
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
    F05401.FDocument = FDocument;
})(F05401 || (F05401 = {}));
