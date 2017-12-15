var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';
import { Validators, FormBuilder, } from '@angular/forms';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
import { FormService } from '../../services/form.service';
var PartProfileCore = (function () {
    function PartProfileCore(formBuilder, anywhereService, formService) {
        this.formBuilder = formBuilder;
        this.anywhereService = anywhereService;
        this.formService = formService;
        this.formValidation = CONSTANT.FORM_VALIDATION;
        this.gendersArr = CONSTANT.GENDER;
        this.getProfileForm = new EventEmitter();
    }
    PartProfileCore.prototype.ngOnInit = function () {
        if (this.showData) {
            this.dobString = this.getConverDobString(this.showData.birthday);
            this.buildForm();
        }
    };
    PartProfileCore.prototype.getConverDobString = function (date) {
        var tempDate = this.anywhereService.convertDate(date);
        return tempDate.day + ' tháng ' + tempDate.month + ' năm ' + tempDate.year;
    };
    PartProfileCore.prototype.buildForm = function () {
        var _this = this;
        console.log("buildFormbuildFormbuildForm");
        this.profileForm = this.formBuilder.group({
            name: [this.showData.name, [
                    Validators.required,
                    Validators.minLength(this.formValidation.NAME.MIN),
                    Validators.maxLength(this.formValidation.NAME.MAX),
                ]],
            birthday: [this.showData.birthday, []],
            gender: [this.showData.gender, []],
            email: [this.showData.email, [
                    Validators.required,
                    this.formService.emailValidation
                ]],
            password: [null, [
                    Validators.minLength(this.formValidation.PASSWORD.MIN),
                    Validators.maxLength(this.formValidation.PASSWORD.MAX),
                ]],
            phone_number: [this.showData.phone_number, [
                    Validators.minLength(this.formValidation.PHONE_NUMBER.MIN),
                    Validators.maxLength(this.formValidation.PHONE_NUMBER.MAX),
                ]],
            identify_card: [this.showData.identify_card, [
                    Validators.minLength(this.formValidation.IDENTIFY_CARD.MIN),
                    Validators.maxLength(this.formValidation.IDENTIFY_CARD.MAX),
                ]],
            address: [this.showData.address, [
                    Validators.required,
                    Validators.minLength(this.formValidation.ADDRESS.MIN),
                    Validators.maxLength(this.formValidation.ADDRESS.MAX),
                ]],
            description: [this.showData.description, [
                    this.formService.minDescriptionValue
                ],]
        });
        this.profileForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    PartProfileCore.prototype.onValueChanged = function (data) {
        this.formErrors = this.formService.onValueChanged(this.profileForm);
        this.broadcastValue();
    };
    PartProfileCore.prototype.broadcastValue = function () {
        this.getProfileForm.emit({
            form: this.profileForm,
            formErrors: this.formErrors,
        });
    };
    PartProfileCore.prototype.showDatePicker = function () {
        var _this = this;
        var initVal = this.profileForm.value.birthday;
        var options = {
            maxDate: Date.now(),
            allowFutureDates: false,
        };
        this.anywhereService.showDatePicker(initVal, options, function (date) {
            _this.handleGetDatePicker(date);
        });
    };
    PartProfileCore.prototype.handleGetDatePicker = function (date) {
        console.log("dddddddddddddddddddddddddd", date);
        var tempFormVals = _.cloneDeep(this.profileForm.value);
        tempFormVals.birthday = date;
        this.dobString = this.getConverDobString(tempFormVals.birthday);
        this.profileForm.setValue(tempFormVals);
        this.broadcastValue();
        console.log("this.profileForm.value handleGetDatePicker", this.profileForm.value);
    };
    return PartProfileCore;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartProfileCore.prototype, "showData", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PartProfileCore.prototype, "getProfileForm", void 0);
PartProfileCore = __decorate([
    Component({
        selector: 'part-profile-core',
        templateUrl: 'part-profile-core.html'
    }),
    __metadata("design:paramtypes", [FormBuilder,
        AnywhereService,
        FormService])
], PartProfileCore);
export { PartProfileCore };
//# sourceMappingURL=part-profile-core.js.map