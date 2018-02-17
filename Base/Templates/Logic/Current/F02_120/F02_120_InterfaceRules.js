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
var F02120;
(function (F02120) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules._totalRowName = "Всего";
    InterfaceRules._totalKosguRowName = "Итого по коду КОСГУ";
    InterfaceRules._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._totalKosguRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalKosguRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._subTotalRowInfos = [
        InterfaceRules._totalKosguRowInfo
    ];
    InterfaceRules.FreeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: InterfaceRules._subTotalRowInfos,
        TotalRow: InterfaceRules._totalRowInfo
    };
    F02120.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document) {
            return _super.call(this, id, document, 0) || this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column)) {
                return SheetFormatCollection.Related;
            }
            else {
                return SheetFormatCollection.Default;
            }
        };
        return P1Sheet;
    }(YearsSheet));
    F02120.P1Sheet = P1Sheet;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(document) {
            var _this = _super.call(this, document) || this;
            _this._fullSheetInfo = null;
            _this._formulaYearsCount = document.Settings.YearsCount;
            return _this;
        }
        Object.defineProperty(P2Sheet.prototype, "SheetInfo", {
            get: function () {
                var _this = this;
                if (this._fullSheetInfo == null) {
                    this._fullSheetInfo = P2Sheet._sheetInfo;
                    var insertColumns = function () {
                        var columnInfos = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            columnInfos[_i] = arguments[_i];
                        }
                        for (var _a = 0, columnInfos_1 = columnInfos; _a < columnInfos_1.length; _a++) {
                            var columnInfo = columnInfos_1[_a];
                            for (var i = 0; i < _this._formulaYearsCount; i++) {
                                _this._fullSheetInfo.ColumnsInfo.push(columnInfo);
                            }
                        }
                    };
                    insertColumns(SheetColumnInfoCollection.CalcColAllCalc, SheetColumnInfoCollection.FreeColAllCalc, SheetColumnInfoCollection.FreeColAllCalc, SheetColumnInfoCollection.CalcColAllCalc, SheetColumnInfoCollection.CalcColAllCalc, SheetColumnInfoCollection.CalcColAllCalc);
                }
                return this._fullSheetInfo;
            },
            enumerable: true,
            configurable: true
        });
        return P2Sheet;
    }(HierarchyYearGroupSheet));
    P2Sheet._sheetRowCodeInfo = {
        Column: 1,
        Length: 3,
        LevelIncs: [100, 1],
        CalcTotalCode: function (sheet, row) {
            return 900;
        }
    };
    P2Sheet._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: P2Sheet._sheetRowCodeInfo,
        ColumnsInfo: [
            SheetColumnInfoCollection.SprColDefaultTotal,
            SheetColumnInfoCollection.AllDefault,
            InterfaceRules.FreeColConstAll
        ]
    };
    F02120.P2Sheet = P2Sheet;
})(F02120 || (F02120 = {}));
