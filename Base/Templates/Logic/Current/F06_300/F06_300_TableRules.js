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
var F06300;
(function (F06300) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F06300.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 1] = "Total";
        P1StrKeys[P1StrKeys["Service"] = 2] = "Service";
        P1StrKeys[P1StrKeys["Other"] = 3] = "Other";
    })(P1StrKeys = F06300.P1StrKeys || (F06300.P1StrKeys = {}));
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
    F06300.P1TotalTable = P1TotalTable;
    var PartYearTableKeys = (function (_super) {
        __extends(PartYearTableKeys, _super);
        function PartYearTableKeys(Year) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            return _this;
        }
        return PartYearTableKeys;
    }(ObasTableKeys));
    F06300.PartYearTableKeys = PartYearTableKeys;
    var PartServWorkTableKeys = (function (_super) {
        __extends(PartServWorkTableKeys, _super);
        function PartServWorkTableKeys(ServWorkKey, year) {
            var _this = _super.call(this, year) || this;
            _this.ServWorkKey = ServWorkKey;
            return _this;
        }
        return PartServWorkTableKeys;
    }(PartYearTableKeys));
    F06300.PartServWorkTableKeys = PartServWorkTableKeys;
    var PartServWorkIndicatorsTableKeys = (function (_super) {
        __extends(PartServWorkIndicatorsTableKeys, _super);
        function PartServWorkIndicatorsTableKeys(servWorkKey, year, IndicatorKey) {
            var _this = _super.call(this, servWorkKey, year) || this;
            _this.IndicatorKey = IndicatorKey;
            return _this;
        }
        return PartServWorkIndicatorsTableKeys;
    }(PartServWorkTableKeys));
    F06300.PartServWorkIndicatorsTableKeys = PartServWorkIndicatorsTableKeys;
    var PartServWorkTable = (function (_super) {
        __extends(PartServWorkTable, _super);
        function PartServWorkTable(id, document) {
            var _this = _super.call(this, id, [BaseObasTableFields.YearField.Id, "ServWork_ID"], document) || this;
            _this._servWorkKey = null;
            _this._year = null;
            return _this;
        }
        Object.defineProperty(PartServWorkTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServWorkTable.prototype, "ServWorkKey", {
            get: function () {
                if (this._servWorkKey == null) {
                    this
                        ._servWorkKey = new ObasSprTableFieldTyped(ObasTableCollection.ServiceWorkSprTable, this);
                }
                return this._servWorkKey;
            },
            enumerable: true,
            configurable: true
        });
        PartServWorkTable.prototype.GetKeys = function (servWorkKey, year) {
            if (servWorkKey === void 0) { servWorkKey = this.ServWorkKey.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new PartServWorkTableKeys(servWorkKey, year);
            }
            else {
                this._keys.ServWorkKey = servWorkKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        PartServWorkTable.prototype.FilterIndicators = function () {
            return ObasTableCollection.ServiceWorkIndicatorsSprTable.IsParent(this.ServWorkKey.ForeignKey.Value);
        };
        return PartServWorkTable;
    }(ObasTableWithKeys));
    F06300.PartServWorkTable = PartServWorkTable;
    var TableWithValuesHelper = (function (_super) {
        __extends(TableWithValuesHelper, _super);
        function TableWithValuesHelper(id, _document) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._totalCost = null;
            _this._otSum = null;
            _this._ot = null;
            _this._otPayment = null;
            _this._otInsurance = null;
            _this._otOthers = null;
            _this._ku = null;
            _this._us = null;
            _this._tu = null;
            _this._iz = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(TableWithValuesHelper.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Ot,
                        this.OtPayment,
                        this.OtInsurance,
                        this.OtOthers,
                        this.Ku,
                        this.Us,
                        this.Tu,
                        this.Iz
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "Iz", {
            get: function () {
                if (this._iz == null) {
                    this._iz = new NumberObasTableField("Iz", this);
                }
                return this._iz;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "Tu", {
            get: function () {
                if (this._tu == null) {
                    this._tu = new NumberObasTableField("Tu", this);
                }
                return this._tu;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "Us", {
            get: function () {
                if (this._us == null) {
                    this._us = new NumberObasTableField("Us", this);
                }
                return this._us;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "Ku", {
            get: function () {
                if (this._ku == null) {
                    this._ku = new NumberObasTableField("Ku", this);
                }
                return this._ku;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "OtOthers", {
            get: function () {
                if (this._otOthers == null) {
                    this._otOthers = new NumberObasTableField("OtOthers", this);
                }
                return this._otOthers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "OtInsurance", {
            get: function () {
                if (this._otInsurance == null) {
                    this._otInsurance = new NumberObasTableField("OtInsurance", this);
                }
                return this._otInsurance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "OtPayment", {
            get: function () {
                if (this._otPayment == null) {
                    this._otPayment = new NumberObasTableField("OtPayment", this);
                }
                return this._otPayment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "Ot", {
            get: function () {
                if (this._ot == null) {
                    this._ot = new NumberObasTableField("Ot", this);
                }
                return this._ot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "OtSum", {
            get: function () {
                if (this._otSum == null) {
                    this._otSum = new NumberObasTableField("OtSum", this);
                }
                return this._otSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWithValuesHelper.prototype, "TotalCost", {
            get: function () {
                if (this._totalCost == null) {
                    this._totalCost = new NumberObasTableField("TotalCost", this);
                }
                return this._totalCost;
            },
            enumerable: true,
            configurable: true
        });
        TableWithValuesHelper.prototype.CostCalc = function () {
            return this.OtSum.NValue +
                this.Ku.NValue +
                this.Us.NValue +
                this.Tu.NValue +
                this.Iz.NValue;
        };
        TableWithValuesHelper.prototype.OtCalc = function () {
            this.OtSum.NValue = this.Ot.NValue +
                this.OtPayment.NValue +
                this.OtInsurance.NValue +
                this.OtOthers.NValue;
        };
        TableWithValuesHelper.prototype.ResetValues = function () {
            this.OtSum.NValue = 0;
            this.Ot.NValue = 0;
            this.OtPayment.NValue = 0;
            this.OtInsurance.NValue = 0;
            this.OtOthers.NValue = 0;
            this.Ku.NValue = 0;
            this.Us.NValue = 0;
            this.Tu.NValue = 0;
            this.Iz.NValue = 0;
            this.TotalCost.NValue = 0;
        };
        return TableWithValuesHelper;
    }(ObasTable));
    F06300.TableWithValuesHelper = TableWithValuesHelper;
    var PartServiceWorkIndicatorTable = (function (_super) {
        __extends(PartServiceWorkIndicatorTable, _super);
        function PartServiceWorkIndicatorTable(id, parentTable, _sumTable, _sumStrKey) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat("WorkIndex_ID"), parentTable.Document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._sumStrKey = _sumStrKey;
            _this._indicator = null;
            _this._totalSum = null;
            _this._volume = null;
            _this._mzTotal = null;
            _this._mzOthers = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            _this._valuesHelper = null;
            return _this;
        }
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = this.ValuesHelper.CopyFields.concat([
                        this.OwnerKey,
                        this.Indicator.ForeignKey,
                        this.Volume,
                        this.MzTotal,
                        this.MzOthers
                    ]);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "ValuesHelper", {
            get: function () {
                if (this._valuesHelper == null) {
                    this._valuesHelper = new TableWithValuesHelper(this.Id, this.Document);
                }
                return this._valuesHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "MzTotal", {
            get: function () {
                if (this._mzTotal == null) {
                    this._mzTotal = new NumberObasTableField("MzTotal", this);
                }
                return this._mzTotal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "MzOthers", {
            get: function () {
                if (this._mzOthers == null) {
                    this._mzOthers = new NumberObasTableField("MzOthers", this);
                }
                return this._mzOthers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "Volume", {
            get: function () {
                if (this._volume == null) {
                    this._volume = new NumberObasTableField("Volume", this);
                }
                return this._volume;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "TotalSum", {
            get: function () {
                if (this._totalSum == null) {
                    this._totalSum = new NumberObasTableField("TotalSum", this);
                }
                return this._totalSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "Indicator", {
            get: function () {
                if (this._indicator == null) {
                    this._indicator = new ObasSprTableFieldTyped(ObasTableCollection.ServiceWorkIndicatorsSprTable, this);
                }
                return this._indicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "Year", {
            get: function () {
                return this.ParentTable.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "ServWorkKey", {
            get: function () {
                return this.ParentTable.ServWorkKey;
            },
            enumerable: true,
            configurable: true
        });
        PartServiceWorkIndicatorTable.prototype.GetKeys = function (servWorkKey, year, indicatorKey) {
            if (servWorkKey === void 0) { servWorkKey = this.ServWorkKey.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (indicatorKey === void 0) { indicatorKey = this.Indicator.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new PartServWorkIndicatorsTableKeys(servWorkKey, year, indicatorKey);
            }
            else {
                this._keys.ServWorkKey = servWorkKey;
                this._keys.Year = year;
                this._keys.IndicatorKey = indicatorKey;
            }
            return this._keys;
        };
        Object.defineProperty(PartServiceWorkIndicatorTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.NValue - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        PartServiceWorkIndicatorTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(this.YearOffset + 1), this._sumTable.GetKeys(this._sumStrKey), oldValue, newValue);
        };
        PartServiceWorkIndicatorTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalSum.NValue = this.Volume.NValue * this.ValuesHelper.TotalCost.NValue;
        };
        PartServiceWorkIndicatorTable.prototype.CostPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ValuesHelper.TotalCost.NValue = this.ValuesHelper.CostCalc() +
                this.MzTotal.NValue +
                this.MzOthers.NValue;
        };
        PartServiceWorkIndicatorTable.prototype.OtPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ValuesHelper.OtCalc();
            this.CostPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        PartServiceWorkIndicatorTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.ValuesHelper.ResetValues();
            this.IsCopied.Value = true;
            this.MzTotal.NValue = 0;
            this.MzOthers.NValue = 0;
            this.Volume.NValue = 0;
            this.TotalSum.NValue = 0;
        };
        PartServiceWorkIndicatorTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var parentTable = this.ParentTable;
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(keys.ServWorkKey, year), true);
                    copyData.getValue(this.OwnerKey.Id).Value = ownerKey;
                    keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        PartServiceWorkIndicatorTable.prototype.CopyData = function (srcYear, destYear) {
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
        PartServiceWorkIndicatorTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        PartServiceWorkIndicatorTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        PartServiceWorkIndicatorTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.ValuesHelper.ResetValues();
                _this.MzTotal.NValue = 0;
                _this.MzOthers.NValue = 0;
                _this.Volume.NValue = 0;
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
        PartServiceWorkIndicatorTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PartServiceWorkIndicatorTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        return PartServiceWorkIndicatorTable;
    }(ObasTableWithKeysParent));
    F06300.PartServiceWorkIndicatorTable = PartServiceWorkIndicatorTable;
    var PartYearNameTableKeys = (function (_super) {
        __extends(PartYearNameTableKeys, _super);
        function PartYearNameTableKeys(year, Name) {
            var _this = _super.call(this, year) || this;
            _this.Name = Name;
            return _this;
        }
        return PartYearNameTableKeys;
    }(PartYearTableKeys));
    F06300.PartYearNameTableKeys = PartYearNameTableKeys;
    var SusbidieNameTable = (function (_super) {
        __extends(SusbidieNameTable, _super);
        function SusbidieNameTable(id, document, _sumTable, _sumStrKey) {
            var _this = _super.call(this, id, [BaseObasTableFields.YearField.Id, BaseObasTableFields.NameField.Id], document) || this;
            _this._sumTable = _sumTable;
            _this._sumStrKey = _sumStrKey;
            _this._isCopied = null;
            _this._sf = null;
            _this._year = null;
            _this._subsidieName = null;
            _this._copyData = null;
            _this._copyFields = null;
            _this._valuesHelper = null;
            return _this;
        }
        Object.defineProperty(SusbidieNameTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = this.ValuesHelper.CopyFields.concat([
                        this.Year,
                        this.Sf,
                        this.SubsidieName
                    ]);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SusbidieNameTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SusbidieNameTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SusbidieNameTable.prototype, "ValuesHelper", {
            get: function () {
                if (this._valuesHelper == null) {
                    this._valuesHelper = new TableWithValuesHelper(this.Id, this.Document);
                }
                return this._valuesHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SusbidieNameTable.prototype, "Sf", {
            get: function () {
                if (this._sf == null) {
                    this._sf = new NumberObasTableField("Sf", this);
                }
                return this._sf;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SusbidieNameTable.prototype, "SubsidieName", {
            get: function () {
                if (this._subsidieName == null) {
                    this._subsidieName = new ObasTableField(BaseObasTableFields.NameField.Id, this, true);
                }
                return this._subsidieName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SusbidieNameTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SusbidieNameTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.NValue - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        SusbidieNameTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(this.YearOffset + 1), this._sumTable.GetKeys(this._sumStrKey), oldValue, newValue);
        };
        SusbidieNameTable.prototype.CostPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ValuesHelper.TotalCost.NValue = this.ValuesHelper.CostCalc() +
                this.Sf.NValue;
        };
        SusbidieNameTable.prototype.OtPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ValuesHelper.OtCalc();
            this.CostPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        SusbidieNameTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.ValuesHelper.ResetValues();
            this.IsCopied.Value = true;
            this.Sf.NValue = 0;
        };
        SusbidieNameTable.prototype.InnerCopyData = function (recordKey, endYear) {
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
        SusbidieNameTable.prototype.CopyData = function (srcYear, destYear) {
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
        SusbidieNameTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        SusbidieNameTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        SusbidieNameTable.prototype.GetKeys = function (year, name) {
            if (year === void 0) { year = this.Year.Value; }
            if (name === void 0) { name = this.SubsidieName.Value; }
            if (this._keys == null) {
                this._keys = new PartYearNameTableKeys(year, name);
            }
            else {
                this._keys.Year = year;
                this._keys.Name = name;
            }
            return this._keys;
        };
        SusbidieNameTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.ValuesHelper.ResetValues();
                _this.Sf.NValue = 0;
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
        SusbidieNameTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        SusbidieNameTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        return SusbidieNameTable;
    }(ObasTableWithKeys));
    F06300.SusbidieNameTable = SusbidieNameTable;
})(F06300 || (F06300 = {}));
