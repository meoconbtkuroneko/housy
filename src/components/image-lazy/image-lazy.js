var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
var ImageLazy = (function () {
    function ImageLazy(anywhereService) {
        this.anywhereService = anywhereService;
        this.defaultOpts = {
            loading: CONSTANT.IMAGE.PREFIX_IMAGE_PATH + CONSTANT.IMAGE.LOADING,
            waitingUrl: CONSTANT.IMAGE.PREFIX_IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE,
            avatar: CONSTANT.IMAGE.PREFIX_IMAGE_PATH + CONSTANT.IMAGE.NO_AVATAR,
        };
        this.defaultBackground = this.defaultOpts.loading;
        this.loading = true;
    }
    ;
    ImageLazy.prototype.loadImage = function () {
        var src = this.anywhereService.getFullImgUrl(this.imgSrc, this.type, this.fullSize);
        this.fetchedImageUrl = src;
    };
    ImageLazy.prototype.ngOnInit = function () {
        if (this.type == 'user') {
            this.defaultBackground = this.defaultOpts.avatar;
        }
        this.loadImage();
    };
    ImageLazy.prototype.ngOnChanges = function (changes) {
        if (this.imgSrc) {
            this.loadImage();
        }
    };
    ImageLazy.prototype.setImageUrl = function (imageUrl) { };
    ImageLazy.prototype.imageLoaded = function () {
        this.loading = undefined;
    };
    return ImageLazy;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageLazy.prototype, "imgSrc", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageLazy.prototype, "fullSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageLazy.prototype, "type", void 0);
ImageLazy = __decorate([
    Component({
        selector: 'image-lazy',
        templateUrl: './image-lazy.html'
    }),
    __metadata("design:paramtypes", [AnywhereService])
], ImageLazy);
export { ImageLazy };
//# sourceMappingURL=image-lazy.js.map