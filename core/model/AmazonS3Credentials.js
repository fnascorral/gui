"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractDataObject_1 = require("./AbstractDataObject");
var AmazonS3Credentials = (function (_super) {
    __extends(AmazonS3Credentials, _super);
    function AmazonS3Credentials() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AmazonS3Credentials;
}(AbstractDataObject_1.AbstractDataObject));
exports.AmazonS3Credentials = AmazonS3Credentials;
