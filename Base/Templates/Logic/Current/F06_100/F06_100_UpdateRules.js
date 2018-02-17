var F06100;
(function (F06100) {
    var UpdateRules = (function () {
        function UpdateRules(_document) {
            this._document = _document;
        }
        UpdateRules.prototype.UpdateTemplate = function (oldVersion, currentVersion) {
            this._document.StartUpdate();
            this._document.EndUpdate();
        };
        UpdateRules.prototype.ShiftData = function () {
            var srcField = [];
            var destField = [];
            var paidSrcField = [];
            var paidDestField = [];
            for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                this._document.CommonRules.ShiftFieldGenerator(i, srcField, destField, BaseObasTableFields.YearDataField);
                this._document.CommonRules.ShiftFieldGenerator(i, paidSrcField, paidDestField, F06100.PaidActivityInfoTable.AdditionalYearDataField, F06100.PaidActivityInfoTable.RevenueYearDataField, F06100.PaidActivityInfoTable.CoeficientYearDataField);
            }
            this._document.CommonRules.ShiftTableData(this._document.P1TotalTable, srcField, destField);
            this._document.CommonRules.ShiftTableData(this._document.P2Sp5Table, srcField, destField);
            this._document.CommonRules.ShiftTableData(this._document.P2Sp4Table, srcField, destField);
            this._document.CommonRules.ShiftTableData(this._document.PaidActivityInfoTable, paidSrcField, paidDestField);
            ObasHelper.DeleteOldData(this._document.P2Sp1ServTable, this._document.P2Sp2WorkTable, this._document.P2Sp3Table);
        };
        UpdateRules.prototype.CopyData = function () {
            this._document.P2Sp1ServIndexTable.CopyData();
            this._document.P2Sp2WorkIndexTable.CopyData();
            this._document.P2Sp3Table.CopyData();
            this._document.PaidActivityInfoTable.CopyData();
            this._document.P2Sp4Table.CopyData();
            this._document.P2Sp5Table.CopyData();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var serviceIndicTable = this._document.P2Sp1ServIndexTable;
            var workIndicTable = this._document.P2Sp2WorkIndexTable;
            var taxTable = this._document.P2Sp3Table;
            var paidTable = this._document.PaidActivityInfoTable;
            var addObasTable = this._document.P2Sp4Table;
            var adjustTable = this._document.P2Sp5Table;
            var serviceData = serviceIndicTable.CollectUserData();
            var workData = workIndicTable.CollectUserData();
            var taxData = taxTable.CollectUserData();
            var paidData = paidTable.CollectUserData();
            var addObasData = addObasTable.CollectUserData();
            var adjustData = adjustTable.CollectUserData();
            serviceIndicTable.ResetData();
            workIndicTable.ResetData();
            paidTable.ResetData();
            taxTable.ResetData();
            addObasTable.ResetData();
            adjustTable.ResetData();
            this._document.P1TotalTable.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            serviceIndicTable.SetupTableData(serviceData);
            workIndicTable.SetupTableData(workData);
            taxTable.SetupTableData(taxData);
            paidTable.SetupTableData(paidData);
            addObasTable.SetupTableData(addObasData);
            adjustTable.SetupTableData(adjustData);
            curState.RestoreState();
        };
        return UpdateRules;
    }());
    F06100.UpdateRules = UpdateRules;
})(F06100 || (F06100 = {}));
