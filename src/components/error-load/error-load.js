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
import { Events } from 'ionic-angular';
import { CONSTANT } from '../../services/constant.service';
import { NoInternetService } from '../../services/no-internet.service';
var ErrorLoad = (function () {
    function ErrorLoad(noInternetService, events) {
        var _this = this;
        this.noInternetService = noInternetService;
        this.events = events;
        this.errInfo = CONSTANT.ERR_TYPE.ERR_GENERAL;
        this.imageErrUrl = CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.ERR_LOAD;
        this.handleSubscribeInternetChanged = function (res) {
            if (res === false) {
                _this.checkShowNoInternet();
            }
        };
        this.checkShowNoInternet();
        this.toggleSubscribeInternetChanged(true);
    }
    ErrorLoad.prototype.toggleSubscribeInternetChanged = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, this.handleSubscribeInternetChanged);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, this.handleSubscribeInternetChanged);
        }
    };
    ErrorLoad.prototype.checkShowNoInternet = function () {
        this.showNoInternet = this.noInternetService.hasInternet === false;
    };
    ErrorLoad.prototype.retryInternet = function () {
        console.log("retryInternet", this.noInternetService.hasInternet);
        this.checkShowNoInternet();
        this.events.publish(CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD, this.errInfo);
    };
    ErrorLoad.prototype.ngOnDestroy = function () {
        this.toggleSubscribeInternetChanged(false);
    };
    return ErrorLoad;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ErrorLoad.prototype, "errInfo", void 0);
ErrorLoad = __decorate([
    Component({
        selector: 'error-load',
        templateUrl: './error-load.html'
    }),
    __metadata("design:paramtypes", [NoInternetService,
        Events])
], ErrorLoad);
export { ErrorLoad };
//# sourceMappingURL=error-load.js.map