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
var F01302;
(function (F01302) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this.NotOnUpdate = true;
            _this._p1Sheet = null;
            _this._p2Sp1Sheet = null;
            _this._p3Sp1Sheet = null;
            _this._p4Sp1Sheet = null;
            _this._p2Sp2GroupSheet = null;
            _this._p2Sp2Sp3RowsTable = null;
            _this._p2Sp3GroupSheet = null;
            _this._p3Sp3GroupSheet = null;
            _this._p3Sp2GroupSheet = null;
            _this._p1TotalTable = null;
            _this._p2Sp1Table = null;
            _this._p3Sp1Table = null;
            _this._p4Sp1Table = null;
            _this._post0109SprTable = null;
            _this._p3Sp2DataTable = null;
            _this._paymentsSprTable = null;
            _this._p3Sp3DataTable = null;
            _this._p2Sp2DataTable = null;
            _this._p2Sp3DataTable = null;
            _this._tableRules = new F01302.TableRules(_this);
            _this._interfaceRules = new F01302.InterfaceRules(_this);
            _this._updateRules = new F01302.UpdateRules(_this);
            _this._exportRules = new F01302.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P2Sp3DataTable", {
            get: function () {
                if (this._p2Sp3DataTable == null) {
                    this._p2Sp3DataTable = new F01302.P2Sp3DataTable("F01_302_r2_2", this.P2Sp2DataTable);
                }
                return this._p2Sp3DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2DataTable", {
            get: function () {
                if (this._p2Sp2DataTable == null) {
                    this._p2Sp2DataTable = new F01302.P2Sp2DataTable("F01_302_r2_1_V2", this.P2Sp1Table);
                }
                return this._p2Sp2DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp3DataTable", {
            get: function () {
                if (this._p3Sp3DataTable == null) {
                    this._p3Sp3DataTable = new F01302.P3Sp3DataTable("F01_302_r3_2_V2", this.P3Sp2DataTable);
                }
                return this._p3Sp3DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PaymentsSprTable", {
            get: function () {
                if (this._paymentsSprTable == null) {
                    this._paymentsSprTable = new SprTable("Payments");
                }
                return this._paymentsSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp2DataTable", {
            get: function () {
                if (this._p3Sp2DataTable == null) {
                    this._p3Sp2DataTable = new F01302.P3Sp2DataTable("F01_302_R3_1_V2", this.P3Sp1Table);
                }
                return this._p3Sp2DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Post0109SprTable", {
            get: function () {
                if (this._post0109SprTable == null) {
                    this._post0109SprTable = new SprTable("Spr_01_19");
                }
                return this._post0109SprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp1Table", {
            get: function () {
                if (this._p4Sp1Table == null) {
                    this._p4Sp1Table = new F01302.P4Sp1Table("F01_302_Interns_Values", this, this.P1TotalTable, F01302.StrKeysP1Total.FotTrainee);
                }
                return this._p4Sp1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp1Table", {
            get: function () {
                if (this._p3Sp1Table == null) {
                    this._p3Sp1Table = new F01302.PxSp1Table("F01_302_R3_Sums_Values", this, this.P1TotalTable, F01302.StrKeysP1Total.FotRanked);
                }
                return this._p3Sp1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Table", {
            get: function () {
                if (this._p2Sp1Table == null) {
                    this._p2Sp1Table = new F01302.PxSp1Table("F01_302_R2_Sums_Values", this, this.P1TotalTable, F01302.StrKeysP1Total.FotMilitary);
                }
                return this._p2Sp1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F01302.P1TotalTable("F01_302_r1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp2GroupSheet", {
            get: function () {
                if (this._p3Sp2GroupSheet == null) {
                    this._p3Sp2GroupSheet = new F01302.P3Sp2GroupSheet(this);
                }
                return this._p3Sp2GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp3GroupSheet", {
            get: function () {
                if (this._p3Sp3GroupSheet == null) {
                    this._p3Sp3GroupSheet = new F01302.PxSp3GroupSheet(this, this.P3Sp3DataTable);
                }
                return this._p3Sp3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3GroupSheet", {
            get: function () {
                if (this._p2Sp3GroupSheet == null) {
                    this._p2Sp3GroupSheet = new F01302.PxSp3GroupSheet(this, this.P2Sp3DataTable);
                }
                return this._p2Sp3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2Sp3RowsTable", {
            get: function () {
                if (this._p2Sp2Sp3RowsTable == null) {
                    this._p2Sp2Sp3RowsTable = new F01302.P2Sp2Sp3RowsSprTable("F01_302_R2_2_Rows", this);
                }
                return this._p2Sp2Sp3RowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2GroupSheet", {
            get: function () {
                if (this._p2Sp2GroupSheet == null) {
                    this._p2Sp2GroupSheet = new F01302.P2Sp2GroupSheet(this);
                }
                return this._p2Sp2GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp1Sheet", {
            get: function () {
                if (this._p4Sp1Sheet == null) {
                    this._p4Sp1Sheet = new F01302.P4Sp1Sheet("SHT_F01_302_4_Interns", this);
                }
                return this._p4Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp1Sheet", {
            get: function () {
                if (this._p3Sp1Sheet == null) {
                    this._p3Sp1Sheet = new F01302.PxSp1Sheet("SHT_F01_302_3_Sums", this);
                }
                return this._p3Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Sheet", {
            get: function () {
                if (this._p2Sp1Sheet == null) {
                    this._p2Sp1Sheet = new F01302.PxSp1Sheet("SHT_F01_302_2_Sums", this);
                }
                return this._p2Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F01302.P1Sheet("SHT_F01_302_R1", this);
                }
                return this._p1Sheet;
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
    F01302.FDocument = FDocument;
})(F01302 || (F01302 = {}));
