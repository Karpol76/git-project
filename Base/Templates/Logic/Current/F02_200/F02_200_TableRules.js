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
var F02200;
(function (F02200) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F02200.TableRules = TableRules;
    var P1TableStrKeys;
    (function (P1TableStrKeys) {
        P1TableStrKeys[P1TableStrKeys["Total"] = 1] = "Total";
    })(P1TableStrKeys = F02200.P1TableStrKeys || (F02200.P1TableStrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1TableStrKeys.Total;
        };
        ;
        return P1TotalTable;
    }(P1TotalObasTable));
    F02200.P1TotalTable = P1TotalTable;
    var P2StrKeys;
    (function (P2StrKeys) {
        P2StrKeys[P2StrKeys["PremiumCost"] = 15] = "PremiumCost";
    })(P2StrKeys = F02200.P2StrKeys || (F02200.P2StrKeys = {}));
    var P2DataTable = (function (_super) {
        __extends(P2DataTable, _super);
        function P2DataTable(id, document, parent, _sumTable) {
            var _this = _super.call(this, id, document, parent) || this;
            _this._sumTable = _sumTable;
            return _this;
        }
        Object.defineProperty(P2DataTable, "PayYearField", {
            get: function () {
                if (this._payYearField == null) {
                    this._payYearField = new BaseGenericObasTableField("Pay_Y");
                }
                return this._payYearField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable, "InsCountYearField", {
            get: function () {
                if (P2DataTable._insCountYearField == null) {
                    P2DataTable._insCountYearField = new BaseGenericObasTableField("InsCount_Y");
                }
                return P2DataTable._insCountYearField;
            },
            enumerable: true,
            configurable: true
        });
        P2DataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(P1TableStrKeys.Total), oldValue, newValue);
        };
        P2DataTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var insCount = this.GetFieldValue(P2DataTable.InsCountYearField.GenerateId(fieldId)) || 0;
            var pay = this.GetFieldValue(P2DataTable.PayYearField.GenerateId(fieldId)) || 0;
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), insCount * pay);
        };
        P2DataTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount - 1;
            var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount;
            var insCountField = P2DataTable.InsCountYearField;
            var payField = P2DataTable.PayYearField;
            var yearField = BaseObasTableFields.YearDataField;
            var insCountSrcFieldId = insCountField.GenerateId(srcIndex);
            var insCountDestFieldId = insCountField.GenerateId(destIndex);
            var paySrcFieldId = payField.GenerateId(srcIndex);
            var payDestFieldId = payField.GenerateId(destIndex);
            var yearSrcFieldId = yearField.GenerateId(srcIndex);
            var yearDestFieldId = yearField.GenerateId(destIndex);
            var copy = function () {
                if (_this.StrKey === P2StrKeys.PremiumCost) {
                    _this.SetFieldValue(yearDestFieldId, _this.GetFieldValue(yearSrcFieldId));
                }
                else {
                    _this.SetFieldValue(insCountDestFieldId, _this.GetFieldValue(insCountSrcFieldId));
                    _this.SetFieldValue(payDestFieldId, _this.GetFieldValue(paySrcFieldId));
                }
            };
            this.Iterate(copy);
        };
        P2DataTable.prototype.ResetData = function (strKey) {
            var _this = this;
            var payField = P2DataTable.PayYearField;
            var yearField = BaseObasTableFields.YearDataField;
            var insCountField = P2DataTable.InsCountYearField;
            var insFieldsCount = F02200.P2Sheet.AddYearsCount + ObasStageSettings.YearsCount;
            var resetHandler = function () {
                for (var j = 1; j <= insFieldsCount; j++) {
                    var index = j - F02200.P2Sheet.AddYearsCount;
                    _this.SetFieldValue(insCountField.GenerateId(index), 0);
                }
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    _this.SetFieldValue(payField.GenerateId(i), 0);
                    _this.SetFieldValue(yearField.GenerateId(i), 0);
                }
            };
            if (strKey != null) {
                if (this.StrKeyField.Locate(strKey)) {
                    resetHandler();
                }
            }
            else {
                this.Iterate(resetHandler);
            }
        };
        P2DataTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.StrKeyField.Id, {
                Id: this.StrKeyField.Id,
                IsData: false
            });
            var payField = P2DataTable.PayYearField;
            var yearField = BaseObasTableFields.YearDataField;
            var insCountField = P2DataTable.InsCountYearField;
            for (var i = 1, len = F02200.P2Sheet.AddYearsCount + ObasStageSettings.YearsCount; i <= len; i++) {
                var index = i - F02200.P2Sheet.AddYearsCount;
                var fieldId = insCountField.GenerateId(index);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                var fieldId = yearField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
                fieldId = payField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            return result;
        };
        P2DataTable.prototype.CollectUserData = function () {
            var result = this.CollectTableData(this.InitCopyFieldsInfo());
            var yearField = BaseObasTableFields.YearDataField;
            var strKeyId = this.StrKeyField.Id;
            var _loop_1 = function (record) {
                var data = record.Data;
                var strKey = data.getValue(strKeyId).Value;
                if (strKey === P2StrKeys.PremiumCost) {
                    var payField_1 = P2DataTable.PayYearField;
                    var insCountField = P2DataTable.InsCountYearField;
                    this_1.Document.IterateByYears(function (i) {
                        data.remove(payField_1.GenerateId(i));
                    });
                    for (var i = 1, len = F02200.P2Sheet.AddYearsCount + this_1.YearsCount; i <= len; i++) {
                        var index = i - F02200.P2Sheet.AddYearsCount;
                        data.remove(insCountField.GenerateId(index));
                    }
                }
                else {
                    this_1.Document.IterateByYears(function (i) {
                        data.remove(yearField.GenerateId(i));
                    });
                }
            };
            var this_1 = this;
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var record = result_1[_i];
                _loop_1(record);
            }
            return result;
        };
        return P2DataTable;
    }(ObasTableWithStrKeysParent));
    P2DataTable._insCountYearField = null;
    P2DataTable._payYearField = null;
    F02200.P2DataTable = P2DataTable;
})(F02200 || (F02200 = {}));
