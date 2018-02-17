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
var F08821;
(function (F08821) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F08821.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.IsDataColumn = function (column) {
            return column > 1;
        };
        P1Sheet.prototype.IsFooterRow = function (row) {
            return this._document.CommonRules.IsFooterRow(this, row);
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column)) {
                var rowCount = this.RowCount;
                switch (row) {
                    case rowCount - 1:
                        return SheetFormatCollection.Calc;
                    case rowCount - 3:
                        return SheetFormatCollection.Related;
                    default:
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
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return (this.IsDataColumn(column) && (row < (this.RowCount - 3) || row === (this.RowCount - 2)));
        };
        return P1Sheet;
    }(Sheet));
    F08821.P1Sheet = P1Sheet;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        Object.defineProperty(P2Sheet.prototype, "YearsCount", {
            get: function () {
                return this._document.Settings.YearsCount;
            },
            enumerable: true,
            configurable: true
        });
        P2Sheet.prototype.CalcOffsetCol = function (column) {
            return column - (P2Sheet._rowCodeColumn + 1);
        };
        P2Sheet.prototype.IsDataColumn = function (column) {
            return this.CalcOffsetCol(column) >= 0;
        };
        P2Sheet.prototype.IsUsdDataColumn = function (column) {
            var calcOffset = this.CalcOffsetCol(column);
            return calcOffset < this.YearsCount && calcOffset >= 0;
        };
        P2Sheet.prototype.IsRubDataColumn = function (column) {
            return this.CalcOffsetCol(column) >= this.YearsCount;
        };
        P2Sheet.prototype.IsFooterRow = function (row) {
            return this._document.CommonRules.IsFooterRow(this, row);
        };
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
                    case P2Sheet._countryColumn:
                        return SheetFormatCollection.Spr;
                    case P2Sheet._payNameColumn:
                        return SheetFormatCollection.Free;
                    case P2Sheet._rowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsUsdDataColumn(column)) {
                            return SheetFormatCollection.Free;
                        }
                        else {
                            return SheetFormatCollection.Calc;
                        }
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === P2Sheet._rowCodeColumn) {
                return ObasHelper.FillWithCharacter(row + 1, P2Sheet._rowCodeLength);
            }
            else if (this.IsFooterRow(row)) {
                if (column === P2Sheet._payNameColumn) {
                    return P2Sheet._totalRowName;
                }
                else if (this.IsDataColumn(column)) {
                    return this._document.CommonRules.GetFooterSum(this, row, column);
                }
            }
            return undefined;
        };
        return P2Sheet;
    }(Sheet));
    P2Sheet._rowCodeColumn = 2;
    P2Sheet._payNameColumn = P2Sheet._rowCodeColumn - 1;
    P2Sheet._countryColumn = P2Sheet._payNameColumn - 1;
    P2Sheet._rowCodeLength = 3;
    P2Sheet._totalRowName = "Всего";
    F08821.P2Sheet = P2Sheet;
})(F08821 || (F08821 = {}));
