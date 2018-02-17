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
var F05305;
(function (F05305) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05305.TableRules = TableRules;
    var RegionsDataTableKeys = (function (_super) {
        __extends(RegionsDataTableKeys, _super);
        function RegionsDataTableKeys(OwnerKey) {
            var _this = _super.call(this) || this;
            _this.OwnerKey = OwnerKey;
            return _this;
        }
        return RegionsDataTableKeys;
    }(ObasTableKeys));
    F05305.RegionsDataTableKeys = RegionsDataTableKeys;
    var YearRegionsDataTableKeys = (function (_super) {
        __extends(YearRegionsDataTableKeys, _super);
        function YearRegionsDataTableKeys(ownerKey, Year) {
            var _this = _super.call(this, ownerKey) || this;
            _this.Year = Year;
            return _this;
        }
        return YearRegionsDataTableKeys;
    }(RegionsDataTableKeys));
    F05305.YearRegionsDataTableKeys = YearRegionsDataTableKeys;
    var RegionsTable = (function (_super) {
        __extends(RegionsTable, _super);
        function RegionsTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RegionsTable;
    }(SubsidiesSubventions.FRegionsTable));
    F05305.RegionsTable = RegionsTable;
    var RegionsDataTable = (function (_super) {
        __extends(RegionsDataTable, _super);
        function RegionsDataTable(id, document, parentTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id], document, parentTable) || this;
            _this._total = null;
            _this._copyFields = null;
            _this._fireTotal = null;
            _this._fireArea = null;
            _this._firePay = null;
            _this._coefTotal = null;
            _this._coefClass = null;
            _this._coefLoad = null;
            _this._subvensTotal = null;
            _this._coefArea = null;
            return _this;
        }
        Object.defineProperty(RegionsDataTable.prototype, "CoefArea", {
            get: function () {
                if (this._coefArea == null) {
                    this._coefArea = new NumberGenericObasTableField("AreaCoef_Y", this);
                }
                return this._coefArea;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "SubvensTotal", {
            get: function () {
                if (this._subvensTotal == null) {
                    this._subvensTotal = new NumberGenericObasTableField("Subvensions_Y", this);
                }
                return this._subvensTotal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "CoefLoad", {
            get: function () {
                if (this._coefLoad == null) {
                    this._coefLoad = new NumberGenericObasTableField("LoadCoef_Y", this);
                }
                return this._coefLoad;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "CoefClass", {
            get: function () {
                if (this._coefClass == null) {
                    this._coefClass = new NumberGenericObasTableField("ClassCoef_Y", this);
                }
                return this._coefClass;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "CoefTotal", {
            get: function () {
                if (this._coefTotal == null) {
                    this._coefTotal = new NumberGenericObasTableField("TotalCoef_Y", this);
                }
                return this._coefTotal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "FirePay", {
            get: function () {
                if (this._firePay == null) {
                    this._firePay = new NumberGenericObasTableField("FireSafe_Pay_Y", this);
                }
                return this._firePay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "FireArea", {
            get: function () {
                if (this._fireArea == null) {
                    this._fireArea = new NumberGenericObasTableField("FireSafe_Area_Y", this);
                }
                return this._fireArea;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "FireTotal", {
            get: function () {
                if (this._fireTotal == null) {
                    this._fireTotal = new NumberGenericObasTableField("FireSafe_Y", this);
                }
                return this._fireTotal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey];
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(_this.CoefLoad.GetFieldByYearIndex(yearIndex));
                        _this._copyFields.push(_this.CoefClass.GetFieldByYearIndex(yearIndex));
                        _this._copyFields.push(_this.FirePay.GetFieldByYearIndex(yearIndex));
                        _this._copyFields.push(_this.FireArea.GetFieldByYearIndex(yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsDataTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberGenericObasTableField(BaseObasTableFields.YearDataField.Id, this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        RegionsDataTable.prototype.GetKeys = function (ownerKey) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new RegionsDataTableKeys(ownerKey);
            }
            else {
                this._keys.OwnerKey = ownerKey;
            }
            return this._keys;
        };
        RegionsDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        RegionsDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        RegionsDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, this.CoefLoad, this.CoefClass, this.FireArea, this.FirePay);
        };
        RegionsDataTable.prototype.ResetDataFields = function () {
            return [this.CoefLoad, this.CoefClass, this.FireArea, this.FirePay,
                this.CoefArea, this.CoefTotal, this.FireTotal, this.SubvensTotal, this.Total];
        };
        RegionsDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, this.ResetDataFields());
        };
        RegionsDataTable.prototype.CoefTotalPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.CoefTotal.GetFieldByField(fieldId).NValue =
                this.CoefArea.GetFieldByField(fieldId).NValue *
                    this.CoefClass.GetFieldByField(fieldId).NValue *
                    this.CoefLoad.GetFieldByField(fieldId).NValue;
        };
        RegionsDataTable.prototype.FireTotalPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.FireTotal.GetFieldByField(fieldId).NValue =
                this.FireArea.GetFieldByField(fieldId).NValue *
                    this.CoefTotal.GetFieldByField(fieldId).NValue *
                    this.FirePay.GetFieldByField(fieldId).NValue;
        };
        RegionsDataTable.prototype.TotalPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.GetFieldByField(fieldId).NValue =
                this.SubvensTotal.GetFieldByField(fieldId).NValue +
                    this.FireTotal.GetFieldByField(fieldId).NValue;
        };
        return RegionsDataTable;
    }(ObasTableWithKeysParent));
    F05305.RegionsDataTable = RegionsDataTable;
    var RegionsYearDataTable = (function (_super) {
        __extends(RegionsYearDataTable, _super);
        function RegionsYearDataTable(id, document, parentTable, _sumTable, _sumField) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, BaseObasTableFields.YearField.Id], document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._sumField = _sumField;
            _this._year = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._total = null;
            return _this;
        }
        Object.defineProperty(RegionsYearDataTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberObasTableField("Total", this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsYearDataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsYearDataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RegionsYearDataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        RegionsYearDataTable.prototype.GetKeys = function (year, ownerKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new YearRegionsDataTableKeys(ownerKey, year);
            }
            else {
                this._keys.Year = year;
                this._keys.OwnerKey = ownerKey;
            }
            return this._keys;
        };
        RegionsYearDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        RegionsYearDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        RegionsYearDataTable.prototype.ResetData = function (keys) {
            var _this = this;
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    this.ResetHandler();
                }
            }
            else {
                this.Iterate(function () {
                    _this.ResetHandler();
                });
            }
        };
        RegionsYearDataTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var endYear = this.Document.Settings.StartYear + this.Document.Settings.YearsCount;
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
        RegionsYearDataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var yearData = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yearData.Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        RegionsYearDataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, this.Document.Settings.StartYear + this.Document.Settings.YearsCount - 1);
            }
        };
        RegionsYearDataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        RegionsYearDataTable.prototype.TotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetValueByKeys(this._sumField.GenerateId(ObasHelper.GetYearOffset(this) + 1), this._sumTable.GetKeys(this.OwnerKey.Value), newValue);
        };
        return RegionsYearDataTable;
    }(ObasTableWithKeysParent));
    var SubvensionsDataTable = (function (_super) {
        __extends(SubvensionsDataTable, _super);
        function SubvensionsDataTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._execArea = null;
            _this._noForestArea = null;
            _this._rentArea = null;
            _this._tundraArea = null;
            _this._execPay = null;
            _this._contentPay = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(SubvensionsDataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Year, this.OwnerKey, this.ContentPay, this.ExecPay, this.TundraArea,
                        this.RentArea, this.NoForestArea, this.ExecArea
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubvensionsDataTable.prototype, "ContentPay", {
            get: function () {
                if (this._contentPay == null) {
                    this._contentPay = new NumberObasTableField("ContentPay", this);
                }
                return this._contentPay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubvensionsDataTable.prototype, "ExecPay", {
            get: function () {
                if (this._execPay == null) {
                    this._execPay = new NumberObasTableField("ExecPay", this);
                }
                return this._execPay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubvensionsDataTable.prototype, "TundraArea", {
            get: function () {
                if (this._tundraArea == null) {
                    this._tundraArea = new NumberObasTableField("TundraArea", this);
                }
                return this._tundraArea;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubvensionsDataTable.prototype, "RentArea", {
            get: function () {
                if (this._rentArea == null) {
                    this._rentArea = new NumberObasTableField("RentArea", this);
                }
                return this._rentArea;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubvensionsDataTable.prototype, "NoForestArea", {
            get: function () {
                if (this._noForestArea == null) {
                    this._noForestArea = new NumberObasTableField("NoForestArea", this);
                }
                return this._noForestArea;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubvensionsDataTable.prototype, "ExecArea", {
            get: function () {
                if (this._execArea == null) {
                    this._execArea = new NumberObasTableField("ExecArea", this);
                }
                return this._execArea;
            },
            enumerable: true,
            configurable: true
        });
        SubvensionsDataTable.prototype.TotalPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var execArea = this.ExecArea.NValue;
            this.Total.NValue = (execArea - this.NoForestArea.NValue - this.RentArea.NValue - this.TundraArea.NValue) *
                this.ExecPay.NValue +
                this.ContentPay.NValue * execArea;
        };
        SubvensionsDataTable.prototype.ResetHandler = function () {
            this.ContentPay.NValue = 0;
            this.ExecPay.NValue = 0;
            this.TundraArea.NValue = 0;
            this.RentArea.NValue = 0;
            this.NoForestArea.NValue = 0;
            this.ExecArea.NValue = 0;
            this.Total.NValue = 0;
        };
        return SubvensionsDataTable;
    }(RegionsYearDataTable));
    F05305.SubvensionsDataTable = SubvensionsDataTable;
    var CoefficientsDataTable = (function (_super) {
        __extends(CoefficientsDataTable, _super);
        function CoefficientsDataTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._class1 = null;
            _this._class2 = null;
            _this._class3 = null;
            _this._class4 = null;
            _this._class5 = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(CoefficientsDataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Year, this.OwnerKey, this.Class1, this.Class2, this.Class3,
                        this.Class4, this.Class5
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefficientsDataTable.prototype, "Class1", {
            get: function () {
                if (this._class1 == null) {
                    this._class1 = new NumberObasTableField("Class1", this);
                }
                return this._class1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefficientsDataTable.prototype, "Class2", {
            get: function () {
                if (this._class2 == null) {
                    this._class2 = new NumberObasTableField("Class2", this);
                }
                return this._class2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefficientsDataTable.prototype, "Class3", {
            get: function () {
                if (this._class3 == null) {
                    this._class3 = new NumberObasTableField("Class3", this);
                }
                return this._class3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefficientsDataTable.prototype, "Class4", {
            get: function () {
                if (this._class4 == null) {
                    this._class4 = new NumberObasTableField("Class4", this);
                }
                return this._class4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefficientsDataTable.prototype, "Class5", {
            get: function () {
                if (this._class5 == null) {
                    this._class5 = new NumberObasTableField("Class5", this);
                }
                return this._class5;
            },
            enumerable: true,
            configurable: true
        });
        CoefficientsDataTable.prototype.TotalPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var class1 = this.Class1.NValue;
            var class2 = this.Class2.NValue;
            var class3 = this.Class3.NValue;
            var class4 = this.Class4.NValue;
            var class5 = this.Class5.NValue;
            this.Total.NValue = (class1 * 5 + class2 * 4 + class3 * 3 + class4 * 2 + class5) /
                (class1 + class2 + class3 + class4 + class5);
        };
        CoefficientsDataTable.prototype.ResetHandler = function () {
            this.Class1.NValue = 0;
            this.Class2.NValue = 0;
            this.Class3.NValue = 0;
            this.Class4.NValue = 0;
            this.Class5.NValue = 0;
            this.Total.NValue = 0;
        };
        return CoefficientsDataTable;
    }(RegionsYearDataTable));
    F05305.CoefficientsDataTable = CoefficientsDataTable;
})(F05305 || (F05305 = {}));
