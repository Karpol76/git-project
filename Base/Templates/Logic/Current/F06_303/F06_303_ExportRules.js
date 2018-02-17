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
    var ExportRules = (function (_super) {
        __extends(ExportRules, _super);
        function ExportRules(_document) {
            var _this = _super.call(this, _document) || this;
            _this._document = _document;
            return _this;
        }
        ExportRules.prototype.GetTables = function () {
            return [];
        };
        return ExportRules;
    }(SimpleFormExportRules));
    F06303.ExportRules = ExportRules;
})(F06303 || (F06303 = {}));
