var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, } from '@angular/core';
import { LoginPage } from '../../pages/login-page/login-page';
import { AnywhereService } from '../../services/anywhere.service';
import { NoInternetService } from '../../services/no-internet.service';
import { CONSTANT } from '../../services/constant.service';
import { Events, } from 'ionic-angular';
var NotLogin = (function () {
    function NotLogin(anywhereService, noInternetService, events) {
        var _this = this;
        this.anywhereService = anywhereService;
        this.noInternetService = noInternetService;
        this.events = events;
        this.currentErrType = CONSTANT.ERR_TYPE.NO_INTERNET;
        this.handleSubscribeErrLoad = function (res) {
            _this.checkShowNoInternet();
            console.log("handleSubscribeErrLoadhandleSubscribeErrLoad 111111", _this.showNoInternet);
        };
        this.handleSubscribeInternetChanged = function (res) {
            if (res === false) {
                _this.checkShowNoInternet();
            }
        };
        this.checkShowNoInternet();
        this.toggleSubscribeErrLoad(true);
        this.toggleSubscribeInternetChanged(true);
    }
    NotLogin.prototype.checkShowNoInternet = function () {
        this.showNoInternet = this.noInternetService.hasInternet === false;
    };
    // bat tat nghe event errLoad, nghia la bat/tat internet
    NotLogin.prototype.toggleSubscribeErrLoad = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD, this.handleSubscribeErrLoad);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD, this.handleSubscribeErrLoad);
        }
    };
    NotLogin.prototype.toggleSubscribeInternetChanged = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, this.handleSubscribeInternetChanged);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, this.handleSubscribeInternetChanged);
        }
    };
    NotLogin.prototype.ngOnChanges = function () {
        if (this.showNow) {
            this.showLogin();
        }
    };
    NotLogin.prototype.showLogin = function () {
        if (this.showNoInternet ||
            !this.anywhereService.USER ||
            this.anywhereService.USER.logined) {
            return;
        }
        ;
        this.anywhereService.showModal(LoginPage);
    };
    NotLogin.prototype.ngOnDestroy = function () {
        this.toggleSubscribeErrLoad(false);
        this.toggleSubscribeInternetChanged(false);
    };
    return NotLogin;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], NotLogin.prototype, "showNow", void 0);
NotLogin = __decorate([
    Component({
        selector: "not-login",
        templateUrl: "./not-login.html"
    }),
    __metadata("design:paramtypes", [AnywhereService,
        NoInternetService,
        Events])
], NotLogin);
export { NotLogin };
//# sourceMappingURL=not-login.js.map