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
var F03500;
(function (F03500) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F03500.InterfaceRules = InterfaceRules;
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === 0) {
                if (this._document.CommonRules.IsFooterRow(this, row)) {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                if (this._document.CommonRules.IsFooterRow(this, row)) {
                    return SheetFormatCollection.Calc;
                }
                else if (row === this.RowCount - 2) {
                    return SheetFormatCollection.Free;
                }
                else {
                    return SheetFormatCollection.Related;
                }
            }
        };
        P1Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return ((column > 0) && (row === this.RowCount - 2));
        };
        return P1Sheet;
    }(Sheet));
    F03500.P1Sheet = P1Sheet;
    var P2GroupSheetRows;
    (function (P2GroupSheetRows) {
        P2GroupSheetRows[P2GroupSheetRows["Military"] = 0] = "Military";
        P2GroupSheetRows[P2GroupSheetRows["DocRights"] = 1] = "DocRights";
        P2GroupSheetRows[P2GroupSheetRows["CantUseSavings"] = 2] = "CantUseSavings";
        P2GroupSheetRows[P2GroupSheetRows["LawPayment"] = 3] = "LawPayment";
        P2GroupSheetRows[P2GroupSheetRows["Total"] = 4] = "Total";
    })(P2GroupSheetRows || (P2GroupSheetRows = {}));
    var P2GroupSheet = (function () {
        function P2GroupSheet(_docuent) {
            this._docuent = _docuent;
        }
        P2GroupSheet.prototype.GetLastColumn = function (sheetId) {
            return this._docuent.Sheets.getValue(sheetId).ColumnCount - 1;
        };
        P2GroupSheet.prototype.IsUserCell = function (row, column) {
            switch (column) {
                case 2:
                    return row !== P2GroupSheetRows.Total;
                case 3:
                    return !(row === P2GroupSheetRows.CantUseSavings || row === P2GroupSheetRows.Total);
                case 4:
                    return row === P2GroupSheetRows.DocRights;
                case 5:
                    return row === P2GroupSheetRows.LawPayment;
                case 6:
                    return row === P2GroupSheetRows.CantUseSavings;
                default:
                    return false;
            }
        };
        P2GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this._docuent.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case 0:
                        return P2GroupSheet._totalName;
                    case 1:
                        return P2GroupSheet._totalCode;
                    default:
                        if (column === this.GetLastColumn(sheetId)) {
                            return this._docuent.CommonRules.GetFooterSum(sheetId, row, column);
                        }
                        else {
                            return ObasHelper.X;
                        }
                }
            }
            else if (!(column <= 1 || this.IsUserCell(row, column) || column === this.GetLastColumn(sheetId))) {
                return ObasHelper.X;
            }
            return undefined;
        };
        P2GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === this.GetLastColumn(sheetId)) {
                return SheetFormatCollection.Calc;
            }
            if (this.IsUserCell(row, column)) {
                return SheetFormatCollection.Free;
            }
            else {
                return SheetFormatCollection.Default;
            }
        };
        return P2GroupSheet;
    }());
    P2GroupSheet._totalName = "Всего";
    P2GroupSheet._totalCode = "10";
    F03500.P2GroupSheet = P2GroupSheet;
})(F03500 || (F03500 = {}));
