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
var F01110;
(function (F01110) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.CodeInfo = {
        Column: 2,
        Length: 5,
        LevelIncs: [1, 1],
        CalcTotalCode: function () {
            return 90010;
        }
    };
    InterfaceRules.TotalRowName = "Всего";
    F01110.InterfaceRules = InterfaceRules;
    var P1SheetRows;
    (function (P1SheetRows) {
        P1SheetRows[P1SheetRows["Fot"] = 0] = "Fot";
        P1SheetRows[P1SheetRows["OnlyIns"] = 1] = "OnlyIns";
        P1SheetRows[P1SheetRows["Total"] = 2] = "Total";
    })(P1SheetRows || (P1SheetRows = {}));
    var TotalSheetColumnBlocks;
    (function (TotalSheetColumnBlocks) {
        TotalSheetColumnBlocks[TotalSheetColumnBlocks["Total"] = 0] = "Total";
        TotalSheetColumnBlocks[TotalSheetColumnBlocks["Fot"] = 1] = "Fot";
        TotalSheetColumnBlocks[TotalSheetColumnBlocks["Insurance"] = 2] = "Insurance";
    })(TotalSheetColumnBlocks || (TotalSheetColumnBlocks = {}));
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P1Sheet.prototype.IsXCell = function (row, column) {
            return row === P1SheetRows.OnlyIns && this.IsColumnInDataBlock(column, TotalSheetColumnBlocks.Fot);
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case this.RowNameColumn:
                case this.RowCodeColumn:
                    return SheetFormatCollection.Default;
                default:
                    if (this.Document.CommonRules.IsFooterRow(this, row) || this.IsColumnInDataBlock(column, TotalSheetColumnBlocks.Total)) {
                        return SheetFormatCollection.Calc;
                    }
                    else if (!this.IsColumnInDataBlock(column, TotalSheetColumnBlocks.Total) && row === (this.RowCount - 2)) {
                        return SheetFormatCollection.Free;
                    }
                    else if (this.IsXCell(row, column)) {
                        return SheetFormatCollection.Default;
                    }
                    else {
                        return SheetFormatCollection.Related;
                    }
            }
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsXCell(row, column)) {
                return ObasHelper.X;
            }
            return undefined;
        };
        P1Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.Document.CommonRules.CalcColumnCaption(index, this.CalcStartBlockColumn(TotalSheetColumnBlocks.Fot) + 1, 2);
        };

        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return (!this.IsColumnInDataBlock(column, TotalSheetColumnBlocks.Total) && row === (this.RowCount - 2));
        };

        return P1Sheet;
    }(YearsSheet));
    F01110.P1Sheet = P1Sheet;
    var P2Sp3GroupSheet = (function () {
        function P2Sp3GroupSheet(_document) {
            this._document = _document;
        }
        P2Sp3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this._document.CommonRules.StandardCalc(sheetId, row, column, P2Sp3GroupSheet._sheetInfo);
        };
        P2Sp3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this._document.CommonRules.StandardFormat(sheetId, row, column, P2Sp3GroupSheet._sheetInfo);
        };
        P2Sp3GroupSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            if (column > 1) {
                return false;
            }
            else {
                return this._document.CommonRules
                    .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
            }
        };
        return P2Sp3GroupSheet;
    }());
    P2Sp3GroupSheet._sheetInfo = {
        MaxLevel: 1,
        CodeInfo: InterfaceRules.CodeInfo,
        ColumnsInfo: [
            SheetColumnInfoCollection.SprColAllDefault,
            {
                Cell: { Type: SheetCellTypes.Spr },
                TotalRow: {
                    IsCalculated: false,
                    Name: InterfaceRules.TotalRowName,
                    Format: SheetFormatCollection.Default
                },
                SubTotalRow: SheetRowInfoCollection.SprOnlyFormatRow
            },
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
    F01110.P2Sp3GroupSheet = P2Sp3GroupSheet;
})(F01110 || (F01110 = {}));
