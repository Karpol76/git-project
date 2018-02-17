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
var F03500;
(function (F03500) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F03500.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Sum"] = 2] = "Sum";
        P1StrKeys[P1StrKeys["Total"] = 1] = "Total";
    })(P1StrKeys = F03500.P1StrKeys || (F03500.P1StrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1StrKeys.Total;
        };
        P1TotalTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F03500.P1TotalTable = P1TotalTable;
    var P2RowsTable = (function (_super) {
        __extends(P2RowsTable, _super);
        function P2RowsTable(id) {
            return _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], "StrCode") || this;
        }
        return P2RowsTable;
    }(BarsRowsSprTable));
    F03500.P2RowsTable = P2RowsTable;
    var P2DataStrKeys;
    (function (P2DataStrKeys) {
        P2DataStrKeys[P2DataStrKeys["Military"] = 1] = "Military";
        P2DataStrKeys[P2DataStrKeys["DocRights"] = 2] = "DocRights";
        P2DataStrKeys[P2DataStrKeys["CantUseSavings"] = 3] = "CantUseSavings";
        P2DataStrKeys[P2DataStrKeys["LawPayment"] = 4] = "LawPayment";
        P2DataStrKeys[P2DataStrKeys["Total"] = 5] = "Total";
    })(P2DataStrKeys = F03500.P2DataStrKeys || (F03500.P2DataStrKeys = {}));
    var P2DataTableStrKeys = (function (_super) {
        __extends(P2DataTableStrKeys, _super);
        function P2DataTableStrKeys(Year, strKey) {
            var _this = _super.call(this, strKey) || this;
            _this.Year = Year;
            return _this;
        }
        return P2DataTableStrKeys;
    }(StrObasTableKeys));
    F03500.P2DataTableStrKeys = P2DataTableStrKeys;
    var P2DataTable = (function (_super) {
        __extends(P2DataTable, _super);
        function P2DataTable(id, document, parent, _sumTable) {
            var _this = _super.call(this, id, document, parent, [BaseObasTableFields.StrKeyField.Id, BaseObasTableFields.YearField.Id]) || this;
            _this._sumTable = _sumTable;
            _this._obas = null;
            _this._year = null;
            _this._count = null;
            _this._pay = null;
            _this._monthCount = null;
            _this._yearCount = null;
            _this._refund = null;
            _this._copyData = null;
            _this._isCopied = null;
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
        Object.defineProperty(P2DataTable.prototype, "Refund", {
            get: function () {
                if (this._refund == null) {
                    this._refund = new NumberObasTableField("g7", this);
                }
                return this._refund;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "YearCount", {
            get: function () {
                if (this._yearCount == null) {
                    this._yearCount = new NumberObasTableField("g6", this);
                }
                return this._yearCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "MonthCount", {
            get: function () {
                if (this._monthCount == null) {
                    this._monthCount = new NumberObasTableField("g5", this);
                }
                return this._monthCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Pay", {
            get: function () {
                if (this._pay == null) {
                    this._pay = new NumberObasTableField("g4", this);
                }
                return this._pay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Count", {
            get: function () {
                if (this._count == null) {
                    this._count = new NumberObasTableField("g3", this);
                }
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Obas", {
            get: function () {
                if (this._obas == null) {
                    this._obas = new NumberObasTableField("g8", this);
                }
                return this._obas;
            },
            enumerable: true,
            configurable: true
        });
        P2DataTable.prototype.ObasChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(this.Year.Value, this._sumTable.GetKeys(P1StrKeys.Sum), oldValue, newValue);
        };
        P2DataTable.prototype.ObasPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var sum = this.Count.NValue;
            switch (this.StrKey) {
                case P2DataStrKeys.Military:
                    sum = sum * this.Pay.NValue;
                    break;
                case P2DataStrKeys.LawPayment:
                    sum = sum * this.Pay.NValue * this.YearCount.NValue;
                    break;
                case P2DataStrKeys.CantUseSavings:
                    sum = sum * this.Refund.NValue;
                    break;
                case P2DataStrKeys.DocRights:
                    sum = sum * (this.Pay.NValue / 12) * this.MonthCount.NValue;
                    break;
            }
            this.Obas.NValue = sum;
        };
        P2DataTable.prototype.GetKeys = function (strKey, year) {
            if (strKey === void 0) { strKey = this.StrKey; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new P2DataTableStrKeys(year, strKey);
            }
            else {
                this._keys.StrKey = strKey;
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
            var _this = this;
            var filter = function (value, index, array) {
                var strKey = array[1].Value;
                var fieldId = value.Id;
                switch (strKey) {
                    case P2DataStrKeys.Military:
                        return !(fieldId === _this.MonthCount.Id || fieldId === _this.YearCount.Id || fieldId === _this.Refund.Id);
                    case P2DataStrKeys.DocRights:
                        return !(fieldId === _this.YearCount.Id || fieldId === _this.Refund.Id);
                    case P2DataStrKeys.CantUseSavings:
                        return !(fieldId === _this.MonthCount.Id || fieldId === _this.YearCount.Id || fieldId === _this.Pay.Id);
                    case P2DataStrKeys.LawPayment:
                        return !(fieldId === _this.MonthCount.Id || fieldId === _this.Refund.Id);
                    default:
                        return false;
                }
            };
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo, filter);
        };
        P2DataTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.Count.Value = 0;
                _this.Pay.Value = 0;
                _this.MonthCount.Value = 0;
                _this.YearCount.Value = 0;
                _this.Refund.Value = 0;
                _this.Obas.Value = 0;
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
        P2DataTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKeyField.Id, {
                Id: this.StrKeyField.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue(this.Count.Id, {
                Id: this.Count.Id,
                IsData: true
            });
            result.setValue(this.Pay.Id, {
                Id: this.Pay.Id,
                IsData: true
            });
            result.setValue(this.MonthCount.Id, {
                Id: this.MonthCount.Id,
                IsData: true
            });
            result.setValue(this.YearCount.Id, {
                Id: this.YearCount.Id,
                IsData: true
            });
            result.setValue(this.Refund.Id, {
                Id: this.Refund.Id,
                IsData: true
            });
            return result;
        };
        return P2DataTable;
    }(ObasTableWithStrParent));
    F03500.P2DataTable = P2DataTable;
})(F03500 || (F03500 = {}));
