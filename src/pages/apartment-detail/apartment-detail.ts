import {
  Component,
} from '@angular/core';

import {
  NavParams
} from 'ionic-angular';

import * as _ from 'lodash';

import { CommonService } from '../../providers/common.service';
import { CONSTANT } from '../../providers/constant.service';
import {
  CoreClassNoSubcribeUser,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'apartment-detail',
  templateUrl: 'apartment-detail.html'
})
export class ApartmentDetail extends CoreClassNoSubcribeUser {
  showData;

  getParams: any = {
    page: this.currentPage,
    type: CONSTANT.DETAIL_TYPE.APARTMENTS,
  };

  constructor(
    public navParams: NavParams,
    private commonService: CommonService,
    coreServices: CoreServices,
  ) {
    super(coreServices);
    this.params = this.navParams.get("params");
  }

  ionViewCanEnter() {
    this.coreServices.anywhereService.toggleTabs('hide');
  };

  // doRefresh(refresher ? ) {
  //   this._doRefresh(refresher, this.getAllData);
  // }

  getAllData() {
    this.getParams.page = this.currentPage;
    this.getParams.id = this.params.id;
    this.getDetail();
    this.listAllData();
  }

  getDetail() {
    this._getDetail(
      CONSTANT.DETAIL_TYPE.APARTMENTS,
      this.params.id,
      null,
      (res: any) => {
        let temp = this.commonService.setApartmentDetail(res[CONSTANT.DETAIL_TYPE.APARTMENT]);
        this.showData = temp.detail;
        console.log("this.showData", this.showData);
      }
    );
  }

  listAllData() {
    console.log("listAllDatalistAllData")
    return this._listAllData(
      'getListReview',
      this.getParams,
      (res: any) => {
        console.log("listAllData 2222222222", res)
        //console.log("this.loading", this.loading);
        let data = _.clone(res.reviews);
        this.allDataList = this.allDataList || [];
        this.allDataList = _.unionWith(
          this.allDataList,
          data,
          _.isEqual
        );

        console.log("this.allDataList", this.allDataList);
      })
  }

  handleNotOK() {
    console.log("co van de roiiiiiiii");
    this.allDataList = [];
    this.finishLoading();
  }

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
