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
var F012XX;
(function (F012XX) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.CalcRowCode = function (row) {
            return ObasHelper.FillWithCharacter((row + 1).toString(), InterfaceRules.RowCodeLength);
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    InterfaceRules.TotalRowCode = "900";
    InterfaceRules.RowCodeLength = 3;
    F012XX.InterfaceRules = InterfaceRules;
    var BaseFSheet = (function (_super) {
        __extends(BaseFSheet, _super);
        function BaseFSheet(id, document, rowCodeColumn, _relRowCount, _totalRowCount) {
            if (_relRowCount === void 0) { _relRowCount = 1; }
            if (_totalRowCount === void 0) { _totalRowCount = _relRowCount; }
            var _this = _super.call(this, id, document, rowCodeColumn, _totalRowCount) || this;
            _this._relRowCount = _relRowCount;
            return _this;
        }
        Object.defineProperty(BaseFSheet.prototype, "RelRowCount", {
            get: function () {
                return this._relRowCount;
            },
            enumerable: true,
            configurable: true
        });
        BaseFSheet.prototype.CalcRelRow = function (row) {
            return row % this._relRowCount;
        };
        BaseFSheet.prototype.CalcStartFooterRow = function (row) {
            return this.RowCount - this.TotalRowCount;
        };
        BaseFSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column > this.RowCodeColumn) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case this.RowCodeColumn:
                    case this.RowNameColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (column < this.RowNameColumn) {
                            return SheetFormatCollection.Related;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        return BaseFSheet;
    }(YearsSheet));
    F012XX.BaseFSheet = BaseFSheet;
    var PXSp2SheetRows;
    (function (PXSp2SheetRows) {
        PXSp2SheetRows[PXSp2SheetRows["Calced"] = 0] = "Calced";
        PXSp2SheetRows[PXSp2SheetRows["ChangeForIndex"] = 1] = "ChangeForIndex";
        PXSp2SheetRows[PXSp2SheetRows["Indexation"] = 2] = "Indexation";
        PXSp2SheetRows[PXSp2SheetRows["Change"] = 3] = "Change";
        PXSp2SheetRows[PXSp2SheetRows["Total"] = 4] = "Total";
    })(PXSp2SheetRows = F012XX.PXSp2SheetRows || (F012XX.PXSp2SheetRows = {}));
    var IndexSheet = (function (_super) {
        __extends(IndexSheet, _super);
        function IndexSheet(id, document, rowCodeColumn) {
            return _super.call(this, id, document, rowCodeColumn, ObasHelper.GetEnumLength(PXSp2SheetRows), 1) || this;
        }
        IndexSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column) && !this.IsFooterRow(row)) {
                var relRow = this.CalcRelRow(row);
                switch (relRow) {
                    case PXSp2SheetRows.Calced:
                        return SheetFormatCollection.Related;
                    case PXSp2SheetRows.ChangeForIndex:
                    case PXSp2SheetRows.Change:
                        return SheetFormatCollection.Free;
                    default:
                        return SheetFormatCollection.Calc;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        IndexSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var relRow = this.CalcRelRow(row);
            return (relRow === PXSp2SheetRows.ChangeForIndex || relRow === PXSp2SheetRows.Change) && !this.IsFooterRow(row);
        };
        return IndexSheet;
    }(BaseFSheet));
    F012XX.IndexSheet = IndexSheet;
    var P4Sp2SheetRows;
    (function (P4Sp2SheetRows) {
        P4Sp2SheetRows[P4Sp2SheetRows["Calced"] = 0] = "Calced";
        P4Sp2SheetRows[P4Sp2SheetRows["Indexation"] = 1] = "Indexation";
        P4Sp2SheetRows[P4Sp2SheetRows["Total"] = 2] = "Total";
    })(P4Sp2SheetRows = F012XX.P4Sp2SheetRows || (F012XX.P4Sp2SheetRows = {}));
    var P4IndexSheet = (function (_super) {
        __extends(P4IndexSheet, _super);
        function P4IndexSheet(id, document, rowCodeColumn, totalRowCount) {
            return _super.call(this, id, document, rowCodeColumn, ObasHelper.GetEnumLength(P4Sp2SheetRows), totalRowCount) || this;
        }
        P4IndexSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column) && !this.IsFooterRow(row)) {
                var relRow = this.CalcRelRow(row);
                switch (relRow) {
                    case P4Sp2SheetRows.Calced:
                        return SheetFormatCollection.Related;
                    default:
                        return SheetFormatCollection.Calc;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P4IndexSheet;
    }(BaseFSheet));
    F012XX.P4IndexSheet = P4IndexSheet;
    var FotInsTotalSheetColumnBlocks;
    (function (FotInsTotalSheetColumnBlocks) {
        FotInsTotalSheetColumnBlocks[FotInsTotalSheetColumnBlocks["Total"] = 0] = "Total";
        FotInsTotalSheetColumnBlocks[FotInsTotalSheetColumnBlocks["Fot"] = 1] = "Fot";
        FotInsTotalSheetColumnBlocks[FotInsTotalSheetColumnBlocks["Insurance"] = 2] = "Insurance";
    })(FotInsTotalSheetColumnBlocks || (FotInsTotalSheetColumnBlocks = {}));
    var FotInsTotalSheet = (function (_super) {
        __extends(FotInsTotalSheet, _super);
        function FotInsTotalSheet(id, document, rowCodeColumn, relRowCount, totalRowCount) {
            return _super.call(this, id, document, rowCodeColumn, relRowCount, totalRowCount) || this;
        }
        FotInsTotalSheet.prototype.IsFotInsTotalColumn = function (column) {
            return this.IsColumnInDataBlock(column, FotInsTotalSheetColumnBlocks.Total);
        };
        FotInsTotalSheet.prototype.IsFotInsDataColumn = function (column) {
            return column > this.CalcEndBlockColumn(FotInsTotalSheetColumnBlocks.Total);
        };
        FotInsTotalSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFotInsTotalColumn(column)) {
                return SheetFormatCollection.Calc;
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        FotInsTotalSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFotInsTotalColumn(column)) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                result.AddCoordinates(new CellCoordinate(row, column + this.YearsCount));
                result.AddCoordinates(new CellCoordinate(row, column + this.YearsCount * 2));
                return result.ToArray();
            }
            return undefined;
        };
        FotInsTotalSheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.Document.CommonRules.CalcColumnCaption(index, this.CalcStartBlockColumn(FotInsTotalSheetColumnBlocks.Fot) + 1, 2);
        };
        return FotInsTotalSheet;
    }(BaseFSheet));
    F012XX.FotInsTotalSheet = FotInsTotalSheet;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P1Sheet.prototype.IsXCell = function (row, column) {
            return this.IsColumnInDataBlock(column, FotInsTotalSheetColumnBlocks.Fot) && row === (this.RowCount - 3);
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsXCell(row, column)) {
                return SheetFormatCollection.Default;
            }
            else if (this.IsFotInsDataColumn(column) && row === (this.RowCount - 2)) {
            	return SheetFormatCollection.Free;
            }
            else if (this.IsFotInsDataColumn(column) && !this.IsFooterRow(row)) {
                return SheetFormatCollection.Related;
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var _this = this;
            if (this.IsXCell(row, column)) {
                return ObasHelper.X;
            }
            else if (this.IsDataColumn(column) && this.IsFooterRow(row)) {
                return this.Document.CommonRules.GetFooterSum(this, row, column, {
                    Filter: function (s, r, c) {
                        return _this.IsXCell(r, c);
                    }
                });
            }
            else {
                return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
            }
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return (this.IsFotInsDataColumn(column) && row === (this.RowCount - 2));
        };
        return P1Sheet;
    }(FotInsTotalSheet));
    F012XX.P1Sheet = P1Sheet;
    var PXSp1SheetRows;
    (function (PXSp1SheetRows) {
        PXSp1SheetRows[PXSp1SheetRows["Calced"] = 0] = "Calced";
        PXSp1SheetRows[PXSp1SheetRows["Change"] = 1] = "Change";
        PXSp1SheetRows[PXSp1SheetRows["Correction"] = 2] = "Correction";
        PXSp1SheetRows[PXSp1SheetRows["Total"] = 3] = "Total";
    })(PXSp1SheetRows = F012XX.PXSp1SheetRows || (F012XX.PXSp1SheetRows = {}));
    var PXSp1Sheet = (function (_super) {
        __extends(PXSp1Sheet, _super);
        function PXSp1Sheet(id, document, rowCodeColumn, _isEditCorrection, totalRowCount) {
            var _this = _super.call(this, id, document, rowCodeColumn, ObasHelper.GetEnumLength(PXSp1SheetRows), totalRowCount) || this;
            _this._isEditCorrection = _isEditCorrection;
            return _this;
        }
        PXSp1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.IsFooterRow(row) && this.IsFotInsDataColumn(column)) {
                var relRow = this.CalcRelRow(row);
                switch (relRow) {
                    case PXSp1SheetRows.Calced:
                        return SheetFormatCollection.Related;
                    case PXSp1SheetRows.Change:
                        return SheetFormatCollection.Free;
                    case PXSp1SheetRows.Correction:
                        return this._isEditCorrection ? SheetFormatCollection.Free : SheetFormatCollection.Calc;
                    default:
                        return SheetFormatCollection.Calc;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        PXSp1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var relRow = this.CalcRelRow(row);
            return this.IsFotInsDataColumn(column) &&
                (relRow === PXSp1SheetRows.Change || (relRow === PXSp1SheetRows.Correction && this._isEditCorrection)) &&
                !this.IsFooterRow(row);
        };
        return PXSp1Sheet;
    }(FotInsTotalSheet));
    F012XX.PXSp1Sheet = PXSp1Sheet;
})(F012XX || (F012XX = {}));
