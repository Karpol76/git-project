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
var AddAnalisisTableFields = (function (_super) {
    __extends(AddAnalisisTableFields, _super);
    function AddAnalisisTableFields() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddAnalisisTableFields, "Op1Field", {
        get: function () {
            if (this._Op1Field == null) {
                this._Op1Field = new BaseGenericObasTableField("Op1_Y");
            }
            return this._Op1Field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisTableFields, "Op2Field", {
        get: function () {
            if (this._Op2Field == null) {
                this._Op2Field = new BaseGenericObasTableField("Op2_Y");
            }
            return this._Op2Field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisTableFields, "Op3Field", {
        get: function () {
            if (this._Op3Field == null) {
                this._Op3Field = new BaseGenericObasTableField("Op3_Y");
            }
            return this._Op3Field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisTableFields, "OpSumField", {
        get: function () {
            if (this._OpSumField == null) {
                this._OpSumField = new BaseGenericObasTableField("OpSum_Y");
            }
            return this._OpSumField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisTableFields, "KosguCodeField", {
        get: function () {
            if (this._KosguCodeField == null) {
                this._KosguCodeField = new BaseObasTableField("KOSGU_Code", false);
            }
            return this._KosguCodeField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisTableFields, "KosguSumField", {
        get: function () {
            if (this._KosguSumField == null) {
                this._KosguSumField = new BaseGenericObasTableField("KOSGUSum_Y");
            }
            return this._KosguSumField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisTableFields, "DapSumField", {
        get: function () {
            if (this._DapSumField == null) {
                this._DapSumField = new BaseGenericObasTableField("DAPSum_Y");
            }
            return this._DapSumField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalisisTableFields, "DiffSumField", {
        get: function () {
            if (this._DiffSumField == null) {
                this._DiffSumField = new BaseGenericObasTableField("Diff_Y");
            }
            return this._DiffSumField;
        },
        enumerable: true,
        configurable: true
    });
    return AddAnalisisTableFields;
}(BaseObasTableFields));
AddAnalisisTableFields._Op1Field = null;
AddAnalisisTableFields._Op2Field = null;
AddAnalisisTableFields._Op3Field = null;
AddAnalisisTableFields._OpSumField = null;
AddAnalisisTableFields._KosguCodeField = null;
AddAnalisisTableFields._KosguSumField = null;
AddAnalisisTableFields._DapSumField = null;
AddAnalisisTableFields._DiffSumField = null;
var AddAnalisisIndicatorDetailTable = (function (_super) {
    __extends(AddAnalisisIndicatorDetailTable, _super);
    function AddAnalisisIndicatorDetailTable(id, Document) {
        var _this = _super.call(this, id) || this;
        _this.Document = Document;
        _this._copyFieldsInfo = null;
        return _this;
    }
    AddAnalisisIndicatorDetailTable.prototype.OperandsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var kosguCode = this.GetFieldValue(AddAnalisisTableFields.KosguCodeField.Id);
        var kosguSheet = this.Document.KosguSheets.getValue(kosguCode);
        if (kosguSheet !== null) {
            var opArray = [];
            if (kosguSheet.OperandsCount >= 1) {
                opArray.push(this.GetFieldValue(AddAnalisisTableFields.Op1Field.GenerateId(fieldId)));
            }
            ;
            if (kosguSheet.OperandsCount >= 2) {
                opArray.push(this.GetFieldValue(AddAnalisisTableFields.Op2Field.GenerateId(fieldId)));
            }
            ;
            if (kosguSheet.OperandsCount >= 3) {
                opArray.push(this.GetFieldValue(AddAnalisisTableFields.Op3Field.GenerateId(fieldId)));
            }
            ;
            var result = 0;
            if (opArray.length > 0) {
                result = opArray[0];
                for (var i = 1; i < opArray.length; i++) {
                    result = result * opArray[i];
                }
            }
            this.SetFieldValue(AddAnalisisTableFields.OpSumField.GenerateId(fieldId), result);
        }
    };
    AddAnalisisIndicatorDetailTable.prototype.SumChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var kosguCode = this.GetFieldValue(AddAnalisisTableFields.KosguCodeField.Id);
        if (this.Document.AddAnaliticIndicatorTotalTable.Locate(AddAnalisisTableFields.KosguCodeField.Id, kosguCode)) {
            var curVal = this.Document.AddAnaliticIndicatorTotalTable.GetFieldValue(AddAnalisisTableFields.DapSumField.GenerateId(fieldId));
            var result = curVal + newValue - oldValue;
            this.Document.AddAnaliticIndicatorTotalTable.SetFieldValue(AddAnalisisTableFields.DapSumField.GenerateId(fieldId), result);
        }
    };
    AddAnalisisIndicatorDetailTable.prototype.CopyData = function (srcYear, destYear) {
        this.Document.CommonRules.CopyTableData(this, srcYear, destYear, null, AddAnalisisTableFields.Op1Field, AddAnalisisTableFields.Op2Field, AddAnalisisTableFields.Op3Field);
    };
    AddAnalisisIndicatorDetailTable.prototype.ResetData = function () {
        this.Document.CommonRules.ResetTableData(this, [AddAnalisisTableFields.Op1Field, AddAnalisisTableFields.Op2Field, AddAnalisisTableFields.Op3Field, AddAnalisisTableFields.OpSumField], null, false);
    };
    AddAnalisisIndicatorDetailTable.prototype.CollectUserData = function () {
        return this.CollectTableData(this.InitCopyFieldsInfo());
    };
    Object.defineProperty(AddAnalisisIndicatorDetailTable.prototype, "CopyFields", {
        get: function () {
            var _this = this;
            if (this._copyFieldsInfo == null) {
                this._copyFieldsInfo = [];
                this._copyFieldsInfo.push(new ObasTableField("FrmPart_ID", this, true));
                this._copyFieldsInfo.push(new ObasTableField("OKPD_ID", this, true));
                this._copyFieldsInfo.push(new ObasTableField("OKEI_ID", this, true));
                this._copyFieldsInfo.push(new ObasTableField("DAP_ID", this, true));
                var yearFieldOp1_1 = AddAnalisisTableFields.Op1Field;
                var yearFieldOp2_1 = AddAnalisisTableFields.Op2Field;
                var yearFieldOp3_1 = AddAnalisisTableFields.Op3Field;
                this.Document.IterateByYears(function (yearIndex) {
                    _this._copyFieldsInfo.push(yearFieldOp1_1.GenerateTableField(_this, yearIndex));
                    _this._copyFieldsInfo.push(yearFieldOp2_1.GenerateTableField(_this, yearIndex));
                    _this._copyFieldsInfo.push(yearFieldOp3_1.GenerateTableField(_this, yearIndex));
                });
            }
            return this._copyFieldsInfo;
        },
        enumerable: true,
        configurable: true
    });
    AddAnalisisIndicatorDetailTable.prototype.InitCopyFieldsInfo = function () {
        return ObasHelper.CreateSimpleInitCopyFieldsInfo(this);
    };
    return AddAnalisisIndicatorDetailTable;
}(ObasTable));
var AddAnalisisIndicatorTotalTable = (function (_super) {
    __extends(AddAnalisisIndicatorTotalTable, _super);
    function AddAnalisisIndicatorTotalTable(id, Document) {
        var _this = _super.call(this, id) || this;
        _this.Document = Document;
        return _this;
    }
    AddAnalisisIndicatorTotalTable.prototype.PartsChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        var kosguVal = this.GetFieldValue(AddAnalisisTableFields.KosguSumField.GenerateId(fieldId));
        var dapVal = this.GetFieldValue(AddAnalisisTableFields.DapSumField.GenerateId(fieldId));
        var result = (kosguVal || 0) - (dapVal || 0);
        this.SetFieldValue(AddAnalisisTableFields.DiffSumField.GenerateId(fieldId), result);
    };
    AddAnalisisIndicatorTotalTable.prototype.OuterKosguSumChanged = function (fieldId, oldValue, newValue, kosguCode) {
        if (this.Locate(AddAnalisisTableFields.KosguCodeField.Id, kosguCode)) {
            var curVal = this.GetFieldValue(AddAnalisisTableFields.KosguSumField.GenerateId(fieldId));
            var result = curVal + newValue - oldValue;
            this.SetFieldValue(AddAnalisisTableFields.KosguSumField.GenerateId(fieldId), result);
        }
    };
    AddAnalisisIndicatorTotalTable.prototype.ResetData = function () {
        this.Document.CommonRules.ResetTableData(this, [AddAnalisisTableFields.DapSumField, AddAnalisisTableFields.KosguSumField, AddAnalisisTableFields.DiffSumField], null, false);
    };
    return AddAnalisisIndicatorTotalTable;
}(ObasTable));
