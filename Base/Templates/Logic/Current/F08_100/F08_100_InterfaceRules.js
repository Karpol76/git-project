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
var F08100;
(function (F08100) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    InterfaceRules.TotalRowCode = 90100;
    InterfaceRules.RowCodeLength = 5;
    F08100.InterfaceRules = InterfaceRules;
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
    F08100.P1Sheet = P1Sheet;
    var P2GroupSheet = (function () {
        function P2GroupSheet(_document) {
            this._document = _document;
        }
        P2GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.RowCodeLength);
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                        return InterfaceRules.TotalRowName;
                    case 10:
                    case 11:
                        return this._document.CommonRules.GetFooterSum(sheetId, row, column);
                }
                if (column > 0 && column < 9) {
                    return ObasHelper.X;
                }
            }
            return undefined;
        };
        P2GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 9:
                    return SheetFormatCollection.Default;
                case 10:
                case 11:
                    return SheetFormatCollection.Calc;
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                return SheetFormatCollection.Default;
            }
            else {
                switch (column) {
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                        return SheetFormatCollection.Spr;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
        };
        return P2GroupSheet;
    }());
    F08100.P2GroupSheet = P2GroupSheet;
    var P3GroupSheet = (function () {
        function P3GroupSheet(_document) {
            this._document = _document;
        }
        P3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.RowCodeLength);
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                        return InterfaceRules.TotalRowName;
                    case 6:
                    case 7:
                        return this._document.CommonRules.GetFooterSum(sheetId, row, column);
                    default:
                        return ObasHelper.X;
                }
            }
            return undefined;
        };
        P3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 6:
                case 7:
                    return SheetFormatCollection.Calc;
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                return SheetFormatCollection.Default;
            }
            else {
                switch (column) {
                    case 0:
                    case 1:
                        return SheetFormatCollection.Spr;
                    case 2:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
        };
        return P3GroupSheet;
    }());
    F08100.P3GroupSheet = P3GroupSheet;
    var P4GroupSheet = (function () {
        function P4GroupSheet(_document) {
            this._document = _document;
        }
        P4GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.RowCodeLength);
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 1:
                        return InterfaceRules.TotalRowName;
                    case 9:
                        return this._document.CommonRules.GetFooterSum(sheetId, row, column);
                    default:
                        return ObasHelper.X;
                }
            }
            return undefined;
        };
        P4GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooterRow = this._document.CommonRules.IsFooterRow(sheetId, row);
            switch (column) {
                case 0:
                    return isFooterRow ? SheetFormatCollection.Default : SheetFormatCollection.Related;
                case 2:
                    return SheetFormatCollection.Default;
                case 9:
                    return SheetFormatCollection.Calc;
            }
            if (isFooterRow) {
                return SheetFormatCollection.Default;
            }
            else {
                return SheetFormatCollection.Free;
            }
        };
        P4GroupSheet.prototype.CantEditPrevCurYearsEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this._document.CommonRules.GetSheetFromParam(sheetId);
            var isSheetKeyNotNull = sheet.Table.GetFieldValue("_f08_100_r4_key_") != null;
            return (isSheetKeyNotNull && this._document.CommonRules
                .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel));
        };
        return P4GroupSheet;
    }());
    F08100.P4GroupSheet = P4GroupSheet;
    var P5Sheet = (function (_super) {
        __extends(P5Sheet, _super);
        function P5Sheet(id, _document, readOnly) {
            if (readOnly === void 0) { readOnly = false; }
            var _this = _super.call(this, id, readOnly) || this;
            _this._document = _document;
            return _this;
        }
        P5Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.RowCodeLength);
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                        return InterfaceRules.TotalRowName;
                    case 1:
                        return ObasHelper.X;
                    default:
                        return this._document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            return undefined;
        };
        P5Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 2:
                    return SheetFormatCollection.Default;
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column > 2) {
                    return SheetFormatCollection.Calc;
                }
                return SheetFormatCollection.Default;
            }
            else {
                return SheetFormatCollection.Free;
            }
        };
        return P5Sheet;
    }(Sheet));
    F08100.P5Sheet = P5Sheet;
})(F08100 || (F08100 = {}));
