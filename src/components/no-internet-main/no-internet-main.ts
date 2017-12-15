import {
  Component,
} from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { CONSTANT } from '../../providers/constant.service';
import { NoInternetService } from '../../providers/no-internet.service';

@Component({
  selector: 'no-internet-main',
  templateUrl: './no-internet-main.html'
})
export class NoInternetMain {
  // hien tai chua co cho nao xai, chua duoc sua chua dang hoang
  noInternetTitle = CONSTANT.NETWORK.NO_INTERNET_TITLE;
  noInternetMessage = CONSTANT.NETWORK.NO_INTERNET_STRING;
  imageErrUrl;
  constructor(
    public noInternetService: NoInternetService,
    public events: Events,
    private splashScreen: SplashScreen,
  ) {
    // this.noInternetService.subscribeHasInternetChange((res) => {
    //   this.retryInternet();
    // });
  }

  retryInternet() {
    console.log("retryInternet", this.noInternetService.hasInternet)
    if (this.noInternetService.hasInternet) {
      this.splashScreen.show();
      window.location.reload();
    }
  }
}
