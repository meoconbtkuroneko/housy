import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { CONSTANT } from '../../providers/constant.service';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'about-page',
  templateUrl: 'about-page.html',
})
export class AboutPage {
  appName: string;
  version: string;
  logoUrl: string;
  contact: string;

  constructor(
    private viewController: ViewController,
    private appVersion: AppVersion,
  ) {
    this.getAppInfo();
  }

  getAppInfo() {
    this.logoUrl = CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.HOUSY_ICON;
    this.contact = CONSTANT.CONTACT;
    if (!CONSTANT.REAL_DEVICE) {
      return;
    }
    this.appVersion.getAppName().then((res) => {
      console.log("this.appVersion.getAppName", res);
      this.appName = res;
    });

    this.appVersion.getVersionNumber().then((res) => {
      console.log("this.appVersion.getVersionNumber", res);
      this.version = res;
    });
  }

  closeModal() {
    this.viewController.dismiss();
  }
}
