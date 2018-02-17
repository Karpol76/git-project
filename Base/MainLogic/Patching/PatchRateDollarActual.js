var dollarTable = ObasTableCollection.RateDollarActualTable;
if (dollarTable.RowCount === 0) {
    dollarTable.IsReadOnly = false;
    var tmpDollarTable = DocumentVar.LoadTableFromFile("MainData\\Spr_Forms_STAGE1.xml", dollarTable.Id, "tmp" + dollarTable.Id);
    tmpDollarTable.Iterate(function () {
        tmpDollarTable.CopyRow(dollarTable.Id);
    });
    dollarTable.IsReadOnly = true;
    DocumentVar.DeleteTemporaryTable(tmpDollarTable);
}
