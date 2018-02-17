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
var F05121;
(function (F05121) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05121.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 1] = "Total";
    })(P1StrKeys = F05121.P1StrKeys || (F05121.P1StrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1StrKeys.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F05121.P1TotalTable = P1TotalTable;
    var P2RowsTable = (function (_super) {
        __extends(P2RowsTable, _super);
        function P2RowsTable(id) {
            return _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], BaseObasTableFields.StrCodeField.Id) || this;
        }
        return P2RowsTable;
    }(SprTable));
    F05121.P2RowsTable = P2RowsTable;
    var P2DataStrKeys;
    (function (P2DataStrKeys) {
        P2DataStrKeys[P2DataStrKeys["Baykonur"] = 1] = "Baykonur";
    })(P2DataStrKeys = F05121.P2DataStrKeys || (F05121.P2DataStrKeys = {}));
    var P2DataTableStrKeys = (function (_super) {
        __extends(P2DataTableStrKeys, _super);
        function P2DataTableStrKeys(Year, OwnerKey) {
            var _this = _super.call(this, OwnerKey) || this;
            _this.Year = Year;
            return _this;
        }
        return P2DataTableStrKeys;
    }(StrObasTableKeys));
    F05121.P2DataTableStrKeys = P2DataTableStrKeys;
    var P2DataTable = (function (_super) {
        __extends(P2DataTable, _super);
        function P2DataTable(id, document, parent, _sumTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, BaseObasTableFields.YearField.Id], document, parent) || this;
            _this._sumTable = _sumTable;
            _this._incomeSum = null;
            _this._year = null;
            _this._expensesSum = null;
            _this._total = null;
            _this._copyData = null;
            _this._isCopied = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P2DataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "IncomeSum", {
            get: function () {
                if (this._incomeSum == null) {
                    this._incomeSum = new NumberObasTableField("IncomeSum", this);
                }
                return this._incomeSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "ExpensesSum", {
            get: function () {
                if (this._expensesSum == null) {
                    this._expensesSum = new NumberObasTableField("ExpensesSum", this);
                }
                return this._expensesSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberObasTableField("Total", this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        P2DataTable.prototype.TotalSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(this.Year.Value, this._sumTable.GetKeys(P1StrKeys.Total), oldValue, newValue);
        };
        P2DataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.NValue = this.ExpensesSum.NValue - this.IncomeSum.NValue;
        };
        P2DataTable.prototype.GetKeys = function (ownerKey, year) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new P2DataTableStrKeys(year, ownerKey);
            }
            else {
                this._keys.StrKey = ownerKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        P2DataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    keys.Year = year;
                    copyData.getValue(this.Year.Id).Value = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        P2DataTable.prototype.CopyData = function (srcYear, destYear) {
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
        P2DataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        P2DataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P2DataTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.IncomeSum.NValue = 0;
                _this.ExpensesSum.NValue = 0;
                _this.Total.NValue = 0;
            };
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    resetHandler();
                }
            }
            else {
                this.Iterate(resetHandler);
            }
        };
        P2DataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        Object.defineProperty(P2DataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.IsCopied, this.OwnerKey, this.Year, this.IncomeSum, this.ExpensesSum];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P2DataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        return P2DataTable;
    }(ObasTableWithKeysParent));
    F05121.P2DataTable = P2DataTable;
})(F05121 || (F05121 = {}));
