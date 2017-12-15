import {
  Component,
  ViewChild,
} from '@angular/core';

import {
  NavController,
  Content,
  // Events
} from 'ionic-angular';

import * as _ from 'lodash';

import { CONSTANT } from '../../providers/constant.service';

// import { UserStorageService } from '../../providers/user-storage.service';
// import { AnywhereService } from '../../providers/anywhere.service';
// import { CurrentItemService } from '../../providers/current-item.service';
import { ItemSpace } from '../../templates/item-space';

import {
  CoreClassNoSubcribeUser,
  CoreServices
} from '../../templates/core-class';
@Component({
  selector: 'owner-home-tab-renting',
  templateUrl: 'owner-home-tab-renting.html'
})
export class OwnerHomeTabRenting extends CoreClassNoSubcribeUser {
  constructor(
    public navController: NavController,
    coreServices: CoreServices,
  ) {
    super(coreServices);
    this.toggleSubscribeCurrentItem(true);
  }

  @ViewChild(Content) content: Content;
  itemPerPage = CONSTANT.ITEM_PER_PAGE;
  getParams: any = {
    page: 1,
    status: CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_RENTING
  }

  ionViewCanEnter() {
    this.coreServices.anywhereService.toggleTabs('show');
    this.content && this.content.resize();
  }

  getAllData() {
    this.getParams.page = this.currentPage;
    this.listAllData();
  }

  listAllData(page ? ) {
    console.log("listAllDatalistAllData")
    if (page) {
      this.setGetParams(page);
    }
    return this._listAllData(
      'listAllHousesByUser',
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

  setGetParams(page ? ) {
    this.getParams.page = page;
  }

  toggleSubscribeCurrentItem(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED,
        this._handleSubscribeCurrentItem
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED,
        this._handleSubscribeCurrentItem
      );
    }
  }

  private _handleSubscribeCurrentItem = (res) => {
    switch (res.type) {
      case "space":
        {
          this.checkAndChange(this.allDataList, res);
          break;
        }
    }
  }

  private checkAndChange(checkArr, newVal) {
    console.log("checkAndChange arrrrrrrrrrrrrrrrr", checkArr, newVal);
    if (newVal.isUpdating) {
      return this.checkUpdateHouse(checkArr, newVal);
    }

    if (newVal.isDelete) {
      if (this.allDataList && this.allDataList.length > 0) {
        let index = this.getIndexInArr(newVal);
        if (index > -1) {
          let currentPage = _.clone(this.currentPage);
          this.allDataList.splice(index, 1);
          console.log("reCalcItemRemove xoaaaaaa", this.allDataList);
          this.totalItem--;
          this.checkTotal();
          // bu dap su thieu hut cua trang hien tai
          if (this.totalItem >= this.itemPerPage) {
            let page = (currentPage < this.totalPage) ?
              currentPage :
              this.totalPage;
            console.log("bu dap su thieu hut cua trang hien tai", this.totalPage, page);
            this.listAllData(page);
          }
        }
      }
    }
  }

  checkUpdateHouse(checkArr, newVal) {
    let index = _.findIndex(checkArr, { id: newVal.id });
    if (index > -1) {
      return checkArr[index] = _.cloneDeep(newVal);
    } else {
      let tempNewArr = [new ItemSpace(newVal.id, newVal.data)];
      this.allDataList = _.unionWith(tempNewArr, this.allDataList);
      this.totalItem++;
      this.checkTotal();
      console.log("reCalcItemAdd theemmmmmmm", this.allDataList);
    }
  }

  checkTotal() {
    let tempVal = _.ceil(this.totalItem / this.itemPerPage);
    if (tempVal !== this.totalPage) {
      this.totalPage = tempVal;
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        this.setGetParams(this.currentPage);
      };
      console.log("this.totalPage changeeeeeeeeeeeeee", this.totalPage);
    }
  }

  getIndexInArr(item) {
    return _.findIndex(this.allDataList, { id: item.id });
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
