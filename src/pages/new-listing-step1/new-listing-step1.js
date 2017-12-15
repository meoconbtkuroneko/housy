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
import { Component, } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
import { NewListingService } from '../../services/new-listing.service';
import { NewListingStep2 } from '../../pages/new-listing-step2/new-listing-step2';
import { CONSTANT } from '../../services/constant.service';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
var NewListingStep1 = (function (_super) {
    __extends(NewListingStep1, _super);
    function NewListingStep1(anywhereService, navController, newListingService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.anywhereService = anywhereService;
        _this.navController = navController;
        _this.newListingService = newListingService;
        _this.coreServices = coreServices;
        return _this;
    }
    NewListingStep1.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('hide');
    };
    ;
    NewListingStep1.prototype.ngOnInit = function () {
        this.resetNewListingService();
    };
    NewListingStep1.prototype.resetNewListingService = function () {
        this.newListingService.clearNewListingData();
    };
    NewListingStep1.prototype.getNewListingStep1Form = function (data) {
        console.log("getNewListingForm", data);
        this.newListingForm = data.form;
        this.canSend = data.canSend;
    };
    NewListingStep1.prototype.nextStep = function () {
        var _this = this;
        if (this.isProcessing) {
            return;
        }
        this.toggleIsProcessing(true);
        if (this.canSend) {
            this.beforeLeavePage();
            console.log("rentinggggggggggggg idddddddddddd", this.rentingId);
            if (!this.rentingId) {
                this.newListingService.newHouse()
                    .then(function (res) {
                    if (res && res.renting) {
                        _this.rentingId = res.renting.id;
                        _this.handleFinishSave();
                    }
                    else {
                        _this.handleErr(CONSTANT.ERR_GENERAL);
                    }
                }, function (err) {
                    _this.handleErr(CONSTANT.ERR_GENERAL);
                });
            }
            else {
                this.handleFinishSave();
            }
        }
    };
    NewListingStep1.prototype.handleErr = function (err) {
        console.log("handleErrhandleErrhandleErr", err);
        this.anywhereService.showAlert(err);
    };
    NewListingStep1.prototype.beforeLeavePage = function () {
        this.newListingService.setNewListingData(this.newListingForm.value);
    };
    NewListingStep1.prototype.handleFinishSave = function () {
        this.toggleIsProcessing(false);
        this.navController.push(NewListingStep2);
    };
    return NewListingStep1;
}(CoreSimpleClass));
NewListingStep1 = __decorate([
    Component({
        selector: "new-listing-step1",
        templateUrl: "./new-listing-step1.html"
    }),
    __metadata("design:paramtypes", [AnywhereService,
        NavController,
        NewListingService,
        CoreServices])
], NewListingStep1);
export { NewListingStep1 };
//# sourceMappingURL=new-listing-step1.js.map