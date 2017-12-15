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
import { NavController } from 'ionic-angular';
import { ApartmentDetail } from '../../pages/apartment-detail/apartment-detail';
import { ImageCard } from '../../directives/image-card/image-card';
import { RecentViewService } from '../../services/recent-view.service';
import { CONSTANT } from '../../services/constant.service';
import { CoreServices } from '../../templates/core-class';
var ImageCardApartment = (function (_super) {
    __extends(ImageCardApartment, _super);
    function ImageCardApartment(coreServices, navController, recentViewService) {
        var _this = _super.call(this, coreServices, navController, recentViewService) || this;
        _this.coreServices = coreServices;
        _this.navController = navController;
        _this.recentViewService = recentViewService;
        return _this;
    }
    ImageCardApartment.prototype.goToDetail = function () {
        var type = CONSTANT.DETAIL_TYPE.APARTMENT;
        _super.prototype.goToDetail.call(this, type);
        var id = this.cardData && this.cardData.id;
        if (id) {
            console.log("idid", id);
            var params = {
                id: id,
            };
            this.navController.push(ApartmentDetail, {
                params: params
            });
        }
    };
    ImageCardApartment.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return ImageCardApartment;
}(ImageCard));
ImageCardApartment = __decorate([
    Component({
        selector: 'image-card-apartment',
        templateUrl: './image-card-apartment.html'
    }),
    __metadata("design:paramtypes", [CoreServices,
        NavController,
        RecentViewService])
], ImageCardApartment);
export { ImageCardApartment };
//# sourceMappingURL=image-card-apartment.js.map