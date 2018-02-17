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
var F01500;
(function (F01500) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F01500.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F01500.StrKeysP1Total || (F01500.StrKeysP1Total = {}));
    var ObasTableP1Total = (function (_super) {
        __extends(ObasTableP1Total, _super);
        function ObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        return ObasTableP1Total;
    }(P1TotalObasTable));
    F01500.ObasTableP1Total = ObasTableP1Total;
    var ObasTablePayKeys = (function (_super) {
        __extends(ObasTablePayKeys, _super);
        function ObasTablePayKeys(PayKey) {
            var _this = _super.call(this) || this;
            _this.PayKey = PayKey;
            return _this;
        }
        return ObasTablePayKeys;
    }(ObasTableKeys));
    F01500.ObasTablePayKeys = ObasTablePayKeys;
    var ObasTableYearKeys = (function (_super) {
        __extends(ObasTableYearKeys, _super);
        function ObasTableYearKeys(Year) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            return _this;
        }
        return ObasTableYearKeys;
    }(ObasTableKeys));
    F01500.ObasTableYearKeys = ObasTableYearKeys;
    var ObasTableOrgPayYearKeys = (function (_super) {
        __extends(ObasTableOrgPayYearKeys, _super);
        function ObasTableOrgPayYearKeys(year, PayKey) {
            var _this = _super.call(this, year) || this;
            _this.PayKey = PayKey;
            return _this;
        }
        return ObasTableOrgPayYearKeys;
    }(ObasTableYearKeys));
    F01500.ObasTableOrgPayYearKeys = ObasTableOrgPayYearKeys;
    var ObasTableP1 = (function (_super) {
        __extends(ObasTableP1, _super);
        function ObasTableP1(id, document, _sumTable) {
            var _this = _super.call(this, id, ["PaymentReestr_ID"], document) || this;
            _this._sumTable = _sumTable;
            _this._payment = null;
            _this._childTable = null;
            return _this;
        }
        ObasTableP1.prototype.SetChildTable = function (tableChild) {
            this._childTable = tableChild;
        };
        Object.defineProperty(ObasTableP1.prototype, "Payment", {
            get: function () {
                if (this._payment == null) {
                    this._payment = new ObasSprTableField(ObasTableCollection.PaymentReestrSprTable, this);
                }
                return this._payment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP1.prototype, "PayKey", {
            get: function () {
                return this.Payment.ForeignKey.Value;
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP1.prototype.GetKeys = function (payKey) {
            if (payKey === void 0) { payKey = this.PayKey; }
            if (this._keys == null) {
                this._keys = new ObasTablePayKeys(payKey);
            }
            else {
                this._keys.PayKey = payKey;
            }
            return this._keys;
        };
        ObasTableP1.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.RecordKey.Value === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(StrKeysP1Total.Total), oldValue, newValue);
        };
        ObasTableP1.prototype.ResetData = function (keys) {
            this.Document.CommonRules.ResetTableDataWithKeys(this, keys, BaseObasTableFields.YearDataField);
        };
        ObasTableP1.prototype.DeletePayKey = function (keys) {
            this.Document.CommonRules.DeleteOldLink(this.Id, [this._childTable.Id], this.KeyFieldIds, keys);
        };
        ObasTableP1.prototype.ChangePositionCorrectRow = function () {
            this.RecordKey.Locate(100);
            this.CopyRow();
            this.RecordKey.Value = 1;
            this.RecordKey.Locate(100);
            this.DeleteRow();
            this.RecordKey.Locate(1);
            this.RecordKey.Value = 100;
        };
        return ObasTableP1;
    }(ObasTableWithKeys));
    F01500.ObasTableP1 = ObasTableP1;
    var ObasTableP2Pay = (function (_super) {
        __extends(ObasTableP2Pay, _super);
        function ObasTableP2Pay(id, document, _sumTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.YearField.Id, "PaymentReestr_ID"], document) || this;
            _this._sumTable = _sumTable;
            _this._payment = null;
            _this._year = null;
            _this._delPayKey = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            _this._payCount = null;
            _this._payValue = null;
            _this._obasSum = null;
            _sumTable.SetChildTable(_this);
            return _this;
        }
        Object.defineProperty(ObasTableP2Pay.prototype, "ObasSum", {
            get: function () {
                if (this._obasSum == null) {
                    this._obasSum = new NumberObasTableField("ObasSum", this);
                }
                return this._obasSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Pay.prototype, "PayValue", {
            get: function () {
                if (this._payValue == null) {
                    this._payValue = new NumberObasTableField("PayValue", this);
                }
                return this._payValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Pay.prototype, "PayCount", {
            get: function () {
                if (this._payCount == null) {
                    this._payCount = new NumberObasTableField("PayCount", this);
                }
                return this._payCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Pay.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.Payment.ForeignKey, this.Year, this.PayCount, this.PayValue];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Pay.prototype, "Payment", {
            get: function () {
                if (this._payment == null) {
                    this._payment = new ObasSprTableField(ObasTableCollection.PaymentReestrSprTable, this);
                }
                return this._payment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Pay.prototype, "PayKey", {
            get: function () {
                return this.Payment.ForeignKey.Value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Pay.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Pay.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Pay.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP2Pay.prototype.CopyData = function (srcYear, destYear) {
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
        ObasTableP2Pay.prototype.GetKeys = function (year, payKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (payKey === void 0) { payKey = this.PayKey; }
            if (this._keys == null) {
                this._keys = new ObasTableOrgPayYearKeys(year, payKey);
            }
            else {
                this._keys.Year = year;
                this._keys.PayKey = payKey;
            }
            return this._keys;
        };
        ObasTableP2Pay.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ObasSum.NValue = (this.PayCount.NValue * this.PayValue.NValue);
        };
        ObasTableP2Pay.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetValueByKeys(BaseObasTableFields.YearDataField.GenerateId(this.YearOffset + 1), this._sumTable.GetKeys(this.PayKey), newValue);
        };
        ObasTableP2Pay.prototype.DeleteEventHandler = function (tableId) {
            this._delPayKey = this.PayKey;
            this.ObasSum.NValue = 0;
        };
        ObasTableP2Pay.prototype.AfterDeleteEventHandler = function (tableId) {
            this._sumTable.DeletePayKey([this._delPayKey]);
        };
        Object.defineProperty(ObasTableP2Pay.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP2Pay.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        ObasTableP2Pay.prototype.ResetData = function (keys) {
            var _this = this;
            var resetDataHandler = function () {
                _this.PayCount.NValue = 0;
                _this.PayValue.NValue = 0;
                _this.ObasSum.NValue = 0;
            };
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    resetDataHandler();
                }
            }
            else {
                this.Iterate(resetDataHandler);
            }
        };
        ObasTableP2Pay.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        ObasTableP2Pay.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        ObasTableP2Pay.prototype.InnerCopyData = function (recordKey, endYear) {
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
        ObasTableP2Pay.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
                this._sumTable.ChangePositionCorrectRow();

//                this._sumTable.RecordKey.Locate(100);
//                this._sumTable.CopyRow();
//                this._sumTable.RecordKey.Value = 1;
//                this._sumTable.RecordKey.Locate(100);
//                this._sumTable.DeleteRow();
//                this._sumTable.RecordKey.Locate(1);
//                this._sumTable.RecordKey.Value = 100;
//                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", this._sumTable.RecordKey.Value, MessageIcons.Error);
                
            }
        };
        return ObasTableP2Pay;
    }(ObasTableWithKeys));
    F01500.ObasTableP2Pay = ObasTableP2Pay;
})(F01500 || (F01500 = {}));
