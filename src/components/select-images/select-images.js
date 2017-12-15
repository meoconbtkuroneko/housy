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
import { ViewController, Platform } from 'ionic-angular';
import { CONSTANT } from '../../services/constant.service';
var SelectImages = (function () {
    function SelectImages(viewController, 
        // k duoc xoa vi xai ngoai template
        platform) {
        this.viewController = viewController;
        this.platform = platform;
        this.title = CONSTANT.TITLE_HOUSY;
        this.subTitle = CONSTANT.SELECT_IMAGES.PLACEHOLDER;
    }
    SelectImages.prototype.getImages = function (images) {
        this.currentImages = images[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD][0];
        if (images[CONSTANT.KEY_IMAGES.KEY_IS_FINISHED]) {
            this.closeModal();
        }
    };
    SelectImages.prototype.closeModal = function () {
        this.viewController.dismiss(this.currentImages);
    };
    return SelectImages;
}());
SelectImages = __decorate([
    Component({
        selector: 'select-images',
        templateUrl: 'select-images.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        Platform])
], SelectImages);
export { SelectImages };
//# sourceMappingURL=select-images.js.map