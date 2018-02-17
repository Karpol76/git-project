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
var F05105;
(function (F05105) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05105.TableRules = TableRules;
    var P1TotalTableRowKey;
    (function (P1TotalTableRowKey) {
        P1TotalTableRowKey[P1TotalTableRowKey["TotalCalced"] = 1] = "TotalCalced";
        P1TotalTableRowKey[P1TotalTableRowKey["FotCalced"] = 2] = "FotCalced";
        P1TotalTableRowKey[P1TotalTableRowKey["IsuranceCalced"] = 3] = "IsuranceCalced";
        P1TotalTableRowKey[P1TotalTableRowKey["OtherCalced"] = 4] = "OtherCalced";
        P1TotalTableRowKey[P1TotalTableRowKey["Communication"] = 5] = "Communication";
        P1TotalTableRowKey[P1TotalTableRowKey["Transport"] = 6] = "Transport";
        P1TotalTableRowKey[P1TotalTableRowKey["Utilities"] = 7] = "Utilities";
        P1TotalTableRowKey[P1TotalTableRowKey["Travel"] = 8] = "Travel";
        P1TotalTableRowKey[P1TotalTableRowKey["FixedAssets"] = 9] = "FixedAssets";
        P1TotalTableRowKey[P1TotalTableRowKey["Inventories"] = 10] = "Inventories";
    })(P1TotalTableRowKey = F05105.P1TotalTableRowKey || (F05105.P1TotalTableRowKey = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P1TotalTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField, this.IsTotalKeyField];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1TotalTableRowKey.TotalCalced;
        };
        P1TotalTable.prototype.IsUserEditRow = function (row) {
            if (row === void 0) { row = this.StrKey; }
            return P1TotalTableRowKey[row].indexOf("Calced") === -1;
        };
        P1TotalTable.prototype.CollectUserData = function () {
            var _this = this;
            return this.CollectTableData(this.InitCopyFieldsInfo(), function () {
                return _this.IsUserEditRow();
            });
        };
        P1TotalTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, function () {
                return _this.IsUserEditRow();
            }, BaseObasTableFields.YearDataField);
        };
        P1TotalTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F05105.P1TotalTable = P1TotalTable;
    var P3DataTableKeys = (function (_super) {
        __extends(P3DataTableKeys, _super);
        function P3DataTableKeys(Year, RowKey) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            _this.RowKey = RowKey;
            return _this;
        }
        return P3DataTableKeys;
    }(ObasTableKeys));
    var P3DataTable = (function (_super) {
        __extends(P3DataTable, _super);
        function P3DataTable(id, document, parentTable, _sumTable, _insuranceTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.YearField.Id, BaseObasTableFields.OwnerKeyField.Id], document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._insuranceTable = _insuranceTable;
            _this._copyData = null;
            _this._isCopied = null;
            _this._count = null;
            _this._pay = null;
            _this._total = null;
            _this._assistCount = null;
            _this._year = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P3DataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.Year, this.OwnerKey, this.Count, this.Pay, this.AssistCount];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3DataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3DataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3DataTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.NValue - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3DataTable.prototype, "AssistCount", {
            get: function () {
                if (this._assistCount == null) {
                    this._assistCount = new NumberObasTableField("AssistCount", this);
                }
                return this._assistCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3DataTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberObasTableField("Total", this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3DataTable.prototype, "Pay", {
            get: function () {
                if (this._pay == null) {
                    this._pay = new NumberObasTableField("Pay", this);
                }
                return this._pay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3DataTable.prototype, "Count", {
            get: function () {
                if (this._count == null) {
                    this._count = new NumberObasTableField("Count", this);
                }
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3DataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        P3DataTable.prototype.CountChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._insuranceTable.SetCountValue(this.YearOffset, oldValue, newValue);
            this.SumPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        P3DataTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.NValue = this.Count.NValue * this.Pay.NValue * 12;
        };
        P3DataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._insuranceTable.SetFotValue(this.YearOffset, oldValue, newValue);
            this._sumTable.SetSumByKeys(this.Year.NValue, this._sumTable.GetKeys(P1TotalTableRowKey.FotCalced), oldValue, newValue);
        };
        P3DataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P3DataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P3DataTable.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                _this.Count.NValue = 0;
                _this.Pay.NValue = 0;
                _this.Total.NValue = 0;
            };
            this.Iterate(resetDataHandler);
        };
        P3DataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    copyData.getValue(this.Year.Id).Value =
                        keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.RecordKey.Locate(recordKey);
            }
        };
        P3DataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        P3DataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P3DataTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var endYear = ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount;
            if (srcYear == null) {
                srcYear = endYear - 2;
            }
            if (destYear == null) {
                destYear = endYear - 1;
            }
            if (srcYear && destYear) {
                var copyHandler = function (table, recordKey) {
                    if (_this.Year.Value === srcYear) {
                        _this.InnerCopyData(recordKey, destYear);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        P3DataTable.prototype.GetKeys = function (year, rowKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (rowKey === void 0) { rowKey = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new P3DataTableKeys(year, rowKey);
            }
            else {
                this._keys.Year = year;
                this._keys.RowKey = rowKey;
            }
            return this._keys;
        };
        return P3DataTable;
    }(ObasTableWithKeysParent));
    F05105.P3DataTable = P3DataTable;
    var InsuranceValuesTable = (function (_super) {
        __extends(InsuranceValuesTable, _super);
        function InsuranceValuesTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InsuranceValuesTable.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var destTable = this.ParentTable;
            destTable.SetSumByKeys(fieldId, destTable.GetKeys(P1TotalTableRowKey.IsuranceCalced), oldValue, newValue);
        };
        return InsuranceValuesTable;
    }(InsuranceObasTable));
    F05105.InsuranceValuesTable = InsuranceValuesTable;
})(F05105 || (F05105 = {}));
