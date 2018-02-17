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
var F05318;
(function (F05318) {
    var InterfaceRules = (function (_super) {
        __extends(InterfaceRules, _super);
        function InterfaceRules() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InterfaceRules;
    }(BaseInterfaceRules));
    F05318.InterfaceRules = InterfaceRules;
    var YearBlocks;
    (function (YearBlocks) {
        YearBlocks[YearBlocks["Sum"] = 0] = "Sum";
        YearBlocks[YearBlocks["Invalid"] = 1] = "Invalid";
        YearBlocks[YearBlocks["Veteran"] = 2] = "Veteran";
    })(YearBlocks = F05318.YearBlocks || (F05318.YearBlocks = {}));
    var P2Sheet = (function (_super) {
        __extends(P2Sheet, _super);
        function P2Sheet(id, document, _subjectTable) {
            return _super.call(this, id, document, new SubsidiesSubventions.FSheetOptions(3, SheetFormatCollection.Spr, SheetFormatCollection.Related, SheetFormatCollection.Free), _subjectTable, new SubsidiesSubventions.EditorsSubjects("F05_318_R2_Subject_Editor", "F05_318_R2_ScienceCityName_Editor", "F05_318_R2_SecurityAdmTerrEntityName_Editor", "F05_318_R2_MunicipalEntityName_Editor")) || this;
        }
        P2Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            if (this.IsColumnInDataBlock(column, YearBlocks.Sum)) {
                return SheetFormatCollection.Calc;
            }
            else {
                if (!this.IsFooterRow(row) && (column >= this.CalcStartBlockColumn(YearBlocks.Invalid))) {
                    return SheetFormatCollection.Free;
                }
            }
            return _super.prototype.FormatEventHandler.call(this, sheetId, row, column, groupIndex);
        };
        return P2Sheet;
    }(SubsidiesSubventions.FSheet));
    F05318.P2Sheet = P2Sheet;
    var P3Sheet = (function (_super) {
        __extends(P3Sheet, _super);
        function P3Sheet(id, document) {
            return _super.call(this, id, document, 1) || this;
        }
        P3Sheet.prototype.FormatEventHandler = function (sheetId, row, column, groupIndex) {
            return (column === this.RowNameColumn) ? SheetFormatCollection.Default : SheetFormatCollection.Free;
        };
        return P3Sheet;
    }(YearsSheet));
    F05318.P3Sheet = P3Sheet;
})(F05318 || (F05318 = {}));
