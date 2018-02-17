var dualTable = ObasTableCollection.DualTable;
if (dualTable.RowCount === 0) {
    dualTable.IsReadOnly = false;
    dualTable.AddRow();
    dualTable.PostRow();
    dualTable.IsReadOnly = true;
}
