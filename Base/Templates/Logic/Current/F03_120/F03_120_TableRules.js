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
var F03120;
(function (F03120) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F03120.TableRules = TableRules;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F03120.StrKeysP1Total || (F03120.StrKeysP1Total = {}));
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
    F03120.P1TotalTable = P1TotalTable;
    var ObasTablePnoYearKeys = (function (_super) {
        __extends(ObasTablePnoYearKeys, _super);
        function ObasTablePnoYearKeys(PnoKey, Year) {
            var _this = _super.call(this) || this;
            _this.PnoKey = PnoKey;
            _this.Year = Year;
            return _this;
        }
        return ObasTablePnoYearKeys;
    }(ObasTableKeys));
    F03120.ObasTablePnoYearKeys = ObasTablePnoYearKeys;
    var PnoDataTable = (function (_super) {
        __extends(PnoDataTable, _super);
        function PnoDataTable(id, document) {
            var _this = _super.call(this, id, ["PNO_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._pno = null;
            _this._year = null;
            return _this;
        }
        Object.defineProperty(PnoDataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PnoDataTable.prototype, "YearOffset", {
            get: function () {
                return this.Year.Value - this.Document.Settings.StartYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PnoDataTable.prototype, "Pno", {
            get: function () {
                if (this._pno == null) {
                    this._pno = new ObasSprTableField(ObasTableCollection.PnoSprTable, this);
                }
                return this._pno;
            },
            enumerable: true,
            configurable: true
        });
        PnoDataTable.prototype.GetKeys = function (pnoKey, year) {
            if (pnoKey === void 0) { pnoKey = this.Pno.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new ObasTablePnoYearKeys(pnoKey, year);
            }
            else {
                this._keys.PnoKey = pnoKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        return PnoDataTable;
    }(ObasTableWithKeys));
    F03120.PnoDataTable = PnoDataTable;
    var ObasTablePnoRecipientYearKeys = (function (_super) {
        __extends(ObasTablePnoRecipientYearKeys, _super);
        function ObasTablePnoRecipientYearKeys(pnoKey, year, RecipientKey) {
            var _this = _super.call(this, pnoKey, year) || this;
            _this.RecipientKey = RecipientKey;
            return _this;
        }
        return ObasTablePnoRecipientYearKeys;
    }(ObasTablePnoYearKeys));
    F03120.ObasTablePnoRecipientYearKeys = ObasTablePnoRecipientYearKeys;
    var RecipientsDataTable = (function (_super) {
        __extends(RecipientsDataTable, _super);
        function RecipientsDataTable(id, parentTable, _sumTable) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat("RecipientCategory_ID"), parentTable.Document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._recipient = null;
            _this._g4 = null;
            _this._g5 = null;
            _this._g6 = null;
            _this._g7 = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(RecipientsDataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "g7", {
            get: function () {
                if (this._g7 == null) {
                    this._g7 = new NumberObasTableField("g7", this);
                }
                return this._g7;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "g6", {
            get: function () {
                if (this._g6 == null) {
                    this._g6 = new NumberObasTableField("g6", this);
                }
                return this._g6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "g5", {
            get: function () {
                if (this._g5 == null) {
                    this._g5 = new NumberObasTableField("g5", this);
                }
                return this._g5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "g4", {
            get: function () {
                if (this._g4 == null) {
                    this._g4 = new NumberObasTableField("g4", this);
                }
                return this._g4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "Recipient", {
            get: function () {
                if (this._recipient == null) {
                    this._recipient = new ObasSprTableField(ObasTableCollection.RecipientCategorySprTable, this);
                }
                return this._recipient;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "Year", {
            get: function () {
                return this.ParentTable.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "YearOffset", {
            get: function () {
                return this.ParentTable.YearOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecipientsDataTable.prototype, "Pno", {
            get: function () {
                return this.ParentTable.Pno;
            },
            enumerable: true,
            configurable: true
        });
        RecipientsDataTable.prototype.BeforeDeleteEventHandler = function (tableId) {
            this.ParentTable.Locate(this.ParentTable.RecordKey.Id, this.OwnerKey.Value);
            this.g7.NValue = 0;
        };
        RecipientsDataTable.prototype.TotalObasChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._sumTable.SetSumByKeys(this.Year.Value, this._sumTable.GetKeys(StrKeysP1Total.Total), oldValue, newValue);
        };
        RecipientsDataTable.prototype.GetKeys = function (pnoKey, year, recipientKey) {
            if (pnoKey === void 0) { pnoKey = this.Pno.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (recipientKey === void 0) { recipientKey = this.Recipient.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new ObasTablePnoRecipientYearKeys(pnoKey, year, recipientKey);
            }
            else {
                this._keys.PnoKey = pnoKey;
                this._keys.Year = year;
                this._keys.RecipientKey = recipientKey;
            }
            return this._keys;
        };
        RecipientsDataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var parentTable = this.ParentTable;
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(keys.PnoKey, year), true);
                    copyData.getValue(this.OwnerKey.Id).Value = ownerKey;
                    keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        RecipientsDataTable.prototype.CopyData = function (srcYear, destYear) {
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
        RecipientsDataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        RecipientsDataTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.g4.NValue = 0;
                _this.g5.NValue = 0;
                _this.g6.NValue = 0;
                _this.g7.NValue = 0;
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
        RecipientsDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        Object.defineProperty(RecipientsDataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.IsCopied,
                        this.OwnerKey,
                        this.Recipient.ForeignKey
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        RecipientsDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        return RecipientsDataTable;
    }(ObasTableWithKeysParent));
    F03120.RecipientsDataTable = RecipientsDataTable;
    var ObasTablePnoRecipientYearSubjectKeys = (function (_super) {
        __extends(ObasTablePnoRecipientYearSubjectKeys, _super);
        function ObasTablePnoRecipientYearSubjectKeys(pnoKey, year, recipientKey, SubjectNameKey) {
            var _this = _super.call(this, pnoKey, year, recipientKey) || this;
            _this.SubjectNameKey = SubjectNameKey;
            return _this;
        }
        return ObasTablePnoRecipientYearSubjectKeys;
    }(ObasTablePnoRecipientYearKeys));
    F03120.ObasTablePnoRecipientYearSubjectKeys = ObasTablePnoRecipientYearSubjectKeys;
    var SubjectDataTable = (function (_super) {
        __extends(SubjectDataTable, _super);
        function SubjectDataTable(id, parentTable, _sumTable) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat("SubjectName_ID"), parentTable.Document, parentTable) || this;
            _this._sumTable = _sumTable;
            _this._recipient = null;
            _this._subjectName = null;
            _this._g5 = null;
            _this._g6 = null;
            _this._g7 = null;
            _this._g8 = null;
            _this._g9 = null;
            _this._g10 = null;
            _this._g11 = null;
            _this._g12 = null;
            _this._g13 = null;
            _this._g14 = null;
            _this._g15 = null;
            _this._g16 = null;
            _this._g17 = null;
            _this._g18 = null;
            _this._g19 = null;
            _this._g20 = null;
            _this._g21 = null;
            _this._g22 = null;
            _this._g23 = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._copyFields = null;
            _this._sumGroup1 = null;
            _this._sumGroup2 = null;
            _this._sumGroup3 = null;
            _this._sumGroup4 = null;
            _this._sumGroup5 = null;
            return _this;
        }
        Object.defineProperty(SubjectDataTable.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g7", {
            get: function () {
                if (this._g7 == null) {
                    this._g7 = new NumberObasTableField("g7", this);
                }
                return this._g7;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g6", {
            get: function () {
                if (this._g6 == null) {
                    this._g6 = new NumberObasTableField("g6", this);
                }
                return this._g6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g5", {
            get: function () {
                if (this._g5 == null) {
                    this._g5 = new NumberObasTableField("g5", this);
                }
                return this._g5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g8", {
            get: function () {
                if (this._g8 == null) {
                    this._g8 = new NumberObasTableField("g8", this);
                }
                return this._g8;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g9", {
            get: function () {
                if (this._g9 == null) {
                    this._g9 = new NumberObasTableField("g9", this);
                }
                return this._g9;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g10", {
            get: function () {
                if (this._g10 == null) {
                    this._g10 = new NumberObasTableField("g10", this);
                }
                return this._g10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g11", {
            get: function () {
                if (this._g11 == null) {
                    this._g11 = new NumberObasTableField("g11", this);
                }
                return this._g11;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g12", {
            get: function () {
                if (this._g12 == null) {
                    this._g12 = new NumberObasTableField("g12", this);
                }
                return this._g12;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g13", {
            get: function () {
                if (this._g13 == null) {
                    this._g13 = new NumberObasTableField("g13", this);
                }
                return this._g13;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g14", {
            get: function () {
                if (this._g14 == null) {
                    this._g14 = new NumberObasTableField("g14", this);
                }
                return this._g14;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g15", {
            get: function () {
                if (this._g15 == null) {
                    this._g15 = new NumberObasTableField("g15", this);
                }
                return this._g15;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g16", {
            get: function () {
                if (this._g16 == null) {
                    this._g16 = new NumberObasTableField("g16", this);
                }
                return this._g16;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g17", {
            get: function () {
                if (this._g17 == null) {
                    this._g17 = new NumberObasTableField("g17", this);
                }
                return this._g17;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g18", {
            get: function () {
                if (this._g18 == null) {
                    this._g18 = new NumberObasTableField("g18", this);
                }
                return this._g18;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g19", {
            get: function () {
                if (this._g19 == null) {
                    this._g19 = new NumberObasTableField("g19", this);
                }
                return this._g19;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g20", {
            get: function () {
                if (this._g20 == null) {
                    this._g20 = new NumberObasTableField("g20", this);
                }
                return this._g20;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g21", {
            get: function () {
                if (this._g21 == null) {
                    this._g21 = new NumberObasTableField("g21", this);
                }
                return this._g21;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g22", {
            get: function () {
                if (this._g22 == null) {
                    this._g22 = new NumberObasTableField("g22", this);
                }
                return this._g22;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "g23", {
            get: function () {
                if (this._g23 == null) {
                    this._g23 = new NumberObasTableField("g23", this);
                }
                return this._g23;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "Recipient", {
            get: function () {
                if (this._recipient == null) {
                    this._recipient = new ObasSprTableField(ObasTableCollection.RecipientCategorySprTable, this);
                }
                return this._recipient;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "Subject", {
            get: function () {
                if (this._subjectName == null) {
                    this._subjectName = new ObasSprTableField(ObasTableCollection.SprSubject, this);
                }
                return this._subjectName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "ParentTable", {
            get: function () {
                return this.OwnerKey.SourceTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "Year", {
            get: function () {
                return this.ParentTable.Year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "YearOffset", {
            get: function () {
                return this.ParentTable.YearOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "Pno", {
            get: function () {
                return this.ParentTable.Pno;
            },
            enumerable: true,
            configurable: true
        });
        SubjectDataTable.prototype.BeforeDeleteEventHandler = function (tableId) {
            this.ResetData(this.GetKeys());
        };
        SubjectDataTable.prototype.TotalObasChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(this.ParentTable.g7.Id, this.ParentTable.GetKeys(this.Pno.ForeignKey.Value, this.Year.Value, this.Recipient.ForeignKey.Value), oldValue, newValue);
        };
        Object.defineProperty(SubjectDataTable.prototype, "SumGroup1", {
            get: function () {
                var _this = this;
                if (this._sumGroup1 == null) {
                    this._sumGroup1 = new CalcFields(this.g7, this.g5, this.g6, this, function (tableId, oldValue, newValue, fieldId) { _this.SumG20ChangeEventHandler(tableId, oldValue, newValue, fieldId); });
                }
                return this._sumGroup1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "SumGroup2", {
            get: function () {
                var _this = this;
                if (this._sumGroup2 == null) {
                    this._sumGroup2 = new CalcFields(this.g10, this.g8, this.g9, this, function (tableId, oldValue, newValue, fieldId) { _this.SumG20ChangeEventHandler(tableId, oldValue, newValue, fieldId); });
                }
                return this._sumGroup2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "SumGroup3", {
            get: function () {
                var _this = this;
                if (this._sumGroup3 == null) {
                    this._sumGroup3 = new CalcFields(this.g13, this.g11, this.g12, this, function (tableId, oldValue, newValue, fieldId) { _this.SumG20ChangeEventHandler(tableId, oldValue, newValue, fieldId); });
                }
                return this._sumGroup3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "SumGroup4", {
            get: function () {
                var _this = this;
                if (this._sumGroup4 == null) {
                    this._sumGroup4 = new CalcFields(this.g16, this.g14, this.g15, this, function (tableId, oldValue, newValue, fieldId) { _this.SumG20ChangeEventHandler(tableId, oldValue, newValue, fieldId); });
                }
                return this._sumGroup4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectDataTable.prototype, "SumGroup5", {
            get: function () {
                var _this = this;
                if (this._sumGroup5 == null) {
                    this._sumGroup5 = new CalcFields(this.g19, this.g17, this.g18, this, function (tableId, oldValue, newValue, fieldId) { _this.SumG20ChangeEventHandler(tableId, oldValue, newValue, fieldId); });
                }
                return this._sumGroup5;
            },
            enumerable: true,
            configurable: true
        });
        SubjectDataTable.prototype.SumG20ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.g20.NValue = this.g5.NValue + this.g8.NValue + this.g11.NValue + this.g14.NValue;
        };
        SubjectDataTable.prototype.SumG20TotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(this.ParentTable.g4.Id, this.ParentTable.GetKeys(this.Pno.ForeignKey.Value, this.Year.Value, this.Recipient.ForeignKey.Value), oldValue, this.g20.NValue);
        };
        SubjectDataTable.prototype.SumG21ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.g21.NValue = this.g7.NValue + this.g10.NValue + this.g13.NValue + this.g16.NValue + this.g19.NValue;
        };
        SubjectDataTable.prototype.SumG21G22ChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.g23.NValue = this.g21.NValue + this.g22.NValue;
            if (fieldId === this.g22.Id) {
                this.ParentTable.SetSumByKeys(this.ParentTable.g6.Id, this.ParentTable.GetKeys(this.Pno.ForeignKey.Value, this.Year.Value, this.Recipient.ForeignKey.Value), oldValue, this.g22.NValue);
            }
            if (fieldId === this.g21.Id) {
                this.ParentTable.SetSumByKeys(this.ParentTable.g5.Id, this.ParentTable.GetKeys(this.Pno.ForeignKey.Value, this.Year.Value, this.Recipient.ForeignKey.Value), oldValue, this.g21.NValue);
            }
        };
        SubjectDataTable.prototype.GetKeys = function (pnoKey, year, recipientKey, subject) {
            if (pnoKey === void 0) { pnoKey = this.Pno.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (recipientKey === void 0) { recipientKey = this.Recipient.ForeignKey.Value; }
            if (subject === void 0) { subject = this.Subject.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new ObasTablePnoRecipientYearSubjectKeys(pnoKey, year, recipientKey, subject);
            }
            else {
                this._keys.PnoKey = pnoKey;
                this._keys.Year = year;
                this._keys.RecipientKey = recipientKey;
                this._keys.SubjectNameKey = subject;
            }
            return this._keys;
        };
        SubjectDataTable.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var parentTable = this.ParentTable;
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    var ownerKey = parentTable.GetRecordKey(parentTable.GetKeys(keys.PnoKey, year, keys.RecipientKey), true);
                    copyData.getValue(this.OwnerKey.Id).Value = ownerKey;
                    keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        SubjectDataTable.prototype.CopyData = function (srcYear, destYear) {
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
        SubjectDataTable.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1);
            }
        };
        SubjectDataTable.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        SubjectDataTable.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.g5.NValue = 0;
                _this.g6.NValue = 0;
                _this.g7.NValue = 0;
                _this.g8.NValue = 0;
                _this.g9.NValue = 0;
                _this.g10.NValue = 0;
                _this.g11.NValue = 0;
                _this.g12.NValue = 0;
                _this.g13.NValue = 0;
                _this.g14.NValue = 0;
                _this.g15.NValue = 0;
                _this.g16.NValue = 0;
                _this.g17.NValue = 0;
                _this.g18.NValue = 0;
                _this.g19.NValue = 0;
                _this.g20.NValue = 0;
                _this.g21.NValue = 0;
                _this.g22.NValue = 0;
                _this.g23.NValue = 0;
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
        SubjectDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        Object.defineProperty(SubjectDataTable.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.IsCopied,
                        this.OwnerKey,
                        this.Subject.ForeignKey,
                        this.g5,
                        this.g6,
                        this.g8,
                        this.g9,
                        this.g11,
                        this.g12,
                        this.g14,
                        this.g15,
                        this.g17,
                        this.g18,
                        this.g22
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        SubjectDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        return SubjectDataTable;
    }(ObasTableWithKeysParent));
    F03120.SubjectDataTable = SubjectDataTable;
})(F03120 || (F03120 = {}));
