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
var F04300;
(function (F04300) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F04300.TableRules = TableRules;
    var P1TotalsStrKeys;
    (function (P1TotalsStrKeys) {
        P1TotalsStrKeys[P1TotalsStrKeys["Total"] = 1] = "Total";
    })(P1TotalsStrKeys = F04300.P1TotalsStrKeys || (F04300.P1TotalsStrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1TotalsStrKeys.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F04300.P1TotalTable = P1TotalTable;
    var P1Table = (function (_super) {
        __extends(P1Table, _super);
        function P1Table(id, _document, _totalTable) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._totalTable = _totalTable;
            _this._inn = null;
            _this._kpp = null;
            _this._name = null;
            _this._okved = null;
            _this._target = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P1Table.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Inn, this.Kpp, this.Name, this.Target,
                        this.Okved.ForeignKey
                    ];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this._document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "Target", {
            get: function () {
                if (this._target == null) {
                    this._target = new ObasTableField("G5", this, true);
                }
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "Okved", {
            get: function () {
                if (this._okved == null) {
                    this._okved = new ObasSprTableField(ObasTableCollection.OkvedSprTable, this);
                }
                return this._okved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "Name", {
            get: function () {
                if (this._name == null) {
                    this._name = new ObasTableField("Name", this, true);
                }
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "Kpp", {
            get: function () {
                if (this._kpp == null) {
                    this._kpp = new ObasTableField("KPP", this, true);
                }
                return this._kpp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "Inn", {
            get: function () {
                if (this._inn == null) {
                    this._inn = new ObasTableField("INN", this, true);
                }
                return this._inn;
            },
            enumerable: true,
            configurable: true
        });
        P1Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._totalTable.SetSumByKeys(fieldId, this._totalTable.GetKeys(P1TotalsStrKeys.Total), oldValue, newValue);
        };
        P1Table.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var yaerField = BaseObasTableFields.YearDataField;
            this._document.IterateByYears(function (i) {
                var fieldId = yaerField.GenerateId(i);
                _this.SetFieldValue(fieldId, 0);
            });
        };
        P1Table.prototype.CopyData = function (srcYear, destYear) {
            this._document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        P1Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P1Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P1Table.prototype.ResetData = function () {
            this._document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        return P1Table;
    }(ObasTable));
    F04300.P1Table = P1Table;
})(F04300 || (F04300 = {}));
