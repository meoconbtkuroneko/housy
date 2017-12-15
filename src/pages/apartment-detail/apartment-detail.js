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
import { NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { CommonService } from '../../services/common.service';
import { CONSTANT } from '../../services/constant.service';
import { CoreClassNoSubcribeUser, CoreServices } from '../../templates/core-class';
var ApartmentDetail = (function (_super) {
    __extends(ApartmentDetail, _super);
    function ApartmentDetail(navParams, commonService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.navParams = navParams;
        _this.commonService = commonService;
        _this.getParams = {
            page: _this.currentPage,
            type: CONSTANT.DETAIL_TYPE.APARTMENTS,
        };
        _this.params = _this.navParams.get("params");
        return _this;
    }
    ApartmentDetail.prototype.ionViewCanEnter = function () {
        this.coreServices.anywhereService.toggleTabs('hide');
    };
    ;
    // doRefresh(refresher ? ) {
    //   this._doRefresh(refresher, this.getAllData);
    // }
    ApartmentDetail.prototype.getAllData = function () {
        this.getParams.page = this.currentPage;
        this.getParams.id = this.params.id;
        this.getDetail();
        this.listAllData();
    };
    ApartmentDetail.prototype.getDetail = function () {
        var _this = this;
        this._getDetail(CONSTANT.DETAIL_TYPE.APARTMENTS, this.params.id, null, function (res) {
            var temp = _this.commonService.setApartmentDetail(res[CONSTANT.DETAIL_TYPE.APARTMENT]);
            _this.showData = temp.detail;
            console.log("this.showData", _this.showData);
        });
    };
    ApartmentDetail.prototype.listAllData = function () {
        var _this = this;
        console.log("listAllDatalistAllData");
        return this._listAllData('getListReview', this.getParams, function (res) {
            console.log("listAllData 2222222222", res);
            //console.log("this.loading", this.loading);
            var data = _.clone(res.reviews);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, data, _.isEqual);
            console.log("this.allDataList", _this.allDataList);
        });
    };
    ApartmentDetail.prototype.handleNotOK = function () {
        console.log("co van de roiiiiiiii");
        this.allDataList = [];
        this.finishLoading();
    };
    ApartmentDetail.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        this._doLoadMore(infiniteScroll, function () {
            _this.getParams.page = _this.currentPage;
            _this.listAllData();
        });
    };
    ApartmentDetail.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return ApartmentDetail;
}(CoreClassNoSubcribeUser));
ApartmentDetail = __decorate([
    Component({
        selector: 'apartment-detail',
        templateUrl: 'apartment-detail.html'
    }),
    __metadata("design:paramtypes", [NavParams,
        CommonService,
        CoreServices])
], ApartmentDetail);
export { ApartmentDetail };
//# sourceMappingURL=apartment-detail.js.map