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
var F06200;
(function (F06200) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Всего";
    InterfaceRules.TotalRowCode = 90100;
    InterfaceRules.CodeLength = 3;
    F06200.InterfaceRules = InterfaceRules;
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
    F06200.P1Sheet = P1Sheet;
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet(id, _document, readOnly) {
            if (readOnly === void 0) { readOnly = false; }
            var _this = _super.call(this, id, readOnly) || this;
            _this._document = _document;
            return _this;
        }
        P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                    case 1:
                    case 2:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Calc;
                }
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
        P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.CodeLength);
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 1:
                        return InterfaceRules.TotalRowName;
                    default:
                        if (column > 2) {
                            return this._document.CommonRules.GetFooterSum(sheetId, row, column);
                        }
                }
            }
            return undefined;
        };
        return P4Sheet;
    }(Sheet));
    F06200.P4Sheet = P4Sheet;
    var P2GroupSheet = (function () {
        function P2GroupSheet(_document) {
            this._document = _document;
        }
        P2GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.CodeLength);
            }
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 1:
                        return InterfaceRules.TotalRowName;
                    case 5:
                        return ObasHelper.X;
                    case 4:
                    case 6:
                        return this._document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            return undefined;
        };
        P2GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this._document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 4:
                    case 6:
                        return SheetFormatCollection.Calc;
                    default:
                        return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case 0:
                        return SheetFormatCollection.Related;
                    case 1:
                        return SheetFormatCollection.Spr;
                    case 3:
                        return SheetFormatCollection.Default;
                    case 6:
                        return SheetFormatCollection.Calc;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
        };
        return P2GroupSheet;
    }());
    F06200.P2GroupSheet = P2GroupSheet;
    var P3GroupSheet = (function () {
        function P3GroupSheet(_document) {
            this._document = _document;
        }
        P3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this._document.CommonRules.StandardFormat(sheetId, row, column, P3GroupSheet._sheetP3Info);
        };
        P3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this._document.CommonRules.StandardCalc(sheetId, row, column, P3GroupSheet._sheetP3Info);
        };
        return P3GroupSheet;
    }());
    P3GroupSheet._sheetP3CodeInfo = {
        Column: 3,
        Length: InterfaceRules.CodeLength,
        LevelIncs: [1, 1],
        CalcTotalCode: function (sheet, row) {
            return row + 1;
        }
    };
    P3GroupSheet._totalRowInfo = {
        IsCalculated: false,
        Name: ObasHelper.X,
        Format: SheetFormatCollection.Default
    };
    P3GroupSheet._subTotalRowInfo = {
        IsCalculated: false,
        Name: "Итого",
        Format: SheetFormatCollection.Default
    };
    P3GroupSheet._freeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: P3GroupSheet._subTotalRowInfo,
        TotalRow: P3GroupSheet._totalRowInfo
    };
    P3GroupSheet._sheetP3Info = {
        MaxLevel: 2,
        CodeInfo: P3GroupSheet._sheetP3CodeInfo,
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            SheetColumnInfoCollection.SprColDefaultTotal,
            P3GroupSheet._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllX,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F06200.P3GroupSheet = P3GroupSheet;
})(F06200 || (F06200 = {}));
