import {
  Component,
  ViewChild,
} from '@angular/core';


import { RenterHomePage } from '../renter-home/renter-home';
import { OwnerHomePage } from '../owner-home/owner-home';
import { SearchPage } from '../search-page/search-page';
import { FavouritePage } from '../favourite-page/favourite-page';
import { NotificationPage } from '../notification-page/notification-page';
import { MorePage } from '../more/more';
// import { HomeDetail } from '../home-detail/home-detail';

import { UserStorageService } from '../../providers/user-storage.service';
import { CONSTANT } from '../../providers/constant.service';

import * as _ from 'lodash';

import {
  Events,
  Tabs,
  Platform,
  NavController,
  App
} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = RenterHomePage;
  tab2Root: any = SearchPage;
  tab3Root: any = FavouritePage;
  tab4Root: any = NotificationPage;
  tab5Root: any = MorePage;
  tab6Root: any = OwnerHomePage;

  isHideTabs: boolean;
  isOwner: boolean;
  oldUserStatus;
  countNotifications: number;

  @ViewChild('mainTabs') tabRef: Tabs;

  constructor(
    public userStorageService: UserStorageService,
    public platform: Platform,
    private events: Events,
    private navController: NavController,
    public appCtrl: App,
  ) {
    this.platform.ready().then(() => {
      this.toggleSubscribeUser(true);
      this.toggleSubscribeToggleTabs(true);
      this.toggleSubscribeCountNotifications(true);
    });
  }

  toggleSubscribeUser(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED,
        this._handleSubscribeUser
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED,
        this._handleSubscribeUser
      );
    }
  }

  private _handleSubscribeUser = (res ? ) => {
    console.log("_handleSubscribeUser Tabs", res);
    if (!res || _.isEmpty(res)) {
      return;
    }

    if (this.isOwner === undefined ||
      (this.oldUserStatus && (res.role != this.oldUserStatus.role))) {
      this.checkIsOwner();
      this.tabRef && this.tabRef.select(this.isOwner ? 0 : 1);
    }

    if (this.oldUserStatus && !res.logined && this.oldUserStatus.logined) {
      if (this.tabRef) {
        this.tabRef.select(1);
      }
    }
    // if (this.oldUserStatus &&
    //   ((this.oldUserStatus.logined != res.logined) ||
    //     (this.oldUserStatus.role !== res.role))) {
    //   // if (this.tabRef) {
    //   //   this.tabRef.select(this.isOwner ? 0 : 1);
    //   // }
    // }
    this.oldUserStatus = this.userStorageService.USER;
  }

  checkIsOwner() {
    this.isOwner = (this.userStorageService.USER.role === CONSTANT.USER_ROLE.OWNER.name);
    console.log("checkIsOwner this.userStorageService.USER.role", this.userStorageService.USER.role);
    return this.isOwner;
  }

  toggleSubscribeToggleTabs(isSubscibe: boolean) {
    if (isSubscibe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.TOGGLE_TABS,
        this._handleSubscribeToggleTabs
      )
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.TOGGLE_TABS,
        this._handleSubscribeToggleTabs
      )
    }
  }

  private _handleSubscribeToggleTabs = (state) => {
    if (state == 'show') {
      this.isHideTabs = undefined;
    } else if (state == 'hide') {
      this.isHideTabs = true;
    }
  }

  toggleSubscribeCountNotifications(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.NOTIFICATION_CHANGE_COUNT,
        this._handleSubscribeCountNotifications
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.NOTIFICATION_CHANGE_COUNT,
        this._handleSubscribeCountNotifications
      );
    }
  }

  private _handleSubscribeCountNotifications = (data) => {
    console.log("_handleSubscribeCountNotifications Tabs", data);
    this.countNotifications = data.count;
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
    this.toggleSubscribeToggleTabs(false);
    this.toggleSubscribeCountNotifications(false);
  }
}
