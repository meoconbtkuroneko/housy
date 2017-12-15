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
import { Component, } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';
import { ApartmentDetail } from '../apartment-detail/apartment-detail';
import { AdvPage } from '../adv-page/adv-page';
import { HostProfile } from '../host-profile/host-profile';
import { CommonService } from '../../services/common.service';
import { CurrentItemService } from '../../services/current-item.service';
import { CoreClassGetData, CoreServices } from '../../templates/core-class';
var HomeDetail = (function (_super) {
    __extends(HomeDetail, _super);
    function HomeDetail(navController, navParams, commonService, currentItemService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.commonService = commonService;
        _this.currentItemService = currentItemService;
        _this.typeShare = CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_SPACE;
        _this.typeComment = CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_RENTING.name;
        _this.maxAdvance = CONSTANT.MAX_ADVANCES;
        _this.getParams = {
            similar: true,
            renting_id: null
        };
        _this.handleSubscribeCurrentItem = function (res) {
            switch (res.type) {
                case "space":
                    {
                        // this.checkAndChange(this.allDataList, res);
                        _this.checkAndChange([_this.showData], res);
                        break;
                    }
            }
        };
        _this.oldUser = _this.coreServices.userStorageService.USER;
        _this.initVals();
        _this.doRefresh();
        _this.toggleSubscribeUser(true);
        _this.toggleSubscribeCurrentItem(true);
        return _this;
    }
    // inherit from parent
    HomeDetail.prototype.handleSubscribeUser = function (res) {
        console.log("handleSubscribeUser HomeDetail", res);
        if (this.USER && this.oldUser &&
            (this.oldUser.logined != this.USER.logined)) {
            if (this.USER.logined) {
                this.getDetail();
            }
            else {
                this.resetWhenLogout();
            }
        }
        this.oldUser = this.coreServices.userStorageService.USER;
    };
    HomeDetail.prototype.ionViewCanEnter = function () {
        this.coreServices.anywhereService.toggleTabs('hide');
    };
    ;
    HomeDetail.prototype.initVals = function () {
        this.params = this.navParams.get("params");
        this.getParams.renting_id = this.params.id;
    };
    HomeDetail.prototype.resetWhenLogout = function () {
        this.showData = this.coreServices.anywhereService.unfavouriteHouseLogout(this.showData);
    };
    HomeDetail.prototype.getAllData = function () {
        this.getDetail();
        this.listAllData();
        this.listAllComments();
    };
    HomeDetail.prototype.getDetail = function () {
        var _this = this;
        this._getDetail(CONSTANT.DETAIL_TYPE.LISTINGS, this.params.id, null, function (res) {
            var data = _.cloneDeep(res[CONSTANT.DETAIL_TYPE.SPACE]);
            var temp = _this.commonService.setHouseDetail(data);
            _this.showData = _this.coreServices.anywhereService.addIdToArr([temp.detail])[0];
            console.log("this.showData", _this.showData);
        });
    };
    HomeDetail.prototype.listAllData = function () {
        var _this = this;
        this._listAllData('listAllHouses', null, function (res) {
            console.log("listAllData 2222222222", res);
            _this.allDataList = _this.coreServices.anywhereService.addIdToArr(res.spaces);
        });
    };
    HomeDetail.prototype.listAllComments = function () {
        var _this = this;
        this.increaseProcess();
        var promise = this.coreServices.getService.getComments(this.typeComment, this.params.id);
        return this.handleResultFromServer(promise, false, function (res) {
            _this.listComments = res[CONSTANT.DETAIL_TYPE.COMMENTS];
            console.log("listAllComments", res, _this.listComments);
        });
    };
    HomeDetail.prototype.toggleSubscribeCurrentItem = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
    };
    HomeDetail.prototype.checkAndChange = function (checkArr, newVal) {
        var index = _.findIndex(checkArr, { id: newVal.id });
        if (index > -1) {
            checkArr[index].data = _.cloneDeep(newVal.data);
        }
    };
    HomeDetail.prototype.openDetail = function () {
        if (!this.canGo()) {
            return;
        }
        this.navController.push(ApartmentDetail, {
            params: {
                id: this.showData.data.apartment.id
            },
        });
    };
    HomeDetail.prototype.openAvatar = function () {
        if (!this.canGo()) {
            return;
        }
        this.navController.push(HostProfile, {
            params: {
                id: this.showData.data.renting.user.id
            }
        });
    };
    HomeDetail.prototype.showAllAdvances = function () {
        this.coreServices.anywhereService.showModal(AdvPage, this.showData.data);
    };
    HomeDetail.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
        this.toggleSubscribeCurrentItem(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return HomeDetail;
}(CoreClassGetData));
HomeDetail = __decorate([
    Component({
        selector: 'home-detail',
        templateUrl: 'home-detail.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        CommonService,
        CurrentItemService,
        CoreServices])
], HomeDetail);
export { HomeDetail };
//# sourceMappingURL=home-detail.js.map