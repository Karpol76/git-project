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
var F08821;
(function (F08821) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F08821.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Str01"] = 1] = "Str01";
        P1StrKeys[P1StrKeys["Str02"] = 2] = "Str02";
        P1StrKeys[P1StrKeys["Str03"] = 3] = "Str03";
        P1StrKeys[P1StrKeys["Str04"] = 4] = "Str04";
        P1StrKeys[P1StrKeys["Str05"] = 8] = "Str05";
        P1StrKeys[P1StrKeys["StrTotal"] = 7] = "StrTotal";
    })(P1StrKeys = F08821.P1StrKeys || (F08821.P1StrKeys = {}));
    var P1RowsTable = (function (_super) {
        __extends(P1RowsTable, _super);
        function P1RowsTable(id) {
            return _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], "StrCode") || this;
        }
        return P1RowsTable;
    }(BarsRowsSprTable));
    F08821.P1RowsTable = P1RowsTable;
    var P1Table = (function (_super) {
        __extends(P1Table, _super);
        function P1Table() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P1Table.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P1Table.prototype.GetTotalKey = function () {
            return P1StrKeys.StrTotal;
        };
        P1Table.prototype.IsUserEditRow = function (rowKey) {
            if (rowKey === void 0) { rowKey = this.StrKey; }
            return !(rowKey === P1StrKeys.Str05 || rowKey === P1StrKeys.StrTotal);
        };
        P1Table.prototype.CollectUserData = function () {
            var _this = this;
            return this.CollectTableData(this.InitCopyFieldsInfo(), function () {
                return _this.IsUserEditRow();
            });
        };
        P1Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P1Table.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, function () {
                return _this.IsUserEditRow();
            }, BaseObasTableFields.YearDataField);
        };
        P1Table.prototype.DeleteUnlinkData = function () {
            var _this = this;
            var rowsTable = this.ParentTable;
            this.DeleteAllRow(function () {
                return !rowsTable.LocateByKeys(_this.StrKey);
            });
        };
        P1Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return P1Table;
    }(P1TotalObasTableWithStrParent));
    F08821.P1Table = P1Table;
    var P2DataTable = (function (_super) {
        __extends(P2DataTable, _super);
        function P2DataTable(id, document, parentTable, _sumTable) {
            var _this = _super.call(this, id, document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._copyFields = null;
            _this._name = null;
            return _this;
        }
        Object.defineProperty(P2DataTable.prototype, "Name", {
            get: function () {
                if (this._name == null) {
                    this._name = new ObasTableField("Name", this);
                }
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2DataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Name];
                    var usdField_1 = BaseObasTableFields.UsdYearDataField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(usdField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P2DataTable.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffSet = ObasHelper.GetYearOffsetById(fieldId);
            var usdValue = this.Document.CommonRules.GetDollarRateByYear(ObasStageSettings.CurrentYear + yearOffSet);
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), usdValue * newValue);
        };
        P2DataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(P1StrKeys.Str05), oldValue, newValue);
        };
        P2DataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var yearDataField = BaseObasTableFields.YearDataField;
            this.Document.IterateByYears(function (i) {
                var fieldId = yearDataField.GenerateId(i);
                _this.SetFieldValue(fieldId, 0);
            });
        };
        P2DataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2DataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P2DataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.UsdYearDataField,
                BaseObasTableFields.YearDataField]);
        };
        P2DataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.UsdYearDataField);
        };
        return P2DataTable;
    }(ObasTableWithSimpleKeysParent));
    F08821.P2DataTable = P2DataTable;
    var P2Table = (function (_super) {
        __extends(P2Table, _super);
        function P2Table() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._country = null;
            return _this;
        }
        Object.defineProperty(P2Table.prototype, "Country", {
            get: function () {
                if (this._country == null) {
                    this._country = new ObasSprTableField(ObasTableCollection.OksmSprTable, this);
                }
                return this._country;
            },
            enumerable: true,
            configurable: true
        });
        return P2Table;
    }(ObasTable));
    F08821.P2Table = P2Table;
})(F08821 || (F08821 = {}));
