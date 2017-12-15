import {
  Component,
} from '@angular/core';
import {
  NavParams,
  NavController,
  ViewController,
  Events,
} from 'ionic-angular';

import * as _ from 'lodash';

import { SearchMapPage } from '../../pages/search-map/search-map';
import { CONSTANT } from '../../providers/constant.service';
import { FilterData } from '../../templates/filter-data'
import { FilterPage } from '../filter-page/filter-page';

import {
  CoreClassSubcribeUser,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'search-result',
  templateUrl: 'search-result.html'
})
export class SearchResultPage extends CoreClassSubcribeUser {
  getParams: any;
  currentFilter: any;
  itemPerPage = CONSTANT.ITEM_PER_PAGE;
  waitBroadcastChange: boolean;

  constructor(
    coreServices: CoreServices,
    public navParams: NavParams,
    public navController: NavController,
    public viewController: ViewController,
    public events: Events,
  ) {
    super(coreServices);
    this.initVals();
    this.toggleSubscribeCurrentItem(true);
  }

  initVals() {
    this.params = this.navParams.get("params");
    console.log("this.params", this.params);
  }

  ionViewCanEnter() {
    this.coreServices.anywhereService.toggleTabs('show');
  }

  ionViewDidLoad() {
    this.getFilterChanged();
    this.subscribeShowMoreClicked();
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
    this.waitBroadcastChange = true;
    this.doLoadMore();
  }

  getAllData() {
    this.setGetParams();
    this.getParams.page = 1;
    this.listAllData();
  }

  resetWhenDoRefresh() {}

  setGetParams(params ? ) {
    this.getParams = this.getParams || new FilterData();
    // delete this.getParams.price_from_to;
    this.getParams.center_lat = this.params.location.lat;
    this.getParams.center_lng = this.params.location.lng;

    this.getParams = _.assignIn(this.getParams, params);
    this.getParams.page = this.getParams.page || 1;
    this.getParams.radius = this.getParams.radius || 5000;

    delete this.getParams.priceMin;
    delete this.getParams.priceMax;

    for (let i in this.getParams) {
      if (_.isArray(this.getParams[i])) {
        if (this.getParams[i].length > 0) {
          this.getParams[i] = this.getParams[i].toString();
        } else {
          delete this.getParams[i];
        }
      }
    }

    if (this.getParams.is_verified) {
      this.getParams.is_verified = 1;
    } else {
      delete this.getParams.is_verified;
    }

    if (params) {
      if (params.priceMin || params.priceMin === 0) {
        this.getParams.price_from_to = params.priceMin + ',' + params.priceMax;
      } else {
        delete this.getParams.price_from_to;
      }
    }
  }

  listAllData() {
    console.log("listAllDatalistAllData", this.currentFilter);
    return this._listAllData(
      'listAllHousesAroundLocation',
      this.getParams,
      (res: any) => {
        console.log("listAllData 2222222222 SearchResultPage", res)
        //console.log("this.loading", this.loading);

        let data = _.clone(res[CONSTANT.DETAIL_TYPE.SPACES]);
        this.allDataList = this.allDataList || [];
        this.allDataList = _.unionWith(
          this.allDataList,
          this.coreServices.anywhereService.addIdToArr(data),
          _.isEqual
        );

        if (this.waitBroadcastChange) {
          this.waitBroadcastChange = false;
          this.broadcastFinishShowLoadMore();
          this.broadcastDataListChanged();
        }

        console.log("this.allDataList", this.allDataList);
      })
  };

  broadcastDataListChanged() {
    this.events.publish(CONSTANT.EVENTS_NAME.HOUSES_CHANGED, {
      listHouses: this.allDataList,
      currentPage: this.currentPage,
      totalPage: this.totalPage,
    })
  }

  broadcastFinishShowLoadMore() {
    this.events.publish(CONSTANT.EVENTS_NAME.FINISH_SHOW_LOAD_MORE, true);
  }

  doLoadMore(infiniteScroll ? ) {
    this._doLoadMore(infiniteScroll, () => {
      this.setGetParams({ page: this.currentPage });
      this.listAllData();
    })
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

  private checkAndChange(checkArr, newVal) {
    // console.log("checkAndChange arrrrrrrrrrrrrrrrr", checkArr, newVal);
    let index = this.getIndexInArr(newVal);
    if (index > -1) {
      checkArr[index].data = _.cloneDeep(newVal.data);
    }
  }

  private getIndexInArr(item) {
    return _.findIndex(this.allDataList, { id: item.id });
  }


  getFilterChanged() {
    this.events.subscribe('filterChanged', this.handleGetFilterChanged);
  }


  unsubscribeFilterChanged() {
    this.events.unsubscribe('filterChanged', this.handleGetFilterChanged);
  }

  private handleGetFilterChanged = (data) => {
    if (!this.coreServices.noInternetService.hasInternet) {
      return;
    }
    this.currentFilter = _.cloneDeep(data);
    console.log("filterChanged datadatadata", this.currentFilter);
    this.setGetParams(this.currentFilter);
    this.getParams.page = this.currentPage;
    this.doRefresh();
  }

  // Mo bo loc
  showFilter() {
    this.coreServices.anywhereService.showModal(FilterPage, this.currentFilter);
    // if (this.canGo()) {
    // }
  }

  // mo ban do
  openMap() {
    let sendParams = {
      listHouses: this.allDataList,
      currentPage: this.currentPage,
      totalPage: this.totalPage,
      center: {
        lat: this.params.location.lat,
        lng: this.params.location.lng,
      },
      radius: parseInt(this.getParams.radius) || 5000,
    };
    console.log("sendParamssendParams", sendParams);
    this.navController.push(SearchMapPage, {
      params: sendParams
    });

    // if (this.canGo()) {

    // }
  }

  ngOnDestroy() {
    this.unsubscribeShowMoreClicked();
    this.unsubscribeFilterChanged();
    this.toggleSubscribeCurrentItem(false);
    super.ngOnDestroy();
  }
}
