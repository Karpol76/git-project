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
var F04300;
(function (F04300) {
    var ExportRules = (function (_super) {
        __extends(ExportRules, _super);
        function ExportRules(document) {
            return _super.call(this, document) || this;
        }
        ExportRules.prototype.GetTables = function () {
            var result = [];
            return result;
        };
        return ExportRules;
    }(SimpleFormExportRules));
    F04300.ExportRules = ExportRules;
    var ImportRules = (function (_super) {
        __extends(ImportRules, _super);
        function ImportRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImportRules.prototype.InnerImport = function () {
            this.ImportP1();
        };
        ImportRules.prototype.ImportP1 = function () {
        };
        return ImportRules;
    }(BaseImportRules));
    F04300.ImportRules = ImportRules;
})(F04300 || (F04300 = {}));
