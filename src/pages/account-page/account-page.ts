import { Component } from '@angular/core';
import {
  ViewController,
} from 'ionic-angular';

import { AnywhereService } from '../../providers/anywhere.service';
import { LoginService } from '../../providers/login.service';
import { CONSTANT } from '../../providers/constant.service';
import { Profile } from '../profile/profile';
import { TransactionPage } from '../transaction-page/transaction-page';
import { DiscountPage } from '../discount-page/discount-page';
import { PageWriteCommentUser } from '../write-comment-user/write-comment-user';

import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'account-page',
  templateUrl: 'account-page.html'
})
export class AccountPage extends CoreSimpleClass {

  constructor(
    private viewController: ViewController,
    private anywhereService: AnywhereService,
    private loginService: LoginService,
    public coreServices: CoreServices,

  ) {
    super(coreServices);
  };

  openProfile() {
    this.anywhereService.showModal(Profile);
  }

  openTransactions() {
    this.anywhereService.showModal(TransactionPage);
  }

  openComments() {
    this.anywhereService.showModal(PageWriteCommentUser, {
      comments: null,
      belongToUser: this.anywhereService.USER.userInfo,
      commentAbout: this.anywhereService.USER.userInfo,
      type: CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_USER.name,
      isModal: true,
    });
  }

  getDiscount() {
    this.anywhereService.showModal(DiscountPage);
  }

  logout() {
    this.anywhereService.showConfirm(
      CONSTANT.STRING_LOG_OUT,
      CONSTANT.LOG_OUT, () => {
        this.closeModal();
        this.loginService.logout();
      },
      () => {},
      CONSTANT.STRING_CANCEL,
      CONSTANT.STRING_LOG_OUT,
      'button-alert-highlight',
      'disabled-selected',
    )
  }

  closeModal() {
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
