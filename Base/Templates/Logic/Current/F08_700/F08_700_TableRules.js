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
var F08700;
(function (F08700) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F08700.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
        StrKeysP1Total[StrKeysP1Total["P2"] = 2] = "P2";
        StrKeysP1Total[StrKeysP1Total["P3"] = 3] = "P3";
    })(StrKeysP1Total = F08700.StrKeysP1Total || (F08700.StrKeysP1Total = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F08700.P1TotalTable = P1TotalTable;
    var PXDataTable = (function (_super) {
        __extends(PXDataTable, _super);
        function PXDataTable(id, document, p1Table, _p1StrKey) {
            var _this = _super.call(this, id, document, p1Table) || this;
            _this._p1StrKey = _p1StrKey;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(PXDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.RecordKey];
                    var yearField = BaseObasTableFields.YearDataField;
                    var fieldPush = function (field) {
                        _this.Document.IterateByYears(function (i) { _this._copyFields.push(field.GenerateTableField(_this, i)); });
                    };
                    fieldPush(yearField);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        PXDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._p1StrKey), oldValue, newValue);
        };
        PXDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            this.Document.IterateByYears(function (i) {
                var fieldId = BaseObasTableFields.YearDataField.GenerateId(i);
                _this.SumChangeEventHandler(_this.Id, _this.GetFieldValue(fieldId), 0, fieldId);
            });
        };
        PXDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        PXDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        PXDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        PXDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return PXDataTable;
    }(ObasTableWithSimpleKeysParent));
    F08700.PXDataTable = PXDataTable;
    var P3DataTable = (function (_super) {
        __extends(P3DataTable, _super);
        function P3DataTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P3DataTable.prototype.DollarChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearOffset + 1), this.Document.CommonRules
                .ConvertDollarToRuble(newValue, this.Document.Settings.StartYear + yearOffset));
        };
        Object.defineProperty(P3DataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.RecordKey];
                    var usdField = BaseObasTableFields.UsdYearDataField;
                    var fieldPush = function (field) {
                        _this.Document.IterateByYears(function (i) { _this._copyFields.push(field.GenerateTableField(_this, i)); });
                    };
                    fieldPush(usdField);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P3DataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.UsdYearDataField, BaseObasTableFields.YearDataField]);
        };
        P3DataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.UsdYearDataField);
        };
        return P3DataTable;
    }(PXDataTable));
    F08700.P3DataTable = P3DataTable;
})(F08700 || (F08700 = {}));
