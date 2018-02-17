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
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._excelExport = null;
            _this._pXGroupSheet = null;
            _this._p4GroupSheet = null;
            _this._tableRules = new FOutlayAttach.TableRules(_this);
            _this._interfaceRules = new FOutlayAttach.InterfaceRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P4GroupSheet", {
            get: function () {
                if (this._p4GroupSheet == null) {
                    this._p4GroupSheet = new FOutlayAttach.P4GroupSheet(this);
                }
                return this._p4GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PXGroupSheet", {
            get: function () {
                if (this._pXGroupSheet == null) {
                    this._pXGroupSheet = new FOutlayAttach.PXGroupSheet(this);
                }
                return this._pXGroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ExcelExport", {
            get: function () {
                if (this._excelExport == null) {
                    this._excelExport = new FOutlayAttach.ExcelExport(this);
                }
                return this._excelExport;
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
    }(BaseDocumentObject));
    FOutlayAttach.FDocument = FDocument;
    var Attach2FDocument = (function (_super) {
        __extends(Attach2FDocument, _super);
        function Attach2FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableRules = new FOutlayAttach.Attach2TableRules(_this);
            return _this;
        }
        Object.defineProperty(Attach2FDocument.prototype, "ExcelExport", {
            get: function () {
                if (this._excelExport == null) {
                    this._excelExport = new FOutlayAttach.Attach2ExcelExport(this);
                }
                return this._excelExport;
            },
            enumerable: true,
            configurable: true
        });
        return Attach2FDocument;
    }(FDocument));
    FOutlayAttach.Attach2FDocument = Attach2FDocument;
})(FOutlayAttach || (FOutlayAttach = {}));
