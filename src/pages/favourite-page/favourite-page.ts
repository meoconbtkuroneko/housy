import {
  Component,
  OnInit
} from '@angular/core';
import {
  ViewController
} from 'ionic-angular';

import * as _ from 'lodash';

import { GetService } from '../../services/get.service';
import { AnywhereService } from '../../services/anywhere.service';
import { UserStorageService } from '../../services/user-storage.service';
import { CONSTANT } from '../../services/constant.service';
import { CurrentItemService } from '../../services/current-item.service';
import { ItemSpace } from '../../templates/item-space';

@Component({
  selector: 'favourite-page',
  templateUrl: 'favourite-page.html'
})
export class FavouritePage implements OnInit {
  listHouses;
  USER;
  isProcessing;
  currentPage = 1;
  totalPage = 100;
  totalItem;
  getParams = {
    page: this.currentPage
  };
  showNow;
  private loading;
  private infiniteScroll;

  itemPerPage = CONSTANT.ITEM_PER_PAGE;

  constructor(
    public viewController: ViewController,
    private userStorageService: UserStorageService,
    private getService: GetService,
    private anywhereService: AnywhereService,
    private currentItemService: CurrentItemService,
  ) {}

  ngOnInit() {
    this.subscribeCurrentItem();
    this.userStorageService.subscribeUser(res => {
      this.USER = _.cloneDeep(res);
      this.checkAndShowLogin();
      this.isProcessing = undefined;
      if (this.USER.logined) {
        this.listAllHouses();
      }
    });
  }

  checkAndShowLogin() {
    this.viewController.willEnter
      .subscribe(res => {
        console.log("viewController.willEnter", this.showNow);
        this.showLogin();
      });
  }

  showLogin() {
    if (!this.USER.logined) {
      this.showNow = true;
      setTimeout(() => {
        this.showNow = undefined;
      }, 100);
    }
  }

  listAllHouses(page ? ) {
    this.loading = true;
    if (page) {
      this.setGetParams(page);
    }
    console.log("tham sooooooooooooooooo", this.getParams)
    this.getService.listFavoritesByUser(this.getParams)
      .then(res => {
          if (res.reason === CONSTANT.REASONS.ER_OK) {
            if (this.loading && this.infiniteScroll) {
              this.infiniteScroll.complete();
            }
            this.finishLoading();
            console.log("resresres", res);
            this.totalPage = res.pageCount;
            this.totalItem = res.count;
            let data = _.clone(res.spaces);
            this.listHouses = this.listHouses || [];
            this.listHouses = _.unionWith(
              this.listHouses,
              this.anywhereService.addIdToArr(data),
              _.isEqual
            );
          } else {
            this.handleNotOK();
          }
        },
        err => { this.handleErr() });
  };

  finishLoading() {
    this.loading = undefined;
  }

  handleNotOK() {
    console.log("co van de roiiiiiiii");
    this.finishLoading();
  }

  handleErr(err ? ) {
    console.log("loi roi nhe", err);
    this.finishLoading();
  }

  doLoadMore(infiniteScroll ? ) {
    if (this.currentPage < this.totalPage && this.totalPage > 1) {
      this.infiniteScroll = infiniteScroll;
      this.currentPage++;
      console.log("doLoadMoredoLoadMore", this.currentPage, this.totalPage);
      this.setGetParams(this.currentPage);
      this.listAllHouses();
    }
  }

  setGetParams(page ? ) {
    this.getParams.page = page;
  }

  private subscribeCurrentItem() {
    this.currentItemService.CURRENT_ITEM
      .subscribe(res => {
        let rs: any = res;
        switch (rs.type) {
          case "space":
            {
              this.checkAndChange(this.listHouses, rs);
              break;
            }
          case "apartment":
            {

              break;
            }
        }
      })
  }

  getIndexInArr(item) {
    return _.findIndex(this.listHouses, { id: item.id });
  }

  private checkAndChange(checkArr, newVal) {
    console.log("checkAndChange arrrrrrrrrrrrrrrrr", checkArr, newVal);
    if (!newVal.data.isFavouriteAdded) {
      if (this.listHouses && this.listHouses.length > 0) {
        let index = this.getIndexInArr(newVal);
        if (index > -1) {
          let currentPage = _.clone(this.currentPage);
          this.listHouses.splice(index, 1);
          console.log("reCalcItemRemove xoaaaaaa", this.listHouses);
          this.totalItem--;
          this.checkTotal();
          // bu dap su thieu hut cua trang hien tai
          if (this.totalItem >= this.itemPerPage) {
            let page = (currentPage < this.totalPage) ?
              currentPage :
              this.totalPage;
            console.log("bu dap su thieu hut cua trang hien tai", this.totalPage, page);
            this.listAllHouses(page);
          }
        }
      }
    } else {
      let tempNewArr = [new ItemSpace(newVal.id, newVal.data)];
      this.listHouses = _.unionWith(this.listHouses, tempNewArr);
      this.totalItem++;
      this.checkTotal();
      console.log("reCalcItemAdd theemmmmmmm", this.listHouses);
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
}
