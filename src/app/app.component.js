var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, } from '@angular/core';
import { Platform, IonicApp, App, Events, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
// import { SearchPage } from '../search-page/search-page';
// import { NotificationPage } from '../notification-page/notification-page';
// import { MorePage } from '../more/more';
import { LocationDetailPage } from '../pages/location-detail-page/location-detail-page';
import { TabsPage } from '../pages/tabs/tabs';
import { ReportPage } from '../pages/report-page/report-page';
import { NotificationsService } from '../services/notifications.service';
import { NoInternetService } from '../services/no-internet.service';
import { HousyService } from '../services/housy.service';
import { UserStorageService } from '../services/user-storage.service';
import { ReportService } from '../services/report.service';
import { AnywhereService } from '../services/anywhere.service';
import { FileTransferService } from '../services/file-transfer.service';
import { MapService } from '../services/map.service';
import { CONSTANT } from '../services/constant.service';
import { PushService } from '../services/push.service';
var MyApp = (function () {
    function MyApp(
        // public push: Push,
        statusBar, events, platform, keyboard, ionicApp, splashScreen, app, fileTransferService, NotificationsService, housyService, userStorageService, reportService, anywhereService, noInternetService, mapService, pushService) {
        var _this = this;
        this.statusBar = statusBar;
        this.events = events;
        this.platform = platform;
        this.keyboard = keyboard;
        this.ionicApp = ionicApp;
        this.splashScreen = splashScreen;
        this.app = app;
        this.fileTransferService = fileTransferService;
        this.NotificationsService = NotificationsService;
        this.housyService = housyService;
        this.userStorageService = userStorageService;
        this.reportService = reportService;
        this.anywhereService = anywhereService;
        this.noInternetService = noInternetService;
        this.mapService = mapService;
        this.pushService = pushService;
        this.rootPage = TabsPage;
        this.handleInitNoInternet = function (res) {
            console.log("this.noInternetService.init", res);
            _this.hasInternet = res;
            if (res) {
                _this.housyService.startupServices();
                _this.mapService.init();
                _this.reportService.startupServices()
                    .then(function (res) {
                    _this.reportUser();
                });
            }
        };
        this.closeKeyboard = function () {
            _this.keyboard.close();
            return;
        };
        this.platform.ready().then(function () {
            _this.userStorageService.startupServices();
            _this.noInternetService.init(_this.handleInitNoInternet);
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            console.log('this.platform.ready');
            _this.addResumeListener();
            _this.registerBackButtonAction();
            // statusBar.styleDefault();
            _this.setStatusBarColor();
            _this.splashScreen.hide();
        });
    }
    MyApp.prototype.setStatusBarColor = function () {
        if (this.platform.is('ios')) {
            this.statusBar.overlaysWebView(false);
        }
        this.statusBar.backgroundColorByHexString(CONSTANT.STATUS_BAR_COLOR);
    };
    MyApp.prototype.addResumeListener = function () {
        var _this = this;
        document.addEventListener("resume", function () {
            _this.reportUser();
        });
    };
    MyApp.prototype.reportUser = function () {
        var check = this.reportService.checkContactTime();
        if (check) {
            this.openReportUser();
        }
    };
    MyApp.prototype.openReportUser = function () {
        this.anywhereService.showModal(ReportPage, {
            type: 'user',
            data: this.reportService.CONTACT_HOST_INFO.hostInfo
        });
    };
    MyApp.prototype.registerBackButtonAction = function () {
        var _this = this;
        /*Overide back button*/
        console.log(">>>>>>>>>> this.ionicApp", this.ionicApp);
        console.log(">>>>>>>>>> this.app", this.app);
        this.platform.registerBackButtonAction(function () {
            console.log(">>>>>>>>>> this.keyboard", _this.keyboard);
            _this.subscribeKeyboard = _this.keyboard.onKeyboardShow().subscribe(_this.closeKeyboard); // Handles the keyboard if open
            _this.subscribeKeyboard.unsubscribe();
            var activePortal = _this.ionicApp._loadingPortal.getActive() ||
                _this.ionicApp._overlayPortal.getActive() ||
                _this.ionicApp._modalPortal.getActive() ||
                _this.ionicApp._toastPortal.getActive();
            console.log("activePortalactivePortal", activePortal);
            //activePortal is the active overlay like a modal,toast,etc
            if (activePortal) {
                activePortal.dismiss().catch(function () { });
                ;
                return;
            }
            ;
            // So it must be a view from a tab. The current tab's nav can be accessed by this.app.getActiveNav();
            var tabs = _this.app.getActiveNav();
            var page = tabs.getActive();
            console.log("aaaaaaaaaaaaaaaaaaaaaaa", page);
            if (page) {
                var instance = page.instance;
                switch (page.component) {
                    case LocationDetailPage:
                        {
                            if (instance && instance.fullLevel != 0) {
                                return instance._doShowDirection();
                            }
                        }
                }
            }
            if (!tabs.canGoBack()) {
                return _this.backButtonExitApp();
            }
            return tabs.pop();
        }, 0);
    };
    MyApp.prototype.backButtonExitApp = function () {
        var _this = this;
        this.anywhereService.showConfirm(CONSTANT.CLOSE_APP, CONSTANT.ASK_CLOSE_APP, function () {
            _this.platform.exitApp(); //Exit from app
        }, function () { }, CONSTANT.STRING_CANCEL, CONSTANT.CLOSE_APP, 'button-alert-highlight', 'disabled-selected');
    };
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [StatusBar,
        Events,
        Platform,
        Keyboard,
        IonicApp,
        SplashScreen,
        App,
        FileTransferService,
        NotificationsService,
        HousyService,
        UserStorageService,
        ReportService,
        AnywhereService,
        NoInternetService,
        MapService,
        PushService])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map