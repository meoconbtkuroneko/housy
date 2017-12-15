var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, } from '@angular/core';
import { Events } from 'ionic-angular';
import { CONSTANT } from '../../services/constant.service';
import { NoInternetService } from '../../services/no-internet.service';
var NoInternet = (function () {
    function NoInternet(noInternetService, events) {
        var _this = this;
        this.noInternetService = noInternetService;
        this.events = events;
        this.noInternetTitle = CONSTANT.NETWORK.NO_INTERNET_TITLE;
        this.noInternetMessage = CONSTANT.NETWORK.NO_INTERNET_STRING;
        this.currentErrType = CONSTANT.ERR_TYPE.NO_INTERNET;
        this.handleSubscribeInternetChanged = function (res) {
            if (res === false) {
                _this.checkShowNoInternet();
            }
        };
        this.handleSubscribeFinishDoRefresh = function () {
            console.log("handleSubscribeFinishDoRefresh");
            _this.checkShowNoInternet();
        };
        this.checkShowNoInternet();
        this.toggleSubscribeInternetChanged(true);
        this.toggleSubscribeFinishDoRefresh(true);
    }
    NoInternet.prototype.toggleSubscribeInternetChanged = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, this.handleSubscribeInternetChanged);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, this.handleSubscribeInternetChanged);
        }
    };
    NoInternet.prototype.toggleSubscribeFinishDoRefresh = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.FINISH_DO_REFRESH, this.handleSubscribeFinishDoRefresh);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.FINISH_DO_REFRESH, this.handleSubscribeFinishDoRefresh);
        }
    };
    NoInternet.prototype.checkShowNoInternet = function () {
        this.showNoInternet = this.noInternetService.hasInternet === false;
        this.shouldShowSpinner = false;
    };
    NoInternet.prototype.retryInternet = function () {
        console.log("retryInternet", this.noInternetService.hasInternet);
        if (this.noInternetService.hasInternet) {
            this.shouldShowSpinner = true;
            this.events.publish(CONSTANT.EVENTS_NAME.RELOAD_INTERNET);
        }
    };
    NoInternet.prototype.ngOnDestroy = function () {
        this.toggleSubscribeFinishDoRefresh(false);
        this.toggleSubscribeInternetChanged(false);
    };
    return NoInternet;
}());
NoInternet = __decorate([
    Component({
        selector: 'no-internet',
        templateUrl: './no-internet.html'
    }),
    __metadata("design:paramtypes", [NoInternetService,
        Events])
], NoInternet);
export { NoInternet };
//# sourceMappingURL=no-internet.js.map