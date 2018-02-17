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
var F05312;
(function (F05312) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F05312.TableRules = TableRules;
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "UbYearDataField", {
            get: function () {
                if (this._ubYearDataField == null) {
                    this._ubYearDataField = new BaseGenericObasTableField("UB_Y");
                }
                return this._ubYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "PbaYearDataField", {
            get: function () {
                if (this._pbaYearDataField == null) {
                    this._pbaYearDataField = new BaseGenericObasTableField("PBA_Y");
                }
                return this._pbaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "FaYearDataField", {
            get: function () {
                if (this._faYearDataField == null) {
                    this._faYearDataField = new BaseGenericObasTableField("FA_Y");
                }
                return this._faYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "CoefSalaryYearDataField", {
            get: function () {
                if (this._coefSalaryYearDataField == null) {
                    this._coefSalaryYearDataField = new BaseGenericObasTableField("CoefSalary_Y");
                }
                return this._coefSalaryYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostMinUbYearDataField", {
            get: function () {
                if (this._normCostMinUbYearDataField == null) {
                    this._normCostMinUbYearDataField = new BaseGenericObasTableField("NormCostMinUB_Y");
                }
                return this._normCostMinUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostMaxUbYearDataField", {
            get: function () {
                if (this._normCostMaxUbYearDataField == null) {
                    this._normCostMaxUbYearDataField = new BaseGenericObasTableField("NormCostMaxUB_Y");
                }
                return this._normCostMaxUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "AvgUbYearDataField", {
            get: function () {
                if (this._avgUbYearDataField == null) {
                    this._avgUbYearDataField = new BaseGenericObasTableField("AvgUB_Y");
                }
                return this._avgUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "RateAvgSalaryYearDataField", {
            get: function () {
                if (this._rateAvgSalaryYearDataField == null) {
                    this._rateAvgSalaryYearDataField = new BaseGenericObasTableField("RateAvgSalary_Y");
                }
                return this._rateAvgSalaryYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "CoefUbYearDataField", {
            get: function () {
                if (this._coefUbYearDataField == null) {
                    this._coefUbYearDataField = new BaseGenericObasTableField("CoefUB_Y");
                }
                return this._coefUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormUbYearDataField", {
            get: function () {
                if (this._normUbYearDataField == null) {
                    this._normUbYearDataField = new BaseGenericObasTableField("NormUB_Y");
                }
                return this._normUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostMinToMaxUbYearDataField", {
            get: function () {
                if (this._normCostMinToMaxUbYearDataField == null) {
                    this._normCostMinToMaxUbYearDataField = new BaseGenericObasTableField("NormCostMinToMaxUB_Y");
                }
                return this._normCostMinToMaxUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "AvgSalaryYearDataField", {
            get: function () {
                if (this._avgSalaryYearDataField == null) {
                    this._avgSalaryYearDataField = new BaseGenericObasTableField("AvgSalary_Y");
                }
                return this._avgSalaryYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostExceedMaxUbYearDataField", {
            get: function () {
                if (this._normCostExceedMaxUbYearDataField == null) {
                    this._normCostExceedMaxUbYearDataField = new BaseGenericObasTableField("NormCostExceedMaxUB_Y");
                }
                return this._normCostExceedMaxUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "RegCoefSalaryYearDataField", {
            get: function () {
                if (this._regCoefSalaryYearDataField == null) {
                    this._regCoefSalaryYearDataField = new BaseGenericObasTableField("RegCoefSalary_Y");
                }
                return this._regCoefSalaryYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostMinFaYearDataField", {
            get: function () {
                if (this._normCostMinFaYearDataField == null) {
                    this._normCostMinFaYearDataField = new BaseGenericObasTableField("NormCostMinFA_Y");
                }
                return this._normCostMinFaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostMaxFaYearDataField", {
            get: function () {
                if (this._normCostMaxFaYearDataField == null) {
                    this._normCostMaxFaYearDataField = new BaseGenericObasTableField("NormCostMaxFA_Y");
                }
                return this._normCostMaxFaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "AvgFaYearDataField", {
            get: function () {
                if (this._avgFaYearDataField == null) {
                    this._avgFaYearDataField = new BaseGenericObasTableField("AvgFA_Y");
                }
                return this._avgFaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "CoefFaYearDataField", {
            get: function () {
                if (this._coefFaYearDataField == null) {
                    this._coefFaYearDataField = new BaseGenericObasTableField("CoefFA_Y");
                }
                return this._coefFaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostMinToMaxFaYearDataField", {
            get: function () {
                if (this._normCostMinToMaxFaYearDataField == null) {
                    this._normCostMinToMaxFaYearDataField = new BaseGenericObasTableField("NormCostMinToMaxFA_Y");
                }
                return this._normCostMinToMaxFaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostExceedMaxFaYearDataField", {
            get: function () {
                if (this._normCostExceedMaxFaYearDataField == null) {
                    this._normCostExceedMaxFaYearDataField = new BaseGenericObasTableField("NormCostExceedMaxFA_Y");
                }
                return this._normCostExceedMaxFaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormCostPbaYearDataField", {
            get: function () {
                if (this._normCostPbaYearDataField == null) {
                    this._normCostPbaYearDataField = new BaseGenericObasTableField("NormCostPBA_Y");
                }
                return this._normCostPbaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "AvgCountUbYearDataField", {
            get: function () {
                if (this._avgCountUbYearDataField == null) {
                    this._avgCountUbYearDataField = new BaseGenericObasTableField("AvgCountUB_Y");
                }
                return this._avgCountUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "AvgCountRegWorklessUbYearDataField", {
            get: function () {
                if (this._avgCountRegWorklessUbYearDataField == null) {
                    this._avgCountRegWorklessUbYearDataField = new BaseGenericObasTableField("AvgCountRegWorklessUB_Y");
                }
                return this._avgCountRegWorklessUbYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "AvgCountRegWorklessFaYearDataField", {
            get: function () {
                if (this._avgCountRegWorklessFaYearDataField == null) {
                    this._avgCountRegWorklessFaYearDataField = new BaseGenericObasTableField("AvgCountRegWorklessFA_Y");
                }
                return this._avgCountRegWorklessFaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormFaYearDataField", {
            get: function () {
                if (this._normFaYearDataField == null) {
                    this._normFaYearDataField = new BaseGenericObasTableField("NormFA_Y");
                }
                return this._normFaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "AvgPeriodPbaYearDataField", {
            get: function () {
                if (this._avgPeriodPbaYearDataField == null) {
                    this._avgPeriodPbaYearDataField = new BaseGenericObasTableField("AvgPeriodPBA_Y");
                }
                return this._avgPeriodPbaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "CostPbaYearDataField", {
            get: function () {
                if (this._costPbaYearDataField == null) {
                    this._costPbaYearDataField = new BaseGenericObasTableField("CostPBA_Y");
                }
                return this._costPbaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "IsCopiedUbDataField", {
            get: function () {
                if (this._isCopiedUbDataField == null) {
                    this._isCopiedUbDataField = new BaseObasTableField("IsCopiedUB", false);
                }
                return this._isCopiedUbDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "IsCopiedFaDataField", {
            get: function () {
                if (this._isCopiedFaDataField == null) {
                    this._isCopiedFaDataField = new BaseObasTableField("IsCopiedFA", false);
                }
                return this._isCopiedFaDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "AvgCountRegWorklessPbaYearDataField", {
            get: function () {
                if (this._avgCountRegWorklessPbaYearDataField == null) {
                    this._avgCountRegWorklessPbaYearDataField = new BaseGenericObasTableField("AvgCountRegWorklessPBA_Y");
                }
                return this._avgCountRegWorklessPbaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "NormPbaYearDataField", {
            get: function () {
                if (this._normPbaYearDataField == null) {
                    this._normPbaYearDataField = new BaseGenericObasTableField("NormPBA_Y");
                }
                return this._normPbaYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._faYearDataField = null;
    ObasTableFields._pbaYearDataField = null;
    ObasTableFields._ubYearDataField = null;
    ObasTableFields._coefSalaryYearDataField = null;
    ObasTableFields._normCostMinUbYearDataField = null;
    ObasTableFields._normCostMaxUbYearDataField = null;
    ObasTableFields._avgUbYearDataField = null;
    ObasTableFields._rateAvgSalaryYearDataField = null;
    ObasTableFields._coefUbYearDataField = null;
    ObasTableFields._normUbYearDataField = null;
    ObasTableFields._avgSalaryYearDataField = null;
    ObasTableFields._normCostExceedMaxUbYearDataField = null;
    ObasTableFields._regCoefSalaryYearDataField = null;
    ObasTableFields._normCostMinFaYearDataField = null;
    ObasTableFields._normCostMaxFaYearDataField = null;
    ObasTableFields._avgFaYearDataField = null;
    ObasTableFields._coefFaYearDataField = null;
    ObasTableFields._normCostExceedMaxFaYearDataField = null;
    ObasTableFields._normCostPbaYearDataField = null;
    ObasTableFields._avgCountUbYearDataField = null;
    ObasTableFields._avgCountRegWorklessUbYearDataField = null;
    ObasTableFields._avgCountRegWorklessFaYearDataField = null;
    ObasTableFields._normFaYearDataField = null;
    ObasTableFields._avgCountRegWorklessPbaYearDataField = null;
    ObasTableFields._normPbaYearDataField = null;
    ObasTableFields._normCostMinToMaxUbYearDataField = null;
    ObasTableFields._normCostMinToMaxFaYearDataField = null;
    ObasTableFields._avgPeriodPbaYearDataField = null;
    ObasTableFields._costPbaYearDataField = null;
    ObasTableFields._isCopiedUbDataField = null;
    ObasTableFields._isCopiedFaDataField = null;
    F05312.ObasTableFields = ObasTableFields;
    var KeyOwner = (function (_super) {
        __extends(KeyOwner, _super);
        function KeyOwner(OwnerKey) {
            var _this = _super.call(this) || this;
            _this.OwnerKey = OwnerKey;
            return _this;
        }
        return KeyOwner;
    }(ObasTableKeys));
    F05312.KeyOwner = KeyOwner;
    var TableSubject = (function (_super) {
        __extends(TableSubject, _super);
        function TableSubject(id, document) {
            return _super.call(this, id, document) || this;
        }
        TableSubject.prototype.GetValue = function (field, fieldId, newValue) {
            return (field.Id === fieldId ? newValue : this.GetFieldValue(field.GenerateId(fieldId))) || 0;
        };
        TableSubject.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), (this.GetValue(ObasTableFields.UbYearDataField, fieldId, newValue)
                + this.GetValue(ObasTableFields.FaYearDataField, fieldId, newValue)
                + this.GetValue(ObasTableFields.PbaYearDataField, fieldId, newValue)));
        };
        TableSubject.prototype.InnerCopyData = function (recordKey, endYear) {
            ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableSubject.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.UbYearDataField, ObasTableFields.FaYearDataField, ObasTableFields.PbaYearDataField);
        };
        TableSubject.prototype.ResetData = function (keys) {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField,
                ObasTableFields.UbYearDataField,
                ObasTableFields.FaYearDataField,
                ObasTableFields.PbaYearDataField
            ]);
        };
        TableSubject.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        Object.defineProperty(TableSubject.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Subject.ForeignKey, this.ScienceCity.ForeignKey, this.Zato.ForeignKey,
                        this.MunicipalEntity.ForeignKey
                    ];
                    var ubYearField_1 = ObasTableFields.UbYearDataField;
                    var PbaYearField_1 = ObasTableFields.PbaYearDataField;
                    var FaYearField_1 = ObasTableFields.FaYearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(ubYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(FaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(PbaYearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableSubject.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return TableSubject;
    }(SubsidiesSubventions.FRegionsTable));
    F05312.TableSubject = TableSubject;
    var TableCost = (function (_super) {
        __extends(TableCost, _super);
        function TableCost(tableId, document, tableSubject, IndicatorTable) {
            var _this = _super.call(this, tableId, [BaseObasTableFields.OwnerKeyField.Id], document, tableSubject) || this;
            _this.IndicatorTable = IndicatorTable;
            _this._fieldValueChanged = null;
            _this._copyFields = null;
            _this.IndicatorTable.FieldValueChanged.Add(function (table, oldValue, newValue, fieldId) {
                var key = _this.IndicatorTable.StrKey;
                var fieldChange = null;
                var fieldChangeReg = null;
                if (key === StrKeyBenefit.Min) {
                    fieldChange = ObasTableFields.NormCostMinUbYearDataField;
                    fieldChangeReg = ObasTableFields.NormCostMinFaYearDataField;
                }
                else {
                    fieldChange = ObasTableFields.NormCostMaxUbYearDataField;
                    fieldChangeReg = ObasTableFields.NormCostMaxFaYearDataField;
                }
                _this.Iterate(function () {
                    var coefSalary = _this.GetFieldValue(ObasTableFields.CoefSalaryYearDataField.GenerateId(fieldId)) || 0;
                    _this.CalcMultNormCost(fieldChange.GenerateId(fieldId), newValue, coefSalary);
                    _this.CalcMultNormCost(fieldChangeReg.GenerateId(fieldId), newValue, coefSalary);
                });
            });
            return _this;
        }
        Object.defineProperty(TableCost.prototype, "FieldValueChanged", {
            get: function () {
                if (this._fieldValueChanged == null) {
                    this._fieldValueChanged = new ObasTableFieldChangeEvent();
                }
                return this._fieldValueChanged;
            },
            enumerable: true,
            configurable: true
        });
        TableCost.prototype.GetValue = function (field, fieldId, newValue) {
            return (field.Id === fieldId ? newValue : this.GetFieldValue(field.GenerateId(fieldId))) || 0;
        };
        TableCost.prototype.SumTotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.FieldValueChanged.Do(this, oldValue, newValue, fieldId);
        };
        TableCost.prototype.CalcMultNormCost = function (fieldId, indicator, coefSalaty) {
            this.SetFieldValue(fieldId, (indicator * coefSalaty));
        };
        TableCost.prototype.CalcNormCost = function (minField, maxField, fieldId, newValue) {
            var yearField = BaseObasTableFields.YearDataField.GenerateId(fieldId);
            this.CalcMultNormCost(minField.GenerateId(fieldId), this.IndicatorTable.GetValueByKeys(yearField, this.IndicatorTable.GetKeys(StrKeyBenefit.Min)), newValue);
            this.CalcMultNormCost(maxField.GenerateId(fieldId), this.IndicatorTable.GetValueByKeys(yearField, this.IndicatorTable.GetKeys(StrKeyBenefit.Max)), newValue);
        };
        TableCost.prototype.SumChangeCoefSalaryEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CalcNormCost(ObasTableFields.NormCostMinUbYearDataField, ObasTableFields.NormCostMaxUbYearDataField, fieldId, newValue);
        };
        TableCost.prototype.CalcMultTriple = function (avgField, rateField, coefField, fieldId, newValue) {
            return (this.GetValue(avgField, fieldId, newValue)
                * this.GetValue(rateField, fieldId, newValue)
                * this.GetValue(coefField, fieldId, newValue));
        };
        TableCost.prototype.SumChangeNormUbEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SetFieldValue(ObasTableFields.NormCostMinToMaxUbYearDataField.GenerateId(fieldId), this.CalcMultTriple(ObasTableFields.AvgUbYearDataField, ObasTableFields.RateAvgSalaryYearDataField, ObasTableFields.CoefUbYearDataField, fieldId, newValue));
        };
        TableCost.prototype.SumChangeRateAvgSalaryEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SumChangeNormUbEventHandler(tableId, oldValue, newValue, fieldId);
            this.SumChangeAvgSalaryEventHandler(tableId, oldValue, newValue, fieldId);
            this.SumChangeNormFaEventHandler(tableId, oldValue, newValue, fieldId);
        };
        TableCost.prototype.SumChangeAvgSalaryEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SetFieldValue(ObasTableFields.NormCostExceedMaxUbYearDataField.GenerateId(fieldId), (this.GetValue(ObasTableFields.AvgSalaryYearDataField, fieldId, newValue)
                * this.GetValue(ObasTableFields.RateAvgSalaryYearDataField, fieldId, newValue)));
        };
        TableCost.prototype.SumChangeRegCoefSalaryEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CalcNormCost(ObasTableFields.NormCostMinFaYearDataField, ObasTableFields.NormCostMaxFaYearDataField, fieldId, newValue);
        };
        TableCost.prototype.SumChangeNormFaEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SetFieldValue(ObasTableFields.NormCostMinToMaxFaYearDataField.GenerateId(fieldId), this.CalcMultTriple(ObasTableFields.AvgFaYearDataField, ObasTableFields.RateAvgSalaryYearDataField, ObasTableFields.CoefFaYearDataField, fieldId, newValue));
        };
        TableCost.prototype.InnerCopyData = function (recordKey, endYear) {
            ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableCost.prototype.GetKeys = function (ownerKey) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new KeyOwner(ownerKey);
            }
            else {
                this._keys.OwnerKey = ownerKey;
            }
            return this._keys;
        };
        TableCost.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.CoefSalaryYearDataField, ObasTableFields.NormCostMinUbYearDataField, ObasTableFields.NormCostMaxUbYearDataField, ObasTableFields.AvgUbYearDataField, ObasTableFields.RateAvgSalaryYearDataField, ObasTableFields.CoefUbYearDataField, ObasTableFields.NormCostMinToMaxUbYearDataField, ObasTableFields.AvgSalaryYearDataField, ObasTableFields.NormCostExceedMaxUbYearDataField, ObasTableFields.RegCoefSalaryYearDataField, ObasTableFields.NormCostMinFaYearDataField, ObasTableFields.NormCostMaxFaYearDataField, ObasTableFields.AvgFaYearDataField, ObasTableFields.CoefFaYearDataField, ObasTableFields.NormCostMinToMaxFaYearDataField, ObasTableFields.NormCostExceedMaxFaYearDataField, ObasTableFields.NormCostPbaYearDataField);
        };
        TableCost.prototype.ResetData = function (keys) {
            this.Document.CommonRules.ResetTableData(this, [
                ObasTableFields.CoefSalaryYearDataField,
                ObasTableFields.NormCostMinUbYearDataField,
                ObasTableFields.NormCostMaxUbYearDataField,
                ObasTableFields.AvgUbYearDataField,
                ObasTableFields.RateAvgSalaryYearDataField,
                ObasTableFields.CoefUbYearDataField,
                ObasTableFields.NormCostMinToMaxUbYearDataField,
                ObasTableFields.AvgSalaryYearDataField,
                ObasTableFields.NormCostExceedMaxUbYearDataField,
                ObasTableFields.RegCoefSalaryYearDataField,
                ObasTableFields.NormCostMinFaYearDataField,
                ObasTableFields.NormCostMaxFaYearDataField,
                ObasTableFields.AvgFaYearDataField,
                ObasTableFields.CoefFaYearDataField,
                ObasTableFields.NormCostMinToMaxFaYearDataField,
                ObasTableFields.NormCostExceedMaxFaYearDataField,
                ObasTableFields.NormCostPbaYearDataField
            ]);
        };
        TableCost.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        Object.defineProperty(TableCost.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.OwnerKey
                    ];
                    var coefSalaryYearField_1 = ObasTableFields.CoefSalaryYearDataField;
                    var NormCostMinUbYearField_1 = ObasTableFields.NormCostMinUbYearDataField;
                    var NormCostMaxUbYearField_1 = ObasTableFields.NormCostMaxUbYearDataField;
                    var AvgUbYearField_1 = ObasTableFields.AvgUbYearDataField;
                    var RateAvgSalaryYearField_1 = ObasTableFields.RateAvgSalaryYearDataField;
                    var CoefUbYearField_1 = ObasTableFields.CoefUbYearDataField;
                    var NormCostMinToMaxUbYearField_1 = ObasTableFields.NormCostMinToMaxUbYearDataField;
                    var AvgSalaryYearField_1 = ObasTableFields.AvgSalaryYearDataField;
                    var NormCostExceedMaxUbYearField_1 = ObasTableFields.NormCostExceedMaxUbYearDataField;
                    var RegCoefSalaryYearField_1 = ObasTableFields.RegCoefSalaryYearDataField;
                    var NormCostMinFaYearField_1 = ObasTableFields.NormCostMinFaYearDataField;
                    var NormCostMaxFaYearField_1 = ObasTableFields.NormCostMaxFaYearDataField;
                    var AvgFaYearField_1 = ObasTableFields.AvgFaYearDataField;
                    var CoefFaYearField_1 = ObasTableFields.CoefFaYearDataField;
                    var NormCostFaYearField_1 = ObasTableFields.NormCostMinToMaxFaYearDataField;
                    var NormCostExceedMaxFaYearField_1 = ObasTableFields.NormCostExceedMaxFaYearDataField;
                    var NormCostPbaYearDataField_1 = ObasTableFields.NormCostPbaYearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(coefSalaryYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostMinUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostMaxUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(AvgUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(RateAvgSalaryYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(CoefUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostMinToMaxUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(AvgSalaryYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostExceedMaxUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(RegCoefSalaryYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostMinFaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostMaxFaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(AvgFaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(CoefFaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostFaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostExceedMaxFaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormCostPbaYearDataField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableCost.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return TableCost;
    }(ObasTableWithKeysParent));
    F05312.TableCost = TableCost;
    var StrKeyBenefit;
    (function (StrKeyBenefit) {
        StrKeyBenefit[StrKeyBenefit["Min"] = 1] = "Min";
        StrKeyBenefit[StrKeyBenefit["Max"] = 2] = "Max";
    })(StrKeyBenefit = F05312.StrKeyBenefit || (F05312.StrKeyBenefit = {}));
    var TableP3 = (function (_super) {
        __extends(TableP3, _super);
        function TableP3(id, document) {
            var _this = _super.call(this, id, document, [BaseObasTableFields.StrKeyField.Id]) || this;
            _this._fieldValueChanged = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(TableP3.prototype, "FieldValueChanged", {
            get: function () {
                if (this._fieldValueChanged == null) {
                    this._fieldValueChanged = new ObasTableFieldChangeEvent();
                }
                return this._fieldValueChanged;
            },
            enumerable: true,
            configurable: true
        });
        TableP3.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.FieldValueChanged.Do(this, oldValue, newValue, fieldId);
        };
        Object.defineProperty(TableP3.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableP3.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableP3.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP3.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        TableP3.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return TableP3;
    }(ObasTableWithStr));
    F05312.TableP3 = TableP3;
    var StrKeyNorm;
    (function (StrKeyNorm) {
        StrKeyNorm[StrKeyNorm["AllRF"] = 1] = "AllRF";
    })(StrKeyNorm = F05312.StrKeyNorm || (F05312.StrKeyNorm = {}));
    var FTableNorm = (function (_super) {
        __extends(FTableNorm, _super);
        function FTableNorm(id, document) {
            var _this = _super.call(this, id, document, [BaseObasTableFields.StrKeyField.Id]) || this;
            _this._copyFields = null;
            _this._fieldValueChanged = null;
            return _this;
        }
        Object.defineProperty(FTableNorm.prototype, "FieldValueChanged", {
            get: function () {
                if (this._fieldValueChanged == null) {
                    this._fieldValueChanged = new ObasTableFieldChangeEvent();
                }
                return this._fieldValueChanged;
            },
            enumerable: true,
            configurable: true
        });
        FTableNorm.prototype.SumTotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.FieldValueChanged.Do(this, oldValue, newValue, fieldId);
        };
        FTableNorm.prototype.GetValue = function (field, fieldId, newValue) {
            return (field.Id === fieldId ? newValue : this.GetFieldValue(field.GenerateId(fieldId))) || 0;
        };
        FTableNorm.prototype.CalcDivNorm = function (fieldNorm, avgCount, fieldId, newValue) {
            var avgCountReg = this.GetValue(ObasTableFields.AvgCountRegWorklessUbYearDataField, fieldId, newValue);
            if (avgCountReg !== 0) {
                this.SetFieldValue(fieldNorm.GenerateId(fieldId), (this.GetValue(avgCount, fieldId, newValue) / avgCountReg));
            }
        };
        FTableNorm.prototype.SumChangeNormUbEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CalcDivNorm(ObasTableFields.NormUbYearDataField, ObasTableFields.AvgCountUbYearDataField, fieldId, newValue);
        };
        FTableNorm.prototype.SumChangeAvgCountRegUbEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SumChangeNormUbEventHandler(tableId, oldValue, newValue, fieldId);
            this.SumChangeNormFaEventHandler(tableId, oldValue, newValue, fieldId);
            this.SumChangeNormPbaEventHandler(tableId, oldValue, newValue, fieldId);
        };
        FTableNorm.prototype.SumChangeNormFaEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CalcDivNorm(ObasTableFields.NormFaYearDataField, ObasTableFields.AvgCountRegWorklessFaYearDataField, fieldId, newValue);
        };
        FTableNorm.prototype.SumChangeNormPbaEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CalcDivNorm(ObasTableFields.NormPbaYearDataField, ObasTableFields.AvgCountRegWorklessPbaYearDataField, fieldId, newValue);
        };
        Object.defineProperty(FTableNorm.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField];
                    var AvgCountUbYearField_1 = ObasTableFields.AvgCountUbYearDataField;
                    var AvgCountRegWorklessUbYearField_1 = ObasTableFields.AvgCountRegWorklessUbYearDataField;
                    var NormUbYearField_1 = ObasTableFields.NormUbYearDataField;
                    var AvgCountRegWorklessFaYearField_1 = ObasTableFields.AvgCountRegWorklessFaYearDataField;
                    var NormFaYearField_1 = ObasTableFields.NormFaYearDataField;
                    var AvgCountRegWorklessPbaYearField_1 = ObasTableFields.AvgCountRegWorklessPbaYearDataField;
                    var NormPbaYearField_1 = ObasTableFields.NormPbaYearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(AvgCountUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(AvgCountRegWorklessUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormUbYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(AvgCountRegWorklessFaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormFaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(AvgCountRegWorklessPbaYearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(NormPbaYearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        FTableNorm.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        FTableNorm.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        FTableNorm.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [
                ObasTableFields.AvgCountUbYearDataField,
                ObasTableFields.AvgCountRegWorklessUbYearDataField,
                ObasTableFields.NormUbYearDataField,
                ObasTableFields.AvgCountRegWorklessFaYearDataField,
                ObasTableFields.NormFaYearDataField,
                ObasTableFields.AvgCountRegWorklessPbaYearDataField,
                ObasTableFields.NormPbaYearDataField
            ]);
        };
        FTableNorm.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.AvgCountUbYearDataField, ObasTableFields.AvgCountRegWorklessUbYearDataField, ObasTableFields.NormUbYearDataField, ObasTableFields.AvgCountRegWorklessFaYearDataField, ObasTableFields.NormFaYearDataField, ObasTableFields.AvgCountRegWorklessPbaYearDataField, ObasTableFields.NormPbaYearDataField);
        };
        return FTableNorm;
    }(ObasTableWithStr));
    F05312.FTableNorm = FTableNorm;
    var KeyCostYear = (function (_super) {
        __extends(KeyCostYear, _super);
        function KeyCostYear(ownerKey, Year) {
            var _this = _super.call(this, ownerKey) || this;
            _this.Year = Year;
            return _this;
        }
        return KeyCostYear;
    }(KeyOwner));
    F05312.KeyCostYear = KeyCostYear;
    var CopyMode;
    (function (CopyMode) {
        CopyMode[CopyMode["All"] = 0] = "All";
        CopyMode[CopyMode["Ub"] = 1] = "Ub";
        CopyMode[CopyMode["Fa"] = 2] = "Fa";
        CopyMode[CopyMode["Keys"] = 3] = "Keys";
    })(CopyMode = F05312.CopyMode || (F05312.CopyMode = {}));
    var TableCostYear = (function (_super) {
        __extends(TableCostYear, _super);
        function TableCostYear(id, document, tableSubject, tableCost, tableNorm) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, BaseObasTableFields.YearField.Id], document, tableSubject) || this;
            _this.tableCost = tableCost;
            _this.tableNorm = tableNorm;
            _this._fieldValueChanged = null;
            _this._isCopiedUb = null;
            _this._isCopiedFa = null;
            _this._year = null;
            _this._avgCountRegWorkless = null;
            _this._partCountMinUB = null;
            _this._partCountMinToMaxUB = null;
            _this._partCountMaxUB = null;
            _this._partCountOverMaxUB = null;
            _this._avgPeriodUB = null;
            _this._bankServiceUB = null;
            _this._postServiceUB = null;
            _this._costUB = null;
            _this._partCountMinFA = null;
            _this._partCountMinToMaxFA = null;
            _this._partCountMaxFA = null;
            _this._partCountOverMaxFA = null;
            _this._avgPeriodFA = null;
            _this._bankServiceFA = null;
            _this._postServiceFA = null;
            _this._costFA = null;
            _this._copyFieldsUb = null;
            _this._copyData = null;
            _this._copyDataUb = null;
            _this._copyDataFa = null;
            _this._copyFieldsFa = null;
            _this._copyDataKeys = null;
            _this._copyFieldsKeys = null;
            _this.ParentTable.AddTableAddListener(function (key) {
                _this.AddRow();
                _this.PostRow();
                _this.InnerCopyData(_this.RecordKey.Value, _this.Document.Settings.StartYear + _this.Document.Settings.YearsCount - 1, CopyMode.Keys);
            });
            _this.tableCost.FieldValueChanged.Add(function (table, oldValue, newValue, fieldId) {
                var yearIndexField = ObasHelper.GetYearIndexById(fieldId);
                if (_this.LocateByKeys(_this.GetKeys(table.RecordKey.Value, _this.Document.Settings.StartYear + yearIndexField).ToArray())) {
                    switch (fieldId) {
                        case ObasTableFields.NormCostMinUbYearDataField.GenerateId(fieldId):
                        case ObasTableFields.NormCostMinToMaxUbYearDataField.GenerateId(fieldId):
                        case ObasTableFields.NormCostMaxUbYearDataField.GenerateId(fieldId):
                        case ObasTableFields.NormCostExceedMaxUbYearDataField.GenerateId(fieldId):
                            _this.SumChangeUbEventHandler(table.Id, oldValue, newValue, fieldId);
                            break;
                        case ObasTableFields.NormCostMinFaYearDataField.GenerateId(fieldId):
                        case ObasTableFields.NormCostMinToMaxFaYearDataField.GenerateId(fieldId):
                        case ObasTableFields.NormCostMaxFaYearDataField.GenerateId(fieldId):
                        case ObasTableFields.NormCostExceedMaxFaYearDataField.GenerateId(fieldId):
                            _this.SumChangeFaEventHandler(table.Id, oldValue, newValue, fieldId);
                            break;
                    }
                }
            });
            _this.tableNorm.FieldValueChanged.Add(function (table, oldValue, newValue, fieldId) {
                _this.Iterate(function () {
                    switch (fieldId) {
                        case ObasTableFields.NormUbYearDataField.GenerateId(fieldId):
                            _this.SumChangeUbEventHandler(table.Id, oldValue, newValue, fieldId);
                            break;
                        case ObasTableFields.NormFaYearDataField.GenerateId(fieldId):
                            _this.SumChangeFaEventHandler(table.Id, oldValue, newValue, fieldId);
                            break;
                    }
                });
            });
            return _this;
        }
        Object.defineProperty(TableCostYear.prototype, "FieldValueChanged", {
            get: function () {
                if (this._fieldValueChanged == null) {
                    this._fieldValueChanged = new ObasTableFieldChangeEvent();
                }
                return this._fieldValueChanged;
            },
            enumerable: true,
            configurable: true
        });
        TableCostYear.prototype.CalcCost = function (fieldNorm, fieldNormMin, fieldNormMaxToMin, fieldNormMax, fieldNormOverMax, g3, g4, g5, g6, g7, g8, g9, g10) {
            this.tableCost.LocateByKeys(this.tableCost.GetKeys(this.OwnerKey.Value).ToArray());
            return g3 * (this.tableNorm.GetValueByKeys(fieldNorm.GenerateId(this.YearIndex), this.tableNorm.GetKeys(StrKeyNorm.AllRF)) || 0) *
                ((this.tableCost.GetFieldValue(fieldNormMin.GenerateId(this.YearIndex)) || 0) * g4 +
                    (this.tableCost.GetFieldValue(fieldNormMaxToMin.GenerateId(this.YearIndex)) || 0) * g5 +
                    (this.tableCost.GetFieldValue(fieldNormMax.GenerateId(this.YearIndex)) || 0) * g6 +
                    (this.tableCost.GetFieldValue(fieldNormOverMax.GenerateId(this.YearIndex)) || 0) * g7) * g8 + g9 + g10;
        };
        TableCostYear.prototype.SumChangeUbEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CostUB.NValue = this.CalcCost(ObasTableFields.NormUbYearDataField, ObasTableFields.NormCostMinUbYearDataField, ObasTableFields.NormCostMinToMaxUbYearDataField, ObasTableFields.NormCostMaxUbYearDataField, ObasTableFields.NormCostExceedMaxUbYearDataField, this.AvgCountRegWorkless.NValue, this.PartCountMinUB.NValue, this.PartCountMinToMaxUB.NValue, this.PartCountMaxUB.NValue, this.PartCountOverMaxUB.NValue, this.AvgPeriodUB.NValue, this.BankServiceUB.NValue, this.PostServiceUB.NValue);
        };
        TableCostYear.prototype.SumChangeFaEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CostFA.NValue = this.CalcCost(ObasTableFields.NormFaYearDataField, ObasTableFields.NormCostMinFaYearDataField, ObasTableFields.NormCostMinToMaxFaYearDataField, ObasTableFields.NormCostMaxFaYearDataField, ObasTableFields.NormCostExceedMaxFaYearDataField, this.AvgCountRegWorkless.NValue, this.PartCountMinFA.NValue, this.PartCountMinToMaxFA.NValue, this.PartCountMaxFA.NValue, this.PartCountOverMaxFA.NValue, this.AvgPeriodFA.NValue, this.BankServiceFA.NValue, this.PostServiceFA.NValue);
        };
        TableCostYear.prototype.SumChangeAvgCountEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SumChangeUbEventHandler(tableId, oldValue, newValue, fieldId);
            this.SumChangeFaEventHandler(tableId, oldValue, newValue, fieldId);
            this.FieldValueChanged.Do(this, oldValue, newValue, fieldId);
        };
        TableCostYear.prototype.SumTotalUbChangedEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.OwnerKey.SourceTable.SetFieldValue(ObasTableFields.UbYearDataField.GenerateId(this.YearIndex), newValue);
        };
        TableCostYear.prototype.SumTotalFaChangedEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.OwnerKey.SourceTable.SetFieldValue(ObasTableFields.FaYearDataField.GenerateId(this.YearIndex), newValue);
        };
        Object.defineProperty(TableCostYear.prototype, "IsCopiedUb", {
            get: function () {
                if (this._isCopiedUb == null) {
                    this._isCopiedUb = new ObasTableField(ObasTableFields.IsCopiedUbDataField.Id, this, true);
                }
                return this._isCopiedUb;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "IsCopiedFa", {
            get: function () {
                if (this._isCopiedFa == null) {
                    this._isCopiedFa = new ObasTableField(ObasTableFields.IsCopiedFaDataField.Id, this, true);
                }
                return this._isCopiedFa;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "YearIndex", {
            get: function () {
                return ObasHelper.GetYearOffset(this) + 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "AvgCountRegWorkless", {
            get: function () {
                if (this._avgCountRegWorkless == null) {
                    this._avgCountRegWorkless = new NumberObasTableField("AvgCountRegWorkless", this);
                }
                return this._avgCountRegWorkless;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PartCountMinUB", {
            get: function () {
                if (this._partCountMinUB == null) {
                    this._partCountMinUB = new NumberObasTableField("PartCountMinUB", this);
                }
                return this._partCountMinUB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PartCountMinToMaxUB", {
            get: function () {
                if (this._partCountMinToMaxUB == null) {
                    this._partCountMinToMaxUB = new NumberObasTableField("PartCountMinToMaxUB", this);
                }
                return this._partCountMinToMaxUB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PartCountMaxUB", {
            get: function () {
                if (this._partCountMaxUB == null) {
                    this._partCountMaxUB = new NumberObasTableField("PartCountMaxUB", this);
                }
                return this._partCountMaxUB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PartCountOverMaxUB", {
            get: function () {
                if (this._partCountOverMaxUB == null) {
                    this._partCountOverMaxUB = new NumberObasTableField("PartCountOverMaxUB", this);
                }
                return this._partCountOverMaxUB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "AvgPeriodUB", {
            get: function () {
                if (this._avgPeriodUB == null) {
                    this._avgPeriodUB = new NumberObasTableField("AvgPeriodUB", this);
                }
                return this._avgPeriodUB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "BankServiceUB", {
            get: function () {
                if (this._bankServiceUB == null) {
                    this._bankServiceUB = new NumberObasTableField("BankServiceUB", this);
                }
                return this._bankServiceUB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PostServiceUB", {
            get: function () {
                if (this._postServiceUB == null) {
                    this._postServiceUB = new NumberObasTableField("PostServiceUB", this);
                }
                return this._postServiceUB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "CostUB", {
            get: function () {
                if (this._costUB == null) {
                    this._costUB = new NumberObasTableField("CostUB", this);
                }
                return this._costUB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PartCountMinFA", {
            get: function () {
                if (this._partCountMinFA == null) {
                    this._partCountMinFA = new NumberObasTableField("PartCountMinFA", this);
                }
                return this._partCountMinFA;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PartCountMinToMaxFA", {
            get: function () {
                if (this._partCountMinToMaxFA == null) {
                    this._partCountMinToMaxFA = new NumberObasTableField("PartCountMinToMaxFA", this);
                }
                return this._partCountMinToMaxFA;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PartCountMaxFA", {
            get: function () {
                if (this._partCountMaxFA == null) {
                    this._partCountMaxFA = new NumberObasTableField("PartCountMaxFA", this);
                }
                return this._partCountMaxFA;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PartCountOverMaxFA", {
            get: function () {
                if (this._partCountOverMaxFA == null) {
                    this._partCountOverMaxFA = new NumberObasTableField("PartCountOverMaxFA", this);
                }
                return this._partCountOverMaxFA;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "AvgPeriodFA", {
            get: function () {
                if (this._avgPeriodFA == null) {
                    this._avgPeriodFA = new NumberObasTableField("AvgPeriodFA", this);
                }
                return this._avgPeriodFA;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "BankServiceFA", {
            get: function () {
                if (this._bankServiceFA == null) {
                    this._bankServiceFA = new NumberObasTableField("BankServiceFA", this);
                }
                return this._bankServiceFA;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "PostServiceFA", {
            get: function () {
                if (this._postServiceFA == null) {
                    this._postServiceFA = new NumberObasTableField("PostServiceFA", this);
                }
                return this._postServiceFA;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "CostFA", {
            get: function () {
                if (this._costFA == null) {
                    this._costFA = new NumberObasTableField("CostFA", this);
                }
                return this._costFA;
            },
            enumerable: true,
            configurable: true
        });
        TableCostYear.prototype.GetKeys = function (ownerKey, year) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new KeyCostYear(ownerKey, year);
            }
            else {
                this._keys.OwnerKey = ownerKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        TableCostYear.prototype.InnerCopyData = function (recordKey, endYear, mode) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                var copyData = null;
                switch (mode) {
                    case CopyMode.Ub:
                        this.IsCopiedUb.Value = true;
                        copyData = this.CopyFieldsInfoUb;
                        break;
                    case CopyMode.Fa:
                        this.IsCopiedFa.Value = true;
                        copyData = this.CopyFieldsInfoFa;
                        break;
                    case CopyMode.All:
                        this.IsCopiedUb.Value = true;
                        this.IsCopiedFa.Value = true;
                        copyData = this.CopyFieldsInfo;
                        break;
                    case CopyMode.Keys:
                        copyData = this.CopyFieldsInfoKeys;
                        break;
                }
                var keys = this.GetKeys();
                var yearVal = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yearVal.Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), false);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        TableCostYear.prototype.CopyData = function (srcYear, destYear) {
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
                        _this.InnerCopyData(recordKey, destYear, CopyMode.All);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        TableCostYear.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate) {
                var IsCopyUb = !this.IsCopiedUb.Value && this.IsReadyForCopyUb();
                var IsCopyFa = !this.IsCopiedFa.Value && this.IsReadyForCopyFa();
                var copyMode = null;
                if (IsCopyUb && IsCopyFa) {
                    copyMode = CopyMode.All;
                }
                else if (IsCopyUb) {
                    copyMode = CopyMode.Ub;
                }
                else if (IsCopyFa) {
                    copyMode = CopyMode.Fa;
                }
                if (copyMode != null) {
                    this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1, copyMode);
                }
            }
        };
        TableCostYear.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.AvgCountRegWorkless.NValue = 0;
                _this.PartCountMinUB.NValue = 0;
                _this.PartCountMinToMaxUB.NValue = 0;
                _this.PartCountMaxUB.NValue = 0;
                _this.PartCountOverMaxUB.NValue = 0;
                _this.AvgPeriodUB.NValue = 0;
                _this.BankServiceUB.NValue = 0;
                _this.PostServiceUB.NValue = 0;
                _this.CostUB.NValue = 0;
                _this.PartCountMinFA.NValue = 0;
                _this.PartCountMinToMaxFA.NValue = 0;
                _this.PartCountMaxFA.NValue = 0;
                _this.PartCountOverMaxFA.NValue = 0;
                _this.AvgPeriodFA.NValue = 0;
                _this.BankServiceFA.NValue = 0;
                _this.PostServiceFA.NValue = 0;
                _this.CostFA.NValue = 0;
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
        TableCostYear.prototype.IsReadyForCopyUb = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfoUb);
        };
        TableCostYear.prototype.IsReadyForCopyFa = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfoFa);
        };
        TableCostYear.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        Object.defineProperty(TableCostYear.prototype, "CopyFieldsUb", {
            get: function () {
                if (this._copyFieldsUb == null) {
                    this._copyFieldsUb = [
                        this.IsCopiedUb,
                        this.OwnerKey,
                        this.Year,
                        this.AvgCountRegWorkless,
                        this.PartCountMinUB,
                        this.PartCountMinToMaxUB,
                        this.PartCountMaxUB,
                        this.PartCountOverMaxUB,
                        this.AvgPeriodUB,
                        this.BankServiceUB,
                        this.PostServiceUB
                    ];
                }
                return this._copyFieldsUb;
            },
            enumerable: true,
            configurable: true
        });
        TableCostYear.prototype.InitCopyFieldsInfoUb = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this.CopyFieldsUb);
        };
        Object.defineProperty(TableCostYear.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "CopyFieldsInfoUb", {
            get: function () {
                if (this._copyDataUb == null) {
                    this._copyDataUb = this.InitCopyFieldsInfoUb();
                }
                return this.CollectTableRecordData(this._copyDataUb);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "CopyFieldsInfoFa", {
            get: function () {
                if (this._copyDataFa == null) {
                    this._copyDataFa = this.InitCopyFieldsInfoFa();
                }
                return this.CollectTableRecordData(this._copyDataFa);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "CopyFieldsFa", {
            get: function () {
                if (this._copyFieldsFa == null) {
                    this._copyFieldsFa = [
                        this.IsCopiedFa,
                        this.OwnerKey,
                        this.Year,
                        this.AvgCountRegWorkless,
                        this.PartCountMinFA,
                        this.PartCountMinToMaxFA,
                        this.PartCountMaxFA,
                        this.PartCountOverMaxFA,
                        this.AvgPeriodFA,
                        this.BankServiceFA,
                        this.PostServiceFA
                    ];
                }
                return this._copyFieldsFa;
            },
            enumerable: true,
            configurable: true
        });
        TableCostYear.prototype.InitCopyFieldsInfoKeys = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this.CopyFieldsKeys);
        };
        Object.defineProperty(TableCostYear.prototype, "CopyFieldsInfoKeys", {
            get: function () {
                if (this._copyDataKeys == null) {
                    this._copyDataKeys = this.InitCopyFieldsInfoKeys();
                }
                return this.CollectTableRecordData(this._copyDataKeys);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCostYear.prototype, "CopyFieldsKeys", {
            get: function () {
                if (this._copyFieldsKeys == null) {
                    this._copyFieldsKeys = [
                        this.OwnerKey,
                        this.Year
                    ];
                }
                return this._copyFieldsKeys;
            },
            enumerable: true,
            configurable: true
        });
        TableCostYear.prototype.InitCopyFieldsInfoFa = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this.CopyFieldsFa);
        };
        TableCostYear.prototype.InitCopyFieldsInfo = function () {
            var result = this.InitCopyFieldsInfoUb();
            var addResult = this.InitCopyFieldsInfoFa();
            if (addResult && addResult.size() > 0) {
                addResult.forEach(function (key, val) {
                    if (!result.containsKey(key)) {
                        result.setValue(key, val);
                    }
                });
            }
            return result;
        };
        return TableCostYear;
    }(ObasTableWithKeysParent));
    F05312.TableCostYear = TableCostYear;
    var TranspondedTableCostYear = (function (_super) {
        __extends(TranspondedTableCostYear, _super);
        function TranspondedTableCostYear(id) {
            return _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id]) || this;
        }
        return TranspondedTableCostYear;
    }(YearTransposedObasTable));
    F05312.TranspondedTableCostYear = TranspondedTableCostYear;
    var TableCostPba = (function (_super) {
        __extends(TableCostPba, _super);
        function TableCostPba(id, document, tableSubject, tableCost, tableCostYear, tableNorm) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id], document, tableSubject) || this;
            _this.tableCost = tableCost;
            _this.tableCostYear = tableCostYear;
            _this.tableNorm = tableNorm;
            _this._copyFields = null;
            _this.tableCost.FieldValueChanged.Add(function (table, oldValue, newValue, fieldId) {
                if ((ObasTableFields.NormCostPbaYearDataField.GenerateId(fieldId) === fieldId)
                    && _this.LocateByKeys(_this.GetKeys(table.GetFieldValue(BaseObasTableFields.OwnerKeyField.Id)).ToArray())) {
                    _this.SumChangeEventHandler(table.Id, oldValue, newValue, fieldId);
                }
            });
            _this.tableCostYear.FieldValueChanged.Add(function (table, oldValue, newValue, fieldId) {
                var yearIndex = table.Year.Value - _this.Document.Settings.StartYear + 1;
                var keys = _this.GetKeys(table.GetFieldValue(BaseObasTableFields.OwnerKeyField.Id)).ToArray();
                if ((_this.tableCostYear.AvgCountRegWorkless.Id === fieldId) && _this.LocateByKeys(keys)) {
                    _this.SumChangeEventHandler(table.Id, oldValue, newValue, BaseObasTableFields.YearDataField.GenerateId(yearIndex));
                }
            });
            _this.tableNorm.FieldValueChanged.Add(function (table, oldValue, newValue, fieldId) {
                if (ObasTableFields.NormPbaYearDataField.GenerateId(fieldId) === fieldId) {
                    _this.Iterate(function () {
                        _this.SumChangeEventHandler(table.Id, oldValue, newValue, fieldId);
                    });
                }
            });
            return _this;
        }
        TableCostPba.prototype.GetValue = function (field, fieldId, newValue) {
            return (field.Id === fieldId ? newValue : this.GetFieldValue(field.GenerateId(fieldId))) || 0;
        };
        TableCostPba.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var year = ObasHelper.GetYearOffsetById(fieldId) + this.Document.Settings.StartYear;
            var isLocate = this.tableCostYear.LocateByKeys(this.tableCostYear.GetKeys(this.OwnerKey.Value, year).ToArray())
                && this.tableCost.LocateByKeys(this.tableCost.GetKeys(this.OwnerKey.Value).ToArray());
            if (isLocate) {
                this.SetFieldValue(ObasTableFields.CostPbaYearDataField.GenerateId(fieldId), (this.tableCostYear.AvgCountRegWorkless.NValue
                    * (this.tableNorm.GetFieldValue(ObasTableFields.NormPbaYearDataField.GenerateId(fieldId)) || 0)
                    * (this.tableCost.GetFieldValue(ObasTableFields.NormCostPbaYearDataField.GenerateId(fieldId)) || 0)
                    * this.GetValue(ObasTableFields.AvgPeriodPbaYearDataField, fieldId, newValue)));
            }
        };
        TableCostPba.prototype.SumTotalPbaChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.OwnerKey.SourceTable.SetFieldValue(ObasTableFields.PbaYearDataField.GenerateId(fieldId), newValue);
        };
        TableCostPba.prototype.GetKeys = function (ownerKey) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new KeyOwner(ownerKey);
            }
            else {
                this._keys.OwnerKey = ownerKey;
            }
            return this._keys;
        };
        TableCostPba.prototype.InnerCopyData = function (recordKey, endYear) {
            ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableCostPba.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.AvgPeriodPbaYearDataField);
        };
        TableCostPba.prototype.ResetData = function (keys) {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.AvgPeriodPbaYearDataField,
                ObasTableFields.CostPbaYearDataField
            ]);
        };
        TableCostPba.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        Object.defineProperty(TableCostPba.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.OwnerKey
                    ];
                    var AvgPeriodPbaYearField_1 = ObasTableFields.AvgPeriodPbaYearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(AvgPeriodPbaYearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableCostPba.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return TableCostPba;
    }(ObasTableWithKeysParent));
    F05312.TableCostPba = TableCostPba;
})(F05312 || (F05312 = {}));
