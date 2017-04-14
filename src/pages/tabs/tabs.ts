import { Component } from '@angular/core';

import { RenterHomePage } from '../renter-home/renter-home';
import { SearchPage } from '../search-page/search-page';
import { FavouritePage } from '../favourite-page/favourite-page';
import { NotificationPage } from '../notification-page/notification-page';
import { MorePage } from '../more/more';

import { HousyService } from '../../services/housy.service';
import { UserStorageService } from '../../services/user-storage.service';
import {
  Events,
  ViewController
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

  constructor(
    private housyService: HousyService,
    public userStorageService: UserStorageService,
    private events: Events,
    public viewController: ViewController,
  ) {
    this.housyService.startupServices();
    this.userStorageService.startupServices();
  }

  ngOnInit() {
    this.toogleTabs();
    // console.log("this.viewController ", this.viewController.contentRef());
  }

  isHideTabs;

  toogleTabs() {
    this.events.subscribe('Tabs:toogle', (state) => {
      if (state == 'show') {
        this.isHideTabs = undefined;
      } else if (state == 'hide') {
        this.isHideTabs = true;
      }
    })
  }

}
