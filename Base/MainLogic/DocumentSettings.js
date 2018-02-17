var DocumentSettings = (function () {
    function DocumentSettings(_documnet) {
        this._documnet = _documnet;
        this._activeYear = ObasStageSettings.CurrentYear;
        this._startYear = ObasStageSettings.CurrentYear;
        this._canShowWarning = false;
        this._yearsCount = ObasStageSettings.YearsCount;
        this._canShowFieldWarning = new collections.Dictionary();
        for (var i = 1; i < ObasStageSettings.YearsCount; i++) {
            this._canShowFieldWarning.setValue(BaseObasTableFields.YearDataField.GenerateId(i), true);
        }
    }
    Object.defineProperty(DocumentSettings, "YearFieldId", {
        get: function () {
            return DocumentSettings._baseFieldsId[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings, "IsCopiedFlagFieldId", {
        get: function () {
            return DocumentSettings._baseFieldsId[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings, "YearSignIndexes", {
        get: function () {
            return DocumentSettings._yearSignIndexes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings, "YearSign", {
        get: function () {
            return DocumentSettings._yearSign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings, "YearSignIndex", {
        get: function () {
            return DocumentSettings._yearSignIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings.prototype, "ActiveYear", {
        get: function () {
            return this._activeYear;
        },
        set: function (value) {
            this._activeYear = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings.prototype, "YearsCount", {
        get: function () {
            return this._yearsCount;
        },
        set: function (value) {
            this._yearsCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings.prototype, "StartYear", {
        get: function () {
            return this._startYear;
        },
        set: function (value) {
            this._startYear = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings.prototype, "CanShowWarning", {
        get: function () {
            return this._canShowWarning;
        },
        set: function (value) {
            this._canShowWarning = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentSettings.prototype, "CanShowFieldWarning", {
        get: function () {
            return this._canShowFieldWarning;
        },
        enumerable: true,
        configurable: true
    });
    DocumentSettings.prototype.SetActiveYear = function (yearOffset) {
        if (yearOffset == null) {
            yearOffset = 0;
        }
        this._activeYear = ObasStageSettings.CurrentYear + yearOffset;
    };
    return DocumentSettings;
}());
DocumentSettings._baseFieldsId = ["StrCode", "IsTotal", "Year", "IsCopied"];
DocumentSettings._yearSignIndexes = ["Y0", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7"];
DocumentSettings._yearSign = "#Year";
DocumentSettings._yearSignIndex = "#Index";
var UpdateDocSettingsState = (function () {
    function UpdateDocSettingsState(_document) {
        this._document = _document;
        this.EnableRules = _document.EnableRules;
        this.CanShowWarning = _document.Settings.CanShowWarning;
        this.NotOnUpdate = _document.NotOnUpdate;
        this.EnableDatasetNotification = _document.EnableDatasetNotification;
    }
    UpdateDocSettingsState.prototype.RestoreState = function () {
        this._document.Settings.CanShowWarning = this.CanShowWarning;
        this._document.NotOnUpdate = this.NotOnUpdate;
        this._document.EnableDatasetNotification = this.EnableDatasetNotification;
        this._document.EnableRules = this.EnableRules;
    };
    return UpdateDocSettingsState;
}());
