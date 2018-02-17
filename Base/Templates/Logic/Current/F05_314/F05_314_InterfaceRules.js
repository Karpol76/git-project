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
var F05314;
(function (F05314) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05314.InterfaceRules = InterfaceRules;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row) && this.IsDataColumn(column)) {
                return this.Document.CommonRules.GetFooterSum(this, row, column);
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return P2Sheet;
    }(SubsidiesSubventions.P2Sheet));
    F05314.P2Sheet = P2Sheet;
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P4Sheet.prototype, "SheetInfo", {
            get: function () {
                return P4Sheet._sheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P4Sheet;
    }(HierarchyYearGroupSheet));
    P4Sheet._sheetInfo = {
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
            SheetColumnInfoCollection.SprColDefaultTotal,
            {
                Cell: { Type: SheetCellTypes.Spr },
                TotalRow: {
                    IsCalculated: false,
                    Name: "Всего",
                    Format: SheetFormatCollection.Default
                },
                SubTotalRow: {
                    IsCalculated: false,
                    Name: "Итого по субъекту Российской Федерации",
                    Format: SheetFormatCollection.Default
                }
            },
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc
        ]
    };
    F05314.P4Sheet = P4Sheet;
})(F05314 || (F05314 = {}));
