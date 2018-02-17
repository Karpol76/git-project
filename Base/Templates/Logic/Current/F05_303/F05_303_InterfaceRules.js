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
var F05303;
(function (F05303) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    InterfaceRules.TotalRowCode = "900";
    InterfaceRules.RowCodeLength = 3;
    F05303.InterfaceRules = InterfaceRules;
    var P2SheetSheetColumnBlocks;
    (function (P2SheetSheetColumnBlocks) {
        P2SheetSheetColumnBlocks[P2SheetSheetColumnBlocks["Calc"] = 0] = "Calc";
        P2SheetSheetColumnBlocks[P2SheetSheetColumnBlocks["Total"] = 1] = "Total";
    })(P2SheetSheetColumnBlocks || (P2SheetSheetColumnBlocks = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document, rowCodeColumn) {
            if (rowCodeColumn === void 0) { rowCodeColumn = 1; }
            return _super.call(this, id, document, rowCodeColumn, 2) || this;
        }
        P2Sheet.prototype.IsCalcBlockColumn = function (column) {
            return this.IsColumnInDataBlock(column, P2SheetSheetColumnBlocks.Calc);
        };
        P2Sheet.prototype.IsTotalBlockColumn = function (column) {
            return this.IsColumnInDataBlock(column, P2SheetSheetColumnBlocks.Total);
        };
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsDataColumn(column)) {
                    if (this.IsCalcBlockColumn(column)) {
                        if (this.IsTotalRow(row)) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            return SheetFormatCollection.Default;
                        }
                    }
                    else if (this.IsTotalBlockColumn(column)) {
                        if (this.IsTotalRow(row)) {
                            return SheetFormatCollection.Free;
                        }
                        else {
                            return SheetFormatCollection.Calc;
                        }
                    }
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Related;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsCalcBlockColumn(column)) {
                            return SheetFormatCollection.Related;
                        }
                        else if (this.IsTotalBlockColumn(column)) {
                            return SheetFormatCollection.Calc;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        P2Sheet.prototype.CalcTotalSubvensionFormula = function (totalSubvSum, calcSubvSum, calcSubv) {
            if (totalSubvSum < calcSubvSum) {
                if (calcSubvSum === 0) {
                    return 0;
                }
                else {
                    return totalSubvSum * calcSubv / calcSubvSum;
                }
            }
            else {
                return calcSubv;
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            var rowCount = this.RowCount;
            if (column === this.RowCodeColumn && !isFooter) {
                return this.CalcRowCode(row, InterfaceRules.RowCodeLength);
            }
            else if (!isFooter && this.IsTotalBlockColumn(column)) {
                var totalRow = rowCount - SubsidiesSubventions.SheetTotalRows.Total;
                var prevBlockColumn = column - this.YearsCount;
                var result = new SheetCalcResult("%Doc%.SheetP2.CalcTotalSubvensionFormula");
                result.AddCoordinates(new CellCoordinate(totalRow, column));
                result.AddCoordinates(new CellCoordinate(totalRow, prevBlockColumn));
                result.AddCoordinates(new CellCoordinate(row, prevBlockColumn));
                return result.ToArray();
            }
            else if (isFooter && row > 0) {
                if (this.IsDataColumn(column)) {
                    if (this.IsCalcBlockColumn(column)) {
                        switch (row) {
                            case rowCount - SubsidiesSubventions.SheetTotalRows.Total:
                                var option = {
                                    EndRow: rowCount - SubsidiesSubventions.SheetTotalRows.UndistributedReserve
                                };
                                return this.Document.CommonRules.GetFooterSum(this, row, column);
                            case rowCount - SubsidiesSubventions.SheetTotalRows.UndistributedReserve:
                                return ObasHelper.X;
                        }
                    }
                    else if (this.IsTotalBlockColumn(column)) {
                        switch (row) {
                            case rowCount - SubsidiesSubventions.SheetTotalRows.UndistributedReserve:
                                var result = new SheetCalcResult(BaseFormulas.SUB);
                                result.AddCoordinates(new CellCoordinate(row + 1, column));
                                switch (this.TotalRowCount) {
                                    case 2:
                                        for (var i = 0; i < row; i++) {
                                            result.AddCoordinates(new CellCoordinate(i, column));
                                        }
                                        return result.ToArray();
                                    case 3:
                                        result.AddCoordinates(new CellCoordinate(row - 1, column));
                                        return result.ToArray();
                                }
                        }
                    }
                }
            }
            return undefined;
        };
        P2Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.IsDataColumn(column) && (!this.IsFooterRow(row) || this.IsTotalRow(row));
        };
        return P2Sheet;
    }(YearsSheetTyped));
    F05303.P2Sheet = P2Sheet;
    var P4GroupSheet = (function (_super) {
        __extends(P4GroupSheet, _super);
        function P4GroupSheet(document, _sheetOptions) {
            var _this = _super.call(this, document) || this;
            _this._sheetOptions = _sheetOptions;
            _this._yearsSheets = new collections.Dictionary();
            return _this;
        }
        P4GroupSheet.prototype.GetSheet = function (sheetId) {
            var result = this._yearsSheets.getValue(sheetId);
            if (result == null) {
                result = new SubsidiesSubventions.P2Sheet(sheetId, this.Document, this._sheetOptions);
                this._yearsSheets.setValue(sheetId, result);
            }
            return result;
        };
        P4GroupSheet.prototype.IsLastColumn = function (sheetId, column) {
            return (column === (this.GetSheet(sheetId).ColumnCount - 1));
        };
        P4GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var sheet = this.GetSheet(sheetId);
            if (this.IsLastColumn(sheetId, column)) {
                return SheetFormatCollection.Calc;
            }
            else {
                var sheet_1 = this.GetSheet(sheetId);
                var isFooter = sheet_1.IsFooterRow(row);
                if (isFooter) {
                    if (column === P4Columns.CountCol) {
                        return SheetFormatCollection.Calc;
                    }
                    return SheetFormatCollection.Default;
                }
                else {
                    switch (column) {
                        case P4Columns.NameCol:
                            return SheetFormatCollection.Spr;
                        case P4Columns.CodeCol:
                            return SheetFormatCollection.Default;
                        default:
                            return SheetFormatCollection.Free;
                    }
                }
            }
        };
        P4GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.GetSheet(sheetId);
            var isFooter = sheet.IsFooterRow(row);
            if (isFooter) {
                switch (column) {
                    case P4Columns.LastCol:
                    case P4Columns.CountCol:
                        return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                    case P4Columns.NameCol:
                        return InterfaceRules.TotalRowName;
                    case P4Columns.CodeCol:
                        return InterfaceRules.TotalRowCode;
                    default:
                        return ObasHelper.X;
                }
            }
            else {
                if (column === sheet.RowCodeColumn) {
                    return sheet.CalcRowCode(row, InterfaceRules.RowCodeLength);
                }
            }
        };
        return P4GroupSheet;
    }(YearGroupSheet));
    F05303.P4GroupSheet = P4GroupSheet;
    var P4Columns;
    (function (P4Columns) {
        P4Columns[P4Columns["NameCol"] = 0] = "NameCol";
        P4Columns[P4Columns["CodeCol"] = 1] = "CodeCol";
        P4Columns[P4Columns["CountCol"] = 2] = "CountCol";
        P4Columns[P4Columns["PrintCostsCol"] = 3] = "PrintCostsCol";
        P4Columns[P4Columns["SheetsCountCol"] = 4] = "SheetsCountCol";
        P4Columns[P4Columns["LastCol"] = 5] = "LastCol";
    })(P4Columns || (P4Columns = {}));
})(F05303 || (F05303 = {}));
