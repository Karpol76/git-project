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
var F05325;
(function (F05325) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    InterfaceRules.TotalRowName = "Итого";
    InterfaceRules.TotalRowCode = "900";
    InterfaceRules.RowCodeLength = InterfaceRules.TotalRowCode.length;
    F05325.InterfaceRules = InterfaceRules;
    var P3SheetColumnBlocks;
    (function (P3SheetColumnBlocks) {
        P3SheetColumnBlocks[P3SheetColumnBlocks["Pay"] = 0] = "Pay";
        P3SheetColumnBlocks[P3SheetColumnBlocks["Count"] = 1] = "Count";
        P3SheetColumnBlocks[P3SheetColumnBlocks["Total"] = 2] = "Total";
    })(P3SheetColumnBlocks || (P3SheetColumnBlocks = {}));
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (column === this.RowCodeColumn) {
                return SheetFormatCollection.Default;
            }
            else if (this.IsFooterRow(row)) {
                if (column < this.CalcStartBlockColumn(P3SheetColumnBlocks.Count)) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                if (this.IsColumnInDataBlock(column, P3SheetColumnBlocks.Total)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return SheetFormatCollection.Related;
                }
            }
        };
        P3Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return InterfaceRules.TotalRowName;
                    case this.RowCodeColumn:
                        return InterfaceRules.TotalRowCode;
                    default:
                        if (this.IsColumnInDataBlock(column, P3SheetColumnBlocks.Pay)) {
                            return ObasHelper.X;
                        }
                        else {
                            return this.Document.CommonRules.GetFooterSum(this, row, column);
                        }
                }
            }
            else {
                if (column === this.RowCodeColumn) {
                    return this.CalcRowCode(row, InterfaceRules.RowCodeLength);
                }
            }
            return undefined;
        };
        return P3Sheet;
    }(YearsSheetTyped));
    F05325.P3Sheet = P3Sheet;
    var P4SheetColumns;
    (function (P4SheetColumns) {
        P4SheetColumns[P4SheetColumns["Name"] = 0] = "Name";
        P4SheetColumns[P4SheetColumns["Code"] = 1] = "Code";
        P4SheetColumns[P4SheetColumns["AveragePayment"] = 2] = "AveragePayment";
        P4SheetColumns[P4SheetColumns["TotalCost"] = 3] = "TotalCost";
        P4SheetColumns[P4SheetColumns["CommunicationCost"] = 4] = "CommunicationCost";
        P4SheetColumns[P4SheetColumns["TransportCost"] = 5] = "TransportCost";
        P4SheetColumns[P4SheetColumns["UtilitiesCost"] = 6] = "UtilitiesCost";
        P4SheetColumns[P4SheetColumns["TravelCost"] = 7] = "TravelCost";
        P4SheetColumns[P4SheetColumns["InventoryCost"] = 8] = "InventoryCost";
        P4SheetColumns[P4SheetColumns["RentCost"] = 9] = "RentCost";
        P4SheetColumns[P4SheetColumns["TotalPayment"] = 10] = "TotalPayment";
    })(P4SheetColumns || (P4SheetColumns = {}));
    var P4GroupSheet = (function (_super) {
        __extends(P4GroupSheet, _super);
        function P4GroupSheet(document) {
            return _super.call(this, document) || this;
        }
        P4GroupSheet.prototype.IsCalcColumn = function (column) {
            return (P4SheetColumns[column] || "").indexOf("Total") > -1;
        };
        P4GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case P4SheetColumns.Name:
                    return SheetFormatCollection.Spr;
                case P4SheetColumns.Code:
                    return SheetFormatCollection.Default;
                default:
                    if (this.IsCalcColumn(column)) {
                        return SheetFormatCollection.Calc;
                    }
                    else {
                        return SheetFormatCollection.Free;
                    }
            }
        };
        P4GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            switch (column) {
                case P4SheetColumns.Code:
                    return ObasHelper.FillWithCharacter(row + 1, InterfaceRules.RowCodeLength);
                case P4SheetColumns.TotalCost:
                    var result = new SheetCalcResult(BaseFormulas.SUM);
                    for (var i = P4SheetColumns.CommunicationCost; i <= P4SheetColumns.RentCost; i++) {
                        result.AddCoordinates(new CellCoordinate(row, i));
                    }
                    return result.ToArray();
            }
            return undefined;
        };
        return P4GroupSheet;
    }(YearGroupSheet));
    F05325.P4GroupSheet = P4GroupSheet;
    var P5SheetColumns;
    (function (P5SheetColumns) {
        P5SheetColumns[P5SheetColumns["Name"] = 0] = "Name";
        P5SheetColumns[P5SheetColumns["Code"] = 1] = "Code";
        P5SheetColumns[P5SheetColumns["ControlCount"] = 2] = "ControlCount";
        P5SheetColumns[P5SheetColumns["ControlTime"] = 3] = "ControlTime";
        P5SheetColumns[P5SheetColumns["LicenseCount"] = 4] = "LicenseCount";
        P5SheetColumns[P5SheetColumns["LicenseTime"] = 5] = "LicenseTime";
        P5SheetColumns[P5SheetColumns["WorkTime"] = 6] = "WorkTime";
        P5SheetColumns[P5SheetColumns["EmployeeCount"] = 7] = "EmployeeCount";
    })(P5SheetColumns || (P5SheetColumns = {}));
    var P5GroupSheet = (function (_super) {
        __extends(P5GroupSheet, _super);
        function P5GroupSheet(document) {
            var _this = _super.call(this, document) || this;
            _this._sheets = new collections.Dictionary();
            return _this;
        }
        P5GroupSheet.prototype.GetSheet = function (sheetId) {
            var result = this._sheets.getValue(sheetId);
            if (result == null) {
                result = new YearsSheet(sheetId, this.Document, 1);
                this._sheets.setValue(sheetId, result);
            }
            return result;
        };
        P5GroupSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooterRow = this.GetSheet(sheetId).IsFooterRow(row);
            switch (column) {
                case P5SheetColumns.Name:
                    return isFooterRow ? SheetFormatCollection.Default : SheetFormatCollection.Related;
                case P5SheetColumns.Code:
                    return SheetFormatCollection.Default;
                case P5SheetColumns.EmployeeCount:
                    return SheetFormatCollection.Calc;
                default:
                    return isFooterRow ? SheetFormatCollection.Calc : SheetFormatCollection.Free;
            }
        };
        P5GroupSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var sheet = this.GetSheet(sheetId);
            if (sheet.IsFooterRow(row)) {
                switch (column) {
                    case P5SheetColumns.Name:
                        return InterfaceRules.TotalRowName;
                    case P5SheetColumns.Code:
                        return InterfaceRules.TotalRowCode;
                    default:
                        return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            else {
                if (column === P5SheetColumns.Code) {
                    return sheet.CalcRowCode(row, InterfaceRules.RowCodeLength);
                }
            }
            return undefined;
        };
        return P5GroupSheet;
    }(YearGroupSheet));
    F05325.P5GroupSheet = P5GroupSheet;
})(F05325 || (F05325 = {}));
