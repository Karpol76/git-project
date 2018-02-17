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
var F01409;
(function (F01409) {
    var UpdateRules = (function (_super) {
        __extends(UpdateRules, _super);
        function UpdateRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(UpdateRules.prototype, "ResetDataTables", {
            get: function () {
                if (this._resetDataTables == null) {
                    this._resetDataTables = [this.Document.P1TotalTable];
                }
                return this._resetDataTables;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UpdateRules.prototype, "RecalcedDataTables", {
            get: function () {
                if (this._recalcedDataTables == null) {
                    this._recalcedDataTables = [
                        this.Document.P2Sp1Table,
                        this.Document.P2Sp2Table, this.Document.P2Sp3Table, this.Document.P2Sp4Table,
                        this.Document.P2Sp5Table, this.Document.P2DailyPayDataTable, this.Document.P3Sp1Table,
                        this.Document.P3Sp2Table, this.Document.P3Sp3Table, this.Document.P3DailyPayDataTable,
                        this.Document.P4DataTable
                    ];
                }
                return this._recalcedDataTables;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UpdateRules.prototype, "ShiftYearTables", {
            get: function () {
                if (this._shiftYearTables == null) {
                    this._shiftYearTables = [
                        {
                            Table: this.Document.P1TotalTable,
                            GenericFields: [BaseObasTableFields.YearDataField]
                        },
                        {
                            Table: this.Document.P4DataTable,
                            GenericFields: [BaseObasTableFields.TaxYearDataField, BaseObasTableFields.YearDataField]
                        }
                    ];
                }
                return this._shiftYearTables;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UpdateRules.prototype, "CopyDataTables", {
            get: function () {
                if (this._copyDataTables == null) {
                    this._copyDataTables = [this.Document.P2Sp1Table,
                        this.Document.P2Sp2Table, this.Document.P2Sp3Table, this.Document.P2Sp4Table,
                        this.Document.P2Sp5Table, this.Document.P2DailyPayDataTable, this.Document.P3Sp1Table,
                        this.Document.P3Sp2Table, this.Document.P3Sp3Table, this.Document.P3DailyPayDataTable,
                        this.Document.P4DataTable];
                }
                return this._copyDataTables;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UpdateRules.prototype, "DeleteYearTables", {
            get: function () {
                if (this._deleteYearTables == null) {
                    this._deleteYearTables = [this.Document.P2Sp1Table,
                        this.Document.P2Sp2Table,
                        this.Document.P2Sp3Table,
                        this.Document.P2Sp4Table,
                        this.Document.P2Sp5KosguTable,
                        this.Document.P2DailyPayDataTable,
                        this.Document.P3Sp1Table,
                        this.Document.P3Sp2Table,
                        this.Document.P3Sp3KosguTable,
                        this.Document.P3DailyPayDataTable];
                }
                return this._deleteYearTables;
            },
            enumerable: true,
            configurable: true
        });
        UpdateRules.prototype.InnerUpdate = function (oldVersion, currentVersion) {
        };
        return UpdateRules;
    }(F01400.UpdateRules));
    F01409.UpdateRules = UpdateRules;
})(F01409 || (F01409 = {}));
