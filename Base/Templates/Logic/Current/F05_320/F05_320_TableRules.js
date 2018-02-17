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
var F05320;
(function (F05320) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05320.TableRules = TableRules;
    var SubjectTableKeys = (function (_super) {
        __extends(SubjectTableKeys, _super);
        function SubjectTableKeys(SubjectKey) {
            var _this = _super.call(this) || this;
            _this.SubjectKey = SubjectKey;
            return _this;
        }
        return SubjectTableKeys;
    }(ObasTableKeys));
    var SubjectYearTableKeys = (function (_super) {
        __extends(SubjectYearTableKeys, _super);
        function SubjectYearTableKeys(SubjectKey, Year) {
            var _this = _super.call(this, SubjectKey) || this;
            _this.Year = Year;
            return _this;
        }
        return SubjectYearTableKeys;
    }(SubjectTableKeys));
    var ProtezServiceFields = (function (_super) {
        __extends(ProtezServiceFields, _super);
        function ProtezServiceFields(id, _table) {
            var _this = _super.call(this, EditorProObjectTypes.None, id) || this;
            _this._table = _table;
            _this._protez = null;
            _this._service = null;
            _this._total = null;
            return _this;
        }
        Object.defineProperty(ProtezServiceFields.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberGenericObasTableField(this.Id + "_Y", this._table);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtezServiceFields.prototype, "Service", {
            get: function () {
                if (this._service == null) {
                    this._service = new NumberGenericObasTableField(this.Id + "_Service_Y", this._table);
                }
                return this._service;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtezServiceFields.prototype, "Protez", {
            get: function () {
                if (this._protez == null) {
                    this._protez = new NumberGenericObasTableField(this.Id + "_Protez_Y", this._table);
                }
                return this._protez;
            },
            enumerable: true,
            configurable: true
        });
        ProtezServiceFields.prototype.UpdateTotal = function (fieldId) {
            this.Total.GetFieldByField(fieldId)
                .NValue = this.Protez.GetFieldByField(fieldId).NValue +
                this.Service.GetFieldByField(fieldId).NValue;
        };
        ProtezServiceFields.prototype.CopyFields = function () {
            return [this.Protez, this.Service];
        };
        ProtezServiceFields.prototype.ResetFields = function () {
            var result = this.CopyFields();
            result.push(this.Total);
            return result;
        };
        return ProtezServiceFields;
    }(BaseObject));
    ProtezServiceFields.Delimiter = "_";
    var DataFields = (function (_super) {
        __extends(DataFields, _super);
        function DataFields(id, _table) {
            var _this = _super.call(this, EditorProObjectTypes.None, id) || this;
            _this._table = _table;
            _this._count = null;
            _this._price = null;
            _this._total = null;
            return _this;
        }
        Object.defineProperty(DataFields.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberGenericObasTableField(BaseObasTableFields.YearDataField.Id, this._table);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataFields.prototype, "Count", {
            get: function () {
                if (this._count == null) {
                    this._count = new NumberGenericObasTableField("Count_Y", this._table);
                }
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataFields.prototype, "Price", {
            get: function () {
                if (this._price == null) {
                    this._price = new NumberGenericObasTableField("Price_Y", this._table);
                }
                return this._price;
            },
            enumerable: true,
            configurable: true
        });
        DataFields.prototype.UpdateTotal = function (fieldId) {
            this.Total.GetFieldByField(fieldId)
                .NValue = this.Count.GetFieldByField(fieldId).NValue *
                this.Price.GetFieldByField(fieldId).NValue;
        };
        DataFields.prototype.CopyFields = function () {
            return [this.Count, this.Price];
        };
        DataFields.prototype.ResetFields = function () {
            var result = this.CopyFields();
            result.push(this.Total);
            return result;
        };
        return DataFields;
    }(BaseObject));
    DataFields.Delimiter = "_";
    var SubjectsDataTable = (function (_super) {
        __extends(SubjectsDataTable, _super);
        function SubjectsDataTable(id, document, parentTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id], document, parentTable) || this;
            _this._invalid = null;
            _this._veteran = null;
            _this._admCosts = null;
            _this._total = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(SubjectsDataTable.prototype, "AdmCosts", {
            get: function () {
                if (this._admCosts == null) {
                    this._admCosts = new NumberGenericObasTableField("AdmCosts_Y", this);
                }
                return this._admCosts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberGenericObasTableField(BaseObasTableFields.YearDataField.Id, this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "Invalid", {
            get: function () {
                if (this._invalid == null) {
                    this._invalid = new ProtezServiceFields("Invalid", this);
                }
                return this._invalid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "Veteran", {
            get: function () {
                if (this._veteran == null) {
                    this._veteran = new ProtezServiceFields("Veteran", this);
                }
                return this._veteran;
            },
            enumerable: true,
            configurable: true
        });
        SubjectsDataTable.prototype.GetKeys = function (subjectKey) {
            if (subjectKey === void 0) { subjectKey = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new SubjectTableKeys(subjectKey);
            }
            else {
                this._keys.SubjectKey = subjectKey;
            }
            return this._keys;
        };
        Object.defineProperty(SubjectsDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey];
                    var yearField_1 = this.Total;
                    var admCostField_1 = this.AdmCosts;
                    var socFieldsGen_1 = function (field, yearIndex) {
                        _this._copyFields.push(field.Protez.GetFieldByYearIndex(yearIndex));
                        _this._copyFields.push(field.Service.GetFieldByYearIndex(yearIndex));
                    };
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GetFieldByYearIndex(i));
                        socFieldsGen_1(_this.Invalid, i);
                        socFieldsGen_1(_this.Veteran, i);
                        _this._copyFields.push(admCostField_1.GetFieldByYearIndex(i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        SubjectsDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        SubjectsDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        SubjectsDataTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.GetFieldByField(fieldId).NValue = this.Invalid.Total.GetFieldByField(fieldId).NValue +
                this.Veteran.Total.GetFieldByField(fieldId).NValue +
                this.AdmCosts.GetFieldByField(fieldId).NValue;
        };
        SubjectsDataTable.prototype.SocialPaySumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var socPayField = fieldId.split(ProtezServiceFields.Delimiter)[0];
            this[socPayField].UpdateTotal(fieldId);
        };
        SubjectsDataTable.prototype.ResetFields = function () {
            return [this.Total].concat(this.Invalid.ResetFields()).concat(this.Veteran.ResetFields())
                .concat([this.AdmCosts]);
        };
        SubjectsDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, this.ResetFields());
        };
        SubjectsDataTable.prototype.CopyData = function (srcYear, destYear) {
            var copyFields = this.Invalid.CopyFields().concat(this.Veteran.CopyFields());
            (_a = this.Document.CommonRules).CopyTableData.apply(_a, [this, srcYear, destYear, null].concat(copyFields));
            var _a;
        };
        return SubjectsDataTable;
    }(ObasTableWithKeysParent));
    F05320.SubjectsDataTable = SubjectsDataTable;
    var PXSp1Sp2DataTable = (function (_super) {
        __extends(PXSp1Sp2DataTable, _super);
        function PXSp1Sp2DataTable(id, document, parentTable, _sumTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id], document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._dataFields = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(PXSp1Sp2DataTable.prototype, "DataFields", {
            get: function () {
                if (this._dataFields == null) {
                    this._dataFields = new DataFields(this.Id, this);
                }
                return this._dataFields;
            },
            enumerable: true,
            configurable: true
        });
        PXSp1Sp2DataTable.prototype.GetKeys = function (subjectKey) {
            if (subjectKey === void 0) { subjectKey = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new SubjectTableKeys(subjectKey);
            }
            else {
                this._keys.SubjectKey = subjectKey;
            }
            return this._keys;
        };
        Object.defineProperty(PXSp1Sp2DataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey];
                    var socFieldsGen_2 = function (field, yearIndex) {
                        _this._copyFields.push(field.Count.GetFieldByYearIndex(yearIndex));
                        _this._copyFields.push(field.Price.GetFieldByYearIndex(yearIndex));
                        _this._copyFields.push(field.Total.GetFieldByYearIndex(yearIndex));
                    };
                    this.Document.IterateByYears(function (i) {
                        socFieldsGen_2(_this.DataFields, i);
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        PXSp1Sp2DataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        PXSp1Sp2DataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PXSp1Sp2DataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var totalField = tableId.split(DataFields.Delimiter)[2] + DataFields.Delimiter +
                tableId.split(DataFields.Delimiter)[3] + DataFields.Delimiter + fieldId;
            this._sumTable.SetSumByKeys(totalField, this.GetKeys(), oldValue, newValue);
        };
        PXSp1Sp2DataTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.DataFields.UpdateTotal(fieldId);
        };
        PXSp1Sp2DataTable.prototype.ResetFields = function () {
            return this.DataFields.ResetFields();
        };
        PXSp1Sp2DataTable.prototype.ResetData = function (recordKey) {
            var _this = this;
            this.Document.CommonRules.ResetTableData(this, this.ResetFields(), recordKey
                ? function () {
                    return _this.RecordKey.Locate(recordKey);
                }
                : null);
        };
        PXSp1Sp2DataTable.prototype.AfterDeleteChildsEventHandler = function () {
            this.ResetData(this.RecordKey.Value);
        };
        PXSp1Sp2DataTable.prototype.CopyData = function (srcYear, destYear) {
            var copyFields = this.DataFields.CopyFields();
            (_a = this.Document.CommonRules).CopyTableData.apply(_a, [this, srcYear, destYear, null].concat(copyFields));
            var _a;
        };
        return PXSp1Sp2DataTable;
    }(ObasTableWithKeysParent));
    F05320.PXSp1Sp2DataTable = PXSp1Sp2DataTable;
    var P5Table = (function (_super) {
        __extends(P5Table, _super);
        function P5Table(id, document, parentTable, _sumTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, BaseObasTableFields.YearField.Id], document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._year = null;
            _this._subject = null;
            _this._delSubjKey = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            _this._count = null;
            _this._sumParts = null;
            _this._salary = null;
            _this._rent = null;
            _this._communication = null;
            _this._transport = null;
            _this._publicService = null;
            _this._travel = null;
            _this._stuff = null;
            _this._admCosts = null;
            return _this;
        }
        Object.defineProperty(P5Table.prototype, "Count", {
            get: function () {
                if (this._count == null) {
                    this._count = new NumberObasTableField("Count", this);
                }
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "SumParts", {
            get: function () {
                if (this._sumParts == null) {
                    this._sumParts = new NumberObasTableField("SumParts", this);
                }
                return this._sumParts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this._salary = new NumberObasTableField("Salary", this);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "Rent", {
            get: function () {
                if (this._rent == null) {
                    this._rent = new NumberObasTableField("Rent", this);
                }
                return this._rent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "Communication", {
            get: function () {
                if (this._communication == null) {
                    this._communication = new NumberObasTableField("Communication", this);
                }
                return this._communication;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "Transport", {
            get: function () {
                if (this._transport == null) {
                    this._transport = new NumberObasTableField("Transport", this);
                }
                return this._transport;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "PublicService", {
            get: function () {
                if (this._publicService == null) {
                    this._publicService = new NumberObasTableField("PublicService", this);
                }
                return this._publicService;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "Travel", {
            get: function () {
                if (this._travel == null) {
                    this._travel = new NumberObasTableField("Travel", this);
                }
                return this._travel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "Stuff", {
            get: function () {
                if (this._stuff == null) {
                    this._stuff = new NumberObasTableField("Stuff", this);
                }
                return this._stuff;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "AdmCosts", {
            get: function () {
                if (this._admCosts == null) {
                    this._admCosts = new NumberObasTableField("AdmCosts", this);
                }
                return this._admCosts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Year, this.Count,
                        this.Salary, this.Rent, this.Communication, this.Transport, this.PublicService, this.Travel, this.Stuff];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P5Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P5Table.prototype.GetKeys = function (ownerKey, year) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new SubjectYearTableKeys(ownerKey, year);
            }
            else {
                this._keys.SubjectKey = ownerKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        P5Table.prototype.InnerCopyData = function (recordKey, endYear) {
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
        Object.defineProperty(P5Table.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        P5Table.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P5Table.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        P5Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P5Table.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.Count.NValue = 0;
                _this.Salary.NValue = 0;
                _this.Rent.NValue = 0;
                _this.Communication.NValue = 0;
                _this.Transport.NValue = 0;
                _this.PublicService.NValue = 0;
                _this.Travel.NValue = 0;
                _this.Stuff.NValue = 0;
                _this.AdmCosts.NValue = 0;
                _this.SumParts.NValue = 0;
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
        P5Table.prototype.CopyData = function (srcYear, destYear) {
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
        P5Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.AdmCosts.NValue = this.Count.NValue * this.SumParts.NValue;
        };
        P5Table.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SumParts.NValue = this.Salary.NValue + this.Rent.NValue + this.Communication.NValue +
                this.PublicService.NValue + this.Transport.NValue + this.Travel.NValue + this.Stuff.NValue;
        };
        P5Table.prototype.TotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var admCostsField = fieldId + "_" + BaseObasTableFields.YearDataField
                .GenerateId(ObasHelper.GetYearOffset(this) + 1);
            this._sumTable.SetSumByKeys(admCostsField, this._sumTable.GetKeys(this.OwnerKey.Value), oldValue, newValue);
        };
        return P5Table;
    }(ObasTableWithKeysParent));
    F05320.P5Table = P5Table;
})(F05320 || (F05320 = {}));
