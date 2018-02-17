var F03500;
(function (F03500) {
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
            this._document.P2DataTable.DeleteAllRow(yearFilter);
        };
        UpdateRules.prototype.CopyData = function () {
            this._document.P2DataTable.CopyData();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var dataTable = this._document.P2DataTable;
            var data = dataTable.CollectUserData();
            dataTable.ResetData();
            this._document.P1TotalTable.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            dataTable.SetupTableData(data);
            curState.RestoreState();
        };
        return UpdateRules;
    }());
    F03500.UpdateRules = UpdateRules;
})(F03500 || (F03500 = {}));
