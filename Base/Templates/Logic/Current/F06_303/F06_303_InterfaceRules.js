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
var F06303;
(function (F06303) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F06303.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Calc;
                }
            }
            else {
                if (column === this.RowCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                if (this.IsDataColumn(column)) {
                    return this.Document.CommonRules.GetFooterSum(this, row, column);
                }
            }
            else if (column === this.RowCodeColumn) {
                return ObasHelper.FillWithCharacter(row + 1, 3);
            }
            return undefined;
        };
        return P1Sheet;
    }(YearsSheetTyped));
    F06303.P1Sheet = P1Sheet;
    var NpaSheet = (function (_super) {
        __extends(NpaSheet, _super);
        function NpaSheet(id) {
            return _super.call(this, id, false) || this;
        }
        NpaSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                    return SheetFormatCollection.Related;
                case 1:
                    return SheetFormatCollection.Default;
                case 2:
                    return SheetFormatCollection.Spr;
                default:
                    return SheetFormatCollection.Free;
            }
        };
        NpaSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, 3);
            }
            return undefined;
        };
        return NpaSheet;
    }(Sheet));
    F06303.NpaSheet = NpaSheet;
})(F06303 || (F06303 = {}));
