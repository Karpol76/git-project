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
var Rro;
(function (Rro) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.NormalMode = true;
            return _this;
        }
        FDocument.prototype.SetNormalMode = function (flag) {
            this.NormalMode = flag;
        };
        FDocument.prototype.AddRroObasEventHandler = function (tableId) {
            Client.SendMessage(Client.MainDocumentId, "%Doc%.TableRules.CreateRroObasVersion", []);
        };
        FDocument.prototype.AddRroDataEventHandler = function (tableId) {
            Client.SendMessage(Client.MainDocumentId, "%Doc%.TableRules.CreateRroExpendShedule", []);
        };
        FDocument.prototype.RroDataCostTypeChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            ObasTableCollection.RroDataTable.CostTypeChangeEventHandler(tableId, oldValue, newValue, fieldId);
            Client.SendMessage(Client.MainDocumentId, "%Doc%.TableRules.CreateRroObas", []);
        };
        FDocument.prototype.RroDataKbkChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            ObasTableCollection.RroDataTable.KbkChangeEventHandler(tableId, oldValue, newValue, fieldId);
            Client.SendMessage(Client.MainDocumentId, "%Doc%.TableRules.CreateRroObas", []);
        };
        FDocument.prototype.RroKosguYearValueChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.NormalMode) {
                ObasTableCollection.RroObasKosguTable.YearValueChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
        };
        return FDocument;
    }(DocumentObject));
    Rro.FDocument = FDocument;
})(Rro || (Rro = {}));
