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
import { Validators, FormBuilder, } from '@angular/forms';
import { HousyService } from '../../services/housy.service';
import { FormService } from '../../services/form.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { NewListingService } from '../../services/new-listing.service';
import * as _ from 'lodash';
var PartNewListingStep2 = (function () {
    function PartNewListingStep2(anywhereService, housyService, formBuilder, formService, newListingService) {
        this.anywhereService = anywhereService;
        this.housyService = housyService;
        this.formBuilder = formBuilder;
        this.formService = formService;
        this.newListingService = newListingService;
        this.getNewListingForm = new EventEmitter();
        this.stringCancel = CONSTANT.STRING_CANCEL;
        this.stringOk = CONSTANT.STRING_SELECT;
        this.placeholder = {
            area: CONSTANT.INFO.AREA,
            width: CONSTANT.INFO.WIDTH,
            height: CONSTANT.INFO.HEIGHT,
            price: CONSTANT.INFO.PRICE,
        };
        this.formValidation = CONSTANT.FORM_VALIDATION;
    }
    PartNewListingStep2.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('hide');
    };
    ;
    PartNewListingStep2.prototype.ngOnInit = function () {
        console.log("ngOnInit");
        this.initVals();
        this.buildForm();
    };
    PartNewListingStep2.prototype.buildForm = function () {
        var _this = this;
        this.newListingForm = this.formBuilder.group({
            max_renters: [this.showData.max_renters || this.rentersArr[9].id],
            number_of_bedroom: [this.showData.number_of_bedroom || this.bedRoomsArr[1].id],
            number_of_bathroom: [this.showData.number_of_bathroom || this.bathroomsArr[1].id],
            floor: [this.showData.floor || this.floorsArr[1].id],
            area: [this.showData.area || 0,
                Validators.compose([
                    Validators.required,
                    this.formService.minAreaValue
                ])
            ],
            height: [this.showData.height || 0,
                this.formService.minHeightValue
            ],
            width: [this.showData.width || 0,
                this.formService.minWidthValue
            ],
            renting_fee: [(this.showData.renting && this.showData.renting.renting_fee) ||
                    this.showData.renting_fee || 0,
                Validators.compose([
                    Validators.required,
                    this.formService.minPriceValue
                ])
            ],
            policy_renting_time_id: [this.showData.policy_renting_time_id || this.showData.policy_renting_time_id],
            policy_deposit_time_id: [this.showData.policy_deposit_time_id || this.showData.policy_deposit_time_id],
        });
        this.newListingForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    PartNewListingStep2.prototype.onValueChanged = function (data) {
        this.checkCanSend();
        this.broadcastValue();
    };
    PartNewListingStep2.prototype.initVals = function () {
        this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
        console.log("this.showData 22222222", this.showData);
        this.rentersArr = _.cloneDeep(this.housyService.HOUSY_DATA.maxRenters);
        this.bedRoomsArr = _.cloneDeep(this.housyService.HOUSY_DATA.allBedrooms);
        this.bathroomsArr = _.cloneDeep(this.housyService.HOUSY_DATA.allBathrooms);
        this.floorsArr = _.cloneDeep(this.housyService.HOUSY_DATA.maxFloors);
        this.contractTypesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE]);
        this.depositeTypesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME]);
    };
    PartNewListingStep2.prototype.showPrompt = function (e, type) {
        var _this = this;
        var currentType = type.toLowerCase();
        console.log("typeeeeeeeeeeeeeeeeee", type);
        var initVal = this.newListingForm.value[currentType];
        this.anywhereService.showPrompt(type, initVal, function (data) {
            _this.handleShowPrompt(type, data);
        });
    };
    PartNewListingStep2.prototype.handleShowPrompt = function (type, data) {
        var currentType = type.toLowerCase();
        var tempFormVals = _.cloneDeep(this.newListingForm.value);
        tempFormVals[currentType] = data;
        this.newListingForm.setValue(tempFormVals);
        console.log("dataaaaaaaaaaaaaaaaa", data, this.newListingForm);
    };
    PartNewListingStep2.prototype.checkCanSend = function () {
        if (this.newListingForm &&
            this.newListingForm.valid) {
            this.canSend = true;
        }
        else {
            this.canSend = false;
        }
    };
    PartNewListingStep2.prototype.broadcastValue = function () {
        this.getNewListingForm.emit({
            form: this.newListingForm,
            canSend: this.canSend
        });
    };
    return PartNewListingStep2;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], PartNewListingStep2.prototype, "getNewListingForm", void 0);
PartNewListingStep2 = __decorate([
    Component({
        selector: "part-new-listing-step2",
        templateUrl: "./part-new-listing-step2.html"
    }),
    __metadata("design:paramtypes", [AnywhereService,
        HousyService,
        FormBuilder,
        FormService,
        NewListingService])
], PartNewListingStep2);
export { PartNewListingStep2 };
//# sourceMappingURL=part-new-listing-step2.js.map