var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudModule } from '@ionic/cloud-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import 'moment/min/locales';
moment.locale('vi-vi');
import { MyApp } from './app.component';
// import { EnableCors } from './enable-cors';
import { TabsPage } from '../pages/tabs/tabs';
import { RenterHomePage } from '../pages/renter-home/renter-home';
import { SearchPage } from '../pages/search-page/search-page';
import { FavouritePage } from '../pages/favourite-page/favourite-page';
import { NotificationPage } from '../pages/notification-page/notification-page';
import { MorePage } from '../pages/more/more';
import { AllHomesPage } from '../pages/all-homes/all-homes';
import { GetService } from '../services/get.service';
import { PostService } from '../services/post.service';
import { DeleteService } from '../services/delete.service';
import { PutService } from '../services/put.service';
import { CommonService } from '../services/common.service';
import { AllSelectionsService } from '../services/backend.service';
import { HousyService } from '../services/housy.service';
import { AnywhereService } from '../services/anywhere.service';
import { UserStorageService } from '../services/user-storage.service';
import { CurrentItemService } from '../services/current-item.service';
import { LoadingService } from '../services/loading.service';
import { FormService } from '../services/form.service';
import { LoginService } from '../services/login.service';
import { HistoryService } from '../services/history.service';
import { ImageCard } from '../directives/image-card/image-card';
import { ImageCardSmall } from '../directives/image-card-small/image-card-small';
import { ImageCardApartment } from '../directives/image-card-apartment/image-card-apartment';
import { ImageLazy } from '../directives/image-lazy/image-lazy';
import { TopUsers } from '../directives/top-users/top-users';
import { ImageSlider } from '../directives/image-slider/image-slider';
import { GalleryImages } from '../directives/gallery-images/gallery-images';
import { PartCount } from '../directives/part-count/part-count';
import { PartDescription } from '../directives/part-description/part-description';
import { PartLocation } from '../directives/part-location/part-location';
import { PartNeighborhood } from '../directives/part-neighborhood/part-neighborhood';
import { PartUtilities } from '../directives/part-utilities/part-utilities';
import { PartHorizontalCard } from '../directives/part-horizontal-card/part-horizontal-card';
import { ReadMore } from '../directives/read-more/read-more';
import { FavouriteButton } from '../directives/favourite-button/favourite-button';
import { ReviewCardComponent } from '../directives/review-card.component/review-card.component';
import { RatingStarComponent } from '../directives/rating-star.component/rating-star.component';
import { ButtonCloseModal } from '../directives/button-close-modal/button-close-modal';
import { NotLogin } from '../directives/not-login/not-login';
import { BasicMap } from '../directives/basic-map/basic-map';
import { HousyMarker } from '../directives/housy-marker/housy-marker';
import { NearbySearch } from '../directives/nearby-search/nearby-search';
import { ShowDirection } from '../directives/show-direction/show-direction';
import { HomeDetail } from '../pages/home-detail/home-detail';
import { ApartmentDetail } from '../pages/apartment-detail/apartment-detail';
import { NeighborhoodDetail } from '../pages/neighborhood-detail/neighborhood-detail';
import { HostProfile } from '../pages/host-profile/host-profile';
import { LoginPage } from '../pages/login-page/login-page';
import { RegisterPage } from '../pages/register-page/register-page';
import { ConditionUse } from '../pages/condition-use/condition-use';
import { SecurityPolicy } from '../pages/security-policy/security-policy';
import { ForgetPassword } from '../pages/forget-password/forget-password';
import { Profile } from '../pages/profile/profile';
import { AccountPage } from '../pages/account-page/account-page';
import { SettingPage } from '../pages/setting-page/setting-page';
import { TransactionPage } from '../pages/transaction-page/transaction-page';
import { DiscountPage } from '../pages/discount-page/discount-page';
import { SearchResultPage } from '../pages/search-result/search-result';
import { SearchMapPage } from '../pages/search-map/search-map';
import { LocationDetailPage } from '../pages/location-detail-page/location-detail-page';
var cloudSettings = {
    'core': {
        'app_id': '64f3276f'
    },
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            RenterHomePage,
            SearchPage,
            FavouritePage,
            NotificationPage,
            MorePage,
            TabsPage,
            AllHomesPage,
            Profile,
            AccountPage,
            SettingPage,
            TransactionPage,
            DiscountPage,
            SearchResultPage,
            SearchMapPage,
            LocationDetailPage,
            ImageCard,
            ImageCardSmall,
            ImageCardApartment,
            ImageLazy,
            TopUsers,
            ImageSlider,
            GalleryImages,
            FavouriteButton,
            PartCount,
            PartDescription,
            PartLocation,
            PartNeighborhood,
            PartUtilities,
            PartHorizontalCard,
            ReadMore,
            HomeDetail,
            ApartmentDetail,
            NeighborhoodDetail,
            HostProfile,
            LoginPage,
            RegisterPage,
            ConditionUse,
            SecurityPolicy,
            ForgetPassword,
            ReviewCardComponent,
            RatingStarComponent,
            ButtonCloseModal,
            NotLogin,
            BasicMap,
            HousyMarker,
            NearbySearch,
            ShowDirection,
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            BrowserModule,
            HttpModule,
            CloudModule.forRoot(cloudSettings),
            MomentModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            RenterHomePage,
            SearchPage,
            FavouritePage,
            NotificationPage,
            MorePage,
            TabsPage,
            AllHomesPage,
            Profile,
            AccountPage,
            SettingPage,
            TransactionPage,
            DiscountPage,
            SearchResultPage,
            SearchMapPage,
            LocationDetailPage,
            ImageCard,
            ImageCardSmall,
            ImageCardApartment,
            ImageLazy,
            TopUsers,
            ImageSlider,
            GalleryImages,
            FavouriteButton,
            PartCount,
            PartDescription,
            PartLocation,
            PartNeighborhood,
            PartUtilities,
            PartHorizontalCard,
            ReadMore,
            HomeDetail,
            ApartmentDetail,
            NeighborhoodDetail,
            HostProfile,
            LoginPage,
            RegisterPage,
            ConditionUse,
            SecurityPolicy,
            ForgetPassword,
            ReviewCardComponent,
            RatingStarComponent,
            ButtonCloseModal,
            NotLogin,
            BasicMap,
            HousyMarker,
            NearbySearch,
            ShowDirection,
        ],
        providers: [
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            GetService,
            PostService,
            DeleteService,
            PutService,
            CommonService,
            AllSelectionsService,
            HousyService,
            AnywhereService,
            UserStorageService,
            CurrentItemService,
            LoadingService,
            Storage,
            FormService,
            LoginService,
            HistoryService,
            Facebook,
            GooglePlus
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map