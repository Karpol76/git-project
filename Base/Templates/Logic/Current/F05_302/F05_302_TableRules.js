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
var F05302;
(function (F05302) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05302.TableRules = TableRules;
    var SubjectsTable = (function (_super) {
        __extends(SubjectsTable, _super);
        function SubjectsTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SubjectsTable;
    }(SubsidiesSubventions.FSubjectTable));
    F05302.SubjectsTable = SubjectsTable;
    var P3TableKeys = (function (_super) {
        __extends(P3TableKeys, _super);
        function P3TableKeys(OwnerKey, Year) {
            var _this = _super.call(this) || this;
            _this.OwnerKey = OwnerKey;
            _this.Year = Year;
            return _this;
        }
        return P3TableKeys;
    }(ObasTableKeys));
    F05302.P3TableKeys = P3TableKeys;
    var P3TableCopyMode;
    (function (P3TableCopyMode) {
        P3TableCopyMode[P3TableCopyMode["Keys"] = 0] = "Keys";
        P3TableCopyMode[P3TableCopyMode["YearData"] = 1] = "YearData";
        P3TableCopyMode[P3TableCopyMode["Full"] = 2] = "Full";
    })(P3TableCopyMode || (P3TableCopyMode = {}));
    var P3Table = (function (_super) {
        __extends(P3Table, _super);
        function P3Table(id, document, parentTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, BaseObasTableFields.YearField.Id], document, parentTable) || this;
            _this._copyFields = null;
            _this._copyData = null;
            _this._copyUserData = null;
            _this._copyDataKeys = null;
            _this._copyFieldsKeys = null;
            _this._isCopied = null;
            _this._year = null;
            _this._g3 = null;
            _this._g4 = null;
            _this._g5 = null;
            _this._userDataFields = null;
            _this._g6 = null;
            _this._g7 = null;
            _this._g8 = null;
            _this._g9 = null;
            _this._expenses = null;
            _this._workingTimePart = null;
            _this._workingTimeFull = null;
            _this._ratio = null;
            _this._populationFull = null;
            _this._populationPart = null;
            _this._sum = null;
            _this.ParentTable.AddTableAddListener(function () {
                _this.AddRow();
                _this.PostRow();
                _this.InnerCopyData(_this.RecordKey.Value, _this.Document.Settings.StartYear + _this.Document.Settings.YearsCount - 1, P3TableCopyMode.Keys);
            });
            return _this;
        }
        Object.defineProperty(P3Table.prototype, "UserDataFields", {
            get: function () {
                if (this._userDataFields == null) {
                    this._userDataFields = [
                        this.IsCopied,
                        this.OwnerKey,
                        this.Year,
                        this.G3,
                        this.G4,
                        this.G5,
                        this.G6,
                        this.G7,
                        this.G8,
                        this.G9,
                        this.WorkingTimePart,
                        this.WorkingTimeFull,
                        this.PopulationPart,
                        this.PopulationFull
                    ];
                }
                return this._userDataFields;
            },
            enumerable: true,
            configurable: true
        });
        P3Table.prototype.GetKeys = function (ownerKey, year) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new P3TableKeys(ownerKey, year);
            }
            else {
                this._keys.Year = year;
                this._keys.OwnerKey = ownerKey;
            }
            return this._keys;
        };
        Object.defineProperty(P3Table.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [
                        this.OwnerKey,
                        this.Year,
                        this.G3,
                        this.G4,
                        this.G5,
                        this.G6,
                        this.G7,
                        this.G8,
                        this.G9
                    ];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P3Table.prototype.InitCopyFieldsInfoKeys = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this.CopyFieldsKeys);
        };
        Object.defineProperty(P3Table.prototype, "UserFieldsInfo", {
            get: function () {
                if (this._copyUserData == null) {
                    this._copyUserData = this.InitUserFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyUserData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "CopyFieldsInfoKeys", {
            get: function () {
                if (this._copyDataKeys == null) {
                    this._copyDataKeys = this.InitCopyFieldsInfoKeys();
                }
                return this.CollectTableRecordData(this._copyDataKeys);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "CopyFieldsKeys", {
            get: function () {
                if (this._copyFieldsKeys == null) {
                    this._copyFieldsKeys = this.CopyFields.filter(function (value) { return value.IsKeyField; });
                }
                return this._copyFieldsKeys;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "G3", {
            get: function () {
                if (this._g3 == null) {
                    this._g3 = new NumberObasTableField("G3", this);
                }
                return this._g3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "G4", {
            get: function () {
                if (this._g4 == null) {
                    this._g4 = new NumberObasTableField("G4", this);
                }
                return this._g4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "G5", {
            get: function () {
                if (this._g5 == null) {
                    this._g5 = new NumberObasTableField("G5", this);
                }
                return this._g5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "G6", {
            get: function () {
                if (this._g6 == null) {
                    this._g6 = new NumberObasTableField("G6", this);
                }
                return this._g6;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "G7", {
            get: function () {
                if (this._g7 == null) {
                    this._g7 = new NumberObasTableField("G7", this);
                }
                return this._g7;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "G8", {
            get: function () {
                if (this._g8 == null) {
                    this._g8 = new NumberObasTableField("G8", this);
                }
                return this._g8;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "G9", {
            get: function () {
                if (this._g9 == null) {
                    this._g9 = new NumberObasTableField("G9", this);
                }
                return this._g9;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Expenses", {
            get: function () {
                if (this._expenses == null) {
                    this._expenses = new NumberObasTableField("Expenses", this);
                }
                return this._expenses;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "WorkingTimePart", {
            get: function () {
                if (this._workingTimePart == null) {
                    this._workingTimePart = new NumberObasTableField("WorkingTimePart", this);
                }
                return this._workingTimePart;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "WorkingTimeFull", {
            get: function () {
                if (this._workingTimeFull == null) {
                    this._workingTimeFull = new NumberObasTableField("WorkingTimeFull", this);
                }
                return this._workingTimeFull;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Ratio", {
            get: function () {
                if (this._ratio == null) {
                    this._ratio = new NumberObasTableField("Ratio", this);
                }
                return this._ratio;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "PopulationFull", {
            get: function () {
                if (this._populationFull == null) {
                    this._populationFull = new NumberObasTableField("PopulationFull", this);
                }
                return this._populationFull;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "PopulationPart", {
            get: function () {
                if (this._populationPart == null) {
                    this._populationPart = new NumberObasTableField("PopulationPart", this);
                }
                return this._populationPart;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Sum", {
            get: function () {
                if (this._sum == null) {
                    this._sum = new NumberObasTableField("Sum", this);
                }
                return this._sum;
            },
            enumerable: true,
            configurable: true
        });
        P3Table.prototype.CalcSubvention = function () {
            this.Sum.NValue = (this.PopulationFull.NValue + this.PopulationPart.NValue * this.Ratio.NValue) *
                this.Expenses.NValue;
        };
        P3Table.prototype.CostOfEmployeeChangedEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Expenses.NValue = this.G3.NValue +
                this.G4.NValue +
                this.G5.NValue +
                this.G6.NValue +
                this.G7.NValue +
                this.G8.NValue +
                this.G9.NValue;
        };
        P3Table.prototype.WorkingTimeChangedEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.WorkingTimeFull.NValue !== 0) {
                this.Ratio.NValue = this.WorkingTimePart.NValue / this.WorkingTimeFull.NValue;
            }
            this.CalcSubvention();
        };
        P3Table.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, ObasStageSettings.CurrentYear + ObasStageSettings.YearsCount - 1, P3TableCopyMode.YearData);
            }
        };
        P3Table.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P3Table.prototype.InnerCopyData = function (recordKey, endYear, mode) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                var copyData = null;
                switch (mode) {
                    case P3TableCopyMode.YearData:
                        this.IsCopied.Value = true;
                        copyData = this.CopyFieldsInfo;
                        break;
                    case P3TableCopyMode.Full:
                        copyData = this.UserFieldsInfo;
                        break;
                    default:
                        copyData = this.CopyFieldsInfoKeys;
                }
                var keys = this.GetKeys();
                var yearField = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    yearField.Value = keys.Year = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), false);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
        };
        P3Table.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.G3.NValue =
                    _this.G4.NValue =
                        _this.G5.NValue =
                            _this.G6.NValue =
                                _this.G7.NValue =
                                    _this.G8.NValue =
                                        _this.G9.NValue =
                                            _this.WorkingTimeFull.NValue =
                                                _this.WorkingTimePart.NValue =
                                                    _this.PopulationFull.NValue =
                                                        _this.PopulationPart.NValue =
                                                            _this.Ratio.NValue =
                                                                _this.Expenses.NValue =
                                                                    _this.Sum.NValue = 0;
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
        P3Table.prototype.CopyData = function (srcYear, destYear) {
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
                        _this.InnerCopyData(recordKey, destYear, P3TableCopyMode.Full);
                    }
                };
                this.Iterate(copyHandler);
            }
        };
        P3Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitUserFieldsInfo());
        };
        P3Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P3Table.prototype.InitUserFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this.UserDataFields);
        };
        return P3Table;
    }(ObasTableWithKeysParent));
    F05302.P3Table = P3Table;
})(F05302 || (F05302 = {}));
