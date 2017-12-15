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
import { UserStorageService } from '../../services/user-storage.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { AccountPage } from '../account-page/account-page';
import { SettingPage } from '../setting-page/setting-page';
import { Profile } from '../profile/profile';
import { Events, } from 'ionic-angular';
import { CoreClassNeedLogin, CoreServices } from '../../templates/core-class';
var MorePage = (function (_super) {
    __extends(MorePage, _super);
    function MorePage(userStorageService, anywhereService, events, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.userStorageService = userStorageService;
        _this.anywhereService = anywhereService;
        _this.events = events;
        _this.coreServices = coreServices;
        _this.allRole = CONSTANT.USER_ROLE;
        _this.handleSettingChanged = function () {
            _this.toggleIsProcessing(true);
        };
        _this.toggleSubscribeSettingChanged(true);
        return _this;
    }
    MorePage.prototype.ngOnInit = function () {
        this.getAllData();
    };
    MorePage.prototype.getNewRole = function () {
        var currentRole = this.USER.role;
        var newRoleObj = CONSTANT.USER_ROLE.OWNER;
        if (currentRole === newRoleObj.name) {
            newRoleObj = CONSTANT.USER_ROLE.RENTER;
        }
        this.newRoleDes = newRoleObj.description;
        return newRoleObj.name;
    };
    // inherit from parent;
    MorePage.prototype.handleSubscribeUser = function (res) {
        this.getAllData();
    };
    // inherit from parent;
    MorePage.prototype.getAllData = function () {
        this.getNewRole();
        this.toggleIsProcessing(false);
    };
    MorePage.prototype.toggleSubscribeSettingChanged = function (isSubscibe) {
        if (isSubscibe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.SETTING_CHANGED, this.handleSettingChanged);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.SETTING_CHANGED, this.handleSettingChanged);
        }
    };
    MorePage.prototype.openAccount = function () {
        this.anywhereService.showModal(AccountPage);
    };
    MorePage.prototype.openSetting = function () {
        if (this.isProcessing) {
            return this.anywhereService.showToast(CONSTANT.UPDATING);
        }
        this.anywhereService.showModal(SettingPage);
    };
    MorePage.prototype.openProfile = function () {
        this.anywhereService.showModal(Profile);
    };
    MorePage.prototype.switchRole = function () {
        var data = {
            currentRole: this.USER.role,
        };
        data.newRole = this.getNewRole();
        this.newRoleDes = CONSTANT.USER_ROLE[data.newRole.toUpperCase()].description;
        this.userStorageService.setRole(data.newRole);
    };
    MorePage.prototype.ngOnDestroy = function () {
        this.toggleSubscribeSettingChanged(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return MorePage;
}(CoreClassNeedLogin));
MorePage = __decorate([
    Component({
        selector: 'page-more',
        templateUrl: 'more.html'
    }),
    __metadata("design:paramtypes", [UserStorageService,
        AnywhereService,
        Events,
        CoreServices])
], MorePage);
export { MorePage };
//# sourceMappingURL=more.js.map