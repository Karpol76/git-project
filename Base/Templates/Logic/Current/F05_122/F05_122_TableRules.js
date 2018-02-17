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
var F05122;
(function (F05122) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F05122.TableRules = TableRules;
    var P1StrKey;
    (function (P1StrKey) {
        P1StrKey[P1StrKey["Total"] = 1] = "Total";
        P1StrKey[P1StrKey["SafeOperation"] = 2] = "SafeOperation";
        P1StrKey[P1StrKey["DevInfrastruct"] = 3] = "DevInfrastruct";
    })(P1StrKey = F05122.P1StrKey || (F05122.P1StrKey = {}));
    var P1TotalTableExt = (function (_super) {
        __extends(P1TotalTableExt, _super);
        function P1TotalTableExt() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTableExt.prototype.GetTotalKey = function () {
            return P1StrKey.Total;
        };
        P1TotalTableExt.prototype.IsUserEditRow = function (rowKey) {
            return rowKey !== this.GetTotalKey();
        };
        return P1TotalTableExt;
    }(SubsidiesSubventions.P1TotalTableBase));
    F05122.P1TotalTableExt = P1TotalTableExt;
})(F05122 || (F05122 = {}));
