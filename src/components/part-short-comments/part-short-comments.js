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
import { NavController } from 'ionic-angular';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
import { PageWriteCommentUser } from '../../pages/write-comment-user/write-comment-user';
var PartShortComments = (function (_super) {
    __extends(PartShortComments, _super);
    function PartShortComments(coreServices, navController) {
        var _this = _super.call(this, coreServices) || this;
        _this.navController = navController;
        _this.currentUser = _this.coreServices.anywhereService.USER.userInfo;
        _this.toggleSubscribeUser(true);
        return _this;
    }
    // inherit from parent
    PartShortComments.prototype.handleSubscribeUser = function () {
        this.currentUser = this.USER.userInfo;
    };
    PartShortComments.prototype.showComments = function () {
        this.navController.push(PageWriteCommentUser, {
            params: {
                comments: this.comments,
                belongToUser: this.belongToUser,
                commentAbout: this.commentAbout,
                type: this.type,
            }
        });
    };
    PartShortComments.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return PartShortComments;
}(CoreSimpleClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartShortComments.prototype, "comments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartShortComments.prototype, "belongToUser", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartShortComments.prototype, "commentAbout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartShortComments.prototype, "type", void 0);
PartShortComments = __decorate([
    Component({
        selector: 'part-short-comments',
        templateUrl: './part-short-comments.html'
    }),
    __metadata("design:paramtypes", [CoreServices,
        NavController])
], PartShortComments);
export { PartShortComments };
//# sourceMappingURL=part-short-comments.js.map