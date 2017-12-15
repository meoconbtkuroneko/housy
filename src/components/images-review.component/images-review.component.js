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
import { ModalController, } from 'ionic-angular';
import { CONSTANT } from '../../services/constant.service';
import { GalleryImages } from '../gallery-images/gallery-images';
import * as _ from 'lodash';
var ImagesReviewComponent = (function () {
    function ImagesReviewComponent(modalCtrl) {
        this.modalCtrl = modalCtrl;
        this.fetchedImages = [];
        this.pictureReviewClass = "";
    }
    ImagesReviewComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (propName === 'reviewImages') {
                this.syncSetType();
            }
        }
    };
    /**/
    ImagesReviewComponent.prototype.syncSetType = function () {
        if (this.reviewImages.length <= 1) {
            this.pictureReviewClass = 'full';
        }
        else if (this.reviewImages.length == 2) {
            this.pictureReviewClass = 'half-full';
        }
        else {
            this.pictureReviewClass = 'imgs-review-content';
        }
        this.typeUrl;
        if (_.isUndefined(this.reviewImages) || this.reviewImages == 0) {
            this.reviewImages = [{ url: CONSTANT.IMAGE.PREFIX_IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE }];
        }
        else {
            for (var i = 0; i < this.reviewImages.length; i++) {
                var url = this.reviewImages[i].url || this.reviewImages[i];
                if (url.indexOf('space') != -1) {
                    this.typeUrl = 'space';
                }
                else if (url.indexOf('apartment') != -1) {
                    this.typeUrl = 'apartment';
                }
                else if (url.indexOf('neighborhood') != -1) {
                    this.typeUrl = 'neighborhood';
                }
                else if (url.indexOf('user') != -1) {
                    this.typeUrl = 'user';
                }
                else if (url.indexOf('review') != -1) {
                    this.typeUrl = 'review';
                }
                else {
                    this.typeUrl = 'new';
                }
                this.fetchedImages.push({
                    type: this.typeUrl,
                    fetched: true,
                    url: url
                });
            }
            this.numImages = this.fetchedImages.length || 1;
        }
    };
    // ---------------gallery--------------
    ImagesReviewComponent.prototype.showGallery = function (index) {
        var galleryModal = this.modalCtrl.create(GalleryImages, {
            params: {
                galleryData: this.fetchedImages,
                index: index,
                type: this.typeUrl,
            }
        });
        galleryModal.present();
    };
    return ImagesReviewComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImagesReviewComponent.prototype, "reviewImages", void 0);
ImagesReviewComponent = __decorate([
    Component({
        selector: 'images-review',
        templateUrl: './images-review.component.html'
    }),
    __metadata("design:paramtypes", [ModalController])
], ImagesReviewComponent);
export { ImagesReviewComponent };
//# sourceMappingURL=images-review.component.js.map