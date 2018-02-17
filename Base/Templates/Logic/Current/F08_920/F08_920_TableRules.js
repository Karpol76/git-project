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
var F08920;
(function (F08920) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F08920.TableRules = TableRules;
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "OtherField", {
            get: function () {
                if (this._otherField == null) {
                    this._otherField = new BaseGenericObasTableField("Other_Y");
                }
                return this._otherField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "UsdOtherField", {
            get: function () {
                if (this._otherUsdField == null) {
                    this._otherUsdField = new BaseGenericObasTableField("USD_Other_Y");
                }
                return this._otherUsdField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "UsdField", {
            get: function () {
                if (this._usdField == null) {
                    this._usdField = new BaseGenericObasTableField("USD_Y");
                }
                return this._usdField;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._otherField = null;
    ObasTableFields._otherUsdField = null;
    ObasTableFields._usdField = null;
    F08920.ObasTableFields = ObasTableFields;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
        StrKeysP1Total[StrKeysP1Total["P2"] = 2] = "P2";
        StrKeysP1Total[StrKeysP1Total["P3"] = 3] = "P3";
    })(StrKeysP1Total = F08920.StrKeysP1Total || (F08920.StrKeysP1Total = {}));
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
    F08920.P1TotalTable = P1TotalTable;
    var PXDataTable = (function (_super) {
        __extends(PXDataTable, _super);
        function PXDataTable(id, document, p1Table, _p1StrKey) {
            var _this = _super.call(this, id, document, p1Table) || this;
            _this._p1StrKey = _p1StrKey;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(PXDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.RecordKey];
                    var otherField = ObasTableFields.OtherField;
                    var yearField = ObasTableFields.YearDataField;
                    var fieldPush = function (field) {
                        _this.Document.IterateByYears(function (i) { _this._copyFields.push(field.GenerateTableField(_this, i)); });
                    };
                    fieldPush(otherField);
                    fieldPush(yearField);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        PXDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._p1StrKey), oldValue, newValue);
        };
        PXDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            this.Document.IterateByYears(function (i) {
                var fieldId = ObasTableFields.YearDataField.GenerateId(i);
                _this.SumChangeEventHandler(_this.Id, _this.GetFieldValue(fieldId), 0, fieldId);
            });
        };
        PXDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        PXDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PXDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.OtherField, ObasTableFields.YearDataField]);
        };
        PXDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.OtherField, ObasTableFields.YearDataField);
        };
        return PXDataTable;
    }(ObasTableWithSimpleKeysParent));
    F08920.PXDataTable = PXDataTable;
    var P3DataTable = (function (_super) {
        __extends(P3DataTable, _super);
        function P3DataTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P3DataTable.prototype.DollarChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearOffset + 1), this.Document.CommonRules
                .ConvertDollarToRuble(newValue, this.Document.Settings.StartYear + yearOffset));
        };
        Object.defineProperty(P3DataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.RecordKey];
                    var usdOtherField = ObasTableFields.UsdOtherField;
                    var usdField = ObasTableFields.UsdField;
                    var fieldPush = function (field) {
                        _this.Document.IterateByYears(function (i) { _this._copyFields.push(field.GenerateTableField(_this, i)); });
                    };
                    fieldPush(usdOtherField);
                    fieldPush(usdField);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P3DataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [ObasTableFields.UsdOtherField, ObasTableFields.UsdField, ObasTableFields.YearDataField]);
        };
        P3DataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.UsdOtherField, ObasTableFields.UsdField);
        };
        return P3DataTable;
    }(PXDataTable));
    F08920.P3DataTable = P3DataTable;
})(F08920 || (F08920 = {}));
