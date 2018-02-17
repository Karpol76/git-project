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
var F02110;
(function (F02110) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.Sheet5FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                    return SheetFormatCollection.Related;
                default:
                    return SheetFormatCollection.Free;
            }
        };
        InterfaceRules.prototype.Sheet5CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, 6);
            }
            return undefined;
        };
        InterfaceRules.prototype.Sheet5CanAddEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return column > 6;
        };
        InterfaceRules.prototype.P2FilterOkpd = function () {
            return ObasTableCollection.OkpdSprTable.IsCorrectRecord(this.Document.Settings.ActiveYear);
        };
        InterfaceRules.prototype.P3FilterOkpd = function () {
            return ObasTableCollection.OkpdSprTable.IsCorrectDetailedRecord(this.Document.Settings.ActiveYear);
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._totalRowName = "Всего";
    InterfaceRules._totalKosguRowName = "Итого по коду КОСГУ";
    InterfaceRules._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._totalKosguRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalKosguRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._subTotalRowInfos = [
        InterfaceRules._totalKosguRowInfo
    ];
    InterfaceRules.SprDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: [SheetRowInfoCollection.SprOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.RelatedDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: [SheetRowInfoCollection.SprOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.SprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules.FreeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules.RelatedColConstAll = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules.FakeSheetRowCodeInfo = {
        Column: -1,
        Length: -1,
        LevelIncs: [-1],
        CalcTotalCode: function () {
            return -1;
        }
    };
    F02110.InterfaceRules = InterfaceRules;
    var P1SheetRelRows;
    (function (P1SheetRelRows) {
        P1SheetRelRows[P1SheetRelRows["Federal"] = 0] = "Federal";
        P1SheetRelRows[P1SheetRelRows["Foreign"] = 1] = "Foreign";
        P1SheetRelRows[P1SheetRelRows["Total"] = 2] = "Total";
    })(P1SheetRelRows = F02110.P1SheetRelRows || (F02110.P1SheetRelRows = {}));
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.IsFooterRow = function (row) {
            return this._document.CommonRules.IsFooterRow(this, row, P1Sheet._relRowCount);
        };
        P1Sheet.prototype.CalcRelRow = function (row) {
            return row % P1Sheet._relRowCount;
        };
        P1Sheet.prototype.IsDataColumn = function (column) {
            return column > P1Sheet._rowCodeColumn;
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.IsDataColumn(column)) {
                return SheetFormatCollection.Default;
            }
            else if (this.IsDataColumn(column) && (row === this.RowCount - 2)) {
                return SheetFormatCollection.Free;
            }
            else {
                return SheetFormatCollection.Calc;
            }
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return (this.IsDataColumn(column) && (row === this.RowCount - 2));
        };
        return P1Sheet;
    }(Sheet));
    P1Sheet._relRowCount = ObasHelper.GetEnumLength(P1SheetRelRows);
    P1Sheet._rowCodeColumn = 1;
    P1Sheet._rowNameColumn = P1Sheet._rowCodeColumn - 1;
    P1Sheet._rowCodeLength = 3;
    F02110.P1Sheet = P1Sheet;
    var BaseHierarchySheet = (function (_super) {
        __extends(BaseHierarchySheet, _super);
        function BaseHierarchySheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseHierarchySheet.prototype.EditCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return column > 0;
        };
        return BaseHierarchySheet;
    }(HierarchyYearGroupSheet));
    F02110.BaseHierarchySheet = BaseHierarchySheet;
    var UsdSheetColumnBlocks;
    (function (UsdSheetColumnBlocks) {
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["Usd"] = 0] = "Usd";
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["Rub"] = 1] = "Rub";
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["OtherRub"] = 2] = "OtherRub";
        UsdSheetColumnBlocks[UsdSheetColumnBlocks["Total"] = 3] = "Total";
    })(UsdSheetColumnBlocks || (UsdSheetColumnBlocks = {}));
    var BaseUsdHierarchySheet = (function (_super) {
        __extends(BaseUsdHierarchySheet, _super);
        function BaseUsdHierarchySheet(document, _startDataColumn, _columnMultiplier, _freeOrRealtedCell) {
            var _this = _super.call(this, document) || this;
            _this._startDataColumn = _startDataColumn;
            _this._columnMultiplier = _columnMultiplier;
            _this._freeOrRealtedCell = _freeOrRealtedCell;
            _this._fullSheetInfo = null;
            _this._formulaYearsCount = document.MainDataYearsCount;
            _this._addFormulaYearsCount = document.AddDataYearsCount;
            _this._startFormulaColumn = _this.CalcStartBlockColumn(UsdSheetColumnBlocks.Rub) + 1;
            _this._startAddFormulaColumn = _this.CalcEndBlockColumn(UsdSheetColumnBlocks.Total) + 2;
            return _this;
        }
        Object.defineProperty(BaseUsdHierarchySheet.prototype, "SheetInfo", {
            get: function () {
                var _this = this;
                if (this._fullSheetInfo == null) {
                    this._fullSheetInfo = this.StartSheetInfo;
                    var insertColumns = function () {
                        var columnInfos = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            columnInfos[_i] = arguments[_i];
                        }
                        for (var _a = 0, columnInfos_1 = columnInfos; _a < columnInfos_1.length; _a++) {
                            var columnInfo = columnInfos_1[_a];
                            for (var i = 0; i < _this._formulaYearsCount * _this._columnMultiplier; i++) {
                                _this._fullSheetInfo.ColumnsInfo.push(columnInfo);
                            }
                        }
                    };
                    insertColumns(this._freeOrRealtedCell, SheetColumnInfoCollection.CalcColAllCalc, this._freeOrRealtedCell, SheetColumnInfoCollection.CalcColAllCalc);
                    for (var j = 0; j < this._addFormulaYearsCount; j++) {
                        this._fullSheetInfo.ColumnsInfo.push(this._freeOrRealtedCell);
                    }
                }
                return this._fullSheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        BaseUsdHierarchySheet.prototype.CalcStartBlockColumn = function (block) {
            return this._startDataColumn + this._formulaYearsCount * block * this._columnMultiplier;
        };
        BaseUsdHierarchySheet.prototype.CalcEndBlockColumn = function (block) {
            return this._startDataColumn + this._formulaYearsCount * (block + 1) * this._columnMultiplier - 1;
        };
        BaseUsdHierarchySheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.Document.CommonRules.CalcColumnCaption(index, this._startFormulaColumn, 2, this._formulaYearsCount);
        };
        BaseUsdHierarchySheet.prototype.GetAddYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            var startColumn = this._startAddFormulaColumn + BaseUsdHierarchySheet._blocksCount * index + UsdSheetColumnBlocks.Rub;
            var result = "\u0421\u0443\u043C\u043C\u0430,\n\u0440\u0443\u0431\n(\u0433\u0440. " + startColumn + " + \u0433\u0440. " + (startColumn + 1) + ")";
            return result;
        };
        BaseUsdHierarchySheet.prototype.GetThreeYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return ObasHelper.CalcYearColumnCaption(index, this.Document.Settings.StartYear + this.Document.Settings.YearsCount - 1);
        };
        return BaseUsdHierarchySheet;
    }(BaseHierarchySheet));
    BaseUsdHierarchySheet._blocksCount = ObasHelper.GetEnumLength(UsdSheetColumnBlocks);
    F02110.BaseUsdHierarchySheet = BaseUsdHierarchySheet;
    var P2Sp1HierarchySheet = (function (_super) {
        __extends(P2Sp1HierarchySheet, _super);
        function P2Sp1HierarchySheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2Sp1HierarchySheet.prototype, "SheetInfo", {
            get: function () {
                return P2Sp1HierarchySheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P2Sp1HierarchySheet;
    }(BaseHierarchySheet));
    P2Sp1HierarchySheet._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules.FakeSheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules.RelatedDefaultTotalFirstSubtotal,
            InterfaceRules.RelatedDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.RelatedColAllDefault,
            SheetColumnInfoCollection.RelatedColAllDefault,
            InterfaceRules.RelatedColConstAll,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    F02110.P2Sp1HierarchySheet = P2Sp1HierarchySheet;
    var P2Sp2HierarchySheet = (function (_super) {
        __extends(P2Sp2HierarchySheet, _super);
        function P2Sp2HierarchySheet(document) {
            return _super.call(this, document, 5, 1, SheetColumnInfoCollection.RelatedColAllCalc) || this;
        }
        Object.defineProperty(P2Sp2HierarchySheet.prototype, "StartSheetInfo", {
            get: function () {
                return P2Sp2HierarchySheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P2Sp2HierarchySheet;
    }(BaseUsdHierarchySheet));
    P2Sp2HierarchySheet._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules.FakeSheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules.RelatedDefaultTotalFirstSubtotal,
            InterfaceRules.RelatedDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.RelatedColAllDefault,
            SheetColumnInfoCollection.RelatedColAllDefault,
            InterfaceRules.RelatedColConstAll,
        ]
    };
    F02110.P2Sp2HierarchySheet = P2Sp2HierarchySheet;
    var P3Sp1Sp1HierarchySheet = (function (_super) {
        __extends(P3Sp1Sp1HierarchySheet, _super);
        function P3Sp1Sp1HierarchySheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P3Sp1Sp1HierarchySheet.prototype, "SheetInfo", {
            get: function () {
                return P3Sp1Sp1HierarchySheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P3Sp1Sp1HierarchySheet;
    }(BaseHierarchySheet));
    P3Sp1Sp1HierarchySheet._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules.FakeSheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules.SprDefaultTotalFirstSubtotal,
            InterfaceRules.SprDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.FreeColAllDefault,
            InterfaceRules.FreeColConstAll,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    F02110.P3Sp1Sp1HierarchySheet = P3Sp1Sp1HierarchySheet;
    var P3Sp2Sp1HierarchySheet = (function (_super) {
        __extends(P3Sp2Sp1HierarchySheet, _super);
        function P3Sp2Sp1HierarchySheet(document) {
            return _super.call(this, document, 6, 3, SheetColumnInfoCollection.FreeColAllCalc) || this;
        }
        Object.defineProperty(P3Sp2Sp1HierarchySheet.prototype, "StartSheetInfo", {
            get: function () {
                return P3Sp2Sp1HierarchySheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P3Sp2Sp1HierarchySheet;
    }(BaseUsdHierarchySheet));
    P3Sp2Sp1HierarchySheet._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules.FakeSheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules.SprDefaultTotalFirstSubtotal,
            InterfaceRules.SprDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.FreeColAllDefault,
            InterfaceRules.FreeColConstAll
        ]
    };
    F02110.P3Sp2Sp1HierarchySheet = P3Sp2Sp1HierarchySheet;
})(F02110 || (F02110 = {}));
