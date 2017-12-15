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
import { ViewController, Events, } from 'ionic-angular';
import * as _ from 'lodash';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
import { GetService } from '../../services/get.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { ProfileService } from '../../services/profile.service';
import { SelectImages } from '../../directives/select-images/select-images';
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile(getService, anywhereService, viewController, coreServices, profileService, events) {
        var _this = _super.call(this, coreServices) || this;
        _this.getService = getService;
        _this.anywhereService = anywhereService;
        _this.viewController = viewController;
        _this.coreServices = coreServices;
        _this.profileService = profileService;
        _this.events = events;
        _this.isProfileUpdating = _this.profileService.isUpdating;
        _this.handleSubscribeProfileUpdating = function (data) {
            console.log("handleSubscribeProfileUpdating", data);
            _this.isProfileUpdating = data;
            if (!_this.showData) {
                _this.getDetail();
            }
        };
        _this.toggleSubscribeProfileUpdating(true);
        _this.isProfileUpdating = _this.profileService.isUpdating;
        return _this;
    }
    Profile.prototype.toggleSubscribeProfileUpdating = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.PROFLE_IS_UPDATING, this.handleSubscribeProfileUpdating);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.PROFLE_IS_UPDATING, this.handleSubscribeProfileUpdating);
        }
    };
    Profile.prototype.ngOnInit = function () {
        this.getDetail();
    };
    Profile.prototype.getDetail = function () {
        var _this = this;
        if (this.isProfileUpdating) {
            return this.anywhereService.showToast(CONSTANT.UPDATING);
        }
        this.getService.getProfile()
            .then(function (res) {
            console.log("lay veeeeeeeeeeeeeeee", res);
            if (res.reason === CONSTANT.REASONS.ER_OK) {
                _this.profileService.updateUserData(res.user)
                    .then(function (data) {
                    console.log("lay veeeeeeeeeeeeeeee gannnnnnnn", data);
                    _this.initVals(data);
                });
            }
            else {
                _this.initVals();
            }
        }, function (err) {
            _this.initVals();
        });
    };
    Profile.prototype.initVals = function (res) {
        this.showData = res ? _.cloneDeep(res) : this.anywhereService.USER.userInfo;
        console.log("this.showData", this.showData);
    };
    Profile.prototype.getProfileFormCore = function (formData) {
        this.profileForm = formData.form;
        this.formErrors = formData.formErrors;
        if (!this.initFormValue) {
            this.initFormValue = this.compactSendData(this.profileForm.value);
        }
    };
    Profile.prototype.showSelectImages = function (type) {
        var _this = this;
        var selectImagesModal = this.anywhereService.showModal(SelectImages);
        selectImagesModal.onDidDismiss(function (data) {
            _this.handleGetImage(type, data);
        });
    };
    Profile.prototype.handleGetImage = function (type, data) {
        console.log("selectImagesModal onDidDismiss", type, data);
        if (data) {
            this.profileService.setHasChangedImages(type);
            this.showData[type] = data;
        }
    };
    Profile.prototype.saveButtonClicked = function () {
        if (!this.canGo()) {
            console.log("k co internete");
            return;
        }
        var saveData = this.beforeLeavePage();
        this.profileService.setSaveData(saveData);
        this.showData = _.assignIn(this.showData, saveData);
        this.profileService.updateUserData(this.showData);
        this.profileService.saveToServer();
        this.closeModal();
    };
    Profile.prototype.beforeLeavePage = function () {
        var tempVals = this.profileForm && this.compactSendData(this.profileForm.value);
        if (JSON.stringify(tempVals) === JSON.stringify(this.initFormValue)) {
            return;
        }
        return tempVals;
    };
    // xoa cac truong k co du lieu trong data 
    // hoac cac truong k hop le so voi formErrors, 
    Profile.prototype.compactSendData = function (data) {
        var tempVals = _.cloneDeep(data);
        for (var key in this.formErrors) {
            if ((this.formErrors[key] && this.formErrors[key] != '') ||
                (!tempVals[key]) || tempVals[key] == '') {
                delete tempVals[key];
            }
        }
        return tempVals;
    };
    Profile.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    Profile.prototype.ngOnDestroy = function () {
        this.toggleSubscribeProfileUpdating(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return Profile;
}(CoreSimpleClass));
Profile = __decorate([
    Component({
        selector: 'profile',
        templateUrl: 'profile.html'
    }),
    __metadata("design:paramtypes", [GetService,
        AnywhereService,
        ViewController,
        CoreServices,
        ProfileService,
        Events])
], Profile);
export { Profile };
//# sourceMappingURL=profile.js.map