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
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
import * as _ from 'lodash';
import { HomeDetail } from '../../pages/home-detail/home-detail';
import { ItemSpace } from '../../templates/item-space';
import { RecentViewService } from '../../services/recent-view.service';
import { CONSTANT } from '../../services/constant.service';
var DEFAULT_OPTIONS = {
    PRICE_SHOWN: true,
    PAGENUM_SHOWN: false,
    FAVOURITE_SHOWN: true,
    VERIFY_SHOWN: true,
    AUTO_PLAY: true,
    VISIBLE_ONLY_FIRST_PAGE: false,
    AVATAR_SHOWN: true
};
var ImageCard = (function (_super) {
    __extends(ImageCard, _super);
    function ImageCard(coreServices, navController, recentViewService) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        _this.navController = navController;
        _this.recentViewService = recentViewService;
        _this.defaultOpts = _.clone(DEFAULT_OPTIONS);
        return _this;
    }
    ImageCard.prototype.ngOnChanges = function (changes) {
        if (this.km) {
            return;
        }
        this.initVals();
    };
    ImageCard.prototype.initVals = function () {
        this.km = this.coreServices.anywhereService.calDistance(this.cardData.latitude, this.cardData.longitude);
    };
    ImageCard.prototype.goToDetail = function (type, callback) {
        var id;
        if (type === CONSTANT.DETAIL_TYPE.SPACE) {
            id = this.cardData &&
                this.cardData.renting &&
                this.cardData.renting.id;
            if (id) {
                var tempData = new ItemSpace(id, this.cardData);
                this.recentViewService.addHouseToRecentViews(tempData);
                console.log("idid", tempData.id);
                var params = {
                    id: id,
                };
                if (callback) {
                    callback(id);
                }
                this.navController.push(HomeDetail, {
                    params: params
                });
            }
            return;
        }
    };
    ImageCard.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return ImageCard;
}(CoreSimpleClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageCard.prototype, "cardData", void 0);
ImageCard = __decorate([
    Component({
        selector: 'image-card',
        templateUrl: './image-card.html'
    }),
    __metadata("design:paramtypes", [CoreServices,
        NavController,
        RecentViewService])
], ImageCard);
export { ImageCard };
//# sourceMappingURL=image-card.js.map