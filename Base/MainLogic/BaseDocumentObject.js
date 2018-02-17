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
var BaseDocumentObject = (function (_super) {
    __extends(BaseDocumentObject, _super);
    function BaseDocumentObject(id, version, oldVersion) {
        var _this = _super.call(this, id, version, oldVersion) || this;
        _this._formParametersTable = null;
        _this._mainParametersTable = null;
        _this._fileType = null;
        _this._isDelta = null;
        _this._obasVersion = null;
        _this._obasKey = null;
        _this._totalTable = null;
        _this.DeltaDocId = null;
        _this.ApprovedDocId = null;
        _this.NotOnUpdate = true;
        _this._commonRules = new CommonRulesCollection(_this);
        _this._settings = new DocumentSettings(_this);
        return _this;
    }
    Object.defineProperty(BaseDocumentObject.prototype, "TotalTable", {
        get: function () {
            throw new Error("Must be implemented in derived class");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "FileType", {
        get: function () {
            if ((this._fileType == null) || (this._fileType === DocumentFileType.Undefined))
                this.InitFileType();
            return this._fileType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "IsDeltaObas", {
        get: function () {
            if (this._isDelta == null)
                this.InitFileType();
            return this._isDelta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "IsSecret", {
        get: function () {
            return this.FormParametersTable.IsSecretForm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "ObasVersion", {
        get: function () {
            if (this._obasVersion == null) {
                this._obasVersion = this.MainParametersTable.ObasVersion.Value;
            }
            return this._obasVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "ObasKey", {
        get: function () {
            if (this._obasKey == null) {
                var rroObasKey = ObasTableCollection.RroObasVersionsTable.RroObasKey.LookupByKeys(this.ObasVersion);
                this._obasKey = ObasTableCollection.RroObasTable.Obas.ForeignKey.LookupByKeys(rroObasKey);
            }
            return this._obasKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "Settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "CommonRules", {
        get: function () {
            return this._commonRules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "MainParametersTable", {
        get: function () {
            if (this._mainParametersTable == null)
                this._mainParametersTable = new MainParametersTable(this);
            return this._mainParametersTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDocumentObject.prototype, "FormParametersTable", {
        get: function () {
            if (this._formParametersTable == null)
                this._formParametersTable = new FormParametersTable(this);
            return this._formParametersTable;
        },
        enumerable: true,
        configurable: true
    });
    BaseDocumentObject.prototype.InitFileType = function () {
        switch (this.MainParametersTable.FileType.Value) {
            case 1:
                this._fileType = DocumentFileType.Obas;
                break;
            case 2:
                this._fileType = DocumentFileType.DeltaObas;
                break;
            case 3:
                this._fileType = DocumentFileType.IssuesPlanObas;
                break;
            case 4:
                this._fileType = DocumentFileType.PlanObas;
                break;
            case 5:
                this._fileType = DocumentFileType.Stage1Obas;
                break;
            case 6:
                this._fileType = DocumentFileType.IssuesStage1Obas;
                break;
            default:
                this._fileType = DocumentFileType.Undefined;
                break;
        }
        var typeName = DocumentFileType[this._fileType];
        this._isDelta = typeName.indexOf("Delta") === 0;
    };
    BaseDocumentObject.prototype.ClearAllLocateFlags = function () {
        this.Tables.forEach(function (tableId, table) {
            table.ClearLocateFlag();
        });
    };
    BaseDocumentObject.prototype.IterateByYears = function (handler, converToYearIndex) {
        if (converToYearIndex === void 0) { converToYearIndex = true; }
        for (var i = 0, yearsCount = this.Settings.YearsCount; i < yearsCount; i++) {
            handler(converToYearIndex ? i + 1 : i);
        }
    };
    BaseDocumentObject.prototype.StartUpdate = function () {
        this.EnableRulesAndNotice = false;
        this.Settings.CanShowWarning = false;
        this.NotOnUpdate = false;
    };
    BaseDocumentObject.prototype.EndUpdate = function () {
        this.NotOnUpdate = true;
        this.EnableRulesAndNotice = true;
        this.Settings.CanShowWarning = true;
    };
    return BaseDocumentObject;
}(DocumentObject));
var BaseOrgDocumentObject = (function (_super) {
    __extends(BaseOrgDocumentObject, _super);
    function BaseOrgDocumentObject(id, version, oldVersion, uniqOrgTableId) {
        var _this = _super.call(this, id, version, oldVersion) || this;
        _this._uniqOrgTable = null;
        _this._uniqOrgTableId = uniqOrgTableId;
        _this.Settings.YearsCount = ObasStageSettings.YearsCount;
        return _this;
    }
    Object.defineProperty(BaseOrgDocumentObject.prototype, "UniqueOrgsTable", {
        get: function () {
            if (this._uniqOrgTable == null) {
                this._uniqOrgTable = new UniqueOrgsObasTable(this._uniqOrgTableId);
            }
            return this._uniqOrgTable;
        },
        enumerable: true,
        configurable: true
    });
    return BaseOrgDocumentObject;
}(BaseDocumentObject));
var BaseTypedOrgDocumentObject = (function (_super) {
    __extends(BaseTypedOrgDocumentObject, _super);
    function BaseTypedOrgDocumentObject(id, version, oldVersion, uniqOrgTableId) {
        var _this = _super.call(this, id, version, oldVersion, uniqOrgTableId) || this;
        _this._uniqOrgTable = null;
        return _this;
    }
    Object.defineProperty(BaseTypedOrgDocumentObject.prototype, "UniqueOrgsTable", {
        get: function () {
            if (this._uniqOrgTable == null) {
                this._uniqOrgTable = new UniqueTypedOrgsObasTable(this._uniqOrgTableId, this);
            }
            return this._uniqOrgTable;
        },
        enumerable: true,
        configurable: true
    });
    return BaseTypedOrgDocumentObject;
}(BaseOrgDocumentObject));
var BaseExtendOrgDocumentObject = (function (_super) {
    __extends(BaseExtendOrgDocumentObject, _super);
    function BaseExtendOrgDocumentObject(id, version, oldVersion, uniqOrgTableId) {
        var _this = _super.call(this, id, version, oldVersion, uniqOrgTableId) || this;
        _this._uniqOrgTable = null;
        return _this;
    }
    Object.defineProperty(BaseExtendOrgDocumentObject.prototype, "UniqueOrgsTable", {
        get: function () {
            if (this._uniqOrgTable == null) {
                this._uniqOrgTable = new UniqueExtendOrgsObasTable(this._uniqOrgTableId, this);
            }
            return this._uniqOrgTable;
        },
        enumerable: true,
        configurable: true
    });
    return BaseExtendOrgDocumentObject;
}(BaseOrgDocumentObject));
var BasePartIndicateBudgetDocumentObject = (function (_super) {
    __extends(BasePartIndicateBudgetDocumentObject, _super);
    function BasePartIndicateBudgetDocumentObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasePartIndicateBudgetDocumentObject.prototype.SaveTotalTableAndPartIndicateBudgetTables = function (tableId) {
        this.CommonRules.SaveTotalTable(tableId);
        ObasHelper.GetFullDirectoryPath(this.ObasVersion);
        var params = [];
        params.push(this.FileType);
        params.push(this.ObasVersion);
        var budgetData = [
            {
                Key: PartIndicateBudgetTypes.Part1,
                Data: this.GetPartIndicateBudgetData(PartIndicateBudgetTypes.Part1)
            },
            {
                Key: PartIndicateBudgetTypes.Part3,
                Data: this.GetPartIndicateBudgetData(PartIndicateBudgetTypes.Part3)
            }
        ];
        params.push(budgetData);
        Client.SendMessage(Client.MainDocumentId, "%Doc%.TableRules.UpdateRROIndicateBudget", params);
    };
    return BasePartIndicateBudgetDocumentObject;
}(BaseDocumentObject));
