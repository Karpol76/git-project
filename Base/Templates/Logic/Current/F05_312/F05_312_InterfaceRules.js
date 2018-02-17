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
var F05312;
(function (F05312) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.CalcRowCode = function (row) {
            return ObasHelper.FillWithCharacter(row + this._rowCodeInfo.LevelIncs[this._rowCodeInfo.LevelIncs.length - 1], this._rowCodeInfo.Length);
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._rowCodeInfo = {
        Column: 1,
        Length: 3,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return -1;
        }
    };
    F05312.InterfaceRules = InterfaceRules;
    var TypeColumnBlock;
    (function (TypeColumnBlock) {
        TypeColumnBlock[TypeColumnBlock["Total"] = 0] = "Total";
        TypeColumnBlock[TypeColumnBlock["UnemploymentBenefits"] = 1] = "UnemploymentBenefits";
        TypeColumnBlock[TypeColumnBlock["FinancialAid"] = 2] = "FinancialAid";
        TypeColumnBlock[TypeColumnBlock["BurialAllowances"] = 3] = "BurialAllowances";
    })(TypeColumnBlock = F05312.TypeColumnBlock || (F05312.TypeColumnBlock = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document, option, table, editors) {
            return _super.call(this, id, document, option, table, editors) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooter = this.IsFooterRow(row);
            var rowCount = this.RowCount;
            if (isFooter) {
                if (this.IsColumnInDataBlock(column, TypeColumnBlock.Total)) {
                    if (this.IsTotalRow(row)) {
                        return this._sheetOptions.TotalRowFormat;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
                else {
                    if (this.CalcEndBlockColumn(TypeColumnBlock.Total) < column) {
                        if (row === (rowCount - SubsidiesSubventions.SheetTotalRows.DistributedVolume)) {
                            return SheetFormatCollection.Calc;
                        }
                    }
                }
                return SheetFormatCollection.Default;
            }
            else {
                if (this.IsColumnInDataBlock(column, TypeColumnBlock.Total)) {
                    return this._sheetOptions.DataColumnFormat;
                }
                else {
                    return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter && this.CalcEndBlockColumn(TypeColumnBlock.Total) < column) {
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
    }(SubsidiesSubventions.FSheet));
    F05312.P2Sheet = P2Sheet;
    var P4Sp1Sp1Sheet = (function (_super) {
        __extends(P4Sp1Sp1Sheet, _super);
        function P4Sp1Sp1Sheet(id, document, option, table, editors) {
            return _super.call(this, id, document, option, table, editors, 1) || this;
        }
        P4Sp1Sp1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter) {
                if (this.CalcEndBlockColumn(TypeColumnBlock.Total) >= column) {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return this._sheetOptions.NameColumnFormat;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsColumnInDataBlock(column, TypeColumnBlock.Total)) {
                            return SheetFormatCollection.Free;
                        }
                }
            }
            return SheetFormatCollection.Calc;
        };
        P4Sp1Sp1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter) {
                if (this.IsColumnInDataBlock(column, TypeColumnBlock.Total)) {
                    return ObasHelper.X;
                }
                else if (this.IsDataColumn(column)) {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            else {
                if (column === this.RowCodeColumn) {
                    return InterfaceRules.CalcRowCode(row);
                }
            }
            return undefined;
        };
        P4Sp1Sp1Sheet.prototype.CalcYearsCaptionNormCost = function (index, startColumn, block, yearCount) {
            if (yearCount === void 0) { yearCount = this.Document.Settings.YearsCount; }
            var column = startColumn + index;
            var formula = "\u0433\u0440." + column + " \u0440\u0430\u0437\u0434. 3 (" + ObasHelper.FillWithCharacter(block, 2) + ") * \u0433\u0440. " + column;
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(" + formula + ")";
        };
        P4Sp1Sp1Sheet.prototype.GetYearsCaptionNormMinEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.CalcYearsCaptionNormCost(index, 3, 1);
        };
        P4Sp1Sp1Sheet.prototype.GetYearsCaptionNormMaxEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.CalcYearsCaptionNormCost(index, 3, 2);
        };
        return P4Sp1Sp1Sheet;
    }(SubsidiesSubventions.FSheet));
    F05312.P4Sp1Sp1Sheet = P4Sp1Sp1Sheet;
    var P4Sp1Sp2Sheet = (function (_super) {
        __extends(P4Sp1Sp2Sheet, _super);
        function P4Sp1Sp2Sheet(id, document, option, BlockTotalSum) {
            if (BlockTotalSum === void 0) { BlockTotalSum = 3; }
            var _this = _super.call(this, id, document, option, 1) || this;
            _this.BlockTotalSum = BlockTotalSum;
            return _this;
        }
        P4Sp1Sp2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsColumnInDataBlock(column, this.BlockTotalSum)) {
                return SheetFormatCollection.Calc;
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P4Sp1Sp2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter) {
                if (this.IsColumnInDataBlock(column, this.BlockTotalSum)) {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
                else if (this.IsDataColumn(column)) {
                    return ObasHelper.X;
                }
            }
            else {
                if (column === this.RowCodeColumn) {
                    return InterfaceRules.CalcRowCode(row);
                }
            }
            return undefined;
        };
        P4Sp1Sp2Sheet.prototype.CalcYearsCaptionNormUB = function (index, startColumn, blockCount, yearCount) {
            if (yearCount === void 0) { yearCount = this.Document.Settings.YearsCount; }
            var column = startColumn + index;
            var groups = [];
            for (var i = 0; i < blockCount; i++)
                groups.push("\u0433\u0440. " + (column + yearCount * i));
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(" + groups.join(" * ") + ")";
        };
        P4Sp1Sp2Sheet.prototype.GetYearsCaptionNormUBEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.CalcYearsCaptionNormUB(index, 3, 3);
        };
        return P4Sp1Sp2Sheet;
    }(SubsidiesSubventions.P2Sheet));
    F05312.P4Sp1Sp2Sheet = P4Sp1Sp2Sheet;
    var P4Sp2Sp2Sheet = (function (_super) {
        __extends(P4Sp2Sp2Sheet, _super);
        function P4Sp2Sp2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4Sp2Sp2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooter = this.IsFooterRow(row);
            if (!isFooter && this.IsColumnInDataBlock(column, P4Sp2Sp2Sheet.RateBlockNumber)) {
                return SheetFormatCollection.Related;
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P4Sp2Sp2Sheet;
    }(P4Sp1Sp2Sheet));
    P4Sp2Sp2Sheet.RateBlockNumber = 1;
    F05312.P4Sp2Sp2Sheet = P4Sp2Sp2Sheet;
    var P4Sp1Sp3Sheet = (function (_super) {
        __extends(P4Sp1Sp3Sheet, _super);
        function P4Sp1Sp3Sheet(id, document, option, blockTotalSum) {
            if (blockTotalSum === void 0) { blockTotalSum = 2; }
            return _super.call(this, id, document, option, blockTotalSum) || this;
        }
        P4Sp1Sp3Sheet.prototype.GetYearsCaptionNormUBEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.CalcYearsCaptionNormUB(index, 3, 2);
        };
        return P4Sp1Sp3Sheet;
    }(P4Sp2Sp2Sheet));
    F05312.P4Sp1Sp3Sheet = P4Sp1Sp3Sheet;
    var P4Sp2Sp1Sheet = (function (_super) {
        __extends(P4Sp2Sp1Sheet, _super);
        function P4Sp2Sp1Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return P4Sp2Sp1Sheet;
    }(P4Sp1Sp1Sheet));
    F05312.P4Sp2Sp1Sheet = P4Sp2Sp1Sheet;
    var P4Sp2Sp3Sheet = (function (_super) {
        __extends(P4Sp2Sp3Sheet, _super);
        function P4Sp2Sp3Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4Sp2Sp3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row) && this.IsDataColumn(column)) {
                return SheetFormatCollection.Calc;
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P4Sp2Sp3Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row) && this.IsDataColumn(column)) {
                return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                ;
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return P4Sp2Sp3Sheet;
    }(SubsidiesSubventions.P2Sheet));
    F05312.P4Sp2Sp3Sheet = P4Sp2Sp3Sheet;
    var P4Sp3Sheet = (function (_super) {
        __extends(P4Sp3Sheet, _super);
        function P4Sp3Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return P4Sp3Sheet;
    }(P4Sp2Sp3Sheet));
    F05312.P4Sp3Sheet = P4Sp3Sheet;
    var BlockNorm;
    (function (BlockNorm) {
        BlockNorm[BlockNorm["AvgCount"] = 0] = "AvgCount";
        BlockNorm[BlockNorm["AvgCountReg"] = 1] = "AvgCountReg";
        BlockNorm[BlockNorm["Norm"] = 2] = "Norm";
    })(BlockNorm = F05312.BlockNorm || (F05312.BlockNorm = {}));
    var BlockNormOptions = (function () {
        function BlockNormOptions(avgCountFormat, avgCountRegFormat, normFormat) {
            if (avgCountFormat === void 0) { avgCountFormat = SheetFormatCollection.Free; }
            if (avgCountRegFormat === void 0) { avgCountRegFormat = SheetFormatCollection.Free; }
            if (normFormat === void 0) { normFormat = SheetFormatCollection.Calc; }
            this.avgCountFormat = avgCountFormat;
            this.avgCountRegFormat = avgCountRegFormat;
            this.normFormat = normFormat;
        }
        Object.defineProperty(BlockNormOptions.prototype, "AvgCountFormat", {
            get: function () {
                return this.avgCountFormat;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockNormOptions.prototype, "AvgCountRegFormat", {
            get: function () {
                return this.avgCountRegFormat;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockNormOptions.prototype, "NormFormat", {
            get: function () {
                return this.normFormat;
            },
            enumerable: true,
            configurable: true
        });
        return BlockNormOptions;
    }());
    F05312.BlockNormOptions = BlockNormOptions;
    var P4Sp4Sheet = (function (_super) {
        __extends(P4Sp4Sheet, _super);
        function P4Sp4Sheet(id, document, options) {
            var _this = _super.call(this, id, document, 0, 1) || this;
            _this.options = options;
            return _this;
        }
        P4Sp4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsColumnInDataBlock(column, BlockNorm.AvgCount)) {
                return this.options.AvgCountFormat;
            }
            else if (this.IsColumnInDataBlock(column, BlockNorm.AvgCountReg)) {
                return this.options.AvgCountRegFormat;
            }
            else if (this.IsColumnInDataBlock(column, BlockNorm.Norm)) {
                return this.options.NormFormat;
            }
            return SheetFormatCollection.Default;
        };
        P4Sp4Sheet.prototype.CalcYearsCaptionNormUB = function (index, startColumn, blockCount, yearCount) {
            if (yearCount === void 0) { yearCount = this.Document.Settings.YearsCount; }
            var column = startColumn + index;
            var groups = [];
            for (var i = 0; i < blockCount; i++)
                groups.push("\u0433\u0440. " + (column + yearCount * i));
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(" + groups.join(" / ") + ")";
        };
        P4Sp4Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.CalcYearsCaptionNormUB(index, 2, 2);
        };
        return P4Sp4Sheet;
    }(YearsSheetTyped));
    F05312.P4Sp4Sheet = P4Sp4Sheet;
    var P4Sp5Sheet = (function (_super) {
        __extends(P4Sp5Sheet, _super);
        function P4Sp5Sheet(id, document, options) {
            return _super.call(this, id, document, options) || this;
        }
        return P4Sp5Sheet;
    }(P4Sp4Sheet));
    F05312.P4Sp5Sheet = P4Sp5Sheet;
    var P4Sp6Sheet = (function (_super) {
        __extends(P4Sp6Sheet, _super);
        function P4Sp6Sheet(id, document, options) {
            return _super.call(this, id, document, options) || this;
        }
        return P4Sp6Sheet;
    }(P4Sp4Sheet));
    F05312.P4Sp6Sheet = P4Sp6Sheet;
    var ColumnIndex;
    (function (ColumnIndex) {
        ColumnIndex[ColumnIndex["NameColumn"] = 0] = "NameColumn";
        ColumnIndex[ColumnIndex["CodeColumn"] = 1] = "CodeColumn";
        ColumnIndex[ColumnIndex["AvgCountColumn"] = 2] = "AvgCountColumn";
        ColumnIndex[ColumnIndex["LastColumn"] = 10] = "LastColumn";
    })(ColumnIndex = F05312.ColumnIndex || (F05312.ColumnIndex = {}));
    var P5Sheet = (function (_super) {
        __extends(P5Sheet, _super);
        function P5Sheet(document) {
            return _super.call(this, document) || this;
        }
        P5Sheet.prototype.GetFieldRangeEventHandler = function (sheetId) {
            if (sheetId === void 0) { sheetId = ""; }
            var index = ObasHelper.GetYearIndexById(sheetId);
            return [index];
        };
        P5Sheet.prototype.GetCaptionEventHandler = function (sheetId, index, defaultCaption, fieldCaption) {
            var yearIndex = ObasHelper.GetYearIndexById(sheetId) - 1;
            return "\u0433\u0440. 3 * \u0433\u0440. " + (8 + yearIndex) + " \u043F\u043E\u0434\u0440. 4.4 * (\u0433\u0440. " + (6 + yearIndex) + " \u043F. 4.1.1 * \u0433\u0440. 4 + \u0433\u0440. " + (12 + yearIndex) + " \u043F. 4.1.2 * \u0433\u0440. 5 + \u0433\u0440. " + (9 + yearIndex) + " \u043F. 4.1.1 * \u0433\u0440. 6 + \u0433\u0440. " + (9 + yearIndex) + " \u043F. 4.1.3 * \u0433\u0440. 7) * \u0433\u0440. 8 + \u0433\u0440. 9 + \u0433\u0440. 10";
        };
        P5Sheet.prototype.IsFooterRow = function (sheetId, row) {
            return this.Document.CommonRules.IsFooterRow(sheetId, row);
        };
        P5Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (ColumnIndex.LastColumn === column) {
                return SheetFormatCollection.Calc;
            }
            var isFooter = this.IsFooterRow(sheetId, row);
            if (isFooter) {
                return SheetFormatCollection.Default;
            }
            else {
                switch (column) {
                    case ColumnIndex.NameColumn:
                        return SheetFormatCollection.Related;
                    case ColumnIndex.CodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
        };
        P5Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(sheetId, row);
            if (isFooter) {
                switch (column) {
                    case ColumnIndex.NameColumn:
                        return P5Sheet.TotalRowName;
                    case ColumnIndex.CodeColumn:
                        return P5Sheet.TotalCode;
                    case ColumnIndex.LastColumn:
                        return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                    default:
                        return ObasHelper.X;
                }
            }
            else {
                if (column === ColumnIndex.CodeColumn) {
                    return InterfaceRules.CalcRowCode(row);
                }
            }
        };
        return P5Sheet;
    }(YearGroupSheet));
    P5Sheet.TotalRowName = "Итого";
    P5Sheet.TotalCode = "900";
    F05312.P5Sheet = P5Sheet;
    var P6Sheet = (function (_super) {
        __extends(P6Sheet, _super);
        function P6Sheet(document) {
            return _super.call(this, document) || this;
        }
        P6Sheet.prototype.GetCaptionEventHandler = function (sheetId, index, defaultCaption, fieldCaption) {
            var yearIndex = ObasHelper.GetYearIndexById(sheetId) - 1;
            return "\u0433\u0440. 3 * \u0433\u0440. " + (8 + yearIndex) + " \u043F\u043E\u0434\u0440. 4.5 * (\u0433\u0440. " + (6 + yearIndex) + " \u043F. 4.2.1 * \u0433\u0440. 4 + \u0433\u0440. " + (12 + yearIndex) + " \u043F. 4.2.2 * \u0433\u0440. 5 + \u0433\u0440. " + (9 + yearIndex) + " \u043F. 4.2.1 * \u0433\u0440. 6 + \u0433\u0440. " + (9 + yearIndex) + " \u043F. 4.2.3 * \u0433\u0440. 7) * \u0433\u0440. 8 + \u0433\u0440. 9 + \u0433\u0440. 10";
        };
        P6Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.IsFooterRow(sheetId, row) && (column === ColumnIndex.AvgCountColumn)) {
                return SheetFormatCollection.Related;
            }
            else {
                return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
            }
        };
        return P6Sheet;
    }(P5Sheet));
    F05312.P6Sheet = P6Sheet;
    var P7Sheet = (function (_super) {
        __extends(P7Sheet, _super);
        function P7Sheet(id, document, option, blockTotalSum) {
            if (blockTotalSum === void 0) { blockTotalSum = 2; }
            return _super.call(this, id, document, option, blockTotalSum) || this;
        }
        P7Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooter = this.IsFooterRow(row);
            if (!isFooter && this.IsColumnInDataBlock(column, P7Sheet.AvgBlockNumber)) {
                return SheetFormatCollection.Related;
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P7Sheet.prototype.CalcYearsCaption = function (index, startColumn, blockCount, yearCount) {
            if (yearCount === void 0) { yearCount = this.Document.Settings.YearsCount; }
            var column = startColumn + index;
            var column2block = column + yearCount * (blockCount - 1);
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(\u0433\u0440. " + column + " * \u0433\u0440. " + (8 + index) + " \u043F\u043E\u0434\u0440. 4.6 * \u0433\u0440. " + (6 + index) + " \u043F\u043E\u0434\u0440. 4.3 * \u0433\u0440. " + column2block + ")";
        };
        P7Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.CalcYearsCaption(index, 3, 2);
        };
        P7Sheet.prototype.GetFieldYearsRangeEventHandler = function (sheetId) {
            if (sheetId === void 0) { sheetId = ""; }
            var result = [];
            for (var i = 0; i < this.Document.Settings.YearsCount; i++) {
                result.push(i);
            }
            return result;
        };
        return P7Sheet;
    }(P4Sp1Sp2Sheet));
    P7Sheet.AvgBlockNumber = 0;
    F05312.P7Sheet = P7Sheet;
})(F05312 || (F05312 = {}));
