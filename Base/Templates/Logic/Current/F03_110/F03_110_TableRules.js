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
var F03110;
(function (F03110) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F03110.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Sum"] = 2] = "Sum";
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F03110.StrKeysP1Total || (F03110.StrKeysP1Total = {}));
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
    F03110.P1TotalTable = P1TotalTable;
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
    F03110.ObasTablePnoYearKeys = ObasTablePnoYearKeys;
    var PnoDataTable = (function (_super) {
        __extends(PnoDataTable, _super);
        function PnoDataTable(id, document) {
            var _this = _super.call(this, id, ["PNO_ID", BaseObasTableFields.YearField.Id], document) || this;
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
                    this._pno = new ObasSprTableField(ObasTableCollection.PnoSprTable, this);
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
        return PnoDataTable;
    }(ObasTableWithKeys));
    F03110.PnoDataTable = PnoDataTable;
    var ObasTablePnoRecipientYearKeys = (function (_super) {
        __extends(ObasTablePnoRecipientYearKeys, _super);
        function ObasTablePnoRecipientYearKeys(pnoKey, year, RecipientKey) {
            var _this = _super.call(this, pnoKey, year) || this;
            _this.RecipientKey = RecipientKey;
            return _this;
        }
        return ObasTablePnoRecipientYearKeys;
    }(ObasTablePnoYearKeys));
    F03110.ObasTablePnoRecipientYearKeys = ObasTablePnoRecipientYearKeys;
    var RecipientsDataTable = (function (_super) {
        __extends(RecipientsDataTable, _super);
        function RecipientsDataTable(id, parentTable, _sumTable) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat("RecipientCategory_ID"), parentTable.Document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._recipient = null;
            _this._recipientsCount = null;
            _this._pay = null;
            _this._obas = null;
            _this._addObas = null;
            _this._totalObas = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
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
                    this._recipient = new ObasSprTableField(ObasTableCollection.RecipientCategorySprTable, this);
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
        RecipientsDataTable.prototype.ObasPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Obas.Value = this.RecipientsCount.NValue * this.Pay.NValue;
        };
        RecipientsDataTable.prototype.TotalObasPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalObas.Value = this.Obas.NValue + this.AddObas.NValue;
        };
        RecipientsDataTable.prototype.ObasChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalObasPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        RecipientsDataTable.prototype.TotalObasChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(this.Year.Value, this._sumTable.GetKeys(StrKeysP1Total.Sum), oldValue, newValue);
        };
        RecipientsDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.Obas.NValue = 0;
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
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
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
        Object.defineProperty(RecipientsDataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.OwnerKey,
                        this.Recipient.ForeignKey,
                        this.Year,
                        this.RecipientsCount,
                        this.Pay,
                        this.AddObas
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        RecipientsDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return RecipientsDataTable;
    }(ObasTableWithKeysParent));
    F03110.RecipientsDataTable = RecipientsDataTable;
})(F03110 || (F03110 = {}));
