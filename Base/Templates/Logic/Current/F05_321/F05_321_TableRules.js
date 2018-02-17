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
var F05321;
(function (F05321) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05321.TableRules = TableRules;
    var P3TableStrKeys;
    (function (P3TableStrKeys) {
        P3TableStrKeys[P3TableStrKeys["Koef1"] = 1] = "Koef1";
        P3TableStrKeys[P3TableStrKeys["Koef2"] = 2] = "Koef2";
    })(P3TableStrKeys = F05321.P3TableStrKeys || (F05321.P3TableStrKeys = {}));
    var P3Table = (function (_super) {
        __extends(P3Table, _super);
        function P3Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return P3Table;
    }(SubsidiesSubventions.CoefficientsTable));
    F05321.P3Table = P3Table;
    var SocialPayFields = (function (_super) {
        __extends(SocialPayFields, _super);
        function SocialPayFields(id, _table) {
            var _this = _super.call(this, EditorProObjectTypes.None, id) || this;
            _this._table = _table;
            _this._count = null;
            _this._pay = null;
            _this._total = null;
            return _this;
        }
        Object.defineProperty(SocialPayFields.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberGenericObasTableField(this.Id + "_Y", this._table);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SocialPayFields.prototype, "Pay", {
            get: function () {
                if (this._pay == null) {
                    this._pay = new NumberGenericObasTableField(this.Id + "_Pay_Y", this._table);
                }
                return this._pay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SocialPayFields.prototype, "Count", {
            get: function () {
                if (this._count == null) {
                    this._count = new NumberGenericObasTableField(this.Id + "_Count_Y", this._table);
                }
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        SocialPayFields.prototype.UpdateTotal = function (fieldId) {
            this.Total.GetFieldByField(fieldId).NValue =
                this.Count.GetFieldByField(fieldId).NValue *
                    this.Pay.GetFieldByField(fieldId).NValue * 12;
        };
        SocialPayFields.prototype.CopyFields = function () {
            return [this.Count, this.Pay];
        };
        SocialPayFields.prototype.ResetFields = function () {
            var result = this.CopyFields();
            result.push(this.Total);
            return result;
        };
        return SocialPayFields;
    }(BaseObject));
    SocialPayFields.Delimiter = "_";
    var SubjectsDataTable = (function (_super) {
        __extends(SubjectsDataTable, _super);
        function SubjectsDataTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._permit = null;
            _this._travel = null;
            _this._total = null;
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
        Object.defineProperty(SubjectsDataTable.prototype, "Travel", {
            get: function () {
                if (this._travel == null) {
                    this._travel = new SocialPayFields("Travel", this);
                }
                return this._travel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "Permit", {
            get: function () {
                if (this._permit == null) {
                    this._permit = new SocialPayFields("Permit", this);
                }
                return this._permit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Subject.ForeignKey, this.ScienceCity.ForeignKey,
                        this.Zato.ForeignKey, this.MunicipalEntity.ForeignKey
                    ];
                    var yearField_1 = this.Total;
                    var socFieldsGen_1 = function (field, yearIndex) {
                        _this._copyFields.push(field.Count.GetFieldByYearIndex(yearIndex));
                        _this._copyFields.push(field.Pay.GetFieldByYearIndex(yearIndex));
                    };
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GetFieldByYearIndex(i));
                        socFieldsGen_1(_this.Travel, i);
                        socFieldsGen_1(_this.Permit, i);
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        SubjectsDataTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.GetFieldByField(fieldId).NValue = this.Travel.Total.GetFieldByField(fieldId).NValue +
                this.Permit.Total.GetFieldByField(fieldId).NValue;
        };
        SubjectsDataTable.prototype.SocialPaySumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var socPayField = fieldId.split(SocialPayFields.Delimiter)[0];
            this[socPayField].UpdateTotal(fieldId);
        };
        SubjectsDataTable.prototype.ResetFields = function () {
            return [this.Total].concat(this.Travel.ResetFields()).concat(this.Permit.ResetFields());
        };
        SubjectsDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, this.ResetFields());
        };
        SubjectsDataTable.prototype.CopyData = function (srcYear, destYear) {
            var copyFields = this.Travel.CopyFields().concat(this.Permit.CopyFields());
            (_a = this.Document.CommonRules).CopyTableData.apply(_a, [this, srcYear, destYear, null].concat(copyFields));
            var _a;
        };
        return SubjectsDataTable;
    }(SubsidiesSubventions.FRegionsTable));
    F05321.SubjectsDataTable = SubjectsDataTable;
})(F05321 || (F05321 = {}));
