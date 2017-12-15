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
import { Events, Platform, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AnywhereService } from "./anywhere.service";
import { CONSTANT } from "./constant.service";
import { UserStorageService } from "./user-storage.service";
import { PutService } from "./put.service";
import * as _ from 'lodash';
var NotificationsService = (function () {
    function NotificationsService(anywhereService, userStorageService, putService, storage, events, platform) {
        this.anywhereService = anywhereService;
        this.userStorageService = userStorageService;
        this.putService = putService;
        this.storage = storage;
        this.events = events;
        this.platform = platform;
        this.payload = {
            object_id: null,
            type: null,
            id: null
        };
        this.keyCountNotification = 'countNotifications';
        this.platform.ready().then(function () {
            // this.setCountNotification(0);
        });
    }
    NotificationsService.prototype.setIsOnTabNotification = function (onTabNotification) {
        this.isOnTabNotification = onTabNotification;
    };
    NotificationsService.prototype.resetNotifi = function () {
        this.payload = {
            object_id: null,
            type: null,
            id: null
        };
    };
    NotificationsService.prototype.getNotifi = function () {
        return this.payload;
    };
    NotificationsService.prototype.setNotifi = function (obj) {
        if (obj) {
            this.payload = _.cloneDeep(obj);
        }
    };
    NotificationsService.prototype.actionNotifi = function () {
        console.log("???????? actionNotifi 2", this.payload.type);
        this.putService.toggleNotification(this.payload.id, {
            status: CONSTANT.SERVER.NOTIFICATION_STATUS.NOTIFICATION_STATUS_READ
        });
        this.broadcastNotification(this.payload);
        this.resetNotifi();
        console.log("THEO LY THUYET LA MO TRANG DETAIL NE");
    };
    NotificationsService.prototype.broadcastNotification = function (data) {
        this.events.publish(CONSTANT.EVENTS_NAME.NOTIFICATION_GET, data);
    };
    NotificationsService.prototype.setFocegroundNotification = function () {
        if (this.isOnTabNotification) {
            this.onTabNotification();
        }
        else {
            this.onTabOther();
        }
    };
    NotificationsService.prototype.onTabNotification = function () {
        var _this = this;
        this.removeCountNotification(function () {
            var dataBroadcast = {
                count: ''
            };
            _this.handleBroadcastCountNotifi(dataBroadcast);
        });
    };
    NotificationsService.prototype.onTabOther = function () {
        var _this = this;
        this.getCountNotification(function (count) {
            var dataBroadcast = {
                count: ''
            };
            var totalNotif;
            totalNotif = count;
            ++totalNotif;
            console.log(" 1 -storage------countNotifications------- get ", count, totalNotif);
            dataBroadcast = {
                count: totalNotif
            };
            _this.handleBroadcastCountNotifi(dataBroadcast);
            _this.setCountNotification(totalNotif);
        });
    };
    NotificationsService.prototype.handleBroadcastCountNotifi = function (dataBroadcast) {
        console.log("t broadcast dayyyyyyyyy", dataBroadcast);
        this.events.publish(CONSTANT.EVENTS_NAME.NOTIFICATION_CHANGE_COUNT, dataBroadcast);
        // this.events.publish("Notifications:resetCount", dataBroadcast);
    };
    NotificationsService.prototype.getCountNotification = function (callback) {
        this.storage.get(this.keyCountNotification)
            .then(function (count) {
            if (callback) {
                callback(count);
            }
        });
    };
    NotificationsService.prototype.setCountNotification = function (val, callback) {
        this.storage.set(this.keyCountNotification, val)
            .then(function () {
            if (callback) {
                callback();
            }
        });
    };
    NotificationsService.prototype.removeCountNotification = function (callback) {
        this.storage.remove(this.keyCountNotification)
            .then(function () {
            if (callback) {
                callback();
            }
        });
    };
    // token device-------------------------
    NotificationsService.prototype.registerDeviceToken = function () {
        var deviceToken = {
            "device_token": this.userStorageService.getProp('tokenDevice'),
            "app_name": "housy_renter"
        };
        this.anywhereService.makePostRequest(CONSTANT.SERVER.APIS.REGISTER_DEVICE_TOKEN, deviceToken).then(function (obj) {
            console.log('6666 registerDeviceToken OKKK ', obj);
        }, function (obj) {
            console.log('77777 registerDeviceToken FFFF ', obj);
        });
    };
    NotificationsService.prototype.unRegisterDeviceToken = function () {
        var deviceToken = {
            "device_token": this.userStorageService.getProp('tokenDevice')
        };
        return this.anywhereService.makeRequest(CONSTANT.SERVER.APIS.UNREGISTER_DEVICE_TOKEN, deviceToken)
            .then(function (obj) {
            console.log('UNUNUN unRegisterDeviceToken ', obj);
        });
    };
    NotificationsService.prototype.reTryUnRegisterDeviceToken = function () {
        if (this.userStorageService.getProp('tokenDevice') && !this.userStorageService.USER.logined) {
            this.unRegisterDeviceToken();
            console.log('Có token nhưng không login');
        }
    };
    return NotificationsService;
}());
NotificationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService,
        UserStorageService,
        PutService,
        Storage,
        Events,
        Platform])
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map