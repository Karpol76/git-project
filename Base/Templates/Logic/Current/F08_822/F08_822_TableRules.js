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
var F08822;
(function (F08822) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F08822.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 5] = "Total";
        P1StrKeys[P1StrKeys["OtherExp"] = 4] = "OtherExp";
        P1StrKeys[P1StrKeys["ConsFees"] = 8] = "ConsFees";
        P1StrKeys[P1StrKeys["PollutionFee"] = 7] = "PollutionFee";
        P1StrKeys[P1StrKeys["DamageCost"] = 3] = "DamageCost";
        P1StrKeys[P1StrKeys["TenderCost"] = 2] = "TenderCost";
        P1StrKeys[P1StrKeys["MembershipPay"] = 1] = "MembershipPay";
        P1StrKeys[P1StrKeys["FinesPay"] = 6] = "FinesPay";
    })(P1StrKeys = F08822.P1StrKeys || (F08822.P1StrKeys = {}));
    var P1RowsTable = (function (_super) {
        __extends(P1RowsTable, _super);
        function P1RowsTable(id) {
            return _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], "StrCode") || this;
        }
        return P1RowsTable;
    }(BarsRowsSprTable));
    F08822.P1RowsTable = P1RowsTable;
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
            return P1StrKeys.Total;
        };
        P1Table.prototype.IsUserEditRow = function (rowKey) {
            if (rowKey === void 0) { rowKey = this.StrKey; }
            return rowKey !== P1StrKeys.Total;
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
        return P1Table;
    }(P1TotalObasTableWithStrParent));
    F08822.P1Table = P1Table;
})(F08822 || (F08822 = {}));
