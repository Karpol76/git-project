var SecurityTypes;
(function (SecurityTypes) {
    SecurityTypes[SecurityTypes["Secret"] = 1] = "Secret";
    SecurityTypes[SecurityTypes["TopSecret"] = 2] = "TopSecret";
    SecurityTypes[SecurityTypes["DSP"] = 3] = "DSP";
    SecurityTypes[SecurityTypes["NotSecret"] = 4] = "NotSecret";
})(SecurityTypes || (SecurityTypes = {}));
var FillCharactersDirection;
(function (FillCharactersDirection) {
    FillCharactersDirection[FillCharactersDirection["First"] = 1] = "First";
    FillCharactersDirection[FillCharactersDirection["Last"] = 2] = "Last";
})(FillCharactersDirection || (FillCharactersDirection = {}));
var DateFormat;
(function (DateFormat) {
    DateFormat[DateFormat["Long"] = 1] = "Long";
    DateFormat[DateFormat["Middle"] = 2] = "Middle";
    DateFormat[DateFormat["Short"] = 3] = "Short";
    DateFormat[DateFormat["Json"] = 4] = "Json";
})(DateFormat || (DateFormat = {}));
var ObasHelper = (function () {
    function ObasHelper() {
    }
    Object.defineProperty(ObasHelper, "MonthName", {
        get: function () {
            return ObasHelper._monthNames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasHelper, "X", {
        get: function () {
            return ObasHelper._x;
        },
        enumerable: true,
        configurable: true
    });
    ObasHelper.GetSynonymCostType = function (costTypeCode) {
        if (ObasHelper.CheckPartialCode(costTypeCode, ["1.9", "1.1"], 3)) {
            return costTypeCode.substr(0, 2) + (costTypeCode.substr(2, 1) === "1" ? "9" : "1");
        }
        return undefined;
    };
    ObasHelper.CanUpdateTo = function (document, version) {
        var compOld = Client.VersionCompare(document.OldVersion, version);
        var compCur = Client.VersionCompare(document.Version, version);
        return compOld === -1 && (compCur === 1 || compCur === 0);
    };
    ObasHelper.DoLongOperation = function (operation) {
        Client.SetCursorType(TypeCursor.crHourGlass);
        operation();
        Client.SetCursorType(TypeCursor.crDefault);
    };
    ObasHelper.GetSynonymRROKey = function (rroDataKey) {
        var rroData = ObasTableCollection.RroDataTable;
        var costTypeSpr = ObasTableCollection.CostTypeTable;
        var result = null;
        if (rroData.LocateByKeys(rroDataKey)) {
            var codeVr = rroData.CostType.Code;
            var needCode = ObasHelper.GetSynonymCostType(codeVr);
            var outlayKey = rroData.RroOutlayKey.Value;
            var locateFields = rroData.GetKbkKeyFieldsId();
            locateFields.push(rroData.RroOutlayKey.Id);
            var locateVals = rroData.GetKbkKeyFieldsValue();
            var costTypeIndex = locateFields.indexOf(rroData.CostType.ForeignKey.Id);
            if (costTypeIndex > -1) {
                locateVals[costTypeIndex] = costTypeSpr.Lookup([costTypeSpr.Code.Id], [needCode], costTypeSpr.RecordKey.Id);
            }
            locateVals.push(outlayKey);
            result = rroData.Lookup(locateFields, locateVals, rroData.RecordKey.Id);
        }
        return result;
    };
    ObasHelper.ConstraintYearEditCellHandler = function (sheetId, row, column, fieldId, rowLevel, oldValue, newValue) {
        var message = null;
        if ((fieldId === BaseObasTableFields.YearField.Id) && ((newValue < 1000) || (newValue > 9999)))
            message = "Год должен составлять 4 знака";
        if (message) {
            Client.ShowMessage("Ошибка", message, MessageIcons.Error);
            return false;
        }
        else {
            return true;
        }
    };
    ObasHelper.GetVRCodeFOT = function (costTypeCode) {
        if (ObasHelper.IsInsuranceCode(costTypeCode)) {
            return ObasHelper.GetSynonymCostType(costTypeCode);
        }
        return costTypeCode;
    };
    ObasHelper.GetTrue = function () {
        return true;
    };
    ObasHelper.GetFalse = function () {
        return false;
    };
    ObasHelper.Get0 = function () {
        return 0;
    };
    ObasHelper.GetToday = function () {
        var today = new Date();
        return today;
    };
    ObasHelper.GetYearOffsetById = function (id) {
        var index = this.GetYearIndexById(id);
        return index > -1 ? index - 1 : null;
    };
    ObasHelper.GetYearOffset = function (param) {
        if (typeof param !== "number") {
            param = param.Year.NValue;
        }
        return param - ObasStageSettings.CurrentYear;
    };
    ObasHelper.GetYearIndexById = function (id) {
        var yearSignIndexes = DocumentSettings.YearSignIndexes;
        for (var i = 0, len = yearSignIndexes.length; i < len; i++) {
            var index = id.indexOf(yearSignIndexes[i]);
            if (index > -1) {
                return i;
            }
        }
        return -1;
    };
    ObasHelper.ModRound = function (value, precision) {
        var prec = Math.pow(10, precision);
        var coef = value < 0 ? -1 : 1;
        return coef * Math.round(Math.abs(value) * prec) / prec;
    };
    ObasHelper.GetSynonymOBASKey = function (obasVersion) {
        var versionTable = ObasTableCollection.RroObasVersionsTable;
        var result = null;
        if (versionTable.LocateByKeys(obasVersion)) {
            var synonymRROKey = ObasHelper.GetSynonymRROKey(versionTable.RroDataKey.Value);
            if (synonymRROKey != null) {
                var rroObas = ObasTableCollection.RroObasTable;
                var obasKey = rroObas.Obas.ForeignKey.LookupByKeys(versionTable.RroObasKey.Value);
                if (rroObas.Locate([rroObas.Obas.ForeignKey.Id, rroObas.RroDataKey.Id], [obasKey, synonymRROKey])) {
                    result = rroObas.RecordKey.Value;
                }
            }
        }
        return result;
    };
    ObasHelper.GetSynonymVersion = function (obasVersion) {
        var result = null;
        var synonymOBAS = ObasHelper.GetSynonymOBASKey(obasVersion);
        if (synonymOBAS != null) {
            var versionTable = ObasTableCollection.RroObasVersionsTable;
            result = versionTable.Lookup([versionTable.RroObasKey.Id, versionTable.VersionNumber.Id], [synonymOBAS, versionTable.VersionNumber.Value], versionTable.RecordKey.Id);
        }
        return result;
    };
    ObasHelper.ConvertToString = function (param, format) {
        if (param == null) {
            return "";
        }
        else if (param instanceof Date) {
            return ObasHelper.ConvertDateToString(param, format);
        }
        else if (typeof param === "number") {
            var result = param.toString();
            if (format != null) {
                result = ObasHelper.ModRound(param, format).toFixed(format).replace(/(\d)(?=(\d{3})+\.)/g, '$1' + ObasStageSettings.ThousandsSeparator);
            }
            return result.replace(/\./g, ",");
        }
        return param.toString();
    };
    ObasHelper.ConvertDateToString = function (date, format) {
        if (format === void 0) { format = DateFormat.Short; }
        switch (format) {
            case DateFormat.Long:
            case DateFormat.Middle:
                {
                    var result = "\" " + date.getDate() + " \" " + ObasHelper.MonthName[date.getMonth()].GenName + " " + date.getFullYear() + " \u0433.";
                    if (format === DateFormat.Long) {
                        result = "\u043E\u0442 " + result;
                    }
                    return result;
                }
            case DateFormat.Json:
                return date.toJSON();
            default:
                {
                    var result = new Array();
                    result.push(ObasHelper.FillWithCharacter(date.getDate().toString(), 2));
                    result.push(ObasHelper.FillWithCharacter((date.getMonth() + 1).toString(), 2));
                    result.push(date.getFullYear().toString());
                    return result.join(".");
                }
        }
    };
    ObasHelper.ConvertStringToDate = function (str, format) {
        if (format === void 0) { format = DateFormat.Short; }
        if (str == null || str.length === 0) {
            return null;
        }
        switch (format) {
            case DateFormat.Short:
                var parts = str.split(".").map(function (value) {
                    return parseInt(value, 10);
                });
                if (parts.length < 3) {
                    return null;
                }
                return new Date(parts[2], parts[1] - 1, parts[0]);
            default:
                throw new Error("Not implemented");
        }
    };
    ObasHelper.ConvertToNumber = function (data) {
        if (data == null) {
            return 0;
        }
        else if (typeof data === "number") {
            return data;
        }
        var parsedData = parseFloat(data.toString().replace(/\u00A0/g, "").replace(/,/g, "."));
        return isNaN(parsedData) ? 0 : parsedData;
    };
    ObasHelper.CheckPartialCode = function (code, patterns, maxLength) {
        var result = false;
        if (code != null) {
            result = code.length <= maxLength;
            if (result && patterns != null) {
                var valid = false;
                for (var i = 0; i < patterns.length; i++) {
                    var regExp = new RegExp(patterns[i]);
                    valid = regExp.test(code);
                    if (valid) {
                        break;
                    }
                }
                result = valid;
            }
        }
        return result;
    };
    ObasHelper.IsInsuranceCode = function (costTypeCode) {
        return ObasHelper.CheckPartialCode(costTypeCode, ["1.9"], 3);
    };
    ObasHelper.FillWithCharacter = function (source, count, character, direction) {
        if (character === void 0) { character = "0"; }
        if (direction === void 0) { direction = FillCharactersDirection.First; }
        count -= source.toString().length;
        if (count > 0) {
            var addStr = new Array(count + 1).join(character);
            switch (direction) {
                case FillCharactersDirection.First:
                    return addStr + source;
                case FillCharactersDirection.Last:
                    return source + addStr;
                default:
                    return addStr + source;
            }
        }
        return source;
    };
    ObasHelper.GenerateYearsRange = function (yearsCount) {
        if (yearsCount === void 0) { yearsCount = ObasStageSettings.YearsCount; }
        var result = [];
        for (var i = 1; i <= yearsCount; i++) {
            result.push(i);
        }
        return result;
    };
    ObasHelper.CalcYearColumnCaption = function (index, startYear) {
        if (startYear === void 0) { startYear = ObasStageSettings.CurrentYear; }
        return (startYear + index).toString();
    };
    ObasHelper.GetFileName = function (fileType, obasVersion, ignoreApprove, withFullPath, usePostfix, includeVersionNumber, autoGenerate) {
        if (ignoreApprove === void 0) { ignoreApprove = false; }
        if (withFullPath === void 0) { withFullPath = false; }
        if (usePostfix === void 0) { usePostfix = false; }
        if (includeVersionNumber === void 0) { includeVersionNumber = true; }
        if (autoGenerate === void 0) { autoGenerate = false; }
        var obasVersionTable = ObasTableCollection.RroObasVersionsTable;
        obasVersionTable.LocateByKeys(obasVersion);
        var txt = (withFullPath ? ObasHelper.GetFullDirectoryPath(obasVersion) : "") + obasVersionTable.GetFileName(fileType, autoGenerate) + (withFullPath ? ".xml" : "");
        return txt;
    };
    ObasHelper.GetTemplateFileName = function (fileType, obasKey, withDirectory) {
        if (withDirectory == null)
            withDirectory = false;
        var result = null;
        var spr = ObasTableCollection.ObasSprTable;
        if (spr.LocateByKeys(obasKey)) {
            var code = spr.Code.Value;
            result = (withDirectory ? ObasStageSettings.TemplateDirectory + "\\" : "") +
                ("F" + code.substring(1) + ".xml");
        }
        return result;
    };
    ObasHelper.GetGroupFileId = function (rroObasKey) {
        var result = "NewTemplateGroup";
        var rroObas = ObasTableCollection.RroObasTable;
        if (rroObas.LocateByKeys(rroObasKey)) {
            result = rroObas.Obas.Code + "_" + ObasHelper.GetDirectoryNameForObas(rroObasKey);
        }
        return result;
    };
    ObasHelper.GetFullDirectoryPath = function (obasVersion, mustCreate) {
        if (mustCreate === void 0) { mustCreate = true; }
        var path = ObasStageSettings.TemplateDirectory + "\\" + ObasStageSettings.WorkDirectory + "\\";
        if (mustCreate && !Client.IsDirectoryExists(path)) {
            Client.CreateDirectory(path);
        }
        return path;
    };
    ObasHelper.GetDirectoryName = function (obasVersion) {
        var rroObasKey = ObasTableCollection.RroObasVersionsTable.RroObasKey.LookupByKeys(obasVersion);
        return ObasHelper.GetDirectoryNameForObas(rroObasKey);
    };
    ObasHelper.GetDirectoryNameForObas = function (rroObasKey) {
        var rroObasTable = ObasTableCollection.RroObasTable;
        if (rroObasTable.LocateByKeys(rroObasKey)) {
            var rroDataTable = ObasTableCollection.RroDataTable;
            var rroDataKey = rroObasTable.RroDataKey.Value;
            if (rroDataTable.LocateByKeys(rroDataKey)) {
                var nameParts = new Array();
                nameParts.push(rroDataTable.Foiv.Code);
                nameParts.push(rroDataTable.Fcr.Code);
                nameParts.push(rroDataTable.GetCSRCode());
                nameParts.push(ObasHelper.GetVRCodeFOT(rroDataTable.CostType.Code));
                return nameParts.join("_");
            }
        }
        return "";
    };
    ObasHelper.GetStartExportDirectiry = function () {
        var buildParams = ObasTableCollection.BuildParamsTable;
        var exportDir = buildParams.ExportDirectory.Value;
        if (!Client.IsDirectoryExists(exportDir)) {
            exportDir = ObasStageSettings.ExportExcelDirectory;
            if (!Client.IsDirectoryExists(exportDir)) {
                Client.CreateDirectory(exportDir);
                buildParams.ExportDirectory.Value = exportDir;
            }
        }
        return exportDir;
    };
    ObasHelper.GetMachineExportDirectiry = function () {
        var exportDir = ObasStageSettings.ExportMachineDirectory;
        if (!Client.IsDirectoryExists(exportDir)) {
            Client.CreateDirectory(exportDir);
        }
        return exportDir;
    };
    ObasHelper.GetExportDirectory = function () {
        var date = new Date();
        var dirName = "" + date.getFullYear();
        dirName += ObasHelper.FillWithCharacter("" + (date.getMonth() + 1), 2);
        dirName += ObasHelper.FillWithCharacter("" + date.getDate(), 2);
        dirName += "_";
        dirName += ObasHelper.FillWithCharacter("" + date.getHours(), 2);
        dirName += ObasHelper.FillWithCharacter("" + date.getMinutes(), 2);
        dirName += "00";
        dirName = ObasHelper.GetStartExportDirectiry() + "\\" + dirName;
        if (!Client.IsDirectoryExists(dirName)) {
            if (Client.CreateDirectory(dirName)) {
                dirName += "\\";
            }
            else {
                dirName = "";
            }
        }
        return dirName;
    };
    ObasHelper.SetSumByKeys = function (table, keyfieldIds, keyFieldValues, datafieldId, oldValue, newValue, addIfNotExist) {
        if (addIfNotExist === void 0) { addIfNotExist = true; }
        var delta = newValue - oldValue;
        if (table.Locate(keyfieldIds, keyFieldValues)) {
            var currentValue = table.GetFieldValue(datafieldId);
            table.SetFieldValue(datafieldId, currentValue + delta);
        }
        else if (addIfNotExist) {
            table.AddRow();
            for (var i = 0; i < keyfieldIds.length; i++) {
                table.SetFieldValue(keyfieldIds[i], keyFieldValues[i], false);
            }
            table.PostRow();
            table.SetFieldValue(datafieldId, delta);
        }
    };
    ObasHelper.GetValueByKeys = function (table, keyfieldIds, keyFieldValues, datafieldId, addIfNotExist) {
        if (addIfNotExist === void 0) { addIfNotExist = true; }
        var result = null;
        if (table.Locate(keyfieldIds, keyFieldValues)) {
            result = table.GetFieldValue(datafieldId);
        }
        else if (addIfNotExist) {
            table.AddRow();
            for (var i = 0; i < keyfieldIds.length; i++) {
                table.SetFieldValue(keyfieldIds[i], keyFieldValues[i], false);
            }
            table.PostRow();
            result = table.GetFieldValue(datafieldId);
        }
        return result;
    };
    ObasHelper.CollectKosguData = function (kosguTable) {
        var data = [];
        var reader = kosguTable.CreateReader();
        var yearField = BaseObasTableFields.YearDataField;
        var yearsCnt = ObasStageSettings.YearsCount;
        while (reader.Read()) {
            var record = {
                Key: reader.GetFieldValue("KOSGU_Id"),
                Data: []
            };
            for (var i = 0; i < yearsCnt; i++) {
                record.Data[i] = reader.GetFieldValue(yearField.GenerateId(i + 1)) || 0;
            }
            data.push(record);
        }
        return data;
    };
    ObasHelper.GetSubjPlanBudgCode = function (govProgramSrc) {
        var sbpGpLinks = ObasTableCollection.SubjPlanBudgGovProgLinksTable;
        var spbCode = sbpGpLinks.Lookup(sbpGpLinks.GovProgCode.Id, govProgramSrc.GovermentProgram.Code, sbpGpLinks.SubjPlanBudgCode.Id);
        return ObasHelper.ConvertToString(spbCode);
    };
    ObasHelper.GetSubjPlanBudgName = function (govProgramSrc) {
        var sbpFoivLinks = ObasTableCollection.SubjPlanBudgFoivLinksTable;
        var spbName = sbpFoivLinks.Lookup(sbpFoivLinks.Code.Id, ObasHelper.GetSubjPlanBudgCode(govProgramSrc), sbpFoivLinks.Name.Id);
        return ObasHelper.ConvertToString(spbName);
    };
    ObasHelper.CheckObasKbkLink = function (csrCode, costTypeCode, foivCode, csrCodeLength) {
        if (csrCodeLength === void 0) { csrCodeLength = 10; }
        var obasKbkLinks = ObasTableCollection.ObasKbkLinksTable;
        return ObasHelper.CheckPartialCode(foivCode, obasKbkLinks.FoivCodes, 3) &&
            ObasHelper.CheckPartialCode(costTypeCode, obasKbkLinks.CostTypeCodes, 3) &&
            (obasKbkLinks.ExeptFoivCodes == null || !ObasHelper.CheckPartialCode(foivCode, obasKbkLinks.ExeptFoivCodes, 3)) &&
            ObasHelper.CheckPartialCode(csrCode, obasKbkLinks.CsrCodes, csrCodeLength) &&
            (obasKbkLinks.ExeptCsrCodes == null || !ObasHelper.CheckPartialCode(csrCode, obasKbkLinks.ExeptCsrCodes, csrCodeLength));
    };
    ObasHelper.ConvertToArray = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = [];
        for (var i = 0, len = args.length; i < len; i++) {
            result.push(args[i]);
        }
        return result;
    };
    ObasHelper.CheckIsReadyForCopy = function (info, filter) {
        var result = (info != null);
        if (result) {
            result = info.size() > 0;
            if (result) {
                var values = info.values();
                if (filter != null) {
                    values = values.filter(filter);
                }
                result = values.every(function (value) {
                    return value.Value != null;
                });
            }
        }
        return result;
    };
    ObasHelper.CreateSimpleInitCopyFieldsInfo = function (param) {
        var result = new collections.Dictionary();
        var fields = param instanceof Array ? param : param.CopyFields;
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            result.setValue(field.Id, {
                Id: field.Id,
                IsData: !field.IsKeyField
            });
        }
        return result;
    };
    ObasHelper.CreateInitCopyFieldsInfo = function (table) {
        return ObasHelper.CreateSimpleInitCopyFieldsInfo([table.IsCopied].concat(table.CopyFields));
    };
    ObasHelper.DeleteOldData = function () {
        var tables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tables[_i] = arguments[_i];
        }
        var yearFilter = function (table) {
            return table.Year.Value < ObasStageSettings.CurrentYear;
        };
        for (var _a = 0, tables_1 = tables; _a < tables_1.length; _a++) {
            var table = tables_1[_a];
            table.DeleteAllRow(yearFilter);
        }
    };
    ObasHelper.GetEnumLength = function (enumClass) {
        return Object.keys(enumClass).length / 2;
    };
    return ObasHelper;
}());
ObasHelper._x = "X";
ObasHelper._monthNames = [
    { NomName: "\u044F\u043D\u0432\u0430\u0440\u044C", GenName: "\u044F\u043D\u0432\u0430\u0440\u044F" },
    { NomName: "\u0444\u0435\u0432\u0440\u0430\u043B\u044C", GenName: "\u0444\u0435\u0432\u0440\u0430\u043B\u044F" },
    { NomName: "\u043C\u0430\u0440\u0442", GenName: "\u043C\u0430\u0440\u0442\u0430" },
    { NomName: "\u0430\u043F\u0440\u0435\u043B\u044C", GenName: "\u0430\u043F\u0440\u0435\u043B\u044F" },
    { NomName: "\u043C\u0430\u0439", GenName: "\u043C\u0430\u044F" },
    { NomName: "\u0438\u044E\u043D\u044C", GenName: "\u0438\u044E\u043D\u044F" },
    { NomName: "\u0438\u044E\u043B\u044C", GenName: "\u0438\u044E\u043B\u044F" },
    { NomName: "\u0430\u0432\u0433\u0443\u0441\u0442", GenName: "\u0430\u0432\u0433\u0443\u0441\u0442\u0430" },
    { NomName: "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C", GenName: "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F" },
    { NomName: "\u043E\u043A\u0442\u044F\u0431\u0440\u044C", GenName: "\u043E\u043A\u0442\u044F\u0431\u0440\u044F" },
    { NomName: "\u043D\u043E\u044F\u0431\u0440\u044C", GenName: "\u043D\u043E\u044F\u0431\u0440\u044F" },
    { NomName: "\u0434\u0435\u043A\u0430\u0431\u0440\u044C", GenName: "\u0434\u0435\u043A\u0430\u0431\u0440\u044F" }
];
var ObasExportHelper = (function () {
    function ObasExportHelper() {
    }
    ObasExportHelper.GetCaption = function () {
        var captionParts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            captionParts[_i] = arguments[_i];
        }
        return captionParts.join("");
    };
    ObasExportHelper.GetYearCaption = function (yearOffset, prefix, postfix) {
        if (yearOffset === void 0) { yearOffset = "0"; }
        if (prefix === void 0) { prefix = ""; }
        if (postfix === void 0) { postfix = ""; }
        var year = ObasStageSettings.CurrentYear + parseInt(yearOffset, 10);
        return prefix + "\u043D\u0430 " + year + " \u0433\u043E\u0434" + postfix;
    };
    ObasExportHelper.GetMiddleDate = function () {
        return ObasHelper.ConvertToString(new Date(), DateFormat.Middle);
    };
    ObasExportHelper.GetLongDate = function () {
        return ObasHelper.ConvertToString(new Date(), DateFormat.Long);
    };
    ObasExportHelper.GetShortDate = function () {
        return ObasHelper.ConvertToString(new Date(), DateFormat.Short);
    };
    ObasExportHelper.GetCopyNumber = function () {
        return "\u042D\u043A\u0437.\u2116" + ObasHelper.ConvertToString(ObasTableCollection.RroObasNumbersTable.CopyNumber.Value);
    };
    ObasExportHelper.GetStringNumber = function () {
        var num = ObasTableCollection.RroObasNumbersTable.StringNumber.Value;
        return (num == null ? "" : num);
    };
    ObasExportHelper.GetBossPost = function () {
        return ObasHelper.ConvertToString(ObasTableCollection.RroObasRecvisitsTable.Boss.Post.Value);
    };
    ObasExportHelper.GetBossName = function () {
        return ObasHelper.ConvertToString(ObasTableCollection.RroObasRecvisitsTable.Boss.Name.Value);
    };
    ObasExportHelper.GetFinBossName = function () {
        return ObasHelper.ConvertToString(ObasTableCollection.RroObasRecvisitsTable.CFO.Name.Value);
    };
    ObasExportHelper.GetPerfPost = function () {
        return ObasHelper.ConvertToString(ObasTableCollection.RroObasRecvisitsTable.Executor.Post.Value);
    };
    ObasExportHelper.GetPerfName = function () {
        return ObasHelper.ConvertToString(ObasTableCollection.RroObasRecvisitsTable.Executor.Name.Value);
    };
    ObasExportHelper.GetPerfPNumber = function () {
        return ObasHelper.ConvertToString(ObasTableCollection.RroObasRecvisitsTable.Executor.Phone.Value);
    };
    ObasExportHelper.GetFoivName = function () {
        return ObasTableCollection.SelectedFoivTable.Foiv.Name;
    };
    ObasExportHelper.GetFoivCode = function () {
        return ObasTableCollection.SelectedFoivTable.Foiv.Code;
    };
    ObasExportHelper.GetRecipientName = function () {
        return ObasTableCollection.SelectedFoivTable.RecipientName;
    };
    ObasExportHelper.GetRecipientCode = function () {
        return ObasTableCollection.SelectedFoivTable.RecipientRegCode;
    };
    ObasExportHelper.GetManagerName = function () {
        return ObasTableCollection.SelectedFoivTable.ManagerName;
    };
    ObasExportHelper.GetManagerCode = function () {
        return ObasTableCollection.SelectedFoivTable.ManagerRegCode;
    };
    ObasExportHelper.GetSecurityType = function () {
        return ObasHelper.ConvertToString(ObasTableCollection.RroSecurityTypeTable.SecurityType.Name);
    };
    ObasExportHelper.GetSecurityBase = function () {
        return ObasHelper.ConvertToString(ObasTableCollection.RroSecurityTypeTable.SecurityBase.Value);
    };
    Object.defineProperty(ObasExportHelper, "BudgetName", {
        get: function () {
            return ObasTableCollection.SelectedFoivTable.BudgetName.Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasExportHelper, "UserOktmo", {
        get: function () {
            return ObasTableCollection.SelectedFoivTable.UserOktmoCode;
        },
        enumerable: true,
        configurable: true
    });
    ObasExportHelper.GetActionCode = function (table) {
        return ObasTableCollection.MainActionTable.ShortCode.
            LookupByKeys(table.MainAction.ForeignKey.Value);
    };
    ObasExportHelper.GetExcelData = function (value) {
        return value;
    };
    return ObasExportHelper;
}());
