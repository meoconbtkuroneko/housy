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
import { ViewController, NavController } from 'ionic-angular';
import { HousyService } from '../../services/housy.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { NewListingService } from '../../services/new-listing.service';
import { UserStorageService } from '../../services/user-storage.service';
import * as _ from 'lodash';
var NewListingStep3 = (function () {
    function NewListingStep3(anywhereService, housyService, newListingService, viewController, userStorageService, navController) {
        this.anywhereService = anywhereService;
        this.housyService = housyService;
        this.newListingService = newListingService;
        this.viewController = viewController;
        this.userStorageService = userStorageService;
        this.navController = navController;
        this.stringCancel = CONSTANT.STRING_CANCEL;
        this.stringOk = CONSTANT.STRING_SELECT;
        this.formValidation = CONSTANT.FORM_VALIDATION;
    }
    NewListingStep3.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('hide');
    };
    ;
    NewListingStep3.prototype.getNewListingStep3Form = function (data) {
        console.log("getNewListingForm", data);
        this.newListingForm = data.form;
        this.canSend = data.canSend;
    };
    NewListingStep3.prototype.getNewListingAdv = function (data) {
        console.log("getNewListingForm", data);
        this.currentVals = data;
    };
    NewListingStep3.prototype.beforeLeavePage = function () {
        var tempVal = {};
        tempVal = _.assignIn(tempVal, this.newListingForm.value);
        tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_ADV] = JSON.stringify(this.currentVals[CONSTANT.KEY_FILTER.KEY_ADV]);
        tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_AME] = JSON.stringify(this.currentVals[CONSTANT.KEY_FILTER.KEY_AME]);
        tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_RULES] = JSON.stringify(this.currentVals[CONSTANT.KEY_FILTER.KEY_RULES]);
        this.newListingService.setNewListingData(tempVal);
    };
    NewListingStep3.prototype.nextStep = function () {
        var _this = this;
        this.beforeLeavePage();
        console.log("this.newListingForm", this.newListingForm.value, this.newListingForm);
        var phoneObj = CONSTANT.FORM_VALIDATION.PHONE_NUMBER;
        var phoneNumber = this.anywhereService.USER.userInfo[phoneObj.KEY];
        if (!phoneNumber || (phoneNumber.length < phoneObj.MIN)) {
            this.anywhereService.showPrompt(phoneObj.NAME, phoneNumber, function (data) {
                console.log("setPhoneNumbersetPhoneNumber", data);
                return _this.userStorageService.setPhoneNumber(data);
            });
        }
        if (this.canSend) {
            this.doSaveToServer();
        }
        this.navController.popToRoot();
        console.log("this.navController", this.navController);
    };
    NewListingStep3.prototype.doSaveToServer = function () {
        this.newListingService.saveToServer(CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_PENDING);
    };
    NewListingStep3.prototype.previousStep = function () {
        this.beforeLeavePage();
        this.viewController.dismiss();
    };
    return NewListingStep3;
}());
NewListingStep3 = __decorate([
    Component({
        selector: "new-listing-step3",
        templateUrl: "./new-listing-step3.html"
    }),
    __metadata("design:paramtypes", [AnywhereService,
        HousyService,
        NewListingService,
        ViewController,
        UserStorageService,
        NavController])
], NewListingStep3);
export { NewListingStep3 };
//# sourceMappingURL=new-listing-step3.js.map