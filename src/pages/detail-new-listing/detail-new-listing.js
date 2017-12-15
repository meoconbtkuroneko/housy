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
import { NavController, NavParams, } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
import { NewListingService } from '../../services/new-listing.service';
import { CONSTANT } from '../../services/constant.service';
import { ChooseAddress } from '../../pages/choose-address/choose-address';
import { UserStorageService } from '../../services/user-storage.service';
import { GetService } from '../../services/get.service';
import * as _ from 'lodash';
var DetailNewListing = (function () {
    function DetailNewListing(anywhereService, navController, newListingService, getService, userStorageService, navParams) {
        this.anywhereService = anywhereService;
        this.navController = navController;
        this.newListingService = newListingService;
        this.getService = getService;
        this.userStorageService = userStorageService;
        this.navParams = navParams;
        this.loading = true;
        this.stringCancel = CONSTANT.STRING_CANCEL;
        this.stringOk = CONSTANT.STRING_SELECT;
        this.KEY_ADV = CONSTANT.KEY_FILTER.KEY_ADV;
        this.KEY_AME = CONSTANT.KEY_FILTER.KEY_AME;
        this.KEY_RULES = CONSTANT.KEY_FILTER.KEY_RULES;
    }
    DetailNewListing.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('hide');
    };
    ;
    DetailNewListing.prototype.ngOnInit = function () {
        this.resetNewListingService();
        this.params = this.navParams.get('params');
        this.getDetail();
    };
    DetailNewListing.prototype.resetNewListingService = function () {
        this.newListingService.clearNewListingData();
    };
    DetailNewListing.prototype.getDetail = function () {
        var _this = this;
        this.getService.getHouseDetail(this.params.id)
            .then(function (res) {
            if (res.reason === CONSTANT.REASONS.ER_OK) {
                _this.newListingService.setNewListingData(res.space);
                console.log("this.dataaaaaaaaaaaaaaa", _this.newListingService.NEW_LISTING_DATA);
                _this.finishLoading();
            }
            else {
                _this.handleNotOK();
            }
        }, function (err) {
            _this.handleErr(err);
        });
    };
    DetailNewListing.prototype.finishLoading = function () {
        if (this.refresher) {
            this.refresher.complete();
            this.refresher = undefined;
        }
        this.loading = undefined;
    };
    DetailNewListing.prototype.handleNotOK = function () {
        console.log("co van de roiiiiiiii");
        this.finishLoading();
    };
    DetailNewListing.prototype.handleErr = function (err) {
        console.log("loi roi nhe", err);
        this.finishLoading();
    };
    DetailNewListing.prototype.getNewListingStep1Form = function (data) {
        console.log("getNewListingStep1Form", data);
        this.newListingForm1 = data.form;
        this.canSendForm1 = data.canSend;
        this.checkCanSend();
    };
    DetailNewListing.prototype.getNewListingStep2Form = function (data) {
        console.log("getNewListingStep2Form", data);
        this.newListingForm2 = data.form;
        this.canSendForm2 = data.canSend;
        this.checkCanSend();
    };
    DetailNewListing.prototype.getNewListingImagePicker = function (data) {
        console.log("getNewListingImagePicker", data);
        this.canSendImages = data.canSend;
        this.checkCanSend();
    };
    DetailNewListing.prototype.getNewListingStep3Form = function (data) {
        console.log("getNewListingStep3Form", data);
        this.newListingForm3 = data.form;
        this.canSendForm3 = data.canSend;
        this.checkCanSend();
    };
    DetailNewListing.prototype.getNewListingAdv = function (data) {
        console.log("getNewListingAdv", data);
        this.currentVals = data;
    };
    DetailNewListing.prototype.checkCanSend = function () {
        if (this.canSendForm1 &&
            this.canSendForm2 &&
            this.canSendForm3 &&
            this.canSendImages) {
            this.canSend = true;
        }
        else {
            this.canSend = false;
        }
    };
    DetailNewListing.prototype.beforeLeavePage = function () {
        this.newListingService.setNewListingData(this.newListingForm1.value);
        this.newListingService.setNewListingData(this.newListingForm2.value);
        this.beforeLeavePage3();
    };
    DetailNewListing.prototype.beforeLeavePage3 = function () {
        var tempVal = {};
        tempVal = _.assignIn(tempVal, this.newListingForm3.value);
        tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_ADV] = JSON.stringify(this.currentVals[CONSTANT.KEY_FILTER.KEY_ADV]);
        tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_AME] = JSON.stringify(this.currentVals[CONSTANT.KEY_FILTER.KEY_AME]);
        tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_RULES] = JSON.stringify(this.currentVals[CONSTANT.KEY_FILTER.KEY_RULES]);
        this.newListingService.setNewListingData(tempVal);
    };
    DetailNewListing.prototype.nextStep = function () {
        var _this = this;
        this.beforeLeavePage();
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
    };
    DetailNewListing.prototype.doSaveToServer = function () {
        this.newListingService.saveToServer(CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_PENDING);
    };
    DetailNewListing.prototype.openMap = function () {
        this.navController.push(ChooseAddress);
    };
    return DetailNewListing;
}());
DetailNewListing = __decorate([
    Component({
        selector: "detail-new-listing",
        templateUrl: "./detail-new-listing.html"
    }),
    __metadata("design:paramtypes", [AnywhereService,
        NavController,
        NewListingService,
        GetService,
        UserStorageService,
        NavParams])
], DetailNewListing);
export { DetailNewListing };
//# sourceMappingURL=detail-new-listing.js.map