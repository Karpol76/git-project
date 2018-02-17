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
var F03400;
(function (F03400) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F03400.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Obas"] = 1] = "Obas";
        P1StrKeys[P1StrKeys["AddObas"] = 2] = "AddObas";
        P1StrKeys[P1StrKeys["Total"] = 3] = "Total";
    })(P1StrKeys = F03400.P1StrKeys || (F03400.P1StrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1StrKeys.Total;
        };
        P1TotalTable.prototype.IsUserRow = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return strKey === P1StrKeys.AddObas;
        };
        P1TotalTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount - 1;
            var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount;
            var yearField = BaseObasTableFields.YearDataField;
            var srcFieldId = yearField.GenerateId(srcIndex);
            var destFieldId = yearField.GenerateId(destIndex);
            var copy = function () {
                if (_this.IsUserRow()) {
                    _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
                }
            };
            this.Iterate(copy);
        };
        P1TotalTable.prototype.CollectUserData = function () {
            var _this = this;
            var filter = function () {
                return _this.IsUserRow();
            };
            return this.CollectTableData(this.InitCopyFieldsInfo(), filter);
        };
        P1TotalTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.StrKeyField.Id, {
                Id: this.StrKeyField.Id,
                IsData: false
            });
            result.setValue(this.IsTotalKeyField.Id, {
                Id: this.IsTotalKeyField.Id,
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
    F03400.P1TotalTable = P1TotalTable;
    var P2GrantsTableKeys = (function (_super) {
        __extends(P2GrantsTableKeys, _super);
        function P2GrantsTableKeys(Year, GrantKey) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            _this.GrantKey = GrantKey;
            return _this;
        }
        return P2GrantsTableKeys;
    }(ObasTableKeys));
    F03400.P2GrantsTableKeys = P2GrantsTableKeys;
    var P2GrantsTable = (function (_super) {
        __extends(P2GrantsTable, _super);
        function P2GrantsTable(id, document) {
            var _this = _super.call(this, id, [BaseObasTableFields.YearField.Id, "Grant_ID"], document) || this;
            _this._grant = null;
            _this._year = null;
            return _this;
        }
        Object.defineProperty(P2GrantsTable.prototype, "Grant", {
            get: function () {
                if (this._grant == null) {
                    this._grant = new ObasSprTableField(this.Document.GrantsSprTable, this, "Grant");
                }
                return this._grant;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2GrantsTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        P2GrantsTable.prototype.GrantChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Grant.ForeignKey.DoFieldChange(oldValue, newValue);
        };
        P2GrantsTable.prototype.GetKeys = function (year, grantKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (grantKey === void 0) { grantKey = this.Grant.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new P2GrantsTableKeys(year, grantKey);
            }
            else {
                this._keys.Year = year;
                this._keys.GrantKey = grantKey;
            }
            return this._keys;
        };
        return P2GrantsTable;
    }(ObasTableWithKeys));
    F03400.P2GrantsTable = P2GrantsTable;
    var P2RecipientsTableKeys = (function (_super) {
        __extends(P2RecipientsTableKeys, _super);
        function P2RecipientsTableKeys(year, grantKey, RecipientKey) {
            var _this = _super.call(this, year, grantKey) || this;
            _this.RecipientKey = RecipientKey;
            return _this;
        }
        return P2RecipientsTableKeys;
    }(P2GrantsTableKeys));
    F03400.P2RecipientsTableKeys = P2RecipientsTableKeys;
    var P2RecipientsTable = (function (_super) {
        __extends(P2RecipientsTable, _super);
        function P2RecipientsTable(id, parentTable, _sumTable) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat(["Recipient_ID"]), parentTable.Document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._recipient = null;
            _this._count = null;
            _this._pay = null;
            _this._obas = null;
            _this._recipientKey = null;
            _this._grantKey = null;
            _this._copyData = null;
            _this._isCopied = null;
            return _this;
        }
        Object.defineProperty(P2RecipientsTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2RecipientsTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2RecipientsTable.prototype, "Obas", {
            get: function () {
                if (this._obas == null) {
                    this._obas = new NumberObasTableField("g6", this);
                }
                return this._obas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2RecipientsTable.prototype, "Pay", {
            get: function () {
                if (this._pay == null) {
                    this._pay = new NumberObasTableField("g5", this);
                }
                return this._pay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2RecipientsTable.prototype, "Count", {
            get: function () {
                if (this._count == null) {
                    this._count = new NumberObasTableField("g4", this);
                }
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2RecipientsTable.prototype, "Recipient", {
            get: function () {
                if (this._recipient == null) {
                    this._recipient = new ObasSprTableField(this.Document.RecipientsSprTable, this, "Recipient");
                }
                return this._recipient;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2RecipientsTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2RecipientsTable.prototype, "Year", {
            get: function () {
                return this.ParentTable.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2RecipientsTable.prototype, "Grant", {
            get: function () {
                return this.ParentTable.Grant;
            },
            enumerable: true,
            configurable: true
        });
        P2RecipientsTable.prototype.ObasPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Obas.NValue = this.Count.NValue * this.Pay.NValue;
        };
        P2RecipientsTable.prototype.ObasChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(this.Year.NValue, this._sumTable.GetKeys(P1StrKeys.Obas), oldValue, newValue);
        };
        P2RecipientsTable.prototype.DeleteEventHandler = function (tableId) {
            this._grantKey = this.Grant.ForeignKey.Value;
            this._recipientKey = this.Recipient.ForeignKey.Value;
            this.Obas.NValue = 0;
        };
        P2RecipientsTable.prototype.GetKeys = function (year, grantKey, recipientKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (grantKey === void 0) { grantKey = this.Grant.ForeignKey.Value; }
            if (recipientKey === void 0) { recipientKey = this.Recipient.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new P2RecipientsTableKeys(year, grantKey, recipientKey);
            }
            else {
                this._keys.Year = year;
                this._keys.GrantKey = grantKey;
                this._keys.RecipientKey = recipientKey;
            }
            return this._keys;
        };
        P2RecipientsTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var parentTable = this.ParentTable;
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(year, keys.GrantKey), true);
                    copyData.getValue(this.OwnerKey.Id).Value = ownerKey;
                    keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        P2RecipientsTable.prototype.CopyData = function (srcYear, destYear) {
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
        P2RecipientsTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        P2RecipientsTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P2RecipientsTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.Count.Value = 0;
                _this.Pay.Value = 0;
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
        P2RecipientsTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2RecipientsTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.OwnerKey.Id, {
                Id: this.OwnerKey.Id,
                IsData: false
            });
            result.setValue(this.Recipient.ForeignKey.Id, {
                Id: this.Recipient.ForeignKey.Id,
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
            return result;
        };
        return P2RecipientsTable;
    }(ObasTableWithKeysParent));
    F03400.P2RecipientsTable = P2RecipientsTable;
})(F03400 || (F03400 = {}));
