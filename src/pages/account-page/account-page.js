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
import { ViewController, } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
import { LoginService } from '../../services/login.service';
import { CONSTANT } from '../../services/constant.service';
import { Profile } from '../profile/profile';
import { TransactionPage } from '../transaction-page/transaction-page';
import { DiscountPage } from '../discount-page/discount-page';
import { PageWriteCommentUser } from '../write-comment-user/write-comment-user';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
var AccountPage = (function (_super) {
    __extends(AccountPage, _super);
    function AccountPage(viewController, anywhereService, loginService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.viewController = viewController;
        _this.anywhereService = anywhereService;
        _this.loginService = loginService;
        _this.coreServices = coreServices;
        return _this;
    }
    ;
    AccountPage.prototype.openProfile = function () {
        this.anywhereService.showModal(Profile);
    };
    AccountPage.prototype.openTransactions = function () {
        this.anywhereService.showModal(TransactionPage);
    };
    AccountPage.prototype.openComments = function () {
        this.anywhereService.showModal(PageWriteCommentUser, {
            comments: null,
            belongToUser: this.anywhereService.USER.userInfo,
            commentAbout: this.anywhereService.USER.userInfo,
            type: CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_USER.name,
            isModal: true,
        });
    };
    AccountPage.prototype.getDiscount = function () {
        this.anywhereService.showModal(DiscountPage);
    };
    AccountPage.prototype.logout = function () {
        var _this = this;
        this.anywhereService.showConfirm(CONSTANT.STRING_LOG_OUT, CONSTANT.LOG_OUT, function () {
            _this.closeModal();
            _this.loginService.logout();
        }, function () { }, CONSTANT.STRING_CANCEL, CONSTANT.STRING_LOG_OUT, 'button-alert-highlight', 'disabled-selected');
    };
    AccountPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    AccountPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return AccountPage;
}(CoreSimpleClass));
AccountPage = __decorate([
    Component({
        selector: 'account-page',
        templateUrl: 'account-page.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        AnywhereService,
        LoginService,
        CoreServices])
], AccountPage);
export { AccountPage };
//# sourceMappingURL=account-page.js.map