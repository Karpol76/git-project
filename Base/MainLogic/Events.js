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
var ObasEvent = (function () {
    function ObasEvent() {
        this._handlers = [];
    }
    ObasEvent.prototype.Add = function (handler) {
        if (this._handlers.indexOf(handler) === -1) {
            this._handlers.push(handler);
        }
    };
    ObasEvent.prototype.Remove = function (handler) {
        var index = this._handlers.indexOf(handler);
        if (index > -1) {
            this._handlers.splice(index, 1);
        }
    };
    return ObasEvent;
}());
var TableAddEditEvent = (function (_super) {
    __extends(TableAddEditEvent, _super);
    function TableAddEditEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableAddEditEvent.prototype.Do = function (key) {
        for (var i = 0, len = this._handlers.length; i < len; i++) {
            this._handlers[i](key);
        }
    };
    return TableAddEditEvent;
}(ObasEvent));
var ObasTableFieldChangeEvent = (function (_super) {
    __extends(ObasTableFieldChangeEvent, _super);
    function ObasTableFieldChangeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObasTableFieldChangeEvent.prototype.Do = function (table, oldValue, newValue, fieldId) {
        for (var i = 0, len = this._handlers.length; i < len; i++) {
            this._handlers[i](table, oldValue, newValue, fieldId);
        }
    };
    return ObasTableFieldChangeEvent;
}(ObasEvent));
