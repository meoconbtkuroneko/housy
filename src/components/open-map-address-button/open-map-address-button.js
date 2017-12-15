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
import { Component, Input, } from '@angular/core';
import { ChooseAddress } from '../../pages/choose-address/choose-address';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
var OpenMapAddressButton = (function (_super) {
    __extends(OpenMapAddressButton, _super);
    function OpenMapAddressButton(coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        _this.checkShowNoInternet();
        return _this;
    }
    OpenMapAddressButton.prototype.ngOnChanges = function (changes) {
        console.log("OpenMapAddressButton changes", changes);
        if (this.addressObj && this.addressObj.location) {
            this.mapUrl = this.coreServices.commonService.getMapPictureUrl(this.addressObj.location.lat, this.addressObj.location.lng);
            console.log("this.mapUrl", this.mapUrl);
        }
    };
    OpenMapAddressButton.prototype.handleSubscribeInternet = function () {
        if (this.hasInternet === false) {
            this.checkShowNoInternet();
        }
    };
    OpenMapAddressButton.prototype.handleSubscribeReloadInternet = function () {
        this.checkShowNoInternet();
    };
    OpenMapAddressButton.prototype.checkShowNoInternet = function () {
        this.showNoInternet = this.hasInternet === false;
    };
    OpenMapAddressButton.prototype.openMap = function (e) {
        if (e) {
            e.stopPropagation();
        }
        if (this.isProcessing) {
            return;
        }
        this.toggleIsProcessing(true);
        this.coreServices.anywhereService.showModal(ChooseAddress, this.addressObj);
        this.toggleIsProcessing(false);
    };
    return OpenMapAddressButton;
}(CoreSimpleClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], OpenMapAddressButton.prototype, "addressObj", void 0);
OpenMapAddressButton = __decorate([
    Component({
        selector: "open-map-address-button",
        templateUrl: "./open-map-address-button.html"
    }),
    __metadata("design:paramtypes", [CoreServices])
], OpenMapAddressButton);
export { OpenMapAddressButton };
//# sourceMappingURL=open-map-address-button.js.map