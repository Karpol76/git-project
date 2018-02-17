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
var F06300;
(function (F06300) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Всего";
    InterfaceRules.TotalRowCode = 90100;
    InterfaceRules.CodeLength = 1;
    F06300.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column < 2) {
                if (this._document.CommonRules.IsFooterRow(this, row)) {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                if (this._document.CommonRules.IsFooterRow(this, row)) {
                    return SheetFormatCollection.Calc;
                }
                else if (row === this.RowCount - 2) {
                    return SheetFormatCollection.Free;
                }
                else {
                    return SheetFormatCollection.Related;
                }
            }
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return ((column > 1) && (row === this.RowCount - 2));
        };
        return P1Sheet;
    }(Sheet));
    F06300.P1Sheet = P1Sheet;
    var P2GroupSheet = (function (_super) {
        __extends(P2GroupSheet, _super);
        function P2GroupSheet(_document) {
            return _super.call(this, _document) || this;
        }
        P2GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.CodeLength);
            }
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 18:
                        return InterfaceRules.TotalRowName;
                    case 20:
                        return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            return undefined;
        };
        P2GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 20:
                        return SheetFormatCollection.Calc;
                    default:
                        return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case 0:
                    case 2:
                    case 3:
                        return SheetFormatCollection.Related;
                    case 1:
                    case 4:
                        return SheetFormatCollection.Spr;
                    case 7:
                    case 8:
                    case 20:
                        return SheetFormatCollection.Calc;
                    case 19:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
        };
        return P2GroupSheet;
    }(YearGroupSheet));
    F06300.P2GroupSheet = P2GroupSheet;
    var P3GroupSheet = (function (_super) {
        __extends(P3GroupSheet, _super);
        function P3GroupSheet(_document) {
            return _super.call(this, _document) || this;
        }
        P3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.CodeLength);
            }
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                        return InterfaceRules.TotalRowName;
                    default:
                        if (column > 1) {
                            return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                        }
                }
            }
            return undefined;
        };
        P3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                    case 1:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Calc;
                }
            }
            else {
                switch (column) {
                    case 2:
                    case 3:
                        return SheetFormatCollection.Calc;
                    case 1:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
        };
        return P3GroupSheet;
    }(YearGroupSheet));
    F06300.P3GroupSheet = P3GroupSheet;
})(F06300 || (F06300 = {}));
