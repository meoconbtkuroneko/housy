import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { PostService } from '../../services/post.service';
import { CONSTANT } from '../../services/constant.service';
import { LoadingService } from '../../services/loading.service';
import { AnywhereService } from '../../services/anywhere.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'forget-password',
  templateUrl: 'forget-password.html'
})
export class ForgetPassword {
  private loginForm: FormGroup;

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
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.compose([
          Validators.required,
          this.formService.emailValidation
        ]),
      ]],
    })

    this.loginForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });

    this.onValueChanged();
  }

  onValueChanged(data ? ) {
    this.formErrors = this.formService.onValueChanged(this.loginForm);
  }

  sendEmail() {
    this.loadingService.broadcastChange(true);
    this.postService.resetPassword(this.loginForm.value)
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
    this.loadingService.broadcastChange(false);
    if (message) {
      isToast ?
        this.anywhereService.showToast(message) :
        this.anywhereService.showAlert(message);
    }
  }

  login() {
    this.closeModal();
  }

  closeModal() {
    this.viewController.dismiss();
  }
}
