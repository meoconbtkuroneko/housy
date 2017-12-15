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
import { NavController, ViewController, } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { NewListingService } from '../../services/new-listing.service';
import * as _ from 'lodash';
var PartNewListingImagePicker = (function () {
    function PartNewListingImagePicker(anywhereService, navController, newListingService, viewController) {
        this.anywhereService = anywhereService;
        this.navController = navController;
        this.newListingService = newListingService;
        this.viewController = viewController;
        this.getNewListingImage = new EventEmitter();
        this.minImages = 1;
    }
    PartNewListingImagePicker.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('hide');
    };
    ;
    PartNewListingImagePicker.prototype.ngOnInit = function () {
        console.log("ngOnInit");
        this.initVals();
    };
    PartNewListingImagePicker.prototype.initVals = function () {
        this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
        console.log("this.showData 22222222", this.showData);
        this.imagesArr = this.imagesArr || this.showData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES] || [];
        this.checkCanSend();
        this.broadcastValue();
    };
    PartNewListingImagePicker.prototype.getImages = function (images) {
        this.imagesArr = _.cloneDeep(CONSTANT.KEY_IMAGES.KEY_CURRENT_IMAGES);
        if (images.hasOwnProperty(CONSTANT.KEY_IMAGES.KEY_HAS_DELETE_IMAGES)) {
            this.checkSpaceImagesToDelete(images);
        }
        else {
            this.imagesToUpload = _.union(images[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD], this.imagesToUpload);
        }
        console.log("imagesimages", this.imagesArr);
        this.updataNewListingData();
        this.checkCanSend();
        this.broadcastValue();
    };
    PartNewListingImagePicker.prototype.checkSpaceImagesToDelete = function (objImageData) {
        console.log("checkSpaceImagesToDelete objImageData", objImageData);
        var currentHasDeleteImage = objImageData[CONSTANT.KEY_IMAGES.KEY_HAS_DELETE_IMAGES];
        if (currentHasDeleteImage) {
            var tempObjImage = objImageData[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID];
            this.deleteImageIdArr = this.deleteImageIdArr || [];
            this.deleteImageIdArr.push(tempObjImage.id);
        }
        this.removeFromUpload(objImageData);
        console.log("deleteImageIdArr", this.deleteImageIdArr);
    };
    PartNewListingImagePicker.prototype.removeFromUpload = function (removeUrl) {
        if (this.imagesToUpload) {
            this.imagesToUpload = _.without(this.imagesToUpload, removeUrl);
        }
    };
    PartNewListingImagePicker.prototype.updataNewListingData = function () {
        var tempVal = {};
        tempVal.imagesArr = this.imagesArr;
        tempVal[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID] = this.deleteImageIdArr;
        tempVal[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD] = this.imagesToUpload;
        this.newListingService.setNewListingData(tempVal);
    };
    PartNewListingImagePicker.prototype.checkCanSend = function () {
        if (this.imagesArr && this.imagesArr.length > this.minImages) {
            this.canSend = true;
        }
        else {
            this.canSend = false;
        }
    };
    PartNewListingImagePicker.prototype.broadcastValue = function () {
        this.getNewListingImage.emit({
            canSend: this.canSend
        });
    };
    return PartNewListingImagePicker;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], PartNewListingImagePicker.prototype, "getNewListingImage", void 0);
PartNewListingImagePicker = __decorate([
    Component({
        selector: "part-new-listing-image-picker",
        templateUrl: "./part-new-listing-image-picker.html"
    }),
    __metadata("design:paramtypes", [AnywhereService,
        NavController,
        NewListingService,
        ViewController])
], PartNewListingImagePicker);
export { PartNewListingImagePicker };
//# sourceMappingURL=part-new-listing-image-picker.js.map