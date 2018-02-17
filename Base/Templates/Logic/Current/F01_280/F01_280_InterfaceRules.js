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
var F01280;
(function (F01280) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column > 0) {
                var sheet = this.Document.Sheets.getValue(sheetId);
                var lastRow = sheet.RowCount - 1;
                if (row === lastRow) {
                    return SheetFormatCollection.Calc;
                }
                else if (row === lastRow - 1) {
                    if (column === 2 || column === 3) {
                        return SheetFormatCollection.Free;
                    }
                }
                else if (row === lastRow - 2) {
                    if (column > 0 && column < 6) {
                        return SheetFormatCollection.Calc;
                    }
                    else if (column > 17) {
                        return SheetFormatCollection.Related;
                    }
                }
                else {
                    if (column > 9) {
                        return SheetFormatCollection.Related;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
            }
            return SheetFormatCollection.Default;
        };
        InterfaceRules.prototype.GetRelRowTotalFormula = function (row, column, relRowCount) {
            var result = new SheetCalcResult(BaseFormulas.SUM);
            for (var i = 1; i < relRowCount; i++) {
                result.AddCoordinates(new CellCoordinate(row - i, column));
            }
            return result.ToArray();
        };
        InterfaceRules.prototype.SheetP1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            var corrRow = sheet.RowCount - 2;
            return row === corrRow && (column === 2 || column === 3);
        };
        InterfaceRules.prototype.SheetPTotalFotFormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column > 1) {
                var relRow = row % InterfaceRules._sheetPTotalFotRelRowCount;
                if (relRow === 3) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Related;
                }
            }
            return SheetFormatCollection.Default;
        };
        InterfaceRules.prototype.SheetPTotalFotCalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column > 1) {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            else if (fieldId === BaseObasTableFields.StrCodeField.Id) {
                return this.Document.CommonRules
                    .CalcRelRowCode(row, InterfaceRules._sheetPTotalFotRelRowCount, InterfaceRules
                    ._sheetPTotalCodeInfo);
            }
            else if (column > 1) {
                var relRow = row % InterfaceRules._sheetPTotalFotRelRowCount;
                if (relRow === 3) {
                    return this.GetRelRowTotalFormula(row, column, InterfaceRules._sheetPTotalFotRelRowCount);
                }
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetPIndexFormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                case 1:
                    return SheetFormatCollection.Default;
                default:
                    if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                        return SheetFormatCollection.Calc;
                    }
                    else {
                        var relRow = row % InterfaceRules._sheetPIndexRelRowCount;
                        switch (relRow) {
                            case 0:
                                return SheetFormatCollection.Related;
                            case 1:
                            case 3:
                                return SheetFormatCollection.Free;
                            default:
                                return SheetFormatCollection.Calc;
                        }
                    }
            }
        };
        InterfaceRules.prototype.SheetPIndexEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var relRow = row % InterfaceRules._sheetPIndexRelRowCount;
            return !this.Document.CommonRules.IsFooterRow(sheetId, row) && (relRow === 1 || relRow === 3);
        };
        InterfaceRules.prototype.SheetPIndexCalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                        return "Всего фонд оплаты труда в год";
                    case 1:
                        return "9010";
                    default:
                        if (column > 1) {
                            return this.Document.CommonRules
                                .GetFooterSum(sheetId, row, column);
                        }
                }
            }
            else if (fieldId === BaseObasTableFields.StrCodeField.Id) {
                return this.Document.CommonRules
                    .CalcRelRowCode(row, InterfaceRules._sheetPIndexRelRowCount, InterfaceRules._sheetPTotalCodeInfo);
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP4Sp5CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column > 1) {
                    var relRow = row % InterfaceRules._sheetP4Sp5RelRowCount;
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column, {
                        StartRow: relRow,
                        Step: InterfaceRules._sheetP4Sp5RelRowCount
                    });
                }
            }
            else {
                if (fieldId === BaseObasTableFields.StrCodeField.Id) {
                    return ObasHelper.FillWithCharacter(row + 1, 5);
                }
                else if (column > 1) {
                    var relRow = row % InterfaceRules._sheetP4Sp5RelRowCount;
                    if (relRow === 2) {
                        return this.GetRelRowTotalFormula(row, column, InterfaceRules._sheetP4Sp5RelRowCount);
                    }
                }
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP4Sp5FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row, InterfaceRules._sheetP4Sp5RelRowCount)) {
                if (column > 1) {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                switch (column) {
                    case 0:
                    case 1:
                        return SheetFormatCollection.Default;
                    default:
                        var relRow = row % InterfaceRules._sheetP4Sp5RelRowCount;
                        if (relRow === 0) {
                            return SheetFormatCollection.Related;
                        }
                        else {
                            return SheetFormatCollection.Calc;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        InterfaceRules.prototype.SheetP2Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP2Sp3Info);
        };
        InterfaceRules.prototype.SheetP2Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP2Sp3Info);
        };
        InterfaceRules.prototype.SheetP2Sp6CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP2Sp6Info);
        };
        InterfaceRules.prototype.SheetP2Sp6FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP2Sp6Info);
        };
        InterfaceRules.prototype.SheetP3Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP3Sp3Info);
        };
        InterfaceRules.prototype.SheetP3Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP3Sp3Info);
        };
        InterfaceRules.prototype.SheetP3Sp7CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP3Sp7Info);
        };
        InterfaceRules.prototype.SheetP3Sp7FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP3Sp7Info);
        };
        InterfaceRules.prototype.SheetP3Sp8CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP3Sp8Info);
        };
        InterfaceRules.prototype.SheetP3Sp8FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP3Sp8Info);
        };
        InterfaceRules.prototype.SheetP4Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP4Sp3Info);
        };
        InterfaceRules.prototype.SheetP4Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP4Sp3Info);
        };
        InterfaceRules.prototype.SheetP4Sp6CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP4Sp6Info);
        };
        InterfaceRules.prototype.SheetP4Sp6FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP4Sp6Info);
        };
        InterfaceRules.prototype.SheetP5Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP5Sp3Info);
        };
        InterfaceRules.prototype.SheetP5Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP5Sp3Info);
        };
        InterfaceRules.prototype.SheetP5Sp6CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP5Sp6Info);
        };
        InterfaceRules.prototype.SheetP5Sp6FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP5Sp6Info);
        };
        InterfaceRules.prototype.SheetP5Sp7CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP5Sp7Info);
        };
        InterfaceRules.prototype.SheetP5Sp7FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP5Sp7Info);
        };
        InterfaceRules.prototype.P3PositionFilter = function () {
            var result = ObasTableCollection.ConsularPositionsSprTable
                .IsActualRecord(this.Document.Settings.ActiveYear);
            if (result && this.Document.MainParametersTable.Foiv.Code === "310") {
                var regNum = ObasTableCollection.ConsularPositionsSprTable.RegNum.Value;
                result = regNum != null && regNum.length >= 2 && regNum.substr(0, 2) === "12";
            }
            return result;
        };
        InterfaceRules.prototype.Recalc1DataMenuItemClickEventHandler = function () {
            this.Document.UpdateRules.RecalcDataPInsOnly();
        };
        InterfaceRules.prototype.Recalc2DataMenuItemClickEventHandler = function () {
            this.Document.UpdateRules.RecalcDataP2();
        };
        InterfaceRules.prototype.Recalc3DataMenuItemClickEventHandler = function () {
            this.Document.UpdateRules.RecalcDataP3();
        };
        InterfaceRules.prototype.Recalc4DataMenuItemClickEventHandler = function () {
            this.Document.UpdateRules.RecalcDataP4();
        };
        InterfaceRules.prototype.Recalc5DataMenuItemClickEventHandler = function () {
            this.Document.UpdateRules.RecalcDataP5();
        };
        InterfaceRules.prototype.RecalcTotalDataMenuItemClickEventHandler = function () {
            this.Document.UpdateRules.RecalcDataP1Total();
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Всего";
    InterfaceRules._sheetPTotalRelRowCount = 3;
    InterfaceRules._sheetPTotalTRowCount = InterfaceRules._sheetPTotalRelRowCount + 1;
    InterfaceRules._sheetPTotalFotRelRowCount = 4;
    InterfaceRules._sheetPTotalFotTRowCount = InterfaceRules._sheetPTotalFotRelRowCount;
    InterfaceRules._sheetPIndexRelRowCount = 5;
    InterfaceRules._sheetP4Sp5RelRowCount = 2;
    InterfaceRules.SheetCodeInfo = {
        Column: 1,
        Length: 5,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 90100;
        }
    };
    InterfaceRules.SheetP3Sp3CodeInfo = {
        Column: 3,
        Length: 5,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 90100;
        }
    };
    InterfaceRules._sheetP2Sp6CodeInfo = {
        Column: 1,
        Length: 6,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 900100;
        }
    };
    InterfaceRules._sheetP3SpXCodeInfo = {
        Column: 3,
        Length: 5,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 90100;
        }
    };
    InterfaceRules._sheetP4Sp5CodeInfo = {
        Column: 1,
        Length: 5,
        LevelIncs: [10, 1],
        CalcTotalCode: function () {
            return 90010;
        }
    };
    InterfaceRules._sheetPTotalCodeInfo = {
        Column: 1,
        Length: 4,
        LevelIncs: [10, 1],
        CalcTotalCode: function () {
            return 9000;
        }
    };
    InterfaceRules._sheetPIndexFooterSumOptions = {
        StartRow: InterfaceRules._sheetPIndexRelRowCount - 1,
        Step: InterfaceRules._sheetPIndexRelRowCount
    };
    InterfaceRules._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules.TotalRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._sprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: InterfaceRules._totalRowInfo,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules.RelatedColConstAll = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: InterfaceRules._totalRowInfo,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._sheetP2Sp3Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.SheetCodeInfo,
        ColumnsInfo: [
            InterfaceRules._sprColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetP2Sp6Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules._sheetP2Sp6CodeInfo,
        ColumnsInfo: [
            InterfaceRules.RelatedColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetP3Sp3Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.SheetP3Sp3CodeInfo,
        ColumnsInfo: [
            InterfaceRules._sprColConstAll,
            SheetColumnInfoCollection.RelatedColAllDefault,
            SheetColumnInfoCollection.RelatedColAllDefault,
            SheetColumnInfoCollection.CalcColFormatOnly,
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
    InterfaceRules._sheetP3Sp7CalcCol9AllX = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUM],
            SourceColumns: [9, 10, 11, 12]
        },
        TotalRow: SheetRowInfoCollection.XRow,
        SubTotalRow: SheetRowInfoCollection.XRow
    };
    InterfaceRules._sheetP3Sp7CalcCol14AllX = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUM],
            SourceColumns: [14, 15]
        },
        TotalRow: SheetRowInfoCollection.XRow,
        SubTotalRow: SheetRowInfoCollection.XRow
    };
    InterfaceRules._sheetP3Sp7Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules._sheetP3SpXCodeInfo,
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColAllDefault,
            SheetColumnInfoCollection.RelatedColAllDefault,
            InterfaceRules.RelatedColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            InterfaceRules._sheetP3Sp7CalcCol9AllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            InterfaceRules._sheetP3Sp7CalcCol14AllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX
        ]
    };
    InterfaceRules._sheetP3Sp8Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules._sheetP3SpXCodeInfo,
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            InterfaceRules.RelatedColConstAll,
            SheetColumnInfoCollection.RelatedColAllDefault,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetP4Sp3CalcCol5AllCalc = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUM],
            SourceColumns: [4, 5]
        },
        TotalRow: SheetRowInfoCollection.DefaultCalc,
        SubTotalRow: SheetRowInfoCollection.DefaultCalc
    };
    InterfaceRules._sheetP4Sp3Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.SheetCodeInfo,
        ColumnsInfo: [
            InterfaceRules._sprColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllCalc,
            InterfaceRules._sheetP4Sp3CalcCol5AllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetP4Sp6Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.SheetCodeInfo,
        ColumnsInfo: [
            InterfaceRules.RelatedColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetP5Sp3Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.SheetCodeInfo,
        ColumnsInfo: [
            InterfaceRules._sprColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllX,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetP5Sp6CalcCol6AllX = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUM],
            SourceColumns: [6, 7, 8, 9, 10]
        },
        TotalRow: SheetRowInfoCollection.XRow,
        SubTotalRow: SheetRowInfoCollection.XRow
    };
    InterfaceRules._sheetP5Sp6Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.SheetCodeInfo,
        ColumnsInfo: [
            InterfaceRules.RelatedColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            InterfaceRules._sheetP5Sp6CalcCol6AllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX
        ]
    };
    InterfaceRules._sheetP5Sp7Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.SheetCodeInfo,
        ColumnsInfo: [
            InterfaceRules.RelatedColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F01280.InterfaceRules = InterfaceRules;
    var BaseGroupSheet = (function (_super) {
        __extends(BaseGroupSheet, _super);
        function BaseGroupSheet(document, _rowCodeColumn, _relRowCount, _totalRowCount) {
            if (_relRowCount === void 0) { _relRowCount = 1; }
            if (_totalRowCount === void 0) { _totalRowCount = _relRowCount; }
            var _this = _super.call(this, document) || this;
            _this._rowCodeColumn = _rowCodeColumn;
            _this._relRowCount = _relRowCount;
            _this._totalRowCount = _totalRowCount;
            _this._strNameColumn = _this._rowCodeColumn - 1;
            return _this;
        }
        BaseGroupSheet.prototype.IsFooterRow = function (sheetId, row) {
            return this.Document.CommonRules.IsFooterRow(sheetId, row, this._totalRowCount);
        };
        Object.defineProperty(BaseGroupSheet.prototype, "StartDataColumn", {
            get: function () {
                return this.RowCodeColumn + 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroupSheet.prototype, "RowCodeColumn", {
            get: function () {
                return this._rowCodeColumn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroupSheet.prototype, "RowNameColumn", {
            get: function () {
                return this._strNameColumn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroupSheet.prototype, "RelRowCount", {
            get: function () {
                return this._relRowCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroupSheet.prototype, "TotalRowCount", {
            get: function () {
                return this._totalRowCount;
            },
            enumerable: true,
            configurable: true
        });
        BaseGroupSheet.prototype.CalcRelRow = function (row) {
            return row % this._relRowCount;
        };
        BaseGroupSheet.prototype.CalcStartFooterRow = function (sheetId, row) {
            return this.GetSheetFromParam(sheetId).RowCount - this.TotalRowCount;
        };
        BaseGroupSheet.prototype.CalcOffsetCol = function (column) {
            return column - (this._rowCodeColumn + 1);
        };
        BaseGroupSheet.prototype.IsDataColumn = function (column) {
            return this.CalcOffsetCol(column) >= 0;
        };
        BaseGroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(sheetId, row)) {
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
        return BaseGroupSheet;
    }(GroupSheet));
    F01280.BaseGroupSheet = BaseGroupSheet;
    var TotalSheetColumnBlocks;
    (function (TotalSheetColumnBlocks) {
        TotalSheetColumnBlocks[TotalSheetColumnBlocks["Total"] = 0] = "Total";
        TotalSheetColumnBlocks[TotalSheetColumnBlocks["FotTotal"] = 1] = "FotTotal";
        TotalSheetColumnBlocks[TotalSheetColumnBlocks["UsdFot"] = 2] = "UsdFot";
        TotalSheetColumnBlocks[TotalSheetColumnBlocks["RubFot"] = 3] = "RubFot";
        TotalSheetColumnBlocks[TotalSheetColumnBlocks["Insurance"] = 4] = "Insurance";
    })(TotalSheetColumnBlocks = F01280.TotalSheetColumnBlocks || (F01280.TotalSheetColumnBlocks = {}));
    var FotInsTotalSheet = (function (_super) {
        __extends(FotInsTotalSheet, _super);
        function FotInsTotalSheet(document, rowCodeColumn, relRowCount, totalRowCount) {
            return _super.call(this, document, rowCodeColumn, relRowCount, totalRowCount) || this;
        }
        FotInsTotalSheet.prototype.CalcDataColumnBlock = function (column) {
            return (this.CalcOffsetCol(column) / this.YearsCount) | 0;
        };
        FotInsTotalSheet.prototype.InDataColumnBlock = function (column, block) {
            return ((this.CalcDataColumnBlock(column) === block) && this.IsDataColumn(column));
        };
        FotInsTotalSheet.prototype.IsTotalColumn = function (column) {
            return this.InDataColumnBlock(column, TotalSheetColumnBlocks.Total);
        };
        FotInsTotalSheet.prototype.IsTotalFotColumn = function (column) {
            return this.InDataColumnBlock(column, TotalSheetColumnBlocks.FotTotal);
        };
        FotInsTotalSheet.prototype.IsUsdFotColumn = function (column) {
            return this.InDataColumnBlock(column, TotalSheetColumnBlocks.UsdFot);
        };
        FotInsTotalSheet.prototype.IsRubFotColumn = function (column) {
            return this.InDataColumnBlock(column, TotalSheetColumnBlocks.RubFot);
        };
        FotInsTotalSheet.prototype.IsFotColumn = function (column) {
            return this.IsDataColumn(column) && !this.IsTotalColumn(column) && !this.IsInsuranceColumn(column);
        };
        FotInsTotalSheet.prototype.IsInsuranceColumn = function (column) {
            return this.InDataColumnBlock(column, TotalSheetColumnBlocks.Insurance);
        };
        FotInsTotalSheet.prototype.IsFotInsDataColumn = function (column) {
            return this.CalcOffsetCol(column) >= this.YearsCount * TotalSheetColumnBlocks.UsdFot;
        };
        FotInsTotalSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsTotalColumn(column) || this.IsTotalFotColumn(column)) {
                return SheetFormatCollection.Calc;
            }
            else if (!this.IsFooterRow(sheetId, row) && this.IsUsdFotColumn(column)) {
                return SheetFormatCollection.Related;
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        FotInsTotalSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsTotalColumn(column)) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                result.AddCoordinates(new CellCoordinate(row, column + this.YearsCount));
                result.AddCoordinates(new CellCoordinate(row, column + this.YearsCount * TotalSheetColumnBlocks.Insurance));
                return result.ToArray();
            }
            else if (this.IsTotalFotColumn(column)) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                result.AddCoordinates(new CellCoordinate(row, column + this.YearsCount));
                result.AddCoordinates(new CellCoordinate(row, column + this.YearsCount * 2));
                return result.ToArray();
            }
            return undefined;
        };
        FotInsTotalSheet.prototype.GetTotalYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            var formulaParts = [];
            var realStartDataColumn = this.StartDataColumn + index + 1;
            var yearsCount = this.YearsCount;
            formulaParts.push("\u0433\u0440. " + (realStartDataColumn + yearsCount * TotalSheetColumnBlocks.FotTotal));
            formulaParts.push("\u0433\u0440. " + (realStartDataColumn + yearsCount * TotalSheetColumnBlocks.Insurance));
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(" + formulaParts.join(" + ") + ")";
        };
        FotInsTotalSheet.prototype.GetTotalFotYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.Document.CommonRules.CalcColumnCaption(index, this.StartDataColumn + this.YearsCount * TotalSheetColumnBlocks.UsdFot + 1, 2);
        };
        return FotInsTotalSheet;
    }(BaseGroupSheet));
    F01280.FotInsTotalSheet = FotInsTotalSheet;
    var P1SheetRows;
    (function (P1SheetRows) {
        P1SheetRows[P1SheetRows["P2"] = 0] = "P2";
        P1SheetRows[P1SheetRows["P3"] = 1] = "P3";
        P1SheetRows[P1SheetRows["P4"] = 2] = "P4";
        P1SheetRows[P1SheetRows["P5"] = 3] = "P5";
        P1SheetRows[P1SheetRows["OnlyIns"] = 4] = "OnlyIns";
        P1SheetRows[P1SheetRows["Correct"] = 5] = "Correct";
        P1SheetRows[P1SheetRows["Total"] = 6] = "Total";
    })(P1SheetRows || (P1SheetRows = {}));
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(document) {
            return _super.call(this, document, 1, 1) || this;
        }
        P1Sheet.prototype.IsXCell = function (row, column) {
            return ((row === P1SheetRows.OnlyIns && this.IsFotColumn(column)));
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (!this.IsFooterRow(sheetId, row)) {
                if (this.IsXCell(row, column)) {
                    return SheetFormatCollection.Default;
                }
                else if (this.IsFotInsDataColumn(column) && row === P1SheetRows.Correct) {
            	    return SheetFormatCollection.Free;
                }
                else if (this.IsFotInsDataColumn(column)) {
                    return SheetFormatCollection.Related;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var _this = this;
            if (this.IsFooterRow(sheetId, row)) {
                if (this.IsDataColumn(column)) {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column, {
                        Filter: function (inSheet, inRow, inColumn) {
                            return _this.IsXCell(inRow, inColumn);
                        }
                    });
                }
            }
            else {
                if (this.IsXCell(row, column)) {
                    return ObasHelper.X;
                }
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return (this.IsFotInsDataColumn(column) && row === P1SheetRows.Correct);
        };
        return P1Sheet;
    }(FotInsTotalSheet));
    F01280.P1Sheet = P1Sheet;
    var PxTotalSheetRelRows;
    (function (PxTotalSheetRelRows) {
        PxTotalSheetRelRows[PxTotalSheetRelRows["Fot"] = 0] = "Fot";
        PxTotalSheetRelRows[PxTotalSheetRelRows["Change"] = 1] = "Change";
        PxTotalSheetRelRows[PxTotalSheetRelRows["Total"] = 2] = "Total";
    })(PxTotalSheetRelRows || (PxTotalSheetRelRows = {}));
    var PxTotalSheet = (function (_super) {
        __extends(PxTotalSheet, _super);
        function PxTotalSheet(document, _propName) {
            var _this = _super.call(this, document, 1, PxTotalSheet._relRowCount, PxTotalSheet._totalRowCount) || this;
            _this._propName = _propName;
            _this._codeInfo = null;
            return _this;
        }
        Object.defineProperty(PxTotalSheet.prototype, "CodeInfo", {
            get: function () {
                if (this._codeInfo == null) {
                    this._codeInfo = {
                        Column: this.RowCodeColumn,
                        Length: 4,
                        LevelIncs: [10, 1],
                        CalcTotalCode: function () {
                            return 9000;
                        }
                    };
                }
                return this._codeInfo;
            },
            enumerable: true,
            configurable: true
        });
        PxTotalSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFotInsDataColumn(column)) {
                var relRow = this.CalcRelRow(row);
                switch (relRow) {
                    case PxTotalSheetRelRows.Fot:
                        return SheetFormatCollection.Related;
                    case PxTotalSheetRelRows.Change:
                        if (this.IsUsdFotColumn(column)) {
                            return SheetFormatCollection.Related;
                        }
                        else {
                            return SheetFormatCollection.Free;
                        }
                    case PxTotalSheetRelRows.Total:
                        return SheetFormatCollection.Calc;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        PxTotalSheet.prototype.GetTotalFormula = function (row, column, childCount) {
            var result = new SheetCalcResult(BaseFormulas.SUM);
            for (var i = 1; i < childCount; i++) {
                result.AddCoordinates(new CellCoordinate(row - i, column));
            }
            return result.ToArray();
        };
        PxTotalSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(sheetId, row)) {
                if (this.IsFotInsDataColumn(column)) {
                    var rowCount = this.GetSheetFromParam(sheetId).RowCount;
                    switch (row) {
                        case rowCount - 1:
                            return this.GetTotalFormula(row, column, this.TotalRowCount);
                    }
                }
            }
            else {
                if (this.IsFotInsDataColumn(column)) {
                    if (this.CalcRelRow(row) === PxTotalSheetRelRows.Total) {
                        return this.GetTotalFormula(row, column, this.RelRowCount);
                    }
                }
                else if (column === this.RowCodeColumn) {
                    return this.Document.CommonRules.CalcRelRowCode(row, this.RelRowCount, this.CodeInfo);
                }
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        PxTotalSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var relRow = this.CalcRelRow(row);
            return ((relRow === PxTotalSheetRelRows.Change && (this.IsRubFotColumn(column) || this.IsInsuranceColumn(column)))
                && this.IsFotInsDataColumn(column));
        };
        return PxTotalSheet;
    }(FotInsTotalSheet));
    PxTotalSheet._relRowCount = ObasHelper.GetEnumLength(PxTotalSheetRelRows);
    PxTotalSheet._totalRowCount = PxTotalSheet._relRowCount + 1;
    F01280.PxTotalSheet = PxTotalSheet;
    var P2Sp6Sheet = (function (_super) {
        __extends(P2Sp6Sheet, _super);
        function P2Sp6Sheet() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sheetInfo = {
                MaxLevel: 1,
                CodeInfo: P2Sp6Sheet._sheetCodeInfo,
                ColumnsInfo: [
                    InterfaceRules.RelatedColConstAll,
                    SheetColumnInfoCollection.AllDefault
                ]
            };
            _this._fullSheetInfo = null;
            return _this;
        }
        Object.defineProperty(P2Sp6Sheet.prototype, "SheetInfo", {
            get: function () {
                var _this = this;
                if (this._fullSheetInfo == null) {
                    this._fullSheetInfo = this._sheetInfo;
                    var insertColumns = function () {
                        var columnInfos = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            columnInfos[_i] = arguments[_i];
                        }
                        var _loop_1 = function (columnInfo) {
                            _this.Document.IterateByYears(function () {
                                _this._fullSheetInfo.ColumnsInfo.push(columnInfo);
                            });
                        };
                        for (var _a = 0, columnInfos_1 = columnInfos; _a < columnInfos_1.length; _a++) {
                            var columnInfo = columnInfos_1[_a];
                            _loop_1(columnInfo);
                        }
                    };
                    insertColumns(SheetColumnInfoCollection.FreeColAllCalc, SheetColumnInfoCollection.RelatedColAllX, SheetColumnInfoCollection.FreeColAllX, SheetColumnInfoCollection.CalcColAllCalc);
                }
                return this._fullSheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp6Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            var formulaParts = [];
            var realStartDataColumn = P2Sp6Sheet._sheetCodeInfo.Column + 2 + index;
            var yearsCount = this.YearsCount;
            for (var i = 0; i < 3; i++) {
                formulaParts.push("\u0433\u0440. " + (realStartDataColumn + yearsCount * i));
            }
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(" + formulaParts.join(" * ") + ")";
        };
        return P2Sp6Sheet;
    }(HierarchyYearGroupSheet));
    P2Sp6Sheet._sheetCodeInfo = {
        Column: 1,
        Length: 6,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 900100;
        }
    };
    F01280.P2Sp6Sheet = P2Sp6Sheet;
    var ExecWritsSheetColumnBlocks;
    (function (ExecWritsSheetColumnBlocks) {
        ExecWritsSheetColumnBlocks[ExecWritsSheetColumnBlocks["UsdFot"] = 0] = "UsdFot";
        ExecWritsSheetColumnBlocks[ExecWritsSheetColumnBlocks["Total"] = 1] = "Total";
    })(ExecWritsSheetColumnBlocks || (ExecWritsSheetColumnBlocks = {}));
    var ExecWritsSheet = (function (_super) {
        __extends(ExecWritsSheet, _super);
        function ExecWritsSheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        ExecWritsSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
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
                    return SheetFormatCollection.Spr;
                }
                else if (column === this.RowCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else {
                    if (this.IsColumnInDataBlock(column, ExecWritsSheetColumnBlocks.Total)) {
                        return SheetFormatCollection.Calc;
                    }
                    else {
                        return SheetFormatCollection.Free;
                    }
                }
            }
        };
        ExecWritsSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return ExecWritsSheet._totalRowName;
                    case this.RowCodeColumn:
                        return ExecWritsSheet._totalRowCode;
                    default:
                        if (this.IsDataColumn(column)) {
                            return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                        }
                }
            }
            else if (column === this.RowCodeColumn) {
                return ObasHelper.FillWithCharacter(row + 1, ExecWritsSheet._totalRowLength);
            }
            return undefined;
        };
        return ExecWritsSheet;
    }(YearsSheet));
    ExecWritsSheet._totalRowName = "Итого";
    ExecWritsSheet._totalRowCode = "90100";
    ExecWritsSheet._totalRowLength = ExecWritsSheet._totalRowCode.length;
    F01280.ExecWritsSheet = ExecWritsSheet;
    var InsuranceGroupSheet = (function (_super) {
        __extends(InsuranceGroupSheet, _super);
        function InsuranceGroupSheet() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._insuranceSheets = new collections.Dictionary();
            return _this;
        }
        InsuranceGroupSheet.prototype.GetInsuranceSheet = function (sheetId) {
            var result = this._insuranceSheets.getValue(sheetId);
            if (result == null) {
                result = new InsuranceSheet(sheetId, this.Document);
                this._insuranceSheets.setValue(sheetId, result);
            }
            return result;
        };
        InsuranceGroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.GetInsuranceSheet(sheetId).CalcEventHandler(sheetId, row, column, fieldId);
        };
        InsuranceGroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.GetInsuranceSheet(sheetId).FormatEventHandler(sheetId, row, column, groupIndex);
        };
        InsuranceGroupSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.GetInsuranceSheet(sheetId).EditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
        };
        return InsuranceGroupSheet;
    }(GroupSheet));
    F01280.InsuranceGroupSheet = InsuranceGroupSheet;
    var P2Sp9r2Sheet = (function (_super) {
        __extends(P2Sp9r2Sheet, _super);
        function P2Sp9r2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sp9r2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 1) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return P2Sp9r2Sheet;
    }(Sheet));
    F01280.P2Sp9r2Sheet = P2Sp9r2Sheet;
})(F01280 || (F01280 = {}));
