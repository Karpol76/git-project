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
var F06250;
(function (F06250) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F06250.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F06250.StrKeysP1Total || (F06250.StrKeysP1Total = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F06250.P1TotalTable = P1TotalTable;
    var TableP2 = (function (_super) {
        __extends(TableP2, _super);
        function TableP2(id, _document, sumTable) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this.sumTable = sumTable;
            _this._grantName = null;
            _this._grantPurpose = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(TableP2.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "GrantName", {
            get: function () {
                if (this._grantName == null) {
                    this._grantName = new ObasTableField("GrantName", this, true);
                }
                return this._grantName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "GrantPurpose", {
            get: function () {
                if (this._grantPurpose == null) {
                    this._grantPurpose = new ObasTableField("GrantPurpose", this, true);
                }
                return this._grantPurpose;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.sumTable.SetSumByKeys(fieldId, this.sumTable.GetKeys(StrKeysP1Total.Total), oldValue, newValue);
        };
        TableP2.prototype.AfterDeleteEventHandler = function (tableId) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            this.Document.IterateByYears(function (yearIndex) {
                _this.SetFieldValue(yearField.GenerateId(yearIndex), 0);
            });
        };
        Object.defineProperty(TableP2.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.GrantName, this.GrantPurpose];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this._document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableP2.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP2.prototype.ResetData = function () {
            this._document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        TableP2.prototype.CopyData = function (srcYear, destYear) {
            this._document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return TableP2;
    }(ObasTable));
    F06250.TableP2 = TableP2;
})(F06250 || (F06250 = {}));
