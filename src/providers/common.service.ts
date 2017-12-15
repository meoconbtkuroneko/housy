import { Injectable } from '@angular/core';

import { HousyService } from './housy.service';
import { CONSTANT } from './constant.service';
import { Events } from 'ionic-angular';

import * as _ from 'lodash';

@Injectable()
export class CommonService {
  allHomeTypes;
  allSpacePostions;
  allAmenities;
  allAdvantages;
  allRules;
  allContractTypes;
  allDepositTimes;

  constructor(
    private housyService: HousyService,
    private events: Events,
  ) {
    this.toggleSubscribeHousyData(true);
  };

  toggleSubscribeHousyData(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.HOUSY_SERVICE_CHANGED,
        this.handleSubscribeHousyData
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.HOUSY_SERVICE_CHANGED,
        this.handleSubscribeHousyData
      );
    }
  }

  private handleSubscribeHousyData = (res) => {
    if (!_.isEmpty(res)) {
      this.initVals();
    }
  }

  initVals() {
    this.allHomeTypes = this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES];
    this.allSpacePostions = this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS];
    this.allAmenities = this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.AMENITIES];
    this.allAdvantages = this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES];
    this.allRules = this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.RULES];
    this.allContractTypes = this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE];
    this.allDepositTimes = this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME];
  }

  // Tra ve mot doi tuong dua vao id
  getById(type, id) {
    id = parseInt(id);
    let obj;
    switch (type) {
      case CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES:
        {
          obj = _.find(this.allHomeTypes, { id: id });
          break;
        }
      case CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS:
        {
          obj = _.find(this.allSpacePostions, { id: id });
          break;
        }
      case CONSTANT.KEY_FILTER.KEY_AME:
        {
          obj = _.find(this.allAmenities, { id: id });
          break;
        }
      case CONSTANT.KEY_FILTER.KEY_ADV:
        {
          obj = _.find(this.allAdvantages, { id: id });
          break;
        }
      case CONSTANT.KEY_FILTER.KEY_RULES:
        {
          obj = _.find(this.allRules, { id: id });
          break;
        }
      case CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME:
        {
          obj = _.find(this.allDepositTimes, { id: id });
          break;
        }
      case CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE:
        {
          obj = _.find(this.allContractTypes, { id: id });
          break;
        }
    }

    return obj || false;
  }


  // nhan vao mot mang cac id va tra ve mot mang cac doi tuong dua theo id
  // hoac mot mang cac thuoc tinh cua doi tuong do dua theo id
  idsToObjs(type, idsArr, returnPropName ? ) {
    let result = [];
    if (!_.isArray(idsArr)) {
      try {
        idsArr = JSON.parse(idsArr);

      } catch (e) {}
    }

    if (idsArr && idsArr.length > 0) {
      for (let i in idsArr) {
        let obj = this.getById(type, idsArr[i]);
        if (obj) {
          if (returnPropName) {
            result.push(obj[returnPropName]);
          } else {
            result.push(obj);
          }
        }
      }
    }

    return result;
  }

  // nhan vao mot doi tuong va tra ve mang cac doi tuong dua vao ten thuoc tinh
  getCurrentFromObj(type, obj, propertyName) {
    propertyName = propertyName || type;
    if (obj.hasOwnProperty(propertyName)) {
      return this.idsToObjs(type, obj[propertyName]);
    }
    return [];
  }

  setHouseDetail(data) {
    let result = _.cloneDeep(data);
    let readMore;

    result.currentAmenities = this.getCurrentFromObj(
      CONSTANT.KEY_FILTER.KEY_AME,
      result,
      CONSTANT.KEY_FILTER.KEY_SPACE_AME
    );
    result.currentAdvantages = this.getCurrentFromObj(
      CONSTANT.KEY_FILTER.KEY_ADV,
      result,
      CONSTANT.KEY_FILTER.KEY_SPACE_ADV
    );

    result.currentRules = this.getCurrentFromObj(
      CONSTANT.KEY_FILTER.KEY_RULES,
      result,
      CONSTANT.KEY_FILTER.KEY_SPACE_RULES
    );

    result.currentDepositTime = this.getById(
      CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME,
      data[CONSTANT.KEY_SPACES.DEPOSIT_TIME_ID]
    )

    result.currentContractType = this.getById(
      CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE,
      data[CONSTANT.KEY_SPACES.CONTRACT_TYPE_ID]
    )

    result.currentHomeType = this.getById(
      CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES,
      data[CONSTANT.KEY_SPACES.HOME_TYPE_ID]
    )

    result.currentSpacePosition = this.getById(
      CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS,
      data[CONSTANT.KEY_SPACES.SPACE_POSITION_ID]
    )

    result.someAdvances = this.getLimitAdv(result);
    result.shortCurrentRules = this.getLimitRules(result);

    result.mapUrl = this.getMapPictureUrl(
      result.latitude,
      result.longitude
    );

    return {
      detail: result,
      readMoreDes: readMore
    }
  }

  setApartmentDetail(data) {
    let readMore;
    let result = _.clone(data);

    result.mapUrl = this.getMapPictureUrl(
      result.latitude,
      result.longitude
    );
    return {
      detail: result,
      readMoreDes: readMore
    }
  }

  private getLimitAdv(data) {
    let maxAdvance = CONSTANT.MAX_ADVANCES;

    let someAdvances = _.cloneDeep(data.currentAmenities);
    while (someAdvances.length > maxAdvance) {
      someAdvances.splice(someAdvances.length - 1);
    }

    let i = 0;
    while (someAdvances.length < maxAdvance) {
      if (!data.currentAdvantages[i]) {
        break;
      }
      someAdvances.push(data.currentAdvantages[i]);
      i++;
    }

    return someAdvances;

  }

  private getLimitRules(data) {
    let maxShowRules = 2;
    let shortCurrentRules = _.cloneDeep(data.currentRules);
    if (shortCurrentRules && shortCurrentRules.length > maxShowRules) {
      shortCurrentRules = shortCurrentRules.slice(0, maxShowRules);
    }
    return shortCurrentRules;
  }

  getMapPictureUrl(lat, lng) {
    return 'https://maps.googleapis.com/maps/api/staticmap?center=' +
      lat + ',' + lng +
      '&zoom=15&size=380x250&markers=' + lat + ',' + lng;
  }

  ngOnDestroy() {
    this.toggleSubscribeHousyData(false);
  }
}
