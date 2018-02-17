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
var F06200;
(function (F06200) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1 = null;
            _this._targetSubsidieSprTable = null;
            _this._tableP2Sp1 = null;
            _this._tableP3Sp1 = null;
            _this._tableP3Sp1Values = null;
            _this._tableP4Sp1 = null;
            _this._p1Sheet = null;
            _this._sheetP2 = null;
            _this._sheetP3 = null;
            _this._sheetP4 = null;
            _this._tableRules = new F06200.TableRules(_this);
            _this._interfaceRules = new F06200.InterfaceRules(_this);
            _this._updateRules = new F06200.UpdateRules(_this);
            _this._exportRules = new F06200.ExportRules(_this);
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
                    this._tableP1 = new F06200.ObasTableP1("F06_200_R1_Values", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2Sp1", {
            get: function () {
                if (this._tableP2Sp1 == null) {
                    this._tableP2Sp1 = new F06200.TableP2Sp1("F06_200_r2", this, this.TableP1);
                }
                return this._tableP2Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3Sp1", {
            get: function () {
                if (this._tableP3Sp1 == null) {
                    this._tableP3Sp1 = new F06200.TableP3Sp1("F06_200_R3_Main_V2", this);
                }
                return this._tableP3Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3Sp1Values", {
            get: function () {
                if (this._tableP3Sp1Values == null) {
                    this._tableP3Sp1Values = new F06200.TableP3Sp1Values("F06_200_R3_V2", this, this.TableP3Sp1, this.TableP1);
                }
                return this._tableP3Sp1Values;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4Sp1", {
            get: function () {
                if (this._tableP4Sp1 == null) {
                    this._tableP4Sp1 = new F06200.TableP4Sp1("F06_200_r4", this, this.TableP1);
                }
                return this._tableP4Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TargetSubsidieSprTable", {
            get: function () {
                if (this._targetSubsidieSprTable == null) {
                    this._targetSubsidieSprTable = new SprTable("TargetSubsidie");
                }
                return this._targetSubsidieSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F06200.P1Sheet("F06_200_R1_Rows", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP2", {
            get: function () {
                if (this._sheetP2 == null) {
                    this._sheetP2 = new F06200.P2GroupSheet(this);
                }
                return this._sheetP2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP3", {
            get: function () {
                if (this._sheetP3 == null) {
                    this._sheetP3 = new F06200.P3GroupSheet(this);
                }
                return this._sheetP3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SheetP4", {
            get: function () {
                if (this._sheetP4 == null) {
                    this._sheetP4 = new F06200.P4Sheet("SHT_F06_200_R4_1", this);
                }
                return this._sheetP4;
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
    F06200.FDocument = FDocument;
})(F06200 || (F06200 = {}));
