var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';
var PostService = (function () {
    function PostService(anywhereService) {
        this.anywhereService = anywhereService;
    }
    PostService.prototype.registerNewAccount = function (data) {
        var path = CONSTANT.SERVER.APIS.REGISTER;
        return this.anywhereService.makePostRequest(path, data);
    };
    /*
    data = {
      space_id: boolean,
      addFavourite: boolean,
    }
    */
    PostService.prototype.addFavorite = function (data) {
        var path = CONSTANT.SERVER.APIS.FAVORITE;
        return this.anywhereService.makePostRequest(path, data);
    };
    PostService.prototype.resetPassword = function (data) {
        var path = CONSTANT.SERVER.APIS.FORGOT_PASSWORD;
        return this.anywhereService.makePostRequest(path, data);
    };
    PostService.prototype.getDiscount = function (rentingId) {
        var path = CONSTANT.SERVER.APIS.DISCOUNT;
        var data = {
            renting_id: rentingId
        };
        return this.anywhereService.makePostRequest(path, data);
    };
    PostService.prototype.sendUserFeedback = function (data) {
        var path = CONSTANT.SERVER.APIS.FEEDBACK_USER;
        return this.anywhereService.makePostRequest(path, data);
    };
    ;
    PostService.prototype.newHouse = function (data) {
        var path = CONSTANT.SERVER.APIS.ALLHOUSE;
        return this.anywhereService.makePostRequest(path, data);
    };
    ;
    PostService.prototype.updateRecentSearch = function (data) {
        var path = CONSTANT.SERVER.APIS.RECENT_SEARCH;
        return this.anywhereService.makePostRequest(path, data);
    };
    PostService.prototype.sendUserComment = function (data) {
        var path = CONSTANT.SERVER.APIS.COMMENT;
        return this.anywhereService.makePostRequest(path, data);
    };
    return PostService;
}());
PostService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService])
], PostService);
export { PostService };
//# sourceMappingURL=post.service.js.map