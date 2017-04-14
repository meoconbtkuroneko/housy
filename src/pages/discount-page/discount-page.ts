import { Component } from '@angular/core';
import {
  ViewController,
} from 'ionic-angular';

import { AnywhereService } from '../../services/anywhere.service';
import { GetService } from '../../services/get.service';
import { PostService } from '../../services/post.service';
import { CONSTANT } from '../../services/constant.service';

import * as _ from 'lodash';

@Component({
  selector: 'discount-page',
  templateUrl: 'discount-page.html'
})
export class DiscountPage {

  constructor(
    private viewController: ViewController,
    private anywhereService: AnywhereService,
    private getService: GetService,
    private postService: PostService,
  ) {};
  showData;
  currentPage: number = 1;
  totalPage: number = 100;
  totalItem;
  getParams = {
    page: this.currentPage
  };
  isProcessing: boolean;
  currentId = this.anywhereService.USER.userInfo.id;
  discountStatus = CONSTANT.SERVER.DISCOUNT_STATUS;
  private loading;
  private infiniteScroll;
  ngOnInit() {
    this.listAllHouses();
  }

  listAllHouses() {
    this.loading = true;
    this.getService.getDiscount(this.anywhereService.currentLocation)
      .then(res => {
          if (res.reason === CONSTANT.REASONS.ER_OK) {
            if (this.loading && this.infiniteScroll) {
              this.infiniteScroll.complete();
            }
            this.finishLoading();
            console.log("resresres", res);
            this.totalPage = res.pageCount;
            this.totalItem = res.count;
            console.log("this.totalItem", this.totalItem);
            let data = _.clone(res.spaces);

            this.showData = this.showData || [];
            this.showData = _.concat(this.showData, this.anywhereService.addIdToArr(data));
            console.log("this.showData", this.showData);
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
    if (err) {
      this.anywhereService.showAlert(err);
    }
  }

  closeModal() {
    this.viewController.dismiss();
  }

  doLoadMore(infiniteScroll) {
    if (this.currentPage < this.totalPage) {
      this.infiniteScroll = infiniteScroll;
      console.log("doLoadMoredoLoadMore");
      this.currentPage++;
      this.getParams.page = this.currentPage;
      this.listAllHouses();
    }
  }

  getDiscount(e, id) {
    e.stopPropagation();

    if (!this.isProcessing) {
      console.log('getDiscountgetDiscount', e, id);
      this.isProcessing = true;
      this.postService.getDiscount(id)
        .then((res: any) => {
          console.log(" getDiscount ressssssssssssssssssssss", res);
          this.isProcessing = undefined;
          if (res.reason == CONSTANT.REASONS.ER_OK) {
            let index = _.findIndex(this.showData, { id: id });
            console.log("aaaaaaaaaaaaaaaaaaaaa", index);
            if (index > -1) {
              this.showData[index].data.renting.discount_status =
                this.discountStatus.WAIT_TO_DISCOUNT;
            }
          } else {
            this.handleErr(res.reason);
          }
        }, err => {
          this.handleErr(CONSTANT.ERR_GENERAL);
        });
    }
  }
}
