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
var F04111;
(function (F04111) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetInvestInfoFormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetInvestInfo);
        };
        InterfaceRules.prototype.SheetInvestInfoCalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetInvestInfo);
        };
        InterfaceRules.prototype.SheetInvestP2InfoFormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetInvestP2Info);
        };
        InterfaceRules.prototype.SheetInvestP2InfoCalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetInvestP2Info);
        };
        InterfaceRules.prototype.SheetPXSp1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetPXSp1Info);
        };
        InterfaceRules.prototype.SheetPXSp1CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetPXSp1Info);
        };
        InterfaceRules.prototype.SheetP4Sp1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP4Sp1Info);
        };
        InterfaceRules.prototype.SheetP4Sp1CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP4Sp1Info);
        };
        InterfaceRules.prototype.SheetP4Sp2SpecCalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP4Sp2SpecInfo);
        };
        InterfaceRules.prototype.SheetP2Sp2SpecCalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP2Sp2SpecInfo);
        };
        InterfaceRules.prototype.SheetP3Sp2SpecCalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP3Sp2SpecInfo);
        };
        InterfaceRules.prototype.F04111SheetP4Sp2CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP4Sp2InvestInfo);
        };
        InterfaceRules.prototype.F04111SheetP4Sp2FormatEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP4Sp2InvestInfo);
        };
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            if (row > lastRow - InterfaceRules._sheetP1RelRowCount - 2) {
                if (column === 2) {
                    return SheetFormatCollection.Calc;
                }
                else if (column > 2) {
                    if (row === lastRow - 1) {
                        return SheetFormatCollection.Free;
                    }
                    else if (row === lastRow) {
                        return SheetFormatCollection.Calc;
                    }
                    else {
                        var relRow = row % InterfaceRules._sheetP1RelRowCount;
                        var lastColumn = this.Document.Sheets.getValue(sheetId).ColumnCount - 1;
                        if (relRow === 2 && column === lastColumn) {
                            return SheetFormatCollection.Default;
                        }
                        else {
                            return SheetFormatCollection.Calc;
                        }
                    }
                }
            }
            else {
                switch (column) {
                    case 0:
                        return SheetFormatCollection.Related;
                    case 1:
                        return SheetFormatCollection.Default;
                    case 2:
                        return SheetFormatCollection.Calc;
                    default:
                        var relRow = row % InterfaceRules._sheetP1RelRowCount;
                        if (relRow === 0) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            var lastColumn = this.Document.Sheets.getValue(sheetId).ColumnCount - 1;
                            if (relRow === 2 && column === lastColumn) {
                                return SheetFormatCollection.Default;
                            }
                            else {
                                return SheetFormatCollection.Related;
                            }
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        InterfaceRules.prototype.SheetP1CalcEventHandler = function (sheetId, row, column, fieldId) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            if (row > lastRow - 2)
                return undefined;
            if (fieldId === BaseObasTableFields.StrCodeField.Id &&
               (row <= lastRow - InterfaceRules._sheetP1RelRowCount - 2)) {
                return this.Document.CommonRules.CalcRelRowCode(row + InterfaceRules._sheetP1RelRowCount - 1, InterfaceRules._sheetP1RelRowCount, {
                    Column: column,
                    Length: 3,
                    LevelIncs: [10, 1],
                    CalcTotalCode: function () {
                        return -1;
                    }
                });
            }
            if (column > 2) {
                var relRow = row % InterfaceRules._sheetP1RelRowCount;
                switch (relRow) {
                    case 0:
                        var calcRes = new SheetCalcResult(BaseFormulas.SUM);
                        for (var i = 1; i < InterfaceRules._sheetP1RelRowCount; i++) {
                            calcRes.AddCoordinates(new CellCoordinate(row + i, column));
                        }
                        return calcRes.ToArray();
                    case 2:
                        var lastColumn = this.Document.Sheets.getValue(sheetId).ColumnCount - 1;
                        if (column === lastColumn) {
                            return ObasHelper.X;
                        }
                }
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            return ((column > 2) && (row === lastRow - 1));
        };
        InterfaceRules.prototype.SheetProjectInfoFormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 2:
                case 4:
                case 5:
                    return SheetFormatCollection.Spr;
                default:
                    return SheetFormatCollection.Free;
            }
        };
        InterfaceRules.prototype.SheetProjectInfoEditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            if (column === 0) {
                return false;
            }
            else {
                return sheet.Table.GetKeyBySourceTable(this.Document.ProjectInfoTable) != null;
            }
        };
        InterfaceRules.prototype.SheetProjectInfoCanDeleteEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            return (column === 0 && sheet.Table.GetKeyBySourceTable(this.Document.CustomerTable) != null) ||
                (column > 0 && sheet.Table.GetKeyBySourceTable(this.Document.ProjectInfoTable) != null);
        };
        InterfaceRules.prototype.SheetP4Sp1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this.Document.Sheets.getValue(sheetId);
            if (column === 0) {
                return false;
            }
            else {
                return sheet.Table.GetKeyBySourceTable(this.Document.ProjectInfoP4Table) != null;
            }
        };
        InterfaceRules.prototype.SetCustomerAcceptedFaip = function () {
            this.Document.CustomerTable.IsAccepted.Value = true;
        };
        InterfaceRules.prototype.SetCustomerNotAcceptedFaip = function () {
            this.Document.CustomerTable.IsAccepted.Value = false;
        };
        InterfaceRules.prototype.SheetP2P3CanEditEventHandler = function (sheetId, row, column, fieldId, levelRow) {
            var table = this.Document.Sheets.getValue(sheetId).Table;
            return table.GetKeyBySourceTable(this.Document.InvestInfoTable) != null;
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._sheetP1RelRowCount = 4;
    InterfaceRules._totalRowName = "Всего";
    InterfaceRules._totalCustomerRowName = "Итого по заказчику";
    InterfaceRules._totalInvestRowName = "Итого по направлению инвестирования";
    InterfaceRules._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._totalCustomerRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalCustomerRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._totalInvestRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalInvestRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._subTotalRowInfos = [
        InterfaceRules._totalCustomerRowInfo, InterfaceRules._totalInvestRowInfo
    ];
    InterfaceRules._relatedColConstAll = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._freeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._sprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules._relatedDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.RelatedOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules._sheetPXSp1CodeInfo = {
        Column: 2,
        Length: 4,
        LevelIncs: [100, 1],
        CalcTotalCode: function () {
            return 9000;
        }
    };
    InterfaceRules._sheetInvestInfo = {
        MaxLevel: 3,
        CodeInfo: {
            Column: 5,
            Length: 3,
            LevelIncs: [900, 100, 1],
            CalcTotalCode: function () {
                return 9900;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    InterfaceRules._sheetInvestP2Info = {
        MaxLevel: 3,
        CodeInfo: {
            Column: 5,
            Length: 3,
            LevelIncs: [900, 100, 1],
            CalcTotalCode: function () {
                return 9900;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    InterfaceRules._sheetPXSp1Info = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules._sheetPXSp1CodeInfo,
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            InterfaceRules._relatedColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    InterfaceRules._sheetP4Sp1Info = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules._sheetPXSp1CodeInfo,
        ColumnsInfo: [
            SheetColumnInfoCollection.FreeColDefaultTotal,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    InterfaceRules._sheetP4Sp2InvestInfo = {
        MaxLevel: 3,
        CodeInfo: {
            Column: 5,
            Length: 3,
            LevelIncs: [900, 100, 1],
            CalcTotalCode: function () {
                return 9900;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    InterfaceRules._sheetP4Sp2SpecInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 4,
            Length: 3,
            LevelIncs: [0, 1],
            CalcTotalCode: function () {
                return 9900;
            }
        },
        ColumnsInfo: [
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.AllDefault
        ]
    };
    InterfaceRules._sheetP2Sp2SpecInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 4,
            Length: 3,
            LevelIncs: [0, 1],
            CalcTotalCode: function () {
                return 9900;
            }
        },
        ColumnsInfo: [
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.AllDefault
        ]
    };
    InterfaceRules._sheetP3Sp2SpecInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 4,
            Length: 3,
            LevelIncs: [0, 1],
            CalcTotalCode: function () {
                return 9900;
            }
        },
        ColumnsInfo: [
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            SheetColumnInfoCollection.SprColAllDefault,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.AllDefault
        ]
    };
    F04111.InterfaceRules = InterfaceRules;
})(F04111 || (F04111 = {}));
