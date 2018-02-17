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
var F02120;
(function (F02120) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1TotalTable = null;
            _this._kosguTable = null;
            _this._P2Table = null;
            _this._projectWithInternationalOrgSprTable = null;
            _this._p1Sheet = null;
            _this._p2Sheet = null;
            _this._tableRules = new F02120.TableRules(_this);
            _this._interfaceRules = new F02120.InterfaceRules(_this);
            _this._updateRules = new F02120.UpdateRules(_this);
            _this._exportRules = new F02120.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new F02120.P2Sheet(this);
                }
                return this._p2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F02120.P1Sheet("R1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ProjectWithInternationalOrgSprTable", {
            get: function () {
                if (this._projectWithInternationalOrgSprTable == null) {
                    this._projectWithInternationalOrgSprTable = new F02120.TableProjectWithInternationalOrg("ProjectWithInternationalOrg");
                }
                return this._projectWithInternationalOrgSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Table", {
            get: function () {
                if (this._P2Table == null) {
                    this._P2Table = new F02120.ProjectsDataTable("F02_120_R2", this, this.KosguTable, this.P1TotalTable);
                }
                return this._P2Table;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "KosguTable", {
            get: function () {
                if (this._kosguTable == null) {
                    this._kosguTable = new F02120.TableWithKosgu("F02_120_Kosgu", this);
                }
                return this._kosguTable;
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
                    this._p1TotalTable = new F02120.FObasTableP1Total("F02_120_R1_Values", this);
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
            var field = PartKey == PartIndicateBudgetTypes.Part1 ? F02120.ObasTableFields.YearDataR1Field : F02120.ObasTableFields.YearDataR3Field;
            var getSumTable = function (row) {
                for (var i = 0; i < _this.Settings.YearsCount; i++) {
                    result[i] = result[i] + row.GetFieldValue(field.GenerateId(i + 1));
                }
            };
            this.P2Table.Iterate(getSumTable);
            return result;
        };
        return FDocument;
    }(BasePartIndicateBudgetDocumentObject));
    F02120.FDocument = FDocument;
})(F02120 || (F02120 = {}));
