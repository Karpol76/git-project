var F03400;
(function (F03400) {
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
            this._document.P2GrantsTable.DeleteAllRow(yearFilter);
        };
        UpdateRules.prototype.CopyData = function () {
            this._document.P1TotalTable.CopyData();
            this._document.P2RecipientsTable.CopyData();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var recipientsTable = this._document.P2RecipientsTable;
            var totalTable = this._document.P1TotalTable;
            var recipientsData = recipientsTable.CollectUserData();
            var totalData = totalTable.CollectUserData();
            recipientsTable.ResetData();
            totalTable.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            recipientsTable.SetupTableData(recipientsData);
            totalTable.SetupTableData(totalData);
            curState.RestoreState();
        };
        return UpdateRules;
    }());
    F03400.UpdateRules = UpdateRules;
})(F03400 || (F03400 = {}));
