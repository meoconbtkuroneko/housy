import {
  Component,
} from '@angular/core';

// import inView from 'in-view';

import * as _ from 'lodash';

import {
  NavParams,
} from 'ionic-angular';

import { CONSTANT } from '../../providers/constant.service';

import {
  CoreServices,
  CoreClassSubcribeUser
} from '../../templates/core-class';

@Component({
  selector: 'all-homes-page',
  templateUrl: 'all-homes.html'
})
export class AllHomesPage extends CoreClassSubcribeUser {
  getParams: any = {
    page: this.currentPage
  };

  title: string;
  shortTitle: string;

  constructor(
    coreServices: CoreServices,
    public navParams: NavParams,
  ) {
    super(coreServices);
    this.initVals();
    this.toggleSubscribeCurrentItem(true);
  }

  initVals() {
    this.params = this.navParams.get("params");
    this.getParams = _.assignIn(
      this.getParams,
      this.params
    );
    if (this.getParams.new) {
      this.title = 'Danh sách nhà mới đăng tin';
      this.shortTitle = 'Nhà mới đăng tin'
    } else {
      this.title = 'Danh sách nhà';
      this.shortTitle = this.title;
    }
  }

  ionViewCanEnter() {
    this.coreServices.anywhereService.toggleTabs('show');
  }

  // ionViewDidLoad() {
  //   this.subscribeCurrentItem();
  // }

  getAllData() {
    this.getParams.page = this.currentPage;
    this.listAllData();
  }

  // inherit from parent
  resetWhenDoRefresh() {}


  setGetParams(params) {
    this.getParams = _.assignIn(this.getParams, params);
  }

  listAllData() {
    console.log("listAllDatalistAllData")
    return this._listAllData(
      'listAllHouses',
      this.getParams,
      (res: any) => {
        console.log("listAllData 2222222222", res)
        //console.log("this.loading", this.loading);

        let data = _.clone(res[CONSTANT.DETAIL_TYPE.SPACES]);
        this.allDataList = this.allDataList || [];
        this.allDataList = _.unionWith(
          this.allDataList,
          this.coreServices.anywhereService.addIdToArr(data),
          _.isEqual
        );

        console.log("this.allDataList", this.allDataList);
      })
  };

  toggleSubscribeCurrentItem(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED,
        this.handleSubscribeCurrentItem
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED,
        this.handleSubscribeCurrentItem
      );
    }
  }

  private handleSubscribeCurrentItem = (res) => {
    switch (res.type) {
      case "space":
        {
          this.checkAndChange(this.allDataList, res);
          break;
        }
    }
  }

  checkAndChange(checkArr, newVal) {
    let index = _.findIndex(checkArr, { id: newVal.id });
    if (index > -1) {
      checkArr[index].data = _.cloneDeep(newVal.data);
    }
  }

  doLoadMore(infiniteScroll) {
    this._doLoadMore(infiniteScroll, () => {
      this.getParams.page = this.currentPage;
      this.listAllData();
    })
  }

  ngOnDestroy() {
    this.toggleSubscribeCurrentItem(false);
    super.ngOnDestroy();
  }
}
