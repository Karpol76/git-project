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
var ObasTable = (function (_super) {
    __extends(ObasTable, _super);
    function ObasTable(id, keyFieldIds, isReadOnly) {
        if (keyFieldIds === void 0) { keyFieldIds = [BaseObasTableFields.RecordKeyField.Id]; }
        if (isReadOnly === void 0) { isReadOnly = false; }
        var _this = _super.call(this, id, isReadOnly) || this;
        _this._savedKey = null;
        _this._tableEditEvent = new TableAddEditEvent();
        _this._tableAddEvent = new TableAddEditEvent();
        _this._keyFieldIds = keyFieldIds;
        _this._recordKey = new ObasTableField(BaseObasTableFields.RecordKeyField.Id, _this);
        return _this;
    }
    Object.defineProperty(ObasTable.prototype, "TableEditEvent", {
        get: function () {
            return this._tableEditEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTable.prototype, "TableAddEvent", {
        get: function () {
            return this._tableAddEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTable.prototype, "RecordKey", {
        get: function () {
            return this._recordKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTable.prototype, "KeyFieldIds", {
        get: function () {
            return this._keyFieldIds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTable.prototype, "KeyFieldValues", {
        get: function () {
            var values = [];
            var length = this._keyFieldIds.length;
            for (var i = 0; i < length; i++) {
                values.push(this.GetFieldValue(this._keyFieldIds[i]));
            }
            return values;
        },
        enumerable: true,
        configurable: true
    });
    ObasTable.prototype.LocateByKeys = function (param) {
        return _super.prototype.Locate.call(this, this._keyFieldIds, param);
    };
    ObasTable.prototype.InitRecord = function (keyValues) {
        if (!this.LocateByKeys(keyValues)) {
            var length_1 = this._keyFieldIds.length;
            this.AddRow();
            for (var i = 0; i < length_1; i++) {
                this.SetFieldValue(this._keyFieldIds[i], keyValues[i]);
            }
            this.PostRow();
        }
    };
    ObasTable.prototype.CollectTableRecordData = function (fieldsInfo) {
        var _this = this;
        fieldsInfo.forEach(function (key, value) {
            value.Value = _this.GetFieldValue(key);
        });
        return fieldsInfo;
    };
    ObasTable.prototype.SetupTableRecordData = function (fieldsInfo, recordKey, onlyCreate) {
        var _this = this;
        if (recordKey === void 0) { recordKey = null; }
        if (onlyCreate === void 0) { onlyCreate = false; }
        var isNewRecord = recordKey == null;
        if (!isNewRecord) {
            isNewRecord = !this.Locate(this.RecordKey.Id, recordKey);
        }
        if (isNewRecord) {
            this.AddRow();
        }
        else if (onlyCreate) {
            return recordKey;
        }
        var values = fieldsInfo.values();
        var setupData = function (fieldsInfos) {
            for (var i = 0, len = fieldsInfos.length; i < len; i++) {
                var fieldInfo = fieldsInfos[i];
                _this.SetFieldValue(fieldInfo.Id, fieldInfo.Value, true);
            }
        };
        var sortFunc = function (a, b) {
            if (a.Order == null || b.Order == null) {
                return 0;
            }
            if (a.Order < b.Order) {
                return -1;
            }
            if (a.Order > b.Order) {
                return 1;
            }
            return 0;
        };
        setupData(values.filter(function (value) {
            return !value.IsData;
        }).sort(sortFunc));
        setupData(values.filter(function (value) {
            return value.IsData;
        }).sort(sortFunc));
        this.PostRow();
        return this.RecordKey.Value;
    };
    ObasTable.prototype.CollectTableData = function (fieldsInfo, filter) {
        var _this = this;
        var result = [];
        var collector = function () {
            if (filter == null || filter(_this, _this.RecordKey.Value)) {
                var newInfo_1 = new collections.Dictionary();
                fieldsInfo.forEach(function (key, value) {
                    newInfo_1.setValue(key, {
                        Id: value.Id,
                        IsData: value.IsData,
                        Value: _this.GetFieldValue(key),
                        Order: value.Order
                    });
                });
                result.push({
                    RecordKey: _this.RecordKey.Value,
                    Data: newInfo_1
                });
            }
        };
        this.Iterate(collector);
        return result;
    };
    ObasTable.prototype.SetupTableData = function (fieldsInfos) {
        for (var _i = 0, fieldsInfos_1 = fieldsInfos; _i < fieldsInfos_1.length; _i++) {
            var value = fieldsInfos_1[_i];
            this.SetupTableRecordData(value.Data, value.RecordKey);
        }
    };
    ObasTable.prototype.CopyAllRows = function (destTable, mapping, filter) {
        destTable.DeleteAllRow();
        var copy = function (table, recordKey) {
            if (filter == null || filter(table, recordKey)) {
                table.CopyRow(destTable, recordKey, mapping);
            }
        };
        this.Iterate(copy);
    };
    ObasTable.prototype.AddTableEditListener = function (handler) {
        this.TableEditEvent.Add(handler);
    };
    ObasTable.prototype.RemoveTableEditListener = function (handler) {
        this.TableEditEvent.Remove(handler);
    };
    ObasTable.prototype.DoTableEdit = function () {
        this.TableEditEvent.Do(this.RecordKey.Value);
    };
    ObasTable.prototype.AddTableAddListener = function (handler) {
        this.TableAddEvent.Add(handler);
    };
    ObasTable.prototype.RemoveTableAddListener = function (handler) {
        this.TableAddEvent.Remove(handler);
    };
    ObasTable.prototype.DoTableAdd = function () {
        this.TableAddEvent.Do(this.RecordKey.Value);
    };
    ObasTable.prototype.SavePosition = function () {
        this._savedKey = this.RecordKey.Value;
    };
    ObasTable.prototype.RestorePosition = function () {
        return this.RecordKey.Locate(this._savedKey);
    };
    ObasTable.prototype.DoWithRestorePosition = function (handler) {
        this.SavePosition();
        handler();
        return this.RestorePosition();
    };
    return ObasTable;
}(Table));
var BarsObasTable = (function (_super) {
    __extends(BarsObasTable, _super);
    function BarsObasTable(id) {
        return _super.call(this, BarsObasTable._prefix + Client.ClearSpecSymbol(id)) || this;
    }
    BarsObasTable.prototype.GetFieldValue = function (fieldId) {
        if (this.IsFieldExists(fieldId)) {
            return _super.prototype.GetFieldValue.call(this, fieldId);
        }
        else {
            return null;
        }
    };
    BarsObasTable.prototype.GetFieldYear = function (fieldId) {
        var data = this.GetFieldValue(fieldId);
        if (typeof data === "number") {
            return data;
        }
        else {
            var date = ObasHelper.ConvertStringToDate(data);
            if (date != null) {
                return date.getFullYear();
            }
        }
        return null;
    };
    BarsObasTable.prototype.GetFieldDate = function (fieldId) {
        var data = this.GetFieldValue(fieldId);
        if (data instanceof Date) {
            return data;
        }
        return undefined;
    };
    BarsObasTable.prototype.GetFieldNumber = function (fieldId) {
        return ObasHelper.ConvertToNumber(this.GetFieldValue(fieldId));
    };
    BarsObasTable.prototype.Locate = function (locateKeys, locateValues, locateMark, autoExclude) {
        var _this = this;
        var locateFields = locateKeys instanceof Array ? locateKeys : [locateKeys];
        if (locateFields.every(function (fieldId) {
            return _this.GetFieldsIds().indexOf(fieldId) > -1;
        })) {
            return _super.prototype.Locate.call(this, locateKeys, locateValues, locateMark, autoExclude);
        }
        else {
            return false;
        }
    };
    return BarsObasTable;
}(ObasTable));
BarsObasTable._prefix = "BARS_import_";
var GenericObasTableFieldTyped = (function (_super) {
    __extends(GenericObasTableFieldTyped, _super);
    function GenericObasTableFieldTyped(id, _table) {
        var _this = _super.call(this, id) || this;
        _this._table = _table;
        _this._fields = new collections.Dictionary();
        return _this;
    }
    Object.defineProperty(GenericObasTableFieldTyped.prototype, "Table", {
        get: function () {
            return this._table;
        },
        enumerable: true,
        configurable: true
    });
    GenericObasTableFieldTyped.prototype.GetFieldByYear = function (year) {
        return this.GetFieldByYearOffset(ObasHelper.GetYearOffset(year));
    };
    GenericObasTableFieldTyped.prototype.GetFieldByYearIndex = function (yearIndex) {
        return this.GetField(this.GenerateId(yearIndex));
    };
    GenericObasTableFieldTyped.prototype.GetFieldByYearOffset = function (yearOffset) {
        return this.GetField(this.GenerateId(yearOffset + 1));
    };
    GenericObasTableFieldTyped.prototype.GetFieldByField = function (param) {
        var fieldId = typeof param === "string" ? param : param.Id;
        return this.GetField(this.GenerateId(fieldId));
    };
    return GenericObasTableFieldTyped;
}(BaseGenericObasTableField));
var ObasTableField = (function (_super) {
    __extends(ObasTableField, _super);
    function ObasTableField(id, _table, isKeyField) {
        if (isKeyField === void 0) { isKeyField = false; }
        var _this = _super.call(this, id, false, isKeyField) || this;
        _this._table = _table;
        _this._caption = null;
        _this._changeFieldEvent = new ObasTableFieldChangeEvent();
        return _this;
    }
    Object.defineProperty(ObasTableField.prototype, "ChangeFieldEvent", {
        get: function () {
            return this._changeFieldEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableField.prototype, "Caption", {
        get: function () {
            if (this._caption == null) {
                this._caption = this._table.GetFieldAttribute(this.Id, TableFieldAttributes.Caption);
            }
            return this._caption;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableField.prototype, "Table", {
        get: function () {
            return this._table;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableField.prototype, "Value", {
        get: function () {
            return this._table.GetFieldValue(this.Id);
        },
        set: function (value) {
            this._table.SetFieldValue(this.Id, value);
        },
        enumerable: true,
        configurable: true
    });
    ObasTableField.prototype.LookupByKeys = function (param) {
        return this._table.Lookup(this._table.KeyFieldIds, param, this.Id);
    };
    ObasTableField.prototype.Locate = function (value, locateMark, autoExclude) {
        var tVal = value;
        return this._table.Locate(this.Id, tVal, locateMark, autoExclude);
    };
    ObasTableField.prototype.DefferedSetValue = function (value) {
        this._table.SetFieldValue(this.Id, value, false);
    };
    ObasTableField.prototype.AddFieldChangeListener = function (handler) {
        this.ChangeFieldEvent.Add(handler);
    };
    ObasTableField.prototype.RemoveFieldChangeListener = function (handler) {
        this.ChangeFieldEvent.Remove(handler);
    };
    ObasTableField.prototype.DoFieldChange = function (oldValue, newValue) {
        this.ChangeFieldEvent.Do(this.Table, oldValue, newValue, this.Id);
    };
    return ObasTableField;
}(BaseObasTableField));
var NumberObasTableField = (function (_super) {
    __extends(NumberObasTableField, _super);
    function NumberObasTableField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NumberObasTableField.prototype, "NValue", {
        get: function () {
            return this.Value || 0;
        },
        set: function (value) {
            this.Value = (value || 0);
        },
        enumerable: true,
        configurable: true
    });
    NumberObasTableField.prototype.DefferedSetValue = function (value) {
        _super.prototype.DefferedSetValue.call(this, value || 0);
    };
    return NumberObasTableField;
}(ObasTableField));
var GenericObasTableField = (function (_super) {
    __extends(GenericObasTableField, _super);
    function GenericObasTableField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericObasTableField.prototype.GetField = function (fieldId) {
        var result = this._fields.getValue(fieldId);
        if (result == null) {
            result = new ObasTableField(fieldId, this.Table);
            this._fields.setValue(fieldId, result);
        }
        return result;
    };
    return GenericObasTableField;
}(GenericObasTableFieldTyped));
var NumberGenericObasTableField = (function (_super) {
    __extends(NumberGenericObasTableField, _super);
    function NumberGenericObasTableField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberGenericObasTableField.prototype.GetField = function (fieldId) {
        var result = this._fields.getValue(fieldId);
        if (result == null) {
            result = new NumberObasTableField(fieldId, this.Table);
            this._fields.setValue(fieldId, result);
        }
        return result;
    };
    return NumberGenericObasTableField;
}(GenericObasTableFieldTyped));
var UserInfoTableField = (function (_super) {
    __extends(UserInfoTableField, _super);
    function UserInfoTableField(id, table) {
        var _this = _super.call(this, EditorProObjectTypes.None, id) || this;
        _this._oktmoCodeField = null;
        _this._nameField = new ObasTableField(id + "_Name", table);
        _this._regCodeField = new ObasTableField(id + "_RegCode", table);
        _this._oktmoCodeField = new ObasTableField(id + "_OktmoCode", table);
        return _this;
    }
    Object.defineProperty(UserInfoTableField.prototype, "Name", {
        get: function () {
            return this._nameField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfoTableField.prototype, "RegCodeField", {
        get: function () {
            return this._regCodeField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfoTableField.prototype, "OktmoCodeField", {
        get: function () {
            return this._oktmoCodeField;
        },
        enumerable: true,
        configurable: true
    });
    UserInfoTableField.prototype.CheckCode = function (code, length) {
        return (code || "").length === length;
    };
    UserInfoTableField.prototype.CheckOktmoCode = function () {
        var code = this.OktmoCodeField.Value;
        if (this.CheckCode(code, 8) || this.CheckCode(code, 13)) {
            return undefined;
        }
        else {
            return "Код по ОКТМО должен составлять 8 или 13 знаков";
        }
    };
    return UserInfoTableField;
}(BaseObject));
var ObasPersonInfoTableFields = (function (_super) {
    __extends(ObasPersonInfoTableFields, _super);
    function ObasPersonInfoTableFields(id, table) {
        var _this = _super.call(this, EditorProObjectTypes.None, id) || this;
        _this._nameField = new ObasTableField(id + "Name", table);
        _this._postField = new ObasTableField(id + "Post", table);
        _this._phoneField = new ObasTableField(id + "Phone", table);
        return _this;
    }
    Object.defineProperty(ObasPersonInfoTableFields.prototype, "Name", {
        get: function () {
            return this._nameField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasPersonInfoTableFields.prototype, "Post", {
        get: function () {
            return this._postField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasPersonInfoTableFields.prototype, "Phone", {
        get: function () {
            return this._phoneField;
        },
        enumerable: true,
        configurable: true
    });
    return ObasPersonInfoTableFields;
}(BaseObject));
var ObasPersonInfoTable = (function (_super) {
    __extends(ObasPersonInfoTable, _super);
    function ObasPersonInfoTable(id) {
        var _this = _super.call(this, id) || this;
        _this._infoFields = new ObasPersonInfoTableFields("", _this);
        return _this;
    }
    Object.defineProperty(ObasPersonInfoTable.prototype, "Name", {
        get: function () {
            return this._infoFields.Name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasPersonInfoTable.prototype, "Post", {
        get: function () {
            return this._infoFields.Post;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasPersonInfoTable.prototype, "Phone", {
        get: function () {
            return this._infoFields.Phone;
        },
        enumerable: true,
        configurable: true
    });
    return ObasPersonInfoTable;
}(ObasTable));
var ObasForeignKeyTableFieldTyped = (function (_super) {
    __extends(ObasForeignKeyTableFieldTyped, _super);
    function ObasForeignKeyTableFieldTyped(sourceTable, table, newId, isGenerated, isKeyField) {
        if (isGenerated === void 0) { isGenerated = true; }
        if (isKeyField === void 0) { isKeyField = true; }
        var _this = _super.call(this, "" + (newId ? newId : sourceTable.Id) + (isGenerated ? "_ID" : ""), table, isKeyField) || this;
        _this._sourceTable = sourceTable;
        return _this;
    }
    Object.defineProperty(ObasForeignKeyTableFieldTyped.prototype, "SourceTable", {
        get: function () {
            this._sourceTable.Locate(this._sourceTable.RecordKey.Id, this.Value);
            return this._sourceTable;
        },
        enumerable: true,
        configurable: true
    });
    ObasForeignKeyTableFieldTyped.prototype.InitEventHandler = function (tableId, fieldId) {
        return this._sourceTable.RecordKey.Value;
    };
    return ObasForeignKeyTableFieldTyped;
}(ObasTableField));
var ObasForeignKeyTableField = (function (_super) {
    __extends(ObasForeignKeyTableField, _super);
    function ObasForeignKeyTableField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObasForeignKeyTableField;
}(ObasForeignKeyTableFieldTyped));
var ObasSprTableFieldTyped = (function (_super) {
    __extends(ObasSprTableFieldTyped, _super);
    function ObasSprTableFieldTyped(_sprTable, table, newId) {
        var _this = _super.call(this, EditorProObjectTypes.None, newId ? newId : _sprTable.Id) || this;
        _this._sprTable = _sprTable;
        _this._nameField = _this.InitField(_this.Id + "_Name", table);
        _this._codeField = _this.InitField(_this.Id + "_Code", table);
        _this._keyField = new ObasForeignKeyTableFieldTyped(_sprTable, table, _this.Id);
        return _this;
    }
    ObasSprTableFieldTyped.prototype.InitField = function (fieldId, table) {
        return (table.IsFieldExists(fieldId) ? new ObasTableField(fieldId, table) : null);
    };
    Object.defineProperty(ObasSprTableFieldTyped.prototype, "SprTable", {
        get: function () {
            return this._sprTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasSprTableFieldTyped.prototype, "Name", {
        get: function () {
            return this._nameField == null ? this._sprTable.Name.LookupByKeys(this._keyField.Value) : this._nameField.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasSprTableFieldTyped.prototype, "Code", {
        get: function () {
            return this._codeField == null ? this._sprTable.Code.LookupByKeys(this._keyField.Value) : this._codeField.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasSprTableFieldTyped.prototype, "ForeignKey", {
        get: function () {
            return this._keyField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasSprTableFieldTyped.prototype, "NameFieldId", {
        get: function () {
            return this._nameField == null ? null : this._nameField.Id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasSprTableFieldTyped.prototype, "CodeFieldId", {
        get: function () {
            return this._codeField == null ? null : this._codeField.Id;
        },
        enumerable: true,
        configurable: true
    });
    return ObasSprTableFieldTyped;
}(BaseObject));
var ObasSprTableField = (function (_super) {
    __extends(ObasSprTableField, _super);
    function ObasSprTableField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObasSprTableField;
}(ObasSprTableFieldTyped));
var ObasTableWithGovProgramData = (function (_super) {
    __extends(ObasTableWithGovProgramData, _super);
    function ObasTableWithGovProgramData(id, keyFields) {
        if (keyFields === void 0) { keyFields = [BaseObasTableFields.RecordKeyField.Id]; }
        var _this = _super.call(this, id, keyFields, false) || this;
        _this._gp = null;
        return _this;
    }
    Object.defineProperty(ObasTableWithGovProgramData.prototype, "GovermentProgram", {
        get: function () {
            if (this._gp == null)
                this._gp = new ObasSprTableField(ObasTableCollection.GovermentProgramTable, this);
            return this._gp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithGovProgramData.prototype, "SubjPlanBudgCode", {
        get: function () {
            return ObasHelper.GetSubjPlanBudgCode(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithGovProgramData.prototype, "SubjPlanBudgName", {
        get: function () {
            return ObasHelper.GetSubjPlanBudgName(this);
        },
        enumerable: true,
        configurable: true
    });
    return ObasTableWithGovProgramData;
}(ObasTable));
var ObasTableWithCSRData = (function (_super) {
    __extends(ObasTableWithCSRData, _super);
    function ObasTableWithCSRData(id, keyFields) {
        var _this = _super.call(this, id, keyFields) || this;
        _this._fcr = null;
        _this._subP = null;
        _this._dirCost = null;
        _this._vr = null;
        return _this;
    }
    Object.defineProperty(ObasTableWithCSRData.prototype, "Fcr", {
        get: function () {
            if (this._fcr == null)
                this._fcr = new ObasSprTableField(ObasTableCollection.FcrTable, this);
            return this._fcr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithCSRData.prototype, "SubProgram", {
        get: function () {
            if (this._subP == null)
                this._subP = new ObasSprTableField(ObasTableCollection.SubProgramTable, this);
            return this._subP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithCSRData.prototype, "DirectionCost", {
        get: function () {
            if (this._dirCost == null)
                this._dirCost = new ObasSprTableField(ObasTableCollection.DirectionCostTable, this);
            return this._dirCost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithCSRData.prototype, "CostType", {
        get: function () {
            if (this._vr == null)
                this._vr = new ObasSprTableField(ObasTableCollection.CostTypeTable, this);
            return this._vr;
        },
        enumerable: true,
        configurable: true
    });
    ObasTableWithCSRData.prototype.CalcSubprogramCode = function () {
        var code = this.SubProgram.Code;
        return code ? (code.length > 1 ? code.substr(2, 1) : code) : "0";
    };
    ObasTableWithCSRData.prototype.CalcFcrSectionCode = function () {
        var code = this.Fcr.Code;
        return code ? code.substr(0, 2) : "";
    };
    ObasTableWithCSRData.prototype.CalcFcrFullSectionCode = function () {
        var code = this.Fcr.Code;
        return code ? code.substr(0, 2) + "00" : "";
    };
    ObasTableWithCSRData.prototype.CalcFcrSubSectionCode = function () {
        var code = this.Fcr.Code;
        return code ? code.substr(2, 2) : "";
    };
    ObasTableWithCSRData.prototype.CalcFcrSectionName = function () {
        var code = this.CalcFcrSectionCode();
        return ObasTableCollection.FcrTable.Lookup(["Code"], [code + "00"], "Name");
    };
    ObasTableWithCSRData.prototype.CalcFcrSubSectionName = function () {
        var code = this.CalcFcrSubSectionCode();
        return (code.length === 0 || code === "00" ? "" : this.Fcr.Name);
    };
    ObasTableWithCSRData.prototype.CalcOwnerCostTypeCode = function () {
        return this.CostType.Code.substr(0, 1) + "00";
    };
    ObasTableWithCSRData.prototype.CalcOwnerDirectionCostCode = function () {
        var dirCostCode = this.DirectionCost.Code;
        if (dirCostCode.indexOf("9") === 0) {
            dirCostCode = "90000";
        }
        return dirCostCode;
    };
    ObasTableWithCSRData.prototype.GetCsrFieldsId = function () {
        var result = [];
        result.push(this.Fcr.ForeignKey.Id);
        result.push(this.GovermentProgram.ForeignKey.Id);
        result.push(this.SubProgram.ForeignKey.Id);
        result.push(this.DirectionCost.ForeignKey.Id);
        result.push(this.CostType.ForeignKey.Id);
        return result;
    };
    ObasTableWithCSRData.prototype.GetCsrFieldsValue = function () {
        var result = new Array();
        result.push(this.Fcr.ForeignKey.Value);
        result.push(this.GovermentProgram.ForeignKey.Value);
        result.push(this.SubProgram.ForeignKey.Value);
        result.push(this.DirectionCost.ForeignKey.Value);
        result.push(this.CostType.ForeignKey.Value);
        return result;
    };
    ObasTableWithCSRData.prototype.GetCsrFieldsCode = function () {
        var result = new Array();
        result.push(this.Fcr.Code);
        result.push(this.GovermentProgram.Code);
        result.push(this.SubProgram.Code);
        result.push(this.DirectionCost.Code);
        result.push(this.CostType.Code);
        return result;
    };
    return ObasTableWithCSRData;
}(ObasTableWithGovProgramData));
var ObasTableWithKbkData = (function (_super) {
    __extends(ObasTableWithKbkData, _super);
    function ObasTableWithKbkData(id, keyFields) {
        var _this = _super.call(this, id, keyFields) || this;
        _this._foiv = null;
        _this._action = null;
        return _this;
    }
    Object.defineProperty(ObasTableWithKbkData.prototype, "Foiv", {
        get: function () {
            if (this._foiv == null)
                this._foiv = new ObasSprTableField(ObasTableCollection.FoivTable, this);
            return this._foiv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasTableWithKbkData.prototype, "MainAction", {
        get: function () {
            if (this._action == null)
                this._action = new ObasSprTableField(ObasTableCollection.MainActionTable, this);
            return this._action;
        },
        enumerable: true,
        configurable: true
    });
    ObasTableWithKbkData.prototype.CalcFullKBKCode = function () {
        var kbkCode = "";
        var code = this.Fcr.Code;
        kbkCode += code ? code : "0000";
        kbkCode += " ";
        code = this.GovermentProgram.Code;
        kbkCode += code ? code : "00";
        kbkCode += this.CalcSubprogramCode();
        code = this.MainAction.Code;
        kbkCode += code ? code : "00";
        code = this.DirectionCost.Code;
        kbkCode += code ? code : "0000";
        kbkCode += " ";
        code = this.CostType.Code;
        kbkCode += code ? code : "000";
        return kbkCode;
    };
    ObasTableWithKbkData.prototype.GetKbkKeyFieldsId = function () {
        var result = this.GetCsrFieldsId();
        result.push(this.MainAction.ForeignKey.Id);
        return result;
    };
    ObasTableWithKbkData.prototype.GetKbkKeyFieldsValue = function () {
        var result = this.GetCsrFieldsValue();
        result.push(this.MainAction.ForeignKey.Value);
        return result;
    };
    ObasTableWithKbkData.prototype.GetKbkCode = function (delimiter) {
        if (delimiter === void 0) { delimiter = " "; }
        var result = new Array();
        result.push(this.Fcr.Code);
        result.push(this.GetCSRCode());
        result.push(this.CostType.Code);
        return result.join(delimiter);
    };
    ObasTableWithKbkData.prototype.GetCSRCode = function () {
        var code = this.GovermentProgram.Code;
        code += this.CalcSubprogramCode();
        code += ObasExportHelper.GetActionCode(this);
        code += this.DirectionCost.Code;
        return code;
    };
    return ObasTableWithKbkData;
}(ObasTableWithCSRData));
var TransposedObasTable = (function (_super) {
    __extends(TransposedObasTable, _super);
    function TransposedObasTable(id, fieldsCount, keyFields, transposedFields) {
        var _this = _super.call(this, id, keyFields, false) || this;
        _this._fieldsCount = fieldsCount;
        return _this;
    }
    Object.defineProperty(TransposedObasTable.prototype, "FieldsCount", {
        get: function () {
            return this._fieldsCount;
        },
        set: function (value) {
            var reCreate = this._fieldsCount !== value;
            this._fieldsCount = value;
        },
        enumerable: true,
        configurable: true
    });
    return TransposedObasTable;
}(ObasTable));
var DollarRateTransposedObasTable = (function (_super) {
    __extends(DollarRateTransposedObasTable, _super);
    function DollarRateTransposedObasTable() {
        return _super.call(this, "tRateDollarActual", 5, ["PseudoKey"], ["ActualDate"]) || this;
    }
    DollarRateTransposedObasTable.prototype.GetFieldIndexEventHandler = function (courseDate) {
        var year;
        if (courseDate instanceof Date) {
            year = courseDate.getFullYear();
        }
        else {
            year = parseInt(courseDate.toString().substr(0, 4), 10);
        }
        return (year - ObasStageSettings.CurrentYear);
    };
    DollarRateTransposedObasTable.prototype.GetFieldValueEventHandler = function (fieldIndex, fieldId) {
        return new Date(ObasStageSettings.CurrentYear + fieldIndex, 1, 1);
    };
    DollarRateTransposedObasTable.prototype.LoadEventHandler = function (tableId, sourceTableId) {
        var actualDate = ObasTableCollection.RateDollarActualTable.ActualDate.Value;
        return actualDate && actualDate.getFullYear() >= ObasStageSettings.CurrentYear;
    };
    return DollarRateTransposedObasTable;
}(TransposedObasTable));
var AggrTransposedObasTable = (function (_super) {
    __extends(AggrTransposedObasTable, _super);
    function AggrTransposedObasTable(id, keyFields, transposedFields) {
        return _super.call(this, id, 1, keyFields, transposedFields) || this;
    }
    AggrTransposedObasTable.prototype.GetFieldIndexEventHandler = function () {
        return 0;
    };
    AggrTransposedObasTable.prototype.GetFieldValueEventHandler = function (fieldIndex, fieldId) {
        return 0;
    };
    AggrTransposedObasTable.prototype.AggregateEventHandler = function (curValue, srcValue, tableIdTarget, tableIdSource) {
        return (curValue + srcValue);
    };
    return AggrTransposedObasTable;
}(TransposedObasTable));
var YearTransposedObasTable = (function (_super) {
    __extends(YearTransposedObasTable, _super);
    function YearTransposedObasTable(id, keyFields) {
        return _super.call(this, id, ObasStageSettings.YearsCount, keyFields, [DocumentSettings.YearFieldId]) || this;
    }
    YearTransposedObasTable.prototype.GetFieldIndexEventHandler = function (year) {
        return year - ObasStageSettings.CurrentYear;
    };
    YearTransposedObasTable.prototype.GetFieldValueEventHandler = function (fieldIndex, fieldId) {
        return ObasStageSettings.CurrentYear + fieldIndex;
    };
    return YearTransposedObasTable;
}(TransposedObasTable));
var ObasTableKeys = (function () {
    function ObasTableKeys() {
    }
    ObasTableKeys.prototype.ToArray = function () {
        var _this = this;
        return Object.keys(this).map(function (key) {
            return _this[key];
        });
    };
    return ObasTableKeys;
}());
var BaseObasTableWithKeys = (function (_super) {
    __extends(BaseObasTableWithKeys, _super);
    function BaseObasTableWithKeys(id, keyFields) {
        var _this = _super.call(this, id, keyFields) || this;
        _this._keys = null;
        return _this;
    }
    BaseObasTableWithKeys.prototype.GetRecordKey = function (keys, addIfNotExists) {
        if (addIfNotExists === void 0) { addIfNotExists = false; }
        return ObasHelper.GetValueByKeys(this, this.KeyFieldIds, keys.ToArray(), this.RecordKey.Id, addIfNotExists);
    };
    return BaseObasTableWithKeys;
}(ObasTable));
var UniqueOrgsObasTable = (function (_super) {
    __extends(UniqueOrgsObasTable, _super);
    function UniqueOrgsObasTable(id, keyFieldIds) {
        if (keyFieldIds === void 0) { keyFieldIds = ["Organization_ID"]; }
        var _this = _super.call(this, id, keyFieldIds) || this;
        _this._orgField = null;
        return _this;
    }
    Object.defineProperty(UniqueOrgsObasTable.prototype, "Org", {
        get: function () {
            if (this._orgField == null) {
                this._orgField = new ObasSprTableField(ObasTableCollection.OrganizationTable, this);
            }
            return this._orgField;
        },
        enumerable: true,
        configurable: true
    });
    return UniqueOrgsObasTable;
}(ObasTable));
var TypedDocumentUniqueObasTable = (function (_super) {
    __extends(TypedDocumentUniqueObasTable, _super);
    function TypedDocumentUniqueObasTable(id, _document, keyFields) {
        var _this = _super.call(this, id, keyFields) || this;
        _this._document = _document;
        _this._childTableIds = [];
        return _this;
    }
    Object.defineProperty(TypedDocumentUniqueObasTable.prototype, "Document", {
        get: function () {
            return this.GetDocument();
        },
        enumerable: true,
        configurable: true
    });
    TypedDocumentUniqueObasTable.prototype.GetDocument = function () {
        return this._document;
    };
    TypedDocumentUniqueObasTable.prototype.AddChildTable = function (childTable) {
        if (this._childTableIds.indexOf(childTable.Id) === -1) {
            this._childTableIds.push(childTable.Id);
        }
    };
    TypedDocumentUniqueObasTable.prototype.AddElement = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        if (keys.every(function (value) {
            return value != null;
        })) {
            this._document.CommonRules.AddNewLink(this.Id, this.KeyFieldIds, keys);
        }
    };
    TypedDocumentUniqueObasTable.prototype.DeleteElement = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        this._document.CommonRules.DeleteOldLink(this.Id, this._childTableIds, this.KeyFieldIds, keys);
    };
    return TypedDocumentUniqueObasTable;
}(ObasTable));
var UniqueObasTable = (function (_super) {
    __extends(UniqueObasTable, _super);
    function UniqueObasTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UniqueObasTable;
}(TypedDocumentUniqueObasTable));
var UniqueSimpleKeyTable = (function (_super) {
    __extends(UniqueSimpleKeyTable, _super);
    function UniqueSimpleKeyTable(id, document, keyFields) {
        return _super.call(this, id, document, keyFields) || this;
    }
    UniqueSimpleKeyTable.prototype.AddElement = function (key) {
        _super.prototype.AddElement.call(this, key);
    };
    UniqueSimpleKeyTable.prototype.DeleteElement = function (key) {
        _super.prototype.DeleteElement.call(this, key);
    };
    return UniqueSimpleKeyTable;
}(UniqueObasTable));
var UniqueExtendOrgsObasTable = (function (_super) {
    __extends(UniqueExtendOrgsObasTable, _super);
    function UniqueExtendOrgsObasTable(id, _document, keyFields) {
        if (keyFields === void 0) { keyFields = ["Organization_ID"]; }
        var _this = _super.call(this, id, keyFields) || this;
        _this._document = _document;
        _this._uniqHelper = null;
        _this._keys = null;
        return _this;
    }
    Object.defineProperty(UniqueExtendOrgsObasTable.prototype, "UniqHelper", {
        get: function () {
            if (this._uniqHelper == null) {
                this._uniqHelper = new UniqueObasTable(this.Id, this.Document, this.KeyFieldIds);
            }
            return this._uniqHelper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UniqueExtendOrgsObasTable.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    UniqueExtendOrgsObasTable.prototype.AddChildTable = function (childTable) {
        this.UniqHelper.AddChildTable(childTable);
    };
    UniqueExtendOrgsObasTable.prototype.AddOrg = function (orgKey) {
        this.UniqHelper.AddElement(orgKey);
    };
    UniqueExtendOrgsObasTable.prototype.DeleteOrg = function (orgKey) {
        this.UniqHelper.DeleteElement(orgKey);
    };
    UniqueExtendOrgsObasTable.prototype.GetRecordKey = function (keys, addIfNotExists) {
        if (addIfNotExists === void 0) { addIfNotExists = false; }
        return this.Document.CommonRules.GetValueByKeys(this, this.KeyFieldIds, keys.ToArray(), this.RecordKey.Id, addIfNotExists);
    };
    UniqueExtendOrgsObasTable.prototype.GetKeys = function (orgKey) {
        if (orgKey === void 0) { orgKey = this.Org.ForeignKey.Value; }
        if (this._keys == null) {
            this._keys = new OrgObasTableKeys(orgKey);
        }
        else {
            this._keys.OrgKey = orgKey;
        }
        return this._keys;
    };
    return UniqueExtendOrgsObasTable;
}(UniqueOrgsObasTable));
var UniqueTypedOrgsObasTable = (function (_super) {
    __extends(UniqueTypedOrgsObasTable, _super);
    function UniqueTypedOrgsObasTable(id, _document, keyFields) {
        if (keyFields === void 0) { keyFields = ["Organization_ID", "AuthorityType_ID"]; }
        var _this = _super.call(this, id, keyFields) || this;
        _this._document = _document;
        _this._orgTypeField = null;
        _this._uniqHelper = null;
        return _this;
    }
    Object.defineProperty(UniqueTypedOrgsObasTable.prototype, "UniqHelper", {
        get: function () {
            if (this._uniqHelper == null) {
                this._uniqHelper = new UniqueObasTable(this.Id, this.Document, this.KeyFieldIds);
            }
            return this._uniqHelper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UniqueTypedOrgsObasTable.prototype, "Document", {
        get: function () {
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UniqueTypedOrgsObasTable.prototype, "AuthorityType", {
        get: function () {
            if (this._orgTypeField == null) {
                this._orgTypeField = new ObasSprTableField(ObasTableCollection.AuthorityTypeTable, this);
            }
            return this._orgTypeField;
        },
        enumerable: true,
        configurable: true
    });
    UniqueTypedOrgsObasTable.prototype.AddChildTable = function (childTable) {
        this.UniqHelper.AddChildTable(childTable);
    };
    UniqueTypedOrgsObasTable.prototype.AddOrg = function (orgKey, authKey) {
        this.UniqHelper.AddElement(orgKey, authKey);
    };
    UniqueTypedOrgsObasTable.prototype.DeleteOrg = function (orgKey, authKey) {
        this.UniqHelper.DeleteElement(orgKey, authKey);
    };
    return UniqueTypedOrgsObasTable;
}(UniqueOrgsObasTable));
var PartUniqueTypedOrgsObasTable = (function (_super) {
    __extends(PartUniqueTypedOrgsObasTable, _super);
    function PartUniqueTypedOrgsObasTable(id, document, _parentTable, keyFields) {
        if (_parentTable === void 0) { _parentTable = document.UniqueOrgsTable; }
        if (keyFields === void 0) { keyFields = _parentTable.KeyFieldIds; }
        var _this = _super.call(this, id, document, keyFields) || this;
        _this._parentTable = _parentTable;
        _this._orgKey = null;
        _this._authTypeKey = null;
        _parentTable.AddChildTable(_this);
        return _this;
    }
    Object.defineProperty(PartUniqueTypedOrgsObasTable.prototype, "ParentTable", {
        get: function () {
            this._parentTable.LocateByKeys([this.Org.ForeignKey.Value, this.AuthorityType.ForeignKey.Value]);
            return this._parentTable;
        },
        enumerable: true,
        configurable: true
    });
    PartUniqueTypedOrgsObasTable.prototype.AddOrg = function (orgKey, authKey) {
        _super.prototype.AddOrg.call(this, orgKey, authKey);
        this._parentTable.AddOrg(orgKey, authKey);
    };
    PartUniqueTypedOrgsObasTable.prototype.DeleteOrg = function (orgKey, authKey) {
        _super.prototype.DeleteOrg.call(this, orgKey, authKey);
        this._parentTable.DeleteOrg(orgKey, authKey);
    };
    PartUniqueTypedOrgsObasTable.prototype.DeleteEventHandler = function (tableId) {
        this._orgKey = this.Org.ForeignKey.Value;
        this._authTypeKey = this.AuthorityType.ForeignKey.Value;
    };
    PartUniqueTypedOrgsObasTable.prototype.AfterDeleteEventHandler = function (tableId, orgKey, authKey) {
        if (orgKey === void 0) { orgKey = this._orgKey; }
        if (authKey === void 0) { authKey = this._authTypeKey; }
        this._parentTable.DeleteOrg(orgKey, authKey);
    };
    PartUniqueTypedOrgsObasTable.prototype.UniqKeyChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var orgField = this.Org.ForeignKey;
        var authField = this.AuthorityType.ForeignKey;
        var orgKey = orgField.Value;
        var authKey = authField.Value;
        var oldOrgKey = fieldId === orgField.Id ? oldValue : orgKey;
        var oldAuthKey = fieldId === authField.Id ? oldValue : authKey;
        this.AfterDeleteEventHandler(tableId, oldOrgKey, oldAuthKey);
        this._parentTable.AddOrg(orgKey, authKey);
    };
    return PartUniqueTypedOrgsObasTable;
}(UniqueTypedOrgsObasTable));
var PartUniqueOrgsObasTable = (function (_super) {
    __extends(PartUniqueOrgsObasTable, _super);
    function PartUniqueOrgsObasTable(id, document, _parentTable, keyFields) {
        if (_parentTable === void 0) { _parentTable = document.UniqueOrgsTable; }
        if (keyFields === void 0) { keyFields = _parentTable.KeyFieldIds; }
        var _this = _super.call(this, id, document, keyFields) || this;
        _this._parentTable = _parentTable;
        _this._orgKey = null;
        _parentTable.AddChildTable(_this);
        return _this;
    }
    Object.defineProperty(PartUniqueOrgsObasTable.prototype, "ParentTable", {
        get: function () {
            this._parentTable.LocateByKeys([this.Org.ForeignKey.Value]);
            return this._parentTable;
        },
        enumerable: true,
        configurable: true
    });
    PartUniqueOrgsObasTable.prototype.AddOrg = function (orgKey) {
        _super.prototype.AddOrg.call(this, orgKey);
        this._parentTable.AddOrg(orgKey);
    };
    PartUniqueOrgsObasTable.prototype.DeleteOrg = function (orgKey) {
        _super.prototype.DeleteOrg.call(this, orgKey);
        this._parentTable.DeleteOrg(orgKey);
    };
    PartUniqueOrgsObasTable.prototype.DeleteEventHandler = function (tableId) {
        this._orgKey = this.Org.ForeignKey.Value;
    };
    PartUniqueOrgsObasTable.prototype.AfterDeleteEventHandler = function (tableId, orgKey) {
        if (orgKey === void 0) { orgKey = this._orgKey; }
        this._parentTable.DeleteOrg(orgKey);
    };
    PartUniqueOrgsObasTable.prototype.UniqKeyChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.AfterDeleteEventHandler(tableId, oldValue);
        this._parentTable.AddOrg(newValue);
    };
    return PartUniqueOrgsObasTable;
}(UniqueExtendOrgsObasTable));
var MainParametersTable = (function (_super) {
    __extends(MainParametersTable, _super);
    function MainParametersTable(_document) {
        var _this = _super.call(this, "MainParameters") || this;
        _this._document = _document;
        _this._fileType = null;
        _this._csr = null;
        return _this;
    }
    Object.defineProperty(MainParametersTable.prototype, "Csr", {
        get: function () {
            if (this._csr == null) {
                this._csr = new ObasSprTableFieldTyped(ObasTableCollection.CsrTable, this);
            }
            return this._csr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainParametersTable.prototype, "ObasVersion", {
        get: function () {
            if (this._obasVersion == null) {
                this._obasVersion = new ObasForeignKeyTableFieldTyped(ObasTableCollection.RroObasVersionsTable, this);
            }
            return this._obasVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainParametersTable.prototype, "FileType", {
        get: function () {
            if (this._fileType == null) {
                this._fileType = new ObasForeignKeyTableFieldTyped(ObasTableCollection.FileTypeTable, this);
            }
            return this._fileType;
        },
        enumerable: true,
        configurable: true
    });
    return MainParametersTable;
}(ObasTableWithKbkData));
var FormParametersTable = (function (_super) {
    __extends(FormParametersTable, _super);
    function FormParametersTable(_document, _sourceFilePath, idPostfix) {
        var _this = _super.call(this, "" + FormParametersTable.Id + (idPostfix == null ? "" : idPostfix), [BaseObasTableFields.RecordKeyField.Id], true) || this;
        _this._document = _document;
        _this._sourceFilePath = _sourceFilePath;
        _this._totalTable = null;
        _this._analyticsTable = null;
        _this._kosguTable = null;
        if (_this._sourceFilePath != null) {
            _document.LoadTableFromFile(_this._sourceFilePath, FormParametersTable.Id, "" + FormParametersTable.Id + (idPostfix == null ? "" : idPostfix));
        }
        return _this;
    }
    Object.defineProperty(FormParametersTable.prototype, "TotalTable", {
        get: function () {
            if (this._totalTable == null) {
                this._totalTable = this.InitTable("TableNameWithTotals");
            }
            return this._totalTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormParametersTable.prototype, "AnalyticsTable", {
        get: function () {
            if (this._analyticsTable == null) {
                this._analyticsTable = this.InitTable("AnalyticsTable");
            }
            return this._analyticsTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormParametersTable.prototype, "KosguTable", {
        get: function () {
            if (this._kosguTable == null) {
                this._kosguTable = this.InitTable("TableWithKOSGU");
            }
            return this._kosguTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormParametersTable.prototype, "IsSecretForm", {
        get: function () {
            return this.GetFieldValue("FormSecretType") === 1;
        },
        enumerable: true,
        configurable: true
    });
    FormParametersTable.prototype.InitTable = function (fieldId) {
        var table;
        if (this._sourceFilePath == null) {
            table = this._document.Tables.getValue(this.GetFieldValue(fieldId));
        }
        else {
            var srcId = this.GetFieldValue(fieldId);
            if (this._idPostfix != null) {
                table = this._document.LoadTableFromFile(this._sourceFilePath, srcId, srcId + this._idPostfix);
            }
            else {
                table = this._document.LoadTableFromFile(this._sourceFilePath, srcId);
            }
        }
        return table;
    };
    return FormParametersTable;
}(ObasTable));
FormParametersTable.Id = "FormParameters";
var NpaRequisitesFields = (function () {
    function NpaRequisitesFields(_tableRef, _numField, _nameField, _dateField, _typeField) {
        if (_numField === void 0) { _numField = "NpaNumber"; }
        if (_nameField === void 0) { _nameField = "NpaName"; }
        if (_dateField === void 0) { _dateField = "NpaDate"; }
        this._tableRef = _tableRef;
        this._numField = _numField;
        this._nameField = _nameField;
        this._dateField = _dateField;
        this._typeField = _typeField;
        this._npaType = null;
        this._npaDate = null;
        this._npaName = null;
        this._npaNumber = null;
    }
    Object.defineProperty(NpaRequisitesFields.prototype, "TableRef", {
        get: function () {
            return this._tableRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaRequisitesFields.prototype, "NpaType", {
        get: function () {
            if (this._npaType == null) {
                this._npaType = new ObasSprTableField(ObasTableCollection.NpaTypeTable, this._tableRef, this._typeField);
            }
            return this._npaType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaRequisitesFields.prototype, "NpaNumber", {
        get: function () {
            if (this._npaNumber == null) {
                this._npaNumber = new ObasTableField(this._numField, this._tableRef);
            }
            return this._npaNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaRequisitesFields.prototype, "NpaName", {
        get: function () {
            if (this._npaName == null) {
                this._npaName = new ObasTableField(this._nameField, this._tableRef);
            }
            return this._npaName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaRequisitesFields.prototype, "NpaDate", {
        get: function () {
            if (this._npaDate == null) {
                this._npaDate = new ObasTableField(this._dateField, this._tableRef);
            }
            return this._npaDate;
        },
        enumerable: true,
        configurable: true
    });
    NpaRequisitesFields.prototype.HasData = function () {
        return !(this.NpaType.ForeignKey.Value == null ||
            this.NpaDate.Value == null ||
            this.NpaNumber.Value == null ||
            this.NpaName.Value == null);
    };
    NpaRequisitesFields.prototype.CopyData = function (src) {
        this.NpaType.ForeignKey.Value = src.NpaType.ForeignKey.Value;
        this.NpaDate.Value = src.NpaDate.Value;
        this.NpaNumber.Value = src.NpaNumber.Value;
        this.NpaName.Value = src.NpaName.Value;
    };
    NpaRequisitesFields.prototype.DefferedCopyData = function (src) {
        this.NpaType.ForeignKey.DefferedSetValue(src.NpaType.ForeignKey.Value);
        this.NpaDate.DefferedSetValue(src.NpaDate.Value);
        this.NpaNumber.DefferedSetValue(src.NpaNumber.Value);
        this.NpaName.DefferedSetValue(src.NpaName.Value);
    };
    return NpaRequisitesFields;
}());
var PrfNpaRequisitesFields = (function (_super) {
    __extends(PrfNpaRequisitesFields, _super);
    function PrfNpaRequisitesFields() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._prfCode = null;
        _this._prfName = null;
        return _this;
    }
    Object.defineProperty(PrfNpaRequisitesFields.prototype, "PrfName", {
        get: function () {
            if (this._prfName == null) {
                this._prfName = new ObasTableField("PrfName", this.TableRef);
            }
            return this._prfName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrfNpaRequisitesFields.prototype, "PrfCode", {
        get: function () {
            if (this._prfCode == null) {
                this._prfCode = new ObasTableField("PrfCode", this.TableRef);
            }
            return this._prfCode;
        },
        enumerable: true,
        configurable: true
    });
    PrfNpaRequisitesFields.prototype.HasData = function () {
        return !(this.PrfName.Value == null ||
            this.PrfCode.Value == null) &&
            _super.prototype.HasData.call(this);
    };
    PrfNpaRequisitesFields.prototype.CopyData = function (src) {
        this.PrfName.Value = src.PrfName.Value;
        this.PrfCode.Value = src.PrfCode.Value;
        _super.prototype.CopyData.call(this, src);
    };
    PrfNpaRequisitesFields.prototype.DefferedCopyData = function (src) {
        this.PrfName.DefferedSetValue(src.PrfName.Value);
        this.PrfCode.DefferedSetValue(src.PrfCode.Value);
        _super.prototype.DefferedCopyData.call(this, src);
    };
    return PrfNpaRequisitesFields;
}(NpaRequisitesFields));
var NpaLinkFields = (function () {
    function NpaLinkFields(_tableRef, _prefix) {
        if (_prefix === void 0) { _prefix = "Npa"; }
        this._tableRef = _tableRef;
        this._prefix = _prefix;
        this._section = null;
        this._article = null;
        this._item = null;
        this._subItem = null;
        this._paragraph = null;
    }
    Object.defineProperty(NpaLinkFields.prototype, "TableRef", {
        get: function () {
            return this._tableRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaLinkFields.prototype, "Paragraph", {
        get: function () {
            if (this._paragraph == null) {
                this._paragraph = new ObasTableField(this._prefix + "Paragraph", this._tableRef);
            }
            return this._paragraph;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaLinkFields.prototype, "SubItem", {
        get: function () {
            if (this._subItem == null) {
                this._subItem = new ObasTableField(this._prefix + "SubItem", this._tableRef);
            }
            return this._subItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaLinkFields.prototype, "Item", {
        get: function () {
            if (this._item == null) {
                this._item = new ObasTableField(this._prefix + "Item", this._tableRef);
            }
            return this._item;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaLinkFields.prototype, "Article", {
        get: function () {
            if (this._article == null) {
                this._article = new ObasTableField(this._prefix + "Article", this._tableRef);
            }
            return this._article;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaLinkFields.prototype, "Section", {
        get: function () {
            if (this._section == null) {
                this._section = new ObasTableField(this._prefix + "Section", this._tableRef);
            }
            return this._section;
        },
        enumerable: true,
        configurable: true
    });
    NpaLinkFields.prototype.CopyData = function (src) {
        this.Paragraph.Value = src.Paragraph.Value;
        this.SubItem.Value = src.SubItem.Value;
        this.Item.Value = src.Item.Value;
        this.Article.Value = src.Article.Value;
        this.Section.Value = src.Section.Value;
    };
    NpaLinkFields.prototype.DefferedCopyData = function (src) {
        this.Paragraph.DefferedSetValue(src.Paragraph.Value);
        this.SubItem.DefferedSetValue(src.SubItem.Value);
        this.Item.DefferedSetValue(src.Item.Value);
        this.Article.DefferedSetValue(src.Article.Value);
        this.Section.DefferedSetValue(src.Section.Value);
    };
    return NpaLinkFields;
}());
var EndingNpaLinkFields = (function (_super) {
    __extends(EndingNpaLinkFields, _super);
    function EndingNpaLinkFields() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._endDate = null;
        return _this;
    }
    Object.defineProperty(EndingNpaLinkFields.prototype, "EndDate", {
        get: function () {
            if (this._endDate == null) {
                this._endDate = new ObasTableField(this._prefix + "DateFinish", this.TableRef);
            }
            return this._endDate;
        },
        enumerable: true,
        configurable: true
    });
    EndingNpaLinkFields.prototype.CopyData = function (src) {
        this.EndDate.Value = src.EndDate.Value;
        _super.prototype.CopyData.call(this, src);
    };
    EndingNpaLinkFields.prototype.DefferedCopyData = function (src) {
        this.EndDate.DefferedSetValue(src.EndDate.Value);
        _super.prototype.DefferedCopyData.call(this, src);
    };
    return EndingNpaLinkFields;
}(NpaLinkFields));
var NpaObasTable = (function (_super) {
    __extends(NpaObasTable, _super);
    function NpaObasTable(id, _numField, _nameField, _dateField) {
        if (_numField === void 0) { _numField = "NpaNumber"; }
        if (_nameField === void 0) { _nameField = "NpaName"; }
        if (_dateField === void 0) { _dateField = "NpaDate"; }
        var _this = _super.call(this, id) || this;
        _this._numField = _numField;
        _this._nameField = _nameField;
        _this._dateField = _dateField;
        _this._npaFields = null;
        return _this;
    }
    Object.defineProperty(NpaObasTable.prototype, "NpaFields", {
        get: function () {
            if (this._npaFields == null) {
                this._npaFields = new NpaRequisitesFields(this, this._numField, this._nameField, this._dateField);
            }
            return this._npaFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaObasTable.prototype, "NpaType", {
        get: function () {
            return this.NpaFields.NpaType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaObasTable.prototype, "NpaNumber", {
        get: function () {
            return this.NpaFields.NpaNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaObasTable.prototype, "NpaName", {
        get: function () {
            return this.NpaFields.NpaName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaObasTable.prototype, "NpaDate", {
        get: function () {
            return this.NpaFields.NpaDate;
        },
        enumerable: true,
        configurable: true
    });
    return NpaObasTable;
}(ObasTable));
var ExtendedNpaObasTable = (function (_super) {
    __extends(ExtendedNpaObasTable, _super);
    function ExtendedNpaObasTable(id, _changeDateField, numField, nameField, dateField) {
        if (_changeDateField === void 0) { _changeDateField = "NpaChangeDate"; }
        var _this = _super.call(this, id, numField, nameField, dateField) || this;
        _this._changeDateField = _changeDateField;
        _this._npaSphere = null;
        _this._npaStatus = null;
        _this._npsStatusChangeDate = null;
        return _this;
    }
    Object.defineProperty(ExtendedNpaObasTable.prototype, "NpaStatusChangeDate", {
        get: function () {
            if (this._npsStatusChangeDate == null) {
                this._npsStatusChangeDate = new ObasTableField(this._changeDateField, this);
            }
            return this._npsStatusChangeDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtendedNpaObasTable.prototype, "NpaStatus", {
        get: function () {
            if (this._npaStatus == null) {
                this._npaStatus = new ObasSprTableField(ObasTableCollection.NpaStatusesSprTable, this);
            }
            return this._npaStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtendedNpaObasTable.prototype, "NpaSphere", {
        get: function () {
            if (this._npaSphere == null) {
                this._npaSphere = new ObasSprTableField(ObasTableCollection.NpaRegSpheresSprTable, this);
            }
            return this._npaSphere;
        },
        enumerable: true,
        configurable: true
    });
    return ExtendedNpaObasTable;
}(NpaObasTable));
var NpaTableWithParent = (function (_super) {
    __extends(NpaTableWithParent, _super);
    function NpaTableWithParent(id, _parentTable, changeDateField, numField, nameField, dateField) {
        var _this = _super.call(this, id, changeDateField, numField, nameField, dateField) || this;
        _this._parentTable = _parentTable;
        _this._ownerKey = null;
        _this._parentTable.AddTableAddListener(function () { _this.CreateRow(); });
        return _this;
    }
    Object.defineProperty(NpaTableWithParent.prototype, "ParentTable", {
        get: function () {
            return this._parentTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpaTableWithParent.prototype, "OwnerKey", {
        get: function () {
            if (this._ownerKey == null) {
                this._ownerKey = new ObasForeignKeyTableFieldTyped(this._parentTable, this, BaseObasTableFields.OwnerKeyField.Id, false);
            }
            return this._ownerKey;
        },
        enumerable: true,
        configurable: true
    });
    NpaTableWithParent.prototype.CreateRow = function () {
        this.AddRow();
        this.PostRow();
    };
    return NpaTableWithParent;
}(ExtendedNpaObasTable));
