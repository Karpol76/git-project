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
var F03310;
(function (F03310) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1TotalTable = null;
            _this._pnoDataTable = null;
            _this._okpdTable = null;
            _this._objectDataTable = null;
            _this._purchaseObjectsSprTable = null;
            _this._recipientsDataTable = null;
            _this._p1Sheet = null;
            _this._p2Sheet = null;
            _this._p3Sp1Sheet = null;
            _this._addYearsHelper = null;
            _this._tableRules = new F03310.TableRules(_this);
            _this._interfaceRules = new F03310.InterfaceRules(_this);
            _this._updateRules = new F03310.UpdateRules(_this);
            _this._exportRules = new F03310.ExportRules(_this);
            _this._addDataYearsCount = 1;
            _this._mainDataYearsCount = ObasStageSettings.YearsCount;
            _this.Settings.YearsCount = _this._mainDataYearsCount + _this._addDataYearsCount;
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "AddYearsHelper", {
            get: function () {
                if (this._addYearsHelper == null) {
                    this._addYearsHelper = new AddYearsDocumentHelper(this);
                }
                return this._addYearsHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P3Sp1Sheet", {
            get: function () {
                if (this._p3Sp1Sheet == null) {
                    this._p3Sp1Sheet = new F03310.P3Sp1HierarchySheet(this);
                }
                return this._p3Sp1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new F03310.P2HierarchySheet(this);
                }
                return this._p2Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F03310.P1Sheet("SHT_F03_310_R1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PurchaseObjectsSprTable", {
            get: function () {
                if (this._purchaseObjectsSprTable == null) {
                    this._purchaseObjectsSprTable = new SprTable("PurchaseObjects");
                }
                return this._purchaseObjectsSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ObjectDataTable", {
            get: function () {
                if (this._objectDataTable == null) {
                    this._objectDataTable = new F03310.ObjectDataTable("F03_310_Object", this, this.OkpdTable, this.P1TotalTable);
                }
                return this._objectDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "OkpdTable", {
            get: function () {
                if (this._okpdTable == null) {
                    this._okpdTable = new F03310.OkpdTable("F03_310_Okpd", this.RecipientsDataTable);
                }
                return this._okpdTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RecipientsDataTable", {
            get: function () {
                if (this._recipientsDataTable == null) {
                    this._recipientsDataTable = new F03310.RecipientsDataTable("F03_310_RecipientCategory", this.PnoDataTable);
                }
                return this._recipientsDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PnoDataTable", {
            get: function () {
                if (this._pnoDataTable == null) {
                    this._pnoDataTable = new F03310.PnoDataTable("F03_310_PNO", this);
                }
                return this._pnoDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "AddDataYearsCount", {
            get: function () {
                return this._addDataYearsCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "MainDataYearsCount", {
            get: function () {
                return this._mainDataYearsCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "TableRules", {
            get: function () {
                return this._tableRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "InterfaceRules", {
            get: function () {
                return this._interfaceRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "UpdateRules", {
            get: function () {
                return this._updateRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "ExportRules", {
            get: function () {
                return this._exportRules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F03310.FObasTableP1Total("F03_310_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        return FDocument;
    }(BaseDocumentObject));
    F03310.FDocument = FDocument;
})(F03310 || (F03310 = {}));
