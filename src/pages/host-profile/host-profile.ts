import { Component } from '@angular/core';

import {
  NavParams,
  NavController,
  ViewController,
  Events,
} from 'ionic-angular';

import * as _ from 'lodash';

import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';

import {
  CoreClassNoSubcribeUser,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'host-profile',
  templateUrl: 'host-profile.html'
})
export class HostProfile extends CoreClassNoSubcribeUser {
  showData;
  fullUrlPicture;
  createDateString;
  typeRole = CONSTANT.SERVER.TYPE_ROLE;
  typeComment = CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_USER.name;

  getParams: any = {
    page: this.currentPage,
    type: CONSTANT.DETAIL_TYPE.USERS,
  };

  constructor(
    public navParams: NavParams,
    coreServices: CoreServices,
    private anywhereService: AnywhereService,
    public navController: NavController,
    public viewController: ViewController,
    public events: Events,
  ) {
    super(coreServices);
    this.params = this.navParams.get("params");
    this.getParams.id = this.params.id;
  }

  getAllData() {
    this.getDetail();
    this.listAllData();
  }

  // doRefresh(refresher ? ) {
  //   this._doRefresh(refresher, () => {
  //     this.getDetail();
  //     this.listAllData();
  //   })
  // }

  ionViewCanEnter() {
    this.coreServices.anywhereService.toggleTabs('hide');
  };

  ionViewDidEnter() {
    this.subscribeShowMoreClicked();
  }

  ionViewWillLeave() {
    this.unsubscribeShowMoreClicked();
  }

  private getDetail() {
    this._listAllData(
      'getHostProfile', this.params.id, (res: any) => {
        this.showData = res[CONSTANT.DETAIL_TYPE.USER];
        this.fullUrlPicture = this.anywhereService.getFullImgUrl(
          this.showData.picture,
          CONSTANT.DETAIL_TYPE.USER
        );
        this.createDateString = this.getConverDobString(this.showData.created);

        console.log("this.showData", this.showData);
      }
    );
  }

  private getConverDobString(date) {
    let tempDate = this.anywhereService.convertDate(date);
    return tempDate.day + ' tháng ' + tempDate.month + ' năm ' + tempDate.year;
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

  checkIsActivePage() {
    return this.navController.isActive(this.viewController);
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
    if (!this.checkIsActivePage()) {
      return;
    }
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
