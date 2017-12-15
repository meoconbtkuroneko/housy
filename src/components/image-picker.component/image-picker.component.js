var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, Input, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { ImagePickerService } from '../../services/image-picker.service';
import { CONSTANT } from '../../services/constant.service';
var DEFAULT_OPTIONS = {
    SHOW_SLIDER: true,
    CLOSE_ON_SELECT: false,
    SHOW_REQUIRED: true,
    MAX_IMAGES: 10,
};
var ImagePickerComponent = (function () {
    function ImagePickerComponent(ImagePickerService) {
        this.ImagePickerService = ImagePickerService;
        this.defaultOpts = _.clone(DEFAULT_OPTIONS);
        this.images = [];
        this.returnImages = new EventEmitter();
    }
    ImagePickerComponent.prototype.capturePhoto = function () {
        var _this = this;
        this.ImagePickerService.capturePhoto(function (arrayImagesUrl) {
            _this.handleCallBackImages(arrayImagesUrl);
        });
    };
    ImagePickerComponent.prototype.ngOnInit = function () {
        this.addImages(this.currentImages);
        this.defaultOpts = _.assignIn(this.options);
    };
    ImagePickerComponent.prototype.selectImages = function () {
        var _this = this;
        var maxImages = this.defaultOpts.MAX_IMAGES;
        this.ImagePickerService.selImages(maxImages, function (arrayImagesUrl) {
            _this.handleCallBackImages(arrayImagesUrl);
        });
    };
    ImagePickerComponent.prototype.handleCallBackImages = function (arrayImagesUrl) {
        var data = {};
        data[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD] = arrayImagesUrl;
        this.addImages(arrayImagesUrl);
        data[CONSTANT.KEY_IMAGES.KEY_CURRENT_IMAGES] = this.images;
        data[CONSTANT.KEY_IMAGES.KEY_IS_FINISHED] = this.defaultOpts.CLOSE_ON_SELECT;
        this.giveBackToParent(data);
    };
    ;
    ImagePickerComponent.prototype.giveBackToParent = function (data) {
        this.returnImages.emit(data);
    };
    ImagePickerComponent.prototype.addImages = function (newImagesArr) {
        if (newImagesArr && newImagesArr.length > 0) {
            this.images = _.union(newImagesArr, this.images);
        }
    };
    ImagePickerComponent.prototype.deleteImage = function (urlRemove) {
        var rsImage;
        var removeObj;
        var index = this.images.indexOf(urlRemove);
        if (index > -1) {
            this.images = this.ImagePickerService.removeImage(this.images, urlRemove);
            rsImage = urlRemove;
        }
        else {
            removeObj = _.find(this.images, { url: urlRemove });
            if (removeObj) {
                this.images = this.ImagePickerService.removeImage(this.images, removeObj);
                rsImage = removeObj.id;
            }
        }
        var data = {};
        data[CONSTANT.KEY_IMAGES.KEY_HAS_DELETE_IMAGES] = removeObj ? true : false;
        data[CONSTANT.KEY_IMAGES.KEY_CURRENT_IMAGES] = this.images;
        data[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID] = removeObj || urlRemove;
        this.giveBackToParent(data);
    };
    return ImagePickerComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImagePickerComponent.prototype, "currentImages", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImagePickerComponent.prototype, "options", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ImagePickerComponent.prototype, "returnImages", void 0);
ImagePickerComponent = __decorate([
    Component({
        selector: 'image-picker',
        templateUrl: './image-picker.component.html',
    }),
    __metadata("design:paramtypes", [ImagePickerService])
], ImagePickerComponent);
export { ImagePickerComponent };
//# sourceMappingURL=image-picker.component.js.map