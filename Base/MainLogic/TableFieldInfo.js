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
var BaseObasTableField = (function (_super) {
    __extends(BaseObasTableField, _super);
    function BaseObasTableField(id, _isGeneric, _isKeyField) {
        if (_isKeyField === void 0) { _isKeyField = !_isGeneric; }
        var _this = _super.call(this, EditorProObjectTypes.Field, id) || this;
        _this._isGeneric = _isGeneric;
        _this._isKeyField = _isKeyField;
        return _this;
    }
    Object.defineProperty(BaseObasTableField.prototype, "IsGeneric", {
        get: function () {
            return this._isGeneric;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableField.prototype, "IsKeyField", {
        get: function () {
            return this._isKeyField;
        },
        enumerable: true,
        configurable: true
    });
    BaseObasTableField.prototype.Equal = function (fieldId) {
        return this.IsGeneric ? fieldId.indexOf(this.Id) === 0 : fieldId === this.Id;
    };
    return BaseObasTableField;
}(BaseObject));
var BaseGenericObasTableField = (function (_super) {
    __extends(BaseGenericObasTableField, _super);
    function BaseGenericObasTableField(id) {
        return _super.call(this, id, true) || this;
    }
    BaseGenericObasTableField.prototype.GenerateId = function (param) {
        var index;
        if (typeof param === "string") {
            index = ObasHelper.GetYearIndexById(param);
        }
        else {
            index = param;
        }
        var result = this.Id;
        if (index < 0) {
            result += "P" + Math.abs(index);
        }
        else {
            result += index.toString();
        }
        return result;
    };
    BaseGenericObasTableField.prototype.GenerateTableField = function (table, yearIndex) {
        return new NumberObasTableField(this.GenerateId(yearIndex), table, false);
    };
    return BaseGenericObasTableField;
}(BaseObasTableField));
var BaseObasTableFields = (function () {
    function BaseObasTableFields() {
    }
    Object.defineProperty(BaseObasTableFields, "BarsCodeField", {
        get: function () {
            if (this._barsCodeField == null) {
                this._barsCodeField = new BaseObasTableField("BarsCode", false);
            }
            return this._barsCodeField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "NameField", {
        get: function () {
            if (this._nameField == null) {
                this._nameField = new BaseObasTableField("Name", false);
            }
            return this._nameField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "TaxYearDataField", {
        get: function () {
            if (this._taxYearDataField == null) {
                this._taxYearDataField = new BaseGenericObasTableField("Tax_Y");
            }
            return this._taxYearDataField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "CountYearDataField", {
        get: function () {
            if (this._countYearDataField == null) {
                this._countYearDataField = new BaseGenericObasTableField("Count_Y");
            }
            return this._countYearDataField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "RubYearDataField", {
        get: function () {
            if (this._rubYearDataField == null) {
                this._rubYearDataField = new BaseGenericObasTableField("Rub_Y");
            }
            return this._rubYearDataField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "UsdYearDataField", {
        get: function () {
            if (this._usdYearDataField == null) {
                this._usdYearDataField = new BaseGenericObasTableField("Usd_Y");
            }
            return this._usdYearDataField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "InsuranceYearDataField", {
        get: function () {
            if (this._insuranceYearDataField == null) {
                this._insuranceYearDataField = new BaseGenericObasTableField("Ins_Y");
            }
            return this._insuranceYearDataField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "FotYearDataField", {
        get: function () {
            if (this._fotYearDataField == null) {
                this._fotYearDataField = new BaseGenericObasTableField("Fot_Y");
            }
            return this._fotYearDataField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "YearDataField", {
        get: function () {
            if (this._yearDataField == null) {
                this._yearDataField = new BaseGenericObasTableField("Y");
            }
            return this._yearDataField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "CalcRowFlagField", {
        get: function () {
            if (BaseObasTableFields._calcRowFlagField == null) {
                BaseObasTableFields._calcRowFlagField = new BaseObasTableField("IsCalc", false);
            }
            return BaseObasTableFields._calcRowFlagField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "CopiedRowFlagField", {
        get: function () {
            if (this._copiedRowFlagField == null) {
                this._copiedRowFlagField = new BaseObasTableField("IsCopied", false);
            }
            return this._copiedRowFlagField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "TotalRowFlagField", {
        get: function () {
            if (BaseObasTableFields._totalRowFlagField == null) {
                BaseObasTableFields._totalRowFlagField = new BaseObasTableField("IsTotal", false);
            }
            return BaseObasTableFields._totalRowFlagField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "YearField", {
        get: function () {
            if (this._yearField == null) {
                this._yearField = new BaseObasTableField("Year", false);
            }
            return this._yearField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "StrCodeField", {
        get: function () {
            if (this._strCodeField == null) {
                this._strCodeField = new BaseObasTableField("StrCode", false);
            }
            return this._strCodeField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "StrKeyField", {
        get: function () {
            if (this._strKeyField == null) {
                this._strKeyField = new BaseObasTableField("StrKey", false);
            }
            return this._strKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "OrgKeyField", {
        get: function () {
            if (this._orgKeyField == null) {
                this._orgKeyField = new BaseObasTableField("OrgKey", false);
            }
            return this._orgKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "OwnerKeyField", {
        get: function () {
            if (this._ownerKeyField == null) {
                this._ownerKeyField = new BaseObasTableField("OwnerKey", false);
            }
            return this._ownerKeyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObasTableFields, "RecordKeyField", {
        get: function () {
            if (this._recordKeyField == null) {
                this._recordKeyField = new BaseObasTableField("Key", false);
            }
            return this._recordKeyField;
        },
        enumerable: true,
        configurable: true
    });
    return BaseObasTableFields;
}());
BaseObasTableFields._ownerKeyField = null;
BaseObasTableFields._orgKeyField = null;
BaseObasTableFields._strKeyField = null;
BaseObasTableFields._strCodeField = null;
BaseObasTableFields._yearField = null;
BaseObasTableFields._totalRowFlagField = null;
BaseObasTableFields._copiedRowFlagField = null;
BaseObasTableFields._calcRowFlagField = null;
BaseObasTableFields._yearDataField = null;
BaseObasTableFields._fotYearDataField = null;
BaseObasTableFields._insuranceYearDataField = null;
BaseObasTableFields._usdYearDataField = null;
BaseObasTableFields._rubYearDataField = null;
BaseObasTableFields._countYearDataField = null;
BaseObasTableFields._recordKeyField = null;
BaseObasTableFields._taxYearDataField = null;
BaseObasTableFields._nameField = null;
BaseObasTableFields._barsCodeField = null;
var CalcFields = (function () {
    function CalcFields(_sumField, _empCountField, _payField, _tableRef, _empCountFieldChangeHandler) {
        this._sumField = _sumField;
        this._empCountField = _empCountField;
        this._payField = _payField;
        this._tableRef = _tableRef;
        this._empCountFieldChangeHandler = _empCountFieldChangeHandler;
    }
    CalcFields.prototype.ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this._sumField.NValue = this._empCountField.NValue * this._payField.NValue;
    };
    CalcFields.prototype.EmplChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.ChangeEventHandler(tableId, oldValue, newValue, fieldId);
        if (this._empCountFieldChangeHandler) {
            this._empCountFieldChangeHandler(tableId, oldValue, newValue, fieldId);
        }
    };
    return CalcFields;
}());
