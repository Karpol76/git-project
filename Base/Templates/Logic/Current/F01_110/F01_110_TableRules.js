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
var F01110;
(function (F01110) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F01110.TableRules = TableRules;
    var P1TotalStrKeys;
    (function (P1TotalStrKeys) {
        P1TotalStrKeys[P1TotalStrKeys["Total"] = 1] = "Total";
        P1TotalStrKeys[P1TotalStrKeys["CalcedFotIns"] = 2] = "CalcedFotIns";
        P1TotalStrKeys[P1TotalStrKeys["OtherIns"] = 3] = "OtherIns";
    })(P1TotalStrKeys = F01110.P1TotalStrKeys || (F01110.P1TotalStrKeys = {}));
    var P1TotalTable = (function (_super) {
    	var _needCalcYearDataField;
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetDataByVersion = function (rroObasVersion, yearIndex) {
            var _this = this;
            var currentVersion = this.Document.ObasVersion;
            var synonimVersion = ObasHelper.GetSynonymVersion(currentVersion);
            var totalSum = 0;
            var collector = function (field) {
                _this.Iterate(function () {
                    if (!_this.IsTotal) {
                        totalSum += _this.GetFieldValue(field.GenerateId(yearIndex));
                    }
                });
                return totalSum;
            };
            switch (rroObasVersion) {
                case currentVersion:
                    return collector(BaseObasTableFields.FotYearDataField);
                case synonimVersion:
                    return collector(BaseObasTableFields.InsuranceYearDataField);
                default:
                    return undefined;
            }
        };
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1TotalStrKeys.Total;
        };
        P1TotalTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var fotField = BaseObasTableFields.FotYearDataField;
            var insField = BaseObasTableFields.InsuranceYearDataField;
            if (fotField.Equal(fieldId) || insField.Equal(fieldId)) {
                if (this.StrKey === 100) {
                    if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                        Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                        this.SetFieldValue(fieldId, oldValue);
                    }
                }
                var yearIndex = ObasHelper.GetYearIndexById(fieldId);
                this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearIndex), this.GetFieldValue(fotField.GenerateId(yearIndex)) +
                    this.GetFieldValue(insField.GenerateId(yearIndex)));
                if (!this.IsTotal) {
                    this.SetSumByKeys(fieldId, this.GetKeys(P1TotalStrKeys.Total), oldValue, newValue);
                }
            }     
        };
        P1TotalTable.prototype.ResetData = function (keys) {
            this.Document.CommonRules
                .ResetTableDataWithKeys(this, keys, BaseObasTableFields.FotYearDataField, BaseObasTableFields.InsuranceYearDataField, BaseObasTableFields.YearDataField);
        };
        P1TotalTable.prototype.IsCalcedFotInsRow = function (tableId, strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return strKey === P1TotalStrKeys.CalcedFotIns;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F01110.P1TotalTable = P1TotalTable;
    var P2Sp4ObasTable = (function (_super) {
        __extends(P2Sp4ObasTable, _super);
        function P2Sp4ObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sp4ObasTable.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var destTable = this.ParentTable;
            destTable.SetSumByKeys(BaseObasTableFields.InsuranceYearDataField.GenerateId(fieldId), destTable.GetKeys(P1TotalStrKeys.CalcedFotIns), oldValue, newValue);
        };
        return P2Sp4ObasTable;
    }(InsuranceObasTable));
    F01110.P2Sp4ObasTable = P2Sp4ObasTable;
    var OnlyInsuranceTable = (function (_super) {
        __extends(OnlyInsuranceTable, _super);
        function OnlyInsuranceTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OnlyInsuranceTable;
    }(OnlyInsuranceObasTable));
    F01110.OnlyInsuranceTable = OnlyInsuranceTable;
    var YearPostObasTableKeys = (function (_super) {
        __extends(YearPostObasTableKeys, _super);
        function YearPostObasTableKeys(Year, PostCategoryKey, PostNameKey) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            _this.PostCategoryKey = PostCategoryKey;
            _this.PostNameKey = PostNameKey;
            return _this;
        }
        return YearPostObasTableKeys;
    }(ObasTableKeys));
    F01110.YearPostObasTableKeys = YearPostObasTableKeys;
    var P2Sp3DataTable = (function (_super) {
        __extends(P2Sp3DataTable, _super);
        function P2Sp3DataTable(id, document, _insurTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.YearField.Id, "PostCategory_ID", "PostName_ID"], document) || this;
            _this._insurTable = _insurTable;
            _this._copyData = null;
            _this._year = null;
            _this._isCopied = null;
            _this._postKey = null;
            _this._postNameKey = null;
            _this._payment = null;
            _this._obasSum = null;
            _this._emplCount = null;
            _this._salary = null;
            _this._compensation = null;
            _this._stimul = null;
            _this._copyFields = null;
            _this._countMonth = null;
            _this._isCopied = new ObasTableField(DocumentSettings.IsCopiedFlagFieldId, _this);
            return _this;
        }
        Object.defineProperty(P2Sp3DataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.Year, this.PostName.ForeignKey, this.Position.ForeignKey, this.EmplCount, this.Salary, this.Compensation, this.Stimul, this.CountMonth];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "Stimul", {
            get: function () {
                if (this._stimul == null) {
                    this._stimul = new NumberObasTableField("g7", this);
                }
                return this._stimul;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "Compensation", {
            get: function () {
                if (this._compensation == null) {
                    this._compensation = new NumberObasTableField("g6", this);
                }
                return this._compensation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this._salary = new NumberObasTableField("g5", this);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "EmplCount", {
            get: function () {
                if (this._emplCount == null) {
                    this._emplCount = new NumberObasTableField("g3", this);
                }
                return this._emplCount;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(P2Sp3DataTable.prototype, "CountMonth", {
            get: function () {
                if (this._countMonth == null) {
                    this._countMonth = new NumberObasTableField("g8", this);
                }
                return this._countMonth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(P2Sp3DataTable.prototype, "ObasSum", {
            get: function () {
                if (this._obasSum == null) {
                    this._obasSum = new NumberObasTableField("g9", this);
                }
                return this._obasSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "Payment", {
            get: function () {
                if (this._payment == null) {
                    this._payment = new NumberObasTableField("g4", this);
                }
                return this._payment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "Position", {
            get: function () {
                if (this._postKey == null) {
                    this._postKey = new ObasSprTableField(ObasTableCollection.PostCategoryTable, this);
                }
                return this._postKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "PostName", {
            get: function () {
                if (this._postNameKey == null) {
                    this._postNameKey = new ObasSprTableField(this.Document.PostNameSprTable, this);
                }
                return this._postNameKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        P2Sp3DataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P2Sp3DataTable.prototype.CopyData = function (srcYear, destYear) {
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
        P2Sp3DataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P2Sp3DataTable.prototype.InnerCopyData = function (recordKey, endYear) {
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
        P2Sp3DataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        Object.defineProperty(P2Sp3DataTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp3DataTable.prototype.UpdateFotValue = function () {
            this.ObasSum.NValue = P2Sp3DataTable.FotFormula(this.EmplCount.NValue, this.Payment.NValue, this.CountMonth.NValue);
        };
        P2Sp3DataTable.FotFormula = function (count, salary, countmonth) {
            return ObasHelper.ModRound(count * salary * countmonth, 2);
        };
        P2Sp3DataTable.prototype.CountChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._insurTable.SetCountValue(this.YearOffset, oldValue, newValue);
            this.UpdateFotValue();
        };
        P2Sp3DataTable.prototype.SalaryPartChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Payment.NValue = this.Salary.NValue + this.Compensation.NValue + this.Stimul.NValue;
        };
        P2Sp3DataTable.prototype.FotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._insurTable.ParentTable.SetSumByKeys(BaseObasTableFields.FotYearDataField.GenerateId(this.YearOffset + 1), this._insurTable.ParentTable.GetKeys(P1TotalStrKeys.CalcedFotIns), oldValue, newValue);
            this._insurTable.SetFotValue(this.YearOffset, oldValue, newValue);
        };
        P2Sp3DataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.ObasSum.NValue = 0;
        };
        P2Sp3DataTable.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.CountMonth.NValue >= 0 && this.CountMonth.NValue <= 12) {
                this.UpdateFotValue();
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.CountMonth.NValue = oldValue;
            }
        };
        P2Sp3DataTable.prototype.GetKeys = function (year, postKey, postNameKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (postKey === void 0) { postKey = this.Position.ForeignKey.Value; }
            if (postNameKey === void 0) { postNameKey = this.PostName.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new YearPostObasTableKeys(year, postKey, postNameKey);
            }
            else {
                this._keys.Year = year;
                this._keys.PostCategoryKey = postKey;
                this._keys.PostNameKey = postNameKey;
            }
            return this._keys;
        };
        P2Sp3DataTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 3; i <= 8; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
            };
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    resetDataHandler();
                }
            }
            else {
                this.Iterate(resetDataHandler);
            }
        };
        P2Sp3DataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        return P2Sp3DataTable;
    }(ObasTableWithKeys));
    F01110.P2Sp3DataTable = P2Sp3DataTable;
    var PostNameSprTable = (function (_super) {
        __extends(PostNameSprTable, _super);
        function PostNameSprTable() {
            return _super.call(this, "PostName") || this;
        }
        return PostNameSprTable;
    }(SprTable));
    F01110.PostNameSprTable = PostNameSprTable;
})(F01110 || (F01110 = {}));
