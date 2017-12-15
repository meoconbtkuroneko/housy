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
import { UserStorageService } from './user-storage.service';
import { CONSTANT } from './constant.service';
import { PostService } from './post.service';
import { CurrentItemService } from './current-item.service';
import { Events } from 'ionic-angular';
var WriteCommentService = (function () {
    function WriteCommentService(anywhereService, userStorageService, postService, currentItemService, events) {
        var _this = this;
        this.anywhereService = anywhereService;
        this.userStorageService = userStorageService;
        this.postService = postService;
        this.currentItemService = currentItemService;
        this.events = events;
        this._handleSubscribeCallbackAfterLogined = function (data) {
            console.log("_handleSubscribeCallbackAfterLogined WriteCommentService", data);
            if (data === _this.callbackType) {
                var currentUser = _this.userStorageService.USER.userInfo;
                if (currentUser.id === _this.belongToUser.id) {
                    return _this.finishLoading(CONSTANT.COMMENT_YOURSELF);
                }
                _this.doSendComment();
            }
        };
        this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.WRITE_COMMENT;
        this.toggleSubscribeCallbackAfterLogined(true);
    }
    WriteCommentService.prototype.toggleSubscribeCallbackAfterLogined = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.DO_CALLBACK_AFTER_LOGINED, this._handleSubscribeCallbackAfterLogined);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, this._handleSubscribeCallbackAfterLogined);
        }
    };
    // object_id: id cua nguoi bi comment;
    WriteCommentService.prototype.doSendComment = function (callback) {
        var _this = this;
        if (!this.canSend || !this.content) {
            return;
        }
        var currentUser = this.anywhereService.USER.userInfo;
        if (callback) {
            this.callback = callback;
            console.log("setCallbacksetCallback", this.callback);
        }
        console.log("sendCommentFuncsendCommentFunc", this.content);
        var data = {
            object_id: this.commentAboutId,
            parent_id: this.parentCommentId,
            type: this.currentTypeId,
            content: this.content,
        };
        data.user = {
            id: currentUser.id,
            picture: currentUser.picture,
            name: currentUser.name,
        };
        this.postService.sendUserComment(data)
            .then(function (res) {
            console.log('=>>>>>>>>>>>sendComment END............', res);
            if (res.reason === CONSTANT.REASONS.ER_OK) {
                data.id = res.id;
                data.posted_time = new Date();
                _this.events.publish(CONSTANT.EVENTS_NAME.COMMENT_CHANGED, data);
                _this.finishLoading();
            }
            else {
                _this.finishLoading(CONSTANT.ERR_GENERAL);
            }
        }, function (err) { return _this.finishLoading(CONSTANT.ERR_GENERAL); });
    };
    WriteCommentService.prototype.finishLoading = function (message) {
        console.log("finishLoading this.callback", this.callback);
        if (this.callback) {
            this.callback();
        }
        if (message) {
            this.anywhereService.showToast(message);
        }
    };
    WriteCommentService.prototype.setWriteCommentData = function (commentAboutId, parentCommentId, content, belongToUser, currentTypeId, canSend) {
        this.commentAboutId = commentAboutId;
        this.parentCommentId = parentCommentId;
        this.content = content;
        this.belongToUser = belongToUser;
        this.currentTypeId = currentTypeId;
        this.canSend = canSend;
    };
    WriteCommentService.prototype.ngOnDestroy = function () {
        this.toggleSubscribeCallbackAfterLogined(false);
    };
    return WriteCommentService;
}());
WriteCommentService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService,
        UserStorageService,
        PostService,
        CurrentItemService,
        Events])
], WriteCommentService);
export { WriteCommentService };
//# sourceMappingURL=write-comment.service.js.map