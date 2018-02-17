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
var F08700;
(function (F08700) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.GetStrCode = function (row, countChar) {
            if (countChar === void 0) { countChar = 3; }
            return ObasHelper.FillWithCharacter(row + 1, countChar);
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowCaption = "Итого";
    InterfaceRules.TotalRowCode = "900";
    F08700.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(sheetId, document) {
            return _super.call(this, sheetId, document, 1) || this;
        }
        P1Sheet.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column)) {
                if (this.IsFooterRow(row)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Related;
                }
            }
            else {
                return SheetFormatCollection.Default;
            }
        };
        return P1Sheet;
    }(YearsSheet));
    F08700.P1Sheet = P1Sheet;
    var P2Sp1Sheet = (function (_super) {
        __extends(P2Sp1Sheet, _super);
        function P2Sp1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P2Sp1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return InterfaceRules.TotalRowCaption;
                    case this.RowCodeColumn:
                        return InterfaceRules.TotalRowCode;
                    default:
                        return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            else if (this.RowCodeColumn === column) {
                return InterfaceRules.GetStrCode(row);
            }
            return undefined;
        };
        P2Sp1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooter = this.IsFooterRow(row);
            if (this.IsDataColumn(column)) {
                if (isFooter) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
            else {
                if (this.RowNameColumn === column && !isFooter) {
                    return SheetFormatCollection.Free;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
        };
        return P2Sp1Sheet;
    }(YearsSheet));
    F08700.P2Sp1Sheet = P2Sp1Sheet;
    var UsdSheetColumnBlocks;
    (function (UsdSheetColumnBlocks) {
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["Usd"] = 0] = "Usd";
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["Total"] = 1] = "Total";
    })(UsdSheetColumnBlocks = F08700.UsdSheetColumnBlocks || (F08700.UsdSheetColumnBlocks = {}));
    var P2Sp2Sheet = (function (_super) {
        __extends(P2Sp2Sheet, _super);
        function P2Sp2Sheet(id, document) {
            return _super.call(this, id, document, 2) || this;
        }
        P2Sp2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                if (this.IsFooterRow(row)) {
                    return InterfaceRules.TotalRowCode;
                }
                else
                    return InterfaceRules.GetStrCode(row);
            }
            if (this.IsFooterRow(row)) {
                if (column === 0) {
                    return InterfaceRules.TotalRowCaption;
                }
                else if (this.IsDataColumn(column)) {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
                else {
                    return ObasHelper.X;
                }
            }
            return undefined;
        };
        P2Sp2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === P2Sp2Sheet._sheetStrCodeCols) {
                return SheetFormatCollection.Default;
            }
            var isFooterRow = this.IsFooterRow(row);
            if (isFooterRow) {
                if (this.IsDataColumn(column)) {
                    return SheetFormatCollection.Calc;
                }
                return SheetFormatCollection.Default;
            }
            else {
                if (P2Sp2Sheet._sheetSprCols === column) {
                    return SheetFormatCollection.Spr;
                }
                if (column >= this.CalcStartBlockColumn(UsdSheetColumnBlocks.Total)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        return P2Sp2Sheet;
    }(YearsSheet));
    P2Sp2Sheet._sheetSprCols = 2;
    P2Sp2Sheet._sheetStrCodeCols = 1;
    F08700.P2Sp2Sheet = P2Sp2Sheet;
})(F08700 || (F08700 = {}));
