var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { CONSTANT } from './constant.service';
import { AnywhereService, isEmail, minNumberInputValue, checkMinLetter } from './anywhere.service';
var FormService = (function () {
    function FormService(anywhereService) {
        this.anywhereService = anywhereService;
    }
    FormService.prototype.emailValidation = function (fieldControl) {
        var email = fieldControl.value;
        var ok = isEmail(email);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.notEmptyValidation = function (fieldControl) {
        var val = fieldControl.value;
        var ok = checkMinLetter(val, 1);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.minTitleValue = function (fieldControl) {
        var obj = CONSTANT.FORM_VALIDATION.TITLE;
        var val = fieldControl.value;
        var ok = checkMinLetter(val, obj.MIN);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.minDescriptionValue = function (fieldControl) {
        var obj = CONSTANT.FORM_VALIDATION.DESCRIPTION;
        var val = fieldControl.value;
        var ok = checkMinLetter(val, obj.MIN);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.minCommentValue = function (fieldControl) {
        var obj = CONSTANT.FORM_VALIDATION.COMMENT;
        var val = fieldControl.value;
        var ok = checkMinLetter(val, obj.MIN);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.minPriceValue = function (fieldControl) {
        var type = CONSTANT.FORM_VALIDATION.RENTING_FEE.NAME;
        var val = fieldControl.value;
        var ok = minNumberInputValue(type, val);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.minAreaValue = function (fieldControl) {
        var type = CONSTANT.FORM_VALIDATION.AREA.NAME;
        var val = fieldControl.value;
        var ok = minNumberInputValue(type, val);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.minWidthValue = function (fieldControl) {
        var type = CONSTANT.FORM_VALIDATION.WIDTH.NAME;
        var val = fieldControl.value;
        var ok = minNumberInputValue(type, val);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.minHeightValue = function (fieldControl) {
        var type = CONSTANT.FORM_VALIDATION.HEIGHT.NAME;
        var val = fieldControl.value;
        var ok = minNumberInputValue(type, val);
        return ok ? null : { 'invalid': true };
    };
    FormService.prototype.isEnterKeyPress = function (e) {
        if (e && e.keyCode === 13) {
            return true;
        }
    };
    FormService.prototype.onValueChanged = function (formGroup) {
        if (!formGroup)
            return;
        var formErrors = {};
        var validationMessages = CONSTANT.FORM_VALIDATION;
        var form = formGroup;
        _.forEach(form.value, function (val, key) {
            formErrors[key] = '';
        });
        for (var field in formErrors) {
            formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var fieldName = field.toUpperCase();
                var messages = validationMessages[fieldName];
                for (var key in control.errors) {
                    formErrors[field] += messages[key];
                    break;
                }
            }
        }
        return formErrors;
    };
    return FormService;
}());
FormService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService])
], FormService);
export { FormService };
//# sourceMappingURL=form.service.js.map