import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as _ from 'lodash';

import { CONSTANT } from './constant.service';
import {
  AnywhereService,
  isEmail,
  minNumberInputValue,
  checkMinLetter
} from './anywhere.service';

@Injectable()
export class FormService {
  constructor(
    public anywhereService: AnywhereService) {}

  emailValidation(fieldControl: FormControl) {
    let email = fieldControl.value;
    let ok = isEmail(email);
    return ok ? null : { 'invalid': true };
  }

  notEmptyValidation(fieldControl: FormControl) {
    let val = fieldControl.value;
    let ok = checkMinLetter(val, 1);
    return ok ? null : { 'invalid': true };
  }

  minTitleValue(fieldControl: FormControl) {
    let obj = CONSTANT.FORM_VALIDATION.TITLE;
    let val = fieldControl.value;
    let ok = checkMinLetter(val, obj.MIN);
    return ok ? null : { 'invalid': true };
  }

  minDescriptionValue(fieldControl: FormControl) {
    let obj = CONSTANT.FORM_VALIDATION.DESCRIPTION;
    let val = fieldControl.value;
    let ok = checkMinLetter(val, obj.MIN);
    return ok ? null : { 'invalid': true };
  }

  minCommentValue(fieldControl: FormControl) {
    let obj = CONSTANT.FORM_VALIDATION.COMMENT;
    let val = fieldControl.value;
    let ok = checkMinLetter(val, obj.MIN);
    return ok ? null : { 'invalid': true };
  }

  minPriceValue(fieldControl: FormControl) {
    let type = CONSTANT.FORM_VALIDATION.RENTING_FEE.NAME;
    let val = fieldControl.value;
    let ok = minNumberInputValue(type, val);
    return ok ? null : { 'invalid': true };
  }

  minAreaValue(fieldControl: FormControl) {
    let type = CONSTANT.FORM_VALIDATION.AREA.NAME;
    let val = fieldControl.value;
    let ok = minNumberInputValue(type, val);
    return ok ? null : { 'invalid': true };
  }

  minWidthValue(fieldControl: FormControl) {
    let type = CONSTANT.FORM_VALIDATION.WIDTH.NAME;
    let val = fieldControl.value;
    let ok = minNumberInputValue(type, val, true);
    return ok ? null : { 'invalid': true };
  }

  minHeightValue(fieldControl: FormControl) {
    let type = CONSTANT.FORM_VALIDATION.HEIGHT.NAME;
    let val = fieldControl.value;
    let ok = minNumberInputValue(type, val, true);
    return ok ? null : { 'invalid': true };
  }

  isEnterKeyPress(e) {
    if (e && e.keyCode === 13) {
      return true;
    }
  }

  onValueChanged(formGroup: FormGroup) {
    if (!formGroup) return;
    let formErrors: any = {};
    const validationMessages = CONSTANT.FORM_VALIDATION;
    const form: FormGroup = formGroup;
    _.forEach(form.value, (val, key) => {
      formErrors[key] = '';
    });

    for (const field in formErrors) {
      formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const fieldName = field.toUpperCase();
        const messages = validationMessages[fieldName];
        for (const key in control.errors) {
          formErrors[field] += messages[key];
          break;
        }
      }
    }
    return formErrors;
  }
}
