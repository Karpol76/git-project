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
var F03320;
(function (F03320) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                    return SheetFormatCollection.Default;
                default:
                    return SheetFormatCollection.Related;
            }
        };
        InterfaceRules.prototype.SheetP3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                case 4:
                case 5:
                    return SheetFormatCollection.Spr;
                default:
                    return SheetFormatCollection.Free;
            }
        };
        InterfaceRules.prototype.FilterRecipientsSprTable = function () {
            var pnoSpr = ObasTableCollection.PnoSprTable;
            return ObasTableCollection.RecipientCategorySprTable.RecordKey.Value ===
                pnoSpr.RecipientCategory.LookupByKeys(this.Document.PnoDataTable.Pno.ForeignKey.Value);
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    F03320.InterfaceRules = InterfaceRules;
    var P2HierarchyYearGroupSheet = (function (_super) {
        __extends(P2HierarchyYearGroupSheet, _super);
        function P2HierarchyYearGroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return P2HierarchyYearGroupSheet;
    }(HierarchyYearGroupSheet));
    P2HierarchyYearGroupSheet._totalRowInfo = {
        IsCalculated: false,
        Name: "Всего",
        Format: SheetFormatCollection.Default
    };
    P2HierarchyYearGroupSheet._totalPnoRowInfo = {
        IsCalculated: false,
        Name: "Итого по публичному нормативному обязательству",
        Format: SheetFormatCollection.Default
    };
    P2HierarchyYearGroupSheet._totalRecipientCat = {
        IsCalculated: false,
        Name: "Итого по категории получателя",
        Format: SheetFormatCollection.Default
    };
    P2HierarchyYearGroupSheet._totalSubRows = [P2HierarchyYearGroupSheet._totalPnoRowInfo, P2HierarchyYearGroupSheet._totalRecipientCat];
    P2HierarchyYearGroupSheet._SprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: P2HierarchyYearGroupSheet._totalSubRows,
        TotalRow: P2HierarchyYearGroupSheet._totalRowInfo
    };
    P2HierarchyYearGroupSheet._SprColFirstConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: SheetRowInfoCollection.SprOnlyFormatRow,
        TotalRow: SheetRowInfoCollection.Default
    };
    P2HierarchyYearGroupSheet._SprColSecondConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.SprOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    var P2GroupSheetSp1 = (function (_super) {
        __extends(P2GroupSheetSp1, _super);
        function P2GroupSheetSp1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2GroupSheetSp1.prototype, "SheetInfo", {
            get: function () {
                return P2GroupSheetSp1._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P2GroupSheetSp1;
    }(P2HierarchyYearGroupSheet));
    P2GroupSheetSp1._RelatedColConstAll = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: P2GroupSheetSp1._totalPnoRowInfo,
        TotalRow: P2GroupSheetSp1._totalRowInfo
    };
    P2GroupSheetSp1._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 2,
            Length: 5,
            LevelIncs: [100, 1],
            CalcTotalCode: function () {
                return 90100;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColAllDefault,
            P2GroupSheetSp1._RelatedColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    F03320.P2GroupSheetSp1 = P2GroupSheetSp1;
    var P2GroupSheetSp2 = (function (_super) {
        __extends(P2GroupSheetSp2, _super);
        function P2GroupSheetSp2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2GroupSheetSp2.prototype, "SheetInfo", {
            get: function () {
                return P2GroupSheetSp2._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P2GroupSheetSp2;
    }(P2HierarchyYearGroupSheet));
    P2GroupSheetSp2._sheetInfo = {
        MaxLevel: 3,
        CodeInfo: {
            Column: 3,
            Length: 7,
            LevelIncs: [10000, 100, 1],
            CalcTotalCode: function () {
                return 90100;
            }
        },
        ColumnsInfo: [
            P2GroupSheetSp2._SprColFirstConstAll,
            P2GroupSheetSp2._SprColSecondConstAll,
            P2GroupSheetSp2._SprColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F03320.P2GroupSheetSp2 = P2GroupSheetSp2;
})(F03320 || (F03320 = {}));
