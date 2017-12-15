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
import { NewListingStep1 } from '../../pages/new-listing-step1/new-listing-step1';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
var NewListingButton = (function (_super) {
    __extends(NewListingButton, _super);
    function NewListingButton(coreServices, navController) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        _this.navController = navController;
        _this.checkShowNoInternet();
        setTimeout(function () {
            _this.newButtonClicked();
        }, 1000);
        return _this;
    }
    NewListingButton.prototype.handleSubscribeInternet = function () {
        if (this.hasInternet === false) {
            this.checkShowNoInternet();
        }
    };
    NewListingButton.prototype.handleSubscribeReloadInternet = function () {
        this.checkShowNoInternet();
    };
    NewListingButton.prototype.checkShowNoInternet = function () {
        this.showNoInternet = this.hasInternet === false;
    };
    NewListingButton.prototype.newButtonClicked = function (e) {
        if (e) {
            e.stopPropagation();
        }
        if (this.isProcessing) {
            return;
        }
        this.toggleIsProcessing(true);
        this.navController.push(NewListingStep1);
        this.toggleIsProcessing(false);
    };
    return NewListingButton;
}(CoreSimpleClass));
NewListingButton = __decorate([
    Component({
        selector: "new-listing-button",
        templateUrl: "./new-listing-button.html"
    }),
    __metadata("design:paramtypes", [CoreServices,
        NavController])
], NewListingButton);
export { NewListingButton };
//# sourceMappingURL=new-listing-button.js.map