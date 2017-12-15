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
import { NavController, } from 'ionic-angular';
// import * as _ from 'lodash';
import { AnywhereService } from "../../services/anywhere.service";
import { UserStorageService } from "../../services/user-storage.service";
import { HostProfile } from "../../pages/host-profile/host-profile";
import { NoInternetService } from '../../services/no-internet.service';
var ReviewCardComponent = (function () {
    function ReviewCardComponent(navCtrl, AnywhereService, UserStorageService, noInternetService) {
        this.navCtrl = navCtrl;
        this.AnywhereService = AnywhereService;
        this.UserStorageService = UserStorageService;
        this.noInternetService = noInternetService;
        this.defaultOpts = {
            SHORT_PASSAGE: false
        };
    }
    ReviewCardComponent.prototype.ngOnChanges = function () {
        this.loadData();
    };
    ReviewCardComponent.prototype.loadData = function () {
        //   _.extend(this.defaultOpts, this.options);
        this.review = this.reviewData;
        // Check if this review is owner's and less than 5 minutes to edit
        if (this.review.user.id == this.UserStorageService.getProp('userInfo').id) {
            this.canEditReview = this.AnywhereService.checkLessThanFiveMinutes(this.review.created_time);
            console.log("++++++++++++++ this.canEditReview", this.canEditReview);
        }
    };
    ReviewCardComponent.prototype.goHostProfile = function () {
        // if (!this.noInternetService.hasInternet) {
        //   console.log("k co internet");
        //   return;
        // }
        this.navCtrl.push(HostProfile, {
            params: {
                id: this.review.user.id
            }
        });
    };
    return ReviewCardComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReviewCardComponent.prototype, "reviewData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReviewCardComponent.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReviewCardComponent.prototype, "apartmentInfo", void 0);
ReviewCardComponent = __decorate([
    Component({
        selector: 'review-card',
        templateUrl: './review-card.component.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AnywhereService,
        UserStorageService,
        NoInternetService])
], ReviewCardComponent);
export { ReviewCardComponent };
//# sourceMappingURL=review-card.component.js.map