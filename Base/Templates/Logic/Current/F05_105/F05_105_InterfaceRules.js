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
var F05105;
(function (F05105) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05105.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 0) || this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === this.RowCodeColumn) {
                return SheetFormatCollection.Default;
            }
            else {
                return SheetFormatCollection.Related;
            }
        };
        return P1Sheet;
    }(YearsSheet));
    F05105.P1Sheet = P1Sheet;
    var P2SheetRows;
    (function (P2SheetRows) {
        P2SheetRows[P2SheetRows["FotCalced"] = 0] = "FotCalced";
        P2SheetRows[P2SheetRows["IsuranceCalced"] = 1] = "IsuranceCalced";
        P2SheetRows[P2SheetRows["OtherCalced"] = 2] = "OtherCalced";
        P2SheetRows[P2SheetRows["Communication"] = 3] = "Communication";
        P2SheetRows[P2SheetRows["Transport"] = 4] = "Transport";
        P2SheetRows[P2SheetRows["Utilities"] = 5] = "Utilities";
        P2SheetRows[P2SheetRows["Travel"] = 6] = "Travel";
        P2SheetRows[P2SheetRows["FixedAssets"] = 7] = "FixedAssets";
        P2SheetRows[P2SheetRows["Inventories"] = 8] = "Inventories";
        P2SheetRows[P2SheetRows["TotalCalced"] = 9] = "TotalCalced";
    })(P2SheetRows || (P2SheetRows = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case this.RowNameColumn:
                case this.RowCodeColumn:
                    return SheetFormatCollection.Default;
                default:
                    switch (row) {
                        case P2SheetRows.FotCalced:
                        case P2SheetRows.IsuranceCalced:
                            return SheetFormatCollection.Related;
                        case P2SheetRows.OtherCalced:
                        case P2SheetRows.TotalCalced:
                            return SheetFormatCollection.Calc;
                        default:
                            return SheetFormatCollection.Free;
                    }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if ((row === P2SheetRows.OtherCalced) && this.IsDataColumn(column)) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                for (var i = row + 1, count = this.RowCount - 1; i < count; i++) {
                    result.AddCoordinates(new CellCoordinate(i, column));
                }
                return result.ToArray();
            }
            return undefined;
        };
        P2Sheet.IsUserEditRow = function (row) {
            return P2SheetRows[row].indexOf("Calced") === -1;
        };
        P2Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.IsDataColumn(column) && P2Sheet.IsUserEditRow(row);
        };
        return P2Sheet;
    }(YearsSheet));
    F05105.P2Sheet = P2Sheet;
    var P3GroupSheetColumns;
    (function (P3GroupSheetColumns) {
        P3GroupSheetColumns[P3GroupSheetColumns["PayName"] = 0] = "PayName";
        P3GroupSheetColumns[P3GroupSheetColumns["Count"] = 1] = "Count";
        P3GroupSheetColumns[P3GroupSheetColumns["PayValue"] = 2] = "PayValue";
        P3GroupSheetColumns[P3GroupSheetColumns["Total"] = 3] = "Total";
        P3GroupSheetColumns[P3GroupSheetColumns["AssistCount"] = 4] = "AssistCount";
    })(P3GroupSheetColumns || (P3GroupSheetColumns = {}));
    var P3GroupSheet = (function (_super) {
        __extends(P3GroupSheet, _super);
        function P3GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case P3GroupSheetColumns.PayName:
                    return SheetFormatCollection.Default;
                case P3GroupSheetColumns.Total:
                    return SheetFormatCollection.Calc;
                default:
                    return SheetFormatCollection.Free;
            }
        };
        return P3GroupSheet;
    }(YearGroupSheet));
    F05105.P3GroupSheet = P3GroupSheet;
})(F05105 || (F05105 = {}));
