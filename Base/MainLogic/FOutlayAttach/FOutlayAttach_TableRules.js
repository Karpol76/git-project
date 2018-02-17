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
var FOutlayAttach;
(function (FOutlayAttach) {
    var TableRules = (function () {
        function TableRules(_document) {
            this._document = _document;
        }
        TableRules.prototype.FilterFcr = function (filterTableId) {
            var fcrCode = ObasTableCollection.FcrTable.Code.Value;
            var res = this._document.Tables.getValue(filterTableId).Lookup("FCR_FullCodeSection", fcrCode, BaseObasTableFields.RecordKeyField.Id) != null;
            return res;
        };
        TableRules.prototype.FilterInvestCostFcr = function () {
            return this.FilterFcr("OnlyInvestCostRRO_DATA");
        };
        TableRules.prototype.FilterOtherCostFcr = function () {
            return this.FilterFcr("OnlyOtherCostRRO_DATA");
        };
        TableRules.prototype.FilterWorkCostFcr = function () {
            return this.FilterFcr("OnlyWorkCostRRO_DATA");
        };
        TableRules.prototype.FilterInvestCostRroData = function () {
            var rroDataTable = ObasTableCollection.RroDataTable;
            return rroDataTable.RroOutlayKey.SourceTable.IsActive && ObasHelper.CheckPartialCode(rroDataTable.CostType.Code, ["4..", "6..", "81.", "82."], 3);
        };
        TableRules.prototype.FilterOtherCostRroData = function () {
            var rroDataTable = ObasTableCollection.RroDataTable;
            var rroIndicateTable = ObasTableCollection.RroPartIndicateBudgetValues;
            return rroDataTable.RroOutlayKey.SourceTable.IsActive &&
                rroIndicateTable.Lookup(["RRO_DATA_ID", rroIndicateTable.PartKey.Id], [rroDataTable.RecordKey.Value, PartIndicateBudgetTypes.Part3], rroIndicateTable.RecordKey.Id) != null;
        };
        TableRules.prototype.FilterIsActiveOutlayRroData = function () {
            return ObasTableCollection.RroDataTable.RroOutlayKey.SourceTable.IsActive;
        };
        TableRules.prototype.FilterRroPart1Data = function (tableId, srcTableId) {
            var rroObasVersionsTable = ObasTableCollection.RroObasVersionsTable;
            var rroIndicateTable = ObasTableCollection.RroPartIndicateBudgetValues;
            switch (srcTableId) {
                case rroObasVersionsTable.Id:
                    return rroObasVersionsTable.RroObasKey.SourceTable.RroDataKey.SourceTable.RroOutlayKey.SourceTable.IsActive &&
                        rroIndicateTable.Lookup(rroIndicateTable.RroVersionKey.Id, rroObasVersionsTable.RecordKey.Value, rroIndicateTable.RecordKey.Id) ==
                            null;
                case rroIndicateTable.Id:
                    return rroIndicateTable.IsPart1();
                default:
                    return false;
            }
        };
        TableRules.prototype.FilterWorkCostRroData = function () {
            var rroDataTable = ObasTableCollection.RroDataTable;
            var rroIndicateTable = ObasTableCollection.RroPartIndicateBudgetValues;
            var rroObasVersionsTable = ObasTableCollection.RroObasVersionsTable;
            var rroDataKey = rroDataTable.RecordKey.Value;
            var recordKeyId = BaseObasTableFields.RecordKeyField.Id;
            return rroDataTable.RroOutlayKey.SourceTable.IsActive &&
                !ObasHelper.CheckPartialCode(rroDataTable.CostType.Code, ["4..", "6..", "81.", "82."], 3) &&
                !(rroIndicateTable.Lookup(["RRO_DATA_ID", rroIndicateTable.PartKey.Id], [rroDataKey, PartIndicateBudgetTypes.Part3], recordKeyId) ==
                    null &&
                    rroObasVersionsTable.Lookup(rroObasVersionsTable.RroDataKey.Id, rroDataKey, recordKeyId) == null);
        };
        return TableRules;
    }());
    FOutlayAttach.TableRules = TableRules;
    var Attach2TableRules = (function (_super) {
        __extends(Attach2TableRules, _super);
        function Attach2TableRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Attach2TableRules.prototype.RroDataHasDelta = function (rroDataKey) {
            var rroObasVersions = ObasTableCollection.RroObasVersionsTable;
            var yearDataField = BaseObasTableFields.YearDataField;
            while (rroObasVersions.RroDataKey.Locate(rroDataKey, true)) {
                for (var i = 1; i <= ObasStageSettings.YearsCount; i++) {
                    if ((rroObasVersions.GetFieldValue(yearDataField.GenerateId(i) + "_D") || 0) !== 0) {
                        rroObasVersions.ClearLocateFlag();
                        return true;
                    }
                }
            }
            rroObasVersions.ClearLocateFlag();
            return false;
        };
        Attach2TableRules.prototype.FilterInvestCostRroData = function () {
            var result = _super.prototype.FilterInvestCostRroData.call(this);
            if (result) {
                result = this.RroDataHasDelta(ObasTableCollection.RroDataTable.RecordKey.Value);
            }
            return result;
        };
        Attach2TableRules.prototype.FilterOtherCostRroData = function () {
            var result = _super.prototype.FilterOtherCostRroData.call(this);
            if (result) {
                result = this.RroDataHasDelta(ObasTableCollection.RroDataTable.RecordKey.Value);
            }
            return result;
        };
        Attach2TableRules.prototype.FilterIsActiveOutlayRroData = function () {
            var result = _super.prototype.FilterIsActiveOutlayRroData.call(this);
            if (result) {
                result = this.RroDataHasDelta(ObasTableCollection.RroDataTable.RecordKey.Value);
            }
            return result;
        };
        Attach2TableRules.prototype.FilterWorkCostRroData = function () {
            var result = _super.prototype.FilterWorkCostRroData.call(this);
            if (result) {
                result = this.RroDataHasDelta(ObasTableCollection.RroDataTable.RecordKey.Value);
            }
            return result;
        };
        return Attach2TableRules;
    }(TableRules));
    FOutlayAttach.Attach2TableRules = Attach2TableRules;
})(FOutlayAttach || (FOutlayAttach = {}));
