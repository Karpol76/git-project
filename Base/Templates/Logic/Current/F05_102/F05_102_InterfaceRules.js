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
var F05102;
(function (F05102) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Всего";
    InterfaceRules.NotDistributeReserve = "Нераспределенный резерв";
    InterfaceRules.Correction = "\u041A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u043A\u0430 \u0432 \u0441\u0432\u044F\u0437\u0438 \u0441 \u043E\u043A\u0440\u0443\u0433\u043B\u0435\u043D\u0438\u0435\u043C";
    F05102.InterfaceRules = InterfaceRules;

    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 1, 2) || this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            if (column > 0) {
                if (row === 0) {
                    return SheetFormatCollection.Related;
                }
                else if (row === lastRow - 1) {
                    return SheetFormatCollection.Free;
                }
                else if (row === lastRow) {
                    return SheetFormatCollection.Calc;
                }
            }
            return SheetFormatCollection.Default;
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            if (column === 0) {
                if (row === lastRow - 1) {
                    return InterfaceRules.Correction;
                }
                else if (row === lastRow) {
                    return InterfaceRules.TotalRowName;
                }
            }
            else if ((column > 0) && (row === lastRow)) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                result.AddCoordinates(new CellCoordinate(row, column));
                for (var i = 0; i < row; i++) {
                    result.AddCoordinates(new CellCoordinate(i, column));
                }
                return result.ToArray();
            }
            return undefined;
        };
        return P1Sheet;
    }(YearsSheetTyped));
    F05102.P1Sheet = P1Sheet;

    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document) {
            return _super.call(this, id, document, 1, 2) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsDataColumn(column)) {
                    if (this.IsTotalRow(row)) {
                        return SheetFormatCollection.Free;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Free;
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (column === 1 && !isFooter) {
                return ObasHelper.FillWithCharacter((row + 1), 3);
            }
            else if (isFooter) {
                if (this.IsTotalRow(row)) {
                    if (column === this.RowNameColumn) {
                        return InterfaceRules.TotalRowName;
                    }
                    else if (column === this.RowCodeColumn) {
                        return "900";
                    }
                }
                else {
                    if (column === this.RowNameColumn) {
                        return InterfaceRules.NotDistributeReserve;
                    }
                    else if (column === this.RowCodeColumn) {
                        return "800";
                    }
                    else if (this.IsColumnInDataBlock(column, 0) && row > 0) {
                        var result = new SheetCalcResult(BaseFormulas.SUB);
                        result.AddCoordinates(new CellCoordinate(row + 1, column));
                        for (var i = 0; i < row; i++) {
                            result.AddCoordinates(new CellCoordinate(i, column));
                        }
                        return result.ToArray();
                    }
                }
                return undefined;
            }
        };
        P2Sheet.prototype.AddEditorEventHandler = function (sheetId, row, column, fieldId, lvl, editorId) {
            return this.EditorIdEventHandler() === editorId;
        };
        P2Sheet.prototype.EditorIdEventHandler = function () {
            var keyDic = this.Document.GetKeyDictionary();
            switch (keyDic) {
                case F05102.KeyDictionary.Subject:
                    return "F05_102_R2_Subject_Editor";
                case F05102.KeyDictionary.ScienceCity:
                    return "F05_102_R2_TownName_Editor";
                case F05102.KeyDictionary.Zato:
                    return "F05_102_R2_SecurityAdmTerrEntityName_Editor";
                case F05102.KeyDictionary.Municipal:
                    return "F05_102_R2_MunicipalEntityName_Editor";
                default: return "";
            }
        };
        return P2Sheet;
    }(YearsSheetTyped));
    F05102.P2Sheet = P2Sheet;
})(F05102 || (F05102 = {}));
