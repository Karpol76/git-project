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
var F01500;
(function (F01500) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this.NotOnUpdate = true;
            _this._tableP1TopValues = null;
            _this._tableP1Values = null;
            _this._tableP2Data = null;
            _this._p3Sheet = null;
            _this._p2GroupSheet = null;
            _this._p1GroupSheet = null;
            _this._tableRules = new F01500.TableRules(_this);
            _this._interfaceRules = new F01500.InterfaceRules(_this);
            _this._updateRules = new F01500.UpdateRules(_this);
            _this._exportRules = new F01500.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F01500.P1Sheet("SHT_F05_100_R1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2GroupSheet", {
            get: function () {
                if (this._p2GroupSheet == null) {
                    this._p2GroupSheet = new F01500.P2GroupSheet(this);
                }
                return this._p2GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sheet", {
            get: function () {
                if (this._p3Sheet == null) {
                    this._p3Sheet = new F01500.P3Sheet("SHT_F05_100_R3", this);
                }
                return this._p3Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2Data", {
            get: function () {
                if (this._tableP2Data == null) {
                    this._tableP2Data = new F01500.ObasTableP2Pay("F01_500_r2_Pay", this, this.TableP1Values);
                }
                return this._tableP2Data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP1Values", {
            get: function () {
                if (this._tableP1Values == null) {
                    this._tableP1Values = new F01500.ObasTableP1("F01_500_R1_SumValues", this, this.TableP1TopValues);
                }
                return this._tableP1Values;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP1TopValues", {
            get: function () {
                if (this._tableP1TopValues == null) {
                    this._tableP1TopValues = new F01500.ObasTableP1Total("F01_500_R1_TopSumValues", this);
                }
                return this._tableP1TopValues;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.TableP1TopValues;
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
        return FDocument;
    }(BaseDocumentObject));
    F01500.FDocument = FDocument;
})(F01500 || (F01500 = {}));
