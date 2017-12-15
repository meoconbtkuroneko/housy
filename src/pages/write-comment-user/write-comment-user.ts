import { Component } from '@angular/core';
import {
  NavParams,
  Events,
  ViewController,
} from 'ionic-angular';

import * as _ from "lodash";

import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { DeleteService } from '../../providers/delete.service';

import {
  CoreClassNoSubcribeUser,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'write-comment-user',
  templateUrl: 'write-comment-user.html'
})
export class PageWriteCommentUser extends CoreClassNoSubcribeUser {
  belongToUser;
  currentUser;
  isLogined;
  writeAnswer = {};
  condition = false;
  listComments;
  commentAbout;
  params: any;
  type;

  constructor(
    private navParams: NavParams,
    private anywhereService: AnywhereService,
    private deleteService: DeleteService,
    private events: Events,
    coreServices: CoreServices,
    public viewController: ViewController,
  ) {
    super(coreServices);
    this.params = this.navParams.get('params');
    this.toggleSubscribeUser(true);
  }

  // inherit from parent
  handleSubscribeUser() {
    this.currentUser = this.USER.userInfo;
  }

  ionViewDidLoad() {
    this.initVals();
    this.subscribeSendComment();
    this.subscribeDeleteComment();
  };

  getAllData() {
    console.log("this.paramsthis.params", this.params);
    if (!this.params.comments) {
      console.log("chua co commenttttttttt");
      this.listAllComments();
    } else {
      this.toggleLoading(false);
    }
  }

  // doRefresh(refresher ? ) {
  //   this._doRefresh(refresher, () => {
  //     console.log("this.paramsthis.params", this.params);
  //     if (!this.params.comments) {
  //       console.log("chua co commenttttttttt");
  //       this.listAllComments();
  //     }
  //   })
  // }

  initVals() {
    this.listComments = this.params.comments;
    this.commentAbout = this.params.commentAbout;
    this.belongToUser = this.params.belongToUser;
    this.type = this.params.type;
    this.isLogined = this.anywhereService.USER.logined;
    this.currentUser = this.USER.userInfo;

    setTimeout(() => {
      this.condition = true;
    }, 1000);
  }

  listAllComments() {
    this.increaseProcess();
    let promise = this.coreServices.getService.getComments(
      this.params.type,
      this.params.commentAbout.id
    );
    return this.handleResultFromServer(promise, true, (res) => {
      this.listComments =
        res[CONSTANT.DETAIL_TYPE.USER][CONSTANT.DETAIL_TYPE.COMMENTS];
      console.log("listAllComments", res, this.listComments, this.loading);
    });
  }

  subscribeSendComment() {
    this.events.subscribe(CONSTANT.EVENTS_NAME.COMMENT_CHANGED, this.handleSubscribeSendComment)
  }

  unsubscribeSendComment() {
    this.events.unsubscribe(CONSTANT.EVENTS_NAME.COMMENT_CHANGED, this.handleSubscribeSendComment);
  }

  handleSubscribeSendComment = (data) => {
    console.log("subscribeSendComment", data);

    let parentCommentIndex = _.findIndex(this.listComments, {
      id: data.parent_id
    })

    if (parentCommentIndex > -1) {
      let parentComment = this.listComments[parentCommentIndex];
      console.log("parentCommentparentComment", parentComment);
      parentComment.children = parentComment.children || [];
      parentComment.children.push(data);
    } else {
      this.listComments.unshift(data);
    }
  };

  subscribeDeleteComment() {
    this.events.subscribe(CONSTANT.EVENTS_NAME.COMMENT_DELETED, this.handleSubscribeDeleteComment)
  }

  unsubscribeDeleteComment() {
    this.events.unsubscribe(CONSTANT.EVENTS_NAME.COMMENT_DELETED, this.handleSubscribeDeleteComment);
  }

  handleSubscribeDeleteComment = (data) => {
    console.log("handleSubscribeDeleteComment", data);
    if (data.parent_id === 0) {
      this.listComments = this.removeItemInArrById(data.id, this.listComments);
    } else {
      let parentComment = _.find(this.listComments, {
        id: data.parent_id
      });

      if (parentComment) {
        parentComment.children = this.removeItemInArrById(data.id, parentComment.children);
      }
    };
  }

  removeItemInArrById(id, arr) {
    let currentIndex;
    currentIndex = _.findIndex(arr, {
      id: id
    });
    console.log("currentIndexcurrentIndexcurrentIndex", currentIndex);
    if (currentIndex > -1) {
      arr.splice(currentIndex, 1);
    }
    console.log("arrarrarr", arr);
    return arr;
  }

  showWriteAnswer(id) {
    console.log('=>>>>>>>>>>>showWriteAnswer............', id)
    this.writeAnswer = {};
    this.writeAnswer[id] = true;
  }

  // type la 'parent' hoac 'child'
  // id la id cua comment can xoa
  // index la vi tri cua comment trong mang
  // $parentIndex la vi tri cua comment cha trong mang (neu co)
  deleteComment(type, id, index, parentIndex) {
    this.deleteService.deleteUserComment(id)
      .then(function(res) {
        if (res) {
          if (type == 'parent') {
            setTimeout(() => {
              this.listComments.splice(index, 1);
            }, 1);
          } else {
            setTimeout(() => {
              this.listComments[parentIndex].children.splice(index, 1);
            }, 1);
          }
        }
      });
  }

  closeModal() {
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.unsubscribeSendComment();
    this.unsubscribeDeleteComment();
    super.ngOnDestroy();
  }
}
