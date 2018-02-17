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
var F05306;
(function (F05306) {
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
                    this._recalcedDataTables = [this.Document.SubjectsDataTable];
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
                            Table: this.Document.SubjectsDataTable,
                            GenericFields: this.Document.SubjectsDataTable.ResetFields()
                        },
                        {
                            Table: this.Document.TableP3,
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
                    this._copyDataTables = [this.Document.TableP1, this.Document.SubjectsDataTable, this.Document.TableP3];
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
        UpdateRules.prototype.InnerUpdate = function (oldVer, curVer) { };
        return UpdateRules;
    }(BaseUpdateRules));
    F05306.UpdateRules = UpdateRules;
})(F05306 || (F05306 = {}));
