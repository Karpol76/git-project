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
var FGroup;
(function (FGroup) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    FGroup.TableRules = TableRules;
    var ParamsTable = (function (_super) {
        __extends(ParamsTable, _super);
        function ParamsTable(id) {
            var _this = _super.call(this, id) || this;
            _this._rroObasKey = null;
            return _this;
        }
        Object.defineProperty(ParamsTable.prototype, "RroObasKey", {
            get: function () {
                if (this._rroObasKey == null) {
                    this._rroObasKey = new ObasForeignKeyTableFieldTyped(ObasTableCollection.RroObasTable, this);
                }
                return this._rroObasKey;
            },
            enumerable: true,
            configurable: true
        });
        return ParamsTable;
    }(ObasTable));
    FGroup.ParamsTable = ParamsTable;
})(FGroup || (FGroup = {}));
