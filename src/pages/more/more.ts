import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { UserStorageService } from '../../services/user-storage.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { AccountPage } from '../account-page/account-page';
import { SettingPage } from '../setting-page/setting-page';
import { Profile } from '../profile/profile';

import * as _ from 'lodash';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {
  constructor(
    public viewController: ViewController,
    private userStorageService: UserStorageService,
    private anywhereService: AnywhereService,
  ) {}

  USER;
  typeRole = CONSTANT.SERVER.TYPE_ROLE;
  fullUrlPicture;
  showNow;

  ngOnInit() {
    this.userStorageService.subscribeUser(res => {
      this.USER = _.cloneDeep(res);
      console.log("this.USER", this.USER);
      this.checkAndShowLogin();
      this.fullUrlPicture = this.USER &&
        this.USER.userInfo &&
        this.anywhereService.getFullImgUrl(
          this.USER.userInfo.picture,
          'user'
        );
      this.isProcessing = undefined;
    });
  }

  checkAndShowLogin() {
    this.viewController.willEnter
      .subscribe(res => {
        console.log("viewController.willEnter");
        this.showLogin();
      });
  }

  showLogin() {
    if (!this.USER.logined) {
      this.showNow = true;
      setTimeout(() => {
        this.showNow = undefined;
      }, 100);
    }
  }

  openAccount() {
    this.anywhereService.showModal(AccountPage);
  }
  openSetting() {
    if (!this.isProcessing) {
      let settingModal = this.anywhereService.showModal(SettingPage);
      settingModal.onDidDismiss(data => {
        if (data) {
          this.isProcessing = true;
        }
      })
    } else {
      this.anywhereService.showToast(CONSTANT.UPDATING);
    }
  }
  openProfile() {
    this.anywhereService.showModal(Profile);
  }

  isProcessing;
}
