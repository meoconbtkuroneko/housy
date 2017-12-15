import {
  Component,
} from '@angular/core';

import { Events } from 'ionic-angular';

import { CONSTANT } from '../../providers/constant.service';
import { NoInternetService } from '../../providers/no-internet.service';

@Component({
  selector: 'no-internet',
  templateUrl: './no-internet.html'
})
export class NoInternet {
  noInternetTitle = CONSTANT.NETWORK.NO_INTERNET_TITLE;
  noInternetMessage = CONSTANT.NETWORK.NO_INTERNET_STRING;
  imageErrUrl;
  currentErrType = CONSTANT.ERR_TYPE.NO_INTERNET;
  shouldShowSpinner: boolean;
  showNoInternet: boolean;

  constructor(
    public noInternetService: NoInternetService,
    public events: Events,
  ) {
    this.checkShowNoInternet();
    this.toggleSubscribeInternetChanged(true);
    this.toggleSubscribeFinishDoRefresh(true);
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

  toggleSubscribeFinishDoRefresh(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(CONSTANT.EVENTS_NAME.FINISH_DO_REFRESH, this.handleSubscribeFinishDoRefresh);
    } else {
      this.events.unsubscribe(CONSTANT.EVENTS_NAME.FINISH_DO_REFRESH, this.handleSubscribeFinishDoRefresh);
    }
  }
  private handleSubscribeFinishDoRefresh = () => {
    console.log("handleSubscribeFinishDoRefresh")
    this.checkShowNoInternet();
  }

  checkShowNoInternet() {
    this.showNoInternet = this.noInternetService.hasInternet === false;
    this.shouldShowSpinner = false;
  }

  retryInternet() {
    console.log("retryInternet", this.noInternetService.hasInternet)
    if (this.noInternetService.hasInternet) {
      this.shouldShowSpinner = true;
      this.events.publish(CONSTANT.EVENTS_NAME.RELOAD_INTERNET);
    }
  }

  ngOnDestroy() {
    this.toggleSubscribeFinishDoRefresh(false);
    this.toggleSubscribeInternetChanged(false);
  }
}
