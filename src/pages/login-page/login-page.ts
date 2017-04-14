import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { PostService } from '../../services/post.service';
import { UserStorageService } from '../../services/user-storage.service';
import { LoadingService } from '../../services/loading.service';
import { AnywhereService } from '../../services/anywhere.service';
import { FormService } from '../../services/form.service';
import { LoginService } from '../../services/login.service';
import { CONSTANT } from '../../services/constant.service';
import { RegisterPage } from '../register-page/register-page';
import { ForgetPassword } from '../forget-password/forget-password';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
  private loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
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
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([
          Validators.required,
        ]),
      ],
      password: ['', [
        Validators.required,
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

  login() {
    this.loadingService.broadcastChange(true);

    let sendData = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginService.loginByUserPassword(sendData)
      .then(res => {
        this.loginSuccess(res);
      }, err => {
        this.finishLoading(CONSTANT.LOGIN.ERR);
      });
  }

  loginSuccess(res) {
    console.log("loginSuccessloginSuccessloginSuccess", res);
    switch (res) {
      case 1:
        {
          this.closeModal();
          let msg = CONSTANT.LOGIN.SUCCESS + this.anywhereService.USER.userInfo.name;
          this.finishLoading(msg, true);
          break;
        }
      case 0:
        {
          this.finishLoading(CONSTANT.LOGIN.NOT_ACTIVE);
          break;
        }
      case -1:
        {
          this.finishLoading(CONSTANT.LOGIN.ERR);
          break;
        }
    }
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

  register() {
    this.anywhereService.showModal(RegisterPage);
  }

  forgetPassword() {
    this.anywhereService.showModal(ForgetPassword);
  }

  loginFacebook() {
    this.loadingService.broadcastChange(true);
    this.loginService.loginFacebook()
      .then(res => {
        this.loginSuccess(res);
      }, err => {
        this.finishLoading(CONSTANT.LOGIN.ERR);
      });
  }

  loginGoogle() {
    this.loadingService.broadcastChange(true);
    this.loginService.loginGoogle()
      .then(res => {
        this.loginSuccess(res);
      }, err => {
        this.finishLoading(CONSTANT.LOGIN.ERR);
      });
  }

  closeModal() {
    this.viewController.dismiss();
  }
}
