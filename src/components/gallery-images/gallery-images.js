var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController, Slides } from 'ionic-angular';
var GalleryImages = (function () {
    function GalleryImages(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    GalleryImages.prototype.ngOnInit = function () {
        this.params = this.navParams.get('params');
        this.galleryData = this.params.galleryData;
        this.type = this.params.type;
        this.currentImageShown = this.params.index + 1;
        this.numImages = this.galleryData && this.galleryData.length || 1;
    };
    GalleryImages.prototype.closeGallery = function () {
        this.viewCtrl.dismiss();
    };
    GalleryImages.prototype.ionSlideDidChange = function () {
        var currentIndex = this.slides.getActiveIndex();
        if (currentIndex < this.numImages) {
            this.currentImageShown = currentIndex + 1;
        }
    };
    return GalleryImages;
}());
__decorate([
    ViewChild(Slides),
    __metadata("design:type", Slides)
], GalleryImages.prototype, "slides", void 0);
GalleryImages = __decorate([
    Component({
        selector: "gallery-images",
        templateUrl: "./gallery-images.html"
    }),
    __metadata("design:paramtypes", [NavParams,
        ViewController])
], GalleryImages);
export { GalleryImages };
//# sourceMappingURL=gallery-images.js.map