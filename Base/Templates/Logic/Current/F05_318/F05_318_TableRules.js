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
var F05318;
(function (F05318) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05318.TableRules = TableRules;
    var InnerFields = (function (_super) {
        __extends(InnerFields, _super);
        function InnerFields(id, _document) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            return _this;
        }
        Object.defineProperty(InnerFields, "InvalidVolumeField", {
            get: function () {
                if (this._invalidVolumeField == null) {
                    this._invalidVolumeField = new BaseGenericObasTableField("Invalid_Y");
                }
                return this._invalidVolumeField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerFields, "VeteranVolumeField", {
            get: function () {
                if (this._veteranVolumeField == null) {
                    this._veteranVolumeField = new BaseGenericObasTableField("Veteran_Y");
                }
                return this._veteranVolumeField;
            },
            enumerable: true,
            configurable: true
        });
        InnerFields.prototype.VolumeChangedOnEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearIndex = ObasHelper.GetYearIndexById(fieldId);
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearIndex), (this.GetFieldValue(InnerFields.InvalidVolumeField.GenerateId(yearIndex)) || 0) +
                (this.GetFieldValue(InnerFields.VeteranVolumeField.GenerateId(yearIndex)) || 0));
        };
        InnerFields.prototype.ResetData = function () {
            this._document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField, InnerFields.InvalidVolumeField, InnerFields.VeteranVolumeField]);
        };
        InnerFields.prototype.CopyData = function (srcYear, destYear) {
            this._document.CommonRules.CopyTableData(this, srcYear, destYear, null, InnerFields.InvalidVolumeField, InnerFields.VeteranVolumeField);
        };
        return InnerFields;
    }(ObasTable));
    InnerFields._invalidVolumeField = null;
    InnerFields._veteranVolumeField = null;
    F05318.InnerFields = InnerFields;
    var TableP1 = (function (_super) {
        __extends(TableP1, _super);
        function TableP1(id, document) {
            var _this = _super.call(this, id, document) || this;
            _this._innerFields = null;
            return _this;
        }
        Object.defineProperty(TableP1.prototype, "InnerFields", {
            get: function () {
                if (this._innerFields == null) {
                    this._innerFields = new InnerFields(this.Id, this.Document);
                }
                return this._innerFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP1.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField, this.IsTotalKeyField];
                    var yearInvalidField_1 = InnerFields.InvalidVolumeField;
                    var yearVeteranField_1 = InnerFields.VeteranVolumeField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearInvalidField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(yearVeteranField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableP1.prototype.ResetData = function () {
            this.InnerFields.ResetData();
        };
        TableP1.prototype.CopyData = function (srcYear, destYear) {
            this.InnerFields.CopyData(srcYear, destYear);
        };
        return TableP1;
    }(SubsidiesSubventions.P1TotalTable));
    F05318.TableP1 = TableP1;
    var TableP2 = (function (_super) {
        __extends(TableP2, _super);
        function TableP2(id, document) {
            var _this = _super.call(this, id, document) || this;
            _this._innerFields = null;
            return _this;
        }
        Object.defineProperty(TableP2.prototype, "InnerFields", {
            get: function () {
                if (this._innerFields == null) {
                    this._innerFields = new InnerFields(this.Id, this.Document);
                }
                return this._innerFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.Subject.ForeignKey, this.ScienceCity.ForeignKey, this.Zato.ForeignKey,
                        this.MunicipalEntity.ForeignKey];
                    var yearInvalidField_2 = InnerFields.InvalidVolumeField;
                    var yearVeteranField_2 = InnerFields.VeteranVolumeField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearInvalidField_2.GenerateTableField(_this, i));
                        _this._copyFields.push(yearVeteranField_2.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableP2.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP2.prototype.ResetData = function () {
            this.InnerFields.ResetData();
        };
        TableP2.prototype.CopyData = function (srcYear, destYear) {
            this.InnerFields.CopyData(srcYear, destYear);
        };
        return TableP2;
    }(SubsidiesSubventions.FRegionsTable));
    F05318.TableP2 = TableP2;
})(F05318 || (F05318 = {}));
