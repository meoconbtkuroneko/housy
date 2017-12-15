import {
  Injectable,
} from '@angular/core';
import { Storage } from '@ionic/storage';

import { UserStorageService } from './user-storage.service';
import { AnywhereService } from './anywhere.service';
import { PostService } from './post.service';
import { CONSTANT } from './constant.service';
import { GetService } from './get.service';
import { ItemSpace } from '../templates/item-space';
import { CurrentItemService } from './current-item.service';

import * as _ from 'lodash';

import { Events } from 'ionic-angular';

@Injectable()
export class RecentViewService {
  RECENT_VIEW: any;
  USER;
  userId;
  RECENT_VIEW_KEY;

  constructor(
    private storage: Storage,
    private events: Events,
    private userStorageService: UserStorageService,
    private postService: PostService,
    private getService: GetService,
    private currentItemService: CurrentItemService,
    private anywhereService: AnywhereService,
  ) {
    this._handleSubscribeUser();
    this.toggleSubscribeUser(true);

    this.handleSubscribeCurrentItem(true);
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
    console.log("_handleSubscribeUser RecentViewService", res);
    this.USER = this.userStorageService.USER;
    if (!this.USER || _.isEmpty(this.USER)) {
      return;
    }
    this.userId = this.USER.userInfo.id;
    this.RECENT_VIEW_KEY = this.getRecentViewsKey();
    this.RECENT_VIEW = [];
    this.startupServices();
  }

  toggleSubscribeCurrentItem(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED,
        this.handleSubscribeCurrentItem
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED,
        this.handleSubscribeCurrentItem
      );
    }
  }

  private handleSubscribeCurrentItem = (res) => {
    switch (res.type) {
      case "space":
        {
          this.checkAndChange(this.RECENT_VIEW, res);
          break;
        }
    }
  }

  private checkAndChange(checkArr, newVal) {
    let index = _.findIndex(checkArr, { id: newVal.id });
    if (index > -1) {
      checkArr[index].data = _.cloneDeep(newVal.data);
      this.setRecentView(newVal);
    }
  }


  getRecentSearch() {
    return this.RECENT_VIEW.slice(0, 5);
  }

  getRecentViewsKey() {
    if (this.userId != -1) {
      return this.RECENT_VIEW_KEY = 'RECENT_VIEW_' + this.userId;
    }
    return this.RECENT_VIEW_KEY = 'RECENT_VIEW_';
  }

  startupServices() {
    return this.storage.get(this.RECENT_VIEW_KEY)
      .then((res: any) => {
        if (!res && this.USER.logined) {
          return this.getRecentSearchFromServer()
            .then(res => {
              return this.setRecentViews(res);
            })
        }
        this.broadcastRecentViewsChange(res);
        return res;
      })
  }

  getRecentSearchFromServer() {
    let params = {
      type: CONSTANT.RECENT_SEARCH_TYPE.SPACE
    }
    return this.getService.getRecentSearch(params)
      .then(data => {
        if (data.reason === CONSTANT.REASONS.ER_OK) {
          let recentViews = this.anywhereService.addIdToArr(data.spaces);
          if (recentViews && recentViews.length > 0) {
            return this.setRecentViews(recentViews);
          }
          return data.spaces;
        }
      });
  }

  setRecentViews(recentViews) {
    return this.storage.set(this.RECENT_VIEW_KEY, recentViews)
      .then(res => {
        this.broadcastRecentViewsChange(res);
        return res;
      })
  }

  setRecentView(recentView: ItemSpace) {
    let recentViews = this.removeItemInRecentViews(recentView);
    recentViews.unshift(recentView);
    recentViews = recentViews.slice(0, 5);
    return this.setRecentViews(recentViews);
  }

  deleteRecentView(recentView: ItemSpace) {
    let recentViews = this.removeItemInRecentViews(recentView);
    return this.setRecentViews(recentViews);
  }

  // xoa mot item ra khoi recentView, tra ve recentView sau khi xoa, chua luu vao bo nho
  private removeItemInRecentViews(item) {
    let recentViews = _.cloneDeep(this.RECENT_VIEW);
    let index = _.findIndex(
      recentViews, {
        id: item.id
      });
    if (index > -1) {
      recentViews.splice(index, 1);
    }
    return recentViews;
  }

  clearRecentViews() {
    return this.storage.remove(this.RECENT_VIEW_KEY)
      .then(res => {
        this.broadcastRecentViewsChange([]);
      })
  }

  broadcastRecentViewsChange(data) {
    this.RECENT_VIEW = data ? _.cloneDeep(data) : [];
    this.events.publish(CONSTANT.EVENTS_NAME.RECENT_VIEWS_CHANGED, data);
  }

  addHouseToRecentViews(space: ItemSpace) {
    this.setRecentView(space);
    if (this.USER.logined) {
      let index = _.findIndex(this.RECENT_VIEW, {
        id: space.id
      });
      if (index > -1) {
        return;
      }
      let data = {
        renting_id: space.id
      }
      this.postService.updateRecentSearch(data);
    }
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
    this.toggleSubscribeCurrentItem(false);
  }
}
