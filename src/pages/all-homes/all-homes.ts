import {
  Component
} from '@angular/core';
import {
  NavController,
  Events,
} from 'ionic-angular';
import * as _ from 'lodash';

import { GetService } from '../../services/get.service';
import { CONSTANT } from '../../services/constant.service';

import { AnywhereService } from '../../services/anywhere.service';
import { CurrentItemService } from '../../services/current-item.service';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
  selector: 'all-homes-page',
  templateUrl: 'all-homes.html'
})
export class AllHomesPage {
  listData;
  currentPage = 1;
  totalPage = 100;
  totalItem;
  getParams = {
    page: this.currentPage
  };
  private loading;
  private infiniteScroll;
  refresher;
  constructor(
    public navController: NavController,
    private getService: GetService,
    private currentItemService: CurrentItemService,
    private anywhereService: AnywhereService,
    private events: Events,
    private userStorageService: UserStorageService,
  ) {}

  ngOnInit(): void {
    this.subscribeCurrentItem();
    this.subscribeUser();
  };

  ionViewCanEnter() {
    this.anywhereService.toogleTabs('show');
  }

  doRefresh(refresher ? ) {
    this.refresher = refresher;
    this.currentPage = 1;
    this.getParams.page = this.currentPage;
    this.listData = undefined;
    this.listAllData();
  }

  private listAllData() {
    this.loading = true;
    this.getService.listAllHouses(this.getParams)
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
            this.listData = this.listData || [];
            this.listData = _.unionWith(
              this.listData,
              this.anywhereService.addIdToArr(data),
              _.isEqual
            );

            console.log("this.listData", this.listData);
          } else {
            this.handleNotOK();
          }

        },
        err => { this.handleErr() });
  };

  finishLoading() {
    if (this.refresher) {
      this.refresher.complete();
      this.refresher = undefined;
    }
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

  private subscribeUser() {
    this.userStorageService.subscribeUser(res => {
      if (!_.isEmpty(res)) {
        this.doRefresh()
      }
    })
  }

  private subscribeCurrentItem() {
    this.currentItemService.CURRENT_ITEM
      .subscribe(res => {
        let rs: any = res;
        switch (rs.type) {
          case "space":
            {
              this.checkAndChange(this.listData, rs);
              break;
            }
        }
      })
  }

  private checkAndChange(checkArr, newVal) {
    let index = _.findIndex(checkArr, { id: newVal.id });
    if (index > -1) {
      checkArr[index].data = _.cloneDeep(newVal.data);
    }
  }

  doLoadMore(infiniteScroll) {
    if (this.currentPage < this.totalPage) {
      this.infiniteScroll = infiniteScroll;
      this.currentPage++;
      this.getParams.page = this.currentPage;
      this.listAllData();
    }
  }
}
