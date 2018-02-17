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
var F04111;
(function (F04111) {
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "CustomerField", {
            get: function () {
                if (this._customerField == null) {
                    this._customerField = new BaseObasTableField("Customer_ID", false);
                }
                return this._customerField;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._customerField = null;
    F04111.ObasTableFields = ObasTableFields;
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F04111.TableRules = TableRules;
    var ObasTableCustomerKeys = (function (_super) {
        __extends(ObasTableCustomerKeys, _super);
        function ObasTableCustomerKeys(CustomerKey) {
            var _this = _super.call(this) || this;
            _this.CustomerKey = CustomerKey;
            return _this;
        }
        return ObasTableCustomerKeys;
    }(ObasTableKeys));
    F04111.ObasTableCustomerKeys = ObasTableCustomerKeys;
    var UniqCustomerObasTable = (function (_super) {
        __extends(UniqCustomerObasTable, _super);
        function UniqCustomerObasTable(id, document, parentTable) {
            var _this = _super.call(this, id, [ObasTableFields.CustomerField.Id], document) || this;
            _this._customerKeyField = null;
            _this._childTableIds = [];
            _this._customerKey = null;
            if (parentTable != null) {
                _this._parentTable = parentTable;
                parentTable.AddChild(_this);
            }
            return _this;
        }
        Object.defineProperty(UniqCustomerObasTable.prototype, "CustomerKey", {
            get: function () {
                if (this._customerKeyField == null) {
                    this._customerKeyField = new ObasSprTableField(this.Document.GovCustomersSprTable, this, "Customer");
                }
                return this._customerKeyField;
            },
            enumerable: true,
            configurable: true
        });
        UniqCustomerObasTable.prototype.AddChild = function (table) {
            this._childTableIds.push(table.Id);
        };
        UniqCustomerObasTable.prototype.AddNewCustomer = function (customerKey) {
            if (customerKey != null) {
                this.Document.CommonRules.AddNewLink(this.Id, this.KeyFieldIds, [customerKey]);
            }
        };
        UniqCustomerObasTable.prototype.DeleteCustomer = function (customerKey) {
            this.Document.CommonRules.DeleteOldLink(this.Id, this._childTableIds, this.KeyFieldIds, [customerKey]);
        };
        Object.defineProperty(UniqCustomerObasTable.prototype, "ParentTable", {
            get: function () {
                return this._parentTable;
            },
            enumerable: true,
            configurable: true
        });
        UniqCustomerObasTable.prototype.UniqKeyChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this._parentTable != null) {
                this.AfterDeleteEventHandler(tableId, oldValue);
                this._parentTable.AddNewCustomer(newValue);
            }
        };
        UniqCustomerObasTable.prototype.DeleteEventHandler = function (tableId) {
            this._customerKey = this.CustomerKey.ForeignKey.Value;
        };
        UniqCustomerObasTable.prototype.AfterDeleteEventHandler = function (tableId, customerKey) {
            if (customerKey === void 0) { customerKey = this._customerKey; }
            if (this._parentTable != null) {
                this._parentTable.DeleteCustomer(customerKey);
            }
        };
        UniqCustomerObasTable.prototype.GetKeys = function (customerKey) {
            if (customerKey === void 0) { customerKey = this.CustomerKey.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new ObasTableCustomerKeys(customerKey);
            }
            else {
                this._keys.CustomerKey = customerKey;
            }
            return this._keys;
        };
        UniqCustomerObasTable.prototype.GetRecordKey = function (keys, addIfNotExists) {
            if (addIfNotExists === void 0) { addIfNotExists = false; }
            return this.Document.CommonRules.GetValueByKeys(this, this.KeyFieldIds, keys.ToArray(), this.RecordKey.Id, addIfNotExists);
        };
        UniqCustomerObasTable.prototype.GetRecordKeyByName = function (customerName, addIfNotExists) {
            if (addIfNotExists === void 0) { addIfNotExists = false; }
            var customerSprKey = this.CustomerKey.SprTable.GetRecordKeyByName(customerName, addIfNotExists);
            if (customerSprKey != null) {
                return this.GetRecordKey(this.GetKeys(customerSprKey), addIfNotExists);
            }
            return null;
        };
        return UniqCustomerObasTable;
    }(ObasTableWithKeys));
    F04111.UniqCustomerObasTable = UniqCustomerObasTable;
    var CustomersObasTable = (function (_super) {
        __extends(CustomersObasTable, _super);
        function CustomersObasTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isAccepted = null;
            return _this;
        }
        Object.defineProperty(CustomersObasTable.prototype, "IsAccepted", {
            get: function () {
                if (this._isAccepted == null) {
                    this._isAccepted = new ObasTableField("is_accepted_type", this);
                }
                return this._isAccepted;
            },
            enumerable: true,
            configurable: true
        });
        CustomersObasTable.prototype.CheckIsAccepted = function () {
            return this.IsAccepted.Value;
        };
        CustomersObasTable.prototype.CheckIsNotAccepted = function () {
            return !this.IsAccepted.Value;
        };
        CustomersObasTable.prototype.GetRecordKeyByName = function (customerName, isAccepted, addIfNotExists) {
            if (addIfNotExists === void 0) { addIfNotExists = false; }
            var customerSprKey = this.CustomerKey.SprTable.GetRecordKeyByName(customerName, addIfNotExists);
            if (customerSprKey != null) {
                return this.Document.CommonRules.GetValueByKeys(this, this.KeyFieldIds.concat(this.IsAccepted.Id), [customerSprKey, isAccepted], this.RecordKey.Id, addIfNotExists);
            }
            return null;
        };
        return CustomersObasTable;
    }(UniqCustomerObasTable));
    F04111.CustomersObasTable = CustomersObasTable;
    var BaseBaseProjectInfoObasTable = (function (_super) {
        __extends(BaseBaseProjectInfoObasTable, _super);
        function BaseBaseProjectInfoObasTable(id, _document, _parentTable, _totalDataTable) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._parentTable = _parentTable;
            _this._totalDataTable = _totalDataTable;
            _this._isProgramPart = null;
            _this._ownerKey = null;
            _this._developer = null;
            return _this;
        }
        Object.defineProperty(BaseBaseProjectInfoObasTable.prototype, "Developer", {
            get: function () {
                if (this._developer == null) {
                    this._developer = new ObasTableField("Developer", this);
                }
                return this._developer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseBaseProjectInfoObasTable.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this._ownerKey = new ObasForeignKeyTableFieldTyped(this._parentTable, this, "Customer");
                }
                return this._ownerKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseBaseProjectInfoObasTable.prototype, "IsProgramPart", {
            get: function () {
                if (this._isProgramPart == null) {
                    this._isProgramPart = new ObasTableField("is_Program_part", this);
                }
                return this._isProgramPart;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseBaseProjectInfoObasTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseBaseProjectInfoObasTable.prototype, "TotalTable", {
            get: function () {
                return this._totalDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseBaseProjectInfoObasTable.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        BaseBaseProjectInfoObasTable.prototype.IsProgramPartIsRequired = function () {
            return this.IsProgramPart.Value;
        };
        BaseBaseProjectInfoObasTable.prototype.ExportValue = function (recordKey, fieldId) {
            var result = this.Lookup(this.RecordKey.Id, recordKey, fieldId);
            return ObasHelper.ConvertToString(result);
        };
        BaseBaseProjectInfoObasTable.prototype.ExportNumValue = function (recordKey, fieldId) {
            var result = this.Lookup(this.RecordKey.Id, recordKey, fieldId);
            return result == null ? 0 : result;
        };
        BaseBaseProjectInfoObasTable.prototype.ExportIsProgramPart = function (recordKey) {
            var isProgPart = this.Lookup(this.RecordKey.Id, recordKey, this.IsProgramPart.Id);
            return isProgPart ? "Включен в ФАИП" : "Не включен в ФАИП";
        };
        BaseBaseProjectInfoObasTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        return BaseBaseProjectInfoObasTable;
    }(SprTable));
    F04111.BaseBaseProjectInfoObasTable = BaseBaseProjectInfoObasTable;
    var BaseProjectInfoObasTable = (function (_super) {
        __extends(BaseProjectInfoObasTable, _super);
        function BaseProjectInfoObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseProjectInfoObasTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var uniqCustomTable = this.ParentTable.ParentTable;
            var totalDataTableOwner = uniqCustomTable
                .GetRecordKey(uniqCustomTable.GetKeys(this.ParentTable.CustomerKey.ForeignKey.Value), false);
            this.TotalTable.SetSumByKeys(fieldId, this.TotalTable.GetKeys(this.GetTotalStrKey(), totalDataTableOwner), oldValue, newValue);
        };
        return BaseProjectInfoObasTable;
    }(BaseBaseProjectInfoObasTable));
    F04111.BaseProjectInfoObasTable = BaseProjectInfoObasTable;
    var ProjectInfoObasTableSprFields = (function () {
        function ProjectInfoObasTableSprFields(_table) {
            this._table = _table;
            this._faip = null;
            this._subFcp = null;
            this._fcp = null;
        }
        Object.defineProperty(ProjectInfoObasTableSprFields.prototype, "Fcp", {
            get: function () {
                if (this._fcp == null) {
                    this._fcp = new ObasSprTableField(ObasTableCollection.FcpSprTable, this._table);
                }
                return this._fcp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectInfoObasTableSprFields.prototype, "SubFcp", {
            get: function () {
                if (this._subFcp == null) {
                    this._subFcp = new ObasSprTableField(ObasTableCollection.FcpSprTable, this._table, "FCP_SubProgram");
                }
                return this._subFcp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectInfoObasTableSprFields.prototype, "Faip", {
            get: function () {
                if (this._faip == null) {
                    this._faip = new ObasSprTableField(ObasTableCollection.Faips, this._table, "FAIP");
                }
                return this._faip;
            },
            enumerable: true,
            configurable: true
        });
        return ProjectInfoObasTableSprFields;
    }());
    F04111.ProjectInfoObasTableSprFields = ProjectInfoObasTableSprFields;
    var ProjectInfoObasTable = (function (_super) {
        __extends(ProjectInfoObasTable, _super);
        function ProjectInfoObasTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sprFields = null;
            _this._branch = null;
            _this._isAccepted = null;
            return _this;
        }
        Object.defineProperty(ProjectInfoObasTable.prototype, "IsAccepted", {
            get: function () {
                if (this._isAccepted == null) {
                    this._isAccepted = new ObasTableField("is_accepted_type", this);
                }
                return this._isAccepted;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectInfoObasTable.prototype, "Branch", {
            get: function () {
                if (this._branch == null) {
                    this._branch = new ObasTableField("Branch", this);
                }
                return this._branch;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectInfoObasTable.prototype, "SprFields", {
            get: function () {
                if (this._sprFields == null) {
                    this._sprFields = new ProjectInfoObasTableSprFields(this);
                }
                return this._sprFields;
            },
            enumerable: true,
            configurable: true
        });
        ProjectInfoObasTable.prototype.GetTotalStrKey = function () {
            return this.ParentTable.IsAccepted.Value ? StrKeysP1.Accepted : StrKeysP1.Offered;
        };
        ProjectInfoObasTable.prototype.GetDataFieldsCount = function () {
            return this.ParentTable.IsAccepted.Value ? ObasStageSettings.YearsCount + 1 : ObasStageSettings.YearsCount;
        };
        Object.defineProperty(ProjectInfoObasTable.prototype, "IsAcceptedFlag", {
            get: function () {
                return this.ParentTable.IsAccepted.Value;
            },
            enumerable: true,
            configurable: true
        });
        ProjectInfoObasTable.prototype.CheckIsNotAccepted = function () {
            return this.ParentTable.CheckIsNotAccepted();
        };
        ProjectInfoObasTable.prototype.CheckIsAccepted = function () {
            return this.ParentTable.CheckIsAccepted();
        };
        return ProjectInfoObasTable;
    }(BaseProjectInfoObasTable));
    F04111.ProjectInfoObasTable = ProjectInfoObasTable;
    var ProjectInfoP4ObasTable = (function (_super) {
        __extends(ProjectInfoP4ObasTable, _super);
        function ProjectInfoP4ObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ProjectInfoP4ObasTable.prototype.GetTotalStrKey = function () {
            return StrKeysP1.NotAccepted;
        };
        ProjectInfoP4ObasTable.prototype.GetDataFieldsCount = function () {
            return ObasStageSettings.YearsCount + 1;
        };
        return ProjectInfoP4ObasTable;
    }(BaseProjectInfoObasTable));
    F04111.ProjectInfoP4ObasTable = ProjectInfoP4ObasTable;
    var StrKeysP1;
    (function (StrKeysP1) {
        StrKeysP1[StrKeysP1["Total"] = 1] = "Total";
        StrKeysP1[StrKeysP1["Accepted"] = 2] = "Accepted";
        StrKeysP1[StrKeysP1["Offered"] = 3] = "Offered";
        StrKeysP1[StrKeysP1["NotAccepted"] = 4] = "NotAccepted";
        StrKeysP1[StrKeysP1["Sum"] = 5] = "Sum";
        StrKeysP1[StrKeysP1["Correction"] = 100] = "Correction";
    })(StrKeysP1 = F04111.StrKeysP1 || (F04111.StrKeysP1 = {}));
    var FObasTableP1Total = (function (_super) {
        __extends(FObasTableP1Total, _super);
        function FObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1.Total;
        };
        FObasTableP1Total.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === StrKeysP1.Correction) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            } 
            if ((this.StrKey != StrKeysP1.Total) && (this.StrKey != StrKeysP1.Sum)) {
                var delta = newValue - oldValue;
                if (this.Locate("StrKey", StrKeysP1.Total)) {
                    var currentValue = this.GetFieldValue(fieldId);
                    this.SetFieldValue(fieldId, currentValue + delta);
                }
            } 
            if (this.StrKey != StrKeysP1.Sum) {
                this.Locate("StrKey", StrKeysP1.Total);
                var totalValue = this.GetFieldValue(fieldId);
                this.Locate("StrKey", StrKeysP1.Correction);
                var correctionValue = this.GetFieldValue(fieldId);
                if (this.Locate("StrKey", StrKeysP1.Sum)) {
                    this.SetFieldValue(fieldId, totalValue - correctionValue);
                }
            }
        };
        return FObasTableP1Total;
    }(P1TotalObasTable));
    F04111.FObasTableP1Total = FObasTableP1Total;
    var FObasTableP1 = (function (_super) {
        __extends(FObasTableP1, _super);
        function FObasTableP1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FObasTableP1;
    }(ObasTableP1));
    F04111.FObasTableP1 = FObasTableP1;
    var BaseInvestInfoObasTable = (function (_super) {
        __extends(BaseInvestInfoObasTable, _super);
        function BaseInvestInfoObasTable(id, _parent) {
            var _this = _super.call(this, id) || this;
            _this._parent = _parent;
            _this._ownerKey = null;
            _this._investigationType = null;
            _this._okved = null;
            _this._okei = null;
            _this._power = null;
            _this._year = null;
            _this._unit = null;
            _this._copyFields = null;
            _this._document = _parent.Document;
            return _this;
        }
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.OwnerKey, this.InvestigationType.ForeignKey,
                        this.Okved.ForeignKey, this.Okei.ForeignKey,
                        this.Power, this.Unit, this.Year
                    ];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this._document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "Unit", {
            get: function () {
                if (this._unit == null) {
                    this._unit = new ObasTableField("UnitCode", this, true);
                }
                return this._unit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "Power", {
            get: function () {
                if (this._power == null) {
                    this._power = new NumberObasTableField("g6", this, true);
                }
                return this._power;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "Okei", {
            get: function () {
                if (this._okei == null) {
                    this._okei = new ObasSprTableField(ObasTableCollection.OkeiSprTable, this);
                }
                return this._okei;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "Okved", {
            get: function () {
                if (this._okved == null) {
                    this._okved = new ObasSprTableField(ObasTableCollection.OkvedSprTable, this);
                }
                return this._okved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "InvestigationType", {
            get: function () {
                if (this._investigationType == null) {
                    this._investigationType = new ObasSprTableField(ObasTableCollection.InvestigationTypesSprTable, this, "Investigation");
                }
                return this._investigationType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this
                        ._ownerKey = new ObasForeignKeyTableFieldTyped(this._parent, this, ObasTableFields.OwnerKeyField.Id, false);
                }
                return this._ownerKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInvestInfoObasTable.prototype, "ParentTable", {
            get: function () {
                return this._ownerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        BaseInvestInfoObasTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._document.CommonRules.SetSumByKeys(this.ParentTable, this.ParentTable.KeyFieldIds, [this.OwnerKey.Value], fieldId, oldValue, newValue);
        };
        BaseInvestInfoObasTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            for (var i = 1, len = this.ParentTable.GetDataFieldsCount(); i <= len; i++) {
                var fieldId = ObasTableFields.YearDataField.GenerateId(i);
                this.SumChangeEventHandler(tableId, this.GetFieldValue(fieldId), 0, fieldId);
            }
        };
        BaseInvestInfoObasTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var copy = function () {
                var yearsCount = _this.ParentTable.GetDataFieldsCount();
                var correction = 1 + yearsCount - ObasStageSettings.YearsCount;
                var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + correction : yearsCount - 1;
                var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + correction : yearsCount;
                var srcFieldId = yearField.GenerateId(srcIndex);
                var destFieldId = yearField.GenerateId(destIndex);
                _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
            };
            this.Iterate(copy);
        };
        BaseInvestInfoObasTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        BaseInvestInfoObasTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        BaseInvestInfoObasTable.prototype.ResetData = function () {
            this._document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        return BaseInvestInfoObasTable;
    }(ObasTable));
    F04111.BaseInvestInfoObasTable = BaseInvestInfoObasTable;
    var InvestInfoObasTable = (function (_super) {
        __extends(InvestInfoObasTable, _super);
        function InvestInfoObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InvestInfoObasTable;
    }(BaseInvestInfoObasTable));
    F04111.InvestInfoObasTable = InvestInfoObasTable;
    var InvestInfoP4ObasTable = (function (_super) {
        __extends(InvestInfoP4ObasTable, _super);
        function InvestInfoP4ObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InvestInfoP4ObasTable;
    }(BaseInvestInfoObasTable));
    F04111.InvestInfoP4ObasTable = InvestInfoP4ObasTable;
})(F04111 || (F04111 = {}));
