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
var F02242;
(function (F02242) {
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "Part3Field", {
            get: function () {
                if (this._part3Field == null) {
                    this._part3Field = new BaseGenericObasTableField("R3_Y");
                }
                return this._part3Field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "Part1Field", {
            get: function () {
                if (this._part1Field == null) {
                    this._part1Field = new BaseGenericObasTableField("R1_Y");
                }
                return this._part1Field;
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
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._otherRubField = null;
    ObasTableFields._part1Field = null;
    ObasTableFields._part3Field = null;
    F02242.ObasTableFields = ObasTableFields;
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F02242.TableRules = TableRules;
    var StrKeysP1;
    (function (StrKeysP1) {
        StrKeysP1[StrKeysP1["Total"] = 1] = "Total";
    })(StrKeysP1 = F02242.StrKeysP1 || (F02242.StrKeysP1 = {}));
    var ObasTableP1Keys = (function (_super) {
        __extends(ObasTableP1Keys, _super);
        function ObasTableP1Keys(RecKey, strKey) {
            var _this = _super.call(this, strKey) || this;
            _this.RecKey = RecKey;
            return _this;
        }
        return ObasTableP1Keys;
    }(StrObasTableKeys));
    F02242.ObasTableP1Keys = ObasTableP1Keys;
    var ObasTableP1Total = (function (_super) {
        __extends(ObasTableP1Total, _super);
        function ObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1.Total;
        };
        return ObasTableP1Total;
    }(P1TotalObasTable));
    F02242.ObasTableP1Total = ObasTableP1Total;
    var ObasTableOwnerKeys = (function (_super) {
        __extends(ObasTableOwnerKeys, _super);
        function ObasTableOwnerKeys(OwnerKey) {
            var _this = _super.call(this) || this;
            _this.OwnerKey = OwnerKey;
            return _this;
        }
        return ObasTableOwnerKeys;
    }(ObasTableKeys));
    F02242.ObasTableOwnerKeys = ObasTableOwnerKeys;
    var PartTableWithInfo = (function (_super) {
        __extends(PartTableWithInfo, _super);
        function PartTableWithInfo(id) {
            var _this = _super.call(this, id) || this;
            _this._infoCode = null;
            _this._infoType = null;
            _this._infoName = null;
            _this._infoDirection = null;
            return _this;
        }
        Object.defineProperty(PartTableWithInfo.prototype, "InfoCode", {
            get: function () {
                if (this._infoCode == null) {
                    this._infoCode = new ObasTableField("InfoCode", this);
                }
                return this._infoCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartTableWithInfo.prototype, "InfoType", {
            get: function () {
                if (this._infoType == null) {
                    this._infoType = new ObasTableField("InfoType", this);
                }
                return this._infoType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartTableWithInfo.prototype, "InfoName", {
            get: function () {
                if (this._infoName == null) {
                    this._infoName = new ObasTableField("InfoName", this);
                }
                return this._infoName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartTableWithInfo.prototype, "InfoDirection", {
            get: function () {
                if (this._infoDirection == null) {
                    this._infoDirection = new ObasTableField("InfoDirection", this);
                }
                return this._infoDirection;
            },
            enumerable: true,
            configurable: true
        });
        return PartTableWithInfo;
    }(ObasTable));
    F02242.PartTableWithInfo = PartTableWithInfo;
    var PartTableWithKosgu = (function (_super) {
        __extends(PartTableWithKosgu, _super);
        function PartTableWithKosgu(id, _parent) {
            var _this = _super.call(this, id) || this;
            _this._parent = _parent;
            _this._ownerKey = null;
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
        Object.defineProperty(PartTableWithKosgu.prototype, "OwnerKey", {
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
        return PartTableWithKosgu;
    }(ObasTable));
    F02242.PartTableWithKosgu = PartTableWithKosgu;
    var PartOkpdTable = (function (_super) {
        __extends(PartOkpdTable, _super);
        function PartOkpdTable(id, _parent) {
            var _this = _super.call(this, id, ["OwnerKey", "OKPD_ID"]) || this;
            _this._parent = _parent;
            _this._ownerKey = null;
            _this._okpd = null;
            return _this;
        }
        Object.defineProperty(PartOkpdTable.prototype, "IsOkpd", {
            get: function () {
                return this.Okpd.ForeignKey.Value != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOkpdTable.prototype, "ParentTable", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOkpdTable.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this._ownerKey = new ObasForeignKeyTableFieldTyped(this._parent, this, BaseObasTableFields.OwnerKeyField.Id, false);
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
            var okpdKey = this.Okpd.ForeignKey.Value;
            if (okpdKey) {
                return this.Okpd.Code;
            }
            else {
                return this.Code.Value;
            }
        };
        PartOkpdTable.prototype.CalcName = function () {
            var okpdKey = this.Okpd.ForeignKey.Value;
            if (okpdKey) {
                return this.Okpd.Name;
            }
            else {
                return this.Name.Value;
            }
        };
        return PartOkpdTable;
    }(SprTable));
    F02242.PartOkpdTable = PartOkpdTable;
    var PartOkpdP3Table = (function (_super) {
        __extends(PartOkpdP3Table, _super);
        function PartOkpdP3Table(id, parent, _document, _sumP2OkpdTable) {
            if (_sumP2OkpdTable === void 0) { _sumP2OkpdTable = _document.P2OkpdTable; }
            var _this = _super.call(this, id, parent) || this;
            _this._document = _document;
            _this._sumP2OkpdTable = _sumP2OkpdTable;
            _this._okpdParent = null;
            _this._okpdParentKey = null;
            _this._delOwnerKey = null;
            return _this;
        }
        Object.defineProperty(PartOkpdP3Table.prototype, "OkpdParent", {
            get: function () {
                if (this._okpdParent == null) {
                    this._okpdParent = new ObasSprTableField(ObasTableCollection.OkpdSprTable, this, "Parent_OKPD");
                }
                return this._okpdParent;
            },
            enumerable: true,
            configurable: true
        });
        PartOkpdP3Table.prototype.DeleteEventHandler = function (tableId) {
            this._delOwnerKey = this.OwnerKey.Value;
            this._okpdParentKey = this.OkpdParent.ForeignKey.Value;
        };
        PartOkpdP3Table.prototype.AfterDeleteEventHandler = function (tableId) {
            this._document.CommonRules.DeleteOldLink(this._sumP2OkpdTable.Id, [this.Id], ["OwnerKey", "Parent_OKPD_ID"], [this._delOwnerKey, this._okpdParentKey], this._sumP2OkpdTable.KeyFieldIds);
        };
        PartOkpdP3Table.prototype.OkpdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.OkpdParent.ForeignKey.Value = ObasTableCollection.OkpdSprTable
                .LookupKeyByCode(this.Okpd.Code.substr(0, 5));
        };
        return PartOkpdP3Table;
    }(PartOkpdTable));
    F02242.PartOkpdP3Table = PartOkpdP3Table;
    var PartObjectDataTable = (function (_super) {
        __extends(PartObjectDataTable, _super);
        function PartObjectDataTable(id, document, parentTable, _descTable, _sumP2Table) {
            if (_sumP2Table === void 0) { _sumP2Table = document.P2OkpdTable; }
            var _this = _super.call(this, id, document, parentTable) || this;
            _this._descTable = _descTable;
            _this._sumP2Table = _sumP2Table;
            _this._object = null;
            _this._year = null;
            _this._copyFields = null;
            _this._descTable.AddChild(_this);
            parentTable.AddTableAddListener(function () { _this.CreateRow(); });
            return _this;
        }
        Object.defineProperty(PartObjectDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Object, this.Year];
                    var yearField_1 = ObasTableFields.YearDataField;
                    var part1Field_1 = ObasTableFields.Part1Field;
                    var part3Field_1 = ObasTableFields.Part3Field;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(part1Field_1.GenerateTableField(_this, i));
                        _this._copyFields.push(part3Field_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        PartObjectDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        PartObjectDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PartObjectDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.YearDataField, ObasTableFields.Part1Field, ObasTableFields.Part3Field]);
        };
        PartObjectDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.YearDataField, ObasTableFields.Part1Field, ObasTableFields.Part3Field);
        };
        PartObjectDataTable.prototype.CreateRow = function () {
            this.AddRow();
            this.PostRow();
        };
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
        PartObjectDataTable.prototype.ObjectChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.AfterDeleteEventHandler(this.Id, oldValue);
            this._descTable.AddObject(newValue);
        };
        PartObjectDataTable.prototype.DeleteEventHandler = function (tableId) {
            var _this = this;
            this._objKey = this.Object.Value;
            var yearFieldId = BaseObasTableFields.YearField.Id;
            this.YearChangeEventHandler(tableId, this.GetFieldValue(yearFieldId), 0, yearFieldId);
            this.Document.IterateByYears(function (i) {
                var fieldId = BaseObasTableFields.YearDataField.GenerateId(i);
                _this.SumChangeEventHandler(tableId, _this.GetFieldValue(fieldId), 0, fieldId);
            });
        };
        PartObjectDataTable.prototype.AfterDeleteEventHandler = function (tableId, objKey) {
            if (objKey === void 0) { objKey = this._objKey; }
            this._descTable.DeleteObject(objKey);
        };
        Object.defineProperty(PartObjectDataTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        PartObjectDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var parentTable = this.ParentTable;
            this.Document.CommonRules.SetSumByKeys(this._sumP2Table.Id, this._sumP2Table.KeyFieldIds, [parentTable.OwnerKey.Value, parentTable.OkpdParent.ForeignKey.Value], fieldId, oldValue, newValue, true);
            var parentPlanYear = this._sumP2Table.Year.NValue;
            if (parentPlanYear === 0 || parentPlanYear > this.Year.NValue) {
                this.Document.P2OkpdTable.Year.NValue = this.Year.NValue;
            }
        };
        PartObjectDataTable.prototype.YearChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var parentPlanYear = this._sumP2Table.Year.NValue;
            if (this._sumP2Table.Year.Value != null && (parentPlanYear === 0 || parentPlanYear > newValue)) {
                this.Document.P2OkpdTable.Year.NValue = newValue;
            }
        };
        return PartObjectDataTable;
    }(ObasTableWithSimpleKeysParent));
    F02242.PartObjectDataTable = PartObjectDataTable;
    var ObjectDescTable = (function (_super) {
        __extends(ObjectDescTable, _super);
        function ObjectDescTable(id, _document) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._object = null;
            _this._childs = [];
            return _this;
        }
        Object.defineProperty(ObjectDescTable.prototype, "Object", {
            get: function () {
                if (this._object == null) {
                    this._object = new NumberObasTableField("PurchaseObjects_ID", this);
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
        return ObjectDescTable;
    }(ObasTable));
    F02242.ObjectDescTable = ObjectDescTable;
    var PartOkpdDataTable = (function (_super) {
        __extends(PartOkpdDataTable, _super);
        function PartOkpdDataTable(id, parent, _p1Table, _p1StrKey) {
            var _this = _super.call(this, id, parent) || this;
            _this._p1Table = _p1Table;
            _this._p1StrKey = _p1StrKey;
            _this._copyFields = null;
            _this._year = null;
            _this._document = _p1Table.Document;
            return _this;
        }
        PartOkpdDataTable.prototype.CreateRow = function () {
            this.AddRow();
            this.PostRow();
        };
        Object.defineProperty(PartOkpdDataTable.prototype, "Document", {
            get: function () {
                return this._document;
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
        Object.defineProperty(PartOkpdDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Okpd.ForeignKey, this.Year];
                    var yearField_2 = ObasTableFields.YearDataField;
                    this._document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_2.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        PartOkpdDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._p1Table.SetSumByKeys(fieldId, this._p1Table.GetKeys(this._p1StrKey), oldValue, newValue);
        };
        PartOkpdDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            this._document.IterateByYears(function (i) {
                var fieldId = BaseObasTableFields.YearDataField.GenerateId(i);
                _this.SumChangeEventHandler(tableId, _this.GetFieldValue(fieldId), 0, fieldId);
            });
        };
        PartOkpdDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        PartOkpdDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PartOkpdDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.YearDataField]);
        };
        PartOkpdDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.YearDataField);
        };
        return PartOkpdDataTable;
    }(PartOkpdTable));
    F02242.PartOkpdDataTable = PartOkpdDataTable;
})(F02242 || (F02242 = {}));
