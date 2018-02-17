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
var F05311;
(function (F05311) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05311.TableRules = TableRules;
    var CoefTableStrKeys;
    (function (CoefTableStrKeys) {
        CoefTableStrKeys[CoefTableStrKeys["Coef1"] = 1] = "Coef1";
        CoefTableStrKeys[CoefTableStrKeys["Coef2"] = 2] = "Coef2";
    })(CoefTableStrKeys = F05311.CoefTableStrKeys || (F05311.CoefTableStrKeys = {}));
    var SubjectsDataTable = (function (_super) {
        __extends(SubjectsDataTable, _super);
        function SubjectsDataTable(id, document, _indicatorsTable) {
            var _this = _super.call(this, id, document) || this;
            _this._indicatorsTable = _indicatorsTable;
            _this._count = null;
            _this._costs = null;
            _this._total = null;
            _this._indicatorsTable.IndicatorChangeEvent.Add(function (table, oldValue, newValue, fieldId) {
                var yearIndex = ObasHelper.GetYearIndexById(fieldId);
                var coefs = table.GetIndicatorValues(yearIndex);
                var coef1 = coefs.getValue(CoefTableStrKeys.Coef1);
                var coef2 = coefs.getValue(CoefTableStrKeys.Coef2);
                _this.Iterate(function () {
                    _this.CalcSubvention(coef1, coef2, fieldId);
                }, true);
            });
            return _this;
        }
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
        Object.defineProperty(SubjectsDataTable.prototype, "Costs", {
            get: function () {
                if (this._costs == null) {
                    this._costs = new NumberGenericObasTableField("Costs_Y", this);
                }
                return this._costs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "Count", {
            get: function () {
                if (this._count == null) {
                    this._count = new NumberGenericObasTableField("Count_Y", this);
                }
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Subject.ForeignKey
                    ];
                    var countField_1 = this.Count;
                    var costsField_1 = this.Costs;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(countField_1.GetFieldByYearIndex(i));
                        _this._copyFields.push(costsField_1.GetFieldByYearIndex(i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        SubjectsDataTable.prototype.ParameterChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearIndex = ObasHelper.GetYearIndexById(fieldId);
            var coefs = this._indicatorsTable.GetIndicatorValues(yearIndex);
            var coef1 = coefs.getValue(CoefTableStrKeys.Coef1);
            var coef2 = coefs.getValue(CoefTableStrKeys.Coef2);
            this.CalcSubvention(coef1, coef2, fieldId);
        };
        SubjectsDataTable.prototype.CalcSubvention = function (coef1, coef2, fieldId) {
            this.Total.GetFieldByField(fieldId).NValue =
                (coef1 || 0) * (coef2 || 0) * this.Count.GetFieldByField(fieldId).NValue *
                    (1 + this.Costs.GetFieldByField(fieldId).NValue / 100);
        };
        SubjectsDataTable.prototype.ResetFields = function () {
            return [this.Total, this.Count, this.Costs];
        };
        SubjectsDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, this.ResetFields());
        };
        SubjectsDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, this.Count, this.Costs);
        };
        return SubjectsDataTable;
    }(SubsidiesSubventions.FSubjectTable));
    F05311.SubjectsDataTable = SubjectsDataTable;
})(F05311 || (F05311 = {}));
