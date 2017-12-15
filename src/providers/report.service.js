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
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';
import { ReportPage } from '../pages/report-page/report-page';
import * as _ from 'lodash';
var ReportService = (function () {
    function ReportService(storage, events, anywhereService) {
        var _this = this;
        this.storage = storage;
        this.events = events;
        this.anywhereService = anywhereService;
        this.key = 'CONTACT_HOST_INFO';
        this.timeToFinishCall = 30000;
        this.CONTACT_HOST_INFO = {};
        this._handleSubscribeCallbackAfterLogined = function (data) {
            console.log("_handleSubscribeCallbackAfterLogined ReportService", data);
            if (data === _this.callbackType) {
                _this.showReport();
            }
        };
        this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.REPORT;
        this.toggleSubscribeCallbackAfterLogined(true);
    }
    ReportService.prototype.toggleSubscribeCallbackAfterLogined = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.DO_CALLBACK_AFTER_LOGINED, this._handleSubscribeCallbackAfterLogined);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, this._handleSubscribeCallbackAfterLogined);
        }
    };
    ReportService.prototype.showReport = function () {
        this.anywhereService.showModal(ReportPage, {
            type: this.type,
            data: this.data
        });
    };
    ReportService.prototype.setReportData = function (type, data) {
        this.type = type;
        this.data = data;
    };
    ReportService.prototype.startupServices = function () {
        var _this = this;
        return this.getContactHostInfo()
            .then(function (res) {
            _this.broadcastContactHostInfoChange(res);
            return res;
        });
    };
    ReportService.prototype.broadcastContactHostInfoChange = function (data) {
        this.CONTACT_HOST_INFO = _.cloneDeep(data);
        this.events.publish(CONSTANT.EVENTS_NAME.REPORT_SERVICE_CHANGED, data);
    };
    ReportService.prototype.getContactHostInfo = function () {
        return this.storage.get(this.key);
    };
    ReportService.prototype.setContactHostInfo = function (val) {
        var _this = this;
        return this.storage.set(this.key, val)
            .then(function (res) {
            _this.broadcastContactHostInfoChange(res);
        });
    };
    ReportService.prototype.resetContactHostInfo = function () {
        var _this = this;
        return this.storage.remove(this.key).then(function (res) {
            _this.broadcastContactHostInfoChange({});
        });
    };
    ReportService.prototype.checkContactTime = function () {
        if (this.CONTACT_HOST_INFO && this.CONTACT_HOST_INFO.timeContact) {
            var nowTime = new Date().getTime();
            var callingTime = nowTime - this.CONTACT_HOST_INFO.timeContact;
            this.resetContactHostInfo();
            if (callingTime > this.timeToFinishCall) {
                return true;
            }
            return;
        }
    };
    ReportService.prototype.ngOnDestroy = function () {
        this.toggleSubscribeCallbackAfterLogined(false);
    };
    return ReportService;
}());
ReportService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage,
        Events,
        AnywhereService])
], ReportService);
export { ReportService };
//# sourceMappingURL=report.service.js.map