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
var InsuranceSheetRows;
(function (InsuranceSheetRows) {
    InsuranceSheetRows[InsuranceSheetRows["PensionTotal"] = 0] = "PensionTotal";
    InsuranceSheetRows[InsuranceSheetRows["Pension22"] = 1] = "Pension22";
    InsuranceSheetRows[InsuranceSheetRows["Pension10"] = 2] = "Pension10";
    InsuranceSheetRows[InsuranceSheetRows["SocialTotal"] = 3] = "SocialTotal";
    InsuranceSheetRows[InsuranceSheetRows["SocialDisability"] = 4] = "SocialDisability";
    InsuranceSheetRows[InsuranceSheetRows["SocialAccidents"] = 5] = "SocialAccidents";
    InsuranceSheetRows[InsuranceSheetRows["Health"] = 6] = "Health";
    InsuranceSheetRows[InsuranceSheetRows["AdjustTotal"] = 7] = "AdjustTotal";
    InsuranceSheetRows[InsuranceSheetRows["AdjustRound"] = 8] = "AdjustRound";
    InsuranceSheetRows[InsuranceSheetRows["AdjustRegress"] = 9] = "AdjustRegress";
    InsuranceSheetRows[InsuranceSheetRows["AdjustSocial"] = 10] = "AdjustSocial";
    InsuranceSheetRows[InsuranceSheetRows["AdjustLowTarif"] = 11] = "AdjustLowTarif";
    InsuranceSheetRows[InsuranceSheetRows["Total"] = 12] = "Total";
})(InsuranceSheetRows || (InsuranceSheetRows = {}));
var InsuranceSheetColumnBlocks;
(function (InsuranceSheetColumnBlocks) {
    InsuranceSheetColumnBlocks[InsuranceSheetColumnBlocks["TaxBase"] = 0] = "TaxBase";
    InsuranceSheetColumnBlocks[InsuranceSheetColumnBlocks["Total"] = 1] = "Total";
})(InsuranceSheetColumnBlocks || (InsuranceSheetColumnBlocks = {}));
var BaseInsuranceSheet = (function (_super) {
    __extends(BaseInsuranceSheet, _super);
    function BaseInsuranceSheet(id, document, rowCodeColumn, _onlyInsMode) {
        var _this = _super.call(this, id, document, rowCodeColumn) || this;
        _this._onlyInsMode = _onlyInsMode;
        return _this;
    }
    BaseInsuranceSheet.prototype.ClacRelRow = function (row) {
        return row % BaseInsuranceSheet._relRowCount;
    };
    BaseInsuranceSheet.prototype.IsTaxColumn = function (column) {
        return this.IsColumnInDataBlock(column, InsuranceSheetColumnBlocks.TaxBase);
    };
    BaseInsuranceSheet.prototype.IsTotalColumn = function (column) {
        return this.IsColumnInDataBlock(column, InsuranceSheetColumnBlocks.Total);
    };
    BaseInsuranceSheet.prototype.IsXCell = function (row, column) {
        var relRow = this.ClacRelRow(row);
        return BaseInsuranceSheet._xRows.indexOf(relRow) > -1 && this.IsTaxColumn(column);
    };
    BaseInsuranceSheet.prototype.IsFreeCell = function (row, column) {
        var relRow = this.ClacRelRow(row);
        return (BaseInsuranceSheet._freeAdjustRows.indexOf(relRow) > -1 && this.IsTotalColumn(column)) ||
            (this._onlyInsMode && BaseInsuranceSheet._freeUserRows.indexOf(relRow) > -1 && this.IsTaxColumn(column));
    };
    BaseInsuranceSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
        if (column > this.RowCodeColumn) {
            if (this.IsXCell(row, column)) {
                return SheetFormatCollection.Default;
            }
            else if (this.IsFreeCell(row, column)) {
                return SheetFormatCollection.Free;
            }
            else {
                return SheetFormatCollection.Calc;
            }
        }
        else {
            if (column < this.RowNameColumn) {
                return SheetFormatCollection.Related;
            }
            else {
                return SheetFormatCollection.Default;
            }
        }
    };
    BaseInsuranceSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
        if (this.IsXCell(row, column)) {
            return ObasHelper.X;
        }
        else {
            if (this.IsTotalColumn(column)) {
                var result = new SheetCalcResult(BaseFormulas.SUM);
                var relRow = this.ClacRelRow(row);
                if (relRow === InsuranceSheetRows.Total) {
                    result.AddCoordinates(new CellCoordinate(row - 5, column));
                    result.AddCoordinates(new CellCoordinate(row - 6, column));
                    result.AddCoordinates(new CellCoordinate(row - 9, column));
                    result.AddCoordinates(new CellCoordinate(row - 12, column));
                    return result.ToArray();
                }
                else {
                    switch (relRow) {
                        case InsuranceSheetRows.PensionTotal:
                        case InsuranceSheetRows.SocialTotal:
                        case InsuranceSheetRows.AdjustTotal:
                            var length_1 = (relRow === InsuranceSheetRows.AdjustTotal ? 5 : 3);
                            for (var i = 1; i < length_1; i++) {
                                result.AddCoordinates(new CellCoordinate(row + i, column));
                            }
                            return result.ToArray();
                    }
                }
            }
        }
        return undefined;
    };
    BaseInsuranceSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
        return this.IsFreeCell(row, column);
    };
    return BaseInsuranceSheet;
}(YearsSheet));
BaseInsuranceSheet._relRowCount = ObasHelper.GetEnumLength(InsuranceSheetRows);
BaseInsuranceSheet._xRows = [InsuranceSheetRows.PensionTotal,
    InsuranceSheetRows.SocialTotal,
    InsuranceSheetRows.AdjustTotal,
    InsuranceSheetRows.AdjustRound,
    InsuranceSheetRows.AdjustRegress,
    InsuranceSheetRows.AdjustSocial,
    InsuranceSheetRows.AdjustLowTarif,
    InsuranceSheetRows.Total];
BaseInsuranceSheet._freeAdjustRows = [InsuranceSheetRows.AdjustRound,
    InsuranceSheetRows.AdjustRegress,
    InsuranceSheetRows.AdjustSocial,
    InsuranceSheetRows.AdjustLowTarif];
BaseInsuranceSheet._freeUserRows = [InsuranceSheetRows.AdjustRound,
    InsuranceSheetRows.Pension22,
    InsuranceSheetRows.Pension10,
    InsuranceSheetRows.SocialDisability,
    InsuranceSheetRows.SocialAccidents,
    InsuranceSheetRows.Health];
var OrgInsuranceSheet = (function (_super) {
    __extends(OrgInsuranceSheet, _super);
    function OrgInsuranceSheet(id, document, _codeInfo, _totalOrgRowName, _totalOrgRowCode, canEditTax) {
        if (_totalOrgRowCode === void 0) { _totalOrgRowCode = 90; }
        if (canEditTax === void 0) { canEditTax = false; }
        var _this = _super.call(this, id, document, _codeInfo.Column, canEditTax) || this;
        _this._codeInfo = _codeInfo;
        _this._totalOrgRowName = _totalOrgRowName;
        _this._totalOrgRowCode = _totalOrgRowCode;
        return _this;
    }
    OrgInsuranceSheet.prototype.CalcStrCode = function (row, column) {
        var code;
        if (this.IsFooterRow(row)) {
            code = this._codeInfo.CalcTotalCode(this, row, column);
        }
        else {
            var relRow = this.ClacRelRow(row);
            var orgNum = (row / OrgInsuranceSheet._relRowCount) | 0;
            code = parseInt(this.GetCellValue(row, column, false), 10);
            if (relRow === InsuranceSheetRows.Total) {
                code = this._totalOrgRowCode;
            }
            code += orgNum * 100;
        }
        return ObasHelper.FillWithCharacter(code.toString(), this._codeInfo.Length);
    };
    OrgInsuranceSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
        if (this.IsFooterRow(row)) {
            if (this.IsTotalColumn(column)) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Default;
            }
        }
        else {
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        }
    };
    OrgInsuranceSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
        if (fieldId === BaseObasTableFields.StrCodeField.Id) {
            return this.CalcStrCode(row, column);
        }
        else {
            if (this.IsFooterRow(row)) {
                if (column === this.RowNameColumn) {
                    return OrgInsuranceSheet._totalRowName;
                }
                else if (this.IsTotalColumn(column)) {
                    return this.Document.CommonRules.GetFooterSum(this, row, column, OrgInsuranceSheet._footerSumInfo);
                }
                else if (this.IsTaxColumn(column)) {
                    return ObasHelper.X;
                }
            }
            else {
                if ((this.ClacRelRow(row) === InsuranceSheetRows.Total) && (column === this.RowNameColumn)) {
                    return this._totalOrgRowName;
                }
            }
        }
        return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
    };
    return OrgInsuranceSheet;
}(BaseInsuranceSheet));
OrgInsuranceSheet._totalRowName = "Всего";
OrgInsuranceSheet._footerSumInfo = {
    StartRow: InsuranceSheetRows.Total,
    Step: OrgInsuranceSheet._relRowCount
};
var OnlyInsuranceSheet = (function (_super) {
    __extends(OnlyInsuranceSheet, _super);
    function OnlyInsuranceSheet(id, document) {
        return _super.call(this, id, document, 1, true) || this;
    }
    return OnlyInsuranceSheet;
}(BaseInsuranceSheet));
var InsuranceSheet = (function (_super) {
    __extends(InsuranceSheet, _super);
    function InsuranceSheet(id, document) {
        return _super.call(this, id, document, 1, false) || this;
    }
    return InsuranceSheet;
}(BaseInsuranceSheet));
