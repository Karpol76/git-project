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
var F01400;
(function (F01400) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F01400.TableRules = TableRules;
    var StrKeysP1;
    (function (StrKeysP1) {
        StrKeysP1[StrKeysP1["Total"] = 1] = "Total";
        StrKeysP1[StrKeysP1["P2Total"] = 2] = "P2Total";
        StrKeysP1[StrKeysP1["P2Sp1"] = 3] = "P2Sp1";
        StrKeysP1[StrKeysP1["P2Sp2"] = 4] = "P2Sp2";
        StrKeysP1[StrKeysP1["P2Sp3"] = 11] = "P2Sp3";
        StrKeysP1[StrKeysP1["P2Sp4"] = 12] = "P2Sp4";
        StrKeysP1[StrKeysP1["P2Sp5"] = 13] = "P2Sp5";
        StrKeysP1[StrKeysP1["P2Sp6"] = 5] = "P2Sp6";
        StrKeysP1[StrKeysP1["P3Total"] = 6] = "P3Total";
        StrKeysP1[StrKeysP1["P3Sp1"] = 7] = "P3Sp1";
        StrKeysP1[StrKeysP1["P3Sp2"] = 8] = "P3Sp2";
        StrKeysP1[StrKeysP1["P3Sp3"] = 14] = "P3Sp3";
        StrKeysP1[StrKeysP1["P3Sp4"] = 9] = "P3Sp4";
    })(StrKeysP1 = F01400.StrKeysP1 || (F01400.StrKeysP1 = {}));
    var ObasTableP1Rows = (function (_super) {
        __extends(ObasTableP1Rows, _super);
        function ObasTableP1Rows() {
            var _this = _super.call(this, "F01_400_R1_Rows") || this;
            _this._ownerKey = null;
            return _this;
        }
        Object.defineProperty(ObasTableP1Rows.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this._ownerKey = new NumberObasTableField(BaseObasTableFields.OwnerKeyField.Id, this);
                }
                return this._ownerKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP1Rows.prototype, "StrKey", {
            get: function () {
                return this.RecordKey.Value;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableP1Rows;
    }(ObasTable));
    F01400.ObasTableP1Rows = ObasTableP1Rows;
    var StrKeysP1C = (function () {
        function StrKeysP1C() {
        }
        return StrKeysP1C;
    }());
    StrKeysP1C.P2Total = 2;
    StrKeysP1C.P2Sp1 = 3;
    StrKeysP1C.P2Sp2 = 4;
    StrKeysP1C.P2Sp3 = 11;
    StrKeysP1C.P2Sp4 = 12;
    StrKeysP1C.P2Sp5 = 13;
    StrKeysP1C.P2Sp6 = 5;
    StrKeysP1C.P3Total = 6;
    StrKeysP1C.P3Sp1 = 7;
    StrKeysP1C.P3Sp2 = 8;
    StrKeysP1C.P3Sp3 = 14;
    StrKeysP1C.P3Sp4 = 9;
    StrKeysP1C.Total = 1;
    F01400.StrKeysP1C = StrKeysP1C;
    var BaseP1TotalObasTable = (function (_super) {
        __extends(BaseP1TotalObasTable, _super);
        function BaseP1TotalObasTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._rowSprForeignKey = null;
            return _this;
        }
        Object.defineProperty(BaseP1TotalObasTable.prototype, "RowSprForeignKey", {
            get: function () {
                if (this._rowSprForeignKey == null) {
                    this._rowSprForeignKey = new ObasForeignKeyTableFieldTyped(this.Document.P1RowsTable, this, BaseObasTableFields.StrKeyField.Id, false);
                }
                return this._rowSprForeignKey;
            },
            enumerable: true,
            configurable: true
        });
        BaseP1TotalObasTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (!this.IsTotal) {
                var strKey = this.RowSprForeignKey.SourceTable.OwnerKey.Value;
                this.SetSumByKeys(fieldId, this.GetKeys(strKey), oldValue, newValue);
            }
            this.Document.CommonRules.TotalSumTableEditNotify(this, fieldId);
        };
        return BaseP1TotalObasTable;
    }(P1TotalObasTable));
    F01400.BaseP1TotalObasTable = BaseP1TotalObasTable;
    var ObasTableP1Total = (function (_super) {
        __extends(ObasTableP1Total, _super);
        function ObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1C.Total;
        };
        ObasTableP1Total.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return ObasTableP1Total;
    }(BaseP1TotalObasTable));
    F01400.ObasTableP1Total = ObasTableP1Total;
    var ObasTableOwnerYearKeys = (function (_super) {
        __extends(ObasTableOwnerYearKeys, _super);
        function ObasTableOwnerYearKeys(StrKey, Year) {
            var _this = _super.call(this) || this;
            _this.StrKey = StrKey;
            _this.Year = Year;
            return _this;
        }
        return ObasTableOwnerYearKeys;
    }(ObasTableKeys));
    F01400.ObasTableOwnerYearKeys = ObasTableOwnerYearKeys;
    var ObasTableKosguYearKeys = (function (_super) {
        __extends(ObasTableKosguYearKeys, _super);
        function ObasTableKosguYearKeys(KosguKey, Year) {
            var _this = _super.call(this) || this;
            _this.KosguKey = KosguKey;
            _this.Year = Year;
            return _this;
        }
        return ObasTableKosguYearKeys;
    }(ObasTableKeys));
    F01400.ObasTableKosguYearKeys = ObasTableKosguYearKeys;
    var ObasTableKosguPayYearKeys = (function (_super) {
        __extends(ObasTableKosguPayYearKeys, _super);
        function ObasTableKosguPayYearKeys(PaymentKey, kosguKey, year) {
            var _this = _super.call(this, kosguKey, year) || this;
            _this.PaymentKey = PaymentKey;
            return _this;
        }
        return ObasTableKosguPayYearKeys;
    }(ObasTableKosguYearKeys));
    F01400.ObasTableKosguPayYearKeys = ObasTableKosguPayYearKeys;
    var ObasTableKosguStrYearKeys = (function (_super) {
        __extends(ObasTableKosguStrYearKeys, _super);
        function ObasTableKosguStrYearKeys(StrKey, kosguKey, year) {
            var _this = _super.call(this, kosguKey, year) || this;
            _this.StrKey = StrKey;
            return _this;
        }
        return ObasTableKosguStrYearKeys;
    }(ObasTableKosguYearKeys));
    F01400.ObasTableKosguStrYearKeys = ObasTableKosguStrYearKeys;
    var BaseObasTablePart = (function (_super) {
        __extends(BaseObasTablePart, _super);
        function BaseObasTablePart(id, keyFields, parentTable, _p1Table, _p1StrKey) {
            var _this = _super.call(this, id, keyFields, _p1Table.Document, parentTable) || this;
            _this._p1Table = _p1Table;
            _this._p1StrKey = _p1StrKey;
            _this._obasSum = null;
            _this._year = null;
            _this._copyData = null;
            _this._isCopied = null;
            return _this;
        }
        Object.defineProperty(BaseObasTablePart.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseObasTablePart.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        BaseObasTablePart.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        Object.defineProperty(BaseObasTablePart.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseObasTablePart.prototype, "ObasSum", {
            get: function () {
                if (this._obasSum == null) {
                    this._obasSum = new NumberObasTableField("ObasSum", this);
                }
                return this._obasSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseObasTablePart.prototype, "P1StrKey", {
            get: function () {
                return this._p1StrKey;
            },
            enumerable: true,
            configurable: true
        });
        BaseObasTablePart.prototype.IsUserEditRow = function () {
            return true;
        };
        BaseObasTablePart.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var endYear = ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount;
            if (srcYear == null) {
                srcYear = endYear - 2;
            }
            if (destYear == null) {
                destYear = endYear - 1;
            }
            if (srcYear && destYear) {
                var copyHandler = function (table, recordKey) {
                    if (_this.Year.Value === srcYear) {
                        _this.InnerCopyData(recordKey, destYear);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        BaseObasTablePart.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.P1SumFilter(this.RecordKey.Value)) {
                this._p1Table.SetSumByKeys(this.Year.Value, this._p1Table.GetKeys(this._p1StrKey), oldValue, newValue);
            }
        };
        BaseObasTablePart.prototype.AfterDeleteEventHandler = function (tableId) {
            this.ObasSum.Value = 0;
        };
        BaseObasTablePart.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        BaseObasTablePart.prototype.CollectUserData = function () {
            var _this = this;
            var filter = function () {
                return _this.IsUserEditRow();
            };
            return this.CollectTableData(this.InitCopyFieldsInfo(), filter);
        };
        return BaseObasTablePart;
    }(ObasTableWithKeysParent));
    F01400.BaseObasTablePart = BaseObasTablePart;
    var ObasTablePart = (function (_super) {
        __extends(ObasTablePart, _super);
        function ObasTablePart(id, p1Table, p1StrKey) {
            var _this = _super.call(this, id, [BaseObasTableFields.StrKeyField.Id, BaseObasTableFields.YearField.Id], null, p1Table, p1StrKey) || this;
            _this._strKey = null;
            return _this;
        }
        Object.defineProperty(ObasTablePart.prototype, "StrKey", {
            get: function () {
                if (this._strKey == null) {
                    this._strKey = new NumberObasTableField(BaseObasTableFields.StrKeyField.Id, this);
                }
                return this._strKey;
            },
            enumerable: true,
            configurable: true
        });
        ObasTablePart.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    copyData.getValue(this.Year.Id).Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        ObasTablePart.prototype.GetKeys = function (strKey, year) {
            if (strKey === void 0) { strKey = this.StrKey
                .Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new ObasTableOwnerYearKeys(strKey, year);
            }
            else {
                this._keys.StrKey = strKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        return ObasTablePart;
    }(BaseObasTablePart));
    F01400.ObasTablePart = ObasTablePart;
    var ObasTableP2Sp1 = (function (_super) {
        __extends(ObasTableP2Sp1, _super);
        function ObasTableP2Sp1(id, document) {
            return _super.call(this, id, document.P1TotalTable, StrKeysP1.P2Sp1) || this;
        }
        ObasTableP2Sp1.prototype.UpdateObasSum = function () {
            this.ObasSum.Value = (this
                .GetFieldValue("g3") *
                this.GetFieldValue("g4") *
                this.GetFieldValue("g5"));
        };
        ObasTableP2Sp1.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateObasSum();
        };
        ObasTableP2Sp1.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKey.Id, {
                Id: this.StrKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            for (var i = 3; i < 6; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP2Sp1.prototype.P1SumFilter = function (recordKey) {
            return this.StrKey.Value === 1;
        };
        ObasTableP2Sp1.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 3; i < 6; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.ObasSum.Value = 0;
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTableP2Sp1;
    }(ObasTablePart));
    F01400.ObasTableP2Sp1 = ObasTableP2Sp1;
    var ObasTableP2Sp2 = (function (_super) {
        __extends(ObasTableP2Sp2, _super);
        function ObasTableP2Sp2(id, document) {
            return _super.call(this, id, document.P1TotalTable, StrKeysP1.P2Sp2) || this;
        }
        ObasTableP2Sp2.prototype.UpdateObasSum = function () {
            this.ObasSum.Value = (this.GetFieldValue("g3") *
                this.GetFieldValue("g4") *
                this.GetFieldValue("g5") *
                this.GetFieldValue("g6"));
        };
        ObasTableP2Sp2.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateObasSum();
        };
        ObasTableP2Sp2.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKey.Id, {
                Id: this.StrKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            for (var i = 3; i < 7; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP2Sp2.prototype.P1SumFilter = function (recordKey) {
            return this.StrKey.Value === 1;
        };
        ObasTableP2Sp2.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 3; i < 7; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.ObasSum.Value = 0;
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTableP2Sp2;
    }(ObasTablePart));
    F01400.ObasTableP2Sp2 = ObasTableP2Sp2;
    var ObasTableP2Sp3 = (function (_super) {
        __extends(ObasTableP2Sp3, _super);
        function ObasTableP2Sp3(id, document) {
            return _super.call(this, id, document.P1TotalTable, StrKeysP1.P2Sp3) || this;
        }
        ObasTableP2Sp3.prototype.UpdateObasSum = function () {
            this.ObasSum.Value = this.GetFieldValue("g9") + this.GetFieldValue("g10");
        };
        ObasTableP2Sp3.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateObasSum();
        };
        ObasTableP2Sp3.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKey.Id, {
                Id: this.StrKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue("g4", {
                Id: "g4",
                IsData: true
            });
            result.setValue("g5", {
                Id: "g5",
                IsData: true
            });
            result.setValue("g9", {
                Id: "g9",
                IsData: true
            });
            result.setValue("g10", {
                Id: "g10",
                IsData: true
            });
            result.setValue("g11", {
                Id: "g11",
                IsData: true
            });
            result.setValue("g12", {
                Id: "g12",
                IsData: true
            });
            return result;
        };
        ObasTableP2Sp3.prototype.P1SumFilter = function (ownerKey) {
            return this.StrKey.Value === 2 || this.StrKey.Value === 3 || this.StrKey.Value === 7;
        };
        ObasTableP2Sp3.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 3; i < 14; i++) {
                    if (i === 8) {
                        _this.ObasSum.Value = 0;
                    }
                    else {
                        _this.SetFieldValue("g" + i, 0);
                    }
                }
            };
            this.Iterate(resetDataHandler);
        };
        ObasTableP2Sp3.prototype.IsUserEditRow = function () {
            return this.StrKey.Value !== 10;
        };
        return ObasTableP2Sp3;
    }(ObasTablePart));
    F01400.ObasTableP2Sp3 = ObasTableP2Sp3;
    var ObasTableP2Sp4 = (function (_super) {
        __extends(ObasTableP2Sp4, _super);
        function ObasTableP2Sp4(id, document) {
            return _super.call(this, id, document.P1TotalTable, StrKeysP1.P2Sp4) || this;
        }
        ObasTableP2Sp4.prototype.EmplCountChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SetFieldValue("g6", newValue);
            this.SumPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        ObasTableP2Sp4.prototype.UpdateObasSum = function () {
            this.ObasSum.Value = (this.GetFieldValue("g2") * this.GetFieldValue("g4") +
                this.GetFieldValue("g3") * this.GetFieldValue("g5"));
        };
        ObasTableP2Sp4.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateObasSum();
        };
        ObasTableP2Sp4.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKey.Id, {
                Id: this.StrKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            for (var i = 2; i < 10; i++) {
                if (i !== 6 && i !== 7) {
                    result.setValue("g" + i, {
                        Id: "g" + i,
                        IsData: true
                    });
                }
            }
            return result;
        };
        ObasTableP2Sp4.prototype.P1SumFilter = function (ownerKey) {
            return true;
        };
        ObasTableP2Sp4.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 2; i < 10; i++) {
                    if (i === 7) {
                        _this.ObasSum.Value = 0;
                    }
                    else {
                        _this.SetFieldValue("g" + i, 0);
                    }
                }
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTableP2Sp4;
    }(ObasTablePart));
    F01400.ObasTableP2Sp4 = ObasTableP2Sp4;
    var ObasTablePKosgu = (function (_super) {
        __extends(ObasTablePKosgu, _super);
        function ObasTablePKosgu(id, document) {
            var _this = _super.call(this, id, ["KOSGU_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._kosgu = null;
            _this._year = null;
            _this._copyData = null;
            return _this;
        }
        Object.defineProperty(ObasTablePKosgu.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePKosgu.prototype, "Kosgu", {
            get: function () {
                if (this._kosgu == null) {
                    this._kosgu = new ObasSprTableField(ObasTableCollection.KosguSprTable, this);
                }
                return this._kosgu;
            },
            enumerable: true,
            configurable: true
        });
        ObasTablePKosgu.prototype.GetKeys = function (kosguKey, year) {
            if (kosguKey === void 0) { kosguKey = this.Kosgu.ForeignKey
                .Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new ObasTableKosguYearKeys(kosguKey, year);
            }
            else {
                this._keys.KosguKey = kosguKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        return ObasTablePKosgu;
    }(ObasTableWithKeys));
    F01400.ObasTablePKosgu = ObasTablePKosgu;
    var ObasTablePDailyPayData = (function (_super) {
        __extends(ObasTablePDailyPayData, _super);
        function ObasTablePDailyPayData(id, _strTable, p1StrKey, sumTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.StrKeyField.Id, "KOSGU_ID", BaseObasTableFields.YearField.Id], null, sumTable, p1StrKey) || this;
            _this._strTable = _strTable;
            _this._kosgu = null;
            _this._strKey = null;
            return _this;
        }
        Object.defineProperty(ObasTablePDailyPayData.prototype, "StrKey", {
            get: function () {
                if (this._strKey == null) {
                    this._strKey = new ObasForeignKeyTableField(this._strTable, this, BaseObasTableFields.StrKeyField.Id, false);
                }
                return this._strKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePDailyPayData.prototype, "Kosgu", {
            get: function () {
                if (this._kosgu == null) {
                    this._kosgu = new ObasSprTableField(ObasTableCollection.KosguSprTable, this);
                }
                return this._kosgu;
            },
            enumerable: true,
            configurable: true
        });
        ObasTablePDailyPayData.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    copyData.getValue(this.Year.Id).Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        ObasTablePDailyPayData.prototype.GetKeys = function (strKey, kosguKey, year) {
            if (strKey === void 0) { strKey = this.StrKey.Value; }
            if (kosguKey === void 0) { kosguKey = this.Kosgu.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new ObasTableKosguStrYearKeys(strKey, kosguKey, year);
            }
            else {
                this._keys.StrKey = strKey;
                this._keys.KosguKey = kosguKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        ObasTablePDailyPayData.prototype.P1SumFilter = function (ownerKey) {
            return true;
        };
        return ObasTablePDailyPayData;
    }(BaseObasTablePart));
    F01400.ObasTablePDailyPayData = ObasTablePDailyPayData;
    var ObasTableP2DailyPayData = (function (_super) {
        __extends(ObasTableP2DailyPayData, _super);
        function ObasTableP2DailyPayData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP2DailyPayData.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKey.Id, {
                Id: this.StrKey.Id,
                IsData: false
            });
            result.setValue(this.Kosgu.ForeignKey.Id, {
                Id: this.Kosgu.ForeignKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            for (var i = 3; i < 6; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP2DailyPayData.prototype.UpdateObasSum = function () {
            this.ObasSum.Value = (this
                .GetFieldValue("g3") *
                this.GetFieldValue("g4") *
                this.GetFieldValue("g5"));
        };
        ObasTableP2DailyPayData.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateObasSum();
        };
        ObasTableP2DailyPayData.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 3; i < 6; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.ObasSum.Value = 0;
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTableP2DailyPayData;
    }(ObasTablePDailyPayData));
    F01400.ObasTableP2DailyPayData = ObasTableP2DailyPayData;
    var StrKeysP3DailyPay;
    (function (StrKeysP3DailyPay) {
        StrKeysP3DailyPay[StrKeysP3DailyPay["DailyPay"] = 1] = "DailyPay";
        StrKeysP3DailyPay[StrKeysP3DailyPay["Surcharges"] = 2] = "Surcharges";
    })(StrKeysP3DailyPay = F01400.StrKeysP3DailyPay || (F01400.StrKeysP3DailyPay = {}));
    var ObasTableP3DailyPayData = (function (_super) {
        __extends(ObasTableP3DailyPayData, _super);
        function ObasTableP3DailyPayData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dataTable = null;
            return _this;
        }
        Object.defineProperty(ObasTableP3DailyPayData.prototype, "DataTable", {
            get: function () {
                if (this._dataTable == null) {
                    this._dataTable = new ObasTableP3Sp2(this.Id, this.Document, this.P1StrKey, false);
                }
                return this._dataTable;
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP3DailyPayData.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.DataTable.SumPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        ObasTableP3DailyPayData.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKey.Id, {
                Id: this.StrKey.Id,
                IsData: false
            });
            result.setValue(this.Kosgu.ForeignKey.Id, {
                Id: this.Kosgu.ForeignKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue(this.DataTable.AverageUsdCount.Id, {
                Id: this.DataTable.AverageUsdCount.Id,
                IsData: true
            });
            result.setValue(this.DataTable.AverageRubCount.Id, {
                Id: this.DataTable.AverageRubCount.Id,
                IsData: true
            });
            for (var i = 2; i < 8; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP3DailyPayData.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 2; i < 8; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.DataTable.AverageUsdCount.Value = 0;
                _this.DataTable.AverageRubCount.Value = 0;
                _this.DataTable.ObasUsdSum.Value = 0;
                _this.DataTable.ObasUsdRubSum.Value = 0;
                _this.DataTable.ObasRubSum.Value = 0;
                _this.ObasSum.Value = 0;
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTableP3DailyPayData;
    }(ObasTablePDailyPayData));
    F01400.ObasTableP3DailyPayData = ObasTableP3DailyPayData;
    var ObasTablePKosguData = (function (_super) {
        __extends(ObasTablePKosguData, _super);
        function ObasTablePKosguData(id, parentTable, p1StrKey) {
            var _this = _super.call(this, id, ["OtherPayments_ID"].concat(parentTable.KeyFieldIds), parentTable, parentTable.Document.P1TotalTable, p1StrKey) || this;
            _this._otherPayment = null;
            _this._kosgu = null;
            return _this;
        }
        Object.defineProperty(ObasTablePKosguData.prototype, "Kosgu", {
            get: function () {
                if (this._kosgu == null) {
                    this._kosgu = new ObasSprTableField(ObasTableCollection.KosguSprTable, this);
                }
                return this._kosgu;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePKosguData.prototype, "OtherPayment", {
            get: function () {
                if (this._otherPayment == null) {
                    this._otherPayment = new ObasSprTableField(ObasTableCollection.OtherPaymentsSprTable, this);
                }
                return this._otherPayment;
            },
            enumerable: true,
            configurable: true
        });
        ObasTablePKosguData.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    var ownerKey = this.ParentTable
                        .GetRecordKey(this.ParentTable.GetKeys(keys.KosguKey, year), true);
                    copyData.getValue(this.OwnerKey.Id).Value = ownerKey;
                    keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        ObasTablePKosguData.prototype.GetKeys = function (payKey, kosguKey, year) {
            if (payKey === void 0) { payKey = this.OtherPayment.ForeignKey.Value; }
            if (kosguKey === void 0) { kosguKey = this.Kosgu.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new ObasTableKosguPayYearKeys(payKey, kosguKey, year);
            }
            else {
                this._keys.PaymentKey = payKey;
                this._keys.KosguKey = kosguKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        ObasTablePKosguData.prototype.P1SumFilter = function (ownerKey) {
            return true;
        };
        return ObasTablePKosguData;
    }(BaseObasTablePart));
    F01400.ObasTablePKosguData = ObasTablePKosguData;
    var ObasTableP2Sp5 = (function (_super) {
        __extends(ObasTableP2Sp5, _super);
        function ObasTableP2Sp5() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP2Sp5.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.OwnerKey.Id, {
                Id: this.OwnerKey.Id,
                IsData: false
            });
            result.setValue(this.OtherPayment.ForeignKey.Id, {
                Id: this.OtherPayment.ForeignKey.Id,
                IsData: false
            });
            for (var i = 3; i < 6; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP2Sp5.prototype.UpdateObasSum = function () {
            this.ObasSum.Value = (this
                .GetFieldValue("g3") *
                this.GetFieldValue("g4") *
                this.GetFieldValue("g5"));
        };
        ObasTableP2Sp5.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateObasSum();
        };
        ObasTableP2Sp5.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 3; i < 6; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.ObasSum.Value = 0;
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTableP2Sp5;
    }(ObasTablePKosguData));
    F01400.ObasTableP2Sp5 = ObasTableP2Sp5;
    var ObasTableP3SpX = (function (_super) {
        __extends(ObasTableP3SpX, _super);
        function ObasTableP3SpX(id, document, p1StrKey) {
            var _this = _super.call(this, id, document.P1TotalTable, p1StrKey) || this;
            _this._obasRubSum = null;
            _this._obasUsdRubSum = null;
            _this._obasUsdSum = null;
            _this._averageUsdCount = null;
            _this._averageRubCount = null;
            _this._averageUsdCountInfo = null;
            _this._averageRubCountInfo = null;
            return _this;
        }
        Object.defineProperty(ObasTableP3SpX.prototype, "AverageRubCountInfo", {
            get: function () {
                if (this._averageRubCountInfo == null) {
                    this._averageRubCountInfo = {
                        Field: this.AverageRubCount,
                        ColumnIndex: this.GetAverageRubCountIndex()
                    };
                }
                return this._averageRubCountInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP3SpX.prototype, "AverageUsdCountInfo", {
            get: function () {
                if (this._averageUsdCountInfo == null) {
                    this._averageUsdCountInfo = {
                        Field: this.AverageUsdCount,
                        ColumnIndex: this.GetAverageUsdCountIndex()
                    };
                }
                return this._averageUsdCountInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP3SpX.prototype, "AverageRubCount", {
            get: function () {
                if (this._averageRubCount == null) {
                    this._averageRubCount = new NumberObasTableField("AverageRubCount", this);
                }
                return this._averageRubCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP3SpX.prototype, "AverageUsdCount", {
            get: function () {
                if (this._averageUsdCount == null) {
                    this._averageUsdCount = new NumberObasTableField("AverageUsdCount", this);
                }
                return this._averageUsdCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP3SpX.prototype, "ObasUsdSum", {
            get: function () {
                if (this._obasUsdSum == null) {
                    this._obasUsdSum = new NumberObasTableField("ObasUsdSum", this);
                }
                return this._obasUsdSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP3SpX.prototype, "ObasUsdRubSum", {
            get: function () {
                if (this._obasUsdRubSum == null) {
                    this._obasUsdRubSum = new NumberObasTableField("ObasUsdRubSum", this);
                }
                return this._obasUsdRubSum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP3SpX.prototype, "ObasRubSum", {
            get: function () {
                if (this._obasRubSum == null) {
                    this._obasRubSum = new NumberObasTableField("ObasRubSum", this);
                }
                return this._obasRubSum;
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP3SpX.prototype.CalcSum = function (srcFieldsIndex) {
            var sum = this.GetFieldValue("g" + srcFieldsIndex[0]);
            if (sum) {
                for (var i = 1, len = srcFieldsIndex.length; i < len; i++) {
                    sum = sum * this.GetFieldValue("g" + srcFieldsIndex[i]);
                    if (!sum) {
                        break;
                    }
                }
            }
            return sum;
        };
        ObasTableP3SpX.prototype.UpdateUsdParts = function () {
            this.ObasUsdSum.Value = (this.CalcSum(this.GetUsdSumParts()) * this.AverageUsdCount.Value);
        };
        ObasTableP3SpX.prototype.UpdateRubParts = function () {
            this.ObasRubSum.Value = (this.CalcSum(this.GetRubSumParts()) * this.AverageRubCount.Value);
        };
        ObasTableP3SpX.prototype.UpdateObasSum = function () {
            this.ObasSum.Value = this.ObasUsdRubSum.Value + this.ObasRubSum.Value;
        };
        ObasTableP3SpX.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateObasSum();
        };
        ObasTableP3SpX.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ObasUsdRubSum.Value = this.ObasUsdSum.Value *
                this.Document.CommonRules.GetDollarRateByYear(this.Year.Value);
        };
        ObasTableP3SpX.prototype.UsdPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateUsdParts();
        };
        ObasTableP3SpX.prototype.RubPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateRubParts();
        };
        return ObasTableP3SpX;
    }(ObasTablePart));
    F01400.ObasTableP3SpX = ObasTableP3SpX;
    var StrKeysPXSp1Sp2;
    (function (StrKeysPXSp1Sp2) {
        StrKeysPXSp1Sp2[StrKeysPXSp1Sp2["Total"] = 1] = "Total";
        StrKeysPXSp1Sp2[StrKeysPXSp1Sp2["Manager"] = 2] = "Manager";
    })(StrKeysPXSp1Sp2 = F01400.StrKeysPXSp1Sp2 || (F01400.StrKeysPXSp1Sp2 = {}));
    var ObasTableP3Sp1 = (function (_super) {
        __extends(ObasTableP3Sp1, _super);
        function ObasTableP3Sp1(id, document, p1StrKey) {
            return _super.call(this, id, document, p1StrKey) || this;
        }
        ObasTableP3Sp1.prototype.GetUsdSumParts = function () {
            return ObasTableP3Sp1._usdSumParts;
        };
        ObasTableP3Sp1.prototype.GetRubSumParts = function () {
            return ObasTableP3Sp1._rubSumParts;
        };
        ObasTableP3Sp1.prototype.GetAverageUsdCountIndex = function () {
            return ObasTableP3Sp1._averageUsdCountIndex;
        };
        ObasTableP3Sp1.prototype.GetAverageRubCountIndex = function () {
            return ObasTableP3Sp1._averageRubCountIndex;
        };
        ObasTableP3Sp1.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKey.Id, {
                Id: this.StrKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue(this.AverageUsdCount.Id, {
                Id: this.AverageUsdCount.Id,
                IsData: true
            });
            result.setValue(this.AverageRubCount.Id, {
                Id: this.AverageRubCount.Id,
                IsData: true
            });
            for (var i = 2; i < 6; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP3Sp1.prototype.P1SumFilter = function (recordKey) {
            return this.StrKey.Value === StrKeysPXSp1Sp2.Total;
        };
        ObasTableP3Sp1.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 2; i < 6; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.AverageUsdCount.Value = 0;
                _this.AverageRubCount.Value = 0;
                _this.ObasUsdSum.Value = 0;
                _this.ObasUsdRubSum.Value = 0;
                _this.ObasRubSum.Value = 0;
                _this.ObasSum.Value = 0;
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTableP3Sp1;
    }(ObasTableP3SpX));
    ObasTableP3Sp1._usdSumParts = [2, 4];
    ObasTableP3Sp1._rubSumParts = [3, 5];
    ObasTableP3Sp1._averageUsdCountIndex = 8;
    ObasTableP3Sp1._averageRubCountIndex = 9;
    F01400.ObasTableP3Sp1 = ObasTableP3Sp1;
    var ObasTableP3Sp2 = (function (_super) {
        __extends(ObasTableP3Sp2, _super);
        function ObasTableP3Sp2(id, document, p1StrKey, _useFilter) {
            if (_useFilter === void 0) { _useFilter = true; }
            var _this = _super.call(this, id, document, p1StrKey) || this;
            _this._useFilter = _useFilter;
            _this._p3Sp1Table = document.P3Sp1Table;
            return _this;
        }
        ObasTableP3Sp2.prototype.CheckAverageCount = function (srcFieldInfo, borderFieldInfo, srcVal, key, fullMessage) {
            if (srcVal === void 0) { srcVal = srcFieldInfo.Field.Value; }
            if (key === void 0) { key = this.RecordKey.Value; }
            if (fullMessage === void 0) { fullMessage = false; }
            this.Locate(this.RecordKey.Id, key);
            var year = this.Year.Value;
            this._p3Sp1Table.LocateByKeys(this._p3Sp1Table.GetKeys(this.StrKey.Value, year).ToArray());
            var borderVal = borderFieldInfo.Field.Value || 0;
            if (srcVal > borderVal) {
                var result = "";
                if (fullMessage) {
                    result += "\u041D\u0435 \u0443\u0434\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB" + srcFieldInfo.Field.Caption + "\u00BB \u0442\u0430\u0431\u043B\u0438\u0446\u044B \u00AB\u0420\u0430\u0437\u0434\u0435\u043B 3.2." + year + "\u00BB!\n";
                }
                result += "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0433\u0440. " + srcFieldInfo
                    .ColumnIndex + " \u0440\u0430\u0437\u0434\u0435\u043B\u0430 3.2." + year + " \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B\u0448\u0435 \u0433\u0440. " + borderFieldInfo.ColumnIndex + " \u0440\u0430\u0437\u0434\u0435\u043B\u0430 3.1." + year + "!";
                return result;
            }
            return undefined;
        };
        ObasTableP3Sp2.prototype.GetUsdSumParts = function () {
            return ObasTableP3Sp2._usdSumParts;
        };
        ObasTableP3Sp2.prototype.GetRubSumParts = function () {
            return ObasTableP3Sp2._rubSumParts;
        };
        ObasTableP3Sp2.prototype.GetAverageUsdCountIndex = function () {
            return ObasTableP3Sp2._averageUsdCountIndex;
        };
        ObasTableP3Sp2.prototype.GetAverageRubCountIndex = function () {
            return ObasTableP3Sp2._averageRubCountIndex;
        };
        ObasTableP3Sp2.prototype.AverageUsdCountCheckEventHandler = function (value, key, fullMessage) {
            return this.CheckAverageCount(this.AverageUsdCountInfo, this._p3Sp1Table.AverageUsdCountInfo, value, key, fullMessage);
        };
        ObasTableP3Sp2.prototype.AverageRubCountCheckEventHandler = function (value, key, fullMessage) {
            return this.CheckAverageCount(this.AverageRubCountInfo, this._p3Sp1Table.AverageRubCountInfo, value, key, fullMessage);
        };
        ObasTableP3Sp2.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.StrKey.Id, {
                Id: this.StrKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue(this.AverageUsdCount.Id, {
                Id: this.AverageUsdCount.Id,
                IsData: true
            });
            result.setValue(this.AverageRubCount.Id, {
                Id: this.AverageRubCount.Id,
                IsData: true
            });
            for (var i = 2; i < 8; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP3Sp2.prototype.P1SumFilter = function (recordKey) {
            return !this._useFilter || (this.StrKey.Value === 1);
        };
        ObasTableP3Sp2.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 2; i < 8; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.AverageUsdCount.Value = 0;
                _this.AverageRubCount.Value = 0;
                _this.ObasUsdSum.Value = 0;
                _this.ObasUsdRubSum.Value = 0;
                _this.ObasRubSum.Value = 0;
                _this.ObasSum.Value = 0;
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTableP3Sp2;
    }(ObasTableP3SpX));
    ObasTableP3Sp2._usdSumParts = [2, 4, 6];
    ObasTableP3Sp2._rubSumParts = [3, 5, 7];
    ObasTableP3Sp2._averageUsdCountIndex = 10;
    ObasTableP3Sp2._averageRubCountIndex = 11;
    F01400.ObasTableP3Sp2 = ObasTableP3Sp2;
    var ObasTableP3Sp3 = (function (_super) {
        __extends(ObasTableP3Sp3, _super);
        function ObasTableP3Sp3() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dataTable = null;
            return _this;
        }
        Object.defineProperty(ObasTableP3Sp3.prototype, "DataTable", {
            get: function () {
                if (this._dataTable == null) {
                    this._dataTable = new ObasTableP3Sp1(this.Id, this.Document, this.P1StrKey);
                }
                return this._dataTable;
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP3Sp3.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopied.Id, {
                Id: this.IsCopied.Id,
                IsData: false
            });
            result.setValue(this.OwnerKey.Id, {
                Id: this.OwnerKey.Id,
                IsData: false
            });
            result.setValue(this.OtherPayment.ForeignKey.Id, {
                Id: this.OtherPayment.ForeignKey.Id,
                IsData: false
            });
            result.setValue(this.DataTable.AverageUsdCount.Id, {
                Id: this.DataTable.AverageUsdCount.Id,
                IsData: true
            });
            result.setValue(this.DataTable.AverageRubCount.Id, {
                Id: this.DataTable.AverageRubCount.Id,
                IsData: true
            });
            for (var i = 2; i < 6; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP3Sp3.prototype.ResetData = function () {
            var _this = this;
            var resetDataHandler = function () {
                for (var i = 2; i < 6; i++) {
                    _this.SetFieldValue("g" + i, 0);
                }
                _this.DataTable.AverageUsdCount.Value = 0;
                _this.DataTable.AverageRubCount.Value = 0;
                _this.DataTable.ObasUsdSum.Value = 0;
                _this.DataTable.ObasUsdRubSum.Value = 0;
                _this.DataTable.ObasRubSum.Value = 0;
                _this.ObasSum.Value = 0;
            };
            this.Iterate(resetDataHandler);
        };
        ObasTableP3Sp3.prototype.SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.DataTable.SumPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        return ObasTableP3Sp3;
    }(ObasTablePKosguData));
    F01400.ObasTableP3Sp3 = ObasTableP3Sp3;
    var SprRowsTable = (function (_super) {
        __extends(SprRowsTable, _super);
        function SprRowsTable(id) {
            var _this = _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], "StrCode", "StrName") || this;
            _this._barsCode = null;
            return _this;
        }
        Object.defineProperty(SprRowsTable.prototype, "BarsCode", {
            get: function () {
                if (this._barsCode == null) {
                    this._barsCode = new ObasTableField("BarsCode", this);
                }
                return this._barsCode;
            },
            enumerable: true,
            configurable: true
        });
        return SprRowsTable;
    }(SprTable));
    F01400.SprRowsTable = SprRowsTable;
})(F01400 || (F01400 = {}));
