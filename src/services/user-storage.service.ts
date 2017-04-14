import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserSetting } from '../templates/user-setting';

import * as _ from 'lodash';

// import { CONSTANT } from './constant.service';

const DEFAULT = {
  'role': 'renter',
  'logined': false,
  'loginType': 'housy',
  'tokenImage': '',
  'tokenDevice': '',
  'userInfo': {
    'id': -1,
    'name': '',
    'username': '',
    'password': '',
    'avatar': '',
    'cover': '',
    "notification_email": true,
    "promotion_email": true,
    "push_notification": true,
  }
};

@Injectable()
export class UserStorageService {
  constructor(
    private storage: Storage
  ) {}

  private USER_SUBSCRIBE = new BehaviorSubject({});

  USER: any = {};

  subscribeUser(callback ? ) {
    this.USER_SUBSCRIBE.subscribe(res => {
      this.USER = _.cloneDeep(res);
      if (callback) {
        return callback(res);
      }
    })
  };

  startupServices() {
    return this.get('USER').then(res => {
      if (!res) {
        return this.setUser(DEFAULT);
      }
      this.broadcastUserChange(res);
      return res;
    })
  }

  set(key, val) {
    return this.storage.set(key, val);
  }

  setUser(val, returnProp ? ) {
    return this.set('USER', val)
      .then(res => {
        this.broadcastUserChange(res);
        if (returnProp) {
          return res[returnProp];
        }
        return res;
      })
  }

  broadcastUserChange(data) {
    this.USER_SUBSCRIBE.next(data);
  }

  get(key) {
    return this.storage.get(key);
  }

  getProp(propName) {
    return this.USER[propName];
  }

  getSetting(): UserSetting {
    let userInfo = this.getProp('userInfo');
    console.log("getSetting getSetting", userInfo);
    return new UserSetting(
      userInfo.notification_email,
      userInfo.promotion_email,
      userInfo.push_notification
    );
  };

  setRole(newRole) {
    let role = _.clone(newRole) || 'renter';
    let defaultValues = _.cloneDeep(this.USER);
    defaultValues.role = role;
    return this.setUser(defaultValues, 'role');
  }

  setSetting(data: UserSetting) {
    let defaultValues = _.cloneDeep(this.USER);
    defaultValues.userInfo.notification_email = data.notification_email;
    defaultValues.userInfo.promotion_email = data.promotion_email;
    defaultValues.userInfo.push_notification = data.push_notification;
    return this.setUser(defaultValues);
  }

  setLoginedUser(userData, loginType ? ) {
    let defaultValues = _.cloneDeep(DEFAULT);
    _.assignIn(defaultValues.userInfo, userData);
    defaultValues.logined = true;
    loginType == 'Facebook' || loginType == 'Google' ?
      defaultValues.loginType = loginType :
      defaultValues.loginType = 'housy';
    defaultValues.tokenImage = userData.token_image;
    defaultValues.role = this.getProp('role');
    return this.setUser(defaultValues);
  }

  setLogouted() {
    let defaultValues = _.cloneDeep(DEFAULT);
    defaultValues.tokenDevice = this.getProp('tokenDevice');
    defaultValues.role = this.getProp('role');
    return this.setUser(defaultValues);
  }

  reset() {
    return this.setUser(DEFAULT);
  }

  setUpdateUserData(userData) {
    if (userData) {
      let defaultValues = _.cloneDeep(this.USER);
      defaultValues.userInfo = this.getProp('userInfo');
      _.assignIn(defaultValues.userInfo, userData);
      return this.setUser(defaultValues, 'userInfo');
    }
  }

  setTokenDevice(token) {
    let defaultValues = _.cloneDeep(this.USER);
    defaultValues.tokenDevice = token;
    return this.setUser(defaultValues, 'tokenDevice');
  }
}
