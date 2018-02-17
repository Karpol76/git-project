var OutlayStatuses;
(function (OutlayStatuses) {
    OutlayStatuses[OutlayStatuses["Draft"] = 1] = "Draft";
    OutlayStatuses[OutlayStatuses["AgreeSubmit"] = 2] = "AgreeSubmit";
    OutlayStatuses[OutlayStatuses["Agreed"] = 3] = "Agreed";
    OutlayStatuses[OutlayStatuses["ApproveSubmit"] = 4] = "ApproveSubmit";
    OutlayStatuses[OutlayStatuses["Approved"] = 5] = "Approved";
})(OutlayStatuses || (OutlayStatuses = {}));
var BudgetAuthority;
(function (BudgetAuthority) {
    BudgetAuthority[BudgetAuthority["Recipient"] = 1] = "Recipient";
    BudgetAuthority[BudgetAuthority["Manager"] = 2] = "Manager";
    BudgetAuthority[BudgetAuthority["MainManager"] = 3] = "MainManager";
})(BudgetAuthority || (BudgetAuthority = {}));
var EditorShowMode;
(function (EditorShowMode) {
    EditorShowMode[EditorShowMode["Undefined"] = -1] = "Undefined";
    EditorShowMode[EditorShowMode["Create"] = 0] = "Create";
    EditorShowMode[EditorShowMode["Edit"] = 1] = "Edit";
    EditorShowMode[EditorShowMode["Preview"] = 2] = "Preview";
})(EditorShowMode || (EditorShowMode = {}));
var DocumentFileType;
(function (DocumentFileType) {
    DocumentFileType[DocumentFileType["Source"] = -2] = "Source";
    DocumentFileType[DocumentFileType["Undefined"] = -1] = "Undefined";
    DocumentFileType[DocumentFileType["Obas"] = 0] = "Obas";
    DocumentFileType[DocumentFileType["DeltaObas"] = 1] = "DeltaObas";
    DocumentFileType[DocumentFileType["IssuesPlanObas"] = 2] = "IssuesPlanObas";
    DocumentFileType[DocumentFileType["PlanObas"] = 3] = "PlanObas";
    DocumentFileType[DocumentFileType["Stage1Obas"] = 4] = "Stage1Obas";
    DocumentFileType[DocumentFileType["IssuesStage1Obas"] = 5] = "IssuesStage1Obas";
})(DocumentFileType || (DocumentFileType = {}));
var ObasStageType;
(function (ObasStageType) {
    ObasStageType[ObasStageType["First"] = 0] = "First";
    ObasStageType[ObasStageType["Plan"] = 1] = "Plan";
    ObasStageType[ObasStageType["Stage1"] = 2] = "Stage1";
})(ObasStageType || (ObasStageType = {}));
var PedState;
(function (PedState) {
    PedState[PedState["AgreementNotRequired"] = 1] = "AgreementNotRequired";
    PedState[PedState["OnAgreeing"] = 2] = "OnAgreeing";
    PedState[PedState["Agreed"] = 3] = "Agreed";
    PedState[PedState["NotAgreed"] = 4] = "NotAgreed";
})(PedState || (PedState = {}));
var KuDataType;
(function (KuDataType) {
    KuDataType[KuDataType["BA"] = 1] = "BA";
    KuDataType[KuDataType["LBO"] = 2] = "LBO";
})(KuDataType || (KuDataType = {}));
var VersionStatus;
(function (VersionStatus) {
    VersionStatus[VersionStatus["Empty"] = 1] = "Empty";
    VersionStatus[VersionStatus["Draft"] = 2] = "Draft";
    VersionStatus[VersionStatus["OnAgreeing"] = 3] = "OnAgreeing";
    VersionStatus[VersionStatus["Rejected"] = 4] = "Rejected";
    VersionStatus[VersionStatus["Agreed"] = 5] = "Agreed";
    VersionStatus[VersionStatus["Approved"] = 6] = "Approved";
})(VersionStatus || (VersionStatus = {}));
var ObasStageSettings = (function () {
    function ObasStageSettings() {
    }
    Object.defineProperty(ObasStageSettings, "GroupTemplateFileName", {
        get: function () {
            return ObasStageSettings._groupTemplateFileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasStageSettings, "TemplateDirectory", {
        get: function () {
            return ObasStageSettings._templateDirectory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasStageSettings, "ExcelTemplateDirectory", {
        get: function () {
            return ObasStageSettings._excelTemplateDirectory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasStageSettings, "YearsCount", {
        get: function () {
            return ObasStageSettings._yearsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasStageSettings, "FileType", {
        get: function () {
            return ObasStageSettings.CurrentStage * 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasStageSettings, "DeltaFileType", {
        get: function () {
            return ObasStageSettings.FileType + 1;
        },
        enumerable: true,
        configurable: true
    });
    ObasStageSettings.IterateByYears = function (handler, convertToYearIndex) {
        if (convertToYearIndex === void 0) { convertToYearIndex = true; }
        var startIndex = convertToYearIndex ? 1 : 0;
        var count = convertToYearIndex ? ObasStageSettings.YearsCount + 1 : ObasStageSettings.YearsCount;
        for (var i = startIndex; i < count; i++) {
            handler(i);
        }
    };
    return ObasStageSettings;
}());
ObasStageSettings._templateDirectory = "Templates";
ObasStageSettings._excelTemplateDirectory = "xls";
ObasStageSettings.ExportExcelDirectory = "Печатные формы";
ObasStageSettings._groupTemplateFileName = "GroupTemplate.xml";
ObasStageSettings._yearsCount = 3;
ObasStageSettings.WorkDirectory = "User";
ObasStageSettings.ExchangeDataTemplatePath = "MainData\\OutlayExchangeData.xml";
ObasStageSettings.RroPath = "MainData\\RRO_STAGE1.xml";
ObasStageSettings.ExportMachineDirectory = "Машиночитаемые данные";
ObasStageSettings.CanShowWarning = false;
ObasStageSettings.ThousandsSeparator = " ";
ObasStageSettings.CanCopy = true;
ObasStageSettings.Correction = 0;
ObasStageSettings.CurrentYear = 2018;
ObasStageSettings.BlockCurrentYear = false;
ObasStageSettings.CurrentStage = ObasStageType.First;
