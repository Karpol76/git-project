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
var F08410;
(function (F08410) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._projectInfoTable = null;
            _this._importRules = null;
            _this._tableRules = new F08410.TableRules(_this);
            _this._interfaceRules = new F08410.InterfaceRules(_this);
            _this._updateRules = new F08410.UpdateRules(_this);
            _this._exportRules = new F08410.ExportRules(_this);
            _this._excelExportRules = new F08410.ExcelExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "ImportRules", {
            get: function () {
                if (this._importRules == null) {
                    this._importRules = new F08410.ImportRules(this);
                }
                return this._importRules;
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
        Object.defineProperty(FDocument.prototype, "ProjectInfoP4Table", {
            get: function () {
                if (this._projectInfoP4Table == null) {
                    this._projectInfoP4Table = new F08410.ProjectInfoP4ObasTable("F04_100_R4_V2", this, this.CustomerP4Table, this.P1TotalTable);
                }
                return this._projectInfoP4Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ProjectInfoTable", {
            get: function () {
                if (this._projectInfoTable == null) {
                    this._projectInfoTable = new F08410.ProjectInfoObasTable("F04_100_R2_V4", this, this.CustomerTable, this.P1TotalTable);
                }
                return this._projectInfoTable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(F04111.FDocument));
    F08410.FDocument = FDocument;
})(F08410 || (F08410 = {}));
