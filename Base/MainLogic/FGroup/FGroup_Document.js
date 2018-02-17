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
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._paramsTable = null;
            _this._tableRules = new FGroup.TableRules(_this);
            _this._interfaceRules = new FGroup.InterfaceRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "ParamsTable", {
            get: function () {
                if (this._paramsTable == null) {
                    this._paramsTable = new FGroup.ParamsTable("MainParameters");
                }
                return this._paramsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableRules", {
            get: function () {
                return this._tableRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InterfaceRules", {
            get: function () {
                return this._interfaceRules;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(DocumentObject));
    FGroup.FDocument = FDocument;
})(FGroup || (FGroup = {}));
