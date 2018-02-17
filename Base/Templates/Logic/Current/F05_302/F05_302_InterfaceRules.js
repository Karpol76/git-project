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
var F05302;
(function (F05302) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    InterfaceRules.TotalRowCode = "900";
    InterfaceRules.RowCodeLength = 3;
    F05302.InterfaceRules = InterfaceRules;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(id, document) {
            var _this = _super.call(this, document) || this;
            _this._yearsSheets = new collections.Dictionary();
            return _this;
        }
        P3Sheet.prototype.GetYearSheet = function (sheetId) {
            var result = this._yearsSheets.getValue(sheetId);
            if (result == null) {
                result = new YearsSheet(sheetId, this.Document, 1, 1);
                this._yearsSheets.setValue(sheetId, result);
            }
            return result;
        };
        P3Sheet.prototype.IsLastColumn = function (sheetId, column) {
            return (column === (this.GetYearSheet(sheetId).ColumnCount - 1));
        };
        P3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var yearSheet = this.GetYearSheet(sheetId);
            if (yearSheet.IsFooterRow(row)) {
                if (this.IsLastColumn(sheetId, column)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case yearSheet.RowNameColumn:
                        return SheetFormatCollection.Related;
                    case yearSheet.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsLastColumn(sheetId, column)) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            return SheetFormatCollection.Free;
                        }
                }
                ;
            }
        };
        P3Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var yearSheet = this.GetYearSheet(sheetId);
            if (yearSheet.IsFooterRow(row)) {
                switch (column) {
                    case yearSheet.RowNameColumn:
                        return InterfaceRules.TotalRowName;
                    case yearSheet.RowCodeColumn:
                        return InterfaceRules.TotalRowCode;
                    default:
                        if (this.IsLastColumn(sheetId, column)) {
                            return yearSheet.Document.CommonRules.GetFooterSum(sheetId, row, column);
                        }
                        else {
                            return ObasHelper.X;
                        }
                }
            }
            else {
                if (column === yearSheet.RowCodeColumn) {
                    return yearSheet.CalcRowCode(row, InterfaceRules.RowCodeLength);
                }
            }
        };
        return P3Sheet;
    }(YearGroupSheet));
    F05302.P3Sheet = P3Sheet;
    var P4SheetBlocks;
    (function (P4SheetBlocks) {
        P4SheetBlocks[P4SheetBlocks["Partial"] = 0] = "Partial";
        P4SheetBlocks[P4SheetBlocks["Full"] = 1] = "Full";
        P4SheetBlocks[P4SheetBlocks["Ratio"] = 2] = "Ratio";
    })(P4SheetBlocks = F05302.P4SheetBlocks || (F05302.P4SheetBlocks = {}));
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet(id, document, formatNameColumn) {
            if (formatNameColumn === void 0) { formatNameColumn = SheetFormatCollection.Related; }
            var _this = _super.call(this, id, document, 1, 1) || this;
            _this.formatNameColumn = formatNameColumn;
            return _this;
        }
        P4Sheet.prototype.IsXColumn = function (column) {
            return (column >= this.CalcStartBlockColumn(P4SheetBlocks.Partial) &&
                column <= this.CalcEndBlockColumn(P4SheetBlocks.Full));
        };
        P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case this.RowNameColumn:
                    return this.formatNameColumn;
                case this.RowCodeColumn:
                    return SheetFormatCollection.Default;
                default:
                    if (this.IsXColumn(column)) {
                        return SheetFormatCollection.Free;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
            }
            ;
        };
        P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === this.RowCodeColumn) {
                return this.CalcRowCode(row, InterfaceRules.RowCodeLength);
            }
            return undefined;
        };
        P4Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            var colIndexWTPartial = this.StartDataColumn + index + 1;
            var colIndexWTFull = colIndexWTPartial + this.Document.Settings.YearsCount;
            return "\u043D\u0430 " + ObasHelper.CalcYearColumnCaption(index, this.Document.Settings.StartYear) + " \u0433\u043E\u0434\n(\u0433\u0440. " + colIndexWTPartial + " / \u0433\u0440. " + colIndexWTFull + ")";
        };
        return P4Sheet;
    }(YearsSheetTyped));
    F05302.P4Sheet = P4Sheet;
    var P5SheetBlocks;
    (function (P5SheetBlocks) {
        P5SheetBlocks[P5SheetBlocks["Quantity"] = 0] = "Quantity";
        P5SheetBlocks[P5SheetBlocks["QuantityPartial"] = 1] = "QuantityPartial";
        P5SheetBlocks[P5SheetBlocks["Sum"] = 2] = "Sum";
    })(P5SheetBlocks = F05302.P5SheetBlocks || (F05302.P5SheetBlocks = {}));
    var P5Sheet = (function (_super) {
        __extends(P5Sheet, _super);
        function P5Sheet(id, document) {
            return _super.call(this, id, document, SheetFormatCollection.Spr) || this;
        }
        P5Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column < this.CalcStartBlockColumn(P4SheetBlocks.Ratio)) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P5Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter) {
                switch (column) {
                    case this.RowNameColumn:
                        return InterfaceRules.TotalRowName;
                    case this.RowCodeColumn:
                        return InterfaceRules.TotalRowCode;
                    default:
                        if (this.IsXColumn(column)) {
                            return ObasHelper.X;
                        }
                        else {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                }
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        P5Sheet.prototype.GetYearsCaptionEventHandler = function (fieldId, index, defaultCaption, fieldCaption) {
            return "\u043D\u0430 " + (this.Document.Settings.StartYear + index) + " \u0433\u043E\u0434\n(\u0433\u0440." + (3 + index) + " + \u0433\u0440." + (6 + index) + "*\u0433\u0440." + (9 + index) + " \u0440\u0430\u0437.4)*\u0433\u0440.10 \u043F\u043E\u0434\u0440.3." + (1 + index);
        };
        return P5Sheet;
    }(P4Sheet));
    F05302.P5Sheet = P5Sheet;
})(F05302 || (F05302 = {}));
