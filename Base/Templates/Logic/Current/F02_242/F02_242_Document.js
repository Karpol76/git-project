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
var F02242;
(function (F02242) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1TotalTable = null;
            _this._p2KosguTable = null;
            _this._p2InfoTable = null;
            _this._p2OkpdTable = null;
            _this._p3OkpdTable = null;
            _this._ref1ObjTable = null;
            _this._purchaseObjectsSprTable = null;
            _this._informActionsSprTable = null;
            _this._ref1ObjDescTable = null;
            _this._sheet2 = null;
            _this._addYearsHelper = null;
            _this._addDataYearsCount = 1;
            _this._mainDataYearsCount = ObasStageSettings.YearsCount;
            _this.Settings.YearsCount = _this._mainDataYearsCount + _this._addDataYearsCount;
            _this._tableRules = new F02242.TableRules(_this);
            _this._interfaceRules = new F02242.InterfaceRules(_this);
            _this._updateRules = new F02242.UpdateRules(_this);
            _this._exportRules = new F02242.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
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
        Object.defineProperty(FDocument.prototype, "Sheet2", {
            get: function () {
                if (this._sheet2 == null) {
                    this._sheet2 = new F02242.SheetF("F02_100_R2", this, this.P2OkpdTable);
                }
                return this._sheet2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref1ObjDescTable", {
            get: function () {
                if (this._ref1ObjDescTable == null) {
                    this._ref1ObjDescTable = new F02242.ObjectDescTable("F02_100_Ref_1_ObjectDesc", this);
                }
                return this._ref1ObjDescTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PurchaseObjectsSprTable", {
            get: function () {
                if (this._purchaseObjectsSprTable == null) {
                    this._purchaseObjectsSprTable = new SprTable("PurchaseObjects");
                }
                return this._purchaseObjectsSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InformActionsSprTable", {
            get: function () {
                if (this._informActionsSprTable == null) {
                    this._informActionsSprTable = new SprTable("InformActions");
                }
                return this._informActionsSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref1ObjTable", {
            get: function () {
                if (this._ref1ObjTable == null) {
                    this._ref1ObjTable = new F02242.PartObjectDataTable("F02_100_Ref_1_Object", this, this.P3OkpdTable, this.Ref1ObjDescTable);
                }
                return this._ref1ObjTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2OkpdTable", {
            get: function () {
                if (this._p2OkpdTable == null) {
                    this._p2OkpdTable = new F02242.PartOkpdDataTable("F02_100_R2_L2_V2", this.P2KosguTable, this.P1TotalTable, F02242.StrKeysP1.Total);
                }
                return this._p2OkpdTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2InfoTable", {
            get: function () {
                if (this._p2InfoTable == null) {
                    this._p2InfoTable = new F02242.PartTableWithInfo("F02_100_R2_L0_V2");
                }
                return this._p2InfoTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2KosguTable", {
            get: function () {
                if (this._p2KosguTable == null) {
                    this._p2KosguTable = new F02242.PartTableWithKosgu("F02_100_R2_L1_V2", this.P2InfoTable);
                }
                return this._p2KosguTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3OkpdTable", {
            get: function () {
                if (this._p3OkpdTable == null) {
                    this
                        ._p3OkpdTable = new F02242.PartOkpdP3Table("F02_100_R3_L2_V2", this.P2KosguTable, this);
                }
                return this._p3OkpdTable;
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
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F02242.ObasTableP1Total("F02_100_r1_RecValues", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        FDocument.prototype.GetPartIndicateBudgetData = function (partKey) {
            var _this = this;
            var result = [];
            for (var i = 0; i < this.Settings.YearsCount; i++) {
                result[i] = 0;
            }
            var field = partKey === PartIndicateBudgetTypes.Part1 ? F02242.ObasTableFields.Part1Field : F02242.ObasTableFields.Part3Field;
            var getSumTable = function (row) {
                _this.IterateByYears(function (i) {
                    result[i] = result[i] + row.GetFieldValue(field.GenerateId(i + 1));
                }, false);
            };
            this.Ref1ObjTable.Iterate(getSumTable);
            return result;
        };
        return FDocument;
    }(BasePartIndicateBudgetDocumentObject));
    F02242.FDocument = FDocument;
})(F02242 || (F02242 = {}));
