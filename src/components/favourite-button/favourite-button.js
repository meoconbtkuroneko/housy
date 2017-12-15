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
import { Component, Input, EventEmitter, Output, } from '@angular/core';
import { CONSTANT } from '../../services/constant.service';
import { PostService } from '../../services/post.service';
import { FavouriteService } from '../../services/favourite.service';
import { ClickNeedShowLoginClass, CoreServices } from '../../templates/core-class';
var FavouriteButton = (function (_super) {
    __extends(FavouriteButton, _super);
    function FavouriteButton(favouriteService, postService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.favouriteService = favouriteService;
        _this.postService = postService;
        _this.onFavouriteChanged = new EventEmitter();
        _this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.FAVOURITE;
        return _this;
    }
    FavouriteButton.prototype.ngOnChanges = function (changes) {
        this.setIconName();
    };
    FavouriteButton.prototype.setIconName = function () {
        if (this.cardData) {
            this.iconName = this.coreServices.anywhereService.getFavouriteIconName(this.cardData.isFavouriteAdded);
        }
    };
    FavouriteButton.prototype.favouriteButtonClicked = function (e) {
        var _this = this;
        if (e) {
            e.stopPropagation();
        }
        console.log("favouriteButtonClickedfavouriteButtonClicked");
        if (!this.canGo()) {
            return;
        }
        this.checkHasLogined(this.callbackType, function () {
            _this.toggleIsProcessing(true);
            _this.setFavouriteData(false);
            _this.doAddFavourite();
        }, function () {
            _this.setFavouriteData(true);
            _this.finishLoading();
        });
    };
    FavouriteButton.prototype.setFavouriteData = function (addAnyway) {
        this.favouriteService.setFavouriteData(this.cardData, addAnyway);
    };
    FavouriteButton.prototype.doAddFavourite = function () {
        var _this = this;
        this.favouriteService.doAddFavourite(function () {
            _this.toggleIsProcessing(false);
        });
    };
    FavouriteButton.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return FavouriteButton;
}(ClickNeedShowLoginClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], FavouriteButton.prototype, "cardData", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FavouriteButton.prototype, "onFavouriteChanged", void 0);
FavouriteButton = __decorate([
    Component({
        selector: "favourite-button",
        templateUrl: "./favourite-button.html"
    }),
    __metadata("design:paramtypes", [FavouriteService,
        PostService,
        CoreServices])
], FavouriteButton);
export { FavouriteButton };
//# sourceMappingURL=favourite-button.js.map