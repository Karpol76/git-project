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
var F02110;
(function (F02110) {
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "KosguIdField", {
            get: function () {
                if (this._kosguIdField == null) {
                    this._kosguIdField = new BaseObasTableField("KOSGU_ID", false);
                }
                return this._kosguIdField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "KosguCodeField", {
            get: function () {
                if (this._KosguCodeField == null) {
                    this._KosguCodeField = new BaseObasTableField("KOSGU_Code", false);
                }
                return this._KosguCodeField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "OtherRubField", {
            get: function () {
                if (this._otherRubField == null) {
                    this._otherRubField = new BaseGenericObasTableField("Other_Rub_Y");
                }
                return this._otherRubField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "OtherRubR1Field", {
            get: function () {
                if (this._otherRubR1Field == null) {
                    this._otherRubR1Field = new BaseGenericObasTableField("Other_Rub_R1_Y");
                }
                return this._otherRubR1Field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "YearDataR1Field", {
            get: function () {
                if (this._yearDataR1Field == null) {
                    this._yearDataR1Field = new BaseGenericObasTableField("Y_R1_");
                }
                return this._yearDataR1Field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "RubYearR1DataField", {
            get: function () {
                if (this._rubYearR1DataField == null) {
                    this._rubYearR1DataField = new BaseGenericObasTableField("Rub_R1_Y");
                }
                return this._rubYearR1DataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "UsdYearR1DataField", {
            get: function () {
                if (this._usdYearR1DataField == null) {
                    this._usdYearR1DataField = new BaseGenericObasTableField("Usd_R1_Y");
                }
                return this._usdYearR1DataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "OtherRubR3Field", {
            get: function () {
                if (this._otherRubR3Field == null) {
                    this._otherRubR3Field = new BaseGenericObasTableField("Other_Rub_R3_Y");
                }
                return this._otherRubR3Field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "YearDataR3Field", {
            get: function () {
                if (this._yearDataR3Field == null) {
                    this._yearDataR3Field = new BaseGenericObasTableField("Y_R3_");
                }
                return this._yearDataR3Field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "RubYearR3DataField", {
            get: function () {
                if (this._rubYearR3DataField == null) {
                    this._rubYearR3DataField = new BaseGenericObasTableField("Rub_R3_Y");
                }
                return this._rubYearR3DataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "UsdYearR3DataField", {
            get: function () {
                if (this._usdYearR3DataField == null) {
                    this._usdYearR3DataField = new BaseGenericObasTableField("Usd_R3_Y");
                }
                return this._usdYearR3DataField;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._otherRubField = null;
    ObasTableFields._otherRubR1Field = null;
    ObasTableFields._yearDataR1Field = null;
    ObasTableFields._rubYearR1DataField = null;
    ObasTableFields._usdYearR1DataField = null;
    ObasTableFields._otherRubR3Field = null;
    ObasTableFields._yearDataR3Field = null;
    ObasTableFields._rubYearR3DataField = null;
    ObasTableFields._usdYearR3DataField = null;
    ObasTableFields._KosguCodeField = null;
    ObasTableFields._kosguIdField = null;
    F02110.ObasTableFields = ObasTableFields;
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F02110.TableRules = TableRules;
    var StrKeysP1;
    (function (StrKeysP1) {
        StrKeysP1[StrKeysP1["Total"] = 1] = "Total";
        StrKeysP1[StrKeysP1["P2"] = 2] = "P2";
        StrKeysP1[StrKeysP1["P3"] = 3] = "P3";
    })(StrKeysP1 = F02110.StrKeysP1 || (F02110.StrKeysP1 = {}));
    var FObasTableP1Total = (function (_super) {
        __extends(FObasTableP1Total, _super);
        function FObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1.Total;
        };
        FObasTableP1Total.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return FObasTableP1Total;
    }(P1TotalObasTable));
    F02110.FObasTableP1Total = FObasTableP1Total;
    var PartKosguTableKeys = (function (_super) {
        __extends(PartKosguTableKeys, _super);
        function PartKosguTableKeys(KosguKey, FeatureKey) {
            var _this = _super.call(this) || this;
            _this.KosguKey = KosguKey;
            _this.FeatureKey = FeatureKey;
            return _this;
        }
        return PartKosguTableKeys;
    }(ObasTableKeys));
    F02110.PartKosguTableKeys = PartKosguTableKeys;
    var PartTableWithKosgu = (function (_super) {
        __extends(PartTableWithKosgu, _super);
        function PartTableWithKosgu(id, document) {
            var _this = _super.call(this, id, ["KOSGU_ID", "AddAnalysisFeature_ID"], document) || this;
            _this._kosgu = null;
            _this._analysisFeature = null;
            return _this;
        }
        Object.defineProperty(PartTableWithKosgu.prototype, "AnalysisFeature", {
            get: function () {
                if (this._analysisFeature == null) {
                    this._analysisFeature = new ObasSprTableField(ObasTableCollection.AddAnalysisFeatureSprtable, this);
                }
                return this._analysisFeature;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartTableWithKosgu.prototype, "Kosgu", {
            get: function () {
                if (this._kosgu == null) {
                    this._kosgu = new ObasSprTableField(ObasTableCollection.KosguSprTable, this);
                }
                return this._kosgu;
            },
            enumerable: true,
            configurable: true
        });
        PartTableWithKosgu.prototype.GetKeys = function (kosguKey, featureKey) {
            if (kosguKey === void 0) { kosguKey = this.Kosgu.ForeignKey.Value; }
            if (featureKey === void 0) { featureKey = this.AnalysisFeature.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new PartKosguTableKeys(kosguKey, featureKey);
            }
            else {
                this._keys.KosguKey = kosguKey;
                this._keys.FeatureKey = featureKey;
            }
            return this._keys;
        };
        return PartTableWithKosgu;
    }(ObasTableWithKeys));
    F02110.PartTableWithKosgu = PartTableWithKosgu;
    var PartOkpdTable = (function (_super) {
        __extends(PartOkpdTable, _super);
        function PartOkpdTable(id, _parent) {
            var _this = _super.call(this, id) || this;
            _this._parent = _parent;
            _this._ownerKey = null;
            _this._okpd = null;
            return _this;
        }
        Object.defineProperty(PartOkpdTable.prototype, "ParentTable", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOkpdTable.prototype, "IsOkpd", {
            get: function () {
                return this.Okpd.ForeignKey.Value != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOkpdTable.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this
                        ._ownerKey = new ObasForeignKeyTableFieldTyped(this._parent, this, BaseObasTableFields.OwnerKeyField.Id, false);
                }
                return this._ownerKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOkpdTable.prototype, "Okpd", {
            get: function () {
                if (this._okpd == null) {
                    this._okpd = new ObasSprTableField(ObasTableCollection.OkpdSprTable, this);
                }
                return this._okpd;
            },
            enumerable: true,
            configurable: true
        });
        PartOkpdTable.prototype.CalcCode = function () {
            if (this.IsOkpd) {
                return this.Okpd.Code;
            }
            else {
                return this.Code.Value;
            }
        };
        PartOkpdTable.prototype.CalcName = function () {
            if (this.IsOkpd) {
                return this.Okpd.Name;
            }
            else {
                return this.Name.Value;
            }
        };
        Object.defineProperty(PartOkpdTable.prototype, "Document", {
            get: function () {
                return this._parent.Document;
            },
            enumerable: true,
            configurable: true
        });
        PartOkpdTable.prototype.GetRecordKey = function (ownerKey, okpdCode, okpdName, addIfNotExists) {
            if (addIfNotExists === void 0) { addIfNotExists = false; }
            var okpdKey = this.Okpd.SprTable.LookupKeyByCode(okpdCode);
            if (okpdKey == null) {
                return this.Document.CommonRules.GetValueByKeys(this, [this.OwnerKey.Id, this.Code.Id, this.Name.Id], [ownerKey, okpdCode, okpdName], this.RecordKey.Id, addIfNotExists);
            }
            else {
                return this.Document.CommonRules.GetValueByKeys(this, [this.OwnerKey.Id, this.Okpd.ForeignKey.Id], [ownerKey, okpdKey], this.RecordKey.Id, addIfNotExists);
            }
        };
        return PartOkpdTable;
    }(SprTable));
    F02110.PartOkpdTable = PartOkpdTable;
    var PartObjectDataTable = (function (_super) {
        __extends(PartObjectDataTable, _super);
        function PartObjectDataTable(id, document, parentTable, _descTable, _p1Table, _p1StrKey) {
            var _this = _super.call(this, id, document, parentTable) || this;
            _this._descTable = _descTable;
            _this._p1Table = _p1Table;
            _this._p1StrKey = _p1StrKey;
            _this._object = null;
            _this._year = null;
            _this._dataTable = null;
            _this._copyFields = null;
            _this._descTable.AddChild(_this);
            return _this;
        }
        Object.defineProperty(PartObjectDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Object];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartObjectDataTable.prototype, "DataTable", {
            get: function () {
                if (this._dataTable == null) {
                    this._dataTable = new PartOkpdDataTable(this.Id, this.ParentTable.ParentTable, this.Document.P1TotalTable, null);
                }
                return this._dataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartObjectDataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartObjectDataTable.prototype, "Object", {
            get: function () {
                if (this._object == null) {
                    this._object = new ObasTableField("PurchaseObjects_ID", this);
                }
                return this._object;
            },
            enumerable: true,
            configurable: true
        });
        PartObjectDataTable.prototype.ObjectChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.AfterDeleteEventHandler(this.Id, oldValue);
            this._descTable.AddObject(newValue);
        };
        PartObjectDataTable.prototype.DeleteEventHandler = function (tableId) {
            this._objKey = this.Object.Value;
        };
        PartObjectDataTable.prototype.AfterDeleteEventHandler = function (tableId, objKey) {
            if (objKey === void 0) { objKey = this._objKey; }
            this._descTable.DeleteObject(objKey);
        };
        PartObjectDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.DataTable.CopyData(srcYear, destYear);
        };
        PartObjectDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PartObjectDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        PartObjectDataTable.prototype.ResetData = function () {
            this.DataTable.ResetData();
        };
        PartObjectDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._p1Table.SetSumByKeys(fieldId, this._p1Table.GetKeys(this._p1StrKey), oldValue, newValue);
        };
        return PartObjectDataTable;
    }(ObasTableWithSimpleKeysParent));
    F02110.PartObjectDataTable = PartObjectDataTable;
    var ObjectDescTable = (function (_super) {
        __extends(ObjectDescTable, _super);
        function ObjectDescTable(id, _document) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._object = null;
            _this._childs = [];
            _this._npaGroup = null;
            _this._program = null;
            _this._action = null;
            _this._result = null;
            _this._rationale = null;
            _this._info = null;
            return _this;
        }
        Object.defineProperty(ObjectDescTable.prototype, "Info", {
            get: function () {
                if (this._info == null) {
                    this._info = new ObasTableField("Info", this);
                }
                return this._info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectDescTable.prototype, "Rationale", {
            get: function () {
                if (this._rationale == null) {
                    this._rationale = new ObasTableField("Rationale", this);
                }
                return this._rationale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectDescTable.prototype, "Result", {
            get: function () {
                if (this._result == null) {
                    this._result = new ObasTableField("Result", this);
                }
                return this._result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectDescTable.prototype, "Action", {
            get: function () {
                if (this._action == null) {
                    this._action = new ObasTableField("ActionName", this);
                }
                return this._action;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectDescTable.prototype, "Program", {
            get: function () {
                if (this._program == null) {
                    this._program = new ObasTableField("ProgName", this);
                }
                return this._program;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectDescTable.prototype, "NpaGroup", {
            get: function () {
                if (this._npaGroup == null) {
                    this._npaGroup = new ObasSprTableField(ObasTableCollection.SubgroupNormativeExpensesSprTable, this);
                }
                return this._npaGroup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectDescTable.prototype, "Object", {
            get: function () {
                if (this._object == null) {
                    this
                        ._object = new ObasForeignKeyTableFieldTyped(this._document
                        .PurchaseObjectsSprTable, this, "PurchaseObjects_ID", false);
                }
                return this._object;
            },
            enumerable: true,
            configurable: true
        });
        ObjectDescTable.prototype.AddChild = function (child) {
            var childId = child.Id;
            if (this._childs.indexOf(childId) === -1) {
                this._childs.push(childId);
            }
        };
        ObjectDescTable.prototype.IsObjectExists = function (objKey) {
            return this.Locate(this.Object.Id, objKey);
        };
        ObjectDescTable.prototype.AddObject = function (objKey) {
            this._document.CommonRules.AddNewLink(this.Id, [this.Object.Id], [objKey]);
        };
        ObjectDescTable.prototype.DeleteObject = function (objKey) {
            this._document.CommonRules.DeleteOldLink(this.Id, this._childs, [this.Object.Id], [objKey]);
        };
        ObjectDescTable.prototype.GetRecordKey = function (objKey, addIfNotExists) {
            if (addIfNotExists === void 0) { addIfNotExists = false; }
            return this._document.CommonRules.GetValueByKeys(this, [this.Object.Id], [objKey], this.RecordKey.Id, addIfNotExists);
        };
        return ObjectDescTable;
    }(ObasTable));
    F02110.ObjectDescTable = ObjectDescTable;
    var PartOkpdDataTable = (function (_super) {
        __extends(PartOkpdDataTable, _super);
        function PartOkpdDataTable(id, parent, _p1Table, _p1StrKey) {
            var _this = _super.call(this, id, parent) || this;
            _this._p1Table = _p1Table;
            _this._p1StrKey = _p1StrKey;
            _this._year = null;
            _this._copyFields = null;
            _this._document = _p1Table.Document;
            return _this;
        }
        Object.defineProperty(PartOkpdDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Okpd.ForeignKey];
                    var yearField_2 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_2.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOkpdDataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOkpdDataTable.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        PartOkpdDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._p1Table.SetSumByKeys(fieldId, this._p1Table.GetKeys(this._p1StrKey), oldValue, newValue);
        };
        PartOkpdDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            this.Document.IterateByYears(function (i) {
                _this.SetFieldValue(yearField.GenerateId(i), 0);
            });
        };
        PartOkpdDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        PartOkpdDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        PartOkpdDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PartOkpdDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return PartOkpdDataTable;
    }(PartOkpdTable));
    F02110.PartOkpdDataTable = PartOkpdDataTable;
    var Part3OkpdTable = (function (_super) {
        __extends(Part3OkpdTable, _super);
        function Part3OkpdTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dollarInfo = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(Part3OkpdTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Okpd.ForeignKey];
                    var usdField_1 = BaseObasTableFields.UsdYearDataField;
                    var otherField_1 = ObasTableFields.OtherRubField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(usdField_1.GenerateTableField(_this, yearIndex));
                        _this._copyFields.push(otherField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Part3OkpdTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (fieldId.indexOf("R1") !== -1) {
                this.SetFieldValue(ObasTableFields.YearDataR1Field.GenerateId(fieldId), (this.GetFieldValue(ObasTableFields.RubYearR1DataField.GenerateId(fieldId)) || 0) +
                    (this.GetFieldValue(ObasTableFields.OtherRubR1Field.GenerateId(fieldId)) || 0));
            }
            else {
                if (fieldId.indexOf("R3") !== -1) {
                    this.SetFieldValue(ObasTableFields.YearDataR3Field.GenerateId(fieldId), (this.GetFieldValue(ObasTableFields.RubYearR3DataField.GenerateId(fieldId)) || 0) +
                        (this.GetFieldValue(ObasTableFields.OtherRubR3Field.GenerateId(fieldId)) || 0));
                }
                else {
                    this.SetFieldValue(ObasTableFields.YearDataField.GenerateId(fieldId), (this.GetFieldValue(ObasTableFields.RubYearDataField.GenerateId(fieldId)) || 0) +
                        (this.GetFieldValue(ObasTableFields.OtherRubField.GenerateId(fieldId)) || 0));
                }
            }
        };
        Part3OkpdTable.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffSet = ObasHelper.GetYearOffsetById(fieldId);
            var usdValue = this.Document.CommonRules.GetDollarRateByYear(ObasStageSettings.CurrentYear + yearOffSet);
            if (fieldId.indexOf("R1") !== -1) {
                this.SetFieldValue(ObasTableFields.RubYearR1DataField.GenerateId(yearOffSet + 1), usdValue * newValue);
            }
            else {
                if (fieldId.indexOf("R3") !== -1) {
                    this.SetFieldValue(ObasTableFields.RubYearR3DataField.GenerateId(yearOffSet + 1), usdValue * newValue);
                }
                else {
                    this.SetFieldValue(ObasTableFields.RubYearDataField.GenerateId(yearOffSet + 1), usdValue * newValue);
                }
            }
        };
        Object.defineProperty(Part3OkpdTable.prototype, "DollarInfo", {
            get: function () {
                var _this = this;
                if (this._dollarInfo == null) {
                    this._dollarInfo = [];
                    this.Document.IterateByYears(function (i) {
                        _this._dollarInfo.push({
                            Year: ObasStageSettings.CurrentYear + i,
                            DollarFieldId: BaseObasTableFields.UsdYearDataField.GenerateId(i + 1),
                            RubleFieldId: BaseObasTableFields.RubYearDataField.GenerateId(i + 1)
                        });
                    }, false);
                }
                return this._dollarInfo;
            },
            enumerable: true,
            configurable: true
        });
        Part3OkpdTable.prototype.UpdateDollarValues = function () {
            this.Document.CommonRules.UpdateDollarTable(this, this.DollarInfo);
        };
        Part3OkpdTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.UsdYearDataField, ObasTableFields.OtherRubField);
        };
        Part3OkpdTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.UsdYearDataField,
                BaseObasTableFields.RubYearDataField, ObasTableFields.OtherRubField, BaseObasTableFields.YearDataField]);
        };
        return Part3OkpdTable;
    }(PartOkpdDataTable));
    F02110.Part3OkpdTable = Part3OkpdTable;
    var UsdObjectDataTable = (function (_super) {
        __extends(UsdObjectDataTable, _super);
        function UsdObjectDataTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dataTable = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(UsdObjectDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Object];
                    var usdField_2 = BaseObasTableFields.UsdYearDataField;
                    var otherField_2 = ObasTableFields.OtherRubField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(usdField_2.GenerateTableField(_this, yearIndex));
                        _this._copyFields.push(otherField_2.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UsdObjectDataTable.prototype, "DataTable", {
            get: function () {
                if (this._dataTable == null) {
                    this._dataTable = new Part3OkpdTable(this.Id, this.ParentTable.ParentTable, this.Document.P1TotalTable, null);
                }
                return this._dataTable;
            },
            enumerable: true,
            configurable: true
        });
        UsdObjectDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var fieldIdNew = fieldId;
            var index = ObasHelper.GetYearIndexById(fieldId);
            if (index > this.Document.Settings.YearsCount) {
                fieldIdNew = BaseObasTableFields.YearDataField.GenerateId(this.Document.Settings.YearsCount);
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldIdNew);
        };
        return UsdObjectDataTable;
    }(PartObjectDataTable));
    F02110.UsdObjectDataTable = UsdObjectDataTable;
})(F02110 || (F02110 = {}));
