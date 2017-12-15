import {
  Component,
  Input,
} from '@angular/core';

import { LoginPage } from '../../pages/login-page/login-page';
import { AnywhereService } from '../../providers/anywhere.service';
import { NoInternetService } from '../../providers/no-internet.service';
import { CONSTANT } from '../../providers/constant.service';

import {
  Events,
} from 'ionic-angular';

@Component({
  selector: "not-login",
  templateUrl: "./not-login.html"
})
export class NotLogin {
  @Input()
  showNow;
  currentErrType = CONSTANT.ERR_TYPE.NO_INTERNET;

  showNoInternet: boolean;

  constructor(
    private anywhereService: AnywhereService,
    public noInternetService: NoInternetService,
    public events: Events,
  ) {
    this.checkShowNoInternet();
    this.toggleSubscribeErrLoad(true);
    this.toggleSubscribeInternetChanged(true);
  }

  checkShowNoInternet() {
    this.showNoInternet = this.noInternetService.hasInternet === false;
  }

  // bat tat nghe event errLoad, nghia la bat/tat internet
  toggleSubscribeErrLoad(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD, this.handleSubscribeErrLoad);
    } else {
      this.events.unsubscribe(CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD, this.handleSubscribeErrLoad);
    }
  }

  private handleSubscribeErrLoad = (res) => {
    this.checkShowNoInternet();
    console.log("handleSubscribeErrLoadhandleSubscribeErrLoad 111111", this.showNoInternet);
  }

  toggleSubscribeInternetChanged(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.INTERNET_CHANGED,
        this.handleSubscribeInternetChanged
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.INTERNET_CHANGED,
        this.handleSubscribeInternetChanged
      );
    }
  }

  private handleSubscribeInternetChanged = (res) => {
    if (res === false) {
      this.checkShowNoInternet();
    }
  }

  ngOnChanges() {
    if (this.showNow) {
      this.showLogin();
    }
  }

  showLogin() {
    if (this.showNoInternet ||
      !this.anywhereService.USER ||
      this.anywhereService.USER.logined) {
      return
    };
    this.anywhereService.showModal(LoginPage);
  }

  ngOnDestroy() {
    this.toggleSubscribeErrLoad(false);
    this.toggleSubscribeInternetChanged(false);
  }
}
