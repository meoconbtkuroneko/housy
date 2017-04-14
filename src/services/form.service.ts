import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as _ from 'lodash';

import { CONSTANT } from './constant.service';

@Injectable()
export class FormService {
  constructor() {}

  emailValidation(fieldControl: FormControl) {
    let email = fieldControl.value;
    let patt = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    let ok = patt.test(email);
    return ok ? null : { 'invalid': true };
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
