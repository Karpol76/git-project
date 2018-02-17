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
var F01409;
(function (F01409) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                case 1:
                    return SheetFormatCollection.Default;
                default:
                    var rowCount = this.Document.Sheets.getValue(sheetId).RowCount;
                    if (this.Document.CommonRules.IsFooterRow(sheetId, row) && column > 1) {
                        return SheetFormatCollection.Calc;
                    }
                    else if (row === 0 || row === 2 || row === rowCount - 6) {
                        return SheetFormatCollection.Calc;
                    }
                    else if (row === 1) {
                        return SheetFormatCollection.Free;
                    }
                    else {
                        return SheetFormatCollection.Related;
                    }
            }
        };
        InterfaceRules.prototype.SheetP1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return ((column > 1) && (row === 1));
        };
        InterfaceRules.prototype.IsFooterRow = function (sheetId, row) {
            return this.Document.CommonRules.IsFooterRow(sheetId, row, 3);
        };
        InterfaceRules.prototype.SheetP3DailyPayFormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(sheetId, row)) {
                if ((column < 5) || column === 9 || column === 10) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                return this.Document.CommonRules
                    .StandardFormat(sheetId, row, column, InterfaceRules._sheetP3DailyPayInfo);
            }
        };
        InterfaceRules.prototype.SheetP3DailyPayTotalRowCalcPayFilter = function (sheet, row, column, document) {
            return sheet.GetCellValue(row, BaseObasTableFields.StrKeyField.Id, false) !==
                F01409.StrKeysP3DailyPay.DailyPay;
        };
        InterfaceRules.prototype.SheetP3DailyPayTotalRowCalcSurchFilter = function (sheet, row, column, document) {
            return sheet.GetCellValue(row, BaseObasTableFields.StrKeyField.Id, false) !==
                F01409.StrKeysP3DailyPay.Surcharges;
        };
        InterfaceRules.prototype.SheetP3DailyPayCalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(sheetId, row)) {
                if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                    return ObasHelper.FillWithCharacter(row + 1, InterfaceRules._kosguCodeLength);
                }
                else if (column > 1) {
                    if (column === 3 || column === 4 || column === 9 || column === 10) {
                        return ObasHelper.X;
                    }
                    else {
                        var sheet = this.Document.Sheets.getValue(sheetId);
                        var lastRow = sheet.RowCount - 1;
                        switch (row) {
                            case lastRow:
                                var result = new SheetCalcResult(BaseFormulas.SUM);
                                result.AddCoordinates(new CellCoordinate(row - 1, column));
                                result.AddCoordinates(new CellCoordinate(row - 2, column));
                                return result.ToArray();
                            case lastRow - 1:
                                return this.Document.CommonRules.GetFooterSum(sheet, row, column, {
                                    EndRow: lastRow - 2,
                                    Filter: this.SheetP3DailyPayTotalRowCalcSurchFilter
                                });
                            case lastRow - 2:
                                return this.Document.CommonRules.GetFooterSum(sheet, row, column, {
                                    EndRow: lastRow - 2,
                                    Filter: this.SheetP3DailyPayTotalRowCalcPayFilter
                                });
                        }
                    }
                }
            }
            else {
                return this.Document.CommonRules
                    .StandardCalc(sheetId, row, column, InterfaceRules._sheetP3DailyPayInfo);
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP3DailyPayEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            if (column === 1) {
                return false;
            }
            else if (column > 1) {
                var table = this.Document.P3DailyPayDataTable;
                var key = this.Document.Sheets.getValue(sheetId).Table.GetKeyBySourceTable(table);
                return key != null;
            }
            return true;
        };
        InterfaceRules.prototype.P2Sp7SheetCalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 1) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return InterfaceRules;
    }(F01400.InterfaceRules));
    F01409.InterfaceRules = InterfaceRules;
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === this.RowCodeColumn && this.IsFooterRow(row)) {
                return "900100";
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return P4Sheet;
    }(OnlyInsuranceSheet));
    F01409.P4Sheet = P4Sheet;
})(F01409 || (F01409 = {}));
