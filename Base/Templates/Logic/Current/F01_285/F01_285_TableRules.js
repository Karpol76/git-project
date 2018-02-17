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
var F01285;
(function (F01285) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F01285.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Fot"] = 3] = "Fot";
        StrKeysP1Total[StrKeysP1Total["Change"] = 4] = "Change";
        StrKeysP1Total[StrKeysP1Total["Correction"] = 2] = "Correction";
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F01285.StrKeysP1Total || (F01285.StrKeysP1Total = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        P1TotalTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F01285.P1TotalTable = P1TotalTable;
    var YearPostObasTableKeys = (function (_super) {
        __extends(YearPostObasTableKeys, _super);
        function YearPostObasTableKeys(Year, PositionKey) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            _this.PositionKey = PositionKey;
            return _this;
        }
        return YearPostObasTableKeys;
    }(ObasTableKeys));
    var P2DataTable = (function (_super) {
        __extends(P2DataTable, _super);
        function P2DataTable(id, document, _sumTable, _uniqPostTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.YearField.Id, "PostName_ID"], document) || this;
            _this._sumTable = _sumTable;
            _this._uniqPostTable = _uniqPostTable;
            _this._org = null;
            _this._country = null;
            _this._year = null;
            _this._post = null;
            _this._usdFot = null;
            _this._rubFot = null;
            _this._isCopied = null;
            _this._delPostKey = null;
            _this._copyData = null;
            _this._employeeCount = null;
            _this._salary = null;
            _this._otherPremium = null;
            _this._warPremium = null;
            _this._hardSituationPremium = null;
            _this._countryPremium = null;
            _this._copyFields = null;
            _uniqPostTable.AddChildTable(_this);
            return _this;
        }
        Object.defineProperty(P2DataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Year, this.Post.ForeignKey, this.EmployeeCount, this.Salary, this.CountryPremium,
                        this.HardSituationPremium, this.WarPremium, this.OtherPremium, this.CountMonth
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "CountryPremium", {
            get: function () {
                if (this._countryPremium == null) {
                    this._countryPremium = new NumberObasTableField("g6", this);
                }
                return this._countryPremium;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "HardSituationPremium", {
            get: function () {
                if (this._hardSituationPremium == null) {
                    this._hardSituationPremium = new NumberObasTableField("g7", this);
                }
                return this._hardSituationPremium;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "WarPremium", {
            get: function () {
                if (this._warPremium == null) {
                    this._warPremium = new NumberObasTableField("g8", this);
                }
                return this._warPremium;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "OtherPremium", {
            get: function () {
                if (this._otherPremium == null) {
                    this._otherPremium = new NumberObasTableField("g9", this);
                }
                return this._otherPremium;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this._salary = new NumberObasTableField("g5", this);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "EmployeeCount", {
            get: function () {
                if (this._employeeCount == null) {
                    this._employeeCount = new NumberObasTableField("g4", this);
                }
                return this._employeeCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "RubFot", {
            get: function () {
                if (this._rubFot == null) {
                    this._rubFot = new NumberObasTableField("RubFot", this);
                }
                return this._rubFot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "UsdFot", {
            get: function () {
                if (this._usdFot == null) {
                    this._usdFot = new NumberObasTableField("UsdFot", this);
                }
                return this._usdFot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "CountMonth", {
            get: function () {
                if (this._countMonth == null) {
                    this._countMonth = new NumberObasTableField("CountMonth", this);
                }
                return this._countMonth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Post", {
            get: function () {
                if (this._post == null) {
                    this._post = new ObasSprTableField(this.Document.PostSprTable, this);
                }
                return this._post;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - this.Document.Settings.StartYear;
            },
            enumerable: true,
            configurable: true
        });
        P2DataTable.prototype.GetKeys = function (year, postKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (postKey === void 0) { postKey = this.Post.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new YearPostObasTableKeys(year, postKey);
            }
            else {
                this._keys.Year = year;
                this._keys.PositionKey = postKey;
            }
            return this._keys;
        };
        P2DataTable.prototype.CalcPercent = function (field) {
            return field.NValue / 100;
        };
        P2DataTable.prototype.UsdPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UsdFot.Value = this.CountMonth.NValue *
                this.EmployeeCount.NValue *
                this.Salary.NValue *
                (this.CalcPercent(this.CountryPremium) +
                    this.CalcPercent(this.HardSituationPremium) +
                    this.CalcPercent(this.WarPremium) +
                    this.CalcPercent(this.OtherPremium) +
                    1);
        };
        P2DataTable.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.RubFot.Value = newValue * this.Document.CommonRules.GetDollarRateByYear(this.Year.Value);
        };
        P2DataTable.prototype.RubChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(this.YearOffset + 1), this._sumTable.GetKeys(StrKeysP1Total.Fot), oldValue, newValue);
        };
        P2DataTable.prototype.PostChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._uniqPostTable.DeleteElement(oldValue);
            this._uniqPostTable.AddElement(newValue);
        };
        P2DataTable.prototype.DeleteEventHandler = function (tableId) {
            this.RubFot.Value = 0;
            this._delPostKey = this.Post.ForeignKey.Value;
        };
        P2DataTable.prototype.AfterDeleteEventHandler = function (tableId) {
            this._uniqPostTable.DeleteElement(this._delPostKey);
        };
        P2DataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P2DataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2DataTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                for (var i = 4; i < 10; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.UsdFot.Value = 0;
                _this.RubFot.Value = 0;
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
        P2DataTable.prototype.CopyData = function (srcYear, destYear) {
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
        P2DataTable.prototype.InnerCopyData = function (recordKey, endYear) {
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
        P2DataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, this.Document.Settings.StartYear + this.Document.Settings.YearsCount - 1);
            }
        };
        P2DataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P2DataTable.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.CountMonth.NValue;
            if (countMonth >= 0 && countMonth <= 12) {
                this.UsdPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("CountMonth", oldValue);
            }
        };
        return P2DataTable;
    }(ObasTableWithKeys));
    F01285.P2DataTable = P2DataTable;
    var TableP3 = (function (_super) {
        __extends(TableP3, _super);
        function TableP3(id, document, _sumTable) {
            var _this = _super.call(this, id, document, ["PostName_ID"]) || this;
            _this._sumTable = _sumTable;
            _this._post = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(TableP3.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.Post.ForeignKey];
                    var usdField_1 = BaseObasTableFields.UsdYearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(usdField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3.prototype, "Post", {
            get: function () {
                if (this._post == null) {
                    this._post = new ObasSprTableField(this.Document.PostSprTable, this);
                }
                return this._post;
            },
            enumerable: true,
            configurable: true
        });
        TableP3.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearOffset + 1), newValue * this.Document.CommonRules.GetDollarRateByYear(this.Document.Settings.StartYear + yearOffset));
        };
        TableP3.prototype.RubChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(StrKeysP1Total.Change), oldValue, newValue);
        };
        TableP3.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, undefined, BaseObasTableFields.UsdYearDataField);
        };
        TableP3.prototype.ResetData = function (postKey) {
            var _this = this;
            this.Document.CommonRules
                .ResetTableData(this, [
                BaseObasTableFields.UsdYearDataField,
                BaseObasTableFields.YearDataField
            ], postKey == null
                ? undefined
                : function () {
                    return _this.Post.ForeignKey.Locate(postKey);
                });
        };
        TableP3.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP3.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return TableP3;
    }(TypedDocumentUniqueObasTable));
    F01285.TableP3 = TableP3;
})(F01285 || (F01285 = {}));
