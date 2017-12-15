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
import { ViewController, NavParams, Events } from 'ionic-angular';
import { HousyService } from '../../services/housy.service';
import { CONSTANT } from '../../services/constant.service';
import { FilterData } from '../../templates/filter-data';
import * as _ from 'lodash';
var FilterPage = (function () {
    function FilterPage(viewController, housyService, navParams, events) {
        this.viewController = viewController;
        this.housyService = housyService;
        this.navParams = navParams;
        this.events = events;
        this.radiusArr = CONSTANT.RADIUS_ARR;
        this.priceArr = CONSTANT.PRICE_ARRAY;
        this.KEY_HT = CONSTANT.KEY_FILTER.KEY_HT;
        this.KEY_ADV = CONSTANT.KEY_FILTER.KEY_ADV;
        this.KEY_AME = CONSTANT.KEY_FILTER.KEY_AME;
        this.KEY_PRICE = CONSTANT.KEY_FILTER.KEY_PRICE;
        this.baseFilter = new FilterData();
        this.baseFilter[CONSTANT.KEY_FILTER.KEY_RADIUS] += "";
    }
    FilterPage.prototype.initVals = function (applyCurrentFilter) {
        this.homeTypeArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES]);
        this.advantagesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES]);
        this.amenitiesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.AMENITIES]);
        this.currentFilter = this.navParams.get('params');
        this.oldFilter = this.navParams.get('params') || _.cloneDeep(this.baseFilter);
        this.currentPriceId = undefined;
        if (this.currentFilter && applyCurrentFilter) {
            this.filter = new FilterData(this.currentFilter);
            console.log("this.filterthis.filter", this.filter, this.currentFilter);
            this.homeTypeArr = this.applySelecting(this.homeTypeArr, this.filter[this.KEY_HT]);
            this.advantagesArr = this.applySelecting(this.advantagesArr, this.filter[this.KEY_ADV]);
            this.amenitiesArr = this.applySelecting(this.amenitiesArr, this.filter[this.KEY_AME]);
            this.currentPriceId = this.getPriceId(this.filter[CONSTANT.KEY_FILTER.KEY_PRICE_MIN], this.filter[CONSTANT.KEY_FILTER.KEY_PRICE_MAX]);
        }
        else {
            this.filter = new FilterData();
            this.filter[CONSTANT.KEY_FILTER.KEY_RADIUS] += "";
        }
    };
    FilterPage.prototype.getPriceId = function (priceMin, priceMax) {
        console.log("getPriceId", priceMin, priceMax);
        var tempVal = _.find(this.priceArr, {
            minVal: priceMin,
            maxVal: priceMax
        });
        console.log("getPriceId tempVal", tempVal);
        if (tempVal) {
            return tempVal.id;
        }
    };
    // kiem tra xem gia tri trong valArrs co ton tai trong arr thi arr.selecting = true;
    FilterPage.prototype.applySelecting = function (arr, valArrs) {
        arr = arr || [];
        if (_.isArray(valArrs) && valArrs.length > 0) {
            var tempVal = void 0;
            var index = void 0;
            for (var i in valArrs) {
                tempVal = valArrs[i];
                index = _.findIndex(arr, {
                    id: parseInt(tempVal)
                });
                if (index > -1 && arr[index]) {
                    arr[index].selecting = true;
                }
            }
        }
        return arr;
    };
    FilterPage.prototype.ngOnInit = function () {
        this.initVals(true);
    };
    FilterPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    FilterPage.prototype.doFilter = function () {
        console.log("doFilterdoFilter", this.filter, this.oldFilter, this.filter === this.oldFilter);
        if (this.hasFilterChanged()) {
            this.events.publish('filterChanged', this.filter);
        }
        this.closeModal();
    };
    FilterPage.prototype.hasFilterChanged = function () {
        var found = false;
        for (var i in this.oldFilter) {
            if (_.isArray(this.oldFilter[i])) {
                var tmpS = _.join(this.oldFilter[i].sort(), '');
                var tmpS2 = _.join(this.filter[i].sort(), '');
                if (tmpS != tmpS2) {
                    found = true;
                    break;
                }
            }
            else {
                found = !(this.oldFilter[i] == this.filter[i]);
                if (found)
                    break;
            }
        }
        return found;
    };
    FilterPage.prototype.hasChange = function (e, type, item) {
        if (type === this.KEY_PRICE) {
            this.filter[CONSTANT.KEY_FILTER.KEY_PRICE_MIN] = item.minVal;
            this.filter[CONSTANT.KEY_FILTER.KEY_PRICE_MAX] = item.maxVal;
        }
        else {
            this.filter[type] = this.addOrRemove(this.filter[type], item);
        }
    };
    FilterPage.prototype.addOrRemove = function (arr, item) {
        arr = arr || [];
        var index = this.checkExist(arr, item);
        if (!index && index !== 0) {
            arr.push(item.id + '');
        }
        else {
            arr.splice(index, 1);
        }
        return arr;
    };
    FilterPage.prototype.checkExist = function (arr, item) {
        if (_.isArray(arr)) {
            var index = arr.indexOf(item.id + '');
            if (index > -1) {
                return index;
            }
        }
        return false;
    };
    FilterPage.prototype.resetFilter = function () {
        this.initVals();
    };
    return FilterPage;
}());
FilterPage = __decorate([
    Component({
        selector: 'filter-page',
        templateUrl: './filter-page.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        HousyService,
        NavParams,
        Events])
], FilterPage);
export { FilterPage };
//# sourceMappingURL=filter-page.js.map