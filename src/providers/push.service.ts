import { Injectable } from '@angular/core';
import { CONSTANT } from './constant.service';
import { NotificationsService } from './notifications.service';
import { UserStorageService } from './user-storage.service';
import { AnywhereService } from './anywhere.service';
import { Vibration } from '@ionic-native/vibration';
// import { HomeDetail } from '../pages/home-detail/home-detail';

import * as _ from 'lodash';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

import {
  Events,
  Platform,
} from 'ionic-angular';

@Injectable()
export class PushService {
  constructor(
    public notificationsService: NotificationsService,
    private userStorageService: UserStorageService,
    private anywhereService: AnywhereService,
    private push: Push,
    private events: Events,
    public platform: Platform,
    private vibration: Vibration,
  ) {
    this.platform.ready().then(() => {
      if (this.userStorageService.USER.logined) {
        this.registerPushNotification()
      }
    });
    // if (CONSTANT.REAL_DEVICE) {
    //   return;
    // }
    // this.testNotification();
  }

  testNotification() {
    this.events.subscribe(CONSTANT.EVENTS_NAME.NOTIFICATION_GET_TEST, this.handleSubscribeNotifi);
    let data = {
      "raw": {
        "title": "Housy.vn",
        "message": "Nhà được đăng trên housy.vn",
        "additionalData": {
          "payload": {
            "id": 86,
            "type": 1,
            "object_id": 30
          },
          "notId": "362",
          "dismissed": false,
          "google.message_id": "0:1497003779864373%d2a28212f9fd7ecd",
          "coldstart": true,
          "foreground": true
        }
      },
      "text": "Nhà được đăng trên housy.vn",
      "title": "Housy.vn",
      "app": {
        "asleep": true,
        "closed": true
      },
      "payload": {
        "id": 86,
        "type": 1,
        "object_id": 30
      }
    }
    setTimeout(() => {
      this.events.publish(CONSTANT.EVENTS_NAME.NOTIFICATION_GET_TEST, data);
    }, 5000);
  }

  registerPushNotification() {
    console.log("registerPushNotification")
    this.push.register()
      .then((token: PushToken) => {
        if (this.userStorageService.USER.userInfo.tokenDevice !== token.token) {
          this.push.saveToken(token);
          this.userStorageService.setTokenDevice(token.token)
            .then(res => {
              this.notificationsService.registerDeviceToken();
            });
        }
      })
      .catch(() => {
        console.log("registerPushNotification  this.push.register in Process")
      });

    this.onGetNotification();
  }

  onGetNotification() {
    console.log("onGetNotificationonGetNotification", this.push, this.push.rx);
    /*subsribe and handle when receive notifications */
    this.push.rx.notification()
      .subscribe((msg) => {
        console.log("push.rx.notification", msg);
        this.handleSubscribeNotifi(msg);
      });
  }

  private handleSubscribeNotifi = (msg: any) => {
    console.log("handleSubscribeNotifihandleSubscribeNotifi", msg)
    try {
      if (msg && msg.raw && msg.raw.additionalData &&
        msg.raw.additionalData.foreground) {
        this.onForegroundNotification(msg);
      } else {
        this.onBackgroundgroundNotification(msg);
      }
      let newMsg = _.cloneDeep(msg.payload);
      newMsg.content = (msg && msg.raw) ? msg.raw.message : '';
      newMsg.status = CONSTANT.SERVER.NOTIFICATION_STATUS.NOTIFICATION_STATUS_NOT_READ;
      this.events.publish(CONSTANT.EVENTS_NAME.NOTIFICATION_NEW, newMsg)
    } catch (e) {
      console.log("catch catch handleSubscribeNotifi", e)
    }
  }

  // dang o trong ung dung
  onForegroundNotification(msg) {
    this.notificationsService.setFocegroundNotification();
    this.anywhereService.showToast(msg.text)
    this.vibration.vibrate([1000, 500, 1000, 500, 1000]);
  }

  // ung dung not active
  onBackgroundgroundNotification(msg) {
    let payload = msg.payload;
    this.notificationsService.setNotifi(payload);
    this.notificationsService.actionNotifi();
  }

  unregisterPushNotification() {
    this.push.unregister()
      .catch(() => {})

    this.notificationsService.unRegisterDeviceToken()
      .catch(() => {
        console.log("registerPushNotification  this.push.register in Process")
      });
  }

  // initPush(callbackSuccess ? , callbackErr ? ) {
  //   if (!CONSTANT.REAL_DEVICE) {
  //     return;
  //   }
  //   console.log("initPushinitPushinitPush")
  //   const pushOptions: PushOptions = {
  //     android: {
  //       senderID: '1029105465160',
  //       vibrate: true,
  //       forceShow: true,
  //     },
  //     ios: {
  //       alert: 'true',
  //       badge: true,
  //       sound: 'false'
  //     },
  //     windows: {}
  //   };
  //   this.pushObject = this.push.init(pushOptions);
  //   this.onRegistration(callbackSuccess);
  //   this.onNotification();
  //   this.onError(callbackErr);
  // }

  // unregister() {
  //   if (!this.pushObject) {
  //     return;
  //   }
  //   this.removePushObj();
  //   this.pushObject.unregister()
  //     .catch(() => {
  //       console.log("this.push.unregister in Process")
  //     })
  // }

  // onRegistration(callback ? ) {
  //   if (!this.pushObject) {
  //     return;
  //   }
  //   this.pushObject.on('registration').subscribe((registration: any) => {
  //     console.log('Device registered', registration)
  //     this.userStorageService.setTokenDevice(registration.registrationId)
  //       .then(() => {
  //         this.notificationsService.registerDeviceToken();
  //       })

  //     if (callback) {
  //       callback(registration.registrationId)
  //     }
  //   });
  // }

  // onNotification() {
  //   console.log("onNotification()onNotification()", this.pushObject);
  //   if (!this.pushObject) {
  //     return;
  //   }
  //   this.pushObject.on('notification').subscribe((notification: any) => {
  //     console.log('Received a notification', notification)
  //     this.handleSubscribeNotifi(notification)
  //   });
  // }

  // onError(callback ? ) {
  //   if (!this.pushObject) {
  //     return;
  //   }
  //   this.pushObject.on('error').subscribe((error: any) => {
  //     console.log('Error with Push plugin', error)
  //     if (callback) {
  //       callback(error);
  //     }
  //   });
  // }

  // checkPushPermission() {
  //   console.log("checkPushPermission");
  //   // to check if we have permission
  //   if (!CONSTANT.REAL_DEVICE) {
  //     return;
  //   }
  //   this.push.hasPermission()
  //     .then((res: any) => {

  //       if (res.isEnabled) {
  //         console.log('We have permission to send push notifications');
  //       } else {
  //         console.log('We do not have permission to send push notifications');
  //       }

  //     });

  // }
}
