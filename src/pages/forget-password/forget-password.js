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
import { Validators, FormBuilder } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { PostService } from '../../services/post.service';
import { CONSTANT } from '../../services/constant.service';
import { LoadingService } from '../../services/loading.service';
import { AnywhereService } from '../../services/anywhere.service';
import { FormService } from '../../services/form.service';
var ForgetPassword = (function () {
    function ForgetPassword(postService, formBuilder, viewController, loadingService, anywhereService, formService) {
        this.postService = postService;
        this.formBuilder = formBuilder;
        this.viewController = viewController;
        this.loadingService = loadingService;
        this.anywhereService = anywhereService;
        this.formService = formService;
        this.stringValidations = CONSTANT.FORM_VALIDATION;
    }
    ;
    ForgetPassword.prototype.ngOnInit = function () {
        this.buildForm();
    };
    ForgetPassword.prototype.buildForm = function () {
        var _this = this;
        this.forgetPasswordForm = this.formBuilder.group({
            email: ['', [
                    Validators.compose([
                        Validators.required,
                        this.formService.emailValidation
                    ]),
                ]],
        });
        this.forgetPasswordForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    ForgetPassword.prototype.onValueChanged = function (data) {
        this.formErrors = this.formService.onValueChanged(this.forgetPasswordForm);
    };
    ForgetPassword.prototype.sendEmail = function () {
        var _this = this;
        this.loadingService.toggleLoading(true);
        this.postService.resetPassword(this.forgetPasswordForm.value)
            .then(function (res) {
            console.log("redddddddddddddddddddddd", res);
            if (res.reason == CONSTANT.REASONS.ER_OK) {
                _this.closeModal();
                _this.finishLoading(_this.stringValidations.EMAIL.SEND_PASS);
            }
            else {
                _this.finishLoading(_this.stringValidations.EMAIL.NOT_REG_EMAIL);
            }
        }, function (err) {
            _this.finishLoading(CONSTANT.LOGIN.ERR);
        });
    };
    // isToast: boolean: hien toast hay la alert. mac dinh la alert
    ForgetPassword.prototype.finishLoading = function (message, isToast) {
        this.loadingService.toggleLoading(false);
        if (message) {
            isToast ?
                this.anywhereService.showToast(message) :
                this.anywhereService.showAlert(message);
        }
    };
    ForgetPassword.prototype.login = function () {
        this.closeModal();
    };
    ForgetPassword.prototype.checkEnterKeyPress = function (e) {
        if (this.formService.isEnterKeyPress(e) && this.forgetPasswordForm.valid) {
            this.sendEmail();
        }
    };
    ForgetPassword.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    return ForgetPassword;
}());
ForgetPassword = __decorate([
    Component({
        selector: 'forget-password',
        templateUrl: 'forget-password.html'
    }),
    __metadata("design:paramtypes", [PostService,
        FormBuilder,
        ViewController,
        LoadingService,
        AnywhereService,
        FormService])
], ForgetPassword);
export { ForgetPassword };
//# sourceMappingURL=forget-password.js.map