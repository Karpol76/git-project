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
var F05314;
(function (F05314) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F05314.TableRules = TableRules;
    var SubjectsDataTable = (function (_super) {
        __extends(SubjectsDataTable, _super);
        function SubjectsDataTable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._subjectHelper = null;
            return _this;
        }
        Object.defineProperty(SubjectsDataTable.prototype, "SubjectHelper", {
            get: function () {
                if (this._subjectHelper == null) {
                    this._subjectHelper = new SubsidiesSubventions.FSubjectTable(this.Id, this.Document);
                }
                return this._subjectHelper;
            },
            enumerable: true,
            configurable: true
        });
        SubjectsDataTable.prototype.ResetData = function (keys) {
            this.Document.CommonRules.ResetTableDataWithKeys(this, keys, BaseObasTableFields.YearDataField);
        };
        return SubjectsDataTable;
    }(ObasTableWithSimpleKeys));
    F05314.SubjectsDataTable = SubjectsDataTable;
    var SubvensionsTableKeys = (function (_super) {
        __extends(SubvensionsTableKeys, _super);
        function SubvensionsTableKeys(Subvension) {
            var _this = _super.call(this) || this;
            _this.Subvension = Subvension;
            return _this;
        }
        return SubvensionsTableKeys;
    }(ObasTableKeys));
    F05314.SubvensionsTableKeys = SubvensionsTableKeys;
    var SubvensionsDataTable = (function (_super) {
        __extends(SubvensionsDataTable, _super);
        function SubvensionsDataTable(id, document) {
            var _this = _super.call(this, id, ["Subvensions_ID"], document) || this;
            _this._subvension = null;
            _this._uniqHelper = null;
            return _this;
        }
        Object.defineProperty(SubvensionsDataTable.prototype, "UniqHelper", {
            get: function () {
                if (this._uniqHelper == null) {
                    this._uniqHelper = new UniqueObasTable(this.Id, this.Document, this.KeyFieldIds);
                }
                return this._uniqHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubvensionsDataTable.prototype, "Subvension", {
            get: function () {
                if (this._subvension == null) {
                    this._subvension = new ObasSprTableField(ObasTableCollection.SubvensionsSprTable, this);
                }
                return this._subvension;
            },
            enumerable: true,
            configurable: true
        });
        SubvensionsDataTable.prototype.GetKeys = function (subvension) {
            if (subvension === void 0) { subvension = this.Subvension.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new SubvensionsTableKeys(subvension);
            }
            else {
                this._keys.Subvension = subvension;
            }
            return this._keys;
        };
        SubvensionsDataTable.prototype.ResetData = function (keys) {
            this.Document.CommonRules.ResetTableDataWithKeys(this, keys, BaseObasTableFields.YearDataField);
        };
        return SubvensionsDataTable;
    }(ObasTableWithKeys));
    F05314.SubvensionsDataTable = SubvensionsDataTable;
    var SubvensionsTableWithParentKeys = (function (_super) {
        __extends(SubvensionsTableWithParentKeys, _super);
        function SubvensionsTableWithParentKeys(subvension, OwnerKey) {
            var _this = _super.call(this, subvension) || this;
            _this.OwnerKey = OwnerKey;
            return _this;
        }
        return SubvensionsTableWithParentKeys;
    }(SubvensionsTableKeys));
    F05314.SubvensionsTableWithParentKeys = SubvensionsTableWithParentKeys;
    var SubjectSubvensionsDataTable = (function (_super) {
        __extends(SubjectSubvensionsDataTable, _super);
        function SubjectSubvensionsDataTable(id, document, parentTable, _distinctTable) {
            var _this = _super.call(this, id, [BaseObasTableFields.OwnerKeyField.Id, "Subvensions_ID"], document, parentTable) || this;
            _this._distinctTable = _distinctTable;
            _this._copyFields = null;
            _this._subvension = null;
            _this._subvensionKey = null;
            _this._total = null;
            _this._distinctTable.UniqHelper.AddChildTable(_this);
            return _this;
        }
        Object.defineProperty(SubjectSubvensionsDataTable.prototype, "Total", {
            get: function () {
                if (this._total == null) {
                    this._total = new NumberGenericObasTableField(BaseObasTableFields.YearDataField.Id, this);
                }
                return this._total;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectSubvensionsDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Subvension.ForeignKey];
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(_this.Total.GetFieldByYearIndex(yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubjectSubvensionsDataTable.prototype, "Subvension", {
            get: function () {
                if (this._subvension == null) {
                    this._subvension = new ObasSprTableField(ObasTableCollection.SubvensionsSprTable, this);
                }
                return this._subvension;
            },
            enumerable: true,
            configurable: true
        });
        SubjectSubvensionsDataTable.prototype.SubvensionChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.AfterDeleteEventHandler(tableId, oldValue);
            this._distinctTable.UniqHelper.AddElement(newValue);
        };
        SubjectSubvensionsDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this.ParentTable.SetSumByKeys(fieldId, this.ParentTable.GetKeys(this.OwnerKey.Value), oldValue, newValue);
            this._distinctTable.SetSumByKeys(fieldId, this._distinctTable.GetKeys(this.Subvension.ForeignKey.Value), oldValue, newValue);
        };
        SubjectSubvensionsDataTable.prototype.DeleteEventHandler = function (tableId) {
            this._subvensionKey = this.Subvension.ForeignKey.Value;
        };
        SubjectSubvensionsDataTable.prototype.AfterDeleteChildsEventHandler = function (tableId) {
            var _this = this;
            this.Document.IterateByYears(function (yearIndex) {
                _this.Total.GetFieldByYearIndex(yearIndex).NValue = 0;
            });
        };
        SubjectSubvensionsDataTable.prototype.AfterDeleteEventHandler = function (tableId, subvension) {
            if (subvension === void 0) { subvension = this._subvensionKey; }
            this._distinctTable.UniqHelper.DeleteElement(subvension);
        };
        SubjectSubvensionsDataTable.prototype.GetKeys = function (subvension, ownerSubject) {
            if (subvension === void 0) { subvension = this.Subvension.ForeignKey.Value; }
            if (ownerSubject === void 0) { ownerSubject = this.OwnerKey.Value; }
            if (this._keys == null) {
                this._keys = new SubvensionsTableWithParentKeys(subvension, ownerSubject);
            }
            else {
                this._keys.Subvension = subvension;
                this._keys.OwnerKey = ownerSubject;
            }
            return this._keys;
        };
        SubjectSubvensionsDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        SubjectSubvensionsDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        SubjectSubvensionsDataTable.prototype.ResetData = function (keys) {
            this.Document.CommonRules.ResetTableDataWithKeys(this, keys, this.Total);
        };
        SubjectSubvensionsDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, this.Total);
        };
        return SubjectSubvensionsDataTable;
    }(ObasTableWithKeysParent));
    F05314.SubjectSubvensionsDataTable = SubjectSubvensionsDataTable;
})(F05314 || (F05314 = {}));
