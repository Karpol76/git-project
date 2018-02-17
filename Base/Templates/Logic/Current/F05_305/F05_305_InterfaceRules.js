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
var F05305;
(function (F05305) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    InterfaceRules.TotalRowCode = "900";
    InterfaceRules.RowCodeLength = InterfaceRules.TotalRowCode.length;
    F05305.InterfaceRules = InterfaceRules;
    var P2SheetColumnBlocks;
    (function (P2SheetColumnBlocks) {
        P2SheetColumnBlocks[P2SheetColumnBlocks["Total"] = 0] = "Total";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Individual"] = 1] = "Individual";
        P2SheetColumnBlocks[P2SheetColumnBlocks["FireSafe"] = 2] = "FireSafe";
    })(P2SheetColumnBlocks || (P2SheetColumnBlocks = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooter = this.IsFooterRow(row);
            var rowCount = this.RowCount;
            if (isFooter) {
                if (this.IsColumnInDataBlock(column, P2SheetColumnBlocks.Total)) {
                    if (this.IsTotalRow(row)) {
                        return this._sheetOptions.TotalRowFormat;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
                else {
                    if (this.CalcEndBlockColumn(P2SheetColumnBlocks.Total) < column) {
                        if (row === (rowCount - SubsidiesSubventions.SheetTotalRows.DistributedVolume)) {
                            return SheetFormatCollection.Calc;
                        }
                    }
                }
                return SheetFormatCollection.Default;
            }
            else {
                if (this.IsColumnInDataBlock(column, P2SheetColumnBlocks.Total)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter && this.CalcEndBlockColumn(P2SheetColumnBlocks.Total) < column) {
                var rowCount = this.RowCount;
                if (row === (rowCount - SubsidiesSubventions.SheetTotalRows.DistributedVolume)) {
                    return this.Document.CommonRules.GetFooterSum(this, row, column);
                }
                else {
                    return ObasHelper.X;
                }
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return P2Sheet;
    }(SubsidiesSubventions.P2Sheet));
    F05305.P2Sheet = P2Sheet;
    var BaseP3P4Sheet = (function (_super) {
        __extends(BaseP3P4Sheet, _super);
        function BaseP3P4Sheet(document, _subjectFormat) {
            var _this = _super.call(this, document) || this;
            _this._subjectFormat = _subjectFormat;
            return _this;
        }
        BaseP3P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var sheet = this.GetSheet(sheetId);
            var isFooterRow = sheet.IsFooterRow(row);
            switch (column) {
                case sheet.RowNameColumn:
                    return isFooterRow ? SheetFormatCollection.Default : this._subjectFormat;
                case sheet.RowCodeColumn:
                    return SheetFormatCollection.Default;
                case sheet.LastColumn:
                    return SheetFormatCollection.Calc;
                default:
                    return isFooterRow ? SheetFormatCollection.Default : SheetFormatCollection.Free;
            }
        };
        BaseP3P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.GetSheet(sheetId);
            if (sheet.IsFooterRow(row)) {
                switch (column) {
                    case sheet.RowNameColumn:
                        return InterfaceRules.TotalRowName;
                    case sheet.RowCodeColumn:
                        return InterfaceRules.TotalRowCode;
                    case sheet.LastColumn:
                        return this.Document.CommonRules.GetFooterSum(sheet, row, column);
                    default:
                        return ObasHelper.X;
                }
            }
            else if (column === sheet.RowCodeColumn) {
                return sheet.CalcRowCode(row, InterfaceRules.RowCodeLength);
            }
            return undefined;
        };
        return BaseP3P4Sheet;
    }(YearGroupSheet));
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(document, _subjectTable, _editors) {
            var _this = _super.call(this, document, SheetFormatCollection.Spr) || this;
            _this._subjectTable = _subjectTable;
            _this._editors = _editors;
            _this._sheets = new collections.Dictionary();
            return _this;
        }
        P3Sheet.prototype.GetSheet = function (sheetId) {
            var result = this._sheets.getValue(sheetId);
            if (result == null) {
                result = new SubsidiesSubventions.FSheet(sheetId, this.Document, new SubsidiesSubventions.FSheetOptions(1, SheetFormatCollection.Spr, SheetFormatCollection.Free, SheetFormatCollection.Calc), this._subjectTable, this._editors);
                this._sheets.setValue(sheetId, result);
            }
            return result;
        };
        P3Sheet.prototype.EditorIdEventHandler = function (sheetId) {
            return this.GetSheet(sheetId).EditorIdEventHandler();
        };
        return P3Sheet;
    }(BaseP3P4Sheet));
    F05305.P3Sheet = P3Sheet;
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet(document) {
            var _this = _super.call(this, document, SheetFormatCollection.Related) || this;
            _this._sheets = new collections.Dictionary();
            return _this;
        }
        P4Sheet.prototype.GetSheet = function (sheetId) {
            var result = this._sheets.getValue(sheetId);
            if (result == null) {
                result = new YearsSheet(sheetId, this.Document, 1);
                this._sheets.setValue(sheetId, result);
            }
            return result;
        };
        return P4Sheet;
    }(BaseP3P4Sheet));
    F05305.P4Sheet = P4Sheet;
    var P5P6SheetColumnBlocks;
    (function (P5P6SheetColumnBlocks) {
        P5P6SheetColumnBlocks[P5P6SheetColumnBlocks["Param1"] = 0] = "Param1";
        P5P6SheetColumnBlocks[P5P6SheetColumnBlocks["Param2"] = 1] = "Param2";
        P5P6SheetColumnBlocks[P5P6SheetColumnBlocks["Total"] = 2] = "Total";
    })(P5P6SheetColumnBlocks || (P5P6SheetColumnBlocks = {}));
    var P5P6Sheet = (function (_super) {
        __extends(P5P6Sheet, _super);
        function P5P6Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P5P6Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooterRow = this.IsFooterRow(row);
            switch (column) {
                case this.RowNameColumn:
                    return isFooterRow ? SheetFormatCollection.Default : SheetFormatCollection.Related;
                case this.RowCodeColumn:
                    return SheetFormatCollection.Default;
                default:
                    if (this.IsColumnInDataBlock(column, P5P6SheetColumnBlocks.Total)) {
                        return SheetFormatCollection.Calc;
                    }
                    else {
                        return isFooterRow ? SheetFormatCollection.Default : SheetFormatCollection.Free;
                    }
            }
        };
        P5P6Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return InterfaceRules.TotalRowName;
                    case this.RowCodeColumn:
                        return InterfaceRules.TotalRowCode;
                    default:
                        if (this.IsColumnInDataBlock(column, P5P6SheetColumnBlocks.Total)) {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                        else {
                            return ObasHelper.X;
                        }
                }
            }
            else if (column === this.RowCodeColumn) {
                return this.CalcRowCode(row, InterfaceRules.RowCodeLength);
            }
            return undefined;
        };
        return P5P6Sheet;
    }(YearsSheet));
    var P5Sheet = (function (_super) {
        __extends(P5Sheet, _super);
        function P5Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P5Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(\u0433\u0440. 8 \u0440\u0430\u0437\u0434. 4." + (1 + index) + " * \u0433\u0440. " + (3 + index) + " * \u0433\u0440. " + (6 + index) + ")";
        };
        return P5Sheet;
    }(P5P6Sheet));
    F05305.P5Sheet = P5Sheet;
    var P6Sheet = (function (_super) {
        __extends(P6Sheet, _super);
        function P6Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P6Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(\u0433\u0440. " + (3 + index) + " * \u0433\u0440. " + (9 + index) + " \u0440\u0430\u0437\u0434. 5 * \u0433\u0440. " + (6 + index) + ")";
        };
        return P6Sheet;
    }(P5P6Sheet));
    F05305.P6Sheet = P6Sheet;
})(F05305 || (F05305 = {}));
