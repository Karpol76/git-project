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
var F01285;
(function (F01285) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Всего";
    InterfaceRules.TotalRowCode = 90100;
    InterfaceRules.TotalRowCodeLength = 5;
    F01285.InterfaceRules = InterfaceRules;
    var SheetP1 = (function (_super) {
        __extends(SheetP1, _super);
        function SheetP1(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        SheetP1.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column > SheetP1._rowCodeColumn) {
                switch (row) {
                    case 0:
                    case 1:
                        return SheetFormatCollection.Related;
                    case 3:
                        return SheetFormatCollection.Free;
                    default:
                        return SheetFormatCollection.Calc;
                }
            }
            return SheetFormatCollection.Default;
        };
        SheetP1.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return ((column > SheetP1._rowCodeColumn) && (row === 3));
        };
        return SheetP1;
    }(Sheet));
    SheetP1._rowCodeColumn = 1;
    F01285.SheetP1 = SheetP1;
    var SheetP3ColumnBlocks;
    (function (SheetP3ColumnBlocks) {
        SheetP3ColumnBlocks[SheetP3ColumnBlocks["Usd"] = 0] = "Usd";
        SheetP3ColumnBlocks[SheetP3ColumnBlocks["Rub"] = 1] = "Rub";
    })(SheetP3ColumnBlocks || (SheetP3ColumnBlocks = {}));
    var SheetP3 = (function (_super) {
        __extends(SheetP3, _super);
        function SheetP3(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        SheetP3.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsDataColumn(column)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                if (column < this.RowCodeColumn) {
                    return SheetFormatCollection.Related;
                }
                else if (column === this.RowCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else if (this.IsColumnInDataBlock(column, SheetP3ColumnBlocks.Rub)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        SheetP3.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return InterfaceRules.TotalRowName;
                    case this.RowCodeColumn:
                        return InterfaceRules.TotalRowCode;
                    default:
                        if (this.IsDataColumn(column)) {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                }
            }
            else if (column === this.RowCodeColumn) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.TotalRowCodeLength);
            }
            return undefined;
        };
        return SheetP3;
    }(YearsSheet));
    F01285.SheetP3 = SheetP3;
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
        P2GroupSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            if (column > P2GroupSheet._codeInfo.Column) {
                return false;
            }
            else {
                return this.Document.CommonRules
                    .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
            }
        };
        return P2GroupSheet;
    }(HierarchyYearGroupSheet));
    P2GroupSheet._codeInfo = {
        Column: 1,
        Length: InterfaceRules.TotalRowCodeLength,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return InterfaceRules.TotalRowCode;
        }
    };
    P2GroupSheet._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules.TotalRowName,
        Format: SheetFormatCollection.Default
    };
    P2GroupSheet._freeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: P2GroupSheet._totalRowInfo,
        TotalRow: P2GroupSheet._totalRowInfo
    };
    P2GroupSheet._sheetInfo = {
        MaxLevel: 1,
        CodeInfo: P2GroupSheet._codeInfo,
        ColumnsInfo: [
            P2GroupSheet._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F01285.P2GroupSheet = P2GroupSheet;
    var P5Sheet = (function (_super) {
        __extends(P5Sheet, _super);
        function P5Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P5Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 1) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return P5Sheet;
    }(Sheet));
    F01285.P5Sheet = P5Sheet;
})(F01285 || (F01285 = {}));
