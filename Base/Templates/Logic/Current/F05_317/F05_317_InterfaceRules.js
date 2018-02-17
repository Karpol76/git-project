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
var F05317;
(function (F05317) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._totalRow = {
        IsCalculated: false,
        Name: "Итого",
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._sheetSprPokInfo = {
        Cell: { Type: SheetCellTypes.Spr },
        TotalRow: InterfaceRules._totalRow,
        SubTotalRow: InterfaceRules._totalRow
    };
    F05317.InterfaceRules = InterfaceRules;
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
        P3Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return column > 0;
        };
        return P3Sheet;
    }(HierarchyYearGroupSheet));
    P3Sheet._sheetP3Info = {
        MaxLevel: 1,
        CodeInfo: {
            Column: 1,
            Length: 3,
            LevelIncs: [1],
            CalcTotalCode: function () {
                return 900;
            }
        },
        ColumnsInfo: [
            InterfaceRules._sheetSprPokInfo,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F05317.P3Sheet = P3Sheet;
})(F05317 || (F05317 = {}));
