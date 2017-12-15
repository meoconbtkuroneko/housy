import {
  Component,
  Input,
} from '@angular/core';

import {
  NavController
} from 'ionic-angular';

import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';


import { PageWriteCommentUser } from '../../pages/write-comment-user/write-comment-user';

@Component({
  selector: 'part-short-comments',
  templateUrl: './part-short-comments.html'
})
export class PartShortComments extends CoreSimpleClass {
  @Input()
  comments;

  // binh luan thuoc ve nguoi nao
  @Input()
  belongToUser;

  // binh luan ve: nha, chung cu, nguoi dung
  @Input()
  commentAbout;

  @Input()
  type;

  currentUser;

  constructor(
    coreServices: CoreServices,
    private navController: NavController,
  ) {
    super(coreServices);
    this.currentUser = this.coreServices.anywhereService.USER.userInfo;
    this.toggleSubscribeUser(true);
  }

  // inherit from parent
  handleSubscribeUser() {
    this.currentUser = this.USER.userInfo;
  }

  showComments() {
    this.navController.push(PageWriteCommentUser, {
      params: {
        comments: this.comments,
        belongToUser: this.belongToUser,
        commentAbout: this.commentAbout,
        type: this.type,
      }
    });
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
    super.ngOnDestroy();
  }
}
