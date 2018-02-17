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
var F01222;
(function (F01222) {
    var StrKeysP1TotalF012Xx = F012XX.P1TotalStrKeys;
    var FPXSp6ObasTableF01212 = F01212.FPXSp6ObasTable;
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p6Sp3Table = null;
            _this._p6Sp6Table = null;
            _this._p6Sp6Sheet = null;
            _this._p4Sp3ObasTable01222 = null;
            _this._p3Sp4r2Sheet = null;
            _this._p5Sp4r2Sheet = null;
            _this._interfaceRules = new F01222.InterfaceRules(_this);
            _this._updateRules = new F01222.UpdateRules(_this);
            return _this;
        }
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
        Object.defineProperty(FDocument.prototype, "P6Sp3Table", {
            get: function () {
                if (this._p6Sp3Table == null) {
                    this._p6Sp3Table = new F01222.P6Sp3Sp4ObasTable("F01_211_r6_3_r6_4_V2", this);
                }
                return this._p6Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P6Sp6Table", {
            get: function () {
                if (this._p6Sp6Table == null) {
                    this._p6Sp6Table = new FPXSp6ObasTableF01212("F01_211_6_6_Values", this, this.P1TotalTable, StrKeysP1TotalF012Xx.P6);
                }
                return this._p6Sp6Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P6Sp6Sheet", {
            get: function () {
                if (this._p6Sp6Sheet == null) {
                    this._p6Sp6Sheet = new InsuranceSheet("SHT_6_6", this);
                }
                return this._p6Sp6Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp3Table", {
            get: function () {
                if (this._p4Sp3ObasTable01222 == null) {
                    this._p4Sp3ObasTable01222 = new F01222.P4Sp3ObasTable01222("F01_211_4_2_V2", this);
                }
                return this._p4Sp3ObasTable01222;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(FDocument.prototype, "P3Sp4r2Sheet", {
            get: function () {
                if (this._p3Sp4r2Sheet == null) {
                    this._p3Sp4r2Sheet = new F01222.P3Sp4r2Sheet(this, 1);
                }
                return this._p3Sp4r2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp4r2Sheet", {
            get: function () {
                if (this._p5Sp4r2Sheet == null) {
                    this._p5Sp4r2Sheet = new F01222.P5Sp4r2Sheet(this, 1);
                }
                return this._p5Sp4r2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        
        return FDocument;
    }(F01212.FDocument));
    F01222.FDocument = FDocument;
})(F01222 || (F01222 = {}));
