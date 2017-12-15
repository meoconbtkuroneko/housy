import {
  Component,
} from '@angular/core';

import {
  Platform,
  IonicApp,
  App,
  Events,
} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {
  // Push,
  // PushToken
} from '@ionic/cloud-angular';

import { Keyboard } from '@ionic-native/keyboard';
import { HeaderColor } from '@ionic-native/header-color';

// import { SearchPage } from '../search-page/search-page';
// import { NotificationPage } from '../notification-page/notification-page';
// import { MorePage } from '../more/more';
import { LocationDetailPage } from '../pages/location-detail-page/location-detail-page';
import { NewListingStep1 } from '../pages/new-listing-step1/new-listing-step1';
import { TabsPage } from '../pages/tabs/tabs';
import { ReportPage } from '../pages/report-page/report-page';

import { NotificationsService } from '../providers/notifications.service';
import { NoInternetService } from '../providers/no-internet.service';
import { HousyService } from '../providers/housy.service';
import { UserStorageService } from '../providers/user-storage.service';
import { ReportService } from '../providers/report.service';
import { AnywhereService } from '../providers/anywhere.service';
import { FileTransferService } from '../providers/file-transfer.service';
import { MapService } from '../providers/map.service';
import { CONSTANT } from '../providers/constant.service';
import { PushService } from '../providers/push.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  hasInternet: boolean;
  subscribeKeyboard;

  constructor(
    // public push: Push,
    private statusBar: StatusBar,
    private events: Events,
    public platform: Platform,
    public keyboard: Keyboard,
    public ionicApp: IonicApp,
    public splashScreen: SplashScreen,
    public app: App,
    private headerColor: HeaderColor,

    public fileTransferService: FileTransferService,
    private NotificationsService: NotificationsService,
    public housyService: HousyService,
    public userStorageService: UserStorageService,
    public reportService: ReportService,
    public anywhereService: AnywhereService,
    public noInternetService: NoInternetService,
    public mapService: MapService,
    public pushService: PushService,
  ) {
    this.platform.ready().then(() => {
      this.headerColor.tint(CONSTANT.HOUSY_COLOR);
      this.userStorageService.startupServices();
      this.noInternetService.init(this.handleInitNoInternet);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('this.platform.ready');
      this.addResumeListener();
      this.registerBackButtonAction();
      // statusBar.styleDefault();
      this.setStatusBarColor();
      this.splashScreen.hide();
    });
  }

  setStatusBarColor() {
    if (this.platform.is('ios')) {
      this.statusBar.overlaysWebView(false);
    }
    this.statusBar.backgroundColorByHexString(CONSTANT.STATUS_BAR_COLOR);
  }

  private handleInitNoInternet = (res) => {
    console.log("this.noInternetService.init", res)
    this.hasInternet = res;
    if (res) {
      this.housyService.startupServices();
      this.mapService.init();
      this.reportService.startupServices()
        .then(res => {
          this.reportUser();
        });
    }
  }

  addResumeListener() {
    document.addEventListener("resume", () => {
      this.reportUser();
    });
  }

  reportUser() {
    let check = this.reportService.checkContactTime();
    if (check) {
      this.openReportUser();
    }
  }

  private openReportUser() {
    this.anywhereService.showModal(ReportPage, {
      type: 'user',
      data: this.reportService.CONTACT_HOST_INFO.hostInfo
    });
  }

  registerBackButtonAction() {
    /*Overide back button*/
    console.log(">>>>>>>>>> this.ionicApp", this.ionicApp)
    console.log(">>>>>>>>>> this.app", this.app)
    this.platform.registerBackButtonAction(() => {
      console.log(">>>>>>>>>> this.keyboard", this.keyboard)
      this.subscribeKeyboard = this.keyboard.onKeyboardShow().subscribe(this.closeKeyboard) // Handles the keyboard if open
      this.subscribeKeyboard.unsubscribe();
      let activePortal =
        this.ionicApp._loadingPortal.getActive() ||
        this.ionicApp._overlayPortal.getActive() ||
        this.ionicApp._modalPortal.getActive();

      console.log("activePortalactivePortal", activePortal)

      //activePortal is the active overlay like a modal,toast,etc
      if (activePortal) {
        activePortal.dismiss().catch(() => {});;
        return;
      };

      // So it must be a view from a tab. The current tab's nav can be accessed by this.app.getActiveNav();
      let tabs = this.app.getActiveNav();
      let page = tabs.getActive();
      console.log("aaaaaaaaaaaaaaaaaaaaaaa", page);
      if (page) {
        let instance = page.instance;
        switch (page.component) {
          case LocationDetailPage:
            {
              if (instance && instance.fullLevel != 0) {
                return instance.adjustToFitScreen();
              }
              break;
            }

          case NewListingStep1:
            {
              return instance.backButtonClicked();
            }
        }
      }

      if (!tabs.canGoBack()) {
        return this.backButtonExitApp();
      }
      return tabs.pop();
    }, 0);
  }


  closeKeyboard = () => {
    this.keyboard.close();
    return;
  }

  willExit: boolean;

  backButtonExitApp() {
    if (this.willExit) {
      return this.platform.exitApp(); //Exit from app
    }
    this.willExit = true;
    this.anywhereService.showToast(CONSTANT.CLICKED_TO_CLOSE_APP);
    setTimeout(() => {
      this.willExit = false;
    }, 2000);
    // this.anywhereService.showConfirm(
    //   CONSTANT.CLOSE_APP,
    //   CONSTANT.ASK_CLOSE_APP,
    //   () => {
    //     this.platform.exitApp(); //Exit from app
    //   },
    //   () => {},
    //   CONSTANT.STRING_CANCEL,
    //   CONSTANT.CLOSE_APP,
    //   'button-alert-highlight',
    //   'disabled-selected'
    // )
  }
}
