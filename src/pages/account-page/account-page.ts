import { Component } from '@angular/core';
import {
  ViewController,
  AlertController
} from 'ionic-angular';

import { AnywhereService } from '../../services/anywhere.service';
import { LoginService } from '../../services/login.service';
import { CONSTANT } from '../../services/constant.service';
import { Profile } from '../profile/profile';
import { TransactionPage } from '../transaction-page/transaction-page';
import { DiscountPage } from '../discount-page/discount-page';

@Component({
  selector: 'account-page',
  templateUrl: 'account-page.html'
})
export class AccountPage {

  constructor(
    private viewController: ViewController,
    private anywhereService: AnywhereService,
    private loginService: LoginService,
    private alertController: AlertController,
  ) {};

  openProfile() {
    this.anywhereService.showModal(Profile);
  }
  openTransactions() {
    this.anywhereService.showModal(TransactionPage);
  }
  openComments() {
    this.anywhereService.showModal(Profile);
  }
  getDiscount() {
    this.anywhereService.showModal(DiscountPage);
  }
  logout() {
    let logoutConfirm = this.alertController.create({
      title: CONSTANT.TITLE_HOUSY,
      message: CONSTANT.LOG_OUT,
      buttons: [{
        text: CONSTANT.STRING_CANCEL,
        role: 'cancel',
      }, {
        text: CONSTANT.STRING_LOG_OUT,
        handler: () => {
          this.closeModal();
          this.loginService.logout();
        }
      }]
    })
    logoutConfirm.present();
  }
  closeModal() {
    this.viewController.dismiss();
  }
}
