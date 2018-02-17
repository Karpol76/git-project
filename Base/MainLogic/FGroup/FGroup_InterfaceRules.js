var FGroup;
(function (FGroup) {
    var InterfaceRules = (function () {
        function InterfaceRules(_document) {
            this._document = _document;
        }
        InterfaceRules.prototype.GetGroupName = function (rroObasKey) {
            var rroObasTable = ObasTableCollection.RroObasTable;
            if (rroObasTable.LocateByKeys(rroObasKey)) {
                var rroDataTable = rroObasTable.RroDataKey.SourceTable;
                return "" + rroObasTable.Obas.Code + InterfaceRules._nameDelimiter + rroDataTable
                    .GetKbkCode(InterfaceRules._nameDelimiter);
            }
            return InterfaceRules._defaultGroupName;
        };
        InterfaceRules.prototype.SetRroObasKey = function (rroObasKey) {
            this._document.ParamsTable.RroObasKey.Value = rroObasKey;
            return this.GetGroupName(rroObasKey);
        };
        return InterfaceRules;
    }());
    InterfaceRules._nameDelimiter = "_";
    InterfaceRules._defaultGroupName = "NewTemplate";
    FGroup.InterfaceRules = InterfaceRules;
})(FGroup || (FGroup = {}));
