var ObasDocumentCollection = (function () {
    function ObasDocumentCollection() {
    }
    Object.defineProperty(ObasDocumentCollection, "ExchangeDataDocumentId", {
        get: function () {
            if (this._exchangeDataDocumentId == null) {
                this._exchangeDataDocumentId = Client.GetDocumentId(ObasStageSettings.ExchangeDataTemplatePath);
            }
            return this._exchangeDataDocumentId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasDocumentCollection, "MainDocumentId", {
        get: function () {
            if (this._mainDocumentId == null) {
                this._mainDocumentId = Client.MainDocumentId;
            }
            return this._mainDocumentId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObasDocumentCollection, "RroDocumentId", {
        get: function () {
            if (this._rroDocumentId == null) {
                this._rroDocumentId = Client.GetDocumentId(ObasStageSettings.RroPath);
            }
            return this._rroDocumentId;
        },
        enumerable: true,
        configurable: true
    });
    return ObasDocumentCollection;
}());
ObasDocumentCollection._rroDocumentId = null;
ObasDocumentCollection._mainDocumentId = null;
ObasDocumentCollection._exchangeDataDocumentId = null;
