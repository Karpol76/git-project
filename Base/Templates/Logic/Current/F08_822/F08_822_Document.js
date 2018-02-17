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
var F08822;
(function (F08822) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Table = null;
            _this._p1Sheet = null;
            _this._tableRules = new F08822.TableRules(_this);
            _this._interfaceRules = new F08822.InterfaceRules(_this);
            _this._updateRules = new F08822.UpdateRules(_this);
            _this._exportRules = new F08822.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F08822.P1Sheet("SHT_F08_822_R1", this);
                }
                return this._p1Sheet;
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
        Object.defineProperty(FDocument.prototype, "UpdateRules", {
            get: function () {
                return this._updateRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ExportRules", {
            get: function () {
                return this._exportRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Table", {
            get: function () {
                if (this._p1Table == null) {
                    this._p1Table = new F08822.P1Table("F08_822_R1_SumValues", this, new F08822.P1RowsTable("F08_822_R1_SumTypes"));
                }
                return this._p1Table;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F08822.FDocument = FDocument;
})(F08822 || (F08822 = {}));
