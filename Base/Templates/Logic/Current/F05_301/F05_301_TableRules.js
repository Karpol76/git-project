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
var F05301;
(function (F05301) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05301.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F05301.StrKeysP1Total || (F05301.StrKeysP1Total = {}));
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
    F05301.P1TotalTable = P1TotalTable;
    var P3TableStrKeys;
    (function (P3TableStrKeys) {
        P3TableStrKeys[P3TableStrKeys["Koef1"] = 1] = "Koef1";
    })(P3TableStrKeys = F05301.P3TableStrKeys || (F05301.P3TableStrKeys = {}));
    var P3Table = (function (_super) {
        __extends(P3Table, _super);
        function P3Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return P3Table;
    }(SubsidiesSubventions.CoefficientsTable));
    F05301.P3Table = P3Table;
    var P4Table = (function (_super) {
        __extends(P4Table, _super);
        function P4Table(id, _document, _normativeTable, _sumTable) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._normativeTable = _normativeTable;
            _this._sumTable = _sumTable;
            _this._subject = null;
            _this._copyFields = null;
            _this._normativeTable.IndicatorChangeEvent.Add(function (table, oldValue, newValue, fieldId) {
                _this.Iterate(function () {
                    var yearIndex = ObasHelper.GetYearIndexById(fieldId);
                    _this.CalcSubvention(newValue, _this.GetFieldValue(P4Table.QuantityField.GenerateId(yearIndex)), yearIndex);
                });
            });
            return _this;
        }
        Object.defineProperty(P4Table, "QuantityField", {
            get: function () {
                if (this._quantityField == null) {
                    this._quantityField = new BaseGenericObasTableField("Q_Y");
                }
                return this._quantityField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        P4Table.prototype.CalcSubvention = function (normative, quantity, yearIndex) {
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearIndex), normative * quantity * 12);
        };
        Object.defineProperty(P4Table.prototype, "SubjectName", {
            get: function () {
                if (this._subject == null) {
                    this._subject = new ObasSprTableField(ObasTableCollection.SprSubject, this);
                }
                return this._subject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.SubjectName.ForeignKey];
                    var quantityField_1 = P4Table.QuantityField;
                    this._document.IterateByYears(function (i) {
                        _this._copyFields.push(quantityField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P4Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        P4Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P4Table.prototype.ResetData = function () {
            this._document.CommonRules.ResetTableData(this, [P4Table.QuantityField, BaseObasTableFields.YearDataField]);
        };
        P4Table.prototype.CopyData = function (srcYear, destYear) {
            this._document.CommonRules.CopyTableData(this, srcYear, destYear, null, P4Table.QuantityField);
        };
        P4Table.prototype.QuantityChangedEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearIndex = ObasHelper.GetYearIndexById(fieldId);
            this.CalcSubvention(this._normativeTable.GetIndicatorByYearIndex(yearIndex), newValue, yearIndex);
        };
        P4Table.prototype.SumChangedEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(fieldId, this._sumTable.GetKeys(StrKeysP1Total.Total), oldValue, newValue);
        };
        P4Table.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            this.Document.IterateByYears(function (i) {
                var fieldId = yearField.GenerateId(i);
                _this.SetFieldValue(fieldId, 0);
            });
        };
        return P4Table;
    }(ObasTable));
    P4Table._quantityField = null;
    F05301.P4Table = P4Table;
})(F05301 || (F05301 = {}));
