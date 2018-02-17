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
var F05310;
(function (F05310) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    InterfaceRules.RowCodeLength = 3;
    F05310.InterfaceRules = InterfaceRules;
    var P4GroupSheet = (function (_super) {
        __extends(P4GroupSheet, _super);
        function P4GroupSheet(document, _sheetOptions, _subjectTable, _editors) {
            var _this = _super.call(this, document) || this;
            _this._sheetOptions = _sheetOptions;
            _this._subjectTable = _subjectTable;
            _this._editors = _editors;
            _this._yearsSheets = new collections.Dictionary();
            return _this;
        }
        P4GroupSheet.prototype.GetSheet = function (sheetId) {
            var result = this._yearsSheets.getValue(sheetId);
            if (result == null) {
                result = new SubsidiesSubventions.FSheet(sheetId, this.Document, this._sheetOptions, this._subjectTable, this._editors);
                this._yearsSheets.setValue(sheetId, result);
            }
            return result;
        };
        P4GroupSheet.prototype.IsLastColumn = function (sheetId, column) {
            return (column === (this.GetSheet(sheetId).ColumnCount - 1));
        };
        P4GroupSheet.prototype.EditorIdEventHandler = function (sheetId) {
            return this.GetSheet(sheetId).EditorIdEventHandler();
        };
        P4GroupSheet.prototype.GetFieldRangeEventHandler = function (sheetId) {
            if (sheetId === void 0) { sheetId = ""; }
            var index = ObasHelper.GetYearIndexById(sheetId);
            return [index];
        };
        P4GroupSheet.prototype.GetCaptionEventHandler = function (sheetId, index, defaultCaption, fieldCaption) {
            var yearOffset = ObasHelper.GetYearOffsetById(sheetId);
            return "\u0421\u0443\u043C\u043C\u0430,\n\u0440\u0443\u0431.\n(\u0433\u0440. 3 * \u0433\u0440. " + (3 + yearOffset) + " \u0440\u0430\u0437\u0434. 3 (01) * \u0433\u0440. 4 + \u0433\u0440. 5) + (\u0433\u0440. 6 * \u0433\u0440. 3 \u0440\u0430\u0437\u0434. " + (3 + yearOffset) + " (02) * \u0433\u0440. 4 * 12 + \u0433\u0440. 7)";
        };
        P4GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsLastColumn(sheetId, column)) {
                return SheetFormatCollection.Calc;
            }
            else {
                var sheet = this.GetSheet(sheetId);
                var isFooter = sheet.IsFooterRow(row);
                if (isFooter) {
                    return SheetFormatCollection.Default;
                }
                else {
                    switch (column) {
                        case sheet.RowNameColumn:
                            return SheetFormatCollection.Spr;
                        case sheet.RowCodeColumn:
                            return SheetFormatCollection.Default;
                        default:
                            return SheetFormatCollection.Free;
                    }
                }
            }
        };
        P4GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.GetSheet(sheetId);
            var isFooter = sheet.IsFooterRow(row);
            if (isFooter) {
                if (this.IsLastColumn(sheetId, column)) {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
                else {
                    if (column > sheet.RowCodeColumn) {
                        return ObasHelper.X;
                    }
                }
            }
            else {
                if (column === sheet.RowCodeColumn) {
                    return sheet.CalcRowCode(row, InterfaceRules.RowCodeLength);
                }
            }
            return undefined;
        };
        return P4GroupSheet;
    }(YearGroupSheet));
    F05310.P4GroupSheet = P4GroupSheet;
})(F05310 || (F05310 = {}));
