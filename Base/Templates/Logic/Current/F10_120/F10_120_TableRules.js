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
var F10120;
(function (F10120) {
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "OtherUsdField", {
            get: function () {
                if (this._otherUsdField == null) {
                    this._otherUsdField = new BaseGenericObasTableField("USD_Other_Y");
                }
                return this._otherUsdField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "OtherRubField", {
            get: function () {
                if (this._otherRubField == null) {
                    this._otherRubField = new BaseGenericObasTableField("Other_Y");
                }
                return this._otherRubField;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._otherRubField = null;
    ObasTableFields._otherUsdField = null;
    F10120.ObasTableFields = ObasTableFields;
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F10120.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["P2"] = 2] = "P2";
        StrKeysP1Total[StrKeysP1Total["P3"] = 3] = "P3";
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F10120.StrKeysP1Total || (F10120.StrKeysP1Total = {}));
    var ObasTableP1Total = (function (_super) {
        __extends(ObasTableP1Total, _super);
        function ObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        ObasTableP1Total.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.OtherRubField,
                BaseObasTableFields.YearDataField]);
        };
        ObasTableP1Total.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return ObasTableP1Total;
    }(P1TotalObasTable));
    F10120.ObasTableP1Total = ObasTableP1Total;
    var ObasTableActionData = (function (_super) {
        __extends(ObasTableActionData, _super);
        function ObasTableActionData(id, document, totalTable, _p1StrKey) {
            var _this = _super.call(this, id, document, totalTable) || this;
            _this._p1StrKey = _p1StrKey;
            _this._copyFields = null;
            _this._name = null;
            return _this;
        }
        Object.defineProperty(ObasTableActionData.prototype, "Name", {
            get: function () {
                if (this._name == null) {
                    this._name = new ObasTableField("g1", this);
                }
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableActionData.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.Name];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    var otherYearField_1 = ObasTableFields.OtherRubField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, yearIndex));
                        _this._copyFields.push(otherYearField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        ObasTableActionData.prototype.RubChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._p1StrKey), oldValue, newValue);
        };
        ObasTableActionData.prototype.RubAfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var yearDataField = ObasTableFields.YearDataField;
            var yearOtherDataField = ObasTableFields.OtherRubField;
            this.Document.IterateByYears(function (i) {
                var fieldId = yearDataField.GenerateId(i);
                _this.SetFieldValue(fieldId, 0);
                fieldId = yearOtherDataField.GenerateId(i);
                _this.SetFieldValue(fieldId, 0);
            });
        };
        ObasTableActionData.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.OtherRubField, BaseObasTableFields.YearDataField);
        };
        ObasTableActionData.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        ObasTableActionData.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        ObasTableActionData.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.OtherRubField,
                BaseObasTableFields.YearDataField]);
        };
        return ObasTableActionData;
    }(ObasTableWithSimpleKeysParent));
    F10120.ObasTableActionData = ObasTableActionData;
    var UsdActionDataObasTable = (function (_super) {
        __extends(UsdActionDataObasTable, _super);
        function UsdActionDataObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(UsdActionDataObasTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.Name];
                    var yearField_2 = BaseObasTableFields.UsdYearDataField;
                    var otherYearField_2 = ObasTableFields.OtherUsdField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_2.GenerateTableField(_this, yearIndex));
                        _this._copyFields.push(otherYearField_2.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        UsdActionDataObasTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.OtherUsdField, BaseObasTableFields.UsdYearDataField);
        };
        UsdActionDataObasTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.OtherUsdField,
                BaseObasTableFields.UsdYearDataField,
                ObasTableFields.OtherRubField,
                BaseObasTableFields.YearDataField]);
        };
        UsdActionDataObasTable.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffSet = ObasHelper.GetYearOffsetById(fieldId);
            var usdValue = this.Document.CommonRules.GetDollarRateByYear(ObasStageSettings.CurrentYear + yearOffSet);
            this.SetFieldValue(fieldId.replace("USD_", ""), usdValue * newValue);
        };
        return UsdActionDataObasTable;
    }(ObasTableActionData));
    F10120.UsdActionDataObasTable = UsdActionDataObasTable;
})(F10120 || (F10120 = {}));
