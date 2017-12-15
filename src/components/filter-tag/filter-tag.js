var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { CONSTANT } from '../../services/constant.service';
import { HousyService } from '../../services/housy.service';
import { CommonService } from '../../services/common.service';
import * as _ from 'lodash';
var FilterTag = (function () {
    function FilterTag(housyService, commonService) {
        this.housyService = housyService;
        this.commonService = commonService;
        this.showData = [];
    }
    FilterTag.prototype.addIdsArrToShowData = function (type, idsArr) {
        var currentArr = this.commonService.idsToObjs(type, idsArr, 'name');
        this.showData = _.union(this.showData, currentArr);
    };
    FilterTag.prototype.addIdToShowData = function (type, id) {
        var arr;
        var propName = 'id';
        switch (type) {
            case CONSTANT.KEY_FILTER.KEY_PRICE_MIN:
                {
                    arr = _.cloneDeep(CONSTANT.PRICE_ARRAY);
                    propName = 'minVal';
                    break;
                }
            case CONSTANT.KEY_FILTER.KEY_RADIUS:
                {
                    arr = _.cloneDeep(CONSTANT.RADIUS_ARR);
                    break;
                }
        }
        id = parseInt(id);
        var currentObj = _.find(arr, function (obj) {
            return obj[propName] === id;
        });
        if (currentObj) {
            this.showData = _.union(this.showData, [currentObj.name]);
        }
    };
    FilterTag.prototype.ngOnChanges = function (changes) {
        this.showData = [];
        var rs;
        var val;
        for (var key in this.currentFilter) {
            rs = undefined;
            val = this.currentFilter[key];
            switch (key) {
                case CONSTANT.KEY_FILTER.KEY_HT:
                case CONSTANT.KEY_FILTER.KEY_ADV:
                case CONSTANT.KEY_FILTER.KEY_AME:
                    {
                        this.addIdsArrToShowData(key, val);
                        break;
                    }
                case CONSTANT.KEY_FILTER.KEY_PRICE_MIN:
                case CONSTANT.KEY_FILTER.KEY_RADIUS:
                    {
                        this.addIdToShowData(key, val);
                        break;
                    }
                case CONSTANT.KEY_FILTER.KEY_IS_VERIFIED:
                    {
                        if (val) {
                            rs = 'Xác thực';
                        }
                        break;
                    }
            }
            if (rs) {
                this.showData = _.union(this.showData, [rs]);
            }
        }
        if (this.showData.length === 1 &&
            this.showData[0] === CONSTANT.RADIUS_ARR[0].name) {
            this.showData = [];
        }
    };
    return FilterTag;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], FilterTag.prototype, "currentFilter", void 0);
FilterTag = __decorate([
    Component({
        selector: 'filter-tag',
        templateUrl: './filter-tag.html'
    }),
    __metadata("design:paramtypes", [HousyService,
        CommonService])
], FilterTag);
export { FilterTag };
//# sourceMappingURL=filter-tag.js.map