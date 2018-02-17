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
var F03211;
(function (F03211) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Sheet = null;
            _this._p2GroupSheet = null;
            _this._p1TotalTable = null;
            _this._recipientsSprTable = null;
            _this._recipientDataTable = null;
            _this._pnoDataTable = null;
            _this._tableRules = new F03211.TableRules(_this);
            _this._interfaceRules = new F03211.InterfaceRules(_this);
            _this._updateRules = new F03211.UpdateRules(_this);
            _this._exportRules = new F03211.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PnoDataTable", {
            get: function () {
                if (this._pnoDataTable == null) {
                    this._pnoDataTable = new F03211.PnoDataTable("F03_211_R2_PC_V2", this);
                }
                return this._pnoDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RecipientDataTable", {
            get: function () {
                if (this._recipientDataTable == null) {
                    this._recipientDataTable = new F03211.RecipientsDataTable("F03_211_R2_CR_V2", this.PnoDataTable, this.P1TotalTable);
                }
                return this._recipientDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RecipientsSprTable", {
            get: function () {
                if (this._recipientsSprTable == null) {
                    this._recipientsSprTable = new SprTable("recipient_spr");
                }
                return this._recipientsSprTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F03211.P1TotalTable("F03_211_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F03211.P1Sheet("SHT_F03_211_R1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2GroupSheet", {
            get: function () {
                if (this._p2GroupSheet == null) {
                    this._p2GroupSheet = new F03211.P2GroupSheet(this);
                }
                return this._p2GroupSheet;
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
        return FDocument;
    }(BaseDocumentObject));
    F03211.FDocument = FDocument;
})(F03211 || (F03211 = {}));
