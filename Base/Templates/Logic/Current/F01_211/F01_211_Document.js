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
var F01211;
(function (F01211) {
    var DocumentF012XxBase = F012XX.FDocument;
    var StrKeysP1TotalF012Xx = F012XX.P1TotalStrKeys;
    var IndexSheet = F012XX.IndexSheet;
    var P4IndexSheet = F012XX.P4IndexSheet;
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion, null) || this;
            _this._p2Sp1Table = null;
            _this._p4Sp1Table = null;
            _this._p5Sp1Table = null;
            _this._p2Sp6Table = null;
            _this._p3Sp6Table = null;
            _this._p4Sp4Table = null;
            _this._p5Sp6Table = null;
            _this._p2Sp2Table = null;
            _this._p3Sp2Table = null;
            _this._p4Sp2Table = null;
            _this._p5Sp2Table = null;
            _this._p2Sp3Table = null;
            _this._p3Sp3Table = null;
            _this._p4Sp3Table = null;
            _this._p5Sp3Table = null;
            _this._p2Sp1Sheet = null;
            _this._p3Sp1Sheet = null;
            _this._p4Sp1Sheet = null;
            _this._p5Sp1Sheet = null;
            _this._p2Sp6Sheet = null;
            _this._p3Sp6Sheet = null;
            _this._p4Sp4Sheet = null;
            _this._p5Sp6Sheet = null;
            _this._p2Sp2Sheet = null;
            _this._p3Sp2Sheet = null;
            _this._p4Sp2Sheet = null;
            _this._p5Sp2Sheet = null;
            _this._p2Sp3GroupSheet = null;
            _this._p5Sp3GroupSheet = null;
            _this._p2Sp4GroupSheet = null;
            _this._p5Sp4GroupSheet = null;
            _this._p3Sp3GroupSheet = null;
            _this._p3Sp4GroupSheet = null;
            _this._p4Sp3GroupSheet = null;
            _this._p2Sp6GroupSheet = null;
            _this._p3Sp5GroupSheet = null;
            _this._p5Sp6r2Sheet = null;
            _this._tableRules = new F01211.TableRules(_this);
            _this._interfaceRules = new F01211.InterfaceRules(_this);
            _this._updateRules = new F01211.UpdateRules(_this);
            _this._exportRules = new F01211.ExportRules(_this);
            return _this;
        }

        Object.defineProperty(FDocument.prototype, "P4Sp3GroupSheet", {
            get: function () {
                if (this._p4Sp3GroupSheet == null) {
                    this._p4Sp3GroupSheet = new F01211.P4Sp3GroupSheet(this, 1);
                }
                return this._p4Sp3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp4GroupSheet", {
            get: function () {
                if (this._p3Sp4GroupSheet == null) {
                    this._p3Sp4GroupSheet = new F01211.P3Sp4GroupSheet(this, 3);
                }
                return this._p3Sp4GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp3GroupSheet", {
            get: function () {
                if (this._p3Sp3GroupSheet == null) {
                    this._p3Sp3GroupSheet = new F01211.P3Sp3GroupSheet(this, 3);
                }
                return this._p3Sp3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(FDocument.prototype, "P3Sp5GroupSheet", {
            get: function () {
                if (this._p3Sp5GroupSheet == null) {
                    this._p3Sp5GroupSheet = new F01211.P3Sp5GroupSheet(this, 1);
                }
                return this._p3Sp5GroupSheet;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(FDocument.prototype, "P5Sp4GroupSheet", {
            get: function () {
                if (this._p5Sp4GroupSheet == null) {
                    this._p5Sp4GroupSheet = new F01211.P5Sp4GroupSheet(this, 1);
                }
                return this._p5Sp4GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp4GroupSheet", {
            get: function () {
                if (this._p2Sp4GroupSheet == null) {
                    this._p2Sp4GroupSheet = new F01211.P2Sp4GroupSheet(this, 1);
                }
                return this._p2Sp4GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp3GroupSheet", {
            get: function () {
                if (this._p5Sp3GroupSheet == null) {
                    this._p5Sp3GroupSheet = new F01211.P5Sp3GroupSheet(this, 1);
                }
                return this._p5Sp3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3GroupSheet", {
            get: function () {
                if (this._p2Sp3GroupSheet == null) {
                    this._p2Sp3GroupSheet = new F01211.P2Sp3GroupSheet(this, 1);
                }
                return this._p2Sp3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(FDocument.prototype, "P2Sp6GroupSheet", {
            get: function () {
                if (this._p2Sp6GroupSheet == null) {
                    this._p2Sp6GroupSheet = new F01211.P2Sp6GroupSheet(this, 1);
                }
                return this._p2Sp6GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp6r2Sheet", {
            get: function () {
                if (this._p5Sp6r2Sheet == null) {
                    this._p5Sp6r2Sheet = new F01211.P5Sp6r2Sheet(this, 1);
                }
                return this._p5Sp6r2Sheet;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(FDocument.prototype, "P5Sp2Sheet", {
            get: function () {
                if (this._p5Sp2Sheet == null) {
                    this._p5Sp2Sheet = new IndexSheet("F01_211_5_2_Grid", this, 1);
                }
                return this._p5Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp2Sheet", {
            get: function () {
                if (this._p4Sp2Sheet == null) {
                    this._p4Sp2Sheet = new P4IndexSheet("F01_211_4_Indexation_Grid", this, 1, 1);
                }
                return this._p4Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp2Sheet", {
            get: function () {
                if (this._p3Sp2Sheet == null) {
                    this._p3Sp2Sheet = new IndexSheet("F01_211_3_2_Grid", this, 1);
                }
                return this._p3Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2Sheet", {
            get: function () {
                if (this._p2Sp2Sheet == null) {
                    this._p2Sp2Sheet = new IndexSheet("F01_211_2_2_Grid", this, 1);
                }
                return this._p2Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp6Sheet", {
            get: function () {
                if (this._p5Sp6Sheet == null) {
                    this._p5Sp6Sheet = new InsuranceSheet("SHT_F01_211_5_6", this);
                }
                return this._p5Sp6Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp4Sheet", {
            get: function () {
                if (this._p4Sp4Sheet == null) {
                    this._p4Sp4Sheet = new InsuranceSheet("SHT_F01_211_4_4", this);
                }
                return this._p4Sp4Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp6Sheet", {
            get: function () {
                if (this._p3Sp6Sheet == null) {
                    this._p3Sp6Sheet = new InsuranceSheet("SHT_F01_211_3_6", this);
                }
                return this._p3Sp6Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp6Sheet", {
            get: function () {
                if (this._p2Sp6Sheet == null) {
                    this._p2Sp6Sheet = new InsuranceSheet("SHT_F01_211_2_6", this);
                }
                return this._p2Sp6Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp1Sheet", {
            get: function () {
                if (this._p5Sp1Sheet == null) {
                    this._p5Sp1Sheet = new F01211.PXSp1Sheet("SHT_F01_211_5_1", this, this.P5Sp1Table.IsEditCorrection);
                }
                return this._p5Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp1Sheet", {
            get: function () {
                if (this._p4Sp1Sheet == null) {
                    this._p4Sp1Sheet = new F01211.PXSp1Sheet("SHT_F01_211_4_1", this, this.P4Sp1Table.IsEditCorrection);
                }
                return this._p4Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Sheet", {
            get: function () {
                if (this._p2Sp1Sheet == null) {
                    this._p2Sp1Sheet = new F01211.PXSp1Sheet("SHT_F01_211_2_1", this, this.P2Sp1Table.IsEditCorrection);
                }
                return this._p2Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp3Table", {
            get: function () {
                if (this._p5Sp3Table == null) {
                    this._p5Sp3Table = new F01211.P5Sp3Sp4ObasTable("F01_211_r5_3_r5_4", this);
                }
                return this._p5Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp3Table", {
            get: function () {
                if (this._p4Sp3Table == null) {
                    this._p4Sp3Table = new F01211.P4Sp3ObasTable("F01_211_4_2", this);
                }
                return this._p4Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp3Table", {
            get: function () {
                if (this._p3Sp3Table == null) {
                    this._p3Sp3Table = new F01211.P3Sp3Sp4ObasTable("F01_211_r3_3_r3_4", this);
                }
                return this._p3Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3Table", {
            get: function () {
                if (this._p2Sp3Table == null) {
                    this._p2Sp3Table = new F01211.P2Sp3Sp4ObasTable("F01_211_r2_3_r2_4", this);
                }
                return this._p2Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp2Table", {
            get: function () {
                if (this._p5Sp2Table == null) {
                    this._p5Sp2Table = new F01211.PXSp2ObasTable("F01_211_5_2_Values", this, this.P5Sp1Table, this.P5Sp6Table, FDocument._keyFieldIs, "F01_211_5_2_Rows");
                }
                return this._p5Sp2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp2Table", {
            get: function () {
                if (this._p4Sp2Table == null) {
                    this._p4Sp2Table = new F01211.PXSp2ObasTable("F01_211_4_Indexation_Values", this, this.P4Sp1Table, this.P4Sp4Table, FDocument._keyFieldIs, "F01_211_4_Indexation_Rows");
                }
                return this._p4Sp2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp2Table", {
            get: function () {
                if (this._p3Sp2Table == null) {
                    this._p3Sp2Table = new F01211.P3Sp2ObasTable("F01_211_3_2_Values", this, this.P3Sp6Table, FDocument._keyFieldIs, "F01_211_3_2_Rows", this.P1TotalTable);
                }
                return this._p3Sp2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2Table", {
            get: function () {
                if (this._p2Sp2Table == null) {
                    this._p2Sp2Table = new F01211.PXSp2ObasTable("F01_211_2_2_Values", this, this.P2Sp1Table, this.P2Sp6Table, FDocument._keyFieldIs, "F01_211_2_2_Rows");
                }
                return this._p2Sp2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp6Table", {
            get: function () {
                if (this._p5Sp6Table == null) {
                    this._p5Sp6Table = new F01211.PXSp6ObasTable("F01_211_5_6_Values", this, this.P5Sp1Table);
                }
                return this._p5Sp6Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp4Table", {
            get: function () {
                if (this._p4Sp4Table == null) {
                    this._p4Sp4Table = new F01211.PXSp6ObasTable("F01_211_4_3_Values", this, this.P4Sp1Table);
                }
                return this._p4Sp4Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp6Table", {
            get: function () {
                if (this._p3Sp6Table == null) {
                    this._p3Sp6Table = new F01211.P3Sp6ObasTable("F01_211_3_6_Values", this, this.P1TotalTable);
                }
                return this._p3Sp6Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp6Table", {
            get: function () {
                if (this._p2Sp6Table == null) {
                    this._p2Sp6Table = new F01211.PXSp6ObasTable("F01_211_2_5_Values", this, this.P2Sp1Table);
                }
                return this._p2Sp6Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp1Table", {
            get: function () {
                if (this._p5Sp1Table == null) {
                    this._p5Sp1Table = new F01211.PXSp1ObasTable("F01_211_5_1_Values", this, StrKeysP1TotalF012Xx.P5, FDocument._keyFieldIs, true);
                }
                return this._p5Sp1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp1Table", {
            get: function () {
                if (this._p4Sp1Table == null) {
                    this._p4Sp1Table = new F01211.PXSp1ObasTable("F01_211_4_1_Values", this, StrKeysP1TotalF012Xx.P4, FDocument._keyFieldIs);
                }
                return this._p4Sp1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Table", {
            get: function () {
                if (this._p2Sp1Table == null) {
                    this._p2Sp1Table = new F01211.PXSp1ObasTable("F01_211_2_1_Values", this, StrKeysP1TotalF012Xx.P2, FDocument._keyFieldIs);
                }
                return this._p2Sp1Table;
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
    }(DocumentF012XxBase));
    FDocument._keyFieldIs = [BaseObasTableFields.StrKeyField.Id];
    F01211.FDocument = FDocument;
})(F01211 || (F01211 = {}));
