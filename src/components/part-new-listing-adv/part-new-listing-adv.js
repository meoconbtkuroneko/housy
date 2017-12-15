var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { ViewController, } from 'ionic-angular';
import { HousyService } from '../../services/housy.service';
import { CONSTANT } from '../../services/constant.service';
import { NewListingService } from '../../services/new-listing.service';
import * as _ from 'lodash';
var PartNewListingAdv = (function () {
    function PartNewListingAdv(housyService, newListingService, viewController) {
        this.housyService = housyService;
        this.newListingService = newListingService;
        this.viewController = viewController;
        this.getNewListingForm = new EventEmitter();
        this.KEY_ADV = CONSTANT.KEY_FILTER.KEY_ADV;
        this.KEY_AME = CONSTANT.KEY_FILTER.KEY_AME;
        this.KEY_RULES = CONSTANT.KEY_FILTER.KEY_RULES;
    }
    PartNewListingAdv.prototype.ngOnInit = function () {
        this.initVals();
    };
    PartNewListingAdv.prototype.broadcastValue = function () {
        this.getNewListingForm.emit(this.currentVals);
    };
    PartNewListingAdv.prototype.initVals = function () {
        this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
        console.log("this.showData 333333333", this.showData);
        this.currentVals = {
            advantages: this.getArrFromJSON(this.showData[CONSTANT.KEY_FILTER.KEY_SPACE_ADV]),
            amenities: this.getArrFromJSON(this.showData[CONSTANT.KEY_FILTER.KEY_SPACE_AME]),
            limitations: this.getArrFromJSON(this.showData[CONSTANT.KEY_FILTER.KEY_SPACE_RULES]),
        };
        this.amenitiesArr = this.applySelecting(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.AMENITIES], this.currentVals[CONSTANT.SERVER.TYPE_QUERY.AMENITIES]);
        this.advantagesArr = this.applySelecting(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES], this.currentVals[CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES]);
        this.rulesArr = this.applySelecting(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.RULES], this.currentVals[CONSTANT.SERVER.TYPE_QUERY.RULES]);
        this.broadcastValue();
    };
    // kiem tra xem gia tri trong valArrs co ton tai trong arr thi arr.selecting = true;
    PartNewListingAdv.prototype.applySelecting = function (arr, valArrs) {
        valArrs = this.getArrFromJSON(valArrs);
        arr = _.cloneDeep(arr) || [];
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
    // nhan vao mot chuoi json va chuyen thanh mang
    PartNewListingAdv.prototype.getArrFromJSON = function (jsonStr) {
        var jsonString = _.clone(jsonStr);
        var val = [];
        if (jsonString) {
            if (_.isArray(jsonString)) {
                return jsonString;
            }
            try {
                val = JSON.parse(jsonString) || [];
            }
            catch (e) { }
        }
        console.log("valvalvalvalvalval", val);
        return val;
    };
    PartNewListingAdv.prototype.hasChange = function (e, type, item) {
        this.currentVals[type] = this.addOrRemove(this.currentVals[type], item);
        this.broadcastValue();
    };
    PartNewListingAdv.prototype.addOrRemove = function (arr, item) {
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
    PartNewListingAdv.prototype.checkExist = function (arr, item) {
        if (_.isArray(arr)) {
            var index = arr.indexOf(item.id + '');
            if (index > -1) {
                return index;
            }
        }
        return false;
    };
    return PartNewListingAdv;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], PartNewListingAdv.prototype, "getNewListingForm", void 0);
PartNewListingAdv = __decorate([
    Component({
        selector: "part-new-listing-adv",
        templateUrl: "./part-new-listing-adv.html"
    }),
    __metadata("design:paramtypes", [HousyService,
        NewListingService,
        ViewController])
], PartNewListingAdv);
export { PartNewListingAdv };
//# sourceMappingURL=part-new-listing-adv.js.map