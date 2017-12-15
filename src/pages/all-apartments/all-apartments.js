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
import { CONSTANT } from '../../services/constant.service';
import { CoreClassNoSubcribeUser, CoreServices } from '../../templates/core-class';
var AllApartmentsPage = (function (_super) {
    __extends(AllApartmentsPage, _super);
    function AllApartmentsPage(coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.getParams = {
            page: _this.currentPage
        };
        return _this;
    }
    AllApartmentsPage.prototype.ionViewCanEnter = function () {
        this.coreServices.anywhereService.toggleTabs('show');
    };
    // doRefresh(refresher ? ) {
    //   this._doRefresh(refresher, () => {
    //     this.getParams.page = this.currentPage;
    //     this.listAllData();
    //   })
    // }
    AllApartmentsPage.prototype.getAllData = function () {
        this.getParams.page = this.currentPage;
        this.listAllData();
    };
    AllApartmentsPage.prototype.listAllData = function () {
        var _this = this;
        console.log("listAllDatalistAllData");
        return this._listAllData('listAllApartments', this.getParams, function (res) {
            console.log("listAllData 2222222222", res);
            //console.log("this.loading", this.loading);
            var data = _.clone(res[CONSTANT.DETAIL_TYPE.APARTMENTS]);
            _this.allDataList = _this.allDataList || [];
            _this.allDataList = _.unionWith(_this.allDataList, _this.coreServices.anywhereService.addIdToArr(data, 'id'), _.isEqual);
            console.log("this.allDataList", _this.allDataList);
        });
    };
    ;
    AllApartmentsPage.prototype.doLoadMore = function (infiniteScroll) {
        var _this = this;
        this._doLoadMore(infiniteScroll, function () {
            _this.getParams.page = _this.currentPage;
            _this.listAllData();
        });
    };
    AllApartmentsPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return AllApartmentsPage;
}(CoreClassNoSubcribeUser));
AllApartmentsPage = __decorate([
    Component({
        selector: 'all-apartments-page',
        templateUrl: 'all-apartments.html'
    }),
    __metadata("design:paramtypes", [CoreServices])
], AllApartmentsPage);
export { AllApartmentsPage };
//# sourceMappingURL=all-apartments.js.map