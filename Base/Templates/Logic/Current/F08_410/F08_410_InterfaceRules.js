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
var F08410;
(function (F08410) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            var lastColumn = this.Document.Sheets.getValue(sheetId).ColumnCount - 1;
            if (column > 1) {
                if ((row === 0) || (row === lastRow)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    if ((row === lastRow - 2 || row === lastRow - 3) && column === lastColumn) {
                        return SheetFormatCollection.Default;
                    }
                    else if (row === lastRow - 1) {
                        return SheetFormatCollection.Free;
                    }
                    else {
                        return SheetFormatCollection.Related;
                    }
                }
            }
            return SheetFormatCollection.Default;
        };
        InterfaceRules.prototype.SheetP1CalcEventHandler = function (sheetId, row, column, fieldId) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            var lastColumn = this.Document.Sheets.getValue(sheetId).ColumnCount - 1;
            if ((row === lastRow - 2 || row === lastRow - 3) && column === lastColumn) {
                return ObasHelper.X;
            }
            return undefined;
        };
        InterfaceRules.prototype.SheetP1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            return ((column > 1) && (row === lastRow - 1));
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
        InterfaceRules.prototype.SheetInvestInfoPxSp2Sp1Sp1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetInvestInfoPxSP2Sp1Sp1);
        };
        InterfaceRules.prototype.SheetInvestInfoPxSp2Sp1Sp1CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetInvestInfoPxSP2Sp1Sp1);
        };
        InterfaceRules.prototype.SheetP4Sp1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP4Sp1Info);
        };
        InterfaceRules.prototype.SheetP4Sp1CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP4Sp1Info);
        };
        InterfaceRules.prototype.F08410SheetP4Sp2FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, InterfaceRules._sheetP4Sp2InvestInfo);
        };
        InterfaceRules.prototype.F08410SheetP4Sp2CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, InterfaceRules._sheetP4Sp2InvestInfo);
        };
        return InterfaceRules;
    }(F04111.InterfaceRules));
    InterfaceRules._sheetP4Sp2SpecInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 3,
            Length: 3,
            LevelIncs: [0, 1],
            CalcTotalCode: function () {
                return 9900;
            }
        },
        ColumnsInfo: [
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._relatedDefaultTotalFirstSubtotal,
            InterfaceRules._sprColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllX,
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
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.AllDefault
        ]
    };
    InterfaceRules._sheetInvestInfoPxSP2Sp1Sp1 = {
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
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    InterfaceRules._sheetP4Sp1Info = {
        MaxLevel: 2,
        CodeInfo: InterfaceRules._sheetPXSp1CodeInfo,
        ColumnsInfo: [
            SheetColumnInfoCollection.FreeColDefaultTotal,
            InterfaceRules._freeColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    InterfaceRules._sheetP4Sp2InvestInfo = {
        MaxLevel: 3,
        CodeInfo: {
            Column: 4,
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
            InterfaceRules._sprColConstAll,
            SheetColumnInfoCollection.CalcColFormatOnly,
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
    F08410.InterfaceRules = InterfaceRules;
})(F08410 || (F08410 = {}));
