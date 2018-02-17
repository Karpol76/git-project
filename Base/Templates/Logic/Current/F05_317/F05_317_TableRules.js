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
var F05317;
(function (F05317) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05317.TableRules = TableRules;
    var StrKeysP2 = (function (_super) {
        __extends(StrKeysP2, _super);
        function StrKeysP2(SubjKey) {
            var _this = _super.call(this) || this;
            _this.SubjKey = SubjKey;
            return _this;
        }
        return StrKeysP2;
    }(ObasTableKeys));
    F05317.StrKeysP2 = StrKeysP2;
    var StrKeysP3 = (function (_super) {
        __extends(StrKeysP3, _super);
        function StrKeysP3(SubjKey, Year) {
            var _this = _super.call(this, SubjKey) || this;
            _this.Year = Year;
            return _this;
        }
        return StrKeysP3;
    }(StrKeysP2));
    F05317.StrKeysP3 = StrKeysP3;
    var P2Table = (function (_super) {
        __extends(P2Table, _super);
        function P2Table(id, document) {
            var _this = _super.call(this, id, ["SubjectName_ID"], document) || this;
            _this._subjTable = null;
            _this._uniqTable = null;
            _this._subjTable = new SubsidiesSubventions.FSubjectTable(id, document);
            _this._uniqTable = new UniqueObasTable(id, document, [_this.SubjTable.Subject.ForeignKey.Id]);
            return _this;
        }
        Object.defineProperty(P2Table.prototype, "UniqueTable", {
            get: function () {
                return this._uniqTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P2Table.prototype, "SubjTable", {
            get: function () {
                return this._subjTable;
            },
            enumerable: true,
            configurable: true
        });
        P2Table.prototype.DeleteElement = function (subjKey) {
            this.UniqueTable.DeleteElement(subjKey);
        };
        P2Table.prototype.AddElement = function (subjKey) {
            this.UniqueTable.AddElement(subjKey);
        };
        P2Table.prototype.GetKeys = function (subjKey) {
            if (subjKey === void 0) { subjKey = this.SubjTable.Subject.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP2(subjKey);
            }
            else {
                this._keys.SubjKey = subjKey;
            }
            return this._keys;
        };
        return P2Table;
    }(ObasTableWithKeys));
    F05317.P2Table = P2Table;
    var P3Table = (function (_super) {
        __extends(P3Table, _super);
        function P3Table(id, document, sumTable) {
            var _this = _super.call(this, id, ["SubjectName_ID", BaseObasTableFields.YearField.Id], document) || this;
            _this._year = null;
            _this._subject = null;
            _this._delSubjKey = null;
            _this._isCopied = null;
            _this._copyData = null;
            _this._sumTable = null;
            _this._copyFields = null;
            _this._salaryCosts = null;
            _this._serviceCosts = null;
            _this._otherCosts = null;
            _this._total = null;
            _this._sumTable = sumTable;
            _this.SumTable.UniqueTable.AddChildTable(_this);
            return _this;
        }
        Object.defineProperty(P3Table.prototype, "SalaryCosts", {
            get: function () {
                if (this._salaryCosts == null) {
                    this._salaryCosts = new NumberObasTableField("SalaryCosts", this);
                }
                return this._salaryCosts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "ServiceCosts", {
            get: function () {
                if (this._serviceCosts == null) {
                    this._serviceCosts = new NumberObasTableField("ServicesCosts", this);
                }
                return this._serviceCosts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "OtherCosts", {
            get: function () {
                if (this._otherCosts == null) {
                    this._otherCosts = new NumberObasTableField("OtherCosts", this);
                }
                return this._otherCosts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberObasTableField("Total", this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "SumTable", {
            get: function () {
                return this._sumTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "Subject", {
            get: function () {
                if (this._subject == null) {
                    this._subject = new ObasSprTableField(ObasTableCollection.SprSubject, this);
                }
                return this._subject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Table.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        P3Table.prototype.OnSubjectKeyChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.SumTable.DeleteElement(oldValue);
            this.SumTable.AddElement(newValue);
        };
        Object.defineProperty(P3Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.Subject.ForeignKey, this.Year,
                        this.SalaryCosts, this.ServiceCosts, this.OtherCosts];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        P3Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P3Table.prototype.GetKeys = function (subjKey, year) {
            if (subjKey === void 0) { subjKey = this.Subject.ForeignKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new StrKeysP3(subjKey, year);
            }
            else {
                this._keys.SubjKey = subjKey;
                this._keys.Year = year;
            }
            return this._keys;
        };
        P3Table.prototype.InnerCopyData = function (recordKey, endYear) {
            if (this.Locate(this.RecordKey.Id, recordKey)) {
                this.IsCopied.Value = true;
                var copyData = this.CopyFieldsInfo;
                var keys = this.GetKeys();
                var dataYear = copyData.getValue(this.Year.Id);
                for (var year = keys.Year + 1; year <= endYear; year++) {
                    keys.Year = year;
                    dataYear.Value = year;
                    this.SetupTableRecordData(copyData, this.RecordKey.LookupByKeys(keys.ToArray()), true);
                }
                this.Locate(this.RecordKey.Id, recordKey);
            }
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
        P3Table.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        P3Table.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, this.Document.Settings.StartYear + this.Document.Settings.YearsCount - 1);
            }
        };
        P3Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P3Table.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.SalaryCosts.NValue = 0;
                _this.ServiceCosts.NValue = 0;
                _this.OtherCosts.NValue = 0;
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
            var endYear = this.Document.Settings.StartYear + this.Document.Settings.YearsCount - 1;
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
        P3Table.prototype.DeleteEventHandler = function (tableId) {
            this._delSubjKey = this.Subject.ForeignKey.Value;
            this.Total.NValue = 0;
        };
        P3Table.prototype.AfterDeleteEventHandler = function () {
            this.SumTable.DeleteElement(this._delSubjKey);
        };
        P3Table.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.Total.NValue = this.SalaryCosts.NValue + this.ServiceCosts.NValue + this.OtherCosts.NValue;
        };
        P3Table.prototype.TotalChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearField = BaseObasTableFields.YearDataField
                .GenerateId(this.Year.Value - this.Document.Settings.StartYear + 1);
            this.SumTable.SetValueByKeys(yearField, this.SumTable.GetKeys(this.Subject.ForeignKey.Value), newValue);
        };
        return P3Table;
    }(ObasTableWithKeys));
    F05317.P3Table = P3Table;
})(F05317 || (F05317 = {}));
