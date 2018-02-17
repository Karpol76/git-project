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
var InsurancePremTypes;
(function (InsurancePremTypes) {
    InsurancePremTypes[InsurancePremTypes["FomsFss"] = 1] = "FomsFss";
    InsurancePremTypes[InsurancePremTypes["Pfr"] = 2] = "Pfr";
})(InsurancePremTypes || (InsurancePremTypes = {}));
var BaseInsurancePremiumsTable = (function (_super) {
    __extends(BaseInsurancePremiumsTable, _super);
    function BaseInsurancePremiumsTable() {
        var _this = _super.call(this, "BaseInsurancePremiums", [BaseObasTableFields.YearField.Id, "Type"], false) || this;
        _this._maxBasePremValue = null;
        _this._year = null;
        _this._actualDate = null;
        _this._premTypeField = null;
        return _this;
    }
    Object.defineProperty(BaseInsurancePremiumsTable.prototype, "PremTypeField", {
        get: function () {
            if (this._premTypeField == null) {
                this._premTypeField = new NumberObasTableField("Type", this, true);
            }
            return this._premTypeField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsurancePremiumsTable.prototype, "ActualDate", {
        get: function () {
            if (this._actualDate == null) {
                this._actualDate = new ObasTableField("ActualDate", this);
            }
            return this._actualDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsurancePremiumsTable.prototype, "Year", {
        get: function () {
            if (this._year == null) {
                this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
            }
            return this._year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsurancePremiumsTable.prototype, "MaxBasePremValue", {
        get: function () {
            if (this._maxBasePremValue == null) {
                this._maxBasePremValue = new NumberObasTableField("Val", this);
            }
            return this._maxBasePremValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsurancePremiumsTable.prototype, "PremType", {
        get: function () {
            return this.PremTypeField.NValue;
        },
        enumerable: true,
        configurable: true
    });
    return BaseInsurancePremiumsTable;
}(ObasTable));
var StrKeysPInsurance;
(function (StrKeysPInsurance) {
    StrKeysPInsurance[StrKeysPInsurance["PensionTotal"] = 1] = "PensionTotal";
    StrKeysPInsurance[StrKeysPInsurance["Pension22"] = 2] = "Pension22";
    StrKeysPInsurance[StrKeysPInsurance["Pension10"] = 3] = "Pension10";
    StrKeysPInsurance[StrKeysPInsurance["SocialTotal"] = 4] = "SocialTotal";
    StrKeysPInsurance[StrKeysPInsurance["SocialDisability"] = 5] = "SocialDisability";
    StrKeysPInsurance[StrKeysPInsurance["SocialAccidents"] = 6] = "SocialAccidents";
    StrKeysPInsurance[StrKeysPInsurance["Health"] = 7] = "Health";
    StrKeysPInsurance[StrKeysPInsurance["AdjustTotal"] = 9] = "AdjustTotal";
    StrKeysPInsurance[StrKeysPInsurance["AdjustRound"] = 10] = "AdjustRound";
    StrKeysPInsurance[StrKeysPInsurance["AdjustRegress"] = 11] = "AdjustRegress";
    StrKeysPInsurance[StrKeysPInsurance["AdjustSocial"] = 12] = "AdjustSocial";
    StrKeysPInsurance[StrKeysPInsurance["AdjustLowTarif"] = 13] = "AdjustLowTarif";
    StrKeysPInsurance[StrKeysPInsurance["Total"] = 8] = "Total";
})(StrKeysPInsurance || (StrKeysPInsurance = {}));
var BaseInsuranceObasTable = (function (_super) {
    __extends(BaseInsuranceObasTable, _super);
    function BaseInsuranceObasTable(id, document, parent) {
        var _this = _super.call(this, id, document, parent) || this;
        _this._isCalcRowField = null;
        _this._rate = null;
        _this._copyFields = null;
        _this._strTypeField = null;
        return _this;
    }
    Object.defineProperty(BaseInsuranceObasTable, "BaseInsurancePremiumsTable", {
        get: function () {
            if (this._baseInsurancePremiumsTable == null) {
                this._baseInsurancePremiumsTable = new BaseInsurancePremiumsTable();
            }
            return this._baseInsurancePremiumsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsuranceObasTable.prototype, "StrTypeField", {
        get: function () {
            if (this._strTypeField == null) {
                this._strTypeField = new NumberObasTableField("StrType", this);
            }
            return this._strTypeField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsuranceObasTable.prototype, "PremType", {
        get: function () {
            return this.StrTypeField.NValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsuranceObasTable.prototype, "CopyFields", {
        get: function () {
            var _this = this;
            if (this._copyFields == null) {
                this._copyFields = [this.StrKeyField];
                this.Document.IterateByYears(function (i) {
                    _this._copyFields.push(BaseObasTableFields.YearDataField.GenerateTableField(_this, i));
                });
            }
            return this._copyFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsuranceObasTable.prototype, "Rate", {
        get: function () {
            if (this._rate == null) {
                this._rate = new NumberObasTableField("Rate", this);
            }
            return this._rate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsuranceObasTable.prototype, "IsCalcRowField", {
        get: function () {
            if (this._isCalcRowField == null) {
                this._isCalcRowField = new ObasTableField(BaseObasTableFields.CalcRowFlagField.Id, this);
            }
            return this._isCalcRowField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsuranceObasTable.prototype, "IsCalcRow", {
        get: function () {
            return this.IsCalcRowField.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsuranceObasTable.prototype, "IsAdjustDataRow", {
        get: function () {
            return BaseInsuranceObasTable.CheckIsAdjustDataRow(this.StrKey);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInsuranceObasTable.prototype, "IsTaxDataRow", {
        get: function () {
            return BaseInsuranceObasTable.CheckIsTaxDataRow(this.StrKey);
        },
        enumerable: true,
        configurable: true
    });
    BaseInsuranceObasTable.CheckIsAdjustDataRow = function (strKey) {
        switch (strKey) {
            case StrKeysPInsurance.AdjustSocial:
            case StrKeysPInsurance.AdjustLowTarif:
            case StrKeysPInsurance.AdjustRegress:
            case StrKeysPInsurance.AdjustRound:
                return true;
        }
        return false;
    };
    BaseInsuranceObasTable.CheckIsTaxDataRow = function (strKey) {
        switch (strKey) {
            case StrKeysPInsurance.Pension22:
            case StrKeysPInsurance.Pension10:
            case StrKeysPInsurance.SocialAccidents:
            case StrKeysPInsurance.SocialDisability:
            case StrKeysPInsurance.Health:
                return true;
        }
        return false;
    };
    BaseInsuranceObasTable.prototype.IterateByDataStr = function (handler) {
        for (var strKey = StrKeysPInsurance.Pension22; strKey < StrKeysPInsurance.Total; strKey++) {
            if (strKey !== StrKeysPInsurance.SocialTotal) {
                handler(strKey);
            }
        }
    };
    BaseInsuranceObasTable.prototype.CopyData = function (srcYear, destYear) {
        var _this = this;
        this.Document.CommonRules.CopyTableData(this, srcYear, destYear, function () {
            return _this.IsAdjustDataRow;
        }, BaseObasTableFields.YearDataField);
    };
    BaseInsuranceObasTable.prototype.ResetData = function () {
        var _this = this;
        this.Iterate(function (table, recordKey) {
            _this.ResetRecordData(table, recordKey);
        });
    };
    BaseInsuranceObasTable.prototype.CollectUserData = function () {
        var _this = this;
        return this.CollectTableData(this.InitCopyFieldsInfo(), function () {
            return _this.IsAdjustDataRow;
        });
    };
    BaseInsuranceObasTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        if (!this.IsCalcRow) {
            this.InnerSumChangeEventHandler(tableId, oldValue, newValue, fieldId);
        }
    };
    BaseInsuranceObasTable.prototype.TaxBaseChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), BaseInsuranceObasTable.CalcContribution(newValue, this.Rate.NValue));
    };
    BaseInsuranceObasTable.CalcContribution = function (value, percent) {
        return ObasHelper.ModRound(value * (percent || 0) / 100, 1);
    };
    BaseInsuranceObasTable.prototype.InitCopyFieldsInfo = function () {
        return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
    };
    return BaseInsuranceObasTable;
}(ObasTableWithStrKeysParent));
BaseInsuranceObasTable._baseInsurancePremiumsTable = null;
var InsuranceObasTable = (function (_super) {
    __extends(InsuranceObasTable, _super);
    function InsuranceObasTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsuranceObasTable.prototype.SetValueForStrs = function (fieldId, oldValue, newValue) {
        var _this = this;
        this.IterateByDataStr(function (strKey) {
            _this.SetSumByKeys(fieldId, _this.GetKeys(strKey), oldValue, newValue);
        });
    };
    InsuranceObasTable.prototype.SetFotValue = function (yearOffset, oldValue, newValue) {
        this.SetValueForStrs(BaseObasTableFields.FotYearDataField.GenerateId(yearOffset + 1), oldValue, newValue);
    };
    InsuranceObasTable.prototype.SetCountValue = function (yearOffset, oldValue, newValue) {
        this.SetValueForStrs(BaseObasTableFields.CountYearDataField.GenerateId(yearOffset + 1), oldValue, newValue);
    };
    InsuranceObasTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
        if (this.IsAdjustDataRow) {
            this.ResetRecordData(this, this.RecordKey.Value);
        }
    };
    InsuranceObasTable.prototype.ResetRecordData = function (table, recordKey) {
        this.Document.IterateByYears(function (i) {
            table.SetFieldValue(BaseObasTableFields.FotYearDataField.GenerateId(i), 0);
            table.SetFieldValue(BaseObasTableFields.CountYearDataField.GenerateId(i), 0);
            table.SetFieldValue(BaseObasTableFields.TaxYearDataField.GenerateId(i), 0);
            table.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(i), 0);
        });
    };
    InsuranceObasTable.prototype.TaxPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
        var strKey = this.StrKey;
        var sumVal = this.GetFieldValue(BaseObasTableFields.FotYearDataField.GenerateId(1 + yearOffset)) || 0;
        var countVal = this.GetFieldValue(BaseObasTableFields.CountYearDataField.GenerateId(1 + yearOffset)) || 0;
        var fotVal = countVal === 0 ? 0 : sumVal / countVal;
        var destFieldId = BaseObasTableFields.TaxYearDataField.GenerateId(1 + yearOffset);
        if (strKey === StrKeysPInsurance.SocialAccidents ||
            strKey === StrKeysPInsurance.Health) {
            this.SetFieldValue(destFieldId, sumVal);
        }
        else {
            var year = ObasStageSettings.CurrentYear + yearOffset;
            var baseMax = BaseInsuranceObasTable.BaseInsurancePremiumsTable.MaxBasePremValue
                .LookupByKeys([year, this.PremType]);
            if (fotVal <= baseMax) {
                if (strKey === StrKeysPInsurance.Pension10) {
                    this.SetFieldValue(destFieldId, 0);
                }
                else {
                    this.SetFieldValue(destFieldId, sumVal);
                }
            }
            else {
                switch (strKey) {
                    case StrKeysPInsurance.Pension22:
                    case StrKeysPInsurance.SocialDisability:
                        this.SetFieldValue(destFieldId, countVal * baseMax);
                        break;
                    case StrKeysPInsurance.Pension10:
                        this.SetFieldValue(destFieldId, sumVal - countVal * baseMax);
                        break;
                }
            }
        }
    };
    return InsuranceObasTable;
}(BaseInsuranceObasTable));
var OnlyInsuranceObasTable = (function (_super) {
    __extends(OnlyInsuranceObasTable, _super);
    function OnlyInsuranceObasTable(id, document, p1TotalTable, _p1InsurStr) {
        var _this = _super.call(this, id, document, p1TotalTable) || this;
        _this._p1InsurStr = _p1InsurStr;
        return _this;
    }
    OnlyInsuranceObasTable.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var destTable = this.ParentTable;
        destTable.SetSumByKeys(BaseObasTableFields.InsuranceYearDataField.GenerateId(fieldId), destTable.GetKeys(this._p1InsurStr), oldValue, newValue);
    };
    OnlyInsuranceObasTable.prototype.CopyData = function (srcYear, destYear) {
        var _this = this;
        var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : this.YearsCount - 1;
        var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : this.YearsCount;
        var yearField = BaseObasTableFields.YearDataField;
        var srcFieldId = yearField.GenerateId(srcIndex);
        var destFieldId = yearField.GenerateId(destIndex);
        var taxYearField = BaseObasTableFields.TaxYearDataField;
        var taxSrcFieldId = taxYearField.GenerateId(srcIndex);
        var taxDestFieldId = taxYearField.GenerateId(destIndex);
        var copy = function () {
            if (_this.IsTaxDataRow) {
                _this.SetFieldValue(taxDestFieldId, _this.GetFieldValue(taxSrcFieldId));
            }
            else if (_this.IsAdjustDataRow) {
                _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
            }
        };
        this.Iterate(copy);
    };
    OnlyInsuranceObasTable.prototype.ResetRecordData = function (table, recordKey) {
        this.Document.IterateByYears(function (i) {
            table.SetFieldValue(BaseObasTableFields.TaxYearDataField.GenerateId(i), 0);
            table.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(i), 0);
        });
    };
    OnlyInsuranceObasTable.prototype.InitCopyFieldsInfo = function () {
        var result = _super.prototype.InitCopyFieldsInfo.call(this);
        var taxField = BaseObasTableFields.TaxYearDataField;
        this.Document.IterateByYears(function (i) {
            var fieldId = taxField.GenerateId(i);
            result.setValue(fieldId, {
                Id: fieldId,
                IsData: true
            });
        });
        return result;
    };
    OnlyInsuranceObasTable.prototype.CollectUserData = function () {
        var _this = this;
        var result = this.CollectTableData(this.InitCopyFieldsInfo(), function () {
            return _this.IsAdjustDataRow || _this.IsTaxDataRow;
        });
        var strKeyId = this.StrKeyField.Id;
        var yearField = BaseObasTableFields.YearDataField;
        var taxField = BaseObasTableFields.TaxYearDataField;
        var removeData = function (data, field) {
            _this.Document.IterateByYears(function (i) {
                data.remove(field.GenerateId(i));
            });
        };
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var record = result_1[_i];
            var data = record.Data;
            var strKey = data.getValue(strKeyId).Value;
            if (OnlyInsuranceObasTable.CheckIsTaxDataRow(strKey)) {
                removeData(data, yearField);
            }
            else if (OnlyInsuranceObasTable.CheckIsAdjustDataRow(strKey)) {
                removeData(data, taxField);
            }
        }
        return result;
    };
    return OnlyInsuranceObasTable;
}(BaseInsuranceObasTable));
var OrgInsuranceObasTableHelper = (function (_super) {
    __extends(OrgInsuranceObasTableHelper, _super);
    function OrgInsuranceObasTableHelper(id, document, parentTable, _sumChangeEventHandler) {
        var _this = _super.call(this, id, document, parentTable) || this;
        _this._sumChangeEventHandler = _sumChangeEventHandler;
        return _this;
    }
    OrgInsuranceObasTableHelper.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this._sumChangeEventHandler(tableId, oldValue, newValue, fieldId);
    };
    return OrgInsuranceObasTableHelper;
}(InsuranceObasTable));
var OrgInsuranceObasTable = (function (_super) {
    __extends(OrgInsuranceObasTable, _super);
    function OrgInsuranceObasTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._innerHelper = null;
        return _this;
    }
    Object.defineProperty(OrgInsuranceObasTable.prototype, "InnerHelper", {
        get: function () {
            var _this = this;
            if (this._innerHelper == null) {
                this._innerHelper = new OrgInsuranceObasTableHelper(this.Id, this.Document, this.ParentTable, function (tableId, oldValue, newValue, fieldId) {
                    _this.UpdateParentSum(tableId, oldValue, newValue, fieldId);
                });
            }
            return this._innerHelper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrgInsuranceObasTable.prototype, "IsAdjustDataRow", {
        get: function () {
            return this.InnerHelper.IsAdjustDataRow;
        },
        enumerable: true,
        configurable: true
    });
    OrgInsuranceObasTable.prototype.SetValueForOrg = function (uniqOrgKey, fieldId, oldValue, newValue) {
        var _this = this;
        this.InnerHelper.IterateByDataStr(function (strKey) {
            _this.SetSumByKeys(fieldId, _this.GetKeys(uniqOrgKey, strKey), oldValue || 0, newValue);
        });
    };
    OrgInsuranceObasTable.prototype.SetFotValue = function (uniqOrgKey, yearOffset, oldValue, newValue) {
        this.SetValueForOrg(uniqOrgKey, BaseObasTableFields.FotYearDataField.GenerateId(yearOffset + 1), oldValue, newValue);
    };
    OrgInsuranceObasTable.prototype.SetCountValue = function (uniqOrgKey, yearOffset, oldValue, newValue) {
        this.SetValueForOrg(uniqOrgKey, BaseObasTableFields.CountYearDataField.GenerateId(yearOffset + 1), oldValue, newValue);
    };
    OrgInsuranceObasTable.prototype.InitCopyFieldsInfo = function () {
        var result = this.InnerHelper.InitCopyFieldsInfo();
        result.setValue(this.OrgKeyField.Id, {
            Id: this.OrgKeyField.Id,
            IsData: false
        });
        return result;
    };
    OrgInsuranceObasTable.prototype.CollectUserData = function () {
        return this.InnerHelper.CollectUserData();
    };
    OrgInsuranceObasTable.prototype.ResetData = function () {
        this.InnerHelper.ResetData();
    };
    OrgInsuranceObasTable.prototype.CopyData = function (srcYear, destYear) {
        this.InnerHelper.CopyData(srcYear, destYear);
    };
    OrgInsuranceObasTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.InnerHelper.SumChangeEventHandler(tableId, oldValue, newValue, fieldId);
    };
    OrgInsuranceObasTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
        this.InnerHelper.AfterDeleteChildsEventHandler(tableId);
    };
    OrgInsuranceObasTable.prototype.TaxBaseChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.InnerHelper.TaxBaseChangeEventHandler(tableId, oldValue, newValue, fieldId);
    };
    OrgInsuranceObasTable.prototype.TaxPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.InnerHelper.TaxPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
    };
    return OrgInsuranceObasTable;
}(ObasTableWithOrgStrKeysParent));
var OrgInsuranceObasTaxEditedTable = (function (_super) {
    __extends(OrgInsuranceObasTaxEditedTable, _super);
    function OrgInsuranceObasTaxEditedTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrgInsuranceObasTaxEditedTable.prototype.InitCopyFieldsInfo = function () {
        var result = _super.prototype.InitCopyFieldsInfo.call(this);
        var taxField = BaseObasTableFields.TaxYearDataField;
        this.Document.IterateByYears(function (i) {
            var fieldId = taxField.GenerateId(i);
            result.setValue(fieldId, {
                Id: fieldId,
                IsData: true
            });
        });
        return result;
    };
    OrgInsuranceObasTaxEditedTable.prototype.CollectUserData = function () {
        var _this = this;
        var result = this.CollectTableData(this.InitCopyFieldsInfo(), function () {
            return _this.IsAdjustDataRow || _this.InnerHelper.IsTaxDataRow;
        });
        var strKeyId = this.StrKeyField.Id;
        var yearField = BaseObasTableFields.YearDataField;
        var taxField = BaseObasTableFields.TaxYearDataField;
        var removeData = function (data, field) {
            _this.Document.IterateByYears(function (i) {
                data.remove(field.GenerateId(i));
            });
        };
        for (var _i = 0, result_2 = result; _i < result_2.length; _i++) {
            var record = result_2[_i];
            var data = record.Data;
            var strKey = data.getValue(strKeyId).Value;
            if (OnlyInsuranceObasTable.CheckIsTaxDataRow(strKey)) {
                removeData(data, yearField);
            }
            else if (OnlyInsuranceObasTable.CheckIsAdjustDataRow(strKey)) {
                removeData(data, taxField);
            }
        }
        return result;
    };
    OrgInsuranceObasTaxEditedTable.prototype.ResetRecordData = function (table, recordKey) {
        this.Document.IterateByYears(function (i) {
            table.SetFieldValue(BaseObasTableFields.TaxYearDataField.GenerateId(i), 0);
            table.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(i), 0);
        });
    };
    OrgInsuranceObasTaxEditedTable.prototype.ResetData = function () {
        var _this = this;
        this.Iterate(function (table, recordKey) {
            _this.ResetRecordData(table, recordKey);
        });
    };
    OrgInsuranceObasTaxEditedTable.prototype.CopyData = function (srcYear, destYear) {
        var _this = this;
        var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : this.YearsCount - 1;
        var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : this.YearsCount;
        var yearField = BaseObasTableFields.YearDataField;
        var srcFieldId = yearField.GenerateId(srcIndex);
        var destFieldId = yearField.GenerateId(destIndex);
        var taxYearField = BaseObasTableFields.TaxYearDataField;
        var taxSrcFieldId = taxYearField.GenerateId(srcIndex);
        var taxDestFieldId = taxYearField.GenerateId(destIndex);
        var copy = function () {
            if (_this.InnerHelper.IsTaxDataRow) {
                _this.SetFieldValue(taxDestFieldId, _this.GetFieldValue(taxSrcFieldId));
            }
            else if (_this.IsAdjustDataRow) {
                _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
            }
        };
        this.Iterate(copy);
    };
    return OrgInsuranceObasTaxEditedTable;
}(OrgInsuranceObasTable));
