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
import { NavController, } from 'ionic-angular';
import { DetailNewListing } from '../../pages/detail-new-listing/detail-new-listing';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { DeleteService } from '../../services/delete.service';
import { CurrentItemService } from '../../services/current-item.service';
var ImageCardOwner = (function () {
    function ImageCardOwner(navController, anywhereService, currentItemService, deleteService) {
        this.navController = navController;
        this.anywhereService = anywhereService;
        this.currentItemService = currentItemService;
        this.deleteService = deleteService;
        this.rentingStatusIds = CONSTANT.RENTING_STATUS_ID;
    }
    ImageCardOwner.prototype.goToDetail = function (rentingId) {
        if (!this.cardData.isUpdating) {
            var params = {
                id: rentingId
            };
            console.log("rentingIdrentingId", rentingId);
            this.navController.push(DetailNewListing, {
                params: params
            });
        }
        else {
            this.anywhereService.showToast(CONSTANT.UPLOADING);
        }
    };
    ImageCardOwner.prototype.deleteButttonClick = function (e) {
        var _this = this;
        e.stopPropagation();
        var alert = this.anywhereService.alertController.create({
            title: CONSTANT.TITLE_HOUSY,
            subTitle: CONSTANT.UPDATE.DELETE_QUESTION,
            buttons: [{
                    text: CONSTANT.STRING_CANCEL,
                    role: 'cancel'
                }, {
                    text: CONSTANT.STRING_DELETE,
                    handler: function () {
                        _this.handleDeleteOK();
                    }
                }]
        });
        alert.present();
    };
    ImageCardOwner.prototype.handleDeleteOK = function () {
        var _this = this;
        this.deleteService.deleteHouse(this.cardData.renting.id)
            .then(function (res) {
            if (res.reason === CONSTANT.REASONS.ER_OK) {
                _this.currentItemService.broadcastChange({
                    type: 'space',
                    id: _this.cardData.renting.id,
                    data: _this.cardData,
                    isDelete: true
                });
                _this.anywhereService.showToast(CONSTANT.UPDATE.DELETE_OK);
            }
            else {
                _this.anywhereService.showToast(CONSTANT.UPDATE.DELETE_ERROR);
            }
        });
    };
    return ImageCardOwner;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageCardOwner.prototype, "cardData", void 0);
ImageCardOwner = __decorate([
    Component({
        selector: 'image-card-owner',
        templateUrl: './image-card-owner.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AnywhereService,
        CurrentItemService,
        DeleteService])
], ImageCardOwner);
export { ImageCardOwner };
//# sourceMappingURL=image-card-owner.js.map