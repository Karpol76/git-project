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
var BaseAnalyticsDocumentObject = (function (_super) {
    __extends(BaseAnalyticsDocumentObject, _super);
    function BaseAnalyticsDocumentObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._analyticsRowsTable = null;
        _this._analyticsDataTable = null;
        _this._analyticsSheet = null;
        return _this;
    }
    Object.defineProperty(BaseAnalyticsDocumentObject.prototype, "AnalyticsRowsTable", {
        get: function () {
            if (this._analyticsRowsTable == null) {
                this._analyticsRowsTable = new AnalyticsRowsTable("AnalyticsRows");
            }
            ObasTableCollection.RroDataTable.GetCSRCode();
            return this._analyticsRowsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAnalyticsDocumentObject.prototype, "AnalyticsTable", {
        get: function () {
            if (this._analyticsDataTable == null) {
                this._analyticsDataTable = new AnalyticsDataTable("AnalyticsValues", this);
            }
            return this._analyticsDataTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAnalyticsDocumentObject.prototype, "AnalyticsSheet", {
        get: function () {
            if (this._analyticsSheet == null) {
                this._analyticsSheet = new AnalyticSheet("SHT_RA", this.AnalyticsRowsTable, this);
            }
            return this._analyticsSheet;
        },
        enumerable: true,
        configurable: true
    });
    return BaseAnalyticsDocumentObject;
}(BaseDocumentObject));
var AnalyticsRowsTable = (function (_super) {
    __extends(AnalyticsRowsTable, _super);
    function AnalyticsRowsTable(id) {
        var _this = _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], "AnalyticCode", "AnalyticName") || this;
        _this._isAgrRow = null;
        _this._barsCodeField = null;
        return _this;
    }
    Object.defineProperty(AnalyticsRowsTable.prototype, "BarsCodeField", {
        get: function () {
            if (this._barsCodeField == null) {
                var barsCodeId = BaseObasTableFields.BarsCodeField.Id;
                if (this.GetFieldsIds().indexOf(barsCodeId) > -1) {
                    this._barsCodeField = new ObasTableField(barsCodeId, this);
                }
                else {
                    this._barsCodeField = new ObasTableField(BaseObasTableFields.RecordKeyField.Id, this);
                }
            }
            return this._barsCodeField;
        },
        enumerable: true,
        configurable: true
    });
    AnalyticsRowsTable.prototype.GenerateBarsCode = function () {
        return ObasHelper.FillWithCharacter(this.RecordKey.Value + 1, 2);
    };
    Object.defineProperty(AnalyticsRowsTable.prototype, "BarsCode", {
        get: function () {
            var result = (this.BarsCodeField.Id === BaseObasTableFields.RecordKeyField.Id
                ? this.GenerateBarsCode()
                : this.BarsCodeField.Value);
            var strName = this.Name.Value;
            if (strName && (strName.indexOf("ераспределенный остаток") > -1 || strName.indexOf("ераспределённый остаток") > -1)) {
                result = "diff";
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnalyticsRowsTable.prototype, "IsAgrRow", {
        get: function () {
            if (this._isAgrRow == null) {
                this._isAgrRow = new ObasTableField("IsAgr", this);
            }
            return this._isAgrRow;
        },
        enumerable: true,
        configurable: true
    });
    return AnalyticsRowsTable;
}(SprTable));
var AnalyticsDataTable = (function (_super) {
    __extends(AnalyticsDataTable, _super);
    function AnalyticsDataTable(id, _document, _parentStrTable) {
        if (_parentStrTable === void 0) { _parentStrTable = _document.AnalyticsRowsTable; }
        var _this = _super.call(this, id, [BaseObasTableFields.StrKeyField.Id]) || this;
        _this._document = _document;
        _this._parentStrTable = _parentStrTable;
        _this._agrKeys = null;
        _this._isHasParentRows = null;
        _this._strKeyField = null;
        _this._ownerKeyField = null;
        _this._isAgr = new ObasTableField(_parentStrTable.IsAgrRow.Id, _this);
        return _this;
    }
    Object.defineProperty(AnalyticsDataTable.prototype, "BarsCode", {
        get: function () {
            if (this._parentStrTable.LocateByKeys(this.StrKeyField.Value)) {
                return this._parentStrTable.BarsCode;
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnalyticsDataTable.prototype, "StrKeyField", {
        get: function () {
            if (this._strKeyField == null) {
                this._strKeyField = new ObasForeignKeyTableFieldTyped(this._parentStrTable, this, BaseObasTableFields.StrKeyField.Id, false);
            }
            return this._strKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnalyticsDataTable.prototype, "OwnerKeyField", {
        get: function () {
            if (this._ownerKeyField == null) {
                this._ownerKeyField = new ObasTableField(BaseObasTableFields.OwnerKeyField.Id, this);
            }
            return this._ownerKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnalyticsDataTable.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnalyticsDataTable.prototype, "AgrKeys", {
        get: function () {
            var _this = this;
            if (this._agrKeys == null) {
                this._agrKeys = [];
                var callback = function () {
                    if (_this._isAgr.Value) {
                        _this._agrKeys.push(_this._parentStrTable.RecordKey.Value);
                    }
                };
                this._parentStrTable.Iterate(callback);
            }
            return this._agrKeys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnalyticsDataTable.prototype, "IsAgr", {
        get: function () {
            return this._isAgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnalyticsDataTable.prototype, "IsHasParentRows", {
        get: function () {
            if (this._isHasParentRows == null) {
                this._isHasParentRows = this.IsFieldExists(BaseObasTableFields.OwnerKeyField.Id);
            }
            return this._isHasParentRows;
        },
        enumerable: true,
        configurable: true
    });
    AnalyticsDataTable.prototype.ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        if (this.IsHasParentRows) {
            var parentKey = this.OwnerKeyField.Value;
            if (!(parentKey == null || parentKey === -1 || parentKey === 0)) {
                this._document.CommonRules.SetSumByKeys(this, this.KeyFieldIds, [parentKey], fieldId, oldValue, newValue);
            }
        }
    };
    AnalyticsDataTable.prototype.InitCopyFieldsInfo = function () {
        var result = new collections.Dictionary();
        result.setValue(this.StrKeyField.Id, {
            Id: this.StrKeyField.Id,
            IsData: false
        });
        var yearField = BaseObasTableFields.YearDataField;
        for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
            var fieldId = yearField.GenerateId(i);
            result.setValue(fieldId, {
                Id: fieldId,
                IsData: true
            });
        }
        return result;
    };
    AnalyticsDataTable.prototype.CollectUserData = function () {
        var _this = this;
        var filter = function () {
            return !_this.IsAgr.Value;
        };
        return this.CollectTableData(this.InitCopyFieldsInfo(), filter);
    };
    AnalyticsDataTable.prototype.ResetData = function () {
        var _this = this;
        var yearField = BaseObasTableFields.YearDataField;
        var yearCnt = ObasStageSettings.YearsCount;
        var resetDataHandler = function () {
            for (var i = 1; i <= yearCnt; i++) {
                _this.SetFieldValue(yearField.GenerateId(i), 0);
            }
        };
        this.Iterate(resetDataHandler);
    };
    AnalyticsDataTable.prototype.CopyData = function (srcYear, destYear) {
        var _this = this;
        var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount - 1;
        var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount;
        var yearField = BaseObasTableFields.YearDataField;
        var srcFieldId = yearField.GenerateId(srcIndex);
        var destFieldId = yearField.GenerateId(destIndex);
        var copy = function () {
            if (!_this.IsAgr.Value) {
                _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
            }
        };
        this.Iterate(copy);
    };
    return AnalyticsDataTable;
}(ObasTable));
var BaseAnalyticSheet = (function (_super) {
    __extends(BaseAnalyticSheet, _super);
    function BaseAnalyticSheet(id, _rowsTable, _document) {
        var _this = _super.call(this, id, false) || this;
        _this._rowsTable = _rowsTable;
        _this._document = _document;
        _this._agrKeys = null;
        _this.InitAgrKeys();
        return _this;
    }
    Object.defineProperty(BaseAnalyticSheet.prototype, "RowsTable", {
        get: function () {
            return this._rowsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAnalyticSheet.prototype, "AgrKeys", {
        get: function () {
            if (this._agrKeys == null) {
                this.InitAgrKeys();
            }
            return this._agrKeys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAnalyticSheet.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    BaseAnalyticSheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
        return (row > 0 && this.AgrKeys.indexOf(row) === -1);
    };
    BaseAnalyticSheet.prototype.FirstRowLoadEventHandler = function (tableId) {
        return (this._document.Tables.getValue(tableId).GetFieldValue(BaseObasTableFields.TotalRowFlagField.Id) === 1);
    };
    BaseAnalyticSheet.prototype.InitAgrKeys = function () {
        var _this = this;
        if (this._agrKeys == null) {
            this._agrKeys = [];
            var rowsTable_1 = this.RowsTable;
            var rowIndex_1 = 1;
            var callback = function () {
                if (rowsTable_1.IsAgrRow.Value) {
                    _this._agrKeys.push(rowIndex_1);
                }
                rowIndex_1++;
            };
            rowsTable_1.Iterate(callback, true);
        }
    };
    return BaseAnalyticSheet;
}(Sheet));
var GenericAnalyticSheet = (function (_super) {
    __extends(GenericAnalyticSheet, _super);
    function GenericAnalyticSheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericAnalyticSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
        if (column > 1) {
            if (row === 0) {
                return SheetFormatCollection.Related;
            }
            else if (this.AgrKeys.indexOf(row) > -1) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Related;
            }
        }
        return SheetFormatCollection.Default;
    };
    return GenericAnalyticSheet;
}(BaseAnalyticSheet));
var AnalyticSheet = (function (_super) {
    __extends(AnalyticSheet, _super);
    function AnalyticSheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnalyticSheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
        if (column > 1) {
            if (row === 0) {
                return SheetFormatCollection.Related;
            }
            else if (this.AgrKeys.indexOf(row) > -1) {
                return SheetFormatCollection.Calc;
            }
            else {
                return SheetFormatCollection.Free;
            }
        }
        return SheetFormatCollection.Default;
    };
    AnalyticSheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
        if (column > 1 && this.Document.CommonRules.IsFooterRow(this, row)) {
            var result = new SheetCalcResult(BaseFormulas.SUB);
            result.AddCoordinates(new CellCoordinate(0, column));
            for (var i = 1; i < this.RowCount; i++) {
                if (this.AgrKeys.indexOf(i) === -1) {
                    result.AddCoordinates(new CellCoordinate(i, column));
                }
            }
            return result.ToArray();
        }
        return undefined;
    };
    return AnalyticSheet;
}(BaseAnalyticSheet));
