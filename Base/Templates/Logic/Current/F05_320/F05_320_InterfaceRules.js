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
var F05320;
(function (F05320) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05320.InterfaceRules = InterfaceRules;
    var P2SheetColumnBlocks;
    (function (P2SheetColumnBlocks) {
        P2SheetColumnBlocks[P2SheetColumnBlocks["Total"] = 0] = "Total";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Invalid"] = 1] = "Invalid";
        P2SheetColumnBlocks[P2SheetColumnBlocks["Veteran"] = 2] = "Veteran";
        P2SheetColumnBlocks[P2SheetColumnBlocks["AdmCosts"] = 3] = "AdmCosts";
    })(P2SheetColumnBlocks = F05320.P2SheetColumnBlocks || (F05320.P2SheetColumnBlocks = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            var isFooter = this.IsFooterRow(row);
            var rowCount = this.RowCount;
            if (isFooter) {
                if (this.IsColumnInDataBlock(column, P2SheetColumnBlocks.Total)) {
                    if (this.IsTotalRow(row)) {
                        return this._sheetOptions.TotalRowFormat;
                    }
                    else {
                        return SheetFormatCollection.Calc;
                    }
                }
                else {
                    if (this.CalcEndBlockColumn(P2SheetColumnBlocks.Total) < column) {
                        if (row === (rowCount - SubsidiesSubventions.SheetTotalRows.DistributedVolume)) {
                            return SheetFormatCollection.Calc;
                        }
                    }
                }
                return SheetFormatCollection.Default;
            }
            else {
                if (this.IsColumnInDataBlock(column, P2SheetColumnBlocks.Total)) {
                    return SheetFormatCollection.Calc;
                }
                else {
                    return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
                }
            }
        };
        P2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            var isFooter = this.IsFooterRow(row);
            if (isFooter && this.CalcEndBlockColumn(P2SheetColumnBlocks.Total) < column) {
                var rowCount = this.RowCount;
                if (row === (rowCount - SubsidiesSubventions.SheetTotalRows.DistributedVolume)) {
                    return this.Document.CommonRules.GetFooterSum(this, row, column);
                }
                else {
                    return ObasHelper.X;
                }
            }
            return _super.prototype.CalcEventHandler.call(this, sheetId, row, column, fieldId);
        };
        return P2Sheet;
    }(SubsidiesSubventions.P2Sheet));
    F05320.P2Sheet = P2Sheet;
    var P3P4SheetColumnBlocks;
    (function (P3P4SheetColumnBlocks) {
        P3P4SheetColumnBlocks[P3P4SheetColumnBlocks["Protez"] = 0] = "Protez";
        P3P4SheetColumnBlocks[P3P4SheetColumnBlocks["Service"] = 1] = "Service";
        P3P4SheetColumnBlocks[P3P4SheetColumnBlocks["Total"] = 2] = "Total";
    })(P3P4SheetColumnBlocks = F05320.P3P4SheetColumnBlocks || (F05320.P3P4SheetColumnBlocks = {}));
    var P3P4Sheet = (function (_super) {
        __extends(P3P4Sheet, _super);
        function P3P4Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P3P4Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsFooterRow(row)) {
                if (this.IsDataColumn(column)) {
                    return SheetFormatCollection.Calc;
                }
            }
            else {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Related;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    default:
                        if (this.IsColumnInDataBlock(column, P3P4SheetColumnBlocks.Total)) {
                            return SheetFormatCollection.Calc;
                        }
                        else {
                            return SheetFormatCollection.Related;
                        }
                }
            }
            return SheetFormatCollection.Default;
        };
        P3P4Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.IsFooterRow(row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return P3P4Sheet._totalRowName;
                    case this.RowCodeColumn:
                        return P3P4Sheet._totalRowCode;
                    default:
                        return this.Document.CommonRules.GetFooterSum(this, row, column);
                }
            }
            else if (column === this.RowCodeColumn) {
                return this.CalcRowCode(row, P3P4Sheet._rowCodeLength);
            }
            return undefined;
        };
        P3P4Sheet.prototype.GetCaptionEventHandler = function (tableId, index, fieldCaption, partFieldCaption) {
            var sectionIndex = fieldCaption.indexOf("Invalid") > -1 ? 3 : 4;
            var groupIndex = fieldCaption.indexOf("Protez") > -1 ? 1 : 2;
            return "\u043D\u0430 " + ObasHelper.CalcYearColumnCaption(index, this.Document.Settings.StartYear) + " \u0433\u043E\u0434\n(\u0433\u0440. " + (10 + index) + " (01000) \u0440\u0430\u0437\u0434. " + sectionIndex + "." + groupIndex + ")";
        };
        P3P4Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, fieldCaption, partFieldCaption) {
            return "\u043D\u0430 " + ObasHelper.CalcYearColumnCaption(index, this.Document.Settings.StartYear) + " \u0433\u043E\u0434\n(\u0433\u0440. " + (3 + index) + " + \u0433\u0440. " + (6 + index) + ")";
        };
        return P3P4Sheet;
    }(YearsSheetTyped));
    P3P4Sheet._totalRowName = "Итого";
    P3P4Sheet._totalRowCode = "900";
    P3P4Sheet._rowCodeLength = P3P4Sheet._totalRowCode.length;
    F05320.P3P4Sheet = P3P4Sheet;
    var PXSp1Sp2Sheet = (function (_super) {
        __extends(PXSp1Sp2Sheet, _super);
        function PXSp1Sp2Sheet(_id, document) {
            var _this = _super.call(this, document) || this;
            _this._id = _id;
            return _this;
        }
        Object.defineProperty(PXSp1Sp2Sheet.prototype, "SheetInfo", {
            get: function () {
                return PXSp1Sp2Sheet._sheetPXInfo;
            },
            enumerable: true,
            configurable: true
        });
        PXSp1Sp2Sheet.prototype.StandardCalcStrCode = function (param, row, column, info) {
            var sheet = this.GetSheetFromParam(param);
            var curLvl = sheet.GetRowLevel(row) - 1;
            var lvlInc = curLvl > 0 ? info.LevelIncs[curLvl - 1] : 0;
            var prevLvl = -1;
            var prevCode = 0;
            var curCode;
            if (row > 0) {
                prevLvl = sheet.GetRowLevel(row - 1) - 1;
                prevCode = parseInt(sheet.GetCellValue(row - 1, column), 10);
            }
            if (curLvl === 1) {
                curCode = (((prevCode / lvlInc) | 0) + 1) * lvlInc;
                return ObasHelper.FillWithCharacter(curCode.toString(), 5);
            }
            else {
                return _super.prototype.StandardCalcStrCode.call(this, param, row, column, info);
            }
        };
        PXSp1Sp2Sheet.prototype.GetYearsCaptionEventHandler = function (tableId, index, defaultCaption, fieldCaption) {
            return "\u043D\u0430 " + ObasHelper.CalcYearColumnCaption(index, this.Document.Settings.StartYear) + " \u0433\u043E\u0434\n(\u0433\u0440. " + (4 + index) + " * \u0433\u0440. " + (7 + index) + ")";
        };
        return PXSp1Sp2Sheet;
    }(HierarchyYearGroupSheet));
    PXSp1Sp2Sheet._totalRow = {
        IsCalculated: false,
        Name: "Всего",
        Format: SheetFormatCollection.Default
    };
    PXSp1Sp2Sheet._subTotalRow = {
        IsCalculated: false,
        Name: "Итого по субъекту",
        Format: SheetFormatCollection.Default
    };
    PXSp1Sp2Sheet._sheetFreePokInfo = {
        Cell: { Type: SheetCellTypes.Free },
        TotalRow: PXSp1Sp2Sheet._totalRow,
        SubTotalRow: PXSp1Sp2Sheet._subTotalRow
    };
    PXSp1Sp2Sheet._sheetPXInfo = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 2,
            Length: 4,
            LevelIncs: [1000, 1],
            CalcTotalCode: function () {
                return 90100;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.RelatedColDefaultTotal,
            PXSp1Sp2Sheet._sheetFreePokInfo,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F05320.PXSp1Sp2Sheet = PXSp1Sp2Sheet;
    var P3Sp1Sheet = (function (_super) {
        __extends(P3Sp1Sheet, _super);
        function P3Sp1Sheet(id, document, _subjectTable, _editors) {
            var _this = _super.call(this, id, document) || this;
            _this._subjectTable = _subjectTable;
            _this._editors = _editors;
            _this._sheetHelper = null;
            return _this;
        }
        Object.defineProperty(P3Sp1Sheet.prototype, "SheetInfo", {
            get: function () {
                return P3Sp1Sheet._sheetP3Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp1Sheet.prototype, "SheetHelper", {
            get: function () {
                if (this._sheetHelper == null) {
                    this._sheetHelper = new SubsidiesSubventions.FSheet(this._id, this.Document, new SubsidiesSubventions.FSheetOptions(1, SheetFormatCollection.Spr, SheetFormatCollection.Free, SheetFormatCollection.Calc), this._subjectTable, this._editors);
                }
                return this._sheetHelper;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp1Sheet.prototype.EditorIdEventHandler = function () {
            return this.SheetHelper.EditorIdEventHandler();
        };
        return P3Sp1Sheet;
    }(PXSp1Sp2Sheet));
    P3Sp1Sheet._sheetP3Info = {
        MaxLevel: 2,
        CodeInfo: {
            Column: 2,
            Length: 4,
            LevelIncs: [1000, 1],
            CalcTotalCode: function () {
                return 90100;
            }
        },
        ColumnsInfo: [
            SheetColumnInfoCollection.SprColDefaultTotal,
            P3Sp1Sheet._sheetFreePokInfo,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.FreeColAllX,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F05320.P3Sp1Sheet = P3Sp1Sheet;
    var P5Sheet = (function (_super) {
        __extends(P5Sheet, _super);
        function P5Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P5Sheet.prototype, "SheetInfo", {
            get: function () {
                return P5Sheet._sheetP5Info;
            },
            enumerable: true,
            configurable: true
        });
        P5Sheet.prototype.EditingCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return column > 0;
        };
        return P5Sheet;
    }(HierarchyYearGroupSheet));
    P5Sheet._totalRow = {
        IsCalculated: false,
        Name: "Итого",
        Format: SheetFormatCollection.Default
    };
    P5Sheet._sheetSprPokInfo = {
        Cell: { Type: SheetCellTypes.Related },
        TotalRow: P5Sheet._totalRow,
        SubTotalRow: P5Sheet._totalRow
    };
    P5Sheet._sheetP5Info = {
        MaxLevel: 1,
        CodeInfo: {
            Column: 1,
            Length: 3,
            LevelIncs: [1],
            CalcTotalCode: function () {
                return 900;
            }
        },
        ColumnsInfo: [
            P5Sheet._sheetSprPokInfo,
            SheetColumnInfoCollection.AllDefault,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.FreeColAllCalc,
            SheetColumnInfoCollection.CalcColAllCalc
        ]
    };
    F05320.P5Sheet = P5Sheet;
})(F05320 || (F05320 = {}));
