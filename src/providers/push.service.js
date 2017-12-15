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
import { CONSTANT } from './constant.service';
import { NotificationsService } from './notifications.service';
import { UserStorageService } from './user-storage.service';
import { AnywhereService } from './anywhere.service';
import { Vibration } from '@ionic-native/vibration';
// import { HomeDetail } from '../pages/home-detail/home-detail';
import * as _ from 'lodash';
import { Push } from '@ionic/cloud-angular';
import { Events, Platform, } from 'ionic-angular';
var PushService = (function () {
    function PushService(notificationsService, userStorageService, anywhereService, push, events, platform, vibration) {
        var _this = this;
        this.notificationsService = notificationsService;
        this.userStorageService = userStorageService;
        this.anywhereService = anywhereService;
        this.push = push;
        this.events = events;
        this.platform = platform;
        this.vibration = vibration;
        this.handleSubscribeNotifi = function (msg) {
            console.log("handleSubscribeNotifihandleSubscribeNotifi", msg);
            try {
                if (msg && msg.raw && msg.raw.additionalData &&
                    msg.raw.additionalData.foreground) {
                    _this.onForegroundNotification(msg);
                }
                else {
                    _this.onBackgroundgroundNotification(msg);
                }
                var newMsg = _.cloneDeep(msg.payload);
                newMsg.content = (msg && msg.raw) ? msg.raw.message : '';
                newMsg.status = CONSTANT.SERVER.NOTIFICATION_STATUS.NOTIFICATION_STATUS_NOT_READ;
                _this.events.publish(CONSTANT.EVENTS_NAME.NOTIFICATION_NEW, newMsg);
            }
            catch (e) {
                console.log("catch catch handleSubscribeNotifi", e);
            }
        };
        this.platform.ready().then(function () {
            if (_this.userStorageService.USER.logined) {
                _this.registerPushNotification();
            }
        });
        // if (CONSTANT.REAL_DEVICE) {
        //   return;
        // }
        // this.testNotification();
    }
    PushService.prototype.testNotification = function () {
        var _this = this;
        this.events.subscribe(CONSTANT.EVENTS_NAME.NOTIFICATION_GET_TEST, this.handleSubscribeNotifi);
        var data = {
            "raw": {
                "title": "Housy.vn",
                "message": "Nhà được đăng trên housy.vn",
                "additionalData": {
                    "payload": {
                        "id": 86,
                        "type": 1,
                        "object_id": 30
                    },
                    "notId": "362",
                    "dismissed": false,
                    "google.message_id": "0:1497003779864373%d2a28212f9fd7ecd",
                    "coldstart": true,
                    "foreground": true
                }
            },
            "text": "Nhà được đăng trên housy.vn",
            "title": "Housy.vn",
            "app": {
                "asleep": true,
                "closed": true
            },
            "payload": {
                "id": 86,
                "type": 1,
                "object_id": 30
            }
        };
        setTimeout(function () {
            _this.events.publish(CONSTANT.EVENTS_NAME.NOTIFICATION_GET_TEST, data);
        }, 5000);
    };
    PushService.prototype.registerPushNotification = function () {
        var _this = this;
        console.log("registerPushNotification");
        this.push.register()
            .then(function (token) {
            if (_this.userStorageService.USER.userInfo.tokenDevice !== token.token) {
                _this.push.saveToken(token);
                _this.userStorageService.setTokenDevice(token.token)
                    .then(function (res) {
                    _this.notificationsService.registerDeviceToken();
                });
            }
        })
            .catch(function () {
            console.log("registerPushNotification  this.push.register in Process");
        });
        this.onGetNotification();
    };
    PushService.prototype.onGetNotification = function () {
        var _this = this;
        console.log("onGetNotificationonGetNotification", this.push, this.push.rx);
        /*subsribe and handle when receive notifications */
        this.push.rx.notification()
            .subscribe(function (msg) {
            console.log("push.rx.notification", msg);
            _this.handleSubscribeNotifi(msg);
        });
    };
    // dang o trong ung dung
    PushService.prototype.onForegroundNotification = function (msg) {
        this.notificationsService.setFocegroundNotification();
        this.anywhereService.showToast(msg.text);
        this.vibration.vibrate([1000, 500, 1000, 500, 1000]);
    };
    // ung dung not active
    PushService.prototype.onBackgroundgroundNotification = function (msg) {
        var payload = msg.payload;
        this.notificationsService.setNotifi(payload);
        this.notificationsService.actionNotifi();
    };
    PushService.prototype.unregisterPushNotification = function () {
        this.push.unregister()
            .catch(function () { });
        this.notificationsService.unRegisterDeviceToken()
            .catch(function () {
            console.log("registerPushNotification  this.push.register in Process");
        });
    };
    return PushService;
}());
PushService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NotificationsService,
        UserStorageService,
        AnywhereService,
        Push,
        Events,
        Platform,
        Vibration])
], PushService);
export { PushService };
//# sourceMappingURL=push.service.js.map