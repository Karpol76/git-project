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
var F01212;
(function (F01212) {
    var ExportRules = (function (_super) {
        __extends(ExportRules, _super);
        function ExportRules(_document) {
            var _this = _super.call(this, _document) || this;
            _this._document = _document;
            _this._uniqOrgTable = null;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(ExportRules.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new F012XX.FBxmlExportHelper(this._document);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        ExportRules.prototype.GetTables = function (uniqueOrgKey) {
            var result = [];
            return result;
        };
        return ExportRules;
    }(TypedOrgFormExportRules));
    F01212.ExportRules = ExportRules;
})(F01212 || (F01212 = {}));
