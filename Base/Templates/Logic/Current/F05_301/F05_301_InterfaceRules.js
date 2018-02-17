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
var F05301;
(function (F05301) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    InterfaceRules.RowCodeLength = 3;
    F05301.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === this.RowNameColumn) {
                return SheetFormatCollection.Default;
            }
            else {
                return SheetFormatCollection.Calc;
            }
        };
        return P1Sheet;
    }(YearsSheet));
    F05301.P1Sheet = P1Sheet;
    var P2SheetTotalRows;
    (function (P2SheetTotalRows) {
        P2SheetTotalRows[P2SheetTotalRows["DistributedVolume"] = 3] = "DistributedVolume";
        P2SheetTotalRows[P2SheetTotalRows["UndistributedReserve"] = 2] = "UndistributedReserve";
        P2SheetTotalRows[P2SheetTotalRows["Total"] = 1] = "Total";
    })(P2SheetTotalRows = F05301.P2SheetTotalRows || (F05301.P2SheetTotalRows = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document) {
            return _super.call(this, id, document, 1, ObasHelper.GetEnumLength(P2SheetTotalRows)) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column <= this.RowCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                if (column === this.RowCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Related;
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            var rowCount = this.RowCount;
            if (isFooter) {
                if (this.IsDataColumn(column)) {
                    switch (row) {
                        case rowCount - P2SheetTotalRows.DistributedVolume:
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        case rowCount - P2SheetTotalRows.UndistributedReserve:
                            var result = new SheetCalcResult(BaseFormulas.SUB);
                            result.AddCoordinates(new CellCoordinate(row + 1, column));
                            result.AddCoordinates(new CellCoordinate(row - 1, column));
                            return result.ToArray();
                        default:
                            return undefined;
                    }
                }
            }
            else {
                if (column === this.RowCodeColumn) {
                    return ObasHelper.FillWithCharacter((row + 1), InterfaceRules.RowCodeLength);
                }
            }
        };
        return P2Sheet;
    }(YearsSheetTyped));
    F05301.P2Sheet = P2Sheet;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === this.RowNameColumn) {
                return SheetFormatCollection.Default;
            }
            else {
                return SheetFormatCollection.Free;
            }
        };
        return P3Sheet;
    }(YearsSheet));
    F05301.P3Sheet = P3Sheet;
    var YearBlocks;
    (function (YearBlocks) {
        YearBlocks[YearBlocks["Quantity"] = 0] = "Quantity";
        YearBlocks[YearBlocks["Total"] = 1] = "Total";
    })(YearBlocks = F05301.YearBlocks || (F05301.YearBlocks = {}));
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet(id, document, indicatorSheet) {
            var _this = _super.call(this, id, document, 1) || this;
            _this._indicatorSheet = indicatorSheet;
            return _this;
        }
        P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsDataColumn(column)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (column >= this.CalcStartBlockColumn(YearBlocks.Total)) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            return SheetFormatCollection.Free;
                        }
                }
                ;
            }
        };
        P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter) {
                switch (column) {
                    case this.RowNameColumn:
                        return InterfaceRules.TotalRowName;
                    case this.RowCodeColumn:
                        return "900";
                    default:
                        if (this.IsDataColumn(column)) {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                }
            }
            else {
                if (column === this.RowCodeColumn) {
                    return ObasHelper.FillWithCharacter((row + 1), InterfaceRules.RowCodeLength);
                }
            }
        };
        P4Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            var colIndexR3 = this._indicatorSheet.StartDataColumn + index;
            var colIndexR4 = this.StartDataColumn + index + 1;
            return "\u043D\u0430 " + ObasHelper.CalcYearColumnCaption(index, this.Document.Settings.StartYear) + " \u0433\u043E\u0434\n\n(\u0433\u0440. " + colIndexR4 + " * \u0433\u0440. " + colIndexR3 + " \u0440\u0430\u0437\u0434. 3 * 12 \u043C\u0435\u0441)";
        };
        return P4Sheet;
    }(YearsSheetTyped));
    F05301.P4Sheet = P4Sheet;
})(F05301 || (F05301 = {}));
