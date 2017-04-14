import { Component } from '@angular/core';
import {
  ViewController,
} from 'ionic-angular';

import { AnywhereService } from '../../services/anywhere.service';
import { GetService } from '../../services/get.service';
import { CONSTANT } from '../../services/constant.service';

import * as _ from 'lodash';

@Component({
  selector: 'transaction-page',
  templateUrl: 'transaction-page.html'
})
export class TransactionPage {

  constructor(
    private viewController: ViewController,
    private anywhereService: AnywhereService,
    private getService: GetService,
  ) {};

  showData;
  totalItem;
  transactionTypes = CONSTANT.SERVER.TRASACTION_TYPE;

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.getService.getTransactions()
      .then((res: any) => {
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          this.totalItem = res.balanceUser;
          let tempArr = _.clone(res.transactions);
          for (let i in tempArr) {
            tempArr[i].dateTime = this.convertDateTime(tempArr[i].created_time);
            tempArr[i].iconName = this.getIconName(tempArr[i].type);
          }
          this.showData = tempArr;
        }
        console.log("this.showData", res);
      })
  }

  convertDateTime(dateTime) {
    let tempDate =
      this.anywhereService.convertDate(dateTime);
    return tempDate.hour + ':' +
      tempDate.minutes + '  ' +
      tempDate.day + " tháng " +
      tempDate.month + " năm " +
      tempDate.year;
  }

  getIconName(type) {
    let name = ''
    switch (type) {
      case this.transactionTypes.TRANSACTION_DEPOSIT:
        {
          name = 'add';
          break;
        }
      case this.transactionTypes.TRANSACTION_NOT_CALCULATE:
      case this.transactionTypes.TRANSACTION_TRANSFER_DISCOUNT:
        {
          name = 'shuffle';
          break;
        }
      case this.transactionTypes.TRANSACTION_WITHDRAW:
        {
          name = 'remove';
          break;
        }
    }
    return name;
  }

  closeModal() {
    this.viewController.dismiss();
  }
}
