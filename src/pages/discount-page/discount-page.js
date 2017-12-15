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
import { ViewController, } from 'ionic-angular';
import { PostService } from '../../services/post.service';
import { CONSTANT } from '../../services/constant.service';
import { MapService } from '../../services/map.service';
import { CoreServices, CoreClassNoSubcribeUser } from '../../templates/core-class';
import * as _ from 'lodash';
var DiscountPage = (function (_super) {
    __extends(DiscountPage, _super);
    function DiscountPage(viewController, coreServices, postService, mapService) {
        var _this = _super.call(this, coreServices) || this;
        _this.viewController = viewController;
        _this.postService = postService;
        _this.mapService = mapService;
        _this.getParams = {
            location: _this.coreServices.anywhereService.currentLocation,
            page: _this.currentPage
        };
        _this.currentId = _this.coreServices.anywhereService.USER.userInfo.id;
        _this.discountStatus = CONSTANT.SERVER.DISCOUNT_STATUS;
        _this.currentLocationObj = {};
        return _this;
    }
    ;
    // doRefresh(refresher ? ) {
    //   this._doRefresh(refresher, () => {
    //     this.getCurrentPosition();
    //   })
    // }
    DiscountPage.prototype.getAllData = function () {
        this.getCurrentPosition();
    };
    DiscountPage.prototype.getCurrentPosition = function () {
        var _this = this;
        this.mapService.init(function (pos) {
            if (pos && pos.lat && pos.lng) {
                _this.errGetCurrentLocation = undefined;
                _this.currentLocationObj.location = _this.coreServices.anywhereService.currentLocation;
                _this.mapService.convertFromLatLngToAddress(pos.lat, pos.lng)
                    .subscribe(function (res) {
                    var currentPlace = res[0];
                    _this.currentLocationObj.formatted_address = currentPlace.formatted_address;
                });
                _this.setGetParams();
                _this.listAllData();
            }
            else {
                _this.handleErrCurrentLocation();
            }
        });
    };
    DiscountPage.prototype.handleErrCurrentLocation = function () {
        this.errGetCurrentLocation = true;
        this.currentErrType = CONSTANT.ERR_TYPE.CURRENT_LOCATION;
        // this.coreServices.anywhereService.showAlert(CONSTANT.MAP.POSITION_UNAVAILABLE);
    };
    DiscountPage.prototype.setGetParams = function (page) {
        this.getParams.location = this.currentLocationObj.location;
        if (page) {
            this.getParams.page = page;
        }
    };
    DiscountPage.prototype.listAllData = function () {
        var _this = this;
        console.log("listAllDatalistAllData");
        return this._listAllData('getDiscount', this.getParams, function (res) {
            console.log("listAllData 2222222222", res);
            var data = _.cloneDeep(res[CONSTANT.DETAIL_TYPE.SPACES]);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, _this.coreServices.anywhereService.addIdToArr(data), _.isEqual);
            console.log("this.allDataList", _this.allDataList);
        });
    };
    ;
    DiscountPage.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        this._doLoadMore(infiniteScroll, function () {
            _this.getParams.page = _this.currentPage;
            _this.listAllData();
        });
    };
    DiscountPage.prototype.getDiscount = function (e, id) {
        var _this = this;
        e.stopPropagation();
        if (!this.canGo()) {
            return;
        }
        console.log('getDiscountgetDiscount', e, id);
        this.toggleIsProcessing(true);
        this.postService.getDiscount(id)
            .then(function (res) {
            console.log(" getDiscount ressssssssssssssssssssss", res);
            if (res.reason == CONSTANT.REASONS.ER_OK) {
                var index = _.findIndex(_this.allDataList, { id: id });
                console.log("aaaaaaaaaaaaaaaaaaaaa", index);
                if (index > -1) {
                    if (!_this.allDataList[index].data.renting.request_user) {
                        _this.allDataList[index].data.renting.request_user = {
                            id: _this.currentId,
                        };
                    }
                    _this.allDataList[index].data.renting.discount_status =
                        _this.discountStatus.WAIT_TO_DISCOUNT;
                    console.log("bbbbbbbbbbbbbbbbb", _this.allDataList, _this.discountStatus);
                }
                _this.finishLoading();
            }
            else {
                _this.showToast(res.reason);
            }
        }, function (err) {
            _this.handleShowErr(CONSTANT.ERR_GENERAL);
        });
    };
    DiscountPage.prototype.handleShowErr = function (reason) {
        this.showToast(reason);
    };
    DiscountPage.prototype.showToast = function (message) {
        this.finishLoading();
        this.coreServices.anywhereService.showToast(message);
    };
    DiscountPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    DiscountPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return DiscountPage;
}(CoreClassNoSubcribeUser));
DiscountPage = __decorate([
    Component({
        selector: 'discount-page',
        templateUrl: 'discount-page.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        CoreServices,
        PostService,
        MapService])
], DiscountPage);
export { DiscountPage };
//# sourceMappingURL=discount-page.js.map