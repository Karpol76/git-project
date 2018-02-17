var F03110;
(function (F03110) {
    var UpdateRules = (function () {
        function UpdateRules(_document) {
            this._document = _document;
        }
        UpdateRules.prototype.UpdateTemplate = function (oldVersion, currentVersion) {
            this._document.StartUpdate();
            this._document.EndUpdate();
        };
        UpdateRules.prototype.ShiftData = function () {
            var yearDataField = BaseObasTableFields.YearDataField;
            var srcField = [];
            var destField = [];
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                destField.push(yearDataField.GenerateId(i));
                if (i === ObasStageSettings.YearsCount) {
                    srcField.push(null);
                }
                else {
                    srcField.push(yearDataField.GenerateId(i + 1));
                }
            }
            this._document.CommonRules.ShiftTableData(this._document.P1TotalTable, srcField, destField);
            var yearFilter = function (table) {
                return table.GetFieldValue(BaseObasTableFields.YearField.Id) < ObasStageSettings.CurrentYear;
            };
            this._document.PnoDataTable.DeleteAllRow(yearFilter);
        };
        UpdateRules.prototype.CopyData = function () {
            this._document.RecipientDataTable.CopyData();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var recipientsTable = this._document.RecipientDataTable;
            var recipientsData = recipientsTable.CollectUserData();
            recipientsTable.ResetData();
            this._document.P1TotalTable.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            recipientsTable.SetupTableData(recipientsData);
            curState.RestoreState();
        };
        return UpdateRules;
    }());
    F03110.UpdateRules = UpdateRules;
})(F03110 || (F03110 = {}));
