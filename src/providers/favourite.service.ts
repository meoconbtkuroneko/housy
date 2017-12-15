import { Injectable } from '@angular/core';

import { AnywhereService } from './anywhere.service';
import { CONSTANT } from './constant.service';
import { PostService } from './post.service';
import { CurrentItemService } from './current-item.service';

import { Events } from 'ionic-angular';

import * as _ from 'lodash';

@Injectable()
export class FavouriteService {
  constructor(
    private anywhereService: AnywhereService,
    private postService: PostService,
    private currentItemService: CurrentItemService,
    private events: Events,
  ) {
    this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.FAVOURITE;
    this.toggleSubscribeCallbackAfterLogined(true);
  }

  cardData;
  addAnyway: boolean;
  callback;
  callbackType;

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
    console.log("_handleSubscribeCallbackAfterLogined FavouriteService", data)
    if (data === this.callbackType) {
      this.doAddFavourite();
    }
  }

  setFavouriteData(data, addAnyway) {
    this.cardData = _.cloneDeep(data);
    this.addAnyway = (addAnyway != undefined) ? addAnyway : this.addAnyway;
  }


  /*
      data = {
        space_id: boolean,
        isFavouriteAdded: boolean,
      }
      */

  doAddFavourite(callback ? ) {
    if (callback) {
      this.callback = callback;
    }
    let tempData = _.cloneDeep(this.cardData);
    let data: any = {
      space_id: tempData.id
    };

    if (this.addAnyway) {
      data.isFavouriteAdded = true;
    }

    this.postService.addFavorite(data)
      .then((result: any) => {
          console.log("this.cardData", this.cardData.isFavouriteAdded, result);
          if (result.reason === CONSTANT.REASONS.ER_OK) {
            this.cardData.isFavouriteAdded = result.isFavouriteAdded;
            let message;
            if (this.cardData.isFavouriteAdded) {
              message = CONSTANT.FAVORITE.ADD;
            } else {
              message = CONSTANT.FAVORITE.REMOVE;
            }
            this.currentItemService.broadcastChange({
              type: 'space',
              id: this.cardData.renting.id,
              data: this.cardData
            });
            this.finishLoading(message);
          } else {
            this.finishLoading(CONSTANT.FAVORITE.ERR);
          }
        },
        error => {
          this.finishLoading(CONSTANT.FAVORITE.ERR);
        })
  }

  finishLoading(message ? ) {
    if (this.callback) {
      this.callback();
    }
    if (message) {
      this.anywhereService.showToast(message);
    }
  }

  ngOnDestroy() {
    this.toggleSubscribeCallbackAfterLogined(false);
  }
}
