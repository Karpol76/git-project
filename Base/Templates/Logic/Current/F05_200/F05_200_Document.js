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
var F05200;
(function (F05200) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._tableRules = new F05200.TableRules(_this);
            _this._interfaceRules = new F05200.InterfaceRules(_this);
            _this._updateRules = new F05200.UpdateRules(_this);
            _this._exportRules = new F05200.ExportRules(_this);
            _this._excelExportRules = new F08410.ExcelExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "AddDataYearsCount", {
            get: function () {
                return this._addDataYearsCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "MainDataYearsCount", {
            get: function () {
                return this._mainDataYearsCount;
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
                    this._p1TotalTable = new F04111.FObasTableP1Total("F05_200_R1_SumValues", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InvestInfoTable", {
            get: function () {
                if (this._investInfoTable == null) {
                    this._investInfoTable = new F04111.InvestInfoObasTable("F05_200_R2_1", this.ProjectInfoTable);
                }
                return this._investInfoTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ProjectInfoTable", {
            get: function () {
                if (this._projectInfoTable == null) {
                    this._projectInfoTable = new F08410.ProjectInfoObasTable("F05_200_R2", this, this.CustomerTable, this.P1TotalTable);
                }
                return this._projectInfoTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "CustomerTable", {
            get: function () {
                if (this._customerTable == null) {
                    this._uniqCustomersTable = new F04111.UniqCustomerObasTable("F05_200_Customers", this);
                    this._customerTable = new F04111.CustomersObasTable("F05_200_Customers_R2R3", this, this.UniqCustomersTable);
                }
                return this._customerTable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(F08410.FDocument));
    F05200.FDocument = FDocument;
})(F05200 || (F05200 = {}));
