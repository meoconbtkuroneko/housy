import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/map';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as _ from 'lodash';
import {
  ToastController,
  ModalController,
  AlertController,
  Events,
} from 'ionic-angular';

import { CONSTANT } from './constant.service';

import { objectToParams } from './object-to-params.service';
import { UserStorageService } from './user-storage.service';
import { ItemSpace } from '../templates/item-space';


@Injectable()
export class AnywhereService {
  constructor(
    private http: Http,
    private userStorageService: UserStorageService,
    private toastController: ToastController,
    public modalController: ModalController,
    public alertController: AlertController,
    public events: Events,

  ) {
    this.userStorageService.subscribeUser(res => {
      if (!_.isEmpty(res)) {
        this.USER = res;
        this.createHeader();
      }
    })
  }

  USER;
  headers;
  currentLocation = new google.maps.LatLng(10.855940, 106.631563);

  toogleTabs(state) {
    this.events.publish('Tabs:toogle', state);
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

  showModal(componentName, data ? ) {
    let modal = this.modalController.create(componentName, {
      params: data
    });
    modal.present();
    return modal;
  }

  showToast(message, time ? , position ? ) {
    let toast = this.toastController.create({
      message: message,
      duration: time || 2500,
      position: position || 'middle',
      cssClass: 'toast-class',
      dismissOnPageChange: true,
    });
    toast.present();
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
        (src.indexOf(CONSTANT.IMAGE.PREFIX_IMAGE_PATH) == -1) &&
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
        (src.indexOf(CONSTANT.IMAGE.PREFIX_IMAGE_PATH) == -1) &&
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

  makeRequest(path, params ? ) {
    path = CONSTANT.SERVER.API + path;
    params = objectToParams(params);
    return this.http
      .get(path + params, { headers: this.headers })
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  makePostRequest(path, params ? ) {
    path = CONSTANT.SERVER.API + path;
    return this.http
      .post(path, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  makeDeleteRequest(path) {
    path = CONSTANT.SERVER.API + path;
    return this.http
      .delete(path, { headers: this.headers })
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  makePutRequest(path, params ? ) {
    path = CONSTANT.SERVER.API + path;
    return this.http
      .put(path, JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  createHeader() {
    let rs = {
      'Content-Type': 'application/json',
    }

    if (this.USER.logined) {
      rs['User-Id'] = this.USER.userInfo.id;
      rs['Authorization'] = 'Bearer ' + this.USER.userInfo.token;
    }

    return this.headers = new Headers(rs);
  }

  handleSuccess(res: Response) {
    // console.log("ressssssssssssssss", res, res.json());
    return res.json() || {};
  }

  handleError(error: Response | any) {
    console.log("loiiiiiiiiiiiiiiiiir", error);
    return Observable.throw(error);
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
}
