var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var F01212;
(function (F01212) {
    var UpdateRules = (function (_super) {
        __extends(UpdateRules, _super);
        function UpdateRules(_document) {
            var _this = _super.call(this, _document) || this;
            _this._document = _document;
            return _this;
        }
        UpdateRules.prototype.UpdateTemplate = function (oldVersion, currentVersion) {
            this._document.StartUpdate();
            this._document.EndUpdate();
        };
        UpdateRules.prototype.RecalcData = function () {
            var curState = new UpdateDocSettingsState(this._document);
            this._document.StartUpdate();
            var p2Sp3Table = this._document.P2Sp3Table;
            var p2Sp6Table = this._document.P2Sp6Table;
            var p2Sp3Data = p2Sp3Table.CollectUserData();
            var p2Sp6Data = p2Sp6Table.CollectUserData();
            var p3Sp3Table = this._document.P3Sp3Table;
            var p3Sp6Table = this._document.P3Sp6Table;
            var p3Sp3Data = p3Sp3Table.CollectUserData();
            var p3Sp6Data = p3Sp6Table.CollectUserData();
            var p4Sp3Table = this._document.P4Sp3Table;
            var p4Sp4Table = this._document.P4Sp4Table;
            var p4Sp3Data = p4Sp3Table.CollectUserData();
            var p4Sp4Data = p4Sp4Table.CollectUserData();
            var p5Sp3Table = this._document.P5Sp3Table;
            var p5Sp6Table = this._document.P5Sp6Table;
            var p5Sp3Data = p5Sp3Table.CollectUserData();
            var p5Sp6Data = p5Sp6Table.CollectUserData();
            var pInsTable = this._document.OnlyInsuranceTable;
            var pInsData = pInsTable.CollectUserData();
            this._document.P1TotalTable.ResetData();
            p2Sp3Table.ResetData();
            p2Sp6Table.ResetData();
            p3Sp3Table.ResetData();
            p3Sp6Table.ResetData();
            p4Sp3Table.ResetData();
            p4Sp4Table.ResetData();
            p5Sp3Table.ResetData();
            p5Sp6Table.ResetData();
            pInsTable.ResetData();
            this._document.EnableRulesAndNotice = true;
            this._document.EnableDatasetNotification = false;
            p2Sp3Table.SetupTableData(p2Sp3Data);
            p2Sp6Table.SetupTableData(p2Sp6Data);
            p3Sp3Table.SetupTableData(p3Sp3Data);
            p3Sp6Table.SetupTableData(p3Sp6Data);
            p4Sp3Table.SetupTableData(p4Sp3Data);
            p4Sp4Table.SetupTableData(p4Sp4Data);
            p5Sp3Table.SetupTableData(p5Sp3Data);
            p5Sp6Table.SetupTableData(p5Sp6Data);
            pInsTable.SetupTableData(pInsData);
            curState.RestoreState();
        };
        UpdateRules.prototype.CopyData = function (srcYear, destYear) {
            this._document.P2Sp3Table.CopyData();
            this._document.P3Sp3Table.CopyData();
            this._document.P5Sp3Table.CopyData();
            this._document.P2Sp6Table.CopyData();
            this._document.P3Sp6Table.CopyData();
            this._document.P4Sp3Table.CopyData();
            this._document.P4Sp4Table.CopyData();
            this._document.P5Sp6Table.CopyData();
            this._document.OnlyInsuranceTable.CopyData();
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
            this._document.CommonRules.ShiftTableData(this._document.OnlyInsuranceTable, insSrcField, insDestField);
            this._document.CommonRules.ShiftTableData(this._document.P2Sp3Table, p2Sp2SrcField, p2Sp2DestField);
            this._document.CommonRules.ShiftTableData(this._document.P2Sp6Table, p2Sp4SrcField, p2Sp4DestField);
            this._document.CommonRules.ShiftTableData(this._document.P3Sp3Table, p2Sp2SrcField, p2Sp2DestField);
            this._document.CommonRules.ShiftTableData(this._document.P3Sp6Table, p2Sp4SrcField, p2Sp4DestField);
            this._document.CommonRules.ShiftTableData(this._document.P4Sp3Table, p2Sp2SrcField, p2Sp2DestField);
            this._document.CommonRules.ShiftTableData(this._document.P4Sp4Table, p2Sp4SrcField, p2Sp4DestField);
            this._document.CommonRules.ShiftTableData(this._document.P5Sp3Table, p2Sp2SrcField, p2Sp2DestField);
            this._document.CommonRules.ShiftTableData(this._document.P5Sp6Table, p2Sp4SrcField, p2Sp4DestField);
            ObasHelper.DeleteOldData(this._document.P2Sp3Table, this._document.P3Sp3Table, this._document.P4Sp3Table, this._document.P5Sp3Table);
        };
        return UpdateRules;
    }(F012XX.UpdateRules));
    F01212.UpdateRules = UpdateRules;
})(F01212 || (F01212 = {}));
