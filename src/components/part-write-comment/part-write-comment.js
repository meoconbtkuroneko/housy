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
import { Validators, FormBuilder, } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { CONSTANT } from '../../services/constant.service';
import { WriteCommentService } from '../../services/write-comment.service';
import { Events } from 'ionic-angular';
import * as _ from 'lodash';
import { ClickNeedShowLoginClass, CoreServices } from '../../templates/core-class';
var PartWriteComment = (function (_super) {
    __extends(PartWriteComment, _super);
    function PartWriteComment(coreServices, events, formBuilder, formService, writeCommentService) {
        var _this = _super.call(this, coreServices) || this;
        _this.events = events;
        _this.formBuilder = formBuilder;
        _this.formService = formService;
        _this.writeCommentService = writeCommentService;
        _this.formValidation = CONSTANT.FORM_VALIDATION;
        _this._handleSubscribeSendComment = function () {
            _this.clearComment();
        };
        _this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.WRITE_COMMENT;
        _this.toggleSubscribeSendComment(true);
        return _this;
    }
    PartWriteComment.prototype.toggleSubscribeSendComment = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.COMMENT_CHANGED, this._handleSubscribeSendComment);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.COMMENT_CHANGED, this._handleSubscribeSendComment);
        }
    };
    PartWriteComment.prototype.ngOnInit = function () {
        this.buildForm();
    };
    PartWriteComment.prototype.ngOnChanges = function (changes) {
        if (!this.currentTypeId) {
            var tempObj = _.find(CONSTANT.SERVER.TYPE_COMMENT, {
                name: this.typeName
            });
            this.currentTypeId = tempObj && tempObj.id;
        }
    };
    PartWriteComment.prototype.buildForm = function () {
        var _this = this;
        this.commentForm = this.formBuilder.group({
            comment: ['', [
                    Validators.required,
                    this.formService.minCommentValue,
                ]],
        });
        this.commentForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    PartWriteComment.prototype.onValueChanged = function (data) {
        this.checkCanSend();
    };
    PartWriteComment.prototype.checkCanSend = function () {
        if (this.hasInternet === false) {
            this.canSend = false;
            return;
        }
        if (this.commentForm &&
            this.commentForm.value.comment.length > 0) {
            this.canClear = true;
        }
        else {
            this.canClear = false;
        }
        if (this.commentForm &&
            this.commentForm.valid) {
            this.canSend = true;
        }
        else {
            this.canSend = false;
        }
    };
    PartWriteComment.prototype.sendCommentFunc = function () {
        var _this = this;
        if (!this.canGo()) {
            return;
        }
        this.checkHasLogined(this.callbackType, function () {
            _this.toggleIsProcessing(true);
            _this.setWriteCommentData();
            _this.doSendComment();
        }, function () {
            _this.setWriteCommentData();
            _this.finishLoading();
        });
    };
    PartWriteComment.prototype.setWriteCommentData = function () {
        var commentAboutId = this.commentAbout.id;
        if (this.currentTypeId === CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_RENTING.id) {
            commentAboutId = this.commentAbout.renting.id;
        }
        this.writeCommentService.setWriteCommentData(commentAboutId, this.parentCommentId, this.commentForm && this.commentForm.value.comment, this.belongToUser, this.currentTypeId, this.canSend);
    };
    PartWriteComment.prototype.doSendComment = function () {
        var _this = this;
        this.writeCommentService.doSendComment(function () {
            _this.toggleIsProcessing(false);
        });
    };
    PartWriteComment.prototype.clearComment = function () {
        if (!this.commentForm) {
            return;
        }
        var newVal = this.commentForm.value || {};
        newVal.comment = '';
        this.commentForm.setValue(newVal);
    };
    PartWriteComment.prototype.ngOnDestroy = function () {
        this.toggleSubscribeSendComment(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return PartWriteComment;
}(ClickNeedShowLoginClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartWriteComment.prototype, "commentAbout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartWriteComment.prototype, "belongToUser", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartWriteComment.prototype, "typeName", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartWriteComment.prototype, "parentCommentId", void 0);
PartWriteComment = __decorate([
    Component({
        selector: "part-write-comment",
        templateUrl: "./part-write-comment.html"
    }),
    __metadata("design:paramtypes", [CoreServices,
        Events,
        FormBuilder,
        FormService,
        WriteCommentService])
], PartWriteComment);
export { PartWriteComment };
//# sourceMappingURL=part-write-comment.js.map