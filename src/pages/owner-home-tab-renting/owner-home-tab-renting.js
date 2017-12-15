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
import { Component, ViewChild, } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';
import { ItemSpace } from '../../templates/item-space';
import { CoreClassNoSubcribeUser, CoreServices } from '../../templates/core-class';
var OwnerHomeTabRenting = (function (_super) {
    __extends(OwnerHomeTabRenting, _super);
    function OwnerHomeTabRenting(navController, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.navController = navController;
        _this.itemPerPage = CONSTANT.ITEM_PER_PAGE;
        _this.getParams = {
            page: 1,
            status: CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_RENTING
        };
        _this._handleSubscribeCurrentItem = function (res) {
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
    OwnerHomeTabRenting.prototype.ionViewCanEnter = function () {
        this.coreServices.anywhereService.toggleTabs('show');
        this.content && this.content.resize();
    };
    OwnerHomeTabRenting.prototype.getAllData = function () {
        this.getParams.page = this.currentPage;
        this.listAllData();
    };
    OwnerHomeTabRenting.prototype.listAllData = function (page) {
        var _this = this;
        console.log("listAllDatalistAllData");
        if (page) {
            this.setGetParams(page);
        }
        return this._listAllData('listAllHousesByUser', this.getParams, function (res) {
            console.log("listAllData 2222222222", res);
            //console.log("this.loading", this.loading);
            var data = _.clone(res[CONSTANT.DETAIL_TYPE.SPACES]);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, _this.coreServices.anywhereService.addIdToArr(data), _.isEqual);
            console.log("this.allDataList", _this.allDataList);
        });
    };
    ;
    OwnerHomeTabRenting.prototype.setGetParams = function (page) {
        this.getParams.page = page;
    };
    OwnerHomeTabRenting.prototype.toggleSubscribeCurrentItem = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this._handleSubscribeCurrentItem);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this._handleSubscribeCurrentItem);
        }
    };
    OwnerHomeTabRenting.prototype.checkAndChange = function (checkArr, newVal) {
        console.log("checkAndChange arrrrrrrrrrrrrrrrr", checkArr, newVal);
        if (newVal.isUpdating) {
            return this.checkUpdateHouse(checkArr, newVal);
        }
        if (newVal.isDelete) {
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
    };
    OwnerHomeTabRenting.prototype.checkUpdateHouse = function (checkArr, newVal) {
        var index = _.findIndex(checkArr, { id: newVal.id });
        if (index > -1) {
            return checkArr[index] = _.cloneDeep(newVal);
        }
        else {
            var tempNewArr = [new ItemSpace(newVal.id, newVal.data)];
            this.allDataList = _.unionWith(tempNewArr, this.allDataList);
            this.totalItem++;
            this.checkTotal();
            console.log("reCalcItemAdd theemmmmmmm", this.allDataList);
        }
    };
    OwnerHomeTabRenting.prototype.checkTotal = function () {
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
    OwnerHomeTabRenting.prototype.getIndexInArr = function (item) {
        return _.findIndex(this.allDataList, { id: item.id });
    };
    OwnerHomeTabRenting.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        this._doLoadMore(infiniteScroll, function () {
            _this.getParams.page = _this.currentPage;
            _this.listAllData();
        });
    };
    OwnerHomeTabRenting.prototype.ngOnDestroy = function () {
        this.toggleSubscribeCurrentItem(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return OwnerHomeTabRenting;
}(CoreClassNoSubcribeUser));
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], OwnerHomeTabRenting.prototype, "content", void 0);
OwnerHomeTabRenting = __decorate([
    Component({
        selector: 'owner-home-tab-renting',
        templateUrl: 'owner-home-tab-renting.html'
    }),
    __metadata("design:paramtypes", [NavController,
        CoreServices])
], OwnerHomeTabRenting);
export { OwnerHomeTabRenting };
//# sourceMappingURL=owner-home-tab-renting.js.map