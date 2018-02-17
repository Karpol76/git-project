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
var F06300;
(function (F06300) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1TotalTable = null;
            _this._p2ServWorkTable = null;
            _this._p2ServWorkIndicatorTable = null;
            _this._p3SubsidieNameTable = null;
            _this._p1Sheet = null;
            _this._p2Sheet = null;
            _this._p3Sheet = null;
            _this._tableRules = new F06300.TableRules(_this);
            _this._interfaceRules = new F06300.InterfaceRules(_this);
            _this._updateRules = new F06300.UpdateRules(_this);
            _this._exportRules = new F06300.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
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
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F06300.P1TotalTable("F06_300_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2ServWorkTable", {
            get: function () {
                if (this._p2ServWorkTable == null) {
                    this._p2ServWorkTable = new F06300.PartServWorkTable("F06_300_R2_1_L1", this);
                }
                return this._p2ServWorkTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2ServiceWorkIndicatorTable", {
            get: function () {
                if (this._p2ServWorkIndicatorTable == null) {
                    this._p2ServWorkIndicatorTable = new F06300.PartServiceWorkIndicatorTable("F06_300_R2_1_L2", this.P2ServWorkTable, this.P1TotalTable, F06300.P1StrKeys.Service);
                }
                return this._p2ServWorkIndicatorTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3SubsidieNameTable", {
            get: function () {
                if (this._p3SubsidieNameTable == null) {
                    this._p3SubsidieNameTable = new F06300.SusbidieNameTable("F06_300_R3_1", this, this.P1TotalTable, F06300.P1StrKeys.Other);
                }
                return this._p3SubsidieNameTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F06300.P1Sheet("SHT_F06_300_r1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new F06300.P2GroupSheet(this);
                }
                return this._p2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sheet", {
            get: function () {
                if (this._p3Sheet == null) {
                    this._p3Sheet = new F06300.P3GroupSheet(this);
                }
                return this._p3Sheet;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F06300.FDocument = FDocument;
})(F06300 || (F06300 = {}));
