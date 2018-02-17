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
var F07100;
(function (F07100) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F07100.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 1] = "Total";
    })(P1StrKeys = F07100.P1StrKeys || (F07100.P1StrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1StrKeys.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F07100.P1TotalTable = P1TotalTable;
    var P1Table = (function (_super) {
        __extends(P1Table, _super);
        function P1Table(id, _sumTable) {
            var _this = _super.call(this, id) || this;
            _this._sumTable = _sumTable;
            _this._copyFields = null;
            _this._npaType = null;
            _this._npaDate = null;
            _this._npaNumber = null;
            _this._npaName = null;
            return _this;
        }
        Object.defineProperty(P1Table.prototype, "NpaType", {
            get: function () {
                if (this._npaType == null) {
                    this._npaType = new ObasSprTableField(ObasTableCollection.NpaTypeTable, this);
                }
                return this._npaType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "NpaDate", {
            get: function () {
                if (this._npaDate == null) {
                    this._npaDate = new ObasTableField("NpaDate", this, true);
                }
                return this._npaDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "NpaNumber", {
            get: function () {
                if (this._npaNumber == null) {
                    this._npaNumber = new ObasTableField("NpaNumber", this, true);
                }
                return this._npaNumber;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "NpaName", {
            get: function () {
                if (this._npaName == null) {
                    this._npaName = new ObasTableField("NpaName", this);
                }
                return this._npaName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "Document", {
            get: function () {
                return this._sumTable.Document;
            },
            enumerable: true,
            configurable: true
        });
        P1Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(P1StrKeys.Total), oldValue, newValue);
        };
        P1Table.prototype.AfterDeleteChilds = function (tableId) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            this.Document.IterateByYears(function (yearIndex) {
                _this.SetFieldValue(yearField.GenerateId(yearIndex), 0);
            });
        };
        P1Table.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        P1Table.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        P1Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P1Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        Object.defineProperty(P1Table.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.NpaType.ForeignKey, this.NpaDate, this.NpaNumber, this.NpaName];
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
        return P1Table;
    }(ObasTable));
    F07100.P1Table = P1Table;
})(F07100 || (F07100 = {}));
