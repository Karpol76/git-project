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
var F08910;
(function (F08910) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F08910.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        Object.defineProperty(P1Sheet.prototype, "StartDataColumn", {
            get: function () {
                return this.RowCodeColumn + P1Sheet._shiftSprColumn;
            },
            enumerable: true,
            configurable: true
        });
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column < this.StartDataColumn) {
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
                else if (column === this.RowCodeColumn + 1) {
                    return SheetFormatCollection.Spr;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === this.RowCodeColumn) {
                return ObasHelper.FillWithCharacter(row + 1, P1Sheet._strCodeLength);
            }
            if (this.IsFooterRow(row)) {
                if (column === this.RowNameColumn) {
                    return P1Sheet._strTotalName;
                }
                if ((column > this.RowCodeColumn) && (column < this.StartDataColumn)) {
                    return ObasHelper.X;
                }
            }
            return undefined;
        };
        return P1Sheet;
    }(YearsSheet));
    P1Sheet._strTotalCode = "900";
    P1Sheet._strCodeLength = P1Sheet._strTotalCode.length;
    P1Sheet._strTotalName = "Итого";
    P1Sheet._shiftSprColumn = 3;
    F08910.P1Sheet = P1Sheet;
})(F08910 || (F08910 = {}));
