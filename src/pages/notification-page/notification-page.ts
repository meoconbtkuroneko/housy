import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import {
  NavController,
  ActionSheetController,
  Events
} from 'ionic-angular';

import * as _ from 'lodash';

import { CONSTANT } from '../../providers/constant.service';
import { NotificationsService } from '../../providers/notifications.service';
import { GetService } from '../../providers/get.service';
import { PutService } from '../../providers/put.service';
import { DeleteService } from '../../providers/delete.service';
import { HomeDetail } from '../home-detail/home-detail';
import {
  CoreClassNeedLogin,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'notification-page',
  templateUrl: 'notification-page.html'
})
export class NotificationPage extends CoreClassNeedLogin {
  constructor(
    public navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private getService: GetService,
    private putService: PutService,
    private deleteService: DeleteService,
    public notificationsService: NotificationsService,
    private events: Events,
    private storage: Storage,
    coreServices: CoreServices,
  ) {
    // If we navigated to this page, we will have an item available as a nav
    super(coreServices);
  }

  listData = [];
  notificationStatus = CONSTANT.SERVER.NOTIFICATION_STATUS;
  notificationTypes = CONSTANT.SERVER.NOTIFICATION_TYPE;

  toggleSubscribeNewNotifications(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(CONSTANT.EVENTS_NAME.NOTIFICATION_NEW, this.handleSubscribeNewNotifications)
    } else {
      this.events.unsubscribe(CONSTANT.EVENTS_NAME.NOTIFICATION_NEW, this.handleSubscribeNewNotifications)
    }
  }

  private handleSubscribeNewNotifications = (data) => {
    console.log("handleSubscribeNewNotifications", data);
    if (!this.allDataList) {
      this.allDataList = [];
    }

    this.allDataList.unshift(data);
    console.log("this.allDatalist handleSubscribeNewNotifications", this.allDataList);
  }

  ionViewCanEnter() {
    console.log("ionViewCanEnter 11111111111")
    this.coreServices.anywhereService.toggleTabs('show');
  }

  ngOnInit() {
    this.doRefresh();
  }

  handleSubscribeUser(res ? ) {
    console.log("handleSubscribeUser NotificationPage");
    this.doRefresh();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit notiffffffffffffffff")
    this.toggleSubscribeNewNotifications(true);
  }

  getAllData() {
    if (this.USER.logined) {
      this.events.publish(CONSTANT.EVENTS_NAME.ON_TAB_NOTIFICATION, true);
      this.listAllData();
      this.resetCountNotifi()
    }
  }

  listAllData() {
    return this._listAllData(
      'listAllNotifications',
      null,
      (res: any) => {
        console.log("listAllData 2222222222", res)
        let data = _.clone(res[CONSTANT.DETAIL_TYPE.NOTIFICATIONS]);
        this.allDataList = this.allDataList || [];
        this.allDataList = _.unionWith(
          this.allDataList, data, _.isEqual
        );
        console.log("this.allDataList", this.allDataList);
      })
  }

  resetCountNotifi() {
    this.notificationsService.setIsOnTabNotification(true);
    // this.events.publish(CONSTANT.EVENTS_NAME.ON_TAB_NOTIFICATION, true);
    this.notificationsService.onTabNotification();
    // this.notificationsService.removeCountNotification();
    // let dataBroadcast = {
    //   count: ''
    // };

    // this.events.publish("Notifications:resetCount", dataBroadcast);
  }

  ionViewDidLeave() {
    this.notificationsService.setIsOnTabNotification(false);
    // this.events.publish(CONSTANT.EVENTS_NAME.ON_TAB_NOTIFICATION, false);
  }

  options(event, index, itemId) {
    event.stopPropagation()
    let toggleReadText = CONSTANT.NOTIFICATION.READ;
    let currentStatus = this.allDataList[index].status;
    let sendStatus;
    if (currentStatus ==
      this.notificationStatus.NOTIFICATION_STATUS_READ) {
      toggleReadText = CONSTANT.NOTIFICATION.NOT_READ;
      sendStatus = this.notificationStatus.NOTIFICATION_STATUS_NOT_READ;
    } else {
      sendStatus = this.notificationStatus.NOTIFICATION_STATUS_READ;
    }
    let actionSheet = this.actionSheetController.create({
      // title: '',
      buttons: [{
        text: CONSTANT.STRING_DELETE,
        role: 'delete',
        icon: "trash",
        handler: () => {
          this.deleteNotification(index, itemId);
        }
      }, {
        text: toggleReadText,
        role: 'readed',
        icon: "eye",
        handler: () => {
          let data = {
            status: sendStatus
          }
          this.toggleNotification(index, itemId, data);
        }
      }]
    });
    actionSheet.present();
  }

  deleteNotification(index, id) {
    this.deleteService.deleteNotification(id)
      .then((res) => {
        this.allDataList.splice(index, 1);
        this.totalItem--;
      })
  }

  // 0: da doc
  // 1: chua doc
  // data = {
  //     status: sendStatus
  // };

  toggleNotification(index, id, data) {
    console.log('toggleNotification')
    let oldStatus = this.allDataList[index].status;
    this.putService.toggleNotification(id, data)
      .then((res) => {
        // neu chua doc
        this.allDataList[index].status =
          this.notificationStatus.NOTIFICATION_STATUS_READ;

        if (oldStatus == this.notificationStatus.NOTIFICATION_STATUS_READ) {
          this.allDataList[index].status =
            this.notificationStatus.NOTIFICATION_STATUS_NOT_READ;
        }
      });
  }

  notificationClicked(index, item) {
    console.log("notificationClickednotificationClickednotificationClicked", item);
    if (item.status == this.notificationStatus.NOTIFICATION_STATUS_NOT_READ) {

      let data = {
        status: this.notificationStatus.NOTIFICATION_STATUS_READ
      }
      this.toggleNotification(index, item.id, data);
    }
    if (item.type == this.notificationTypes.NOTIFICATION_TYPE_DISCOUNT ||
      item.type == this.notificationTypes.NOTIFICATION_TYPE_RENTING) {
      // Do what u wanna do
      this.navCtrl.push(HomeDetail, {
        params: {
          id: item.object_id
        }
      })
    }
    if (item.type == this.notificationTypes.NOTIFICATION_TYPE_APARTMENT) {
      // this.GlobalService.goDetailApartment(item.object_id);

    }

    if (item.type == this.notificationTypes.NOTIFICATION_TYPE_NEIGHBORHOOD) {

    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
