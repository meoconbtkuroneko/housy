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
import * as _ from 'lodash';
import { NavParams, } from 'ionic-angular';
import { CONSTANT } from '../../services/constant.service';
import { CoreServices, CoreClassSubcribeUser } from '../../templates/core-class';
var AllHomesPage = (function (_super) {
    __extends(AllHomesPage, _super);
    function AllHomesPage(coreServices, navParams) {
        var _this = _super.call(this, coreServices) || this;
        _this.navParams = navParams;
        _this.getParams = {
            page: _this.currentPage
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
        _this.initVals();
        _this.toggleSubscribeCurrentItem(true);
        return _this;
    }
    AllHomesPage.prototype.initVals = function () {
        this.params = this.navParams.get("params");
        this.getParams = _.assignIn(this.getParams, this.params);
        if (this.getParams.new) {
            this.title = 'Danh sách nhà mới đăng tin';
        }
        else {
            this.title = 'Danh sách nhà';
        }
    };
    AllHomesPage.prototype.ionViewCanEnter = function () {
        this.coreServices.anywhereService.toggleTabs('show');
    };
    // ionViewDidLoad() {
    //   this.subscribeCurrentItem();
    // }
    AllHomesPage.prototype.getAllData = function () {
        this.getParams.page = this.currentPage;
        this.listAllData();
    };
    // inherit from parent
    AllHomesPage.prototype.resetWhenDoRefresh = function () { };
    AllHomesPage.prototype.setGetParams = function (params) {
        this.getParams = _.assignIn(this.getParams, params);
    };
    AllHomesPage.prototype.listAllData = function () {
        var _this = this;
        console.log("listAllDatalistAllData");
        return this._listAllData('listAllHouses', this.getParams, function (res) {
            console.log("listAllData 2222222222", res);
            //console.log("this.loading", this.loading);
            var data = _.clone(res[CONSTANT.DETAIL_TYPE.SPACES]);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, _this.coreServices.anywhereService.addIdToArr(data), _.isEqual);
            console.log("this.allDataList", _this.allDataList);
        });
    };
    ;
    AllHomesPage.prototype.toggleSubscribeCurrentItem = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
    };
    AllHomesPage.prototype.checkAndChange = function (checkArr, newVal) {
        var index = _.findIndex(checkArr, { id: newVal.id });
        if (index > -1) {
            checkArr[index].data = _.cloneDeep(newVal.data);
        }
    };
    AllHomesPage.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        this._doLoadMore(infiniteScroll, function () {
            _this.getParams.page = _this.currentPage;
            _this.listAllData();
        });
    };
    AllHomesPage.prototype.ngOnDestroy = function () {
        this.toggleSubscribeCurrentItem(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return AllHomesPage;
}(CoreClassSubcribeUser));
AllHomesPage = __decorate([
    Component({
        selector: 'all-homes-page',
        templateUrl: 'all-homes.html'
    }),
    __metadata("design:paramtypes", [CoreServices,
        NavParams])
], AllHomesPage);
export { AllHomesPage };
//# sourceMappingURL=all-homes.js.map