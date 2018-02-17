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
var F09100;
(function (F09100) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.GetStrCode = function (row) {
            return ObasHelper.FillWithCharacter(row + 1, 4, "0");
        };
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isLastRow = this.Document.CommonRules.IsFooterRow(sheetId, row);
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            if (!isLastRow && column > 1) {
                if (row === lastRow - 1)
                    return SheetFormatCollection.Free;
                else
                    return SheetFormatCollection.Related;
            }
            else if ((isLastRow && column > 1) || (column === 1))
                return SheetFormatCollection.Calc;
            return SheetFormatCollection.Default;
        };
        InterfaceRules.prototype.SheetP1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            return ((column > 1) && (row === lastRow - 1));
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Всего";
    F09100.InterfaceRules = InterfaceRules;
    var SheetColumnBlocks;
    (function (SheetColumnBlocks) {
        SheetColumnBlocks[SheetColumnBlocks["Total"] = 0] = "Total";
    })(SheetColumnBlocks = F09100.SheetColumnBlocks || (F09100.SheetColumnBlocks = {}));
    var P2Sp1Sheet = (function (_super) {
        __extends(P2Sp1Sheet, _super);
        function P2Sp1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P2Sp1Sheet.prototype.GetFormat = function (sheetId, row, column, groupIndex) {
            var isLastRow = this.Document.CommonRules.IsFooterRow(sheetId, row);
            if ((column === 0 ||
                column > this.CalcEndBlockColumn(SheetColumnBlocks.Total))
                && !isLastRow)
                return SheetFormatCollection.Spr;
            else if ((isLastRow &&
                this.IsColumnInDataBlock(column, SheetColumnBlocks.Total))
                || (column === this.RowCodeColumn))
                return SheetFormatCollection.Calc;
            else if (!isLastRow)
                return SheetFormatCollection.Free;
            return SheetFormatCollection.Default;
        };
        P2Sp1Sheet.prototype.GetCalc = function (sheetId, row, column, fieldId) {
            if (column === this.RowCodeColumn) {
                return InterfaceRules.GetStrCode(row);
            }
            else if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column === 0)
                    return InterfaceRules.TotalRowName;
                else if (this.IsColumnInDataBlock(column, SheetColumnBlocks.Total))
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                else if (!this.IsColumnInDataBlock(column, SheetColumnBlocks.Total))
                    return ObasHelper.X;
            }
            return undefined;
        };
        return P2Sp1Sheet;
    }(YearsSheet));
    F09100.P2Sp1Sheet = P2Sp1Sheet;
    var P2Sp2Sheet = (function (_super) {
        __extends(P2Sp2Sheet, _super);
        function P2Sp2Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P2Sp2Sheet.prototype.GetFormat = function (sheetId, row, column, groupIndex) {
            var isLastRow = this.Document.CommonRules.IsFooterRow(sheetId, row);
            if ((isLastRow &&
                this.IsColumnInDataBlock(column, SheetColumnBlocks.Total))
                || (column === this.RowCodeColumn))
                return SheetFormatCollection.Calc;
            else if (!isLastRow)
                return SheetFormatCollection.Free;
            return SheetFormatCollection.Default;
        };
        P2Sp2Sheet.prototype.GetCalc = function (sheetId, row, column, fieldId) {
            if (fieldId === BaseObasTableFields.StrCodeField.Id) {
                return ObasHelper.FillWithCharacter(row + 1, 2);
            }
            else if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column === 0)
                    return InterfaceRules.TotalRowName;
                else if (this.IsColumnInDataBlock(column, SheetColumnBlocks.Total))
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                else if (!this.IsColumnInDataBlock(column, SheetColumnBlocks.Total))
                    return ObasHelper.X;
            }
            return undefined;
        };
        return P2Sp2Sheet;
    }(YearsSheet));
    F09100.P2Sp2Sheet = P2Sp2Sheet;
})(F09100 || (F09100 = {}));
