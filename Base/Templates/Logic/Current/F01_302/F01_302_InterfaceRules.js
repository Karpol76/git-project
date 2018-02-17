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
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Всего";
    InterfaceRules.TotalRowCode = 9000000;
    InterfaceRules.SubTotalRowName = "Итого по составу военнослужащих";
    InterfaceRules.TotalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules.TotalRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules.TotalOrgRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules.SubTotalRowName,
        Format: SheetFormatCollection.Default
    };
    F01302.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column < 2) {
                return SheetFormatCollection.Default;
            }
            else {
                if (row === 0 || this._document.CommonRules.IsFooterRow(this, row)) {
                    return SheetFormatCollection.Calc;
                }
                else if (row === this.RowCount - 2) {
                    return SheetFormatCollection.Free;
                }
                else {
                    return SheetFormatCollection.Related;
                }
            }
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (row === 0 && column > 1) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                for (var i = 1; i <= 2; i++) {
                    result.AddCoordinates(new CellCoordinate(row + i, column));
                }
                return result.ToArray();
            }
            return undefined;
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return ((column > 1) && (row === this.RowCount - 2));
        };
        return P1Sheet;
    }(Sheet));
    F01302.P1Sheet = P1Sheet;
    var PxSp1RelRows;
    (function (PxSp1RelRows) {
        PxSp1RelRows[PxSp1RelRows["Fot"] = 0] = "Fot";
        PxSp1RelRows[PxSp1RelRows["Change"] = 1] = "Change";
        PxSp1RelRows[PxSp1RelRows["Correction"] = 2] = "Correction";
        PxSp1RelRows[PxSp1RelRows["Total"] = 3] = "Total";
    })(PxSp1RelRows = F01302.PxSp1RelRows || (F01302.PxSp1RelRows = {}));
    var PxSp1Sheet = (function (_super) {
        __extends(PxSp1Sheet, _super);
        function PxSp1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        PxSp1Sheet.prototype.IsFooterRow = function (row) {
            return this._document.CommonRules.IsFooterRow(this, row);
        };
        PxSp1Sheet.prototype.IsDataColumn = function (column) {
            return column > PxSp1Sheet._rowCodeColumn;
        };
        PxSp1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column)) {
                switch (row) {
                    case PxSp1RelRows.Fot:
                        return SheetFormatCollection.Related;
                    case PxSp1RelRows.Change:
                        return SheetFormatCollection.Free;
                    case PxSp1RelRows.Correction:
                    case PxSp1RelRows.Total:
                        return SheetFormatCollection.Calc;
                }
            }
            return SheetFormatCollection.Default;
        };
        PxSp1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsDataColumn(column) && this.IsFooterRow(row)) {
                return this._document.CommonRules.GetFooterSum(this, row, column);
            }
            return undefined;
        };
        PxSp1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return row === PxSp1RelRows.Change && this.IsDataColumn(column);
        };
        return PxSp1Sheet;
    }(Sheet));
    PxSp1Sheet._rowCodeColumn = 1;
    F01302.PxSp1Sheet = PxSp1Sheet;
    var P4Sp1Sheet = (function (_super) {
        __extends(P4Sp1Sheet, _super);
        function P4Sp1Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4Sp1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (row === PxSp1RelRows.Fot && this.IsDataColumn(column)) {
                return SheetFormatCollection.Free;
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P4Sp1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return (row === PxSp1RelRows.Change || row === PxSp1RelRows.Fot) && this.IsDataColumn(column);
        };
        return P4Sp1Sheet;
    }(PxSp1Sheet));
    F01302.P4Sp1Sheet = P4Sp1Sheet;
    var P2Sp2RelRows;
    (function (P2Sp2RelRows) {
        P2Sp2RelRows[P2Sp2RelRows["AllContracts"] = 0] = "AllContracts";
        P2Sp2RelRows[P2Sp2RelRows["AllOfficers"] = 1] = "AllOfficers";
        P2Sp2RelRows[P2Sp2RelRows["SeniorOfficers"] = 2] = "SeniorOfficers";
        P2Sp2RelRows[P2Sp2RelRows["MiddleOfficers"] = 3] = "MiddleOfficers";
        P2Sp2RelRows[P2Sp2RelRows["JuniorOfficers"] = 4] = "JuniorOfficers";
        P2Sp2RelRows[P2Sp2RelRows["Ensigns"] = 5] = "Ensigns";
        P2Sp2RelRows[P2Sp2RelRows["OtherContracts"] = 6] = "OtherContracts";
        P2Sp2RelRows[P2Sp2RelRows["CadetsWithContract"] = 7] = "CadetsWithContract";
        P2Sp2RelRows[P2Sp2RelRows["CadetsWithoutContract"] = 8] = "CadetsWithoutContract";
        P2Sp2RelRows[P2Sp2RelRows["Inductees"] = 9] = "Inductees";
        P2Sp2RelRows[P2Sp2RelRows["Total"] = 10] = "Total";
    })(P2Sp2RelRows || (P2Sp2RelRows = {}));
    var P2Sp2GroupSheet = (function (_super) {
        __extends(P2Sp2GroupSheet, _super);
        function P2Sp2GroupSheet(document) {
            var _this = _super.call(this, document) || this;
            _this._sheet = null;
            return _this;
        }
        P2Sp2GroupSheet.prototype.IsCalcCol = function (column) {
            return column === 2 || column > 4;
        };
        P2Sp2GroupSheet.prototype.IsXCol = function (column) {
            return column === 3 || column === 4;
        };
        P2Sp2GroupSheet.prototype.IsDataColumn = function (column) {
            return column > P2Sp2GroupSheet._rowCodeColumn;
        };
        P2Sp2GroupSheet.prototype.FormatTotalRow = function (column) {
            if (this.IsCalcCol(column)) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Default;
            }
        };
        P2Sp2GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            this._sheet = this.Document.Sheets.getValue(sheetId);
            if (this.IsDataColumn(column)) {
                switch (row) {
                    case P2Sp2RelRows.Total:
                    case P2Sp2RelRows.AllContracts:
                        return this.FormatTotalRow(column);
                    case P2Sp2RelRows.AllOfficers:
                        return SheetFormatCollection.Calc;
                    default:
                        if (column < 5) {
                            return SheetFormatCollection.Free;
                        }
                        else if (column === 6) {
                            return SheetFormatCollection.Related;
                        }
                        else {
                            return SheetFormatCollection.Calc;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        P2Sp2GroupSheet.prototype.GetSumFormula = function (row, column, posts) {
            var result = new SheetCalcResult(BaseFormulas.SUM);
            for (var i = 0, len = posts.length; i < len; i++) {
                result.AddCoordinates(new CellCoordinate(posts[i], column));
            }
            return result.ToArray();
        };
        P2Sp2GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            this._sheet = this.Document.Sheets.getValue(sheetId);
            if (this.IsDataColumn(column)) {
                switch (row) {
                    case P2Sp2RelRows.Total:
                        if (this.IsXCol(column)) {
                            return ObasHelper.X;
                        }
                        else if (this.IsCalcCol(column)) {
                            return this.GetSumFormula(row, column, [P2Sp2RelRows.AllContracts, P2Sp2RelRows.Inductees]);
                        }
                    case P2Sp2RelRows.AllContracts:
                        if (this.IsXCol(column)) {
                            return ObasHelper.X;
                        }
                        else if (this.IsCalcCol(column)) {
                            return this.GetSumFormula(row, column, [
                                P2Sp2RelRows.AllOfficers, P2Sp2RelRows.Ensigns, P2Sp2RelRows.OtherContracts,
                                P2Sp2RelRows.CadetsWithContract, P2Sp2RelRows.CadetsWithoutContract
                            ]);
                        }
                    case P2Sp2RelRows.AllOfficers:
                        return this.GetSumFormula(row, column, [P2Sp2RelRows.SeniorOfficers, P2Sp2RelRows.MiddleOfficers, P2Sp2RelRows.JuniorOfficers]);
                }
            }
            else if (column === P2Sp2GroupSheet._rowCodeColumn) {
                return ObasHelper.FillWithCharacter(this._sheet.GetCellValue(row, column), P2Sp2GroupSheet._rowCodeLength, "0", this.Document.CommonRules.IsFooterRow(this._sheet, row)
                    ? FillCharactersDirection.Last
                    : FillCharactersDirection.First);
            }
            return undefined;
        };
        return P2Sp2GroupSheet;
    }(YearGroupSheet));
    P2Sp2GroupSheet._rowCodeColumn = 1;
    P2Sp2GroupSheet._rowCodeLength = 7;
    F01302.P2Sp2GroupSheet = P2Sp2GroupSheet;
    var PxSp3SheetColumns;
    (function (PxSp3SheetColumns) {
        PxSp3SheetColumns[PxSp3SheetColumns["Category"] = 0] = "Category";
        PxSp3SheetColumns[PxSp3SheetColumns["StrCode"] = 2] = "StrCode";
    })(PxSp3SheetColumns || (PxSp3SheetColumns = {}));
    var PxSp3GroupSheet = (function () {
        function PxSp3GroupSheet(_document, _payTable) {
            this._document = _document;
            this._payTable = _payTable;
        }
        PxSp3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this._document.CommonRules.StandardFormat(sheetId, row, column, PxSp3GroupSheet._sheetInfo);
        };
        PxSp3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this._document.CommonRules.StandardCalc(sheetId, row, column, PxSp3GroupSheet._sheetInfo);
        };
        PxSp3GroupSheet.prototype.EditEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this._document.Sheets.getValue(sheetId);
            return (column < PxSp3SheetColumns.StrCode || (column > PxSp3SheetColumns.StrCode && column < 7)) &&
                sheet.Table.GetKeyBySourceTable(this._payTable) != null &&
                this._document.CommonRules.CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
        };
        return PxSp3GroupSheet;
    }());
    PxSp3GroupSheet._totalPostRowInfo = {
        IsCalculated: false,
        Name: "Итого по составу военнослужащих",
        Format: SheetFormatCollection.Default
    };
    PxSp3GroupSheet._subTotalRowInfos = [InterfaceRules.TotalOrgRowInfo, PxSp3GroupSheet._totalPostRowInfo];
    PxSp3GroupSheet._freeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: PxSp3GroupSheet._subTotalRowInfos,
        TotalRow: InterfaceRules.TotalRowInfo
    };
    PxSp3GroupSheet._totalAndsubTotalActRowInfo = {
        IsCalculated: false,
        Name: "X",
        Format: SheetFormatCollection.Default
    };
    PxSp3GroupSheet._freeColActAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: PxSp3GroupSheet._totalAndsubTotalActRowInfo,
        TotalRow: PxSp3GroupSheet._totalAndsubTotalActRowInfo
    };
    PxSp3GroupSheet._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 2,
            Length: 8,
            LevelIncs: [100, 1],
            CalcTotalCode: function () {
                return 90000000;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            PxSp3GroupSheet._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            PxSp3GroupSheet._freeColActAll,
            PxSp3GroupSheet._freeColActAll,
            PxSp3GroupSheet._freeColActAll,
            PxSp3GroupSheet._freeColActAll,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    F01302.PxSp3GroupSheet = PxSp3GroupSheet;
    var P3Sp2GroupSheet = (function (_super) {
        __extends(P3Sp2GroupSheet, _super);
        function P3Sp2GroupSheet(document) {
            return _super.call(this, document) || this;
        }
        Object.defineProperty(P3Sp2GroupSheet.prototype, "SheetInfo", {
            get: function () {
                return P3Sp2GroupSheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp2GroupSheet.prototype.CanEditEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            if (column > P3Sp2GroupSheet._sheetInfo.CodeInfo.Column) {
                return false;
            }
            else {
                return this.Document.CommonRules
                    .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
            }
        };
        return P3Sp2GroupSheet;
    }(HierarchyYearGroupSheet));
    P3Sp2GroupSheet._sprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: InterfaceRules.TotalOrgRowInfo,
        TotalRow: InterfaceRules.TotalRowInfo
    };
    P3Sp2GroupSheet.FreeColConstTotal = {
        Cell: { Type: SheetCellTypes.Spr },
        TotalRow: InterfaceRules.TotalRowInfo,
        SubTotalRow: SheetRowInfoCollection.FreeOnlyFormatRow
    };
    P3Sp2GroupSheet._sheetInfo = {
        MaxLevel: 1,
        CodeInfo: {
            Column: 1,
            Length: 6,
            LevelIncs: [1],
            CalcTotalCode: function () {
                return 900100;
            }
        },
        ColumnsInfo: [
            P3Sp2GroupSheet.FreeColConstTotal,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F01302.P3Sp2GroupSheet = P3Sp2GroupSheet;
})(F01302 || (F01302 = {}));
