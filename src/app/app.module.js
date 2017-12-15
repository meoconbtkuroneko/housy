var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler, } from 'ionic-angular';
import { CloudModule } from '@ionic/cloud-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vibration } from '@ionic-native/vibration';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { DatePicker } from '@ionic-native/date-picker';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from '@ionic-native/push';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Keyboard } from '@ionic-native/keyboard';
// import { Storage } from '@ionic/storage';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import 'moment/min/locales';
moment.locale('vi-vi');
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { RenterHomePage } from '../pages/renter-home/renter-home';
import { SearchPage } from '../pages/search-page/search-page';
import { FavouritePage } from '../pages/favourite-page/favourite-page';
import { NotificationPage } from '../pages/notification-page/notification-page';
import { MorePage } from '../pages/more/more';
import { AllHomesPage } from '../pages/all-homes/all-homes';
import { AllApartmentsPage } from '../pages/all-apartments/all-apartments';
import { OwnerHomePage } from '../pages/owner-home/owner-home';
import { OwnerHomeTabRenting } from '../pages/owner-home-tab-renting/owner-home-tab-renting';
import { OwnerHomeTabTaken } from '../pages/owner-home-tab-taken/owner-home-tab-taken';
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
import { FilterPage } from '../pages/filter-page/filter-page';
import { ReportPage } from '../pages/report-page/report-page';
import { NewListingStep1 } from '../pages/new-listing-step1/new-listing-step1';
import { NewListingStep2 } from '../pages/new-listing-step2/new-listing-step2';
import { NewListingStep3 } from '../pages/new-listing-step3/new-listing-step3';
import { ChooseAddress } from '../pages/choose-address/choose-address';
import { DetailNewListing } from '../pages/detail-new-listing/detail-new-listing';
import { AdvPage } from '../pages/adv-page/adv-page';
import { PageWriteCommentUser } from '../pages/write-comment-user/write-comment-user';
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
import { ReportService } from '../services/report.service';
import { NotificationsService } from '../services/notifications.service';
import { ImagePickerService } from '../services/image-picker.service';
import { FileTransferService } from '../services/file-transfer.service';
import { DataStorageService } from '../services/data-storage.service';
import { NewListingService } from '../services/new-listing.service';
import { RecentViewService } from '../services/recent-view.service';
import { MapService } from '../services/map.service';
import { ProfileService } from '../services/profile.service';
import { NoInternetService } from '../services/no-internet.service';
import { CallbackAfterLoginService } from '../services/callback-after-login.service';
import { PushService } from '../services/push.service';
import { FavouriteService } from '../services/favourite.service';
import { WriteCommentService } from '../services/write-comment.service';
import { CoreServices } from '../templates/core-class';
import { ImageCard } from '../directives/image-card/image-card';
import { ImageCardSmall } from '../directives/image-card-small/image-card-small';
import { ImageOnlyCard } from '../directives/image-only-card/image-only-card';
import { ShowMoreCardSmall } from '../directives/show-more-card-small/show-more-card-small';
import { ImageCardApartment } from '../directives/image-card-apartment/image-card-apartment';
import { ImageCardOwner } from '../directives/image-card-owner/image-card-owner';
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
import { ShareButton } from '../directives/share-button/share-button';
import { ReportButton } from '../directives/report-button/report-button';
import { ReviewCardComponent } from '../directives/review-card.component/review-card.component';
import { RatingStarComponent } from '../directives/rating-star.component/rating-star.component';
import { ButtonCloseModal } from '../directives/button-close-modal/button-close-modal';
import { NotLogin } from '../directives/not-login/not-login';
import { BasicMap } from '../directives/basic-map/basic-map';
import { HousyMarker } from '../directives/housy-marker/housy-marker';
import { NearbySearch } from '../directives/nearby-search/nearby-search';
import { ShowDirection } from '../directives/show-direction/show-direction';
import { ImagesReviewComponent } from '../directives/images-review.component/images-review.component';
import { FilterTag } from '../directives/filter-tag/filter-tag';
import { NewListingButton } from '../directives/new-listing-button/new-listing-button';
import { ImagePickerComponent } from '../directives/image-picker.component/image-picker.component';
import { PartNewListingStep1 } from '../directives/part-new-listing-step1/part-new-listing-step1';
import { PartNewListingStep2 } from '../directives/part-new-listing-step2/part-new-listing-step2';
import { PartNewListingImagePicker } from '../directives/part-new-listing-image-picker/part-new-listing-image-picker';
import { PartNewListingTitleDescription } from '../directives/part-new-listing-title-description/part-new-listing-title-description';
import { PartNewListingAdv } from '../directives/part-new-listing-adv/part-new-listing-adv';
import { PartProfileCore } from '../directives/part-profile-core/part-profile-core';
import { SelectImages } from '../directives/select-images/select-images';
import { LoadingComponent } from '../directives/loading.component/loading.component';
import { ErrorLoad } from '../directives/error-load/error-load';
import { NoInternetMain } from '../directives/no-internet-main/no-internet-main';
import { NoInternet } from '../directives/no-internet/no-internet';
import { PartWriteComment } from '../directives/part-write-comment/part-write-comment';
import { CommentItem } from '../directives/comment-item/comment-item';
import { PartShortComments } from '../directives/part-short-comments/part-short-comments';
import { ContactHostButton } from '../directives/contact-host-button/contact-host-button';
import { OpenMapAddressButton } from '../directives/open-map-address-button/open-map-address-button';
import { SearchbarAddress } from '../directives/searchbar-address/searchbar-address';
import { HousyAutoheight } from '../directives/housy-autoheight/housy-autoheight';
var cloudSettings = {
    'core': {
        'app_id': '9285a19d'
    },
    'push': {
        'sender_id': '1029105465160',
        'pluginConfig': {
            'ios': {
                'badge': true,
                'sound': true
            },
            'android': {
                'iconColor': '#343434'
            }
        }
    }
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
            OwnerHomePage,
            OwnerHomeTabRenting,
            OwnerHomeTabTaken,
            SearchPage,
            FavouritePage,
            NotificationPage,
            MorePage,
            TabsPage,
            AllHomesPage,
            AllApartmentsPage,
            ReportPage,
            NewListingStep1,
            NewListingStep2,
            NewListingStep3,
            ChooseAddress,
            DetailNewListing,
            AdvPage,
            PageWriteCommentUser,
            Profile,
            AccountPage,
            SettingPage,
            TransactionPage,
            DiscountPage,
            SearchResultPage,
            SearchMapPage,
            LocationDetailPage,
            FilterPage,
            ImageCard,
            ImageCardSmall,
            ImageOnlyCard,
            ShowMoreCardSmall,
            ImageCardApartment,
            ImageCardOwner,
            ImageLazy,
            TopUsers,
            ImageSlider,
            GalleryImages,
            FavouriteButton,
            ShareButton,
            ReportButton,
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
            ImagesReviewComponent,
            FilterTag,
            NewListingButton,
            ImagePickerComponent,
            PartNewListingStep1,
            PartNewListingStep2,
            PartNewListingImagePicker,
            PartNewListingTitleDescription,
            PartNewListingAdv,
            PartProfileCore,
            SelectImages,
            LoadingComponent,
            ErrorLoad,
            NoInternetMain,
            NoInternet,
            PartWriteComment,
            CommentItem,
            PartShortComments,
            ContactHostButton,
            OpenMapAddressButton,
            SearchbarAddress,
            HousyAutoheight,
        ],
        imports: [
            IonicModule.forRoot(MyApp, {
                backButtonText: '',
            }),
            BrowserModule,
            HttpModule,
            CloudModule.forRoot(cloudSettings),
            IonicStorageModule.forRoot(),
            MomentModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            RenterHomePage,
            OwnerHomePage,
            OwnerHomeTabRenting,
            OwnerHomeTabTaken,
            SearchPage,
            FavouritePage,
            NotificationPage,
            MorePage,
            TabsPage,
            AllHomesPage,
            AllApartmentsPage,
            ReportPage,
            NewListingStep1,
            NewListingStep2,
            NewListingStep3,
            ChooseAddress,
            DetailNewListing,
            AdvPage,
            PageWriteCommentUser,
            Profile,
            AccountPage,
            SettingPage,
            TransactionPage,
            DiscountPage,
            SearchResultPage,
            SearchMapPage,
            LocationDetailPage,
            FilterPage,
            ImageCard,
            ImageCardSmall,
            ImageOnlyCard,
            ShowMoreCardSmall,
            ImageCardApartment,
            ImageCardOwner,
            ImageLazy,
            TopUsers,
            ImageSlider,
            GalleryImages,
            FavouriteButton,
            ShareButton,
            ReportButton,
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
            ImagesReviewComponent,
            FilterTag,
            NewListingButton,
            ImagePickerComponent,
            PartNewListingStep1,
            PartNewListingStep2,
            PartNewListingImagePicker,
            PartNewListingTitleDescription,
            PartNewListingAdv,
            PartProfileCore,
            SelectImages,
            LoadingComponent,
            ErrorLoad,
            NoInternet,
            NoInternetMain,
            PartWriteComment,
            CommentItem,
            PartShortComments,
            ContactHostButton,
            OpenMapAddressButton,
            SearchbarAddress,
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
            // Storage,
            FormService,
            LoginService,
            HistoryService,
            ReportService,
            NotificationsService,
            ImagePickerService,
            FileTransferService,
            DataStorageService,
            NewListingService,
            RecentViewService,
            ProfileService,
            NoInternetService,
            CallbackAfterLoginService,
            PushService,
            FavouriteService,
            WriteCommentService,
            CoreServices,
            MapService,
            Facebook,
            GooglePlus,
            SocialSharing,
            Vibration,
            ImagePicker,
            Camera,
            File,
            Transfer,
            DatePicker,
            StatusBar,
            SplashScreen,
            Push,
            Network,
            Diagnostic,
            Geolocation,
            LocationAccuracy,
            Keyboard,
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map