var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ViewController, Events, } from 'ionic-angular';
import { DeleteService } from '../../services/delete.service';
import { PutService } from '../../services/put.service';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
import { UserStorageService } from '../../services/user-storage.service';
import { HistoryService } from '../../services/history.service';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
import * as _ from 'lodash';
var SettingPage = (function (_super) {
    __extends(SettingPage, _super);
    function SettingPage(viewController, deleteService, putService, anywhereService, userStorageService, historyService, coreServices, events) {
        var _this = _super.call(this, coreServices) || this;
        _this.viewController = viewController;
        _this.deleteService = deleteService;
        _this.putService = putService;
        _this.anywhereService = anywhereService;
        _this.userStorageService = userStorageService;
        _this.historyService = historyService;
        _this.coreServices = coreServices;
        _this.events = events;
        _this.currentSetting = _.cloneDeep(_this.userStorageService.getSetting());
        return _this;
    }
    ;
    SettingPage.prototype.clearHistories = function () {
        var _this = this;
        if (!this.canGo()) {
            return;
        }
        this.toggleIsProcessing(true);
        this.historyService.clearHistories();
        this.deleteService.deleteRecentSearch()
            .then(function (res) {
            console.log("deleteService.deleteRecentSearch", res);
            if (res.reason == CONSTANT.REASONS.ER_OK) {
                _this.finishLoading(CONSTANT.HISTORY.SUCCESS);
            }
            else {
                _this.finishLoading(CONSTANT.HISTORY.ERR);
            }
        }, function (err) {
            _this.finishLoading(CONSTANT.HISTORY.ERR);
        });
    };
    SettingPage.prototype.finishLoading = function (message) {
        this.toggleIsProcessing(false);
        if (message) {
            this.anywhereService.showToast(message);
        }
    };
    SettingPage.prototype.toggleVal = function (valName) {
        this.currentSetting[valName] = !this.currentSetting[valName];
    };
    SettingPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        if (!this.canGo()) {
            return;
        }
        var hasChange;
        var oldVal = this.userStorageService.getSetting();
        for (var key in oldVal) {
            if (oldVal[key] !== this.currentSetting[key]) {
                hasChange = true;
                break;
            }
        }
        if (hasChange) {
            this.events.publish(CONSTANT.EVENTS_NAME.SETTING_CHANGED);
            this.putService.updateProfile(this.currentSetting)
                .then(function (res) {
                if (res.reason == CONSTANT.REASONS.ER_OK) {
                    _this.userStorageService.setSetting(_this.currentSetting);
                }
            });
        }
    };
    SettingPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    SettingPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return SettingPage;
}(CoreSimpleClass));
SettingPage = __decorate([
    Component({
        selector: 'setting-page',
        templateUrl: 'setting-page.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        DeleteService,
        PutService,
        AnywhereService,
        UserStorageService,
        HistoryService,
        CoreServices,
        Events])
], SettingPage);
export { SettingPage };
//# sourceMappingURL=setting-page.js.map