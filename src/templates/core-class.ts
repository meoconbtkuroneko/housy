import {
  Injectable,
} from '@angular/core';

import { GetService } from '../providers/get.service';
import { CallbackAfterLoginService } from '../providers/callback-after-login.service';
import { CommonService } from '../providers/common.service';
import { CONSTANT } from '../providers/constant.service';
import { AnywhereService } from '../providers/anywhere.service';
import { CurrentItemService } from '../providers/current-item.service';
import { UserStorageService } from '../providers/user-storage.service';
import { NoInternetService } from '../providers/no-internet.service';

import {
  Events,
} from 'ionic-angular';

import * as _ from 'lodash';

@Injectable()
export class CoreServices {
  constructor(
    public getService: GetService,
    public commonService: CommonService,
    public userStorageService: UserStorageService,
    public currentItemService: CurrentItemService,
    public anywhereService: AnywhereService,
    public noInternetService: NoInternetService,
    public events: Events,
    public callbackAfterLoginService: CallbackAfterLoginService,
  ) {}
}

export abstract class CoreClass {
  loadingFailed: boolean;
  showErrLoad: boolean;

  showLoadMore: boolean;

  hasInternet: boolean;
  showNoInternet: boolean;

  errType = CONSTANT.ERR_TYPE;
  currentErrType;

  loading: boolean;
  isFirstLoad: boolean = true;

  isProcessing: boolean;
  totalProcess: number = 0;
  countFinishLoading: number = 0;
  countErrLoad: number = 0;

  USER;
  isLogined: boolean;

  allDataList;
  showData;
  params;

  refresher;
  infiniteScroll;

  constructor(
    public coreServices: CoreServices
  ) {
    this.hasInternet = this.coreServices.noInternetService.hasInternet;
    this.USER = this.coreServices.userStorageService.USER;
    this.toggleSubscribeInternetChanged(true);
    this.toggleSubscribeReloadInternet(true);
    this.toggleSubscribeRetryErrorLoad(true);
  }

  //bat/tat su kien thay doi trang thai internet 
  toggleSubscribeInternetChanged(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.INTERNET_CHANGED,
        this._handleSubscribeInternetChanged
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.INTERNET_CHANGED,
        this._handleSubscribeInternetChanged
      );
    }
  }

  private _handleSubscribeInternetChanged = (res) => {
    this.hasInternet = res;
    this.handleSubscribeInternet(res);
  }

  abstract handleSubscribeInternet(res);

  //bat/tat su kien thu lai khi khong co internet 
  toggleSubscribeReloadInternet(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.RELOAD_INTERNET,
        this._handleSubscribeReloadInternet
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.RELOAD_INTERNET,
        this._handleSubscribeReloadInternet
      );
    }
  }

  private _handleSubscribeReloadInternet = () => {
    this.handleSubscribeReloadInternet();
  }

  abstract handleSubscribeReloadInternet();

  //bat/tat su kien thu lai khi xay ra loi 
  toggleSubscribeRetryErrorLoad(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD,
        this._handleSubscribeRetryErrorLoad
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD,
        this._handleSubscribeRetryErrorLoad
      );
    }
  }

  private _handleSubscribeRetryErrorLoad = () => {
    this.handleSubscribeRetryErrorLoad();
  }

  abstract handleSubscribeRetryErrorLoad();


  toggleSubscribeUser(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED,
        this._handleSubscribeUser
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED,
        this._handleSubscribeUser
      );
    }
  }

  private _handleSubscribeUser = (res) => {
    if (!res || _.isEmpty(res)) {
      return;
    }
    console.log("_handleSubscribeUser CoreClass", res);
    this._handleUserChanged();
    this.handleSubscribeUser(res);
  }

  abstract handleSubscribeUser(res ? );

  handleNotOK(data ? ) {
    console.log("co van de roiiiiiiii");
    this.finishLoading();
    this.toggleLoadingFailed(true);
  }

  handleErr(err ? ) {
    console.log("loi roi nhe", err);
    this.finishLoading();
    this.toggleLoadingFailed(true);
    this.increaseErrLoad();

    // lay ra obj loi de hien thi
    // tempErrObj will be an array;
    let tempErrObj = _.filter(this.errType, (o) => {
      return o.status === err.status;
    })
    if (tempErrObj && tempErrObj.length > 0) {
      this.currentErrType = tempErrObj[0];
    }

    console.log("this.currentErrType", this.currentErrType);
    console.log("this.checkHasFinishedAll", this.totalProcess, this.countErrLoad, this.countFinishLoading);

    if (this.checkHasFinishedAll() && this.checkToShowErrLoad()) {
      this.toggleShowErrLoad(true);
    }
  }

  finishLoading() {
    this.finishDoRefresh();
    this.finishDoLoadMore();
    this.toggleIsProcessing(false);
    this.increaseFinishLoading();
    console.log("this.countFinishLoading", this.countFinishLoading);
    if (this.checkHasFinishedAll()) {
      this.toggleLoading(false);
    }
  }

  finishDoRefresh() {
    console.log("finishDoRefresh aaaaaaaaaaaaa")
    if (this.refresher) {
      this.refresher.complete();
    }
    this.toggleIsFirstLoad(false);
    this.broadcastFinishDoRefresh();
  }

  toggleIsFirstLoad(val: boolean) {
    this.isFirstLoad = val;
  }

  broadcastFinishDoRefresh() {
    this.coreServices.events.publish(CONSTANT.EVENTS_NAME.FINISH_DO_REFRESH);
  }

  finishDoLoadMore() {
    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
    }
  }

  toggleInfiniteScroll(enable: boolean) {
    this.infiniteScroll && this.infiniteScroll.enable(enable);
  }

  toggleIsProcessing(val: boolean) {
    this.isProcessing = val;
  }

  increaseFinishLoading() {
    return ++this.countFinishLoading;
  }

  checkHasFinishedAll() {
    // this.coreServices.events.publish(CONSTANT.EVENTS_NAME.FINISHED_ALL_LOADING);
    return this.countFinishLoading === this.totalProcess;
  }

  toggleLoading(val: boolean) {
    this.loading = val;
  }

  toggleLoadingFailed(val: boolean) {
    this.loadingFailed = val;
  }

  increaseErrLoad() {
    return ++this.countErrLoad;
  }

  checkToShowErrLoad() {
    return this.countErrLoad === this.totalProcess;
  }

  toggleShowErrLoad(isShowErr: boolean) {
    this.showErrLoad = isShowErr;
  }

  increaseProcess() {
    return ++this.totalProcess;
  }

  canGo() {
    console.log("canGocanGo", this.hasInternet, this.isProcessing, this.loading)
    return this.hasInternet && !this.isProcessing && !this.loading;
  }

  checkHasInternet(callbackInternet ? , callbackNoInternet ? ) {
    this.hasInternet = this.coreServices.noInternetService.hasInternet;
    console.log("checkHasInternetcheckHasInternet", this.hasInternet)
    this.toggleShowNoInternet(!this.hasInternet);

    if (this.hasInternet && callbackInternet) {
      return callbackInternet();
    }

    if (!this.hasInternet && callbackNoInternet) {
      return callbackNoInternet();
    }
  }

  toggleShowNoInternet(val: boolean) {
    this.showNoInternet = val;
    this.currentErrType = val ? this.errType.NO_INTERNET : undefined;
  }

  _handleUserChanged(res ? ) {
    this.USER = this.coreServices.userStorageService.USER;
    this.isLogined = this.USER.logined;
  }

  ngOnDestroy() {
    this.toggleSubscribeInternetChanged(false);
    this.toggleSubscribeReloadInternet(false);
    this.toggleSubscribeRetryErrorLoad(false);
  }
}

export abstract class CoreClassGetData extends CoreClass {
  currentPage = 1;
  totalPage = 100;
  totalItem;

  constructor(
    public coreServices: CoreServices
  ) {
    super(coreServices);
  }

  // inherit from parent
  handleSubscribeInternet(res) {
    if (!this.hasInternet) {
      this.toggleInfiniteScroll(false);
    }
  }

  // inherit from parent
  handleSubscribeReloadInternet() {
    this.checkHasInternet(() => {
      this.resetProcessVals();
      this.toggleInfiniteScroll(true);
      this.getAllData();
    });
  }

  abstract getAllData();

  resetProcessVals() {
    this.countFinishLoading = 0;
    this.countErrLoad = 0;
    this.totalProcess = 0;
    this.toggleShowErrLoad(false);
  }

  // inherit from parent
  handleSubscribeRetryErrorLoad() {
    this.doRefresh();
  }

  doRefresh(refresher ? ) {
    this.refresher = refresher;
    this.checkHasInternet(() => {
      this.resetaAllVals();
      this.getAllData();
    }, () => {
      setTimeout(() => {
        this.finishDoRefresh();
      }, 500);
    })
  };

  resetaAllVals() {
    this.resetProcessVals();
    this.toggleLoading(true);
    this.currentPage = 1;
    this.totalItem = undefined;
    this.totalPage = undefined;
    this.allDataList = undefined;
  }

  _getDetail(
    type,
    id: number,
    params ? ,
    callbackOK ? ,
    callbackNotOK ? ,
    callbackErr ?
  ) {
    if (!this.hasInternet) {
      return
    }
    this.increaseProcess();
    let promise = this.coreServices.getService.getDetail(type, id, params);
    return this.handleResultFromServer(promise, true, callbackOK, callbackNotOK, callbackErr);
  }

  _listAllData(
    listFunctionName,
    params ? ,
    callbackOK ? ,
    callbackNotOK ? ,
    callbackErr ?
  ) {
    if (!this.hasInternet) {
      return;
    };
    this.increaseProcess();
    let promise = this.coreServices.getService[listFunctionName](params);
    return this.handleResultFromServer(promise, false, callbackOK, callbackNotOK, callbackErr);
  }

  handleResultFromServer(
    promise: any,
    isFromGetDetail: boolean,
    callbackOK ? ,
    callbackNotOK ? ,
    callbackErr ?
  ) {
    console.log("promisepromisepromise", promise);
    promise.then((res: any) => {
      if (CONSTANT.REASONS.ER_OK) {
        this.finishLoading();

        if (res && res.pageCount) {
          this.totalPage = res.pageCount;
        }

        if (_.isNumber(res && res.count)) {
          this.totalItem = res.count;
        }

        if (isFromGetDetail) {
          this.toggleLoading(false);
        }

        if (callbackOK) {
          callbackOK(res);
        }
      } else {
        this.handleNotOK();
        if (callbackNotOK) {
          callbackNotOK(res);
        }
      }
    }).catch((err) => {
      console.log("wwwwwwwwwwwwwwwwww", err);
      this.handleErr(err);
      if (isFromGetDetail) {
        this.toggleShowErrLoad(true);
      }
      if (callbackErr) {
        callbackErr(err);
      }
      // console.log("hhhhhhhhhhhhhhhhhhhhhhhh", err);
    });
  }

  _doLoadMore(infiniteScroll, handleBeforeLoadMore) {
    this.infiniteScroll = infiniteScroll;
    if (this.shouldShowLoadMore()) {
      this.currentPage++;
      handleBeforeLoadMore();
    } else {
      this.toggleInfiniteScroll(false);
    }
  }

  checkToLoadMore() {
    return this.hasInternet;
  }

  shouldShowLoadMore() {
    console.log("doLoadMoredoLoadMore", this.hasInternet, this.currentPage, this.totalPage)
    return this.showLoadMore = (
      this.hasInternet &&
      (this.currentPage < this.totalPage) &&
      (this.totalPage > 1));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

export abstract class CoreClassSubcribeUser extends CoreClassGetData {
  constructor(
    public coreServices: CoreServices
  ) {
    super(coreServices);
    this.oldUser = this.coreServices.userStorageService.USER;
    this.toggleSubscribeLoginSuccess(true);
    this.toggleSubscribeLogoutSuccess(true);
  }

  oldUser;

  // inherit from parent
  handleSubscribeUser(res ? ) {}

  toggleSubscribeLoginSuccess(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.LOGIN_SUCCESS,
        this._handleSubscribeLoginSuccess
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.LOGIN_SUCCESS,
        this._handleSubscribeLoginSuccess
      );
    }
  }

  private _handleSubscribeLoginSuccess = (res) => {
    this._handleUserChanged(res);
    setTimeout(() => {
      console.log("_handleSubscribeLoginSuccess CoreClassSubcribeUser", res)
      this.resetWhenDoRefresh();
      this.doRefresh();
      this.oldUser = this.coreServices.userStorageService.USER;
    }, 100);
  }

  abstract resetWhenDoRefresh();

  toggleSubscribeLogoutSuccess(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.LOGOUT_SUCCESS,
        this._handleSubscribeLogoutSuccess
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.LOGOUT_SUCCESS,
        this._handleSubscribeLogoutSuccess
      );
    }
  }

  private _handleSubscribeLogoutSuccess = (res) => {
    console.log("_handleSubscribeLogoutSuccess CoreClassSubcribeUser", res)
    this._handleUserChanged(res);
    this.resetWhenLogout();
    this.oldUser = this.coreServices.userStorageService.USER;
  }


  resetWhenLogout() {
    this.allDataList = this.coreServices.anywhereService.unfavouriteHousesArrLogout(this.allDataList);
    this.showData = this.coreServices.anywhereService.unfavouriteHouseLogout(this.showData);
  }

  ngOnInit() {
    this.doRefresh();
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
    this.toggleSubscribeLoginSuccess(false);
    this.toggleSubscribeLogoutSuccess(false);
    super.ngOnDestroy();
  }
}

export abstract class CoreClassNoSubcribeUser extends CoreClassGetData {
  constructor(
    public coreServices: CoreServices
  ) {
    super(coreServices);
  }

  ngOnInit() {
    this.doRefresh();
  }

  // inherit from parent
  handleSubscribeUser(res ? ) {}

  getAllData() {}

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

// cho may trang
export abstract class CoreClassNeedLogin extends CoreClassGetData {
  constructor(
    public coreServices: CoreServices
  ) {
    super(coreServices);
    // this._subscribeUser();
    this.toggleSubscribeUser(true);
  }

  showLogin: boolean;

  // inherit from parent
  handleSubscribeUser(res ? ) {}

  ionViewDidEnter() {
    this.checkAndShowLogin();
  }

  checkAndShowLogin() {
    console.log("checkAndShowLogincheckAndShowLogin CoreClassNeedLogin")
    if (!this.USER || this.USER.logined) {
      return;
    }

    // coi nhu la nhan nut hien trang chua dang nhap len
    this.showLogin = true;
    setTimeout(() => {
      this.showLogin = undefined;
    }, 50);
  }

  doRefresh(refresher ? ) {
    if (!this.USER || !this.USER.logined) return;
    super.doRefresh(refresher);
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(true);
    super.ngOnDestroy();
  }
}

export abstract class CoreSimpleClass extends CoreClass {
  hasInternet: boolean;
  isProcessing: boolean;
  constructor(
    public coreServices: CoreServices
  ) {
    super(coreServices);
  }

  // inherit from parent
  handleSubscribeInternet() {}

  // inherit from parent
  handleSubscribeReloadInternet() {}

  // inherit from parent
  handleSubscribeRetryErrorLoad() {}

  // inherit from parent
  handleSubscribeUser() {}

  canGo() {
    return this.hasInternet && !this.isProcessing;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

// cho may cai nut
export abstract class ClickNeedShowLoginClass extends CoreClass {
  constructor(
    public coreServices: CoreServices
  ) {
    super(coreServices);
  }

  callbackType;
  callback;

  // inherit from parent
  handleSubscribeInternet() {}

  // inherit from parent
  handleSubscribeReloadInternet() {}

  // inherit from parent
  handleSubscribeRetryErrorLoad() {}

  // inherit from parent
  handleSubscribeUser(res ? ) {};

  checkHasLogined(callbackType, handleAfterLogined, handleNotLogined ? ) {
    this.coreServices.callbackAfterLoginService
      .checkHasLogined(callbackType, handleAfterLogined, handleNotLogined);
  };

  checkShouldDoCallback(callback) {
    if (this.coreServices.callbackAfterLoginService
      .checkShouldDoCallback(this.callbackType)) {
      callback();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
