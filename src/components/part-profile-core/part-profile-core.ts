import {
  Component,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import * as _ from 'lodash';

import {
  Validators,
  FormBuilder,
} from '@angular/forms';

import { CONSTANT } from '../../providers/constant.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { FormService } from '../../providers/form.service';

@Component({
  selector: 'part-profile-core',
  templateUrl: 'part-profile-core.html'
})
export class PartProfileCore {
  profileForm;

  formValidation = CONSTANT.FORM_VALIDATION;
  formErrors;
  initFormValue;

  dobString;
  gendersArr = CONSTANT.GENDER;

  @Input()
  showData;

  @Output()
  getProfileForm = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private anywhereService: AnywhereService,
    private formService: FormService,
  ) {}

  ngOnInit() {
    if (this.showData) {
      this.dobString = this.getConverDobString(this.showData.birthday);
      this.buildForm();
    }
  }

  getConverDobString(date) {
    let tempDate = this.anywhereService.convertDate(date);
    return tempDate.day + ' tháng ' + tempDate.month + ' năm ' + tempDate.year;
  }

  private buildForm() {
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
      ], ]
    })

    this.profileForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });

    this.onValueChanged();
  }

  private onValueChanged(data ? ) {
    this.formErrors = this.formService.onValueChanged(this.profileForm);
    this.broadcastValue();
  }

  private broadcastValue() {
    this.getProfileForm.emit({
      form: this.profileForm,
      formErrors: this.formErrors,
    });
  }

  showDatePicker() {
    let initVal = this.profileForm.value.birthday;
    let options = {
      maxDate: Date.now(),
      allowFutureDates: false,
    };
    this.anywhereService.showDatePicker(initVal, options, date => {
      this.handleGetDatePicker(date);
    })
  }

  private handleGetDatePicker(date) {
    console.log("dddddddddddddddddddddddddd", date);
    let tempFormVals = _.cloneDeep(this.profileForm.value);
    tempFormVals.birthday = date;
    this.dobString = this.getConverDobString(tempFormVals.birthday);
    this.profileForm.setValue(tempFormVals);
    this.broadcastValue();
    console.log("this.profileForm.value handleGetDatePicker", this.profileForm.value);
  }
}
