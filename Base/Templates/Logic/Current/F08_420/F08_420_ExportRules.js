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
    var ExportRules = (function (_super) {
        __extends(ExportRules, _super);
        function ExportRules(_document) {
            var _this = _super.call(this, _document) || this;
            _this._document = _document;
            return _this;
        }
        ExportRules.prototype.GetTables = function () {
            var result = [];
            return result;
        };
        return ExportRules;
    }(SimpleFormExportRules));
    F08420.ExportRules = ExportRules;
    var ImportRules = (function (_super) {
        __extends(ImportRules, _super);
        function ImportRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImportRules.prototype.InnerImport = function () {
        };
        return ImportRules;
    }(BaseImportRules));
    F08420.ImportRules = ImportRules;
})(F08420 || (F08420 = {}));
