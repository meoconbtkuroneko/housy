import {
  Component
} from '@angular/core';

import {
  ViewController,
} from 'ionic-angular';

import { PostService } from '../../providers/post.service';
import { CONSTANT } from '../../providers/constant.service';
import { MapService } from '../../providers/map.service';

import {
  CoreServices,
  CoreClassNoSubcribeUser
} from '../../templates/core-class';

import * as _ from 'lodash';

@Component({
  selector: 'discount-page',
  templateUrl: 'discount-page.html'
})
export class DiscountPage extends CoreClassNoSubcribeUser {

  constructor(
    private viewController: ViewController,
    coreServices: CoreServices,
    private postService: PostService,
    private mapService: MapService,
  ) {
    super(coreServices);
  };

  getParams = {
    location: this.coreServices.anywhereService.currentLocation,
    page: this.currentPage
  };

  errGetCurrentLocation: boolean;
  currentId = this.coreServices.anywhereService.USER.userInfo.id;
  discountStatus = CONSTANT.SERVER.DISCOUNT_STATUS;

  currentLocationObj: any = {};

  // doRefresh(refresher ? ) {
  //   this._doRefresh(refresher, () => {
  //     this.getCurrentPosition();
  //   })
  // }

  getAllData() {
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    this.mapService.init((pos) => {
      if (pos && pos.lat && pos.lng) {
        this.errGetCurrentLocation = undefined;
        this.currentLocationObj.location = this.coreServices.anywhereService.currentLocation;
        this.mapService.convertFromLatLngToAddress(pos.lat, pos.lng)
          .subscribe((res: any) => {
            let currentPlace = res[0];
            this.currentLocationObj.formatted_address = currentPlace.formatted_address;
          })

        this.setGetParams();
        this.listAllData();
      } else {
        this.handleErrCurrentLocation();
      }
    })
  }


  private handleErrCurrentLocation() {
    this.errGetCurrentLocation = true;
    this.currentErrType = CONSTANT.ERR_TYPE.CURRENT_LOCATION;
    // this.coreServices.anywhereService.showAlert(CONSTANT.MAP.POSITION_UNAVAILABLE);
  }

  setGetParams(page ? ) {
    this.getParams.location = this.currentLocationObj.location;
    if (page) {
      this.getParams.page = page;
    }
  }

  listAllData() {
    console.log("listAllDatalistAllData")
    return this._listAllData(
      'getDiscount',
      this.getParams,
      (res: any) => {
        console.log("listAllData 2222222222", res)

        let data = _.cloneDeep(res[CONSTANT.DETAIL_TYPE.SPACES]);
        this.allDataList = this.allDataList || [];
        this.allDataList = _.unionWith(
          this.allDataList,
          this.coreServices.anywhereService.addIdToArr(data),
          _.isEqual
        );

        console.log("this.allDataList", this.allDataList);
      })
  };

  doLoadMore(infiniteScroll ? ) {
    this._doLoadMore(infiniteScroll, () => {
      this.getParams.page = this.currentPage;
      this.listAllData();
    })
  }

  getDiscount(e, id) {
    e.stopPropagation();

    if (!this.canGo()) {
      return;
    }

    console.log('getDiscountgetDiscount', e, id);
    this.toggleIsProcessing(true);
    this.postService.getDiscount(id)
      .then((res: any) => {
        console.log(" getDiscount ressssssssssssssssssssss", res);
        if (res.reason == CONSTANT.REASONS.ER_OK) {
          let index = _.findIndex(this.allDataList, { id: id });
          console.log("aaaaaaaaaaaaaaaaaaaaa", index);
          if (index > -1) {
            if (!this.allDataList[index].data.renting.request_user) {
              this.allDataList[index].data.renting.request_user = {
                id: this.currentId,
              }
            }
            this.allDataList[index].data.renting.discount_status =
              this.discountStatus.WAIT_TO_DISCOUNT;
            console.log("bbbbbbbbbbbbbbbbb", this.allDataList, this.discountStatus);
          }
          this.finishLoading();
        } else {
          this.showToast(res.reason);
        }
      }, err => {
        this.handleShowErr(CONSTANT.ERR_GENERAL);
      });
  }

  handleShowErr(reason) {
    this.showToast(reason);
  }

  showToast(message) {
    this.finishLoading();
    this.coreServices.anywhereService.showToast(message);

  }
  closeModal() {
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
