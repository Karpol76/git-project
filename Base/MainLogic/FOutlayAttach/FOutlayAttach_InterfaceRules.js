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
var FOutlayAttach;
(function (FOutlayAttach) {
    var InterfaceRules = (function () {
        function InterfaceRules(_document) {
            this._document = _document;
        }
        InterfaceRules.prototype.GetExcelTemplateFileName = function () {
            return ObasStageSettings.ExcelTemplateDirectory + "\\" + this._document.MainParametersTable.GetFieldValue("ExcelTemplate");
        };
        InterfaceRules.prototype.GetExcelFileName = function () {
            return this._document.MainParametersTable.GetFieldValue("ExcelName");
        };
        InterfaceRules.prototype.SilentExport = function (exportDir) {
            this._document.ExportToExcel(this.GetExcelTemplateFileName(), this.GetExcelFileName(), true, false, exportDir);
        };
        InterfaceRules.prototype.HideLables = function () {
            Client.SetComponentText(ClientComponents.lblKBK, this._document.MainParametersTable.GetFieldValue("ExcelName"));
            Client.SetComponentText(ClientComponents.lblKbkName, "");
            Client.SetComponentText(ClientComponents.lblName, "");
            Client.SetComponentText(ClientComponents.lblNameLbl, "");
        };
        return InterfaceRules;
    }());
    FOutlayAttach.InterfaceRules = InterfaceRules;
    var DataColumns;
    (function (DataColumns) {
        DataColumns[DataColumns["Rub"] = 0] = "Rub";
        DataColumns[DataColumns["Usd"] = 1] = "Usd";
        DataColumns[DataColumns["Code"] = 2] = "Code";
    })(DataColumns || (DataColumns = {}));
    var BaseGroupSheet = (function (_super) {
        __extends(BaseGroupSheet, _super);
        function BaseGroupSheet(document, _startDataColumn, _blockColumnCount) {
            var _this = _super.call(this, document) || this;
            _this._startDataColumn = _startDataColumn;
            _this._blockColumnCount = _blockColumnCount;
            return _this;
        }
        BaseGroupSheet.prototype.CalcStartBlockColumn = function (block) {
            return this._startDataColumn + this._blockColumnCount * block;
        };
        BaseGroupSheet.prototype.CalcEndBlockColumn = function (block) {
            return this._startDataColumn + this._blockColumnCount * (block + 1) - 1;
        };
        BaseGroupSheet.prototype.IsDataColumn = function (column) {
            return this.CalcOffsetCol(column) >= 0;
        };
        BaseGroupSheet.prototype.CalcDataColumnBlock = function (column) {
            return (this.CalcOffsetCol(column) / this._blockColumnCount) | 0;
        };
        BaseGroupSheet.prototype.IsColumnInDataBlock = function (column, block) {
            return ((this.CalcDataColumnBlock(column) === block) && this.IsDataColumn(column));
        };
        BaseGroupSheet.prototype.CalcRelColumn = function (column) {
            return this.CalcOffsetCol(column) % this._blockColumnCount;
        };
        BaseGroupSheet.prototype.CalcOffsetCol = function (column) {
            return column - this._startDataColumn;
        };
        BaseGroupSheet.prototype.GetYearsFieldRangeEventHandler = function (sheetId) {
            return [ObasHelper.GetYearIndexById(sheetId)];
        };
        BaseGroupSheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, fieldId, partFieldId) {
            return (ObasStageSettings.CurrentYear + ObasHelper.GetYearOffsetById(tableId)).toString();
        };
        BaseGroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            var rowLvl = sheet.GetRowLevel(row);
            if (rowLvl < 3 && this.IsDataColumn(column)) {
                var relColumn = this.CalcOffsetCol(column);
                switch (relColumn) {
                    case DataColumns.Rub:
                        var result = new SheetCalcResult(BaseFormulas.SUM);
                        result.AddCoordinates(sheet.GetChildRows(row, column));
                        return result.ToArray();
                    case DataColumns.Usd:
                    case DataColumns.Code:
                        return ObasHelper.X;
                }
            }
            if (column === (sheet.ColumnCount - 1)) {
                return "643";
            }
            return undefined;
        };
        return BaseGroupSheet;
    }(YearGroupSheet));
    var PXGroupSheet = (function (_super) {
        __extends(PXGroupSheet, _super);
        function PXGroupSheet(document) {
            return _super.call(this, document, 7, 1) || this;
        }
        PXGroupSheet.prototype.GetPrevRowCode = function (sheet, row, column) {
            row--;
            while (row > -1) {
                var prevCode = sheet.GetCellValue(row, column, true) || "";
                if (prevCode.length > 0) {
                    return parseInt(prevCode, 10);
                }
                row--;
            }
            return 0;
        };
        PXGroupSheet.prototype.CalcRowCode = function (sheet, row, column) {
            var result = this.GetPrevRowCode(sheet, row, column) + 1;
            return ObasHelper.FillWithCharacter(result, 3);
        };
        PXGroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            var rowLvl = sheet.GetRowLevel(row);
            if (column === 0) {
                switch (rowLvl) {
                    case 1:
                        return "Всего";
                    case 2:
                        return "Итого по коду БК (по коду раздела)";
                    default:
                        if (rowLvl >= 3) {
                            var csrSprTable = ObasTableCollection.CsrTable;
                            var csrCode = sheet.GetCellValue(row, 4, true);
                            var result = csrSprTable.Lookup(csrSprTable.Code.Id, csrCode, csrSprTable.Name.Id) || "";
                            var code = sheet.GetCellValue(row, 6, true);
                            if (code) {
                                var kosguSprTable = ObasTableCollection.KosguSprTable;
                                result += " (" + kosguSprTable
                                    .Lookup(kosguSprTable.Code.Id, code.toString().substr(0, 3), kosguSprTable.Name.Id) + " - " + sheet.GetCellValue(row, column, true) + ")";
                            }
                            else {
                                result += " (" + sheet.GetCellValue(row, column, true) + ")";
                            }
                            return result;
                        }
                }
            }
            else if (column === 1) {
                if (rowLvl >= 3) {
                    return this.CalcRowCode(sheet, row, column);
                }
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return PXGroupSheet;
    }(BaseGroupSheet));
    FOutlayAttach.PXGroupSheet = PXGroupSheet;
    var P4GroupSheet = (function (_super) {
        __extends(P4GroupSheet, _super);
        function P4GroupSheet(document) {
            return _super.call(this, document, 5, 1) || this;
        }
        P4GroupSheet.prototype.IsAddIndicatorsRow = function (sheet, row) {
            if (row < 0) {
                return false;
            }
            return sheet.GetRowLevel(row) === 4;
        };
        P4GroupSheet.prototype.IsDualRow = function (sheet, row) {
            return sheet.GetRowLevel(row) === 3 && sheet.Table.GetKeyBySourceTable(ObasTableCollection.DualTable) === 1;
        };
        P4GroupSheet.prototype.GetPrevSiblingRow = function (sheet, row) {
            var curRowLvl = sheet.GetRowLevel(row);
            var resRow = row - 1;
            while (resRow > -1) {
                var result = sheet.GetRowLevel(resRow);
                if (curRowLvl === result) {
                    return resRow;
                }
                resRow--;
            }
            return null;
        };
        P4GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            var rowLvl = sheet.GetRowLevel(row);
            if (column < P4GroupSheet._rowNameColumn && this.IsDualRow(sheet, row)) {
                return " ";
            }
            if (column === P4GroupSheet._rowNameColumn) {
                switch (rowLvl) {
                    case 1:
                        return "Всего";
                    case 2:
                        return P4GroupSheet._subtotalName;
                    case 3:
                        if (this.IsDualRow(sheet, row)) {
                            return P4GroupSheet._subtotalName;
                        }
                }
            }
            if (this.IsDataColumn(column)) {
                var relColumn = this.CalcOffsetCol(column);
                switch (relColumn) {
                    case DataColumns.Rub:
                        if (row === sheet.RowCount - 1) {
                            return this.Document.CommonRules.GetFooterSum(sheet, row, column, {
                                Filter: function (inSheet, inRow, inColumn, document) {
                                    return inSheet.GetCellValue(inRow, P4GroupSheet._rowNameColumn, true) !==
                                        P4GroupSheet._subtotalName;
                                }
                            });
                        }
                        else if (this.IsDualRow(sheet, row)) {
                            var dataRow = this.GetPrevSiblingRow(sheet, row);
                            return (dataRow == null ? undefined : sheet.GetCellValue(dataRow, column, true));
                        }
                        break;
                    case DataColumns.Usd:
                    case DataColumns.Code:
                        if (this.IsDualRow(sheet, row)) {
                            return ObasHelper.X;
                        }
                }
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return P4GroupSheet;
    }(BaseGroupSheet));
    P4GroupSheet._subtotalName = "Итого по коду БК";
    P4GroupSheet._rowNameColumn = 4;
    FOutlayAttach.P4GroupSheet = P4GroupSheet;
})(FOutlayAttach || (FOutlayAttach = {}));
