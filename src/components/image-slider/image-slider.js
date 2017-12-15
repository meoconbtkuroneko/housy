var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, EventEmitter, Output, } from '@angular/core';
import { Slides, ModalController, ViewController } from 'ionic-angular';
import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';
import { GalleryImages } from '../gallery-images/gallery-images';
var DEFAULT_OPTIONS = {
    PRICE_SHOWN: false,
    PAGENUM_SHOWN: false,
    FAVOURITE_SHOWN: false,
    VERIFY_SHOWN: true,
    AUTO_PLAY: false,
    SHOW_GALLERY: true,
    REMOVE_IMAGE_SHOW: false
};
var ImageSlider = (function () {
    function ImageSlider(modalCtrl, viewCtrl) {
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.removeImageIndex = new EventEmitter();
        this.fetchedImages = [];
        this.defaultOpts = DEFAULT_OPTIONS;
        this.updateSlideImages = function (data) {
            _.assignIn(this.defaultOpts, this.options);
            this.fetchedImages = [];
            this.syncSetType();
        };
    }
    ImageSlider.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (propName === 'sliderData') {
                var dataChange = changes['sliderData'].currentValue;
                console.log("CHANGEEEEEEEEEEE this.sliderData: ", dataChange);
                this.updateSlideImages(dataChange);
            }
        }
    };
    ImageSlider.prototype.ngOnInit = function () {
        this.updateSlideImages(this.sliderData);
    };
    ImageSlider.prototype.ionSlideDidChange = function () {
        var currentSlidesLength = this.slides.length();
        this.currentIndex = this.slides.getActiveIndex();
        if (this.currentIndex > currentSlidesLength) {
            this.currentIndex--;
        }
        if (this.slides.getActiveIndex() == currentSlidesLength) {
            this.slides.slideTo(currentSlidesLength - 1);
        }
        this.currentImageShown = this.currentIndex + 1;
    };
    /**/
    ImageSlider.prototype.syncSetType = function () {
        var _this = this;
        var typeUrl;
        if (_.isUndefined(this.sliderData) || this.sliderData == 0) {
            this.sliderData = [{ url: CONSTANT.IMAGE.PREFIX_IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE }];
        }
        else {
            for (var i = 0; i < this.sliderData.length; i++) {
                var url = this.sliderData[i].url || this.sliderData[i];
                if (url.indexOf('space') != -1) {
                    typeUrl = 'space';
                }
                else if (url.indexOf('apartment') != -1) {
                    typeUrl = 'apartment';
                }
                else if (url.indexOf('neighborhood') != -1) {
                    typeUrl = 'neighborhood';
                }
                else if (url.indexOf('user') != -1) {
                    typeUrl = 'user';
                }
                else if (url.indexOf('review') != -1) {
                    typeUrl = 'review';
                }
                else {
                    typeUrl = 'new';
                }
                this.type = typeUrl;
                this.fetchedImages.push({
                    type: typeUrl,
                    fetched: true,
                    url: url
                });
            }
            this.numImages = this.fetchedImages.length || 1;
            console.log(">>>>>>>>>>>>>>>>> this.numImages: ", this.numImages);
            setTimeout(function () {
                _this.ionSlideDidChange();
                _this.slides.update();
            }, 500);
        }
    };
    // ---------------gallery--------------
    ImageSlider.prototype.showGallery = function () {
        var galleryModal = this.modalCtrl.create(GalleryImages, {
            params: {
                galleryData: this.fetchedImages,
                index: this.currentImageShown - 1,
                type: this.type,
            }
        });
        galleryModal.present();
    };
    /*---------Remove Image-------------*/
    ImageSlider.prototype.removeImageButtonClicked = function () {
        var imgRemove = this.fetchedImages[this.currentIndex];
        console.log(">>>>>currentIndex>>>>>>>>>>>> removeImageButtonClicked: ", this.currentIndex);
        this.removeImageIndex.emit(imgRemove.url);
    };
    return ImageSlider;
}());
__decorate([
    ViewChild(Slides),
    __metadata("design:type", Slides)
], ImageSlider.prototype, "slides", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageSlider.prototype, "sliderData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageSlider.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageSlider.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageSlider.prototype, "moreInfo", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ImageSlider.prototype, "removeImageIndex", void 0);
ImageSlider = __decorate([
    Component({
        selector: 'image-slider',
        templateUrl: './image-slider.html'
    }),
    __metadata("design:paramtypes", [ModalController,
        ViewController])
], ImageSlider);
export { ImageSlider };
//# sourceMappingURL=image-slider.js.map