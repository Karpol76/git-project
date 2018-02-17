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
var F05304;
(function (F05304) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05304.TableRules = TableRules;
    var RegionsTable = (function (_super) {
        __extends(RegionsTable, _super);
        function RegionsTable(id, document) {
            return _super.call(this, id, document) || this;
        }
        return RegionsTable;
    }(SubsidiesSubventions.FRegionsTable));
    F05304.RegionsTable = RegionsTable;
    var CoefsTopDataTable = (function (_super) {
        __extends(CoefsTopDataTable, _super);
        function CoefsTopDataTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._totalCoef = null;
            _this._total = null;
            _this._totalChangeEvent = null;
            _this._totalCoefChangeEvent = null;
            return _this;
        }
        Object.defineProperty(CoefsTopDataTable.prototype, "TotalCoefChangeEvent", {
            get: function () {
                if (this._totalCoefChangeEvent == null) {
                    this._totalCoefChangeEvent = new ObasTableFieldChangeEvent();
                }
                return this._totalCoefChangeEvent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsTopDataTable.prototype, "TotalChangeEvent", {
            get: function () {
                if (this._totalChangeEvent == null) {
                    this._totalChangeEvent = new ObasTableFieldChangeEvent();
                }
                return this._totalChangeEvent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsTopDataTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberGenericObasTableField(BaseObasTableFields.YearDataField.Id, this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsTopDataTable.prototype, "TotalCoef", {
            get: function () {
                if (this._totalCoef == null) {
                    this._totalCoef = new NumberGenericObasTableField("Total_Coef_Y", this);
                }
                return this._totalCoef;
            },
            enumerable: true,
            configurable: true
        });
        CoefsTopDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, this.Total);
        };
        CoefsTopDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [this.TotalCoef]);
        };
        return CoefsTopDataTable;
    }(ObasTableWithStrKeysParent));
    F05304.CoefsTopDataTable = CoefsTopDataTable;
    var CoefInfoFields = (function (_super) {
        __extends(CoefInfoFields, _super);
        function CoefInfoFields(id, _table) {
            var _this = _super.call(this, EditorProObjectTypes.None, id) || this;
            _this._table = _table;
            _this._value = null;
            _this._coefficient = null;
            _this._coefficientInfo = null;
            return _this;
        }
        Object.defineProperty(CoefInfoFields.prototype, "CoefficientInfo", {
            get: function () {
                if (this._coefficientInfo == null) {
                    this._coefficientInfo = new ObasSprTableFieldTyped(ObasTableCollection.Coefficients05304SprTable, this._table, this.Id + "_Coef");
                }
                return this._coefficientInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefInfoFields.prototype, "Coefficient", {
            get: function () {
                if (this._coefficient == null) {
                    this._coefficient = new NumberObasTableField(this.Id + "_Coef", this._table);
                }
                return this._coefficient;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefInfoFields.prototype, "Value", {
            get: function () {
                if (this._value == null) {
                    this._value = new NumberObasTableField(this.Id + "_Value", this._table);
                }
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        CoefInfoFields.prototype.InfoChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Coefficient.NValue = this.CoefficientInfo.ForeignKey.SourceTable.Value.NValue;
        };
        return CoefInfoFields;
    }(BaseObject));
    var CoefsDataTableKeys = (function (_super) {
        __extends(CoefsDataTableKeys, _super);
        function CoefsDataTableKeys(OwnerKey, Year) {
            var _this = _super.call(this) || this;
            _this.OwnerKey = OwnerKey;
            _this.Year = Year;
            return _this;
        }
        return CoefsDataTableKeys;
    }(ObasTableKeys));
    F05304.CoefsDataTableKeys = CoefsDataTableKeys;
    var CoefsDataTable = (function (_super) {
        __extends(CoefsDataTable, _super);
        function CoefsDataTable(id, document, parentTable, _sumTable, tP4Sheet) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, BaseObasTableFields.YearField.Id], document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this.tP4Sheet = tP4Sheet;
            _this._waterCoef = null;
            _this._peopleCoef = null;
            _this._coastlineCoef = null;
            _this._isCopied = null;
            _this._year = null;
            _this._totalCoef = null;
            _this._situationCoef = null;
            _this._totalSum = null;
            _this._copyFields = null;
            _this._copyData = null;
            var startYear = _this.Document.Settings.StartYear;
            parentTable.AddTableAddListener(function () {
                _this.Document.IterateByYears(function (yearOffset) {
                    _this.AddRow();
                    _this.Year.DefferedSetValue(startYear + yearOffset);
                    _this.PostRow();
                }, false);
            });
            _sumTable.TotalChangeEvent.Add(function (table, oldValue, newValue, fieldId) {
                var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
                var year = _this.Document.Settings.StartYear + yearOffset;
                var recordKey = _this.RecordKey.Value;
                while (_this.Year.Locate(year, true)) {
                    _this.UpdateTotalSum(newValue);
                }
                _this.ClearLocateFlag();
                _this.RecordKey.Locate(recordKey);
                _this.tP4Sheet.Refresh();
            });
            _sumTable.TotalCoefChangeEvent.Add(function (table, oldValue, newValue, fieldId) {
                var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
                var year = _this.Document.Settings.StartYear + yearOffset;
                var recordKey = _this.RecordKey.Value;
                while (_this.Year.Locate(year, true)) {
                    _this.UpdateSituationCoef(newValue);
                }
                _this.ClearLocateFlag();
                _this.RecordKey.Locate(recordKey);
            });
            return _this;
        }
        Object.defineProperty(CoefsDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    var fieldInsert = function (coefFields) {
                        _this._copyFields.push(coefFields.CoefficientInfo.ForeignKey);
                        _this._copyFields.push(coefFields.Coefficient);
                    };
                    this._copyFields = [this.OwnerKey, this.Year];
                    fieldInsert(this.WaterCoef);
                    fieldInsert(this.PeopleCoef);
                    fieldInsert(this.CoastlineCoef);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "TotalSum", {
            get: function () {
                if (this._totalSum == null) {
                    this._totalSum = new NumberObasTableField("Total_Sum", this);
                }
                return this._totalSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "SituationCoef", {
            get: function () {
                if (this._situationCoef == null) {
                    this._situationCoef = new NumberObasTableField("Situation_Coef", this);
                }
                return this._situationCoef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "TotalCoef", {
            get: function () {
                if (this._totalCoef == null) {
                    this._totalCoef = new NumberObasTableField("Total_Coef", this);
                }
                return this._totalCoef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "CoastlineCoef", {
            get: function () {
                if (this._coastlineCoef == null) {
                    this._coastlineCoef = new CoefInfoFields("Coastline", this);
                }
                return this._coastlineCoef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "PeopleCoef", {
            get: function () {
                if (this._peopleCoef == null) {
                    this._peopleCoef = new CoefInfoFields("People", this);
                }
                return this._peopleCoef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "WaterCoef", {
            get: function () {
                if (this._waterCoef == null) {
                    this._waterCoef = new CoefInfoFields("Water", this);
                }
                return this._waterCoef;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefsDataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        CoefsDataTable.prototype.CoefChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalCoef.NValue =
                this.WaterCoef.Coefficient.NValue *
                    this.PeopleCoef.Coefficient.NValue *
                    this.CoastlineCoef.Coefficient.NValue;
        };
        CoefsDataTable.prototype.TotalCoefChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var sumField = this._sumTable.TotalCoef.GenerateId(ObasHelper.GetYearOffset(this) + 1);
            var sumKeys = this._sumTable.GetKeys(SubsidiesSubventions.StrKeysP1Total.Total);
            this._sumTable.SetSumByKeys(sumField, sumKeys, oldValue, newValue);
            var topCoefVal = this._sumTable.GetValueByKeys(sumField, sumKeys) || 0;
            this.UpdateSituationCoef(topCoefVal, newValue);
        };
        CoefsDataTable.prototype.UpdateSituationCoef = function (topCoefVal, coefVal) {
            if (coefVal === void 0) { coefVal = this.TotalCoef.NValue; }
            this.SituationCoef.NValue = topCoefVal === 0 ? 0 : coefVal / topCoefVal;
        };
        CoefsDataTable.prototype.SituationCoefChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var topSumVal = this._sumTable.GetValueByKeys(this._sumTable.Total.GenerateId(ObasHelper.GetYearOffset(this) + 1), this._sumTable.GetKeys(SubsidiesSubventions.StrKeysP1Total.Total)) || 0;
            this.UpdateTotalSum(topSumVal, newValue);
        };
        CoefsDataTable.prototype.UpdateTotalSum = function (totalSum, situationCoef) {
            if (situationCoef === void 0) { situationCoef = this.SituationCoef.NValue; }
            this.TotalSum.NValue = situationCoef * totalSum;
        };
        CoefsDataTable.prototype.ResetData = function () {
            var _this = this;
            var resetHandler = function () {
                _this.TotalSum.NValue =
                    _this.TotalCoef.NValue =
                        _this.SituationCoef.NValue =
                            _this.WaterCoef.Coefficient.NValue =
                                _this.PeopleCoef.Coefficient.NValue =
                                    _this.CoastlineCoef.Coefficient.NValue = 0;
            };
            this.Iterate(resetHandler);
        };
        CoefsDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.TotalCoef.NValue = 0;
        };
        CoefsDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        CoefsDataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        CoefsDataTable.prototype.CopyData = function (srcYear, destYear) {
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
        CoefsDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        CoefsDataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    copyData.getValue(this.Year.Id).Value =
                        keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.RecordKey.Locate(recordKey);
            }
        };
        CoefsDataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        CoefsDataTable.prototype.GetKeys = function (ownerKey, year) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new CoefsDataTableKeys(ownerKey, year);
            }
            else {
                this._keys.Year = year;
                this._keys.OwnerKey = ownerKey;
            }
            return this._keys;
        };
        return CoefsDataTable;
    }(ObasTableWithKeysParent));
    F05304.CoefsDataTable = CoefsDataTable;
})(F05304 || (F05304 = {}));
