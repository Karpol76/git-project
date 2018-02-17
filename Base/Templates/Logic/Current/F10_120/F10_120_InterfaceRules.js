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
var F10120;
(function (F10120) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            if (column < 2) {
                return SheetFormatCollection.Default;
            }
            else if (row === lastRow - 1) {
                return SheetFormatCollection.Free;
            }
            else if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Related;
            }
        };
        InterfaceRules.prototype.SheetP1EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            var lastRow = this.Document.Sheets.getValue(sheetId).RowCount - 1;
            return ((column > 1) && (row === lastRow - 1));
        };
        InterfaceRules.prototype.DocumentSaveEventHandler = function () {
            var tableP1 = this.Document.TableP1;
            var yearsCount = this.Document.Settings.YearsCount;
            if (tableP1.IsTotalKeyField.Locate(1)) {
                var kosguSprTable = ObasTableCollection.KosguSprTable;
                var data = [];
                var record_1 = {
                    Key: kosguSprTable.LookupKeyByCode("212"),
                    Data: new Float32Array(yearsCount)
                };
                var otherField_1 = F10120.ObasTableFields.OtherRubField;
                var yearField_1 = BaseObasTableFields.YearDataField;
                this.Document.IterateByYears(function (i) {
                    record_1.Data[i] = tableP1.GetFieldValue(otherField_1.GenerateId(i + 1));
                }, false);
                data.push(record_1);
                record_1 = {
                    Key: kosguSprTable.LookupKeyByCode("999"),
                    Data: new Float32Array(yearsCount)
                };
                this.Document.IterateByYears(function (i) {
                    record_1.Data[i] = tableP1.GetFieldValue(yearField_1.GenerateId(i + 1)) -
                        tableP1.GetFieldValue(otherField_1.GenerateId(i + 1));
                }, false);
                data.push(record_1);
                this.Document.CommonRules.UpdateKosguTable(data);
            }
            this.Document.CommonRules.DocumentSaveEventHandler();
        };
        return InterfaceRules;
    }(BaseInterfaceRules));
    F10120.InterfaceRules = InterfaceRules;
    var BaseSheet = (function (_super) {
        __extends(BaseSheet, _super);
        function BaseSheet(id, _document) {
            var _this = _super.call(this, id, false) || this;
            _this._document = _document;
            return _this;
        }
        Object.defineProperty(BaseSheet.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        BaseSheet.prototype.GetStrCode = function (row) {
            return ObasHelper.FillWithCharacter(row + 1, BaseSheet._rowCodeLength);
        };
        BaseSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === BaseSheet._rowCodeColumn) {
                return this.GetStrCode(row);
            }
            return undefined;
        };
        return BaseSheet;
    }(Sheet));
    BaseSheet._rowCodeLength = 3;
    BaseSheet._rowCodeColumn = 1;
    F10120.BaseSheet = BaseSheet;
    var BaseCalcSheet = (function (_super) {
        __extends(BaseCalcSheet, _super);
        function BaseCalcSheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseCalcSheet.prototype.IsFooterRow = function (row) {
            return this.Document.CommonRules.IsFooterRow(this, row);
        };
        BaseCalcSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (column > BaseCalcSheet._rowCodeColumn) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case 0:
                        return SheetFormatCollection.Free;
                    case 1:
                        return SheetFormatCollection.Default;
                    default:
                        return this.FormatDataColumns(row, column);
                }
            }
        };
        BaseCalcSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var result = _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
            if (result == null) {
                if (this.IsFooterRow(row)) {
                    if (column === 0) {
                        return BaseCalcSheet._totalRowName;
                    }
                    else if (column > BaseCalcSheet._rowCodeColumn) {
                        return this.Document.CommonRules.GetFooterSum(this, row, column);
                    }
                }
            }
            return result;
        };
        return BaseCalcSheet;
    }(BaseSheet));
    BaseCalcSheet._totalRowName = "Всего";
    F10120.BaseCalcSheet = BaseCalcSheet;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sheet.prototype.FormatDataColumns = function (row, column) {
            return SheetFormatCollection.Free;
        };
        return P2Sheet;
    }(BaseCalcSheet));
    F10120.P2Sheet = P2Sheet;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P3Sheet.prototype.GetColumnBlock = function (column) {
            return ((column - (P3Sheet._rowCodeColumn + 1)) / this.Document.Settings.YearsCount) | 0;
        };
        P3Sheet.prototype.FormatDataColumns = function (row, column) {
            if ((this.GetColumnBlock(column) % 2) === 0) {
                return SheetFormatCollection.Free;
            }
            else {
                return SheetFormatCollection.Calc;
            }
        };
        return P3Sheet;
    }(BaseCalcSheet));
    F10120.P3Sheet = P3Sheet;
})(F10120 || (F10120 = {}));
