var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserStorageService } from './user-storage.service';
import { AnywhereService } from './anywhere.service';
import { PostService } from './post.service';
import { CONSTANT } from './constant.service';
import { GetService } from './get.service';
import { CurrentItemService } from './current-item.service';
import * as _ from 'lodash';
import { Events } from 'ionic-angular';
var RecentViewService = (function () {
    function RecentViewService(storage, events, userStorageService, postService, getService, currentItemService, anywhereService) {
        var _this = this;
        this.storage = storage;
        this.events = events;
        this.userStorageService = userStorageService;
        this.postService = postService;
        this.getService = getService;
        this.currentItemService = currentItemService;
        this.anywhereService = anywhereService;
        this._handleSubscribeUser = function (res) {
            console.log("_handleSubscribeUser RecentViewService", res);
            _this.USER = _this.userStorageService.USER;
            if (!_this.USER || _.isEmpty(_this.USER)) {
                return;
            }
            _this.userId = _this.USER.userInfo.id;
            _this.RECENT_VIEW_KEY = _this.getRecentViewsKey();
            _this.RECENT_VIEW = [];
            _this.startupServices();
        };
        this.handleSubscribeCurrentItem = function (res) {
            switch (res.type) {
                case "space":
                    {
                        _this.checkAndChange(_this.RECENT_VIEW, res);
                        break;
                    }
            }
        };
        this._handleSubscribeUser();
        this.toggleSubscribeUser(true);
        this.handleSubscribeCurrentItem(true);
    }
    RecentViewService.prototype.toggleSubscribeUser = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
    };
    RecentViewService.prototype.toggleSubscribeCurrentItem = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, this.handleSubscribeCurrentItem);
        }
    };
    RecentViewService.prototype.checkAndChange = function (checkArr, newVal) {
        var index = _.findIndex(checkArr, { id: newVal.id });
        if (index > -1) {
            checkArr[index].data = _.cloneDeep(newVal.data);
            this.setRecentView(newVal);
        }
    };
    RecentViewService.prototype.getRecentSearch = function () {
        return this.RECENT_VIEW.slice(0, 5);
    };
    RecentViewService.prototype.getRecentViewsKey = function () {
        if (this.userId != -1) {
            return this.RECENT_VIEW_KEY = 'RECENT_VIEW_' + this.userId;
        }
        return this.RECENT_VIEW_KEY = 'RECENT_VIEW_';
    };
    RecentViewService.prototype.startupServices = function () {
        var _this = this;
        return this.storage.get(this.RECENT_VIEW_KEY)
            .then(function (res) {
            if (!res && _this.USER.logined) {
                return _this.getRecentSearchFromServer()
                    .then(function (res) {
                    return _this.setRecentViews(res);
                });
            }
            _this.broadcastRecentViewsChange(res);
            return res;
        });
    };
    RecentViewService.prototype.getRecentSearchFromServer = function () {
        var _this = this;
        var params = {
            type: CONSTANT.RECENT_SEARCH_TYPE.SPACE
        };
        return this.getService.getRecentSearch(params)
            .then(function (data) {
            if (data.reason === CONSTANT.REASONS.ER_OK) {
                var recentViews = _this.anywhereService.addIdToArr(data.spaces);
                if (recentViews && recentViews.length > 0) {
                    return _this.setRecentViews(recentViews);
                }
                return data.spaces;
            }
        });
    };
    RecentViewService.prototype.setRecentViews = function (recentViews) {
        var _this = this;
        return this.storage.set(this.RECENT_VIEW_KEY, recentViews)
            .then(function (res) {
            _this.broadcastRecentViewsChange(res);
            return res;
        });
    };
    RecentViewService.prototype.setRecentView = function (recentView) {
        var recentViews = this.removeItemInRecentViews(recentView);
        recentViews.unshift(recentView);
        recentViews = recentViews.slice(0, 5);
        return this.setRecentViews(recentViews);
    };
    RecentViewService.prototype.deleteRecentView = function (recentView) {
        var recentViews = this.removeItemInRecentViews(recentView);
        return this.setRecentViews(recentViews);
    };
    // xoa mot item ra khoi recentView, tra ve recentView sau khi xoa, chua luu vao bo nho
    RecentViewService.prototype.removeItemInRecentViews = function (item) {
        var recentViews = _.cloneDeep(this.RECENT_VIEW);
        var index = _.findIndex(recentViews, {
            id: item.id
        });
        if (index > -1) {
            recentViews.splice(index, 1);
        }
        return recentViews;
    };
    RecentViewService.prototype.clearRecentViews = function () {
        var _this = this;
        return this.storage.remove(this.RECENT_VIEW_KEY)
            .then(function (res) {
            _this.broadcastRecentViewsChange([]);
        });
    };
    RecentViewService.prototype.broadcastRecentViewsChange = function (data) {
        this.RECENT_VIEW = data ? _.cloneDeep(data) : [];
        this.events.publish(CONSTANT.EVENTS_NAME.RECENT_VIEWS_CHANGED, data);
    };
    RecentViewService.prototype.addHouseToRecentViews = function (space) {
        this.setRecentView(space);
        if (this.USER.logined) {
            var index = _.findIndex(this.RECENT_VIEW, {
                id: space.id
            });
            if (index > -1) {
                return;
            }
            var data = {
                renting_id: space.id
            };
            this.postService.updateRecentSearch(data);
        }
    };
    RecentViewService.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
        this.toggleSubscribeCurrentItem(false);
    };
    return RecentViewService;
}());
RecentViewService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage,
        Events,
        UserStorageService,
        PostService,
        GetService,
        CurrentItemService,
        AnywhereService])
], RecentViewService);
export { RecentViewService };
//# sourceMappingURL=recent-view.service.js.map