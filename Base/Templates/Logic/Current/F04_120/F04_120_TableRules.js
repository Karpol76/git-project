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
var F04120;
(function (F04120) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F04120.TableRules = TableRules;
    var P1StrKeys;
    (function (P1StrKeys) {
        P1StrKeys[P1StrKeys["Total"] = 1] = "Total";
    })(P1StrKeys = F04120.P1StrKeys || (F04120.P1StrKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1StrKeys.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F04120.P1TotalTable = P1TotalTable;
    var P2ObjectDataTable = (function (_super) {
        __extends(P2ObjectDataTable, _super);
        function P2ObjectDataTable(id, document, _sumTable) {
            var _this = _super.call(this, id, document) || this;
            _this._sumTable = _sumTable;
            _this._objectName = null;
            _this._country = null;
            _this._city = null;
            _this._buildYear = null;
            _this._residue = null;
            _this._npaTable = null;
            return _this;
        }
        Object.defineProperty(P2ObjectDataTable.prototype, "NpaTable", {
            get: function () {
                if (this._npaTable == null) {
                    this._npaTable = new NpaObasTable(this.Id, "NPA_Num", "NPA_Name", "NPA_Date");
                }
                return this._npaTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2ObjectDataTable.prototype, "Residue", {
            get: function () {
                if (this._residue == null) {
                    this._residue = new NumberObasTableField("g6", this);
                }
                return this._residue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2ObjectDataTable.prototype, "BuildYear", {
            get: function () {
                if (this._buildYear == null) {
                    this._buildYear = new NumberObasTableField("Year", this);
                }
                return this._buildYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2ObjectDataTable.prototype, "City", {
            get: function () {
                if (this._city == null) {
                    this._city = new ObasTableField("City", this);
                }
                return this._city;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2ObjectDataTable.prototype, "Country", {
            get: function () {
                if (this._country == null) {
                    this._country = new ObasSprTableField(ObasTableCollection.OksmSprTable, this);
                }
                return this._country;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2ObjectDataTable.prototype, "ObjectName", {
            get: function () {
                if (this._objectName == null) {
                    this._objectName = new ObasTableField("Name", this);
                }
                return this._objectName;
            },
            enumerable: true,
            configurable: true
        });
        P2ObjectDataTable.prototype.GetYearByField = function (fieldId) {
            return ObasStageSettings.CurrentYear + ObasHelper.GetYearOffsetById(fieldId);
        };
        P2ObjectDataTable.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), newValue * this.Document.CommonRules.GetDollarRateByYear(this.GetYearByField(fieldId)));
        };
        P2ObjectDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(P1StrKeys.Total), oldValue, newValue);
        };
        P2ObjectDataTable.prototype.ResetData = function () {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var usdYearField = BaseObasTableFields.UsdYearDataField;
            var yearsCount = this.Document.Settings.YearsCount;
            var resetDataHandler = function () {
                for (var i = 1; i <= yearsCount; i++) {
                    _this.SetFieldValue(yearField.GenerateId(i), 0);
                    _this.SetFieldValue(usdYearField.GenerateId(i), 0);
                }
            };
            this.Iterate(resetDataHandler);
        };
        return P2ObjectDataTable;
    }(ObasTableWithSimpleKeys));
    F04120.P2ObjectDataTable = P2ObjectDataTable;
    var P2InvestDataTable = (function (_super) {
        __extends(P2InvestDataTable, _super);
        function P2InvestDataTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._power = null;
            _this._okei = null;
            _this._invest = null;
            return _this;
        }
        Object.defineProperty(P2InvestDataTable.prototype, "Invest", {
            get: function () {
                if (this._invest == null) {
                    this._invest = new ObasSprTableField(ObasTableCollection.InvestigationTypesSprTable, this, "Investigation");
                }
                return this._invest;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2InvestDataTable.prototype, "Okei", {
            get: function () {
                if (this._okei == null) {
                    this._okei = new ObasSprTableField(ObasTableCollection.OkeiSprTable, this);
                }
                return this._okei;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2InvestDataTable.prototype, "Power", {
            get: function () {
                if (this._power == null) {
                    this._power = new NumberObasTableField("g6", this);
                }
                return this._power;
            },
            enumerable: true,
            configurable: true
        });
        P2InvestDataTable.prototype.GetYearByField = function (fieldId) {
            return ObasStageSettings.CurrentYear + ObasHelper.GetYearOffsetById(fieldId);
        };
        P2InvestDataTable.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var year = this.GetYearByField(fieldId);
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this.OwnerKey.Value), oldValue, newValue);
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), newValue * this.Document.CommonRules.GetDollarRateByYear(year));
        };
        P2InvestDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var usdField = BaseObasTableFields.UsdYearDataField;
            for (var i = 1, len = this.Document.Settings.YearsCount; i <= len; i++) {
                this.SetFieldValue(usdField.GenerateId(i), 0);
            }
        };
        P2InvestDataTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var yearsCount = this.Document.Settings.YearsCount;
            var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : yearsCount - 1;
            var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : yearsCount;
            var usdYearField = BaseObasTableFields.UsdYearDataField;
            var srcFieldId = usdYearField.GenerateId(srcIndex);
            var destFieldId = usdYearField.GenerateId(destIndex);
            var copy = function () {
                for (var i = 1; i <= yearsCount; i++) {
                    _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId), false);
                }
                _this.PostRow();
            };
            this.Iterate(copy);
        };
        P2InvestDataTable.prototype.ResetData = function () {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var usdYearField = BaseObasTableFields.UsdYearDataField;
            var yearsCount = this.Document.Settings.YearsCount;
            var resetDataHandler = function () {
                for (var i = 1; i <= yearsCount; i++) {
                    _this.SetFieldValue(yearField.GenerateId(i), 0);
                    _this.SetFieldValue(usdYearField.GenerateId(i), 0);
                }
            };
            this.Iterate(resetDataHandler);
        };
        P2InvestDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2InvestDataTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            var fieldId = this.OwnerKey.Id;
            result.setValue(fieldId, {
                Id: fieldId,
                IsData: false
            });
            fieldId = this.Invest.ForeignKey.Id;
            result.setValue(fieldId, {
                Id: fieldId,
                IsData: false
            });
            fieldId = this.Okei.ForeignKey.Id;
            result.setValue(fieldId, {
                Id: fieldId,
                IsData: false
            });
            fieldId = this.Power.Id;
            result.setValue(fieldId, {
                Id: fieldId,
                IsData: true
            });
            var usdYearField = BaseObasTableFields.UsdYearDataField;
            var yearsCount = this.Document.Settings.YearsCount;
            for (var i = 1; i <= yearsCount; i++) {
                fieldId = usdYearField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            return result;
        };
        return P2InvestDataTable;
    }(ObasTableWithSimpleKeysParent));
    F04120.P2InvestDataTable = P2InvestDataTable;
})(F04120 || (F04120 = {}));
