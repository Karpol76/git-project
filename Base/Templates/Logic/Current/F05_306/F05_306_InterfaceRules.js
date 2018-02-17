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
var F05306;
(function (F05306) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05306.InterfaceRules = InterfaceRules;
    var P4SheetColumnBlocks;
    (function (P4SheetColumnBlocks) {
        P4SheetColumnBlocks[P4SheetColumnBlocks["Count"] = 0] = "Count";
        P4SheetColumnBlocks[P4SheetColumnBlocks["Costs"] = 1] = "Costs";
        P4SheetColumnBlocks[P4SheetColumnBlocks["Total"] = 2] = "Total";
    })(P4SheetColumnBlocks = F05306.P4SheetColumnBlocks || (F05306.P4SheetColumnBlocks = {}));
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet(id, document, subjectTable, editors, sheetOption) {
            if (sheetOption === void 0) { sheetOption = new SubsidiesSubventions.FSheetOptions(1); }
            return _super.call(this, id, document, sheetOption, subjectTable, editors) || this;
        }
        P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Total)) {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Total)) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            return SheetFormatCollection.Free;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return P4Sheet._totalRowName;
                    case this.RowCodeColumn:
                        return P4Sheet._totalRowCode;
                    default:
                        if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Total)) {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                        else {
                            return ObasHelper.X;
                        }
                }
            }
            else if (column === this.RowCodeColumn) {
                return this.CalcRowCode(row, P4Sheet._rowCodeLength);
            }
            return undefined;
        };
        P4Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, fieldCaption, partFieldCaption) {
            return "\u043D\u0430 " + ObasHelper.CalcYearColumnCaption(index, this.Document.Settings.StartYear) + " \u0433\u043E\u0434\n(\u0433\u0440. " + (3 + index) + " * (\u0433\u0440. " + (2 + index) + " \u0440\u0430\u0437\u0434. 3 + \u0433\u0440. " + (6 + index) + "))";
        };
        return P4Sheet;
    }(SubsidiesSubventions.FSheet));
    P4Sheet._totalRowName = "Итого";
    P4Sheet._totalRowCode = "900";
    P4Sheet._rowCodeLength = P4Sheet._totalRowCode.length;
    F05306.P4Sheet = P4Sheet;
})(F05306 || (F05306 = {}));
