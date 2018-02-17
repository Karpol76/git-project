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
var F03310;
(function (F03310) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        return TableRules;
    }());
    F03310.TableRules = TableRules;
    var StrKeysP1;
    (function (StrKeysP1) {
        StrKeysP1[StrKeysP1["Total"] = 1] = "Total";
    })(StrKeysP1 = F03310.StrKeysP1 || (F03310.StrKeysP1 = {}));
    var FObasTableP1Total = (function (_super) {
        __extends(FObasTableP1Total, _super);
        function FObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1.Total;
        };
        return FObasTableP1Total;
    }(P1TotalObasTable));
    F03310.FObasTableP1Total = FObasTableP1Total;
    var ObasTablePnoKeys = (function (_super) {
        __extends(ObasTablePnoKeys, _super);
        function ObasTablePnoKeys(PnoKey) {
            var _this = _super.call(this) || this;
            _this.PnoKey = PnoKey;
            return _this;
        }
        return ObasTablePnoKeys;
    }(ObasTableKeys));
    F03310.ObasTablePnoKeys = ObasTablePnoKeys;
    var PnoDataTable = (function (_super) {
        __extends(PnoDataTable, _super);
        function PnoDataTable(id, document) {
            var _this = _super.call(this, id, ["PNO_ID"], document) || this;
            _this._pno = null;
            return _this;
        }
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
        PnoDataTable.prototype.GetKeys = function (pnoKey) {
            if (pnoKey === void 0) { pnoKey = this.Pno.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new ObasTablePnoKeys(pnoKey);
            }
            else {
                this._keys.PnoKey = pnoKey;
            }
            return this._keys;
        };
        return PnoDataTable;
    }(ObasTableWithKeys));
    F03310.PnoDataTable = PnoDataTable;
    var ObasTablePnoRecipientKeys = (function (_super) {
        __extends(ObasTablePnoRecipientKeys, _super);
        function ObasTablePnoRecipientKeys(pnoKey, RecipientKey) {
            var _this = _super.call(this, pnoKey) || this;
            _this.RecipientKey = RecipientKey;
            return _this;
        }
        return ObasTablePnoRecipientKeys;
    }(ObasTablePnoKeys));
    F03310.ObasTablePnoRecipientKeys = ObasTablePnoRecipientKeys;
    var RecipientsDataTable = (function (_super) {
        __extends(RecipientsDataTable, _super);
        function RecipientsDataTable(id, parentTable) {
            var _this = _super.call(this, id, parentTable.KeyFieldIds.concat("RecipientCategory_ID"), parentTable.Document, parentTable) || this;
            _this._recipient = null;
            _this._copyData = null;
            _this._copyFields = null;
            return _this;
        }
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
        Object.defineProperty(RecipientsDataTable.prototype, "Pno", {
            get: function () {
                return this.ParentTable.Pno;
            },
            enumerable: true,
            configurable: true
        });
        RecipientsDataTable.prototype.GetKeys = function (pnoKey, recipientKey) {
            if (pnoKey === void 0) { pnoKey = this.Pno.ForeignKey.Value; }
            if (recipientKey === void 0) { recipientKey = this.Recipient.ForeignKey.Value; }
            if (this._keys == null) {
                this._keys = new ObasTablePnoRecipientKeys(pnoKey, recipientKey);
            }
            else {
                this._keys.PnoKey = pnoKey;
                this._keys.RecipientKey = recipientKey;
            }
            return this._keys;
        };
        return RecipientsDataTable;
    }(ObasTableWithKeysParent));
    F03310.RecipientsDataTable = RecipientsDataTable;
    var OkpdTable = (function (_super) {
        __extends(OkpdTable, _super);
        function OkpdTable(id, _parent) {
            var _this = _super.call(this, id) || this;
            _this._parent = _parent;
            _this._ownerKey = null;
            _this._okpd = null;
            return _this;
        }
        Object.defineProperty(OkpdTable.prototype, "ParentTable", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OkpdTable.prototype, "OwnerKey", {
            get: function () {
                if (this._ownerKey == null) {
                    this
                        ._ownerKey = new ObasForeignKeyTableFieldTyped(this._parent, this, BaseObasTableFields.OwnerKeyField.Id, false);
                }
                return this._ownerKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OkpdTable.prototype, "Okpd", {
            get: function () {
                if (this._okpd == null) {
                    this._okpd = new ObasSprTableField(ObasTableCollection.OkpdSprTable, this);
                }
                return this._okpd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OkpdTable.prototype, "Document", {
            get: function () {
                return this._parent.Document;
            },
            enumerable: true,
            configurable: true
        });
        return OkpdTable;
    }(SprTable));
    F03310.OkpdTable = OkpdTable;
    var ObjectDataTable = (function (_super) {
        __extends(ObjectDataTable, _super);
        function ObjectDataTable(id, document, parentTable, _p1Table) {
            var _this = _super.call(this, id, document, parentTable) || this;
            _this._p1Table = _p1Table;
            _this._object = null;
            _this._year = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(ObjectDataTable.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.OwnerKey, this.Object.ForeignKey, this.Year];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this.Document.IterateByYears(function (yearIndex) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, yearIndex));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectDataTable.prototype, "Year", {
            get: function () {
                if (this._year == null) {
                    this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
                }
                return this._year;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectDataTable.prototype, "Object", {
            get: function () {
                if (this._object == null) {
                    this._object = new ObasSprTableField(this.Document.PurchaseObjectsSprTable, this);
                }
                return this._object;
            },
            enumerable: true,
            configurable: true
        });
        ObjectDataTable.prototype.AfterDeleteEventHandler = function (tableId) {
            var _this = this;
            var yearField = BaseObasTableFields.YearDataField;
            this.Document.IterateByYears(function (i) {
                _this.SetFieldValue(yearField.GenerateId(i), 0);
            });
        };
        ObjectDataTable.prototype.CopyData = function (srcYear, destYear) {
            this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        ObjectDataTable.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        ObjectDataTable.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        ObjectDataTable.prototype.ResetData = function () {
            this.Document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        ObjectDataTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            this._p1Table.SetSumByKeys(fieldId, this._p1Table.GetKeys(StrKeysP1.Total), oldValue, newValue);
        };
        return ObjectDataTable;
    }(ObasTableWithSimpleKeysParent));
    F03310.ObjectDataTable = ObjectDataTable;
})(F03310 || (F03310 = {}));
