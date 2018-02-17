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
var F01500;
(function (F01500) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._totalRowName = "Всего";
    InterfaceRules.CodeInfo = {
        Column: 1,
        Length: 1,
        LevelIncs: [1],
        CalcTotalCode: function (sheet, row, column) {
            return row + 1;
        }
    };
    InterfaceRules.TotalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalRowName,
        Format: SheetFormatCollection.Default
    };
    F01500.InterfaceRules = InterfaceRules;

    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            _this._totalRowName = "\u0412\u0441\u0435\u0433\u043E";
            _this._correctionRowName = "\u041A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u043A\u0430 \u0432 \u0441\u0432\u044F\u0437\u0438 \u0441 \u043E\u043A\u0440\u0443\u0433\u043B\u0435\u043D\u0438\u0435\u043C";
            _this._totalRowCode = "900";
            _this._rowCodeLength = 1;
            return _this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === 0) {
                if (this._document.CommonRules.IsFooterRow(this, row)) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Related;
                }
            }
            else if (column === 1) {
                return SheetFormatCollection.Calc;
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
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 0) {
                if (this._document.CommonRules.IsFooterRow(this, row)) {
                    return this._totalRowName;
                }
                else if (row === this.RowCount - 2) {
                    return this._correctionRowName;
                }
            }
            else if (column === 1) {
                if (this._document.CommonRules.IsFooterRow(this, row)) {
                    return this._totalRowCode;
                }
                else if (row != this.RowCount - 2) {
                    return ObasHelper.FillWithCharacter((row + 1).toString(), this._rowCodeLength);
                }
            }
            else if ((column > 1) && (this._document.CommonRules.IsFooterRow(this, row))) {
                return this._document.CommonRules.GetFooterSum(this, row, column);
            }
            return undefined;
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return ((column > 1) && (row === this.RowCount - 2));
        };
        return P1Sheet;
    }(Sheet));
    F01500.P1Sheet = P1Sheet;

    var P2GroupSheet = (function (_super) {
        __extends(P2GroupSheet, _super);
        function P2GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2GroupSheet.prototype, "SheetInfo", {
            get: function () {
                return P2GroupSheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        P2GroupSheet.prototype.CanEditEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return column > P2GroupSheet._sheetInfo.CodeInfo.Column &&
                this.Document.CommonRules.CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
        };
        return P2GroupSheet;
    }(HierarchyYearGroupSheet));
    P2GroupSheet._sprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: SheetRowInfoCollection.SprOnlyFormatRow,
        TotalRow: InterfaceRules.TotalRowInfo
    };
    P2GroupSheet._sheetInfo = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.CodeInfo,
        ColumnsInfo: [
            P2GroupSheet._sprColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F01500.P2GroupSheet = P2GroupSheet;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P3Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 1) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return P3Sheet;
    }(Sheet));
    F01500.P3Sheet = P3Sheet;
})(F01500 || (F01500 = {}));
