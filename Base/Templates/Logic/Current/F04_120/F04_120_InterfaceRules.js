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
var F04120;
(function (F04120) {
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
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Всего";
    F04120.InterfaceRules = InterfaceRules;
    var P2GenYearTablesSheet = (function (_super) {
        __extends(P2GenYearTablesSheet, _super);
        function P2GenYearTablesSheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        Object.defineProperty(P2GenYearTablesSheet.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        return P2GenYearTablesSheet;
    }(Sheet));
    F04120.P2GenYearTablesSheet = P2GenYearTablesSheet;
    var P2Sp1Sheet = (function (_super) {
        __extends(P2Sp1Sheet, _super);
        function P2Sp1Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sp1Sheet.prototype.IsFooterRow = function (row) {
            return this.Document.CommonRules.IsFooterRow(this, row);
        };
        P2Sp1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column > P2Sp1Sheet._strCodeColumn) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                if (column === P2Sp1Sheet._strCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else if (column === 1) {
                    return SheetFormatCollection.Spr;
                }
                else if (column > 5) {
                    return SheetFormatCollection.Related;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        };
        P2Sp1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                if (column === P2Sp1Sheet._strNameColumn) {
                    return InterfaceRules.TotalRowName;
                }
                else if (column === P2Sp1Sheet._strCodeColumn) {
                    return P2Sp1Sheet._strCode;
                }
                else if (column > P2Sp1Sheet._strCodeColumn) {
                    return this.Document.CommonRules.GetFooterSum(this, row, column);
                }
            }
            else if (column === P2Sp1Sheet._strCodeColumn) {
                return ObasHelper.FillWithCharacter(row + 1, P2Sp1Sheet._strLength);
            }
            return undefined;
        };
        return P2Sp1Sheet;
    }(P2GenYearTablesSheet));
    P2Sp1Sheet._strCodeColumn = 4;
    P2Sp1Sheet._strNameColumn = P2Sp1Sheet._strCodeColumn - 1;
    P2Sp1Sheet._strCode = "9000";
    P2Sp1Sheet._strLength = P2Sp1Sheet._strCode.length;
    F04120.P2Sp1Sheet = P2Sp1Sheet;
    var P2Sp2Sheet = (function (_super) {
        __extends(P2Sp2Sheet, _super);
        function P2Sp2Sheet(id, _dataTable) {
            var _this = _super.call(this, id, _dataTable.Document) || this;
            _this._dataTable = _dataTable;
            return _this;
        }
        P2Sp2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, P2Sp2Sheet._sheetInfo);
        };
        P2Sp2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, P2Sp2Sheet._sheetInfo);
        };
        P2Sp2Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var dataKey = this.Table.GetKeyBySourceTable(this._dataTable);
            return dataKey != null && (column > 3);
        };
        P2Sp2Sheet.prototype.CanEditEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var dataKey = this.Table.GetKeyBySourceTable(this._dataTable);
            return dataKey != null;
        };
        return P2Sp2Sheet;
    }(P2GenYearTablesSheet));
    P2Sp2Sheet._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules.TotalRowName,
        Format: SheetFormatCollection.Default
    };
    P2Sp2Sheet._subTotalRowInfo = {
        IsCalculated: false,
        Name: "Итого по объекту, мероприятию\n(укрупненному инвестиционному проекту)",
        Format: SheetFormatCollection.Default
    };
    P2Sp2Sheet._sprColConstAll = {
        Cell: { Type: SheetCellTypes.Free },
        SubTotalRow: P2Sp2Sheet._subTotalRowInfo,
        TotalRow: P2Sp2Sheet._totalRowInfo
    };
    P2Sp2Sheet._sheetInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 2,
            Length: 6,
            LevelIncs: [100, 1],
            CalcTotalCode: function () {
                return 900000;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            P2Sp2Sheet._sprColConstAll,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.SprColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F04120.P2Sp2Sheet = P2Sp2Sheet;
    var P2Sp3Sheet = (function (_super) {
        __extends(P2Sp3Sheet, _super);
        function P2Sp3Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P2Sp3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column < P2Sp3Sheet._strCodeColumn) {
                return SheetFormatCollection.Related;
            }
            else if (column === P2Sp3Sheet._strCodeColumn) {
                return SheetFormatCollection.Default;
            }
            else if (column === P2Sp3Sheet._strCodeColumn + 1) {
                return SheetFormatCollection.Spr;
            }
            else {
                return SheetFormatCollection.Free;
            }
        };
        P2Sp3Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === P2Sp3Sheet._strCodeColumn) {
                return ObasHelper.FillWithCharacter(row + 1, P2Sp3Sheet._strLength);
            }
            return undefined;
        };
        return P2Sp3Sheet;
    }(Sheet));
    P2Sp3Sheet._strLength = 4;
    P2Sp3Sheet._strCodeColumn = 1;
    F04120.P2Sp3Sheet = P2Sp3Sheet;
})(F04120 || (F04120 = {}));
