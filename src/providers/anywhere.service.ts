import {
  Injectable,
} from '@angular/core';
import {
  Http,
  Response,
  Headers,
} from '@angular/http';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

// import 'rxjs/add/operator/map';
// Observable operators
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/finally';
// import 'rxjs/add/observable/throw';

import * as _ from 'lodash';
import {
  ToastController,
  ModalController,
  AlertController,
  Events,
  Platform,
} from 'ionic-angular';

import { DatePicker } from '@ionic-native/date-picker';

import { CONSTANT } from './constant.service';

import { objectToParams } from './object-to-params.service';
import { UserStorageService } from './user-storage.service';
import { ItemSpace } from '../templates/item-space';

@Injectable()
export class AnywhereService {
  USER;
  headers;
  currentLocation;
  // currentLocation = new google.maps.LatLng(10.855940, 106.631563);

  constructor(
    private http: Http,
    private userStorageService: UserStorageService,
    private toastController: ToastController,
    public modalController: ModalController,
    public alertController: AlertController,
    public events: Events,
    public datePicker: DatePicker,
    public platform: Platform,
  ) {
    this.platform.ready().then(() => {
      // this.init();
      // this._handleSubscribeUser();
      this.toggleSubscribeUser(true);
      this.subscribeCurrentLocation();
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
    console.log("_handleSubscribeUser AnywhereService", res);
    this.USER = this.userStorageService.USER;
    this.createHeader();
  }

  subscribeCurrentLocation(callback ? ) {
    this.events.subscribe('setCurrentPosition', (data: any) => {
      console.log("subscribeCurrentLocation", data);
      this.currentLocation = new google.maps.LatLng(data.lat, data.lng)
      if (callback) {
        callback(this.currentLocation);
      }
    })
  }

  unfavouriteHouseLogout(spaceData) {
    if (spaceData) {
      spaceData.isFavouriteAdded = false;
    }
    return spaceData;
  }

  unfavouriteHousesArrLogout(housesArr) {
    let tempArr = _.cloneDeep(housesArr);
    console.log("unfavouriteHousesArrLogout", housesArr);
    if (_.isArray(tempArr)) {
      for (let i in tempArr) {
        if (tempArr[i].hasOwnProperty('data')) {
          tempArr[i].data = this.unfavouriteHouseLogout(tempArr[i].data);
        } else {
          tempArr[i] = this.unfavouriteHouseLogout(tempArr[i]);
        }
      }
    }
    return tempArr;
  }

  toggleTabs(state) {
    this.events.publish('Tabs:toggle', state);
  }

  showChooseImages(handleOK) {
    let initObj: any = [{
      type: 'radio',
      label: 'Blue',
      value: 'blue',
    }, {
      type: 'radio',
      label: '<ion-icon name="add"></ion-icon>Red',
      value: 'red',
    }]

    let options: any = {
      title: CONSTANT.TITLE_HOUSY,
      subTitle: CONSTANT.SELECT_IMAGES.PLACEHOLDER,
      inputs: initObj,
      cssClass: 'select-image-container',
      buttons: [{
        text: CONSTANT.STRING_CANCEL,
        role: 'cancel'
      }, {
        text: CONSTANT.STRING_UPDATE,
        handler: data => {
          handleOK(data);
        }
      }]
    }
    let alert = this.alertController.create(options);
    alert.present();
  }

  showDatePicker(initDate, options, callback) {
    initDate = initDate ? new Date(initDate) : new Date();
    let defaultOptions: any = {
      date: initDate,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      okText: CONSTANT.STRING_SELECT,
      cancelText: CONSTANT.STRING_CANCEL,
    };
    defaultOptions = _.assignIn(defaultOptions, options);
    this.datePicker.show(defaultOptions)
      .then(date => {
        // console.log('Got date: ', date)
        callback(date);
      }, err => {
        console.log('Error occurred while getting date: ', err)
      });
  }

  convertDate(date) {
    let newDate = new Date(date);
    return {
      day: newDate.getDate(),
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
      hour: newDate.getHours(),
      minutes: (newDate.getMinutes() > 9) ? newDate.getMinutes() : '0' + newDate.getMinutes(),
      second: newDate.getSeconds(),
    }
  }

  isEmail(string) {
    return isEmail(string);
  }

  // type: 1 trong CONSTANT.FORM_VALIDATION
  minNumberInputValue(type, val) {
    return minNumberInputValue(type, val);
  }

  // kiem tra xem chuoi nhap vao co do dai toi thieu phu hop hay khong
  checkMinLetter(val, minLength) {
    return checkMinLetter(val, minLength);
  }

  /**
   * @description 
   * Hien thi prompt de nhap thong tin mot truong nao do
   * type: CONSTANT.FORM_VALIDATION
   * initVal: gia tri khoi tao
   * handleOK: xu ly khi chon
   */

  showPrompt(type, initVal, handleOK) {
    let initObj: any = {
      name: CONSTANT.FORM_VALIDATION[type].NAME,
      placeholder: CONSTANT.FORM_VALIDATION[type].PLACEHOLDER,
      type: CONSTANT.FORM_VALIDATION[type].TYPE,
    }
    if (initVal) {
      initObj.value = initVal;
    }
    let alert = this.alertController.create({
      title: CONSTANT.TITLE_HOUSY,
      subTitle: CONSTANT.FORM_VALIDATION[type].required,
      inputs: [initObj],
      buttons: [{
        text: CONSTANT.STRING_CANCEL,
        role: 'cancel'
      }, {
        text: CONSTANT.STRING_UPDATE,
        cssClass: 'button-selected',
        handler: data => {
          let obj = CONSTANT.FORM_VALIDATION[type];
          let key = obj.NAME;
          let sendData = _.cloneDeep(data);
          let val = sendData[key];
          if (sendData) {
            switch (obj.TYPE) {
              case "number":
                {
                  if (type === CONSTANT.FORM_VALIDATION.RENTING_FEE.NAME) {
                    // val = val * 1000000;
                    val = parseFloat(val).toFixed(2);
                  } else {
                    val = parseFloat(val).toFixed(1);
                  }

                  if (!this.minNumberInputValue(type, val)) {
                    alert.setMessage(obj.invalid);
                    return false;
                  } else {
                    alert.setMessage(undefined);
                  }

                  break;
                }
              case "email":
                {
                  if (!this.isEmail(val)) {
                    // console.log("alertalertalertalert", alert);
                    alert.setMessage(obj.invalid);
                    return false;
                  } else {
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
  }

  showConfirm(title, msg, handleAgree ? , handleDisagree ? ,
    disagreeButton ? , agreeButton ? , disagreeCssClass ? , agreeCssClass ? ) {
    let confirm = this.alertController.create({
      title: title,
      subTitle: msg,
      enableBackdropDismiss: false,
      buttons: [{
        text: CONSTANT.STRING_CANCEL,
        cssClass: disagreeCssClass,
        handler: () => {
          if (handleDisagree) {
            handleDisagree();
          }
        }
      }, {
        text: CONSTANT.STRING_AGREE,
        cssClass: 'button-selected ' + agreeCssClass,
        handler: () => {
          if (handleAgree) {
            handleAgree();
          }
        }
      }]
    });
    confirm.present();
    return confirm;
  }


  showAlert(message, title ? , buttonName ? ) {
    let alert = this.alertController.create({
      title: title || CONSTANT.TITLE_HOUSY,
      subTitle: message,
      buttons: [{
        text: buttonName || CONSTANT.STRING_AGREE,
      }],
    });
    alert.present();
    return alert;
  }

  showModal(componentName, data ? , options ? ) {
    let modal = this.modalController.create(componentName, {
      params: data
    }, options);
    modal.present();
    return modal;
  }

  showToast(message, time ? , position ? , dismissOnPageChange ? ) {
    let toast = this.toastController.create({
      message: message,
      duration: time || 2500,
      position: position || 'middle',
      cssClass: 'toast-class',
      dismissOnPageChange: (dismissOnPageChange === false) ? false : true,
    });
    toast.present();
    return toast;
  }

  getFavouriteIconName(currentState) {
    return currentState ? 'heart' : 'heart-outline';
  }

  addIdToArr(dataArr, propName ? ) {
    if (!dataArr) return;
    let rs = [];
    let id;
    let tempVal;
    for (let i in dataArr) {
      tempVal = dataArr[i];
      if (propName) {
        id = tempVal[propName];
      } else {
        id = tempVal.renting.id;
      }

      rs.push(new ItemSpace(id, tempVal));
    }
    return rs;
  }

  createArray(fromVal, toVal) {
    let arr = [];
    for (let i = fromVal; i <= toVal; i++) {
      arr.push(i);
    }
    return arr;
  };

  // ham dem so tu
  countWord(data, maxWord) {
    let newData = _.clone(data);
    if (!newData) return;
    newData = newData.trim();
    newData = newData.replace(/ +/g, ' ');
    let dataArr = newData.split(' ');
    let tempStr;
    if (dataArr.length > maxWord) {
      tempStr = '';
      for (let i = 0; i < maxWord; i++) {
        tempStr += ' ' + dataArr[i];
        if (i == (maxWord - 1)) {
          tempStr += '...'
        }
      }
      tempStr = tempStr.trim();
    }

    return {
      amount: dataArr.length,
      newStr: tempStr
    };
  }

  getFullImgUrl(src, type, fullSize ? ): void {
    let result = _.clone(src);
    if (fullSize) {
      if (src && (src.indexOf('http') == -1) &&
        (src.indexOf(CONSTANT.IMAGE.IMAGE_PATH) == -1) &&
        (src.indexOf(CONSTANT.IMAGE.FILE_IMAGE_DEVICE_LOCAL) == -1)) {
        if (type == 'space') {
          result = CONSTANT.SERVER.PREFIX_SPACE_IMAGE_LINK_ONLINE + src;
        } else if (type == 'apartment') {
          result = CONSTANT.SERVER.PREFIX_APARTMENT_LINK_ONLINE + src;
        } else if (type == 'neighborhood') {
          result = CONSTANT.SERVER.PREFIX_NEIGHBORHOOD_LINK_ONLINE + src;
        } else if (type == 'user') {
          result = CONSTANT.SERVER.PREFIX_USER_IMAGE_LINK_ONLINE + src;
        } else if (type == 'review') {
          result = CONSTANT.SERVER.PREFIX_REVIEW_IMAGE_LINK_ONLINE + src;
        } else if (type == 'cover') {
          result = CONSTANT.SERVER.PREFIX_COVER_IMAGE_LINK_ONLINE + src;
        }
      }
    } else {
      if (src && (src.indexOf('http') == -1) &&
        (src.indexOf(CONSTANT.IMAGE.IMAGE_PATH) == -1) &&
        (src.indexOf(CONSTANT.IMAGE.FILE_IMAGE_DEVICE_LOCAL) == -1)) {
        if (type == 'space') {
          result = CONSTANT.SERVER.RESIZE_PREFIX_SPACE_IMAGE_LINK_ONLINE + src;
        } else if (type == 'apartment') {
          result = CONSTANT.SERVER.RESIZE_PREFIX_APARTMENT_LINK_ONLINE + src;
        } else if (type == 'neighborhood') {
          result = CONSTANT.SERVER.RESIZE_PREFIX_NEIGHBORHOOD_LINK_ONLINE + src;
        } else if (type == 'user') {
          result = CONSTANT.SERVER.RESIZE_PREFIX_USER_IMAGE_LINK_ONLINE + src;
        } else if (type == 'review') {
          result = CONSTANT.SERVER.RESIZE_PREFIX_REVIEW_IMAGE_LINK_ONLINE + src;
        } else if (type == 'cover') {
          result = CONSTANT.SERVER.RESIZE_PREFIX_COVER_IMAGE_LINK_ONLINE + src;
        }
      }
    }
    return result;
  }

  calDistance(toLat, toLng, fromLat ? , fromLng ? ) {
    let fromLocation;
    if (fromLat && fromLng) {
      fromLocation = new google.maps.LatLng(fromLat, fromLng);
    } else {
      if (!this.currentLocation) {
        return;
      }
      fromLocation = this.currentLocation;
    }

    let toLocation = new google.maps.LatLng(toLat, toLng);
    let dist = google.maps.geometry.spherical.computeDistanceBetween(fromLocation, toLocation);
    let km = (dist / 1000).toFixed(1);
    return parseFloat(km);
  }

  compareObj(obj1, obj2) {
    let o1 = _.cloneDeep(obj1);
    let o2 = _.cloneDeep(obj2);
    let a1 = this.removeObjPropInObj(o1);
    let a2 = this.removeObjPropInObj(o2);
    // console.log("a1a1", a1);
    // console.log("a2a2", a2);
    let b1 = JSON.stringify(a1);
    let b2 = JSON.stringify(a2);
    // console.log("qqqqqqqqqqq", b1, b2, b1 === b2);
    return b1 === b2;
  }

  removeObjPropInObj(obj) {
    let tempObj = _.cloneDeep(obj);
    for (let key in tempObj) {
      if (!tempObj[key] ||
        _.isNumber(tempObj[key]) ||
        _.isString(tempObj[key]) ||
        _.isArray(tempObj[key])) {
        continue;
      }
      delete tempObj[key];
    }
    return tempObj;
  }


  makeRequest(path, params ? ): Promise < any > {
    params = objectToParams(params);
    path = CONSTANT.SERVER.API + path + params;
    return this._handleHttpPromise(this.http
      .get(path, { headers: this.headers }));
  }

  makePostRequest(path, params ? ) {
    path = CONSTANT.SERVER.API + path;
    return this._handleHttpPromise(this.http
      .post(path, JSON.stringify(params), { headers: this.headers }));
  }

  makeDeleteRequest(path) {
    path = CONSTANT.SERVER.API + path;
    return this._handleHttpPromise(this.http
      .delete(path, { headers: this.headers }));
  }

  makePutRequest(path, params ? ) {
    path = CONSTANT.SERVER.API + path;
    return this._handleHttpPromise(this.http
      .put(path, JSON.stringify(params), { headers: this.headers }));
  }

  _handleHttpPromise(http) {

    var p = http.toPromise()
      .then(this.handleSuccess, this.handleError);
    p.catch((err) => {
      console.log("t da catch o dayyyyyyyyyyyyyyyyyyyy")
      // do nothing
    });
    return p;
  }

  handleSuccess(res: Response) {
    // console.log("ressssssssssssssss", res, res.json());
    return res.json() || {};
  }

  handleError(error: Response | any) {
    console.log("loiiiiiiiiiiiiiiiiir", error);
    return Promise.reject(error);
  }

  createHeader() {
    let rs = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    }

    // giu lai nhe, chay dung ne
    if (this.USER.logined) {
      rs['Authorization'] = 'Bearer ' + this.USER.userInfo.token;
    }

    // cach tao loi 500 ne
    // rs['User-Id'] = this.USER.userInfo.id;
    // rs['Authorization'] = 'Bearer ' + this.USER.userInfo.token;

    return this.headers = new Headers(rs);
  }

  // thu's function
  checkLessThanFiveMinutes(time) {
    let pastDay = new Date(time);
    let now = new Date();
    let timeMiliseconds = pastDay.getTime();
    let nowMiliseconds = now.getTime();
    let h = (nowMiliseconds - timeMiliseconds);
    if (h <= 300000) {
      return h;
    } else {
      return -1;
    }
  }



  ngOnDestroy() {
    this.toggleSubscribeUser(false);
  }
}

// kiem tra xem mot chuoi co phai la email hay k. 
export function isEmail(string) {
  let patt = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  let ok = patt.test(string);
  return ok;
}

// type: 1 trong CONSTANT.FORM_VALIDATION
export function minNumberInputValue(type, val, canEqZero ? : boolean) {
  if (!_.isNumber(val)) {
    val = parseFloat(val);
  }
  let obj = CONSTANT.FORM_VALIDATION[type];
  let minVal = _.isNumber(_.clone(obj.MIN)) ? _.clone(obj.MIN) : 0;

  if (val >= minVal) {
    return canEqZero ? true : (val !== 0);
  }
  return false;
}

// kiem tra xem chuoi nhap vao co do dai toi thieu phu hop hay khong
export function checkMinLetter(val, minLength) {
  return val && (val.trim().length >= minLength);
}
