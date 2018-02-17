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
var F01212;
(function (F01212) {
    var F012Xxp2Sp3Sp4ObasTable = F012XX.P2Sp3Sp4ObasTable;
    var F012Xxp3Sp3Sp4ObasTable = F012XX.P3Sp3Sp4ObasTable;
    var F012Xxp4Sp3ObasTable = F012XX.P4Sp3ObasTable;
    var F012Xxp5Sp3Sp4ObasTable = F012XX.P5Sp3Sp4ObasTable;
    var StrKeysP1TotalF012Xx = F012XX.P1TotalStrKeys;
    var P2Sp3Sp4ObasTableKeys = F01211.P2Sp3Sp4ObasTableKeys;
    var TableRules = (function (_super) {
        __extends(TableRules, _super);
        function TableRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TableRules;
    }(F012XX.TableRules));
    F01212.TableRules = TableRules;
    var FPXSp6ObasTable = (function (_super) {
        __extends(FPXSp6ObasTable, _super);
        function FPXSp6ObasTable(id, document, parent, _p1StrKey) {
            var _this = _super.call(this, id, document, parent) || this;
            _this._p1StrKey = _p1StrKey;
            return _this;
        }
        FPXSp6ObasTable.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(BaseObasTableFields.InsuranceYearDataField.GenerateId(fieldId), this.ParentTable.GetKeys(this._p1StrKey), oldValue, newValue);
        };
        return FPXSp6ObasTable;
    }(InsuranceObasTable));
    F01212.FPXSp6ObasTable = FPXSp6ObasTable;
    var PXSp6ObasTable = (function (_super) {
        __extends(PXSp6ObasTable, _super);
        function PXSp6ObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PXSp6ObasTable;
    }(FPXSp6ObasTable));
    F01212.PXSp6ObasTable = PXSp6ObasTable;
    var PXSp3Sp4Helper = (function () {
        function PXSp3Sp4Helper(_tableRef, _p1StrKey) {
            this._tableRef = _tableRef;
            this._p1StrKey = _p1StrKey;
        }
        PXSp3Sp4Helper.prototype.FotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var destFieldId = BaseObasTableFields.FotYearDataField.GenerateId(this._tableRef.YearOffset + 1);
            this._tableRef.ParentTable.SetSumByKeys(destFieldId, this.PrepareParentKeys(this._p1StrKey), oldValue, newValue);
            this._tableRef.InsTable.SetFotValue(this._tableRef.YearOffset, oldValue, newValue);
        };
        PXSp3Sp4Helper.prototype.UpdateInsuranceCount = function (fieldId, oldValue, newValue) {
            this._tableRef.InsTable.SetCountValue(this._tableRef.YearOffset, oldValue, newValue);
        };
        ;
        PXSp3Sp4Helper.prototype.PrepareParentKeys = function (strKey) {
            return this._tableRef.ParentTable.GetKeys(strKey);
        };
        ;
        PXSp3Sp4Helper.prototype.GetKeys = function (year, positionKey) {
            if (year === void 0) { year = this._tableRef.Year.Value; }
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
                var yearVal = copyData.getValue(this._tableRef.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yearVal.Value = keys.Year = year;
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
    F01212.PXSp3Sp4Helper = PXSp3Sp4Helper;
    var P2Sp3Sp4ObasTable = (function (_super) {
        __extends(P2Sp3Sp4ObasTable, _super);
        function P2Sp3Sp4ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P1TotalTable, document.P2Sp6Table) || this;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P2Sp3Sp4ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new PXSp3Sp4Helper(this, StrKeysP1TotalF012Xx.P2);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp3Sp4ObasTable.prototype.FotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Helper.FotChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
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
    F01212.P2Sp3Sp4ObasTable = P2Sp3Sp4ObasTable;
    var P3Sp3Sp4ObasTable = (function (_super) {
        __extends(P3Sp3Sp4ObasTable, _super);
        function P3Sp3Sp4ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P1TotalTable, document.P3Sp6Table) || this;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P3Sp3Sp4ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new PXSp3Sp4Helper(this, StrKeysP1TotalF012Xx.P3);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp3Sp4ObasTable.prototype.FotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Helper.FotChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
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
//            return this.Helper.InitCopyFieldsInfo();
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
    F01212.P3Sp3Sp4ObasTable = P3Sp3Sp4ObasTable;
    var P4Sp3ObasTable = (function (_super) {
        __extends(P4Sp3ObasTable, _super);
        function P4Sp3ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P1TotalTable, document.P4Sp4Table) || this;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P4Sp3ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new PXSp3Sp4Helper(this, StrKeysP1TotalF012Xx.P4);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        P4Sp3ObasTable.prototype.GetPostKeyId = function () {
            return "Spr_01_03_ID";
        };
        ;
        P4Sp3ObasTable.prototype.FotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Helper.FotChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
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
            result.setValue("CountMonth", {
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
    F01212.P4Sp3ObasTable = P4Sp3ObasTable;
    var P5Sp3Sp4ObasTable = (function (_super) {
        __extends(P5Sp3Sp4ObasTable, _super);
        function P5Sp3Sp4ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P1TotalTable, document.P5Sp6Table) || this;
            _this._helper = null;
            return _this;
        }
        Object.defineProperty(P5Sp3Sp4ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new PXSp3Sp4Helper(this, StrKeysP1TotalF012Xx.P5);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        P5Sp3Sp4ObasTable.prototype.FotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Helper.FotChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        P5Sp3Sp4ObasTable.prototype.PrepareParentKeys = function (strKey) {
            return this.Helper.PrepareParentKeys(strKey);
        };
        ;
        P5Sp3Sp4ObasTable.prototype.UpdateInsuranceCount = function (fieldId, oldValue, newValue) {
            this.Helper.UpdateInsuranceCount(fieldId, oldValue, newValue);
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
    F01212.P5Sp3Sp4ObasTable = P5Sp3Sp4ObasTable;
})(F01212 || (F01212 = {}));
