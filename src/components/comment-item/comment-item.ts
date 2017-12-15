import {
  Component,
  Input,
} from '@angular/core';

import { Events } from 'ionic-angular';

import {
  ClickNeedShowLoginClass,
  CoreServices
} from '../../templates/core-class';

import * as _ from 'lodash';

import { CONSTANT } from '../../providers/constant.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { DeleteService } from '../../providers/delete.service';

const DEFAULT_OPTIONS = {
  SHOW_DELETE_BUTTON: true,
};

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.html'
})
export class CommentItem extends ClickNeedShowLoginClass {
  @Input()
  cardData;

  @Input()
  options;

  currentUser;
  defaultOpts = _.clone(DEFAULT_OPTIONS);

  constructor(
    private anywhereService: AnywhereService,
    private deleteService: DeleteService,
    public coreServices: CoreServices,
    public events: Events,
  ) {
    super(coreServices);
    this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.DELETE_COMMENT;
    this.currentUser = this.anywhereService.USER.userInfo;
    this.toggleSubscribeUser(true);
  }

  // inherit from parent
  handleSubscribeUser(res ? ) {
    console.log("handleSubscribeUser CommentItem", res);
    this.currentUser = this.USER.userInfo;
  }

  ngOnChanges(changes) {
    console.log("ngOnChangesngOnChanges CommentItem", changes);
    if (changes.options) {
      this.defaultOpts = _.assignIn(this.defaultOpts, this.options);
    }
  }

  // id la id cua comment can xoa
  deleteComment() {
    if (!this.canGo()) {
      return;
    }

    this.checkHasLogined(this.callbackType, () => {
      this.toggleIsProcessing(true);
      this.doDeleteComment();
    }, () => {
      this.finishLoading();
    })
  }

  doDeleteComment() {
    this.deleteService.deleteUserComment(this.cardData.id)
      .then((res) => {
        console.log("this.deleteService deleteUserComment", res);
        if (res) {
          this.events.publish(CONSTANT.EVENTS_NAME.COMMENT_DELETED, this.cardData);
          this.finishLoading(CONSTANT.DELETE_SUCCESS);
        } else {
          this.finishLoading(CONSTANT.ERR_GENERAL);
        }
      }, err => this.finishLoading(CONSTANT.ERR_GENERAL));
  }

  finishLoading(message ? ) {
    this.toggleIsProcessing(false);
    if (message) {
      this.coreServices.anywhereService.showToast(message);
    }
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
    super.ngOnDestroy();
  }
}
