var paymentTypeSpr = ObasTableCollection.PaymentTypeSprTable;
if (paymentTypeSpr.RowCount === 0) {
    paymentTypeSpr.IsReadOnly = false;
    var tmpSprTable = DocumentVar.LoadTableFromFile("MainData\\Spr_Forms_STAGE1.xml", paymentTypeSpr.Id, "tmp" + paymentTypeSpr.Id);
    tmpSprTable.Iterate(function () {
        tmpSprTable.CopyRow(paymentTypeSpr.Id);
        paymentTypeSpr.RecordKey.Value = tmpSprTable.GetFieldValue(BaseObasTableFields.RecordKeyField.Id);
    });
    paymentTypeSpr.IsReadOnly = true;
    DocumentVar.DeleteTemporaryTable(tmpSprTable);
}
