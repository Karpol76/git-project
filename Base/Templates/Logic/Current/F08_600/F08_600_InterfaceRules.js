var F08600;
(function (F08600) {
    var InterfaceRules = (function () {
        function InterfaceRules(_document) {
            this._document = _document;
        }
        InterfaceRules.prototype.SheetP1FormatEventHandler = function (gridReference, row, column, groupIndex) {
            if (column === 0) {
                return SheetFormatCollection.Default;
            }
            else {
                return SheetFormatCollection.Free;
            }
        };
        InterfaceRules.prototype.ShiftDataMenuItemClickEventHandler = function () {
            this._document.UpdateRules.ShiftData();
        };
        InterfaceRules.prototype.CopyDataMenuItemClickEventHandler = function () {
            this._document.UpdateRules.CopyData();
        };
        return InterfaceRules;
    }());
    F08600.InterfaceRules = InterfaceRules;
})(F08600 || (F08600 = {}));
