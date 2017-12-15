var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, } from '@angular/core';
import { Events, } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';
var NoInternetService = (function () {
    function NoInternetService(anywhereService, network, events) {
        this.anywhereService = anywhereService;
        this.network = network;
        this.events = events;
        this.noInternetTitle = CONSTANT.NETWORK.NO_INTERNET_TITLE;
        // test
        if (!CONSTANT.REAL_DEVICE) {
            // this.enableTestInternet();
        }
    }
    NoInternetService.prototype.init = function (callback) {
        console.log('init', this.network.type);
        this.onDisconnect();
        this.onConnect();
        var hasInternet = this.hasInternetConnection();
        this.broadcastHasInternetChange(hasInternet);
        if (hasInternet) {
            return this.addScriptGoogleMap(callback);
        }
        if (callback) {
            callback(hasInternet);
        }
    };
    // xoa do nhe
    NoInternetService.prototype.enableTestInternet = function () {
        var _this = this;
        setTimeout(function () {
            _this.broadcastHasInternetChange(true);
        }, 1);
        setTimeout(function () {
            _this.broadcastHasInternetChange(false);
        }, 10000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(true);
        }, 20000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(true);
        }, 25000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(false);
        }, 37000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(true);
        }, 47000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(false);
        }, 50000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(true);
        }, 52000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(false);
        }, 57000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(true);
        }, 60000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(false);
        }, 65000);
        setTimeout(function () {
            _this.broadcastHasInternetChange(true);
        }, 80000);
    };
    NoInternetService.prototype.broadcastHasInternetChange = function (hasInternet) {
        this.hasInternet = hasInternet;
        this.events.publish(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, hasInternet);
    };
    NoInternetService.prototype.hasInternetConnection = function () {
        var type = this.network.type;
        if (type === "unknown" || type === 'none') {
            return false;
        }
        return true;
    };
    NoInternetService.prototype.addScriptGoogleMap = function (callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=AIzaSyAW8_BS3rnc0y5vgofEsS3eNfyCxOoty4c&language=vi";
        document.head.appendChild(script);
        script.onload = function () {
            console.log("Script loaded and ready");
            if (callback) {
                callback(true);
            }
        };
    };
    // watch network for a connection
    NoInternetService.prototype.onConnect = function () {
        var _this = this;
        this.network.onConnect()
            .subscribe(function () {
            console.log('network connected!');
            _this.broadcastHasInternetChange(true);
        });
    };
    // watch network for a disconnect
    NoInternetService.prototype.onDisconnect = function () {
        var _this = this;
        this.network.onDisconnect()
            .subscribe(function () {
            console.log('network was disconnected :-(');
            _this.broadcastHasInternetChange(false);
        });
    };
    NoInternetService.prototype.createInternetNotification = function () {
        this.toastInternet = this.anywhereService.showToast(this.noInternetTitle);
    };
    return NoInternetService;
}());
NoInternetService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService,
        Network,
        Events])
], NoInternetService);
export { NoInternetService };
//# sourceMappingURL=no-internet.service.js.map