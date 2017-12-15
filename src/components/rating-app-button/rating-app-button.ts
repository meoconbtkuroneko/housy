import { Component } from '@angular/core';
import { LaunchReview } from '@ionic-native/launch-review';
import { CONSTANT } from '../../providers/constant.service';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'rating-app-button',
  templateUrl: 'rating-app-button.html'
})
export class RatingAppButton {
  appId: string;

  constructor(
    private launchReview: LaunchReview,
    private appVersion: AppVersion,
  ) {
    this.getAppId();
  }

  getAppId() {
    if (!CONSTANT.REAL_DEVICE) {
      return;
    }
    this.appVersion.getPackageName().then((res) => {
      console.log("this.appVersion.getPackageName", res);
      this.appId = res;
    });
  }

  ratingApp() {
    if (!CONSTANT.REAL_DEVICE || !this.appId) {
      console.log('Successfully launched store app');
      return;
    }
    this.launchReview.launch(this.appId).then(() => {
      console.log('Successfully launched store app');
    });
  }
}
