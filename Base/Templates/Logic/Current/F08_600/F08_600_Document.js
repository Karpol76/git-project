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
var F08600;
(function (F08600) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableRules = new F08600.TableRules(_this);
            _this._interfaceRules = new F08600.InterfaceRules(_this);
            _this._updateRules = new F08600.UpdateRules(_this);
            _this._exportRules = new F08600.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1Table;
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
                    this._p1Table = new F08600.P1Table("F08_600_R1_SumValues", this);
                }
                return this._p1Table;
            },
            enumerable: true,
            configurable: true
        });
        FDocument.prototype.GetPartIndicateBudgetData = function (PartKey) {
            var result = [];
            var fieldId = PartKey == PartIndicateBudgetTypes.Part1 ? "Part1_Y" : "Part3_Y";
            for (var i = 0; i < this.Settings.YearsCount; i++) {
                result[i] = this.P1Table.GetFieldValue(fieldId + ("" + (i + 1)));
            }
            return result;
        };
        return FDocument;
    }(BasePartIndicateBudgetDocumentObject));
    F08600.FDocument = FDocument;
})(F08600 || (F08600 = {}));
