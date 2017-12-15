import {
  Component,
  Input,
} from '@angular/core';

import { Events } from 'ionic-angular';

import { CONSTANT } from '../../providers/constant.service';
import { NoInternetService } from '../../providers/no-internet.service';

@Component({
  selector: 'error-load',
  templateUrl: './error-load.html'
})
export class ErrorLoad {
  @Input()
  errInfo = CONSTANT.ERR_TYPE.ERR_GENERAL;
  imageErrUrl = CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.ERR_LOAD;

  constructor(
    public noInternetService: NoInternetService,
    public events: Events,
  ) {
    this.checkShowNoInternet();
    this.toggleSubscribeInternetChanged(true);
  }

  showNoInternet: boolean;

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

  checkShowNoInternet() {
    this.showNoInternet = this.noInternetService.hasInternet === false;
  }

  retryInternet() {
    console.log("retryInternet", this.noInternetService.hasInternet)
    this.checkShowNoInternet();
    this.events.publish(CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD, this.errInfo);
  }

  ngOnDestroy() {
    this.toggleSubscribeInternetChanged(false);
  }
}
