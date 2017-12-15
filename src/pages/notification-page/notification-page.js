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
import { Storage } from '@ionic/storage';
import { NavController, ActionSheetController, Events } from 'ionic-angular';
import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';
import { NotificationsService } from '../../services/notifications.service';
import { GetService } from '../../services/get.service';
import { PutService } from '../../services/put.service';
import { DeleteService } from '../../services/delete.service';
import { HomeDetail } from '../home-detail/home-detail';
import { CoreClassNeedLogin, CoreServices } from '../../templates/core-class';
var NotificationPage = (function (_super) {
    __extends(NotificationPage, _super);
    function NotificationPage(navCtrl, actionSheetController, getService, putService, deleteService, notificationsService, events, storage, coreServices) {
        var _this = 
        // If we navigated to this page, we will have an item available as a nav
        _super.call(this, coreServices) || this;
        _this.navCtrl = navCtrl;
        _this.actionSheetController = actionSheetController;
        _this.getService = getService;
        _this.putService = putService;
        _this.deleteService = deleteService;
        _this.notificationsService = notificationsService;
        _this.events = events;
        _this.storage = storage;
        _this.listData = [];
        _this.notificationStatus = CONSTANT.SERVER.NOTIFICATION_STATUS;
        _this.notificationTypes = CONSTANT.SERVER.NOTIFICATION_TYPE;
        _this.handleSubscribeNewNotifications = function (data) {
            console.log("handleSubscribeNewNotifications", data);
            if (!_this.allDataList) {
                _this.allDataList = [];
            }
            _this.allDataList.unshift(data);
            console.log("this.allDatalist handleSubscribeNewNotifications", _this.allDataList);
        };
        return _this;
    }
    NotificationPage.prototype.toggleSubscribeNewNotifications = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.NOTIFICATION_NEW, this.handleSubscribeNewNotifications);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.NOTIFICATION_NEW, this.handleSubscribeNewNotifications);
        }
    };
    NotificationPage.prototype.ionViewCanEnter = function () {
        console.log("ionViewCanEnter 11111111111");
        this.coreServices.anywhereService.toggleTabs('show');
    };
    NotificationPage.prototype.ngOnInit = function () {
        this.doRefresh();
    };
    NotificationPage.prototype.handleSubscribeUser = function (res) {
        console.log("handleSubscribeUser NotificationPage");
        this.doRefresh();
    };
    NotificationPage.prototype.ngAfterViewInit = function () {
        console.log("ngAfterViewInit notiffffffffffffffff");
        this.toggleSubscribeNewNotifications(true);
    };
    NotificationPage.prototype.getAllData = function () {
        if (this.USER.logined) {
            this.events.publish(CONSTANT.EVENTS_NAME.ON_TAB_NOTIFICATION, true);
            this.listAllData();
            this.resetCountNotifi();
        }
    };
    NotificationPage.prototype.listAllData = function () {
        var _this = this;
        return this._listAllData('listAllNotifications', null, function (res) {
            console.log("listAllData 2222222222", res);
            var data = _.clone(res[CONSTANT.DETAIL_TYPE.NOTIFICATIONS]);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, data, _.isEqual);
            console.log("this.allDataList", _this.allDataList);
        });
    };
    NotificationPage.prototype.resetCountNotifi = function () {
        this.notificationsService.setIsOnTabNotification(true);
        // this.events.publish(CONSTANT.EVENTS_NAME.ON_TAB_NOTIFICATION, true);
        this.notificationsService.onTabNotification();
        // this.notificationsService.removeCountNotification();
        // let dataBroadcast = {
        //   count: ''
        // };
        // this.events.publish("Notifications:resetCount", dataBroadcast);
    };
    NotificationPage.prototype.ionViewDidLeave = function () {
        this.notificationsService.setIsOnTabNotification(false);
        // this.events.publish(CONSTANT.EVENTS_NAME.ON_TAB_NOTIFICATION, false);
    };
    NotificationPage.prototype.options = function (event, index, itemId) {
        var _this = this;
        event.stopPropagation();
        var toggleReadText = CONSTANT.NOTIFICATION.READ;
        var currentStatus = this.allDataList[index].status;
        var sendStatus;
        if (currentStatus ==
            this.notificationStatus.NOTIFICATION_STATUS_READ) {
            toggleReadText = CONSTANT.NOTIFICATION.NOT_READ;
            sendStatus = this.notificationStatus.NOTIFICATION_STATUS_NOT_READ;
        }
        else {
            sendStatus = this.notificationStatus.NOTIFICATION_STATUS_READ;
        }
        var actionSheet = this.actionSheetController.create({
            // title: '',
            buttons: [{
                    text: CONSTANT.STRING_DELETE,
                    role: 'delete',
                    icon: "trash",
                    handler: function () {
                        _this.deleteNotification(index, itemId);
                    }
                }, {
                    text: toggleReadText,
                    role: 'readed',
                    icon: "eye",
                    handler: function () {
                        var data = {
                            status: sendStatus
                        };
                        _this.toggleNotification(index, itemId, data);
                    }
                }]
        });
        actionSheet.present();
    };
    NotificationPage.prototype.deleteNotification = function (index, id) {
        var _this = this;
        this.deleteService.deleteNotification(id)
            .then(function (res) {
            _this.allDataList.splice(index, 1);
            _this.totalItem--;
        });
    };
    // 0: da doc
    // 1: chua doc
    // data = {
    //     status: sendStatus
    // };
    NotificationPage.prototype.toggleNotification = function (index, id, data) {
        var _this = this;
        console.log('toggleNotification');
        var oldStatus = this.allDataList[index].status;
        this.putService.toggleNotification(id, data)
            .then(function (res) {
            // neu chua doc
            _this.allDataList[index].status =
                _this.notificationStatus.NOTIFICATION_STATUS_READ;
            if (oldStatus == _this.notificationStatus.NOTIFICATION_STATUS_READ) {
                _this.allDataList[index].status =
                    _this.notificationStatus.NOTIFICATION_STATUS_NOT_READ;
            }
        });
    };
    NotificationPage.prototype.notificationClicked = function (index, item) {
        console.log("notificationClickednotificationClickednotificationClicked", item);
        if (item.status == this.notificationStatus.NOTIFICATION_STATUS_NOT_READ) {
            var data = {
                status: this.notificationStatus.NOTIFICATION_STATUS_READ
            };
            this.toggleNotification(index, item.id, data);
        }
        if (item.type == this.notificationTypes.NOTIFICATION_TYPE_DISCOUNT ||
            item.type == this.notificationTypes.NOTIFICATION_TYPE_RENTING) {
            // Do what u wanna do
            this.navCtrl.push(HomeDetail, {
                params: {
                    id: item.object_id
                }
            });
        }
        if (item.type == this.notificationTypes.NOTIFICATION_TYPE_APARTMENT) {
            // this.GlobalService.goDetailApartment(item.object_id);
        }
        if (item.type == this.notificationTypes.NOTIFICATION_TYPE_NEIGHBORHOOD) {
        }
    };
    NotificationPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return NotificationPage;
}(CoreClassNeedLogin));
NotificationPage = __decorate([
    Component({
        selector: 'notification-page',
        templateUrl: 'notification-page.html'
    }),
    __metadata("design:paramtypes", [NavController,
        ActionSheetController,
        GetService,
        PutService,
        DeleteService,
        NotificationsService,
        Events,
        Storage,
        CoreServices])
], NotificationPage);
export { NotificationPage };
//# sourceMappingURL=notification-page.js.map