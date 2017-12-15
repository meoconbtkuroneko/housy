import { Component } from '@angular/core';
import {
  ViewController,
} from 'ionic-angular';

import { AnywhereService } from '../../providers/anywhere.service';
import { GetService } from '../../providers/get.service';
import { CONSTANT } from '../../providers/constant.service';

import {
  CoreClassNoSubcribeUser,
  CoreServices
} from '../../templates/core-class';

import * as _ from 'lodash';

@Component({
  selector: 'transaction-page',
  templateUrl: 'transaction-page.html'
})
export class TransactionPage extends CoreClassNoSubcribeUser {
  constructor(
    private viewController: ViewController,
    private anywhereService: AnywhereService,
    private getService: GetService,
    coreServices: CoreServices,
  ) {
    super(coreServices);
  };

  transactionTypes = CONSTANT.SERVER.TRASACTION_TYPE;

  getAllData() {
    this.listAllData();
  }

  // doRefresh(refresher ? ) {
  //   console.log("doRefreshdoRefreshdoRefresh")
  //   this._doRefresh(refresher, () => {
  //     this.listAllData();
  //   })
  // };

  listAllData() {
    this._listAllData('getTransactions', null, (res: any) => {
      console.log("listAllData 2222222222", res)

      this.totalItem = res.balanceUser;
      let tempArr = _.clone(res.transactions);
      for (let i in tempArr) {
        tempArr[i].dateTime = this.convertDateTime(tempArr[i].created_time);
        tempArr[i].iconName = this.getIconName(tempArr[i].type);
      }
      this.allDataList = tempArr;
      console.log("this.allDataList", res);
    });
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

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
