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
var F01211;
(function (F01211) {
    var ObasTablePxSp1F012Xx = F012XX.PXSp1ObasTable;
    var StrKeysPxSp1F012Xx = F012XX.PXSp1StrKeys;
    var ObasTablePxSp2F012Xx = F012XX.PXSp2ObasTable;
    var StrKeysPxSp2F012Xx = F012XX.PXSp2StrKeys;
    var F012Xxp2Sp3Sp4ObasTable = F012XX.P2Sp3Sp4ObasTable;
    var F012Xxp3Sp3Sp4ObasTable = F012XX.P3Sp3Sp4ObasTable;
    var F012Xxp4Sp3ObasTable = F012XX.P4Sp3ObasTable;
    var F012Xxp5Sp3Sp4ObasTable = F012XX.P5Sp3Sp4ObasTable;
    var P1TotalStrKeys = F012XX.P1TotalStrKeys;
    var TableRules = (function (_super) {
        __extends(TableRules, _super);
        function TableRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TableRules;
    }(F012XX.TableRules));
    F01211.TableRules = TableRules;
    var PXSp1ObasTable = (function (_super) {
        __extends(PXSp1ObasTable, _super);
        function PXSp1ObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PXSp1ObasTable.prototype.PrepareKeys = function (strKey) {
            return this.GetKeys(strKey);
        };
        PXSp1ObasTable.prototype.GetKeys = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            if (this._keys == null) {
                this._keys = new StrObasTableKeys(strKey);
            }
            else {
                this._keys.StrKey = strKey;
            }
            return this._keys;
        };
        PXSp1ObasTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.StrKeyField.Id, {
                Id: this.StrKeyField.Id,
                IsData: false
            });
            var fotField = BaseObasTableFields.FotYearDataField;
            var insField = BaseObasTableFields.InsuranceYearDataField;
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                var fieldId = fotField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
                fieldId = insField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            return result;
        };
        return PXSp1ObasTable;
    }(ObasTablePxSp1F012Xx));
    F01211.PXSp1ObasTable = PXSp1ObasTable;
    var PXSp6ObasTable = (function (_super) {
        __extends(PXSp6ObasTable, _super);
        function PXSp6ObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PXSp6ObasTable.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(BaseObasTableFields.InsuranceYearDataField.GenerateId(fieldId), this.ParentTable.GetKeys(StrKeysPxSp1F012Xx.Calced), oldValue, newValue);
        };
        return PXSp6ObasTable;
    }(InsuranceObasTable));
    F01211.PXSp6ObasTable = PXSp6ObasTable;
    var P3Sp6ObasTable = (function (_super) {
        __extends(P3Sp6ObasTable, _super);
        function P3Sp6ObasTable(id, document, _totalTable) {
            var _this = _super.call(this, id, document, null) || this;
            _this._totalTable = _totalTable;
            return _this;
        }
        P3Sp6ObasTable.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var totalTable = this._totalTable;
            totalTable.SetSumByKeys(BaseObasTableFields.InsuranceYearDataField.GenerateId(fieldId), totalTable.GetKeys(P1TotalStrKeys.P3), oldValue, newValue);
        };
        return P3Sp6ObasTable;
    }(PXSp6ObasTable));
    F01211.P3Sp6ObasTable = P3Sp6ObasTable;
    var PXSp2ObasTable = (function (_super) {
        __extends(PXSp2ObasTable, _super);
        function PXSp2ObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PXSp2ObasTable.prototype.PrepareKeys = function (strKey) {
            return this.GetKeys(strKey);
        };
        PXSp2ObasTable.prototype.PrepareParentKeys = function (strKey) {
            return this.ParentTable.GetKeys(strKey);
        };
        PXSp2ObasTable.prototype.UpdateInsuranceFot = function (fieldId, oldValue, newValue) {
            this.InsTable.SetFotValue(ObasHelper.GetYearOffsetById(fieldId), oldValue, newValue);
        };
        PXSp2ObasTable.prototype.GetKeys = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            if (this._keys == null) {
                this._keys = new StrObasTableKeys(strKey);
            }
            else {
                this._keys.StrKey = strKey;
            }
            return this._keys;
        };
        PXSp2ObasTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.StrKeyField.Id, {
                Id: this.StrKeyField.Id,
                IsData: false
            });
            var fotField = BaseObasTableFields.YearDataField;
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                var fieldId = fotField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            return result;
        };
        return PXSp2ObasTable;
    }(ObasTablePxSp2F012Xx));
    F01211.PXSp2ObasTable = PXSp2ObasTable;
    var P3Sp2ObasTable = (function (_super) {
        __extends(P3Sp2ObasTable, _super);
        function P3Sp2ObasTable(id, document, insTable, keyFields, rowsTableId, _totalTable) {
            var _this = _super.call(this, id, document, null, insTable, keyFields, rowsTableId) || this;
            _this._totalTable = _totalTable;
            return _this;
        }
        P3Sp2ObasTable.prototype.PIndexChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === StrKeysPxSp2F012Xx.Total) {
                var destFieldId = BaseObasTableFields.FotYearDataField.GenerateId(fieldId);
                var tableP1 = this._totalTable;
                tableP1.SetSumByKeys(destFieldId, tableP1.GetKeys(P1TotalStrKeys.P3), oldValue, newValue);
                this.UpdateInsuranceFot(destFieldId, oldValue, newValue);
            }
            else {
                _super.prototype.PIndexChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
            }
        };
        return P3Sp2ObasTable;
    }(PXSp2ObasTable));
    F01211.P3Sp2ObasTable = P3Sp2ObasTable;
    var P2Sp3Sp4ObasTableKeys = (function (_super) {
        __extends(P2Sp3Sp4ObasTableKeys, _super);
        function P2Sp3Sp4ObasTableKeys(Year, PositionKey) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            _this.PositionKey = PositionKey;
            return _this;
        }
        return P2Sp3Sp4ObasTableKeys;
    }(ObasTableKeys));
    F01211.P2Sp3Sp4ObasTableKeys = P2Sp3Sp4ObasTableKeys;
    var PXSp3Sp4Helper = (function () {
        function PXSp3Sp4Helper(_tableRef) {
            this._tableRef = _tableRef;
        }
        PXSp3Sp4Helper.prototype.UpdateInsuranceCount = function (fieldId, oldValue, newValue) {
            this._tableRef.ParentTable.InsTable.SetCountValue(this._tableRef.YearOffset, oldValue, newValue);
        };
        ;
        PXSp3Sp4Helper.prototype.PrepareParentKeys = function (strKey) {
            return this._tableRef.ParentTable.GetKeys(strKey);
        };
        ;
        PXSp3Sp4Helper.prototype.GetKeys = function (year, positionKey) {
            if (year === void 0) { year = this._tableRef.Year
                .Value; }
            if (positionKey === void 0) { positionKey = this._tableRef.PostKey.Value; }
            if (this._tableRef.Keys == null) {
                this._tableRef.Keys = new P2Sp3Sp4ObasTableKeys(year, positionKey);
            }
            else {
                this._tableRef.Keys.Year = year;
                this._tableRef.Keys.PositionKey = positionKey;
            }
            return this._tableRef.Keys;
        };
        PXSp3Sp4Helper.prototype.CopyDataHandler = function (recordKey, endYear) {
            if (this._tableRef.Locate(this._tableRef.RecordKey.Id, recordKey)) {
                this._tableRef.IsCopied.Value = true;
                var copyData = this._tableRef.CopyFieldsInfo;
                var keys = this.GetKeys();
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    copyData.getValue(this._tableRef.Year.Id).Value =
                        keys.Year = year;
                    this._tableRef.SetupTableRecordData(copyData, this._tableRef.Lookup([this._tableRef.Year.Id, this._tableRef.PostKey.Id], keys.ToArray(), this._tableRef.RecordKey.Id), true);
                }
            }
        };
        PXSp3Sp4Helper.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this._tableRef.PostKey.Id, {
                Id: this._tableRef.PostKey.Id,
                IsData: false
            });
            result.setValue(this._tableRef.Year.Id, {
                Id: this._tableRef.Year.Id,
                IsData: false
            });
            result.setValue(this._tableRef.IsCopied.Id, {
                Id: this._tableRef.IsCopied.Id,
                IsData: false
            });
            result.setValue(this._tableRef.EmplCount.Id, {
                Id: this._tableRef.EmplCount.Id,
                IsData: true
            });
            return result;
        };
        return PXSp3Sp4Helper;
    }());
    var P2Sp3Sp4ObasTable = (function (_super) {
        __extends(P2Sp3Sp4ObasTable, _super);
        function P2Sp3Sp4ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P2Sp2Table) || this;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P2Sp3Sp4ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new PXSp3Sp4Helper(this);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp3Sp4ObasTable.prototype.UpdateInsuranceCount = function (fieldId, oldValue, newValue) {
            this.Helper.UpdateInsuranceCount(fieldId, oldValue, newValue);
        };
        ;
        P2Sp3Sp4ObasTable.prototype.PrepareParentKeys = function (strKey) {
            return this.Helper.PrepareParentKeys(strKey);
        };
        ;
        P2Sp3Sp4ObasTable.prototype.GetKeys = function (year, positionKey) {
            return this.Helper.GetKeys(year, positionKey);
        };
        P2Sp3Sp4ObasTable.prototype.InitCopyFieldsInfo = function () {
            var result = this.Helper.InitCopyFieldsInfo();
            var countMonth = "CountMonth";
            result.setValue(countMonth, {
                Id: countMonth,
                IsData: true
            });
            return result;
        };
        P2Sp3Sp4ObasTable.prototype.InnerCopyData = function (recordKey, endYear) {
            this.Helper.CopyDataHandler(recordKey, endYear);
        };
        return P2Sp3Sp4ObasTable;
    }(F012Xxp2Sp3Sp4ObasTable));
    F01211.P2Sp3Sp4ObasTable = P2Sp3Sp4ObasTable;
    var P3Sp3Sp4ObasTable = (function (_super) {
        __extends(P3Sp3Sp4ObasTable, _super);
        function P3Sp3Sp4ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P3Sp2Table) || this;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P3Sp3Sp4ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new PXSp3Sp4Helper(this);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp3Sp4ObasTable.prototype.UpdateInsuranceCount = function (fieldId, oldValue, newValue) {
            this.Helper.UpdateInsuranceCount(fieldId, oldValue, newValue);
        };
        ;
        P3Sp3Sp4ObasTable.prototype.PrepareParentKeys = function (strKey) {
            return this.Helper.PrepareParentKeys(strKey);
        };
        ;
        P3Sp3Sp4ObasTable.prototype.GetKeys = function (year, positionKey) {
            return this.Helper.GetKeys(year, positionKey);
        };
        P3Sp3Sp4ObasTable.prototype.InitCopyFieldsInfo = function () {
            var result = this.Helper.InitCopyFieldsInfo();
            var g6 = "g6";
            result.setValue(g6, {
                Id: g6,
                IsData: true
            });
            var countMonth = "CountMonth";
            result.setValue(countMonth, {
                Id: countMonth,
                IsData: true
            });
            return result;
        };
        P3Sp3Sp4ObasTable.prototype.InnerCopyData = function (recordKey, endYear) {
            this.Helper.CopyDataHandler(recordKey, endYear);
        };
        return P3Sp3Sp4ObasTable;
    }(F012Xxp3Sp3Sp4ObasTable));
    F01211.P3Sp3Sp4ObasTable = P3Sp3Sp4ObasTable;
    var P4Sp3ObasTable = (function (_super) {
        __extends(P4Sp3ObasTable, _super);
        function P4Sp3ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P4Sp2Table) || this;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P4Sp3ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new PXSp3Sp4Helper(this);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        P4Sp3ObasTable.prototype.UpdateInsuranceCount = function (fieldId, oldValue, newValue) {
            this.Helper.UpdateInsuranceCount(fieldId, oldValue, newValue);
        };
        ;
        P4Sp3ObasTable.prototype.PrepareParentKeys = function (strKey) {
            return this.Helper.PrepareParentKeys(strKey);
        };
        ;
        P4Sp3ObasTable.prototype.GetKeys = function (year, positionKey) {
            return this.Helper.GetKeys(year, positionKey);
        };
        P4Sp3ObasTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.PostKey.Id, {
                Id: this.PostKey.Id,
                IsData: false
            });
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.EmplCount.Id, {
                Id: this.EmplCount.Id,
                IsData: true
            });
            result.setValue("g2", {
                Id: "g2",
                IsData: true
            });
            result.setValue("CountMonth",
                {
                    Id: "CountMonth",
                    IsData: true
                });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: true
            });
            for (var i = 4; i < 7; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        P4Sp3ObasTable.prototype.InnerCopyData = function (recordKey, endYear) {
            this.Helper.CopyDataHandler(recordKey, endYear);
        };
        return P4Sp3ObasTable;
    }(F012Xxp4Sp3ObasTable));
    F01211.P4Sp3ObasTable = P4Sp3ObasTable;
    var P5Sp3Sp4ObasTable = (function (_super) {
        __extends(P5Sp3Sp4ObasTable, _super);
        function P5Sp3Sp4ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P5Sp2Table) || this;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P5Sp3Sp4ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new PXSp3Sp4Helper(this);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        P5Sp3Sp4ObasTable.prototype.UpdateInsuranceCount = function (fieldId, oldValue, newValue) {
            this.Helper.UpdateInsuranceCount(fieldId, oldValue, newValue);
        };
        ;
        P5Sp3Sp4ObasTable.prototype.PrepareParentKeys = function (strKey) {
            return this.Helper.PrepareParentKeys(strKey);
        };
        ;
        P5Sp3Sp4ObasTable.prototype.GetKeys = function (year, positionKey) {
            return this.Helper.GetKeys(year, positionKey);
        };
        P5Sp3Sp4ObasTable.prototype.InitCopyFieldsInfo = function () {
            var result = this.Helper.InitCopyFieldsInfo();
            var countMonth = "CountMonth";
            result.setValue(countMonth, {
                Id: countMonth,
                IsData: true
            });
            return result;
        };
        P5Sp3Sp4ObasTable.prototype.InnerCopyData = function (recordKey, endYear) {
            this.Helper.CopyDataHandler(recordKey, endYear);
        };
        return P5Sp3Sp4ObasTable;
    }(F012Xxp5Sp3Sp4ObasTable));
    F01211.P5Sp3Sp4ObasTable = P5Sp3Sp4ObasTable;
})(F01211 || (F01211 = {}));
