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
var F01409;
(function (F01409) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p4DataTable = null;
            _this._p1TotalTable = null;
            _this._p4Sheet = null;
            _this._interfaceRules = new F01409.InterfaceRules(_this);
            _this._updateRules = new F01409.UpdateRules(_this);
            _this._exportRules = new F01409.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P4Sheet", {
            get: function () {
                if (this._p4Sheet == null) {
                    this._p4Sheet = new F01409.P4Sheet("SHT_F04_109_R4", this);
                }
                return this._p4Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F01409.ObasTableP1Total("F01_400_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P4DataTable", {
            get: function () {
                if (this._p4DataTable == null) {
                    this._p4DataTable = new F01409.P4DataObasTable("F01_409_R4_Data", this, this.P1TotalTable, F01409.StrKeysP1.P4);
                }
                return this._p4DataTable;
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
    }(F01400.FDocument));
    F01409.FDocument = FDocument;
})(F01409 || (F01409 = {}));
