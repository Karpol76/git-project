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
var F05401;
(function (F05401) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05401.TableRules = TableRules;
    var P1TotalRowKeys;
    (function (P1TotalRowKeys) {
        P1TotalRowKeys[P1TotalRowKeys["Total"] = 1] = "Total";
        P1TotalRowKeys[P1TotalRowKeys["Population"] = 2] = "Population";
        P1TotalRowKeys[P1TotalRowKeys["Competitive"] = 3] = "Competitive";
    })(P1TotalRowKeys = F05401.P1TotalRowKeys || (F05401.P1TotalRowKeys = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P1TotalTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P1TotalTable.prototype.IsUserEditRow = function (rowKey) {
            if (rowKey === void 0) { rowKey = this.StrKey; }
            return rowKey === P1TotalRowKeys.Competitive;
        };
        P1TotalTable.prototype.CollectUserData = function () {
            var _this = this;
            return this.CollectTableData(this.InitCopyFieldsInfo(), function () {
                return _this.IsUserEditRow();
            });
        };
        P1TotalTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P1TotalTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, function () {
                return _this.IsUserEditRow();
            }, BaseObasTableFields.YearDataField);
        };
        P1TotalTable.prototype.GetTotalKey = function () {
            return P1TotalRowKeys.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F05401.P1TotalTable = P1TotalTable;
    var P2Table = (function (_super) {
        __extends(P2Table, _super);
        function P2Table(id, _sumTable) {
            var _this = _super.call(this, id) || this;
            _this._sumTable = _sumTable;
            _this._copyFields = null;
            _this._scienceCity = null;
            _this._population = null;
            return _this;
        }
        Object.defineProperty(P2Table.prototype, "Population", {
            get: function () {
                if (this._population == null) {
                    this._population = new NumberObasTableField("Population", this);
                }
                return this._population;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.ScienceCity.ForeignKey, this.Population];
                    var populationField_1 = P2Table.PopulationYearDataField;
                    var competitiveField_1 = P2Table.CompetitiveYearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(populationField_1.GenerateTableField(_this, i));
                        _this._copyFields.push(competitiveField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "ScienceCity", {
            get: function () {
                if (this._scienceCity == null) {
                    this._scienceCity = new ObasSprTableField(ObasTableCollection.SprScienceCity, this);
                }
                return this._scienceCity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table, "PopulationYearDataField", {
            get: function () {
                if (this._populationYearDataField == null) {
                    this._populationYearDataField = new BaseGenericObasTableField("Population_Y");
                }
                return this._populationYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table, "CompetitiveYearDataField", {
            get: function () {
                if (this._competitiveYearDataField == null) {
                    this._competitiveYearDataField = new BaseGenericObasTableField("Competitive_Y");
                }
                return this._competitiveYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "Document", {
            get: function () {
                return this._sumTable.Document;
            },
            enumerable: true,
            configurable: true
        });
        P2Table.prototype.PopulationChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SumPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
            this._sumTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(fieldId), this._sumTable.GetKeys(P1TotalRowKeys.Population), oldValue, newValue);
        };
        P2Table.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), (this.GetFieldValue(P2Table.CompetitiveYearDataField.GenerateId(fieldId)) || 0) +
                (this.GetFieldValue(P2Table.PopulationYearDataField.GenerateId(fieldId)) || 0));
        };
        P2Table.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var populationField = P2Table.PopulationYearDataField;
            this.Document.IterateByYears(function (yearIndex) {
                _this.SetFieldValue(populationField.GenerateId(yearIndex), 0);
            });
        };
        P2Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P2Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P2Table.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, P2Table.PopulationYearDataField, P2Table.CompetitiveYearDataField);
        };
        P2Table.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [
                P2Table.PopulationYearDataField,
                P2Table.CompetitiveYearDataField,
                BaseObasTableFields.YearDataField
            ]);
        };
        return P2Table;
    }(ObasTable));
    P2Table._competitiveYearDataField = null;
    P2Table._populationYearDataField = null;
    F05401.P2Table = P2Table;
})(F05401 || (F05401 = {}));
