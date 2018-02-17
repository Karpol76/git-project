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
var F04111;
(function (F04111) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._projectInfoTable = null;
            _this._investInfoTable = null;
            _this._customerTable = null;
            _this._p1TotalTable = null;
            _this._p1Table = null;
            _this._uniqCustomersTable = null;
            _this._customerP4Table = null;
            _this._projectInfoP4Table = null;
            _this._investInfoP4Table = null;
            _this._govCustomersSprTable = null;
            _this._importRules = null;
            _this._addYearsHelper = null;
            _this._addDataYearsCount = 1;
            _this._mainDataYearsCount = ObasStageSettings.YearsCount;
            _this.Settings.YearsCount = _this._mainDataYearsCount + _this._addDataYearsCount;
            _this._tableRules = new F04111.TableRules(_this);
            _this._interfaceRules = new F04111.InterfaceRules(_this);
            _this._updateRules = new F04111.UpdateRules(_this);
            _this._exportRules = new F04111.ExportRules(_this);
            _this._excelExportRules = new F04111.ExcelExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "AddYearsHelper", {
            get: function () {
                if (this._addYearsHelper == null) {
                    this._addYearsHelper = new AddYearsDocumentHelper(this);
                }
                return this._addYearsHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ImportRules", {
            get: function () {
                if (this._importRules == null) {
                    this._importRules = new F04111.ImportRules(this);
                }
                return this._importRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "GovCustomersSprTable", {
            get: function () {
                if (this._govCustomersSprTable == null) {
                    var recFieldId = BaseObasTableFields.RecordKeyField.Id;
                    this._govCustomersSprTable = new SprTable("GovernmentCustomers", [recFieldId], recFieldId);
                }
                return this._govCustomersSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InvestInfoP4Table", {
            get: function () {
                if (this._investInfoP4Table == null) {
                    this._investInfoP4Table = new F04111.InvestInfoP4ObasTable("F04_100_R4_2_V2", this.ProjectInfoP4Table);
                }
                return this._investInfoP4Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ProjectInfoP4Table", {
            get: function () {
                if (this._projectInfoP4Table == null) {
                    this._projectInfoP4Table = new F04111.ProjectInfoP4ObasTable("F04_100_R4_V2", this, this.CustomerP4Table, this.P1Table);
                }
                return this._projectInfoP4Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "CustomerP4Table", {
            get: function () {
                if (this._customerP4Table == null) {
                    this.InitCustomerTables();
                }
                return this._customerP4Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "UniqCustomersTable", {
            get: function () {
                if (this._uniqCustomersTable == null) {
                    this.InitCustomerTables();
                }
                return this._uniqCustomersTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Table", {
            get: function () {
                if (this._p1Table == null) {
                    this._p1Table = new F04111.FObasTableP1("F04_110_r1_CustomerValues", this.P1TotalTable);
                }
                return this._p1Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F04111.FObasTableP1Total("F04_100_R1_SumValues", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "CustomerTable", {
            get: function () {
                if (this._customerTable == null) {
                    this.InitCustomerTables();
                }
                return this._customerTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InvestInfoTable", {
            get: function () {
                if (this._investInfoTable == null) {
                    this._investInfoTable = new F04111.InvestInfoObasTable("F04_100_R2_1_V2", this.ProjectInfoTable);
                }
                return this._investInfoTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ProjectInfoTable", {
            get: function () {
                if (this._projectInfoTable == null) {
                    this._projectInfoTable = new F04111.ProjectInfoObasTable("F04_100_R2_V4", this, this.CustomerTable, this.P1Table);
                }
                return this._projectInfoTable;
            },
            enumerable: true,
            configurable: true
        });
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
        Object.defineProperty(FDocument.prototype, "ExcelExportRules", {
            get: function () {
                return this._excelExportRules;
            },
            enumerable: true,
            configurable: true
        });
        FDocument.prototype.InitCustomerTables = function () {
            this._uniqCustomersTable = new F04111.UniqCustomerObasTable("F04_110_Customers", this);
            this._customerTable = new F04111.CustomersObasTable("F04_110_Customers_R2R3_V2", this, this.UniqCustomersTable);
            this._customerP4Table = new F04111.UniqCustomerObasTable("F04_110_Customers_R4_V2", this, this.UniqCustomersTable);
        };
        return FDocument;
    }(BaseDocumentObject));
    F04111.FDocument = FDocument;
})(F04111 || (F04111 = {}));
