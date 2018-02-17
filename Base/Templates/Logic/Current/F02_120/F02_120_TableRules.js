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
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "YearDataR1Field", {
            get: function () {
                if (this._yearDataR1Field == null) {
                    this._yearDataR1Field = new BaseGenericObasTableField("R1_Y");
                }
                return this._yearDataR1Field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "UsdYearR1DataField", {
            get: function () {
                if (this._usdYearR1DataField == null) {
                    this._usdYearR1DataField = new BaseGenericObasTableField("Usd_R1_Y");
                }
                return this._usdYearR1DataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "YearDataR3Field", {
            get: function () {
                if (this._yearDataR3Field == null) {
                    this._yearDataR3Field = new BaseGenericObasTableField("R3_Y");
                }
                return this._yearDataR3Field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "UsdYearR3DataField", {
            get: function () {
                if (this._usdYearR3DataField == null) {
                    this._usdYearR3DataField = new BaseGenericObasTableField("Usd_R3_Y");
                }
                return this._usdYearR3DataField;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._yearDataR1Field = null;
    ObasTableFields._usdYearR1DataField = null;
    ObasTableFields._yearDataR3Field = null;
    ObasTableFields._usdYearR3DataField = null;
    F02120.ObasTableFields = ObasTableFields;
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F02120.TableRules = TableRules;
    var StrKeysP1;
    (function (StrKeysP1) {
        StrKeysP1[StrKeysP1["Total"] = 1] = "Total";
    })(StrKeysP1 = F02120.StrKeysP1 || (F02120.StrKeysP1 = {}));
    var FObasTableP1Total = (function (_super) {
        __extends(FObasTableP1Total, _super);
        function FObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1.Total;
        };
        return FObasTableP1Total;
    }(P1TotalObasTable));
    F02120.FObasTableP1Total = FObasTableP1Total;
    var KosguTableKeys = (function (_super) {
        __extends(KosguTableKeys, _super);
        function KosguTableKeys(KosguKey) {
            var _this = _super.call(this) || this;
            _this.KosguKey = KosguKey;
            return _this;
        }
        return KosguTableKeys;
    }(ObasTableKeys));
    F02120.KosguTableKeys = KosguTableKeys;
    var TableWithKosgu = (function (_super) {
        __extends(TableWithKosgu, _super);
        function TableWithKosgu(id, document) {
            var _this = _super.call(this, id, ["KOSGU_ID"], document) || this;
            _this._kosgu = null;
            return _this;
        }
        Object.defineProperty(TableWithKosgu.prototype, "Kosgu", {
            get: function () {
                if (this._kosgu == null) {
                    this._kosgu = new ObasSprTableField(ObasTableCollection.KosguSprTable, this);
                }
                return this._kosgu;
            },
            enumerable: true,
            configurable: true
        });
        TableWithKosgu.prototype.GetKeys = function (kosguKey) {
            if (kosguKey === void 0) { kosguKey = this.Kosgu.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new KosguTableKeys(kosguKey);
            }
            else {
                this._keys.KosguKey = kosguKey;
            }
            return this._keys;
        };
        return TableWithKosgu;
    }(ObasTableWithKeys));
    F02120.TableWithKosgu = TableWithKosgu;
    var TableProjectWithInternationalOrg = (function (_super) {
        __extends(TableProjectWithInternationalOrg, _super);
        function TableProjectWithInternationalOrg(id) {
            return _super.call(this, id) || this;
        }
        return TableProjectWithInternationalOrg;
    }(SprTable));
    F02120.TableProjectWithInternationalOrg = TableProjectWithInternationalOrg;
    var ProjectsDataTable = (function (_super) {
        __extends(ProjectsDataTable, _super);
        function ProjectsDataTable(id, document, parentTable, _p1Table) {
            var _this = _super.call(this, id, document, parentTable) || this;
            _this._p1Table = _p1Table;
            _this._sprProjects = null;
            _this._year = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(ProjectsDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Projects.ForeignKey];
                    var usdR1Field_1 = ObasTableFields.UsdYearR1DataField;
                    var usdR3Field_1 = ObasTableFields.UsdYearR3DataField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(usdR1Field_1.GenerateTableField(_this, yearIndex));
                        _this._copyFields.push(usdR3Field_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectsDataTable.prototype, "Projects", {
            get: function () {
                if (this._sprProjects == null) {
                    this._sprProjects = new ObasSprTableField(this.Document.ProjectWithInternationalOrgSprTable, this);
                }
                return this._sprProjects;
            },
            enumerable: true,
            configurable: true
        });
        ProjectsDataTable.prototype.AfterDeleteEventHandler = function (tableId) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            this.Document.IterateByYears(function (i) {
                _this.SetFieldValue(yearField.GenerateId(i), 0);
            });
        };
        ProjectsDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, ObasTableFields.UsdYearR1DataField, ObasTableFields.UsdYearR3DataField);
        };
        ProjectsDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        ProjectsDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        ProjectsDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.UsdYearDataField,
                ObasTableFields.UsdYearR1DataField,
                ObasTableFields.UsdYearR3DataField,
                BaseObasTableFields.YearDataField,
                ObasTableFields.YearDataR1Field,
                ObasTableFields.YearDataR3Field
            ]);
        };
        ProjectsDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._p1Table.SetSumByKeys(fieldId, this._p1Table.GetKeys(StrKeysP1.Total), oldValue, newValue);
        };
        ProjectsDataTable.prototype.GetFieldData = function (dataField, fieldId, newValue) {
            var dataFieldId = dataField.GenerateId(fieldId);
            return dataFieldId === fieldId ? newValue : this.GetFieldValue(dataFieldId) || 0;
        };
        ProjectsDataTable.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var fieldR1Value = this.GetFieldData(ObasTableFields.YearDataR1Field, fieldId, newValue);
            var fieldR3Value = this.GetFieldData(ObasTableFields.YearDataR3Field, fieldId, newValue);
            this.SetFieldValue(ObasTableFields.YearDataField.GenerateId(fieldId), fieldR1Value + fieldR3Value);
        };
        ProjectsDataTable.prototype.GetYearDataField = function (fieldId) {
            return fieldId.indexOf("R1") !== -1 ? ObasTableFields.YearDataR1Field : ObasTableFields.YearDataR3Field;
        };
        ProjectsDataTable.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearIndex = ObasHelper.GetYearIndexById(fieldId);
            var usdValue = this.Document.CommonRules.GetDollarRateByYear(ObasStageSettings.CurrentYear + yearIndex - 1);
            var yearDataField = this.GetYearDataField(fieldId);
            this.SetFieldValue(yearDataField.GenerateId(yearIndex), usdValue * newValue);
            var usdYearR1DataField = this.GetFieldData(ObasTableFields.UsdYearR1DataField, fieldId, newValue);
            var usdYearR3DataField = this.GetFieldData(ObasTableFields.UsdYearR3DataField, fieldId, newValue);
            this.SetFieldValue(ObasTableFields.UsdYearDataField.GenerateId(yearIndex), usdYearR1DataField + usdYearR3DataField);
        };
        return ProjectsDataTable;
    }(ObasTableWithSimpleKeysParent));
    F02120.ProjectsDataTable = ProjectsDataTable;
})(F02120 || (F02120 = {}));
