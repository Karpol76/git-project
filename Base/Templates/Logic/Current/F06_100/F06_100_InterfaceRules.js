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
var F06100;
(function (F06100) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP2Sp4FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return SheetFormatCollection.Free;
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.StrCodeLength = 6;
    F06100.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.IsFooterRow = function (row) {
            return this._document.CommonRules.IsFooterRow(this, row, P1Sheet._totalRowCount);
        };
        P1Sheet.prototype.IsFooterRelRow = function (row) {
            var relRow = this.GetRelRow(row);
            return relRow === P1Sheet._relRowCount - 1;
        };
        P1Sheet.prototype.GetRelRow = function (row) {
            return row % P1Sheet._relRowCount;
        };
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column > P1Sheet._strCodeColumn) {
                    if (row === this.RowCount - 1) {
                        return SheetFormatCollection.Calc;
                    }
                    else {
                        return SheetFormatCollection.Related;
                    }
                }
            }
            return SheetFormatCollection.Default;
        };
        P1Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (!this.IsFooterRow(row)) {
                if (column === P1Sheet._strCodeColumn) {
                    var curCode = parseInt(this.GetCellValue(row, column), 10);
                    var orgNum = (row / P1Sheet._relRowCount) | 0;
                    var code = (orgNum + 1) * 10;
                    return ObasHelper.FillWithCharacter(code + curCode, InterfaceRules.StrCodeLength);
                }
                else if (column > P1Sheet._strCodeColumn) {
                    if (this.IsFooterRelRow(row)) {
                        var result = new SheetCalcResult(BaseFormulas.SUM);
                        for (var i = 1; i < P1Sheet._relRowCount; i++) {
                            result.AddCoordinates(new CellCoordinate(row - i, column));
                        }
                        return result.ToArray();
                    }
                }
            }
            return undefined;
        };
        return P1Sheet;
    }(Sheet));
    P1Sheet._relRowCount = 6;
    P1Sheet._totalRowCount = 7;
    P1Sheet._strCodeColumn = 1;
    F06100.P1Sheet = P1Sheet;
    var P2Sp5Sheet = (function (_super) {
        __extends(P2Sp5Sheet, _super);
        function P2Sp5Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P2Sp5Sheet.prototype.IsFooterRow = function (row) {
            return this._document.CommonRules.IsFooterRow(this, row, P2Sp5Sheet._relRowCount);
        };
        P2Sp5Sheet.prototype.GetRelRow = function (row) {
            return row % P2Sp5Sheet._relRowCount;
        };
        P2Sp5Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column > P2Sp5Sheet._strCodeColumn) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case 0:
                        return SheetFormatCollection.Related;
                    case 1:
                        return SheetFormatCollection.Default;
                    default:
                        var relRow = this.GetRelRow(row);
                        switch (relRow) {
                            case 0:
                            case 1:
                                return SheetFormatCollection.Calc;
                            default:
                                return SheetFormatCollection.Free;
                        }
                }
            }
        };
        P2Sp5Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                if (column > P2Sp5Sheet._strCodeColumn) {
                    return this._document.CommonRules.GetFooterSum(this, row, column, {
                        EndRow: this.RowCount - P2Sp5Sheet._relRowCount,
                        StartRow: this.GetRelRow(row),
                        Step: P2Sp5Sheet._relRowCount
                    });
                }
            }
            else {
                if (column > P2Sp5Sheet._strCodeColumn) {
                    var relRow = this.GetRelRow(row);
                    if (relRow === 0 || relRow === 1) {
                        var result = new SheetCalcResult(BaseFormulas.SUM);
                        switch (relRow) {
                            case 0:
                                for (var i = 1; i < P2Sp5Sheet._relRowCount; i++) {
                                    if ((i < 2 || i > 6) && i !== 8) {
                                        result.AddCoordinates(new CellCoordinate(row + i, column));
                                    }
                                }
                                break;
                            case 1:
                                for (var i = 1; i < 6; i++) {
                                    result.AddCoordinates(new CellCoordinate(row + i, column));
                                }
                                break;
                        }
                        return result.ToArray();
                    }
                }
            }
            return undefined;
        };
        return P2Sp5Sheet;
    }(Sheet));
    P2Sp5Sheet._relRowCount = 17;
    P2Sp5Sheet._strCodeColumn = 1;
    F06100.P2Sp5Sheet = P2Sp5Sheet;
    var PaidActivityInfoSheet = (function (_super) {
        __extends(PaidActivityInfoSheet, _super);
        function PaidActivityInfoSheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        PaidActivityInfoSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case 0:
                    return SheetFormatCollection.Default;
                default:
                    if (column > 6) {
                        return SheetFormatCollection.Calc;
                    }
                    else {
                        return SheetFormatCollection.Free;
                    }
            }
        };
        PaidActivityInfoSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (BaseObasTableFields.StrCodeField.Equal(fieldId)) {
                return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.StrCodeLength);
            }
            return undefined;
        };
        PaidActivityInfoSheet.prototype.GetCoefYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(\u0433\u0440. " + (2 + index) + " / (\u0433\u0440. " + (2 + index) + " + \u0433\u0440. " + (5 + index) + "))";
        };
        return PaidActivityInfoSheet;
    }(Sheet));
    F06100.PaidActivityInfoSheet = PaidActivityInfoSheet;
    var GroupSheet = (function (_super) {
        __extends(GroupSheet, _super);
        function GroupSheet(document) {
            return _super.call(this, document) || this;
        }
        GroupSheet.prototype.CalcStrCode = function (row) {
            return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.StrCodeLength);
        };
        GroupSheet.prototype.IsFooterRow = function (sheetId, row) {
            return this.Document.CommonRules.IsFooterRow(sheetId, row);
        };
        GroupSheet.prototype.GetSheet = function (sheetId) {
            return this.Document.Sheets.getValue(sheetId);
        };
        GroupSheet.prototype.GetColumnCount = function (sheetId) {
            return this.GetSheet(sheetId).ColumnCount;
        };
        GroupSheet.prototype.IsLastColumn = function (sheetId, column) {
            return column === this.GetColumnCount(sheetId) - 1;
        };
        return GroupSheet;
    }(YearGroupSheet));
    GroupSheet._totalRowName = "Всего";
    F06100.GroupSheet = GroupSheet;
    var P2Sp3GroupSheet = (function (_super) {
        __extends(P2Sp3GroupSheet, _super);
        function P2Sp3GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sp3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case P2Sp3GroupSheet._strCodeColumn:
                    return SheetFormatCollection.Default;
                case P2Sp3GroupSheet._propertyMaintenanceSumColumn:
                    return SheetFormatCollection.Calc;
                default:
                    if (this.IsLastColumn(sheetId, column)) {
                        return SheetFormatCollection.Related;
                    }
                    else {
                        return SheetFormatCollection.Free;
                    }
            }
        };
        P2Sp3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === P2Sp3GroupSheet._propertyMaintenanceSumColumn) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                for (var i = 1; i < 3; i++) {
                    result.AddCoordinates(new CellCoordinate(row, column + i));
                }
                return result.ToArray();
            }
            return undefined;
        };
        return P2Sp3GroupSheet;
    }(GroupSheet));
    P2Sp3GroupSheet._strCodeColumn = 0;
    P2Sp3GroupSheet._propertyMaintenanceSumColumn = 2;
    F06100.P2Sp3GroupSheet = P2Sp3GroupSheet;
    var BaseP2Sp1Sp2GroupSheet = (function (_super) {
        __extends(BaseP2Sp1Sp2GroupSheet, _super);
        function BaseP2Sp1Sp2GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseP2Sp1Sp2GroupSheet.prototype.IsCalcColumn = function (sheetId, column) {
            return column === this.StrCodeColumn + 1 ||
                column === this.StrCodeColumn + 2 ||
                column === this.StrCodeColumn + 17;
        };
        BaseP2Sp1Sp2GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(sheetId, row)) {
                if (column <= this.StrCodeColumn) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                switch (column) {
                    case BaseP2Sp1Sp2GroupSheet._volumeValColumn:
                        return SheetFormatCollection.Free;
                    case BaseP2Sp1Sp2GroupSheet._volumeValColumn + 1:
                        return SheetFormatCollection.Calc;
                    case this.StrCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (column < BaseP2Sp1Sp2GroupSheet._volumeValColumn) {
                            return SheetFormatCollection.Spr;
                        }
                        else if (this.IsCalcColumn(sheetId, column)) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            return SheetFormatCollection.Free;
                        }
                }
            }
        };
        BaseP2Sp1Sp2GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === this.StrCodeColumn) {
                return this.CalcStrCode(row);
            }
            else if (this.IsFooterRow(sheetId, row)) {
                if (column > this.StrCodeColumn) {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
                else if (column === this.StrCodeColumn - 1) {
                    return P2Sp3GroupSheet._totalRowName;
                }
            }
            return undefined;
        };
        BaseP2Sp1Sp2GroupSheet.prototype.CanEditCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return column !== 3 &&
                this.Document.CommonRules
                    .CantEditPrevCurYearsEditingCellEventHandler(sheetId, row, column, fieldId, rowLevel);
        };
        return BaseP2Sp1Sp2GroupSheet;
    }(GroupSheet));
    BaseP2Sp1Sp2GroupSheet._volumeValColumn = 6;
    F06100.BaseP2Sp1Sp2GroupSheet = BaseP2Sp1Sp2GroupSheet;
    var P2Sp1GroupSheet = (function (_super) {
        __extends(P2Sp1GroupSheet, _super);
        function P2Sp1GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2Sp1GroupSheet.prototype, "StrCodeColumn", {
            get: function () {
                return P2Sp1GroupSheet._strCodeColumn;
            },
            enumerable: true,
            configurable: true
        });
        return P2Sp1GroupSheet;
    }(BaseP2Sp1Sp2GroupSheet));
    P2Sp1GroupSheet._strCodeColumn = 9;
    F06100.P2Sp1GroupSheet = P2Sp1GroupSheet;
    var P2Sp2GroupSheet = (function (_super) {
        __extends(P2Sp2GroupSheet, _super);
        function P2Sp2GroupSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P2Sp2GroupSheet.prototype, "StrCodeColumn", {
            get: function () {
                return P2Sp2GroupSheet._strCodeColumn;
            },
            enumerable: true,
            configurable: true
        });
        return P2Sp2GroupSheet;
    }(BaseP2Sp1Sp2GroupSheet));
    P2Sp2GroupSheet._strCodeColumn = 8;
    F06100.P2Sp2GroupSheet = P2Sp2GroupSheet;
    var AnalyticSheet = (function (_super) {
        __extends(AnalyticSheet, _super);
        function AnalyticSheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        AnalyticSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column > AnalyticSheet._strCodeColumn) {
                if (row > 1) {
                    return SheetFormatCollection.Related;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                return SheetFormatCollection.Default;
            }
        };
        AnalyticSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column > AnalyticSheet._strCodeColumn) {
                if (row === 0 || row === 1) {
                    var result = new SheetCalcResult(BaseFormulas.SUM);
                    switch (row) {
                        case 0:
                            for (var i = 1; i < this.RowCount; i++) {
                                if ((i < 2 || i > 7) && i !== 9) {
                                    result.AddCoordinates(new CellCoordinate(row + i, column));
                                }
                            }
                            break;
                        case 1:
                            for (var i = 1; i < 7; i++) {
                                result.AddCoordinates(new CellCoordinate(row + i, column));
                            }
                            break;
                    }
                    return result.ToArray();
                }
            }
            return undefined;
        };
        return AnalyticSheet;
    }(Sheet));
    AnalyticSheet._strCodeColumn = 1;
    F06100.AnalyticSheet = AnalyticSheet;
})(F06100 || (F06100 = {}));
