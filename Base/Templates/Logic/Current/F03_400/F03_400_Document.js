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
var F03400;
(function (F03400) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Sheet = null;
            _this._p2GroupSheet = null;
            _this._p1TotalTable = null;
            _this._recipientsSprTable = null;
            _this._grantsSprTable = null;
            _this._p2GrantsTable = null;
            _this._p2RecipientsTable = null;
            _this._tableRules = new F03400.TableRules(_this);
            _this._interfaceRules = new F03400.InterfaceRules(_this);
            _this._updateRules = new F03400.UpdateRules(_this);
            _this._exportRules = new F03400.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2RecipientsTable", {
            get: function () {
                if (this._p2RecipientsTable == null) {
                    this._p2RecipientsTable = new F03400.P2RecipientsTable("F03_400_R2_Recipient_V2", this.P2GrantsTable, this.P1TotalTable);
                }
                return this._p2RecipientsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2GrantsTable", {
            get: function () {
                if (this._p2GrantsTable == null) {
                    this._p2GrantsTable = new F03400.P2GrantsTable("F03_400_R2_Grant_V2", this);
                }
                return this._p2GrantsTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "GrantsSprTable", {
            get: function () {
                if (this._grantsSprTable == null) {
                    this._grantsSprTable = new SprTable("grant_spr");
                }
                return this._grantsSprTable;
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
                    this._p1TotalTable = new F03400.P1TotalTable("F03_400_R1_SumValues", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2GroupSheet", {
            get: function () {
                if (this._p2GroupSheet == null) {
                    this._p2GroupSheet = new F03400.P2GroupSheet(this);
                }
                return this._p2GroupSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F03400.P1Sheet("SHT_F03_400_R1", this);
                }
                return this._p1Sheet;
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
    F03400.FDocument = FDocument;
})(F03400 || (F03400 = {}));
