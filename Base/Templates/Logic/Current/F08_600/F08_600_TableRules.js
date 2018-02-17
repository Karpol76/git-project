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
var F08600;
(function (F08600) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F08600.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 0] = "Total";
    })(P1StrKeys = F08600.P1StrKeys || (F08600.P1StrKeys = {}));
    var P1Table = (function (_super) {
        __extends(P1Table, _super);
        function P1Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1Table.prototype.GetTotalKey = function () {
            return P1StrKeys.Total;
        };
        P1Table.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return P1Table;
    }(P1TotalObasTable));
    F08600.P1Table = P1Table;
})(F08600 || (F08600 = {}));
