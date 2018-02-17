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
var F02200;
(function (F02200) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                    return SheetFormatCollection.Default;
                default:
                    return SheetFormatCollection.Related;
            }
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    F02200.InterfaceRules = InterfaceRules;
    var P2TotalSheetRows;
    (function (P2TotalSheetRows) {
        P2TotalSheetRows[P2TotalSheetRows["DisabilityTotal"] = 2] = "DisabilityTotal";
        P2TotalSheetRows[P2TotalSheetRows["Disability1Year"] = 10] = "Disability1Year";
        P2TotalSheetRows[P2TotalSheetRows["Total"] = 0] = "Total";
    })(P2TotalSheetRows || (P2TotalSheetRows = {}));
    var P2SheetColumnBlocks;
    (function (P2SheetColumnBlocks) {
        P2SheetColumnBlocks[P2SheetColumnBlocks["Count"] = 0] = "Count";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Pay"] = 1] = "Pay";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Total"] = 2] = "Total";
    })(P2SheetColumnBlocks || (P2SheetColumnBlocks = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document) {
            var _this = _super.call(this, id, document, 1) || this;
            _this._countColBlockCount = P2Sheet.AddYearsCount + _this.YearsCount + 1;
            _this._endCountColumn = _this.RowCodeColumn + _this._countColBlockCount;
            _this._endPayColumn = _this._endCountColumn + _this.YearsCount;
            return _this;
        }
        P2Sheet.prototype.IsCalcRow = function (row) {
            return (P2TotalSheetRows[row] != null);
        };
        P2Sheet.prototype.IsInsurCountCol = function (column) {
            return column > this.RowCodeColumn && column <= this._endCountColumn;
        };
        P2Sheet.prototype.IsInsurPayCol = function (column) {
            return column > this._endCountColumn && column <= this._endPayColumn;
        };
        P2Sheet.prototype.IsTotalCol = function (column) {
            return column > this._endPayColumn;
        };
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column < (this.RowCodeColumn + 1)) {
                return SheetFormatCollection.Default;
            }
            else if (this.IsFooterRow(row)) {
                if (this.IsTotalCol(column)) {
                    return SheetFormatCollection.Free;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                if (this.IsTotalCol(column)) {
                    return SheetFormatCollection.Calc;
                }
                else if (this.IsCalcRow(row)) {
                    if (this.IsInsurPayCol(column)) {
                        return SheetFormatCollection.Default;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsDataColumn(column)) {
                if (this.IsFooterRow(row)) {
                    if (!this.IsTotalCol(column)) {
                        return ObasHelper.X;
                    }
                }
                else if (this.IsCalcRow(row)) {
                    if (this.IsInsurPayCol(column)) {
                        return ObasHelper.X;
                    }
                    else {
                        var result = new SheetCalcResult(BaseFormulas.SUM);
                        switch (row) {
                            case P2TotalSheetRows.DisabilityTotal:
                            case P2TotalSheetRows.Disability1Year:
                                for (var i = 1; i <= 3; i++) {
                                    result.AddCoordinates(new CellCoordinate(row + i, column));
                                }
                                break;
                            default:
                                for (var i = 0; i < P2Sheet._totalRowParts.length; i++) {
                                    result.AddCoordinates(new CellCoordinate(P2Sheet._totalRowParts[i], column));
                                }
                                break;
                        }
                        return result.ToArray();
                    }
                }
            }
            return undefined;
        };
        P2Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var canEdit = this.IsDataColumn(column);
            if (canEdit) {
                if (this.IsTotalCol(column)) {
                    canEdit = this.IsFooterRow(row);
                }
                else {
                    canEdit = !this.IsCalcRow(row);
                }
            }
            return canEdit;
        };
        P2Sheet.prototype.GetTotalYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            var year = ObasStageSettings.CurrentYear + index;
            return "\u043D\u0430 " + year + " \u0433\u043E\u0434\n(\u0433\u0440 " + (this.RowCodeColumn + P2Sheet.AddYearsCount + index + 2) + " * \u0433\u0440 " + (this._endCountColumn + index + 2) + ")";
        };
        P2Sheet.prototype.GetInsCountYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            var year = ObasStageSettings.CurrentYear + index + P2Sheet.AddYearsCount * -1;
            return "\u043D\u0430 " + year + " \u0433\u043E\u0434";
        };
        P2Sheet.prototype.GetInsCountYearsFieldRangeEventHandler = function (sheetId) {
            if (sheetId === void 0) { sheetId = ""; }
            var result = [];
            for (var i = 1, len = this._countColBlockCount; i <= len; i++) {
                var index = i - P2Sheet.AddYearsCount;
                if (i < P2Sheet.AddYearsCount) {
                    result.push("P" + Math.abs(index));
                }
                else {
                    result.push(index);
                }
            }
            return result;
        };
        P2Sheet.prototype.EditCellEventHandler = function (sheetId, row, column, fieldId, rowLevel, oldValue, newValue) {
            var message = null;
            if (this.IsFooterRow(row) && this.IsTotalCol(column)) {
                var totalValue = ObasHelper.ConvertToNumber(this.GetCellValue(P2TotalSheetRows.Total, column));
                if (newValue > totalValue * 0.06) {
                    message = "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 6% \u043E\u0442 \u0432\u0435\u043B\u0438\u0447\u0438\u043D\u044B \u0441\u0442\u0440\u043E\u043A\u0438 \u0418\u0442\u043E\u0433\u043E \u043F\u043E " + (ObasStageSettings.CurrentYear + ObasHelper.GetYearOffsetById(fieldId)) + " \u0433\u043E\u0434\u0443";
                }
            }
            if (message) {
                Client.ShowMessage("Ошибка", message, MessageIcons.Error);
                return false;
            }
            else {
                return true;
            }
        };
        return P2Sheet;
    }(YearsSheet));
    P2Sheet._totalRowParts = [1, 2, 6, 7, 8, 9, 10];
    P2Sheet.AddYearsCount = 3;
    F02200.P2Sheet = P2Sheet;
})(F02200 || (F02200 = {}));
