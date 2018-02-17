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
var F08810;
(function (F08810) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F08810.TableRules = TableRules;
    var StrKeys;
    (function (StrKeys) {
        StrKeys[StrKeys["Total"] = 3] = "Total";
        StrKeys[StrKeys["Property"] = 1] = "Property";
        StrKeys[StrKeys["Lands"] = 2] = "Lands";
    })(StrKeys = F08810.StrKeys || (F08810.StrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return StrKeys.Total;
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
    F08810.P1TotalTable = P1TotalTable;
    var OkatoSprTable = (function (_super) {
        __extends(OkatoSprTable, _super);
        function OkatoSprTable() {
            return _super.call(this, "OKATO") || this;
        }
        return OkatoSprTable;
    }(SprTable));
    F08810.OkatoSprTable = OkatoSprTable;
    var OrgOkatoObasTableKeys = (function (_super) {
        __extends(OrgOkatoObasTableKeys, _super);
        function OrgOkatoObasTableKeys(OkatoKey) {
            var _this = _super.call(this) || this;
            _this.OkatoKey = OkatoKey;
            return _this;
        }
        return OrgOkatoObasTableKeys;
    }(ObasTableKeys));
    F08810.OrgOkatoObasTableKeys = OrgOkatoObasTableKeys;
    var OrgOkatoCadastreObasTableKeys = (function (_super) {
        __extends(OrgOkatoCadastreObasTableKeys, _super);
        function OrgOkatoCadastreObasTableKeys(okatoKey, CadastreNum) {
            var _this = _super.call(this, okatoKey) || this;
            _this.CadastreNum = CadastreNum;
            return _this;
        }
        return OrgOkatoCadastreObasTableKeys;
    }(OrgOkatoObasTableKeys));
    F08810.OrgOkatoCadastreObasTableKeys = OrgOkatoCadastreObasTableKeys;
    var P2ObasTable = (function (_super) {
        __extends(P2ObasTable, _super);
        function P2ObasTable(id, document, _strKey, keyFieldsIds) {
            if (keyFieldsIds === void 0) { keyFieldsIds = ["OKATO_ID"]; }
            var _this = _super.call(this, id, keyFieldsIds, document) || this;
            _this._strKey = _strKey;
            _this._copyFields = null;
            _this._uniqTable = null;
            _this._uniqTable = new UniqueObasTable(id, document, keyFieldsIds);
            return _this;
        }
        Object.defineProperty(P2ObasTable.prototype, "UniqueTable", {
            get: function () {
                return this._uniqTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2ObasTable.prototype, "OkatoField", {
            get: function () {
                if (this._okatoKeyField == null) {
                    this._okatoKeyField = new ObasSprTableFieldTyped(this.Document.OkatoTable, this);
                }
                return this._okatoKeyField;
            },
            enumerable: true,
            configurable: true
        });
        P2ObasTable.prototype.GetKeys = function (okatoKey) {
            if (okatoKey === void 0) { okatoKey = this.OkatoField.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new OrgOkatoObasTableKeys(okatoKey);
            }
            else {
                this._keys.OkatoKey = okatoKey;
            }
            return this._keys;
        };
        Object.defineProperty(P2ObasTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OkatoField.ForeignKey];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, i));
                    }, false);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P2ObasTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P2ObasTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2ObasTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        P2ObasTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        P2ObasTable.prototype.ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Document.TableP1TopSum.SetSumByKeys(fieldId, this.Document.TableP1TopSum.GetKeys(this._strKey), oldValue, newValue);
        };
        P2ObasTable.prototype.DeleteElement = function (okatoKey) {
            this.UniqueTable.DeleteElement(okatoKey);
        };
        P2ObasTable.prototype.AddElement = function (okatoKey) {
            this.UniqueTable.AddElement(okatoKey);
        };
        return P2ObasTable;
    }(ObasTableWithKeys));
    F08810.P2ObasTable = P2ObasTable;
    var P3ObasTable = (function (_super) {
        __extends(P3ObasTable, _super);
        function P3ObasTable(id, document, strKey) {
            var _this = _super.call(this, id, document, strKey, ["OKATO_ID", "CadastreNum"]) || this;
            _this._keys = null;
            return _this;
        }
        Object.defineProperty(P3ObasTable.prototype, "CadastreNumField", {
            get: function () {
                if (this._cadastreNumField == null) {
                    this._cadastreNumField = new ObasTableField(this.Document.CadastreKeyField, this);
                }
                return this._cadastreNumField;
            },
            enumerable: true,
            configurable: true
        });
        P3ObasTable.prototype.GetKeys = function (okatoKey, cadastreNum) {
            if (okatoKey === void 0) { okatoKey = this.OkatoField.ForeignKey.Value; }
            if (cadastreNum === void 0) { cadastreNum = this.CadastreNumField.Value; }
            if (this._keys == null) {
                this._keys = new OrgOkatoCadastreObasTableKeys(okatoKey, cadastreNum);
            }
            else {
                this._keys.OkatoKey = okatoKey;
                this._keys.CadastreNum = cadastreNum;
            }
            return this._keys;
        };
        Object.defineProperty(P3ObasTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OkatoField.ForeignKey, this.CadastreNumField];
                    var yearField_2 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_2.GenerateTableField(_this, i));
                    }, false);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P3ObasTable.prototype.DeleteElement = function (okatoKey, cadastreNum) {
            this.UniqueTable.DeleteElement(okatoKey, cadastreNum);
        };
        P3ObasTable.prototype.AddElement = function (okatoKey, cadastreNum) {
            this.UniqueTable.AddElement(okatoKey, cadastreNum);
        };
        return P3ObasTable;
    }(P2ObasTable));
    F08810.P3ObasTable = P3ObasTable;
    var StrKeysP2Sp1 = (function (_super) {
        __extends(StrKeysP2Sp1, _super);
        function StrKeysP2Sp1(okatoKey, Year) {
            var _this = _super.call(this, okatoKey) || this;
            _this.Year = Year;
            return _this;
        }
        return StrKeysP2Sp1;
    }(OrgOkatoObasTableKeys));
    F08810.StrKeysP2Sp1 = StrKeysP2Sp1;
    var StrKeysP3Sp1 = (function (_super) {
        __extends(StrKeysP3Sp1, _super);
        function StrKeysP3Sp1(okatoKey, year, CadastreKey) {
            var _this = _super.call(this, okatoKey, year) || this;
            _this.CadastreKey = CadastreKey;
            return _this;
        }
        return StrKeysP3Sp1;
    }(StrKeysP2Sp1));
    F08810.StrKeysP3Sp1 = StrKeysP3Sp1;
    var PXSp1ObasTable = (function (_super) {
        __extends(PXSp1ObasTable, _super);
        function PXSp1ObasTable(id, keyFieldIds, document, sumTable) {
            var _this = _super.call(this, id, keyFieldIds, document) || this;
            _this._year = null;
            _this._delOkatoKey = null;
            _this._copyFields = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._sumTable = null;
            _this._sumTable = sumTable;
            _this.SumTable.UniqueTable.AddChildTable(_this);
            return _this;
        }
        Object.defineProperty(PXSp1ObasTable.prototype, "SumTable", {
            get: function () {
                return this._sumTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PXSp1ObasTable.prototype, "OkatoField", {
            get: function () {
                if (this._okatoKeyField == null) {
                    this._okatoKeyField = new ObasSprTableFieldTyped(this.Document.OkatoTable, this);
                }
                return this._okatoKeyField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PXSp1ObasTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PXSp1ObasTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        PXSp1ObasTable.prototype.OnOkatoKeyChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SumTable.DeleteElement(oldValue);
            this.SumTable.AddElement(newValue);
        };
        PXSp1ObasTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        PXSp1ObasTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var dataYear = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    keys.Year = year;
                    dataYear.Value = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        Object.defineProperty(PXSp1ObasTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        PXSp1ObasTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        PXSp1ObasTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, this.Document.Settings.StartYear + this.Document.Settings.YearsCount - 1);
            }
        };
        PXSp1ObasTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PXSp1ObasTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var endYear = this.Document.Settings.StartYear + this.Document.Settings.YearsCount - 1;
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
        PXSp1ObasTable.prototype.CommonTotalChangeEventHandler = function (oldValue, newValue, keys) {
            var yearField = BaseObasTableFields.YearDataField
                .GenerateId(this.Year.Value - this.Document.Settings.StartYear + 1);
            this.SumTable.SetSumByKeys(yearField, keys, oldValue, newValue);
        };
        return PXSp1ObasTable;
    }(ObasTableWithKeys));
    F08810.PXSp1ObasTable = PXSp1ObasTable;
    var P2Sp1ObasTable = (function (_super) {
        __extends(P2Sp1ObasTable, _super);
        function P2Sp1ObasTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._propertyTaxG7 = null;
            _this._propertyTaxG10 = null;
            _this._propertyTaxG13 = null;
            _this._propertySumTotal = null;
            _this._propertySumOther = null;
            _this._propertySumBenefit = null;
            _this._taxBase = null;
            _this._taxRate = null;
            _this._taxSum = null;
            _this._taxBenefitSum = null;
            _this._taxSumOther = null;
            _this._total = null;
            return _this;
        }
        Object.defineProperty(P2Sp1ObasTable.prototype, "PropertyTaxG7", {
            get: function () {
                if (this._propertyTaxG7 == null) {
                    this._propertyTaxG7 = new ObasSprTableField(ObasTableCollection.OrgTaxPrivilegeSprTable, this, "PropertyTax_g7");
                }
                return this._propertyTaxG7;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "PropertyTaxG10", {
            get: function () {
                if (this._propertyTaxG10 == null) {
                    this._propertyTaxG10 = new ObasSprTableField(ObasTableCollection.OrgTaxPrivilegeSprTable, this, "PropertyTax_g10");
                }
                return this._propertyTaxG10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "PropertyTaxG13", {
            get: function () {
                if (this._propertyTaxG13 == null) {
                    this._propertyTaxG13 = new ObasSprTableField(ObasTableCollection.OrgTaxPrivilegeSprTable, this, "PropertyTax_g13");
                }
                return this._propertyTaxG13;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "PropertySumTotal", {
            get: function () {
                if (this._propertySumTotal == null) {
                    this._propertySumTotal = new NumberObasTableField("g5", this);
                }
                return this._propertySumTotal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "PropertySumOther", {
            get: function () {
                if (this._propertySumOther == null) {
                    this._propertySumOther = new NumberObasTableField("g6", this);
                }
                return this._propertySumOther;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "PropertySumBenefit", {
            get: function () {
                if (this._propertySumBenefit == null) {
                    this._propertySumBenefit = new NumberObasTableField("g8", this);
                }
                return this._propertySumBenefit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "TaxBase", {
            get: function () {
                if (this._taxBase == null) {
                    this._taxBase = new NumberObasTableField("g9", this);
                }
                return this._taxBase;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "TaxRate", {
            get: function () {
                if (this._taxRate == null) {
                    this._taxRate = new NumberObasTableField("g11", this);
                }
                return this._taxRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "TaxSum", {
            get: function () {
                if (this._taxSum == null) {
                    this._taxSum = new NumberObasTableField("g12", this);
                }
                return this._taxSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "TaxBenefitSum", {
            get: function () {
                if (this._taxBenefitSum == null) {
                    this._taxBenefitSum = new NumberObasTableField("g14", this);
                }
                return this._taxBenefitSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "TaxSumOther", {
            get: function () {
                if (this._taxSumOther == null) {
                    this._taxSumOther = new NumberObasTableField("g15", this);
                }
                return this._taxSumOther;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1ObasTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberObasTableField("g16", this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp1ObasTable.prototype.DeleteEventHandler = function (tableId) {
            this._delOkatoKey = this.OkatoField.ForeignKey.Value;
            this.Total.NValue = 0;
        };
        P2Sp1ObasTable.prototype.AfterDeleteEventHandler = function () {
            this.SumTable.DeleteElement(this._delOkatoKey);
        };
        Object.defineProperty(P2Sp1ObasTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.OkatoField.ForeignKey, this.Year,
                        this.PropertyTaxG7.ForeignKey, this.PropertyTaxG10.ForeignKey, this.PropertyTaxG13.ForeignKey,
                        this.PropertySumTotal, this.PropertySumOther, this.PropertySumBenefit,
                        this.TaxRate, this.TaxBenefitSum, this.TaxSumOther];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp1ObasTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.PropertySumTotal.NValue = 0;
                _this.PropertySumOther.NValue = 0;
                _this.PropertySumBenefit.NValue = 0;
                _this.TaxRate.NValue = 0;
                _this.TaxBenefitSum.NValue = 0;
                _this.TaxSumOther.NValue = 0;
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
        P2Sp1ObasTable.prototype.G5G8ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TaxBase.NValue = this.PropertySumTotal.NValue - this.PropertySumBenefit.NValue;
        };
        P2Sp1ObasTable.prototype.G9G11ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TaxSum.NValue = this.TaxBase.NValue * (this.TaxRate.NValue / 100);
        };
        P2Sp1ObasTable.prototype.G12G14G15ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.NValue = this.TaxSum.NValue - this.TaxBenefitSum.NValue + (this.TaxSumOther.NValue);
        };
        P2Sp1ObasTable.prototype.TotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var tableP2 = this.SumTable;
            var keys = tableP2.GetKeys(this.OkatoField.ForeignKey.Value);
            this.CommonTotalChangeEventHandler(oldValue, newValue, keys);
        };
        P2Sp1ObasTable.prototype.GetKeys = function (okatoKey, year) {
            if (okatoKey === void 0) { okatoKey = this.OkatoField.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP2Sp1(okatoKey, year);
            }
            else {
                this._keys.OkatoKey = okatoKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        return P2Sp1ObasTable;
    }(PXSp1ObasTable));
    F08810.P2Sp1ObasTable = P2Sp1ObasTable;
    var P3Sp1ObasTable = (function (_super) {
        __extends(P3Sp1ObasTable, _super);
        function P3Sp1ObasTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._delCadastreNum = null;
            _this._landCategory = null;
            _this._landTaxG9 = null;
            _this._landTaxG18 = null;
            _this._landTaxG20 = null;
            _this._landTaxG22 = null;
            _this._landTaxG24 = null;
            _this._cadastreSum = null;
            _this._taxpayerSum = null;
            _this._propertySumBenefit = null;
            _this._taxBase = null;
            _this._taxRate = null;
            _this._taxMonthes = null;
            _this._kv = null;
            _this._taxSum = null;
            _this._benefitMonthes = null;
            _this._kl = null;
            _this._taxBenefitSumG19 = null;
            _this._taxBenefitSumG21 = null;
            _this._taxBenefitSumG23 = null;
            _this._taxBenefitSumG25 = null;
            _this._taxSumOther = null;
            _this._total = null;
            return _this;
        }
        Object.defineProperty(P3Sp1ObasTable.prototype, "CadastreNumField", {
            get: function () {
                if (this._cadastreNumField == null) {
                    this._cadastreNumField = new ObasTableField(this.Document.CadastreKeyField, this);
                }
                return this._cadastreNumField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "LandCategory", {
            get: function () {
                if (this._landCategory == null) {
                    this._landCategory = new ObasSprTableField(ObasTableCollection.LandCategorySprTable, this, "CatLand");
                }
                return this._landCategory;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "LandTaxG9", {
            get: function () {
                if (this._landTaxG9 == null) {
                    this._landTaxG9 = new ObasSprTableField(ObasTableCollection.LandTaxPrivilegeSprTable, this, "LandTax_g9");
                }
                return this._landTaxG9;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "LandTaxG18", {
            get: function () {
                if (this._landTaxG18 == null) {
                    this._landTaxG18 = new ObasSprTableField(ObasTableCollection.LandTaxPrivilegeSprTable, this, "LandTax_g18");
                }
                return this._landTaxG18;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "LandTaxG20", {
            get: function () {
                if (this._landTaxG20 == null) {
                    this._landTaxG20 = new ObasSprTableField(ObasTableCollection.LandTaxPrivilegeSprTable, this, "LandTax_g20");
                }
                return this._landTaxG20;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "LandTaxG22", {
            get: function () {
                if (this._landTaxG22 == null) {
                    this._landTaxG22 = new ObasSprTableField(ObasTableCollection.LandTaxPrivilegeSprTable, this, "LandTax_g22");
                }
                return this._landTaxG22;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "LandTaxG24", {
            get: function () {
                if (this._landTaxG24 == null) {
                    this._landTaxG24 = new ObasSprTableField(ObasTableCollection.LandTaxPrivilegeSprTable, this, "LandTax_g24");
                }
                return this._landTaxG24;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "CadastreSum", {
            get: function () {
                if (this._cadastreSum == null) {
                    this._cadastreSum = new NumberObasTableField("g7", this);
                }
                return this._cadastreSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxpayerSum", {
            get: function () {
                if (this._taxpayerSum == null) {
                    this._taxpayerSum = new NumberObasTableField("g8", this);
                }
                return this._taxpayerSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "PropertySumBenefit", {
            get: function () {
                if (this._propertySumBenefit == null) {
                    this._propertySumBenefit = new NumberObasTableField("g10", this);
                }
                return this._propertySumBenefit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxBase", {
            get: function () {
                if (this._taxBase == null) {
                    this._taxBase = new NumberObasTableField("g11", this);
                }
                return this._taxBase;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxRate", {
            get: function () {
                if (this._taxRate == null) {
                    this._taxRate = new NumberObasTableField("g12", this);
                }
                return this._taxRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxMonthes", {
            get: function () {
                if (this._taxMonthes == null) {
                    this._taxMonthes = new NumberObasTableField("g13", this);
                }
                return this._taxMonthes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "Kv", {
            get: function () {
                if (this._kv == null) {
                    this._kv = new NumberObasTableField("g14", this);
                }
                return this._kv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxSum", {
            get: function () {
                if (this._taxSum == null) {
                    this._taxSum = new NumberObasTableField("g15", this);
                }
                return this._taxSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "BenefitMonthes", {
            get: function () {
                if (this._benefitMonthes == null) {
                    this._benefitMonthes = new NumberObasTableField("g16", this);
                }
                return this._benefitMonthes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "Kl", {
            get: function () {
                if (this._kl == null) {
                    this._kl = new NumberObasTableField("g17", this);
                }
                return this._kl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxBenefitSumG19", {
            get: function () {
                if (this._taxBenefitSumG19 == null) {
                    this._taxBenefitSumG19 = new NumberObasTableField("g19", this);
                }
                return this._taxBenefitSumG19;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxBenefitSumG21", {
            get: function () {
                if (this._taxBenefitSumG21 == null) {
                    this._taxBenefitSumG21 = new NumberObasTableField("g21", this);
                }
                return this._taxBenefitSumG21;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxBenefitSumG23", {
            get: function () {
                if (this._taxBenefitSumG23 == null) {
                    this._taxBenefitSumG23 = new NumberObasTableField("g23", this);
                }
                return this._taxBenefitSumG23;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxBenefitSumG25", {
            get: function () {
                if (this._taxBenefitSumG25 == null) {
                    this._taxBenefitSumG25 = new NumberObasTableField("g25", this);
                }
                return this._taxBenefitSumG25;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "TaxSumOther", {
            get: function () {
                if (this._taxSumOther == null) {
                    this._taxSumOther = new NumberObasTableField("g26", this);
                }
                return this._taxSumOther;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1ObasTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberObasTableField("g26", this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp1ObasTable.prototype.DeleteEventHandler = function (tableId) {
            this._delOkatoKey = this.OkatoField.ForeignKey.Value;
            this._delCadastreNum = this.CadastreNumField.Value;
            this.Total.NValue = 0;
        };
        P3Sp1ObasTable.prototype.OnCadastreNumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SumTable.DeleteElement(this.OkatoField.ForeignKey.Value, oldValue);
            this.SumTable.AddElement(this.OkatoField.ForeignKey.Value, newValue);
        };
        P3Sp1ObasTable.prototype.AfterDeleteEventHandler = function () {
            this.SumTable.DeleteElement(this._delOkatoKey, this._delCadastreNum);
        };
        Object.defineProperty(P3Sp1ObasTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.OkatoField.ForeignKey, this.Year, this.CadastreNumField,
                        this.LandCategory.ForeignKey, this.LandTaxG9.ForeignKey, this.LandTaxG18.ForeignKey,
                        this.LandTaxG20.ForeignKey, this.LandTaxG22.ForeignKey, this.LandTaxG24.ForeignKey,
                        this.CadastreSum, this.TaxpayerSum, this.PropertySumBenefit, this.TaxBase, this.TaxRate,
                        this.TaxMonthes, this.Kv, this.TaxSum, this.BenefitMonthes, this.Kl,
                        this.TaxBenefitSumG23, this.TaxBenefitSumG25, this.Total];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp1ObasTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.CadastreSum.NValue = 0;
                _this.TaxpayerSum.NValue = 0;
                _this.PropertySumBenefit.NValue = 0;
                _this.TaxRate.NValue = 0;
                _this.TaxMonthes.NValue = 0;
                _this.Kv.NValue = 0;
                _this.TaxSum.NValue = 0;
                _this.BenefitMonthes.NValue = 0;
                _this.Kl.NValue = 0;
                _this.TaxBenefitSumG23.NValue = 0;
                _this.TaxBenefitSumG25.NValue = 0;
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
        P3Sp1ObasTable.prototype.GetKeys = function (okatoKey, year, cadastreNum) {
            if (okatoKey === void 0) { okatoKey = this.OkatoField.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (cadastreNum === void 0) { cadastreNum = this.CadastreNumField.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP3Sp1(okatoKey, year, cadastreNum);
            }
            else {
                this._keys.OkatoKey = okatoKey;
                this._keys.Year = year;
                this._keys.CadastreKey = cadastreNum;
            }
            return this._keys;
        };
        P3Sp1ObasTable.prototype.TotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var tableP3 = this.SumTable;
            var keys = tableP3.GetKeys(this.OkatoField.ForeignKey.Value, this.CadastreNumField.Value);
            this.CommonTotalChangeEventHandler(oldValue, newValue, keys);
        };
        P3Sp1ObasTable.prototype.G15G17ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var calcVal = this.TaxSum.NValue * (1 - this.Kl.NValue);
            this.TaxBenefitSumG19.NValue = calcVal;
            this.TaxBenefitSumG21.NValue = calcVal;
        };
        return P3Sp1ObasTable;
    }(PXSp1ObasTable));
    F08810.P3Sp1ObasTable = P3Sp1ObasTable;
})(F08810 || (F08810 = {}));
