import { Component } from '@angular/core';

import { UserStorageService } from '../../providers/user-storage.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { AccountPage } from '../account-page/account-page';
import { SettingPage } from '../setting-page/setting-page';
import { AboutPage } from '../about-page/about-page';
import { Profile } from '../profile/profile';

import {
  Events,
} from 'ionic-angular';

import {
  CoreClassNeedLogin,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage extends CoreClassNeedLogin {
  constructor(
    private userStorageService: UserStorageService,
    private anywhereService: AnywhereService,
    public events: Events,
    public coreServices: CoreServices,
  ) {
    super(coreServices);
    this.toggleSubscribeSettingChanged(true);
  }

  newRoleDes;

  allRole = CONSTANT.USER_ROLE;

  ngOnInit() {
    this.getAllData();
  }

  getNewRole() {
    let currentRole = this.USER.role;
    let newRoleObj: any = CONSTANT.USER_ROLE.OWNER;
    if (currentRole === newRoleObj.name) {
      newRoleObj = CONSTANT.USER_ROLE.RENTER;
    }
    this.newRoleDes = newRoleObj.description;
    return newRoleObj.name;
  }

  // inherit from parent;
  handleSubscribeUser(res) {
    this.getAllData();
  }

  // inherit from parent;
  getAllData() {
    this.getNewRole();
    this.toggleIsProcessing(false);
  }

  toggleSubscribeSettingChanged(isSubscibe: boolean) {
    if (isSubscibe) {
      this.events.subscribe(CONSTANT.EVENTS_NAME.SETTING_CHANGED, this.handleSettingChanged);
    } else {
      this.events.unsubscribe(CONSTANT.EVENTS_NAME.SETTING_CHANGED, this.handleSettingChanged);
    }
  }

  private handleSettingChanged = () => {
    this.toggleIsProcessing(true);
  }

  openAccount() {
    this.anywhereService.showModal(AccountPage);
  }

  openSetting() {
    if (this.isProcessing) {
      return this.anywhereService.showToast(CONSTANT.UPDATING);
    }
    this.anywhereService.showModal(SettingPage);
  }

  openProfile() {
    this.anywhereService.showModal(Profile);
  }

  switchRole() {
    let data: any = {
      currentRole: this.USER.role,
    };
    data.newRole = this.getNewRole();
    this.newRoleDes = CONSTANT.USER_ROLE[data.newRole.toUpperCase()].description;
    this.userStorageService.setRole(data.newRole);
  }

  openInfo() {
    this.anywhereService.showModal(AboutPage);
  }

  ngOnDestroy() {
    this.toggleSubscribeSettingChanged(false);
    super.ngOnDestroy();
  }
}
