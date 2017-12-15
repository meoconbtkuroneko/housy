var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AnywhereService } from './anywhere.service';
import { UserStorageService } from './user-storage.service';
import { CONSTANT } from './constant.service';
import { LoginPage } from '../pages/login-page/login-page';
import { Events } from 'ionic-angular';
var CallbackAfterLoginService = (function () {
    function CallbackAfterLoginService(anywhereService, userStorageService, events) {
        var _this = this;
        this.anywhereService = anywhereService;
        this.userStorageService = userStorageService;
        this.events = events;
        this._handleSubscribeLoginSuccess = function () {
            console.log("_handleSubscribeLoginSuccess CallbackAfterLoginService");
            _this.events.publish(CONSTANT.EVENTS_NAME.DO_CALLBACK_AFTER_LOGINED, _this.callbackType);
        };
        this.toggleSubscribeLoginSuccess(true);
    }
    CallbackAfterLoginService.prototype.toggleSubscribeLoginSuccess = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, this._handleSubscribeLoginSuccess);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, this._handleSubscribeLoginSuccess);
        }
    };
    CallbackAfterLoginService.prototype.checkHasLogined = function (type, handleAfterLogined, handleNotLogined) {
        if (this.anywhereService.USER &&
            this.anywhereService.USER.logined) {
            return handleAfterLogined();
        }
        this.setCallbackType(type);
        this.toggleShouldCallbackAfterLogin(true);
        this.anywhereService.showModal(LoginPage);
        if (handleNotLogined) {
            handleNotLogined();
        }
    };
    ;
    CallbackAfterLoginService.prototype.setCallbackType = function (type) {
        this.callbackType = type || undefined;
    };
    CallbackAfterLoginService.prototype.toggleShouldCallbackAfterLogin = function (should) {
        if (should) {
            this.shouldCallbackAfterLogin = true;
        }
        else {
            this.shouldCallbackAfterLogin = false;
        }
    };
    CallbackAfterLoginService.prototype.checkShouldDoCallback = function (currentType) {
        if (this.anywhereService.USER &&
            this.anywhereService.USER.logined &&
            this.shouldCallbackAfterLogin &&
            this.getCallbackType() === currentType) {
            this.toggleShouldCallbackAfterLogin(false);
            return true;
        }
    };
    CallbackAfterLoginService.prototype.getCallbackType = function () {
        return this.callbackType;
    };
    CallbackAfterLoginService.prototype.ngOnDestroy = function () {
        this.toggleSubscribeLoginSuccess(false);
    };
    return CallbackAfterLoginService;
}());
CallbackAfterLoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService,
        UserStorageService,
        Events])
], CallbackAfterLoginService);
export { CallbackAfterLoginService };
//# sourceMappingURL=callback-after-login.service.js.map