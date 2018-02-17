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
var F01400;
(function (F01400) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SimpleSheetFormat = function (sheetId, row, column, groupIndex, startCalcRow) {
            if (column === 1 || column >= startCalcRow) {
                return SheetFormatCollection.Calc;
            }
            else if (column > 1 && column < startCalcRow) {
                return SheetFormatCollection.Free;
            }
            else {
                return SheetFormatCollection.Default;
            }
        };
        InterfaceRules.prototype.CalcAverageCost = function (val1, val2) {
            return this.CalcProportion(val1, val2);
        };
        InterfaceRules.prototype.CalcProportion = function (val1, val2) {
            if (val2) {
                return (val1 / val2);
            }
            else {
                return val2;
            }
        };
        InterfaceRules.prototype.CalcPercentProportion = function (val1, val2) {
            return this.ConvertToPercent(this.CalcProportion(val1, val2));
        };
        InterfaceRules.prototype.ConvertToPercent = function (value) {
            return (value || 0) * 100;
        };
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                case 1:
                    return SheetFormatCollection.Default;
                default:
                    var rowCount = this.Document.Sheets.getValue(sheetId).RowCount;
                    if (row === 0 || row === 2 || row === rowCount - 6) {
                        return SheetFormatCollection.Calc;
                    }
                    else if (row === 1) {
                        return SheetFormatCollection.Free;
                    }
                    else {
                        return SheetFormatCollection.Related;
                    }
            }
        };
        InterfaceRules.prototype.SheetP1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return ((column > 1) && (row === 1));
        };
        InterfaceRules.prototype.SheetP2Sp1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column < 2) {
                return SheetFormatCollection.Default;
            }
            else {
                if (column === 5) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        InterfaceRules.prototype.CalcRelRowCode = function (sheet, row, column, relRowCount) {
            var code = parseInt(sheet.GetCellValue(row, column), 10);
            return ObasHelper.FillWithCharacter(code.toString(), 2);
        };
        InterfaceRules.prototype.SheetP2Sp1CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return this.CalcRelRowCode(sheet, row, column, InterfaceRules._sheetPXSp1Sp2RelRowCount);
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP2Sp2FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column < 2) {
                return SheetFormatCollection.Default;
            }
            else {
                if (column === 6) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        InterfaceRules.prototype.SheetP2Sp2CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return this.CalcRelRowCode(sheet, row, column, InterfaceRules._sheetPXSp1Sp2RelRowCount);
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP3Sp1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column < 2) {
                return SheetFormatCollection.Default;
            }
            else if (column > 7) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Free;
            }
        };
        InterfaceRules.prototype.SheetP3Sp1CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return this.CalcRelRowCode(sheet, row, column, InterfaceRules._sheetPXSp1Sp2RelRowCount);
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP3Sp2FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column < 2) {
                return SheetFormatCollection.Default;
            }
            else if (column > 9) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Free;
            }
        };
        InterfaceRules.prototype.SheetP3Sp2EditCellEventHandler = function (sheetId, row, column, fieldId, rowLevel, oldValue, newValue) {
            var table = this.Document.P3Sp2Table;
            var key = this.Document.Sheets.getValue(sheetId).Table.GetKeyBySourceTable(table);
            var message = null;
            switch (column + 1) {
                case table.AverageUsdCountInfo.ColumnIndex:
                    message = table.AverageUsdCountCheckEventHandler(newValue, key, true);
                    break;
                case table.AverageRubCountInfo.ColumnIndex:
                    message = table.AverageRubCountCheckEventHandler(newValue, key, true);
                    break;
            }
            if (message) {
                Client.ShowMessage("Ошибка", message, MessageIcons.Error);
                return false;
            }
            else {
                return true;
            }
        };
        InterfaceRules.prototype.FilterSheetP2Sp3CalcEventHandler = function (sheet, row, column, document) {
            if ((row > 1) && (row < 5)) {
                return true;
            }
            return false;
        };
        InterfaceRules.prototype.SheetP2Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            var relRow = row % InterfaceRules._sheetP2Sp3RelRowCount;
            var sheet = this.Document.Sheets.getValue(sheetId);
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column > 1) {
                    if (column === 5 || column === 6 || column === 12) {
                        return ObasHelper.X;
                    }
                    else {
                        var filter = { Filter: this.FilterSheetP2Sp3CalcEventHandler };
                        return this.Document.CommonRules.GetFooterSum(sheetId, row, column, filter);
                    }
                }
                else {
                    if (column === 0) {
                        return InterfaceRules.TotalRowName;
                    }
                    if (column === 1) {
                        return InterfaceRules._sheetCodeTotal;
                    }
                }
            }
            else {
                if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                    return this.CalcRelRowCode(sheet, row, column, InterfaceRules._sheetP2Sp3RelRowCount);
                }
                else {
                    if (column === 2) {
                        var result = new SheetCalcResult(BaseFormulas.SUM);
                        for (var i = 1; i < 3; i++) {
                            result.AddCoordinates(new CellCoordinate(row, column + i));
                        }
                        return result.ToArray();
                    }
                    else if (column > 4 && column < 7) {
                        var result = new SheetCalcResult("%Doc%.InterfaceRules.CalcAverageCost");
                        result.AddCoordinates(new CellCoordinate(row, column + 3));
                        result.AddCoordinates(new CellCoordinate(row, column - 2));
                        return result.ToArray();
                    }
                    else if (column === 12) {
                        var result = new SheetCalcResult("%Doc%.InterfaceRules.CalcPercentProportion");
                        for (var i = 1; i < 3; i++) {
                            result.AddCoordinates(new CellCoordinate(row, column - i));
                        }
                        return result.ToArray();
                    }
                }
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP2Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column < 2 || column === 5 || column === 6 || column === 12) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                if (column < 2) {
                    return SheetFormatCollection.Default;
                }
                else {
                    if (column === 3 || column === 4 || (column > 7 && column < 12)) {
                        return SheetFormatCollection.Free;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
            }
        };
        InterfaceRules.prototype.SheetP2Sp4FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP2Sp4Info);
        };
        InterfaceRules.prototype.SheetP2Sp4CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP2Sp4Info);
        };
        InterfaceRules.prototype.SheetP2Sp4AddCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.Document.CommonRules
                .CantAddPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
        };
        InterfaceRules.prototype.SheetP2Sp4EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.Document.SheetP2Sp4IsAvailable &&
                this.Document.CommonRules
                    .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
        };
        InterfaceRules.prototype.SheetP2DailyPayEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var result = this.Document.CommonRules
                .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
            if (result) {
                if (column === 1) {
                    return false;
                }
                else if (column > 1) {
                    var table = this.Document.P2DailyPayDataTable;
                    var key = this.Document.Sheets.getValue(sheetId).Table.GetKeyBySourceTable(table);
                    return key != null;
                }
            }
            return result;
        };
        InterfaceRules.prototype.SheetP2DailyPayFormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP2DailyPayInfo);
        };
        InterfaceRules.prototype.SheetP2DailyPayCalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId) &&
                !this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                return row + 11;
            }
            else {
                return this.Document.CommonRules
                    .StandardCalc(sheetId, row, column, InterfaceRules._sheetP2DailyPayInfo);
            }
        };
        InterfaceRules.prototype.SheetP3DailyPayEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var result = this.Document.CommonRules
                .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
            if (result) {
                if (column === 1) {
                    return false;
                }
                else if (column > 1) {
                    var table = this.Document.P3DailyPayDataTable;
                    var key = this.Document.Sheets.getValue(sheetId).Table.GetKeyBySourceTable(table);
                    return key != null;
                }
            }
            return result;
        };
        InterfaceRules.prototype.SheetP3DailyPayFormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if ((column < 5) || column === 9 || column === 10) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                return this.Document.CommonRules
                    .StandardFormat(sheetId, row, column, InterfaceRules._sheetP3DailyPayInfo);
            }
        };
        InterfaceRules.prototype.SheetP3DailyPayTotalRowCalcPayFilter = function (sheet, row, column, document) {
            return sheet.GetCellValue(row, BaseObasTableFields.StrKeyField.Id, false) !==
                F01400.StrKeysP3DailyPay.DailyPay;
        };
        InterfaceRules.prototype.SheetP3DailyPayTotalRowCalcSurchFilter = function (sheet, row, column, document) {
            return sheet.GetCellValue(row, BaseObasTableFields.StrKeyField.Id, false) !==
                F01400.StrKeysP3DailyPay.Surcharges;
        };
        InterfaceRules.prototype.SheetP3DailyPayCalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                    return ObasHelper.FillWithCharacter(row + 1, InterfaceRules._kosguCodeLength);
                }
                else if (column > 1) {
                    if (column === 3 || column === 4 || column === 9 || column === 10) {
                        return ObasHelper.X;
                    }
                    else {
                        var sheet = this.Document.Sheets.getValue(sheetId);
                        return this.Document.CommonRules.GetFooterSum(sheet, row, column);
                    }
                }
                else {
                    if (column === 0) {
                        return InterfaceRules.TotalRowName;
                    }
                }
            }
            else {
                return this.Document.CommonRules
                    .StandardCalc(sheetId, row, column, InterfaceRules._sheetP3DailyPayInfo);
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP2Sp5FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP2Sp5Info);
        };
        InterfaceRules.prototype.SheetP2Sp5CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP2Sp5Info);
        };
        InterfaceRules.prototype.SheetP3Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP3Sp3Info);
        };
        InterfaceRules.prototype.SheetP3Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP3Sp3Info);
        };
        InterfaceRules.prototype.DocumentSaveEventHandler = function () {
            var _this = this;
            var kosguSprTable = ObasTableCollection.KosguSprTable;
            var data = [];
            var yearsCount = this.Document.Settings.YearsCount;
            var record211 = {
                Key: kosguSprTable.LookupKeyByCode("211"),
                Data: new Float32Array(yearsCount)
            };
            data.push(record211);
            var record212 = {
                Key: kosguSprTable.LookupKeyByCode("212"),
                Data: new Float32Array(yearsCount)
            };
            data.push(record212);
            var record213 = {
                Key: kosguSprTable.LookupKeyByCode("213"),
                Data: new Float32Array(yearsCount)
            };
            data.push(record213);
            var record999 = {
                Key: kosguSprTable.LookupKeyByCode("999"),
                Data: new Float32Array(yearsCount)
            };
            data.push(record999);
            var collectKosguData = function (kosguDataTable) {
                var index = kosguDataTable.Year.Value - ObasStageSettings.CurrentYear;
                var obasSum = kosguDataTable.ObasSum.NValue;
                switch (kosguDataTable.Kosgu.Code) {
                    case "211":
                        record211.Data[index] += obasSum;
                        break;
                    case "212":
                        record212.Data[index] += obasSum;
                        break;
                    case "213":
                        record213.Data[index] += obasSum;
                        break;
                    default:
                        record999.Data[index] += obasSum;
                }
            };
            this.Document.P2Sp5Table.Iterate(collectKosguData);
            this.Document.P3Sp3Table.Iterate(collectKosguData);
            var totalTable = this.Document.P1TotalTable;
            totalTable.Iterate(function () {
                switch (totalTable.StrKey) {
                    case F01400.StrKeysP1.P2Sp1:
                    case F01400.StrKeysP1.P2Sp2:
                    case F01400.StrKeysP1.P2Sp3:
                    case F01400.StrKeysP1.P2Sp4:
                    case F01400.StrKeysP1.P3Sp1:
                    case F01400.StrKeysP1.P3Sp2:
                        _this.Document.IterateByYears(function (i) {
                            record999.Data[i] += totalTable.GetFieldValue(BaseObasTableFields.YearDataField.GenerateId(i + 1));
                        }, false);
                        break;
                }
            });
            this.Document.CommonRules.UpdateKosguTable(data);
            this.Document.CommonRules.DocumentSaveEventHandler();
        };
        InterfaceRules.prototype.SheetP3Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP3Sp3Info);
        };
        InterfaceRules.prototype.P2Sp7SheetCalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 1) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._kosguCodeLength = 1;
    InterfaceRules._sheetPXSp1Sp2RelRowCount = 2;
    InterfaceRules._sheetP2Sp3RelRowCount = 1;
    InterfaceRules.TotalRowName = "Всего";
    InterfaceRules._sheetCodeTotal = "9019";
    InterfaceRules._totalKosguRowName = "Всего по коду КОСГУ";
    InterfaceRules._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules.TotalRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._totalKosguRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalKosguRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._subTotalRowInfos = [InterfaceRules._totalKosguRowInfo];
    InterfaceRules._sprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._freeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: [SheetRowInfoCollection.Default],
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._sprDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.SprOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules._defaultColConstAll = {
        Cell: { Type: SheetCellTypes.Default },
        SubTotalRow: [SheetRowInfoCollection.Default],
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._sheetRowCodeInfo = {
        Column: 1,
        Length: 1,
        LevelIncs: [1],
        CalcTotalCode: function (sheet, row) {
            return row + 1;
        }
    };
    InterfaceRules._sheetKosguRowCodeInfo = {
        Column: 2,
        Length: InterfaceRules._kosguCodeLength,
        LevelIncs: [1, 1],
        CalcTotalCode: function (sheet, row) {
            return row + 1;
        }
    };
    InterfaceRules._sheetP2Sp4Info = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules._sheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    InterfaceRules._sheetP2Sp5Info = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules._sheetKosguRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules._sprDefaultTotalFirstSubtotal,
            InterfaceRules._sprColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetP3Sp3Info = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules._sheetKosguRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules._sprDefaultTotalFirstSubtotal,
            InterfaceRules._sprColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetDailyPayRowCodeInfo = {
        Column: 2,
        Length: InterfaceRules._kosguCodeLength,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 9000;
        }
    };
    InterfaceRules._sheetP2DailyPayInfo = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules._sheetDailyPayRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules._defaultColConstAll,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    InterfaceRules._sheetP3DailyPayInfo = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules._sheetKosguRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules._defaultColConstAll,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F01400.InterfaceRules = InterfaceRules;
})(F01400 || (F01400 = {}));
