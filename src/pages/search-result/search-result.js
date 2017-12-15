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
import { NavParams, NavController, ViewController, Events, } from 'ionic-angular';
import * as _ from 'lodash';
import { SearchMapPage } from '../../pages/search-map/search-map';
import { CONSTANT } from '../../services/constant.service';
import { FilterData } from '../../templates/filter-data';
import { FilterPage } from '../filter-page/filter-page';
import { CoreClassSubcribeUser, CoreServices } from '../../templates/core-class';
var SearchResultPage = (function (_super) {
    __extends(SearchResultPage, _super);
    function SearchResultPage(coreServices, navParams, navController, viewController, events) {
        var _this = _super.call(this, coreServices) || this;
        _this.navParams = navParams;
        _this.navController = navController;
        _this.viewController = viewController;
        _this.events = events;
        _this.itemPerPage = CONSTANT.ITEM_PER_PAGE;
        _this.handleSubscribeShowMoreClicked = function () {
            _this.waitBroadcastChange = true;
            _this.doLoadMore();
        };
        _this.handleSubscribeCurrentItem = function (res) {
            switch (res.type) {
                case "space":
                    {
                        _this.checkAndChange(_this.allDataList, res);
                        break;
                    }
            }
        };
        _this.handleGetFilterChanged = function (data) {
            if (!_this.coreServices.noInternetService.hasInternet) {
                return;
            }
            _this.currentFilter = _.cloneDeep(data);
            console.log("filterChanged datadatadata", _this.currentFilter);
            _this.setGetParams(_this.currentFilter);
            _this.getParams.page = _this.currentPage;
            _this.doRefresh();
        };
        _this.initVals();
        _this.toggleSubscribeCurrentItem(true);
        return _this;
    }
    SearchResultPage.prototype.initVals = function () {
        this.params = this.navParams.get("params");
        console.log("this.params", this.params);
    };
    SearchResultPage.prototype.ionViewCanEnter = function () {
        this.coreServices.anywhereService.toggleTabs('show');
    };
    SearchResultPage.prototype.ionViewDidLoad = function () {
        this.getFilterChanged();
        this.subscribeShowMoreClicked();
    };
    ;
    SearchResultPage.prototype.checkIsActivePage = function () {
        return this.navController.isActive(this.viewController);
    };
    SearchResultPage.prototype.subscribeShowMoreClicked = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED, this.handleSubscribeShowMoreClicked);
    };
    SearchResultPage.prototype.unsubscribeShowMoreClicked = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED, this.handleSubscribeShowMoreClicked);
    };
    SearchResultPage.prototype.getAllData = function () {
        this.setGetParams();
        this.getParams.page = 1;
        this.listAllData();
    };
    SearchResultPage.prototype.resetWhenDoRefresh = function () { };
    SearchResultPage.prototype.setGetParams = function (params) {
        this.getParams = this.getParams || new FilterData();
        // delete this.getParams.price_from_to;
        this.getParams.center_lat = this.params.location.lat;
        this.getParams.center_lng = this.params.location.lng;
        this.getParams = _.assignIn(this.getParams, params);
        this.getParams.page = this.getParams.page || 1;
        this.getParams.radius = this.getParams.radius || 5000;
        delete this.getParams.priceMin;
        delete this.getParams.priceMax;
        for (var i in this.getParams) {
            if (_.isArray(this.getParams[i])) {
                if (this.getParams[i].length > 0) {
                    this.getParams[i] = this.getParams[i].toString();
                }
                else {
                    delete this.getParams[i];
                }
            }
        }
        if (this.getParams.is_verified) {
            this.getParams.is_verified = 1;
        }
        else {
            delete this.getParams.is_verified;
        }
        if (params) {
            if (params.priceMin || params.priceMin === 0) {
                this.getParams.price_from_to = params.priceMin + ',' + params.priceMax;
            }
            else {
                delete this.getParams.price_from_to;
            }
        }
    };
    SearchResultPage.prototype.listAllData = function () {
        var _this = this;
        console.log("listAllDatalistAllData", this.currentFilter);
        return this._listAllData('listAllHousesAroundLocation', this.getParams, function (res) {
            console.log("listAllData 2222222222 SearchResultPage", res);
            //console.log("this.loading", this.loading);
            var data = _.clone(res[CONSTANT.DETAIL_TYPE.SPACES]);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, _this.coreServices.anywhereService.addIdToArr(data), _.isEqual);
            if (_this.waitBroadcastChange) {
                _this.waitBroadcastChange = false;
                _this.broadcastFinishShowLoadMore();
                _this.broadcastDataListChanged();
            }
            console.log("this.allDataList", _this.allDataList);
        });
    };
    ;
    SearchResultPage.prototype.broadcastDataListChanged = function () {
        this.events.publish(CONSTANT.EVENTS_NAME.HOUSES_CHANGED, {
            listHouses: this.allDataList,
            currentPage: this.currentPage,
            totalPage: this.totalPage,
        });
    };
    SearchResultPage.prototype.broadcastFinishShowLoadMore = function () {
        this.events.publish(CONSTANT.EVENTS_NAME.FINISH_SHOW_LOAD_MORE, true);
    };
    SearchResultPage.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        this._doLoadMore(infiniteScroll, function () {
            _this.setGetParams({ page: _this.currentPage });
            _this.listAllData();
        });
    };
    SearchResultPage.prototype.toggleSubscribeCurrentItem = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
    };
    SearchResultPage.prototype.checkAndChange = function (checkArr, newVal) {
        // console.log("checkAndChange arrrrrrrrrrrrrrrrr", checkArr, newVal);
        var index = this.getIndexInArr(newVal);
        if (index > -1) {
            checkArr[index].data = _.cloneDeep(newVal.data);
        }
    };
    SearchResultPage.prototype.getIndexInArr = function (item) {
        return _.findIndex(this.allDataList, { id: item.id });
    };
    SearchResultPage.prototype.getFilterChanged = function () {
        this.events.subscribe('filterChanged', this.handleGetFilterChanged);
    };
    SearchResultPage.prototype.unsubscribeFilterChanged = function () {
        this.events.unsubscribe('filterChanged', this.handleGetFilterChanged);
    };
    // Mo bo loc
    SearchResultPage.prototype.showFilter = function () {
        this.coreServices.anywhereService.showModal(FilterPage, this.currentFilter);
        // if (this.canGo()) {
        // }
    };
    // mo ban do
    SearchResultPage.prototype.openMap = function () {
        var sendParams = {
            listHouses: this.allDataList,
            currentPage: this.currentPage,
            totalPage: this.totalPage,
            center: {
                lat: this.params.location.lat,
                lng: this.params.location.lng,
            },
            radius: parseInt(this.getParams.radius) || 5000,
        };
        console.log("sendParamssendParams", sendParams);
        this.navController.push(SearchMapPage, {
            params: sendParams
        });
        // if (this.canGo()) {
        // }
    };
    SearchResultPage.prototype.ngOnDestroy = function () {
        this.unsubscribeShowMoreClicked();
        this.unsubscribeFilterChanged();
        this.toggleSubscribeCurrentItem(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return SearchResultPage;
}(CoreClassSubcribeUser));
SearchResultPage = __decorate([
    Component({
        selector: 'search-result',
        templateUrl: 'search-result.html'
    }),
    __metadata("design:paramtypes", [CoreServices,
        NavParams,
        NavController,
        ViewController,
        Events])
], SearchResultPage);
export { SearchResultPage };
//# sourceMappingURL=search-result.js.map