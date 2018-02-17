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
var F01211;
(function (F01211) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(F012XX.InterfaceRules));
    F01211.InterfaceRules = InterfaceRules;
    var PXSp1Sheet = (function (_super) {
        __extends(PXSp1Sheet, _super);
        function PXSp1Sheet(id, document, isCalcCorrection) {
            return _super.call(this, id, document, 1, isCalcCorrection, 1) || this;
        }
        PXSp1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsDataColumn(column) && this.IsFooterRow(row)) {
                return this.Document.CommonRules.GetFooterSum(this, row, column);
            }
            else {
                return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
            }
        };
        return PXSp1Sheet;
    }(F012XX.PXSp1Sheet));
    F01211.PXSp1Sheet = PXSp1Sheet;
    var PartWithTotalGroupSheet = (function (_super) {
        __extends(PartWithTotalGroupSheet, _super);
        function PartWithTotalGroupSheet(document, _rowCodeColumn) {
            var _this = _super.call(this, document) || this;
            _this._rowCodeColumn = _rowCodeColumn;
            _this._rowNameColumn = _rowCodeColumn - 1;
            return _this;
        }
        Object.defineProperty(PartWithTotalGroupSheet.prototype, "RowCodeColumn", {
            get: function () {
                return this._rowCodeColumn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartWithTotalGroupSheet.prototype, "RowNameColumn", {
            get: function () {
                return this._rowNameColumn;
            },
            enumerable: true,
            configurable: true
        });
        PartWithTotalGroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column < this._rowNameColumn) {
                    return undefined;
                }
                else if (column === this._rowNameColumn) {
                    return InterfaceRules.TotalRowName;
                }
                else if (column === this._rowCodeColumn) {
                    return InterfaceRules.TotalRowCode;
                }
                else if (this.IsXCell(sheetId, row, column)) {
                    return ObasHelper.X;
                }
                else {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            else if (column === this._rowCodeColumn) {
                return InterfaceRules.CalcRowCode(row);
            }
            return undefined;
        };
        PartWithTotalGroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if ((column <= this._rowCodeColumn) || (this.IsXCell(sheetId, row, column))) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            return SheetFormatCollection.Default;
        };
        PartWithTotalGroupSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            if (column > this._rowCodeColumn) {
                return false;
            }
            else {
                return this.Document.CommonRules
                    .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
            }
        };
        return PartWithTotalGroupSheet;
    }(YearGroupSheet));
    F01211.PartWithTotalGroupSheet = PartWithTotalGroupSheet;
    var P2Sp3GroupSheet = (function (_super) {
        __extends(P2Sp3GroupSheet, _super);
        function P2Sp3GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sp3GroupSheet.prototype.IsXCell = function (sheetId, row, column) {
            return column > 2;
        };
        P2Sp3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    case 5:
                        return SheetFormatCollection.Calc;
                    case 2:
                    case 3:
                        return SheetFormatCollection.Free;
                    default:
                        return SheetFormatCollection.Related;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P2Sp3GroupSheet;
    }(PartWithTotalGroupSheet));
    F01211.P2Sp3GroupSheet = P2Sp3GroupSheet;
    var P2Sp4GroupSheet = (function (_super) {
        __extends(P2Sp4GroupSheet, _super);
        function P2Sp4GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sp4GroupSheet.prototype.IsXCell = function (sheetId, row, column) {
            return false;
        };
        P2Sp4GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Related;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Calc;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P2Sp4GroupSheet;
    }(PartWithTotalGroupSheet));
    F01211.P2Sp4GroupSheet = P2Sp4GroupSheet;
    
    var P2Sp6GroupSheet = (function (_super) {
        __extends(P2Sp6GroupSheet, _super);
        function P2Sp6GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sp6GroupSheet.prototype.IsXCell = function (sheetId, row, column) {
            return column > 1 && column < 6;
        };
        P2Sp6GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return SheetFormatCollection.Spr;
                    case 6:
                        return SheetFormatCollection.Free;
                    default:
                        return SheetFormatCollection.Related;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P2Sp6GroupSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            if ((column > 5) || (column === this.RowCodeColumn)) {
                return false;
            }
            else {
                return this.Document.CommonRules
                    .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
            }
        };
        return P2Sp6GroupSheet;
    }(PartWithTotalGroupSheet));
    F01211.P2Sp6GroupSheet = P2Sp6GroupSheet;

    var P5Sp3GroupSheet = (function (_super) {
        __extends(P5Sp3GroupSheet, _super);
        function P5Sp3GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P5Sp3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 5 && !this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                for (var i = 1; i < 7; i++) {
                    result.AddCoordinates(new CellCoordinate(row, column + i));
                }
                return result.ToArray();
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return P5Sp3GroupSheet;
    }(P2Sp3GroupSheet));
    F01211.P5Sp3GroupSheet = P5Sp3GroupSheet;
    var P5Sp4GroupSheet = (function (_super) {
        __extends(P5Sp4GroupSheet, _super);
        function P5Sp4GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P5Sp4GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            if (!this.Document.CommonRules.IsFooterRow(sheet, row)) {
                switch (column) {
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    case 2:
                    case 3:
                    case sheet.ColumnCount - 1:
                        return SheetFormatCollection.Calc;
                    default:
                        return SheetFormatCollection.Related;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P5Sp4GroupSheet;
    }(P2Sp4GroupSheet));
    F01211.P5Sp4GroupSheet = P5Sp4GroupSheet;
    var P3Sp3GroupSheet = (function (_super) {
        __extends(P3Sp3GroupSheet, _super);
        function P3Sp3GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P3Sp3GroupSheet.prototype.IsXCell = function (sheetId, row, column) {
            return column > 5;
        };
        P3Sp3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if ((column === 8 || column === 14) && !this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                var count = column === 8 ? 5 : 2;
                for (var i = 1; i <= count; i++) {
                    result.AddCoordinates(new CellCoordinate(row, column + i));
                }
                return result.ToArray();
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        P3Sp3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    case 8:
                    case 14:
                        return SheetFormatCollection.Calc;
                    case 4:
                    case 5:
                    case 6:
                        return SheetFormatCollection.Free;
                    default:
                        return SheetFormatCollection.Related;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P3Sp3GroupSheet;
    }(PartWithTotalGroupSheet));
    
    var P5Sp6r2Sheet = (function (_super) {
        __extends(P5Sp6r2Sheet, _super);
        function P5Sp6r2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P5Sp6r2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 1) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return P5Sp6r2Sheet;
    }(Sheet));
    F01211.P5Sp6r2Sheet = P5Sp6r2Sheet;
    
    F01211.P3Sp3GroupSheet = P3Sp3GroupSheet;
    var P3Sp4GroupSheet = (function (_super) {
        __extends(P3Sp4GroupSheet, _super);
        function P3Sp4GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P3Sp4GroupSheet.prototype.IsXCell = function (sheetId, row, column) {
            return false;
        };
        P3Sp4GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    case 4:
                    case 5:
                    case 11:
                    case 14:
                        return SheetFormatCollection.Calc;
                    default:
                        return SheetFormatCollection.Related;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P3Sp4GroupSheet;
    }(PartWithTotalGroupSheet));
    F01211.P3Sp4GroupSheet = P3Sp4GroupSheet;

    var P3Sp5GroupSheet = (function (_super) {
        __extends(P3Sp5GroupSheet, _super);
        function P3Sp5GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P3Sp5GroupSheet.prototype.IsXCell = function (sheetId, row, column) {
            return column > 1 && column < 6;
        };
        P3Sp5GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return SheetFormatCollection.Spr;
                    case 6:
                        return SheetFormatCollection.Free;
                    default:
                        return SheetFormatCollection.Related;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P3Sp5GroupSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            if ((column > 5) || (column === this.RowCodeColumn)) {
                return false;
            }
            else {
                return this.Document.CommonRules
                    .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
            }
        };
        return P3Sp5GroupSheet;
    }(PartWithTotalGroupSheet));
    F01211.P3Sp5GroupSheet = P3Sp5GroupSheet;

    var P4Sp3GroupSheet = (function (_super) {
        __extends(P4Sp3GroupSheet, _super);
        function P4Sp3GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4Sp3GroupSheet.prototype.IsXCell = function (sheetId, row, column) {
            return column > 3 && column < 9;
        };
        P4Sp3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            if (!this.Document.CommonRules.IsFooterRow(sheet, row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    case 4:
                    case sheet.ColumnCount - 1:
                        return SheetFormatCollection.Calc;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P4Sp3GroupSheet;
    }(PartWithTotalGroupSheet));
    F01211.P4Sp3GroupSheet = P4Sp3GroupSheet;
})(F01211 || (F01211 = {}));
