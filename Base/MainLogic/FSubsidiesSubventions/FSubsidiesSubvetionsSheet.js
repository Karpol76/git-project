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
var SubsidiesSubventions;
(function (SubsidiesSubventions) {
    var SheetTotalRows;
    (function (SheetTotalRows) {
        SheetTotalRows[SheetTotalRows["DistributedVolume"] = 3] = "DistributedVolume";
        SheetTotalRows[SheetTotalRows["UndistributedReserve"] = 2] = "UndistributedReserve";
        SheetTotalRows[SheetTotalRows["Total"] = 1] = "Total";
    })(SheetTotalRows = SubsidiesSubventions.SheetTotalRows || (SubsidiesSubventions.SheetTotalRows = {}));
    var P1Sheet = (function (_super) {
        __extends(P1Sheet, _super);
        function P1Sheet(id, document, rowCodeColumn, _nameColumnFormat, _dataColumnFormat) {
            if (rowCodeColumn === void 0) { rowCodeColumn = 1; }
            if (_nameColumnFormat === void 0) { _nameColumnFormat = SheetFormatCollection.Default; }
            if (_dataColumnFormat === void 0) { _dataColumnFormat = SheetFormatCollection.Related; }
            var _this = _super.call(this, id, document, rowCodeColumn) || this;
            _this._nameColumnFormat = _nameColumnFormat;
            _this._dataColumnFormat = _dataColumnFormat;
            return _this;
        }
        P1Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            switch (column) {
                case this.RowNameColumn:
                    return this._nameColumnFormat;
                default:
                    return this._dataColumnFormat;
            }
        };
        return P1Sheet;
    }(YearsSheetTyped));
    SubsidiesSubventions.P1Sheet = P1Sheet;
    var FSheetOptions = (function () {
        function FSheetOptions(_footerRowCount, _nameColumnFormat, _dataColumnFormat, _totalRowFormat) {
            if (_footerRowCount === void 0) { _footerRowCount = ObasHelper.GetEnumLength(SheetTotalRows); }
            if (_nameColumnFormat === void 0) { _nameColumnFormat = SheetFormatCollection.Spr; }
            if (_dataColumnFormat === void 0) { _dataColumnFormat = SheetFormatCollection.Free; }
            if (_totalRowFormat === void 0) { _totalRowFormat = SheetFormatCollection.Free; }
            this._footerRowCount = _footerRowCount;
            this._nameColumnFormat = _nameColumnFormat;
            this._dataColumnFormat = _dataColumnFormat;
            this._totalRowFormat = _totalRowFormat;
        }
        Object.defineProperty(FSheetOptions.prototype, "FooterRowCount", {
            get: function () {
                return this._footerRowCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FSheetOptions.prototype, "NameColumnFormat", {
            get: function () {
                return this._nameColumnFormat;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FSheetOptions.prototype, "DataColumnFormat", {
            get: function () {
                return this._dataColumnFormat;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FSheetOptions.prototype, "TotalRowFormat", {
            get: function () {
                return this._totalRowFormat;
            },
            enumerable: true,
            configurable: true
        });
        return FSheetOptions;
    }());
    SubsidiesSubventions.FSheetOptions = FSheetOptions;
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document, _sheetOptions, rowCodeColumn) {
            if (rowCodeColumn === void 0) { rowCodeColumn = 1; }
            var _this = _super.call(this, id, document, rowCodeColumn, _sheetOptions.FooterRowCount) || this;
            _this._sheetOptions = _sheetOptions;
            return _this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsDataColumn(column)) {
                    if (this.IsTotalRow(row)) {
                        return this._sheetOptions.TotalRowFormat;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
                else {
                    return SheetFormatCollection.Default;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return this._sheetOptions.NameColumnFormat;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        return this._sheetOptions.DataColumnFormat;
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            var rowCount = this.RowCount;
            if (column === this.RowCodeColumn && !isFooter) {
                return ObasHelper.FillWithCharacter((row + 1), 3);
            }
            else if (isFooter) {
                if (this.IsDataColumn(column)) {
                    switch (row) {
                        case rowCount - SheetTotalRows.DistributedVolume:
                            if (row > 0) {
                                return this.Document.CommonRules.GetFooterSum(this, row, column);
                            }
                            break;
                        case rowCount - SheetTotalRows.UndistributedReserve:
                            if (row === 0) {
                                return this.GetCellValue(row + 1, fieldId) || 0;
                            }
                            else {
                                var result = new SheetCalcResult(BaseFormulas.SUB);
                                result.AddCoordinates(new CellCoordinate(row + 1, column));
                                switch (this._sheetOptions.FooterRowCount) {
                                    case 2:
                                        for (var i = 0; i < row; i++) {
                                            result.AddCoordinates(new CellCoordinate(i, column));
                                        }
                                        return result.ToArray();
                                    case 3:
                                        result.AddCoordinates(new CellCoordinate(row - 1, column));
                                        return result.ToArray();
                                }
                            }
                    }
                }
            }
            return undefined;
        };
        P2Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return this.IsDataColumn(column) && (!this.IsFooterRow(row) || this.IsTotalRow(row));
        };
        return P2Sheet;
    }(YearsSheetTyped));
    SubsidiesSubventions.P2Sheet = P2Sheet;
    var FSheet = (function (_super) {
        __extends(FSheet, _super);
        function FSheet(id, document, sheetOptions, _subjectTable, _editors, rowCodeColumn) {
            if (rowCodeColumn === void 0) { rowCodeColumn = 1; }
            var _this = _super.call(this, id, document, sheetOptions, rowCodeColumn) || this;
            _this._subjectTable = _subjectTable;
            _this._editors = _editors;
            return _this;
        }
        FSheet.prototype.EditorIdEventHandler = function () {
            var keyDic = this._subjectTable.CalcFieldSelect();
            switch (keyDic) {
                case SubsidiesSubventions.KeySubjectDictionary.Subject:
                    return this._editors.SubjectEditorName;
                case SubsidiesSubventions.KeySubjectDictionary.ScienceCity:
                    return this._editors.ScienceEditorName;
                case SubsidiesSubventions.KeySubjectDictionary.Zato:
                    return this._editors.ZatoEditorName;
                case SubsidiesSubventions.KeySubjectDictionary.Municipal:
                    return this._editors.Municipal;
                default:
                    return "";
            }
        };
        return FSheet;
    }(P2Sheet));
    SubsidiesSubventions.FSheet = FSheet;
    var CoefficientsSheet = (function (_super) {
        __extends(CoefficientsSheet, _super);
        function CoefficientsSheet(id, document, rowCodeColumn) {
            if (rowCodeColumn === void 0) { rowCodeColumn = 1; }
            return _super.call(this, id, document, rowCodeColumn) || this;
        }
        CoefficientsSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsDataColumn(column)) {
                return SheetFormatCollection.Free;
            }
            return SheetFormatCollection.Default;
        };
        return CoefficientsSheet;
    }(YearsSheetTyped));
    SubsidiesSubventions.CoefficientsSheet = CoefficientsSheet;
    var EditorsSubjects = (function () {
        function EditorsSubjects(_subjectEditorName, _scienceEditorName, _zatoEditorName, _municipal) {
            this._subjectEditorName = _subjectEditorName;
            this._scienceEditorName = _scienceEditorName;
            this._zatoEditorName = _zatoEditorName;
            this._municipal = _municipal;
        }
        Object.defineProperty(EditorsSubjects.prototype, "SubjectEditorName", {
            get: function () {
                return this._subjectEditorName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditorsSubjects.prototype, "ScienceEditorName", {
            get: function () {
                return this._scienceEditorName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditorsSubjects.prototype, "ZatoEditorName", {
            get: function () {
                return this._zatoEditorName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditorsSubjects.prototype, "Municipal", {
            get: function () {
                return this._municipal;
            },
            enumerable: true,
            configurable: true
        });
        return EditorsSubjects;
    }());
    SubsidiesSubventions.EditorsSubjects = EditorsSubjects;
})(SubsidiesSubventions || (SubsidiesSubventions = {}));
