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
import * as _ from 'lodash';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { CurrentItemService } from '../../services/current-item.service';
import { ItemSpace } from '../../templates/item-space';
import { CoreClassNeedLogin, CoreServices } from '../../templates/core-class';
var FavouritePage = (function (_super) {
    __extends(FavouritePage, _super);
    function FavouritePage(anywhereService, currentItemService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.anywhereService = anywhereService;
        _this.currentItemService = currentItemService;
        _this.getParams = {
            page: _this.currentPage
        };
        _this.itemPerPage = CONSTANT.ITEM_PER_PAGE;
        _this.handleSubscribeCurrentItem = function (res) {
            switch (res.type) {
                case "space":
                    {
                        _this.checkAndChange(_this.allDataList, res);
                        break;
                    }
            }
        };
        _this.toggleSubscribeCurrentItem(true);
        return _this;
    }
    FavouritePage.prototype.ionViewCanEnter = function () {
        console.log("ionViewCanEnter 11111111111");
        this.anywhereService.toggleTabs('show');
    };
    FavouritePage.prototype.ngOnInit = function () {
        this.doRefresh();
    };
    FavouritePage.prototype.handleSubscribeUser = function (res) {
        console.log("handleSubscribeUser FavouritePage", res);
        this.doRefresh();
    };
    FavouritePage.prototype.getAllData = function () {
        this.setGetParams(this.currentPage);
        if (this.USER && this.USER.logined) {
            console.log("doRefresh aaaaaaaaaaaaaaaaaa", this.loading, this.showNoInternet, this.showErrLoad);
            this.listAllData();
        }
    };
    FavouritePage.prototype.listAllData = function (page) {
        var _this = this;
        console.log("listAllDatalistAllData");
        if (page) {
            this.setGetParams(page);
        }
        return this._listAllData('listFavoritesByUser', this.getParams, function (res) {
            console.log("listAllData 2222222222", res);
            var data = _.clone(res[CONSTANT.DETAIL_TYPE.SPACES]);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, _this.coreServices.anywhereService.addIdToArr(data), _.isEqual);
            console.log("this.allDataList", _this.allDataList);
        });
    };
    ;
    FavouritePage.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        this._doLoadMore(infiniteScroll, function () {
            _this.setGetParams(_this.currentPage);
            _this.listAllData();
        });
    };
    ;
    FavouritePage.prototype.setGetParams = function (page) {
        this.getParams.page = page;
    };
    FavouritePage.prototype.toggleSubscribeCurrentItem = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
    };
    // private subscribeCurrentItem() {
    //   this.currentItemService.CURRENT_ITEM
    //     .subscribe(res => {
    //       let rs: any = res;
    //       switch (rs.type) {
    //         case "space":
    //           {
    //             this.checkAndChange(this.allDataList, rs);
    //             break;
    //           }
    //         case "apartment":
    //           {
    //             break;
    //           }
    //       }
    //     })
    // }
    FavouritePage.prototype.getIndexInArr = function (item) {
        return _.findIndex(this.allDataList, { id: item.id });
    };
    FavouritePage.prototype.checkAndChange = function (checkArr, newVal) {
        console.log("checkAndChange arrrrrrrrrrrrrrrrr", checkArr, newVal);
        if (!newVal.data.isFavouriteAdded) {
            if (this.allDataList && this.allDataList.length > 0) {
                var index = this.getIndexInArr(newVal);
                if (index > -1) {
                    var currentPage = _.clone(this.currentPage);
                    this.allDataList.splice(index, 1);
                    console.log("reCalcItemRemove xoaaaaaa", this.allDataList);
                    this.totalItem--;
                    this.checkTotal();
                    // bu dap su thieu hut cua trang hien tai
                    if (this.totalItem >= this.itemPerPage) {
                        var page = (currentPage < this.totalPage) ?
                            currentPage :
                            this.totalPage;
                        console.log("bu dap su thieu hut cua trang hien tai", this.totalPage, page);
                        this.listAllData(page);
                    }
                }
            }
        }
        else {
            var tempNewArr = [new ItemSpace(newVal.id, newVal.data)];
            this.allDataList = _.unionWith(tempNewArr, this.allDataList);
            this.totalItem++;
            this.checkTotal();
            console.log("reCalcItemAdd theemmmmmmm", this.allDataList);
        }
    };
    FavouritePage.prototype.checkTotal = function () {
        var tempVal = _.ceil(this.totalItem / this.itemPerPage);
        if (tempVal !== this.totalPage) {
            this.totalPage = tempVal;
            if (this.currentPage > this.totalPage) {
                this.currentPage = this.totalPage;
                this.setGetParams(this.currentPage);
            }
            ;
            console.log("this.totalPage changeeeeeeeeeeeeee", this.totalPage);
        }
    };
    FavouritePage.prototype.ngOnDestroy = function () {
        this.toggleSubscribeCurrentItem(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return FavouritePage;
}(CoreClassNeedLogin));
FavouritePage = __decorate([
    Component({
        selector: 'favourite-page',
        templateUrl: 'favourite-page.html'
    }),
    __metadata("design:paramtypes", [AnywhereService,
        CurrentItemService,
        CoreServices])
], FavouritePage);
export { FavouritePage };
//# sourceMappingURL=favourite-page.js.map