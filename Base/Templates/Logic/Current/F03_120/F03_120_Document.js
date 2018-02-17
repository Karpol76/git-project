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
var F03120;
(function (F03120) {
    var FDocument = (function (_super) {
        __extends(FDocument, _super);
        function FDocument(id, version, oldVersion) {
            var _this = _super.call(this, id, version, oldVersion) || this;
            _this._p2SheetSp1 = null;
            _this._p2SheetSp2 = null;
            _this._p1TotalTable = null;
            _this._pnoDataTable = null;
            _this._recipientDataTable = null;
            _this._subjectDataTable = null;
            _this._tableRules = new F03120.TableRules(_this);
            _this._interfaceRules = new F03120.InterfaceRules(_this);
            _this._updateRules = new F03120.UpdateRules(_this);
            _this._exportRules = new F03120.ExportRules(_this);
            return _this;
        }
        Object.defineProperty(FDocument.prototype, "TotalTable", {
            get: function () {
                return this.P1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "SubjectDataTable", {
            get: function () {
                if (this._subjectDataTable == null) {
                    this._subjectDataTable = new F03120.SubjectDataTable("F03_120_R2_SN", this.RecipientDataTable, this.TotalTable);
                }
                return this._subjectDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "RecipientDataTable", {
            get: function () {
                if (this._recipientDataTable == null) {
                    this._recipientDataTable = new F03120.RecipientsDataTable("F03_120_R2_RC", this.PnoDataTable, this.P1TotalTable);
                }
                return this._recipientDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "PnoDataTable", {
            get: function () {
                if (this._pnoDataTable == null) {
                    this._pnoDataTable = new F03120.PnoDataTable("F03_120_R2_PC", this);
                }
                return this._pnoDataTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P1TotalTable", {
            get: function () {
                if (this._p1TotalTable == null) {
                    this._p1TotalTable = new F03120.P1TotalTable("F03_120_R1_Values", this);
                }
                return this._p1TotalTable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2SheetSp1", {
            get: function () {
                if (this._p2SheetSp1 == null) {
                    this._p2SheetSp1 = new F03120.P2GroupSheetSp1(this);
                }
                return this._p2SheetSp1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FDocument.prototype, "P2SheetSp2", {
            get: function () {
                if (this._p2SheetSp2 == null) {
                    this._p2SheetSp2 = new F03120.P2GroupSheetSp2(this);
                }
                return this._p2SheetSp2;
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
    F03120.FDocument = FDocument;
})(F03120 || (F03120 = {}));
