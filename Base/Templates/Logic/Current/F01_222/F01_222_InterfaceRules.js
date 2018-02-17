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
var F01222;
(function (F01222) {
    var InterfaceRulesF01212 = F01212.InterfaceRules;
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._sheetP6Sp3Info = null;
            _this._sheetP6Sp4Info = null;
            _this._F01212sheetP4Sp3Info = null;
            return _this;
        }
        Object.defineProperty(InterfaceRules.prototype, "SheetP6Sp3Info", {
            get: function () {
                if (this._sheetP6Sp3Info == null) {
                    this._sheetP6Sp3Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRulesF01212._sheetPXSp3CodeInfo,
                        ColumnsInfo: [
                            this.SprColConstAll,
                            SheetColumnInfoCollection.CalcColFormatOnly,
                            SheetColumnInfoCollection.FreeColAllCalc,
                            SheetColumnInfoCollection.FreeColAllX,
                            SheetColumnInfoCollection.FreeColAllX,
                            InterfaceRules._sheetP6Sp3Col4Info,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX,
                            SheetColumnInfoCollection.RelatedColAllX
                        ]
                    };
                }
                return this._sheetP6Sp3Info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InterfaceRules.prototype, "SheetP6Sp4Info", {
            get: function () {
                if (this._sheetP6Sp4Info == null) {
                    this._sheetP6Sp4Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRulesF01212._sheetPXSp3CodeInfo,
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
                            SheetColumnInfoCollection.CalcColAllCalc
                        ]
                    };
                }
                return this._sheetP6Sp4Info;
            },
            enumerable: true,
            configurable: true
        });
        InterfaceRules.prototype.SheetP6Sp3FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP6Sp3Info);
        };
        InterfaceRules.prototype.SheetP6Sp4FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return this.Document.CommonRules.StandardFormat(sheetId, row, column, this.SheetP6Sp4Info);
        };
        InterfaceRules.prototype.SheetP6Sp3CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP6Sp3Info);
        };
        InterfaceRules.prototype.SheetP6Sp4CalcEventHandler = function (sheetId, row, column, fieldId) {
            return this.Document.CommonRules.StandardCalc(sheetId, row, column, this.SheetP6Sp4Info);
        };
        Object.defineProperty(InterfaceRules.prototype, "SheetP4Sp3Info", {
            get: function () {
                if (this._F01212sheetP4Sp3Info == null) {
                    this._F01212sheetP4Sp3Info = {
                        MaxLevel: 1,
                        CodeInfo: InterfaceRules._sheetPXSp3CodeInfo,
                        ColumnsInfo: [
                            this.SprColConstAll,
                            SheetColumnInfoCollection.CalcColFormatOnly,
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
                return this._F01212sheetP4Sp3Info;
            },
            enumerable: true,
            configurable: true
        });
        return InterfaceRules;
    }(InterfaceRulesF01212));
    InterfaceRules._sheetP6Sp3Col4Info = {
        Cell: {
            Type: SheetCellTypes.Calc,
            FormulaId: BaseFormulas[BaseFormulas.SUM],
            SourceColumns: [6, 7, 8, 9, 10]
        },
        TotalRow: SheetRowInfoCollection.XRow,
        SubTotalRow: SheetRowInfoCollection.XRow
    };
    F01222.InterfaceRules = InterfaceRules;
    
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
    }(InterfaceRulesF01212));
    F01222.P3Sp4r2Sheet = P3Sp4r2Sheet;

    var P5Sp4r2Sheet = (function (_super) {
        __extends(P5Sp4r2Sheet, _super);
        function P5Sp4r2Sheet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        P5Sp4r2Sheet.prototype.CalcEventHandler = function (sheetId, row, column, fieldId) {
            if (column === 1) {
                return ObasHelper.FillWithCharacter((row + 1).toString(), 3);
            }
        };
        return P5Sp4r2Sheet;
    }(Sheet));
    F01222.P5Sp4r2Sheet = P5Sp4r2Sheet;
    
})(F01222 || (F01222 = {}));
