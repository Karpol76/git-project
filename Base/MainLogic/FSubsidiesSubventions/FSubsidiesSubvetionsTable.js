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
var SubsidiesSubventions;
(function (SubsidiesSubventions) {
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = SubsidiesSubventions.StrKeysP1Total || (SubsidiesSubventions.StrKeysP1Total = {}));
    var P1TotalTableBase = (function (_super) {
        __extends(P1TotalTableBase, _super);
        function P1TotalTableBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._copyFields = null;
            return _this;
        }
        P1TotalTableBase.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        Object.defineProperty(P1TotalTableBase.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField, this.IsTotalKeyField];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P1TotalTableBase.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P1TotalTableBase.prototype.CollectUserData = function () {
            var _this = this;
            return this.CollectTableData(this.InitCopyFieldsInfo(), function () { return _this.IsUserEditRow(_this.StrKey); });
        };
        P1TotalTableBase.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        return P1TotalTableBase;
    }(P1TotalObasTable));
    SubsidiesSubventions.P1TotalTableBase = P1TotalTableBase;
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.IsUserEditRow = function (rowKey) {
            return true;
        };
        P1TotalTable.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        return P1TotalTable;
    }(P1TotalTableBase));
    SubsidiesSubventions.P1TotalTable = P1TotalTable;
    var KeySubjectDictionary;
    (function (KeySubjectDictionary) {
        KeySubjectDictionary[KeySubjectDictionary["Subject"] = 0] = "Subject";
        KeySubjectDictionary[KeySubjectDictionary["ScienceCity"] = 1] = "ScienceCity";
        KeySubjectDictionary[KeySubjectDictionary["Zato"] = 2] = "Zato";
        KeySubjectDictionary[KeySubjectDictionary["Municipal"] = 3] = "Municipal";
    })(KeySubjectDictionary = SubsidiesSubventions.KeySubjectDictionary || (SubsidiesSubventions.KeySubjectDictionary = {}));
    var FSubjectTable = (function (_super) {
        __extends(FSubjectTable, _super);
        function FSubjectTable(id, _document) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._subject = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(FSubjectTable.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FSubjectTable.prototype, "Subject", {
            get: function () {
                if (this._subject == null) {
                    this._subject = new ObasSprTableField(ObasTableCollection.SprSubject, this);
                }
                return this._subject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FSubjectTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.Subject.ForeignKey];
                    var yearField_2 = BaseObasTableFields.YearDataField;
                    this._document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_2.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        FSubjectTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        FSubjectTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        FSubjectTable.prototype.ResetData = function () {
            this._document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        FSubjectTable.prototype.CopyData = function (srcYear, destYear) {
            this._document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return FSubjectTable;
    }(ObasTable));
    SubsidiesSubventions.FSubjectTable = FSubjectTable;
    var FRegionsTable = (function (_super) {
        __extends(FRegionsTable, _super);
        function FRegionsTable(id, document) {
            var _this = _super.call(this, id, document) || this;
            _this._scienceCity = null;
            _this._zato = null;
            _this._municipalEntity = null;
            _this._name = null;
            return _this;
        }
        Object.defineProperty(FRegionsTable.prototype, "Name", {
            get: function () {
                if (this._name == null) {
                    this._name = new ObasTableField(BaseObasTableFields.NameField.Id, this);
                }
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FRegionsTable.prototype, "ScienceCity", {
            get: function () {
                if (this._scienceCity == null) {
                    this._scienceCity = new ObasSprTableField(ObasTableCollection.SprScienceCity, this);
                }
                return this._scienceCity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FRegionsTable.prototype, "Zato", {
            get: function () {
                if (this._zato == null) {
                    this._zato = new ObasSprTableField(ObasTableCollection.SprSecurityAdmTerrEntity, this);
                }
                return this._zato;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FRegionsTable.prototype, "MunicipalEntity", {
            get: function () {
                if (this._municipalEntity == null) {
                    this._municipalEntity = new ObasSprTableField(ObasTableCollection.SprMunicipalEntity, this);
                }
                return this._municipalEntity;
            },
            enumerable: true,
            configurable: true
        });
        FRegionsTable.prototype.IsNotEmptySprField = function (field) {
            return field.ForeignKey.Value != null;
        };
        FRegionsTable.prototype.CalcFieldSelect = function () {
            if (this.IsNotEmptySprField(this.MunicipalEntity)) {
                return KeySubjectDictionary.Municipal;
            }
            else if (this.IsNotEmptySprField(this.Zato)) {
                return KeySubjectDictionary.Zato;
            }
            else if (this.IsNotEmptySprField(this.ScienceCity)) {
                return KeySubjectDictionary.ScienceCity;
            }
            else {
                return KeySubjectDictionary.Subject;
            }
        };
        FRegionsTable.prototype.GetSubjectValue = function (fieldId, value) {
            var field;
            switch (fieldId) {
                case this.Subject.ForeignKey.Id:
                    field = this.Subject;
                    break;
                case this.MunicipalEntity.ForeignKey.Id:
                    field = this.MunicipalEntity;
                    break;
                case this.ScienceCity.ForeignKey.Id:
                    field = this.ScienceCity;
                    break;
                case this.Zato.ForeignKey.Id:
                    field = this.Zato;
                    break;
                default:
                    field = undefined;
            }
            return field ? field.Name : undefined;
        };
        Object.defineProperty(FRegionsTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Subject.ForeignKey, this.ScienceCity.ForeignKey, this.Zato.ForeignKey,
                        this.MunicipalEntity.ForeignKey
                    ];
                    var yearField_3 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_3.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        FRegionsTable.prototype.SourceFieldChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Name.Value = this.GetSubjectValue(fieldId, newValue);
        };
        return FRegionsTable;
    }(FSubjectTable));
    SubsidiesSubventions.FRegionsTable = FRegionsTable;
    var CoefficientsTable = (function (_super) {
        __extends(CoefficientsTable, _super);
        function CoefficientsTable(id, document) {
            var _this = _super.call(this, id, document) || this;
            _this._indicatorChangeEvent = null;
            _this._indicatorValue = null;
            return _this;
        }
        Object.defineProperty(CoefficientsTable.prototype, "IndicatorValue", {
            get: function () {
                if (this._indicatorValue == null) {
                    this._indicatorValue = new NumberGenericObasTableField(BaseObasTableFields.YearDataField.Id, this);
                }
                return this._indicatorValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoefficientsTable.prototype, "IndicatorChangeEvent", {
            get: function () {
                if (this._indicatorChangeEvent == null) {
                    this._indicatorChangeEvent = new ObasTableFieldChangeEvent();
                }
                return this._indicatorChangeEvent;
            },
            enumerable: true,
            configurable: true
        });
        CoefficientsTable.prototype.IndicatorChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.IndicatorChangeEvent.Do(this, oldValue, newValue, fieldId);
        };
        CoefficientsTable.prototype.GetIndicatorByYearIndex = function (yearIndex) {
            return this.IndicatorValue.GetFieldByYearIndex(yearIndex).NValue;
        };
        CoefficientsTable.prototype.GetIndicatorValues = function (yearIndex) {
            var _this = this;
            var result = new collections.Dictionary();
            this.Iterate(function () {
                result.setValue(_this.StrKey, _this.IndicatorValue.GetFieldByYearIndex(yearIndex).NValue);
            });
            return result;
        };
        CoefficientsTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, this.IndicatorValue);
        };
        return CoefficientsTable;
    }(ObasTableWithStr));
    SubsidiesSubventions.CoefficientsTable = CoefficientsTable;
})(SubsidiesSubventions || (SubsidiesSubventions = {}));
