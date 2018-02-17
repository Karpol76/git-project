var F02200;
(function (F02200) {
    var UpdateRules = (function () {
        function UpdateRules(_document) {
            this._document = _document;
        }
        UpdateRules.prototype.UpdateTemplate = function (oldVersion, currentVersion) {
            this._document.StartUpdate();
            if (oldVersion < "5.0.0" && currentVersion >= "5.0.0") {
                this.RecalcData();
            }
            this._document.EndUpdate();
        };
        UpdateRules.prototype.ShiftData = function () {
            var yearDataField = BaseObasTableFields.YearDataField;
            var payField = F02200.P2DataTable.PayYearField;
            var p1SrcField = [];
            var p1DestField = [];
            var p2SrcField = [];
            var p2DestField = [];
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                p1DestField.push(yearDataField.GenerateId(i));
                p2DestField.push(yearDataField.GenerateId(i));
                p2DestField.push(payField.GenerateId(i));
                if (i === ObasStageSettings.YearsCount) {
                    p1SrcField.push(null);
                    p2SrcField.push(null);
                    p2SrcField.push(null);
                }
                else {
                    p1SrcField.push(yearDataField.GenerateId(i + 1));
                    p2SrcField.push(yearDataField.GenerateId(i + 1));
                    p2SrcField.push(payField.GenerateId(i + 1));
                }
            }
            var insCountField = F02200.P2DataTable.InsCountYearField;
            for (var j = 1, len = ObasStageSettings.YearsCount + F02200.P2Sheet.AddYearsCount; j <= len; j++) {
                var index = j - F02200.P2Sheet.AddYearsCount;
                p2DestField.push(insCountField.GenerateId(index));
                if (j === len) {
                    p2SrcField.push(null);
                }
                else {
                    p2SrcField.push(insCountField.GenerateId(index + 1));
                }
            }
            this._document.CommonRules.ShiftTableData(this._document.P1TotalTable, p1SrcField, p1DestField);
            this._document.CommonRules.ShiftTableData(this._document.P2DataTable, p2SrcField, p2DestField);
        };
        UpdateRules.prototype.CopyData = function () {
            this._document.P2DataTable.CopyData();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var p2Table = this._document.P2DataTable;
            var p2Data = p2Table.CollectUserData();
            p2Table.ResetData();
            this._document.P1TotalTable.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            p2Table.SetupTableData(p2Data);
            curState.RestoreState();
        };
        return UpdateRules;
    }());
    F02200.UpdateRules = UpdateRules;
})(F02200 || (F02200 = {}));
