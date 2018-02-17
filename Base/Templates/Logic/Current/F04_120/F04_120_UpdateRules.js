var F04120;
(function (F04120) {
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
            var usdDataField = BaseObasTableFields.UsdYearDataField;
            var srcP1Field = [];
            var destP1Field = [];
            var srcP2Field = [];
            var destP2Field = [];
            for (var i = 1, yearsCount = this._document.Settings.YearsCount; i <= yearsCount; i++) {
                destP1Field.push(yearDataField.GenerateId(i));
                destP2Field.push(yearDataField.GenerateId(i));
                destP2Field.push(usdDataField.GenerateId(i));
                if (i === yearsCount) {
                    srcP1Field.push(null);
                    srcP2Field.push(null);
                    srcP2Field.push(null);
                }
                else {
                    srcP1Field.push(yearDataField.GenerateId(i + 1));
                    srcP2Field.push(yearDataField.GenerateId(i + 1));
                    srcP2Field.push(usdDataField.GenerateId(i + 1));
                }
            }
            this._document.CommonRules.ShiftTableData(this._document.P1TotalTable, srcP1Field, destP1Field);
            this._document.CommonRules.ShiftTableData(this._document.P2InvestDataTable, srcP2Field, destP2Field);
            this._document.CommonRules.ShiftTableData(this._document.P2ObjectDataTable, srcP2Field, destP2Field);
        };
        UpdateRules.prototype.CopyData = function () {
            this._document.P2InvestDataTable.CopyData();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var investTable = this._document.P2InvestDataTable;
            var investData = investTable.CollectUserData();
            investTable.ResetData();
            this._document.P2ObjectDataTable.ResetData();
            this._document.P1TotalTable.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            investTable.SetupTableData(investData);
            curState.RestoreState();
        };
        return UpdateRules;
    }());
    F04120.UpdateRules = UpdateRules;
})(F04120 || (F04120 = {}));
