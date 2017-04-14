import {
  Component
} from '@angular/core';

import * as _ from 'lodash';

import { GetService } from '../../services/get.service';
import { CONSTANT } from '../../services/constant.service';

import { AnywhereService } from '../../services/anywhere.service';

@Component({
  selector: 'all-apartments-page',
  templateUrl: 'all-apartments.html'
})
export class AllApartmentsPage {
  listData;
  currentPage = 1;
  totalPage = 100;
  totalItem;
  getParams = {
    page: this.currentPage
  };
  private loading;
  private infiniteScroll;
  private refresher;

  constructor(
    private getService: GetService,
    private anywhereService: AnywhereService,
  ) {}

  ngOnInit() {
    this.doRefresh();
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
  };

  private listAllData() {
    this.loading = true;
    this.getService.listAllApartments(this.getParams)
      .then(res => {
          if (res.reason === CONSTANT.REASONS.ER_OK) {
            if (this.loading && this.infiniteScroll) {
              this.infiniteScroll.complete();
            }
            this.finishLoading();
            console.log("resresres", res);
            this.totalPage = res.pageCount;
            this.totalItem = res.count;
            let data = _.clone(res.apartments);
            this.listData = this.listData || [];
            this.listData = _.unionWith(
              this.listData,
              this.anywhereService.addIdToArr(data, 'id'),
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

  doLoadMore(infiniteScroll) {
    if (this.currentPage < this.totalPage) {
      this.infiniteScroll = infiniteScroll;
      this.currentPage++;
      this.getParams.page = this.currentPage;
      this.listAllData();
    }
  }
}
