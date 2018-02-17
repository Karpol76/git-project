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
var F06100;
(function (F06100) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F06100.TableRules = TableRules;
    var AnalyticRowsTable = (function (_super) {
        __extends(AnalyticRowsTable, _super);
        function AnalyticRowsTable(id) {
            return _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], "StrCode", "StrName") || this;
        }
        return AnalyticRowsTable;
    }(BarsRowsSprTable));
    F06100.AnalyticRowsTable = AnalyticRowsTable;
    var AdjustRows = (function (_super) {
        __extends(AdjustRows, _super);
        function AdjustRows() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isTotalField = null;
            return _this;
        }
        Object.defineProperty(AdjustRows.prototype, "IsTotalField", {
            get: function () {
                if (this._isTotalField == null) {
                    this._isTotalField = new ObasTableField(BaseObasTableFields.TotalRowFlagField.Id, this);
                }
                return this._isTotalField;
            },
            enumerable: true,
            configurable: true
        });
        AdjustRows.prototype.IsTotalRow = function () {
            return this.IsTotalField.Value;
        };
        AdjustRows.prototype.IsNotTotalRow = function () {
            return !this.IsTotalField.Value;
        };
        return AdjustRows;
    }(AnalyticRowsTable));
    F06100.AdjustRows = AdjustRows;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 1] = "Total";
        P1StrKeys[P1StrKeys["Service"] = 2] = "Service";
        P1StrKeys[P1StrKeys["Work"] = 3] = "Work";
        P1StrKeys[P1StrKeys["Tax"] = 4] = "Tax";
        P1StrKeys[P1StrKeys["GovTask"] = 5] = "GovTask";
        P1StrKeys[P1StrKeys["Correction"] = 6] = "Correction";
        P1StrKeys[P1StrKeys["AddObas"] = 7] = "AddObas";
    })(P1StrKeys = F06100.P1StrKeys || (F06100.P1StrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1StrKeys.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F06100.P1TotalTable = P1TotalTable;
    var PartServWorkTableKeys = (function (_super) {
        __extends(PartServWorkTableKeys, _super);
        function PartServWorkTableKeys(ServWorkKey, Year) {
            var _this = _super.call(this) || this;
            _this.ServWorkKey = ServWorkKey;
            _this.Year = Year;
            return _this;
        }
        return PartServWorkTableKeys;
    }(ObasTableKeys));
    F06100.PartServWorkTableKeys = PartServWorkTableKeys;
    var PartServWorkTable = (function (_super) {
        __extends(PartServWorkTable, _super);
        function PartServWorkTable(id, document) {
            var _this = _super.call(this, id, ["ServWork_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._servWorkKey = null;
            _this._year = null;
            return _this;
        }
        Object.defineProperty(PartServWorkTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServWorkTable.prototype, "ServWorkKey", {
            get: function () {
                if (this._servWorkKey == null) {
                    this
                        ._servWorkKey = new ObasSprTableFieldTyped(ObasTableCollection.ServiceWorkSprTable, this);
                }
                return this._servWorkKey;
            },
            enumerable: true,
            configurable: true
        });
        PartServWorkTable.prototype.GetKeys = function (servWorkKey, year) {
            if (servWorkKey === void 0) { servWorkKey = this.ServWorkKey.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new PartServWorkTableKeys(servWorkKey, year);
            }
            else {
                this._keys.ServWorkKey = servWorkKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        PartServWorkTable.prototype.FilterIndicators = function () {
            return ObasTableCollection.ServiceWorkIndicatorsSprTable.IsParent(this.ServWorkKey.ForeignKey.Value);
        };
        return PartServWorkTable;
    }(ObasTableWithKeys));
    F06100.PartServWorkTable = PartServWorkTable;
    var PartServWorkOrgTableKeys = (function (_super) {
        __extends(PartServWorkOrgTableKeys, _super);
        function PartServWorkOrgTableKeys(servWorkKey, year, OrgKey) {
            var _this = _super.call(this, servWorkKey, year) || this;
            _this.OrgKey = OrgKey;
            return _this;
        }
        return PartServWorkOrgTableKeys;
    }(PartServWorkTableKeys));
    F06100.PartServWorkOrgTableKeys = PartServWorkOrgTableKeys;
    var PartOrgTable = (function (_super) {
        __extends(PartOrgTable, _super);
        function PartOrgTable(id, parentTable, _p2Sp3OrgTable) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat("Organization_ID"), parentTable.Document, parentTable) || this;
            _this._p2Sp3OrgTable = _p2Sp3OrgTable;
            _this._org = null;
            _this._orgKey = null;
            _this._year = null;
            return _this;
        }
        Object.defineProperty(PartOrgTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOrgTable.prototype, "Org", {
            get: function () {
                if (this._org == null) {
                    this._org = new ObasSprTableField(ObasTableCollection.OrganizationTable, this);
                }
                return this._org;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOrgTable.prototype, "Year", {
            get: function () {
                return this.ParentTable.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartOrgTable.prototype, "ServWorkKey", {
            get: function () {
                return this.ParentTable.ServWorkKey;
            },
            enumerable: true,
            configurable: true
        });
        PartOrgTable.prototype.DeleteEventHandler = function (tableId) {
            this._orgKey = this.Org.ForeignKey.Value;
            this._year = this.Year.NValue;
        };
        PartOrgTable.prototype.GetKeys = function (servWorkKey, year, orgKey) {
            if (servWorkKey === void 0) { servWorkKey = this.ServWorkKey.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (orgKey === void 0) { orgKey = this.Org.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new PartServWorkOrgTableKeys(servWorkKey, year, orgKey);
            }
            else {
                this._keys.ServWorkKey = servWorkKey;
                this._keys.Year = year;
                this._keys.OrgKey = orgKey;
            }
            return this._keys;
        };
        PartOrgTable.prototype.GetRecordKey = function (keys, addIfNotExists) {
            if (addIfNotExists === void 0) { addIfNotExists = false; }
            var parentTable = this.ParentTable;
            var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(keys.ServWorkKey, keys.Year), addIfNotExists);
            return this.Document.CommonRules.GetValueByKeys(this, [this.OwnerKey.Id, this.Org.ForeignKey.Id], [ownerKey, keys.OrgKey], this.RecordKey.Id, addIfNotExists);
        };
        return PartOrgTable;
    }(ObasTableWithKeysParent));
    F06100.PartOrgTable = PartOrgTable;
    var OrgYearTableHelper = (function (_super) {
        __extends(OrgYearTableHelper, _super);
        function OrgYearTableHelper(id, _document) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._year = null;
            _this._org = null;
            _this._uniqOrgTable = null;
            return _this;
        }
        Object.defineProperty(OrgYearTableHelper.prototype, "UniqOrgTable", {
            get: function () {
                if (this._uniqOrgTable == null) {
                    this._uniqOrgTable = this._document.UniqueOrgsTable;
                }
                return this._uniqOrgTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrgYearTableHelper.prototype, "Org", {
            get: function () {
                if (this._org == null) {
                    this._org = new ObasSprTableField(ObasTableCollection.OrganizationTable, this);
                }
                return this._org;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrgYearTableHelper.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrgYearTableHelper.prototype, "YearOffset", {
            get: function () {
                return this.Year.NValue - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrgYearTableHelper.prototype, "UniqOrgKey", {
            get: function () {
                return this.UniqOrgTable.GetRecordKey(this.UniqOrgTable.GetKeys(this.Org.ForeignKey.Value));
            },
            enumerable: true,
            configurable: true
        });
        return OrgYearTableHelper;
    }(ObasTable));
    F06100.OrgYearTableHelper = OrgYearTableHelper;
    var P2P3StrCodeTable = (function (_super) {
        __extends(P2P3StrCodeTable, _super);
        function P2P3StrCodeTable(id, keyFields, _document) {
            return _super.call(this, id, _document) || this;
        }
        return P2P3StrCodeTable;
    }(ObasTableWithSimpleKeys));
    F06100.P2P3StrCodeTable = P2P3StrCodeTable;
    var StrCodeObasTableKeys = (function (_super) {
        __extends(StrCodeObasTableKeys, _super);
        function StrCodeObasTableKeys(StrCodeKey, Year) {
            var _this = _super.call(this, StrCodeKey) || this;
            _this.Year = Year;
            return _this;
        }
        return StrCodeObasTableKeys;
    }(OrgObasTableKeys));
    var P2Sp3Table = (function (_super) {
        __extends(P2Sp3Table, _super);
        function P2Sp3Table(id, _sumTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.StrKeyField.Id, BaseObasTableFields.YearField.Id], _sumTable.Document) || this;
            _this._sumTable = _sumTable;
            _this._uniqHelper = null;
            _this._taxSum = null;
            _this._govTaskSum = null;
            _this._electricCost = null;
            _this._thermalCost = null;
            _this._uniqOrgHelper = null;
            _this._coefVal = null;
            _this._strCodeVal = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P2Sp3Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.StrCodeVal, this.Year, this.ElectricCost, this.ThermalCost, this.TaxSum];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "StrCodeVal", {
            get: function () {
                if (this._strCodeVal == null) {
                    this._strCodeVal = new NumberObasTableField(BaseObasTableFields.StrKeyField.Id, this, true);
                }
                return this._strCodeVal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "CoefVal", {
            get: function () {
                if (this._coefVal == null) {
                    this._coefVal = new NumberObasTableField("g7", this);
                }
                return this._coefVal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "UniqOrgHelper", {
            get: function () {
                if (this._uniqOrgHelper == null) {
                    this._uniqOrgHelper = new OrgYearTableHelper(this.Id, this.Document);
                }
                return this._uniqOrgHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "ThermalCost", {
            get: function () {
                if (this._thermalCost == null) {
                    this._thermalCost = new NumberObasTableField("g5", this);
                }
                return this._thermalCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "ElectricCost", {
            get: function () {
                if (this._electricCost == null) {
                    this._electricCost = new NumberObasTableField("g4", this);
                }
                return this._electricCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "GovTaskSum", {
            get: function () {
                if (this._govTaskSum == null) {
                    this._govTaskSum = new NumberObasTableField("g3", this);
                }
                return this._govTaskSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "TaxSum", {
            get: function () {
                if (this._taxSum == null) {
                    this._taxSum = new NumberObasTableField("g6", this);
                }
                return this._taxSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "UniqHelper", {
            get: function () {
                if (this._uniqHelper == null) {
                    this._uniqHelper = new UniqueObasTable(this.Id, this.Document, this.KeyFieldIds);
                }
                return this._uniqHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "Org", {
            get: function () {
                return this.UniqOrgHelper.Org;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "Year", {
            get: function () {
                return this.UniqOrgHelper.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "UniqOrgKey", {
            get: function () {
                return this.UniqOrgHelper.UniqOrgKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Table.prototype, "YearOffset", {
            get: function () {
                return this.UniqOrgHelper.YearOffset;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp3Table.prototype.AddOrg = function (orgKey, year) {
            this.UniqHelper.AddElement(orgKey, year);
        };
        P2Sp3Table.prototype.DeleteOrg = function (orgKey, year) {
            this.UniqHelper.DeleteElement(orgKey, year);
        };
        P2Sp3Table.prototype.AddChildTable = function (childTable) {
            this.UniqHelper.AddChildTable(childTable);
        };
        P2Sp3Table.prototype.ChangeSum = function (strKey, oldValue, newValue) {
            this._sumTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(this.YearOffset + 1), this._sumTable.GetKeys(strKey), oldValue, newValue);
        };
        P2Sp3Table.prototype.TaxChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ChangeSum(P1StrKeys.Tax, oldValue, newValue);
        };
        P2Sp3Table.prototype.GovTaskChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ChangeSum(P1StrKeys.GovTask, oldValue, newValue);
        };
        P2Sp3Table.prototype.GovTaskPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.GovTaskSum.NValue = this.ElectricCost.NValue + this.ThermalCost.NValue;
        };
        P2Sp3Table.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.IsCopied.Value = true;
            this.TaxChangeEventHandler(tableId, this.TaxSum.NValue, 0, this.TaxSum.Id);
            this.GovTaskChangeEventHandler(tableId, this.GovTaskSum.NValue, 0, this.GovTaskSum.Id);
        };
        P2Sp3Table.prototype.GetKeys = function (strKey, year) {
            if (strKey === void 0) { strKey = this.StrCodeVal.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new StrCodeObasTableKeys(strKey, year);
            }
            else {
                this._keys.OrgKey = strKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        P2Sp3Table.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var yearData = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yearData.Value = keys.Year = year;
                    var newRecordKey = this.RecordKey.LookupByKeys(keys.ToArray());
                    this.SetupTableRecordData(copyData, newRecordKey, true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        P2Sp3Table.prototype.CopyData = function (srcYear, destYear) {
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
                        _this.InnerCopyData(recordKey, destYear);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        P2Sp3Table.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        P2Sp3Table.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P2Sp3Table.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.TaxSum.NValue = 0;
                _this.ElectricCost.NValue = 0;
                _this.ThermalCost.NValue = 0;
                _this.CoefVal.NValue = 0;
                _this.GovTaskSum.NValue = 0;
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
        P2Sp3Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2Sp3Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        return P2Sp3Table;
    }(ObasTableWithKeys));
    F06100.P2Sp3Table = P2Sp3Table;
    var PaidActivityInfoTable = (function (_super) {
        __extends(PaidActivityInfoTable, _super);
        function PaidActivityInfoTable(id, _sumTable) {
            var _this = _super.call(this, id, _sumTable.Document, _sumTable.Document.P2P3StrCodeTable) || this;
            _this._sumTable = _sumTable;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(PaidActivityInfoTable, "AdditionalYearDataField", {
            get: function () {
                if (PaidActivityInfoTable._additionalYearDataField == null) {
                    PaidActivityInfoTable._additionalYearDataField = new BaseGenericObasTableField("Add_Y");
                }
                return PaidActivityInfoTable._additionalYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaidActivityInfoTable, "RevenueYearDataField", {
            get: function () {
                if (PaidActivityInfoTable._revenueYearDataField == null) {
                    PaidActivityInfoTable._revenueYearDataField = new BaseGenericObasTableField("Rev_Y");
                }
                return PaidActivityInfoTable._revenueYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaidActivityInfoTable, "CoeficientYearDataField", {
            get: function () {
                if (PaidActivityInfoTable._coeficientYearDataField == null) {
                    PaidActivityInfoTable._coeficientYearDataField = new BaseGenericObasTableField("Coef_Y");
                }
                return PaidActivityInfoTable._coeficientYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaidActivityInfoTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey];
                    for (var i = 1, yearsCount = this.Document.Settings.YearsCount; i <= yearsCount; i++) {
                        this._copyFields.push(PaidActivityInfoTable.AdditionalYearDataField.GenerateTableField(this, i));
                        this._copyFields.push(PaidActivityInfoTable.RevenueYearDataField.GenerateTableField(this, i));
                    }
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        PaidActivityInfoTable.prototype.GetYearByField = function (fieldId) {
            return ObasStageSettings.CurrentYear + ObasHelper.GetYearOffsetById(fieldId);
        };
        PaidActivityInfoTable.prototype.CoefChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetValueByKeys(this._sumTable.CoefVal.Id, this._sumTable.GetKeys(this.OwnerKey.SourceTable.RecordKey.Value, this.GetYearByField(fieldId)), newValue);
        };
        PaidActivityInfoTable.prototype.CoefPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearIndex = ObasHelper.GetYearIndexById(fieldId);
            var volume = this.GetFieldValue(PaidActivityInfoTable.AdditionalYearDataField.GenerateId(yearIndex)) || 0;
            var revenue = this.GetFieldValue(PaidActivityInfoTable.RevenueYearDataField.GenerateId(yearIndex)) || 0;
            var sum = volume + revenue;
            this.SetFieldValue(PaidActivityInfoTable.CoeficientYearDataField.GenerateId(yearIndex), sum === 0 ? sum : volume / sum);
        };
        PaidActivityInfoTable.prototype.LocateByOrg = function (orgKey, locateMark, autoExclude) {
            var parentTable = this.ParentTable;
            var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(orgKey), false);
            return this.Locate(this.OwnerKey.Id, ownerKey, locateMark, autoExclude);
        };
        PaidActivityInfoTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, PaidActivityInfoTable.AdditionalYearDataField, PaidActivityInfoTable.RevenueYearDataField, PaidActivityInfoTable.CoeficientYearDataField);
        };
        PaidActivityInfoTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [PaidActivityInfoTable.AdditionalYearDataField,
                PaidActivityInfoTable.RevenueYearDataField,
                PaidActivityInfoTable.CoeficientYearDataField]);
        };
        PaidActivityInfoTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        PaidActivityInfoTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
            ;
        };
        return PaidActivityInfoTable;
    }(ObasTableWithSimpleKeysParent));
    PaidActivityInfoTable._coeficientYearDataField = null;
    PaidActivityInfoTable._revenueYearDataField = null;
    PaidActivityInfoTable._additionalYearDataField = null;
    F06100.PaidActivityInfoTable = PaidActivityInfoTable;
    var P2Sp4Table = (function (_super) {
        __extends(P2Sp4Table, _super);
        function P2Sp4Table(id, _sumTable) {
            var _this = _super.call(this, id) || this;
            _this._sumTable = _sumTable;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P2Sp4Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [];
                    for (var i = 1, yearsCount = this.Document.Settings.YearsCount; i <= yearsCount; i++) {
                        this._copyFields.push(BaseObasTableFields.YearDataField.GenerateTableField(this, i));
                    }
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp4Table.prototype, "Document", {
            get: function () {
                return this._sumTable.Document;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp4Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetValueByKeys(fieldId, this._sumTable.GetKeys(P1StrKeys.AddObas), newValue);
        };
        P2Sp4Table.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        P2Sp4Table.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        P2Sp4Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P2Sp4Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
            ;
        };
        return P2Sp4Table;
    }(ObasTable));
    F06100.P2Sp4Table = P2Sp4Table;
    var AnalyticStrKeys;
    (function (AnalyticStrKeys) {
        AnalyticStrKeys[AnalyticStrKeys["Total"] = 1] = "Total";
        AnalyticStrKeys[AnalyticStrKeys["C100"] = 2] = "C100";
        AnalyticStrKeys[AnalyticStrKeys["C121"] = 3] = "C121";
        AnalyticStrKeys[AnalyticStrKeys["C151"] = 4] = "C151";
        AnalyticStrKeys[AnalyticStrKeys["C122"] = 5] = "C122";
        AnalyticStrKeys[AnalyticStrKeys["C123"] = 6] = "C123";
        AnalyticStrKeys[AnalyticStrKeys["C124"] = 7] = "C124";
        AnalyticStrKeys[AnalyticStrKeys["DependedCosts"] = 8] = "DependedCosts";
        AnalyticStrKeys[AnalyticStrKeys["Purchase"] = 9] = "Purchase";
        AnalyticStrKeys[AnalyticStrKeys["C360"] = 10] = "C360";
        AnalyticStrKeys[AnalyticStrKeys["DirectlyCosts"] = 11] = "DirectlyCosts";
        AnalyticStrKeys[AnalyticStrKeys["C330"] = 12] = "C330";
        AnalyticStrKeys[AnalyticStrKeys["RealProperty"] = 13] = "RealProperty";
        AnalyticStrKeys[AnalyticStrKeys["SpecialProperty"] = 14] = "SpecialProperty";
        AnalyticStrKeys[AnalyticStrKeys["SpecifiedProperty"] = 15] = "SpecifiedProperty";
        AnalyticStrKeys[AnalyticStrKeys["C310"] = 16] = "C310";
        AnalyticStrKeys[AnalyticStrKeys["C320"] = 17] = "C320";
        AnalyticStrKeys[AnalyticStrKeys["Other"] = 18] = "Other";
    })(AnalyticStrKeys = F06100.AnalyticStrKeys || (F06100.AnalyticStrKeys = {}));
    var P2Sp5Table = (function (_super) {
        __extends(P2Sp5Table, _super);
        function P2Sp5Table(id, _sumTable) {
            var _this = _super.call(this, id, _sumTable.Document, _sumTable.Document.UniqueOrgsTable, [BaseObasTableFields.StrKeyField.Id, BaseObasTableFields.OwnerKeyField.Id]) || this;
            _this._sumTable = _sumTable;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P2Sp5Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.StrKeyField];
                    for (var i = 1, yearsCount = this.Document.Settings.YearsCount; i <= yearsCount; i++) {
                        this._copyFields.push(BaseObasTableFields.YearDataField.GenerateTableField(this, i));
                    }
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp5Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey !== AnalyticStrKeys.C360) {
                this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(P1StrKeys.Correction), oldValue, newValue);
            }
        };
        P2Sp5Table.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var yearField = BaseObasTableFields.YearDataField;
            for (var i = 1, yearsCount = this.Document.Settings.YearsCount; i <= yearsCount; i++) {
                var fieldId = yearField.GenerateId(i);
                this.SumChangeEventHandler(tableId, this.GetFieldValue(fieldId), 0, fieldId);
            }
        };
        P2Sp5Table.prototype.IsUserEditRow = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return !(strKey === AnalyticStrKeys.Total || strKey === AnalyticStrKeys.C100);
        };
        P2Sp5Table.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, function () { return _this.IsUserEditRow(); }, BaseObasTableFields.YearDataField);
        };
        P2Sp5Table.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        P2Sp5Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P2Sp5Table.prototype.CollectUserData = function () {
            var _this = this;
            return this.CollectTableData(this.InitCopyFieldsInfo(), function () { return _this.IsUserEditRow(); });
            ;
        };
        return P2Sp5Table;
    }(ObasTableWithStrKeysParent));
    F06100.P2Sp5Table = P2Sp5Table;
    var PartServWorkOrgIndicatorsTableKeys = (function (_super) {
        __extends(PartServWorkOrgIndicatorsTableKeys, _super);
        function PartServWorkOrgIndicatorsTableKeys(servWorkKey, year, orgKey, IndicatorKey) {
            var _this = _super.call(this, servWorkKey, year, orgKey) || this;
            _this.IndicatorKey = IndicatorKey;
            return _this;
        }
        return PartServWorkOrgIndicatorsTableKeys;
    }(PartServWorkOrgTableKeys));
    F06100.PartServWorkOrgIndicatorsTableKeys = PartServWorkOrgIndicatorsTableKeys;
    var IndicatorCostField = (function (_super) {
        __extends(IndicatorCostField, _super);
        function IndicatorCostField(id, _table, _postFix) {
            if (_postFix === void 0) { _postFix = "Obas"; }
            var _this = _super.call(this, EditorProObjectTypes.None, id) || this;
            _this._table = _table;
            _this._postFix = _postFix;
            _this._obas = null;
            _this._cost = null;
            return _this;
        }
        Object.defineProperty(IndicatorCostField.prototype, "Cost", {
            get: function () {
                if (this._cost == null) {
                    this._cost = new NumberObasTableField(this.Id, this._table);
                }
                return this._cost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndicatorCostField.prototype, "Obas", {
            get: function () {
                if (this._obas == null) {
                    this._obas = new NumberObasTableField("" + this.Id + IndicatorCostField.Delimiter + this._postFix, this._table);
                }
                return this._obas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndicatorCostField.prototype, "Table", {
            get: function () {
                return this._table;
            },
            enumerable: true,
            configurable: true
        });
        IndicatorCostField.prototype.ResetData = function () {
            this.Cost.NValue = 0;
            this.Obas.NValue = 0;
        };
        return IndicatorCostField;
    }(BaseObject));
    IndicatorCostField.Delimiter = "_";
    F06100.IndicatorCostField = IndicatorCostField;
    var IndicatorAnalyticCostField = (function (_super) {
        __extends(IndicatorAnalyticCostField, _super);
        function IndicatorAnalyticCostField(id, table, _analyticStrKey) {
            var _this = _super.call(this, id, table) || this;
            _this._analyticStrKey = _analyticStrKey;
            return _this;
        }
        Object.defineProperty(IndicatorAnalyticCostField.prototype, "AnalyticStrKey", {
            get: function () {
                return this._analyticStrKey;
            },
            enumerable: true,
            configurable: true
        });
        return IndicatorAnalyticCostField;
    }(IndicatorCostField));
    F06100.IndicatorAnalyticCostField = IndicatorAnalyticCostField;
    var IndicatorOtCostField = (function (_super) {
        __extends(IndicatorOtCostField, _super);
        function IndicatorOtCostField(_groupIndex, _table) {
            var _this = _super.call(this, EditorProObjectTypes.None, "Ot" + _groupIndex) || this;
            _this._groupIndex = _groupIndex;
            _this._table = _table;
            _this._total = null;
            _this._salary = null;
            _this._payments = null;
            _this._addPayments = null;
            _this._other = null;
            _this._specialSalary = null;
            return _this;
        }
        Object.defineProperty(IndicatorOtCostField.prototype, "SpecialSalary", {
            get: function () {
                if (this._specialSalary == null) {
                    this
                        ._specialSalary = new IndicatorAnalyticCostField(this.GenFieldId("SpecialSalary"), this._table, AnalyticStrKeys.C151);
                }
                return this._specialSalary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndicatorOtCostField.prototype, "Other", {
            get: function () {
                if (this._other == null) {
                    this
                        ._other = new IndicatorAnalyticCostField(this.GenFieldId("Other"), this._table, AnalyticStrKeys.DependedCosts);
                }
                return this._other;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndicatorOtCostField.prototype, "AddPayments", {
            get: function () {
                if (this._addPayments == null) {
                    this
                        ._addPayments = new IndicatorAnalyticCostField(this.GenFieldId("AddPayments"), this._table, AnalyticStrKeys.C123);
                }
                return this._addPayments;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndicatorOtCostField.prototype, "Payments", {
            get: function () {
                if (this._payments == null) {
                    this
                        ._payments = new IndicatorAnalyticCostField(this.GenFieldId("Payments"), this._table, AnalyticStrKeys.C122);
                }
                return this._payments;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndicatorOtCostField.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this
                        ._salary = new IndicatorAnalyticCostField(this.GenFieldId("Salary"), this._table, AnalyticStrKeys.C121);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndicatorOtCostField.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new IndicatorCostField(this.GenFieldId("Total"), this._table);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        IndicatorOtCostField.prototype.GenFieldId = function (fieldPart) {
            return "" + this.Id + IndicatorCostField.Delimiter + fieldPart;
        };
        return IndicatorOtCostField;
    }(BaseObject));
    F06100.IndicatorOtCostField = IndicatorOtCostField;
    var PartServiceWorkIndicatorsTable = (function (_super) {
        __extends(PartServiceWorkIndicatorsTable, _super);
        function PartServiceWorkIndicatorsTable(id, parentTable, _sumTable, _sumStrKey) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat("WorkIndex_ID"), parentTable.Document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._sumStrKey = _sumStrKey;
            _this._indicator = null;
            _this._uniqOrgHelper = null;
            _this._totalSum = null;
            _this._volume = null;
            _this._totalCost = null;
            _this._ot1 = null;
            _this._ot2 = null;
            _this._mz = null;
            _this._gsm = null;
            _this._inz = null;
            _this._ku = null;
            _this._sni = null;
            _this._socdi = null;
            _this._sr = null;
            _this._us = null;
            _this._tu = null;
            _this._pnz = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.OwnerKey,
                        this.Indicator.ForeignKey,
                        this.Volume,
                        this.Ot1.Salary.Cost,
                        this.Ot1.SpecialSalary.Cost,
                        this.Ot1.Payments.Cost,
                        this.Ot1.AddPayments.Cost,
                        this.Ot1.Other.Cost,
                        this.Ot2.Salary.Cost,
                        this.Ot2.SpecialSalary.Cost,
                        this.Ot2.Payments.Cost,
                        this.Ot2.AddPayments.Cost,
                        this.Ot2.Other.Cost,
                        this.Mz.Cost,
                        this.Inz.Cost,
                        this.Ku.Cost,
                        this.Sni.Cost,
                        this.Socdi.Cost,
                        this.Sr.Cost,
                        this.Us.Cost,
                        this.Tu.Cost,
                        this.Pnz.Cost,
                        this.Gsm.Cost
                    ];
                    this._copyFields = this._copyFields.concat(this.AddCopyFields);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Pnz", {
            get: function () {
                if (this._pnz == null) {
                    this._pnz = new IndicatorAnalyticCostField("Pnz", this, AnalyticStrKeys.Other);
                }
                return this._pnz;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Tu", {
            get: function () {
                if (this._tu == null) {
                    this._tu = new IndicatorAnalyticCostField("Tu", this, AnalyticStrKeys.C320);
                }
                return this._tu;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Us", {
            get: function () {
                if (this._us == null) {
                    this._us = new IndicatorAnalyticCostField("Us", this, AnalyticStrKeys.C310);
                }
                return this._us;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Sr", {
            get: function () {
                if (this._sr == null) {
                    this._sr = new IndicatorAnalyticCostField("Sr", this, AnalyticStrKeys.SpecifiedProperty);
                }
                return this._sr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Socdi", {
            get: function () {
                if (this._socdi == null) {
                    this._socdi = new IndicatorAnalyticCostField("Socdi", this, AnalyticStrKeys.SpecialProperty);
                }
                return this._socdi;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Sni", {
            get: function () {
                if (this._sni == null) {
                    this._sni = new IndicatorAnalyticCostField("Sni", this, AnalyticStrKeys.RealProperty);
                }
                return this._sni;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Ku", {
            get: function () {
                if (this._ku == null) {
                    this._ku = new IndicatorAnalyticCostField("Ku", this, AnalyticStrKeys.C330);
                }
                return this._ku;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Inz", {
            get: function () {
                if (this._inz == null) {
                    this._inz = new IndicatorAnalyticCostField("Inz", this, AnalyticStrKeys.DirectlyCosts);
                }
                return this._inz;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Gsm", {
            get: function () {
                if (this._gsm == null) {
                    this._gsm = new IndicatorAnalyticCostField("Gsm", this, AnalyticStrKeys.C360);
                }
                return this._gsm;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Mz", {
            get: function () {
                if (this._mz == null) {
                    this._mz = new IndicatorAnalyticCostField("Mz", this, AnalyticStrKeys.Purchase);
                }
                return this._mz;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Ot2", {
            get: function () {
                if (this._ot2 == null) {
                    this._ot2 = new IndicatorOtCostField(2, this);
                }
                return this._ot2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Ot1", {
            get: function () {
                if (this._ot1 == null) {
                    this._ot1 = new IndicatorOtCostField(1, this);
                }
                return this._ot1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "TotalCost", {
            get: function () {
                if (this._totalCost == null) {
                    this._totalCost = new IndicatorCostField("TotalCost", this);
                }
                return this._totalCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Volume", {
            get: function () {
                if (this._volume == null) {
                    this._volume = new NumberObasTableField("g8", this);
                }
                return this._volume;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "TotalSum", {
            get: function () {
                if (this._totalSum == null) {
                    this._totalSum = new IndicatorCostField("TotalSum", this);
                }
                return this._totalSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "UniqOrgHelper", {
            get: function () {
                if (this._uniqOrgHelper == null) {
                    this._uniqOrgHelper = new OrgYearTableHelper(this.Id, this.Document);
                }
                return this._uniqOrgHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Indicator", {
            get: function () {
                if (this._indicator == null) {
                    this._indicator = new ObasSprTableFieldTyped(ObasTableCollection.ServiceWorkIndicatorsSprTable, this);
                }
                return this._indicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Org", {
            get: function () {
                return this.ParentTable.Org;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "Year", {
            get: function () {
                return this.ParentTable.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "ServWorkKey", {
            get: function () {
                return this.ParentTable.ServWorkKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartServiceWorkIndicatorsTable.prototype, "FilterKey", {
            get: function () {
                return this.ServWorkKey.ForeignKey.Value + "_" + this.Org.ForeignKey.Value + "_" + this.Indicator.ForeignKey.Value;
            },
            enumerable: true,
            configurable: true
        });
        PartServiceWorkIndicatorsTable.prototype.GetKeys = function (servWorkKey, year, orgKey, indicatorKey) {
            if (servWorkKey === void 0) { servWorkKey = this.ServWorkKey.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (orgKey === void 0) { orgKey = this.Org.ForeignKey.Value; }
            if (indicatorKey === void 0) { indicatorKey = this.Indicator.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new PartServWorkOrgIndicatorsTableKeys(servWorkKey, year, orgKey, indicatorKey);
            }
            else {
                this._keys.ServWorkKey = servWorkKey;
                this._keys.Year = year;
                this._keys.OrgKey = orgKey;
                this._keys.IndicatorKey = indicatorKey;
            }
            return this._keys;
        };
        PartServiceWorkIndicatorsTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(this.UniqOrgHelper.YearOffset + 1), this._sumTable.GetKeys(this._sumStrKey), oldValue, newValue);
        };
        PartServiceWorkIndicatorsTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalSum.Cost.NValue = this.Volume.NValue * this.TotalCost.Cost.NValue;
        };
        PartServiceWorkIndicatorsTable.prototype.SumTotalCostChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalSum.Cost.NValue = this.Volume.NValue * this.TotalCost.Cost.NValue;
            this._sumTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(this.UniqOrgHelper.YearOffset + 1), this._sumTable.GetKeys(this._sumStrKey), oldValue, newValue);
        };
        PartServiceWorkIndicatorsTable.prototype.GetFieldProp = function (fieldId) {
            var fieldsParts = fieldId.split(IndicatorCostField.Delimiter);
            var fieldProp = this;
            for (var _i = 0, fieldsParts_1 = fieldsParts; _i < fieldsParts_1.length; _i++) {
                var fieldPropId = fieldsParts_1[_i];
                fieldProp = fieldProp["" + fieldPropId];
            }
            return fieldProp;
        };
        PartServiceWorkIndicatorsTable.prototype.ToThousandChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.GetFieldProp(fieldId).Obas.NValue = newValue / 1000;
        };
        PartServiceWorkIndicatorsTable.prototype.CostToObasChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ToThousandChangeEventHandler(tableId, this.Volume.NValue * oldValue, this.Volume.NValue * newValue, fieldId);
        };
        PartServiceWorkIndicatorsTable.prototype.AnalyticPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var mainFieldId = fieldId.split(IndicatorCostField.Delimiter)
                .slice(0, -1)
                .join(IndicatorCostField.Delimiter);
            var fieldProp = this.GetFieldProp(mainFieldId);
        };
        PartServiceWorkIndicatorsTable.prototype.CostPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CostToObasChangeEventHandler(tableId, oldValue, newValue, fieldId);
            this.TotalCost.Cost.NValue = this.Ot1.Total.Cost.NValue +
                this.Ot2.Total.Cost.NValue +
                this.Mz.Cost.NValue +
                this.Inz.Cost.NValue +
                this.Ku.Cost.NValue +
                this.Sni.Cost.NValue +
                this.Socdi.Cost.NValue +
                this.Sr.Cost.NValue +
                this.Us.Cost.NValue +
                this.Tu.Cost.NValue +
                this.Pnz.Cost.NValue;
        };
        PartServiceWorkIndicatorsTable.prototype.OtPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var otProp = this.GetFieldProp(fieldId.split(IndicatorCostField.Delimiter)[0]);
            otProp.Total.Cost.NValue = otProp.Salary.Cost.NValue +
                otProp.SpecialSalary.Cost.NValue +
                otProp.Payments.Cost.NValue +
                otProp.AddPayments.Cost.NValue +
                otProp.Other.Cost.NValue;
            this.CostPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        PartServiceWorkIndicatorsTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.IsCopied.Value = true;
            this.Ot1.Salary.Cost.NValue = 0;
            this.Ot1.SpecialSalary.Cost.NValue = 0;
            this.Ot1.Payments.Cost.NValue = 0;
            this.Ot1.AddPayments.Cost.NValue = 0;
            this.Ot1.Other.Cost.NValue = 0;
            this.Ot2.Salary.Cost.NValue = 0;
            this.Ot2.SpecialSalary.Cost.NValue = 0;
            this.Ot2.Payments.Cost.NValue = 0;
            this.Ot2.AddPayments.Cost.NValue = 0;
            this.Ot2.Other.Cost.NValue = 0;
            this.Mz.Cost.NValue = 0;
            this.Inz.Cost.NValue = 0;
            this.Ku.Cost.NValue = 0;
            this.Sni.Cost.NValue = 0;
            this.Socdi.Cost.NValue = 0;
            this.Sr.Cost.NValue = 0;
            this.Us.Cost.NValue = 0;
            this.Tu.Cost.NValue = 0;
            this.Pnz.Cost.NValue = 0;
        };
        PartServiceWorkIndicatorsTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var parentTable = this.ParentTable;
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(keys.ServWorkKey, year, keys.OrgKey), true);
                    copyData.getValue(this.OwnerKey.Id).Value = ownerKey;
                    keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        PartServiceWorkIndicatorsTable.prototype.CopyData = function (srcYear, destYear) {
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
                        _this.InnerCopyData(recordKey, destYear);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        PartServiceWorkIndicatorsTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        PartServiceWorkIndicatorsTable.prototype.IsRedyForCopy = function () {
            var _this = this;
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo, function (value, index, array) {
                return _this.IsRedyForCopyFilter(value, index, array);
            });
        };
        PartServiceWorkIndicatorsTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.Ot1.Salary.ResetData();
                _this.Ot1.SpecialSalary.ResetData();
                _this.Ot1.Payments.ResetData();
                _this.Ot1.AddPayments.ResetData();
                _this.Ot1.Other.ResetData();
                _this.Ot2.Salary.ResetData();
                _this.Ot2.SpecialSalary.ResetData();
                _this.Ot2.Payments.ResetData();
                _this.Ot2.AddPayments.ResetData();
                _this.Ot2.Other.ResetData();
                _this.Mz.ResetData();
                _this.Inz.ResetData();
                _this.Ku.ResetData();
                _this.Sni.ResetData();
                _this.Socdi.ResetData();
                _this.Sr.ResetData();
                _this.Us.ResetData();
                _this.Tu.ResetData();
                _this.Pnz.ResetData();
                _this.Volume.NValue = 0;
                _this.Ot1.Total.ResetData();
                _this.Ot2.Total.ResetData();
                _this.TotalCost.Cost.NValue = 0;
                _this.TotalSum.ResetData();
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
        PartServiceWorkIndicatorsTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PartServiceWorkIndicatorsTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        return PartServiceWorkIndicatorsTable;
    }(ObasTableWithKeysParent));
    F06100.PartServiceWorkIndicatorsTable = PartServiceWorkIndicatorsTable;
    var P2ServiceIndicatorsTable = (function (_super) {
        __extends(P2ServiceIndicatorsTable, _super);
        function P2ServiceIndicatorsTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._averageValue = null;
            _this._addCopyFields = null;
            return _this;
        }
        Object.defineProperty(P2ServiceIndicatorsTable.prototype, "AddCopyFields", {
            get: function () {
                if (this._addCopyFields == null) {
                    this._addCopyFields = [this.AverageValue];
                }
                return this._addCopyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2ServiceIndicatorsTable.prototype, "AverageValue", {
            get: function () {
                if (this._averageValue == null) {
                    this._averageValue = new NumberObasTableField("AverageValue", this);
                }
                return this._averageValue;
            },
            enumerable: true,
            configurable: true
        });
        P2ServiceIndicatorsTable.prototype.IsRedyForCopyFilter = function (value, index, array) {
            return !(value.Id === this.Gsm.Cost.Id ||
                value.Id === this.AverageValue.Id);
        };
        return P2ServiceIndicatorsTable;
    }(PartServiceWorkIndicatorsTable));
    F06100.P2ServiceIndicatorsTable = P2ServiceIndicatorsTable;
    var P2WorkIndicatorsTable = (function (_super) {
        __extends(P2WorkIndicatorsTable, _super);
        function P2WorkIndicatorsTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._addCopyFields = [];
            return _this;
        }
        Object.defineProperty(P2WorkIndicatorsTable.prototype, "AddCopyFields", {
            get: function () {
                return this._addCopyFields;
            },
            enumerable: true,
            configurable: true
        });
        P2WorkIndicatorsTable.prototype.IsRedyForCopyFilter = function (value, index, array) {
            return value.Id !== this.Gsm.Cost.Id;
        };
        return P2WorkIndicatorsTable;
    }(PartServiceWorkIndicatorsTable));
    F06100.P2WorkIndicatorsTable = P2WorkIndicatorsTable;
})(F06100 || (F06100 = {}));
