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
var F01222;
(function (F01222) {
    var F01212PxSp3Sp4Helper = F01212.PXSp3Sp4Helper;
    var F012XxFotObasTable = F012XX.FotObasTable;
    var F012Xxp3Sp3Sp4ObasTable = F012XX.P3Sp3Sp4ObasTable;
    var StrKeysP1TotalF012Xx = F012XX.P1TotalStrKeys;
    var F01212P4Sp3ObasTable = F01212.P4Sp3ObasTable;
    var P6Sp3Sp4ObasTable = (function (_super) {
        __extends(P6Sp3Sp4ObasTable, _super);
        function P6Sp3Sp4ObasTable(id, document) {
            var _this = _super.call(this, id, document, document.P1TotalTable, document.P6Sp6Table) || this;
            _this._helper = null;
            _this._salary = null;
            _this._payment = null;
            return _this;
        }
        Object.defineProperty(P6Sp3Sp4ObasTable.prototype, "Payment", {
            get: function () {
                if (this._payment == null) {
                    this._payment = new ObasTableField("g4_r6_4", this);
                }
                return this._payment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P6Sp3Sp4ObasTable.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this._salary = new ObasTableField("g4", this);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P6Sp3Sp4ObasTable.prototype, "Helper", {
            get: function () {
                if (this._helper == null) {
                    this._helper = new F01212PxSp3Sp4Helper(this, StrKeysP1TotalF012Xx.P6);
                }
                return this._helper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P6Sp3Sp4ObasTable.prototype, "CountMonth", {
            get: function () {
                if (this.IsFieldExists("CountMonth")) {
                    return this.GetFieldValue("CountMonth");
                }
                else {
                    return 12;
                }
            },
            enumerable: true,
            configurable: true
        });
        P6Sp3Sp4ObasTable.prototype.FotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Helper.FotChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        P6Sp3Sp4ObasTable.prototype.PostChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var count = this.EmplCount.Value;
            var salary = this.Salary.Value;
            var countMonth = this.CountMonth;
            this.Fot.Value = F012Xxp3Sp3Sp4ObasTable.CalcFot(count, salary, countMonth);
            for (var i = 5; i < 10; i++) {
                var premium = this.GetFieldValue("g" + (i + 1));
                this.SetFieldValue("g" + i + "_r6_4", F012Xxp3Sp3Sp4ObasTable.CalcPremium(count, salary, premium, countMonth));
            }
        };
        P6Sp3Sp4ObasTable.prototype.PaymentPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var sum = 0;
            for (var i = 5; i < 10; i++) {
                sum += this.GetFieldValue("g" + i + "_r6_4");
            }
            this.Payment.Value = sum;
        };
        P6Sp3Sp4ObasTable.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.CountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.PostChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("CountMonth", oldValue);
            }
        };
        P6Sp3Sp4ObasTable.prototype.GetFotParts = function () {
            return [this.Fot.Value, this.Payment.Value];
        };
        P6Sp3Sp4ObasTable.prototype.GetPostKeyId = function () {
            return "FederalEmployeePositions_ID";
        };
        ;
        P6Sp3Sp4ObasTable.prototype.UpdateInsuranceCount = function (fieldId, oldValue, newValue) {
            this.Helper.UpdateInsuranceCount(fieldId, oldValue, newValue);
        };
        ;
        P6Sp3Sp4ObasTable.prototype.PrepareParentKeys = function (strKey) {
            return this.Helper.PrepareParentKeys(strKey);
        };
        ;
        P6Sp3Sp4ObasTable.prototype.GetKeys = function (year, positionKey) {
            return this.Helper.GetKeys(year, positionKey);
        };
        P6Sp3Sp4ObasTable.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
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
            result.setValue("CountMonth", {
                Id: "CountMonth",
                IsData: true
            });
            result.setValue(this.Salary.Id, {
                Id: this.Salary.Id,
                IsData: true
            });
            return result;
        };
        P6Sp3Sp4ObasTable.prototype.InnerCopyData = function (recordKey, endYear) {
            this.Helper.CopyDataHandler(recordKey, endYear);
        };
        P6Sp3Sp4ObasTable.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("EmplNumber", 0);
            table.SetFieldValue("Fot", 0);
            table.SetFieldValue("TotalFot", 0);
            table.SetFieldValue("g4", 0);
            for (var i = 4; i < 10; i++) {
                table.SetFieldValue("g" + i + "_r6_4", 0);
            }
        };
        return P6Sp3Sp4ObasTable;
    }(F012XxFotObasTable));
    F01222.P6Sp3Sp4ObasTable = P6Sp3Sp4ObasTable;
    var P4Sp3ObasTable01222 = (function (_super) {
        __extends(P4Sp3ObasTable01222, _super);
        function P4Sp3ObasTable01222() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4Sp3ObasTable01222.prototype.GetPostKeyId = function () {
            return "PostCategory_ID";
        };
        ;
        return P4Sp3ObasTable01222;
    }(F01212P4Sp3ObasTable));
    F01222.P4Sp3ObasTable01222 = P4Sp3ObasTable01222;
})(F01222 || (F01222 = {}));
