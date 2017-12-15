import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { PostService } from '../../providers/post.service';
import { UserStorageService } from '../../providers/user-storage.service';
import { CONSTANT } from '../../providers/constant.service';
import { LoadingService } from '../../providers/loading.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { FormService } from '../../providers/form.service';
import { ConditionUse } from '../condition-use/condition-use';
import { SecurityPolicy } from '../security-policy/security-policy';

@Component({
  selector: 'register-page',
  templateUrl: 'register-page.html'
})
export class RegisterPage {
  private registerForm: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private userStorageService: UserStorageService,
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
    })

    this.registerForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });

    this.onValueChanged();
  }

  onValueChanged(data ? ) {
    this.formErrors = this.formService.onValueChanged(this.registerForm);
  }

  register() {
    this.loadingService.toggleLoading(true);
    let sendData = {
      name: this.registerForm.value.name,
      username: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.postService.registerNewAccount(sendData)
      .then(res => {
        console.log("redddddddddddddddddddddd", res);
        switch (res.reason) {
          case CONSTANT.REASONS.ER_OK:
            {
              this.closeModal();
              this.finishLoading(CONSTANT.REGISTRATION.SUCCESS);
              break;
            }
          case CONSTANT.REASONS.ER_USER_EXIST:
            {
              this.finishLoading(CONSTANT.REGISTRATION.ER_USER_EXIST);
              break;
            }
          case CONSTANT.REASONS.ER_USER_INVALID_USERNAME:
            {
              this.finishLoading(CONSTANT.REGISTRATION.ER_USER_INVALID_USERNAME);
              break;
            }
        }
      }, err => {
        this.finishLoading(CONSTANT.REGISTRATION.ERR);
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

  showPass: boolean;
  typePass = 'password';
  togglePass() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.typePass = 'text';
    } else {
      this.typePass = 'password';
    }
  }

  login() {
    this.closeModal();
  }

  closeModal() {
    this.viewController.dismiss();
  }

  openConditionUse() {
    this.anywhereService.showModal(ConditionUse);
  }

  openSecurityPolicy() {
    this.anywhereService.showModal(SecurityPolicy);
  }

  checkEnterKeyPress(e) {
    if (this.formService.isEnterKeyPress(e) && this.registerForm.valid) {
      this.register();
    }
  }
}
