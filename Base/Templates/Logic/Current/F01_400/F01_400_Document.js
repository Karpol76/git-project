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
var F01400;
(function (F01400) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._sheetP2Sp4IsAvailable = null;
            _this._p1RowsTable = null;
            _this._p1TotalTable = null;
            _this._p2Sp1Table = null;
            _this._p2Sp2Table = null;
            _this._p2Sp3Table = null;
            _this._p2Sp4Table = null;
            _this._p2Sp5Table = null;
            _this._p2Sp5KosguTable = null;
            _this._p3Sp3KosguTable = null;
            _this._p3Sp3Table = null;
            _this._pXSp1RowsTable = null;
            _this._p3Sp1Table = null;
            _this._p3Sp2Table = null;
            _this._p2DailyPayDataTable = null;
            _this._p3DailyPayDataTable = null;
            _this._p3DailyPayRowsTable = null;
            _this.NotOnUpdate = true;
            _this._p2Sp3RowsTable = null;
            _this._filteredTableP3Sp3 = null;
            _this._tableRules = new F01400.TableRules(_this);
            _this._interfaceRules = new F01400.InterfaceRules(_this);
            _this._updateRules = new F01400.UpdateRules(_this);
            _this._exportRules = new F01400.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "FilteredTableP3Sp3", {
            get: function () {
                if (this._filteredTableP3Sp3 == null) {
                    this._filteredTableP3Sp3 = new ObasTable("F01_400_R3_3_UniqData", ["KOSGU_ID", "OtherPayments_ID"]);
                }
                return this._filteredTableP3Sp3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3RowsTable", {
            get: function () {
                if (this._p2Sp3RowsTable == null) {
                    this._p2Sp3RowsTable = new F01400.SprRowsTable("F01_400_R2_HallComp_Rows");
                }
                return this._p2Sp3RowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3DailyPayRowsTable", {
            get: function () {
                if (this._p3DailyPayRowsTable == null) {
                    this._p3DailyPayRowsTable = new ObasTable("F01_400_R3_DailyPay_Rows");
                }
                return this._p3DailyPayRowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3DailyPayDataTable", {
            get: function () {
                if (this._p3DailyPayDataTable == null) {
                    this._p3DailyPayDataTable = new F01400.ObasTableP3DailyPayData("F01_400_R3_DailyPay_Data", this.P3DailyPayRowsTable, F01400.StrKeysP1.P3Sp3, this.P1TotalTable);
                }
                return this._p3DailyPayDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2DailyPayDataTable", {
            get: function () {
                if (this._p2DailyPayDataTable == null) {
                    this._p2DailyPayDataTable = new F01400.ObasTableP2DailyPayData("F01_400_R2_DailyPay_Data", new ObasTable("F01_400_R2_DailyPay_Rows"), F01400.StrKeysP1.P2Sp5, this.P1TotalTable);
                }
                return this._p2DailyPayDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp2Table", {
            get: function () {
                if (this._p3Sp2Table == null) {
                    this._p3Sp2Table = new F01400.ObasTableP3Sp2("F01_400_R3_2_Data", this, F01400.StrKeysP1.P3Sp2);
                }
                return this._p3Sp2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp1Table", {
            get: function () {
                if (this._p3Sp1Table == null) {
                    this._p3Sp1Table = new F01400.ObasTableP3Sp1("F01_400_R3_1_Data", this, F01400.StrKeysP1.P3Sp1);
                }
                return this._p3Sp1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PXSp1RowsTable", {
            get: function () {
                if (this._pXSp1RowsTable == null) {
                    this._pXSp1RowsTable = new ObasTable("F01_400_R2_1_Rows");
                }
                return this._pXSp1RowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp3Table", {
            get: function () {
                if (this._p3Sp3Table == null) {
                    this._p3Sp3Table = new F01400.ObasTableP3Sp3("F01_400_R3_3_Data", this.P3Sp3KosguTable, F01400.StrKeysP1.P3Sp4);
                }
                return this._p3Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp3KosguTable", {
            get: function () {
                if (this._p3Sp3KosguTable == null) {
                    this._p3Sp3KosguTable = new F01400.ObasTablePKosgu("F01_400_R3_3_Kosgu", this);
                }
                return this._p3Sp3KosguTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp5KosguTable", {
            get: function () {
                if (this._p2Sp5KosguTable == null) {
                    this._p2Sp5KosguTable = new F01400.ObasTablePKosgu("F01_400_R2_3_Kosgu", this);
                }
                return this._p2Sp5KosguTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp5Table", {
            get: function () {
                if (this._p2Sp5Table == null) {
                    this._p2Sp5Table = new F01400.ObasTableP2Sp5("F01_400_R2_3_Data", this.P2Sp5KosguTable, F01400.StrKeysP1.P2Sp6);
                }
                return this._p2Sp5Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp4Table", {
            get: function () {
                if (this._p2Sp4Table == null) {
                    this._p2Sp4Table = new F01400.ObasTableP2Sp4("F01_400_R2_SpecOtherPay_Data", this);
                }
                return this._p2Sp4Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp3Table", {
            get: function () {
                if (this._p2Sp3Table == null) {
                    this._p2Sp3Table = new F01400.ObasTableP2Sp3("F01_400_R2_HallComp_Data", this);
                }
                return this._p2Sp3Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2Table", {
            get: function () {
                if (this._p2Sp2Table == null) {
                    this._p2Sp2Table = new F01400.ObasTableP2Sp2("F01_400_R2_2_Data", this);
                }
                return this._p2Sp2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Table", {
            get: function () {
                if (this._p2Sp1Table == null) {
                    this._p2Sp1Table = new F01400.ObasTableP2Sp1("F01_400_R2_1_Data", this);
                }
                return this._p2Sp1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F01400.ObasTableP1Total("F01_400_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1RowsTable", {
            get: function () {
                if (this._p1RowsTable == null) {
                    this._p1RowsTable = new F01400.ObasTableP1Rows();
                }
                return this._p1RowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument, "P2Sp4AvailableDircostCodes", {
            get: function () {
                return FDocument._p2Sp4AvailableDircostCodes;
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
        Object.defineProperty(FDocument.prototype, "SheetP2Sp4IsAvailable", {
            get: function () {
                if (this._sheetP2Sp4IsAvailable == null) {
                    this._sheetP2Sp4IsAvailable = FDocument.P2Sp4AvailableDircostCodes
                        .indexOf(this.MainParametersTable.DirectionCost.Code) >
                        -1;
                }
                return this._sheetP2Sp4IsAvailable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    FDocument._p2Sp4AvailableDircostCodes = ["93987", "93974"];
    F01400.FDocument = FDocument;
})(F01400 || (F01400 = {}));
