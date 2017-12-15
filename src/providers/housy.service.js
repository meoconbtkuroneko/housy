var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, } from '@angular/core';
import * as _ from 'lodash';
import { CONSTANT } from './constant.service';
import { AllSelectionsService } from './backend.service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
var HousyService = (function () {
    function HousyService(allSelectionsService, storage, events) {
        this.allSelectionsService = allSelectionsService;
        this.storage = storage;
        this.events = events;
        this.key = 'HOUSY_DATA';
    }
    ;
    HousyService.prototype.startupServices = function () {
        var _this = this;
        return this.getHousyData().then(function (res) {
            if (!_.isEmpty(res)) {
                _this.broadcastHousyDataChange(res);
            }
            else {
                _this.getHousyDataOnline()
                    .then(function (res) {
                    _this.setHousyData(res).then(function (res) {
                        _this.broadcastHousyDataChange(res);
                        return res;
                    });
                });
            }
            return res;
        });
    };
    HousyService.prototype.setHousyData = function (val) {
        return this.storage.set(this.key, val);
    };
    HousyService.prototype.broadcastHousyDataChange = function (data) {
        this.HOUSY_DATA = _.cloneDeep(data);
        this.events.publish(CONSTANT.EVENTS_NAME.HOUSY_SERVICE_CHANGED, data);
    };
    HousyService.prototype.getHousyData = function () {
        return this.storage.get(this.key);
    };
    HousyService.prototype.getProp = function (propName) {
        return this.HOUSY_DATA[propName];
    };
    HousyService.prototype.getHousyDataOnline = function () {
        var _this = this;
        this.indexData = [{
                id: CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES,
                func: this.allSelectionsService.getAllHomeTypes(),
            }, {
                id: CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES,
                func: this.allSelectionsService.getAllAdvantages(),
            }, {
                id: CONSTANT.SERVER.TYPE_QUERY.AMENITIES,
                func: this.allSelectionsService.getAllAmenities(),
            }, {
                id: CONSTANT.SERVER.TYPE_QUERY.RULES,
                func: this.allSelectionsService.getAllRules(),
            }, {
                id: CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS,
                func: this.allSelectionsService.getAllSpacePositions(),
            }, {
                id: CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME,
                func: this.allSelectionsService.getAllDepositTypes(),
            }, {
                id: CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE,
                func: this.allSelectionsService.getAllContractTypes(),
            }];
        var promises = [];
        for (var i in this.indexData) {
            promises.push(this.indexData[i].func);
        }
        ;
        var rs = {};
        rs = this.createStaticVals();
        return Promise.all(promises)
            .then(function (res) {
            var val;
            for (var i in res) {
                val = res[i];
                var propName = _this.indexData[i].id;
                if (val.reason === CONSTANT.REASONS.ER_OK) {
                    rs[propName] = val[propName];
                    switch (propName) {
                        case CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES:
                        case CONSTANT.SERVER.TYPE_QUERY.AMENITIES:
                        case CONSTANT.SERVER.TYPE_QUERY.RULES:
                            {
                                rs[propName] = _this.setSelectingAndUrl(val[propName]);
                                break;
                            }
                    }
                }
                else {
                    rs[propName] = [];
                }
            }
            return rs;
        }, function (err) {
            var rs = {};
            for (var i in _this.indexData) {
                var propName = _this.indexData[i].id;
                rs[propName] = [];
            }
            return rs;
        });
        // StaticValueService.getAll();
    };
    HousyService.prototype.setSelectingAndUrl = function (arr) {
        for (var i in arr) {
            arr[i].selecting = false;
            if (arr[i].url) {
                arr[i].url = CONSTANT.ICON_PATH + arr[i].url;
            }
        }
        return arr;
    };
    // Tao thanh 1 mang cac gia tri tu fromVal den toVal,
    // voi id va mo ta descriptionStrBefore va descriptionStrAfter
    HousyService.prototype.createArray = function (fromVal, toVal, descriptionStrBefore, descriptionStrAfter) {
        var arr = [];
        for (var i = fromVal; i <= toVal; i++) {
            descriptionStrBefore = descriptionStrBefore || '';
            descriptionStrAfter = descriptionStrAfter || '';
            arr.push({
                id: i,
                description: descriptionStrBefore + ' ' + i + ' ' + descriptionStrAfter,
            });
        }
        return arr;
    };
    ;
    HousyService.prototype.createStaticVals = function () {
        var objRs = {};
        objRs.maxRenters = this.createArray(1, 30, null, 'người');
        objRs.allBathrooms = this.createArray(1, 30, null, 'phòng');
        objRs.allBedrooms = this.createArray(1, 30, null, 'phòng');
        objRs.maxFloors = this.createArray(1, 150, null, 'tầng');
        return objRs;
    };
    return HousyService;
}());
HousyService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AllSelectionsService,
        Storage,
        Events])
], HousyService);
export { HousyService };
//# sourceMappingURL=housy.service.js.map