import {
  Component,
} from '@angular/core';

import {
  NavController,
  NavParams,
} from 'ionic-angular';

import * as _ from 'lodash';

import { CONSTANT } from '../../providers/constant.service';
import { ApartmentDetail } from '../apartment-detail/apartment-detail';
import { AdvPage } from '../adv-page/adv-page';
import { HostProfile } from '../host-profile/host-profile';
import { CommonService } from '../../providers/common.service';
import { CurrentItemService } from '../../providers/current-item.service';

import {
  CoreClassGetData,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'home-detail',
  templateUrl: 'home-detail.html'
})
export class HomeDetail extends CoreClassGetData {
  typeShare = CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_SPACE;
  typeComment = CONSTANT.SERVER.TYPE_COMMENT.COMMENT_TYPE_RENTING.name;
  listComments: any;
  oldUser;
  maxAdvance = CONSTANT.MAX_ADVANCES;

  getParams: any = {
    similar: true,
    renting_id: null
  }

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    private commonService: CommonService,
    private currentItemService: CurrentItemService,
    coreServices: CoreServices,
  ) {
    super(coreServices);
    this.oldUser = this.coreServices.userStorageService.USER;
    this.initVals();
    this.doRefresh();
    this.toggleSubscribeUser(true);
    this.toggleSubscribeCurrentItem(true);
  }

  // inherit from parent
  handleSubscribeUser(res ? ) {
    console.log("handleSubscribeUser HomeDetail", res);
    if (this.USER && this.oldUser &&
      (this.oldUser.logined != this.USER.logined)) {
      if (this.USER.logined) {
        this.getDetail();
      } else {
        this.resetWhenLogout();
      }
    }
    this.oldUser = this.coreServices.userStorageService.USER;
  }


  ionViewCanEnter() {
    this.coreServices.anywhereService.toggleTabs('hide');
  };

  initVals() {
    this.params = this.navParams.get("params");
    this.getParams.renting_id = this.params.id;
  }

  resetWhenLogout() {
    this.showData = this.coreServices.anywhereService.unfavouriteHouseLogout(this.showData);
  }

  getAllData() {
    this.getDetail();
    this.listAllData();
    this.listAllComments();
  }

  getDetail() {
    this._getDetail(
      CONSTANT.DETAIL_TYPE.LISTINGS,
      this.params.id,
      null,
      (res: any) => {
        let data = _.cloneDeep(res[CONSTANT.DETAIL_TYPE.SPACE]);
        let temp = this.commonService.setHouseDetail(data);
        this.showData = this.coreServices.anywhereService.addIdToArr([temp.detail])[0];
        console.log("this.showData", this.showData);
      }
    );
  }

  listAllData() {
    this._listAllData('listAllHouses', null, (res: any) => {
      console.log("listAllData 2222222222", res)
      this.allDataList = this.coreServices.anywhereService.addIdToArr(res.spaces);
    });
  }


  listAllComments() {
    this.increaseProcess();
    let promise = this.coreServices.getService.getComments(this.typeComment, this.params.id);
    return this.handleResultFromServer(promise, false, (res) => {
      this.listComments = res[CONSTANT.DETAIL_TYPE.COMMENTS];
      console.log("listAllComments", res, this.listComments);
    });
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
          // this.checkAndChange(this.allDataList, res);
          this.checkAndChange([this.showData], res);
          break;
        }
    }
  }

  private checkAndChange(checkArr, newVal) {
    let index = _.findIndex(checkArr, { id: newVal.id });
    if (index > -1) {
      checkArr[index].data = _.cloneDeep(newVal.data);
    }
  }

  openDetail() {
    if (!this.canGo()) {
      return;
    }
    this.navController.push(ApartmentDetail, {
      params: {
        id: this.showData.data.apartment.id
      },
    });
  }

  openAvatar() {
    if (!this.canGo()) {
      return;
    }
    this.navController.push(HostProfile, {
      params: {
        id: this.showData.data.renting.user.id
      }
    });
  }

  showAllAdvances() {
    this.coreServices.anywhereService.showModal(AdvPage, this.showData.data);
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
    this.toggleSubscribeCurrentItem(false);
    super.ngOnDestroy();
  }
}
