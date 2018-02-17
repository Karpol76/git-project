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
var F03110;
(function (F03110) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p1Sheet = null;
            _this._p2Sheet = null;
            _this._p1TotalTable = null;
            _this._pnoDataTable = null;
            _this._recipientDataTable = null;
            _this._tableRules = new F03110.TableRules(_this);
            _this._interfaceRules = new F03110.InterfaceRules(_this);
            _this._updateRules = new F03110.UpdateRules(_this);
            _this._exportRules = new F03110.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RecipientDataTable", {
            get: function () {
                if (this._recipientDataTable == null) {
                    this._recipientDataTable = new F03110.RecipientsDataTable("F03_110_R2_CR_V2", this.PnoDataTable, this.P1TotalTable);
                }
                return this._recipientDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PnoDataTable", {
            get: function () {
                if (this._pnoDataTable == null) {
                    this._pnoDataTable = new F03110.PnoDataTable("F03_110_R2_PC_V2", this);
                }
                return this._pnoDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F03110.P1TotalTable("F03_110_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1Sheet", {
            get: function () {
                if (this._p1Sheet == null) {
                    this._p1Sheet = new F03110.P1Sheet("SHT_F03_110_R1", this);
                }
                return this._p1Sheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2Sheet", {
            get: function () {
                if (this._p2Sheet == null) {
                    this._p2Sheet = new F03110.P2GroupSheet(this);
                }
                return this._p2Sheet;
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
    F03110.FDocument = FDocument;
})(F03110 || (F03110 = {}));
