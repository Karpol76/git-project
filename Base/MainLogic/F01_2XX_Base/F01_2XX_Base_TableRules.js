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
var F012XX;
(function (F012XX) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F012XX.TableRules = TableRules;
    var SprTable0103 = (function (_super) {
        __extends(SprTable0103, _super);
        function SprTable0103(document) {
            var _this = _super.call(this, "Spr_01_03") || this;
            _this._document = document;
            _this._linksTable = new ObasTable("Spr_01_03_links", ["GrbsCode", "AuthorityType_ID", "PositionCode"]);
            return _this;
        }
        SprTable0103.prototype.Filter = function (table) {
            var posCode = this.Code.Value;
            var foivCode = this._document.MainParametersTable.Foiv.Code;
            var authType = "4";
            if (table != null) {
                authType = table.AuthorityType.Code;
            }
            return this._linksTable.LocateByKeys([foivCode, authType, posCode]);
        };
        return SprTable0103;
    }(SprTable));
    F012XX.SprTable0103 = SprTable0103;
    var P1TotalStrKeys;
    (function (P1TotalStrKeys) {
        P1TotalStrKeys[P1TotalStrKeys["P2"] = 1] = "P2";
        P1TotalStrKeys[P1TotalStrKeys["P3"] = 2] = "P3";
        P1TotalStrKeys[P1TotalStrKeys["P4"] = 3] = "P4";
        P1TotalStrKeys[P1TotalStrKeys["P5"] = 4] = "P5";
        P1TotalStrKeys[P1TotalStrKeys["P6"] = 5] = "P6";
        P1TotalStrKeys[P1TotalStrKeys["OtherIns"] = 16] = "OtherIns";
        P1TotalStrKeys[P1TotalStrKeys["Total"] = 10] = "Total";
    })(P1TotalStrKeys = F012XX.P1TotalStrKeys || (F012XX.P1TotalStrKeys = {}));
    var P1RowsObasTable = (function (_super) {
        __extends(P1RowsObasTable, _super);
        function P1RowsObasTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P1RowsObasTable, "CorrectionYearDataField", {
            get: function () {
                if (this._correctionYearDataField == null) {
                    this._correctionYearDataField = new BaseGenericObasTableField("Correction_Y");
                }
                return this._correctionYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        P1RowsObasTable.prototype.GetCorrectionCoef = function (strKey, param) {
            return this.Lookup(this.RecordKey.Id, strKey, P1RowsObasTable.CorrectionYearDataField.GenerateId(param)) /
                100;
        };
        return P1RowsObasTable;
    }(ObasTable));
    P1RowsObasTable._correctionYearDataField = null;
    F012XX.P1RowsObasTable = P1RowsObasTable;
    var FP1TotalTable = (function (_super) {
        __extends(FP1TotalTable, _super);
        function FP1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FP1TotalTable.prototype.GetCorrectionCoef = function (strKey, param) {
            return this.Document.P1RowsTable.GetCorrectionCoef(strKey, param);
        };
        FP1TotalTable.prototype.GetTotalKey = function () {
            return P1TotalStrKeys.Total;
        };
        FP1TotalTable.prototype.P1SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            var yearIndex = ObasHelper.GetYearIndexById(fieldId);
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(yearIndex), this.GetFieldValue(BaseObasTableFields.FotYearDataField.GenerateId(yearIndex)) +
                this.GetFieldValue(BaseObasTableFields.InsuranceYearDataField.GenerateId(yearIndex)));
        };
        FP1TotalTable.prototype.ResetData = function (keys) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var yearFotField = BaseObasTableFields.FotYearDataField;
            var yearInsField = BaseObasTableFields.InsuranceYearDataField;
            var resetDataHandler = function () {
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    _this.SetFieldValue(yearFotField.GenerateId(i), 0);
                    _this.SetFieldValue(yearInsField.GenerateId(i), 0);
                    _this.SetFieldValue(yearField.GenerateId(i), 0);
                }
            };
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    resetDataHandler();
                }
            }
            else {
                this.Iterate(resetDataHandler);
            }
        };
        FP1TotalTable.prototype.GetDataByVersion = function (rroObasVersion, yearIndex) {
            var _this = this;
            var currentVersion = this.Document.ObasVersion;
            var synonimVersion = ObasHelper.GetSynonymVersion(currentVersion);
            var totalSum = 0;
            var collector = function (field) {
                _this.Iterate(function () {
                    if (!_this.IsTotal) {
                        totalSum += _this.GetFieldValue(field.GenerateId(yearIndex));
                    }
                });
                return totalSum;
            };
            switch (rroObasVersion) {
                case currentVersion:
                    return collector(BaseObasTableFields.FotYearDataField);
                case synonimVersion:
                    return collector(BaseObasTableFields.InsuranceYearDataField);
                default:
                    return undefined;
            }
        };
        return FP1TotalTable;
    }(P1TotalObasTable));
    F012XX.FP1TotalTable = FP1TotalTable;
    var P1TotalTable = (function (_super) {
        __extends(P1TotalTable, _super);
        function P1TotalTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return P1TotalTable;
    }(FP1TotalTable));
    F012XX.P1TotalTable = P1TotalTable;
    var OnlyInsuranceTable = (function (_super) {
        __extends(OnlyInsuranceTable, _super);
        function OnlyInsuranceTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OnlyInsuranceTable;
    }(OnlyInsuranceObasTable));
    F012XX.OnlyInsuranceTable = OnlyInsuranceTable;
    var PXSp1StrKeys;
    (function (PXSp1StrKeys) {
        PXSp1StrKeys[PXSp1StrKeys["Calced"] = 12] = "Calced";
        PXSp1StrKeys[PXSp1StrKeys["Changed"] = 13] = "Changed";
        PXSp1StrKeys[PXSp1StrKeys["Correction"] = 14] = "Correction";
        PXSp1StrKeys[PXSp1StrKeys["Total"] = 11] = "Total";
    })(PXSp1StrKeys = F012XX.PXSp1StrKeys || (F012XX.PXSp1StrKeys = {}));
    var PXSp1ObasTable = (function (_super) {
        __extends(PXSp1ObasTable, _super);
        function PXSp1ObasTable(id, document, _parentStrKey, keyFields, _isEditCorrection) {
            if (_isEditCorrection === void 0) { _isEditCorrection = false; }
            var _this = _super.call(this, id, document, document.P1TotalTable, keyFields) || this;
            _this._parentStrKey = _parentStrKey;
            _this._isEditCorrection = _isEditCorrection;
            _this._keys = null;
            return _this;
        }
        Object.defineProperty(PXSp1ObasTable.prototype, "IsEditCorrection", {
            get: function () {
                return this._isEditCorrection;
            },
            enumerable: true,
            configurable: true
        });
        PXSp1ObasTable.prototype.PTotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            switch (this.StrKey) {
                case PXSp1StrKeys.Total:
                    this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._parentStrKey), oldValue, newValue);
                    break;
                case PXSp1StrKeys.Calced:
                case PXSp1StrKeys.Changed:
                    if (!this.IsEditCorrection) {
                        var sumVal = this.GetValueByKeys(fieldId, this.PrepareKeys(PXSp1StrKeys.Calced));
                        var changeVal = this.GetValueByKeys(fieldId, this.PrepareKeys(PXSp1StrKeys.Changed));
                        var sum = sumVal + changeVal;
                        var correctionVal = sum * this.ParentTable.GetCorrectionCoef(this._parentStrKey, fieldId) * -1;
                        this.SetValueByKeys(fieldId, this.PrepareKeys(PXSp1StrKeys.Correction), correctionVal);
                        this.SetValueByKeys(fieldId, this.PrepareKeys(PXSp1StrKeys.Total), sum + correctionVal);
                        break;
                    }
                case PXSp1StrKeys.Correction:
                    if (this.IsEditCorrection) {
                        var sumVal = this.GetValueByKeys(fieldId, this.PrepareKeys(PXSp1StrKeys.Calced));
                        var changeVal = this.GetValueByKeys(fieldId, this.PrepareKeys(PXSp1StrKeys.Changed));
                        var correctionVal = this.GetValueByKeys(fieldId, this.PrepareKeys(PXSp1StrKeys.Correction));
                        this.SetValueByKeys(fieldId, this.PrepareKeys(PXSp1StrKeys.Total), sumVal + changeVal + correctionVal);
                    }
                    break;
            }
        };
        PXSp1ObasTable.prototype.PTotalAfterDeleteChildsEventHandler = function (tableId) {
            if (this.Document.EnableTablesChange && this.StrKey === PXSp1StrKeys.Total) {
                var fotField = BaseObasTableFields.FotYearDataField;
                var insField = BaseObasTableFields.InsuranceYearDataField;
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    var fieldId = fotField.GenerateId(i);
                    this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._parentStrKey), this.GetFieldValue(fieldId), 0);
                    fieldId = insField.GenerateId(i);
                    this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._parentStrKey), this.GetFieldValue(fieldId), 0);
                }
            }
        };
        PXSp1ObasTable.prototype.IsUserRow = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return ((this.StrKey === PXSp1StrKeys.Changed) ||
                (this.StrKey === PXSp1StrKeys.Correction && this.IsEditCorrection));
        };
        PXSp1ObasTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, function () {
                return _this.IsUserRow();
            }, BaseObasTableFields.FotYearDataField, BaseObasTableFields.InsuranceYearDataField);
        };
        PXSp1ObasTable.prototype.ResetData = function (keys) {
            this.Document.CommonRules
                .ResetTableDataWithKeys(this, keys, BaseObasTableFields.YearDataField, BaseObasTableFields.FotYearDataField, BaseObasTableFields.InsuranceYearDataField);
        };
        PXSp1ObasTable.prototype.CollectUserData = function () {
            var _this = this;
            return this.CollectTableData(this.InitCopyFieldsInfo(), function () {
                return _this.IsUserRow();
            });
        };
        return PXSp1ObasTable;
    }(ObasTableWithStrParent));
    F012XX.PXSp1ObasTable = PXSp1ObasTable;
    var PXSp2StrKeys;
    (function (PXSp2StrKeys) {
        PXSp2StrKeys[PXSp2StrKeys["Fot"] = 1] = "Fot";
        PXSp2StrKeys[PXSp2StrKeys["Other"] = 2] = "Other";
        PXSp2StrKeys[PXSp2StrKeys["Indexation"] = 3] = "Indexation";
        PXSp2StrKeys[PXSp2StrKeys["OtherNoIndex"] = 4] = "OtherNoIndex";
        PXSp2StrKeys[PXSp2StrKeys["Total"] = 5] = "Total";
    })(PXSp2StrKeys = F012XX.PXSp2StrKeys || (F012XX.PXSp2StrKeys = {}));
    var RowsObasTable = (function (_super) {
        __extends(RowsObasTable, _super);
        function RowsObasTable(id) {
            var _this = _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], "StrCode", "Name") || this;
            _this._barsCode = null;
            return _this;
        }
        Object.defineProperty(RowsObasTable.prototype, "BarsCode", {
            get: function () {
                if (this._barsCode == null) {
                    this._barsCode = new ObasTableField("BarsCode", this);
                }
                return this._barsCode;
            },
            enumerable: true,
            configurable: true
        });
        return RowsObasTable;
    }(SprTable));
    F012XX.RowsObasTable = RowsObasTable;
    var PXSp2ObasTable = (function (_super) {
        __extends(PXSp2ObasTable, _super);
        function PXSp2ObasTable(id, document, parent, _insTable, keyFields, _rowsTableId) {
            var _this = _super.call(this, id, document, parent, keyFields) || this;
            _this._insTable = _insTable;
            _this._rowsTableId = _rowsTableId;
            _this._keys = null;
            _this._rowsTable = null;
            return _this;
        }
        Object.defineProperty(PXSp2ObasTable.prototype, "RowsTable", {
            get: function () {
                if (this._rowsTable == null) {
                    this._rowsTable = new RowsObasTable(this._rowsTableId);
                }
                return this._rowsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PXSp2ObasTable.prototype, "InsTable", {
            get: function () {
                return this._insTable;
            },
            enumerable: true,
            configurable: true
        });
        PXSp2ObasTable.prototype.GetSumByStrKey = function (strKey, fieldId) {
            var result = 0;
            while (this.StrKeyField.Locate(strKey, true)) {
                result += this.GetFieldValue(fieldId) || 0;
            }
            this.ClearLocateFlag();
            return result;
        };
        PXSp2ObasTable.prototype.PIndexChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            switch (this.StrKey) {
                case PXSp2StrKeys.Total:
                    var destFieldId = BaseObasTableFields.FotYearDataField.GenerateId(fieldId);
                    this.ParentTable.SetValueByKeys(destFieldId, this.PrepareParentKeys(PXSp1StrKeys.Calced), newValue);
                    this.UpdateInsuranceFot(destFieldId, oldValue, newValue);
                    break;
                case PXSp2StrKeys.Fot:
                case PXSp2StrKeys.Other:
                case PXSp2StrKeys.OtherNoIndex:
                    var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
                    var sumVal = this.GetValueByKeys(fieldId, this.PrepareKeys(PXSp2StrKeys.Fot));
                    var changeVal = this.GetValueByKeys(fieldId, this.PrepareKeys(PXSp2StrKeys.Other));
                    var changeVal2 = this.GetValueByKeys(fieldId, this.PrepareKeys(PXSp2StrKeys.OtherNoIndex));
                    var indexVal = this.Document.CommonRules
                        .CalcIndexationByYear(sumVal + changeVal, ObasStageSettings.CurrentYear + yearOffset, "Value_PO");
                    this.SetValueByKeys(fieldId, this.PrepareKeys(PXSp2StrKeys.Indexation), indexVal);
                    this.SetValueByKeys(fieldId, this.PrepareKeys(PXSp2StrKeys.Total), sumVal + changeVal + indexVal + changeVal2);
                    break;
            }
        };
        PXSp2ObasTable.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount - 1;
            var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount;
            var yearField = BaseObasTableFields.YearDataField;
            var srcFieldId = yearField.GenerateId(srcIndex);
            var destFieldId = yearField.GenerateId(destIndex);
            var copy = function () {
                var strKey = _this.StrKey;
                if (strKey === PXSp2StrKeys.Other || strKey === PXSp2StrKeys.OtherNoIndex) {
                    _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
                }
            };
            this.Iterate(copy);
        };
        PXSp2ObasTable.prototype.ResetData = function (keys) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var resetDataHandler = function () {
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    _this.SetFieldValue(yearField.GenerateId(i), 0);
                }
            };
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    resetDataHandler();
                }
            }
            else {
                this.Iterate(resetDataHandler);
            }
        };
        PXSp2ObasTable.prototype.CollectUserData = function () {
            var _this = this;
            var filter = function () {
                var strKey = _this.StrKey;
                return strKey === PXSp2StrKeys.Other || strKey === PXSp2StrKeys.OtherNoIndex;
            };
            return this.CollectTableData(this.InitCopyFieldsInfo(), filter);
        };
        return PXSp2ObasTable;
    }(ObasTableWithStrParent));
    F012XX.PXSp2ObasTable = PXSp2ObasTable;
    var BaseFotObasTable = (function (_super) {
        __extends(BaseFotObasTable, _super);
        function BaseFotObasTable(id, document, parent, _insTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id], document, parent) || this;
            _this._insTable = _insTable;
            _this._year = null;
            _this._copyData = null;
            _this._isCopied = null;
            _this._emplCount = null;
            _this._fotTotal = null;
            _this._postKey = null;
            return _this;
        }
        Object.defineProperty(BaseFotObasTable.prototype, "InsTable", {
            get: function () {
                return this._insTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFotObasTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFotObasTable.prototype, "PostKey", {
            get: function () {
                if (this._postKey == null) {
                    this._postKey = new NumberObasTableField(this.GetPostKeyId(), this);
                }
                return this._postKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFotObasTable.prototype, "FotTotal", {
            get: function () {
                if (this._fotTotal == null) {
                    this._fotTotal = new NumberObasTableField("TotalFot", this);
                }
                return this._fotTotal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFotObasTable.prototype, "EmplCount", {
            get: function () {
                if (this._emplCount == null) {
                    this._emplCount = new NumberObasTableField("EmplNumber", this);
                }
                return this._emplCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFotObasTable.prototype, "Keys", {
            get: function () {
                return this._keys;
            },
            set: function (value) {
                this._keys = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFotObasTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFotObasTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        BaseFotObasTable.prototype.BaseCountChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateInsuranceCount(fieldId, oldValue, newValue);
        };
        BaseFotObasTable.prototype.FotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(BaseObasTableFields.YearDataField.GenerateId(this.YearOffset + 1), this.PrepareParentKeys(PXSp2StrKeys.Fot), oldValue, newValue);
        };
        BaseFotObasTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            if (this.Document.EnableTablesChange) {
                var fieldInfo = this.EmplCount;
                this.BaseCountChangeEventHandler(tableId, fieldInfo.Value, 0, fieldInfo.Id);
                fieldInfo = this.FotTotal;
                this.FotChangeEventHandler(tableId, fieldInfo.Value, 0, fieldInfo.Id);
            }
        };
        Object.defineProperty(BaseFotObasTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        BaseFotObasTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        BaseFotObasTable.prototype.CopyData = function (srcYear, destYear) {
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
        BaseFotObasTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        BaseFotObasTable.prototype.ResetData = function (keys) {
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    this.InnerResetData(this, this.RecordKey.Value);
                }
            }
            else {
                this.Iterate(this.InnerResetData);
            }
        };
        BaseFotObasTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        return BaseFotObasTable;
    }(ObasTableWithKeysParent));
    F012XX.BaseFotObasTable = BaseFotObasTable;
    var FotObasTable = (function (_super) {
        __extends(FotObasTable, _super);
        function FotObasTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._fot = null;
            return _this;
        }
        Object.defineProperty(FotObasTable.prototype, "Fot", {
            get: function () {
                if (this._fot == null) {
                    this._fot = new NumberObasTableField("Fot", this);
                }
                return this._fot;
            },
            enumerable: true,
            configurable: true
        });
        FotObasTable.CalcTotalFot = function (fotParts) {
            var totalFot = 0;
            for (var i = 0; i < fotParts.length; i++)
                totalFot += fotParts[i];
            return totalFot;
        };
        FotObasTable.prototype.CountChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.PostChangeEventHandler(tableId, oldValue, newValue, fieldId);
            _super.prototype.BaseCountChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        FotObasTable.prototype.FotPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.FotTotal.Value = FotObasTable.CalcTotalFot(this.GetFotParts());
        };
        return FotObasTable;
    }(BaseFotObasTable));
    F012XX.FotObasTable = FotObasTable;
    var P2Sp3Sp4ObasTable = (function (_super) {
        __extends(P2Sp3Sp4ObasTable, _super);
        function P2Sp3Sp4ObasTable(id, document, parent, insTable) {
            var _this = _super.call(this, id, document, parent, insTable) || this;
            _this._fotTotalProm = new NumberObasTableField("g4_r2_4", _this);
            _this._fotMProm = new NumberObasTableField("g5_r2_4", _this);
            _this._fotQProm = new NumberObasTableField("g6_r2_4", _this);
            return _this;
        }
        P2Sp3Sp4ObasTable.prototype.GetPostKeyId = function () {
            return "Position_ID";
        };
        ;
        Object.defineProperty(P2Sp3Sp4ObasTable.prototype, "QProm", {
            get: function () {
                return this.GetFieldValue("g7") || 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Sp4ObasTable.prototype, "CountMonth", {
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
        Object.defineProperty(P2Sp3Sp4ObasTable.prototype, "OldMoneyVal", {
            get: function () {
                switch (this.Year.Value) {
                    case 2013:
                        return this.GetFieldValue("g4");
                    case 2014:
                        return this.GetFieldValue("g4_2013");
                    default:
                        return this.GetFieldValue("g4_2014");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Sp4ObasTable.prototype, "NewMoneyVal", {
            get: function () {
                switch (this.Year.Value) {
                    case 2013:
                        return this.GetFieldValue("g4_2013");
                    case 2014:
                        return this.GetFieldValue("g4_2014");
                    default:
                        return this.GetFieldValue("g4_2014");
                        
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Sp4ObasTable.prototype, "OldPromVal", {
            get: function () {
                switch (this.Year.Value) {
                    case 2013:
                        return this.GetFieldValue("g6");
                    case 2014:
                        return this.GetFieldValue("g6_2013");
                    default:
                        return this.GetFieldValue("g6_2014");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Sp3Sp4ObasTable.prototype, "NewPromVal", {
            get: function () {
                switch (this.Year.Value) {
                    case 2013:
                        return this.GetFieldValue("g6_2013");
                    case 2014:
                        return this.GetFieldValue("g6_2014");
                    default:
                        return this.GetFieldValue("g6_2014");
                }
            },
            enumerable: true,
            configurable: true
        });
        P2Sp3Sp4ObasTable.CalcFot = function (count, oldMoneyVal, newMoneyVal, year, countMonth) {
            if (year < 2018) {
                return (count * (oldMoneyVal * 8 + newMoneyVal * 4));
            }
            else {
                return (count * newMoneyVal * countMonth);
            }
        };
        P2Sp3Sp4ObasTable.CalcMProm = function (count, oldMoneyVal, newMoneyVal, oldPromVal, newPromVal, year, countMonth) {
            if (year < 2018) {
                return Math.round(count * (oldMoneyVal * 8 * oldPromVal + newMoneyVal * 4 * newPromVal));
            }
            else {
                return Math.round(count * newMoneyVal * newPromVal * countMonth);
            }
        };
        P2Sp3Sp4ObasTable.CalcQProm = function (count, oldMoneyVal, newMoneyVal, quarterPromVal, year, countMonth) {
            if (year < 2018) {
                return Math.round(count * (oldMoneyVal * 2 * quarterPromVal + oldMoneyVal / 3 * 2 * quarterPromVal +
                    newMoneyVal / 3 * quarterPromVal + newMoneyVal * quarterPromVal));
            }
            else {
                return Math.round(count * newMoneyVal * quarterPromVal * 4 * (countMonth / 12));
            }
        };
        P2Sp3Sp4ObasTable.prototype.PostChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var recKeyField = this.RecordKey;
            var recKey = recKeyField.Value;
            var count = this.EmplCount.Value;
            var qPromVal = this.QProm;
            var oldMoneyVal = this.OldMoneyVal;
            var newMoneyVal = this.NewMoneyVal;
            var oldPromVal = this.OldPromVal;
            var newPromVal = this.NewPromVal;
            var year = this.Year.Value;
            var countMonth = this.CountMonth;
            this.Fot.Value = P2Sp3Sp4ObasTable.CalcFot(count, oldMoneyVal, newMoneyVal, year, countMonth);
            recKeyField.Locate(recKey);
            this._fotMProm.Value = P2Sp3Sp4ObasTable.CalcMProm(count, oldMoneyVal, newMoneyVal, oldPromVal, newPromVal, year, countMonth);
            recKeyField.Locate(recKey);
            this._fotQProm.Value = P2Sp3Sp4ObasTable.CalcQProm(count, oldMoneyVal, newMoneyVal, qPromVal, year, countMonth);
//                                Client.ShowMessage("Error", this.IsFieldExists("CountMonth"), MessageIcons.Information);
        };
        P2Sp3Sp4ObasTable.prototype.CalcMoney = function () {
            var oldMoneyVal = this.OldMoneyVal;
            var newMoneyVal = this.NewMoneyVal;
            var oldMoneyStr = ObasHelper.ConvertToString(oldMoneyVal, 2);
            var newMoneyStr = ObasHelper.ConvertToString(newMoneyVal, 2);
            if (oldMoneyVal === newMoneyVal) {
                return oldMoneyStr;
            }
            else {
                return "\u0434\u043E 1 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F - " + oldMoneyStr + "/;\n\u0441 1 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F - " + newMoneyStr + ".";
            }
        };
        P2Sp3Sp4ObasTable.prototype.CalcPromotion = function () {
            if (this.Year.Value < 2018) {
                return this.OldPromVal * 8 + this.NewPromVal * 4;
            }
            else {
                return this.NewPromVal * this.CountMonth;
            }
        };
        P2Sp3Sp4ObasTable.prototype.CalcTotalPromotion = function () {
            return this.CalcPromotion() + this.CalcQuarterPromotion();
        };
        P2Sp3Sp4ObasTable.prototype.CalcQuarterPromotion = function () {
            if (this.Year.Value < 2018) {
                return this.QProm * 4;
            }
            else {
                return this.QProm * 4 * this.CountMonth / 12;
            }
        };
        P2Sp3Sp4ObasTable.prototype.FotPromotionPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._fotTotalProm.Value = this._fotMProm.Value + this._fotQProm.Value;
        };
        P2Sp3Sp4ObasTable.prototype.GetFotParts = function () {
            return [this.Fot.Value, this._fotTotalProm.Value];
        };
        P2Sp3Sp4ObasTable.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("EmplNumber", 0);
            table.SetFieldValue("Fot", 0);
            table.SetFieldValue("TotalFot", 0);
            for (var i = 4; i < 7; i++) {
                table.SetFieldValue("g" + i + "_r2_4", 0);
            }
        };
        P2Sp3Sp4ObasTable.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.CountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.PostChangeEventHandler(this, tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("CountMonth", oldValue);
            }
        };
        return P2Sp3Sp4ObasTable;
    }(FotObasTable));
    F012XX.P2Sp3Sp4ObasTable = P2Sp3Sp4ObasTable;
    var P3Sp3Sp4ObasTable = (function (_super) {
        __extends(P3Sp3Sp4ObasTable, _super);
        function P3Sp3Sp4ObasTable(id, document, parent, insTable) {
            var _this = _super.call(this, id, document, parent, insTable) || this;
            _this._amount = new NumberObasTableField("g6_r3_4", _this);
            _this._payment = new NumberObasTableField("g12_r3_4", _this);
            return _this;
        }
        P3Sp3Sp4ObasTable.prototype.GetPostKeyId = function () {
            return "Spr_01_03_ID";
        };
        ;
        Object.defineProperty(P3Sp3Sp4ObasTable.prototype, "CountMonth", {
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
        P3Sp3Sp4ObasTable.CalcFot = function (count, salary, countMonth) {
            return (count * salary * countMonth);
        };
        P3Sp3Sp4ObasTable.CalcPremium = function (count, salary, premium, countMonth) {
            return (count * salary * premium * (countMonth / 12));
        };
        P3Sp3Sp4ObasTable.CalcPay = function (count, salary, premium, rank, countMonth) {
            return P3Sp3Sp4ObasTable.CalcPremium(count, salary, premium, countMonth) * (rank / 12 + 1);
        };
        P3Sp3Sp4ObasTable.prototype.PostChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var recKeyField = this.RecordKey;
            var recKey = recKeyField.Value;
            var count = this.EmplCount.Value;
            var salary = this.GetFieldValue("g7");
            var rank = this.GetFieldValue("g9");
            var countMonth = this.CountMonth;
            this.Fot.Value = P3Sp3Sp4ObasTable.CalcFot(count, salary, countMonth);
            recKeyField.Locate(recKey);
            for (var i = 7; i < 12; i++) {
                this.SetFieldValue("g" + i + "_r3_4", P3Sp3Sp4ObasTable.CalcPremium(count, salary, this.GetFieldValue("g" + (i + 2)), countMonth));
                recKeyField.Locate(recKey);
                if (i < 9) {
                    this.SetFieldValue("g" + (i + 6) + "_r3_4", P3Sp3Sp4ObasTable.CalcPay(count, salary, this.GetFieldValue("g" + (i + 8)), rank, countMonth));
                    recKeyField.Locate(recKey);
                }
            }
        };
        P3Sp3Sp4ObasTable.prototype.AmountPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var sum = 0;
            for (var i = 7; i < 12; i++) {
                sum += this.GetFieldValue("g" + i + "_r3_4");
            }
            this._amount.Value = sum;
        };
        P3Sp3Sp4ObasTable.prototype.PaymentPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var sum = 0;
            for (var i = 13; i < 15; i++) {
                sum += this.GetFieldValue("g" + i + "_r3_4");
            }
            this._payment.Value = sum;
        };
        P3Sp3Sp4ObasTable.prototype.GetFotParts = function () {
            return [this.Fot.Value, this._amount.Value, this._payment.Value];
        };
        P3Sp3Sp4ObasTable.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("EmplNumber", 0);
            table.SetFieldValue("Fot", 0);
            table.SetFieldValue("TotalFot", 0);
            table.SetFieldValue("g8", 0);
            table.SetFieldValue("g14", 0);
            for (var i = 6; i < 15; i++) {
                table.SetFieldValue("g" + i + "_r3_4", 0);
            }
        };
        P3Sp3Sp4ObasTable.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.CountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.PostChangeEventHandler(this, tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("CountMonth", oldValue);
            }
        };
        return P3Sp3Sp4ObasTable;
    }(FotObasTable));
    F012XX.P3Sp3Sp4ObasTable = P3Sp3Sp4ObasTable;
    var P4Sp3ObasTable = (function (_super) {
        __extends(P4Sp3ObasTable, _super);
        function P4Sp3ObasTable(id, document, parent, insTable) {
            var _this = _super.call(this, id, document, parent, insTable) || this;
            _this._salary = new NumberObasTableField("g3", _this);
            return _this;
        }
        P4Sp3ObasTable.prototype.GetPostKeyId = function () {
            return "PostCategory_ID";
        };
        Object.defineProperty(P4Sp3ObasTable.prototype, "CountMonth", {
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
        P4Sp3ObasTable.prototype.UpdateFot = function () {
            this.FotTotal.Value = this.EmplCount.Value * this._salary.Value * this.CountMonth;
        };
        P4Sp3ObasTable.prototype.CountChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateFot();
            _super.prototype.BaseCountChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
        };
        P4Sp3ObasTable.prototype.SalaryChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateFot();
        };
        P4Sp3ObasTable.prototype.SalaryPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var sum = 0;
            for (var i = 4; i < 7; i++) {
                sum += this.GetFieldValue("g" + i);
            }
            this._salary.Value = sum;
        };
        P4Sp3ObasTable.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("EmplNumber", 0);
            table.SetFieldValue("TotalFot", 0);
            for (var i = 3; i < 7; i++) {
                table.SetFieldValue("g" + i, 0);
            }
        };
        P4Sp3ObasTable.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.CountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.UpdateFot();
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("CountMonth", oldValue);
            }
        };
        return P4Sp3ObasTable;
    }(BaseFotObasTable));
    F012XX.P4Sp3ObasTable = P4Sp3ObasTable;
    var P5Sp3Sp4ObasTable = (function (_super) {
        __extends(P5Sp3Sp4ObasTable, _super);
        function P5Sp3Sp4ObasTable(id, document, parent, insTable) {
            var _this = _super.call(this, id, document, parent, insTable) || this;
            _this._payment = new NumberObasTableField("g4_r5_4", _this);
            return _this;
        }
        P5Sp3Sp4ObasTable.prototype.GetPostKeyId = function () {
            return "Spr_01_05_ID";
        };
        ;
        Object.defineProperty(P5Sp3Sp4ObasTable.prototype, "CountMonth", {
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
        P5Sp3Sp4ObasTable.prototype.CalcSecrecyPayment = function () {
            return this.GetFieldValue("g6_1") + this.GetFieldValue("g6_2");
        };
        P5Sp3Sp4ObasTable.prototype.PostChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var count = this.EmplCount.Value;
            var salary = this.GetFieldValue("g4");
            var countMonth = this.CountMonth;
            this.Fot.Value = P3Sp3Sp4ObasTable.CalcFot(count, salary, countMonth);
            for (var i = 5; i < 11; i++) {
                var premium = i === 5 ? this.CalcSecrecyPayment() : this.GetFieldValue("g" + (i + 1));
                this.SetFieldValue("g" + i + "_r5_4", P3Sp3Sp4ObasTable.CalcPremium(count, salary, premium, countMonth));
            }
        };
        P5Sp3Sp4ObasTable.prototype.PaymentPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var sum = 0;
            for (var i = 5; i < 11; i++) {
                sum += this.GetFieldValue("g" + i + "_r5_4");
            }
            this._payment.Value = sum;
        };
        P5Sp3Sp4ObasTable.prototype.GetFotParts = function () {
            return [this.Fot.Value, this._payment.Value];
        };
        P5Sp3Sp4ObasTable.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("EmplNumber", 0);
            table.SetFieldValue("Fot", 0);
            table.SetFieldValue("TotalFot", 0);
            table.SetFieldValue("g5", 0);
            for (var i = 4; i < 11; i++) {
                table.SetFieldValue("g" + i + "_r5_4", 0);
            }
        };
        P5Sp3Sp4ObasTable.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.CountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.PostChangeEventHandler(this, tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("CountMonth", oldValue);
            }
        };
        return P5Sp3Sp4ObasTable;
    }(FotObasTable));
    F012XX.P5Sp3Sp4ObasTable = P5Sp3Sp4ObasTable;
    var MonthsTable = (function (_super) {
        __extends(MonthsTable, _super);
        function MonthsTable(id, _document) {
            var _this = _super.call(this, id, [BaseObasTableFields.RecordKeyField.Id]) || this;
            _this._document = _document;
            _this._monthValue = null;
            _this._monthChangeEvent = null;
            return _this;
        }
        Object.defineProperty(MonthsTable.prototype, "MonthValue", {
            get: function () {
                if (this._monthValue == null) {
                    this._monthValue = new NumberGenericObasTableField("Months_Y", this);
                }
                return this._monthValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonthsTable.prototype, "MonthChangeEvent", {
            get: function () {
                if (this._monthChangeEvent == null) {
                    this._monthChangeEvent = new ObasTableFieldChangeEvent();
                }
                return this._monthChangeEvent;
            },
            enumerable: true,
            configurable: true
        });
        MonthsTable.prototype.GetMonthByField = function (fieldId) {
            return this.MonthValue.GetFieldByField(fieldId).NValue;
        };
        MonthsTable.prototype.MonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.MonthChangeEvent.Do(this, oldValue, newValue, fieldId);
        };
        MonthsTable.prototype.GetMonthByYearIndex = function (yearIndex) {
            return this.MonthValue.GetFieldByYearIndex(yearIndex).NValue;
        };
        MonthsTable.prototype.CopyData = function (srcYear, destYear) {
            this._document.CommonRules.CopyTableData(this, srcYear, destYear, null, this.MonthValue);
        };
        return MonthsTable;
    }(ObasTable));
    F012XX.MonthsTable = MonthsTable;
})(F012XX || (F012XX = {}));
