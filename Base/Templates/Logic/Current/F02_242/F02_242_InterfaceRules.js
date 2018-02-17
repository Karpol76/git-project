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
var F02242;
(function (F02242) {
    var SheetP3Sp2RelColumns;
    (function (SheetP3Sp2RelColumns) {
        SheetP3Sp2RelColumns[SheetP3Sp2RelColumns["Current"] = 0] = "Current";
        SheetP3Sp2RelColumns[SheetP3Sp2RelColumns["Plan1"] = 1] = "Plan1";
        SheetP3Sp2RelColumns[SheetP3Sp2RelColumns["Plan2"] = 2] = "Plan2";
    })(SheetP3Sp2RelColumns || (SheetP3Sp2RelColumns = {}));
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, 5);
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 1:
                    return SheetFormatCollection.Default;
                default:
                    return SheetFormatCollection.Related;
            }
        };
        InterfaceRules.prototype.SheetP2FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP2Info);
        };
        InterfaceRules.prototype.SheetP2CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, 5);
            }
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP2Info);
        };
        InterfaceRules.prototype.SheetP2EditCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return column > 0;
        };
        InterfaceRules.prototype.Sheet4FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheet4Info);
        };
        InterfaceRules.prototype.Sheet4CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, 5);
            }
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheet4Info);
        };
        InterfaceRules.prototype.GetValueSheet = function (sheet, row, column) {
            return ObasHelper.ConvertToNumber(sheet
                .GetCellValue(row, column, true));
        };
        InterfaceRules.prototype.Sheet4EditCellEventHandler = function (sheetId, row, column, fieldId, rowLevel, oldValue, newValue) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            var message = null;
            if (column > 10 && column < 20) {
                var relColsCount = ObasHelper.GetEnumLength(SheetP3Sp2RelColumns);
                var relColumn = (column - 11) % relColsCount;
                var partData = 0;
                var totalData = 0;
                if (column < 14) {
                    partData = this.GetValueSheet(sheet, row, column + relColsCount)
                        + this.GetValueSheet(sheet, row, column + relColsCount * 2);
                    totalData = newValue || 0;
                }
                else {
                    if (column < 17) {
                        partData = this.GetValueSheet(sheet, row, column + relColsCount) + (newValue || 0);
                        totalData = this.GetValueSheet(sheet, row, column + relColsCount * (-1));
                    }
                    else {
                        partData = this.GetValueSheet(sheet, row, column + relColsCount * (-1)) + (newValue || 0);
                        totalData = this.GetValueSheet(sheet, row, column + relColsCount * (-2));
                    }
                }
                if (totalData < partData) {
                    message = "\u0421\u0443\u043C\u043C\u0430 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432 I \u0438 III \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u044E\u0442 \u0438\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u0440\u0430\u0441\u0445\u043E\u0434 \u043F\u043E " + (this.Document.Settings.StartYear + relColumn) + " \u0433\u043E\u0434\u0443!";
                }
            }
            if (message) {
                Client.ShowMessage("Ошибка", message, MessageIcons.Error);
                return false;
            }
            else {
                return ObasHelper.ConstraintYearEditCellHandler(sheetId, row, column, fieldId, rowLevel, oldValue, newValue);
            }
        };
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
                return ObasHelper.FillWithCharacter(row + 1, 5);
            }
            return undefined;
        };
        InterfaceRules.prototype.Sheet5CanAddEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return column > 6;
        };
        InterfaceRules.prototype.Sheet5CanEditEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var table = this.Document.Sheets.getValue(sheetId).Table;
            return table.GetKeyBySourceTable(this.Document.Ref1ObjDescTable) != null;
        };
        InterfaceRules.prototype.FilterOkpd = function () {
            return ObasTableCollection.OkpdSprTable.IsCorrectDetailedRecord(this.Document.Settings.ActiveYear);
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._sheetP1RelRowCount = 1;
    InterfaceRules._totalInformActionRowName = "Итого по мероприятию";
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
    InterfaceRules._totalInfoRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalInformActionRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._subTotalRowInfos = [InterfaceRules._totalInfoRowInfo, InterfaceRules._totalKosguRowInfo];
    InterfaceRules._sprDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: [
            SheetRowInfoCollection.SprOnlyFormatRow, SheetRowInfoCollection.SprOnlyFormatRow,
            SheetRowInfoCollection.SprOnlyFormatRow
        ],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules._sprDefaultTotalSecondSubtotal = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: [
            SheetRowInfoCollection.Default, SheetRowInfoCollection.SprOnlyFormatRow, SheetRowInfoCollection.SprOnlyFormatRow
        ],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules._relatedDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: [
            SheetRowInfoCollection.Default, SheetRowInfoCollection.RelatedOnlyFormatRow,
            SheetRowInfoCollection.RelatedOnlyFormatRow
        ],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules._relatedDefaultTotalSecondSubtotal = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: [
            SheetRowInfoCollection.Default, SheetRowInfoCollection.Default,
            SheetRowInfoCollection.RelatedOnlyFormatRow
        ],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules._sprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._freeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._RelatedColConstAll = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._fakeSheetRowCodeInfo = {
        Column: -1,
        Length: -1,
        LevelIncs: [-1],
        CalcTotalCode: function () {
            return -1;
        }
    };
    InterfaceRules._sheetP2Info = {
        MaxLevel: 3,
        CodeInfo: InterfaceRules._fakeSheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalSecondSubtotal,
            InterfaceRules._relatedDefaultTotalSecondSubtotal,
            SheetColumnInfoCollection.RelatedColAllDefault,
            SheetColumnInfoCollection.RelatedColAllDefault,
            InterfaceRules._RelatedColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    InterfaceRules._sheet4Info = {
        MaxLevel: 3,
        CodeInfo: InterfaceRules._fakeSheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules._sprDefaultTotalFirstSubtotal,
            InterfaceRules._sprDefaultTotalFirstSubtotal,
            InterfaceRules._sprDefaultTotalFirstSubtotal,
            InterfaceRules._sprDefaultTotalFirstSubtotal,
            InterfaceRules._sprDefaultTotalSecondSubtotal,
            InterfaceRules._sprDefaultTotalSecondSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.FreeColAllDefault,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
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
    F02242.InterfaceRules = InterfaceRules;
    var SheetF = (function (_super) {
        __extends(SheetF, _super);
        function SheetF(id, Document, _okpdDataTable) {
            var _this = _super.call(this, id, false) || this;
            _this.Document = Document;
            _this._okpdDataTable = _okpdDataTable;
            _this._okpdEditor = null;
            _this._okpEditor = null;
            return _this;
        }
        Object.defineProperty(SheetF.prototype, "OkpEditor", {
            get: function () {
                if (this._okpEditor == null) {
                    this._okpEditor = this.Document.Editors.getValue(this.Id + "_OKP_Editor_L2");
                }
                return this._okpEditor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SheetF.prototype, "OkpdEditor", {
            get: function () {
                if (this._okpdEditor == null) {
                    this._okpdEditor = this.Document.Editors.getValue(this.Id + "_OKPD_Editor_L2");
                }
                return this._okpdEditor;
            },
            enumerable: true,
            configurable: true
        });
        SheetF.prototype.GetCallEditorIDEventHandler = function (sheetId, row, column, fieldId, rowLevel, tableId) {
            if (tableId === this._okpdDataTable.Id) {
                if (column === 7 || column === 8) {
                    var sheet = this.Document.Sheets.getValue(sheetId);
                    var key = sheet.Table.GetKeyBySourceTable(this._okpdDataTable);
                    this._okpdDataTable.Locate(this._okpdDataTable.RecordKey.Id, key);
                    if (this._okpdDataTable.IsOkpd) {
                        return this.OkpdEditor.Id;
                    }
                    else {
                        return this.OkpEditor.Id;
                    }
                }
            }
            return undefined;
        };
        return SheetF;
    }(Sheet));
    F02242.SheetF = SheetF;
})(F02242 || (F02242 = {}));
