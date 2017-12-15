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
import { NavController, ViewController, } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
import { NewListingService } from '../../services/new-listing.service';
import { NewListingStep3 } from '../../pages/new-listing-step3/new-listing-step3';
var NewListingStep2 = (function () {
    function NewListingStep2(anywhereService, navController, newListingService, viewController) {
        this.anywhereService = anywhereService;
        this.navController = navController;
        this.newListingService = newListingService;
        this.viewController = viewController;
    }
    NewListingStep2.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('hide');
    };
    ;
    NewListingStep2.prototype.getNewListingStep2Form = function (data) {
        console.log("getNewListingStep2Form", data);
        this.newListingForm = data.form;
        this.canSendForm = data.canSend;
        this.checkCanSend();
    };
    NewListingStep2.prototype.getNewListingImagePicker = function (data) {
        this.canSendImages = data.canSend;
        this.checkCanSend();
    };
    NewListingStep2.prototype.beforeLeavePage = function () {
        this.newListingService.setNewListingData(this.newListingForm.value);
    };
    NewListingStep2.prototype.nextStep = function () {
        console.log("this.newListingForm", this.canSend, this.newListingForm);
        if (this.canSend) {
            this.beforeLeavePage();
            this.navController.push(NewListingStep3);
        }
    };
    NewListingStep2.prototype.previousStep = function () {
        console.log("this.newListingForm", this.newListingForm.value, this.newListingForm);
        this.beforeLeavePage();
        this.viewController.dismiss();
    };
    NewListingStep2.prototype.checkCanSend = function () {
        if (this.canSendForm &&
            this.canSendImages) {
            this.canSend = true;
        }
        else {
            this.canSend = false;
        }
    };
    return NewListingStep2;
}());
NewListingStep2 = __decorate([
    Component({
        selector: "new-listing-step2",
        templateUrl: "./new-listing-step2.html"
    }),
    __metadata("design:paramtypes", [AnywhereService,
        NavController,
        NewListingService,
        ViewController])
], NewListingStep2);
export { NewListingStep2 };
//# sourceMappingURL=new-listing-step2.js.map