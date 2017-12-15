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
import { NavParams, Events, } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
import * as _ from 'lodash';
import { CoreClassNoSubcribeUser, CoreServices } from '../../templates/core-class';
var NeighborhoodDetail = (function (_super) {
    __extends(NeighborhoodDetail, _super);
    function NeighborhoodDetail(navParams, commonService, anywhereService, events, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.navParams = navParams;
        _this.commonService = commonService;
        _this.anywhereService = anywhereService;
        _this.events = events;
        _this.typeComment = CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_NEIGHBORHOOD.name;
        _this.getParams = {
            page: _this.currentPage,
            type: CONSTANT.DETAIL_TYPE.NEIGHBORHOODS,
        };
        _this.handleSubscribeShowMoreClicked = function () {
            if (!_this.canGo()) {
                console.log("doiiiiiiiiiiiiiiiiiiiiiiii", _this.isProcessing, _this.loading, _this.hasInternet);
                return;
            }
            console.log("zooooooooooooooooooooooooo");
            _this.doLoadMore();
        };
        _this.params = _this.navParams.get("params");
        _this.getParams.id = _this.params.id;
        return _this;
    }
    NeighborhoodDetail.prototype.getAllData = function () {
        this.getDetail();
        this.listAllData();
        this.listAllComments();
    };
    // doRefresh(refresher ? ) {
    //   this._doRefresh(refresher, () => {
    //     this.getDetail();
    //     this.listAllData();
    //     this.listAllComments();
    //   })
    // }
    NeighborhoodDetail.prototype.getDetail = function () {
        var _this = this;
        this._getDetail(CONSTANT.DETAIL_TYPE.NEIGHBORHOODS, this.params.id, null, function (res) {
            var temp = _this.commonService.setApartmentDetail(res[CONSTANT.DETAIL_TYPE.NEIGHBORHOOD]);
            _this.showData = temp.detail;
            console.log("this.showData", _this.showData);
        });
    };
    NeighborhoodDetail.prototype.listAllData = function () {
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
    NeighborhoodDetail.prototype.listAllComments = function () {
        var _this = this;
        this.increaseProcess();
        var promise = this.coreServices.getService.getComments(this.typeComment, this.params.id);
        return this.handleResultFromServer(promise, false, function (res) {
            _this.listComments = res[CONSTANT.DETAIL_TYPE.COMMENTS];
            console.log("listAllComments", res, _this.listComments);
        });
    };
    NeighborhoodDetail.prototype.ionViewDidEnter = function () {
        this.subscribeShowMoreClicked();
    };
    NeighborhoodDetail.prototype.ionViewWillLeave = function () {
        this.unsubscribeShowMoreClicked();
    };
    NeighborhoodDetail.prototype.subscribeShowMoreClicked = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED, this.handleSubscribeShowMoreClicked);
    };
    NeighborhoodDetail.prototype.unsubscribeShowMoreClicked = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED, this.handleSubscribeShowMoreClicked);
    };
    NeighborhoodDetail.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        console.log("doLoadMoredoLoadMoredoLoadMoredoLoadMore", this.totalPage, this.currentPage);
        this._doLoadMore(infiniteScroll, function () {
            _this.toggleIsProcessing(true);
            _this.getParams.page = _this.currentPage;
            _this.listAllData();
        });
    };
    NeighborhoodDetail.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return NeighborhoodDetail;
}(CoreClassNoSubcribeUser));
NeighborhoodDetail = __decorate([
    Component({
        selector: 'neighborhood-detail',
        templateUrl: 'neighborhood-detail.html'
    }),
    __metadata("design:paramtypes", [NavParams,
        CommonService,
        AnywhereService,
        Events,
        CoreServices])
], NeighborhoodDetail);
export { NeighborhoodDetail };
//# sourceMappingURL=neighborhood-detail.js.map