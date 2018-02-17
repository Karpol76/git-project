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
var F01212;
(function (F01212) {
    var StrKeysP1TotalF012Xx = F012XX.P1TotalStrKeys;
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion, null) || this;
            _this._p2Sp6Table = null;
            _this._p3Sp6Table = null;
            _this._p4Sp4Table = null;
            _this._p5Sp6Table = null;
            _this._p2Sp3Table = null;
            _this._p3Sp3Table = null;
            _this._p4Sp3Table = null;
            _this._p5Sp3Table = null;
            _this._p2Sp6Sheet = null;
            _this._p3Sp6Sheet = null;
            _this._p4Sp4Sheet = null;
            _this._p5Sp6Sheet = null;
            _this._p3Sp4r2Sheet = null;
            _this._p4Sp3r2Sheet = null;
            _this._interfaceRules = new F01212.InterfaceRules(_this);
            _this._updateRules = new F01212.UpdateRules(_this);
            _this._exportRules = new F01212.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P5Sp6Sheet", {
            get: function () {
                if (this._p5Sp6Sheet == null) {
                    this._p5Sp6Sheet = new InsuranceSheet("SHT_5_6", this);
                }
                return this._p5Sp6Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp4Sheet", {
            get: function () {
                if (this._p4Sp4Sheet == null) {
                    this._p4Sp4Sheet = new InsuranceSheet("SHT_01_211_4_3", this);
                }
                return this._p4Sp4Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp6Sheet", {
            get: function () {
                if (this._p3Sp6Sheet == null) {
                    this._p3Sp6Sheet = new InsuranceSheet("SHT_01_211_3_6", this);
                }
                return this._p3Sp6Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp6Sheet", {
            get: function () {
                if (this._p2Sp6Sheet == null) {
                    this._p2Sp6Sheet = new InsuranceSheet("SHT_01_211_2_6", this);
                }
                return this._p2Sp6Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp3Table", {
            get: function () {
                if (this._p5Sp3Table == null) {
                    this._p5Sp3Table = new F01212.P5Sp3Sp4ObasTable("F01_211_r5_3_r5_4_V2", this);
                }
                return this._p5Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp3Table", {
            get: function () {
                if (this._p4Sp3Table == null) {
                    this._p4Sp3Table = new F01212.P4Sp3ObasTable("F01_211_4_2_V2", this);
                }
                return this._p4Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp3Table", {
            get: function () {
                if (this._p3Sp3Table == null) {
                    this._p3Sp3Table = new F01212.P3Sp3Sp4ObasTable("F01_211_r3_3_r3_4_V2", this);
                }
                return this._p3Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3Table", {
            get: function () {
                if (this._p2Sp3Table == null) {
                    this._p2Sp3Table = new F01212.P2Sp3Sp4ObasTable("F01_211_r2_3_r2_4_V2", this);
                }
                return this._p2Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp6Table", {
            get: function () {
                if (this._p5Sp6Table == null) {
                    this._p5Sp6Table = new F01212.PXSp6ObasTable("F01_211_5_6_Values", this, this.P1TotalTable, StrKeysP1TotalF012Xx.P5);
                }
                return this._p5Sp6Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp4Table", {
            get: function () {
                if (this._p4Sp4Table == null) {
                    this._p4Sp4Table = new F01212.PXSp6ObasTable("F01_211_4_3_Values", this, this.P1TotalTable, StrKeysP1TotalF012Xx.P4);
                }
                return this._p4Sp4Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp6Table", {
            get: function () {
                if (this._p3Sp6Table == null) {
                    this._p3Sp6Table = new F01212.PXSp6ObasTable("F01_211_3_6_Values", this, this.P1TotalTable, StrKeysP1TotalF012Xx.P3);
                }
                return this._p3Sp6Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp6Table", {
            get: function () {
                if (this._p2Sp6Table == null) {
                    this._p2Sp6Table = new F01212.PXSp6ObasTable("F01_211_2_5_Values", this, this.P1TotalTable, StrKeysP1TotalF012Xx.P2);
                }
                return this._p2Sp6Table;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(FDocument.prototype, "P3Sp4r2Sheet", {
            get: function () {
                if (this._p3Sp4r2Sheet == null) {
                    this._p3Sp4r2Sheet = new F01212.P3Sp4r2Sheet(this, 1);
                }
                return this._p3Sp4r2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp3r2Sheet", {
            get: function () {
                if (this._p4Sp3r2Sheet == null) {
                    this._p4Sp3r2Sheet = new F01212.P4Sp3r2Sheet(this, 1);
                }
                return this._p4Sp3r2Sheet;
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
        Object.defineProperty(FDocument.prototype, "KeyFieldIds", {
            get: function () {
                return FDocument._keyFieldIs;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(F012XX.FDocument));
    FDocument._keyFieldIs = ["StrKey", "OwnerKey"];
    F01212.FDocument = FDocument;
})(F01212 || (F01212 = {}));
