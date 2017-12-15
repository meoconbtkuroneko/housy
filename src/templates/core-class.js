var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, } from '@angular/core';
import { GetService } from '../services/get.service';
import { CallbackAfterLoginService } from '../services/callback-after-login.service';
import { CommonService } from '../services/common.service';
import { CONSTANT } from '../services/constant.service';
import { AnywhereService } from '../services/anywhere.service';
import { CurrentItemService } from '../services/current-item.service';
import { UserStorageService } from '../services/user-storage.service';
import { NoInternetService } from '../services/no-internet.service';
import { Events, } from 'ionic-angular';
import * as _ from 'lodash';
var CoreServices = (function () {
    function CoreServices(getService, commonService, userStorageService, currentItemService, anywhereService, noInternetService, events, callbackAfterLoginService) {
        this.getService = getService;
        this.commonService = commonService;
        this.userStorageService = userStorageService;
        this.currentItemService = currentItemService;
        this.anywhereService = anywhereService;
        this.noInternetService = noInternetService;
        this.events = events;
        this.callbackAfterLoginService = callbackAfterLoginService;
    }
    return CoreServices;
}());
CoreServices = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [GetService,
        CommonService,
        UserStorageService,
        CurrentItemService,
        AnywhereService,
        NoInternetService,
        Events,
        CallbackAfterLoginService])
], CoreServices);
export { CoreServices };
var CoreClass = (function () {
    function CoreClass(coreServices) {
        var _this = this;
        this.coreServices = coreServices;
        this.errType = CONSTANT.ERR_TYPE;
        this.isFirstLoad = true;
        this.totalProcess = 0;
        this.countFinishLoading = 0;
        this.countErrLoad = 0;
        this._handleSubscribeInternetChanged = function (res) {
            _this.hasInternet = res;
            _this.handleSubscribeInternet(res);
        };
        this._handleSubscribeReloadInternet = function () {
            _this.handleSubscribeReloadInternet();
        };
        this._handleSubscribeRetryErrorLoad = function () {
            _this.handleSubscribeRetryErrorLoad();
        };
        this._handleSubscribeUser = function (res) {
            if (!res || _.isEmpty(res)) {
                return;
            }
            console.log("_handleSubscribeUser CoreClass", res);
            _this._handleUserChanged();
            _this.handleSubscribeUser(res);
        };
        this.hasInternet = this.coreServices.noInternetService.hasInternet;
        this.USER = this.coreServices.userStorageService.USER;
        this.toggleSubscribeInternetChanged(true);
        this.toggleSubscribeReloadInternet(true);
        this.toggleSubscribeRetryErrorLoad(true);
    }
    //bat/tat su kien thay doi trang thai internet 
    CoreClass.prototype.toggleSubscribeInternetChanged = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, this._handleSubscribeInternetChanged);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, this._handleSubscribeInternetChanged);
        }
    };
    //bat/tat su kien thu lai khi khong co internet 
    CoreClass.prototype.toggleSubscribeReloadInternet = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.RELOAD_INTERNET, this._handleSubscribeReloadInternet);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.RELOAD_INTERNET, this._handleSubscribeReloadInternet);
        }
    };
    //bat/tat su kien thu lai khi xay ra loi 
    CoreClass.prototype.toggleSubscribeRetryErrorLoad = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD, this._handleSubscribeRetryErrorLoad);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.RETRY_ERR_LOAD, this._handleSubscribeRetryErrorLoad);
        }
    };
    CoreClass.prototype.toggleSubscribeUser = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
    };
    CoreClass.prototype.handleNotOK = function (data) {
        console.log("co van de roiiiiiiii");
        this.finishLoading();
        this.toggleLoadingFailed(true);
    };
    CoreClass.prototype.handleErr = function (err) {
        console.log("loi roi nhe", err);
        this.finishLoading();
        this.toggleLoadingFailed(true);
        this.increaseErrLoad();
        // lay ra obj loi de hien thi
        // tempErrObj will be an array;
        var tempErrObj = _.filter(this.errType, function (o) {
            return o.status === err.status;
        });
        if (tempErrObj && tempErrObj.length > 0) {
            this.currentErrType = tempErrObj[0];
        }
        console.log("this.currentErrType", this.currentErrType);
        console.log("this.checkHasFinishedAll", this.totalProcess, this.countErrLoad, this.countFinishLoading);
        if (this.checkHasFinishedAll() && this.checkToShowErrLoad()) {
            this.toggleShowErrLoad(true);
        }
    };
    CoreClass.prototype.finishLoading = function () {
        this.finishDoRefresh();
        this.finishDoLoadMore();
        this.toggleIsProcessing(false);
        this.increaseFinishLoading();
        console.log("this.countFinishLoading", this.countFinishLoading);
        if (this.checkHasFinishedAll()) {
            this.toggleLoading(false);
        }
    };
    CoreClass.prototype.finishDoRefresh = function () {
        console.log("finishDoRefresh aaaaaaaaaaaaa");
        if (this.refresher) {
            this.refresher.complete();
        }
        this.toggleIsFirstLoad(false);
        this.broadcastFinishDoRefresh();
    };
    CoreClass.prototype.toggleIsFirstLoad = function (val) {
        this.isFirstLoad = val;
    };
    CoreClass.prototype.broadcastFinishDoRefresh = function () {
        this.coreServices.events.publish(CONSTANT.EVENTS_NAME.FINISH_DO_REFRESH);
    };
    CoreClass.prototype.finishDoLoadMore = function () {
        if (this.infiniteScroll) {
            this.infiniteScroll.complete();
        }
    };
    CoreClass.prototype.toggleInfiniteScroll = function (enable) {
        this.infiniteScroll && this.infiniteScroll.enable(enable);
    };
    CoreClass.prototype.toggleIsProcessing = function (val) {
        this.isProcessing = val;
    };
    CoreClass.prototype.increaseFinishLoading = function () {
        return ++this.countFinishLoading;
    };
    CoreClass.prototype.checkHasFinishedAll = function () {
        // this.coreServices.events.publish(CONSTANT.EVENTS_NAME.FINISHED_ALL_LOADING);
        return this.countFinishLoading === this.totalProcess;
    };
    CoreClass.prototype.toggleLoading = function (val) {
        this.loading = val;
    };
    CoreClass.prototype.toggleLoadingFailed = function (val) {
        this.loadingFailed = val;
    };
    CoreClass.prototype.increaseErrLoad = function () {
        return ++this.countErrLoad;
    };
    CoreClass.prototype.checkToShowErrLoad = function () {
        return this.countErrLoad === this.totalProcess;
    };
    CoreClass.prototype.toggleShowErrLoad = function (isShowErr) {
        this.showErrLoad = isShowErr;
    };
    CoreClass.prototype.increaseProcess = function () {
        return ++this.totalProcess;
    };
    CoreClass.prototype.canGo = function () {
        console.log("canGocanGo", this.hasInternet, this.isProcessing, this.loading);
        return this.hasInternet && !this.isProcessing && !this.loading;
    };
    CoreClass.prototype.checkHasInternet = function (callbackInternet, callbackNoInternet) {
        this.hasInternet = this.coreServices.noInternetService.hasInternet;
        console.log("checkHasInternetcheckHasInternet", this.hasInternet);
        this.toggleShowNoInternet(!this.hasInternet);
        if (this.hasInternet && callbackInternet) {
            return callbackInternet();
        }
        if (!this.hasInternet && callbackNoInternet) {
            return callbackNoInternet();
        }
    };
    CoreClass.prototype.toggleShowNoInternet = function (val) {
        this.showNoInternet = val;
        this.currentErrType = val ? this.errType.NO_INTERNET : undefined;
    };
    CoreClass.prototype._handleUserChanged = function (res) {
        this.USER = this.coreServices.userStorageService.USER;
        this.isLogined = this.USER.logined;
    };
    CoreClass.prototype.ngOnDestroy = function () {
        this.toggleSubscribeInternetChanged(false);
        this.toggleSubscribeReloadInternet(false);
        this.toggleSubscribeRetryErrorLoad(false);
    };
    return CoreClass;
}());
export { CoreClass };
var CoreClassGetData = (function (_super) {
    __extends(CoreClassGetData, _super);
    function CoreClassGetData(coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        _this.currentPage = 1;
        _this.totalPage = 100;
        return _this;
    }
    // inherit from parent
    CoreClassGetData.prototype.handleSubscribeInternet = function (res) {
        if (!this.hasInternet) {
            this.toggleInfiniteScroll(false);
        }
    };
    // inherit from parent
    CoreClassGetData.prototype.handleSubscribeReloadInternet = function () {
        var _this = this;
        this.checkHasInternet(function () {
            _this.resetProcessVals();
            _this.toggleInfiniteScroll(true);
            _this.getAllData();
        });
    };
    CoreClassGetData.prototype.resetProcessVals = function () {
        this.countFinishLoading = 0;
        this.countErrLoad = 0;
        this.totalProcess = 0;
        this.toggleShowErrLoad(false);
    };
    // inherit from parent
    CoreClassGetData.prototype.handleSubscribeRetryErrorLoad = function () {
        this.doRefresh();
    };
    CoreClassGetData.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.refresher = refresher;
        this.checkHasInternet(function () {
            _this.resetaAllVals();
            _this.getAllData();
        }, function () {
            setTimeout(function () {
                _this.finishDoRefresh();
            }, 500);
        });
    };
    ;
    CoreClassGetData.prototype.resetaAllVals = function () {
        this.resetProcessVals();
        this.toggleLoading(true);
        this.currentPage = 1;
        this.totalItem = undefined;
        this.totalPage = undefined;
        this.allDataList = undefined;
    };
    CoreClassGetData.prototype._getDetail = function (type, id, params, callbackOK, callbackNotOK, callbackErr) {
        if (!this.hasInternet) {
            return;
        }
        this.increaseProcess();
        var promise = this.coreServices.getService.getDetail(type, id, params);
        return this.handleResultFromServer(promise, true, callbackOK, callbackNotOK, callbackErr);
    };
    CoreClassGetData.prototype._listAllData = function (listFunctionName, params, callbackOK, callbackNotOK, callbackErr) {
        if (!this.hasInternet) {
            return;
        }
        ;
        this.increaseProcess();
        var promise = this.coreServices.getService[listFunctionName](params);
        return this.handleResultFromServer(promise, false, callbackOK, callbackNotOK, callbackErr);
    };
    CoreClassGetData.prototype.handleResultFromServer = function (promise, isFromGetDetail, callbackOK, callbackNotOK, callbackErr) {
        var _this = this;
        console.log("promisepromisepromise", promise);
        promise.then(function (res) {
            if (CONSTANT.REASONS.ER_OK) {
                _this.finishLoading();
                if (res && res.pageCount) {
                    _this.totalPage = res.pageCount;
                }
                if (_.isNumber(res && res.count)) {
                    _this.totalItem = res.count;
                }
                if (isFromGetDetail) {
                    _this.toggleLoading(false);
                }
                if (callbackOK) {
                    callbackOK(res);
                }
            }
            else {
                _this.handleNotOK();
                if (callbackNotOK) {
                    callbackNotOK(res);
                }
            }
        }).catch(function (err) {
            console.log("wwwwwwwwwwwwwwwwww", err);
            _this.handleErr(err);
            if (isFromGetDetail) {
                _this.toggleShowErrLoad(true);
            }
            if (callbackErr) {
                callbackErr(err);
            }
            // console.log("hhhhhhhhhhhhhhhhhhhhhhhh", err);
        });
    };
    CoreClassGetData.prototype._doLoadMore = function (infiniteScroll, handleBeforeLoadMore) {
        this.infiniteScroll = infiniteScroll;
        if (this.shouldShowLoadMore()) {
            this.currentPage++;
            handleBeforeLoadMore();
        }
        else {
            this.toggleInfiniteScroll(false);
        }
    };
    CoreClassGetData.prototype.checkToLoadMore = function () {
        return this.hasInternet;
    };
    CoreClassGetData.prototype.shouldShowLoadMore = function () {
        console.log("doLoadMoredoLoadMore", this.hasInternet, this.currentPage, this.totalPage);
        return this.showLoadMore = (this.hasInternet &&
            (this.currentPage < this.totalPage) &&
            (this.totalPage > 1));
    };
    CoreClassGetData.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return CoreClassGetData;
}(CoreClass));
export { CoreClassGetData };
var CoreClassSubcribeUser = (function (_super) {
    __extends(CoreClassSubcribeUser, _super);
    function CoreClassSubcribeUser(coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        _this._handleSubscribeLoginSuccess = function (res) {
            _this._handleUserChanged(res);
            setTimeout(function () {
                console.log("_handleSubscribeLoginSuccess CoreClassSubcribeUser", res);
                _this.resetWhenDoRefresh();
                _this.doRefresh();
                _this.oldUser = _this.coreServices.userStorageService.USER;
            }, 100);
        };
        _this._handleSubscribeLogoutSuccess = function (res) {
            console.log("_handleSubscribeLogoutSuccess CoreClassSubcribeUser", res);
            _this._handleUserChanged(res);
            _this.resetWhenLogout();
            _this.oldUser = _this.coreServices.userStorageService.USER;
        };
        _this.oldUser = _this.coreServices.userStorageService.USER;
        _this.toggleSubscribeLoginSuccess(true);
        _this.toggleSubscribeLogoutSuccess(true);
        return _this;
    }
    // inherit from parent
    CoreClassSubcribeUser.prototype.handleSubscribeUser = function (res) { };
    CoreClassSubcribeUser.prototype.toggleSubscribeLoginSuccess = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, this._handleSubscribeLoginSuccess);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.LOGIN_SUCCESS, this._handleSubscribeLoginSuccess);
        }
    };
    CoreClassSubcribeUser.prototype.toggleSubscribeLogoutSuccess = function (isSubscribe) {
        if (isSubscribe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.LOGOUT_SUCCESS, this._handleSubscribeLogoutSuccess);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.LOGOUT_SUCCESS, this._handleSubscribeLogoutSuccess);
        }
    };
    CoreClassSubcribeUser.prototype.resetWhenLogout = function () {
        this.allDataList = this.coreServices.anywhereService.unfavouriteHousesArrLogout(this.allDataList);
        this.showData = this.coreServices.anywhereService.unfavouriteHouseLogout(this.showData);
    };
    CoreClassSubcribeUser.prototype.ngOnInit = function () {
        this.doRefresh();
    };
    CoreClassSubcribeUser.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
        this.toggleSubscribeLoginSuccess(false);
        this.toggleSubscribeLogoutSuccess(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return CoreClassSubcribeUser;
}(CoreClassGetData));
export { CoreClassSubcribeUser };
var CoreClassNoSubcribeUser = (function (_super) {
    __extends(CoreClassNoSubcribeUser, _super);
    function CoreClassNoSubcribeUser(coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        return _this;
    }
    CoreClassNoSubcribeUser.prototype.ngOnInit = function () {
        this.doRefresh();
    };
    // inherit from parent
    CoreClassNoSubcribeUser.prototype.handleSubscribeUser = function (res) { };
    CoreClassNoSubcribeUser.prototype.getAllData = function () { };
    CoreClassNoSubcribeUser.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return CoreClassNoSubcribeUser;
}(CoreClassGetData));
export { CoreClassNoSubcribeUser };
// cho may trang
var CoreClassNeedLogin = (function (_super) {
    __extends(CoreClassNeedLogin, _super);
    function CoreClassNeedLogin(coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        // this._subscribeUser();
        _this.toggleSubscribeUser(true);
        return _this;
    }
    // inherit from parent
    CoreClassNeedLogin.prototype.handleSubscribeUser = function (res) { };
    CoreClassNeedLogin.prototype.ionViewDidEnter = function () {
        this.checkAndShowLogin();
    };
    CoreClassNeedLogin.prototype.checkAndShowLogin = function () {
        var _this = this;
        console.log("checkAndShowLogincheckAndShowLogin CoreClassNeedLogin");
        if (!this.USER || this.USER.logined) {
            return;
        }
        // coi nhu la nhan nut hien trang chua dang nhap len
        this.showLogin = true;
        setTimeout(function () {
            _this.showLogin = undefined;
        }, 50);
    };
    CoreClassNeedLogin.prototype.doRefresh = function (refresher) {
        if (!this.USER || !this.USER.logined)
            return;
        _super.prototype.doRefresh.call(this, refresher);
    };
    CoreClassNeedLogin.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(true);
        _super.prototype.ngOnDestroy.call(this);
    };
    return CoreClassNeedLogin;
}(CoreClassGetData));
export { CoreClassNeedLogin };
var CoreSimpleClass = (function (_super) {
    __extends(CoreSimpleClass, _super);
    function CoreSimpleClass(coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        return _this;
    }
    // inherit from parent
    CoreSimpleClass.prototype.handleSubscribeInternet = function () { };
    // inherit from parent
    CoreSimpleClass.prototype.handleSubscribeReloadInternet = function () { };
    // inherit from parent
    CoreSimpleClass.prototype.handleSubscribeRetryErrorLoad = function () { };
    // inherit from parent
    CoreSimpleClass.prototype.handleSubscribeUser = function () { };
    CoreSimpleClass.prototype.canGo = function () {
        return this.hasInternet && !this.isProcessing;
    };
    CoreSimpleClass.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return CoreSimpleClass;
}(CoreClass));
export { CoreSimpleClass };
// cho may cai nut
var ClickNeedShowLoginClass = (function (_super) {
    __extends(ClickNeedShowLoginClass, _super);
    function ClickNeedShowLoginClass(coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        return _this;
    }
    // inherit from parent
    ClickNeedShowLoginClass.prototype.handleSubscribeInternet = function () { };
    // inherit from parent
    ClickNeedShowLoginClass.prototype.handleSubscribeReloadInternet = function () { };
    // inherit from parent
    ClickNeedShowLoginClass.prototype.handleSubscribeRetryErrorLoad = function () { };
    // inherit from parent
    ClickNeedShowLoginClass.prototype.handleSubscribeUser = function (res) { };
    ;
    ClickNeedShowLoginClass.prototype.checkHasLogined = function (callbackType, handleAfterLogined, handleNotLogined) {
        this.coreServices.callbackAfterLoginService
            .checkHasLogined(callbackType, handleAfterLogined, handleNotLogined);
    };
    ;
    ClickNeedShowLoginClass.prototype.checkShouldDoCallback = function (callback) {
        if (this.coreServices.callbackAfterLoginService
            .checkShouldDoCallback(this.callbackType)) {
            callback();
        }
    };
    ClickNeedShowLoginClass.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return ClickNeedShowLoginClass;
}(CoreClass));
export { ClickNeedShowLoginClass };
//# sourceMappingURL=core-class.js.map