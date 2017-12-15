import { Injectable } from '@angular/core';

import { AnywhereService } from './anywhere.service';
import { UserStorageService } from './user-storage.service';
import { CONSTANT } from './constant.service';
import { PostService } from './post.service';
import { CurrentItemService } from './current-item.service';

import { Events } from 'ionic-angular';

@Injectable()
export class WriteCommentService {
  constructor(
    private anywhereService: AnywhereService,
    private userStorageService: UserStorageService,
    private postService: PostService,
    private currentItemService: CurrentItemService,
    private events: Events,
  ) {
    this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.WRITE_COMMENT;
    this.toggleSubscribeCallbackAfterLogined(true);
  }

  callback;
  callbackType;

  commentAboutId;
  parentCommentId;
  belongToUser;
  currentTypeId;
  content;
  canSend;

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
    console.log("_handleSubscribeCallbackAfterLogined WriteCommentService", data)
    if (data === this.callbackType) {
      let currentUser = this.userStorageService.USER.userInfo;
      if (currentUser.id === this.belongToUser.id) {
        return this.finishLoading(CONSTANT.COMMENT_YOURSELF);
      }
      this.doSendComment();
    }
  }

  // object_id: id cua nguoi bi comment;
  doSendComment(callback ? ) {
    if (!this.canSend || !this.content) {
      return;
    }
    let currentUser = this.anywhereService.USER.userInfo;


    if (callback) {
      this.callback = callback;
      console.log("setCallbacksetCallback", this.callback);
    }

    console.log("sendCommentFuncsendCommentFunc", this.content);
    let data: any = {
      object_id: this.commentAboutId,
      parent_id: this.parentCommentId,
      type: this.currentTypeId,
      content: this.content,
    }


    data.user = {
      id: currentUser.id,
      picture: currentUser.picture,
      name: currentUser.name,
    };

    this.postService.sendUserComment(data)
      .then((res) => {
        console.log('=>>>>>>>>>>>sendComment END............', res)

        if (res.reason === CONSTANT.REASONS.ER_OK) {
          data.id = res.id;
          data.posted_time = new Date();
          this.events.publish(CONSTANT.EVENTS_NAME.COMMENT_CHANGED, data);
          this.finishLoading();
        } else {
          this.finishLoading(CONSTANT.ERR_GENERAL);
        }
      }, err => this.finishLoading(CONSTANT.ERR_GENERAL));
  }

  finishLoading(message ? ) {
    console.log("finishLoading this.callback", this.callback);
    if (this.callback) {
      this.callback();
    }
    if (message) {
      this.anywhereService.showToast(message);
    }
  }

  setWriteCommentData(
    commentAboutId,
    parentCommentId,
    content,
    belongToUser,
    currentTypeId,
    canSend
  ) {
    this.commentAboutId = commentAboutId;
    this.parentCommentId = parentCommentId;
    this.content = content;
    this.belongToUser = belongToUser;
    this.currentTypeId = currentTypeId;
    this.canSend = canSend;
  }

  ngOnDestroy() {
    this.toggleSubscribeCallbackAfterLogined(false);
  }
}
