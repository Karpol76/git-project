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
var F02110;
(function (F02110) {
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
    F02110.ExportRules = ExportRules;
    var ImportRules = (function (_super) {
        __extends(ImportRules, _super);
        function ImportRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImportRules.prototype.InnerImport = function () {
        };
        return ImportRules;
    }(BaseImportRules));
    ImportRules._yearsCount = ObasStageSettings.YearsCount + 1;
    ImportRules._yearField = BaseObasTableFields.YearDataField;
    ImportRules._usdYearField = BaseObasTableFields.UsdYearDataField;
    ImportRules._otherRubYearField = F02110.ObasTableFields.OtherRubField;
    F02110.ImportRules = ImportRules;
})(F02110 || (F02110 = {}));
