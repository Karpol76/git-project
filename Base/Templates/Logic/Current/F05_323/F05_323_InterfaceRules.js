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
var F05323;
(function (F05323) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05323.InterfaceRules = InterfaceRules;
    var P2SheetColumnBlocks;
    (function (P2SheetColumnBlocks) {
        P2SheetColumnBlocks[P2SheetColumnBlocks["Total"] = 0] = "Total";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Chernobyl"] = 1] = "Chernobyl";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Mayak"] = 2] = "Mayak";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Semipalatinsk"] = 3] = "Semipalatinsk";
    })(P2SheetColumnBlocks = F05323.P2SheetColumnBlocks || (F05323.P2SheetColumnBlocks = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooter = this.IsFooterRow(row);
            var rowCount = this.RowCount;
            if (isFooter) {
                if (this.IsColumnInDataBlock(column, P2SheetColumnBlocks.Total)) {
                    if (this.IsTotalRow(row)) {
                        return this._sheetOptions.TotalRowFormat;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
                else {
                    if (this.CalcEndBlockColumn(P2SheetColumnBlocks.Total) < column) {
                        if (row === (rowCount - SubsidiesSubventions.SheetTotalRows.DistributedVolume)) {
                            return SheetFormatCollection.Calc;
                        }
                    }
                }
                return SheetFormatCollection.Default;
            }
            else {
                if (this.IsColumnInDataBlock(column, P2SheetColumnBlocks.Total)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter && this.CalcEndBlockColumn(P2SheetColumnBlocks.Total) < column) {
                var rowCount = this.RowCount;
                if (row === (rowCount - SubsidiesSubventions.SheetTotalRows.DistributedVolume)) {
                    return this.Document.CommonRules.GetFooterSum(this, row, column);
                }
                else {
                    return ObasHelper.X;
                }
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return P2Sheet;
    }(SubsidiesSubventions.P2Sheet));
    F05323.P2Sheet = P2Sheet;
    var P4P5SheetColumnBlocks;
    (function (P4P5SheetColumnBlocks) {
        P4P5SheetColumnBlocks[P4P5SheetColumnBlocks["Count"] = 0] = "Count";
        P4P5SheetColumnBlocks[P4P5SheetColumnBlocks["Pay"] = 1] = "Pay";
        P4P5SheetColumnBlocks[P4P5SheetColumnBlocks["OtherPay"] = 2] = "OtherPay";
        P4P5SheetColumnBlocks[P4P5SheetColumnBlocks["Total"] = 3] = "Total";
    })(P4P5SheetColumnBlocks = F05323.P4P5SheetColumnBlocks || (F05323.P4P5SheetColumnBlocks = {}));
    var P4P5Sheet = (function (_super) {
        __extends(P4P5Sheet, _super);
        function P4P5Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P4P5Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsColumnInDataBlock(column, P4P5SheetColumnBlocks.Count) ||
                    this.IsColumnInDataBlock(column, P4P5SheetColumnBlocks.OtherPay) ||
                    this.IsColumnInDataBlock(column, P4P5SheetColumnBlocks.Total)) {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Related;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsColumnInDataBlock(column, P4P5SheetColumnBlocks.Total)) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            return SheetFormatCollection.Free;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        P4P5Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return P4P5Sheet._totalRowName;
                    case this.RowCodeColumn:
                        return P4P5Sheet._totalRowCode;
                    default:
                        if (this.IsColumnInDataBlock(column, P4P5SheetColumnBlocks.Pay)) {
                            return ObasHelper.X;
                        }
                        else {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                }
            }
            else if (column === this.RowCodeColumn) {
                return this.CalcRowCode(row, P4P5Sheet._rowCodeLength);
            }
            return undefined;
        };
        return P4P5Sheet;
    }(YearsSheetTyped));
    P4P5Sheet._totalRowName = "Итого";
    P4P5Sheet._totalRowCode = "900";
    P4P5Sheet._rowCodeLength = P4P5Sheet._totalRowCode.length;
    F05323.P4P5Sheet = P4P5Sheet;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(id, document, _subjectTable, _editors) {
            var _this = _super.call(this, id, document) || this;
            _this._subjectTable = _subjectTable;
            _this._editors = _editors;
            _this._sheetHelper = null;
            return _this;
        }
        Object.defineProperty(P3Sheet.prototype, "SheetHelper", {
            get: function () {
                if (this._sheetHelper == null) {
                    this._sheetHelper = new SubsidiesSubventions.FSheet(this.Id, this.Document, new SubsidiesSubventions.FSheetOptions(1, SheetFormatCollection.Spr, SheetFormatCollection.Free, SheetFormatCollection.Calc), this._subjectTable, this._editors);
                }
                return this._sheetHelper;
            },
            enumerable: true,
            configurable: true
        });
        P3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === this.RowNameColumn && !this.IsFooterRow(row)) {
                return SheetFormatCollection.Spr;
            }
            else {
                return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
            }
        };
        P3Sheet.prototype.EditorIdEventHandler = function () {
            return this.SheetHelper.EditorIdEventHandler();
        };
        return P3Sheet;
    }(P4P5Sheet));
    F05323.P3Sheet = P3Sheet;
})(F05323 || (F05323 = {}));
