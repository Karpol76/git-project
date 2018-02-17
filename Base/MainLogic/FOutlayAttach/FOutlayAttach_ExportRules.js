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
var FOutlayAttach;
(function (FOutlayAttach) {
    var ExcelExport = (function () {
        function ExcelExport(_document) {
            this._document = _document;
            this._attachName = null;
        }
        Object.defineProperty(ExcelExport.prototype, "AttachName", {
            get: function () {
                var _this = this;
                if (this._attachName == null) {
                    this._attachName = this._document.MainParametersTable.GetFieldValue("AttachName");
                    DocumentSettings.YearSignIndexes.forEach(function (sign, i) {
                        _this._attachName = _this._attachName.replace(sign, (ObasStageSettings.CurrentYear + i - 1).toString());
                    });
                    this._attachName = this._attachName.replace("{OutlayKey}", (ObasTableCollection.RroOutlayTable.GetActive(false) - 1).toString());
                }
                return this._attachName;
            },
            enumerable: true,
            configurable: true
        });
        ExcelExport.prototype.GetAttachName = function () {
            return this.AttachName;
        };
        ExcelExport.prototype.GetAttachDescription = function (type) {
            return this._document.MainParametersTable.GetFieldValue("ExcelDescription" + type);
        };
        ExcelExport.prototype.GetYearCaption = function (yearOffset) {
            return ObasExportHelper.GetYearCaption(yearOffset, "Сумма ");
        };
        ExcelExport.prototype.GetAgreedPost = function () {
            return ObasTableCollection.RroObasRecvisitsTable.Agreed.Post.Value;
        };
        ExcelExport.prototype.GetAgreedName = function () {
            return ObasTableCollection.RroObasRecvisitsTable.Agreed.Name.Value;
        };
        ExcelExport.prototype.GetApprovedPost = function () {
            return ObasTableCollection.RroObasRecvisitsTable.Approved.Post.Value;
        };
        ExcelExport.prototype.GetApprovedName = function () {
            return ObasTableCollection.RroObasRecvisitsTable.Approved.Name.Value;
        };
        ExcelExport.prototype.GetAgreedDate = function () {
            var outlayTable = ObasTableCollection.RroOutlayTable;
            return ObasHelper.ConvertToString(outlayTable.AgreedDate.LookupByKeys(outlayTable.GetActive(false)), DateFormat.Middle);
        };
        ExcelExport.prototype.GetApprovedDate = function () {
            var outlayTable = ObasTableCollection.RroOutlayTable;
            return ObasHelper.ConvertToString(outlayTable.ApprovedDate.LookupByKeys(outlayTable.GetActive(false)), DateFormat.Middle);
        };
        ExcelExport.prototype.GetPart4Caption = function (yearOffset) {
            var yearType;
            switch (yearOffset) {
                case "0":
                    yearType = "очередной";
                    break;
                case "1":
                    yearType = "первый";
                    break;
                case "2":
                    yearType = "второй";
                    break;
            }
            return ObasExportHelper.GetYearCaption(yearOffset, "Раздел 4. Итого по бюджетной смете ", " (" + yearType + " \u0433\u043E\u0434)");
        };
        return ExcelExport;
    }());
    FOutlayAttach.ExcelExport = ExcelExport;
    var Attach2ExcelExport = (function (_super) {
        __extends(Attach2ExcelExport, _super);
        function Attach2ExcelExport() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Attach2ExcelExport.prototype.GetYearCaption = function (yearOffset) {
            return ObasExportHelper.GetYearCaption(yearOffset, "Сумма изменений ", " (+,-)");
        };
        Attach2ExcelExport.prototype.GetPart4Caption = function (yearOffset) {
            var yearType;
            switch (yearOffset) {
                case "0":
                    yearType = "очередной";
                    break;
                case "1":
                    yearType = "первый";
                    break;
                case "2":
                    yearType = "второй";
                    break;
            }
            return ObasExportHelper.GetYearCaption(yearOffset, "Раздел 4. Итого по изменениям показателей бюджетной смете ", " (" + yearType + " \u0433\u043E\u0434)");
        };
        return Attach2ExcelExport;
    }(ExcelExport));
    FOutlayAttach.Attach2ExcelExport = Attach2ExcelExport;
})(FOutlayAttach || (FOutlayAttach = {}));
