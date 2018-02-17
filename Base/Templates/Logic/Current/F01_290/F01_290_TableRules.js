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
var F01290;
(function (F01290) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F01290.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["FundTotal"] = 1] = "FundTotal";
        P1StrKeys[P1StrKeys["FundWage"] = 2] = "FundWage";
        P1StrKeys[P1StrKeys["FundInsurance"] = 3] = "FundInsurance";
        P1StrKeys[P1StrKeys["ChangesTotal"] = 4] = "ChangesTotal";
        P1StrKeys[P1StrKeys["ChangesWage"] = 5] = "ChangesWage";
        P1StrKeys[P1StrKeys["ChangesInsurance"] = 6] = "ChangesInsurance";
        P1StrKeys[P1StrKeys["CorrectionTotal"] = 7] = "CorrectionTotal";
        P1StrKeys[P1StrKeys["CorrectionWage"] = 8] = "CorrectionWage";
        P1StrKeys[P1StrKeys["CorrectionInsurance"] = 9] = "CorrectionInsurance";
        P1StrKeys[P1StrKeys["Total"] = 10] = "Total";
        P1StrKeys[P1StrKeys["TotalWage"] = 11] = "TotalWage";
        P1StrKeys[P1StrKeys["TotalInsurance"] = 12] = "TotalInsurance";
        P1StrKeys[P1StrKeys["RoundingCorrection"] = 13] = "RoundingCorrection";
    })(P1StrKeys = F01290.P1StrKeys || (F01290.P1StrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._copyFields = null;
            return _this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1StrKeys.Total;
        };
        P1TotalTable.prototype.GetSumByKeys = function (fieldId) {
            var keys = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                keys[_i - 1] = arguments[_i];
            }
            var sum = 0;
            for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                var key = keys_1[_a];
                sum += this.GetValueByKeys(fieldId, this.GetKeys(key)) || 0;
            }
            return sum;
        };
        P1TotalTable.prototype.CalcSum = function (fieldId, sumStrKey) {
            var sourceKeys = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                sourceKeys[_i - 2] = arguments[_i];
            }
            var sum = this.GetSumByKeys.apply(this, [fieldId].concat(sourceKeys));
            this.SetValueByKeys(fieldId, this.GetKeys(sumStrKey), sum);
        };
        P1TotalTable.prototype.CalcCorrection = function (fieldId, sumStrKey) {
            var sourceKeys = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                sourceKeys[_i - 2] = arguments[_i];
            }
            var sum = this.GetSumByKeys.apply(this, [fieldId].concat(sourceKeys));
            if (sum < 0) {
                sum = sum *
                    ObasTableCollection.CorrectionFactorsTable
                        .GetValue(this.Document.Settings.StartYear + ObasHelper.GetYearOffsetById(fieldId));
                this.SetValueByKeys(fieldId, this.GetKeys(sumStrKey), sum);
            }
        };
        P1TotalTable.prototype.InnerCalcCorrection = function (fieldId) {
            this.CalcCorrection(fieldId, P1StrKeys.CorrectionWage, P1StrKeys.FundWage, P1StrKeys.ChangesWage);
            this.CalcCorrection(fieldId, P1StrKeys.CorrectionInsurance, P1StrKeys.FundInsurance, P1StrKeys.ChangesInsurance);
        };
        P1TotalTable.prototype.InnerCalcSumTotal = function (fieldId) {
            this.CalcSum(fieldId, P1StrKeys.TotalWage, P1StrKeys.FundWage, P1StrKeys.ChangesWage, P1StrKeys.CorrectionWage);
            this.CalcSum(fieldId, P1StrKeys.TotalInsurance, P1StrKeys.FundInsurance, P1StrKeys.ChangesInsurance, P1StrKeys.CorrectionInsurance);
        };
        P1TotalTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            switch (this.StrKey) {
                case P1StrKeys.FundWage:
                case P1StrKeys.FundInsurance:
                    this.InnerCalcCorrection(fieldId);
                    this.CalcSum(fieldId, P1StrKeys.FundTotal, P1StrKeys.FundWage, P1StrKeys.FundInsurance);
                    this.InnerCalcSumTotal(fieldId);
                    break;
                case P1StrKeys.ChangesWage:
                case P1StrKeys.ChangesInsurance:
                    this.InnerCalcCorrection(fieldId);
                    this.CalcSum(fieldId, P1StrKeys.ChangesTotal, P1StrKeys.ChangesWage, P1StrKeys.ChangesInsurance);
                    this.InnerCalcSumTotal(fieldId);
                    break;
                case P1StrKeys.CorrectionWage:
                case P1StrKeys.CorrectionInsurance:
                    this.CalcSum(fieldId, P1StrKeys.CorrectionTotal, P1StrKeys.CorrectionWage, P1StrKeys.CorrectionInsurance);
                    this.InnerCalcSumTotal(fieldId);
                    break;
                case P1StrKeys.TotalWage:
                case P1StrKeys.TotalInsurance:
                case P1StrKeys.RoundingCorrection:
                    this.CalcSum(fieldId, P1StrKeys.Total, P1StrKeys.TotalWage, P1StrKeys.TotalInsurance, P1StrKeys.RoundingCorrection);
                    break;
            }
        };
        P1TotalTable.prototype.IsUserRow = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return (strKey === P1StrKeys.RoundingCorrection) ||
                (strKey === P1StrKeys.CorrectionInsurance) ||
                (strKey === P1StrKeys.CorrectionWage);
        };
        Object.defineProperty(P1TotalTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.OwnerKey
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P1TotalTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, function () { return _this.IsUserRow(); }, BaseObasTableFields.YearDataField);
        };
        P1TotalTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P1TotalTable.prototype.CollectUserData = function () {
            var _this = this;
            return this.CollectTableData(this.InitCopyFieldsInfo(), function () {
                return _this.IsUserRow();
            });
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F01290.P1TotalTable = P1TotalTable;
    var P2Sp1StrKeys;
    (function (P2Sp1StrKeys) {
        P2Sp1StrKeys[P2Sp1StrKeys["Total"] = 1] = "Total";
        P2Sp1StrKeys[P2Sp1StrKeys["Chairman"] = 10] = "Chairman";
        P2Sp1StrKeys[P2Sp1StrKeys["Deputy"] = 11] = "Deputy";
        P2Sp1StrKeys[P2Sp1StrKeys["Secretary"] = 12] = "Secretary";
        P2Sp1StrKeys[P2Sp1StrKeys["Workers"] = 13] = "Workers";
    })(P2Sp1StrKeys = F01290.P2Sp1StrKeys || (F01290.P2Sp1StrKeys = {}));
    var P2Sp1Table = (function (_super) {
        __extends(P2Sp1Table, _super);
        function P2Sp1Table(id, document, _parentStrKey, keyFields, _monthsTable, _insuranceTable) {
            var _this = _super.call(this, id, document, document.P1TotalTable, keyFields) || this;
            _this._parentStrKey = _parentStrKey;
            _this._monthsTable = _monthsTable;
            _this._insuranceTable = _insuranceTable;
            _this._copyFields = null;
            _this._yearDataField = null;
            _this._numberYearDataField = null;
            _this._wageYearDataField = null;
            _this._monthsTable.MonthChangeEvent.Add(function (table, oldValue, newValue, fieldId) {
                var month = table.GetMonthByField(fieldId);
                _this.Iterate(function () {
                    _this.CalcPayrollFund(fieldId, month);
                });
            });
            return _this;
        }
        Object.defineProperty(P2Sp1Table.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField];
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(_this.NumberYearDataField.GetFieldByYearIndex(yearIndex));
                        _this._copyFields.push(_this.WageYearDataField.GetFieldByYearIndex(yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1Table.prototype, "YearDataField", {
            get: function () {
                if (this._yearDataField == null) {
                    this._yearDataField = new NumberGenericObasTableField(BaseObasTableFields.YearDataField.Id, this);
                }
                return this._yearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1Table.prototype, "NumberYearDataField", {
            get: function () {
                if (this._numberYearDataField == null) {
                    this._numberYearDataField = new NumberGenericObasTableField("Number_Y", this);
                }
                return this._numberYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp1Table.prototype, "WageYearDataField", {
            get: function () {
                if (this._wageYearDataField == null) {
                    this._wageYearDataField = new NumberGenericObasTableField("Wage_Y", this);
                }
                return this._wageYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp1Table.prototype.TotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._parentStrKey), oldValue, newValue);
            this._insuranceTable.SetFotValue(ObasHelper.GetYearOffsetById(fieldId), oldValue, newValue);
        };
        P2Sp1Table.prototype.CalcPayrollFund = function (fieldId, month) {
            this.YearDataField.GetFieldByField(fieldId).NValue =
                this.NumberYearDataField.GetFieldByField(fieldId).NValue *
                    this.WageYearDataField.GetFieldByField(fieldId).NValue *
                    month;
        };
        P2Sp1Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var month = this._monthsTable.GetMonthByField(fieldId);
            this.CalcPayrollFund(fieldId, month);
        };
        P2Sp1Table.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, this.NumberYearDataField, this.WageYearDataField);
        };
        P2Sp1Table.prototype.ResetData = function (keys) {
            this.Document.CommonRules
                .ResetTableDataWithKeys(this, keys, this.NumberYearDataField, this.WageYearDataField, this.YearDataField);
        };
        P2Sp1Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2Sp1Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P2Sp1Table.prototype.GetKeys = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            if (this._keys == null) {
                this._keys = new StrObasTableKeys(strKey);
            }
            else {
                this._keys.StrKey = strKey;
            }
            return this._keys;
        };
        return P2Sp1Table;
    }(ObasTableWithStrKeysParent));
    F01290.P2Sp1Table = P2Sp1Table;
    var P2Sp2Table = (function (_super) {
        __extends(P2Sp2Table, _super);
        function P2Sp2Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sp2Table.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(fieldId), this.ParentTable.GetKeys(P1StrKeys.FundInsurance), oldValue, newValue);
        };
        return P2Sp2Table;
    }(InsuranceObasTable));
    F01290.P2Sp2Table = P2Sp2Table;
})(F01290 || (F01290 = {}));
