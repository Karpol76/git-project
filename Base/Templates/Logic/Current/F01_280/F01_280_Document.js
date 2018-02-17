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
var F01280;
(function (F01280) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1 = null;
            _this._tableP2Sp1 = null;
            _this._tableP3Sp1 = null;
            _this._tableP4Sp1 = null;
            _this._tableP5Sp1 = null;
            _this._tableP2Sp2 = null;
            _this._tableP3Sp2 = null;
            _this._tableP4Sp2 = null;
            _this._tableP5Sp2 = null;
            _this._tableP2SpInsurance = null;
            _this._tableP3SpInsurance = null;
            _this._tableP4SpInsurance = null;
            _this._tableP5SpInsurance = null;
            _this._tableP2SpIndexation = null;
            _this._tableP3SpIndexation = null;
            _this._tableP4SpIndexation = null;
            _this._tableP5SpIndexation = null;
            _this._tableP2SpExecWrits = null;
            _this._tableP3SpExecWrits = null;
            _this._tableP4SpExecWrits = null;
            _this._tableP5SpExecWrits = null;
            _this._tableP2Sp3 = null;
            _this._tableP3Sp3 = null;
            _this._tableP5Sp3 = null;
            _this._tableP4Sp3 = null;
            _this._tableP2Sp6 = null;
            _this._tableFormInsurValues = null;
            _this._canCalcIndexation = null;
            _this._rowPartsCount = null;
            _this._positionsSpr0116 = null;
            _this._p1Sheet = null;
            _this._p2Sp1Sheet = null;
            _this._p3Sp1Sheet = null;
            _this._p4Sp1Sheet = null;
            _this._p5Sp1Sheet = null;
            _this._p2Sp6Sheet = null;
            _this._p2Sp9Sheet = null;
            _this._p3Sp11Sheet = null;
            _this._p4Sp9Sheet = null;
            _this._p5Sp10Sheet = null;
            _this._p2Sp9r2Sheet = null;
            _this._insuranceGroupSheet = null;
            _this._onlyInsuranceSheet = null;
            _this._tableRules = new F01280.TableRules(_this);
            _this._interfaceRules = new F01280.InterfaceRules(_this);
            _this._updateRules = new F01280.UpdateRules(_this);
            _this._exportRules = new F01280.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.TableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "OnlyInsuranceSheet", {
            get: function () {
                if (this._onlyInsuranceSheet == null) {
                    this._onlyInsuranceSheet = new OnlyInsuranceSheet("SHT_F01_280_6", this);
                }
                return this._onlyInsuranceSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InsuranceGroupSheet", {
            get: function () {
                if (this._insuranceGroupSheet == null) {
                    this._insuranceGroupSheet = new F01280.InsuranceGroupSheet(this);
                }
                return this._insuranceGroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp10Sheet", {
            get: function () {
                if (this._p5Sp10Sheet == null) {
                    this._p5Sp10Sheet = new F01280.ExecWritsSheet("SHT_F01_280_5_10", this);
                }
                return this._p5Sp10Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp9Sheet", {
            get: function () {
                if (this._p4Sp9Sheet == null) {
                    this._p4Sp9Sheet = new F01280.ExecWritsSheet("SHT_F01_280_4_9", this);
                }
                return this._p4Sp9Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp11Sheet", {
            get: function () {
                if (this._p3Sp11Sheet == null) {
                    this._p3Sp11Sheet = new F01280.ExecWritsSheet("SHT_F01_280_3_11", this);
                }
                return this._p3Sp11Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp9Sheet", {
            get: function () {
                if (this._p2Sp9Sheet == null) {
                    this._p2Sp9Sheet = new F01280.ExecWritsSheet("SHT_F01_280_2_9", this);
                }
                return this._p2Sp9Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp6Sheet", {
            get: function () {
                if (this._p2Sp6Sheet == null) {
                    this._p2Sp6Sheet = new F01280.P2Sp6Sheet(this);
                }
                return this._p2Sp6Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P5Sp1Sheet", {
            get: function () {
                if (this._p5Sp1Sheet == null) {
                    this._p5Sp1Sheet = new F01280.PxTotalSheet(this, "P5Sp1Sheet");
                }
                return this._p5Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4Sp1Sheet", {
            get: function () {
                if (this._p4Sp1Sheet == null) {
                    this._p4Sp1Sheet = new F01280.PxTotalSheet(this, "P4Sp1Sheet");
                }
                return this._p4Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp1Sheet", {
            get: function () {
                if (this._p3Sp1Sheet == null) {
                    this._p3Sp1Sheet = new F01280.PxTotalSheet(this, "P3Sp1Sheet");
                }
                return this._p3Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Sheet", {
            get: function () {
                if (this._p2Sp1Sheet == null) {
                    this._p2Sp1Sheet = new F01280.PxTotalSheet(this, "P2Sp1Sheet");
                }
                return this._p2Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F01280.P1Sheet(this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp9r2Sheet", {
            get: function () {
                if (this._p2Sp9r2Sheet == null) {
                    this._p2Sp9r2Sheet = new F01280.P2Sp9r2Sheet(this, 1);
                }
                return this._p2Sp9r2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PositionsSpr0116", {
            get: function () {
                if (this._positionsSpr0116 == null) {
                    this._positionsSpr0116 = new F01280.PositionsSpr0116();
                }
                return this._positionsSpr0116;
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
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new F01280.ObasTableP1("F01_280_R1_Values", this);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2Sp1", {
            get: function () {
                if (this._tableP2Sp1 == null) {
                    this._tableP2Sp1 = new F01280.ObasTablePXSp1("F01_280_R2_1_OrgValues", this, F01280.StrKeysP1Total.P2);
                }
                return this._tableP2Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3Sp1", {
            get: function () {
                if (this._tableP3Sp1 == null) {
                    this._tableP3Sp1 = new F01280.ObasTablePXSp1("F01_280_R3_1_OrgValues", this, F01280.StrKeysP1Total.P3);
                }
                return this._tableP3Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4Sp1", {
            get: function () {
                if (this._tableP4Sp1 == null) {
                    this._tableP4Sp1 = new F01280.ObasTablePXSp1("F01_280_R4_1_OrgValues", this, F01280.StrKeysP1Total.P4);
                }
                return this._tableP4Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP5Sp1", {
            get: function () {
                if (this._tableP5Sp1 == null) {
                    this._tableP5Sp1 = new F01280.ObasTablePXSp1("F01_280_R5_1_OrgValues", this, F01280.StrKeysP1Total.P5);
                }
                return this._tableP5Sp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2Sp2", {
            get: function () {
                if (this._tableP2Sp2 == null) {
                    this._tableP2Sp2 = new F01280.ObasTablePXSp2("F01_280_R2_1_SumValues", this, this.TableP2Sp1);
                }
                return this._tableP2Sp2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3Sp2", {
            get: function () {
                if (this._tableP3Sp2 == null) {
                    this._tableP3Sp2 = new F01280.ObasTablePXSp2("F01_280_R3_1_SumValues", this, this.TableP3Sp1);
                }
                return this._tableP3Sp2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4Sp2", {
            get: function () {
                if (this._tableP4Sp2 == null) {
                    this._tableP4Sp2 = new F01280.ObasTablePXSp2("F01_280_R4_1_SumValues", this, this.TableP4Sp1);
                }
                return this._tableP4Sp2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP5Sp2", {
            get: function () {
                if (this._tableP5Sp2 == null) {
                    this._tableP5Sp2 = new F01280.ObasTablePXSp2("F01_280_R5_1_SumValues", this, this.TableP5Sp1);
                }
                return this._tableP5Sp2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP5SpInsurance", {
            get: function () {
                if (this._tableP5SpInsurance == null) {
                    this
                        ._tableP5SpInsurance = new F01280.ObasTablePXIns("F01_280_r5_8_SumValues", this, this.TableP5Sp2);
                }
                return this._tableP5SpInsurance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4SpInsurance", {
            get: function () {
                if (this._tableP4SpInsurance == null) {
                    this
                        ._tableP4SpInsurance = new F01280.ObasTablePXIns("F01_280_r4_6_SumValues", this, this.TableP4Sp2);
                }
                return this._tableP4SpInsurance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3SpInsurance", {
            get: function () {
                if (this._tableP3SpInsurance == null) {
                    this
                        ._tableP3SpInsurance = new F01280.ObasTablePXIns("F01_280_r3_9_SumValues", this, this.TableP3Sp2);
                }
                return this._tableP3SpInsurance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2SpInsurance", {
            get: function () {
                if (this._tableP2SpInsurance == null) {
                    this
                        ._tableP2SpInsurance = new F01280.ObasTablePXIns("F01_280_r2_7_SumValues", this, this.TableP2Sp2);
                }
                return this._tableP2SpInsurance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP5SpIndexation", {
            get: function () {
                if (this._tableP5SpIndexation == null) {
                    this
                        ._tableP5SpIndexation = new F01280.ObasTablePXIndex("F01_280_r5_4_SumValues", this, this.TableP5Sp2, this.TableP5SpInsurance);
                }
                return this._tableP5SpIndexation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4SpIndexation", {
            get: function () {
                if (this._tableP4SpIndexation == null) {
                    this
                        ._tableP4SpIndexation = new F01280.ObasTableP4Index("F01_280_R4_5_OrgValues", this, this.TableP4Sp2, this.TableP4SpInsurance);
                }
                return this._tableP4SpIndexation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3SpIndexation", {
            get: function () {
                if (this._tableP3SpIndexation == null) {
                    this
                        ._tableP3SpIndexation = new F01280.ObasTablePXIndex("F01_280_r3_5_SumValues", this, this.TableP3Sp2, this.TableP3SpInsurance);
                }
                return this._tableP3SpIndexation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2SpIndexation", {
            get: function () {
                if (this._tableP2SpIndexation == null) {
                    this
                        ._tableP2SpIndexation = new F01280.ObasTablePXIndex("F01_280_r2_4_SumValues", this, this.TableP2Sp2, this.TableP2SpInsurance);
                }
                return this._tableP2SpIndexation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2SpExecWrits", {
            get: function () {
                if (this._tableP2SpExecWrits == null) {
                    this.InitP2OrgTables();
                }
                return this._tableP2SpExecWrits;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3SpExecWrits", {
            get: function () {
                if (this._tableP3SpExecWrits == null) {
                    this.InitP3OrgTables();
                }
                return this._tableP3SpExecWrits;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4SpExecWrits", {
            get: function () {
                if (this._tableP4SpExecWrits == null) {
                    this.InitP4OrgTables();
                }
                return this._tableP4SpExecWrits;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP5SpExecWrits", {
            get: function () {
                if (this._tableP5SpExecWrits == null) {
                    this.InitP5OrgTables();
                }
                return this._tableP5SpExecWrits;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2Sp6", {
            get: function () {
                if (this._tableP2Sp6 == null) {
                    this._tableP2Sp6 = new F01280.ObasTableP2Sp6(this.TableP2SpIndexation, this.TableP2SpInsurance);
                }
                return this._tableP2Sp6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP4Sp3", {
            get: function () {
                if (this._tableP4Sp3 == null) {
                    this._tableP4Sp3 = new F01280.ObasTableP4Sp3("F01_280_r4_2_PosInfo_V2", this, this.TableP4Sp2, this.TableP4SpIndexation, this.TableP4SpInsurance);
                }
                return this._tableP4Sp3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP5Sp3", {
            get: function () {
                if (this._tableP5Sp3 == null) {
                    this._tableP5Sp3 = new F01280.ObasTableP5Sp3("F01_280_r5_2_PosInfo_V2", this, this.TableP5Sp2, this.TableP5SpIndexation, this.TableP5SpInsurance);
                }
                return this._tableP5Sp3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP3Sp3", {
            get: function () {
                if (this._tableP3Sp3 == null) {
                    this._tableP3Sp3 = new F01280.ObasTableP3Sp3("F01_280_r3_2_PosInfo_V2", this, this.TableP3Sp2, this.TableP3SpIndexation, this.TableP3SpInsurance);
                }
                return this._tableP3Sp3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP2Sp3", {
            get: function () {
                if (this._tableP2Sp3 == null) {
                    this._tableP2Sp3 = new F01280.ObasTableP2Sp3("F01_280_r2_2_PosInfo_V2", this, this.TableP2Sp2, this.TableP2SpIndexation, this.TableP2SpInsurance, this.TableP2Sp6);
                }
                return this._tableP2Sp3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableFormInsurValues", {
            get: function () {
                if (this._tableFormInsurValues == null) {
                    this
                        ._tableFormInsurValues = new F01280.ObasTableOnlyInsurance("F01_280_r6_SumValues", this, this.TableP1, F01280.StrKeysP1Total.OtherIns);
                }
                return this._tableFormInsurValues;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "CanCalcIndexation", {
            get: function () {
                if (this._canCalcIndexation == null) {
                    this.UpdateCanCalcIndexation();
                }
                return this._canCalcIndexation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RowPartsCount", {
            get: function () {
                if (this._rowPartsCount == null) {
                    this._rowPartsCount = this.Tables.getValue("F01_280_R2_1_SumTypes_V2").RowCount + 1;
                }
                return this._rowPartsCount;
            },
            enumerable: true,
            configurable: true
        });
        FDocument.prototype.InitP2OrgTables = function () {
            this
                ._tableP2SpExecWrits = new F01280.ObasTablePXExecWrits("F01_280_R2_9", this, this.TableP2Sp1);
        };
        FDocument.prototype.InitP3OrgTables = function () {
            this
                ._tableP3SpExecWrits = new F01280.ObasTablePXExecWrits("F01_280_R3_11", this, this.TableP3Sp1);
        };
        FDocument.prototype.InitP4OrgTables = function () {
            this
                ._tableP4SpExecWrits = new F01280.ObasTablePXExecWrits("F01_280_R4_9", this, this.TableP4Sp1);
        };
        FDocument.prototype.InitP5OrgTables = function () {
            this
                ._tableP5SpExecWrits = new F01280.ObasTablePXExecWrits("F01_280_R5_10", this, this.TableP5Sp1);
        };
        FDocument.prototype.UpdateCanCalcIndexation = function () {
            var foivCode = this.MainParametersTable.Foiv.Code;
            this._canCalcIndexation = !(foivCode === "305" || foivCode === "310");
        };
        return FDocument;
    }(BaseDocumentObject));
    F01280.FDocument = FDocument;
})(F01280 || (F01280 = {}));
