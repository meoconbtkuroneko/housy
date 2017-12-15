var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { BrowserXhr } from "@angular/http";
var EnableCors = (function (_super) {
    __extends(EnableCors, _super);
    function EnableCors() {
        return _super.call(this) || this;
    }
    EnableCors.prototype.build = function () {
        var xhr = _super.prototype.build.call(this);
        console.log("xhrxhrxhrxhrxhrxhr", xhr);
        xhr.withCredentials = true; // this is all the magic we need for now
        // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://*');
        return (xhr);
    };
    return EnableCors;
}(BrowserXhr));
EnableCors = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], EnableCors);
export { EnableCors };
//# sourceMappingURL=enable-cors.js.map