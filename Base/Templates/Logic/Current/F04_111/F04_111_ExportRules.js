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
var F04111;
(function (F04111) {
    var ExportRules = (function (_super) {
        __extends(ExportRules, _super);
        function ExportRules(_document) {
            var _this = _super.call(this, _document) || this;
            _this._document = _document;
            return _this;
        }
        ExportRules.prototype.GetTables = function () {
            var result = [];
            return result;
        };
        return ExportRules;
    }(SimpleFormExportRules));
    F04111.ExportRules = ExportRules;
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
                    projectTable.Code.DefferedSetValue(barsFaipTable.GetFieldValue("b1"));
                    projectTable.Name.DefferedSetValue(barsFaipTable.GetFieldValue("b2"));
                    projectTable.Branch.DefferedSetValue(barsFaipTable.GetFieldValue("b17"));
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
                        investTable.Year.DefferedSetValue(ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b14")));
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
                var customerKey = customersTable.GetRecordKeyByName(barsFaipTable.GetFieldValue("b14"), false, true);
                if (customerKey != null) {
                    projectTable.AddRow();
                    projectTable.OwnerKey.DefferedSetValue(customerKey);
                    projectTable.Name.DefferedSetValue(barsFaipTable.GetFieldValue("b1"));
                    projectTable.Developer.DefferedSetValue(barsFaipTable.GetFieldValue("b15"));
                    projectTable.SprFields.Faip.ForeignKey.DefferedSetValue(faipSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b3")));
                    projectTable.SprFields.Fcp.ForeignKey.DefferedSetValue(fcpSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b4")));
                    projectTable.SprFields.SubFcp.ForeignKey.DefferedSetValue(subFcpSpr.LookupKeyByCode(barsFaipTable.GetFieldValue("b5")));
                    projectTable.IsProgramPart.DefferedSetValue(barsFaipTable.GetFieldValue("b2") === "программная часть");
                    projectTable.PostRow();
                    var filterKey = barsFaipTable.GetFieldValue("bFILTERINGCOLUMN");
                    while (barsFaipDataTable.Locate("bFILTERINGCOLUMN", filterKey, true)) {
                        investTable.AddRow();
                        investTable.OwnerKey.DefferedSetValue(projectTable.RecordKey.Value);
                        investTable.InvestigationType.ForeignKey.DefferedSetValue(invesSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b2")));
                        investTable.Okved.ForeignKey.DefferedSetValue(okvedSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b3")));
                        investTable.Okei.ForeignKey.DefferedSetValue(okeiSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b4")));
                        investTable.Power.DefferedSetValue(ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b5")));
                        investTable.Year.DefferedSetValue(ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b11")));
                        investTable.Unit.DefferedSetValue(barsFaipDataTable.GetFieldValue("b10"));
                        for (var i = 0; i < ObasStageSettings.YearsCount; i++) {
                            investTable.SetFieldValue(ImportRules._yearField.GenerateId(i + 1), ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b" + (i === 0 ? 9 : 5 + i))), false);
                        }
                        investTable.PostRow();
                    }
                }
            });
        };
        ImportRules.prototype.ImportP4 = function () {
            var barsFaipTable = this.GetTable("ФАИП_НЕвключенный");
            var barsFaipDataTable = this.GetTable("РасчетФАИПневключенный");
            var customersTable = this.Document.CustomerP4Table;
            var projectTable = this.Document.ProjectInfoP4Table;
            var investTable = this.Document.InvestInfoP4Table;
            var invesSpr = investTable.InvestigationType.SprTable;
            var okvedSpr = investTable.Okved.SprTable;
            var okeiSpr = investTable.Okei.SprTable;
            barsFaipTable.Iterate(function () {
                var customerKey = customersTable.GetRecordKeyByName(barsFaipTable.GetFieldValue("b7"), true);
                if (customerKey != null) {
                    projectTable.AddRow();
                    projectTable.OwnerKey.DefferedSetValue(customerKey);
                    projectTable.Code.DefferedSetValue(barsFaipTable.GetFieldValue("b1"));
                    projectTable.Name.DefferedSetValue(barsFaipTable.GetFieldValue("b2"));
                    projectTable.Developer.DefferedSetValue(barsFaipTable.GetFieldValue("b8"));
                    projectTable.PostRow();
                    var filterKey = barsFaipTable.GetFieldValue("bFILTERINGCOLUMN");
                    while (barsFaipDataTable.Locate("bFILTERINGCOLUMN", filterKey, true)) {
                        investTable.AddRow();
                        investTable.OwnerKey.DefferedSetValue(projectTable.RecordKey.Value);
                        investTable.InvestigationType.ForeignKey.DefferedSetValue(invesSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b3")));
                        investTable.Unit.DefferedSetValue(barsFaipDataTable.GetFieldValue("b13"));
                        investTable.Okved.ForeignKey.DefferedSetValue(okvedSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b4")));
                        investTable.Okei.ForeignKey.DefferedSetValue(okeiSpr.LookupKeyByCode(barsFaipDataTable.GetFieldValue("b5")));
                        investTable.Power.DefferedSetValue(ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b6")));
                        investTable.Year.DefferedSetValue(ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b14")));
                        for (var i = 0; i < ImportRules._yearsCount; i++) {
                            investTable.SetFieldValue(ImportRules._yearField.GenerateId(i + 1), ObasHelper.ConvertToNumber(barsFaipDataTable.GetFieldValue("b" + (i === 0 ? 7 : 8 + i))), false);
                        }
                        investTable.PostRow();
                    }
                }
            });
        };
        return ImportRules;
    }(BaseImportRules));
    ImportRules._yearsCount = ObasStageSettings.YearsCount + 1;
    ImportRules._yearField = BaseObasTableFields.YearDataField;
    F04111.ImportRules = ImportRules;
    var ExcelMark = (function (_super) {
        __extends(ExcelMark, _super);
        function ExcelMark(id) {
            return _super.call(this, EditorProObjectTypes.None, id) || this;
        }
        ExcelMark.prototype.Equal = function (mark) {
            return mark.indexOf(this.Id) > -1;
        };
        ExcelMark.prototype.Prepare = function (mark, value) {
            return mark.replace(this.Id, value.toString());
        };
        return ExcelMark;
    }(BaseObject));
    F04111.ExcelMark = ExcelMark;
    var ExcelExportRules = (function () {
        function ExcelExportRules(_document) {
            this._document = _document;
        }
        Object.defineProperty(ExcelExportRules, "EndRow", {
            get: function () {
                if (this._endRow == null) {
                    this._endRow = new ExcelMark("[EndRow]");
                }
                return this._endRow;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExcelExportRules, "StartRow", {
            get: function () {
                if (this._startRow == null) {
                    this._startRow = new ExcelMark("[StartRow]");
                }
                return this._startRow;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExcelExportRules, "FilterKey", {
            get: function () {
                if (this._filterKey == null) {
                    this._filterKey = new ExcelMark("[FilterKey]");
                }
                return this._filterKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExcelExportRules, "Number", {
            get: function () {
                if (this._number == null) {
                    this._number = new ExcelMark("[Number]");
                }
                return this._number;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExcelExportRules, "YearCaption", {
            get: function () {
                if (this._yearCaption == null) {
                    this._yearCaption = new ExcelMark("GetYearCaption");
                }
                return this._yearCaption;
            },
            enumerable: true,
            configurable: true
        });
        ExcelExportRules.prototype.PrepareRowMark = function (exportData, mark) {
            var markParts = mark.split(ExcelExportRules._markDelimiter);
            var result = mark;
            var sheet = this._document.Sheets.getValue(markParts[1].substr(1));
            var lastCol = sheet.ColumnCount;
            var rowCount = sheet.RowCount;
            var startRow = null;
            var endRow = null;
            for (var row = 0; row < rowCount; row++) {
                var key = sheet.GetCellValue(row, lastCol, false);
                if (key === exportData.Key) {
                    if (startRow == null) {
                        startRow = row + 1;
                        endRow = startRow;
                    }
                    else {
                        endRow = row + 1;
                    }
                }
                else if (startRow != null && endRow != null) {
                    break;
                }
            }
            if (startRow != null) {
                result = ExcelExportRules.StartRow.Prepare(result, startRow);
            }
            if (endRow != null) {
                result = ExcelExportRules.EndRow.Prepare(result, endRow);
            }
            if (startRow == null && endRow == null) {
                result = "";
            }
            return result;
        };
        ExcelExportRules.prototype.GetTemplateP4List = function () {
            var result = [];
            var table = this._document.ProjectInfoP4Table;
            var reader = table.CreateReader();
            var ord = 1;
            while (reader.Read()) {
                result.push(JSON.stringify({
                    Ord: ord++,
                    Key: table.RecordKey.Value,
                    IsEmpty: false
                }));
            }
            if (result.length === 0) {
                result.push(JSON.stringify({
                    Ord: 1,
                    Key: -1,
                    IsEmpty: true
                }));
            }
            return result;
        };
        ExcelExportRules.prototype.TuneTemplate = function (sExportData, mark) {
            var exportData = JSON.parse(sExportData);
            if (ExcelExportRules.Number.Equal(mark)) {
                return ExcelExportRules.Number.Prepare(mark, exportData.Ord);
            }
            else if (exportData.IsEmpty) {
                if (ExcelExportRules.YearCaption.Equal(mark)) {
                    return mark;
                }
                else {
                    return "";
                }
            }
            else {
                if (ExcelExportRules.FilterKey.Equal(mark)) {
                    return ExcelExportRules.FilterKey.Prepare(mark, exportData.Key);
                }
                else if (ExcelExportRules.StartRow.Equal(mark) || ExcelExportRules.EndRow.Equal(mark)) {
                    return this.PrepareRowMark(exportData, mark);
                }
                else {
                    return mark;
                }
            }
        };
        ExcelExportRules.prototype.GetTemplateProjectList = function (isAccetped) {
            var result = [];
            var ord = 1;
            var table = this._document.ProjectInfoTable;
            while (table.Locate(table.IsAccepted.Id, isAccetped, true)) {
                result.push(JSON.stringify({
                    Ord: ord++,
                    Key: table.RecordKey.Value,
                    IsEmpty: false
                }));
            }
            table.ClearLocateFlag();
            if (result.length === 0) {
                result.push(JSON.stringify({
                    Ord: 1,
                    Key: -1,
                    IsEmpty: true
                }));
            }
            return result;
        };
        ExcelExportRules.prototype.GetTemplateP2List = function () {
            return this.GetTemplateProjectList(true);
        };
        ExcelExportRules.prototype.GetTemplateP3List = function () {
            return this.GetTemplateProjectList(false);
        };
        return ExcelExportRules;
    }());
    ExcelExportRules._number = null;
    ExcelExportRules._filterKey = null;
    ExcelExportRules._startRow = null;
    ExcelExportRules._endRow = null;
    ExcelExportRules._yearCaption = null;
    ExcelExportRules._markDelimiter = "<$*>";
    F04111.ExcelExportRules = ExcelExportRules;
})(F04111 || (F04111 = {}));
