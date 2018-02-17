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
var F02110;
(function (F02110) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._importRules = null;
            _this._p1TotalTable = null;
            _this._ref1KosguTable = null;
            _this._ref1OkpdTable = null;
            _this._ref1ObjTable = null;
            _this._purchaseObjectsSprTable = null;
            _this._ref1ObjDescTable = null;
            _this._ref2KosguTable = null;
            _this._ref2OkpdTable = null;
            _this._ref2ObjTable = null;
            _this._ref2ObjDescTable = null;
            _this._p1Sheet = null;
            _this._p2Sp1Sheet = null;
            _this._p2Sp2Sheet = null;
            _this._p3Sp1Sp1Sheet = null;
            _this._p3Sp2Sp1Sheet = null;
            _this._addYearsHelper = null;
            _this._addDataYearsCount = 1;
            _this._mainDataYearsCount = ObasStageSettings.YearsCount;
            _this.Settings.YearsCount = _this._mainDataYearsCount + _this._addDataYearsCount;
            _this._tableRules = new F02110.TableRules(_this);
            _this._interfaceRules = new F02110.InterfaceRules(_this);
            _this._updateRules = new F02110.UpdateRules(_this);
            _this._exportRules = new F02110.ExportRules(_this);
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
        Object.defineProperty(FDocument.prototype, "P3Sp2Sp1Sheet", {
            get: function () {
                if (this._p3Sp2Sp1Sheet == null) {
                    this._p3Sp2Sp1Sheet = new F02110.P3Sp2Sp1HierarchySheet(this);
                }
                return this._p3Sp2Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp1Sp1Sheet", {
            get: function () {
                if (this._p3Sp1Sp1Sheet == null) {
                    this._p3Sp1Sp1Sheet = new F02110.P3Sp1Sp1HierarchySheet(this);
                }
                return this._p3Sp1Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp2Sheet", {
            get: function () {
                if (this._p2Sp2Sheet == null) {
                    this._p2Sp2Sheet = new F02110.P2Sp2HierarchySheet(this);
                }
                return this._p2Sp2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sp1Sheet", {
            get: function () {
                if (this._p2Sp1Sheet == null) {
                    this._p2Sp1Sheet = new F02110.P2Sp1HierarchySheet(this);
                }
                return this._p2Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F02110.P1Sheet("R1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ImportRules", {
            get: function () {
                if (this._importRules == null) {
                    this._importRules = new F02110.ImportRules(this);
                }
                return this._importRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref2ObjDescTable", {
            get: function () {
                if (this._ref2ObjDescTable == null) {
                    this._ref2ObjDescTable = new F02110.ObjectDescTable("F02_100_Ref_2_ObjectDesc", this);
                }
                return this._ref2ObjDescTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref2ObjTable", {
            get: function () {
                if (this._ref2ObjTable == null) {
                    this
                        ._ref2ObjTable = new F02110.UsdObjectDataTable("F02_100_Ref_2_Object", this, this.Ref2OkpdTable, this.Ref2ObjDescTable, this.P1TotalTable, F02110.StrKeysP1.P3);
                }
                return this._ref2ObjTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref2OkpdTable", {
            get: function () {
                if (this._ref2OkpdTable == null) {
                    this._ref2OkpdTable = new F02110.PartOkpdTable("F02_100_Ref_2_Okpd", this.Ref2KosguTable);
                }
                return this._ref2OkpdTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref2KosguTable", {
            get: function () {
                if (this._ref2KosguTable == null) {
                    this._ref2KosguTable = new F02110.PartTableWithKosgu("F02_100_Ref_2_Kosgu", this);
                }
                return this._ref2KosguTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref1ObjDescTable", {
            get: function () {
                if (this._ref1ObjDescTable == null) {
                    this._ref1ObjDescTable = new F02110.ObjectDescTable("F02_100_Ref_1_ObjectDesc", this);
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
        Object.defineProperty(FDocument.prototype, "Ref1ObjTable", {
            get: function () {
                if (this._ref1ObjTable == null) {
                    this._ref1ObjTable = new F02110.PartObjectDataTable("F02_100_Ref_1_Object", this, this.Ref1OkpdTable, this.Ref1ObjDescTable, this.P1TotalTable, F02110.StrKeysP1.P2);
                }
                return this._ref1ObjTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref1OkpdTable", {
            get: function () {
                if (this._ref1OkpdTable == null) {
                    this._ref1OkpdTable = new F02110.PartOkpdTable("F02_100_Ref_1_Okpd", this.Ref1KosguTable);
                }
                return this._ref1OkpdTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "Ref1KosguTable", {
            get: function () {
                if (this._ref1KosguTable == null) {
                    this._ref1KosguTable = new F02110.PartTableWithKosgu("F02_100_Ref_1_Kosgu", this);
                }
                return this._ref1KosguTable;
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
                    this._p1TotalTable = new F02110.FObasTableP1Total("F02_100_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        FDocument.prototype.GetPartIndicateBudgetData = function (PartKey) {
            var _this = this;
            var result = [];
            for (var i = 0; i < this.Settings.YearsCount; i++) {
                result[i] = 0;
            }
            var fieldId = PartKey == PartIndicateBudgetTypes.Part1 ? "Y_R1_" : "Y_R3_";
            var getSumTable = function (row) {
                for (var i = 0; i < _this.Settings.YearsCount; i++) {
                    result[i] = result[i] + row.GetFieldValue(fieldId + ("" + (i + 1)));
                }
            };
            this.Ref1ObjTable.Iterate(getSumTable);
            this.Ref2ObjTable.Iterate(getSumTable);
            return result;
        };
        return FDocument;
    }(BasePartIndicateBudgetDocumentObject));
    F02110.FDocument = FDocument;
})(F02110 || (F02110 = {}));
