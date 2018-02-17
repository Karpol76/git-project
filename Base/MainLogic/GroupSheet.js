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
var GroupSheet = (function () {
    function GroupSheet(_document) {
        this._document = _document;
    }
    Object.defineProperty(GroupSheet.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    GroupSheet.prototype.GetSheetFromParam = function (param) {
        if (param instanceof Sheet) {
            return param;
        }
        else if (typeof param === "string") {
            return this._document.Sheets.getValue(param);
        }
        throw new Error("\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C Sheet");
    };
    GroupSheet.prototype.ReadOnlyEventHandler = function (sheetId, isReadOnly) {
        return ObasStageSettings.BlockCurrentYear && (this.Document.Settings.ActiveYear <= ObasStageSettings.CurrentYear);
    };
    Object.defineProperty(GroupSheet.prototype, "YearsCount", {
        get: function () {
            return this.Document.Settings.YearsCount;
        },
        enumerable: true,
        configurable: true
    });
    return GroupSheet;
}());
var YearGroupSheet = (function (_super) {
    __extends(YearGroupSheet, _super);
    function YearGroupSheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YearGroupSheet.prototype.ActivateSheetEventHandler = function (sheetId) {
        this.Document.Settings.SetActiveYear(ObasHelper.GetYearOffsetById(sheetId));
    };
    YearGroupSheet.prototype.GetTableFromParam = function (param) {
        if (param instanceof Table) {
            return param;
        }
        else if (typeof param === "string") {
            return this.Document.Tables.getValue(param);
        }
        throw new Error("\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C Table");
    };
    YearGroupSheet.prototype.FilterTableByYear = function (param, year) {
        var realTable = this.GetTableFromParam(param);
        return realTable.GetFieldValue(BaseObasTableFields.YearField.Id) === year;
    };
    YearGroupSheet.prototype.GetSheetYear = function (sheetId) {
        var yearOffset = ObasHelper.GetYearOffsetById(sheetId);
        return ObasStageSettings.CurrentYear + (yearOffset == null ? 0 : yearOffset);
    };
    YearGroupSheet.prototype.ViewLoadEventHandler = function (tableId) {
        return this.FilterTableByYear(tableId, this.Document.Settings.ActiveYear);
    };
    YearGroupSheet.prototype.CreateCaptionEventHandler = function (sheetId, oldText) {
        var sheetYear = this.GetSheetYear(sheetId);
        oldText = oldText.replace(DocumentSettings.YearSign, sheetYear.toString());
        oldText = oldText.replace(DocumentSettings.YearSignIndex, (sheetYear - this.Document.Settings.StartYear + 1).toString());
        return oldText;
    };
    return YearGroupSheet;
}(GroupSheet));
var HierarchyYearGroupSheet = (function (_super) {
    __extends(HierarchyYearGroupSheet, _super);
    function HierarchyYearGroupSheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HierarchyYearGroupSheet.prototype.StandardCalcStrCode = function (param, row, column, info) {
        var sheet = this.GetSheetFromParam(param);
        var curLvl = sheet.GetRowLevel(row) - 1;
        var lvlInc = curLvl > 0 ? info.LevelIncs[curLvl - 1] : 0;
        var prevLvl = -1;
        var prevCode = 0;
        var curCode;
        if (row > 0) {
            prevLvl = sheet.GetRowLevel(row - 1) - 1;
            prevCode = parseInt(sheet.GetCellValue(row - 1, column), 10);
        }
        if (prevLvl === curLvl) {
            curCode = prevCode + lvlInc;
        }
        else if (curLvl === 0) {
            curCode = info.CalcTotalCode(sheet, row, column);
        }
        else {
            if (lvlInc === 0) {
                curCode = 0;
            }
            else {
                curCode = (((prevCode / lvlInc) | 0) + 1) * lvlInc;
            }
        }
        return ObasHelper.FillWithCharacter(curCode.toString(), info.Length);
    };
    HierarchyYearGroupSheet.prototype.InitCustomStandardcalcResult = function (row, cellInfo) {
        var result = new SheetCalcResult(cellInfo.FormulaId);
        var columns = cellInfo.SourceColumns;
        for (var i = 0; i < columns.length; i++) {
            result.AddCoordinates(new CellCoordinate(row, columns[i]));
        }
        return result.ToArray();
    };
    HierarchyYearGroupSheet.prototype.StandardCalc = function (param, row, column, info) {
        var sheet = this.GetSheetFromParam(param);
        if (column === info.CodeInfo.Column) {
            return this.StandardCalcStrCode(sheet, row, column, info.CodeInfo);
        }
        else {
            var curLvl = sheet.GetRowLevel(row) - 1;
            var columnInfo = info.ColumnsInfo[column];
            if (columnInfo != null) {
                var cellInfo = columnInfo.Cell;
                var result = void 0;
                if (curLvl === info.MaxLevel) {
                    if (cellInfo.FormulaId != null) {
                        return this.InitCustomStandardcalcResult(row, cellInfo);
                    }
                }
                else {
                    var rowInfo = void 0;
                    if (curLvl === 0) {
                        rowInfo = columnInfo.TotalRow;
                    }
                    else {
                        if (columnInfo.SubTotalRow instanceof Array) {
                            rowInfo = columnInfo.SubTotalRow[curLvl - 1];
                        }
                        else {
                            var temp = columnInfo.SubTotalRow;
                            rowInfo = temp;
                        }
                    }
                    if (!rowInfo.IsCalculated && rowInfo.Name != null) {
                        return rowInfo.Name;
                    }
                    else if (rowInfo.IsCalculated) {
                        if (cellInfo.FormulaId) {
                            return this.InitCustomStandardcalcResult(row, cellInfo);
                        }
                        else {
                            result = new SheetCalcResult(BaseFormulas.SUM);
                            result.AddCoordinates(sheet.GetChildRows(row, column));
                            return result.ToArray();
                        }
                    }
                }
            }
        }
        return undefined;
    };
    HierarchyYearGroupSheet.prototype.StandardFormat = function (param, row, column, info) {
        var sheet = this.GetSheetFromParam(param);
        var curLvl = sheet.GetRowLevel(row) - 1;
        var columnInfo = info.ColumnsInfo[column];
        if (columnInfo != null) {
            if (curLvl === info.MaxLevel) {
                var cellInfo = columnInfo.Cell;
                if (cellInfo.Format != null) {
                    return cellInfo.Format;
                }
                else {
                    return SheetFormatCollection.GetFormat(cellInfo.Type);
                }
            }
            var rowInfo = void 0;
            if (curLvl === 0) {
                rowInfo = columnInfo.TotalRow;
            }
            else {
                if (columnInfo.SubTotalRow instanceof Array) {
                    rowInfo = columnInfo.SubTotalRow[curLvl - 1];
                }
                else {
                    var temp = columnInfo.SubTotalRow;
                    rowInfo = temp;
                }
            }
            if (rowInfo.Format != null) {
                return rowInfo.Format;
            }
            else {
                return SheetFormatCollection.Calc;
            }
        }
        return SheetFormatCollection.Default;
    };
    HierarchyYearGroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
        return this.StandardCalc(sheetId, row, column, this.SheetInfo);
    };
    HierarchyYearGroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
        return this.StandardFormat(sheetId, row, column, this.SheetInfo);
    };
    return HierarchyYearGroupSheet;
}(YearGroupSheet));
