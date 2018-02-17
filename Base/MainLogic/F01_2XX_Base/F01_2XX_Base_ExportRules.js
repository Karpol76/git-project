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
var F012XX;
(function (F012XX) {
    var FBxmlExportHelper = (function (_super) {
        __extends(FBxmlExportHelper, _super);
        function FBxmlExportHelper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FBxmlExportHelper.prototype.GetTables = function () {
            throw new Error("Not implemented");
        };
        FBxmlExportHelper.prototype.GetNpaData = function (id, srcTable, withData) {
            if (withData === void 0) { withData = true; }
            var template = "<a ID=\"{{order}}\" b1=\"{{g1}}\" b2=\"{{NpaCode}}\"";
            var fields = ["g1"];
            var genField = function (field, barsIndex, fieldTemplate) {
                var fieldId = field.Id;
                fields.push(fieldId);
                template += " b" + barsIndex + "=\"{{" + (fieldTemplate ? fieldTemplate.replace("@field", fieldId) : fieldId) + "}}\"";
            };
            genField(srcTable.NpaDate, 3, BxmlExportHelper.RegisteredHelpers.DateToStr + " @field");
            genField(srcTable.NpaNumber, 4);
            genField(srcTable.NpaName, 5);
            template += " b6=\"\"";
            if (withData) {
                fields.push("g5");
                template += " b7=\"{{g5}}\"";
            }
            template += " />";
            var modifier = function (record) {
                record["NpaCode"] = srcTable.NpaType.Code;
                return record;
            };
            return this.CreateTableInfo(srcTable, fields, template, id, modifier);
        };
        return FBxmlExportHelper;
    }(SimpleFormExportRules));
    F012XX.FBxmlExportHelper = FBxmlExportHelper;
})(F012XX || (F012XX = {}));
