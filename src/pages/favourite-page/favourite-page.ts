import {
  Component,
} from '@angular/core';

import * as _ from 'lodash';

import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { CurrentItemService } from '../../providers/current-item.service';
import { ItemSpace } from '../../templates/item-space';
import {
  CoreClassNeedLogin,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'favourite-page',
  templateUrl: 'favourite-page.html'
})
export class FavouritePage extends CoreClassNeedLogin {
  getParams = {
    page: this.currentPage
  };
  showNow;

  itemPerPage = CONSTANT.ITEM_PER_PAGE;

  constructor(
    private anywhereService: AnywhereService,
    private currentItemService: CurrentItemService,
    coreServices: CoreServices,
  ) {
    super(coreServices);
    this.toggleSubscribeCurrentItem(true);
  }

  ionViewCanEnter() {
    console.log("ionViewCanEnter 11111111111")
    this.anywhereService.toggleTabs('show');
  }

  ngOnInit() {
    this.doRefresh();
  }

  handleSubscribeUser(res ? ) {
    console.log("handleSubscribeUser FavouritePage", res);
    this.doRefresh();
  }

  getAllData() {
    this.setGetParams(this.currentPage);
    if (this.USER && this.USER.logined) {
      console.log("doRefresh aaaaaaaaaaaaaaaaaa", this.loading, this.showNoInternet, this.showErrLoad)
      this.listAllData();
    }
  }

  listAllData(page ? ) {
    console.log("listAllDatalistAllData")
    if (page) {
      this.setGetParams(page);
    }
    return this._listAllData(
      'listFavoritesByUser',
      this.getParams,
      (res: any) => {
        console.log("listAllData 2222222222", res)

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

  doLoadMore(infiniteScroll) {
    this._doLoadMore(infiniteScroll, () => {
      this.setGetParams(this.currentPage);
      this.listAllData();
    })
  };

  setGetParams(page ? ) {
    this.getParams.page = page;
  }

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



  // private subscribeCurrentItem() {
  //   this.currentItemService.CURRENT_ITEM
  //     .subscribe(res => {
  //       let rs: any = res;
  //       switch (rs.type) {
  //         case "space":
  //           {
  //             this.checkAndChange(this.allDataList, rs);
  //             break;
  //           }
  //         case "apartment":
  //           {

  //             break;
  //           }
  //       }
  //     })
  // }

  getIndexInArr(item) {
    return _.findIndex(this.allDataList, { id: item.id });
  }

  private checkAndChange(checkArr, newVal) {
    console.log("checkAndChange arrrrrrrrrrrrrrrrr", checkArr, newVal);
    if (!newVal.data.isFavouriteAdded) {
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


  ngOnDestroy() {
    this.toggleSubscribeCurrentItem(false);
    super.ngOnDestroy();
  }
}
