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
var F08420;
(function (F08420) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F08420.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 1] = "Total";
    })(P1StrKeys = F08420.P1StrKeys || (F08420.P1StrKeys = {}));
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
    F08420.P1TotalTable = P1TotalTable;
    var P1Table = (function (_super) {
        __extends(P1Table, _super);
        function P1Table(id, _sumTable) {
            var _this = _super.call(this, id) || this;
            _this._sumTable = _sumTable;
            _this._targetName = null;
            return _this;
        }
        Object.defineProperty(P1Table.prototype, "TargetName", {
            get: function () {
                if (this._targetName == null) {
                    this._targetName = new ObasTableField("g1", this);
                }
                return this._targetName;
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
            var yearField = BaseObasTableFields.YearDataField;
            for (var i = 1, len = this.Document.Settings.YearsCount; i <= len; i++) {
                this.SetFieldValue(yearField.GenerateId(i), 0);
            }
        };
        P1Table.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var yearCnt = this.Document.Settings.YearsCount;
            var srcIndex = srcYear ? srcYear - yearCnt + 1 : yearCnt - 1;
            var destIndex = destYear ? destYear - yearCnt + 1 : yearCnt;
            var yearField = BaseObasTableFields.YearDataField;
            var srcFieldId = yearField.GenerateId(srcIndex);
            var destFieldId = yearField.GenerateId(destIndex);
            var copy = function () {
                _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
            };
            this.Iterate(copy);
        };
        P1Table.prototype.ResetData = function () {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var yearCnt = this.Document.Settings.YearsCount;
            var resetDataHandler = function () {
                for (var i = 1; i <= yearCnt; i++) {
                    _this.SetFieldValue(yearField.GenerateId(i), 0);
                }
            };
            this.Iterate(resetDataHandler);
        };
        P1Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P1Table.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.TargetName.Id, {
                Id: this.TargetName.Id,
                IsData: false
            });
            var yearField = BaseObasTableFields.YearDataField;
            var yearCnt = this.Document.Settings.YearsCount;
            for (var i = 1; i <= yearCnt; i++) {
                var fieldId = yearField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            return result;
        };
        return P1Table;
    }(ObasTable));
    F08420.P1Table = P1Table;
})(F08420 || (F08420 = {}));
