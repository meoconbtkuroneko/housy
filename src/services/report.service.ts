import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'lodash';

@Injectable()
export class ReportService {
  constructor(
    private storage: Storage
  ) {}

  key = 'CONTACT_HOST_INFO';

  private CONTACT_HOST_SUBSCRIBE = new BehaviorSubject({});

  CONTACT_HOST_INFO: any = {};

  subscribeContactHostInfo(callback ? ) {
    this.CONTACT_HOST_SUBSCRIBE.subscribe(res => {
      this.CONTACT_HOST_INFO = _.cloneDeep(res);
      if (callback) {
        return callback(res);
      }
    })
  };

  startupServices() {
    return this.getContactHostInfo()
      .then(res => {
        this.broadcastContactHostInfoChange(res);
        return res;
      })
  }

  broadcastContactHostInfoChange(data) {
    this.CONTACT_HOST_SUBSCRIBE.next(data);
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
}
