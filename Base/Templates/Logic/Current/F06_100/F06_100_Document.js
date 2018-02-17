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
var F06100;
(function (F06100) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion, "F06_100_UniqueOrgs") || this;
            _this._p1Sheet = null;
            _this._p2Sp5Sheet = null;
            _this._p2Sp5RowsTable = null;
            _this._paidActivityInfoSheet = null;
            _this._p2Sp3GroupSheet = null;
            _this._p2Sp1GroupSheet = null;
            _this._p2Sp2GroupSheet = null;
            _this._p1TotalTable = null;
            _this._p2Sp1ServTable = null;
            _this._p2Sp2WorkTable = null;
            _this._p2Sp1OrgTable = null;
            _this._p2Sp3Table = null;
            _this._p2Sp2OrgTable = null;
            _this._paidActivityInfoTable = null;
            _this._p2Sp4Table = null;
            _this._p2Sp5Table = null;
            _this._p2Sp1ServIndexTable = null;
            _this._p2Sp2WorkIndexTable = null;
            _this._p2P3StrCodeTable = null;
            _this._tableRules = new F06100.TableRules(_this);
            _this._interfaceRules = new F06100.InterfaceRules(_this);
            _this._updateRules = new F06100.UpdateRules(_this);
            _this._exportRules = new F06100.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P2Sp2WorkIndexTable", {
            get: function () {
                if (this._p2Sp2WorkIndexTable == null) {
                    this._p2Sp2WorkIndexTable = new F06100.P2WorkIndicatorsTable("F06_100_R2_2_V3", this.P2Sp2OrgTable, this.P1TotalTable, F06100.P1StrKeys.Work);
                }
                return this._p2Sp2WorkIndexTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1ServIndexTable", {
            get: function () {
                if (this._p2Sp1ServIndexTable == null) {
                    this._p2Sp1ServIndexTable = new F06100.P2ServiceIndicatorsTable("F06_100_R2_1_V3", this.P2Sp1OrgTable, this.P1TotalTable, F06100.P1StrKeys.Service);
                }
                return this._p2Sp1ServIndexTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp5Table", {
            get: function () {
                if (this._p2Sp5Table == null) {
                    this._p2Sp5Table = new F06100.P2Sp5Table("F06_100_Adjust_Values", this.P1TotalTable);
                }
                return this._p2Sp5Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp4Table", {
            get: function () {
                if (this._p2Sp4Table == null) {
                    this._p2Sp4Table = new F06100.P2Sp4Table("F06_100_r2_4", this.P1TotalTable);
                }
                return this._p2Sp4Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PaidActivityInfoTable", {
            get: function () {
                if (this._paidActivityInfoTable == null) {
                    this._paidActivityInfoTable = new F06100.PaidActivityInfoTable("F06_100_R2_3_5", this.P2Sp3Table);
                }
                return this._paidActivityInfoTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2OrgTable", {
            get: function () {
                if (this._p2Sp2OrgTable == null) {
                    this.InitPartOrgTables();
                }
                return this._p2Sp2OrgTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2P3StrCodeTable", {
            get: function () {
                if (this._p2P3StrCodeTable == null) {
                    this._p2P3StrCodeTable = new F06100.P2P3StrCodeTable("F06_100_R2_3_StrKey", ["StrCode"], this);
                }
                return this._p2P3StrCodeTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3Table", {
            get: function () {
                if (this._p2Sp3Table == null) {
                    this._p2Sp3Table = new F06100.P2Sp3Table("F06_100_R2_3", this.P1TotalTable);
                }
                return this._p2Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1OrgTable", {
            get: function () {
                if (this._p2Sp1OrgTable == null) {
                    this.InitPartOrgTables();
                }
                return this._p2Sp1OrgTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2WorkTable", {
            get: function () {
                if (this._p2Sp2WorkTable == null) {
                    this._p2Sp2WorkTable = new F06100.PartServWorkTable("F06_100_R2_2_Main_L1_V2", this);
                }
                return this._p2Sp2WorkTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1ServTable", {
            get: function () {
                if (this._p2Sp1ServTable == null) {
                    this._p2Sp1ServTable = new F06100.PartServWorkTable("F06_100_R2_1_Main_L1_V2", this);
                }
                return this._p2Sp1ServTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F06100.P1TotalTable("F06_100_R1_TotalSums_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2GroupSheet", {
            get: function () {
                if (this._p2Sp2GroupSheet == null) {
                    this._p2Sp2GroupSheet = new F06100.P2Sp2GroupSheet(this);
                }
                return this._p2Sp2GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1GroupSheet", {
            get: function () {
                if (this._p2Sp1GroupSheet == null) {
                    this._p2Sp1GroupSheet = new F06100.P2Sp1GroupSheet(this);
                }
                return this._p2Sp1GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3GroupSheet", {
            get: function () {
                if (this._p2Sp3GroupSheet == null) {
                    this._p2Sp3GroupSheet = new F06100.P2Sp3GroupSheet(this);
                }
                return this._p2Sp3GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PaidActivityInfoSheet", {
            get: function () {
                if (this._paidActivityInfoSheet == null) {
                    this._paidActivityInfoSheet = new F06100.PaidActivityInfoSheet("SHT_R2_3_5", this);
                }
                return this._paidActivityInfoSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp5RowsTable", {
            get: function () {
                if (this._p2Sp5RowsTable == null) {
                    this._p2Sp5RowsTable = new F06100.AdjustRows("F06_100_Adjust_Rows");
                }
                return this._p2Sp5RowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp5Sheet", {
            get: function () {
                if (this._p2Sp5Sheet == null) {
                    this._p2Sp5Sheet = new F06100.P2Sp5Sheet("SHT_R2_5_Adjust", this);
                }
                return this._p2Sp5Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F06100.P1Sheet("SHT_F06_100_1", this);
                }
                return this._p1Sheet;
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
        FDocument.prototype.InitPartOrgTables = function () {
            this._p2Sp1OrgTable = new F06100.PartOrgTable("F06_100_R2_1_Main_L2_V2", this.P2Sp1ServTable, this.P2Sp3Table);
            this._p2Sp2OrgTable = new F06100.PartOrgTable("F06_100_R2_2_Main_L2_V2", this.P2Sp2WorkTable, this.P2Sp3Table);
        };
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseExtendOrgDocumentObject));
    F06100.FDocument = FDocument;
})(F06100 || (F06100 = {}));
