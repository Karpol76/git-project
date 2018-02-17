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
var F08500;
(function (F08500) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F08500.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.IsFooterRow = function (row) {
            return this._document.CommonRules.IsFooterRow(this, row);
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column <= P1Sheet._strCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                if (column === P1Sheet._strCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                if (column === P1Sheet._strCodeColumn - 1) {
                    return P1Sheet._strTotalName;
                }
                else if (column > P1Sheet._strCodeColumn) {
                    return this._document.CommonRules.GetFooterSum(this, row, column);
                }
            }
            else if (column === P1Sheet._strCodeColumn) {
                return ObasHelper.FillWithCharacter(row + 1, P1Sheet._strCodeLength);
            }
            return undefined;
        };
        return P1Sheet;
    }(Sheet));
    P1Sheet._strCodeColumn = 1;
    P1Sheet._strTotalCode = "900";
    P1Sheet._strCodeLength = P1Sheet._strTotalCode.length;
    P1Sheet._strTotalName = "Итого";
    F08500.P1Sheet = P1Sheet;
})(F08500 || (F08500 = {}));
