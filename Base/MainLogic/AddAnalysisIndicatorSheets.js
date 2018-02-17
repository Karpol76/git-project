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
var AddAnalisisIndicatorSheet = (function (_super) {
    __extends(AddAnalisisIndicatorSheet, _super);
    function AddAnalisisIndicatorSheet(id, _document, _opCount, _sprColCount) {
        var _this = _super.call(this, id, false) || this;
        _this._document = _document;
        _this._opCount = _opCount;
        _this._sprColCount = _sprColCount;
        _this._kosguCode = "";
        _this._startDataCol = null;
        _this._endDataCol = null;
        _this._kosguCode = id.split("_")[1];
        _document.KosguSheets.setValue(_this.KosguCode, _this);
        return _this;
    }
    Object.defineProperty(AddAnalisisIndicatorSheet.prototype, "OperandsCount", {
        get: function () {
            return this._opCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisIndicatorSheet.prototype, "KosguCode", {
        get: function () {
            return this._kosguCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisIndicatorSheet.prototype, "StartDataCol", {
        get: function () {
            if (this._startDataCol === null) {
                this.InitializeColumnParams();
            }
            return this._startDataCol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisIndicatorSheet.prototype, "EndDataCol", {
        get: function () {
            if (this._endDataCol === null) {
                this.InitializeColumnParams();
            }
            return this._endDataCol;
        },
        enumerable: true,
        configurable: true
    });
    AddAnalisisIndicatorSheet.prototype.InitializeColumnParams = function () {
        this._startDataCol = this._sprColCount;
        this._endDataCol = this._startDataCol + this._opCount * (this._document.Settings.YearsCount - 1) - 1;
    };
    AddAnalisisIndicatorSheet.prototype.IsTotalRow = function (row) {
        return row === this.RowCount - 2;
    };
    AddAnalisisIndicatorSheet.prototype.IsTotalDiffRow = function (row) {
        return row === this.RowCount - 1;
    };
    AddAnalisisIndicatorSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
        if (this.IsTotalRow(row) || this.IsTotalDiffRow(row)) {
            if (column > this.EndDataCol) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Default;
            }
        }
        else {
            if (column < this.StartDataCol) {
                return SheetFormatCollection.Spr;
            }
            else {
                if (column > this.EndDataCol) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Free;
                }
            }
        }
    };
    AddAnalisisIndicatorSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
        if (this.IsTotalRow(row)) {
            if (column === 0) {
                return "Всего";
            }
            else {
                if (column <= this.EndDataCol) {
                    return ObasHelper.X;
                }
            }
        }
        else {
            if (this.IsTotalDiffRow(row)) {
                if (column === 0) {
                    return "Нераспределенный остаток";
                }
                else {
                    if (column <= this.EndDataCol) {
                        return ObasHelper.X;
                    }
                }
            }
        }
        this._document.CommonRules.GetYearsCaptionEventHandler;
        return null;
    };
    AddAnalisisIndicatorSheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
        var result = "на " + (this._document.Settings.StartYear + index).toString() + " год (";
        for (var i = 0; i < this._opCount; i++) {
            result += "гр." + (this.StartDataCol + index + (i * (this._document.Settings.YearsCount - 1)) + 1).toString() + (i + 1 === this._opCount ? "" : "*");
        }
        result += ")";
        return result;
    };
    AddAnalisisIndicatorSheet.prototype.OnLoadEventHandler = function (tableId) {
        return (this._document.Tables.getValue(tableId).GetFieldValue(AddAnalisisTableFields.KosguCodeField.Id) === this._kosguCode);
    };
    AddAnalisisIndicatorSheet.prototype.AddAnalysisIndicatorSprOnKosguFilter = function () {
        return this._document.Tables.getValue("AddAnalysisIndicator").GetFieldValue(AddAnalisisTableFields.KosguCodeField.Id) === this._kosguCode;
    };
    return AddAnalisisIndicatorSheet;
}(Sheet));
