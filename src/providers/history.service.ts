import {
  Injectable,
} from '@angular/core';
import { Storage } from '@ionic/storage';

import { UserStorageService } from './user-storage.service';
import { PostService } from './post.service';
import { CONSTANT } from './constant.service';
import { GetService } from './get.service';
import { HistorySearch, POPULAR_SEARCHS } from '../templates/history-search';
import * as _ from 'lodash';

import {
  Platform,
  Events,
} from 'ionic-angular';


@Injectable()
export class HistoryService {
  HISTORY: any;
  USER;
  userId;
  HISTORY_KEY;

  constructor(
    private storage: Storage,
    private userStorageService: UserStorageService,
    private postService: PostService,
    public platform: Platform,
    public events: Events,
    private getService: GetService,
  ) {
    this.platform.ready().then(() => {
      this._handleSubscribeUser();
      this.toggleSubscribeUser(true);
    })
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
    console.log("_handleSubscribeUser HistoryService", res);
    this.USER = this.userStorageService.USER;
    if (!this.USER || _.isEmpty(this.USER)) {
      return;
    }
    this.userId = this.USER.userInfo.id;
    this.HISTORY_KEY = this.getHistoryKey();
    this.HISTORY = [];
    this.startupServices();
  }

  getRecentSearch() {
    return this.HISTORY.slice(0, 5);
  }

  getHistoryKey() {
    if (this.userId != -1) {
      return this.HISTORY_KEY = 'HISTORY_' + this.userId;
    }
    return this.HISTORY_KEY = 'HISTORY_';
  }

  getHistories() {
    return this.HISTORY;
  }

  startupServices() {
    return this.storage.get(this.HISTORY_KEY)
      .then((res: any) => {
        if (!res && this.USER.logined) {
          return this.getRecentSearchFromServer()
            .then(res => {
              let histories = this.initHistoriesSearch(res);
              if (histories && histories.length > 0) {
                return this.setHistories(histories);
              }
              return res;
            })
        }
        this.broadcastHistoriesChange(res);
        return res;
      })
  }

  initHistoriesSearch(arrPlaces) {
    let tempSearch: any;
    let tempRs = [];
    for (let i in arrPlaces) {
      let tempObj = _.find(POPULAR_SEARCHS, {
        name: arrPlaces[i],
      })
      if (tempObj) {
        tempSearch = tempObj;
      } else {
        tempSearch = new HistorySearch(arrPlaces[i], null, null);
      }
      tempRs.push(tempSearch);
    }
    return tempRs;
  }

  getRecentSearchFromServer() {
    let params = {
      type: CONSTANT.RECENT_SEARCH_TYPE.PLACE
    }
    return this.getService.getRecentSearch(params)
      .then(data => {
        if (data.reason === CONSTANT.REASONS.ER_OK) {
          return data.places;
        }
      });
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
    this.HISTORY = data ? _.cloneDeep(data) : [];
    this.events.publish(CONSTANT.EVENTS_NAME.HISTORIES_CHANGED, data);
  }

  goToSearch(place: HistorySearch) {
    this.setHistory(place);
    if (this.USER.logined) {
      let data = {
        place: place.name
      };
      this.postService.updateRecentSearch(data);
    }
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
  }
}
