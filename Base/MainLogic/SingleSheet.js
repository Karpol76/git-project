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
var YearsSheetTyped = (function (_super) {
    __extends(YearsSheetTyped, _super);
    function YearsSheetTyped(id, _document, _rowCodeColumn, _totalRowCount) {
        if (_totalRowCount === void 0) { _totalRowCount = 1; }
        var _this = _super.call(this, id, false) || this;
        _this._document = _document;
        _this._rowCodeColumn = _rowCodeColumn;
        _this._totalRowCount = _totalRowCount;
        _this._lastColumn = null;
        _this._rowNameColumn = _this._rowCodeColumn - 1;
        return _this;
    }
    Object.defineProperty(YearsSheetTyped.prototype, "LastColumn", {
        get: function () {
            if (this._lastColumn == null) {
                this._lastColumn = this.ColumnCount - 1;
            }
            return this._lastColumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YearsSheetTyped.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YearsSheetTyped.prototype, "YearsCount", {
        get: function () {
            return this._document.Settings.YearsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YearsSheetTyped.prototype, "StartDataColumn", {
        get: function () {
            return this.RowCodeColumn + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YearsSheetTyped.prototype, "RowCodeColumn", {
        get: function () {
            return this._rowCodeColumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YearsSheetTyped.prototype, "RowNameColumn", {
        get: function () {
            return this._rowNameColumn;
        },
        enumerable: true,
        configurable: true
    });
    YearsSheetTyped.prototype.CalcRelColumn = function (column) {
        return this.CalcOffsetCol(column) % this.YearsCount;
    };
    YearsSheetTyped.prototype.CalcOffsetCol = function (column) {
        return column - (this._rowCodeColumn + 1);
    };
    YearsSheetTyped.prototype.CalcStartBlockColumn = function (block) {
        return this.StartDataColumn + this.YearsCount * block;
    };
    YearsSheetTyped.prototype.CalcEndBlockColumn = function (block) {
        return this.StartDataColumn + this.YearsCount * (block + 1) - 1;
    };
    YearsSheetTyped.prototype.IsDataColumn = function (column) {
        return this.CalcOffsetCol(column) >= 0;
    };
    YearsSheetTyped.prototype.CalcDataColumnBlock = function (column) {
        return (this.CalcOffsetCol(column) / this.YearsCount) | 0;
    };
    YearsSheetTyped.prototype.IsColumnInDataBlock = function (column, block) {
        return ((this.CalcDataColumnBlock(column) === block) && this.IsDataColumn(column));
    };
    YearsSheetTyped.prototype.IsFooterRow = function (row) {
        return this.Document.CommonRules.IsFooterRow(this, row, this._totalRowCount);
    };
    Object.defineProperty(YearsSheetTyped.prototype, "TotalRowCount", {
        get: function () {
            return this._totalRowCount;
        },
        enumerable: true,
        configurable: true
    });
    YearsSheetTyped.prototype.IsTotalRow = function (row) {
        return this.Document.CommonRules.IsFooterRow(this, row);
    };
    Object.defineProperty(YearsSheetTyped.prototype, "StartFooterRow", {
        get: function () {
            return this.RowCount - this.TotalRowCount;
        },
        enumerable: true,
        configurable: true
    });
    YearsSheetTyped.prototype.CalcRowCode = function (row, length) {
        return ObasHelper.FillWithCharacter(row + 1, length);
    };
    return YearsSheetTyped;
}(Sheet));
var YearsSheet = (function (_super) {
    __extends(YearsSheet, _super);
    function YearsSheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return YearsSheet;
}(YearsSheetTyped));
