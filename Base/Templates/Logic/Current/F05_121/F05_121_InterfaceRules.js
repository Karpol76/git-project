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
var F05121;
(function (F05121) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column > 0) {
                return SheetFormatCollection.Related;
            }
            else {
                return SheetFormatCollection.Default;
            }
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05121.InterfaceRules = InterfaceRules;
    var P2GroupSheet = (function (_super) {
        __extends(P2GroupSheet, _super);
        function P2GroupSheet(_docuent) {
            var _this = _super.call(this, _docuent) || this;
            _this._docuent = _docuent;
            return _this;
        }
        P2GroupSheet.prototype.GetYearStr = function (year) {
            var activeYear = this.Document.Settings.ActiveYear;
            switch (year) {
                case activeYear:
                    return "текущий финансовый год";
                case activeYear + 1:
                    return "очередной финансовый год";
                case activeYear + 2:
                    return "первый год планового периода";
                case activeYear + 3:
                    return "второй год планового периода";
            }
        };
        P2GroupSheet.prototype.CreateCaptionEventHandler = function (sheetId, oldText) {
            var sheetYear = this.GetSheetYear(sheetId);
            oldText = _super.prototype.CreateCaptionEventHandler.call(this, sheetId, oldText);
            oldText = oldText.replace(P2GroupSheet._yearStrConst, "\u043D\u0430 " + this.GetYearStr(sheetYear));
            return oldText;
        };
        P2GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 3:
                    return SheetFormatCollection.Calc;
                case 2:
                case 1:
                    return SheetFormatCollection.Free;
                default:
                    return SheetFormatCollection.Default;
            }
        };
        return P2GroupSheet;
    }(YearGroupSheet));
    P2GroupSheet._yearStrConst = "#YearStr";
    F05121.P2GroupSheet = P2GroupSheet;
})(F05121 || (F05121 = {}));
