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
var F08410;
(function (F08410) {
    var ExportRules = (function (_super) {
        __extends(ExportRules, _super);
        function ExportRules(document) {
            return _super.call(this, document) || this;
        }
        ExportRules.prototype.GetTables = function () {
            var result = [];
            return result;
        };
        return ExportRules;
    }(F04111.ExportRules));
    F08410.ExportRules = ExportRules;
    var ImportRules = (function (_super) {
        __extends(ImportRules, _super);
        function ImportRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImportRules.prototype.InnerImport = function () {
            this.ImportP2();
            this.ImportP3();
            this.ImportP4();
        };
        ImportRules.prototype.ImportP2 = function () {
            var barsFaipTable = this.GetTable("ФАИП_действующий");
            var barsFaipDataTable = this.GetTable("РасчетФАИПдействующий");
            var customersTable = this.Document.CustomerTable;
            var projectTable = this.Document.ProjectInfoTable;
            var investTable = this.Document.InvestInfoTable;
            var faipSpr = projectTable.SprFields.Faip.SprTable;
            var fcpSpr = projectTable.SprFields.Fcp.SprTable;
            var subFcpSpr = projectTable.SprFields.SubFcp.SprTable;
            var invesSpr = investTable.InvestigationType.SprTable;
            var okvedSpr = investTable.Okved.SprTable;
            var okeiSpr = investTable.Okei.SprTable;
            barsFaipTable.Iterate(function () {
                var customerKey = customersTable.GetRecordKeyByName(barsFaipTable.GetFieldValue("b7"), true, true);
                if (customerKey != null) {
                    projectTable.AddRow();
                    projectTable.OwnerKey.DefferedSetValue(customerKey);
                    projectTable.Code.DefferedSetValue(barsFaipTable.GetFieldValue("b1_clone"));
                    projectTable.Name.DefferedSetValue(barsFaipTable.GetFieldValue("b2"));
                    projectTable.Developer.DefferedSetValue(barsFaipTable.GetFieldValue("b8"));
                    projectTable.SprFields.Faip.ForeignKey.DefferedSetValue(faipSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b4")));
                    projectTable.SprFields.Fcp.ForeignKey.DefferedSetValue(fcpSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b5")));
                    projectTable.SprFields.SubFcp.ForeignKey.DefferedSetValue(subFcpSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b6")));
                    projectTable.IsProgramPart.DefferedSetValue(barsFaipTable.GetFieldValue("b3") === "программная часть");
                    projectTable.PostRow();
                    var filterKey = barsFaipTable.GetFieldValue("bFILTERINGCOLUMN");
                    while (barsFaipDataTable.Locate("bFILTERINGCOLUMN", filterKey, true)) {
                        investTable.AddRow();
                        investTable.OwnerKey.DefferedSetValue(projectTable.RecordKey.Value);
                        investTable.InvestigationType.ForeignKey.DefferedSetValue(invesSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b3")));
                        investTable.Okved.ForeignKey.DefferedSetValue(okvedSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b4")));
                        investTable.Okei.ForeignKey.DefferedSetValue(okeiSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b5")));
                        investTable.Power.DefferedSetValue(ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b6")));
                        for (var i = 0; i < ImportRules._yearsCount; i++) {
                            investTable.SetFieldValue(ImportRules._yearField.GenerateId(i + 1), ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b" + (i === 0 ? 7 : 8 + i))), false);
                        }
                        investTable.PostRow();
                    }
                }
            });
        };
        ImportRules.prototype.ImportP3 = function () {
            var barsFaipTable = this.GetTable("ФАИП_принимаемый");
            var barsFaipDataTable = this.GetTable("РасчетФАИПпринимаемый");
            var customersTable = this.Document.CustomerTable;
            var projectTable = this.Document.ProjectInfoTable;
            var investTable = this.Document.InvestInfoTable;
            var faipSpr = projectTable.SprFields.Faip.SprTable;
            var fcpSpr = projectTable.SprFields.Fcp.SprTable;
            var subFcpSpr = projectTable.SprFields.SubFcp.SprTable;
            var invesSpr = investTable.InvestigationType.SprTable;
            var okvedSpr = investTable.Okved.SprTable;
            var okeiSpr = investTable.Okei.SprTable;
            barsFaipTable.Iterate(function () {
                var customerKey = customersTable.GetRecordKeyByName(barsFaipTable.GetFieldValue("b1"), false, true);
                if (customerKey != null) {
                    projectTable.AddRow();
                    projectTable.OwnerKey.DefferedSetValue(customerKey);
                    projectTable.SprFields.Faip.ForeignKey.DefferedSetValue(faipSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b3")));
                    projectTable.SprFields.Fcp.ForeignKey.DefferedSetValue(fcpSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b4")));
                    projectTable.SprFields.SubFcp.ForeignKey.DefferedSetValue(subFcpSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b5")));
                    projectTable.IsProgramPart.DefferedSetValue(barsFaipTable.GetFieldValue("b2") === "программная часть");
                    projectTable.PostRow();
                    var filterKey = barsFaipTable.GetFieldValue("bFILTERINGCOLUMN");
                    while (barsFaipDataTable.Locate("bFILTERINGCOLUMN", filterKey, true)) {
                        investTable.AddRow();
                        investTable.OwnerKey.DefferedSetValue(projectTable.RecordKey.Value);
                        investTable.InvestigationType.ForeignKey.DefferedSetValue(invesSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b2_clone")));
                        investTable.Okved.ForeignKey.DefferedSetValue(okvedSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b3")));
                        investTable.Okei.ForeignKey.DefferedSetValue(okeiSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b4")));
                        investTable.Power.DefferedSetValue(ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b5")));
                        for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
                            investTable.SetFieldValue(ImportRules._yearField.GenerateId(i + 1), ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b" + (i === 0 ? 9 : 5 + i))), false);
                        }
                        investTable.PostRow();
                    }
                }
            });
        };
        ImportRules.prototype.ImportP4 = function () {
            var barsFaipTable = this.GetTable("Не_включенный_ФАИП");
            var barsFaipDataTable = this.GetTable("Расчет не включенный ФАИП");
            var customersTable = this.Document.CustomerP4Table;
            var projectTable = this.Document.ProjectInfoP4Table;
            var investTable = this.Document.InvestInfoP4Table;
            var invesSpr = investTable.InvestigationType.SprTable;
            var okvedSpr = investTable.Okved.SprTable;
            var okeiSpr = investTable.Okei.SprTable;
            barsFaipTable.Iterate(function () {
                var customerKey = customersTable.GetRecordKeyByName(barsFaipTable.GetFieldValue("b1"), true);
                if (customerKey != null) {
                    projectTable.AddRow();
                    projectTable.OwnerKey.DefferedSetValue(customerKey);
                    projectTable.Code.DefferedSetValue(barsFaipTable.GetFieldValue("b5"));
                    projectTable.Name.DefferedSetValue(barsFaipTable.GetFieldValue("b4"));
                    projectTable.Developer.DefferedSetValue(barsFaipTable.GetFieldValue("b2"));
                    projectTable.PostRow();
                    var filterKey = barsFaipTable.GetFieldValue("bFILTERINGCOLUMN");
                    while (barsFaipDataTable.Locate("bFILTERINGCOLUMN", filterKey, true)) {
                        investTable.AddRow();
                        investTable.OwnerKey.DefferedSetValue(projectTable.RecordKey.Value);
                        investTable.InvestigationType.ForeignKey.DefferedSetValue(invesSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b1")));
                        investTable.Okved.ForeignKey.DefferedSetValue(okvedSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b3")));
                        investTable.Okei.ForeignKey.DefferedSetValue(okeiSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b4")));
                        for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
                            investTable.SetFieldValue(ImportRules._yearField.GenerateId(i + 1), ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b" + (6 + i))), false);
                        }
                        investTable.PostRow();
                    }
                }
            });
        };
        return ImportRules;
    }(F04111.ImportRules));
    F08410.ImportRules = ImportRules;
    var ExcelExportRules = (function (_super) {
        __extends(ExcelExportRules, _super);
        function ExcelExportRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ExcelExportRules;
    }(F04111.ExcelExportRules));
    F08410.ExcelExportRules = ExcelExportRules;
})(F08410 || (F08410 = {}));
