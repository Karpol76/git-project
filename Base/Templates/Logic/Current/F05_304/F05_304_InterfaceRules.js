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
var F05304;
(function (F05304) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.RowCodeLength = 3;
    F05304.InterfaceRules = InterfaceRules;
    var P4SheetColumnBlocks;
    (function (P4SheetColumnBlocks) {
        P4SheetColumnBlocks[P4SheetColumnBlocks["TotalCoef"] = 0] = "TotalCoef";
        P4SheetColumnBlocks[P4SheetColumnBlocks["SituationCoef"] = 1] = "SituationCoef";
        P4SheetColumnBlocks[P4SheetColumnBlocks["TotalSum"] = 2] = "TotalSum";
    })(P4SheetColumnBlocks || (P4SheetColumnBlocks = {}));
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P4Sheet.prototype.IsXCell = function (row, column) {
            return this.IsFooterRow(row) && this.IsColumnInDataBlock(column, P4SheetColumnBlocks.SituationCoef);
        };
        P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.TotalCoef)) {
                    return SheetFormatCollection.Calc;
                }
                else if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.TotalSum)) {
                    return SheetFormatCollection.Free;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Default;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        return SheetFormatCollection.Calc;
                }
            }
        };
        P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsXCell(row, column)) {
                return ObasHelper.X;
            }
            else if (column === this.RowCodeColumn && !this.IsFooterRow(row)) {
                return this.CalcRowCode(row, InterfaceRules.RowCodeLength);
            }
            return undefined;
        };
        P4Sheet.prototype.GetYearCaption = function (yearOffset) {
            return "\u043D\u0430 " + (this.Document.Settings.StartYear + yearOffset) + " \u0433\u043E\u0434";
        };
        P4Sheet.prototype.GetCoefYearsCaptionEventHandler = function (fieldId, index, defaultCaption, fieldCaption) {
            var column = 3 + index;
            return this.GetYearCaption(index) + "\n\u0433\u0440. " + column + " / \u0433\u0440. " + column + " (900)";
        };
        P4Sheet.prototype.GetYearsCaptionEventHandler = function (fieldId, index, defaultCaption, fieldCaption) {
            return this.GetYearCaption(index) + "\n\u0433\u0440. " + (6 + index) + " * \u0433\u0440. " + (9 + index) + " (900)";
        };
        return P4Sheet;
    }(YearsSheet));
    F05304.P4Sheet = P4Sheet;
    var CoefCategories;
    (function (CoefCategories) {
        CoefCategories[CoefCategories["Water"] = 1] = "Water";
        CoefCategories[CoefCategories["People"] = 2] = "People";
        CoefCategories[CoefCategories["Coastline"] = 3] = "Coastline";
    })(CoefCategories || (CoefCategories = {}));
    var P3GroupSheet = (function (_super) {
        __extends(P3GroupSheet, _super);
        function P3GroupSheet(document, _sheetOptions, _subjectTable, _editors) {
            var _this = _super.call(this, document) || this;
            _this._sheetOptions = _sheetOptions;
            _this._subjectTable = _subjectTable;
            _this._editors = _editors;
            _this._sheets = new collections.Dictionary();
            return _this;
        }
        P3GroupSheet.prototype.GetSheet = function (sheetId) {
            var result = this._sheets.getValue(sheetId);
            if (result == null) {
                result = new SubsidiesSubventions.FSheet(sheetId, this.Document, this._sheetOptions, this._subjectTable, this._editors);
                this._sheets.setValue(sheetId, result);
            }
            return result;
        };
        P3GroupSheet.prototype.IsValueColumn = function (param, column) {
            var sheet;
            if (typeof param === "string") {
                sheet = this.GetSheet(param);
            }
            else {
                sheet = param;
            }
            var offsetCol = sheet.CalcOffsetCol(column);
            return offsetCol % 2 === 0;
        };
        P3GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var sheet = this.GetSheet(sheetId);
            if (sheet.IsFooterRow(row)) {
                if (sheet.IsDataColumn(column) && this.IsValueColumn(sheet, column)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case sheet.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case sheet.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsValueColumn(sheet, column)) {
                            return SheetFormatCollection.Free;
                        }
                        else {
                            return SheetFormatCollection.Spr;
                        }
                }
            }
        };
        P3GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.GetSheet(sheetId);
            if (sheet.IsFooterRow(row)) {
                if (sheet.IsDataColumn(column)) {
                    if (this.IsValueColumn(sheet, column)) {
                        return this.Document.CommonRules.GetFooterSum(sheet, row, column);
                    }
                    else {
                        return ObasHelper.X;
                    }
                }
            }
            else if (column === sheet.RowCodeColumn) {
                return sheet.CalcRowCode(row, InterfaceRules.RowCodeLength);
            }
            return undefined;
        };
        P3GroupSheet.prototype.EditorIdEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.GetSheet(sheetId);
            switch (column) {
                case sheet.RowNameColumn:
                    return sheet.EditorIdEventHandler();
                case sheet.RowCodeColumn:
                    return undefined;
                default:
                    if (this.IsValueColumn(sheet, column)) {
                        return undefined;
                    }
                    else {
                        return "F05_304_R3_" + fieldId + "_Editor";
                    }
            }
        };
        P3GroupSheet.prototype.FilterCoef = function (category, year) {
            if (year === void 0) { year = this.Document.Settings.ActiveYear; }
            var coefsSprTable = ObasTableCollection.Coefficients05304SprTable;
            return coefsSprTable.Year.Value === year && coefsSprTable.CategoryType.Value === category;
        };
        P3GroupSheet.prototype.FilterWaterCoef = function () {
            return this.FilterCoef(CoefCategories.Water);
        };
        P3GroupSheet.prototype.FilterPeopleCoef = function () {
            return this.FilterCoef(CoefCategories.People);
        };
        P3GroupSheet.prototype.FilterCoastlineCoef = function () {
            return this.FilterCoef(CoefCategories.Coastline);
        };
        P3GroupSheet.prototype.CanAddEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this.GetSheet(sheetId);
            return column === sheet.RowNameColumn;
        };
        P3GroupSheet.prototype.CanDeleteEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this.GetSheet(sheetId);
            return column === sheet.RowNameColumn && sheet.Table.GetKeyBySourceTable(this._subjectTable) != null;
        };
        P3GroupSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var sheet = this.GetSheet(sheetId);
            return this.IsValueColumn(sheet, column) && sheet.Table.GetKeyBySourceTable(this._subjectTable) != null;
        };
        return P3GroupSheet;
    }(YearGroupSheet));
    F05304.P3GroupSheet = P3GroupSheet;
})(F05304 || (F05304 = {}));
