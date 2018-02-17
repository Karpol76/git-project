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
var F05311;
(function (F05311) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05311.InterfaceRules = InterfaceRules;
    var P4SheetColumnBlocks;
    (function (P4SheetColumnBlocks) {
        P4SheetColumnBlocks[P4SheetColumnBlocks["Pay"] = 0] = "Pay";
        P4SheetColumnBlocks[P4SheetColumnBlocks["Count"] = 1] = "Count";
        P4SheetColumnBlocks[P4SheetColumnBlocks["Costs"] = 2] = "Costs";
        P4SheetColumnBlocks[P4SheetColumnBlocks["Total"] = 3] = "Total";
    })(P4SheetColumnBlocks = F05311.P4SheetColumnBlocks || (F05311.P4SheetColumnBlocks = {}));
    var FilterHelper = (function () {
        function FilterHelper(_coef, _filterTable) {
            this._coef = _coef;
            this._filterTable = _filterTable;
        }
        FilterHelper.prototype.FilterTableOnLoad = function (tableId) {
            return this._filterTable.RecordKey.Value === this._coef;
        };
        return FilterHelper;
    }());
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._filterHelper = null;
            return _this;
        }
        Object.defineProperty(P3Sheet.prototype, "FilterHelper", {
            get: function () {
                if (this._filterHelper == null) {
                    this._filterHelper = new FilterHelper(F05311.CoefTableStrKeys.Coef1, this.Document.TableP3Rows);
                }
                return this._filterHelper;
            },
            enumerable: true,
            configurable: true
        });
        return P3Sheet;
    }(SubsidiesSubventions.CoefficientsSheet));
    F05311.P3Sheet = P3Sheet;
    var P4Sheet = (function (_super) {
        __extends(P4Sheet, _super);
        function P4Sheet(id, document) {
            var _this = _super.call(this, id, document, 1) || this;
            _this._filterHelper = null;
            return _this;
        }
        Object.defineProperty(P4Sheet.prototype, "FilterHelper", {
            get: function () {
                if (this._filterHelper == null) {
                    this._filterHelper = new FilterHelper(F05311.CoefTableStrKeys.Coef2, this.Document.TableP3Rows);
                }
                return this._filterHelper;
            },
            enumerable: true,
            configurable: true
        });
        P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Total)) {
                    return SheetFormatCollection.Calc;
                }
                else if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Pay)) {
                    return SheetFormatCollection.Free;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Total)) {
                            return SheetFormatCollection.Calc;
                        }
                        else if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Pay)) {
                            return SheetFormatCollection.Default;
                        }
                        else {
                            return SheetFormatCollection.Free;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return P4Sheet._totalRowName;
                    case this.RowCodeColumn:
                        return P4Sheet._totalRowCode;
                    default:
                        if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Total)) {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                        else if (!this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Pay)) {
                            return ObasHelper.X;
                        }
                }
            }
            else if (column === this.RowCodeColumn) {
                return this.CalcRowCode(row, P4Sheet._rowCodeLength);
            }
            else if (this.IsColumnInDataBlock(column, P4SheetColumnBlocks.Pay)) {
                return ObasHelper.X;
            }
            return undefined;
        };
        P4Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return this.GetInsCountYearsCaption(index) + "\n(\u0433\u0440. " + (2 + index) + " \u0440\u0430\u0437\u0434. 3 * \u0433\u0440. " + (3 + index) + " \u043F\u043E \u0441\u0442\u0440.900 * \u0433\u0440. " + (6 + index) + " * (1 + \u0433\u0440. " + (9 + index) + " / 100))";
        };
        P4Sheet.prototype.GetInsCountYearsCaption = function (index) {
            var year = ObasStageSettings.CurrentYear + index;
            var desc;
            switch (year) {
                case ObasStageSettings.CurrentYear:
                    desc = "на текущий финансовый год";
                    break;
                case ObasStageSettings.CurrentYear + 1:
                    desc = "на очередной финансовый год";
                    break;
                case ObasStageSettings.CurrentYear + 2:
                    desc = "на первый год планового периода";
                    break;
                case ObasStageSettings.CurrentYear + 3:
                    desc = "на второй год планового периода";
                    break;
                default: desc = "";
            }
            return "\u043D\u0430 " + year + " \u0433\u043E\u0434 (" + desc + ")";
        };
        return P4Sheet;
    }(YearsSheetTyped));
    P4Sheet._totalRowName = "Итого";
    P4Sheet._totalRowCode = "900";
    P4Sheet._rowCodeLength = P4Sheet._totalRowCode.length;
    F05311.P4Sheet = P4Sheet;
})(F05311 || (F05311 = {}));
