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
    var InterfaceRulesF012XxBase = F012XX.InterfaceRules;
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sprColConstAll = null;
            _this._relatedColConstAll = null;
            _this._sheetP2Sp3Info = null;
            _this._sheetP2Sp4Info = null;
            _this._sheetP3Sp3Info = null;
            _this._sheetP3Sp4Info = null;
            _this._sheetP4Sp3Info = null;
            _this._sheetP5Sp3Info = null;
            _this._sheetP5Sp4Info = null;
            _this._sheetP3Sp4r2Info = null;
            return _this;
        }
        Object.defineProperty(InterfaceRules.prototype, "SprColConstAll", {
            get: function () {
                if (this._sprColConstAll == null) {
                    this._sprColConstAll = {
                        Cell: { Type: SheetCellTypes.Spr },
                        TotalRow: InterfaceRules._totalRowInfo,
                        SubTotalRow: SheetRowInfoCollection.SprOnlyFormatRow
                    };
                }
                return this._sprColConstAll;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "RelatedColConstAll", {
            get: function () {
                if (this._relatedColConstAll == null) {
                    this._relatedColConstAll = {
                        Cell: { Type: SheetCellTypes.Related },
                        TotalRow: InterfaceRules._totalRowInfo,
                        SubTotalRow: SheetRowInfoCollection.RelatedOnlyFormatRow
                    };
                }
                return this._relatedColConstAll;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP2Sp3Info", {
            get: function () {
                if (this._sheetP2Sp3Info == null) {
                    this._sheetP2Sp3Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetPXSp3CodeInfo,
                        ColumnsInfo: [
                            this.SprColConstAll,
                            SheetColumnInfoCollection.CalcColFormatOnly,
                            SheetColumnInfoCollection.FreeColAllCalc,
                            SheetColumnInfoCollection.FreeColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.CalcColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX
                        ]
                    };
                }
                return this._sheetP2Sp3Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP2Sp4Info", {
            get: function () {
                if (this._sheetP2Sp4Info == null) {
                    this._sheetP2Sp4Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetPXSp3CodeInfo,
                        ColumnsInfo: [
                            this.RelatedColConstAll,
                            SheetColumnInfoCollection.CalcColFormatOnly,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc
                        ]
                    };
                }
                return this._sheetP2Sp4Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP3Sp3Info", {
            get: function () {
                if (this._sheetP3Sp3Info == null) {
                    this._sheetP3Sp3Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetP3Sp3Sp4CodeInfo,
                        ColumnsInfo: [
                            SheetColumnInfoCollection.SprColDefaultTotal,
                            SheetColumnInfoCollection.RelatedColAllDefault,
                            this.RelatedColConstAll,
                            SheetColumnInfoCollection.CalcColFormatOnly,
                            SheetColumnInfoCollection.FreeColAllCalc,
                            SheetColumnInfoCollection.FreeColAllCalc,
                            SheetColumnInfoCollection.FreeColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            InterfaceRules._sheetP3Sp3Col9Info,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            InterfaceRules._sheetP3Sp3Col15Info,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX
                        ]
                    };
                }
                return this._sheetP3Sp3Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP3Sp4Info", {
            get: function () {
                if (this._sheetP3Sp4Info == null) {
                    this._sheetP3Sp4Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetP3Sp3Sp4CodeInfo,
                        ColumnsInfo: [
                            SheetColumnInfoCollection.RelatedColDefaultTotal,
                            SheetColumnInfoCollection.RelatedColAllDefault,
                            this.RelatedColConstAll,
                            SheetColumnInfoCollection.CalcColFormatOnly,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc
                        ]
                    };
                }
                return this._sheetP3Sp4Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP4Sp3Info", {
            get: function () {
                if (this._sheetP4Sp3Info == null) {
                    this._sheetP4Sp3Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetP4Sp3CodeInfo,
                        ColumnsInfo: [
                            SheetColumnInfoCollection.SprColAllDefault,
                            this.SprColConstAll,
                            SheetColumnInfoCollection.AllDefault,
                            SheetColumnInfoCollection.FreeColAllCalc,
                            SheetColumnInfoCollection.FreeColAllCalc,
                            SheetColumnInfoCollection.CalcColAllX,
                            SheetColumnInfoCollection.FreeColAllX,
                            SheetColumnInfoCollection.FreeColAllX,
                            SheetColumnInfoCollection.FreeColAllX,
                            SheetColumnInfoCollection.FreeColAllX,
                            SheetColumnInfoCollection.CalcColAllCalc
                        ]
                    };
                }
                return this._sheetP4Sp3Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP5Sp3Info", {
            get: function () {
                if (this._sheetP5Sp3Info == null) {
                    this._sheetP5Sp3Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetPXSp3CodeInfo,
                        ColumnsInfo: [
                            this.SprColConstAll,
                            SheetColumnInfoCollection.CalcColFormatOnly,
                            SheetColumnInfoCollection.FreeColAllCalc,
                            SheetColumnInfoCollection.FreeColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            InterfaceRules._sheetP5Sp3Col4Info,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX
                        ]
                    };
                }
                return this._sheetP5Sp3Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP5Sp4Info", {
            get: function () {
                if (this._sheetP5Sp4Info == null) {
                    this._sheetP5Sp4Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetPXSp3CodeInfo,
                        ColumnsInfo: [
                            this.RelatedColConstAll,
                            SheetColumnInfoCollection.CalcColFormatOnly,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.RelatedColAllCalc,
                            SheetColumnInfoCollection.CalcColAllCalc
                        ]
                    };
                }
                return this._sheetP5Sp4Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP3Sp4r2Info", {
            get: function () {
                if (this._sheetP3Sp4r2Info == null) {
                    this._sheetP3Sp4r2Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetPXSp3CodeInfo,
                        ColumnsInfo: [
                            SheetColumnInfoCollection.SprColAllDefault,
                            SheetColumnInfoCollection.CalcColFormatOnly,
                            SheetColumnInfoCollection.SprColAllDefault,
                            SheetColumnInfoCollection.SprColAllDefault,
                            SheetColumnInfoCollection.SprColAllDefault,
                            SheetColumnInfoCollection.SprColAllDefault,
                            SheetColumnInfoCollection.FreeColAllCalc
                        ]
                    };
                }
                return this._sheetP3Sp4r2Info;
            },
            enumerable: true,
            configurable: true
        });
        InterfaceRules.prototype.SheetP2Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP2Sp3Info);
        };
        InterfaceRules.prototype.SheetP2Sp4FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP2Sp4Info);
        };
        InterfaceRules.prototype.SheetP3Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP3Sp3Info);
        };
        InterfaceRules.prototype.SheetP3Sp4FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP3Sp4Info);
        };
        InterfaceRules.prototype.SheetP4Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP4Sp3Info);
        };
        InterfaceRules.prototype.SheetP5Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP5Sp3Info);
        };
        InterfaceRules.prototype.SheetP5Sp4FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP5Sp4Info);
        };
        InterfaceRules.prototype.SheetP2Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP2Sp3Info);
        };
        InterfaceRules.prototype.SheetP2Sp4CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP2Sp4Info);
        };
        InterfaceRules.prototype.SheetP3Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP3Sp3Info);
        };
        InterfaceRules.prototype.SheetP3Sp4CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP3Sp4Info);
        };
        InterfaceRules.prototype.SheetP4Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP4Sp3Info);
        };
        InterfaceRules.prototype.SheetP5Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP5Sp3Info);
        };
        InterfaceRules.prototype.SheetP5Sp4CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP5Sp4Info);
        };
        return InterfaceRules;
    }(InterfaceRulesF012XxBase));
    InterfaceRules._totalRowName = "Всего";
    InterfaceRules._sheetPXSp3CodeInfo = {
        Column: 1,
        Length: 6,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 900100;
        }
    };
    InterfaceRules._sheetP4Sp3CodeInfo = {
        Column: 2,
        Length: 6,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 900100;
        }
    };
    InterfaceRules._sheetP3Sp3Sp4CodeInfo = {
        Column: 3,
        Length: 6,
        LevelIncs: [1],
        CalcTotalCode: function () {
            return 900100;
        }
    };
    InterfaceRules._totalRowInfo = {
        IsCalculated: false,
        Name: InterfaceRules._totalRowName,
        Format: SheetFormatCollection.Default
    };
    InterfaceRules._sheetP3Sp3Col9Info = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUM],
            SourceColumns: [9, 10, 11, 12, 13]
        },
        TotalRow: SheetRowInfoCollection.XRow,
        SubTotalRow: SheetRowInfoCollection.XRow
    };
    InterfaceRules._sheetP5Sp3Col4Info = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUM],
            SourceColumns: [6, 7, 8, 9, 10, 11]
        },
        TotalRow: SheetRowInfoCollection.XRow,
        SubTotalRow: SheetRowInfoCollection.XRow
    };
    InterfaceRules._sheetP3Sp3Col15Info = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUM],
            SourceColumns: [15, 16]
        },
        TotalRow: SheetRowInfoCollection.XRow,
        SubTotalRow: SheetRowInfoCollection.XRow
    };

    var P3Sp4r2Sheet = (function (_super) {
        __extends(P3Sp4r2Sheet, _super);
        function P3Sp4r2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(P3Sp4r2Sheet.prototype, "RowCodeColumn", {
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(P3Sp4r2Sheet.prototype, "RowNameColumn", {
            get: function () {
                return this.RowCodeColumn - 1;
            },
            enumerable: true,
            configurable: true
        });
        P3Sp4r2Sheet.prototype.IsXCell = function (sheetId, row, column) {
            return column > 1 && column < 6;
        };
        P3Sp4r2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if (column < this.RowNameColumn) {
                    return undefined;
                }
                else if (column === this.RowNameColumn) {
                    return InterfaceRules.TotalRowName;
                }
                else if (column === this.RowCodeColumn) {
                    return InterfaceRules.TotalRowCode;
                }
                else if (this.IsXCell(sheetId, row, column)) {
                    return ObasHelper.X;
                }
                else {
                    return this.Document.CommonRules.GetFooterSum(sheetId, row, column);
                }
            }
            else if (column === this.RowCodeColumn) {
                return InterfaceRules.CalcRowCode(row);
            }
            return undefined;
        };
        P3Sp4r2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                if ((column <= this.RowCodeColumn) || (this.IsXCell(sheetId, row, column))) {
                    return SheetFormatCollection.Default;
                }
                else {
                    return SheetFormatCollection.Calc;
                }
            }
            else if (!this.Document.CommonRules.IsFooterRow(sheetId, row)) {
                switch (column) {
                    case this.RowNameColumn:
                        return SheetFormatCollection.Spr;
                    case this.RowCodeColumn:
                        return SheetFormatCollection.Default;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return SheetFormatCollection.Spr;
                    case 6:
                        return SheetFormatCollection.Free;
                    default:
                        return SheetFormatCollection.Related;
                }
            }
        };
        P3Sp4r2Sheet.prototype.CanEditCellEventHandler = function (sheetId, row, column, fieldId, rowLevel) {
            return !((column > 5) || (column === this.RowCodeColumn));
        };
        return P3Sp4r2Sheet;
    }(InterfaceRulesF012XxBase));
    F01212.P3Sp4r2Sheet = P3Sp4r2Sheet;

    var P4Sp3r2Sheet = (function (_super) {
        __extends(P4Sp3r2Sheet, _super);
        function P4Sp3r2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P4Sp3r2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 1) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return P4Sp3r2Sheet;
    }(Sheet));
    F01212.P4Sp3r2Sheet = P4Sp3r2Sheet;

    F01212.InterfaceRules = InterfaceRules;
})(F01212 || (F01212 = {}));
