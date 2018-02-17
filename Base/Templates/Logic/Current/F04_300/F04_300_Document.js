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
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableP1Total = null;
            _this._tableP1 = null;
            _this._importRules = null;
            _this._p1Sheet = null;
            _this._tableRules = new F04300.TableRules(_this);
            _this._interfaceRules = new F04300.InterfaceRules(_this);
            _this._updateRules = new F04300.UpdateRules(_this);
            _this._exportRules = new F04300.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.TableP1Total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F04300.P1Sheet("SHT_F4_300_r1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ImportRules", {
            get: function () {
                if (this._importRules == null) {
                    this._importRules = new F04300.ImportRules(this);
                }
                return this._importRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP1", {
            get: function () {
                if (this._tableP1 == null) {
                    this._tableP1 = new F04300.P1Table("F04_300_R1", this, this.TableP1Total);
                }
                return this._tableP1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableP1Total", {
            get: function () {
                if (this._tableP1Total == null) {
                    this._tableP1Total = new F04300.P1TotalTable("F04_300_Total", this);
                }
                return this._tableP1Total;
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
        return FDocument;
    }(BaseDocumentObject));
    F04300.FDocument = FDocument;
})(F04300 || (F04300 = {}));
