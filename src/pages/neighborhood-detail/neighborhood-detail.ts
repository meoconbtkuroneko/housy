import {
  Component,
} from '@angular/core';

import {
  NavParams,
  Events,
} from 'ionic-angular';

import { CommonService } from '../../providers/common.service';
import { CONSTANT } from '../../providers/constant.service';
import { AnywhereService } from '../../providers/anywhere.service';

import * as _ from 'lodash';

import {
  CoreClassNoSubcribeUser,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'neighborhood-detail',
  templateUrl: 'neighborhood-detail.html'
})
export class NeighborhoodDetail extends CoreClassNoSubcribeUser {
  showData;
  typeComment = CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_NEIGHBORHOOD.name;
  listComments;

  getParams: any = {
    page: this.currentPage,
    type: CONSTANT.DETAIL_TYPE.NEIGHBORHOODS,
  };

  constructor(
    public navParams: NavParams,
    private commonService: CommonService,
    private anywhereService: AnywhereService,
    public events: Events,
    coreServices: CoreServices,
  ) {
    super(coreServices);
    this.params = this.navParams.get("params");
    this.getParams.id = this.params.id;
  }

  getAllData() {
    this.getDetail();
    this.listAllData();
    this.listAllComments();
  }

  // doRefresh(refresher ? ) {
  //   this._doRefresh(refresher, () => {
  //     this.getDetail();
  //     this.listAllData();
  //     this.listAllComments();
  //   })
  // }

  private getDetail() {
    this._getDetail(
      CONSTANT.DETAIL_TYPE.NEIGHBORHOODS,
      this.params.id,
      null,
      (res: any) => {
        let temp = this.commonService.setApartmentDetail(res[CONSTANT.DETAIL_TYPE.NEIGHBORHOOD]);
        this.showData = temp.detail;
        console.log("this.showData", this.showData);
      }
    );
  }

  private listAllData() {
    console.log("listAllDatalistAllData")
    this._listAllData('getHousesOf', this.getParams, (res: any) => {
      let data = _.clone(res[CONSTANT.DETAIL_TYPE.SPACES]);
      this.allDataList = this.allDataList || [];
      this.allDataList = _.unionWith(
        this.allDataList,
        this.coreServices.anywhereService.addIdToArr(data),
        _.isEqual
      );
      console.log("listAllData 2222222222", res)
    });
  };

  listAllComments() {
    this.increaseProcess();
    let promise = this.coreServices.getService.getComments(this.typeComment, this.params.id);
    return this.handleResultFromServer(promise, false, (res) => {
      this.listComments = res[CONSTANT.DETAIL_TYPE.COMMENTS];
      console.log("listAllComments", res, this.listComments);
    });
  }

  ionViewDidEnter() {
    this.subscribeShowMoreClicked();
  }

  ionViewWillLeave() {
    this.unsubscribeShowMoreClicked();
  }

  subscribeShowMoreClicked() {
    this.events.subscribe(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED, this.handleSubscribeShowMoreClicked);
  }

  unsubscribeShowMoreClicked() {
    this.events.unsubscribe(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED, this.handleSubscribeShowMoreClicked);
  }

  private handleSubscribeShowMoreClicked = () => {
    if (!this.canGo()) {
      console.log("doiiiiiiiiiiiiiiiiiiiiiiii", this.isProcessing, this.loading, this.hasInternet);
      return;
    }
    console.log("zooooooooooooooooooooooooo")
    this.doLoadMore();
  }

  doLoadMore(infiniteScroll ? ) {
    console.log("doLoadMoredoLoadMoredoLoadMoredoLoadMore", this.totalPage, this.currentPage);
    this._doLoadMore(infiniteScroll, () => {
      this.toggleIsProcessing(true);
      this.getParams.page = this.currentPage;
      this.listAllData();
    })
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
