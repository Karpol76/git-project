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
var F04300;
(function (F04300) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F04300.InterfaceRules = InterfaceRules;
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
                if (column > P1Sheet._rowCodeColumn) {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                switch (column) {
                    case 3:
                        return SheetFormatCollection.Spr;
                    case P1Sheet._rowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
            return SheetFormatCollection.Default;
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case P1Sheet._rowNameColumn:
                        return P1Sheet._totalRowName;
                    case P1Sheet._rowCodeColumn:
                        return P1Sheet._totalRowCode;
                    default:
                        if (column > P1Sheet._rowCodeColumn) {
                            return this._document.CommonRules.GetFooterSum(sheetId, row, column);
                        }
                }
            }
            else {
                if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                    return ObasHelper.FillWithCharacter(row + 1, P1Sheet._rowCodeLength);
                }
            }
            return undefined;
        };
        return P1Sheet;
    }(Sheet));
    P1Sheet._rowCodeColumn = 5;
    P1Sheet._rowNameColumn = P1Sheet._rowCodeColumn - 1;
    P1Sheet._totalRowCode = "9000";
    P1Sheet._totalRowName = "Всего";
    P1Sheet._rowCodeLength = P1Sheet._totalRowCode.length;
    F04300.P1Sheet = P1Sheet;
})(F04300 || (F04300 = {}));
