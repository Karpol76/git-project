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
var F05102;
(function (F05102) {
    var TableRules = (function () {
        function TableRules(document) {
            this._document = document;
        }
        return TableRules;
    }());
    F05102.TableRules = TableRules;
    var P1StrKey;
    (function (P1StrKey) {
        P1StrKey[P1StrKey["Total"] = 1] = "Total";
    })(P1StrKey = F05102.P1StrKey || (F05102.P1StrKey = {}));
    var P1TotalTableExt = (function (_super) {
        __extends(P1TotalTableExt, _super);
        function P1TotalTableExt() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P1TotalTableExt.prototype.GetTotalKey = function () {
            return P1StrKey.Total;
        };
        P1TotalTableExt.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            _super.prototype.SumChangeEventHandler.call(this, tableId, oldValue, newValue, fieldId);
            this._document.P1TotalTable.SumChangeEventHandler(tableId, oldValue, newValue, fieldId);
        };
        return P1TotalTableExt;
    }(SubsidiesSubventions.P1TotalTableBase));
    F05102.P1TotalTableExt = P1TotalTableExt;
    var StrKeysP1Total;
    (function (StrKeysP1Total) {
        StrKeysP1Total[StrKeysP1Total["Total"] = 1] = "Total";
    })(StrKeysP1Total = F05102.StrKeysP1Total || (F05102.StrKeysP1Total = {}));
    var FObasTableP1Total = (function (_super) {
        __extends(FObasTableP1Total, _super);
        function FObasTableP1Total() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FObasTableP1Total.prototype.GetTotalKey = function () {
            return StrKeysP1Total.Total;
        };
        FObasTableP1Total.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
            if (this.StrKey === 100) {
                if (this.GetFieldValue(fieldId) < -100 || this.GetFieldValue(fieldId) > 100) {
                    Client.ShowMessage("\u041E\u0448\u0438\u0431\u043A\u0430", "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 -100 \u0434\u043E 100.", MessageIcons.Error);
                    this.SetFieldValue(fieldId, oldValue);
                }
            }
            if (tableId != this.Id) {
                this.Locate("StrKey", 100);
                var correction = this.GetFieldValue(fieldId);
                this.Locate("StrKey", StrKeysP1Total.Total);
                this.SetFieldValue(fieldId, this._document.TableP1.GetFieldValue(fieldId) + correction);
            }
            if (this.StrKey != StrKeysP1Total.Total) {
                this.Locate("StrKey", StrKeysP1Total.Total);
                this.SetFieldValue(fieldId, this._document.TableP1.GetFieldValue(fieldId) + newValue);
            }
        };
        return FObasTableP1Total;
    }(P1TotalObasTable));
    F05102.FObasTableP1Total = FObasTableP1Total;
    var KeyDictionary;
    (function (KeyDictionary) {
        KeyDictionary[KeyDictionary["Subject"] = 0] = "Subject";
        KeyDictionary[KeyDictionary["ScienceCity"] = 1] = "ScienceCity";
        KeyDictionary[KeyDictionary["Zato"] = 2] = "Zato";
        KeyDictionary[KeyDictionary["Municipal"] = 3] = "Municipal";
    })(KeyDictionary = F05102.KeyDictionary || (F05102.KeyDictionary = {}));
    var TableP2 = (function (_super) {
        __extends(TableP2, _super);
        function TableP2(id, _document) {
            var _this = _super.call(this, id) || this;
            _this._document = _document;
            _this._subject = null;
            _this._scienceCity = null;
            _this._zato = null;
            _this._municipalEntity = null;
            _this._copyFields = null;
            return _this;
        }
        Object.defineProperty(TableP2.prototype, "Document", {
            get: function () {
                return this._document;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "Subject", {
            get: function () {
                if (this._subject == null) {
                    this._subject = new ObasSprTableField(ObasTableCollection.SprSubject, this);
                }
                return this._subject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "ScienceCity", {
            get: function () {
                if (this._scienceCity == null) {
                    this._scienceCity = new ObasSprTableField(ObasTableCollection.SprScienceCity, this);
                }
                return this._scienceCity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "Zato", {
            get: function () {
                if (this._zato == null) {
                    this._zato = new ObasSprTableField(ObasTableCollection.SprSecurityAdmTerrEntity, this);
                }
                return this._zato;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableP2.prototype, "MunicipalEntity", {
            get: function () {
                if (this._municipalEntity == null) {
                    this._municipalEntity = new ObasSprTableField(ObasTableCollection.SprMunicipalEntity, this);
                }
                return this._municipalEntity;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.CalcNameColumn = function (tableId, fieldId) {
            var keyDic = this.Document.GetKeyDictionary();
            switch (keyDic) {
                case KeyDictionary.Subject:
                    return this.Subject.Name;
                case KeyDictionary.ScienceCity:
                    return this.ScienceCity.Name;
                case KeyDictionary.Zato:
                    return this.Zato.Name;
                case KeyDictionary.Municipal:
                    return this.MunicipalEntity.Name;
                default:
                    return "";
            }
        };
        Object.defineProperty(TableP2.prototype, "CopyFields", {
            get: function () {
                var _this = this;
                if (this._copyFields == null) {
                    this._copyFields = [this.Subject.ForeignKey, this.ScienceCity.ForeignKey, this.Zato.ForeignKey, this.MunicipalEntity.ForeignKey];
                    var yearField_1 = BaseObasTableFields.YearDataField;
                    this._document.IterateByYears(function (i) {
                        _this._copyFields.push(yearField_1.GenerateTableField(_this, i));
                    });
                }
                return this._copyFields;
            },
            enumerable: true,
            configurable: true
        });
        TableP2.prototype.InitCopyFieldsInfo = function () {
            return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
        };
        TableP2.prototype.CollectUserData = function () {
            return this.CollectTableData(this.InitCopyFieldsInfo());
        };
        TableP2.prototype.ResetData = function () {
            this._document.CommonRules.ResetTableData(this, [BaseObasTableFields.YearDataField]);
        };
        TableP2.prototype.CopyData = function (srcYear, destYear) {
            this._document.CommonRules.CopyTableData(this, srcYear, destYear, null, BaseObasTableFields.YearDataField);
        };
        return TableP2;
    }(ObasTable));
    F05102.TableP2 = TableP2;
})(F05102 || (F05102 = {}));
