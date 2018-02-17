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
var F03310;
(function (F03310) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.P2FilterOkpd = function () {
            return ObasTableCollection.OkpdSprTable.IsCorrectRecord(this.Document.Settings.ActiveYear);
        };
        InterfaceRules.prototype.P3FilterOkpd = function () {
            return ObasTableCollection.OkpdSprTable.IsCorrectDetailedRecord(this.Document.Settings.ActiveYear);
        };
        InterfaceRules.prototype.FilterRecipientsSprTable = function () {
            var pnoSpr = ObasTableCollection.PnoSprTable;
            return ObasTableCollection.RecipientCategorySprTable.RecordKey.Value ===
                pnoSpr.RecipientCategory.LookupByKeys(this.Document.PnoDataTable.Pno.ForeignKey.Value);
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._totalRowName = "Всего";
    InterfaceRules._totalPnoRowName = "Итого по публичному обязательству";
    InterfaceRules._totalCategoryRowName = "Итого по категории получателей";
    InterfaceRules._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._totalPnoRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalPnoRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._totalCategotyRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalCategoryRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._subTotalRowInfos = [
        InterfaceRules._totalPnoRowInfo, InterfaceRules._totalCategotyRowInfo
    ];
    InterfaceRules.SprDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.Default],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.Spr2DefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.SprOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.Spr1DefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: [SheetRowInfoCollection.SprOnlyFormatRow, SheetRowInfoCollection.SprOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.FreeDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.Default],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.RelatedDefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.Default],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.Related1DefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: [SheetRowInfoCollection.RelatedOnlyFormatRow, SheetRowInfoCollection.RelatedOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.Related2DefaultTotalFirstSubtotal = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.RelatedOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    InterfaceRules.SprColConstAll = {
        Cell: { Type: SheetCellTypes.Spr },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules.FreeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules.RelatedColConstAll = {
        Cell: { Type: SheetCellTypes.Related },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    InterfaceRules.SheetRowCodeInfo = {
        Column: 5,
        Length: 7,
        LevelIncs: [10000, 100, 1],
        CalcTotalCode: function () {
            return 9010100;
        }
    };
    InterfaceRules.P3Sp1SheetRowCodeInfo = {
        Column: 6,
        Length: 7,
        LevelIncs: [10000, 100, 1],
        CalcTotalCode: function () {
            return 9010100;
        }
    };
    F03310.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            return _super.call(this, id, _document, 1) || this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.RowCodeColumn === column) {
                return SheetFormatCollection.Default;
            }
            else {
                return SheetFormatCollection.Related;
            }
        };
        return P1Sheet;
    }(YearsSheet));
    F03310.P1Sheet = P1Sheet;
    var P2HierarchySheet = (function (_super) {
        __extends(P2HierarchySheet, _super);
        function P2HierarchySheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2HierarchySheet.prototype, "SheetInfo", {
            get: function () {
                return P2HierarchySheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P2HierarchySheet;
    }(HierarchyYearGroupSheet));
    P2HierarchySheet._sheetInfo = {
        MaxLevel: 3,
        CodeInfo: InterfaceRules.SheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules.Related1DefaultTotalFirstSubtotal,
            InterfaceRules.Related2DefaultTotalFirstSubtotal,
            InterfaceRules.RelatedDefaultTotalFirstSubtotal,
            InterfaceRules.RelatedDefaultTotalFirstSubtotal,
            InterfaceRules.RelatedColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc,
            SheetColumnInfoCollection.RelatedColAllCalc
        ]
    };
    F03310.P2HierarchySheet = P2HierarchySheet;
    var P3Sp1HierarchySheet = (function (_super) {
        __extends(P3Sp1HierarchySheet, _super);
        function P3Sp1HierarchySheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P3Sp1HierarchySheet.prototype, "SheetInfo", {
            get: function () {
                return P3Sp1HierarchySheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P3Sp1HierarchySheet;
    }(HierarchyYearGroupSheet));
    P3Sp1HierarchySheet._sheetInfo = {
        MaxLevel: 3,
        CodeInfo: InterfaceRules.P3Sp1SheetRowCodeInfo,
        ColumnsInfo: [
            InterfaceRules.Spr1DefaultTotalFirstSubtotal,
            InterfaceRules.Spr2DefaultTotalFirstSubtotal,
            InterfaceRules.SprDefaultTotalFirstSubtotal,
            InterfaceRules.SprDefaultTotalFirstSubtotal,
            InterfaceRules.FreeDefaultTotalFirstSubtotal,
            InterfaceRules.FreeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    F03310.P3Sp1HierarchySheet = P3Sp1HierarchySheet;
})(F03310 || (F03310 = {}));
