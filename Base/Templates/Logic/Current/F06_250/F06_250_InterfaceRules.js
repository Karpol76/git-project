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
var F06250;
(function (F06250) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    F06250.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === this.RowNameColumn) {
                return SheetFormatCollection.Default;
            }
            return SheetFormatCollection.Related;
        };
        return P1Sheet;
    }(YearsSheet));
    F06250.P1Sheet = P1Sheet;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document) {
            return _super.call(this, id, document, 2) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
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
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (column === this.RowCodeColumn && !isFooter) {
                return ObasHelper.FillWithCharacter((row + 1), 3);
            }
            else if (isFooter) {
                switch (column) {
                    case this.RowNameColumn:
                        return InterfaceRules.TotalRowName;
                    case this.RowCodeColumn:
                        return "900";
                }
            }
            return undefined;
        };
        return P2Sheet;
    }(YearsSheetTyped));
    F06250.P2Sheet = P2Sheet;
})(F06250 || (F06250 = {}));
