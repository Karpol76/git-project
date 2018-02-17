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
var F08920;
(function (F08920) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row) && column > 1) {
                return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            if (column > 1) {
                if (row === lastRow - 1) {
                    return SheetFormatCollection.Free;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            return SheetFormatCollection.Default;
        };
        InterfaceRules.prototype.SheetP1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            return ((column > 1) && (row === lastRow - 1));
        };
        InterfaceRules.prototype.SheetPXCanAddEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var colCount = this.Document.Sheets.getValue(sheetId).ColumnCount;
            return column < colCount - 4;
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowCaption = "Итого";
    InterfaceRules.TotalRowCode = "900";
    InterfaceRules._sheetRaCalcRows = [1, 2, 8, 13, 14, 20, 25];
    F08920.InterfaceRules = InterfaceRules;
    var RubSheetColumnBlocks;
    (function (RubSheetColumnBlocks) {
        RubSheetColumnBlocks[RubSheetColumnBlocks["Debt"] = 0] = "Debt";
        RubSheetColumnBlocks[RubSheetColumnBlocks["Total"] = 1] = "Total";
    })(RubSheetColumnBlocks = F08920.RubSheetColumnBlocks || (F08920.RubSheetColumnBlocks = {}));
    var UsdSheetColumnBlocks;
    (function (UsdSheetColumnBlocks) {
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["Debt"] = 0] = "Debt";
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["Cash"] = 1] = "Cash";
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["Total"] = 2] = "Total";
    })(UsdSheetColumnBlocks = F08920.UsdSheetColumnBlocks || (F08920.UsdSheetColumnBlocks = {}));
    var PxSheet = (function (_super) {
        __extends(PxSheet, _super);
        function PxSheet(id, document, codeColumnNumber, _totalBlock) {
            var _this = _super.call(this, id, document, codeColumnNumber) || this;
            _this._totalBlock = _totalBlock;
            _this._sheetSprCols = [2, 4];
            _this._sheetStrCodeCols = 1;
            return _this;
        }
        PxSheet.prototype.GetStrCode = function (row) {
            return ObasHelper.FillWithCharacter(row + 1, 3);
        };
        PxSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                    return InterfaceRules.TotalRowCode;
                }
                else
                    return this.GetStrCode(row);
            }
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column === 0) {
                    return InterfaceRules.TotalRowCaption;
                }
                else if (this.IsColumnInDataBlocks(column)) {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
                else {
                    return ObasHelper.X;
                }
            }
            return undefined;
        };
        return PxSheet;
    }(YearsSheet));
    F08920.PxSheet = PxSheet;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document) {
            return _super.call(this, id, document, 4, RubSheetColumnBlocks.Total) || this;
        }
        P2Sheet.prototype.IsColumnInDataBlocks = function (column) {
            return this.IsColumnInDataBlock(column, RubSheetColumnBlocks.Debt) ||
                this.IsColumnInDataBlock(column, RubSheetColumnBlocks.Total);
        };
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column == this._sheetStrCodeCols) {
                return SheetFormatCollection.Default;
            }
            var isFooterRow = this.Document.CommonRules.IsFooterRow(sheetId, row);
            if (isFooterRow) {
                if (this.IsColumnInDataBlocks(column) || column === this.CalcEndBlockColumn(this._totalBlock)) {
                    return SheetFormatCollection.Calc;
                }
                return SheetFormatCollection.Default;
            }
            else {
                if (this._sheetSprCols.indexOf(column) > -1) {
                    return SheetFormatCollection.Spr;
                }
                if (column > this.CalcEndBlockColumn(this._totalBlock)) {
                    return SheetFormatCollection.Spr;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        return P2Sheet;
    }(PxSheet));
    F08920.P2Sheet = P2Sheet;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(id, document) {
            var _this = _super.call(this, id, document, 5, UsdSheetColumnBlocks.Total) || this;
            _this._sheetSprCols.push(5);
            return _this;
        }
        P3Sheet.prototype.IsColumnInDataBlocks = function (column) {
            return this.IsColumnInDataBlock(column, UsdSheetColumnBlocks.Debt) ||
                this.IsColumnInDataBlock(column, UsdSheetColumnBlocks.Cash) ||
                this.IsColumnInDataBlock(column, UsdSheetColumnBlocks.Total);
        };
        P3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column == this._sheetStrCodeCols) {
                return SheetFormatCollection.Default;
            }
            var isFooterRow = this.Document.CommonRules.IsFooterRow(sheetId, row);
            if (isFooterRow) {
                if (this.IsColumnInDataBlocks(column) ||
                   (column >= this.CalcStartBlockColumn(this._totalBlock) &&
                   (column <= this.CalcEndBlockColumn(this._totalBlock)))) {
                    return SheetFormatCollection.Calc;
                }
                return SheetFormatCollection.Default;
            }
            else {
                if (this._sheetSprCols.indexOf(column) > -1) {
                    return SheetFormatCollection.Spr;
                }
                if (column > this.CalcEndBlockColumn(this._totalBlock)) {
                    return SheetFormatCollection.Spr;
                }
                else if (column >= this.CalcStartBlockColumn(this._totalBlock)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        return P3Sheet;
    }(PxSheet));
    F08920.P3Sheet = P3Sheet;
})(F08920 || (F08920 = {}));
