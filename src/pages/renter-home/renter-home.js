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
import { NavController, Events } from 'ionic-angular';
import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';
import { AllHomesPage } from '../all-homes/all-homes';
import { AllApartmentsPage } from '../all-apartments/all-apartments';
import { SearchResultPage } from '../search-result/search-result';
import { CurrentItemService } from '../../services/current-item.service';
import { AnywhereService } from '../../services/anywhere.service';
import { HistoryService } from '../../services/history.service';
import { RecentViewService } from '../../services/recent-view.service';
import { CoreClassSubcribeUser, CoreServices } from '../../templates/core-class';
var RenterHomePage = (function (_super) {
    __extends(RenterHomePage, _super);
    function RenterHomePage(navController, events, currentItemService, anywhereService, historyService, recentViewService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.navController = navController;
        _this.events = events;
        _this.currentItemService = currentItemService;
        _this.anywhereService = anywhereService;
        _this.historyService = historyService;
        _this.recentViewService = recentViewService;
        _this.recentSearchType = CONSTANT.RECENT_SEARCH_TYPE;
        _this.getHouseParams = {
            topRenting: true
        };
        _this.getNewHouseParams = {
            new: true,
            page: 1
        };
        _this.getApartmentParams = {
            topReview: true
        };
        _this.handleSubscribeRecentSearchPlaces = function () {
            _this.recentPlaces = _this.historyService.getRecentSearch();
        };
        _this.handleSubscribeRecentViews = function (res) {
            _this.recentViews = res;
        };
        _this.handleSubscribeCurrentItem = function (res) {
            switch (res.type) {
                case "space":
                    {
                        _this.checkAndChange(_this.listNewHouses, res);
                        _this.checkAndChange(_this.listHouses, res);
                        _this.checkAndChange(_this.recentViews, res);
                        break;
                    }
            }
        };
        _this.setPlaceHolder();
        _this.toggleSubscribeRecentSearchPlaces(true);
        _this.toggleSubscribeRecentViews(true);
        _this.toggleSubscribeCurrentItem(true);
        return _this;
    }
    RenterHomePage.prototype.ionViewCanEnter = function () {
        console.log("ionViewCanEnterionViewCanEnter");
        this.anywhereService.toggleTabs('show');
    };
    RenterHomePage.prototype.getAllData = function () {
        console.log("getAllDatagetAllDatagetAllData");
        this.listAllHouses(this.getHouseParams);
        this.listAllHouses(this.getNewHouseParams);
        this.listAllApartments(this.getApartmentParams);
        this.listHostTop();
    };
    RenterHomePage.prototype.resetWhenDoRefresh = function () { };
    RenterHomePage.prototype.resetWhenLogout = function () {
        _super.prototype.resetWhenLogout.call(this);
        this.listHouses = this.coreServices.anywhereService.unfavouriteHousesArrLogout(this.listHouses);
        this.listNewHouses = this.coreServices.anywhereService.unfavouriteHousesArrLogout(this.listNewHouses);
        this.recentViews = this.coreServices.anywhereService.unfavouriteHousesArrLogout(this.recentViews);
    };
    RenterHomePage.prototype.toggleSubscribeRecentSearchPlaces = function (isSubscibe) {
        if (isSubscibe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.HISTORIES_CHANGED, this.handleSubscribeRecentSearchPlaces);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.HISTORIES_CHANGED, this.handleSubscribeRecentSearchPlaces);
        }
    };
    ;
    RenterHomePage.prototype.toggleSubscribeRecentViews = function (isSubscibe) {
        if (isSubscibe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.RECENT_VIEWS_CHANGED, this.handleSubscribeRecentViews);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.RECENT_VIEWS_CHANGED, this.handleSubscribeRecentViews);
        }
    };
    ;
    RenterHomePage.prototype.toggleSubscribeCurrentItem = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
    };
    RenterHomePage.prototype.checkAndChange = function (checkArr, newVal) {
        var index = _.findIndex(checkArr, { id: newVal.id });
        console.log("checkAndChangecheckAndChange 1111111", index, checkArr, newVal);
        if (index > -1) {
            checkArr[index].data = _.cloneDeep(newVal.data);
            console.log("checkAndChangecheckAndChange 33333333", index, checkArr, newVal);
        }
    };
    RenterHomePage.prototype.setPlaceHolder = function () {
        this.listHouses = this.anywhereService.addIdToArr([CONSTANT.PLACEHOLDER_HOUSE]);
        this.listApartments = this.anywhereService.addIdToArr([CONSTANT.PLACEHOLDER_APARTMENT], 'id');
        this.listNewHouses = this.anywhereService.addIdToArr([
            CONSTANT.PLACEHOLDER_HOUSE,
            CONSTANT.PLACEHOLDER_HOUSE,
            CONSTANT.PLACEHOLDER_HOUSE,
            CONSTANT.PLACEHOLDER_HOUSE,
            CONSTANT.PLACEHOLDER_HOUSE,
        ]);
    };
    RenterHomePage.prototype.listAllHouses = function (params) {
        var _this = this;
        this._listAllData('listAllHouses', params, function (res) {
            // console.log("listAllData 2222222222", res)
            var val = _.cloneDeep(res[CONSTANT.DETAIL_TYPE.SPACES]);
            switch (params) {
                case _this.getHouseParams:
                    {
                        _this.listHouses = _this.anywhereService.addIdToArr(val);
                        break;
                    }
                    ;
                case _this.getNewHouseParams:
                    {
                        _this.listNewHouses = _this.anywhereService.addIdToArr(val);
                        break;
                    }
            }
        });
    };
    ;
    RenterHomePage.prototype.listAllApartments = function (params) {
        var _this = this;
        this._listAllData('listAllApartments', params, function (res) {
            // console.log("listAllData 2222222222", res)
            _this.toggleLoading(false);
            _this.listApartments = _this.anywhereService.addIdToArr(res[CONSTANT.DETAIL_TYPE.APARTMENTS], 'id');
        });
    };
    ;
    RenterHomePage.prototype.listHostTop = function () {
        var _this = this;
        this._listAllData('listHostTop', null, function (res) {
            // console.log("listAllData 2222222222", res)
            _this.listOwners = res[CONSTANT.DETAIL_TYPE.USERS];
        });
    };
    ;
    RenterHomePage.prototype.seeAllHouses = function () {
        this.navController.push(AllHomesPage, {
            params: {
                topRenting: true,
            }
        });
    };
    RenterHomePage.prototype.seeAllNewHouses = function () {
        this.navController.push(AllHomesPage, {
            params: {
                new: true,
            }
        });
    };
    RenterHomePage.prototype.seeAllApartments = function () {
        this.navController.push(AllApartmentsPage);
    };
    RenterHomePage.prototype.goToSearch = function (place) {
        this.historyService.goToSearch(place);
        this.navController.push(SearchResultPage, {
            params: place
        });
    };
    RenterHomePage.prototype.ngOnDestroy = function () {
        this.toggleSubscribeRecentSearchPlaces(false);
        this.toggleSubscribeRecentViews(false);
        this.toggleSubscribeCurrentItem(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return RenterHomePage;
}(CoreClassSubcribeUser));
RenterHomePage = __decorate([
    Component({
        selector: 'page-renter-home',
        templateUrl: 'renter-home.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Events,
        CurrentItemService,
        AnywhereService,
        HistoryService,
        RecentViewService,
        CoreServices])
], RenterHomePage);
export { RenterHomePage };
//# sourceMappingURL=renter-home.js.map