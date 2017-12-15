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
import { PostService } from './post.service';
import { CONSTANT } from './constant.service';
import { GetService } from './get.service';
import { HistorySearch, POPULAR_SEARCHS } from '../templates/history-search';
import * as _ from 'lodash';
import { Platform, Events, } from 'ionic-angular';
var HistoryService = (function () {
    function HistoryService(storage, userStorageService, postService, platform, events, getService) {
        var _this = this;
        this.storage = storage;
        this.userStorageService = userStorageService;
        this.postService = postService;
        this.platform = platform;
        this.events = events;
        this.getService = getService;
        this._handleSubscribeUser = function (res) {
            console.log("_handleSubscribeUser HistoryService", res);
            _this.USER = _this.userStorageService.USER;
            if (!_this.USER || _.isEmpty(_this.USER)) {
                return;
            }
            _this.userId = _this.USER.userInfo.id;
            _this.HISTORY_KEY = _this.getHistoryKey();
            _this.HISTORY = [];
            _this.startupServices();
        };
        this.platform.ready().then(function () {
            _this._handleSubscribeUser();
            _this.toggleSubscribeUser(true);
        });
    }
    HistoryService.prototype.toggleSubscribeUser = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
    };
    HistoryService.prototype.getRecentSearch = function () {
        return this.HISTORY.slice(0, 5);
    };
    HistoryService.prototype.getHistoryKey = function () {
        if (this.userId != -1) {
            return this.HISTORY_KEY = 'HISTORY_' + this.userId;
        }
        return this.HISTORY_KEY = 'HISTORY_';
    };
    HistoryService.prototype.getHistories = function () {
        return this.HISTORY;
    };
    HistoryService.prototype.startupServices = function () {
        var _this = this;
        return this.storage.get(this.HISTORY_KEY)
            .then(function (res) {
            if (!res && _this.USER.logined) {
                return _this.getRecentSearchFromServer()
                    .then(function (res) {
                    var histories = _this.initHistoriesSearch(res);
                    if (histories && histories.length > 0) {
                        return _this.setHistories(histories);
                    }
                    return res;
                });
            }
            _this.broadcastHistoriesChange(res);
            return res;
        });
    };
    HistoryService.prototype.initHistoriesSearch = function (arrPlaces) {
        var tempSearch;
        var tempRs = [];
        for (var i in arrPlaces) {
            var tempObj = _.find(POPULAR_SEARCHS, {
                name: arrPlaces[i],
            });
            if (tempObj) {
                tempSearch = tempObj;
            }
            else {
                tempSearch = new HistorySearch(arrPlaces[i], null, null);
            }
            tempRs.push(tempSearch);
        }
        return tempRs;
    };
    HistoryService.prototype.getRecentSearchFromServer = function () {
        var params = {
            type: CONSTANT.RECENT_SEARCH_TYPE.PLACE
        };
        return this.getService.getRecentSearch(params)
            .then(function (data) {
            if (data.reason === CONSTANT.REASONS.ER_OK) {
                return data.places;
            }
        });
    };
    HistoryService.prototype.setHistories = function (histories) {
        var _this = this;
        return this.storage.set(this.HISTORY_KEY, histories)
            .then(function (res) {
            _this.broadcastHistoriesChange(res);
            return res;
        });
    };
    HistoryService.prototype.setHistory = function (history) {
        var histories = this.removeItemInHistories(history);
        histories.unshift(history);
        return this.setHistories(histories);
    };
    HistoryService.prototype.deleteHistory = function (history) {
        var histories = this.removeItemInHistories(history);
        return this.setHistories(histories);
    };
    // xoa mot item ra khoi histories, tra ve history sau khi xoa, chua luu vao bo nho
    HistoryService.prototype.removeItemInHistories = function (item) {
        var histories = _.cloneDeep(this.HISTORY);
        var index = _.findIndex(histories, {
            name: item.name
        });
        if (index > -1) {
            histories.splice(index, 1);
        }
        return histories;
    };
    HistoryService.prototype.clearHistories = function () {
        var _this = this;
        return this.storage.remove(this.HISTORY_KEY)
            .then(function (res) {
            _this.broadcastHistoriesChange([]);
        });
    };
    HistoryService.prototype.broadcastHistoriesChange = function (data) {
        this.HISTORY = data ? _.cloneDeep(data) : [];
        this.events.publish(CONSTANT.EVENTS_NAME.HISTORIES_CHANGED, data);
    };
    HistoryService.prototype.goToSearch = function (place) {
        this.setHistory(place);
        if (this.USER.logined) {
            var data = {
                place: place.name
            };
            this.postService.updateRecentSearch(data);
        }
    };
    HistoryService.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
    };
    return HistoryService;
}());
HistoryService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage,
        UserStorageService,
        PostService,
        Platform,
        Events,
        GetService])
], HistoryService);
export { HistoryService };
//# sourceMappingURL=history.service.js.map