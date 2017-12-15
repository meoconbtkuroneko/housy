import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

import {
  ViewController,
} from 'ionic-angular';

import { HousyService } from '../../providers/housy.service'
import { CONSTANT } from '../../providers/constant.service';
import { NewListingService } from '../../providers/new-listing.service';

import * as _ from 'lodash';

@Component({
  selector: "part-new-listing-adv",
  templateUrl: "./part-new-listing-adv.html"
})
export class PartNewListingAdv {
  constructor(
    private housyService: HousyService,
    private newListingService: NewListingService,
    private viewController: ViewController,
  ) {}

  @Output()
  getNewListingForm = new EventEmitter();

  amenitiesArr: any;
  advantagesArr: any;
  rulesArr: any;

  showData;
  currentVals: any;

  KEY_ADV = CONSTANT.KEY_FILTER.KEY_ADV;
  KEY_AME = CONSTANT.KEY_FILTER.KEY_AME;
  KEY_RULES = CONSTANT.KEY_FILTER.KEY_RULES;

  ngOnInit() {
    this.initVals();
  }

  broadcastValue() {
    this.getNewListingForm.emit(this.currentVals);
  }

  initVals() {
    this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
    console.log("this.showData 333333333", this.showData);
    this.currentVals = {
      advantages: this.getArrFromJSON(this.showData[CONSTANT.KEY_FILTER.KEY_SPACE_ADV]),
      amenities: this.getArrFromJSON(this.showData[CONSTANT.KEY_FILTER.KEY_SPACE_AME]),
      limitations: this.getArrFromJSON(this.showData[CONSTANT.KEY_FILTER.KEY_SPACE_RULES]),
    }
    this.amenitiesArr = this.applySelecting(
      this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.AMENITIES],
      this.currentVals[CONSTANT.SERVER.TYPE_QUERY.AMENITIES]
    );

    this.advantagesArr = this.applySelecting(
      this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES],
      this.currentVals[CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES]
    );

    this.rulesArr = this.applySelecting(
      this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.RULES],
      this.currentVals[CONSTANT.SERVER.TYPE_QUERY.RULES]
    );
    this.broadcastValue();
  }

  // kiem tra xem gia tri trong valArrs co ton tai trong arr thi arr.selecting = true;
  applySelecting(arr, valArrs) {
    valArrs = this.getArrFromJSON(valArrs);
    arr = _.cloneDeep(arr) || [];
    if (_.isArray(valArrs) && valArrs.length > 0) {
      let tempVal;
      let index;
      for (let i in valArrs) {
        tempVal = valArrs[i];
        index = _.findIndex(arr, {
          id: parseInt(tempVal)
        })
        if (index > -1 && arr[index]) {
          arr[index].selecting = true;
        }
      }
    }
    return arr;
  }

  // nhan vao mot chuoi json va chuyen thanh mang
  getArrFromJSON(jsonStr) {
    let jsonString = _.clone(jsonStr);
    let val = [];
    if (jsonString) {
      if (_.isArray(jsonString)) {
        return jsonString;
      }
      try {
        val = JSON.parse(jsonString) || [];
      } catch (e) {}
    }
    return val;
  }

  hasChange(e, type, item) {
    this.currentVals[type] = this.addOrRemove(this.currentVals[type], item);
    this.broadcastValue();
  }

  addOrRemove(arr, item) {
    arr = arr || [];
    let index = this.checkExist(arr, item);
    if (!index && index !== 0) {
      arr.push(item.id + '');
    } else {
      arr.splice(index, 1);
    }
    return arr;
  }

  checkExist(arr, item) {
    if (_.isArray(arr)) {
      let index = arr.indexOf(item.id + '');
      if (index > -1) {
        return index;
      }
    }
    return false;
  }
}
