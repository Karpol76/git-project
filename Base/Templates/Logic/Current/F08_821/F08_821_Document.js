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
var F08821;
(function (F08821) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Table = null;
            _this._p2DataTable = null;
            _this._p2Table = null;
            _this._p1Sheet = null;
            _this._p2Sheet = null;
            _this._p1RowsTable = null;
            _this._tableRules = new F08821.TableRules(_this);
            _this._interfaceRules = new F08821.InterfaceRules(_this);
            _this._updateRules = new F08821.UpdateRules(_this);
            _this._exportRules = new F08821.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1RowsTable", {
            get: function () {
                if (this._p1RowsTable == null) {
                    this._p1RowsTable = new F08821.P1RowsTable("F08_820_R1_SumTypes");
                }
                return this._p1RowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new F08821.P2Sheet("SHT_F08_820_R2", this);
                }
                return this._p2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F08821.P1Sheet("SHT_F08_820_R1", this);
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
                    this._p1Table = new F08821.P1Table("F08_820_R1_SumValues", this, this.P1RowsTable);
                }
                return this._p1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Table", {
            get: function () {
                if (this._p2Table == null) {
                    this._p2Table = new F08821.P2Table("F08_820_R2_L1_V2");
                }
                return this._p2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2DataTable", {
            get: function () {
                if (this._p2DataTable == null) {
                    this._p2DataTable = new F08821.P2DataTable("F08_820_R2_L2_V2", this, this.P2Table, this.P1Table);
                }
                return this._p2DataTable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F08821.FDocument = FDocument;
})(F08821 || (F08821 = {}));
