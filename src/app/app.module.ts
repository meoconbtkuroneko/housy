import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  IonicApp,
  IonicModule,
  IonicErrorHandler,
  Config,
} from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

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
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { LaunchReview } from '@ionic-native/launch-review';
import { AppVersion } from '@ionic-native/app-version';
import { HeaderColor } from '@ionic-native/header-color';

import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import 'moment/min/locales';
moment.locale('vi-vi');

import { MyApp } from './app.component';
// pages
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
import { AboutPage } from '../pages/about-page/about-page';

// services
import { GetService } from '../providers/get.service';
import { PostService } from '../providers/post.service';
import { DeleteService } from '../providers/delete.service';
import { PutService } from '../providers/put.service';
import { CommonService } from '../providers/common.service';
import { AllSelectionsService } from '../providers/backend.service';
import { HousyService } from '../providers/housy.service';
import { AnywhereService } from '../providers/anywhere.service';
import { UserStorageService } from '../providers/user-storage.service';
import { CurrentItemService } from '../providers/current-item.service';
import { LoadingService } from '../providers/loading.service';
import { FormService } from '../providers/form.service';
import { LoginService } from '../providers/login.service';
import { HistoryService } from '../providers/history.service';
import { ReportService } from '../providers/report.service';
import { NotificationsService } from '../providers/notifications.service';
import { ImagePickerService } from '../providers/image-picker.service';
import { FileTransferService } from '../providers/file-transfer.service';
import { DataStorageService } from '../providers/data-storage.service';
import { NewListingService } from '../providers/new-listing.service';
import { RecentViewService } from '../providers/recent-view.service';
import { MapService } from '../providers/map.service';
import { ProfileService } from '../providers/profile.service';
import { NoInternetService } from '../providers/no-internet.service';
import { CallbackAfterLoginService } from '../providers/callback-after-login.service';
import { PushService } from '../providers/push.service';
import { FavouriteService } from '../providers/favourite.service';
import { WriteCommentService } from '../providers/write-comment.service';
import { CoreServices } from '../templates/core-class';
// directives like components
import { ImageCard } from '../components/image-card/image-card';
import { ImageCardSmall } from '../components/image-card-small/image-card-small';
import { ImageOnlyCard } from '../components/image-only-card/image-only-card';
import { ShowMoreCardSmall } from '../components/show-more-card-small/show-more-card-small';
import { ImageCardApartment } from '../components/image-card-apartment/image-card-apartment';
import { ImageCardOwner } from '../components/image-card-owner/image-card-owner';
import { ImageLazy } from '../components/image-lazy/image-lazy';
import { TopUsers } from '../components/top-users/top-users';
import { ImageSlider } from '../components/image-slider/image-slider';
import { GalleryImages } from '../components/gallery-images/gallery-images';
import { PartCount } from '../components/part-count/part-count';
import { PartDescription } from '../components/part-description/part-description';
import { PartLocation } from '../components/part-location/part-location';
import { PartNeighborhood } from '../components/part-neighborhood/part-neighborhood';
import { PartUtilities } from '../components/part-utilities/part-utilities';
import { PartHorizontalCard } from '../components/part-horizontal-card/part-horizontal-card';
import { ReadMore } from '../components/read-more/read-more';
import { FavouriteButton } from '../components/favourite-button/favourite-button';
import { ShareButton } from '../components/share-button/share-button';
import { ReportButton } from '../components/report-button/report-button';
import { ReviewCardComponent } from '../components/review-card.component/review-card.component';
import { RatingStarComponent } from '../components/rating-star.component/rating-star.component';
import { ButtonCloseModal } from '../components/button-close-modal/button-close-modal';
import { NotLogin } from '../components/not-login/not-login';
import { BasicMap } from '../components/basic-map/basic-map';
import { HousyMarker } from '../components/housy-marker/housy-marker';
import { NearbySearch } from '../components/nearby-search/nearby-search';
import { ShowDirection } from '../components/show-direction/show-direction';
import { ImagesReviewComponent } from '../components/images-review.component/images-review.component';
import { FilterTag } from '../components/filter-tag/filter-tag';
import { NewListingButton } from '../components/new-listing-button/new-listing-button';
import { ImagePickerComponent } from '../components/image-picker.component/image-picker.component';
import { PartNewListingStep1 } from '../components/part-new-listing-step1/part-new-listing-step1';
import { PartNewListingStep2 } from '../components/part-new-listing-step2/part-new-listing-step2';
import { PartNewListingImagePicker } from '../components/part-new-listing-image-picker/part-new-listing-image-picker';
import { PartNewListingTitleDescription } from '../components/part-new-listing-title-description/part-new-listing-title-description';
import { PartNewListingAdv } from '../components/part-new-listing-adv/part-new-listing-adv';
import { PartProfileCore } from '../components/part-profile-core/part-profile-core';
import { SelectImages } from '../components/select-images/select-images';
import { LoadingComponent } from '../components/loading.component/loading.component';
import { ErrorLoad } from '../components/error-load/error-load';
import { NoInternetMain } from '../components/no-internet-main/no-internet-main';
import { NoInternet } from '../components/no-internet/no-internet';
import { PartWriteComment } from '../components/part-write-comment/part-write-comment';
import { CommentItem } from '../components/comment-item/comment-item';
import { PartShortComments } from '../components/part-short-comments/part-short-comments';
import { ContactHostButton } from '../components/contact-host-button/contact-host-button';
import { OpenMapAddressButton } from '../components/open-map-address-button/open-map-address-button';
import { SearchbarAddress } from '../components/searchbar-address/searchbar-address';
import { RatingAppButton } from '../components/rating-app-button/rating-app-button';

// directives
import { HousyAutoheight } from '../components/housy-autoheight/housy-autoheight';
import { CustomSwipe } from '../components/custom-swipe/custom-swipe';

// pipes
import { OrderBy } from '../pipes/orderby';
// classes
import { ModalScaleUpEnterTransition } from '../classes/modal-animations/modal-animations'
import { ModalScaleUpLeaveTransition } from '../classes/modal-animations/modal-animations'

const cloudSettings: CloudSettings = {
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

@NgModule({
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
    AboutPage,
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
    RatingAppButton,
    HousyAutoheight,
    CustomSwipe,
    OrderBy,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
    BrowserModule,
    HttpModule,
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    MomentModule,
    BrowserAnimationsModule
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
    AboutPage,
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
    RatingAppButton,
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
    LaunchNavigator,
    LaunchReview,
    AppVersion,
    HeaderColor,
  ]
})
export class AppModule {
  constructor(public config: Config) {
    this.setCustomTransitions();
  }

  private setCustomTransitions() {
    this.config.setTransition('modal-scale-up-enter', ModalScaleUpEnterTransition);
    this.config.setTransition('modal-scale-up-leave', ModalScaleUpLeaveTransition);
  }
}
