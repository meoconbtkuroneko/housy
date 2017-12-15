import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { PostService } from '../../providers/post.service';
import { CONSTANT } from '../../providers/constant.service';
import { LoadingService } from '../../providers/loading.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { FormService } from '../../providers/form.service';

@Component({
  selector: 'forget-password',
  templateUrl: 'forget-password.html'
})
export class ForgetPassword {
  private forgetPasswordForm: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private viewController: ViewController,
    private loadingService: LoadingService,
    private anywhereService: AnywhereService,
    private formService: FormService,
  ) {};

  stringValidations = CONSTANT.FORM_VALIDATION;
  formErrors: any;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [
        Validators.compose([
          Validators.required,
          this.formService.emailValidation
        ]),
      ]],
    })

    this.forgetPasswordForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });

    this.onValueChanged();
  }

  onValueChanged(data ? ) {
    this.formErrors = this.formService.onValueChanged(this.forgetPasswordForm);
  }

  sendEmail() {
    this.loadingService.toggleLoading(true);
    this.postService.resetPassword(this.forgetPasswordForm.value)
      .then(res => {
        console.log("redddddddddddddddddddddd", res);
        if (res.reason == CONSTANT.REASONS.ER_OK) {
          this.closeModal();
          this.finishLoading(this.stringValidations.EMAIL.SEND_PASS);
        } else {
          this.finishLoading(this.stringValidations.EMAIL.NOT_REG_EMAIL);
        }
      }, err => {
        this.finishLoading(CONSTANT.LOGIN.ERR);
      });
  }

  // isToast: boolean: hien toast hay la alert. mac dinh la alert
  finishLoading(message ? , isToast ? ) {
    this.loadingService.toggleLoading(false);
    if (message) {
      isToast ?
        this.anywhereService.showToast(message) :
        this.anywhereService.showAlert(message);
    }
  }

  login() {
    this.closeModal();
  }

  checkEnterKeyPress(e) {
    if (this.formService.isEnterKeyPress(e) && this.forgetPasswordForm.valid) {
      this.sendEmail();
    }
  }

  closeModal() {
    this.viewController.dismiss();
  }
}
