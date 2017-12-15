import {
  Injectable,
} from '@angular/core';
import {
  Events,
  Platform,
} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AnywhereService } from "./anywhere.service";
import { CONSTANT } from "./constant.service";
import { UserStorageService } from "./user-storage.service";
import { PutService } from "./put.service";

import * as _ from 'lodash';

@Injectable()
export class NotificationsService {

  isOnTabNotification;

  private payload = {
    object_id: null,
    type: null,
    id: null
  };

  constructor(
    private anywhereService: AnywhereService,
    private userStorageService: UserStorageService,
    private putService: PutService,
    private storage: Storage,
    private events: Events,
    public platform: Platform,
  ) {
    this.platform.ready().then(() => {
      // this.setCountNotification(0);
    });
  }

  keyCountNotification = 'countNotifications';

  setIsOnTabNotification(onTabNotification: boolean) {
    this.isOnTabNotification = onTabNotification;
  }

  resetNotifi() {
    this.payload = {
      object_id: null,
      type: null,
      id: null
    };
  }

  getNotifi() {
    return this.payload;
  }

  setNotifi(obj) {
    if (obj) {
      this.payload = _.cloneDeep(obj);
    }
  }

  actionNotifi() {
    console.log("???????? actionNotifi 2", this.payload.type);
    this.putService.toggleNotification(this.payload.id, {
      status: CONSTANT.SERVER.NOTIFICATION_STATUS.NOTIFICATION_STATUS_READ
    });
    this.broadcastNotification(this.payload);
    this.resetNotifi();
    console.log("THEO LY THUYET LA MO TRANG DETAIL NE");
  }

  broadcastNotification(data) {
    this.events.publish(CONSTANT.EVENTS_NAME.NOTIFICATION_GET, data);
  }

  setFocegroundNotification() {
    if (this.isOnTabNotification) {
      this.onTabNotification()
    } else {
      this.onTabOther();
    }
  }

  onTabNotification() {
    this.removeCountNotification(() => {
      let dataBroadcast = {
        count: ''
      };
      this.handleBroadcastCountNotifi(dataBroadcast)
    })
  }

  onTabOther() {
    this.getCountNotification((count) => {
      let dataBroadcast = {
        count: ''
      };
      let totalNotif;
      totalNotif = count;
      ++totalNotif;
      console.log(" 1 -storage------countNotifications------- get ", count, totalNotif);
      dataBroadcast = {
        count: totalNotif
      };
      this.handleBroadcastCountNotifi(dataBroadcast)
      this.setCountNotification(totalNotif);
    });
  }

  handleBroadcastCountNotifi(dataBroadcast) {
    console.log("t broadcast dayyyyyyyyy", dataBroadcast);
    this.events.publish(CONSTANT.EVENTS_NAME.NOTIFICATION_CHANGE_COUNT, dataBroadcast);
    // this.events.publish("Notifications:resetCount", dataBroadcast);
  }

  getCountNotification(callback ? ) {
    this.storage.get(this.keyCountNotification)
      .then(count => {
        if (callback) {
          callback(count);
        }
      });
  }

  setCountNotification(val, callback ? ) {
    this.storage.set(this.keyCountNotification, val)
      .then(() => {
        if (callback) {
          callback();
        }
      });
  }

  removeCountNotification(callback ? ) {
    this.storage.remove(this.keyCountNotification)
      .then(() => {
        if (callback) {
          callback();
        }
      });
  }




  // token device-------------------------
  registerDeviceToken() {
    let deviceToken = {
      "device_token": this.userStorageService.getProp('tokenDevice'),
      "app_name": "housy_renter"
    }

    this.anywhereService.makePostRequest(
      CONSTANT.SERVER.APIS.REGISTER_DEVICE_TOKEN,
      deviceToken
    ).then((obj) => {
      console.log('6666 registerDeviceToken OKKK ', obj);
    }, (obj) => {
      console.log('77777 registerDeviceToken FFFF ', obj);
    })
  }

  unRegisterDeviceToken() {
    let deviceToken = {
      "device_token": this.userStorageService.getProp('tokenDevice')
    }
    return this.anywhereService.makeRequest(CONSTANT.SERVER.APIS.UNREGISTER_DEVICE_TOKEN, deviceToken)
      .then((obj) => {
        console.log('UNUNUN unRegisterDeviceToken ', obj);
      });
  }

  reTryUnRegisterDeviceToken() {
    if (this.userStorageService.getProp('tokenDevice') && !this.userStorageService.USER.logined) {
      this.unRegisterDeviceToken();
      console.log('Có token nhưng không login');
    }
  }

}
