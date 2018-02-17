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
var F06303;
(function (F06303) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Sheet = null;
            _this._npaSheet = null;
            _this._p1TotalTable = null;
            _this._historyCentersSprTable = null;
            _this._p1DataTable = null;
            _this._npaTable = null;
            _this._tableRules = new F06303.TableRules(_this);
            _this._interfaceRules = new F06303.InterfaceRules(_this);
            _this._updateRules = new F06303.UpdateRules(_this);
            _this._exportRules = new F06303.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "NpaTable", {
            get: function () {
                if (this._npaTable == null) {
                    this.InitHistoryDataTables();
                }
                return this._npaTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1DataTable", {
            get: function () {
                if (this._p1DataTable == null) {
                    this.InitHistoryDataTables();
                }
                return this._p1DataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "HistoryCentersSprTable", {
            get: function () {
                if (this._historyCentersSprTable == null) {
                    this._historyCentersSprTable = new SprTable("HistoryCenters", undefined, BaseObasTableFields.RecordKeyField.Id);
                }
                return this._historyCentersSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F06303.P1TotalTable("F06_303_R1_TopValues", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "NpaSheet", {
            get: function () {
                if (this._npaSheet == null) {
                    this._npaSheet = new F06303.NpaSheet("SHT_NPA");
                }
                return this._npaSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F06303.P1Sheet("SHT_R1", this);
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
        FDocument.prototype.InitHistoryDataTables = function () {
            this._p1DataTable = new F06303.HistoryCentersDataTable("F06_303_History_Centers_Values", this, this.P1TotalTable, this.HistoryCentersSprTable);
            this._npaTable = new F06303.NpaTable("F06_303_History_Centers_Npa", this._p1DataTable);
        };
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F06303.FDocument = FDocument;
})(F06303 || (F06303 = {}));
