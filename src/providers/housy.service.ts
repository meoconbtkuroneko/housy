import {
  Injectable,
} from '@angular/core';

import * as _ from 'lodash';

import { CONSTANT } from './constant.service';
import { AllSelectionsService } from './backend.service';
import { Storage } from '@ionic/storage';

import { Events } from 'ionic-angular';

@Injectable()
export class HousyService {
  constructor(
    private allSelectionsService: AllSelectionsService,
    private storage: Storage,
    private events: Events,
  ) {};

  key = 'HOUSY_DATA';
  HOUSY_DATA;

  indexData: any;

  startupServices() {
    return this.getHousyData().then(res => {
      if (!_.isEmpty(res)) {
        this.broadcastHousyDataChange(res);
      } else {
        this.getHousyDataOnline()
          .then((res) => {
            this.setHousyData(res).then(res => {
              this.broadcastHousyDataChange(res);
              return res;
            })
          });
      }
      return res;
    })
  }

  setHousyData(val) {
    return this.storage.set(this.key, val);
  }

  broadcastHousyDataChange(data) {
    this.HOUSY_DATA = _.cloneDeep(data);
    this.events.publish(CONSTANT.EVENTS_NAME.HOUSY_SERVICE_CHANGED, data);
  }

  getHousyData() {
    return this.storage.get(this.key);
  }

  getProp(propName) {
    return this.HOUSY_DATA[propName];
  }


  getHousyDataOnline() {
    this.indexData = [{
      id: CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES,
      func: this.allSelectionsService.getAllHomeTypes(),
    }, {
      id: CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES,
      func: this.allSelectionsService.getAllAdvantages(),
    }, {
      id: CONSTANT.SERVER.TYPE_QUERY.AMENITIES,
      func: this.allSelectionsService.getAllAmenities(),
    }, {
      id: CONSTANT.SERVER.TYPE_QUERY.RULES,
      func: this.allSelectionsService.getAllRules(),
    }, {
      id: CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS,
      func: this.allSelectionsService.getAllSpacePositions(),
    }, {
      id: CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME,
      func: this.allSelectionsService.getAllDepositTypes(),
    }, {
      id: CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE,
      func: this.allSelectionsService.getAllContractTypes(),
    }];


    let promises: any = [];
    for (let i in this.indexData) {
      promises.push(this.indexData[i].func);
    };

    let rs: any = {};
    rs = this.createStaticVals();

    return Promise.all(promises)
      .then((res: any) => {
        let val;
        for (let i in res) {
          val = res[i];
          let propName = this.indexData[i].id;
          if (val.reason === CONSTANT.REASONS.ER_OK) {
            rs[propName] = val[propName];
            switch (propName) {
              case CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES:
              case CONSTANT.SERVER.TYPE_QUERY.AMENITIES:
              case CONSTANT.SERVER.TYPE_QUERY.RULES:
                {
                  rs[propName] = this.setSelectingAndUrl(val[propName]);
                  break;
                }
            }
          } else {
            rs[propName] = [];
          }
        }
        return rs;
      }, (err) => {
        let rs = {};
        for (let i in this.indexData) {
          let propName = this.indexData[i].id;
          rs[propName] = [];
        }
        return rs;
      })

    // StaticValueService.getAll();
  }

  setSelectingAndUrl(arr) {
    for (let i in arr) {
      arr[i].selecting = false;
      if (arr[i].url) {
        arr[i].url = CONSTANT.ICON_PATH + arr[i].url;
      }
    }
    return arr;
  }

  // Tao thanh 1 mang cac gia tri tu fromVal den toVal,
  // voi id va mo ta descriptionStrBefore va descriptionStrAfter
  createArray(fromVal, toVal, descriptionStrBefore ? , descriptionStrAfter ? ) {
    let arr = [];
    for (let i = fromVal; i <= toVal; i++) {
      descriptionStrBefore = descriptionStrBefore || '';
      descriptionStrAfter = descriptionStrAfter || '';
      arr.push({
        id: i,
        description: descriptionStrBefore + ' ' + i + ' ' + descriptionStrAfter,
      });
    }
    return arr;
  };

  createStaticVals() {
    let objRs: any = {};
    objRs.maxRenters = this.createArray(1, 30, null, 'người');
    objRs.allBathrooms = this.createArray(1, 30, null, 'phòng');
    objRs.allBedrooms = this.createArray(1, 30, null, 'phòng');
    objRs.maxFloors = this.createArray(1, 150, null, 'tầng');
    return objRs;
  }
}
