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
import { CONSTANT } from '../../services/constant.service';
import { LoadingService } from '../../services/loading.service';
import { AnywhereService } from '../../services/anywhere.service';
import { FormService } from '../../services/form.service';
import { ConditionUse } from '../condition-use/condition-use';
import { SecurityPolicy } from '../security-policy/security-policy';
var RegisterPage = (function () {
    function RegisterPage(postService, formBuilder, userStorageService, viewController, loadingService, anywhereService, formService) {
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
    RegisterPage.prototype.ngOnInit = function () {
        this.buildForm();
    };
    RegisterPage.prototype.buildForm = function () {
        var _this = this;
        this.registerForm = this.formBuilder.group({
            name: ['', [
                    Validators.required,
                    Validators.minLength(this.stringValidations.NAME.MIN),
                    Validators.maxLength(this.stringValidations.NAME.MAX),
                ]],
            email: ['',
                Validators.compose([
                    Validators.required,
                    this.formService.emailValidation
                ]),
            ],
            password: ['', [
                    Validators.required,
                    Validators.minLength(this.stringValidations.PASSWORD.MIN),
                    Validators.maxLength(this.stringValidations.PASSWORD.MAX),
                ]],
        });
        this.registerForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    RegisterPage.prototype.onValueChanged = function (data) {
        this.formErrors = this.formService.onValueChanged(this.registerForm);
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.loadingService.toggleLoading(true);
        var sendData = {
            name: this.registerForm.value.name,
            username: this.registerForm.value.email,
            password: this.registerForm.value.password,
        };
        this.postService.registerNewAccount(sendData)
            .then(function (res) {
            console.log("redddddddddddddddddddddd", res);
            switch (res.reason) {
                case CONSTANT.REASONS.ER_OK:
                    {
                        _this.closeModal();
                        _this.finishLoading(CONSTANT.REGISTRATION.SUCCESS);
                        break;
                    }
                case CONSTANT.REASONS.ER_USER_EXIST:
                    {
                        _this.finishLoading(CONSTANT.REGISTRATION.ER_USER_EXIST);
                        break;
                    }
                case CONSTANT.REASONS.ER_USER_INVALID_USERNAME:
                    {
                        _this.finishLoading(CONSTANT.REGISTRATION.ER_USER_INVALID_USERNAME);
                        break;
                    }
            }
        }, function (err) {
            _this.finishLoading(CONSTANT.REGISTRATION.ERR);
        });
    };
    // isToast: boolean: hien toast hay la alert. mac dinh la alert
    RegisterPage.prototype.finishLoading = function (message, isToast) {
        this.loadingService.toggleLoading(false);
        if (message) {
            isToast ?
                this.anywhereService.showToast(message) :
                this.anywhereService.showAlert(message);
        }
    };
    RegisterPage.prototype.togglePass = function () {
        this.showPass = !this.showPass;
        if (this.showPass) {
            this.typePass = 'text';
        }
        else {
            this.typePass = 'password';
        }
    };
    RegisterPage.prototype.login = function () {
        this.closeModal();
    };
    RegisterPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    RegisterPage.prototype.openConditionUse = function () {
        this.anywhereService.showModal(ConditionUse);
    };
    RegisterPage.prototype.openSecurityPolicy = function () {
        this.anywhereService.showModal(SecurityPolicy);
    };
    RegisterPage.prototype.checkEnterKeyPress = function (e) {
        if (this.formService.isEnterKeyPress(e) && this.registerForm.valid) {
            this.register();
        }
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Component({
        selector: 'register-page',
        templateUrl: 'register-page.html'
    }),
    __metadata("design:paramtypes", [PostService,
        FormBuilder,
        UserStorageService,
        ViewController,
        LoadingService,
        AnywhereService,
        FormService])
], RegisterPage);
export { RegisterPage };
//# sourceMappingURL=register-page.js.map