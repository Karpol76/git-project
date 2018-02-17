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
var F05312;
(function (F05312) {
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
                    this._resetDataTables = [];
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
                        this.Document.TableCost,
                        this.Document.TableP3,
                        this.Document.TableNorm,
                        this.Document.TableCostYear,
                        this.Document.TableCostPba,
                        this.Document.TableSubject
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
                            GenericFields: [BaseObasTableFields.YearDataField]
                        },
                        {
                            Table: this.Document.TableSubject,
                            GenericFields: [BaseObasTableFields.YearDataField,
                                F05312.ObasTableFields.UbYearDataField,
                                F05312.ObasTableFields.FaYearDataField,
                                F05312.ObasTableFields.PbaYearDataField]
                        },
                        {
                            Table: this.Document.TableCost,
                            GenericFields: [
                                F05312.ObasTableFields.CoefSalaryYearDataField,
                                F05312.ObasTableFields.NormCostMinUbYearDataField,
                                F05312.ObasTableFields.NormCostMaxUbYearDataField,
                                F05312.ObasTableFields.AvgUbYearDataField,
                                F05312.ObasTableFields.RateAvgSalaryYearDataField,
                                F05312.ObasTableFields.CoefUbYearDataField,
                                F05312.ObasTableFields.NormCostMinToMaxUbYearDataField,
                                F05312.ObasTableFields.AvgSalaryYearDataField,
                                F05312.ObasTableFields.NormCostExceedMaxUbYearDataField,
                                F05312.ObasTableFields.RegCoefSalaryYearDataField,
                                F05312.ObasTableFields.NormCostMinFaYearDataField,
                                F05312.ObasTableFields.NormCostMaxFaYearDataField,
                                F05312.ObasTableFields.AvgFaYearDataField,
                                F05312.ObasTableFields.CoefFaYearDataField,
                                F05312.ObasTableFields.NormCostMinToMaxFaYearDataField,
                                F05312.ObasTableFields.NormCostExceedMaxFaYearDataField,
                                F05312.ObasTableFields.NormCostPbaYearDataField
                            ]
                        },
                        {
                            Table: this.Document.TableP3,
                            GenericFields: [BaseObasTableFields.YearDataField]
                        },
                        {
                            Table: this.Document.TableNorm,
                            GenericFields: [F05312.ObasTableFields.AvgCountUbYearDataField,
                                F05312.ObasTableFields.AvgCountRegWorklessUbYearDataField,
                                F05312.ObasTableFields.NormUbYearDataField,
                                F05312.ObasTableFields.AvgCountRegWorklessFaYearDataField,
                                F05312.ObasTableFields.NormFaYearDataField,
                                F05312.ObasTableFields.AvgCountRegWorklessPbaYearDataField,
                                F05312.ObasTableFields.NormPbaYearDataField]
                        },
                        {
                            Table: this.Document.TableCostPba,
                            GenericFields: [F05312.ObasTableFields.AvgPeriodPbaYearDataField,
                                F05312.ObasTableFields.CostPbaYearDataField]
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
                        this.Document.TableP1,
                        this.Document.TableCost,
                        this.Document.TableP3,
                        this.Document.TableNorm,
                        this.Document.TableCostYear,
                        this.Document.TableSubject,
                        this.Document.TableCostPba
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
                    this._deleteYearTables = [this.Document.TableCostYear];
                }
                return this._deleteYearTables;
            },
            enumerable: true,
            configurable: true
        });
        UpdateRules.prototype.InnerUpdate = function (oldVer, curVer) {
        };
        return UpdateRules;
    }(BaseUpdateRules));
    F05312.UpdateRules = UpdateRules;
})(F05312 || (F05312 = {}));
