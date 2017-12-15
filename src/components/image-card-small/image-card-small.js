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
import { Component } from '@angular/core';
import { NavController, Events, } from 'ionic-angular';
import { RecentViewService } from '../../services/recent-view.service';
import { CONSTANT } from '../../services/constant.service';
import { ImageCard } from '../../directives/image-card/image-card';
import { CoreServices } from '../../templates/core-class';
var ImageCardSmall = (function (_super) {
    __extends(ImageCardSmall, _super);
    function ImageCardSmall(navController, recentViewService, coreServices, events) {
        var _this = _super.call(this, coreServices, navController, recentViewService) || this;
        _this.navController = navController;
        _this.recentViewService = recentViewService;
        _this.coreServices = coreServices;
        _this.events = events;
        return _this;
    }
    ImageCardSmall.prototype.ngOnInit = function () {
        this.cardData.fullImageUrl =
            this.coreServices.anywhereService.getFullImgUrl(this.cardData.image_default, 'space');
        this.cardData.fullAvatarUrl = this.coreServices.anywhereService.getFullImgUrl(this.cardData.renting.user.picture, 'user');
    };
    ImageCardSmall.prototype.goToDetail = function () {
        var _this = this;
        _super.prototype.goToDetail.call(this, CONSTANT.DETAIL_TYPE.SPACE, function (id) {
            _this.events.publish(CONSTANT.EVENTS_NAME.GO_TO_DETAIL, id);
        });
    };
    ImageCardSmall.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return ImageCardSmall;
}(ImageCard));
ImageCardSmall = __decorate([
    Component({
        selector: 'image-card-small',
        templateUrl: './image-card-small.html'
    }),
    __metadata("design:paramtypes", [NavController,
        RecentViewService,
        CoreServices,
        Events])
], ImageCardSmall);
export { ImageCardSmall };
//# sourceMappingURL=image-card-small.js.map