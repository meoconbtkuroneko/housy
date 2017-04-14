import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavParams,
  ViewController,
  NavController
} from 'ionic-angular';

import * as _ from 'lodash';

import { GetService } from '../../services/get.service';
import { SearchMapPage } from '../../pages/search-map/search-map';
import { AnywhereService } from '../../services/anywhere.service';
import { UserStorageService } from '../../services/user-storage.service';
import { CONSTANT } from '../../services/constant.service';
import { CurrentItemService } from '../../services/current-item.service';

@Component({
  selector: 'search-result',
  templateUrl: 'search-result.html'
})
export class SearchResultPage implements OnInit {
  listHouses;
  USER;
  isProcessing;
  currentPage = 1;
  totalPage = 100;
  totalItem;
  params: any;
  getParams: any = {};
  showNow;
  private loading;
  private infiniteScroll;

  itemPerPage = CONSTANT.ITEM_PER_PAGE;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public viewController: ViewController,
    private userStorageService: UserStorageService,
    private getService: GetService,
    private anywhereService: AnywhereService,
    private currentItemService: CurrentItemService,
  ) {}

  ngOnInit() {
    this.params = this.navParams.get('params');
    // console.log("this.paramsthis.params", this.params);
    this.setGetParams();
    this.subscribeCurrentItem();
    this.userStorageService.subscribeUser(res => {
      // console.log("subscribeUsersubscribeUsersubscribeUser")
      this.USER = _.cloneDeep(res);
      this.isProcessing = undefined;
      this.listAllHouses();
    });
  }

  listAllHouses(page ? ) {
    this.loading = true;
    this.getService.listAllHousesAroundLocation(this.getParams)
      .then(res => {
          if (res.reason === CONSTANT.REASONS.ER_OK) {
            if (this.loading && this.infiniteScroll) {
              this.infiniteScroll.complete();
            }
            this.finishLoading();
            // console.log("resresres", res);
            this.totalPage = res.pageCount;
            this.totalItem = res.count;
            let data = _.clone(res.spaces);
            this.listHouses = this.listHouses || [];
            this.listHouses = _.unionWith(
              this.listHouses,
              this.anywhereService.addIdToArr(data),
              _.isEqual
            );
            console.log("this.listHouses", this.listHouses);
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
    this.getParams.page = page || 1;
    this.getParams.center_lat = this.anywhereService.currentLocation.lat();
    this.getParams.center_lng = this.anywhereService.currentLocation.lng();
    this.getParams.radius = 5000;
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
    // console.log("checkAndChange arrrrrrrrrrrrrrrrr", checkArr, newVal);
    let index = this.getIndexInArr(newVal);
    if (index > -1) {
      checkArr[index].data = _.cloneDeep(newVal.data);
    }
  }

  openMap() {
    let sendParams = {
      listHouses: this.listHouses,
      center: {
        lat: this.anywhereService.currentLocation.lat(),
        lng: this.anywhereService.currentLocation.lng(),
      },
      radius: 5000
    };
    this.navController.push(SearchMapPage, {
      params: sendParams
    });
  }
}
