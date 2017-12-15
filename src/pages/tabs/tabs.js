var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, } from '@angular/core';
import { RenterHomePage } from '../renter-home/renter-home';
import { OwnerHomePage } from '../owner-home/owner-home';
import { SearchPage } from '../search-page/search-page';
import { FavouritePage } from '../favourite-page/favourite-page';
import { NotificationPage } from '../notification-page/notification-page';
import { MorePage } from '../more/more';
// import { HomeDetail } from '../home-detail/home-detail';
import { UserStorageService } from '../../services/user-storage.service';
import { CONSTANT } from '../../services/constant.service';
import * as _ from 'lodash';
import { Events, Tabs, Platform, NavController, App } from 'ionic-angular';
var TabsPage = (function () {
    function TabsPage(userStorageService, platform, events, navController, appCtrl) {
        var _this = this;
        this.userStorageService = userStorageService;
        this.platform = platform;
        this.events = events;
        this.navController = navController;
        this.appCtrl = appCtrl;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = RenterHomePage;
        this.tab2Root = SearchPage;
        this.tab3Root = FavouritePage;
        this.tab4Root = NotificationPage;
        this.tab5Root = MorePage;
        this.tab6Root = OwnerHomePage;
        this._handleSubscribeUser = function (res) {
            console.log("_handleSubscribeUser Tabs", res);
            if (!res || _.isEmpty(res)) {
                return;
            }
            if (_this.isOwner === undefined ||
                (_this.oldUserStatus && (res.role != _this.oldUserStatus.role))) {
                _this.checkIsOwner();
                _this.tabRef && _this.tabRef.select(_this.isOwner ? 0 : 1);
            }
            if (_this.oldUserStatus && !res.logined && _this.oldUserStatus.logined) {
                if (_this.tabRef) {
                    _this.tabRef.select(1);
                }
            }
            // if (this.oldUserStatus &&
            //   ((this.oldUserStatus.logined != res.logined) ||
            //     (this.oldUserStatus.role !== res.role))) {
            //   // if (this.tabRef) {
            //   //   this.tabRef.select(this.isOwner ? 0 : 1);
            //   // }
            // }
            _this.oldUserStatus = _this.userStorageService.USER;
        };
        this._handleSubscribeToggleTabs = function (state) {
            if (state == 'show') {
                _this.isHideTabs = undefined;
            }
            else if (state == 'hide') {
                _this.isHideTabs = true;
            }
        };
        this._handleSubscribeCountNotifications = function (data) {
            console.log("_handleSubscribeCountNotifications Tabs", data);
            _this.countNotifications = data.count;
        };
        this.platform.ready().then(function () {
            _this.toggleSubscribeUser(true);
            _this.toggleSubscribeToggleTabs(true);
            _this.toggleSubscribeCountNotifications(true);
        });
    }
    TabsPage.prototype.toggleSubscribeUser = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
    };
    TabsPage.prototype.checkIsOwner = function () {
        this.isOwner = (this.userStorageService.USER.role === CONSTANT.USER_ROLE.OWNER.name);
        console.log("checkIsOwner this.userStorageService.USER.role", this.userStorageService.USER.role);
        return this.isOwner;
    };
    TabsPage.prototype.toggleSubscribeToggleTabs = function (isSubscibe) {
        if (isSubscibe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.TOGGLE_TABS, this._handleSubscribeToggleTabs);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.TOGGLE_TABS, this._handleSubscribeToggleTabs);
        }
    };
    TabsPage.prototype.toggleSubscribeCountNotifications = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.NOTIFICATION_CHANGE_COUNT, this._handleSubscribeCountNotifications);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.NOTIFICATION_CHANGE_COUNT, this._handleSubscribeCountNotifications);
        }
    };
    TabsPage.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
        this.toggleSubscribeToggleTabs(false);
        this.toggleSubscribeCountNotifications(false);
    };
    return TabsPage;
}());
__decorate([
    ViewChild('mainTabs'),
    __metadata("design:type", Tabs)
], TabsPage.prototype, "tabRef", void 0);
TabsPage = __decorate([
    Component({
        templateUrl: 'tabs.html'
    }),
    __metadata("design:paramtypes", [UserStorageService,
        Platform,
        Events,
        NavController,
        App])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map