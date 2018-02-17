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
var F08822;
(function (F08822) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F08822.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.IsDataColumn = function (column) {
            return column > P1Sheet._rowCodeColumn;
        };
        P1Sheet.prototype.IsFooterRow = function (row) {
            return this._document.CommonRules.IsFooterRow(this, row);
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column)) {
                if (this.IsFooterRow(row)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
            return SheetFormatCollection.Default;
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsDataColumn(column) && this.IsFooterRow(row)) {
                return this._document.CommonRules.GetFooterSum(this, row, column);
            }
            return undefined;
        };
        return P1Sheet;
    }(Sheet));
    P1Sheet._rowCodeColumn = 1;
    F08822.P1Sheet = P1Sheet;
})(F08822 || (F08822 = {}));
