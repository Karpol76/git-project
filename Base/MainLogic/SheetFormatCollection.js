var SheetCellTypes;
(function (SheetCellTypes) {
    SheetCellTypes[SheetCellTypes["Related"] = 0] = "Related";
    SheetCellTypes[SheetCellTypes["Spr"] = 1] = "Spr";
    SheetCellTypes[SheetCellTypes["Calc"] = 2] = "Calc";
    SheetCellTypes[SheetCellTypes["Free"] = 3] = "Free";
    SheetCellTypes[SheetCellTypes["Default"] = 4] = "Default";
})(SheetCellTypes || (SheetCellTypes = {}));
var SheetFormatColors = (function () {
    function SheetFormatColors() {
    }
    return SheetFormatColors;
}());
SheetFormatColors.Gray = "E2E0D3";
SheetFormatColors.Green = "99FFCC";
SheetFormatColors.Yellow = "FFFF99";
SheetFormatColors.Blue = "C5D9F1";
SheetFormatColors.Black = "000000";
SheetFormatColors.White = "FFFFFF";
SheetFormatColors.Red = "EA0017";
SheetFormatColors.DarkGreen = "119f58";
var SheetFormatCollection = (function () {
    function SheetFormatCollection() {
    }
    SheetFormatCollection.GetCustomFormat = function (isBold, color) {
        return new SheetFormatResult(isBold, color).ToArray();
    };
    SheetFormatCollection.GetFormat = function (cellType) {
        switch (cellType) {
            case SheetCellTypes.Calc:
                return SheetFormatCollection.Calc;
            case SheetCellTypes.Free:
                return SheetFormatCollection.Free;
            case SheetCellTypes.Related:
                return SheetFormatCollection.Related;
            case SheetCellTypes.Spr:
                return SheetFormatCollection.Spr;
            default:
                return SheetFormatCollection.Default;
        }
    };
    return SheetFormatCollection;
}());
SheetFormatCollection.Default = new SheetFormatResult(false, SheetFormatColors.White).ToArray();
SheetFormatCollection.Calc = new SheetFormatResult(false, SheetFormatColors.Blue).ToArray();
SheetFormatCollection.Free = new SheetFormatResult(false, SheetFormatColors.Yellow).ToArray();
SheetFormatCollection.Spr = new SheetFormatResult(false, SheetFormatColors.Green).ToArray();
SheetFormatCollection.Related = new SheetFormatResult(false, SheetFormatColors.Gray).ToArray();
var SheetRowInfoCollection = (function () {
    function SheetRowInfoCollection() {
    }
    return SheetRowInfoCollection;
}());
SheetRowInfoCollection.XRow = {
    IsCalculated: false,
    Name: ObasHelper.X,
    Format: SheetFormatCollection.Default
};
SheetRowInfoCollection.Default = {
    IsCalculated: false,
    Format: SheetFormatCollection.Default
};
SheetRowInfoCollection.DefaultCalc = {
    IsCalculated: true
};
SheetRowInfoCollection.CalcOnlyFormatRow = {
    IsCalculated: false
};
SheetRowInfoCollection.SprOnlyFormatRow = {
    IsCalculated: false,
    Format: SheetFormatCollection.Spr
};
SheetRowInfoCollection.RelatedOnlyFormatRow = {
    IsCalculated: false,
    Format: SheetFormatCollection.Related
};
SheetRowInfoCollection.FreeOnlyFormatRow = {
    IsCalculated: false,
    Format: SheetFormatCollection.Free
};
var SheetColumnInfoCollection = (function () {
    function SheetColumnInfoCollection() {
    }
    return SheetColumnInfoCollection;
}());
SheetColumnInfoCollection.CalcColFormatOnly = {
    Cell: { Type: SheetCellTypes.Calc },
    TotalRow: SheetRowInfoCollection.CalcOnlyFormatRow,
    SubTotalRow: SheetRowInfoCollection.CalcOnlyFormatRow
};
SheetColumnInfoCollection.CalcColAllX = {
    Cell: { Type: SheetCellTypes.Calc },
    TotalRow: SheetRowInfoCollection.XRow,
    SubTotalRow: SheetRowInfoCollection.XRow
};
SheetColumnInfoCollection.CalcColAllCalc = {
    Cell: { Type: SheetCellTypes.Calc },
    TotalRow: SheetRowInfoCollection.DefaultCalc,
    SubTotalRow: SheetRowInfoCollection.DefaultCalc
};
SheetColumnInfoCollection.FreeColAllCalc = {
    Cell: { Type: SheetCellTypes.Free },
    TotalRow: SheetRowInfoCollection.DefaultCalc,
    SubTotalRow: SheetRowInfoCollection.DefaultCalc
};
SheetColumnInfoCollection.FreeColAllX = {
    Cell: { Type: SheetCellTypes.Free },
    TotalRow: SheetRowInfoCollection.XRow,
    SubTotalRow: SheetRowInfoCollection.XRow
};
SheetColumnInfoCollection.FreeColDefaultTotal = {
    Cell: { Type: SheetCellTypes.Free },
    TotalRow: SheetRowInfoCollection.Default,
    SubTotalRow: SheetRowInfoCollection.FreeOnlyFormatRow
};
SheetColumnInfoCollection.FreeColAllDefault = {
    Cell: { Type: SheetCellTypes.Free },
    TotalRow: SheetRowInfoCollection.Default,
    SubTotalRow: SheetRowInfoCollection.Default
};
SheetColumnInfoCollection.RelatedColAllCalc = {
    Cell: { Type: SheetCellTypes.Related },
    TotalRow: SheetRowInfoCollection.DefaultCalc,
    SubTotalRow: SheetRowInfoCollection.DefaultCalc
};
SheetColumnInfoCollection.RelatedColAllX = {
    Cell: { Type: SheetCellTypes.Related },
    TotalRow: SheetRowInfoCollection.XRow,
    SubTotalRow: SheetRowInfoCollection.XRow
};
SheetColumnInfoCollection.RelatedColDefaultTotal = {
    Cell: { Type: SheetCellTypes.Related },
    TotalRow: SheetRowInfoCollection.Default,
    SubTotalRow: SheetRowInfoCollection.RelatedOnlyFormatRow
};
SheetColumnInfoCollection.RelatedColDefaultTotalFirstSubTotal = {
    Cell: { Type: SheetCellTypes.Related },
    SubTotalRow: [SheetRowInfoCollection.Default, SheetRowInfoCollection.RelatedOnlyFormatRow],
    TotalRow: SheetRowInfoCollection.Default
};
SheetColumnInfoCollection.RelatedColTotalX = {
    Cell: { Type: SheetCellTypes.Related },
    TotalRow: SheetRowInfoCollection.XRow,
    SubTotalRow: SheetRowInfoCollection.RelatedOnlyFormatRow
};
SheetColumnInfoCollection.RelatedColAllDefault = {
    Cell: { Type: SheetCellTypes.Related },
    TotalRow: SheetRowInfoCollection.Default,
    SubTotalRow: SheetRowInfoCollection.Default
};
SheetColumnInfoCollection.SprColAllX = {
    Cell: { Type: SheetCellTypes.Spr },
    TotalRow: SheetRowInfoCollection.XRow,
    SubTotalRow: SheetRowInfoCollection.XRow
};
SheetColumnInfoCollection.SprColDefaultTotal = {
    Cell: { Type: SheetCellTypes.Spr },
    TotalRow: SheetRowInfoCollection.Default,
    SubTotalRow: SheetRowInfoCollection.SprOnlyFormatRow
};
SheetColumnInfoCollection.SprColAllDefault = {
    Cell: { Type: SheetCellTypes.Spr },
    TotalRow: SheetRowInfoCollection.Default,
    SubTotalRow: SheetRowInfoCollection.Default
};
SheetColumnInfoCollection.SprColTotalX = {
    Cell: { Type: SheetCellTypes.Spr },
    TotalRow: SheetRowInfoCollection.XRow,
    SubTotalRow: SheetRowInfoCollection.SprOnlyFormatRow
};
SheetColumnInfoCollection.AllDefault = {
    Cell: { Type: SheetCellTypes.Default },
    TotalRow: SheetRowInfoCollection.Default,
    SubTotalRow: SheetRowInfoCollection.Default
};
