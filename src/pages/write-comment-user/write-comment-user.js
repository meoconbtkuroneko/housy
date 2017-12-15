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
import { NavParams, Events, ViewController, } from 'ionic-angular';
import * as _ from "lodash";
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { DeleteService } from '../../services/delete.service';
import { CoreClassNoSubcribeUser, CoreServices } from '../../templates/core-class';
var PageWriteCommentUser = (function (_super) {
    __extends(PageWriteCommentUser, _super);
    function PageWriteCommentUser(navParams, anywhereService, deleteService, events, coreServices, viewController) {
        var _this = _super.call(this, coreServices) || this;
        _this.navParams = navParams;
        _this.anywhereService = anywhereService;
        _this.deleteService = deleteService;
        _this.events = events;
        _this.viewController = viewController;
        _this.writeAnswer = {};
        _this.condition = false;
        _this.handleSubscribeSendComment = function (data) {
            console.log("subscribeSendComment", data);
            var parentCommentIndex = _.findIndex(_this.listComments, {
                id: data.parent_id
            });
            if (parentCommentIndex > -1) {
                var parentComment = _this.listComments[parentCommentIndex];
                console.log("parentCommentparentComment", parentComment);
                parentComment.children = parentComment.children || [];
                parentComment.children.push(data);
            }
            else {
                _this.listComments.unshift(data);
            }
        };
        _this.handleSubscribeDeleteComment = function (data) {
            console.log("handleSubscribeDeleteComment", data);
            if (data.parent_id === 0) {
                _this.listComments = _this.removeItemInArrById(data.id, _this.listComments);
            }
            else {
                var parentComment = _.find(_this.listComments, {
                    id: data.parent_id
                });
                if (parentComment) {
                    parentComment.children = _this.removeItemInArrById(data.id, parentComment.children);
                }
            }
            ;
        };
        _this.params = _this.navParams.get('params');
        _this.toggleSubscribeUser(true);
        return _this;
    }
    // inherit from parent
    PageWriteCommentUser.prototype.handleSubscribeUser = function () {
        this.currentUser = this.USER.userInfo;
    };
    PageWriteCommentUser.prototype.ionViewDidLoad = function () {
        this.initVals();
        this.subscribeSendComment();
        this.subscribeDeleteComment();
    };
    ;
    PageWriteCommentUser.prototype.getAllData = function () {
        console.log("this.paramsthis.params", this.params);
        if (!this.params.comments) {
            console.log("chua co commenttttttttt");
            this.listAllComments();
        }
        else {
            this.toggleLoading(false);
        }
    };
    // doRefresh(refresher ? ) {
    //   this._doRefresh(refresher, () => {
    //     console.log("this.paramsthis.params", this.params);
    //     if (!this.params.comments) {
    //       console.log("chua co commenttttttttt");
    //       this.listAllComments();
    //     }
    //   })
    // }
    PageWriteCommentUser.prototype.initVals = function () {
        var _this = this;
        this.listComments = this.params.comments;
        this.commentAbout = this.params.commentAbout;
        this.belongToUser = this.params.belongToUser;
        this.type = this.params.type;
        this.isLogined = this.anywhereService.USER.logined;
        this.currentUser = this.USER.userInfo;
        setTimeout(function () {
            _this.condition = true;
        }, 1000);
    };
    PageWriteCommentUser.prototype.listAllComments = function () {
        var _this = this;
        this.increaseProcess();
        var promise = this.coreServices.getService.getComments(this.params.type, this.params.commentAbout.id);
        return this.handleResultFromServer(promise, true, function (res) {
            _this.listComments =
                res[CONSTANT.DETAIL_TYPE.USER][CONSTANT.DETAIL_TYPE.COMMENTS];
            console.log("listAllComments", res, _this.listComments, _this.loading);
        });
    };
    PageWriteCommentUser.prototype.subscribeSendComment = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.COMMENT_CHANGED, this.handleSubscribeSendComment);
    };
    PageWriteCommentUser.prototype.unsubscribeSendComment = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.COMMENT_CHANGED, this.handleSubscribeSendComment);
    };
    PageWriteCommentUser.prototype.subscribeDeleteComment = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.COMMENT_DELETED, this.handleSubscribeDeleteComment);
    };
    PageWriteCommentUser.prototype.unsubscribeDeleteComment = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.COMMENT_DELETED, this.handleSubscribeDeleteComment);
    };
    PageWriteCommentUser.prototype.removeItemInArrById = function (id, arr) {
        var currentIndex;
        currentIndex = _.findIndex(arr, {
            id: id
        });
        console.log("currentIndexcurrentIndexcurrentIndex", currentIndex);
        if (currentIndex > -1) {
            arr.splice(currentIndex, 1);
        }
        console.log("arrarrarr", arr);
        return arr;
    };
    PageWriteCommentUser.prototype.showWriteAnswer = function (id) {
        console.log('=>>>>>>>>>>>showWriteAnswer............', id);
        this.writeAnswer = {};
        this.writeAnswer[id] = true;
    };
    // type la 'parent' hoac 'child'
    // id la id cua comment can xoa
    // index la vi tri cua comment trong mang
    // $parentIndex la vi tri cua comment cha trong mang (neu co)
    PageWriteCommentUser.prototype.deleteComment = function (type, id, index, parentIndex) {
        this.deleteService.deleteUserComment(id)
            .then(function (res) {
            var _this = this;
            if (res) {
                if (type == 'parent') {
                    setTimeout(function () {
                        _this.listComments.splice(index, 1);
                    }, 1);
                }
                else {
                    setTimeout(function () {
                        _this.listComments[parentIndex].children.splice(index, 1);
                    }, 1);
                }
            }
        });
    };
    PageWriteCommentUser.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    PageWriteCommentUser.prototype.ngOnDestroy = function () {
        console.log("ngOnDestroy");
        this.unsubscribeSendComment();
        this.unsubscribeDeleteComment();
        _super.prototype.ngOnDestroy.call(this);
    };
    return PageWriteCommentUser;
}(CoreClassNoSubcribeUser));
PageWriteCommentUser = __decorate([
    Component({
        selector: 'write-comment-user',
        templateUrl: 'write-comment-user.html'
    }),
    __metadata("design:paramtypes", [NavParams,
        AnywhereService,
        DeleteService,
        Events,
        CoreServices,
        ViewController])
], PageWriteCommentUser);
export { PageWriteCommentUser };
//# sourceMappingURL=write-comment-user.js.map