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
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { CONSTANT } from '../../services/constant.service';
import { NoInternetService } from '../../services/no-internet.service';
var NoInternetMain = (function () {
    function NoInternetMain(noInternetService, events, splashScreen) {
        this.noInternetService = noInternetService;
        this.events = events;
        this.splashScreen = splashScreen;
        // hien tai chua co cho nao xai, chua duoc sua chua dang hoang
        this.noInternetTitle = CONSTANT.NETWORK.NO_INTERNET_TITLE;
        this.noInternetMessage = CONSTANT.NETWORK.NO_INTERNET_STRING;
        // this.noInternetService.subscribeHasInternetChange((res) => {
        //   this.retryInternet();
        // });
    }
    NoInternetMain.prototype.retryInternet = function () {
        console.log("retryInternet", this.noInternetService.hasInternet);
        if (this.noInternetService.hasInternet) {
            this.splashScreen.show();
            window.location.reload();
        }
    };
    return NoInternetMain;
}());
NoInternetMain = __decorate([
    Component({
        selector: 'no-internet-main',
        templateUrl: './no-internet-main.html'
    }),
    __metadata("design:paramtypes", [NoInternetService,
        Events,
        SplashScreen])
], NoInternetMain);
export { NoInternetMain };
//# sourceMappingURL=no-internet-main.js.map