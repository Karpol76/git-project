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
var F10120;
(function (F10120) {
    var UpdateRules = (function (_super) {
        __extends(UpdateRules, _super);
        function UpdateRules() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
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
                    this._resetDataTables = [this.Document.TableP1];
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
                        this.Document.TableP2SbP1,
                        this.Document.TableP3SbP1
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
                            Table: this.Document.TableP1,
                            GenericFields: [BaseObasTableFields.YearDataField, F10120.ObasTableFields.OtherRubField]
                        },
                        {
                            Table: this.Document.TableP2SbP1,
                            GenericFields: [BaseObasTableFields.YearDataField, F10120.ObasTableFields.OtherRubField]
                        },
                        {
                            Table: this.Document.TableP3SbP1,
                            GenericFields: [
                                BaseObasTableFields.UsdYearDataField, BaseObasTableFields.YearDataField,
                                F10120.ObasTableFields.OtherUsdField, F10120.ObasTableFields.OtherRubField
                            ]
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
                    this._copyDataTables = [
                        this.Document.TableP2SbP1,
                        this.Document.TableP3SbP1
                    ];
                }
                return this._copyDataTables;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UpdateRules.prototype, "DeleteYearTables", {
            get: function () {
                if (this._deleteYearTables == null) {
                    this._deleteYearTables = [];
                }
                return this._deleteYearTables;
            },
            enumerable: true,
            configurable: true
        });
        UpdateRules.prototype.InnerUpdate = function (oldVersion, currentVersion) {
        };
        UpdateRules.prototype.UpdateDollar = function () {
            var dollarInfo = [];
            var yearDataField = F10120.ObasTableFields.YearDataField;
            var yearOtherDataField = F10120.ObasTableFields.OtherRubField;
            var usdDataField = F10120.ObasTableFields.UsdYearDataField;
            var usdOtherDataField = F10120.ObasTableFields.OtherUsdField;
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                dollarInfo.push({
                    Year: ObasStageSettings.CurrentYear + i - 1,
                    DollarFieldId: usdDataField.GenerateId(i),
                    RubleFieldId: yearDataField.GenerateId(i)
                });
                dollarInfo.push({
                    Year: ObasStageSettings.CurrentYear + i - 1,
                    DollarFieldId: usdOtherDataField.GenerateId(i),
                    RubleFieldId: yearOtherDataField.GenerateId(i)
                });
            }
            this.Document.CommonRules.UpdateDollarTable(this.Document.TableP3SbP1, dollarInfo);
        };
        return UpdateRules;
    }(BaseUpdateRules));
    F10120.UpdateRules = UpdateRules;
})(F10120 || (F10120 = {}));
