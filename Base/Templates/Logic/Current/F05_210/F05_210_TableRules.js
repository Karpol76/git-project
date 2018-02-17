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
var F05210;
(function (F05210) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F05210.TableRules = TableRules;
    var KeyYear = (function (_super) {
        __extends(KeyYear, _super);
        function KeyYear(Year) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            return _this;
        }
        return KeyYear;
    }(ObasTableKeys));
    F05210.KeyYear = KeyYear;
    var TableP2 = (function (_super) {
        __extends(TableP2, _super);
        function TableP2(tableId, document, totalTable) {
            var _this = _super.call(this, tableId, [BaseObasTableFields.YearField.Id], document) || this;
            _this.totalTable = totalTable;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            _this._year = null;
            _this._countPeople = null;
            _this._sumOnePeople = null;
            _this._avgSum = null;
            _this._totalSum = null;
            _this._ownerKey = null;
            return _this;
        }
        Object.defineProperty(TableP2.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.SumTotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.totalTable.SetSumByKeys(this.Year.NValue, this.totalTable.GetKeys(SubsidiesSubventions.StrKeysP1Total.Total), oldValue, newValue);
        };
        TableP2.prototype.GetSumField = function (field, fieldId, newvalue) {
            return field.Id === fieldId ? newvalue : field.NValue;
        };
        TableP2.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalSum.NValue = this.GetSumField(this.CountPeople, fieldId, newValue)
                * this.GetSumField(this.SumOnePeople, fieldId, newValue)
                * this.GetSumField(this.AvgSum, fieldId, newValue);
        };
        Object.defineProperty(TableP2.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this._ownerKey = new ObasForeignKeyTableFieldTyped(this.Document.MainParametersTable, this);
                }
                return this._ownerKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "CountPeople", {
            get: function () {
                if (this._countPeople == null) {
                    this._countPeople = new NumberObasTableField("CountPeople", this);
                }
                return this._countPeople;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        TableP2.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        Object.defineProperty(TableP2.prototype, "SumOnePeople", {
            get: function () {
                if (this._sumOnePeople == null) {
                    this._sumOnePeople = new NumberObasTableField("SumOnePeople", this);
                }
                return this._sumOnePeople;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "AvgSum", {
            get: function () {
                if (this._avgSum == null) {
                    this._avgSum = new NumberObasTableField("AvgSum", this);
                }
                return this._avgSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "TotalSum", {
            get: function () {
                if (this._totalSum == null) {
                    this._totalSum = new NumberObasTableField("TotalSum", this);
                }
                return this._totalSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - this.Document.Settings.StartYear;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.GetKeys = function (year) {
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new KeyYear(year);
            }
            else {
                this._keys.Year = year;
            }
            return this._keys;
        };
        TableP2.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var yearVal = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yearVal.Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        TableP2.prototype.CopyData = function (srcYear, destYear) {
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
        TableP2.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.CountPeople.NValue = 0;
                _this.SumOnePeople.NValue = 0;
                _this.AvgSum.NValue = 0;
                _this.TotalSum.NValue = 0;
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
        TableP2.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        Object.defineProperty(TableP2.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Year,
                        this.CountPeople,
                        this.SumOnePeople,
                        this.AvgSum
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        return TableP2;
    }(ObasTableWithKeys));
    F05210.TableP2 = TableP2;
})(F05210 || (F05210 = {}));
