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
var F05307;
(function (F05307) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05307.TableRules = TableRules;
    var RegionsTable = (function (_super) {
        __extends(RegionsTable, _super);
        function RegionsTable(id, document) {
            return _super.call(this, id, document) || this;
        }
        return RegionsTable;
    }(SubsidiesSubventions.FRegionsTable));
    F05307.RegionsTable = RegionsTable;
    var P3TableStrKeys;
    (function (P3TableStrKeys) {
        P3TableStrKeys[P3TableStrKeys["Koef1"] = 1] = "Koef1";
        P3TableStrKeys[P3TableStrKeys["Koef2"] = 2] = "Koef2";
        P3TableStrKeys[P3TableStrKeys["Koef3"] = 3] = "Koef3";
    })(P3TableStrKeys = F05307.P3TableStrKeys || (F05307.P3TableStrKeys = {}));
    var P3Table = (function (_super) {
        __extends(P3Table, _super);
        function P3Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return P3Table;
    }(SubsidiesSubventions.CoefficientsTable));
    F05307.P3Table = P3Table;
    ;
    var P4TableKeys = (function (_super) {
        __extends(P4TableKeys, _super);
        function P4TableKeys(OwnerKey, Year) {
            var _this = _super.call(this) || this;
            _this.OwnerKey = OwnerKey;
            _this.Year = Year;
            return _this;
        }
        return P4TableKeys;
    }(ObasTableKeys));
    F05307.P4TableKeys = P4TableKeys;
    var P4Table = (function (_super) {
        __extends(P4Table, _super);
        function P4Table(id, document, _indicatorsTable, parentTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, BaseObasTableFields.YearField.Id], document, parentTable) || this;
            _this._indicatorsTable = _indicatorsTable;
            _this._copyFields = null;
            _this._copyData = null;
            _this._isCopied = null;
            _this._year = null;
            _this._peopleCount = null;
            _this._deadCount = null;
            _this._invalidCount = null;
            _this._coefficient = null;
            _this._totalSum = null;
            _this._indicatorsTable.IndicatorChangeEvent.Add(function (table, oldValue, newValue, fieldId) {
                var yearOffset = ObasHelper.GetYearOffsetById(fieldId);
                var year = _this.Document.Settings.StartYear + yearOffset;
                var koefs = table.GetIndicatorValues(yearOffset + 1);
                var koef1 = koefs.getValue(P3TableStrKeys.Koef1);
                var koef2 = koefs.getValue(P3TableStrKeys.Koef2);
                var koef3 = koefs.getValue(P3TableStrKeys.Koef3);
                while (_this.Year.Locate(year, true)) {
                    _this.CalcSubvention(koef1, koef2, koef3);
                }
                _this.ClearLocateFlag();
            });
            return _this;
        }
        Object.defineProperty(P4Table.prototype, "CopyFields", {
            get: function () {
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Year, this.DeadCount, this.InvalidCount,
                        this.Coefficient, this.PeopleCount];
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "CopyFieldsInfo", {
            get: function () {
                if (this._copyData == null) {
                    this._copyData = this.InitCopyFieldsInfo();
                }
                return this.CollectTableRecordData(this._copyData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "IsCopied", {
            get: function () {
                if (this._isCopied == null) {
                    this._isCopied = new ObasTableField(BaseObasTableFields.CopiedRowFlagField.Id, this, true);
                }
                return this._isCopied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "PeopleCount", {
            get: function () {
                if (this._peopleCount == null) {
                    this._peopleCount = new NumberObasTableField("PeopleCount", this);
                }
                return this._peopleCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "DeadCount", {
            get: function () {
                if (this._deadCount == null) {
                    this._deadCount = new NumberObasTableField("DeadCount", this);
                }
                return this._deadCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "InvalidCount", {
            get: function () {
                if (this._invalidCount == null) {
                    this._invalidCount = new NumberObasTableField("InvalidCount", this);
                }
                return this._invalidCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "Coefficient", {
            get: function () {
                if (this._coefficient == null) {
                    this._coefficient = new NumberObasTableField("Coefficient", this);
                }
                return this._coefficient;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P4Table.prototype, "TotalSum", {
            get: function () {
                if (this._totalSum == null) {
                    this._totalSum = new NumberObasTableField("TotalSum", this);
                }
                return this._totalSum;
            },
            enumerable: true,
            configurable: true
        });
        P4Table.prototype.ParameterChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            var yearIndex = ObasHelper.GetYearOffset(this) + 1;
            var koefs = this._indicatorsTable.GetIndicatorValues(yearIndex);
            var koef1 = koefs.getValue(P3TableStrKeys.Koef1);
            var koef2 = koefs.getValue(P3TableStrKeys.Koef2);
            var koef3 = koefs.getValue(P3TableStrKeys.Koef3);
            this.CalcSubvention(koef1, koef2, koef3);
        };
        P4Table.prototype.CalcSubvention = function (koef1, koef2, koef3) {
            this.TotalSum.NValue = ((this.PeopleCount.NValue * koef1 + this.DeadCount.NValue * koef2 + this.InvalidCount.NValue * koef3 * 12) * (1 + this.Coefficient.NValue / 100));
        };
        P4Table.prototype.GetKeys = function (ownerKey, year) {
            if (ownerKey === void 0) { ownerKey = this.OwnerKey.Value; }
            if (year === void 0) { year = this.Year.Value; }
            if (this._keys == null) {
                this._keys = new P4TableKeys(ownerKey, year);
            }
            else {
                this._keys.Year = year;
                this._keys.OwnerKey = ownerKey;
            }
            return this._keys;
        };
        P4Table.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateInitCopyFieldsInfo(this);
        };
        P4Table.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        P4Table.prototype.ResetData = function (keys) {
            var _this = this;
            var resetHandler = function () {
                _this.PeopleCount.NValue =
                    _this.DeadCount.NValue =
                        _this.InvalidCount.NValue =
                            _this.Coefficient.NValue = _this.TotalSum.NValue = 0;
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
        P4Table.prototype.CopyData = function (srcYear, destYear) {
            var _this = this;
            var endYear = this.Document.Settings.StartYear + this.Document.Settings.YearsCount;
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
        P4Table.prototype.InnerCopyData = function (recordKey, endYear) {
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
        P4Table.prototype.EditEventHandler = function (tableId) {
            if (this.Document.NotOnUpdate && !this.IsCopied.Value && this.IsRedyForCopy()) {
                this.InnerCopyData(this.RecordKey.Value, this.Document.Settings.StartYear + this.Document.Settings.YearsCount - 1);
            }
        };
        P4Table.prototype.IsRedyForCopy = function () {
            return ObasHelper.CheckIsReadyForCopy(this.CopyFieldsInfo);
        };
        return P4Table;
    }(ObasTableWithKeysParent));
    F05307.P4Table = P4Table;
})(F05307 || (F05307 = {}));
