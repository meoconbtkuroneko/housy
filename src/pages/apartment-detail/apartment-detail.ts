import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

import { GetService } from '../../services/get.service';
import { CommonService } from '../../services/common.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';

import { Apartment } from '../../templates/apartment';

@Component({
  selector: 'apartment-detail',
  templateUrl: 'apartment-detail.html'
})
export class ApartmentDetail implements OnInit {
  params;
  showData;
  listHouses;
  readMore: boolean;
  private description: string;
  isProgressGetList;
  showErrLoad;
  reviewContents;
  stringShowmore;

  currentPage = 1;
  totalPage = 100;
  totalItem;
  getParams = {
    page: this.currentPage
  };

  loading;
  infiniteScroll;
  refresher;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    private getService: GetService,
    private commonService: CommonService,
    private anywhereService: AnywhereService,
  ) {}

  ngOnInit(): void {
    this.params = this.navParams.get("params");
    this.doRefresh()
  };

  private getDetail() {
    this.getService.getApartmentDetail(this.params.id)
      .then(res => {
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          let data = res.apartment as Apartment;
          this.description = _.clone(data.description);

          let temp = this.commonService.setApartmentDetail(data);
          this.showData = temp.detail;

          console.log("this.showData", this.showData);
        }
      })
  }

  private getListReview() {
    this.loading = true;
    this.getService.getListReview('apartments', this.params.id, this.getParams)
      .then(res => {
          if (res.reason === CONSTANT.REASONS.ER_OK) {
            if (this.loading && this.infiniteScroll) {
              this.infiniteScroll.complete();
            }
            this.finishLoading();
            console.log("resresres", res);
            this.totalPage = res.pageCount;
            this.totalItem = res.count;
            let data = _.clone(res.reviews);
            this.reviewContents = this.reviewContents || [];
            this.reviewContents = _.unionWith(
              this.reviewContents,
              data,
              _.isEqual
            );

            console.log("this.reviewContents", this.reviewContents);
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
    this.isProgressGetList = false;
    this.showErrLoad = undefined;
    this.loading = undefined;
  }

  handleNotOK() {
    console.log("co van de roiiiiiiii");
    this.reviewContents = [];
    this.stringShowmore = CONSTANT.REVIEW.DONT_HAVE_REVIEW;
    this.finishLoading();
  }

  handleErr(err ? ) {
    console.log("loi roi nhe", err);
    this.showErrLoad = true;
    this.finishLoading();
  }

  doRefresh(refresher ? ) {
    this.refresher = refresher;
    this.currentPage = 1;
    this.getParams.page = this.currentPage;
    this.reviewContents = undefined;
    this.getDetail();
    this.getListReview()
  }

  doLoadMore(infiniteScroll) {
    if (this.currentPage < this.totalPage) {
      this.infiniteScroll = infiniteScroll;
      this.currentPage++;
      this.getParams.page = this.currentPage;
      this.getListReview();
    }
  }
}
