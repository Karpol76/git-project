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
var F05325;
(function (F05325) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05325.TableRules = TableRules;
    var SubjectTableKeys = (function (_super) {
        __extends(SubjectTableKeys, _super);
        function SubjectTableKeys(SubjectKey) {
            var _this = _super.call(this) || this;
            _this.SubjectKey = SubjectKey;
            return _this;
        }
        return SubjectTableKeys;
    }(ObasTableKeys));
    var SubjectsTable = (function (_super) {
        __extends(SubjectsTable, _super);
        function SubjectsTable(id, document) {
            var _this = _super.call(this, id, ["SubjectName_ID"], document) || this;
            _this._subject = null;
            return _this;
        }
        Object.defineProperty(SubjectsTable.prototype, "Subject", {
            get: function () {
                if (this._subject == null) {
                    this._subject = new ObasSprTableField(ObasTableCollection.SprSubject, this);
                }
                return this._subject;
            },
            enumerable: true,
            configurable: true
        });
        SubjectsTable.prototype.GetKeys = function (subjectKey) {
            if (subjectKey === void 0) { subjectKey = this.Subject.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new SubjectTableKeys(subjectKey);
            }
            else {
                this._keys.SubjectKey = subjectKey;
            }
            return this._keys;
        };
        return SubjectsTable;
    }(ObasTableWithKeys));
    F05325.SubjectsTable = SubjectsTable;
    var SubjectDataTable = (function (_super) {
        __extends(SubjectDataTable, _super);
        function SubjectDataTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SubjectDataTable.prototype, "Subject", {
            get: function () {
                return this.OwnerKey.SourceTable.Subject;
            },
            enumerable: true,
            configurable: true
        });
        return SubjectDataTable;
    }(ObasTableWithKeysParent));
    var P3DataTable = (function (_super) {
        __extends(P3DataTable, _super);
        function P3DataTable(id, document, parentTable) {
            return _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id], document, parentTable) || this;
        }
        Object.defineProperty(P3DataTable, "PayField", {
            get: function () {
                if (this._payField == null) {
                    this._payField = new BaseGenericObasTableField("Pay_Y");
                }
                return this._payField;
            },
            enumerable: true,
            configurable: true
        });
        P3DataTable.prototype.TotalPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SetFieldValue(BaseObasTableFields.YearDataField.GenerateId(fieldId), (this.GetFieldValue(P3DataTable.PayField.GenerateId(fieldId)) || 0) *
                (this.GetFieldValue(BaseObasTableFields.CountYearDataField.GenerateId(fieldId)) || 0));
        };
        P3DataTable.prototype.GetKeys = function (subjectKey) {
            if (subjectKey === void 0) { subjectKey = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new SubjectTableKeys(subjectKey);
            }
            else {
                this._keys.SubjectKey = subjectKey;
            }
            return this._keys;
        };
        P3DataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [P3DataTable.PayField, BaseObasTableFields.CountYearDataField, BaseObasTableFields.YearDataField]);
        };
        return P3DataTable;
    }(SubjectDataTable));
    P3DataTable._payField = null;
    F05325.P3DataTable = P3DataTable;
    var YearSubjectTableKeys = (function (_super) {
        __extends(YearSubjectTableKeys, _super);
        function YearSubjectTableKeys(subjectKey, Year) {
            var _this = _super.call(this, subjectKey) || this;
            _this.Year = Year;
            return _this;
        }
        return YearSubjectTableKeys;
    }(SubjectTableKeys));
    var YearSubjectDataTable = (function (_super) {
        __extends(YearSubjectDataTable, _super);
        function YearSubjectDataTable(id, document, parentTable, _sumTable, _sumField) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, BaseObasTableFields.YearField.Id], document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._sumField = _sumField;
            _this._year = null;
            _this._total = null;
            _this._isCopied = null;
            _this._copyData = null;
            return _this;
        }
        Object.defineProperty(YearSubjectDataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YearSubjectDataTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberObasTableField("Total", this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YearSubjectDataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YearSubjectDataTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.NValue - ObasStageSettings.CurrentYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YearSubjectDataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        YearSubjectDataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        YearSubjectDataTable.prototype.TotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetValueByKeys(this._sumField.GenerateId(this.YearOffset + 1), this._sumTable.GetKeys(this.OwnerKey.Value), newValue);
        };
        YearSubjectDataTable.prototype.GetKeys = function (subjectKey, year) {
            if (subjectKey === void 0) { subjectKey = this.OwnerKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new YearSubjectTableKeys(subjectKey, year);
            }
            else {
                this._keys.SubjectKey = subjectKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        YearSubjectDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        YearSubjectDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        YearSubjectDataTable.prototype.ResetData = function (keys) {
            var _this = this;
            if (keys) {
                if (this.LocateByKeys(keys.ToArray())) {
                    this.ResetDataHandler();
                }
            }
            else {
                this.Iterate(function () { _this.ResetDataHandler(); });
            }
        };
        YearSubjectDataTable.prototype.CopyData = function (srcYear, destYear) {
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
        YearSubjectDataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    copyData.getValue(this.Year.Id).Value =
                        keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.RecordKey.Locate(recordKey);
            }
        };
        YearSubjectDataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        return YearSubjectDataTable;
    }(SubjectDataTable));
    var P4DataTable = (function (_super) {
        __extends(P4DataTable, _super);
        function P4DataTable(id, document, parentTable, sumTable) {
            var _this = _super.call(this, id, document, parentTable, sumTable, P3DataTable.PayField) || this;
            _this._averagePayment = null;
            _this._communicationCost = null;
            _this._transportCost = null;
            _this._utilitiesCost = null;
            _this._travelCost = null;
            _this._inventoryCost = null;
            _this._rentCost = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P4DataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Year, this.OwnerKey, this.AveragePayment, this.CommunicationCost, this.TransportCost,
                        this.UtilitiesCost, this.TravelCost, this.InventoryCost, this.RentCost
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4DataTable.prototype, "RentCost", {
            get: function () {
                if (this._rentCost == null) {
                    this._rentCost = new NumberObasTableField("RentCost", this);
                }
                return this._rentCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4DataTable.prototype, "InventoryCost", {
            get: function () {
                if (this._inventoryCost == null) {
                    this._inventoryCost = new NumberObasTableField("InventoryCost", this);
                }
                return this._inventoryCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4DataTable.prototype, "TravelCost", {
            get: function () {
                if (this._travelCost == null) {
                    this._travelCost = new NumberObasTableField("TravelCost", this);
                }
                return this._travelCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4DataTable.prototype, "UtilitiesCost", {
            get: function () {
                if (this._utilitiesCost == null) {
                    this._utilitiesCost = new NumberObasTableField("UtilitiesCost", this);
                }
                return this._utilitiesCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4DataTable.prototype, "TransportCost", {
            get: function () {
                if (this._transportCost == null) {
                    this._transportCost = new NumberObasTableField("TransportCost", this);
                }
                return this._transportCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4DataTable.prototype, "CommunicationCost", {
            get: function () {
                if (this._communicationCost == null) {
                    this._communicationCost = new NumberObasTableField("CommunicationCost", this);
                }
                return this._communicationCost;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4DataTable.prototype, "AveragePayment", {
            get: function () {
                if (this._averagePayment == null) {
                    this._averagePayment = new NumberObasTableField("AveragePayment", this);
                }
                return this._averagePayment;
            },
            enumerable: true,
            configurable: true
        });
        P4DataTable.prototype.TotalPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.NValue = this.AveragePayment.NValue + this.CommunicationCost.NValue + this.TransportCost.NValue +
                this.UtilitiesCost.NValue + this.TravelCost.NValue + this.InventoryCost.NValue + this.RentCost.NValue;
        };
        P4DataTable.prototype.ResetDataHandler = function () {
            this.Total.NValue = this.AveragePayment.NValue = this.CommunicationCost.NValue = this.TransportCost.NValue =
                this.UtilitiesCost.NValue = this.TravelCost.NValue = this.InventoryCost.NValue = this.RentCost.NValue = 0;
        };
        return P4DataTable;
    }(YearSubjectDataTable));
    F05325.P4DataTable = P4DataTable;
    var P5DataTable = (function (_super) {
        __extends(P5DataTable, _super);
        function P5DataTable(id, document, parentTable, sumTable) {
            var _this = _super.call(this, id, document, parentTable, sumTable, BaseObasTableFields.CountYearDataField) || this;
            _this._controlCount = null;
            _this._controlTime = null;
            _this._licenseCount = null;
            _this._licenseTime = null;
            _this._workTime = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(P5DataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.Year, this.OwnerKey, this.ControlCount, this.ControlTime, this.LicenseCount,
                        this.LicenseTime, this.WorkTime
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5DataTable.prototype, "WorkTime", {
            get: function () {
                if (this._workTime == null) {
                    this._workTime = new NumberObasTableField("WorkTime", this);
                }
                return this._workTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5DataTable.prototype, "LicenseTime", {
            get: function () {
                if (this._licenseTime == null) {
                    this._licenseTime = new NumberObasTableField("LicenseTime", this);
                }
                return this._licenseTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5DataTable.prototype, "LicenseCount", {
            get: function () {
                if (this._licenseCount == null) {
                    this._licenseCount = new NumberObasTableField("LicenseCount", this);
                }
                return this._licenseCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5DataTable.prototype, "ControlTime", {
            get: function () {
                if (this._controlTime == null) {
                    this._controlTime = new NumberObasTableField("ControlTime", this);
                }
                return this._controlTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P5DataTable.prototype, "ControlCount", {
            get: function () {
                if (this._controlCount == null) {
                    this._controlCount = new NumberObasTableField("ControlCount", this);
                }
                return this._controlCount;
            },
            enumerable: true,
            configurable: true
        });
        P5DataTable.prototype.CalcTimePerWorkDay = function (time, workDay) {
            return workDay ? time / workDay : 0;
        };
        P5DataTable.prototype.TotalPartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var workTime = this.WorkTime.NValue;
            this.Total.NValue = this.ControlCount.NValue * this.CalcTimePerWorkDay(this.ControlTime.NValue, workTime) +
                this.LicenseCount.NValue * this.CalcTimePerWorkDay(this.LicenseTime.NValue, workTime);
        };
        P5DataTable.prototype.ResetDataHandler = function () {
            this.Total.NValue = this.ControlCount.NValue = this.ControlTime.NValue = this.LicenseCount.NValue =
                this.LicenseTime.NValue = this.WorkTime.NValue = 0;
        };
        return P5DataTable;
    }(YearSubjectDataTable));
    F05325.P5DataTable = P5DataTable;
})(F05325 || (F05325 = {}));
