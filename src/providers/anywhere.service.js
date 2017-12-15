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
import { Http, Headers, } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// Observable operators
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/finally';
// import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import { ToastController, ModalController, AlertController, Events, Platform, } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { CONSTANT } from './constant.service';
import { objectToParams } from './object-to-params.service';
import { UserStorageService } from './user-storage.service';
import { ItemSpace } from '../templates/item-space';
var AnywhereService = (function () {
    // currentLocation = new google.maps.LatLng(10.855940, 106.631563);
    function AnywhereService(http, userStorageService, toastController, modalController, alertController, events, datePicker, platform) {
        var _this = this;
        this.http = http;
        this.userStorageService = userStorageService;
        this.toastController = toastController;
        this.modalController = modalController;
        this.alertController = alertController;
        this.events = events;
        this.datePicker = datePicker;
        this.platform = platform;
        this._handleSubscribeUser = function (res) {
            console.log("_handleSubscribeUser AnywhereService", res);
            _this.USER = _this.userStorageService.USER;
            _this.createHeader();
        };
        this.platform.ready().then(function () {
            // this.init();
            // this._handleSubscribeUser();
            _this.toggleSubscribeUser(true);
            _this.subscribeCurrentLocation();
        });
    }
    AnywhereService.prototype.toggleSubscribeUser = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
    };
    AnywhereService.prototype.subscribeCurrentLocation = function (callback) {
        var _this = this;
        this.events.subscribe('setCurrentPosition', function (data) {
            console.log("subscribeCurrentLocation", data);
            _this.currentLocation = new google.maps.LatLng(data.lat, data.lng);
            if (callback) {
                callback(_this.currentLocation);
            }
        });
    };
    AnywhereService.prototype.unfavouriteHouseLogout = function (spaceData) {
        if (spaceData) {
            spaceData.isFavouriteAdded = false;
        }
        return spaceData;
    };
    AnywhereService.prototype.unfavouriteHousesArrLogout = function (housesArr) {
        var tempArr = _.cloneDeep(housesArr);
        console.log("unfavouriteHousesArrLogout", housesArr);
        if (_.isArray(tempArr)) {
            for (var i in tempArr) {
                if (tempArr[i].hasOwnProperty('data')) {
                    tempArr[i].data = this.unfavouriteHouseLogout(tempArr[i].data);
                }
                else {
                    tempArr[i] = this.unfavouriteHouseLogout(tempArr[i]);
                }
            }
        }
        return tempArr;
    };
    AnywhereService.prototype.toggleTabs = function (state) {
        this.events.publish('Tabs:toggle', state);
    };
    AnywhereService.prototype.showChooseImages = function (handleOK) {
        var initObj = [{
                type: 'radio',
                label: 'Blue',
                value: 'blue',
            }, {
                type: 'radio',
                label: '<ion-icon name="add"></ion-icon>Red',
                value: 'red',
            }];
        var options = {
            title: CONSTANT.TITLE_HOUSY,
            subTitle: CONSTANT.SELECT_IMAGES.PLACEHOLDER,
            inputs: initObj,
            cssClass: 'select-image-container',
            buttons: [{
                    text: CONSTANT.STRING_CANCEL,
                    role: 'cancel'
                }, {
                    text: CONSTANT.STRING_UPDATE,
                    handler: function (data) {
                        handleOK(data);
                    }
                }]
        };
        var alert = this.alertController.create(options);
        alert.present();
    };
    AnywhereService.prototype.showDatePicker = function (initDate, options, callback) {
        initDate = initDate ? new Date(initDate) : new Date();
        var defaultOptions = {
            date: initDate,
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
            okText: CONSTANT.STRING_SELECT,
            cancelText: CONSTANT.STRING_CANCEL,
        };
        defaultOptions = _.assignIn(defaultOptions, options);
        this.datePicker.show(defaultOptions)
            .then(function (date) {
            // console.log('Got date: ', date)
            callback(date);
        }, function (err) {
            console.log('Error occurred while getting date: ', err);
        });
    };
    AnywhereService.prototype.convertDate = function (date) {
        var newDate = new Date(date);
        return {
            day: newDate.getDate(),
            month: newDate.getMonth() + 1,
            year: newDate.getFullYear(),
            hour: newDate.getHours(),
            minutes: (newDate.getMinutes() > 9) ? newDate.getMinutes() : '0' + newDate.getMinutes(),
            second: newDate.getSeconds(),
        };
    };
    AnywhereService.prototype.isEmail = function (string) {
        return isEmail(string);
    };
    // type: 1 trong CONSTANT.FORM_VALIDATION
    AnywhereService.prototype.minNumberInputValue = function (type, val) {
        return minNumberInputValue(type, val);
    };
    // kiem tra xem chuoi nhap vao co do dai toi thieu phu hop hay khong
    AnywhereService.prototype.checkMinLetter = function (val, minLength) {
        return checkMinLetter(val, minLength);
    };
    /**
     * @description
     * Hien thi prompt de nhap thong tin mot truong nao do
     * type: CONSTANT.FORM_VALIDATION
     * initVal: gia tri khoi tao
     * handleOK: xu ly khi chon
     */
    AnywhereService.prototype.showPrompt = function (type, initVal, handleOK) {
        var _this = this;
        var initObj = {
            name: CONSTANT.FORM_VALIDATION[type].NAME,
            placeholder: CONSTANT.FORM_VALIDATION[type].PLACEHOLDER,
            type: CONSTANT.FORM_VALIDATION[type].TYPE,
        };
        if (initVal) {
            initObj.value = initVal;
        }
        var alert = this.alertController.create({
            title: CONSTANT.TITLE_HOUSY,
            subTitle: CONSTANT.FORM_VALIDATION[type].required,
            inputs: [initObj],
            buttons: [{
                    text: CONSTANT.STRING_CANCEL,
                    role: 'cancel'
                }, {
                    text: CONSTANT.STRING_UPDATE,
                    cssClass: 'button-selected',
                    handler: function (data) {
                        var obj = CONSTANT.FORM_VALIDATION[type];
                        var key = obj.NAME;
                        var sendData = _.cloneDeep(data);
                        var val = sendData[key];
                        if (sendData) {
                            switch (obj.TYPE) {
                                case "number":
                                    {
                                        if (type === CONSTANT.FORM_VALIDATION.RENTING_FEE.NAME) {
                                            // val = val * 1000000;
                                            val = parseFloat(val).toFixed(2);
                                        }
                                        else {
                                            val = parseFloat(val).toFixed(1);
                                        }
                                        if (!_this.minNumberInputValue(type, val)) {
                                            alert.setMessage(obj.invalid);
                                            return false;
                                        }
                                        else {
                                            alert.setMessage(undefined);
                                        }
                                        break;
                                    }
                                case "email":
                                    {
                                        if (!_this.isEmail(val)) {
                                            // console.log("alertalertalertalert", alert);
                                            alert.setMessage(obj.invalid);
                                            return false;
                                        }
                                        else {
                                            alert.setMessage(undefined);
                                        }
                                        break;
                                    }
                            }
                        }
                        handleOK(val);
                    }
                }]
        });
        alert.present();
        return alert;
    };
    AnywhereService.prototype.showConfirm = function (title, msg, handleAgree, handleDisagree, disagreeButton, agreeButton, disagreeCssClass, agreeCssClass) {
        var confirm = this.alertController.create({
            title: title,
            message: msg,
            enableBackdropDismiss: false,
            buttons: [{
                    text: CONSTANT.STRING_CANCEL,
                    cssClass: disagreeCssClass,
                    handler: function () {
                        handleDisagree();
                    }
                }, {
                    text: CONSTANT.STRING_AGREE,
                    cssClass: 'button-selected ' + agreeCssClass,
                    handler: function () {
                        handleAgree();
                    }
                }]
        });
        confirm.present();
        return confirm;
    };
    AnywhereService.prototype.showAlert = function (message, title, buttonName) {
        var alert = this.alertController.create({
            title: title || CONSTANT.TITLE_HOUSY,
            subTitle: message,
            buttons: [{
                    text: buttonName || CONSTANT.STRING_AGREE,
                }],
        });
        alert.present();
        return alert;
    };
    AnywhereService.prototype.showModal = function (componentName, data) {
        var modal = this.modalController.create(componentName, {
            params: data
        });
        modal.present();
        return modal;
    };
    AnywhereService.prototype.showToast = function (message, time, position, dismissOnPageChange) {
        var toast = this.toastController.create({
            message: message,
            duration: time || 2500,
            position: position || 'middle',
            cssClass: 'toast-class',
            dismissOnPageChange: (dismissOnPageChange === false) ? false : true,
        });
        toast.present();
        return toast;
    };
    AnywhereService.prototype.getFavouriteIconName = function (currentState) {
        return currentState ? 'heart' : 'heart-outline';
    };
    AnywhereService.prototype.addIdToArr = function (dataArr, propName) {
        if (!dataArr)
            return;
        var rs = [];
        var id;
        var tempVal;
        for (var i in dataArr) {
            tempVal = dataArr[i];
            if (propName) {
                id = tempVal[propName];
            }
            else {
                id = tempVal.renting.id;
            }
            rs.push(new ItemSpace(id, tempVal));
        }
        return rs;
    };
    AnywhereService.prototype.createArray = function (fromVal, toVal) {
        var arr = [];
        for (var i = fromVal; i <= toVal; i++) {
            arr.push(i);
        }
        return arr;
    };
    ;
    // ham dem so tu
    AnywhereService.prototype.countWord = function (data, maxWord) {
        var newData = _.clone(data);
        if (!newData)
            return;
        newData = newData.trim();
        newData = newData.replace(/ +/g, ' ');
        var dataArr = newData.split(' ');
        var tempStr;
        if (dataArr.length > maxWord) {
            tempStr = '';
            for (var i = 0; i < maxWord; i++) {
                tempStr += ' ' + dataArr[i];
                if (i == (maxWord - 1)) {
                    tempStr += '...';
                }
            }
            tempStr = tempStr.trim();
        }
        return {
            amount: dataArr.length,
            newStr: tempStr
        };
    };
    AnywhereService.prototype.getFullImgUrl = function (src, type, fullSize) {
        var result = _.clone(src);
        if (fullSize) {
            if (src && (src.indexOf('http') == -1) &&
                (src.indexOf(CONSTANT.IMAGE.PREFIX_IMAGE_PATH) == -1) &&
                (src.indexOf(CONSTANT.IMAGE.FILE_IMAGE_DEVICE_LOCAL) == -1)) {
                if (type == 'space') {
                    result = CONSTANT.SERVER.PREFIX_SPACE_IMAGE_LINK_ONLINE + src;
                }
                else if (type == 'apartment') {
                    result = CONSTANT.SERVER.PREFIX_APARTMENT_LINK_ONLINE + src;
                }
                else if (type == 'neighborhood') {
                    result = CONSTANT.SERVER.PREFIX_NEIGHBORHOOD_LINK_ONLINE + src;
                }
                else if (type == 'user') {
                    result = CONSTANT.SERVER.PREFIX_USER_IMAGE_LINK_ONLINE + src;
                }
                else if (type == 'review') {
                    result = CONSTANT.SERVER.PREFIX_REVIEW_IMAGE_LINK_ONLINE + src;
                }
                else if (type == 'cover') {
                    result = CONSTANT.SERVER.PREFIX_COVER_IMAGE_LINK_ONLINE + src;
                }
            }
        }
        else {
            if (src && (src.indexOf('http') == -1) &&
                (src.indexOf(CONSTANT.IMAGE.PREFIX_IMAGE_PATH) == -1) &&
                (src.indexOf(CONSTANT.IMAGE.FILE_IMAGE_DEVICE_LOCAL) == -1)) {
                if (type == 'space') {
                    result = CONSTANT.SERVER.RESIZE_PREFIX_SPACE_IMAGE_LINK_ONLINE + src;
                }
                else if (type == 'apartment') {
                    result = CONSTANT.SERVER.RESIZE_PREFIX_APARTMENT_LINK_ONLINE + src;
                }
                else if (type == 'neighborhood') {
                    result = CONSTANT.SERVER.RESIZE_PREFIX_NEIGHBORHOOD_LINK_ONLINE + src;
                }
                else if (type == 'user') {
                    result = CONSTANT.SERVER.RESIZE_PREFIX_USER_IMAGE_LINK_ONLINE + src;
                }
                else if (type == 'review') {
                    result = CONSTANT.SERVER.RESIZE_PREFIX_REVIEW_IMAGE_LINK_ONLINE + src;
                }
                else if (type == 'cover') {
                    result = CONSTANT.SERVER.RESIZE_PREFIX_COVER_IMAGE_LINK_ONLINE + src;
                }
            }
        }
        return result;
    };
    AnywhereService.prototype.calDistance = function (toLat, toLng, fromLat, fromLng) {
        var fromLocation;
        if (fromLat && fromLng) {
            fromLocation = new google.maps.LatLng(fromLat, fromLng);
        }
        else {
            if (!this.currentLocation) {
                return;
            }
            fromLocation = this.currentLocation;
        }
        var toLocation = new google.maps.LatLng(toLat, toLng);
        var dist = google.maps.geometry.spherical.computeDistanceBetween(fromLocation, toLocation);
        var km = (dist / 1000).toFixed(1);
        return parseFloat(km);
    };
    AnywhereService.prototype.makeRequest = function (path, params) {
        params = objectToParams(params);
        path = CONSTANT.SERVER.API + path + params;
        return this._handleHttpPromise(this.http
            .get(path, { headers: this.headers }));
    };
    AnywhereService.prototype.makePostRequest = function (path, params) {
        path = CONSTANT.SERVER.API + path;
        return this._handleHttpPromise(this.http
            .post(path, JSON.stringify(params), { headers: this.headers }));
    };
    AnywhereService.prototype.makeDeleteRequest = function (path) {
        path = CONSTANT.SERVER.API + path;
        return this._handleHttpPromise(this.http
            .delete(path, { headers: this.headers }));
    };
    AnywhereService.prototype.makePutRequest = function (path, params) {
        path = CONSTANT.SERVER.API + path;
        return this._handleHttpPromise(this.http
            .put(path, JSON.stringify(params), { headers: this.headers }));
    };
    AnywhereService.prototype._handleHttpPromise = function (http) {
        var p = http.toPromise()
            .then(this.handleSuccess, this.handleError);
        p.catch(function (err) {
            console.log("t da catch o dayyyyyyyyyyyyyyyyyyyy");
            // do nothing
        });
        return p;
    };
    AnywhereService.prototype.handleSuccess = function (res) {
        // console.log("ressssssssssssssss", res, res.json());
        return res.json() || {};
    };
    AnywhereService.prototype.handleError = function (error) {
        console.log("loiiiiiiiiiiiiiiiiir", error);
        return Promise.reject(error);
    };
    AnywhereService.prototype.createHeader = function () {
        var rs = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        };
        // giu lai nhe, chay dung ne
        if (this.USER.logined) {
            rs['Authorization'] = 'Bearer ' + this.USER.userInfo.token;
        }
        // cach tao loi 500 ne
        // rs['User-Id'] = this.USER.userInfo.id;
        // rs['Authorization'] = 'Bearer ' + this.USER.userInfo.token;
        return this.headers = new Headers(rs);
    };
    // thu's function
    AnywhereService.prototype.checkLessThanFiveMinutes = function (time) {
        var pastDay = new Date(time);
        var now = new Date();
        var timeMiliseconds = pastDay.getTime();
        var nowMiliseconds = now.getTime();
        var h = (nowMiliseconds - timeMiliseconds);
        if (h <= 300000) {
            return h;
        }
        else {
            return -1;
        }
    };
    AnywhereService.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
    };
    return AnywhereService;
}());
AnywhereService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        UserStorageService,
        ToastController,
        ModalController,
        AlertController,
        Events,
        DatePicker,
        Platform])
], AnywhereService);
export { AnywhereService };
// kiem tra xem mot chuoi co phai la email hay k. 
export function isEmail(string) {
    var patt = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var ok = patt.test(string);
    return ok;
}
// type: 1 trong CONSTANT.FORM_VALIDATION
export function minNumberInputValue(type, val) {
    if (!_.isNumber(val)) {
        val = parseFloat(val);
    }
    var obj = CONSTANT.FORM_VALIDATION[type];
    var minVal = _.isNumber(_.clone(obj.MIN)) ? _.clone(obj.MIN) : 0;
    if (val >= minVal && val !== 0) {
        return true;
    }
    return false;
}
// kiem tra xem chuoi nhap vao co do dai toi thieu phu hop hay khong
export function checkMinLetter(val, minLength) {
    return val && (val.trim().length >= minLength);
}
//# sourceMappingURL=anywhere.service.js.map