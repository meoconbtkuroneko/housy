import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Events } from 'ionic-angular';

import { CONSTANT } from './constant.service'
import { AnywhereService } from './anywhere.service'
import { ReportPage } from '../pages/report-page/report-page';

import * as _ from 'lodash';

@Injectable()
export class ReportService {
  constructor(
    private storage: Storage,
    private events: Events,
    private anywhereService: AnywhereService,
  ) {
    this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.REPORT;
    this.toggleSubscribeCallbackAfterLogined(true);
  }

  key = 'CONTACT_HOST_INFO';
  timeToFinishCall = 30000;

  callbackType;

  CONTACT_HOST_INFO: any = {};

  type;
  data;

  toggleSubscribeCallbackAfterLogined(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.DO_CALLBACK_AFTER_LOGINED,
        this._handleSubscribeCallbackAfterLogined
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.LOGIN_SUCCESS,
        this._handleSubscribeCallbackAfterLogined
      );
    }
  }

  private _handleSubscribeCallbackAfterLogined = (data) => {
    console.log("_handleSubscribeCallbackAfterLogined ReportService", data)
    if (data === this.callbackType) {
      this.showReport();
    }
  }

  showReport() {
    this.anywhereService.showModal(ReportPage, {
      type: this.type,
      data: this.data
    });
  }

  setReportData(type, data) {
    this.type = type;
    this.data = data;
  }

  startupServices() {
    return this.getContactHostInfo()
      .then(res => {
        this.broadcastContactHostInfoChange(res);
        return res;
      })
  }

  broadcastContactHostInfoChange(data) {
    this.CONTACT_HOST_INFO = _.cloneDeep(data);
    this.events.publish(CONSTANT.EVENTS_NAME.REPORT_SERVICE_CHANGED, data);
  }

  getContactHostInfo() {
    return this.storage.get(this.key);
  }

  setContactHostInfo(val) {
    return this.storage.set(this.key, val)
      .then(res => {
        this.broadcastContactHostInfoChange(res);
      });
  }

  resetContactHostInfo() {
    return this.storage.remove(this.key).then(res => {
      this.broadcastContactHostInfoChange({});
    });
  }

  checkContactTime() {
    if (this.CONTACT_HOST_INFO && this.CONTACT_HOST_INFO.timeContact) {
      let nowTime = new Date().getTime();
      let callingTime = nowTime - this.CONTACT_HOST_INFO.timeContact;
      this.resetContactHostInfo();
      if (callingTime > this.timeToFinishCall) {
        return true;
      }
      return
    }
  }

  ngOnDestroy() {
    this.toggleSubscribeCallbackAfterLogined(false);
  }
}
