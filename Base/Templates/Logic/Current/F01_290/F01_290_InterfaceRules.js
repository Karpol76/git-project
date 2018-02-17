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
var F01290;
(function (F01290) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F01290.InterfaceRules = InterfaceRules;
    var P1SheetDataBlocks;
    (function (P1SheetDataBlocks) {
        P1SheetDataBlocks[P1SheetDataBlocks["Sums"] = 0] = "Sums";
        P1SheetDataBlocks[P1SheetDataBlocks["Months"] = 1] = "Months";
    })(P1SheetDataBlocks = F01290.P1SheetDataBlocks || (F01290.P1SheetDataBlocks = {}));
    var P1SheetRows;
    (function (P1SheetRows) {
        P1SheetRows[P1SheetRows["FundTotal"] = 0] = "FundTotal";
        P1SheetRows[P1SheetRows["FundWage"] = 1] = "FundWage";
        P1SheetRows[P1SheetRows["FundInsurance"] = 2] = "FundInsurance";
        P1SheetRows[P1SheetRows["ChangesTotal"] = 3] = "ChangesTotal";
        P1SheetRows[P1SheetRows["ChangesWage"] = 4] = "ChangesWage";
        P1SheetRows[P1SheetRows["ChangesInsurance"] = 5] = "ChangesInsurance";
        P1SheetRows[P1SheetRows["CorrectionTotal"] = 6] = "CorrectionTotal";
        P1SheetRows[P1SheetRows["CorrectionWage"] = 7] = "CorrectionWage";
        P1SheetRows[P1SheetRows["CorrectionInsurance"] = 8] = "CorrectionInsurance";
        P1SheetRows[P1SheetRows["Total"] = 9] = "Total";
        P1SheetRows[P1SheetRows["TotalWage"] = 10] = "TotalWage";
        P1SheetRows[P1SheetRows["TotalInsurance"] = 11] = "TotalInsurance";
        P1SheetRows[P1SheetRows["RoundingCorrection"] = 12] = "RoundingCorrection";
    })(P1SheetRows || (P1SheetRows = {}));
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P1Sheet.prototype.IsCorrectionRow = function (row) {
            return (row === P1SheetRows.RoundingCorrection);
        };
        P1Sheet.prototype.IsXCell = function (row, column) {
            return (this.IsColumnInDataBlock(column, P1SheetDataBlocks.Months) && (P1Sheet.XRows.indexOf(row) > -1));
        };
        P1Sheet.prototype.IsFreeCell = function (row, column) {
            return (this.IsColumnInDataBlock(column, P1SheetDataBlocks.Sums) && (P1Sheet.CorrectionRows.indexOf(row) > -1));
        };
        P1Sheet.prototype.IsRelationCell = function (row, column) {
            return (this.IsColumnInDataBlock(column, P1SheetDataBlocks.Sums) && (P1Sheet.RelationRows.indexOf(row) > -1)) ||
                (this.IsColumnInDataBlock(column, P1SheetDataBlocks.Months) && !(this.IsXCell(row, column)));
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case this.RowNameColumn:
                case this.RowCodeColumn:
                    return SheetFormatCollection.Default;
                default:
                    if (this.IsRelationCell(row, column)) {
                        return SheetFormatCollection.Related;
                    }
                    else if (this.IsFreeCell(row, column)) {
                        return SheetFormatCollection.Free;
                    }
                    else if (this.IsXCell(row, column)) {
                        return SheetFormatCollection.Default;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
            }
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsXCell(row, column)) {
                return ObasHelper.X;
            }
            return undefined;
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.IsFreeCell(row, column);
        };
        P1Sheet.prototype.EditCellEventHandler = function (sheetId, row, column, fieldId, rowLevel, oldValue, newValue) {
            if (this.IsCorrectionRow(row) && ((newValue > P1Sheet.LimitCorrectionValue) || (newValue < (-1 * P1Sheet.LimitCorrectionValue)))) {
                Client.ShowMessage("Ошибка", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C " + P1Sheet.LimitCorrectionValue + " \u0440\u0443\u0431\u043B\u0435\u0439", MessageIcons.Error);
                return false;
            }
            return true;
        };
        return P1Sheet;
    }(YearsSheet));
    P1Sheet.XRows = [P1SheetRows.CorrectionTotal, P1SheetRows.CorrectionWage, P1SheetRows.CorrectionInsurance, P1SheetRows.RoundingCorrection];
    P1Sheet.CorrectionRows = [P1SheetRows.ChangesWage, P1SheetRows.ChangesInsurance, P1SheetRows.RoundingCorrection];
    P1Sheet.RelationRows = [P1SheetRows.FundWage, P1SheetRows.FundInsurance];
    P1Sheet.LimitCorrectionValue = 100;
    F01290.P1Sheet = P1Sheet;
    var P2Sp1SheetRelColumns;
    (function (P2Sp1SheetRelColumns) {
        P2Sp1SheetRelColumns[P2Sp1SheetRelColumns["Number"] = 0] = "Number";
        P2Sp1SheetRelColumns[P2Sp1SheetRelColumns["Wage"] = 1] = "Wage";
        P2Sp1SheetRelColumns[P2Sp1SheetRelColumns["Month"] = 2] = "Month";
        P2Sp1SheetRelColumns[P2Sp1SheetRelColumns["Total"] = 3] = "Total";
    })(P2Sp1SheetRelColumns || (P2Sp1SheetRelColumns = {}));
    var P2Sp1Sheet = (function (_super) {
        __extends(P2Sp1Sheet, _super);
        function P2Sp1Sheet(id, document, formatNameColumn) {
            if (formatNameColumn === void 0) { formatNameColumn = SheetFormatCollection.Related; }
            var _this = _super.call(this, id, document, 1, 1) || this;
            _this.formatNameColumn = formatNameColumn;
            return _this;
        }
        P2Sp1Sheet.prototype.CalcRelColumn = function (column) {
            return this.CalcOffsetCol(column) % P2Sp1Sheet._relCoumnsCount;
        };
        P2Sp1Sheet.prototype.CalcStartBlockColumn = function (block) {
            return this.StartDataColumn + P2Sp1Sheet._relCoumnsCount * block;
        };
        P2Sp1Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            var blockOffset = this.CalcStartBlockColumn(index) + 1;
            return (defaultCaption.length === 0) ?
                "\u043D\u0430 " + ObasHelper.CalcYearColumnCaption(index, this.Document.Settings.StartYear) + " \u0433\u043E\u0434" :
                "\u0424\u043E\u043D\u0434 \u043E\u043F\u043B\u0430\u0442\u044B \u0442\u0440\u0443\u0434\u0430, \u0440\u0443\u0431. (\u0433\u0440." + (P2Sp1SheetRelColumns.Number + blockOffset) + " * \u0433\u0440." + (P2Sp1SheetRelColumns.Wage + blockOffset) + " * \u0433\u0440." + (P2Sp1SheetRelColumns.Month + blockOffset) + ")";
        };
        P2Sp1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsDataColumn(column)) {
                var isFooterRow = this.IsFooterRow(row);
                switch (this.CalcRelColumn(column)) {
                    case P2Sp1SheetRelColumns.Number:
                        return isFooterRow ? SheetFormatCollection.Calc : SheetFormatCollection.Free;
                    case P2Sp1SheetRelColumns.Wage:
                        return isFooterRow ? SheetFormatCollection.Default : SheetFormatCollection.Free;
                    case P2Sp1SheetRelColumns.Month:
                        return isFooterRow ? SheetFormatCollection.Default : SheetFormatCollection.Related;
                    case P2Sp1SheetRelColumns.Total:
                        return SheetFormatCollection.Calc;
                }
            }
            return undefined;
        };
        P2Sp1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsDataColumn(column) && this.IsFooterRow(row)) {
                switch (this.CalcRelColumn(column)) {
                    case P2Sp1SheetRelColumns.Number:
                    case P2Sp1SheetRelColumns.Total:
                        return this.Document.CommonRules.GetFooterSum(this, row, column);
                    case P2Sp1SheetRelColumns.Wage:
                    case P2Sp1SheetRelColumns.Month:
                        return ObasHelper.X;
                }
            }
            return undefined;
        };
        return P2Sp1Sheet;
    }(YearsSheetTyped));
    P2Sp1Sheet._relCoumnsCount = ObasHelper.GetEnumLength(P2Sp1SheetRelColumns);
    F01290.P2Sp1Sheet = P2Sp1Sheet;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return SheetFormatCollection.Free;
        };
        return P3Sheet;
    }(YearsSheet));
    F01290.P3Sheet = P3Sheet;
})(F01290 || (F01290 = {}));
