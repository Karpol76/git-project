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
var F05210;
(function (F05210) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05210.InterfaceRules = InterfaceRules;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document) {
            return _super.call(this, document) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                    return SheetFormatCollection.Related;
                case 4:
                    return SheetFormatCollection.Calc;
                default:
                    return SheetFormatCollection.Free;
            }
        };
        P2Sheet.prototype.CreateCaptionEventHandler = function (sheetId, oldText) {
            var sheetYear = this.GetSheetYear(sheetId);
            oldText = _super.prototype.CreateCaptionEventHandler.call(this, sheetId, oldText);
            oldText = oldText.replace(P2Sheet.TextSign, (sheetYear === this.Document.Settings.StartYear ? "Расчет общего объема субсидий" : "Расчет общего объема межбюджетных трансфертов"));
            return oldText;
        };
        return P2Sheet;
    }(YearGroupSheet));
    P2Sheet.TextSign = "#Text";
    F05210.P2Sheet = P2Sheet;
})(F05210 || (F05210 = {}));
