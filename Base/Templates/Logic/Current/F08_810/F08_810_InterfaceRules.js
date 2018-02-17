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
var F08810;
(function (F08810) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._sheetP1RelRowCount = 4;
    InterfaceRules._totalRow = {
        IsCalculated: false,
        Name: "Всего",
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._totalRowItog = {
        IsCalculated: false,
        Name: "Итого",
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._sheetRelatedPokInfo = {
        Cell: { Type: SheetCellTypes.Related },
        TotalRow: InterfaceRules._totalRow,
        SubTotalRow: InterfaceRules._totalRow
    };
    InterfaceRules._sheetFreePokInfo = {
        Cell: { Type: SheetCellTypes.Free },
        TotalRow: InterfaceRules._totalRow,
        SubTotalRow: InterfaceRules._totalRow
    };
    F08810.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document, readOnly) {
            if (readOnly === void 0) { readOnly = true; }
            var _this = _super.call(this, id, readOnly) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.CalcRelRowCode = function (row, relRowCount, info) {
            var relRow = (row + 1) % relRowCount;
            if (relRow === 0) {
                relRow = relRowCount;
                relRowCount++;
            }
            var relRow2 = ((row) / (relRowCount)) | 0;
            var code = relRow2 * info.LevelIncs[0];
            code += relRow + info.LevelIncs[1];
            return ObasHelper.FillWithCharacter(code, info.Length);
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column >= 2) {
                var relRow = (row + 1) % InterfaceRules._sheetP1RelRowCount;
                if (relRow === 0) {
                    var result = new SheetCalcResult(BaseFormulas.SUM);
                    for (var i = 1; i < InterfaceRules._sheetP1RelRowCount; i++) {
                        result.AddCoordinates(new CellCoordinate(row - i, column));
                    }
                    return result.ToArray();
                }
            }
            else if (fieldId === BaseObasTableFields.StrCodeField.Id &&
                !this._document.CommonRules.IsFooterRow(sheetId, row, InterfaceRules._sheetP1RelRowCount)) {
                return this.CalcRelRowCode(row, InterfaceRules._sheetP1RelRowCount, P1Sheet._sheetP1CodeInfo);
            }
            return undefined;
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column > 1) {
                var relRow = (row + 1) % InterfaceRules._sheetP1RelRowCount;
                if (relRow === 3) {
                    return SheetFormatCollection.Free;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else if (column < 1 &&
                !this._document.CommonRules.IsFooterRow(sheetId, row, InterfaceRules._sheetP1RelRowCount)) {
                return SheetFormatCollection.Related;
            }
            return undefined;
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var relRow = (row + 1) % InterfaceRules._sheetP1RelRowCount;
            return ((column > 1) && (relRow === 3));
        };
        return P1Sheet;
    }(Sheet));
    P1Sheet._sheetP1CodeInfo = {
        Column: 4,
        Length: 5,
        LevelIncs: [1, 1],
        CalcTotalCode: function () {
            return 99999;
        }
    };
    F08810.P1Sheet = P1Sheet;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2Sheet.prototype, "SheetInfo", {
            get: function () {
                return P2Sheet._sheetP2Info;
            },
            enumerable: true,
            configurable: true
        });
        return P2Sheet;
    }(HierarchyYearGroupSheet));
    P2Sheet._sheetP2Info = {
        MaxLevel: 1,
        CodeInfo: {
            Column: 1,
            Length: 5,
            LevelIncs: [1, 1],
            CalcTotalCode: function () {
                return 90100;
            }
        },
        ColumnsInfo: [
            InterfaceRules._sheetRelatedPokInfo,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    F08810.P2Sheet = P2Sheet;
    var P2GroupSheet = (function (_super) {
        __extends(P2GroupSheet, _super);
        function P2GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2GroupSheet.prototype, "SheetInfo", {
            get: function () {
                return P2GroupSheet._sheetP2Sp1Info;
            },
            enumerable: true,
            configurable: true
        });
        return P2GroupSheet;
    }(HierarchyYearGroupSheet));
    P2GroupSheet._sheetCol6Info = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUB],
            SourceColumns: [1, 4]
        },
        TotalRow: SheetRowInfoCollection.Default,
        SubTotalRow: SheetRowInfoCollection.Default
    };
    P2GroupSheet._sheetCol9Info = {
        Cell: {
            Type: SheetCellTypes.Calc
        },
        TotalRow: SheetRowInfoCollection.Default,
        SubTotalRow: SheetRowInfoCollection.Default
    };
    P2GroupSheet._sheetCol12Info = {
        Cell: {
            Type: SheetCellTypes.Free
        },
        TotalRow: InterfaceRules._totalRowItog,
        SubTotalRow: InterfaceRules._totalRowItog
    };
    P2GroupSheet._sheetP2Sp1Info = {
        MaxLevel: 1,
        CodeInfo: {
            Column: 12,
            Length: 5,
            LevelIncs: [1, 1],
            CalcTotalCode: function () {
                return 90100;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.FreeColDefaultTotal,
            SheetColumnInfoCollection.FreeColDefaultTotal,
            SheetColumnInfoCollection.FreeColDefaultTotal,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.FreeColDefaultTotal,
            P2GroupSheet._sheetCol6Info,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.FreeColDefaultTotal,
            P2GroupSheet._sheetCol9Info,
            SheetColumnInfoCollection.SprColAllDefault,
            SheetColumnInfoCollection.FreeColDefaultTotal,
            P2GroupSheet._sheetCol12Info,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F08810.P2GroupSheet = P2GroupSheet;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P3Sheet.prototype, "SheetInfo", {
            get: function () {
                return P3Sheet._sheetP3Info;
            },
            enumerable: true,
            configurable: true
        });
        return P3Sheet;
    }(HierarchyYearGroupSheet));
    P3Sheet._sheetP3Info = {
        MaxLevel: 1,
        CodeInfo: {
            Column: 2,
            Length: 5,
            LevelIncs: [1, 1],
            CalcTotalCode: function () {
                return 90100;
            }
        },
        ColumnsInfo: [
            InterfaceRules._sheetRelatedPokInfo,
            SheetColumnInfoCollection.RelatedColAllX,
            SheetColumnInfoCollection.CalcColFormatOnly,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    F08810.P3Sheet = P3Sheet;
    var P3GroupSheet = (function (_super) {
        __extends(P3GroupSheet, _super);
        function P3GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P3GroupSheet.prototype, "SheetInfo", {
            get: function () {
                return P3GroupSheet._sheetP3Sp1Info;
            },
            enumerable: true,
            configurable: true
        });
        return P3GroupSheet;
    }(HierarchyYearGroupSheet));
    P3GroupSheet._sheetP3Sp1Info = {
        MaxLevel: 1,
        CodeInfo: {
            Column: 22,
            Length: 5,
            LevelIncs: [1, 1],
            CalcTotalCode: function () {
                return 90100;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.SprColAllDefault,
            InterfaceRules._sheetFreePokInfo,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    F08810.P3GroupSheet = P3GroupSheet;
})(F08810 || (F08810 = {}));
