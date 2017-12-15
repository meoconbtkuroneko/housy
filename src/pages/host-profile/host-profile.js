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
import { NavParams, NavController, ViewController, Events, } from 'ionic-angular';
import * as _ from 'lodash';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { CoreClassNoSubcribeUser, CoreServices } from '../../templates/core-class';
var HostProfile = (function (_super) {
    __extends(HostProfile, _super);
    function HostProfile(navParams, coreServices, anywhereService, navController, viewController, events) {
        var _this = _super.call(this, coreServices) || this;
        _this.navParams = navParams;
        _this.anywhereService = anywhereService;
        _this.navController = navController;
        _this.viewController = viewController;
        _this.events = events;
        _this.typeRole = CONSTANT.SERVER.TYPE_ROLE;
        _this.typeComment = CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_USER.name;
        _this.getParams = {
            page: _this.currentPage,
            type: CONSTANT.DETAIL_TYPE.USERS,
        };
        _this.handleSubscribeShowMoreClicked = function () {
            if (!_this.canGo()) {
                console.log("doiiiiiiiiiiiiiiiiiiiiiiii", _this.isProcessing, _this.loading, _this.hasInternet);
                return;
            }
            console.log("zooooooooooooooooooooooooo");
            if (!_this.checkIsActivePage()) {
                return;
            }
            _this.doLoadMore();
        };
        _this.params = _this.navParams.get("params");
        _this.getParams.id = _this.params.id;
        return _this;
    }
    HostProfile.prototype.getAllData = function () {
        this.getDetail();
        this.listAllData();
    };
    // doRefresh(refresher ? ) {
    //   this._doRefresh(refresher, () => {
    //     this.getDetail();
    //     this.listAllData();
    //   })
    // }
    HostProfile.prototype.ionViewCanEnter = function () {
        this.coreServices.anywhereService.toggleTabs('hide');
    };
    ;
    HostProfile.prototype.ionViewDidEnter = function () {
        this.subscribeShowMoreClicked();
    };
    HostProfile.prototype.ionViewWillLeave = function () {
        this.unsubscribeShowMoreClicked();
    };
    HostProfile.prototype.getDetail = function () {
        var _this = this;
        this._listAllData('getHostProfile', this.params.id, function (res) {
            _this.showData = res[CONSTANT.DETAIL_TYPE.USER];
            _this.fullUrlPicture = _this.anywhereService.getFullImgUrl(_this.showData.picture, CONSTANT.DETAIL_TYPE.USER);
            _this.createDateString = _this.getConverDobString(_this.showData.created);
            console.log("this.showData", _this.showData);
        });
    };
    HostProfile.prototype.getConverDobString = function (date) {
        var tempDate = this.anywhereService.convertDate(date);
        return tempDate.day + ' tháng ' + tempDate.month + ' năm ' + tempDate.year;
    };
    HostProfile.prototype.listAllData = function () {
        var _this = this;
        console.log("listAllDatalistAllData");
        this._listAllData('getHousesOf', this.getParams, function (res) {
            var data = _.clone(res[CONSTANT.DETAIL_TYPE.SPACES]);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, _this.coreServices.anywhereService.addIdToArr(data), _.isEqual);
            console.log("listAllData 2222222222", res);
        });
    };
    ;
    HostProfile.prototype.checkIsActivePage = function () {
        return this.navController.isActive(this.viewController);
    };
    HostProfile.prototype.subscribeShowMoreClicked = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED, this.handleSubscribeShowMoreClicked);
    };
    HostProfile.prototype.unsubscribeShowMoreClicked = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED, this.handleSubscribeShowMoreClicked);
    };
    HostProfile.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        console.log("doLoadMoredoLoadMoredoLoadMoredoLoadMore", this.totalPage, this.currentPage);
        this._doLoadMore(infiniteScroll, function () {
            _this.toggleIsProcessing(true);
            _this.getParams.page = _this.currentPage;
            _this.listAllData();
        });
    };
    HostProfile.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return HostProfile;
}(CoreClassNoSubcribeUser));
HostProfile = __decorate([
    Component({
        selector: 'host-profile',
        templateUrl: 'host-profile.html'
    }),
    __metadata("design:paramtypes", [NavParams,
        CoreServices,
        AnywhereService,
        NavController,
        ViewController,
        Events])
], HostProfile);
export { HostProfile };
//# sourceMappingURL=host-profile.js.map