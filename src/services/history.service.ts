import {
  Injectable,
} from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserStorageService } from './user-storage.service';
import { HistorySearch } from '../templates/history-search';
import * as _ from 'lodash';

@Injectable()
export class HistoryService {
  private HISTORY_SUBSCRIBE = new BehaviorSubject([]);
  HISTORY: any;
  USER;
  userId;
  HISTORY_KEY;

  constructor(
    private storage: Storage,
    private userStorageService: UserStorageService,
  ) {
    this.userStorageService.subscribeUser(res => {
      if (!_.isEmpty(res)) {
        this.USER = _.cloneDeep(res);
        this.userId = this.USER.userInfo.id;
        this.HISTORY_KEY = this.getHistoryKey();
        this.HISTORY = [];
        this.startupServices();
      }
    });
    this.subscribeHistories();
  }

  getHistoryKey() {
    if (this.userId != -1) {
      return this.HISTORY_KEY = 'HISTORY_' + this.userId;
    }
    return this.HISTORY_KEY = 'HISTORY_';
  }

  subscribeHistories(callback ? ) {
    this.HISTORY_SUBSCRIBE.subscribe(res => {
      this.HISTORY = res ? _.cloneDeep(res) : [];
      if (callback) {
        return callback(res);
      }
    })
  };

  startupServices() {
    return this.storage.get(this.HISTORY_KEY)
      .then((res: any) => {
        this.broadcastHistoriesChange(res);
        return res;
      })
  }

  setHistories(histories) {
    return this.storage.set(this.HISTORY_KEY, histories)
      .then(res => {
        this.broadcastHistoriesChange(res);
        return res;
      })
  }

  setHistory(history: HistorySearch) {
    let histories = this.removeItemInHistories(history);
    histories.unshift(history);
    return this.setHistories(histories);
  }

  deleteHistory(history: HistorySearch) {
    let histories = this.removeItemInHistories(history);
    return this.setHistories(histories);
  }

  // xoa mot item ra khoi histories, tra ve history sau khi xoa, chua luu vao bo nho
  private removeItemInHistories(item: HistorySearch) {
    let histories = _.cloneDeep(this.HISTORY);
    let index = _.findIndex(
      histories, {
        name: item.name
      });
    // console.log("histories 0000000000000", histories, item.name, index);
    if (index > -1) {
      histories.splice(index, 1);
    }
    return histories;
  }

  clearHistories() {
    return this.storage.remove(this.HISTORY_KEY)
      .then(res => {
        this.broadcastHistoriesChange([]);
      })
  }

  broadcastHistoriesChange(data) {
    this.HISTORY_SUBSCRIBE.next(data);
  }
}
