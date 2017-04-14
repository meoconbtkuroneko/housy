import {
  Component,
} from '@angular/core';

import {
  NavController,
  NavParams,
  Events,
} from 'ionic-angular';

import * as _ from 'lodash';

import { GetService } from '../../services/get.service';
import { CommonService } from '../../services/common.service';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
import { ApartmentDetail } from '../apartment-detail/apartment-detail';
import { HostProfile } from '../host-profile/host-profile';
import { CurrentItemService } from '../../services/current-item.service';
import { UserStorageService } from '../../services/user-storage.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'home-detail',
  templateUrl: 'home-detail.html'
})
export class HomeDetail {
  params;
  showData;
  listData;
  rentingFee;
  readMore: boolean;
  hostPhoneNumber: string;
  isShowContact: boolean;
  typeShare = CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_SPACE;

  refresher;
  private description: string;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    private getService: GetService,
    private commonService: CommonService,
    private userStorageService: UserStorageService,
    private currentItemService: CurrentItemService,
    private anywhereService: AnywhereService,
    private events: Events,
    private reportService: ReportService,
  ) {}

  ngOnInit(): void {
    this.params = this.navParams.get("params");
    this.subscribeCurrentItem();
    this.subscribeUser();
  };

  ionViewCanEnter() {
    this.anywhereService.toogleTabs('hide');
  };

  doRefresh(refresher ? ) {
    this.refresher = refresher;
    this.getDetail();
    this.listAllData();
  };

  private subscribeUser() {
    this.userStorageService.subscribeUser(res => {
      if (!_.isEmpty(res)) {
        this.doRefresh()
      }
    })
  };

  private subscribeCurrentItem() {
    this.currentItemService.CURRENT_ITEM
      .subscribe(res => {
        let rs: any = res;
        switch (rs.type) {
          case "space":
            {
              this.checkAndChange(this.listData, rs);
              this.checkAndChange([this.showData], rs);
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

  private getDetail() {
    this.getService.getHouseDetail(this.params.id)
      .then((res: any) => {
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          let data = _.cloneDeep(res.space);
          this.description = _.clone(data.description);

          let temp = this.commonService.setHouseDetail(data);
          this.showData = this.anywhereService.addIdToArr([temp.detail])[0];
          console.log("this.showData", this.showData);

          this.readMore = temp.readMoreDes;
          this.rentingFee = this.showData.data.renting.renting_fee;
          this.hostPhoneNumber = this.showData.data.renting.user.phone_number;

        }
      })
  }

  private listAllData() {
    this.getService.listAllHouses(null)
      .then(data => {
        this.listData = this.anywhereService.addIdToArr(data.spaces);
      }, err => {});
  };

  openDetail() {
    this.navController.push(ApartmentDetail, {
      params: {
        id: this.showData.data.apartment.id
      },
    });
  }

  openAvatar() {
    this.navController.push(HostProfile, {
      params: {
        id: this.showData.data.renting.user.id
      }
    });
  }

  contactHost() {
    let contactData = {
      contactHostClicked: true,
      timeContact: new Date().getTime(),
      rentingId: this.params.id,
      hostInfo: this.showData.renting.user,
    }

    this.reportService.setContactHostInfo(contactData);
    this.events.publish('contactHostClicked')
  }
}
