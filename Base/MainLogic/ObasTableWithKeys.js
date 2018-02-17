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
var StrObasTableKeys = (function (_super) {
    __extends(StrObasTableKeys, _super);
    function StrObasTableKeys(StrKey) {
        var _this = _super.call(this) || this;
        _this.StrKey = StrKey;
        return _this;
    }
    return StrObasTableKeys;
}(ObasTableKeys));
var OrgStrObasTableKeys = (function (_super) {
    __extends(OrgStrObasTableKeys, _super);
    function OrgStrObasTableKeys(OrgKey, strKey) {
        var _this = _super.call(this, strKey) || this;
        _this.OrgKey = OrgKey;
        return _this;
    }
    return OrgStrObasTableKeys;
}(StrObasTableKeys));
var P1TotalObasTableKeys = (function (_super) {
    __extends(P1TotalObasTableKeys, _super);
    function P1TotalObasTableKeys(StrKey, IsTotal) {
        var _this = _super.call(this) || this;
        _this.StrKey = StrKey;
        _this.IsTotal = IsTotal;
        return _this;
    }
    P1TotalObasTableKeys.prototype.ToArray = function () {
        return [this.StrKey, this.IsTotal ? 1 : 0];
    };
    return P1TotalObasTableKeys;
}(ObasTableKeys));
var P1ObasTableKeys = (function (_super) {
    __extends(P1ObasTableKeys, _super);
    function P1ObasTableKeys(OwnerKey, strKey) {
        var _this = _super.call(this, strKey) || this;
        _this.OwnerKey = OwnerKey;
        return _this;
    }
    return P1ObasTableKeys;
}(StrObasTableKeys));
var SimpleObasTableKeys = (function (_super) {
    __extends(SimpleObasTableKeys, _super);
    function SimpleObasTableKeys(RecKey) {
        var _this = _super.call(this) || this;
        _this.RecKey = RecKey;
        return _this;
    }
    return SimpleObasTableKeys;
}(ObasTableKeys));
var OrgObasTableKeys = (function (_super) {
    __extends(OrgObasTableKeys, _super);
    function OrgObasTableKeys(OrgKey) {
        var _this = _super.call(this) || this;
        _this.OrgKey = OrgKey;
        return _this;
    }
    return OrgObasTableKeys;
}(ObasTableKeys));
var YearObasTableKeys = (function (_super) {
    __extends(YearObasTableKeys, _super);
    function YearObasTableKeys(Year) {
        var _this = _super.call(this) || this;
        _this.Year = Year;
        return _this;
    }
    return YearObasTableKeys;
}(ObasTableKeys));
var OrgCountryObasTableKeys = (function (_super) {
    __extends(OrgCountryObasTableKeys, _super);
    function OrgCountryObasTableKeys(orgKey, CountryKey) {
        var _this = _super.call(this, orgKey) || this;
        _this.CountryKey = CountryKey;
        return _this;
    }
    return OrgCountryObasTableKeys;
}(OrgObasTableKeys));
var OrgCountryYearObasTableKeys = (function (_super) {
    __extends(OrgCountryYearObasTableKeys, _super);
    function OrgCountryYearObasTableKeys(orgKey, countryKey, Year) {
        var _this = _super.call(this, orgKey, countryKey) || this;
        _this.Year = Year;
        return _this;
    }
    return OrgCountryYearObasTableKeys;
}(OrgCountryObasTableKeys));
var OrgCountryYearPostObasTableKeys = (function (_super) {
    __extends(OrgCountryYearPostObasTableKeys, _super);
    function OrgCountryYearPostObasTableKeys(orgKey, countryKey, year, PositionKey) {
        var _this = _super.call(this, orgKey, countryKey, year) || this;
        _this.PositionKey = PositionKey;
        return _this;
    }
    return OrgCountryYearPostObasTableKeys;
}(OrgCountryYearObasTableKeys));
var YearPostObasTableKeys = (function (_super) {
    __extends(YearPostObasTableKeys, _super);
    function YearPostObasTableKeys(year, PositionKey) {
        var _this = _super.call(this, year) || this;
        _this.PositionKey = PositionKey;
        return _this;
    }
    return YearPostObasTableKeys;
}(YearObasTableKeys));
var OrgAuthTypeObasTableKeys = (function (_super) {
    __extends(OrgAuthTypeObasTableKeys, _super);
    function OrgAuthTypeObasTableKeys(orgKey, AuthTypeKey) {
        var _this = _super.call(this, orgKey) || this;
        _this.AuthTypeKey = AuthTypeKey;
        return _this;
    }
    return OrgAuthTypeObasTableKeys;
}(OrgObasTableKeys));
var OrgYearObasTableKeys = (function (_super) {
    __extends(OrgYearObasTableKeys, _super);
    function OrgYearObasTableKeys(orgKey, Year) {
        var _this = _super.call(this, orgKey) || this;
        _this.Year = Year;
        return _this;
    }
    return OrgYearObasTableKeys;
}(OrgObasTableKeys));
var OrgAuthTypeYearObasTableKeys = (function (_super) {
    __extends(OrgAuthTypeYearObasTableKeys, _super);
    function OrgAuthTypeYearObasTableKeys(orgKey, authTypeKey, Year) {
        var _this = _super.call(this, orgKey, authTypeKey) || this;
        _this.Year = Year;
        return _this;
    }
    return OrgAuthTypeYearObasTableKeys;
}(OrgAuthTypeObasTableKeys));
var ObasTableWithKeys = (function (_super) {
    __extends(ObasTableWithKeys, _super);
    function ObasTableWithKeys(id, keyFields, _document) {
        var _this = _super.call(this, id, keyFields) || this;
        _this._document = _document;
        return _this;
    }
    Object.defineProperty(ObasTableWithKeys.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithKeys.prototype, "YearsCount", {
        get: function () {
            return this.Document.Settings.YearsCount;
        },
        enumerable: true,
        configurable: true
    });
    ObasTableWithKeys.prototype.GetValueByKeys = function (fieldId, keys) {
        return this.Document.CommonRules.GetValueByKeys(this, this.KeyFieldIds, keys.ToArray(), fieldId, false);
    };
    ObasTableWithKeys.prototype.SetValueByKeys = function (fieldId, keys, value) {
        this.Document.CommonRules.SetValueByKeys(this, this.KeyFieldIds, keys.ToArray(), fieldId, value);
    };
    ObasTableWithKeys.prototype.SetSumByKeys = function (fieldId, keys, oldValue, newValue) {
        this.Document.CommonRules.SetSumByKeys(this, this.KeyFieldIds, keys.ToArray(), fieldId, oldValue || 0, newValue || 0);
    };
    return ObasTableWithKeys;
}(BaseObasTableWithKeys));
var ObasTableWithKeysParent = (function (_super) {
    __extends(ObasTableWithKeysParent, _super);
    function ObasTableWithKeysParent(id, keyFields, document, _parentTable, _ownerKeyFieldId) {
        if (_ownerKeyFieldId === void 0) { _ownerKeyFieldId = BaseObasTableFields.OwnerKeyField.Id; }
        var _this = _super.call(this, id, keyFields, document) || this;
        _this._parentTable = _parentTable;
        _this._ownerKeyFieldId = _ownerKeyFieldId;
        _this._ownerKey = null;
        return _this;
    }
    Object.defineProperty(ObasTableWithKeysParent.prototype, "OwnerKey", {
        get: function () {
            if (this._ownerKey == null) {
                this
                    ._ownerKey = new ObasForeignKeyTableFieldTyped(this._parentTable, this, this._ownerKeyFieldId, false);
            }
            return this._ownerKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithKeysParent.prototype, "ParentTable", {
        get: function () {
            return this._parentTable;
        },
        enumerable: true,
        configurable: true
    });
    return ObasTableWithKeysParent;
}(ObasTableWithKeys));
var ObasTableWithSimpleKeys = (function (_super) {
    __extends(ObasTableWithSimpleKeys, _super);
    function ObasTableWithSimpleKeys(id, document) {
        return _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], document) || this;
    }
    ObasTableWithSimpleKeys.prototype.GetKeys = function (recKey) {
        if (recKey === void 0) { recKey = this.RecordKey.Value; }
        if (this._keys == null) {
            this._keys = new SimpleObasTableKeys(recKey);
        }
        else {
            this._keys.RecKey = recKey;
        }
        return this._keys;
    };
    return ObasTableWithSimpleKeys;
}(ObasTableWithKeys));
var ObasTableWithSimpleKeysParent = (function (_super) {
    __extends(ObasTableWithSimpleKeysParent, _super);
    function ObasTableWithSimpleKeysParent(id, document, parentTable) {
        return _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], document, parentTable) || this;
    }
    ObasTableWithSimpleKeysParent.prototype.GetKeys = function (recKey) {
        if (recKey === void 0) { recKey = this.RecordKey.Value; }
        if (this._keys == null) {
            this._keys = new SimpleObasTableKeys(recKey);
        }
        else {
            this._keys.RecKey = recKey;
        }
        return this._keys;
    };
    return ObasTableWithSimpleKeysParent;
}(ObasTableWithKeysParent));
var ObasTableWithStr = (function (_super) {
    __extends(ObasTableWithStr, _super);
    function ObasTableWithStr(id, document, keyFields) {
        if (keyFields === void 0) { keyFields = [BaseObasTableFields.StrKeyField.Id]; }
        return _super.call(this, id, keyFields, document) || this;
    }
    Object.defineProperty(ObasTableWithStr.prototype, "StrKeyField", {
        get: function () {
            if (this._strKeyField == null) {
                this._strKeyField = new ObasTableField(BaseObasTableFields.StrKeyField.Id, this, true);
            }
            return this._strKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithStr.prototype, "StrKey", {
        get: function () {
            return this.StrKeyField.Value;
        },
        enumerable: true,
        configurable: true
    });
    ObasTableWithStr.prototype.GetKeys = function (strKey) {
        if (strKey === void 0) { strKey = this.StrKey; }
        if (this._keys == null) {
            this._keys = new StrObasTableKeys(strKey);
        }
        else {
            this._keys.StrKey = strKey;
        }
        return this._keys;
    };
    return ObasTableWithStr;
}(ObasTableWithKeys));
var ObasTableWithStrParent = (function (_super) {
    __extends(ObasTableWithStrParent, _super);
    function ObasTableWithStrParent(id, document, parentTable, keyFields, ownerKeyFieldId) {
        if (keyFields === void 0) { keyFields = [BaseObasTableFields.StrKeyField.Id]; }
        if (ownerKeyFieldId === void 0) { ownerKeyFieldId = BaseObasTableFields.OwnerKeyField.Id; }
        return _super.call(this, id, keyFields, document, parentTable, ownerKeyFieldId) || this;
    }
    Object.defineProperty(ObasTableWithStrParent.prototype, "StrKeyField", {
        get: function () {
            if (this._strKeyField == null) {
                this._strKeyField = new ObasTableField(BaseObasTableFields.StrKeyField.Id, this, true);
            }
            return this._strKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithStrParent.prototype, "StrKey", {
        get: function () {
            return this.StrKeyField.Value;
        },
        enumerable: true,
        configurable: true
    });
    return ObasTableWithStrParent;
}(ObasTableWithKeysParent));
var ObasTableWithStrKeysParent = (function (_super) {
    __extends(ObasTableWithStrKeysParent, _super);
    function ObasTableWithStrKeysParent(id, document, parentTable, keyFields) {
        return _super.call(this, id, document, parentTable, keyFields) || this;
    }
    ObasTableWithStrKeysParent.prototype.GetKeys = function (strKey) {
        if (strKey === void 0) { strKey = this.StrKey; }
        if (this._keys == null) {
            this._keys = new StrObasTableKeys(strKey);
        }
        else {
            this._keys.StrKey = strKey;
        }
        return this._keys;
    };
    return ObasTableWithStrKeysParent;
}(ObasTableWithStrParent));
var ObasTableWithOrgStrKeysParent = (function (_super) {
    __extends(ObasTableWithOrgStrKeysParent, _super);
    function ObasTableWithOrgStrKeysParent(id, document, parentTable, _orgTable, keyFields) {
        if (keyFields === void 0) { keyFields = [BaseObasTableFields.StrKeyField.Id, BaseObasTableFields.OrgKeyField.Id]; }
        var _this = _super.call(this, id, document, parentTable, keyFields) || this;
        _this._orgTable = _orgTable;
        return _this;
    }
    Object.defineProperty(ObasTableWithOrgStrKeysParent.prototype, "OrgTable", {
        get: function () {
            return this._orgTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithOrgStrKeysParent.prototype, "OrgKeyField", {
        get: function () {
            if (this._orgKeyField == null) {
                this._orgKeyField = new ObasTableField(BaseObasTableFields.OrgKeyField.Id, this, true);
            }
            return this._orgKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithOrgStrKeysParent.prototype, "OrgKey", {
        get: function () {
            return this.OrgKeyField.Value;
        },
        enumerable: true,
        configurable: true
    });
    ObasTableWithOrgStrKeysParent.prototype.GetKeys = function (orgKey, strKey) {
        if (orgKey === void 0) { orgKey = this.OrgKey; }
        if (strKey === void 0) { strKey = this.StrKey; }
        if (this._keys == null) {
            this._keys = new OrgStrObasTableKeys(orgKey, strKey);
        }
        else {
            this._keys.OrgKey = orgKey;
            this._keys.StrKey = strKey;
        }
        return this._keys;
    };
    return ObasTableWithOrgStrKeysParent;
}(ObasTableWithStrParent));
var P1TotalObasTableWithStrParent = (function (_super) {
    __extends(P1TotalObasTableWithStrParent, _super);
    function P1TotalObasTableWithStrParent(id, document, parent) {
        var _this = _super.call(this, id, document, parent, [BaseObasTableFields.StrKeyField.Id, BaseObasTableFields.TotalRowFlagField.Id], BaseObasTableFields.StrKeyField.Id) || this;
        _this._isTotalKeyField = new ObasTableField(BaseObasTableFields.TotalRowFlagField.Id, _this, true);
        return _this;
    }
    Object.defineProperty(P1TotalObasTableWithStrParent.prototype, "IsTotalKeyField", {
        get: function () {
            return this._isTotalKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(P1TotalObasTableWithStrParent.prototype, "IsTotalKey", {
        get: function () {
            return this._isTotalKeyField.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(P1TotalObasTableWithStrParent.prototype, "IsTotal", {
        get: function () {
            return this.IsTotalKey === 1;
        },
        enumerable: true,
        configurable: true
    });
    P1TotalObasTableWithStrParent.prototype.SetSumByKeys = function (param, keys, oldValue, newValue) {
        var fieldId;
        if (typeof param === "string") {
            fieldId = param;
        }
        else if (typeof param === "number") {
            fieldId = BaseObasTableFields.YearDataField.GenerateId(param - ObasStageSettings.CurrentYear + 1);
        }
        else {
            throw new TypeError("param has wrong type. Available number or string.");
        }
        _super.prototype.SetSumByKeys.call(this, fieldId, keys, oldValue, newValue);
    };
    P1TotalObasTableWithStrParent.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        if (!this.IsTotal) {
            this.SetSumByKeys(fieldId, this.GetKeys(this.GetTotalKey()), oldValue, newValue);
        }
        if (((oldValue || 0) !== (newValue || 0)) && this.IsTotal) {
            this.Document.CommonRules.TotalSumTableEditNotify(this, fieldId, true);
        }
    };
    P1TotalObasTableWithStrParent.prototype.GetKeys = function (strKey) {
        if (strKey === void 0) { strKey = this.StrKey; }
        var isTotal = strKey === this.GetTotalKey();
        if (this._keys == null) {
            this._keys = new P1TotalObasTableKeys(strKey, isTotal);
        }
        else {
            this._keys.IsTotal = isTotal;
            this._keys.StrKey = strKey;
        }
        return this._keys;
    };
    P1TotalObasTableWithStrParent.prototype.ResetData = function (keys) {
        this.Document.CommonRules.ResetTableDataWithKeys(this, keys, BaseObasTableFields.YearDataField);
    };
    P1TotalObasTableWithStrParent.prototype.GetDataByVersion = function (rroObasVersion, yearIndex) {
        return this.GetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearIndex));
    };
    P1TotalObasTableWithStrParent.prototype.LocateTotalRow = function () {
        return this.IsTotalKeyField.Locate(1);
    };
    P1TotalObasTableWithStrParent.prototype.IterateByNotTotalRow = function (handler) {
        while (this.IsTotalKeyField.Locate(0, true)) {
            handler(this.StrKey);
        }
        this.ClearLocateFlag();
    };
    return P1TotalObasTableWithStrParent;
}(ObasTableWithStrParent));
var P1TotalObasTable = (function (_super) {
    __extends(P1TotalObasTable, _super);
    function P1TotalObasTable(id, document, parentTableId) {
        return _super.call(this, id, document, parentTableId ? new BarsRowsSprTable(parentTableId) : null) || this;
    }
    return P1TotalObasTable;
}(P1TotalObasTableWithStrParent));
var ObasTableP1 = (function (_super) {
    __extends(ObasTableP1, _super);
    function ObasTableP1(id, parent) {
        return _super.call(this, id, parent.Document, parent, [BaseObasTableFields.StrKeyField.Id, BaseObasTableFields.OwnerKeyField.Id]) || this;
    }
    ObasTableP1.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this.StrKey), oldValue, newValue);
    };
    ObasTableP1.prototype.GetKeys = function (strKey, ownerKey) {
        if (strKey === void 0) { strKey = this.StrKey; }
        if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
        if (this._keys == null) {
            this._keys = new P1ObasTableKeys(ownerKey, strKey);
        }
        else {
            this._keys.StrKey = strKey;
            this._keys.OwnerKey = ownerKey;
        }
        return this._keys;
    };
    ObasTableP1.prototype.ResetData = function (keys) {
        this.Document.CommonRules.ResetTableDataWithKeys(this, keys, BaseObasTableFields.YearDataField);
    };
    return ObasTableP1;
}(ObasTableWithStrParent));
var YearPartUniqueTypedOrgsObasTable = (function (_super) {
    __extends(YearPartUniqueTypedOrgsObasTable, _super);
    function YearPartUniqueTypedOrgsObasTable(id, document, parentTable, keyFields) {
        if (keyFields === void 0) { keyFields = parentTable.KeyFieldIds.concat(BaseObasTableFields.YearField.Id); }
        var _this = _super.call(this, id, document, parentTable, keyFields) || this;
        _this._year = null;
        _this._keys = null;
        parentTable.AddChildTable(_this);
        return _this;
    }
    Object.defineProperty(YearPartUniqueTypedOrgsObasTable.prototype, "Year", {
        get: function () {
            if (this._year == null) {
                this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
            }
            return this._year;
        },
        enumerable: true,
        configurable: true
    });
    YearPartUniqueTypedOrgsObasTable.prototype.GetRecordKey = function (keys, addIfNotExists) {
        if (addIfNotExists === void 0) { addIfNotExists = false; }
        return this.Document.CommonRules.GetValueByKeys(this, this.KeyFieldIds, keys.ToArray(), this.RecordKey.Id, addIfNotExists);
    };
    YearPartUniqueTypedOrgsObasTable.prototype.GetParentRecordKey = function () {
        return this.ParentTable.RecordKey.LookupByKeys([this.Org.ForeignKey.Value, this.AuthorityType.ForeignKey.Value]);
    };
    YearPartUniqueTypedOrgsObasTable.prototype.GetKeys = function (orgKey, authTypeKey, year) {
        if (orgKey === void 0) { orgKey = this.Org.ForeignKey.Value; }
        if (authTypeKey === void 0) { authTypeKey = this.AuthorityType.ForeignKey.Value; }
        if (year === void 0) { year = this.Year.Value; }
        if (this._keys == null) {
            this._keys = new OrgAuthTypeYearObasTableKeys(orgKey, authTypeKey, year);
        }
        else {
            this._keys.OrgKey = orgKey;
            this._keys.Year = year;
            this._keys.AuthTypeKey = authTypeKey;
        }
        return this._keys;
    };
    return YearPartUniqueTypedOrgsObasTable;
}(PartUniqueTypedOrgsObasTable));
var YearPartUniqueOrgsObasTable = (function (_super) {
    __extends(YearPartUniqueOrgsObasTable, _super);
    function YearPartUniqueOrgsObasTable(id, document, parentTable, keyFields) {
        if (keyFields === void 0) { keyFields = parentTable.KeyFieldIds.concat(BaseObasTableFields.YearField.Id); }
        var _this = _super.call(this, id, document, parentTable, keyFields) || this;
        _this._year = null;
        _this._keys = null;
        parentTable.AddChildTable(_this);
        return _this;
    }
    Object.defineProperty(YearPartUniqueOrgsObasTable.prototype, "Year", {
        get: function () {
            if (this._year == null) {
                this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
            }
            return this._year;
        },
        enumerable: true,
        configurable: true
    });
    YearPartUniqueOrgsObasTable.prototype.GetRecordKey = function (keys, addIfNotExists) {
        if (addIfNotExists === void 0) { addIfNotExists = false; }
        return this.Document.CommonRules.GetValueByKeys(this, this.KeyFieldIds, keys.ToArray(), this.RecordKey.Id, addIfNotExists);
    };
    YearPartUniqueOrgsObasTable.prototype.GetParentRecordKey = function () {
        return this.ParentTable.RecordKey.LookupByKeys([this.Org.ForeignKey.Value]);
    };
    YearPartUniqueOrgsObasTable.prototype.GetKeys = function (orgKey, year) {
        if (orgKey === void 0) { orgKey = this.Org.ForeignKey.Value; }
        if (year === void 0) { year = this.Year.Value; }
        if (this._keys == null) {
            this._keys = new OrgYearObasTableKeys(orgKey, year);
        }
        else {
            this._keys.OrgKey = orgKey;
            this._keys.Year = year;
        }
        return this._keys;
    };
    return YearPartUniqueOrgsObasTable;
}(PartUniqueOrgsObasTable));
