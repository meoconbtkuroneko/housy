import {
  Component,
} from '@angular/core';
import {
  ViewController,
  NavParams,
  Events
} from 'ionic-angular';

import { HousyService } from '../../providers/housy.service'
import { AnywhereService } from '../../providers/anywhere.service'
import { CONSTANT } from '../../providers/constant.service'
import { FilterData } from '../../templates/filter-data'
import * as _ from 'lodash';

@Component({
  selector: 'filter-page',
  templateUrl: './filter-page.html'
})
export class FilterPage {
  constructor(
    private viewController: ViewController,
    private housyService: HousyService,
    private navParams: NavParams,
    private events: Events,
    private anywhereService: AnywhereService,
  ) {
    this.baseFilter = new FilterData();
    this.baseFilter[CONSTANT.KEY_FILTER.KEY_RADIUS] += "";
  }

  radiusArr = CONSTANT.RADIUS_ARR;
  priceArr = CONSTANT.PRICE_ARRAY;

  homeTypeArr: any;
  advantagesArr: any;
  amenitiesArr: any;

  filter: any;
  oldFilter: any;
  currentFilter;

  baseFilter;
  currentPriceId;

  KEY_HT = CONSTANT.KEY_FILTER.KEY_HT;
  KEY_ADV = CONSTANT.KEY_FILTER.KEY_ADV;
  KEY_AME = CONSTANT.KEY_FILTER.KEY_AME;
  KEY_PRICE = CONSTANT.KEY_FILTER.KEY_PRICE;

  initVals(applyCurrentFilter ? ) {
    this.homeTypeArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES]);
    this.advantagesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES]);
    this.amenitiesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.AMENITIES]);
    this.currentFilter = this.navParams.get('params');
    this.oldFilter = this.navParams.get('params') || _.cloneDeep(this.baseFilter);
    this.currentPriceId = undefined;

    if (this.currentFilter && applyCurrentFilter) {
      this.filter = new FilterData(this.currentFilter);
      console.log("this.filterthis.filter", this.filter, this.currentFilter);
      this.homeTypeArr = this.applySelecting(this.homeTypeArr, this.filter[this.KEY_HT])
      this.advantagesArr = this.applySelecting(this.advantagesArr, this.filter[this.KEY_ADV])
      this.amenitiesArr = this.applySelecting(this.amenitiesArr, this.filter[this.KEY_AME])
      this.currentPriceId = this.getPriceId(
        this.filter[CONSTANT.KEY_FILTER.KEY_PRICE_MIN],
        this.filter[CONSTANT.KEY_FILTER.KEY_PRICE_MAX]
      );
    } else {
      this.filter = new FilterData();
      this.filter[CONSTANT.KEY_FILTER.KEY_RADIUS] += "";
    }
  }

  getPriceId(priceMin, priceMax) {
    console.log("getPriceId", priceMin, priceMax);
    let tempVal = _.find(this.priceArr, {
      minVal: priceMin,
      maxVal: priceMax
    });
    console.log("getPriceId tempVal", tempVal);

    if (tempVal) {
      return tempVal.id;
    }
  }

  // kiem tra xem gia tri trong valArrs co ton tai trong arr thi arr.selecting = true;
  applySelecting(arr, valArrs) {
    arr = arr || [];
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
  ngOnInit() {
    this.initVals(true);
  }
  closeModal() {
    this.viewController.dismiss();
  }

  doFilter() {
    console.log("doFilterdoFilter", this.filter, this.oldFilter, this.filter === this.oldFilter)
    if (this.hasFilterChanged()) {
      this.events.publish('filterChanged', this.filter);
    }
    this.closeModal();
  }

  hasFilterChanged() {
    let found: boolean = false;
    for (let i in this.oldFilter) {
      if (_.isArray(this.oldFilter[i])) {
        var tmpS = _.join(this.oldFilter[i].sort(), '');
        var tmpS2 = _.join(this.filter[i].sort(), '');
        if (tmpS != tmpS2) {
          found = true;
          break;
        }
      } else {
        found = !(this.oldFilter[i] == this.filter[i]);
        if (found) break;
      }
    }

    return found;
  }


  hasChange(e, type, item) {
    if (type === this.KEY_PRICE) {
      this.filter[CONSTANT.KEY_FILTER.KEY_PRICE_MIN] = item.minVal;
      this.filter[CONSTANT.KEY_FILTER.KEY_PRICE_MAX] = item.maxVal;
    } else {
      this.filter[type] = this.addOrRemove(this.filter[type], item);
    }
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

  resetFilter() {
    this.initVals();
    this.anywhereService.showToast(CONSTANT.STRING_RESET_FILTER);
  }
}
