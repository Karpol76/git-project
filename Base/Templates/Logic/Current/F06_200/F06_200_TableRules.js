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
var F06200;
(function (F06200) {
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "SubYearDataField", {
            get: function () {
                if (this._subYearDataField == null) {
                    this._subYearDataField = new BaseGenericObasTableField("Sub_Y");
                }
                return this._subYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "SubPYearDataField", {
            get: function () {
                if (this._subPYearDataField == null) {
                    this._subPYearDataField = new BaseGenericObasTableField("SubP_Y");
                }
                return this._subPYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "OtherYearDataField", {
            get: function () {
                if (this._otherYearDataField == null) {
                    this._otherYearDataField = new BaseGenericObasTableField("Other_Y");
                }
                return this._otherYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._subYearDataField = null;
    ObasTableFields._subPYearDataField = null;
    ObasTableFields._otherYearDataField = null;
    F06200.ObasTableFields = ObasTableFields;
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F06200.TableRules = TableRules;
    var ObasTableP1 = (function (_super) {
        __extends(ObasTableP1, _super);
        function ObasTableP1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP1.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        ObasTableP1.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return ObasTableP1;
    }(P1TotalObasTable));
    F06200.ObasTableP1 = ObasTableP1;
    var UniqueSubsTable = (function (_super) {
        __extends(UniqueSubsTable, _super);
        function UniqueSubsTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._subsidie = null;
            return _this;
        }
        Object.defineProperty(UniqueSubsTable.prototype, "Subsidie", {
            get: function () {
                if (this._subsidie == null) {
                    this._subsidie = new ObasSprTableFieldTyped(ObasTableCollection.TargetSubsidieSprTable, this);
                }
                return this._subsidie;
            },
            enumerable: true,
            configurable: true
        });
        return UniqueSubsTable;
    }(UniqueSimpleKeyTable));
    F06200.UniqueSubsTable = UniqueSubsTable;
    var TableWithValuesHelper = (function (_super) {
        __extends(TableWithValuesHelper, _super);
        function TableWithValuesHelper(id, _totalStrKey, _totalTable) {
            var _this = _super.call(this, id) || this;
            _this._totalStrKey = _totalStrKey;
            _this._totalTable = _totalTable;
            _this._year = null;
            _this._subKey = null;
            _this._isCopied = null;
            return _this;
        }
        Object.defineProperty(TableWithValuesHelper.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "SubKey", {
            get: function () {
                if (this._subKey == null) {
                    this._subKey = new ObasSprTableField(ObasTableCollection.TargetSubsidieSprTable, this);
                }
                return this._subKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        TableWithValuesHelper.prototype.TotalSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._totalTable.SetSumByKeys(this.Year.Value, this._totalTable.GetKeys(this._totalStrKey), oldValue, newValue);
        };
        return TableWithValuesHelper;
    }(ObasTable));
    F06200.TableWithValuesHelper = TableWithValuesHelper;
    var SubsKeyChangeHelper = (function () {
        function SubsKeyChangeHelper(_subUniqTable) {
            this._subUniqTable = _subUniqTable;
        }
        SubsKeyChangeHelper.prototype.SubKeyChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._subUniqTable.DeleteElement(oldValue);
            this._subUniqTable.AddElement(newValue);
        };
        return SubsKeyChangeHelper;
    }());
    F06200.SubsKeyChangeHelper = SubsKeyChangeHelper;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["P2"] = 1] = "P2";
        StrKeysP1Total[StrKeysP1Total["P3"] = 2] = "P3";
        StrKeysP1Total[StrKeysP1Total["P4"] = 3] = "P4";
        StrKeysP1Total[StrKeysP1Total["Total"] = 10] = "Total";
    })(StrKeysP1Total = F06200.StrKeysP1Total || (F06200.StrKeysP1Total = {}));
    var StrKeysP4Sp1 = (function (_super) {
        __extends(StrKeysP4Sp1, _super);
        function StrKeysP4Sp1(SubKey) {
            var _this = _super.call(this) || this;
            _this.SubKey = SubKey;
            return _this;
        }
        return StrKeysP4Sp1;
    }(ObasTableKeys));
    F06200.StrKeysP4Sp1 = StrKeysP4Sp1;
    var StrKeysP2Sp1Subs = (function (_super) {
        __extends(StrKeysP2Sp1Subs, _super);
        function StrKeysP2Sp1Subs(subKey, Year) {
            var _this = _super.call(this, subKey) || this;
            _this.Year = Year;
            return _this;
        }
        return StrKeysP2Sp1Subs;
    }(StrKeysP4Sp1));
    F06200.StrKeysP2Sp1Subs = StrKeysP2Sp1Subs;
    var StrKeysP3Sp1Subs = (function (_super) {
        __extends(StrKeysP3Sp1Subs, _super);
        function StrKeysP3Sp1Subs(subKey, year, RecipientName) {
            var _this = _super.call(this, subKey, year) || this;
            _this.RecipientName = RecipientName;
            return _this;
        }
        return StrKeysP3Sp1Subs;
    }(StrKeysP2Sp1Subs));
    F06200.StrKeysP3Sp1Subs = StrKeysP3Sp1Subs;
    var TableP2Sp1 = (function (_super) {
        __extends(TableP2Sp1, _super);
        function TableP2Sp1(id, document, _totalP1Table) {
            var _this = _super.call(this, id, ["TargetSubsidie_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._totalP1Table = _totalP1Table;
            _this._copyData = null;
            _this._recipientCount = null;
            _this._payment = null;
            _this._budgetSum = null;
            _this._recipientCategory = null;
            _this._subKeyChangeHelper = null;
            _this._totalSumChangeHelper = null;
            _this._copyFields = null;
            _this._isCopied = null;
            return _this;
        }
        Object.defineProperty(TableP2Sp1.prototype, "Year", {
            get: function () {
                return this.TableWithValuesHelper.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2Sp1.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.TableWithValuesHelper.SubKey.ForeignKey, this.TableWithValuesHelper.Year, this.RecipientCategory, this.RecipientCount, this.Payment];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2Sp1.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2Sp1.prototype, "RecipientCategory", {
            get: function () {
                if (this._recipientCategory == null) {
                    this._recipientCategory = new NumberObasTableField("g3", this);
                }
                return this._recipientCategory;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2Sp1.prototype, "RecipientCount", {
            get: function () {
                if (this._recipientCount == null) {
                    this._recipientCount = new NumberObasTableField("g4", this);
                }
                return this._recipientCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2Sp1.prototype, "Payment", {
            get: function () {
                if (this._payment == null) {
                    this._payment = new NumberObasTableField("g5", this);
                }
                return this._payment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2Sp1.prototype, "BudgetSum", {
            get: function () {
                if (this._budgetSum == null) {
                    this._budgetSum = new NumberObasTableField("g6", this);
                }
                return this._budgetSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2Sp1.prototype, "TableWithValuesHelper", {
            get: function () {
                if (this._totalSumChangeHelper == null) {
                    this._totalSumChangeHelper = new TableWithValuesHelper(this.Id, StrKeysP1Total.P2, this._totalP1Table);
                }
                return this._totalSumChangeHelper;
            },
            enumerable: true,
            configurable: true
        });
        TableP2Sp1.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        TableP2Sp1.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.TableWithValuesHelper.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var yearVal = copyData.getValue(this.TableWithValuesHelper.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    keys.Year = year;
                    yearVal.Value = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        TableP2Sp1.prototype.DeleteEventHandler = function (tableId) {
            this.BudgetSum.NValue = 0;
        };
        Object.defineProperty(TableP2Sp1.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        TableP2Sp1.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.TableWithValuesHelper.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        TableP2Sp1.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        TableP2Sp1.prototype.CopyData = function (srcYear, destYear) {
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
                    if (_this.TableWithValuesHelper.Year.Value === srcYear) {
                        _this.InnerCopyData(recordKey, destYear);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        TableP2Sp1.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.RecipientCount.NValue =
                    _this.Payment.NValue =
                        _this.BudgetSum.NValue = 0;
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
        TableP2Sp1.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP2Sp1.prototype.GetKeys = function (subKey, year) {
            if (subKey === void 0) { subKey = this.TableWithValuesHelper.SubKey.ForeignKey.Value; }
            if (year === void 0) { year = this.TableWithValuesHelper.Year.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP2Sp1Subs(subKey, year);
            }
            else {
                this._keys.SubKey = subKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        TableP2Sp1.prototype.BudgetSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.BudgetSum.NValue = (this.RecipientCount.NValue * this.Payment.NValue);
        };
        return TableP2Sp1;
    }(ObasTableWithKeys));
    F06200.TableP2Sp1 = TableP2Sp1;
    var TableP3Sp1 = (function (_super) {
        __extends(TableP3Sp1, _super);
        function TableP3Sp1(id, document) {
            var _this = _super.call(this, id, ["TargetSubsidie_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._year = null;
            _this._subKey = null;
            _this._subKeyChangeHelper = null;
            return _this;
        }
        Object.defineProperty(TableP3Sp1.prototype, "SubKey", {
            get: function () {
                if (this._subKey == null) {
                    this._subKey = new ObasSprTableField(ObasTableCollection.TargetSubsidieSprTable, this);
                }
                return this._subKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        TableP3Sp1.prototype.GetKeys = function (subKey, year) {
            if (subKey === void 0) { subKey = this.SubKey.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP2Sp1Subs(subKey, year);
            }
            else {
                this._keys.SubKey = subKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        return TableP3Sp1;
    }(ObasTableWithKeys));
    F06200.TableP3Sp1 = TableP3Sp1;
    var TableP3Sp1Values = (function (_super) {
        __extends(TableP3Sp1Values, _super);
        function TableP3Sp1Values(id, document, parentTable, _totalP1Table) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat(["g3"]), document, parentTable) || this;
            _this._totalP1Table = _totalP1Table;
            _this._recipientName = null;
            _this._recipientCount = null;
            _this._squarePrice = null;
            _this._square = null;
            _this._payment = null;
            _this._budgetSum = null;
            _this._copyData = null;
            _this._delSubKey = null;
            _this._totalSumChangeHelper = null;
            _this._isCopied = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(TableP3Sp1Values.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.RecipientName, this.RecipientCount, this.SquarePrice, this.Square];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "RecipientName", {
            get: function () {
                if (this._recipientName == null) {
                    this._recipientName = new ObasTableField("g3", this);
                }
                return this._recipientName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "RecipientCount", {
            get: function () {
                if (this._recipientCount == null) {
                    this._recipientCount = new NumberObasTableField("g5", this);
                }
                return this._recipientCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "SquarePrice", {
            get: function () {
                if (this._squarePrice == null) {
                    this._squarePrice = new NumberObasTableField("g6", this);
                }
                return this._squarePrice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "Square", {
            get: function () {
                if (this._square == null) {
                    this._square = new NumberObasTableField("g7", this);
                }
                return this._square;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "Payment", {
            get: function () {
                if (this._payment == null) {
                    this._payment = new NumberObasTableField("g8", this);
                }
                return this._payment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "BudgetSum", {
            get: function () {
                if (this._budgetSum == null) {
                    this._budgetSum = new NumberObasTableField("g9", this);
                }
                return this._budgetSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "TableWithValuesHelper", {
            get: function () {
                if (this._totalSumChangeHelper == null) {
                    this._totalSumChangeHelper = new TableWithValuesHelper(this.Id, StrKeysP1Total.P3, this._totalP1Table);
                }
                return this._totalSumChangeHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3Sp1Values.prototype, "Year", {
            get: function () {
                return this.TableWithValuesHelper.Year;
            },
            enumerable: true,
            configurable: true
        });
        TableP3Sp1Values.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        TableP3Sp1Values.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.TableWithValuesHelper.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var ownerVal = copyData.getValue(this.OwnerKey.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    keys.Year = year;
                    var ownerKey = this.ParentTable.GetRecordKey(this.ParentTable.GetKeys(keys.SubKey, year), true);
                    ownerVal.Value = ownerKey;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        TableP3Sp1Values.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.BudgetSum.Value = 0;
        };
        Object.defineProperty(TableP3Sp1Values.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        TableP3Sp1Values.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.TableWithValuesHelper.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        TableP3Sp1Values.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        TableP3Sp1Values.prototype.CopyData = function (srcYear, destYear) {
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
                    if (_this.TableWithValuesHelper.Year.Value === srcYear) {
                        _this.InnerCopyData(recordKey, destYear);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        TableP3Sp1Values.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.RecipientCount.NValue =
                    _this.SquarePrice.NValue =
                        _this.Square.NValue =
                            _this.Payment.NValue =
                                _this.BudgetSum.NValue = 0;
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
        TableP3Sp1Values.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP3Sp1Values.prototype.GetKeys = function (subKey, year, recipient) {
            if (subKey === void 0) { subKey = this.TableWithValuesHelper.SubKey.ForeignKey.Value; }
            if (year === void 0) { year = this.TableWithValuesHelper.Year.Value; }
            if (recipient === void 0) { recipient = this.RecipientName.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP3Sp1Subs(subKey, year, recipient);
            }
            else {
                this._keys.SubKey = subKey;
                this._keys.Year = year;
                this._keys.RecipientName = recipient;
            }
            return this._keys;
        };
        TableP3Sp1Values.prototype.PaymentChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Payment.NValue = this.SquarePrice.NValue * this.Square.NValue;
        };
        TableP3Sp1Values.prototype.BudgetSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.BudgetSum.NValue = this.RecipientCount.NValue * this.Payment.NValue;
        };
        return TableP3Sp1Values;
    }(ObasTableWithKeysParent));
    F06200.TableP3Sp1Values = TableP3Sp1Values;
    var TableP4Sp1 = (function (_super) {
        __extends(TableP4Sp1, _super);
        function TableP4Sp1(id, document, _totalP1Table) {
            var _this = _super.call(this, id, ["TargetSubsidie_ID"], document) || this;
            _this._totalP1Table = _totalP1Table;
            _this._subsidie = null;
            _this._delKey = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(TableP4Sp1.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.Subsidie.ForeignKey];
                    var yearField_1 = ObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP4Sp1.prototype, "Subsidie", {
            get: function () {
                if (this._subsidie == null) {
                    this._subsidie = new ObasSprTableFieldTyped(ObasTableCollection.TargetSubsidieSprTable, this);
                }
                return this._subsidie;
            },
            enumerable: true,
            configurable: true
        });
        TableP4Sp1.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var yearDataField = BaseObasTableFields.YearDataField;
            for (var i = 1; i <= this.Document.Settings.YearsCount; i++) {
                var fieldId = yearDataField.GenerateId(i);
                this.SetFieldValue(fieldId, 0);
            }
        };
        TableP4Sp1.prototype.GetKeys = function (subKey) {
            if (subKey === void 0) { subKey = this.Subsidie.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP4Sp1(subKey);
            }
            else {
                this._keys.SubKey = subKey;
            }
            return this._keys;
        };
        TableP4Sp1.prototype.ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._totalP1Table.SetSumByKeys(fieldId, this._totalP1Table.GetKeys(StrKeysP1Total.P4), oldValue, newValue);
        };
        TableP4Sp1.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableP4Sp1.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP4Sp1.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.YearDataField]);
        };
        TableP4Sp1.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.YearDataField);
        };
        return TableP4Sp1;
    }(ObasTableWithKeys));
    F06200.TableP4Sp1 = TableP4Sp1;
})(F06200 || (F06200 = {}));
