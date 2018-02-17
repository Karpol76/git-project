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
var F06303;
(function (F06303) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F06303.TableRules = TableRules;
    var P1TotalRowKeys;
    (function (P1TotalRowKeys) {
        P1TotalRowKeys[P1TotalRowKeys["Total"] = 1] = "Total";
    })(P1TotalRowKeys = F06303.P1TotalRowKeys || (F06303.P1TotalRowKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1TotalRowKeys.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F06303.P1TotalTable = P1TotalTable;
    var HistoryCentersDataTable = (function (_super) {
        __extends(HistoryCentersDataTable, _super);
        function HistoryCentersDataTable(id, _document, _sumTable, _historyCenterSprTable) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._sumTable = _sumTable;
            _this._historyCenterSprTable = _historyCenterSprTable;
            _this._copyFields = null;
            _this._historyCenter = null;
            return _this;
        }
        Object.defineProperty(HistoryCentersDataTable.prototype, "HistoryCenter", {
            get: function () {
                if (this._historyCenter == null) {
                    this._historyCenter = new ObasSprTableField(this._historyCenterSprTable, this);
                }
                return this._historyCenter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HistoryCentersDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.HistoryCenter.ForeignKey];
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
        Object.defineProperty(HistoryCentersDataTable.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        HistoryCentersDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(P1TotalRowKeys.Total), oldValue, newValue);
        };
        HistoryCentersDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var yearDataField = BaseObasTableFields.YearDataField;
            this.Document.IterateByYears(function (i) {
                var fieldId = yearDataField.GenerateId(i);
                _this.SetFieldValue(fieldId, 0);
            });
        };
        HistoryCentersDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        HistoryCentersDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        HistoryCentersDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        HistoryCentersDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return HistoryCentersDataTable;
    }(ObasTable));
    F06303.HistoryCentersDataTable = HistoryCentersDataTable;
    var NpaTable = (function (_super) {
        __extends(NpaTable, _super);
        function NpaTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NpaTable;
    }(NpaTableWithParent));
    F06303.NpaTable = NpaTable;
})(F06303 || (F06303 = {}));
