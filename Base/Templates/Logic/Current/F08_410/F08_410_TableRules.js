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
var F08410;
(function (F08410) {
    var BaseBaseProjectInfoObasTableF04111 = F04111.BaseBaseProjectInfoObasTable;
    var ProjectInfoObasTableSprFieldsF04111 = F04111.ProjectInfoObasTableSprFields;
    var StrKeysP1F04111 = F04111.StrKeysP1;
    var TableRules = (function (_super) {
        __extends(TableRules, _super);
        function TableRules(document) {
            return _super.call(this, document) || this;
        }
        return TableRules;
    }(F04111.TableRules));
    F08410.TableRules = TableRules;
    var BaseProjectInfoObasTable = (function (_super) {
        __extends(BaseProjectInfoObasTable, _super);
        function BaseProjectInfoObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseProjectInfoObasTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalTable.SetSumByKeys(fieldId, this.TotalTable.GetKeys(this.GetTotalStrKey()), oldValue, newValue);
        };
        return BaseProjectInfoObasTable;
    }(BaseBaseProjectInfoObasTableF04111));
    F08410.BaseProjectInfoObasTable = BaseProjectInfoObasTable;
    var ProjectInfoObasTable = (function (_super) {
        __extends(ProjectInfoObasTable, _super);
        function ProjectInfoObasTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sprFields = null;
            _this._branch = null;
            _this._isAccepted = null;
            return _this;
        }
        Object.defineProperty(ProjectInfoObasTable.prototype, "Branch", {
            get: function () {
                if (this._branch == null) {
                    this._branch = new ObasTableField("Branch", this);
                }
                return this._branch;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectInfoObasTable.prototype, "SprFields", {
            get: function () {
                if (this._sprFields == null) {
                    this._sprFields = new ProjectInfoObasTableSprFieldsF04111(this);
                }
                return this._sprFields;
            },
            enumerable: true,
            configurable: true
        });
        ProjectInfoObasTable.prototype.GetTotalStrKey = function () {
            return this.ParentTable.IsAccepted.Value ? StrKeysP1F04111.Accepted : StrKeysP1F04111.Offered;
        };
        ProjectInfoObasTable.prototype.GetDataFieldsCount = function () {
            return this.ParentTable.IsAccepted.Value ? ObasStageSettings.YearsCount + 1 : ObasStageSettings.YearsCount;
        };
        Object.defineProperty(ProjectInfoObasTable.prototype, "IsAccepted", {
            get: function () {
                if (this._isAccepted == null) {
                    this._isAccepted = new ObasTableField("is_accepted_type", this);
                }
                return this._isAccepted;
            },
            enumerable: true,
            configurable: true
        });
        ProjectInfoObasTable.prototype.CheckIsAccepted = function () {
            return this.IsAccepted.Value;
        };
        ProjectInfoObasTable.prototype.CheckIsNotAccepted = function () {
            return !this.IsAccepted.Value;
        };
        Object.defineProperty(ProjectInfoObasTable.prototype, "IsAcceptedFlag", {
            get: function () {
                return this.IsAccepted.Value;
            },
            enumerable: true,
            configurable: true
        });
        return ProjectInfoObasTable;
    }(BaseProjectInfoObasTable));
    F08410.ProjectInfoObasTable = ProjectInfoObasTable;
    var ProjectInfoP4ObasTable = (function (_super) {
        __extends(ProjectInfoP4ObasTable, _super);
        function ProjectInfoP4ObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ProjectInfoP4ObasTable.prototype.GetTotalStrKey = function () {
            return StrKeysP1F04111.NotAccepted;
        };
        ProjectInfoP4ObasTable.prototype.GetDataFieldsCount = function () {
            return ObasStageSettings.YearsCount;
        };
        return ProjectInfoP4ObasTable;
    }(BaseProjectInfoObasTable));
    F08410.ProjectInfoP4ObasTable = ProjectInfoP4ObasTable;
})(F08410 || (F08410 = {}));
