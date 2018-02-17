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
var F05321;
(function (F05321) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05321.InterfaceRules = InterfaceRules;
    var P2SheetColumnBlocks;
    (function (P2SheetColumnBlocks) {
        P2SheetColumnBlocks[P2SheetColumnBlocks["Total"] = 0] = "Total";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Permit"] = 1] = "Permit";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Travel"] = 2] = "Travel";
    })(P2SheetColumnBlocks = F05321.P2SheetColumnBlocks || (F05321.P2SheetColumnBlocks = {}));
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
    F05321.P2Sheet = P2Sheet;
    var P5SheetColumnBlocks;
    (function (P5SheetColumnBlocks) {
        P5SheetColumnBlocks[P5SheetColumnBlocks["Pay"] = 0] = "Pay";
        P5SheetColumnBlocks[P5SheetColumnBlocks["Count"] = 1] = "Count";
        P5SheetColumnBlocks[P5SheetColumnBlocks["Total"] = 2] = "Total";
    })(P5SheetColumnBlocks = F05321.P5SheetColumnBlocks || (F05321.P5SheetColumnBlocks = {}));
    var P5Sheet = (function (_super) {
        __extends(P5Sheet, _super);
        function P5Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P5Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsColumnInDataBlock(column, P5SheetColumnBlocks.Count) ||
                    this.IsColumnInDataBlock(column, P5SheetColumnBlocks.Total)) {
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
                        if (this.IsColumnInDataBlock(column, P5SheetColumnBlocks.Total)) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            return SheetFormatCollection.Free;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        P5Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return P5Sheet._totalRowName;
                    case this.RowCodeColumn:
                        return P5Sheet._totalRowCode;
                    default:
                        if (this.IsColumnInDataBlock(column, P5SheetColumnBlocks.Pay)) {
                            return ObasHelper.X;
                        }
                        else {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                }
            }
            else if (column === this.RowCodeColumn) {
                return this.CalcRowCode(row, P5Sheet._rowCodeLength);
            }
            return undefined;
        };
        P5Sheet.prototype.GetYearsCaptionEventHandler = function (fieldId, index, defaultCaption, fieldCaption) {
            var formulaParts = [];
            var realStartDataColumn = this.StartDataColumn + index + 1;
            var yearsCount = this.YearsCount;
            formulaParts.push("\u0433\u0440. " + (realStartDataColumn + yearsCount * P5SheetColumnBlocks.Pay));
            formulaParts.push("\u0433\u0440. " + (realStartDataColumn + yearsCount * P5SheetColumnBlocks.Count));
            formulaParts.push("12");
            return "\u043D\u0430 " + (ObasStageSettings.CurrentYear + index) + " \u0433\u043E\u0434\n(" + formulaParts.join(" * ") + ")";
        };
        return P5Sheet;
    }(YearsSheetTyped));
    P5Sheet._totalRowName = "Итого";
    P5Sheet._totalRowCode = "900";
    P5Sheet._rowCodeLength = P5Sheet._totalRowCode.length;
    F05321.P5Sheet = P5Sheet;
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet(id, document, _subjectTable, _editors) {
            var _this = _super.call(this, id, document) || this;
            _this._subjectTable = _subjectTable;
            _this._editors = _editors;
            _this._sheetHelper = null;
            return _this;
        }
        Object.defineProperty(P4Sheet.prototype, "SheetHelper", {
            get: function () {
                if (this._sheetHelper == null) {
                    this._sheetHelper = new SubsidiesSubventions.FSheet(this.Id, this.Document, new SubsidiesSubventions.FSheetOptions(1, SheetFormatCollection.Spr, SheetFormatCollection.Free, SheetFormatCollection.Calc), this._subjectTable, this._editors);
                }
                return this._sheetHelper;
            },
            enumerable: true,
            configurable: true
        });
        P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === this.RowNameColumn && !this.IsFooterRow(row)) {
                return SheetFormatCollection.Spr;
            }
            else {
                return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
            }
        };
        P4Sheet.prototype.EditorIdEventHandler = function () {
            return this.SheetHelper.EditorIdEventHandler();
        };
        return P4Sheet;
    }(P5Sheet));
    F05321.P4Sheet = P4Sheet;
})(F05321 || (F05321 = {}));
