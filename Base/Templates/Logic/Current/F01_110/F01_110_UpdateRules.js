var F01110;
(function (F01110) {
    var UpdateRules = (function () {
        function UpdateRules(_document) {
            this._document = _document;
        }
        UpdateRules.prototype.UpdateTemplate = function (oldVersion, currentVersion) {
            this._document.StartUpdate();
            this._document.EndUpdate();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var p2Sp3Table = this._document.P2Sp3ValuesTable;
            var p2Sp4Table = this._document.P2Sp4ValuesTable;
            var p3Table = this._document.OnlyInsurValuesTable;
            var p2Sp3Data = p2Sp3Table.CollectUserData();
            var p2Sp4Data = p2Sp4Table.CollectUserData();
            var p3Data = p3Table.CollectUserData();
            this._document.P1TotalTable.ResetData();
            p2Sp4Table.ResetData();
            p2Sp3Table.ResetData();
            p3Table.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            p2Sp3Table.SetupTableData(p2Sp3Data);
            p2Sp4Table.SetupTableData(p2Sp4Data);
            p3Table.SetupTableData(p3Data);
            curState.RestoreState();
        };
        UpdateRules.prototype.CopyData = function (srcYear, destYear) {
            this._document.P2Sp4ValuesTable.CopyData(srcYear, destYear);
            this._document.OnlyInsurValuesTable.CopyData(srcYear, destYear);
            this._document.P2Sp3ValuesTable.CopyData(srcYear, destYear);
        };
        UpdateRules.prototype.ShiftData = function () {
            var _this = this;
            var totalSrcField = [];
            var totalDestField = [];
            var p2Sp2SrcField = [];
            var p2Sp2DestField = [];
            var p2Sp4SrcField = [];
            var p2Sp4DestField = [];
            var insSrcField = [];
            var insDestField = [];
            var yearDataField = BaseObasTableFields.YearDataField;
            var yearFotDataField = BaseObasTableFields.FotYearDataField;
            var yearInsDataField = BaseObasTableFields.InsuranceYearDataField;
            var taxDataField = BaseObasTableFields.TaxYearDataField;
            var cntDataField = BaseObasTableFields.CountYearDataField;
            this._document.IterateByYears(function (i) {
                _this._document.CommonRules.ShiftFieldGenerator(i, totalSrcField, totalDestField, yearDataField, yearFotDataField, yearInsDataField);
                _this._document.CommonRules.ShiftFieldGenerator(i, p2Sp2SrcField, p2Sp2DestField, yearDataField);
                _this._document.CommonRules.ShiftFieldGenerator(i, p2Sp4SrcField, p2Sp4DestField, yearDataField, yearFotDataField, taxDataField, cntDataField);
                _this._document.CommonRules.ShiftFieldGenerator(i, insSrcField, insDestField, yearDataField, taxDataField);
            });
            this._document.CommonRules.ShiftTableData(this._document.P1TotalTable, totalSrcField, totalDestField);
            this._document.CommonRules.ShiftTableData(this._document.P2Sp4ValuesTable, p2Sp4SrcField, p2Sp4DestField);
            this._document.CommonRules.ShiftTableData(this._document.OnlyInsurValuesTable, insSrcField, insDestField);
            ObasHelper.DeleteOldData(this._document.P2Sp3ValuesTable);
        };
        return UpdateRules;
    }());
    F01110.UpdateRules = UpdateRules;
})(F01110 || (F01110 = {}));
