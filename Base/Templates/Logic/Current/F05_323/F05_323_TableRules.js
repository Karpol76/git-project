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
var F05323;
(function (F05323) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05323.TableRules = TableRules;
    var SocialPayFields = (function (_super) {
        __extends(SocialPayFields, _super);
        function SocialPayFields(id, _table) {
            var _this = _super.call(this, EditorProObjectTypes.None, id) || this;
            _this._table = _table;
            _this._count = null;
            _this._pay = null;
            _this._otherPay = null;
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
        Object.defineProperty(SocialPayFields.prototype, "OtherPay", {
            get: function () {
                if (this._otherPay == null) {
                    this._otherPay = new NumberGenericObasTableField(this.Id + "_OtherPay_Y", this._table);
                }
                return this._otherPay;
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
            this.Total.GetFieldByField(fieldId)
                .NValue = this.Count.GetFieldByField(fieldId).NValue *
                this.Pay.GetFieldByField(fieldId).NValue +
                this.OtherPay.GetFieldByField(fieldId).NValue;
        };
        SocialPayFields.prototype.CopyFields = function () {
            return [this.Count, this.Pay, this.OtherPay];
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
            _this._chernobyl = null;
            _this._mayak = null;
            _this._semipalatinsk = null;
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
        Object.defineProperty(SubjectsDataTable.prototype, "Semipalatinsk", {
            get: function () {
                if (this._semipalatinsk == null) {
                    this._semipalatinsk = new SocialPayFields("Semipalatinsk", this);
                }
                return this._semipalatinsk;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "Mayak", {
            get: function () {
                if (this._mayak == null) {
                    this._mayak = new SocialPayFields("Mayak", this);
                }
                return this._mayak;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectsDataTable.prototype, "Chernobyl", {
            get: function () {
                if (this._chernobyl == null) {
                    this._chernobyl = new SocialPayFields("Chernobyl", this);
                }
                return this._chernobyl;
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
                        _this._copyFields.push(field.OtherPay.GetFieldByYearIndex(yearIndex));
                    };
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GetFieldByYearIndex(i));
                        socFieldsGen_1(_this.Chernobyl, i);
                        socFieldsGen_1(_this.Mayak, i);
                        socFieldsGen_1(_this.Semipalatinsk, i);
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        SubjectsDataTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.GetFieldByField(fieldId).NValue = this.Chernobyl.Total.GetFieldByField(fieldId).NValue +
                this.Mayak.Total.GetFieldByField(fieldId).NValue +
                this.Semipalatinsk.Total.GetFieldByField(fieldId).NValue;
        };
        SubjectsDataTable.prototype.SocialPaySumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var socPayField = fieldId.split(SocialPayFields.Delimiter)[0];
            this[socPayField].UpdateTotal(fieldId);
        };
        SubjectsDataTable.prototype.ResetFields = function () {
            return [this.Total].concat(this.Chernobyl.ResetFields()).concat(this.Mayak.ResetFields())
                .concat(this.Semipalatinsk.ResetFields());
        };
        SubjectsDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, this.ResetFields());
        };
        SubjectsDataTable.prototype.CopyData = function (srcYear, destYear) {
            var copyFields = this.Chernobyl.CopyFields().concat(this.Mayak.CopyFields())
                .concat(this.Semipalatinsk.CopyFields());
            (_a = this.Document.CommonRules).CopyTableData.apply(_a, [this, srcYear, destYear, null].concat(copyFields));
            var _a;
        };
        return SubjectsDataTable;
    }(SubsidiesSubventions.FRegionsTable));
    F05323.SubjectsDataTable = SubjectsDataTable;
})(F05323 || (F05323 = {}));
