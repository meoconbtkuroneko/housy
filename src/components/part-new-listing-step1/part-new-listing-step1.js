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
import { Validators, FormBuilder } from '@angular/forms';
import { HousyService } from '../../services/housy.service';
import { AllSelectionsService } from '../../services/backend.service';
import { CONSTANT } from '../../services/constant.service';
import { NewListingService } from '../../services/new-listing.service';
import { HistorySearch } from '../../templates/history-search';
import { Events } from 'ionic-angular';
import * as _ from 'lodash';
var PartNewListingStep1 = (function () {
    function PartNewListingStep1(housyService, formBuilder, allSelectionsService, newListingService, events) {
        var _this = this;
        this.housyService = housyService;
        this.formBuilder = formBuilder;
        this.allSelectionsService = allSelectionsService;
        this.newListingService = newListingService;
        this.events = events;
        this.getNewListingForm = new EventEmitter();
        this.stringCancel = CONSTANT.STRING_CANCEL;
        this.stringOk = CONSTANT.STRING_SELECT;
        this._handleSubscribeSelectAddress = function (res) {
            console.log("_handleSubscribeSelectAddress", res);
            _this.addressObj = res;
            var tempVals = _.cloneDeep(_this.newListingForm.value);
            tempVals.address = _this.addressObj.name;
            tempVals.latitude = _this.addressObj.location.lat;
            tempVals.longitude = _this.addressObj.location.lng;
            _this.newListingForm.setValue(tempVals);
            console.log("this.newListingForm", _this.newListingForm);
            _this.broadcastValue();
        };
        this.toggleSubscribeSelectAddress(true);
    }
    PartNewListingStep1.prototype.ngOnInit = function () {
        this.initVals();
        this.buildForm();
    };
    PartNewListingStep1.prototype.buildForm = function () {
        var _this = this;
        this.newListingForm = this.formBuilder.group({
            home_type_id: [this.showData.home_type_id || this.homeTypesArr[1].id,
                Validators.required,
            ],
            space_position_id: [this.showData.space_position_id || this.positionsArr[0].id, [
                    Validators.required,
                ]],
            neighborhood_id: [this.showData.neighborhood_id || 0],
            apartment_id: [this.showData.apartment_id || 0],
            address: [this.showData.address, Validators.required,],
            latitude: [this.showData.latitude, Validators.required,],
            longitude: [this.showData.longitude, Validators.required,]
        });
        console.log("00000000000000000", this.newListingForm.value);
        this.newListingForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    PartNewListingStep1.prototype.onValueChanged = function (data) {
        this.checkCanSend();
        this.broadcastValue();
    };
    PartNewListingStep1.prototype.checkCanSend = function () {
        if (this.newListingForm &&
            this.newListingForm.valid) {
            this.canSend = true;
        }
        else {
            this.canSend = false;
        }
    };
    PartNewListingStep1.prototype.broadcastValue = function () {
        this.getNewListingForm.emit({
            form: this.newListingForm,
            canSend: this.canSend
        });
    };
    PartNewListingStep1.prototype.initVals = function () {
        var _this = this;
        this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
        this.homeTypesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES]);
        this.positionsArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS]);
        this.allSelectionsService.getAllNeighborhoods()
            .then(function (res) {
            if (res.reason === CONSTANT.REASONS.ER_OK) {
                _this.neighborhoodsArr = res[CONSTANT.SERVER.TYPE_QUERY.NEIGHBORHOODS];
            }
        });
        this.allSelectionsService.getAllApartments()
            .then(function (res) {
            if (res.reason === CONSTANT.REASONS.ER_OK) {
                _this.apartmentsArr = res[CONSTANT.SERVER.TYPE_QUERY.APARTMENTS];
            }
        });
        if (this.showData.address &&
            this.showData.latitude &&
            this.showData.longitude) {
            this.addressObj = new HistorySearch(this.showData.address, this.showData.latitude, this.showData.longitude);
        }
    };
    PartNewListingStep1.prototype.toggleSubscribeSelectAddress = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.SELECT_ADDRESS, this._handleSubscribeSelectAddress);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.SELECT_ADDRESS, this._handleSubscribeSelectAddress);
        }
    };
    PartNewListingStep1.prototype.ngOnDestroy = function () {
        this.toggleSubscribeSelectAddress(false);
    };
    return PartNewListingStep1;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], PartNewListingStep1.prototype, "getNewListingForm", void 0);
PartNewListingStep1 = __decorate([
    Component({
        selector: "part-new-listing-step1",
        templateUrl: "./part-new-listing-step1.html"
    }),
    __metadata("design:paramtypes", [HousyService,
        FormBuilder,
        AllSelectionsService,
        NewListingService,
        Events])
], PartNewListingStep1);
export { PartNewListingStep1 };
//# sourceMappingURL=part-new-listing-step1.js.map