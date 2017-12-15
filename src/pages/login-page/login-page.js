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
import { UserStorageService } from '../../services/user-storage.service';
import { LoadingService } from '../../services/loading.service';
import { AnywhereService } from '../../services/anywhere.service';
import { FormService } from '../../services/form.service';
import { LoginService } from '../../services/login.service';
import { CONSTANT } from '../../services/constant.service';
import { RegisterPage } from '../register-page/register-page';
import { ForgetPassword } from '../forget-password/forget-password';
var LoginPage = (function () {
    function LoginPage(loginService, postService, formBuilder, userStorageService, viewController, loadingService, anywhereService, formService) {
        this.loginService = loginService;
        this.postService = postService;
        this.formBuilder = formBuilder;
        this.userStorageService = userStorageService;
        this.viewController = viewController;
        this.loadingService = loadingService;
        this.anywhereService = anywhereService;
        this.formService = formService;
        this.stringValidations = CONSTANT.FORM_VALIDATION;
        this.typePass = 'password';
    }
    ;
    LoginPage.prototype.ngOnInit = function () {
        this.buildForm();
    };
    LoginPage.prototype.buildForm = function () {
        var _this = this;
        this.loginForm = this.formBuilder.group({
            email: ['',
                Validators.compose([
                    Validators.required,
                ]),
            ],
            password: ['', [
                    Validators.required,
                ]],
        });
        this.loginForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    LoginPage.prototype.onValueChanged = function (data) {
        this.formErrors = this.formService.onValueChanged(this.loginForm);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loadingService.toggleLoading(true);
        var sendData = {
            username: this.loginForm.value.email,
            password: this.loginForm.value.password,
        };
        this.loginService.loginByUserPassword(sendData)
            .then(function (res) {
            _this.loginSuccess(res);
        }, function (err) {
            _this.finishLoading(CONSTANT.LOGIN.ERR);
        });
    };
    LoginPage.prototype.loginSuccess = function (res) {
        console.log("loginSuccessloginSuccessloginSuccess", res);
        switch (res) {
            case 1:
                {
                    this.closeModal();
                    var msg = CONSTANT.LOGIN.SUCCESS + this.anywhereService.USER.userInfo.name;
                    this.finishLoading(msg, true);
                    break;
                }
            case 0:
                {
                    this.finishLoading(CONSTANT.LOGIN.NOT_ACTIVE);
                    break;
                }
            case -1:
                {
                    this.finishLoading(CONSTANT.LOGIN.ERR);
                    break;
                }
        }
    };
    // isToast: boolean: hien toast hay la alert. mac dinh la alert
    LoginPage.prototype.finishLoading = function (message, isToast) {
        this.loadingService.toggleLoading(false);
        if (message) {
            isToast ?
                this.anywhereService.showToast(message) :
                this.anywhereService.showAlert(message);
        }
    };
    LoginPage.prototype.togglePass = function () {
        this.showPass = !this.showPass;
        if (this.showPass) {
            this.typePass = 'text';
        }
        else {
            this.typePass = 'password';
        }
    };
    LoginPage.prototype.register = function () {
        this.anywhereService.showModal(RegisterPage);
    };
    LoginPage.prototype.forgetPassword = function () {
        this.anywhereService.showModal(ForgetPassword);
    };
    LoginPage.prototype.loginFacebook = function () {
        var _this = this;
        this.loadingService.toggleLoading(true);
        this.loginService.loginFacebook()
            .then(function (res) {
            _this.loginSuccess(res);
        }, function (err) {
            _this.finishLoading(CONSTANT.LOGIN.ERR);
        });
    };
    LoginPage.prototype.loginGoogle = function () {
        var _this = this;
        this.loadingService.toggleLoading(true);
        this.loginService.loginGoogle()
            .then(function (res) {
            _this.loginSuccess(res);
        }, function (err) {
            _this.finishLoading(CONSTANT.LOGIN.ERR);
        });
    };
    LoginPage.prototype.checkEnterKeyPress = function (e) {
        if (this.formService.isEnterKeyPress(e) && this.loginForm.valid) {
            this.login();
        }
    };
    LoginPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'login-page',
        templateUrl: 'login-page.html'
    }),
    __metadata("design:paramtypes", [LoginService,
        PostService,
        FormBuilder,
        UserStorageService,
        ViewController,
        LoadingService,
        AnywhereService,
        FormService])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login-page.js.map