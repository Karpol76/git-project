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
var F01280;
(function (F01280) {
    var ObasTableFields = (function (_super) {
        __extends(ObasTableFields, _super);
        function ObasTableFields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ObasTableFields, "PayYearDataField", {
            get: function () {
                if (this._payYearDataField == null) {
                    this._payYearDataField = new BaseGenericObasTableField("Pay_Y");
                }
                return this._payYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "CopiedRubRowFlagField", {
            get: function () {
                if (this._copiedRubRowFlagField == null) {
                    this._copiedRubRowFlagField = new BaseObasTableField("IsCopiedRub", false);
                }
                return this._copiedRubRowFlagField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "CopiedUsdRowFlagField", {
            get: function () {
                if (this._copiedUsdRowFlagField == null) {
                    this._copiedUsdRowFlagField = new BaseObasTableField("IsCopiedUsd", false);
                }
                return this._copiedUsdRowFlagField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "PositionField", {
            get: function () {
                if (this._positionField == null) {
                    this._positionField = new BaseObasTableField("Position_ID", false);
                }
                return this._positionField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "FotRubYearDataField", {
            get: function () {
                if (this._fotRubYearDataField == null) {
                    this._fotRubYearDataField = new BaseGenericObasTableField("Fot_Rub_Y");
                }
                return this._fotRubYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableFields, "FotUsdYearDataField", {
            get: function () {
                if (this._fotUsdYearDataField == null) {
                    this._fotUsdYearDataField = new BaseGenericObasTableField("Fot_Usd_Y");
                }
                return this._fotUsdYearDataField;
            },
            enumerable: true,
            configurable: true
        });
        return ObasTableFields;
    }(BaseObasTableFields));
    ObasTableFields._fotUsdYearDataField = null;
    ObasTableFields._fotRubYearDataField = null;
    ObasTableFields._positionField = null;
    ObasTableFields._copiedUsdRowFlagField = null;
    ObasTableFields._copiedRubRowFlagField = null;
    ObasTableFields._payYearDataField = null;
    F01280.ObasTableFields = ObasTableFields;
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        TableRules.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var table = this._document.Tables.getValue(tableId);
            if (!table.GetFieldValue(BaseObasTableFields.CalcRowFlagField.Id)) {
                var yearOffset = ObasHelper.GetYearOffsetById(fieldId) + 1;
                var destTable = this._document.TableP1;
                this._document.CommonRules.SetSumByKeys(destTable, destTable.KeyFieldIds, [6, 0], "" + ObasTableFields.InsuranceYearDataField.Id + yearOffset, oldValue, newValue);
            }
        };
        return TableRules;
    }());
    F01280.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["P2"] = 2] = "P2";
        StrKeysP1Total[StrKeysP1Total["P3"] = 3] = "P3";
        StrKeysP1Total[StrKeysP1Total["P4"] = 4] = "P4";
        StrKeysP1Total[StrKeysP1Total["P5"] = 5] = "P5";
        StrKeysP1Total[StrKeysP1Total["OtherIns"] = 6] = "OtherIns";
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F01280.StrKeysP1Total || (F01280.StrKeysP1Total = {}));
    var ObasTableP1 = (function (_super) {
        __extends(ObasTableP1, _super);
        function ObasTableP1(id, document) {
            return _super.call(this, id, document) || this;
        }
        ObasTableP1.prototype.GetDataByVersion = function (rroObasVersion, yearIndex) {
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
        ObasTableP1.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        ObasTableP1.prototype.GetInsuranceKey = function () {
            return StrKeysP1Total.OtherIns;
        };
        ObasTableP1.prototype.P1PartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId, fields) {
            var yearOffset = ObasHelper.GetYearOffsetById(fieldId) + 1;
            this.SumChangeEventHandler(tableId, oldValue, newValue, fieldId, true);
            this.SetFieldValue("" + fields.DestFieldId + yearOffset, this.GetFieldValue("" + fields.Field1Id + yearOffset) +
                this.GetFieldValue("" + fields.Field2Id + yearOffset));
        };
        ObasTableP1.prototype.P1SumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.P1PartsChangeEventHandler(tableId, oldValue, newValue, fieldId, {
                DestFieldId: ObasTableFields.YearDataField.Id,
                Field1Id: ObasTableFields.FotYearDataField.Id,
                Field2Id: ObasTableFields.InsuranceYearDataField.Id
            });
        };
        ObasTableP1.prototype.P1FotSumPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.P1PartsChangeEventHandler(tableId, oldValue, newValue, fieldId, {
                DestFieldId: ObasTableFields.FotYearDataField.Id,
                Field1Id: ObasTableFields.FotUsdYearDataField.Id,
                Field2Id: ObasTableFields.FotRubYearDataField.Id
            });
        };
        ObasTableP1.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId, restorePosition) {
            if (restorePosition === void 0) { restorePosition = false; }
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            var restoreKeys = null;
            if (restorePosition) {
                restoreKeys = this.KeyFieldValues;
            }
            if (!this.IsTotal &&
                !ObasTableFields.FotYearDataField.Equal(fieldId) &&
                (!ObasTableFields.YearDataField.Equal(fieldId))) {
                this.SetSumByKeys(fieldId, this.GetKeys(StrKeysP1Total.Total), oldValue, newValue);
            }
            this.Document.CommonRules.TotalSumTableEditNotify(this, fieldId);
            if (restoreKeys != null) {
                this.LocateByKeys(restoreKeys);
            }
        };
        ObasTableP1.prototype.ResetData = function (keys) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var yearFotField = BaseObasTableFields.FotYearDataField;
            var yearUsdFotField = ObasTableFields.FotUsdYearDataField;
            var yearRubFotField = ObasTableFields.FotRubYearDataField;
            var yearInsField = BaseObasTableFields.InsuranceYearDataField;
            var resetDataHandler = function () {
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    _this.SetFieldValue(yearUsdFotField.GenerateId(i), 0);
                    _this.SetFieldValue(yearRubFotField.GenerateId(i), 0);
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
        ObasTableP1.prototype.CollectUserData = function () {
            var _this = this;
            var filter = function () {
                return !_this.IsTotal;
            };
            var yearField = BaseObasTableFields.YearDataField;
            var result = this.CollectTableData(this.InitCopyFieldsInfo(), filter);
            var strKeyId = this.StrKeyField.Id;
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var record = result_1[_i];
                var data = record.Data;
                var strKey = data.getValue(strKeyId).Value;
                if (BaseInsuranceObasTable.CheckIsTaxDataRow(strKey)) {
                    for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                        data.remove(yearField.GenerateId(i));
                    }
                }
            }
            return result;
        };
        ObasTableP1.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.StrKeyField.Id, {
                Id: this.StrKeyField.Id,
                IsData: false
            });
            result.setValue(BaseObasTableFields.TotalRowFlagField.Id, {
                Id: BaseObasTableFields.TotalRowFlagField.Id,
                IsData: false
            });
            var yearUsdFotField = ObasTableFields.FotUsdYearDataField;
            var yearRubFotField = ObasTableFields.FotRubYearDataField;
            var yearInsField = BaseObasTableFields.InsuranceYearDataField;
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                var fieldId = yearUsdFotField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
                fieldId = yearRubFotField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
                fieldId = yearInsField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            return result;
        };
        return ObasTableP1;
    }(P1TotalObasTable));
    F01280.ObasTableP1 = ObasTableP1;
    var StrKeysPXSp1;
    (function (StrKeysPXSp1) {
        StrKeysPXSp1[StrKeysPXSp1["Total"] = 1] = "Total";
        StrKeysPXSp1[StrKeysPXSp1["Calced"] = 2] = "Calced";
        StrKeysPXSp1[StrKeysPXSp1["Changed"] = 3] = "Changed";
    })(StrKeysPXSp1 = F01280.StrKeysPXSp1 || (F01280.StrKeysPXSp1 = {}));
    var ObasTablePXSp1 = (function (_super) {
        __extends(ObasTablePXSp1, _super);
        function ObasTablePXSp1(id, document, _parentStrKey) {
            var _this = _super.call(this, id, document, document.TableP1) || this;
            _this._parentStrKey = _parentStrKey;
            return _this;
        }
        ObasTablePXSp1.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var strKey = this.StrKey;
            switch (strKey) {
                case StrKeysPXSp1.Calced:
                case StrKeysPXSp1.Changed:
                    this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this._parentStrKey), oldValue, newValue);
                    break;
            }
        };
        ObasTablePXSp1.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            var fotUsdYearDataField = ObasTableFields.FotUsdYearDataField;
            var changeData = function (field, year) {
                var fieldId = field.GenerateId(year);
                _this.SumChangeEventHandler(_this.Id, _this.GetFieldValue(fieldId), 0, fieldId);
            };
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                changeData(ObasTableFields.FotUsdYearDataField, i);
                changeData(ObasTableFields.FotRubYearDataField, i);
                changeData(ObasTableFields.InsuranceYearDataField, i);
            }
        };
        ObasTablePXSp1.prototype.IsUserEditRow = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return strKey === StrKeysPXSp1.Changed;
        };
        ObasTablePXSp1.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount - 1;
            var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount;
            var yearRubField = ObasTableFields.FotRubYearDataField;
            var srcRubFieldId = yearRubField.GenerateId(srcIndex);
            var destRubFieldId = yearRubField.GenerateId(destIndex);
            var insField = BaseObasTableFields.InsuranceYearDataField;
            var insSrcFieldId = insField.GenerateId(srcIndex);
            var insDestFieldId = insField.GenerateId(destIndex);
            var copy = function () {
                if (_this.IsUserEditRow()) {
                    _this.SetFieldValue(destRubFieldId, _this.GetFieldValue(srcRubFieldId));
                    _this.SetFieldValue(insDestFieldId, _this.GetFieldValue(insSrcFieldId));
                }
            };
            this.Iterate(copy);
        };
        ObasTablePXSp1.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.StrKeyField.Id, {
                Id: this.StrKeyField.Id,
                IsData: false
            });
            var fotField = ObasTableFields.FotRubYearDataField;
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
        ObasTablePXSp1.prototype.CollectUserData = function () {
            var _this = this;
            var filter = function () {
                return _this.IsUserEditRow();
            };
            return this.CollectTableData(this.InitCopyFieldsInfo(), filter);
        };
        ObasTablePXSp1.prototype.ResetData = function (keys) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var yearFotField = BaseObasTableFields.FotYearDataField;
            var yearUsdFotField = ObasTableFields.FotUsdYearDataField;
            var yearRubFotField = ObasTableFields.FotRubYearDataField;
            var yearInsField = BaseObasTableFields.InsuranceYearDataField;
            var resetDataHandler = function () {
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    _this.SetFieldValue(yearUsdFotField.GenerateId(i), 0);
                    _this.SetFieldValue(yearRubFotField.GenerateId(i), 0);
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
        return ObasTablePXSp1;
    }(ObasTableWithStrKeysParent));
    F01280.ObasTablePXSp1 = ObasTablePXSp1;
    var StrKeysPXSp2;
    (function (StrKeysPXSp2) {
        StrKeysPXSp2[StrKeysPXSp2["FotUsd"] = 1] = "FotUsd";
        StrKeysPXSp2[StrKeysPXSp2["FotRub"] = 2] = "FotRub";
        StrKeysPXSp2[StrKeysPXSp2["Ins"] = 3] = "Ins";
        StrKeysPXSp2[StrKeysPXSp2["Total"] = 4] = "Total";
    })(StrKeysPXSp2 = F01280.StrKeysPXSp2 || (F01280.StrKeysPXSp2 = {}));
    var ObasTablePXSp2 = (function (_super) {
        __extends(ObasTablePXSp2, _super);
        function ObasTablePXSp2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTablePXSp2.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var strKey = this.StrKey;
            var destFieldId = null;
            switch (strKey) {
                case StrKeysPXSp2.FotUsd:
                    destFieldId = ObasTableFields.FotUsdYearDataField.Id;
                    break;
                case StrKeysPXSp2.FotRub:
                    destFieldId = ObasTableFields.FotRubYearDataField.Id;
                    break;
                case StrKeysPXSp2.Ins:
                    destFieldId = ObasTableFields.InsuranceYearDataField.Id;
                    break;
            }
            if (destFieldId) {
                var yearOffset = ObasHelper.GetYearOffsetById(fieldId) + 1;
                destFieldId = destFieldId + yearOffset.toString();
                this.ParentTable.SetValueByKeys(destFieldId, this.ParentTable.GetKeys(StrKeysPXSp1.Calced), newValue);
            }
        };
        ObasTablePXSp2.prototype.ResetData = function (keys) {
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
        return ObasTablePXSp2;
    }(ObasTableWithStrKeysParent));
    F01280.ObasTablePXSp2 = ObasTablePXSp2;
    var StrKeysPXIndex;
    (function (StrKeysPXIndex) {
        StrKeysPXIndex[StrKeysPXIndex["Fot"] = 1] = "Fot";
        StrKeysPXIndex[StrKeysPXIndex["Other"] = 2] = "Other";
        StrKeysPXIndex[StrKeysPXIndex["Indexation"] = 3] = "Indexation";
        StrKeysPXIndex[StrKeysPXIndex["OtherNoIndex"] = 4] = "OtherNoIndex";
        StrKeysPXIndex[StrKeysPXIndex["Total"] = 5] = "Total";
    })(StrKeysPXIndex = F01280.StrKeysPXIndex || (F01280.StrKeysPXIndex = {}));
    var ObasTablePXBaseIndex = (function (_super) {
        __extends(ObasTablePXBaseIndex, _super);
        function ObasTablePXBaseIndex(id, document, parentTable, _insTable) {
            var _this = _super.call(this, id, document, parentTable) || this;
            _this._insTable = _insTable;
            return _this;
        }
        Object.defineProperty(ObasTablePXBaseIndex.prototype, "InsuranceTable", {
            get: function () {
                return this._insTable;
            },
            enumerable: true,
            configurable: true
        });
        ObasTablePXBaseIndex.prototype.ResetData = function (keys) {
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
        ObasTablePXBaseIndex.prototype.InitCopyFieldsInfo = function () {
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
        return ObasTablePXBaseIndex;
    }(ObasTableWithStrKeysParent));
    F01280.ObasTablePXBaseIndex = ObasTablePXBaseIndex;
    var ObasTablePXIndex = (function (_super) {
        __extends(ObasTablePXIndex, _super);
        function ObasTablePXIndex() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTablePXIndex.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var strKey = this.StrKey;
            var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
            switch (strKey) {
                case StrKeysPXIndex.Fot:
                case StrKeysPXIndex.Other:
                case StrKeysPXIndex.OtherNoIndex:
                    var fotVal = this.GetValueByKeys(fieldId, this.GetKeys(StrKeysPXIndex.Fot));
                    var otherVal = this.GetValueByKeys(fieldId, this.GetKeys(StrKeysPXIndex.Other));
                    var sumVal = fotVal + otherVal;
                    var indexVal = this.Document.CanCalcIndexation
                        ? this.Document.CommonRules.CalcIndexationByYear(sumVal, ObasStageSettings.CurrentYear + yearOffset)
                        : 0;
                    sumVal += indexVal;
                    var otherNoIndexVal = this.GetValueByKeys(fieldId, this.GetKeys(StrKeysPXIndex.OtherNoIndex));
                    sumVal += otherNoIndexVal;
                    this.SetValueByKeys(fieldId, this.GetKeys(StrKeysPXIndex.Indexation), indexVal);
                    this.SetValueByKeys(fieldId, this.GetKeys(StrKeysPXIndex.Total), sumVal);
                    break;
                case StrKeysPXIndex.Total:
                    this.InsuranceTable.SetFotValue(yearOffset, oldValue, newValue);
                    this.ParentTable.SetValueByKeys(fieldId, this.ParentTable.GetKeys(StrKeysPXSp2.FotRub), newValue);
                    break;
            }
        };
        ObasTablePXIndex.prototype.IsUserEditRow = function (strKey) {
            if (strKey === void 0) { strKey = this.StrKey; }
            return strKey === StrKeysPXIndex.Other || strKey === StrKeysPXIndex.OtherNoIndex;
        };
        ObasTablePXIndex.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount - 1;
            var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount;
            var yearField = BaseObasTableFields.YearDataField;
            var srcFieldId = yearField.GenerateId(srcIndex);
            var destFieldId = yearField.GenerateId(destIndex);
            var copy = function () {
                if (_this.IsUserEditRow()) {
                    _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
                }
            };
            this.Iterate(copy);
        };
        ObasTablePXIndex.prototype.CollectUserData = function () {
            var _this = this;
            var filter = function () {
                return _this.IsUserEditRow();
            };
            return this.CollectTableData(this.InitCopyFieldsInfo(), filter);
        };
        return ObasTablePXIndex;
    }(ObasTablePXBaseIndex));
    F01280.ObasTablePXIndex = ObasTablePXIndex;
    var StrKeysP4Index;
    (function (StrKeysP4Index) {
        StrKeysP4Index[StrKeysP4Index["Fot"] = 2] = "Fot";
        StrKeysP4Index[StrKeysP4Index["Indexation"] = 3] = "Indexation";
        StrKeysP4Index[StrKeysP4Index["Total"] = 1] = "Total";
    })(StrKeysP4Index = F01280.StrKeysP4Index || (F01280.StrKeysP4Index = {}));
    var ObasTableP4Index = (function (_super) {
        __extends(ObasTableP4Index, _super);
        function ObasTableP4Index() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP4Index.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var strKey = this.StrKey;
            var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
            switch (strKey) {
                case StrKeysP4Index.Fot:
                    var fotVal = this.GetValueByKeys(fieldId, this.GetKeys(StrKeysP4Index.Fot));
                    var sumVal = fotVal;
                    var indexVal = this.Document.CommonRules
                        .CalcIndexationByYear(sumVal, ObasStageSettings.CurrentYear + yearOffset);
                    sumVal += indexVal;
                    this.SetValueByKeys(fieldId, this.GetKeys(StrKeysP4Index.Indexation), indexVal);
                    this.SetValueByKeys(fieldId, this.GetKeys(StrKeysP4Index.Total), sumVal);
                    break;
                case StrKeysP4Index.Total:
                    this.InsuranceTable.SetFotValue(yearOffset, oldValue, newValue);
                    this.ParentTable.SetValueByKeys(fieldId, this.ParentTable.GetKeys(StrKeysPXSp2.FotRub), newValue);
                    break;
            }
        };
        return ObasTableP4Index;
    }(ObasTablePXBaseIndex));
    F01280.ObasTableP4Index = ObasTableP4Index;
    var ObasTablePXIns = (function (_super) {
        __extends(ObasTablePXIns, _super);
        function ObasTablePXIns() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTablePXIns.prototype.UpdateParentSum = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(StrKeysPXSp2.Ins), oldValue, newValue);
        };
        ObasTablePXIns.prototype.InnerSumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdateParentSum(tableId, oldValue, newValue, fieldId);
        };
        return ObasTablePXIns;
    }(InsuranceObasTable));
    F01280.ObasTablePXIns = ObasTablePXIns;
    var ObasTableOnlyInsurance = (function (_super) {
        __extends(ObasTableOnlyInsurance, _super);
        function ObasTableOnlyInsurance() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ObasTableOnlyInsurance;
    }(OnlyInsuranceObasTable));
    F01280.ObasTableOnlyInsurance = ObasTableOnlyInsurance;
    var ObasTablePXExecWrits = (function (_super) {
        __extends(ObasTablePXExecWrits, _super);
        function ObasTablePXExecWrits(id, _document, parentSumTable) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._parentSumTable = parentSumTable;
            return _this;
        }
        ObasTablePXExecWrits.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffSet = ObasHelper.GetYearOffsetById(fieldId);
            this.SetFieldValue("" + ObasTableFields.YearDataField.Id + (yearOffSet + 1), this._document.CommonRules.ConvertDollarToRuble(newValue, ObasStageSettings.CurrentYear + yearOffSet));
        };
        ObasTablePXExecWrits.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffset = ObasHelper.GetYearOffsetById(fieldId) + 1;
            this._parentSumTable.SetSumByKeys("" + ObasTableFields.FotUsdYearDataField.Id + yearOffset, this._parentSumTable.GetKeys(StrKeysPXSp1.Changed), oldValue, newValue);
        };
        ObasTablePXExecWrits.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                var fieldId = "" + ObasTableFields.YearDataField.Id + i;
                this.SumChangeEventHandler(this.Id, this.GetFieldValue(fieldId), 0, fieldId);
            }
        };
        ObasTablePXExecWrits.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount - 1;
            var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount;
            var usdField = BaseObasTableFields.UsdYearDataField;
            var srcUsdFieldId = usdField.GenerateId(srcIndex);
            var destUsdFieldId = usdField.GenerateId(destIndex);
            var copy = function () {
                _this.SetFieldValue(destUsdFieldId, _this.GetFieldValue(srcUsdFieldId));
            };
            this.Iterate(copy);
        };
        ObasTablePXExecWrits.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            var usdField = BaseObasTableFields.UsdYearDataField;
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                var fieldId = usdField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            return result;
        };
        ObasTablePXExecWrits.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        ObasTablePXExecWrits.prototype.ResetData = function () {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var usdField = BaseObasTableFields.UsdYearDataField;
            var resetDataHandler = function () {
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    _this.SetFieldValue(usdField.GenerateId(i), 0);
                    _this.SetFieldValue(yearField.GenerateId(i), 0);
                }
            };
            this.Iterate(resetDataHandler);
        };
        return ObasTablePXExecWrits;
    }(ObasTable));
    F01280.ObasTablePXExecWrits = ObasTablePXExecWrits;
    var CopyMode;
    (function (CopyMode) {
        CopyMode[CopyMode["All"] = 0] = "All";
        CopyMode[CopyMode["Usd"] = 1] = "Usd";
        CopyMode[CopyMode["Rub"] = 2] = "Rub";
    })(CopyMode = F01280.CopyMode || (F01280.CopyMode = {}));
    var ObasTablePXBaseSp3 = (function (_super) {
        __extends(ObasTablePXBaseSp3, _super);
        function ObasTablePXBaseSp3(id, document, _tableFot, _tableIndexation, _tableInsurance) {
            var _this = _super.call(this, id, [
                ObasTableFields.YearField.Id,
                ObasTableFields.PositionField.Id
            ], document) || this;
            _this._tableFot = _tableFot;
            _this._tableIndexation = _tableIndexation;
            _this._tableInsurance = _tableInsurance;
            _this._positionKeyField = null;
            _this._fieldIds = null;
            _this._checkFieldIds = null;
            _this._copyUsdData = null;
            _this._copyRubData = null;
            _this._copyAllData = null;
            _this._isCopiedFieldUsd = null;
            _this._isCopiedFieldRub = null;
            _this._yearField = new ObasTableField(ObasTableFields.YearField.Id, _this, true);
            _this._rubFotDataField = new ObasTableField("RubTotalFot", _this);
            _this._usdFotDataField = new ObasTableField("UsdTotalFot", _this);
            _this._usdDataField = new ObasTableField("UsdFot", _this);
            _this._usdEmplCountField = new ObasTableField("UsdEmplNumber", _this);
            _this._rubEmplCountField = new ObasTableField("RubEmplNumber", _this);
            return _this;
        }
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "IsCopiedFieldRub", {
            get: function () {
                if (this._isCopiedFieldRub == null) {
                    this
                        ._isCopiedFieldRub = new ObasTableField(ObasTableFields.CopiedRubRowFlagField.Id, this, true);
                }
                return this._isCopiedFieldRub;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "IsCopiedFieldUsd", {
            get: function () {
                if (this._isCopiedFieldUsd == null) {
                    this
                        ._isCopiedFieldUsd = new ObasTableField(ObasTableFields.CopiedUsdRowFlagField.Id, this, true);
                }
                return this._isCopiedFieldUsd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "CheckFieldIds", {
            get: function () {
                var strCodeFieldId = ObasTableFields.StrCodeField.Id.toLowerCase();
                if (this._checkFieldIds == null) {
                    this._checkFieldIds = this.FieldIds.filter(function (value) {
                        return value !== strCodeFieldId;
                    });
                }
                return this._checkFieldIds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "FieldIds", {
            get: function () {
                if (this._fieldIds == null) {
                    this._fieldIds = this.GetFieldsIds();
                }
                return this._fieldIds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "TableFot", {
            get: function () {
                return this._tableFot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "TableIndexation", {
            get: function () {
                return this._tableIndexation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "TableInsurance", {
            get: function () {
                return this._tableInsurance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "Year", {
            get: function () {
                return this._yearField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "PositionKey", {
            get: function () {
                if (this._positionKeyField == null) {
                    this._positionKeyField = new ObasTableField(ObasTableFields.PositionField.Id, this);
                }
                return this._positionKeyField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "UsdData", {
            get: function () {
                return this._usdDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "UsdFotData", {
            get: function () {
                return this._usdFotDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "RubFotData", {
            get: function () {
                return this._rubFotDataField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "UsdEmplCountField", {
            get: function () {
                return this._usdEmplCountField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "RubEmplCountField", {
            get: function () {
                return this._rubEmplCountField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "CopyUsdFieldsInfo", {
            get: function () {
                if (this._copyUsdData == null) {
                    this._copyUsdData = this.InitUsdCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyUsdData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "CopyRubFieldsInfo", {
            get: function () {
                if (this._copyRubData == null) {
                    this._copyRubData = this.InitRubCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyRubData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "CopyAllFieldsInfo", {
            get: function () {
                if (this._copyAllData == null) {
                    this._copyAllData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyAllData);
            },
            enumerable: true,
            configurable: true
        });
        ObasTablePXBaseSp3.prototype.CalcPercent = function (value) {
            return value / 100;
        };
        ObasTablePXBaseSp3.prototype.IsRedyForCopyUsd = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyUsdFieldsInfo);
        };
        ObasTablePXBaseSp3.prototype.IsRedyForCopyRub = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyRubFieldsInfo);
        };
        ObasTablePXBaseSp3.prototype.IsRedyForCopyAll = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyAllFieldsInfo);
        };
        ObasTablePXBaseSp3.prototype.GetKeys = function (year, positionKey) {
            if (year === void 0) { year = this.Year.Value; }
            if (positionKey === void 0) { positionKey = this.PositionKey.Value; }
            if (this._keys == null) {
                this._keys = new YearPostObasTableKeys(year, positionKey);
            }
            else {
                this._keys.Year = year;
                this._keys.PositionKey = positionKey;
            }
            return this._keys;
        };
        ObasTablePXBaseSp3.prototype.CopyData = function (srcYear, destYear) {
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
                        _this.InnerCopyData(recordKey, destYear, CopyMode.All);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        ObasTablePXBaseSp3.prototype.InnerCopyData = function (recordKey, endYear, mode) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                var copyData = void 0;
                switch (mode) {
                    case CopyMode.Usd:
                        this.IsCopiedFieldUsd.Value = true;
                        copyData = this.CopyUsdFieldsInfo;
                        break;
                    case CopyMode.Rub:
                        this.IsCopiedFieldRub.Value = true;
                        copyData = this.CopyRubFieldsInfo;
                        break;
                    default:
                        this.IsCopiedFieldUsd.Value = true;
                        this.IsCopiedFieldRub.Value = true;
                        copyData = this.CopyAllFieldsInfo;
                }
                var keys = this.GetKeys();
                var yearVal = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yearVal.Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), false);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        ObasTablePXBaseSp3.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate) {
                var copyMode = null;
                var canCopyUsd = !this.IsCopiedFieldUsd.Value && this.IsRedyForCopyUsd();
                var canCopyRub = !this.IsCopiedFieldRub.Value && this.IsRedyForCopyRub();
                if (canCopyUsd && canCopyRub) {
                    copyMode = CopyMode.All;
                }
                else if (canCopyUsd) {
                    copyMode = CopyMode.Usd;
                }
                else if (canCopyRub) {
                    copyMode = CopyMode.Rub;
                }
                if (copyMode != null) {
                    this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1, copyMode);
                }
            }
        };
        ObasTablePXBaseSp3.prototype.InitCopyFieldsInfo = function () {
            var result = this.InitUsdCopyFieldsInfo();
            var addFields = this.InitRubCopyFieldsInfo();
            if (addFields && addFields.size() > 0) {
                addFields.forEach(function (key, val) {
                    if (!result.containsKey(key)) {
                        result.setValue(key, val);
                    }
                });
            }
            return result;
        };
        ObasTablePXBaseSp3.prototype.UsdEmplNumberChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UsdFotPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
            this.TableInsurance.SetCountValue(this.YearOffset, oldValue, newValue);
        };
        ObasTablePXBaseSp3.prototype.RubEmplNumberChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TableInsurance.SetCountValue(this.YearOffset, oldValue, newValue);
            this.PositionChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        ObasTablePXBaseSp3.prototype.UsdChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._usdFotDataField.Value = this.Document.CommonRules.ConvertDollarToRuble(newValue, this.Year.Value);
        };
        Object.defineProperty(ObasTablePXBaseSp3.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        ObasTablePXBaseSp3.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TableFot.SetSumByKeys(this.GenerateYearField(), this.TableFot.GetKeys(StrKeysPXSp2.FotUsd), oldValue, newValue);
        };
        ObasTablePXBaseSp3.prototype.GenerateYearField = function () {
            return ObasTableFields.YearDataField.GenerateId(this.YearOffset + 1);
        };
        ObasTablePXBaseSp3.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            this.UsdEmplCountField.Value = 0;
            this.RubEmplCountField.Value = 0;
        };
        ObasTablePXBaseSp3.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        ObasTablePXBaseSp3.prototype.ResetData = function (keys) {
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    this.InnerResetData(this, this.RecordKey.Value);
                }
            }
            else {
                this.Iterate(this.InnerResetData);
            }
        };
        return ObasTablePXBaseSp3;
    }(ObasTableWithKeys));
    F01280.ObasTablePXBaseSp3 = ObasTablePXBaseSp3;
    var ObasTablePXSp3 = (function (_super) {
        __extends(ObasTablePXSp3, _super);
        function ObasTablePXSp3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTablePXSp3.prototype.TotalFotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TableIndexation.SetSumByKeys(this.GenerateYearField(), this.TableIndexation.GetKeys(StrKeysPXIndex.Fot), oldValue, newValue);
        };
        return ObasTablePXSp3;
    }(ObasTablePXBaseSp3));
    F01280.ObasTablePXSp3 = ObasTablePXSp3;
    var ObasTableP2Sp3 = (function (_super) {
        __extends(ObasTableP2Sp3, _super);
        function ObasTableP2Sp3(id, document, tableFot, tableIndexation, tableInsurance, _uniqPosTable) {
            var _this = _super.call(this, id, document, tableFot, tableIndexation, tableInsurance) || this;
            _this._uniqPosTable = _uniqPosTable;
            _this._positionKey = null;
            return _this;
        }
        Object.defineProperty(ObasTableP2Sp3.prototype, "RubEmplCountField", {
            get: function () {
                return this.UsdEmplCountField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Sp3.prototype, "CountMonth", {
            get: function () {
                return this.GetFieldValue("CountMonth");
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP2Sp3.prototype.UsdFotPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UsdData.Value = this.CountMonth *
                this.UsdEmplCountField.Value *
                this.GetFieldValue("g5") *
                (this.GetFieldValue("g6") + this.CalcPercent(this.GetFieldValue("g7")) + this.CalcPercent(this.GetFieldValue("g8")) + 1);
        };
        ObasTableP2Sp3.prototype.InitUsdCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopiedFieldUsd.Id, {
                Id: this.IsCopiedFieldUsd.Id,
                IsData: false
            });
            result.setValue(this.PositionKey.Id, {
                Id: this.PositionKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue(this.UsdEmplCountField.Id, {
                Id: this.UsdEmplCountField.Id,
                IsData: true
            });
            result.setValue("CountMonth", {
                Id: "CountMonth",
                IsData: true
            });
            for (var i = 5; i < 9; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP2Sp3.prototype.InitRubCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            return result;
        };
        ObasTableP2Sp3.prototype.PositionChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.AfterDeleteEventHandler(tableId, oldValue);
            this.Document.CommonRules.AddNewLink(this._uniqPosTable.Id, this._uniqPosTable.KeyFieldIds, [newValue]);
        };
        ObasTableP2Sp3.prototype.DeleteEventHandler = function (tableId) {
            this._positionKey = this.PositionKey.Value;
        };
        ObasTableP2Sp3.prototype.AfterDeleteEventHandler = function (tableId, positionKey) {
            if (positionKey === void 0) { positionKey = this._positionKey; }
            this.Document.CommonRules.DeleteOldLink(this._uniqPosTable.Id, [this.Id], this._uniqPosTable.UniqIndexFieldIds, [positionKey]);
        };
        ObasTableP2Sp3.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("UsdEmplNumber", 0);
            table.SetFieldValue("UsdFot", 0);
            table.SetFieldValue("UsdTotalFot", 0);
            for (var i = 5; i < 9; i++) {
                table.SetFieldValue("g" + i, 0);
            }
        };
        ObasTableP2Sp3.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.CountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.UsdFotPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("CountMonth", oldValue);
            }
        };
        return ObasTableP2Sp3;
    }(ObasTablePXSp3));
    F01280.ObasTableP2Sp3 = ObasTableP2Sp3;
    var ObasTableP3Sp3 = (function (_super) {
        __extends(ObasTableP3Sp3, _super);
        function ObasTableP3Sp3() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._salary = null;
            return _this;
        }
        Object.defineProperty(ObasTableP3Sp3.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this._salary = new ObasTableField("g7_3_7", this);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP3Sp3.prototype, "RubEmplCountField", {
            get: function () {
                return this.UsdEmplCountField;
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP3Sp3.prototype.InitG15P3Sp7 = function () {
            return 2;
        };
        ObasTableP3Sp3.prototype.InitG16P3Sp7 = function () {
            return 3;
        };
        Object.defineProperty(ObasTableP3Sp3.prototype, "UsdCountMonth", {
            get: function () {
                return this.GetFieldValue("UsdCountMonth");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP3Sp3.prototype, "RubCountMonth", {
            get: function () {
                return this.GetFieldValue("RubCountMonth");
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP3Sp3.prototype.UsdFotPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UsdData.Value = this.UsdCountMonth *
                this.UsdEmplCountField.Value *
                this.GetFieldValue("g7") *
                (this.CalcPercent(this.GetFieldValue("g8")) +
                    this.CalcPercent(this.GetFieldValue("g9")) +
                    this.CalcPercent(this.GetFieldValue("g10")) +
                    this.CalcPercent(this.GetFieldValue("g11")) +
                    1);
        };
        ObasTableP3Sp3.prototype.UpdatePayment = function (fieldIndex) {
            this.SetFieldValue("g" + fieldIndex + "_3_8", this.RubCountMonth * this.UsdEmplCountField.Value * this.GetFieldValue("g" + fieldIndex + "_3_7"));
        };
        ObasTableP3Sp3.prototype.InitUsdCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            var order = 1;
            result.setValue(this.IsCopiedFieldUsd.Id, {
                Id: this.IsCopiedFieldUsd.Id,
                IsData: false,
                Order: order++
            });
            result.setValue(this.PositionKey.Id, {
                Id: this.PositionKey.Id,
                IsData: false,
                Order: order++
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            for (var i = 7; i < 12; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true,
                    Order: order++
                });
            }
            result.setValue(this.UsdEmplCountField.Id, {
                Id: this.UsdEmplCountField.Id,
                IsData: true,
                Order: 1000
            });
            result.setValue("UsdCountMonth", {
                Id: "UsdCountMonth",
                IsData: true
            });
            return result;
        };
        ObasTableP3Sp3.prototype.InitRubCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            var order = 1;
            result.setValue(this.IsCopiedFieldRub.Id, {
                Id: this.IsCopiedFieldRub.Id,
                IsData: false,
                Order: order++
            });
            result.setValue(this.PositionKey.Id, {
                Id: this.PositionKey.Id,
                IsData: false,
                Order: order++
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue("g8_3_7", {
                Id: "g8_3_7",
                IsData: true,
                Order: order++
            });
            result.setValue("g15_3_7", {
                Id: "g15_3_7",
                IsData: true,
                Order: order++
            });
            result.setValue("g16_3_7", {
                Id: "g16_3_7",
                IsData: true,
                Order: order++
            });
            result.setValue("RubCountMonth", {
                Id: "RubCountMonth",
                IsData: true
            });
            return result;
        };
        ObasTableP3Sp3.prototype.PositionChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UpdatePayment(7);
            this.UpdatePayment(8);
            var salary = this.UsdEmplCountField.Value * this.Salary.Value;
            for (var i = 10; i < 14; i++) {
                this.SetFieldValue("g" + i + "_3_8", salary * this.GetFieldValue("g" + i + "_3_7") * (this.RubCountMonth / 12));
            }
            salary = (this.GetFieldValue("g10_3_7") / 12 + 1) * salary;
            for (var i = 15; i < 17; i++) {
                this.SetFieldValue("g" + i + "_3_8", salary * this.GetFieldValue("g" + i + "_3_7") * (this.RubCountMonth / 12));
            }
            var fotSum = 0;
            var awardSumSalary = 0;
            var awardSumCount = 0;
            for (var i = 7; i < 17; i++) {
                if (i !== 9 && i !== 14) {
                    var value = this.GetFieldValue("g" + i + "_3_8");
                    if (i > 9 && i < 14) {
                        awardSumSalary += value;
                    }
                    else if (i > 14) {
                        awardSumCount += value;
                    }
                    fotSum += value;
                }
            }
            this.SetFieldValue("g9_3_8", awardSumSalary);
            this.SetFieldValue("g14_3_8", awardSumCount);
            this.RubFotData.Value = fotSum * 0.5;
        };
        ObasTableP3Sp3.prototype.UsdEmplNumberChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            _super.prototype.UsdEmplNumberChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
            this.RubEmplNumberChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        ObasTableP3Sp3.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("UsdEmplNumber", 0);
            table.SetFieldValue("UsdFot", 0);
            table.SetFieldValue("UsdTotalFot", 0);
            table.SetFieldValue("RubTotalFot", 0);
            for (var i = 7; i < 17; i++) {
                if (i >= 7 && i <= 11) {
                    table.SetFieldValue("g" + i, 0);
                }
                if (i === 8 || i === 9 || (i >= 14 && i <= 16)) {
                    table.SetFieldValue("g" + i + "_3_7", 0);
                }
                table.SetFieldValue("g" + i + "_3_8", 0);
            }
        };
        ObasTableP3Sp3.prototype.UsdCountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.UsdCountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.UsdFotPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("UsdCountMonth", oldValue);
            }
        };
        ObasTableP3Sp3.prototype.RubCountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.RubCountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.PositionChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("RubCountMonth", oldValue);
            }
        };
        return ObasTableP3Sp3;
    }(ObasTablePXSp3));
    F01280.ObasTableP3Sp3 = ObasTableP3Sp3;
    var ObasTableP5Sp3 = (function (_super) {
        __extends(ObasTableP5Sp3, _super);
        function ObasTableP5Sp3() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._salary = null;
            return _this;
        }
        Object.defineProperty(ObasTableP5Sp3.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this._salary = new ObasTableField("g5_5_5", this);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP5Sp3.prototype, "UsdCountMonth", {
            get: function () {
                return this.GetFieldValue("UsdCountMonth");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP5Sp3.prototype, "RubCountMonth", {
            get: function () {
                return this.GetFieldValue("RubCountMonth");
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP5Sp3.prototype.UsdFotPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UsdData.Value = this.UsdCountMonth *
                this.UsdEmplCountField.Value * this.GetFieldValue("g5") * (this.CalcPercent(this.GetFieldValue("g6")) + 1);
        };
        ObasTableP5Sp3.prototype.InitG7P5Sp5 = function () {
            return 10;
        };
        ObasTableP5Sp3.prototype.InitG9P5Sp5 = function () {
            return 3;
        };
        ObasTableP5Sp3.prototype.InitUsdCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            var order = 1;
            result.setValue(this.IsCopiedFieldUsd.Id, {
                Id: this.IsCopiedFieldUsd.Id,
                IsData: false,
                Order: order++
            });
            result.setValue(this.PositionKey.Id, {
                Id: this.PositionKey.Id,
                IsData: false,
                Order: order++
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            for (var i = 5; i < 7; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true,
                    Order: order++
                });
            }
            result.setValue(this.UsdEmplCountField.Id, {
                Id: this.UsdEmplCountField.Id,
                IsData: true,
                Order: 1000
            });
            result.setValue("UsdCountMonth", {
                Id: "UsdCountMonth",
                IsData: true
            });
            return result;
        };
        ObasTableP5Sp3.prototype.InitRubCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            var order = 1;
            result.setValue(this.IsCopiedFieldRub.Id, {
                Id: this.IsCopiedFieldRub.Id,
                IsData: false,
                Order: order++
            });
            result.setValue(this.PositionKey.Id, {
                Id: this.PositionKey.Id,
                IsData: false,
                Order: order++
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue("g7_5_5", {
                Id: "g7_5_5",
                IsData: true,
                Order: order++
            });
            result.setValue("g9_5_5", {
                Id: "g9_5_5",
                IsData: true,
                Order: order++
            });
            result.setValue(this.RubEmplCountField.Id, {
                Id: this.RubEmplCountField.Id,
                IsData: true,
                Order: 1001
            });
            result.setValue("RubCountMonth", {
                Id: "RubCountMonth",
                IsData: true
            });
            return result;
        };
        ObasTableP5Sp3.prototype.PositionChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var salary = this.RubEmplCountField.Value * this.Salary.Value;
            var fot = salary * this.RubCountMonth;
            this.SetFieldValue("g5_5_6", fot);
            for (var i = 7; i < 12; i++) {
                this.SetFieldValue("g" + i + "_5_6", salary * this.GetFieldValue("g" + i + "_5_5") * (this.RubCountMonth / 12));
            }
            var sum = 0;
            for (var i = 7; i < 12; i++) {
                sum += this.GetFieldValue("g" + i + "_5_6");
            }
            this.SetFieldValue("g6_5_6", sum);
            sum += fot;
            this.RubFotData.Value = sum * 0.5;
        };
        ObasTableP5Sp3.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("UsdEmplNumber", 0);
            table.SetFieldValue("UsdFot", 0);
            table.SetFieldValue("UsdTotalFot", 0);
            table.SetFieldValue("RubEmplNumber", 0);
            table.SetFieldValue("RubTotalFot", 0);
            for (var i = 5; i < 12; i++) {
                if (i === 5 || i === 6) {
                    table.SetFieldValue("g" + i, 0);
                }
                if (i === 6 || i === 7 || i === 9) {
                    table.SetFieldValue("g" + i + "_5_5", 0);
                }
                table.SetFieldValue("g" + i + "_5_6", 0);
            }
        };
        ObasTableP5Sp3.prototype.UsdCountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.UsdCountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.UsdFotPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("UsdCountMonth", oldValue);
            }
        };
        ObasTableP5Sp3.prototype.RubCountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.RubCountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.PositionChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("RubCountMonth", oldValue);
            }
        };
        return ObasTableP5Sp3;
    }(ObasTablePXSp3));
    F01280.ObasTableP5Sp3 = ObasTableP5Sp3;
    var ObasTableP4Sp3 = (function (_super) {
        __extends(ObasTableP4Sp3, _super);
        function ObasTableP4Sp3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObasTableP4Sp3.prototype.TotalFotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.TableIndexation.SetSumByKeys(this.GenerateYearField(), this.TableIndexation.GetKeys(StrKeysP4Index.Fot), oldValue, newValue);
        };
        Object.defineProperty(ObasTableP4Sp3.prototype, "UsdCountMonth", {
            get: function () {
                return this.GetFieldValue("UsdCountMonth");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP4Sp3.prototype, "RubCountMonth", {
            get: function () {
                return this.GetFieldValue("RubCountMonth");
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP4Sp3.prototype.UsdFotPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.UsdData.Value = this.UsdCountMonth *
                this.UsdEmplCountField.Value * (this.GetFieldValue("g6") + this.GetFieldValue("g7"));
        };
        ObasTableP4Sp3.prototype.PositionChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var salary = 0;
            for (var i = 6; i < 9; i++) {
                salary += this.GetFieldValue("g" + i + "_4_6");
            }
            this.SetFieldValue("g5_4_6", salary);
            this.RubFotData.Value = this.RubCountMonth * this.RubEmplCountField.Value * salary;
        };
        ObasTableP4Sp3.prototype.InitUsdCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopiedFieldUsd.Id, {
                Id: this.IsCopiedFieldUsd.Id,
                IsData: false
            });
            result.setValue(this.PositionKey.Id, {
                Id: this.PositionKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue(this.UsdEmplCountField.Id, {
                Id: this.UsdEmplCountField.Id,
                IsData: true
            });
            for (var i = 6; i < 8; i++) {
                result.setValue("g" + i, {
                    Id: "g" + i,
                    IsData: true
                });
            }
            result.setValue("UsdCountMonth", {
                Id: "UsdCountMonth",
                IsData: true
            });
            return result;
        };
        ObasTableP4Sp3.prototype.InitRubCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.IsCopiedFieldRub.Id, {
                Id: this.IsCopiedFieldRub.Id,
                IsData: false
            });
            result.setValue(this.PositionKey.Id, {
                Id: this.PositionKey.Id,
                IsData: false
            });
            result.setValue(this.Year.Id, {
                Id: this.Year.Id,
                IsData: false
            });
            result.setValue(this.RubEmplCountField.Id, {
                Id: this.RubEmplCountField.Id,
                IsData: true
            });
            for (var i = 6; i < 9; i++) {
                result.setValue("g" + i + "_4_6", {
                    Id: "g" + i + "_4_6",
                    IsData: true
                });
            }
            result.setValue("RubCountMonth", {
                Id: "RubCountMonth",
                IsData: true
            });
            return result;
        };
        ObasTableP4Sp3.prototype.InnerResetData = function (table, recordKey) {
            table.SetFieldValue("UsdEmplNumber", 0);
            table.SetFieldValue("UsdFot", 0);
            table.SetFieldValue("UsdTotalFot", 0);
            table.SetFieldValue("RubEmplNumber", 0);
            table.SetFieldValue("RubTotalFot", 0);
            for (var i = 5; i < 9; i++) {
                if (i < 8) {
                    table.SetFieldValue("g" + i, 0);
                }
                table.SetFieldValue("g" + i + "_4_6", 0);
            }
        };
        ObasTableP4Sp3.prototype.UsdCountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.UsdCountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.UsdFotPartsChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("UsdCountMonth", oldValue);
            }
        };
        ObasTableP4Sp3.prototype.RubCountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var countMonth = this.RubCountMonth;
            if (countMonth >= 0 && countMonth <= 12) {
                this.PositionChangeEventHandler(tableId, oldValue, newValue, fieldId);
            }
            else {
                Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                this.SetFieldValue("RubCountMonth", oldValue);
            }
        };
        return ObasTableP4Sp3;
    }(ObasTablePXBaseSp3));
    F01280.ObasTableP4Sp3 = ObasTableP4Sp3;
    var ObasTableP2Sp6 = (function (_super) {
        __extends(ObasTableP2Sp6, _super);
        function ObasTableP2Sp6(_parentTable, _tableInsurance) {
            var _this = _super.call(this, "F01_280_r2_5_V2", [ObasTableFields.PositionField.Id]) || this;
            _this._parentTable = _parentTable;
            _this._tableInsurance = _tableInsurance;
            _this._document = null;
            _this._positionKeyField = null;
            _this._uniqIndexFieldIds = [ObasTableFields.PositionField.Id];
            return _this;
        }
        Object.defineProperty(ObasTableP2Sp6.prototype, "UniqIndexFieldIds", {
            get: function () {
                return this._uniqIndexFieldIds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Sp6.prototype, "Document", {
            get: function () {
                if (this._document == null) {
                    this._document = this._parentTable.Document;
                }
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Sp6.prototype, "ParentTable", {
            get: function () {
                return this._parentTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Sp6.prototype, "PositionKeyField", {
            get: function () {
                if (this._positionKeyField == null) {
                    this._positionKeyField = new ObasTableField(ObasTableFields.PositionField.Id, this);
                }
                return this._positionKeyField;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObasTableP2Sp6.prototype, "TableInsurance", {
            get: function () {
                return this._tableInsurance;
            },
            enumerable: true,
            configurable: true
        });
        ObasTableP2Sp6.prototype.UpdateFot = function (yearOffset) {
            this.SetFieldValue(ObasTableFields.YearDataField.GenerateId(yearOffset),
                this.GetFieldValue("CountMonth_Y" + yearOffset) *
                this.GetFieldValue(ObasTableFields.CountYearDataField.GenerateId(yearOffset)) *
                this.GetFieldValue("Pay_Y" + yearOffset));
        };
        ObasTableP2Sp6.prototype.RubEmplNumberChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
            this.TableInsurance.SetCountValue(yearOffset, oldValue, newValue);
            this.UpdateFot(yearOffset + 1);
        };
        ObasTableP2Sp6.prototype.PositionChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                this.UpdateFot(i);
            }
        };
        ObasTableP2Sp6.prototype.TotalFotChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(StrKeysPXIndex.Fot), oldValue, newValue);
        };
        ObasTableP2Sp6.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                this.SetFieldValue(ObasTableFields.CountYearDataField.GenerateId(i), 0);
            }
        };
        ObasTableP2Sp6.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var srcIndex = srcYear ? srcYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount - 1;
            var destIndex = destYear ? destYear - ObasStageSettings.CurrentYear + 1 : ObasStageSettings.YearsCount;
            var yearField = BaseObasTableFields.CountYearDataField;
            var srcFieldId = yearField.GenerateId(srcIndex);
            var destFieldId = yearField.GenerateId(destIndex);
            var copy = function () {
                _this.SetFieldValue(destFieldId, _this.GetFieldValue(srcFieldId));
            };
            this.Iterate(copy);
        };
        ObasTableP2Sp6.prototype.InitCopyFieldsInfo = function () {
            var result = new collections.Dictionary();
            result.setValue(this.PositionKeyField.Id, {
                Id: this.PositionKeyField.Id,
                IsData: false
            });
            var countField = BaseObasTableFields.CountYearDataField;
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                var fieldId = countField.GenerateId(i);
                result.setValue(fieldId, {
                    Id: fieldId,
                    IsData: true
                });
            }
            return result;
        };
        ObasTableP2Sp6.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        ObasTableP2Sp6.prototype.ResetData = function () {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            var countField = BaseObasTableFields.CountYearDataField;
            var resetDataHandler = function () {
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    _this.SetFieldValue(countField.GenerateId(i), 0);
                    _this.SetFieldValue(yearField.GenerateId(i), 0);
                }
            };
            this.Iterate(resetDataHandler);
        };
        ObasTableP2Sp6.prototype.CountMonthChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (fieldId.indexOf("CountMonth") === 0) {
                var countMonth = this.GetFieldValue(fieldId);
                if (countMonth >= 0 && countMonth <= 12) {
                    this.PositionChangeEventHandler(tableId, oldValue, newValue, fieldId);
                }
                else {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u00AB\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432\u00BB \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 0 \u0434\u043E 12.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
        };
        return ObasTableP2Sp6;
    }(ObasTable));
    F01280.ObasTableP2Sp6 = ObasTableP2Sp6;
    var StrTransposedObasTable = (function (_super) {
        __extends(StrTransposedObasTable, _super);
        function StrTransposedObasTable(id, _document) {
            var _this = _super.call(this, id, null, [ObasTableFields.OrgKeyField.Id], [ObasTableFields.StrKeyField.Id]) || this;
            _this._document = _document;
            return _this;
        }
        StrTransposedObasTable.prototype.GetFieldsCount = function () {
            if (this.FieldsCount == null) {
                this.FieldsCount = this._document.RowPartsCount;
            }
            return this.FieldsCount;
        };
        StrTransposedObasTable.prototype.GetFieldIndexEventHandler = function (strKey) {
            return strKey;
        };
        StrTransposedObasTable.prototype.GetFieldValueEventHandler = function (fieldIndex, fieldId) {
            return fieldId === ObasTableFields.StrKeyField.Id ? fieldIndex : undefined;
        };
        return StrTransposedObasTable;
    }(TransposedObasTable));
    F01280.StrTransposedObasTable = StrTransposedObasTable;
    var PositionsSpr0116 = (function (_super) {
        __extends(PositionsSpr0116, _super);
        function PositionsSpr0116() {
            var _this = _super.call(this, "Spr_01_16") || this;
            _this._salary = null;
            return _this;
        }
        Object.defineProperty(PositionsSpr0116.prototype, "Salary", {
            get: function () {
                if (this._salary == null) {
                    this._salary = new ObasTableField("Salary", this);
                }
                return this._salary;
            },
            enumerable: true,
            configurable: true
        });
        return PositionsSpr0116;
    }(SprTable));
    F01280.PositionsSpr0116 = PositionsSpr0116;
})(F01280 || (F01280 = {}));
