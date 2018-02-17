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
var F01409;
(function (F01409) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F01409.TableRules = TableRules;
    var StrKeysP1;
    (function (StrKeysP1) {
        StrKeysP1[StrKeysP1["P2P3Total"] = 16] = "P2P3Total";
        StrKeysP1[StrKeysP1["P2Total"] = 2] = "P2Total";
        StrKeysP1[StrKeysP1["P2Sp1"] = 3] = "P2Sp1";
        StrKeysP1[StrKeysP1["P2Sp2"] = 4] = "P2Sp2";
        StrKeysP1[StrKeysP1["P2Sp3"] = 11] = "P2Sp3";
        StrKeysP1[StrKeysP1["P2Sp4"] = 12] = "P2Sp4";
        StrKeysP1[StrKeysP1["P2Sp5"] = 13] = "P2Sp5";
        StrKeysP1[StrKeysP1["P2Sp6"] = 5] = "P2Sp6";
        StrKeysP1[StrKeysP1["P3Total"] = 6] = "P3Total";
        StrKeysP1[StrKeysP1["P3Sp1"] = 7] = "P3Sp1";
        StrKeysP1[StrKeysP1["P3Sp2"] = 8] = "P3Sp2";
        StrKeysP1[StrKeysP1["P3Sp3"] = 14] = "P3Sp3";
        StrKeysP1[StrKeysP1["P3Sp4"] = 9] = "P3Sp4";
        StrKeysP1[StrKeysP1["P4"] = 15] = "P4";
        StrKeysP1[StrKeysP1["Total"] = 1] = "Total";
    })(StrKeysP1 = F01409.StrKeysP1 || (F01409.StrKeysP1 = {}));
    var StrKeysP3DailyPay;
    (function (StrKeysP3DailyPay) {
        StrKeysP3DailyPay[StrKeysP3DailyPay["DailyPay"] = 1] = "DailyPay";
        StrKeysP3DailyPay[StrKeysP3DailyPay["Surcharges"] = 2] = "Surcharges";
    })(StrKeysP3DailyPay = F01409.StrKeysP3DailyPay || (F01409.StrKeysP3DailyPay = {}));
    var StrKeysP1C = (function (_super) {
        __extends(StrKeysP1C, _super);
        function StrKeysP1C() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StrKeysP1C;
    }(F01400.StrKeysP1C));
    StrKeysP1C.P2P3Total = 16;
    StrKeysP1C.P4 = 15;
    F01409.StrKeysP1C = StrKeysP1C;
    var ObasTableP1Total = (function (_super) {
        __extends(ObasTableP1Total, _super);
        function ObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1C.Total;
        };
        ObasTableP1Total.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return ObasTableP1Total;
    }(F01400.BaseP1TotalObasTable));
    F01409.ObasTableP1Total = ObasTableP1Total;
    var P4DataObasTable = (function (_super) {
        __extends(P4DataObasTable, _super);
        function P4DataObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4DataObasTable.prototype.UpdateParentSum = function (tableId, oldValue, newValue, fieldId) {
            this.InnerSumChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        P4DataObasTable.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(StrKeysP1C.P4), oldValue, newValue);
        };
        return P4DataObasTable;
    }(OnlyInsuranceObasTable));
    F01409.P4DataObasTable = P4DataObasTable;
})(F01409 || (F01409 = {}));
