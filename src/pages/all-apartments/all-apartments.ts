import {
  Component
} from '@angular/core';

import * as _ from 'lodash';

import { CONSTANT } from '../../providers/constant.service';

import {
  CoreClassNoSubcribeUser,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'all-apartments-page',
  templateUrl: 'all-apartments.html'
})
export class AllApartmentsPage extends CoreClassNoSubcribeUser {
  getParams: any = {
    page: this.currentPage
  };

  constructor(
    coreServices: CoreServices,
  ) {
    super(coreServices);
  }

  ionViewCanEnter() {
    this.coreServices.anywhereService.toggleTabs('show');
  }

  // doRefresh(refresher ? ) {
  //   this._doRefresh(refresher, () => {
  //     this.getParams.page = this.currentPage;
  //     this.listAllData();
  //   })
  // }

  getAllData() {
    this.getParams.page = this.currentPage;
    this.listAllData();
  }

  listAllData() {
    console.log("listAllDatalistAllData")
    return this._listAllData(
      'listAllApartments',
      this.getParams,
      (res: any) => {
        console.log("listAllData 2222222222", res)
        //console.log("this.loading", this.loading);
        let data = _.clone(res[CONSTANT.DETAIL_TYPE.APARTMENTS]);
        this.allDataList = this.allDataList || [];
        this.allDataList = _.unionWith(
          this.allDataList,
          this.coreServices.anywhereService.addIdToArr(data, 'id'),
          _.isEqual
        );

        console.log("this.allDataList", this.allDataList);
      })
  };

  doLoadMore(infiniteScroll) {
    this._doLoadMore(infiniteScroll, () => {
      this.getParams.page = this.currentPage;
      this.listAllData();
    })
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
