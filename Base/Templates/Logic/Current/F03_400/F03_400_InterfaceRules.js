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
var F03400;
(function (F03400) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.P3SheetCalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 2) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    F03400.InterfaceRules = InterfaceRules;
    var P1SheetRows;
    (function (P1SheetRows) {
        P1SheetRows[P1SheetRows["Fot"] = 0] = "Fot";
        P1SheetRows[P1SheetRows["AddFot"] = 1] = "AddFot";
        P1SheetRows[P1SheetRows["Correction"] = 2] = "Correction";
        P1SheetRows[P1SheetRows["Total"] = 3] = "Total";
    })(P1SheetRows || (P1SheetRows = {}));
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column > 1) {
                switch (row) {
                    case P1SheetRows.Fot:
                        return SheetFormatCollection.Related;
                    case P1SheetRows.AddFot:
                    case P1SheetRows.Correction:
                        return SheetFormatCollection.Free;
                    case P1SheetRows.Total:
                        return SheetFormatCollection.Calc;
                }
            }
            return SheetFormatCollection.Default;
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return ((column > 0) && ((row === P1SheetRows.AddFot) || (row === P1SheetRows.Correction)));
        };
        return P1Sheet;
    }(Sheet));
    F03400.P1Sheet = P1Sheet;
    var P2GroupSheet = (function () {
        function P2GroupSheet(_document) {
            this._document = _document;
        }
        P2GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this._document.CommonRules.StandardFormat(sheetId, row, column, P2GroupSheet._sheetInfo);
        };
        P2GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this._document.CommonRules.StandardCalc(sheetId, row, column, P2GroupSheet._sheetInfo);
        };
        return P2GroupSheet;
    }());
    P2GroupSheet._totalRowInfo = {
        IsCalculated: false,
        Name: "Всего",
        Format: SheetFormatCollection.Default
    };
    P2GroupSheet._totalGrantRowInfo = {
        IsCalculated: false,
        Name: "Итого по стипендии",
        Format: SheetFormatCollection.Default
    };
    P2GroupSheet._freeColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: [P2GroupSheet._totalGrantRowInfo],
        TotalRow: P2GroupSheet._totalRowInfo
    };
    P2GroupSheet._freeColAllDefault = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.FreeOnlyFormatRow],
        TotalRow: SheetRowInfoCollection.Default
    };
    P2GroupSheet._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 2,
            Length: 7,
            LevelIncs: [100, 1],
            CalcTotalCode: function () {
                return 9010100;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.SprColDefaultTotal,
            P2GroupSheet._freeColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F03400.P2GroupSheet = P2GroupSheet;
})(F03400 || (F03400 = {}));
