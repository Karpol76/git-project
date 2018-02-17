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
var SprTable = (function (_super) {
    __extends(SprTable, _super);
    function SprTable(id, keyFields, codeFieldId, nameFieldId) {
        if (keyFields === void 0) { keyFields = [BaseObasTableFields.RecordKeyField.Id]; }
        if (codeFieldId === void 0) { codeFieldId = "Code"; }
        if (nameFieldId === void 0) { nameFieldId = "Name"; }
        var _this = _super.call(this, id, keyFields, true) || this;
        _this._code = new ObasTableField(codeFieldId, _this);
        _this._name = new ObasTableField(nameFieldId, _this);
        return _this;
    }
    Object.defineProperty(SprTable.prototype, "Code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SprTable.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    SprTable.prototype.LookupKeyByCode = function (code) {
        return this.Lookup(this.Code.Id, code, this.RecordKey.Id);
    };
    SprTable.prototype.LookupKeyByName = function (name) {
        return this.Lookup(this.Name.Id, name, this.RecordKey.Id);
    };
    SprTable.prototype.GetRecordKeyByName = function (name, addIfNotExists) {
        if (addIfNotExists === void 0) { addIfNotExists = false; }
        if (this.Name.Locate(name)) {
            return this.RecordKey.Value;
        }
        else if (addIfNotExists) {
            this.AddRow();
            this.Name.Value = name;
            this.PostRow();
            return this.RecordKey.Value;
        }
        return null;
    };
    return SprTable;
}(ObasTable));
var SprTableWithPeriod = (function (_super) {
    __extends(SprTableWithPeriod, _super);
    function SprTableWithPeriod() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._dateStart = null;
        _this._dateEnd = null;
        return _this;
    }
    Object.defineProperty(SprTableWithPeriod.prototype, "DateEnd", {
        get: function () {
            if (this._dateEnd == null) {
                this._dateEnd = new ObasTableField("DateEnd", this);
            }
            return this._dateEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SprTableWithPeriod.prototype, "DateStart", {
        get: function () {
            if (this._dateStart == null) {
                this._dateStart = new ObasTableField("DateStart", this);
            }
            return this._dateStart;
        },
        enumerable: true,
        configurable: true
    });
    SprTableWithPeriod.prototype.IsActualRecord = function (dateParam) {
        var startDate;
        var endDate;
        var checkDate;
        if (typeof dateParam === "number") {
            startDate = this.DateStart.Value.getFullYear();
            endDate = this.DateEnd.Value.getFullYear();
            checkDate = dateParam;
        }
        else {
            startDate = +this.DateStart.Value;
            endDate = +this.DateEnd.Value;
            checkDate = +dateParam;
        }
        return startDate <= checkDate && checkDate <= endDate;
    };
    return SprTableWithPeriod;
}(SprTable));
var ObasSprTable = (function (_super) {
    __extends(ObasSprTable, _super);
    function ObasSprTable() {
        var _this = _super.call(this, "OBAS_SPR") || this;
        _this._hasJsLogic = null;
        _this._oldCode = new ObasTableField("oldCode", _this);
        _this._okud = new ObasTableField("OKUD", _this);
        return _this;
    }
    Object.defineProperty(ObasSprTable.prototype, "HasJsLogic", {
        get: function () {
            if (this._hasJsLogic == null) {
                this._hasJsLogic = new ObasTableField("HasJsLogic", this);
            }
            return this._hasJsLogic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasSprTable.prototype, "OldCode", {
        get: function () {
            return this._oldCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasSprTable.prototype, "Okud", {
        get: function () {
            return this._okud;
        },
        enumerable: true,
        configurable: true
    });
    return ObasSprTable;
}(SprTable));
var FileTypeTable = (function (_super) {
    __extends(FileTypeTable, _super);
    function FileTypeTable() {
        var _this = _super.call(this, "FileType", ["TypeNum"], "TypeNum") || this;
        _this._isMain = new ObasTableField("IsMain", _this);
        _this._postfix = new ObasTableField("FilePostfix", _this);
        _this._shortName = new ObasTableField("ShortName", _this);
        return _this;
    }
    Object.defineProperty(FileTypeTable.prototype, "IsMain", {
        get: function () {
            return this._isMain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileTypeTable.prototype, "Postfix", {
        get: function () {
            return this._postfix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileTypeTable.prototype, "ShortName", {
        get: function () {
            return this._shortName;
        },
        enumerable: true,
        configurable: true
    });
    return FileTypeTable;
}(SprTable));
var KosguSprTable = (function (_super) {
    __extends(KosguSprTable, _super);
    function KosguSprTable() {
        var _this = _super.call(this, "KOSGU") || this;
        _this._owner = null;
        return _this;
    }
    Object.defineProperty(KosguSprTable.prototype, "Owner", {
        get: function () {
            if (this._owner == null) {
                this._owner = new NumberObasTableField("Owner", this);
            }
            return this._owner;
        },
        enumerable: true,
        configurable: true
    });
    KosguSprTable.prototype.IsChild = function () {
        return this.Lookup(this.Owner.Id, this.RecordKey.Value, this.RecordKey.Id) == null;
    };
    KosguSprTable.prototype.Filter = function (obasKey, costTypeCode) {
        var kosguCode = this.Code.Value;
        var linkstable = ObasTableCollection.CostTypeKosguLinksTable;
        var keys = [obasKey, costTypeCode];
        linkstable.Locate([linkstable.ObasKey.Id, linkstable.CostTypeCode.Id], keys);
        var codes = linkstable.GetKosguCodes();
        return kosguCode !== "0" && codes && codes.indexOf(kosguCode) > -1;
    };
    
    KosguSprTable.prototype.GetRecordKeyByCode = function (fcode, addIfNotExists) {
        if (addIfNotExists === void 0) { addIfNotExists = false; }
        if (this.Code.Locate(fcode)) {
            return this.RecordKey.Value;
        }
        else if (addIfNotExists) {
            this.AddRow();
            this.Code.Value = fcode;
            this.PostRow();
            return this.RecordKey.Value;
        }
        return null;
    };
    
    return KosguSprTable;
}(SprTable));


var AddAnalysisIndicatorSprTable = (function (_super) {
    __extends(AddAnalysisIndicatorSprTable, _super);
    function AddAnalysisIndicatorSprTable() {
        var _this = _super.call(this, "AddAnalysisIndicator") || this;
        _this._kosgu = null;
        _this._fullCode = null;
        _this._kosgu_ID = null;
        return _this;
    }
    Object.defineProperty(AddAnalysisIndicatorSprTable.prototype, "FullCode", {
        get: function () {
            if (this._fullCode == null) {
                this._fullCode = new ObasTableField("FullCode", this);
            }
            return this._fullCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAnalysisIndicatorSprTable.prototype, "Kosgu", {
        get: function () {
            if (this._kosgu == null) {
                this._kosgu = new ObasSprTableFieldTyped(ObasTableCollection.KosguSprTable, this);
            }
            return this._kosgu;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(AddAnalysisIndicatorSprTable.prototype, "kosgu_ID", {
        get: function () {
            if (this._kosgu_ID == null) {
                this._kosgu_ID = new NumberObasTableField("KOSGU_ID", this, true);
            }
            return this._kosgu_ID;
        },
        enumerable: true,
        configurable: true
    });

    AddAnalysisIndicatorSprTable.prototype.CalcFullCode = function () {
        return this.Kosgu.Code + this.Code.Value;
    };
    AddAnalysisIndicatorSprTable.prototype.CodeChangeEventHandler = function (tableId, oldValue, newValue, fieldId) {
        this.FullCode.Value = this.CalcFullCode();
    };
    AddAnalysisIndicatorSprTable.prototype.IsKosguChild = function (kosguKey) {
        return this.Kosgu.ForeignKey.Value === kosguKey;
    };
    
    AddAnalysisIndicatorSprTable.prototype.ImportData = function (ExcelData) {
        var CountIns = 0;
        var reader = ExcelData.CreateReader();
        reader.Read();
        reader.Read();
        reader.Read();
        while (reader.Read()) {
            var _kosguCode = ExcelData.GetFieldValue("col3");
            var _ffullcode = ExcelData.GetFieldValue("col4");
            var _fcode = _ffullcode.substr(_kosguCode.length, _ffullcode.length - _kosguCode.length);
            var _fname = ExcelData.GetFieldValue("col5");
            if (this.FullCode.Locate(_ffullcode)) {
            }
            else {
//               Client.ShowMessage("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F", _kosguCode+ "   "+ "   "+ _ffullcode+ "   "+ _fcode+ "   "+ _fname, MessageIcons.Information);
                var _fkosgu_ID = ObasTableCollection.KosguSprTable.GetRecordKeyByCode(_kosguCode, true);
                this.AddRow();
                this.Code.Value = _fcode;
                this.Name.Value = _fname;
                this.kosgu_ID.Value = _fkosgu_ID;
                this.FullCode.Value = this.CalcFullCode();
                this.PostRow();
                CountIns = CountIns + 1;
            }
        }
        return CountIns;
    };
    
    return AddAnalysisIndicatorSprTable;
}(SprTable));

var AddAnalysisFeatureSprtable = (function (_super) {
    __extends(AddAnalysisFeatureSprtable, _super);
    function AddAnalysisFeatureSprtable() {
        return _super.call(this, "AddAnalysisFeature") || this;
    }
    return AddAnalysisFeatureSprtable;
}(SprTable));
var PostCategoryTypes;
(function (PostCategoryTypes) {
    PostCategoryTypes[PostCategoryTypes["Leader"] = 1] = "Leader";
    PostCategoryTypes[PostCategoryTypes["Employee"] = 2] = "Employee";
    PostCategoryTypes[PostCategoryTypes["Working"] = 6] = "Working";
    PostCategoryTypes[PostCategoryTypes["Specialist"] = 3] = "Specialist";
})(PostCategoryTypes || (PostCategoryTypes = {}));
var PostCategorySprTable = (function (_super) {
    __extends(PostCategorySprTable, _super);
    function PostCategorySprTable() {
        return _super.call(this, "PostCategory") || this;
    }
    return PostCategorySprTable;
}(SprTable));
var AuthorityTypeSprTable = (function (_super) {
    __extends(AuthorityTypeSprTable, _super);
    function AuthorityTypeSprTable() {
        return _super.call(this, "AuthorityType") || this;
    }
    return AuthorityTypeSprTable;
}(SprTable));
var PositionsSprTable = (function (_super) {
    __extends(PositionsSprTable, _super);
    function PositionsSprTable() {
        return _super.call(this, "Positions") || this;
    }
    return PositionsSprTable;
}(SprTable));
var FoivTable = (function (_super) {
    __extends(FoivTable, _super);
    function FoivTable() {
        return _super.call(this, "FOIV") || this;
    }
    return FoivTable;
}(SprTable));
var FcrTable = (function (_super) {
    __extends(FcrTable, _super);
    function FcrTable() {
        return _super.call(this, "FCR") || this;
    }
    FcrTable.prototype.CalcFcrSectionCode = function () {
        var code = this.Code.Value;
        return code ? code.substr(0, 2) : "";
    };
    return FcrTable;
}(SprTable));
var CsrTable = (function (_super) {
    __extends(CsrTable, _super);
    function CsrTable() {
        return _super.call(this, "CSR") || this;
    }
    return CsrTable;
}(SprTable));
var GovermentProgramTable = (function (_super) {
    __extends(GovermentProgramTable, _super);
    function GovermentProgramTable() {
        return _super.call(this, "Program") || this;
    }
    return GovermentProgramTable;
}(SprTable));
var SubProgramTable = (function (_super) {
    __extends(SubProgramTable, _super);
    function SubProgramTable() {
        var _this = _super.call(this, "SubProgram") || this;
        _this._shortCode = new ObasTableField("ShortCode", _this);
        return _this;
    }
    Object.defineProperty(SubProgramTable.prototype, "ShortCode", {
        get: function () {
            return this._shortCode;
        },
        enumerable: true,
        configurable: true
    });
    return SubProgramTable;
}(SprTable));
var DirectionCostTable = (function (_super) {
    __extends(DirectionCostTable, _super);
    function DirectionCostTable() {
        return _super.call(this, "DirectionCost") || this;
    }
    return DirectionCostTable;
}(SprTable));
var CostTypeTable = (function (_super) {
    __extends(CostTypeTable, _super);
    function CostTypeTable() {
        return _super.call(this, "VR") || this;
    }
    return CostTypeTable;
}(SprTable));
var MainActionTable = (function (_super) {
    __extends(MainActionTable, _super);
    function MainActionTable() {
        var _this = _super.call(this, "MainAction") || this;
        _this._shortCode = new ObasTableField("ShortCode", _this);
        return _this;
    }
    Object.defineProperty(MainActionTable.prototype, "ShortCode", {
        get: function () {
            return this._shortCode;
        },
        enumerable: true,
        configurable: true
    });
    return MainActionTable;
}(SprTable));
var ChangeTypeTable = (function (_super) {
    __extends(ChangeTypeTable, _super);
    function ChangeTypeTable() {
        return _super.call(this, "ChangeType") || this;
    }
    return ChangeTypeTable;
}(SprTable));
var NpaTypeTable = (function (_super) {
    __extends(NpaTypeTable, _super);
    function NpaTypeTable() {
        return _super.call(this, "NPAType") || this;
    }
    return NpaTypeTable;
}(SprTable));
var SecurityTypesTable = (function (_super) {
    __extends(SecurityTypesTable, _super);
    function SecurityTypesTable() {
        var _this = _super.call(this, "SecurityTypes", null, "ShortName") || this;
        _this._priority = new ObasTableField("Priority", _this);
        return _this;
    }
    Object.defineProperty(SecurityTypesTable.prototype, "Priority", {
        get: function () {
            return this._priority;
        },
        enumerable: true,
        configurable: true
    });
    return SecurityTypesTable;
}(SprTable));
var OrganizationTable = (function (_super) {
    __extends(OrganizationTable, _super);
    function OrganizationTable() {
        var _this = _super.call(this, "Organization") || this;
        _this._grbs = new ObasTableField("GRBS", _this);
        return _this;
    }
    Object.defineProperty(OrganizationTable.prototype, "Grbs", {
        get: function () {
            return this._grbs;
        },
        enumerable: true,
        configurable: true
    });
    OrganizationTable.prototype.OrganizationFilter = function () {
        return ObasTableCollection.SelectedFoivTable.Foiv.ForeignKey.Value === this.Grbs.Value;
    };
    OrganizationTable.prototype.GetGrbsOrg = function (grbsKey) {
        if (grbsKey === void 0) { grbsKey = ObasTableCollection.SelectedFoivTable.Foiv.ForeignKey.Value; }
        var foivSpr = ObasTableCollection.FoivTable;
        if (foivSpr.LocateByKeys(grbsKey)) {
            var foivName = foivSpr.Name.Value;
            if (this.Name.Locate(foivName)) {
                return this.RecordKey.Value;
            }
        }
        return null;
    };
    return OrganizationTable;
}(SprTable));
var StatusSprTable = (function (_super) {
    __extends(StatusSprTable, _super);
    function StatusSprTable() {
        return _super.call(this, "Spr_Status", null, BaseObasTableFields.RecordKeyField.Id) || this;
    }
    Object.defineProperty(StatusSprTable.prototype, "Status", {
        get: function () {
            return this.RecordKey.Value;
        },
        enumerable: true,
        configurable: true
    });
    StatusSprTable.prototype.FirstStatusInitEventHandler = function (tableId) {
        return VersionStatus.Empty;
    };
    return StatusSprTable;
}(SprTable));
var PedStateTable = (function (_super) {
    __extends(PedStateTable, _super);
    function PedStateTable() {
        return _super.call(this, "Spr_States", null, BaseObasTableFields.RecordKeyField.Id) || this;
    }
    Object.defineProperty(PedStateTable.prototype, "State", {
        get: function () {
            return this.RecordKey.Value;
        },
        enumerable: true,
        configurable: true
    });
    PedStateTable.prototype.FirstStateInitEventHandler = function (tableId) {
        return PedState.AgreementNotRequired;
    };
    return PedStateTable;
}(SprTable));
var PedTypeSprTable = (function (_super) {
    __extends(PedTypeSprTable, _super);
    function PedTypeSprTable() {
        var _this = _super.call(this, "Spr_PED_Type", null, "AttachNum") || this;
        _this._attachNumber = new ObasTableField("AttachNum", _this);
        return _this;
    }
    Object.defineProperty(PedTypeSprTable.prototype, "AttachNumber", {
        get: function () {
            return this._attachNumber;
        },
        enumerable: true,
        configurable: true
    });
    return PedTypeSprTable;
}(SprTable));
var KuDataTypeSprTable = (function (_super) {
    __extends(KuDataTypeSprTable, _super);
    function KuDataTypeSprTable() {
        return _super.call(this, "KU_DataTypes", null, "ShortName") || this;
    }
    Object.defineProperty(KuDataTypeSprTable.prototype, "DataType", {
        get: function () {
            return this.RecordKey.Value;
        },
        enumerable: true,
        configurable: true
    });
    return KuDataTypeSprTable;
}(SprTable));
var DepartmentSprTable = (function (_super) {
    __extends(DepartmentSprTable, _super);
    function DepartmentSprTable() {
        var _this = _super.call(this, "MFDepartment") || this;
        _this._shortName = new ObasTableField("ShortName", _this);
        return _this;
    }
    Object.defineProperty(DepartmentSprTable.prototype, "ShortName", {
        get: function () {
            return this._shortName;
        },
        enumerable: true,
        configurable: true
    });
    return DepartmentSprTable;
}(SprTable));
var NationalProjectsSprTable = (function (_super) {
    __extends(NationalProjectsSprTable, _super);
    function NationalProjectsSprTable() {
        return _super.call(this, "NationalProjects") || this;
    }
    return NationalProjectsSprTable;
}(SprTable));
var SubjPlanBudgGovProgLinksTable = (function (_super) {
    __extends(SubjPlanBudgGovProgLinksTable, _super);
    function SubjPlanBudgGovProgLinksTable() {
        var _this = _super.call(this, "FK_SBP_GRBS_LINKS", ["GPCode"], true) || this;
        _this._spbCode = new ObasTableField("SBPCode", _this);
        _this._gpCode = new ObasTableField("GPCode", _this);
        return _this;
    }
    Object.defineProperty(SubjPlanBudgGovProgLinksTable.prototype, "SubjPlanBudgCode", {
        get: function () {
            return this._spbCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubjPlanBudgGovProgLinksTable.prototype, "GovProgCode", {
        get: function () {
            return this._gpCode;
        },
        enumerable: true,
        configurable: true
    });
    return SubjPlanBudgGovProgLinksTable;
}(ObasTable));
var SubjPlanBudgFoivLinksTable = (function (_super) {
    __extends(SubjPlanBudgFoivLinksTable, _super);
    function SubjPlanBudgFoivLinksTable() {
        var _this = _super.call(this, "SPB_GRBS_LINKS") || this;
        _this._shortName = new ObasTableField("ShortName", _this);
        _this._foivCode = new ObasTableField("GRBSCodes", _this);
        _this._departmentCode = new ObasTableField("DepCode", _this);
        return _this;
    }
    Object.defineProperty(SubjPlanBudgFoivLinksTable.prototype, "ShortName", {
        get: function () {
            return this._shortName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubjPlanBudgFoivLinksTable.prototype, "FoivCode", {
        get: function () {
            return this._foivCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubjPlanBudgFoivLinksTable.prototype, "DepartmentCode", {
        get: function () {
            return this._departmentCode;
        },
        enumerable: true,
        configurable: true
    });
    return SubjPlanBudgFoivLinksTable;
}(SprTable));
var ObasKbkLinksTable = (function (_super) {
    __extends(ObasKbkLinksTable, _super);
    function ObasKbkLinksTable() {
        var _this = _super.call(this, "OBAS_KBK_LINKS", [BaseObasTableFields.RecordKeyField.Id], true) || this;
        _this._obasKey = null;
        _this._costTypeCode = new ObasTableField("VR_Code", _this);
        _this._csrCode = new ObasTableField("CSR_Code", _this);
        _this._foivCode = new ObasTableField("FOIV_Code", _this);
        _this._exeptFoivCode = new ObasTableField("Except_FOIV_Code", _this);
        _this._exeptCsrCode = new ObasTableField("Except_CSR_Code", _this);
        return _this;
    }
    Object.defineProperty(ObasKbkLinksTable.prototype, "CsrCodes", {
        get: function () {
            return this.GetArrayFromValue(this._csrCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasKbkLinksTable.prototype, "CostTypeCodes", {
        get: function () {
            return this.GetArrayFromValue(this._costTypeCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasKbkLinksTable.prototype, "FoivCodes", {
        get: function () {
            return this.GetArrayFromValue(this._foivCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasKbkLinksTable.prototype, "ExeptCsrCodes", {
        get: function () {
            return this.GetArrayFromValue(this._exeptCsrCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasKbkLinksTable.prototype, "ExeptFoivCodes", {
        get: function () {
            return this.GetArrayFromValue(this._exeptFoivCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasKbkLinksTable.prototype, "Obas", {
        get: function () {
            if (this._obasKey == null) {
                this._obasKey = new ObasSprTableField(ObasTableCollection.ObasSprTable, this);
            }
            return this._obasKey;
        },
        enumerable: true,
        configurable: true
    });
    ObasKbkLinksTable.prototype.GetArrayFromValue = function (field) {
        var result = null;
        var fieldValue = field.Value;
        if (fieldValue != null) {
            result = fieldValue.split(",");
        }
        return result;
    };
    return ObasKbkLinksTable;
}(ObasTable));
var RateDollarActualTable = (function (_super) {
    __extends(RateDollarActualTable, _super);
    function RateDollarActualTable() {
        var _this = _super.call(this, "RateDollarActual") || this;
        _this._actualDate = null;
        return _this;
    }
    Object.defineProperty(RateDollarActualTable.prototype, "ActualDate", {
        get: function () {
            if (this._actualDate == null) {
                this._actualDate = new ObasTableField("ActualDate", this, true);
            }
            return this._actualDate;
        },
        enumerable: true,
        configurable: true
    });
    return RateDollarActualTable;
}(ObasTable));
var CostTypeSpendObligationLinksTable = (function (_super) {
    __extends(CostTypeSpendObligationLinksTable, _super);
    function CostTypeSpendObligationLinksTable() {
        var _this = _super.call(this, "VR_SO_LINKS", [BaseObasTableFields.RecordKeyField.Id], true) || this;
        _this._costTypeCode = new ObasTableField("VR_Code", _this);
        _this._spenObligCode = new ObasTableField("SO_Code", _this);
        _this._spenObligName = new ObasTableField("SO_Name", _this);
        return _this;
    }
    Object.defineProperty(CostTypeSpendObligationLinksTable.prototype, "CostTypeCode", {
        get: function () {
            return this._costTypeCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CostTypeSpendObligationLinksTable.prototype, "SpendObligationCode", {
        get: function () {
            return this._spenObligCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CostTypeSpendObligationLinksTable.prototype, "SpendObligationName", {
        get: function () {
            return this._spenObligName;
        },
        enumerable: true,
        configurable: true
    });
    return CostTypeSpendObligationLinksTable;
}(ObasTable));
var BarsRowsSprTable = (function (_super) {
    __extends(BarsRowsSprTable, _super);
    function BarsRowsSprTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._barsCode = null;
        return _this;
    }
    Object.defineProperty(BarsRowsSprTable.prototype, "BarsCode", {
        get: function () {
            if (this._barsCode == null) {
                this._barsCode = new ObasTableField(BaseObasTableFields.BarsCodeField.Id, this);
            }
            return this._barsCode;
        },
        enumerable: true,
        configurable: true
    });
    return BarsRowsSprTable;
}(SprTable));
var InsuranceRowsSprTable = (function (_super) {
    __extends(InsuranceRowsSprTable, _super);
    function InsuranceRowsSprTable() {
        var _this = _super.call(this, "InsuranceRows", [BaseObasTableFields.RecordKeyField.Id], "StrCode", "StrName") || this;
        _this._rate = null;
        _this._isCalc = null;
        _this._barsCodeF01280P4 = null;
        _this._barsCodeF01280P5 = null;
        _this._barsCodeF01110P3 = null;
        _this._barsCodeF01222 = null;
        return _this;
    }
    Object.defineProperty(InsuranceRowsSprTable.prototype, "BarsCodeF01222", {
        get: function () {
            if (this._barsCodeF01222 == null) {
                this._barsCodeF01222 = new ObasTableField("BarsCodeF01222", this);
            }
            return this._barsCodeF01222;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceRowsSprTable.prototype, "BarsCodeF01110P3", {
        get: function () {
            if (this._barsCodeF01110P3 == null) {
                this._barsCodeF01110P3 = new ObasTableField("BarsCodeF01110P3", this);
            }
            return this._barsCodeF01110P3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceRowsSprTable.prototype, "BarsCodeF01280P5", {
        get: function () {
            if (this._barsCodeF01280P5 == null) {
                this._barsCodeF01280P5 = new ObasTableField("BarsCodeF01280P5", this);
            }
            return this._barsCodeF01280P5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceRowsSprTable.prototype, "BarsCodeF01280P4", {
        get: function () {
            if (this._barsCodeF01280P4 == null) {
                this._barsCodeF01280P4 = new ObasTableField("BarsCodeF01280P4", this);
            }
            return this._barsCodeF01280P4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceRowsSprTable.prototype, "Rate", {
        get: function () {
            if (this._rate == null) {
                this._rate = new NumberObasTableField("Rate", this);
            }
            return this._rate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceRowsSprTable.prototype, "IsCalculated", {
        get: function () {
            if (this._isCalc == null) {
                this._isCalc = new ObasTableField("IsCalc", this);
            }
            return this._isCalc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InsuranceRowsSprTable.prototype, "RateCoef", {
        get: function () {
            return this._rate.Value / 100;
        },
        enumerable: true,
        configurable: true
    });
    return InsuranceRowsSprTable;
}(BarsRowsSprTable));
var OksmSprTable = (function (_super) {
    __extends(OksmSprTable, _super);
    function OksmSprTable() {
        var _this = _super.call(this, "OKSM") || this;
        _this._groupLetter = null;
        return _this;
    }
    Object.defineProperty(OksmSprTable.prototype, "GroupLetter", {
        get: function () {
            if (this._groupLetter == null) {
                this._groupLetter = new ObasTableField("GroupLetter", this);
            }
            return this._groupLetter;
        },
        enumerable: true,
        configurable: true
    });
    return OksmSprTable;
}(SprTable));
var ConsularPositionsSprTable = (function (_super) {
    __extends(ConsularPositionsSprTable, _super);
    function ConsularPositionsSprTable() {
        var _this = _super.call(this, "ConsularPositions") || this;
        _this._regNum = null;
        _this._category = null;
        _this._group = null;
        return _this;
    }
    Object.defineProperty(ConsularPositionsSprTable.prototype, "Group", {
        get: function () {
            if (this._group == null) {
                this._group = new ObasTableField("Group", this);
            }
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConsularPositionsSprTable.prototype, "Category", {
        get: function () {
            if (this._category == null) {
                this._category = new ObasTableField("Category", this);
            }
            return this._category;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConsularPositionsSprTable.prototype, "RegNum", {
        get: function () {
            if (this._regNum == null) {
                this._regNum = new ObasTableField("RegNum", this);
            }
            return this._regNum;
        },
        enumerable: true,
        configurable: true
    });
    return ConsularPositionsSprTable;
}(SprTableWithPeriod));
var FcpSprTable = (function (_super) {
    __extends(FcpSprTable, _super);
    function FcpSprTable() {
        var _this = _super.call(this, "FCP") || this;
        _this._ownerKey = null;
        return _this;
    }
    Object.defineProperty(FcpSprTable.prototype, "HasOwner", {
        get: function () {
            return this.OwnerKey.Value > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FcpSprTable.prototype, "OwnerKey", {
        get: function () {
            if (this._ownerKey == null) {
                this._ownerKey = new ObasTableField("Owner", this);
            }
            return this._ownerKey;
        },
        enumerable: true,
        configurable: true
    });
    return FcpSprTable;
}(SprTable));
var CostTypeKosguLinksTable = (function (_super) {
    __extends(CostTypeKosguLinksTable, _super);
    function CostTypeKosguLinksTable() {
        var _this = _super.call(this, "VR_COSGUs", ["OBAS_SPR_ID", "VR_Code"]) || this;
        _this._costTypeCode = null;
        _this._obasKey = null;
        _this._kosguCodesField = null;
        return _this;
    }
    Object.defineProperty(CostTypeKosguLinksTable.prototype, "KosguCodesField", {
        get: function () {
            if (this._kosguCodesField == null) {
                this._kosguCodesField = new ObasTableField("COSGU_Codes", this);
            }
            return this._kosguCodesField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CostTypeKosguLinksTable.prototype, "ObasKey", {
        get: function () {
            if (this._obasKey == null) {
                this._obasKey = new ObasForeignKeyTableField(ObasTableCollection.ObasSprTable, this);
            }
            return this._obasKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CostTypeKosguLinksTable.prototype, "CostTypeCode", {
        get: function () {
            if (this._costTypeCode == null) {
                this._costTypeCode = new ObasTableField("VR_Code", this);
            }
            return this._costTypeCode;
        },
        enumerable: true,
        configurable: true
    });
    CostTypeKosguLinksTable.prototype.GetKosguCodes = function () {
        return this.KosguCodesField.Value.split(",");
    };
    return CostTypeKosguLinksTable;
}(ObasTable));

var OkpdSprTable = (function (_super) {
    __extends(OkpdSprTable, _super);
    function OkpdSprTable() {
        return _super.call(this, "OKPD") || this;
    }
    OkpdSprTable.prototype.IsCorrectRecord = function (dateParam) {
        var code = this.Code.Value || "";
        return code.length === 5 && this.IsActualRecord(dateParam);
    };
    OkpdSprTable.prototype.IsCorrectDetailedRecord = function (dateParam) {
        var code = this.Code.Value || "";
        return code.length >= 5 && this.IsActualRecord(dateParam);
    };
    OkpdSprTable.prototype.ImportData = function (ExcelData) {
        var CountIns = 0;
        var isEmpty = (this.RowCount === 0);
        var reader = ExcelData.CreateReader();
        reader.Read();
        while (reader.Read()) {
            var _fcode = ExcelData.GetFieldValue("col2");
            var _fname = ExcelData.GetFieldValue("col3");
            var isExistRecord = false;
            if (!isEmpty) {
                isExistRecord = this.Code.Locate(_fcode);
            }
            if (isEmpty || !isExistRecord) {
                this.AddRow();
                this.Code.Value = _fcode;
                this.Name.Value = _fname;
                this.DateStart.Value = ObasHelper.ConvertStringToDate("02.07.2015");
                this.DateEnd.Value = ObasHelper.ConvertStringToDate("01.01.2099");
                this.PostRow();
                CountIns = CountIns + 1;
            }
        }
        return CountIns;
    };
    return OkpdSprTable;
}(SprTableWithPeriod));

var OtherPaymentsSprTable = (function (_super) {
    __extends(OtherPaymentsSprTable, _super);
    function OtherPaymentsSprTable() {
        return _super.call(this, "OtherPayments") || this;
    }
    return OtherPaymentsSprTable;
}(SprTable));
var PaymentTypeSprTable = (function (_super) {
    __extends(PaymentTypeSprTable, _super);
    function PaymentTypeSprTable() {
        return _super.call(this, "PaymentType") || this;
    }
    PaymentTypeSprTable.prototype.GetFilterPayment = function (tableId, sourceTableId) {
        var curKey = this.GetFieldValue(BaseObasTableFields.RecordKeyField.Id);
        return this.Lookup("Owner", curKey, BaseObasTableFields.RecordKeyField.Id) === null;
    };
    return PaymentTypeSprTable;
}(SprTable));
var InvestigationTypesSprTable = (function (_super) {
    __extends(InvestigationTypesSprTable, _super);
    function InvestigationTypesSprTable() {
        return _super.call(this, "InvestigationTypes") || this;
    }
    return InvestigationTypesSprTable;
}(SprTable));
var OkvedSprTable = (function (_super) {
    __extends(OkvedSprTable, _super);
    function OkvedSprTable() {
        return _super.call(this, "OKVED") || this;
    }
    return OkvedSprTable;
}(SprTable));
var OkeiSprTable = (function (_super) {
    __extends(OkeiSprTable, _super);
    function OkeiSprTable() {
        return _super.call(this, "OKEI") || this;
    }
    return OkeiSprTable;
}(SprTable));
var ZagranPositionsSprTable = (function (_super) {
    __extends(ZagranPositionsSprTable, _super);
    function ZagranPositionsSprTable() {
        return _super.call(this, "ZagranPositions") || this;
    }
    return ZagranPositionsSprTable;
}(SprTable));
var NsotSprTable = (function (_super) {
    __extends(NsotSprTable, _super);
    function NsotSprTable() {
        return _super.call(this, "NSOT") || this;
    }
    return NsotSprTable;
}(SprTable));
var PaymentReestrSprTable = (function (_super) {
    __extends(PaymentReestrSprTable, _super);
    function PaymentReestrSprTable() {
        return _super.call(this, "PaymentReestr") || this;
    }
    return PaymentReestrSprTable;
}(SprTable));
var FederalEmployeePositionsSprTable = (function (_super) {
    __extends(FederalEmployeePositionsSprTable, _super);
    function FederalEmployeePositionsSprTable() {
        return _super.call(this, "FederalEmployeePositions") || this;
    }
    return FederalEmployeePositionsSprTable;
}(SprTable));
var SubgroupNormativeExpensesSprTable = (function (_super) {
    __extends(SubgroupNormativeExpensesSprTable, _super);
    function SubgroupNormativeExpensesSprTable() {
        return _super.call(this, "SubgroupNormativeExpenses") || this;
    }
    return SubgroupNormativeExpensesSprTable;
}(SprTable));
var PnoSprTable = (function (_super) {
    __extends(PnoSprTable, _super);
    function PnoSprTable() {
        var _this = _super.call(this, "PNO") || this;
        _this._owner = null;
        _this._recipientCategory = null;
        return _this;
    }
    Object.defineProperty(PnoSprTable.prototype, "RecipientCategory", {
        get: function () {
            if (this._recipientCategory == null) {
                this._recipientCategory = new NumberObasTableField("RecipientCategory", this);
            }
            return this._recipientCategory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PnoSprTable.prototype, "Owner", {
        get: function () {
            if (this._owner == null) {
                this._owner = new NumberObasTableField("Owner", this);
            }
            return this._owner;
        },
        enumerable: true,
        configurable: true
    });
    PnoSprTable.prototype.HasOwner = function () {
        return this.Owner.NValue !== 0;
    };
    PnoSprTable.prototype.NotHasOwner = function () {
        return !this.HasOwner();
    };
    return PnoSprTable;
}(SprTable));
var RecipientCategorySprTable = (function (_super) {
    __extends(RecipientCategorySprTable, _super);
    function RecipientCategorySprTable() {
        return _super.call(this, "RecipientCategory") || this;
    }
    return RecipientCategorySprTable;
}(SprTable));
var NpaRegSpheresSprTable = (function (_super) {
    __extends(NpaRegSpheresSprTable, _super);
    function NpaRegSpheresSprTable() {
        return _super.call(this, "NPARegSpheres") || this;
    }
    return NpaRegSpheresSprTable;
}(SprTable));
var NpaStatusesSprTable = (function (_super) {
    __extends(NpaStatusesSprTable, _super);
    function NpaStatusesSprTable() {
        return _super.call(this, "NPAStatuses") || this;
    }
    return NpaStatusesSprTable;
}(SprTable));
var ReserveDirectionsSprTable = (function (_super) {
    __extends(ReserveDirectionsSprTable, _super);
    function ReserveDirectionsSprTable() {
        return _super.call(this, "ReserveDirections") || this;
    }
    return ReserveDirectionsSprTable;
}(SprTable));
var OrgTaxPrivilegeSprTable = (function (_super) {
    __extends(OrgTaxPrivilegeSprTable, _super);
    function OrgTaxPrivilegeSprTable() {
        return _super.call(this, "OrgTaxPrivilege") || this;
    }
    return OrgTaxPrivilegeSprTable;
}(SprTable));
var LandCategorySprTable = (function (_super) {
    __extends(LandCategorySprTable, _super);
    function LandCategorySprTable() {
        return _super.call(this, "LandCategory") || this;
    }
    return LandCategorySprTable;
}(SprTable));
var LandTaxPrivilegeSprTable = (function (_super) {
    __extends(LandTaxPrivilegeSprTable, _super);
    function LandTaxPrivilegeSprTable() {
        return _super.call(this, "LandTaxPrivilege") || this;
    }
    return LandTaxPrivilegeSprTable;
}(SprTable));
var PublicCommitmentsSprTable = (function (_super) {
    __extends(PublicCommitmentsSprTable, _super);
    function PublicCommitmentsSprTable() {
        var _this = _super.call(this, "PublicCommitments") || this;
        _this._owner = null;
        return _this;
    }
    Object.defineProperty(PublicCommitmentsSprTable.prototype, "Owner", {
        get: function () {
            if (this._owner == null) {
                this._owner = new NumberObasTableField("Owner", this);
            }
            return this._owner;
        },
        enumerable: true,
        configurable: true
    });
    PublicCommitmentsSprTable.prototype.HasOwner = function () {
        return this.Owner.NValue !== 0;
    };
    PublicCommitmentsSprTable.prototype.NotHasOwner = function () {
        return !this.HasOwner();
    };
    return PublicCommitmentsSprTable;
}(SprTable));
var ServiceWorkSprTable = (function (_super) {
    __extends(ServiceWorkSprTable, _super);
    function ServiceWorkSprTable() {
        var _this = _super.call(this, "ServWork") || this;
        _this._activityTypeField = null;
        _this._uniqRegNumber = null;
        return _this;
    }
    Object.defineProperty(ServiceWorkSprTable.prototype, "UniqRegNumber", {
        get: function () {
            if (this._uniqRegNumber == null) {
                this._uniqRegNumber = new ObasTableField("Number", this);
            }
            return this._uniqRegNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceWorkSprTable.prototype, "ActivityTypeField", {
        get: function () {
            if (this._activityTypeField == null) {
                this._activityTypeField = new ObasTableField("ActivityType", this);
            }
            return this._activityTypeField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceWorkSprTable.prototype, "ActivityType", {
        get: function () {
            var result = this.ActivityTypeField.Value;
            if (result) {
                result = result.toLowerCase();
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    ServiceWorkSprTable.prototype.IsService = function () {
        return this.ActivityType === ServiceWorkSprTable.ServiceType;
    };
    ServiceWorkSprTable.prototype.IsWork = function () {
        return this.ActivityType === ServiceWorkSprTable.WorkType;
    };
    return ServiceWorkSprTable;
}(SprTable));
ServiceWorkSprTable.ServiceType = "услуга";
ServiceWorkSprTable.WorkType = "работа";
var ServiceWorkIndicatorsSprTable = (function (_super) {
    __extends(ServiceWorkIndicatorsSprTable, _super);
    function ServiceWorkIndicatorsSprTable() {
        var _this = _super.call(this, "WorkIndex") || this;
        _this._ownerKey = null;
        _this._unit = null;
        return _this;
    }
    Object.defineProperty(ServiceWorkIndicatorsSprTable.prototype, "Unit", {
        get: function () {
            if (this._unit == null) {
                this._unit = new ObasTableField("Unit", this);
            }
            return this._unit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceWorkIndicatorsSprTable.prototype, "OwnerKey", {
        get: function () {
            if (this._ownerKey == null) {
                this._ownerKey = new NumberObasTableField("Owner", this);
            }
            return this._ownerKey;
        },
        enumerable: true,
        configurable: true
    });
    ServiceWorkIndicatorsSprTable.prototype.IsParent = function (key) {
        return this.OwnerKey.Value === key;
    };
    return ServiceWorkIndicatorsSprTable;
}(SprTable));
var TargetSubsidieSprTable = (function (_super) {
    __extends(TargetSubsidieSprTable, _super);
    function TargetSubsidieSprTable() {
        var _this = _super.call(this, "TargetSubsidie") || this;
        _this._num = null;
        return _this;
    }
    Object.defineProperty(TargetSubsidieSprTable.prototype, "Num", {
        get: function () {
            if (this._num == null) {
                this._num = new NumberObasTableField("Num", this);
            }
            return this._num;
        },
        enumerable: true,
        configurable: true
    });
    return TargetSubsidieSprTable;
}(SprTable));
var AgriculturalMachinerySprTable = (function (_super) {
    __extends(AgriculturalMachinerySprTable, _super);
    function AgriculturalMachinerySprTable() {
        var _this = _super.call(this, "AgriculturalMachinery") || this;
        _this._owner = null;
        return _this;
    }
    Object.defineProperty(AgriculturalMachinerySprTable.prototype, "Owner", {
        get: function () {
            if (this._owner == null) {
                this._owner = new NumberObasTableField("Owner", this);
            }
            return this._owner;
        },
        enumerable: true,
        configurable: true
    });
    return AgriculturalMachinerySprTable;
}(SprTable));
var OutlayStatusSprTable = (function (_super) {
    __extends(OutlayStatusSprTable, _super);
    function OutlayStatusSprTable() {
        return _super.call(this, "Outlay_Status", [BaseObasTableFields.RecordKeyField.Id], BaseObasTableFields.RecordKeyField.Id) || this;
    }
    Object.defineProperty(OutlayStatusSprTable.prototype, "Status", {
        get: function () {
            return this.RecordKey.Value || OutlayStatuses.Draft;
        },
        enumerable: true,
        configurable: true
    });
    return OutlayStatusSprTable;
}(SprTable));
var BudgetAuthoritySprTable = (function (_super) {
    __extends(BudgetAuthoritySprTable, _super);
    function BudgetAuthoritySprTable() {
        return _super.call(this, "BudgetAuthority", [BaseObasTableFields.RecordKeyField.Id], BaseObasTableFields.RecordKeyField.Id) || this;
    }
    Object.defineProperty(BudgetAuthoritySprTable.prototype, "Authority", {
        get: function () {
            return this.RecordKey.Value;
        },
        enumerable: true,
        configurable: true
    });
    return BudgetAuthoritySprTable;
}(SprTable));
var OkvSprTable = (function (_super) {
    __extends(OkvSprTable, _super);
    function OkvSprTable() {
        return _super.call(this, "OKV", [BaseObasTableFields.RecordKeyField.Id], "CodeDigital") || this;
    }
    Object.defineProperty(OkvSprTable.prototype, "RubleKey", {
        get: function () {
            return this.LookupKeyByCode(OkvSprTable._rubCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OkvSprTable.prototype, "UsdKey", {
        get: function () {
            return this.LookupKeyByCode(OkvSprTable._usdCode);
        },
        enumerable: true,
        configurable: true
    });
    return OkvSprTable;
}(SprTable));
OkvSprTable._rubCode = "643";
OkvSprTable._usdCode = "840";
var RroPartIndicateBudgetStrCode = (function (_super) {
    __extends(RroPartIndicateBudgetStrCode, _super);
    function RroPartIndicateBudgetStrCode() {
        return _super.call(this, "RRO_PartIndicateBudgetStrCode") || this;
    }
    return RroPartIndicateBudgetStrCode;
}(SprTable));
var RroSprSubject = (function (_super) {
    __extends(RroSprSubject, _super);
    function RroSprSubject() {
        return _super.call(this, "SubjectName") || this;
    }
    return RroSprSubject;
}(SprTable));
var RroSprScienceCity = (function (_super) {
    __extends(RroSprScienceCity, _super);
    function RroSprScienceCity() {
        return _super.call(this, "ScienceCityName") || this;
    }
    return RroSprScienceCity;
}(SprTable));
var RroSprSecurityAdmTerrEntity = (function (_super) {
    __extends(RroSprSecurityAdmTerrEntity, _super);
    function RroSprSecurityAdmTerrEntity() {
        return _super.call(this, "SecurityAdmTerrEntityName") || this;
    }
    return RroSprSecurityAdmTerrEntity;
}(SprTable));
var RroSprMunicipalEntity = (function (_super) {
    __extends(RroSprMunicipalEntity, _super);
    function RroSprMunicipalEntity() {
        return _super.call(this, "MunicipalEntityName") || this;
    }
    return RroSprMunicipalEntity;
}(SprTable));
var RroTypeAssistance = (function (_super) {
    __extends(RroTypeAssistance, _super);
    function RroTypeAssistance() {
        return _super.call(this, "TypeAssistance") || this;
    }
    return RroTypeAssistance;
}(SprTable));
var Faips = (function (_super) {
    __extends(Faips, _super);
    function Faips() {
        return _super.call(this, "FAIPs") || this;
    }
    return Faips;
}(SprTable));
var SubvensionsSprTable = (function (_super) {
    __extends(SubvensionsSprTable, _super);
    function SubvensionsSprTable() {
        return _super.call(this, "Subvensions") || this;
    }
    return SubvensionsSprTable;
}(SprTable));
var Coefficients05304SprTable = (function (_super) {
    __extends(Coefficients05304SprTable, _super);
    function Coefficients05304SprTable() {
        var _this = _super.call(this, "Coefficients_05_304") || this;
        _this._value = null;
        _this._year = null;
        _this._categoryType = null;
        _this._categoryName = null;
        return _this;
    }
    Object.defineProperty(Coefficients05304SprTable.prototype, "CategoryName", {
        get: function () {
            if (this._categoryName == null) {
                this._categoryName = new ObasTableField("CategoryName", this);
            }
            return this._categoryName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Coefficients05304SprTable.prototype, "CategoryType", {
        get: function () {
            if (this._categoryType == null) {
                this._categoryType = new NumberObasTableField("CategoryType", this);
            }
            return this._categoryType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Coefficients05304SprTable.prototype, "Year", {
        get: function () {
            if (this._year == null) {
                this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this);
            }
            return this._year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Coefficients05304SprTable.prototype, "Value", {
        get: function () {
            if (this._value == null) {
                this._value = new NumberObasTableField("Value", this);
            }
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return Coefficients05304SprTable;
}(SprTable));
var CorrectionFactorsTemplates;
(function (CorrectionFactorsTemplates) {
    CorrectionFactorsTemplates[CorrectionFactorsTemplates["Any"] = 1] = "Any";
})(CorrectionFactorsTemplates || (CorrectionFactorsTemplates = {}));
var CorrectionFactorsSections;
(function (CorrectionFactorsSections) {
    CorrectionFactorsSections[CorrectionFactorsSections["Any"] = 1] = "Any";
})(CorrectionFactorsSections || (CorrectionFactorsSections = {}));
var CorrectionFactorsSprTable = (function (_super) {
    __extends(CorrectionFactorsSprTable, _super);
    function CorrectionFactorsSprTable() {
        var _this = _super.call(this, "CorrectionFactors", ["Template_ID", "Section_ID", BaseObasTableFields.YearField.Id]) || this;
        _this._value = null;
        _this._year = null;
        _this._templateId = null;
        _this._sectionId = null;
        return _this;
    }
    Object.defineProperty(CorrectionFactorsSprTable.prototype, "TemplateId", {
        get: function () {
            if (this._templateId == null) {
                this._templateId = new NumberObasTableField("Template_ID", this, true);
            }
            return this._templateId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CorrectionFactorsSprTable.prototype, "SectionId", {
        get: function () {
            if (this._sectionId == null) {
                this._sectionId = new NumberObasTableField("Section_ID", this, true);
            }
            return this._sectionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CorrectionFactorsSprTable.prototype, "Year", {
        get: function () {
            if (this._year == null) {
                this._year = new NumberObasTableField(BaseObasTableFields.YearField.Id, this, true);
            }
            return this._year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CorrectionFactorsSprTable.prototype, "Value", {
        get: function () {
            if (this._value == null) {
                this._value = new NumberObasTableField("Value", this);
            }
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    CorrectionFactorsSprTable.prototype.GetValue = function (year, templateId, sectionId) {
        if (templateId === void 0) { templateId = CorrectionFactorsTemplates.Any; }
        if (sectionId === void 0) { sectionId = CorrectionFactorsSections.Any; }
        return this.Value.LookupByKeys([templateId, sectionId, year]) || 0;
    };
    return CorrectionFactorsSprTable;
}(SprTable));
