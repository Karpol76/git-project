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
var F09100;
(function (F09100) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F09100.TableRules = TableRules;
    var ObjectDescNpaTable = (function (_super) {
        __extends(ObjectDescNpaTable, _super);
        function ObjectDescNpaTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ObjectDescNpaTable;
    }(ObasTableWithSimpleKeysParent));
    F09100.ObjectDescNpaTable = ObjectDescNpaTable;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["P2"] = 2] = "P2";
        StrKeysP1Total[StrKeysP1Total["P3"] = 3] = "P3";
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F09100.StrKeysP1Total || (F09100.StrKeysP1Total = {}));
    var ObasTableP1 = (function (_super) {
        __extends(ObasTableP1, _super);
        function ObasTableP1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP1.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        ObasTableP1.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return ObasTableP1;
    }(P1TotalObasTable));
    F09100.ObasTableP1 = ObasTableP1;
    var TableP2 = (function (_super) {
        __extends(TableP2, _super);
        function TableP2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._reserveDirection = null;
            return _this;
        }
        Object.defineProperty(TableP2.prototype, "ReserveDirection", {
            get: function () {
                if (this._reserveDirection == null) {
                    this._reserveDirection = new ObasSprTableField(ObasTableCollection.ReserveDirectionsSprTable, this);
                }
                return this._reserveDirection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "ReserveDirectionName", {
            get: function () {
                return this.ReserveDirection.Name;
            },
            enumerable: true,
            configurable: true
        });
        return TableP2;
    }(ObasTable));
    F09100.TableP2 = TableP2;
    var NpaTableWithDataP2 = (function (_super) {
        __extends(NpaTableWithDataP2, _super);
        function NpaTableWithDataP2(id, parentTable, document) {
            var _this = _super.call(this, id, document, parentTable) || this;
            _this._copyFields = null;
            _this._reserveCondition = null;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(NpaTableWithDataP2.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey];
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
        Object.defineProperty(NpaTableWithDataP2.prototype, "ReservCondition", {
            get: function () {
                if (this._reserveCondition == null) {
                    this._reserveCondition = new ObasTableField("ReservConditions", this);
                }
                return this._reserveCondition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NpaTableWithDataP2.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new TableWithValuesHelper(this.Id, StrKeysP1Total.P2, this.Document.TableP1, this.Document);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        NpaTableWithDataP2.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        NpaTableWithDataP2.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        NpaTableWithDataP2.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        NpaTableWithDataP2.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return NpaTableWithDataP2;
    }(ObasTableWithSimpleKeysParent));
    F09100.NpaTableWithDataP2 = NpaTableWithDataP2;
    var TableP3 = (function (_super) {
        __extends(TableP3, _super);
        function TableP3(id, _document) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._helper = null;
            _this._reserveDirection = null;
            _this._reserveCondition = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(TableP3.prototype, "ReserveDirection", {
            get: function () {
                if (this._reserveDirection == null) {
                    this._reserveDirection = new ObasTableField("g2", this, true);
                }
                return this._reserveDirection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3.prototype, "ReservCondition", {
            get: function () {
                if (this._reserveCondition == null) {
                    this._reserveCondition = new ObasTableField("ReservConditions", this);
                }
                return this._reserveCondition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3.prototype, "ReserveDirectionName", {
            get: function () {
                return this.ReserveDirection.Value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new TableWithValuesHelper(this.Id, StrKeysP1Total.P3, this._document.TableP1, this._document);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP3.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.ReserveDirection];
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
        TableP3.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableP3.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP3.prototype.ResetData = function () {
            this._document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        TableP3.prototype.CopyData = function (srcYear, destYear) {
            this._document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return TableP3;
    }(ObasTable));
    F09100.TableP3 = TableP3;
    var TableWithValuesHelper = (function (_super) {
        __extends(TableWithValuesHelper, _super);
        function TableWithValuesHelper(id, _totalStrKey, _totalTable, _document) {
            var _this = _super.call(this, id) || this;
            _this._totalStrKey = _totalStrKey;
            _this._totalTable = _totalTable;
            _this._document = _document;
            return _this;
        }
        TableWithValuesHelper.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var yearDataField = BaseObasTableFields.YearDataField;
            this._document.IterateByYears(function (i) {
                var fieldId = yearDataField.GenerateId(i);
                _this.SetFieldValue(fieldId, 0);
            });
        };
        TableWithValuesHelper.prototype.TotalSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._totalTable.SetSumByKeys(fieldId, this._totalTable.GetKeys(this._totalStrKey), oldValue, newValue);
        };
        return TableWithValuesHelper;
    }(ObasTable));
    F09100.TableWithValuesHelper = TableWithValuesHelper;
})(F09100 || (F09100 = {}));
