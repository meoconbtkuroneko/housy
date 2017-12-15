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
import { SocialSharing } from '@ionic-native/social-sharing';
import { CONSTANT } from '../../services/constant.service';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
var ShareButton = (function (_super) {
    __extends(ShareButton, _super);
    function ShareButton(coreServices, socialSharing) {
        var _this = _super.call(this, coreServices) || this;
        _this.socialSharing = socialSharing;
        return _this;
    }
    ShareButton.prototype.getLinkToWeb = function () {
        var linkType;
        if (this.type == CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_SPACE) {
            linkType = CONSTANT.TYPE_LINK_SOCIAL_CLICK.SPACE;
        }
        if (this.type == CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_APARTMENT) {
            linkType = CONSTANT.TYPE_LINK_SOCIAL_CLICK.APARTMENT;
        }
        return CONSTANT.HOUSY_VN + linkType + this.id;
    };
    ShareButton.prototype.shareButtonClicked = function (e) {
        e.stopPropagation();
        if (!this.canGo()) {
            return;
        }
        var linkShare = this.getLinkToWeb();
        this.socialSharing.share(null, null, null, linkShare);
    };
    ShareButton.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return ShareButton;
}(CoreSimpleClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], ShareButton.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ShareButton.prototype, "type", void 0);
ShareButton = __decorate([
    Component({
        selector: "share-button",
        templateUrl: "./share-button.html"
    }),
    __metadata("design:paramtypes", [CoreServices,
        SocialSharing])
], ShareButton);
export { ShareButton };
//# sourceMappingURL=share-button.js.map