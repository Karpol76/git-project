var F08420;
(function (F08420) {
    var UpdateRules = (function () {
        function UpdateRules(_document) {
            this._document = _document;
        }
        UpdateRules.prototype.UpdateTemplate = function (oldVersion, currentVersion) {
        };
        UpdateRules.prototype.ShiftData = function () {
            var yearDataField = BaseObasTableFields.YearDataField;
            var srcField = [];
            var destField = [];
            for (var i = 1, yearsCount = this._document.Settings.YearsCount; i <= yearsCount; i++) {
                destField.push(yearDataField.GenerateId(i));
                if (i === ObasStageSettings.YearsCount) {
                    srcField.push(null);
                }
                else {
                    srcField.push(yearDataField.GenerateId(i + 1));
                }
            }
            this._document.CommonRules.ShiftTableData(this._document.P1Table, srcField, destField);
            this._document.CommonRules.ShiftTableData(this._document.P1TotalTable, srcField, destField);
        };
        UpdateRules.prototype.CopyData = function () {
            this._document.P1Table.CopyData();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var targetTable = this._document.P1Table;
            var targetData = targetTable.CollectUserData();
            targetTable.ResetData();
            this._document.P1TotalTable.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            targetTable.SetupTableData(targetData);
            curState.RestoreState();
        };
        return UpdateRules;
    }());
    F08420.UpdateRules = UpdateRules;
})(F08420 || (F08420 = {}));
