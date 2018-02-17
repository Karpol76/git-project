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
var F08100;
(function (F08100) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F08100.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["P2"] = 2] = "P2";
        StrKeysP1Total[StrKeysP1Total["P3"] = 3] = "P3";
        StrKeysP1Total[StrKeysP1Total["P4"] = 4] = "P4";
        StrKeysP1Total[StrKeysP1Total["P5"] = 5] = "P5";
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F08100.StrKeysP1Total || (F08100.StrKeysP1Total = {}));
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
    F08100.ObasTableP1 = ObasTableP1;
    var StrKeysP2 = (function (_super) {
        __extends(StrKeysP2, _super);
        function StrKeysP2(SubKey, PersonName, OkpdKey, OkeiKey, Year) {
            var _this = _super.call(this) || this;
            _this.SubKey = SubKey;
            _this.PersonName = PersonName;
            _this.OkpdKey = OkpdKey;
            _this.OkeiKey = OkeiKey;
            _this.Year = Year;
            return _this;
        }
        return StrKeysP2;
    }(ObasTableKeys));
    F08100.StrKeysP2 = StrKeysP2;
    var StrKeysP3 = (function (_super) {
        __extends(StrKeysP3, _super);
        function StrKeysP3(AgrcMachineryKey, Year) {
            var _this = _super.call(this) || this;
            _this.AgrcMachineryKey = AgrcMachineryKey;
            _this.Year = Year;
            return _this;
        }
        return StrKeysP3;
    }(ObasTableKeys));
    F08100.StrKeysP3 = StrKeysP3;
    var StrKeysP4 = (function (_super) {
        __extends(StrKeysP4, _super);
        function StrKeysP4(Subsidie, Year) {
            var _this = _super.call(this) || this;
            _this.Subsidie = Subsidie;
            _this.Year = Year;
            return _this;
        }
        return StrKeysP4;
    }(ObasTableKeys));
    F08100.StrKeysP4 = StrKeysP4;
    var StrKeysP5 = (function (_super) {
        __extends(StrKeysP5, _super);
        function StrKeysP5(Subsidie, PersonName) {
            var _this = _super.call(this) || this;
            _this.Subsidie = Subsidie;
            _this.PersonName = PersonName;
            return _this;
        }
        return StrKeysP5;
    }(ObasTableKeys));
    F08100.StrKeysP5 = StrKeysP5;
    var TableWithValuesHelper = (function (_super) {
        __extends(TableWithValuesHelper, _super);
        function TableWithValuesHelper(id, _totalStrKey, _totalTable) {
            var _this = _super.call(this, id) || this;
            _this._totalStrKey = _totalStrKey;
            _this._totalTable = _totalTable;
            _this._year = null;
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
        TableWithValuesHelper.prototype.TotalSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._totalTable.SetSumByKeys(this.Year.Value, this._totalTable.GetKeys(this._totalStrKey), oldValue, newValue);
        };
        return TableWithValuesHelper;
    }(ObasTable));
    F08100.TableWithValuesHelper = TableWithValuesHelper;
    var P2P3Helper = (function () {
        function P2P3Helper(_p2P3Table) {
            this._p2P3Table = _p2P3Table;
        }
        P2P3Helper.prototype.UnitCountChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.PriceChangeEventHandler(tableId, oldValue, newValue, fieldId);
            this.SubsPriceChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        P2P3Helper.prototype.PriceChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._p2P3Table.TotalPrice.NValue = this._p2P3Table.UnitCount.NValue * this._p2P3Table.Price.NValue;
        };
        P2P3Helper.prototype.SubsPriceChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._p2P3Table.BudgetSum.NValue = this._p2P3Table.UnitCount.NValue * this._p2P3Table.SubsPrice.NValue;
        };
        P2P3Helper.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this._p2P3Table.UnitCount.NValue = 0;
                _this._p2P3Table.Price.NValue = 0;
                _this._p2P3Table.SubsPrice.NValue = 0;
                _this._p2P3Table.TotalPrice.NValue = 0;
                _this._p2P3Table.BudgetSum.NValue = 0;
            };
            if (keys) {
                if (this._p2P3Table.LocateByKeys(keys.ToArray())) {
                    resetHandler();
                }
            }
            else {
                this._p2P3Table.Iterate(resetHandler);
            }
        };
        return P2P3Helper;
    }());
    F08100.P2P3Helper = P2P3Helper;
    var P2Table = (function (_super) {
        __extends(P2Table, _super);
        function P2Table(id, document, _totalP1Table) {
            var _this = _super.call(this, id, ["subsidies_spr_ID", "g2", "OKPD_ID", "OKEI_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._totalP1Table = _totalP1Table;
            _this._copyData = null;
            _this._unitCount = null;
            _this._price = null;
            _this._subsPrice = null;
            _this._totalPrice = null;
            _this._budgetSum = null;
            _this._subKey = null;
            _this._okpdKey = null;
            _this._okeiKey = null;
            _this._personName = null;
            _this._totalSumChangeHelper = null;
            _this._isCopied = null;
            _this._copyFields = null;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P2Table.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new P2P3Helper(this);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.Subsidie.ForeignKey, this.Year, this.PersonName, this.Okpd.ForeignKey, this.Okei.ForeignKey, this.UnitCount, this.Price, this.SubsPrice];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "UnitCount", {
            get: function () {
                if (this._unitCount == null) {
                    this._unitCount = new NumberObasTableField("g5", this);
                }
                return this._unitCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "Price", {
            get: function () {
                if (this._price == null) {
                    this._price = new NumberObasTableField("g8", this);
                }
                return this._price;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "SubsPrice", {
            get: function () {
                if (this._subsPrice == null) {
                    this._subsPrice = new NumberObasTableField("g9", this);
                }
                return this._subsPrice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "TotalPrice", {
            get: function () {
                if (this._totalPrice == null) {
                    this._totalPrice = new NumberObasTableField("g10", this);
                }
                return this._totalPrice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "BudgetSum", {
            get: function () {
                if (this._budgetSum == null) {
                    this._budgetSum = new NumberObasTableField("g11", this);
                }
                return this._budgetSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "TableWithValuesHelper", {
            get: function () {
                if (this._totalSumChangeHelper == null) {
                    this._totalSumChangeHelper = new TableWithValuesHelper(this.Id, StrKeysP1Total.P2, this._totalP1Table);
                }
                return this._totalSumChangeHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "PersonName", {
            get: function () {
                if (this._personName == null) {
                    this._personName = new ObasTableField("g2", this, true);
                }
                return this._personName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "Subsidie", {
            get: function () {
                if (this._subKey == null) {
                    this._subKey = new ObasSprTableField(this.Document.SubsidiesSprTable, this);
                }
                return this._subKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "Okpd", {
            get: function () {
                if (this._okpdKey == null) {
                    this._okpdKey = new ObasSprTableField(ObasTableCollection.OkpdSprTable, this);
                }
                return this._okpdKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "Okei", {
            get: function () {
                if (this._okeiKey == null) {
                    this._okeiKey = new ObasSprTableField(ObasTableCollection.OkeiSprTable, this);
                }
                return this._okeiKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "Year", {
            get: function () {
                return this.TableWithValuesHelper.Year;
            },
            enumerable: true,
            configurable: true
        });
        P2Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P2Table.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var yearVal = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    keys.Year = year;
                    yearVal.Value = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        P2Table.prototype.DeleteEventHandler = function (tableId) {
            this.BudgetSum.NValue = 0;
        };
        Object.defineProperty(P2Table.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        P2Table.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        P2Table.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P2Table.prototype.CopyData = function (srcYear, destYear) {
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
        P2Table.prototype.ResetData = function (keys) {
            this.Helper.ResetData(keys);
        };
        P2Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2Table.prototype.GetKeys = function (subKey, personName, okpdKey, okeiKey, year) {
            if (subKey === void 0) { subKey = this.Subsidie.ForeignKey.Value; }
            if (personName === void 0) { personName = this.PersonName.Value; }
            if (okpdKey === void 0) { okpdKey = this.Okpd.ForeignKey.Value; }
            if (okeiKey === void 0) { okeiKey = this.Okei.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP2(subKey, personName, okpdKey, okeiKey, year);
            }
            else {
                this._keys.SubKey = subKey;
                this._keys.PersonName = personName;
                this._keys.OkpdKey = okpdKey;
                this._keys.OkeiKey = okeiKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        return P2Table;
    }(ObasTableWithKeys));
    F08100.P2Table = P2Table;
    var P3Table = (function (_super) {
        __extends(P3Table, _super);
        function P3Table(id, document, _totalP1Table) {
            var _this = _super.call(this, id, ["AgriculturalMachinery_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._totalP1Table = _totalP1Table;
            _this._copyData = null;
            _this._unitCount = null;
            _this._price = null;
            _this._subsPrice = null;
            _this._totalPrice = null;
            _this._budgetSum = null;
            _this._agrcMachineryKey = null;
            _this._totalSumChangeHelper = null;
            _this._copyFields = null;
            _this._isCopied = null;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P3Table.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new P2P3Helper(this);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "UnitCount", {
            get: function () {
                if (this._unitCount == null) {
                    this._unitCount = new NumberObasTableField("g5", this);
                }
                return this._unitCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Price", {
            get: function () {
                if (this._price == null) {
                    this._price = new NumberObasTableField("g6", this);
                }
                return this._price;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "SubsPrice", {
            get: function () {
                if (this._subsPrice == null) {
                    this._subsPrice = new NumberObasTableField("g7", this);
                }
                return this._subsPrice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "TotalPrice", {
            get: function () {
                if (this._totalPrice == null) {
                    this._totalPrice = new NumberObasTableField("g8", this);
                }
                return this._totalPrice;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "BudgetSum", {
            get: function () {
                if (this._budgetSum == null) {
                    this._budgetSum = new NumberObasTableField("g9", this);
                }
                return this._budgetSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "TableWithValuesHelper", {
            get: function () {
                if (this._totalSumChangeHelper == null) {
                    this._totalSumChangeHelper = new TableWithValuesHelper(this.Id, StrKeysP1Total.P3, this._totalP1Table);
                }
                return this._totalSumChangeHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Year", {
            get: function () {
                return this.TableWithValuesHelper.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.AgrcMachinery.ForeignKey, this.Year, this.UnitCount, this.Price, this.SubsPrice];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "AgrcMachinery", {
            get: function () {
                if (this._agrcMachineryKey == null) {
                    this._agrcMachineryKey = new ObasSprTableField(ObasTableCollection.AgriculturalMachinerySprTable, this);
                }
                return this._agrcMachineryKey;
            },
            enumerable: true,
            configurable: true
        });
        P3Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P3Table.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
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
        P3Table.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.BudgetSum.Value = 0;
        };
        Object.defineProperty(P3Table.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        P3Table.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        P3Table.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P3Table.prototype.CopyData = function (srcYear, destYear) {
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
        P3Table.prototype.ResetData = function (keys) {
            this.Helper.ResetData(keys);
        };
        P3Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P3Table.prototype.GetKeys = function (agrcMachineryKey, year) {
            if (agrcMachineryKey === void 0) { agrcMachineryKey = this.AgrcMachinery.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP3(agrcMachineryKey, year);
            }
            else {
                this._keys.AgrcMachineryKey = agrcMachineryKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        return P3Table;
    }(ObasTableWithKeys));
    F08100.P3Table = P3Table;
    var P4Table = (function (_super) {
        __extends(P4Table, _super);
        function P4Table(id, document, _totalP1Table) {
            var _this = _super.call(this, id, ["g2", BaseObasTableFields.YearField.Id], document) || this;
            _this._totalP1Table = _totalP1Table;
            _this._copyData = null;
            _this._creditSum = null;
            _this._ssudaDolg = null;
            _this._creditPeriod = null;
            _this._monthCount = null;
            _this._intRate = null;
            _this._recoverRate = null;
            _this._budgSum = null;
            _this._subsidie = null;
            _this._totalSumChangeHelper = null;
            _this._isCopied = null;
            _this._copyFields = null;
            _this._ownerKey = null;
            return _this;
        }
        Object.defineProperty(P4Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.Subsidie, this.Year, this.CreditSum, this.SsudaDolg,
                        this.CreditPeriod,
                        this.MonthCount,
                        this.InterestRate,
                        this.RecoverRate
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this._ownerKey = new ObasForeignKeyTableFieldTyped(this.Document.MainParametersTable, this);
                }
                return this._ownerKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "CreditSum", {
            get: function () {
                if (this._creditSum == null) {
                    this._creditSum = new NumberObasTableField("g3", this);
                }
                return this._creditSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "SsudaDolg", {
            get: function () {
                if (this._ssudaDolg == null) {
                    this._ssudaDolg = new NumberObasTableField("g4", this);
                }
                return this._ssudaDolg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "CreditPeriod", {
            get: function () {
                if (this._creditPeriod == null) {
                    this._creditPeriod = new NumberObasTableField("g5", this);
                }
                return this._creditPeriod;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "MonthCount", {
            get: function () {
                if (this._monthCount == null) {
                    this._monthCount = new NumberObasTableField("g6", this);
                }
                return this._monthCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "InterestRate", {
            get: function () {
                if (this._intRate == null) {
                    this._intRate = new NumberObasTableField("g7", this);
                }
                return this._intRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "RecoverRate", {
            get: function () {
                if (this._recoverRate == null) {
                    this._recoverRate = new NumberObasTableField("g8", this);
                }
                return this._recoverRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "BudgetSum", {
            get: function () {
                if (this._budgSum == null) {
                    this._budgSum = new NumberObasTableField("g9", this);
                }
                return this._budgSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "TableWithValuesHelper", {
            get: function () {
                if (this._totalSumChangeHelper == null) {
                    this._totalSumChangeHelper = new TableWithValuesHelper(this.Id, StrKeysP1Total.P4, this._totalP1Table);
                }
                return this._totalSumChangeHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "Subsidie", {
            get: function () {
                if (this._subsidie == null) {
                    this._subsidie = new ObasTableField("g2", this, true);
                }
                return this._subsidie;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "Year", {
            get: function () {
                return this.TableWithValuesHelper.Year;
            },
            enumerable: true,
            configurable: true
        });
        P4Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P4Table.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var yearVal = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    keys.Year = year;
                    yearVal.Value = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        P4Table.prototype.DeleteEventHandler = function (tableId) {
            this.BudgetSum.Value = 0;
        };
        Object.defineProperty(P4Table.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        P4Table.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        P4Table.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P4Table.prototype.CopyData = function (srcYear, destYear) {
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
        P4Table.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.CreditSum.NValue = 0;
                _this.SsudaDolg.NValue = 0;
                _this.CreditPeriod.NValue = 0;
                _this.MonthCount.NValue = 0;
                _this.InterestRate.NValue = 0;
                _this.RecoverRate.NValue = 0;
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
        P4Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P4Table.prototype.GetKeys = function (subsidie, year) {
            if (subsidie === void 0) { subsidie = this.Subsidie.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP4(subsidie, year);
            }
            else {
                this._keys.Subsidie = subsidie;
                this._keys.Year = year;
            }
            return this._keys;
        };
        P4Table.prototype.BudgetSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.BudgetSum.NValue = (this.SsudaDolg.NValue * (this.MonthCount.NValue * this.RecoverRate.NValue)) / (1200);
        };
        return P4Table;
    }(ObasTableWithKeys));
    F08100.P4Table = P4Table;
    var P5Table = (function (_super) {
        __extends(P5Table, _super);
        function P5Table(id, document, _totalP1Table) {
            var _this = _super.call(this, id, ["g1", "g2"], document) || this;
            _this._totalP1Table = _totalP1Table;
            _this._subsidie = null;
            _this._personName = null;
            _this._delKey = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P5Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.Subsidie, this.PersonName];
                    var yearField = BaseObasTableFields.YearDataField;
                    for (var i = 1; i <= this.Document.Settings.YearsCount; i++) {
                        this._copyFields.push(yearField.GenerateTableField(this, i));
                    }
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "Subsidie", {
            get: function () {
                if (this._subsidie == null) {
                    this._subsidie = new ObasTableField("g1", this, true);
                }
                return this._subsidie;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "PersonName", {
            get: function () {
                if (this._personName == null) {
                    this._personName = new ObasTableField("g2", this, true);
                }
                return this._personName;
            },
            enumerable: true,
            configurable: true
        });
        P5Table.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var yearDataField = BaseObasTableFields.YearDataField;
            for (var i = 1; i <= this.Document.Settings.YearsCount; i++) {
                var fieldId = yearDataField.GenerateId(i);
                this.SetFieldValue(fieldId, 0);
            }
        };
        P5Table.prototype.GetKeys = function (subsidie, person) {
            if (subsidie === void 0) { subsidie = this.Subsidie.Value; }
            if (person === void 0) { person = this.PersonName.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP5(subsidie, person);
            }
            else {
                this._keys.Subsidie = subsidie;
                this._keys.PersonName = person;
            }
            return this._keys;
        };
        P5Table.prototype.ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._totalP1Table.SetSumByKeys(fieldId, this._totalP1Table.GetKeys(StrKeysP1Total.P5), oldValue, newValue);
        };
        P5Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P5Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P5Table.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        P5Table.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return P5Table;
    }(ObasTableWithKeys));
    F08100.P5Table = P5Table;
})(F08100 || (F08100 = {}));
