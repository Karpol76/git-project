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
var F05401;
(function (F05401) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05401.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column)) {
                return SheetFormatCollection.Related;
            }
            else {
                return SheetFormatCollection.Default;
            }
        };
        return P1Sheet;
    }(YearsSheet));
    F05401.P1Sheet = P1Sheet;
    var P2Sp2Sheet = (function (_super) {
        __extends(P2Sp2Sheet, _super);
        function P2Sp2Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P2Sp2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooterRow = this.IsFooterRow(row);
            switch (column) {
                case this.RowNameColumn:
                    return isFooterRow ? SheetFormatCollection.Default : SheetFormatCollection.Related;
                case this.RowCodeColumn:
                    return SheetFormatCollection.Default;
                default:
                    return isFooterRow ? SheetFormatCollection.Calc : SheetFormatCollection.Free;
            }
        };
        P2Sp2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return P2Sp2Sheet._totalRowName;
                    case this.RowCodeColumn:
                        return P2Sp2Sheet._totalRowCode;
                    default:
                        return this.Document.CommonRules.GetFooterSum(this, row, column);
                }
            }
            else if (column === this.RowCodeColumn) {
                return this.CalcRowCode(row, P2Sp2Sheet._rowCodeLength);
            }
            return undefined;
        };
        return P2Sp2Sheet;
    }(YearsSheet));
    P2Sp2Sheet._totalRowName = "Итого";
    P2Sp2Sheet._totalRowCode = "900";
    P2Sp2Sheet._rowCodeLength = P2Sp2Sheet._totalRowCode.length;
    F05401.P2Sp2Sheet = P2Sp2Sheet;
})(F05401 || (F05401 = {}));
