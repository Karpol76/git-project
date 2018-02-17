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
var F03211;
(function (F03211) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F03211.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Sum"] = 2] = "Sum";
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F03211.StrKeysP1Total || (F03211.StrKeysP1Total = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
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
    F03211.P1TotalTable = P1TotalTable;
    var ObasTablePnoYearKeys = (function (_super) {
        __extends(ObasTablePnoYearKeys, _super);
        function ObasTablePnoYearKeys(PnoKey, Year) {
            var _this = _super.call(this) || this;
            _this.PnoKey = PnoKey;
            _this.Year = Year;
            return _this;
        }
        return ObasTablePnoYearKeys;
    }(ObasTableKeys));
    F03211.ObasTablePnoYearKeys = ObasTablePnoYearKeys;
    var PnoDataTable = (function (_super) {
        __extends(PnoDataTable, _super);
        function PnoDataTable(id, document) {
            var _this = _super.call(this, id, ["PublicCommitments_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._pno = null;
            _this._year = null;
            return _this;
        }
        Object.defineProperty(PnoDataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PnoDataTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - this.Document.Settings.StartYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PnoDataTable.prototype, "Pno", {
            get: function () {
                if (this._pno == null) {
                    this._pno = new ObasSprTableField(ObasTableCollection.PublicCommitmentsSprTable, this);
                }
                return this._pno;
            },
            enumerable: true,
            configurable: true
        });
        PnoDataTable.prototype.GetKeys = function (pnoKey, year) {
            if (pnoKey === void 0) { pnoKey = this.Pno.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new ObasTablePnoYearKeys(pnoKey, year);
            }
            else {
                this._keys.PnoKey = pnoKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        PnoDataTable.prototype.PnoChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Pno.ForeignKey.DoFieldChange(oldValue, newValue);
        };
        return PnoDataTable;
    }(ObasTableWithKeys));
    F03211.PnoDataTable = PnoDataTable;
    var ObasTablePnoRecipientYearKeys = (function (_super) {
        __extends(ObasTablePnoRecipientYearKeys, _super);
        function ObasTablePnoRecipientYearKeys(pnoKey, year, RecipientKey) {
            var _this = _super.call(this, pnoKey, year) || this;
            _this.RecipientKey = RecipientKey;
            return _this;
        }
        return ObasTablePnoRecipientYearKeys;
    }(ObasTablePnoYearKeys));
    F03211.ObasTablePnoRecipientYearKeys = ObasTablePnoRecipientYearKeys;
    var RecipientsDataTable = (function (_super) {
        __extends(RecipientsDataTable, _super);
        function RecipientsDataTable(id, parentTable, _sumTable) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat("Recipient_ID"), parentTable.Document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._recipient = null;
            _this._recipientsCount = null;
            _this._pay = null;
            _this._obas = null;
            _this._addObas = null;
            _this._totalObas = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._recipientKey = null;
            _this._pnoKey = null;
            parentTable.Pno.ForeignKey.AddFieldChangeListener(function (table, oldValue, newValue, fieldId) {
                _this.UniqKeyChangeEventHandler(table, oldValue, newValue, fieldId);
            });
            return _this;
        }
        Object.defineProperty(RecipientsDataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "TotalObas", {
            get: function () {
                if (this._totalObas == null) {
                    this._totalObas = new NumberObasTableField("g7", this);
                }
                return this._totalObas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "AddObas", {
            get: function () {
                if (this._addObas == null) {
                    this._addObas = new NumberObasTableField("g6", this);
                }
                return this._addObas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "Obas", {
            get: function () {
                if (this._obas == null) {
                    this._obas = new NumberObasTableField("g5", this);
                }
                return this._obas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "Pay", {
            get: function () {
                if (this._pay == null) {
                    this._pay = new NumberObasTableField("g4", this);
                }
                return this._pay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "RecipientsCount", {
            get: function () {
                if (this._recipientsCount == null) {
                    this._recipientsCount = new NumberObasTableField("g3", this);
                }
                return this._recipientsCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "Recipient", {
            get: function () {
                if (this._recipient == null) {
                    this._recipient = new ObasSprTableField(this.Document.RecipientsSprTable, this, "Recipient");
                }
                return this._recipient;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "Year", {
            get: function () {
                return this.ParentTable.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "YearOffset", {
            get: function () {
                return this.ParentTable.YearOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "Pno", {
            get: function () {
                return this.ParentTable.Pno;
            },
            enumerable: true,
            configurable: true
        });
        RecipientsDataTable.prototype.UniqKeyChangeEventHandler = function (table, oldValue, newValue, fieldId) {
            var recordKey = table.RecordKey.Value;
            while (this.OwnerKey.Locate(recordKey, true)) {
                this.RecipientChangeEventHandler(this.Id, oldValue, newValue, fieldId);
            }
            this.ClearLocateFlag();
        };
        RecipientsDataTable.prototype.RecipientChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var pnoField = this.Pno.ForeignKey;
            var recipientField = this.Recipient.ForeignKey;
            var pnoKey = pnoField.Value;
            var recipientKey = recipientField.Value;
            var oldPnoKey = fieldId === pnoField.Id ? oldValue : pnoKey;
            var oldRecipientKey = fieldId === recipientField.Id ? oldValue : recipientKey;
        };
        RecipientsDataTable.prototype.DeleteEventHandler = function (tableId) {
            this._pnoKey = this.Pno.ForeignKey.Value;
            this._recipientKey = this.Recipient.ForeignKey.Value;
            this.Obas.NValue = 0;
        };
        RecipientsDataTable.prototype.ObasPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Obas.Value = this.RecipientsCount.NValue * this.Pay.NValue;
        };
        RecipientsDataTable.prototype.TotalObasPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalObas.Value = this.Obas.NValue + this.AddObas.NValue;
        };
        RecipientsDataTable.prototype.ObasChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalObasPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
            this._sumTable.SetSumByKeys(this.Year.Value, this._sumTable.GetKeys(StrKeysP1Total.Sum), oldValue, newValue);
        };
        RecipientsDataTable.prototype.GetKeys = function (pnoKey, year, recipientKey) {
            if (pnoKey === void 0) { pnoKey = this.Pno.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (recipientKey === void 0) { recipientKey = this.Recipient.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new ObasTablePnoRecipientYearKeys(pnoKey, year, recipientKey);
            }
            else {
                this._keys.PnoKey = pnoKey;
                this._keys.Year = year;
                this._keys.RecipientKey = recipientKey;
            }
            return this._keys;
        };
        RecipientsDataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var parentTable = this.ParentTable;
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(keys.PnoKey, year), true);
                    copyData.getValue(this.OwnerKey.Id).Value = ownerKey;
                    keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        RecipientsDataTable.prototype.CopyData = function (srcYear, destYear) {
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
        RecipientsDataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        RecipientsDataTable.prototype.IsRedyForCopy = function () {
            var _this = this;
            var filter = function (value) {
                return value.Id !== _this.AddObas.Id;
            };
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo, filter);
        };
        RecipientsDataTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.RecipientsCount.Value = 0;
                _this.Pay.Value = 0;
                _this.Obas.Value = 0;
                _this.AddObas.Value = 0;
                _this.TotalObas.Value = 0;
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
        RecipientsDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        RecipientsDataTable.prototype.InitCopyFieldsInfo = function () {
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
            result.setValue(this.RecipientsCount.Id, {
                Id: this.RecipientsCount.Id,
                IsData: true
            });
            result.setValue(this.Pay.Id, {
                Id: this.Pay.Id,
                IsData: true
            });
            result.setValue(this.AddObas.Id, {
                Id: this.AddObas.Id,
                IsData: true
            });
            return result;
        };
        return RecipientsDataTable;
    }(ObasTableWithKeysParent));
    F03211.RecipientsDataTable = RecipientsDataTable;
})(F03211 || (F03211 = {}));
