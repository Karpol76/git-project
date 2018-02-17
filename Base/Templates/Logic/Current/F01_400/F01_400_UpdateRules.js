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
var F01400;
(function (F01400) {
    var UpdateRules = (function (_super) {
        __extends(UpdateRules, _super);
        function UpdateRules() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._foivOrgKey = null;
            _this._deleteYearTables = null;
            _this._copyDataTables = null;
            _this._shiftYearTables = null;
            _this._recalcedDataTables = null;
            _this._resetDataTables = null;
            return _this;
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
                        this.Document.P3Sp2Table, this.Document.P3Sp3Table, this.Document.P3DailyPayDataTable
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
                        this.Document.P3Sp2Table, this.Document.P3Sp3Table, this.Document.P3DailyPayDataTable];
                }
                return this._copyDataTables;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UpdateRules.prototype, "DeleteYearTables", {
            get: function () {
                if (this._deleteYearTables == null) {
                    this._deleteYearTables = [
                        this.Document.P2Sp1Table,
                        this.Document.P2Sp2Table,
                        this.Document.P2Sp3Table,
                        this.Document.P2Sp4Table,
                        this.Document.P2Sp5KosguTable,
                        this.Document.P2DailyPayDataTable,
                        this.Document.P3Sp1Table,
                        this.Document.P3Sp2Table,
                        this.Document.P3Sp3KosguTable,
                        this.Document.P3DailyPayDataTable
                    ];
                }
                return this._deleteYearTables;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UpdateRules.prototype, "FoivOrgKey", {
            get: function () {
                if (this._foivOrgKey == null) {
                    this._foivOrgKey = ObasTableCollection.OrganizationTable
                        .GetGrbsOrg(this.Document.MainParametersTable.Foiv.ForeignKey.Value);
                }
                return this._foivOrgKey;
            },
            enumerable: true,
            configurable: true
        });
        UpdateRules.prototype.InnerUpdate = function (oldVersion, currentVersion) {
        };
        return UpdateRules;
    }(BaseUpdateRules));
    F01400.UpdateRules = UpdateRules;
})(F01400 || (F01400 = {}));
