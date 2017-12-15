import { Injectable } from '@angular/core';

import { AnywhereService } from './anywhere.service';
import { UserStorageService } from './user-storage.service';
import { CONSTANT } from './constant.service';
import { LoginPage } from '../pages/login-page/login-page';

import { Events } from 'ionic-angular';

@Injectable()
export class CallbackAfterLoginService {
  constructor(
    private anywhereService: AnywhereService,
    private userStorageService: UserStorageService,
    private events: Events,
  ) {
    this.toggleSubscribeLoginSuccess(true);
  }

  shouldCallbackAfterLogin: boolean;
  callbackType;
  callback;

  toggleSubscribeLoginSuccess(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.LOGIN_SUCCESS,
        this._handleSubscribeLoginSuccess
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.LOGIN_SUCCESS,
        this._handleSubscribeLoginSuccess
      );
    }
  }

  private _handleSubscribeLoginSuccess = () => {
    console.log("_handleSubscribeLoginSuccess CallbackAfterLoginService")
    this.events.publish(
      CONSTANT.EVENTS_NAME.DO_CALLBACK_AFTER_LOGINED,
      this.callbackType
    );
  }

  checkHasLogined(type, handleAfterLogined, handleNotLogined ? ) {
    if (this.anywhereService.USER &&
      this.anywhereService.USER.logined) {
      return handleAfterLogined();
    }
    this.setCallbackType(type);
    this.toggleShouldCallbackAfterLogin(true);
    this.anywhereService.showModal(LoginPage);
    if (handleNotLogined) {
      handleNotLogined();
    }
  };

  setCallbackType(type) {
    this.callbackType = type || undefined;
  }

  toggleShouldCallbackAfterLogin(should: boolean) {
    if (should) {
      this.shouldCallbackAfterLogin = true;
    } else {
      this.shouldCallbackAfterLogin = false;
    }
  }

  checkShouldDoCallback(currentType) {
    if (this.anywhereService.USER &&
      this.anywhereService.USER.logined &&
      this.shouldCallbackAfterLogin &&
      this.getCallbackType() === currentType) {
      this.toggleShouldCallbackAfterLogin(false);
      return true;
    }
  }

  getCallbackType() {
    return this.callbackType;
  }

  ngOnDestroy() {
    this.toggleSubscribeLoginSuccess(false);
  }
}
