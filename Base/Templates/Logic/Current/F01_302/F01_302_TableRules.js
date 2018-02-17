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
var F01302;
(function (F01302) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F01302.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["FotTotal"] = 15] = "FotTotal";
        StrKeysP1Total[StrKeysP1Total["FotMilitary"] = 2] = "FotMilitary";
        StrKeysP1Total[StrKeysP1Total["FotRanked"] = 3] = "FotRanked";
        StrKeysP1Total[StrKeysP1Total["FotTrainee"] = 16] = "FotTrainee";
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F01302.StrKeysP1Total || (F01302.StrKeysP1Total = {}));
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTable.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        P1TotalTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        return P1TotalTable;
    }(P1TotalObasTable));
    F01302.P1TotalTable = P1TotalTable;
    var PxSp1StrKeys;
    (function (PxSp1StrKeys) {
        PxSp1StrKeys[PxSp1StrKeys["Fot"] = 2] = "Fot";
        PxSp1StrKeys[PxSp1StrKeys["Change"] = 3] = "Change";
        PxSp1StrKeys[PxSp1StrKeys["Correction"] = 4] = "Correction";
        PxSp1StrKeys[PxSp1StrKeys["Total"] = 1] = "Total";
    })(PxSp1StrKeys = F01302.PxSp1StrKeys || (F01302.PxSp1StrKeys = {}));
    var PxSp1Table = (function (_super) {
        __extends(PxSp1Table, _super);
        function PxSp1Table(id, document, sumTable, _sumKey) {
            var _this = _super.call(this, id, document, sumTable) || this;
            _this._sumKey = _sumKey;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(PxSp1Table.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.StrKeyField];
                    var yearDataField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (i) {
                        _this._copyFields.push(yearDataField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        PxSp1Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            switch (this.StrKey) {
                case PxSp1StrKeys.Fot:
                case PxSp1StrKeys.Change:
                    var fotValue = this.GetValueByKeys(fieldId, this.GetKeys(PxSp1StrKeys.Fot));
                    var changeValue = this.GetValueByKeys(fieldId, this.GetKeys(PxSp1StrKeys.Change));
                    var sumValue = fotValue + changeValue;
                    var correctionValue = this.Document.CommonRules.CalcAdjustment(fotValue, changeValue);
                    sumValue += correctionValue;
                    this.SetValueByKeys(fieldId, this.GetKeys(PxSp1StrKeys.Correction), correctionValue);
                    this.SetValueByKeys(fieldId, this.GetKeys(PxSp1StrKeys.Total), sumValue);
                    break;
                case PxSp1StrKeys.Total:
                    this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._sumKey), oldValue, newValue);
                    break;
            }
        };
        PxSp1Table.prototype.IsUserRow = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return strKey === PxSp1StrKeys.Change;
        };
        PxSp1Table.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, function () { return _this.IsUserRow(); }, BaseObasTableFields.YearDataField);
        };
        PxSp1Table.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        PxSp1Table.prototype.CollectUserData = function () {
            var _this = this;
            var filter = function () {
                return _this.IsUserRow();
            };
            return this.CollectTableData(this.InitCopyFieldsInfo(), filter);
        };
        PxSp1Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        return PxSp1Table;
    }(ObasTableWithStrKeysParent));
    F01302.PxSp1Table = PxSp1Table;
    var P4Sp1Table = (function (_super) {
        __extends(P4Sp1Table, _super);
        function P4Sp1Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4Sp1Table.prototype.IsUserRow = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return strKey === PxSp1StrKeys.Change || strKey === PxSp1StrKeys.Fot;
        };
        return P4Sp1Table;
    }(PxSp1Table));
    F01302.P4Sp1Table = P4Sp1Table;
    var P2Sp2Sp3StrKeys;
    (function (P2Sp2Sp3StrKeys) {
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["AllContracts"] = 1] = "AllContracts";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["AllOfficers"] = 2] = "AllOfficers";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["SeniorOfficers"] = 3] = "SeniorOfficers";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["MiddleOfficers"] = 4] = "MiddleOfficers";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["JuniorOfficers"] = 5] = "JuniorOfficers";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["Ensigns"] = 6] = "Ensigns";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["OtherContracts"] = 7] = "OtherContracts";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["CadetsWithContract"] = 8] = "CadetsWithContract";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["CadetsWithoutContract"] = 9] = "CadetsWithoutContract";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["Inductees"] = 10] = "Inductees";
        P2Sp2Sp3StrKeys[P2Sp2Sp3StrKeys["Total"] = 11] = "Total";
    })(P2Sp2Sp3StrKeys = F01302.P2Sp2Sp3StrKeys || (F01302.P2Sp2Sp3StrKeys = {}));
    var P2Sp2Sp3RowsSprTable = (function (_super) {
        __extends(P2Sp2Sp3RowsSprTable, _super);
        function P2Sp2Sp3RowsSprTable(id, _document) {
            var _this = _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], BaseObasTableFields.StrCodeField.Id) || this;
            _this._document = _document;
            _this._isDaraRowField = null;
            return _this;
        }
        Object.defineProperty(P2Sp2Sp3RowsSprTable.prototype, "IsDaraRowField", {
            get: function () {
                if (this._isDaraRowField == null) {
                    this._isDaraRowField = new ObasTableField("isDataRow", this);
                }
                return this._isDaraRowField;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp2Sp3RowsSprTable.prototype.IsDataRow = function () {
            return this.IsDaraRowField.Value || false;
        };
        return P2Sp2Sp3RowsSprTable;
    }(BarsRowsSprTable));
    F01302.P2Sp2Sp3RowsSprTable = P2Sp2Sp3RowsSprTable;
    var YearObasTableKeys = (function (_super) {
        __extends(YearObasTableKeys, _super);
        function YearObasTableKeys(Year) {
            var _this = _super.call(this) || this;
            _this.Year = Year;
            return _this;
        }
        return YearObasTableKeys;
    }(ObasTableKeys));
    var PxSp2DataTable = (function (_super) {
        __extends(PxSp2DataTable, _super);
        function PxSp2DataTable(id, _sumTable, keyFields) {
            var _this = _super.call(this, id, [BaseObasTableFields.YearField.Id].concat(keyFields), _sumTable.Document) || this;
            _this._sumTable = _sumTable;
            _this._year = null;
            _this._fot = null;
            _this._totalFot = null;
            _this._addFot = null;
            _this._emplCount = null;
            _this._salary = null;
            _this._salaryCount = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(PxSp2DataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = this.AddCopyFields.concat([this.Year, this.EmplCount, this.SalaryCount]);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "SalaryCount", {
            get: function () {
                if (this._salaryCount == null) {
                    this._salaryCount = new NumberObasTableField("SalaryCount", this);
                }
                return this._salaryCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this._salary = new NumberObasTableField("Salary", this);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "EmplCount", {
            get: function () {
                if (this._emplCount == null) {
                    this._emplCount = new NumberObasTableField("EmplCount", this);
                }
                return this._emplCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "AddFot", {
            get: function () {
                if (this._addFot == null) {
                    this._addFot = new NumberObasTableField("AddFot", this);
                }
                return this._addFot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "TotalFot", {
            get: function () {
                if (this._totalFot == null) {
                    this._totalFot = new NumberObasTableField("TotalFot", this);
                }
                return this._totalFot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "Fot", {
            get: function () {
                if (this._fot == null) {
                    this._fot = new NumberObasTableField("Fot", this);
                }
                return this._fot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp2DataTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        PxSp2DataTable.prototype.TotalFotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(this.YearOffset + 1), this._sumTable.GetKeys(PxSp1StrKeys.Fot), oldValue, newValue);
        };
        PxSp2DataTable.prototype.FotPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Fot.Value = this.EmplCount.NValue * (this.Salary.NValue) * this.SalaryCount.NValue;
        };
        PxSp2DataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.TotalFot.NValue = 0;
        };
        PxSp2DataTable.prototype.CopyData = function (srcYear, destYear) {
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
        PxSp2DataTable.prototype.GetRecordKey = function (keys, addIfNotExists) {
            if (addIfNotExists === void 0) { addIfNotExists = false; }
            return _super.prototype.GetRecordKey.call(this, keys, true);
        };
        PxSp2DataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        PxSp2DataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var yeadData = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yeadData.Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        PxSp2DataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        PxSp2DataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        PxSp2DataTable.prototype.ResetData = function (keys) {
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    this.ResetDataHandler(this, this.RecordKey.Value);
                }
            }
            else {
                this.Iterate(this.ResetDataHandler);
            }
        };
        PxSp2DataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        return PxSp2DataTable;
    }(ObasTableWithKeys));
    F01302.PxSp2DataTable = PxSp2DataTable;
    var YearStrKeys = (function (_super) {
        __extends(YearStrKeys, _super);
        function YearStrKeys(year, StrKey) {
            var _this = _super.call(this, year) || this;
            _this.StrKey = StrKey;
            return _this;
        }
        return YearStrKeys;
    }(YearObasTableKeys));
    F01302.YearStrKeys = YearStrKeys;
    var P2Sp2DataTable = (function (_super) {
        __extends(P2Sp2DataTable, _super);
        function P2Sp2DataTable(id, sumTable) {
            var _this = _super.call(this, id, sumTable, [BaseObasTableFields.StrKeyField.Id]) || this;
            _this._strKeyField = null;
            _this._addCopyFields = null;
            return _this;
        }
        Object.defineProperty(P2Sp2DataTable.prototype, "AddCopyFields", {
            get: function () {
                if (this._addCopyFields == null) {
                    this._addCopyFields = [this.StrKeyField, this.Salary];
                }
                return this._addCopyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp2DataTable.prototype, "StrKeyField", {
            get: function () {
                if (this._strKeyField == null) {
                    this._strKeyField = new ObasForeignKeyTableField(this.Document.P2Sp2Sp3RowsTable, this, BaseObasTableFields.StrKeyField.Id, false);
                }
                return this._strKeyField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp2DataTable.prototype, "StrKey", {
            get: function () {
                return this.StrKeyField.Value;
            },
            set: function (value) {
                this.StrKeyField.Value = value;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp2DataTable.prototype.GetKeys = function (year, strKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (strKey === void 0) { strKey = this.StrKey; }
            if (this._keys == null) {
                this._keys = new YearStrKeys(year, strKey);
            }
            else {
                this._keys.Year = year;
                this._keys.StrKey = strKey;
            }
            return this._keys;
        };
        P2Sp2DataTable.prototype.TotalFotPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TotalFot.NValue = this.Fot.NValue + this.AddFot.NValue;
        };
        P2Sp2DataTable.prototype.ResetDataHandler = function (table) {
            table.EmplCount.Value = 0;
            table.Salary.Value = 0;
            table.SalaryCount.Value = 0;
            table.Fot.Value = 0;
            table.AddFot.Value = 0;
            table.TotalFot.Value = 0;
        };
        return P2Sp2DataTable;
    }(PxSp2DataTable));
    P2Sp2DataTable._systemKeyIds = [BaseObasTableFields.StrKeyField.Id];
    F01302.P2Sp2DataTable = P2Sp2DataTable;
    var YearPostKeys = (function (_super) {
        __extends(YearPostKeys, _super);
        function YearPostKeys(year, PostKey) {
            var _this = _super.call(this, year) || this;
            _this.PostKey = PostKey;
            return _this;
        }
        return YearPostKeys;
    }(YearObasTableKeys));
    F01302.YearPostKeys = YearPostKeys;
    var P3Sp2DataTable = (function (_super) {
        __extends(P3Sp2DataTable, _super);
        function P3Sp2DataTable(id, sumTable) {
            var _this = _super.call(this, id, sumTable, ["Post_ID"]) || this;
            _this._post = null;
            _this._indexation = null;
            _this._addCopyFields = null;
            return _this;
        }
        Object.defineProperty(P3Sp2DataTable.prototype, "AddCopyFields", {
            get: function () {
                if (this._addCopyFields == null) {
                    this._addCopyFields = [this.Post.ForeignKey];
                }
                return this._addCopyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp2DataTable.prototype, "Indexation", {
            get: function () {
                if (this._indexation == null) {
                    this._indexation = new NumberObasTableField("Indexation", this);
                }
                return this._indexation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp2DataTable.prototype, "Post", {
            get: function () {
                if (this._post == null) {
                    this._post = new ObasSprTableField(this.Document.Post0109SprTable, this, "Post");
                }
                return this._post;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp2DataTable.prototype.GetKeys = function (year, postKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (postKey === void 0) { postKey = this.Post.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new YearPostKeys(year, postKey);
            }
            else {
                this._keys.Year = year;
                this._keys.PostKey = postKey;
            }
            return this._keys;
        };
        P3Sp2DataTable.prototype.TotalFotPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var fot = this.Fot.NValue + this.AddFot.NValue;
            var index = this.Document.CommonRules.CalcIndexationByYear(fot, this.Year.Value);
            this.Indexation.NValue = index;
            this.TotalFot.NValue = fot + index;
        };
        P3Sp2DataTable.prototype.ResetDataHandler = function (table) {
            table.EmplCount.Value = 0;
            table.SalaryCount.Value = 0;
            table.Fot.Value = 0;
            table.AddFot.Value = 0;
            table.Indexation.Value = 0;
            table.TotalFot.Value = 0;
        };
        return P3Sp2DataTable;
    }(PxSp2DataTable));
    F01302.P3Sp2DataTable = P3Sp2DataTable;
    var YearPostPayKeys = (function (_super) {
        __extends(YearPostPayKeys, _super);
        function YearPostPayKeys(year, postKey, PayKey) {
            var _this = _super.call(this, year, postKey) || this;
            _this.PayKey = PayKey;
            return _this;
        }
        return YearPostPayKeys;
    }(YearPostKeys));
    F01302.YearPostPayKeys = YearPostPayKeys;
    var YearStrPayKeys = (function (_super) {
        __extends(YearStrPayKeys, _super);
        function YearStrPayKeys(year, strKey, PayKey) {
            var _this = _super.call(this, year, strKey) || this;
            _this.PayKey = PayKey;
            return _this;
        }
        return YearStrPayKeys;
    }(YearStrKeys));
    F01302.YearStrPayKeys = YearStrPayKeys;
    var PxSp3DataTable = (function (_super) {
        __extends(PxSp3DataTable, _super);
        function PxSp3DataTable(id, document, keyFieldIds) {
            var _this = _super.call(this, id, keyFieldIds, document) || this;
            _this._isCopied = null;
            _this._payment = null;
            _this._addFot = null;
            _this._copyData = null;
            _this._year = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(PxSp3DataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = this.AddCopyFields.concat([this.Payment.ForeignKey, this.AddFot]);
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp3DataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp3DataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp3DataTable.prototype, "AddFot", {
            get: function () {
                if (this._addFot == null) {
                    this._addFot = new NumberObasTableField("g9", this);
                }
                return this._addFot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp3DataTable.prototype, "Payment", {
            get: function () {
                if (this._payment == null) {
                    this._payment = new ObasSprTableField(this.Document.PaymentsSprTable, this);
                }
                return this._payment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp3DataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PxSp3DataTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        PxSp3DataTable.prototype.InitCopyFieldsInfo = function () {
//            return ObasHelper.CreateInitCopyFieldsInfo(this);
            var result = ObasHelper.CreateInitCopyFieldsInfo(this);
            result.setValue("ActKind", {
                Id: "ActKind",
                IsData: true
            });
            result.setValue("ActDate", {
                Id: "ActDate",
                IsData: true
            });
            result.setValue("ActNum", {
                Id: "ActNum",
                IsData: true
            });
            result.setValue("ActName", {
                Id: "ActName",
                IsData: true
            });
            return result;
        };
        PxSp3DataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.AddFot.NValue = 0;
        };
        PxSp3DataTable.prototype.CopyData = function (srcYear, destYear) {
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
        PxSp3DataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        PxSp3DataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        PxSp3DataTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.AddFot.Value = 0;
            };
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    resetHandler();
                }
            }
            else {
                this.Iterate(resetHandler);
            }
        };
        PxSp3DataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        return PxSp3DataTable;
    }(ObasTableWithKeys));
    F01302.PxSp3DataTable = PxSp3DataTable;
    var P2Sp3DataTable = (function (_super) {
        __extends(P2Sp3DataTable, _super);
        function P2Sp3DataTable(id, _sumTable) {
            var _this = _super.call(this, id, _sumTable.Document, [BaseObasTableFields.YearField.Id, BaseObasTableFields.StrKeyField.Id, "Payments_ID"]) || this;
            _this._sumTable = _sumTable;
            _this._strKeyField = null;
            _this._addCopyFields = null;
            return _this;
        }
        Object.defineProperty(P2Sp3DataTable.prototype, "AddCopyFields", {
            get: function () {
                if (this._addCopyFields == null) {
                    this._addCopyFields = [this.Year, this.StrKeyField];
                }
                return this._addCopyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "StrKeyField", {
            get: function () {
                if (this._strKeyField == null) {
                    this._strKeyField = new ObasForeignKeyTableField(this.Document.P2Sp2Sp3RowsTable, this, BaseObasTableFields.StrKeyField.Id, false);
                }
                return this._strKeyField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3DataTable.prototype, "StrKey", {
            get: function () {
                return this.StrKeyField.Value;
            },
            set: function (value) {
                this.StrKeyField.Value = value;
            },
            enumerable: true,
            configurable: true
        });
        P2Sp3DataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(this._sumTable.AddFot.Id, this._sumTable.GetKeys(this.Year.Value, this.StrKey), oldValue, newValue);
        };
        P2Sp3DataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            if (this._sumTable.LocateByKeys(this._sumTable.GetKeys(this.Year.Value, this.StrKey).ToArray())) {
                this.AddFot.NValue = 0;
            }
        };
        P2Sp3DataTable.prototype.GetKeys = function (year, strKey, payKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (strKey === void 0) { strKey = this.StrKey; }
            if (payKey === void 0) { payKey = this.Payment.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new YearStrPayKeys(year, strKey, payKey);
            }
            else {
                this._keys.Year = year;
                this._keys.StrKey = strKey;
                this._keys.PayKey = payKey;
            }
            return this._keys;
        };
        P2Sp3DataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var yearData = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yearData.Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        return P2Sp3DataTable;
    }(PxSp3DataTable));
    F01302.P2Sp3DataTable = P2Sp3DataTable;
    var P3Sp3DataTable = (function (_super) {
        __extends(P3Sp3DataTable, _super);
        function P3Sp3DataTable(id, _parentTable) {
            var _this = _super.call(this, id, _parentTable.Document, [BaseObasTableFields.YearField.Id, BaseObasTableFields.OwnerKeyField.Id, "Payments_ID"]) || this;
            _this._parentTable = _parentTable;
            _this._ownerKey = null;
            _this._addCopyFields = null;
            return _this;
        }
        Object.defineProperty(P3Sp3DataTable.prototype, "AddCopyFields", {
            get: function () {
                if (this._addCopyFields == null) {
                    this._addCopyFields = [this.OwnerKey];
                }
                return this._addCopyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp3DataTable.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this._ownerKey = new ObasForeignKeyTableFieldTyped(this._parentTable, this, BaseObasTableFields.OwnerKeyField.Id, false);
                }
                return this._ownerKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp3DataTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp3DataTable.prototype, "Post", {
            get: function () {
                return this.ParentTable.Post;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp3DataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var parentTable = this.ParentTable;
            parentTable.SetSumByKeys(parentTable.AddFot.Id, parentTable.GetKeys(), oldValue, newValue);
        };
        P3Sp3DataTable.prototype.GetKeys = function (year, postKey, payKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (postKey === void 0) { postKey = this.Post.ForeignKey.Value; }
            if (payKey === void 0) { payKey = this.Payment.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new YearPostPayKeys(year, postKey, payKey);
            }
            else {
                this._keys.Year = year;
                this._keys.PostKey = postKey;
                this._keys.PayKey = payKey;
            }
            return this._keys;
        };
        P3Sp3DataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var parentTable = this._parentTable;
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(year, keys.PostKey), true);
                    copyData.getValue(this.OwnerKey.Id).Value = ownerKey;
                    keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        return P3Sp3DataTable;
    }(PxSp3DataTable));
    F01302.P3Sp3DataTable = P3Sp3DataTable;
})(F01302 || (F01302 = {}));
