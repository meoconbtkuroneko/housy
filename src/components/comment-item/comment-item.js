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
import { Component, Input, } from '@angular/core';
import { Events } from 'ionic-angular';
import { ClickNeedShowLoginClass, CoreServices } from '../../templates/core-class';
import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
import { DeleteService } from '../../services/delete.service';
var DEFAULT_OPTIONS = {
    SHOW_DELETE_BUTTON: true,
};
var CommentItem = (function (_super) {
    __extends(CommentItem, _super);
    function CommentItem(anywhereService, deleteService, coreServices, events) {
        var _this = _super.call(this, coreServices) || this;
        _this.anywhereService = anywhereService;
        _this.deleteService = deleteService;
        _this.coreServices = coreServices;
        _this.events = events;
        _this.defaultOpts = _.clone(DEFAULT_OPTIONS);
        _this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.DELETE_COMMENT;
        _this.currentUser = _this.anywhereService.USER.userInfo;
        _this.toggleSubscribeUser(true);
        return _this;
    }
    // inherit from parent
    CommentItem.prototype.handleSubscribeUser = function (res) {
        console.log("handleSubscribeUser CommentItem", res);
        this.currentUser = this.USER.userInfo;
    };
    CommentItem.prototype.ngOnChanges = function (changes) {
        console.log("ngOnChangesngOnChanges CommentItem", changes);
        if (changes.options) {
            this.defaultOpts = _.assignIn(this.defaultOpts, this.options);
        }
    };
    // id la id cua comment can xoa
    CommentItem.prototype.deleteComment = function () {
        var _this = this;
        if (!this.canGo()) {
            return;
        }
        this.checkHasLogined(this.callbackType, function () {
            _this.toggleIsProcessing(true);
            _this.doDeleteComment();
        }, function () {
            _this.finishLoading();
        });
    };
    CommentItem.prototype.doDeleteComment = function () {
        var _this = this;
        this.deleteService.deleteUserComment(this.cardData.id)
            .then(function (res) {
            console.log("this.deleteService deleteUserComment", res);
            if (res) {
                _this.events.publish(CONSTANT.EVENTS_NAME.COMMENT_DELETED, _this.cardData);
                _this.finishLoading(CONSTANT.DELETE_SUCCESS);
            }
            else {
                _this.finishLoading(CONSTANT.ERR_GENERAL);
            }
        }, function (err) { return _this.finishLoading(CONSTANT.ERR_GENERAL); });
    };
    CommentItem.prototype.finishLoading = function (message) {
        this.toggleIsProcessing(false);
        if (message) {
            this.coreServices.anywhereService.showToast(message);
        }
    };
    CommentItem.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return CommentItem;
}(ClickNeedShowLoginClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], CommentItem.prototype, "cardData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CommentItem.prototype, "options", void 0);
CommentItem = __decorate([
    Component({
        selector: 'comment-item',
        templateUrl: './comment-item.html'
    }),
    __metadata("design:paramtypes", [AnywhereService,
        DeleteService,
        CoreServices,
        Events])
], CommentItem);
export { CommentItem };
//# sourceMappingURL=comment-item.js.map