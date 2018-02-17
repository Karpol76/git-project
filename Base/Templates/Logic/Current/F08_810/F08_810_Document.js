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
var F08810;
(function (F08810) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1TopSum = null;
            _this._tableP2 = null;
            _this._tableP3 = null;
            _this._tableP2Sp1 = null;
            _this._tableP3Sp1 = null;
            _this._okatoTable = null;
            _this._sheetP2Sp1 = null;
            _this._sheetP3Sp1 = null;
            _this._sheetP1 = null;
            _this._sheetP2 = null;
            _this._sheetP3 = null;
            _this._tableRules = new F08810.TableRules(_this);
            _this._interfaceRules = new F08810.InterfaceRules(_this);
            _this._updateRules = new F08810.UpdateRules(_this);
            _this._exportRules = new F08810.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.TableP1TopSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "OkatoKeyField", {
            get: function () {
                return FDocument._f08810KeyFields[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "CadastreKeyField", {
            get: function () {
                return FDocument._f08810KeyFields[1];
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
        Object.defineProperty(FDocument.prototype, "OkatoTable", {
            get: function () {
                if (this._okatoTable == null) {
                    this._okatoTable = new F08810.OkatoSprTable();
                }
                return this._okatoTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP1TopSum", {
            get: function () {
                if (this._tableP1TopSum == null) {
                    this._tableP1TopSum = new F08810.P1TotalTable("F08_810_R1_TopSum_SumValues", this);
                }
                return this._tableP1TopSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2", {
            get: function () {
                if (this._tableP2 == null) {
                    this._tableP2 = new F08810.P2ObasTable("F08_810_R2_V3", this, F08810.StrKeys.Property);
                }
                return this._tableP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2Sp1", {
            get: function () {
                if (this._tableP2Sp1 == null) {
                    this._tableP2Sp1 = new F08810.P2Sp1ObasTable("F08_810_R2_1_V2", [this.OkatoKeyField, BaseObasTableFields.YearField.Id], this, this.TableP2);
                }
                return this._tableP2Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3", {
            get: function () {
                if (this._tableP3 == null) {
                    this._tableP3 = new F08810.P3ObasTable("F08_810_R3_V3", this, F08810.StrKeys.Lands);
                }
                return this._tableP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3Sp1", {
            get: function () {
                if (this._tableP3Sp1 == null) {
                    this._tableP3Sp1 = new F08810.P3Sp1ObasTable("F08_810_R3_1_V2", [this.OkatoKeyField, BaseObasTableFields.YearField.Id, this.CadastreKeyField], this, this.TableP3);
                }
                return this._tableP3Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2Sp1", {
            get: function () {
                if (this._sheetP2Sp1 == null) {
                    this._sheetP2Sp1 = new F08810.P2GroupSheet(this);
                }
                return this._sheetP2Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP3Sp1", {
            get: function () {
                if (this._sheetP3Sp1 == null) {
                    this._sheetP3Sp1 = new F08810.P3GroupSheet(this);
                }
                return this._sheetP3Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP1", {
            get: function () {
                if (this._sheetP1 == null) {
                    this._sheetP1 = new F08810.P1Sheet("SHT_F08_810_R1", this);
                }
                return this._sheetP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new F08810.P2Sheet(this);
                }
                return this._sheetP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP3", {
            get: function () {
                if (this._sheetP3 == null) {
                    this._sheetP3 = new F08810.P3Sheet(this);
                }
                return this._sheetP3;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    FDocument._f08810KeyFields = ["OKATO_ID", "CadastreNum", "SumTypeKey"];
    F08810.FDocument = FDocument;
})(F08810 || (F08810 = {}));
