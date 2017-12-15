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
import { AnywhereService } from './anywhere.service';
import { CONSTANT } from './constant.service';
import { PostService } from './post.service';
import { CurrentItemService } from './current-item.service';
import { Events } from 'ionic-angular';
import * as _ from 'lodash';
var FavouriteService = (function () {
    function FavouriteService(anywhereService, postService, currentItemService, events) {
        var _this = this;
        this.anywhereService = anywhereService;
        this.postService = postService;
        this.currentItemService = currentItemService;
        this.events = events;
        this._handleSubscribeCallbackAfterLogined = function (data) {
            console.log("_handleSubscribeCallbackAfterLogined FavouriteService", data);
            if (data === _this.callbackType) {
                _this.doAddFavourite();
            }
        };
        this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.FAVOURITE;
        this.toggleSubscribeCallbackAfterLogined(true);
    }
    FavouriteService.prototype.toggleSubscribeCallbackAfterLogined = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.DO_CALLBACK_AFTER_LOGINED, this._handleSubscribeCallbackAfterLogined);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, this._handleSubscribeCallbackAfterLogined);
        }
    };
    FavouriteService.prototype.setFavouriteData = function (data, addAnyway) {
        this.cardData = _.cloneDeep(data);
        this.addAnyway = (addAnyway != undefined) ? addAnyway : this.addAnyway;
    };
    /*
        data = {
          space_id: boolean,
          isFavouriteAdded: boolean,
        }
        */
    FavouriteService.prototype.doAddFavourite = function (callback) {
        var _this = this;
        if (callback) {
            this.callback = callback;
        }
        var tempData = _.cloneDeep(this.cardData);
        var data = {
            space_id: tempData.id
        };
        if (this.addAnyway) {
            data.isFavouriteAdded = true;
        }
        this.postService.addFavorite(data)
            .then(function (result) {
            console.log("this.cardData", _this.cardData.isFavouriteAdded, result);
            if (result.reason === CONSTANT.REASONS.ER_OK) {
                _this.cardData.isFavouriteAdded = result.isFavouriteAdded;
                var message = void 0;
                if (_this.cardData.isFavouriteAdded) {
                    message = CONSTANT.FAVORITE.ADD;
                }
                else {
                    message = CONSTANT.FAVORITE.REMOVE;
                }
                _this.currentItemService.broadcastChange({
                    type: 'space',
                    id: _this.cardData.renting.id,
                    data: _this.cardData
                });
                _this.finishLoading(message);
            }
            else {
                _this.finishLoading(CONSTANT.FAVORITE.ERR);
            }
        }, function (error) {
            _this.finishLoading(CONSTANT.FAVORITE.ERR);
        });
    };
    FavouriteService.prototype.finishLoading = function (message) {
        if (this.callback) {
            this.callback();
        }
        if (message) {
            this.anywhereService.showToast(message);
        }
    };
    FavouriteService.prototype.ngOnDestroy = function () {
        this.toggleSubscribeCallbackAfterLogined(false);
    };
    return FavouriteService;
}());
FavouriteService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService,
        PostService,
        CurrentItemService,
        Events])
], FavouriteService);
export { FavouriteService };
//# sourceMappingURL=favourite.service.js.map