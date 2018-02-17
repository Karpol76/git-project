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
var F08910;
(function (F08910) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F08910.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 1] = "Total";
    })(P1StrKeys = F08910.P1StrKeys || (F08910.P1StrKeys = {}));
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
    F08910.P1TotalTable = P1TotalTable;
    var P1Table = (function (_super) {
        __extends(P1Table, _super);
        function P1Table(id, _sumTable) {
            var _this = _super.call(this, id) || this;
            _this._sumTable = _sumTable;
            _this._name = null;
            _this._typeAssistance = null;
            _this._purposeTransfers = null;
            _this._copyFields = null;
            return _this;
        }
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
        Object.defineProperty(P1Table.prototype, "TypeAssistance", {
            get: function () {
                if (this._typeAssistance == null) {
                    this._typeAssistance = new ObasSprTableField(ObasTableCollection.SprTypeAssistance, this);
                }
                return this._typeAssistance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P1Table.prototype, "PurposeTransfers", {
            get: function () {
                if (this._purposeTransfers == null) {
                    this._purposeTransfers = new ObasTableField("PurposeTransfers", this, true);
                }
                return this._purposeTransfers;
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
                var fieldId = yearField.GenerateId(yearIndex);
                _this.SetFieldValue(fieldId, 0);
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
        Object.defineProperty(P1Table.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.Name, this.TypeAssistance.ForeignKey, this.PurposeTransfers];
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
        P1Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return P1Table;
    }(ObasTable));
    F08910.P1Table = P1Table;
})(F08910 || (F08910 = {}));
