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
var F03500;
(function (F03500) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Sheet = null;
            _this._p2GroupSheet = null;
            _this._p1TotalTable = null;
            _this._p2RowsTable = null;
            _this._p2DataTable = null;
            _this._tableRules = new F03500.TableRules(_this);
            _this._interfaceRules = new F03500.InterfaceRules(_this);
            _this._updateRules = new F03500.UpdateRules(_this);
            _this._exportRules = new F03500.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2DataTable", {
            get: function () {
                if (this._p2DataTable == null) {
                    this._p2DataTable = new F03500.P2DataTable("FIpoteka_r2_Values", this, this.P2RowsTable, this.P1TotalTable);
                }
                return this._p2DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2RowsTable", {
            get: function () {
                if (this._p2RowsTable == null) {
                    this._p2RowsTable = new F03500.P2RowsTable("FIpoteka_r2_Rows");
                }
                return this._p2RowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F03500.P1TotalTable("FIpoteka_r1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F03500.P1Sheet("SHT_R1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2GroupSheet", {
            get: function () {
                if (this._p2GroupSheet == null) {
                    this._p2GroupSheet = new F03500.P2GroupSheet(this);
                }
                return this._p2GroupSheet;
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
    F03500.FDocument = FDocument;
})(F03500 || (F03500 = {}));
