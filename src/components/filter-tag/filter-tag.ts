import {
  Component,
  Input
} from '@angular/core';

import { CONSTANT } from '../../providers/constant.service'
import { HousyService } from '../../providers/housy.service'
import { CommonService } from '../../providers/common.service'

import * as _ from 'lodash';

@Component({
  selector: 'filter-tag',
  templateUrl: './filter-tag.html'
})
export class FilterTag {
  constructor(
    private housyService: HousyService,
    private commonService: CommonService,
  ) {}

  @Input()
  currentFilter;

  showData: any = [];

  addIdsArrToShowData(type, idsArr) {
    let currentArr = this.commonService.idsToObjs(type, idsArr, 'name');
    this.showData = _.union(this.showData, currentArr);
  }

  addIdToShowData(type, id) {
    let arr;
    let propName = 'id';
    switch (type) {
      case CONSTANT.KEY_FILTER.KEY_PRICE_MIN:
        {
          arr = _.cloneDeep(CONSTANT.PRICE_ARRAY);
          propName = 'minVal';
          break;
        }
      case CONSTANT.KEY_FILTER.KEY_RADIUS:
        {
          arr = _.cloneDeep(CONSTANT.RADIUS_ARR);
          break;
        }
    }
    id = parseInt(id);

    let currentObj = _.find(arr, (obj) => {
      return obj[propName] === id
    });


    if (currentObj) {
      this.showData = _.union(this.showData, [currentObj.name]);
    }
  }

  ngOnChanges(changes) {
    this.showData = [];
    let rs;
    let val;
    for (let key in this.currentFilter) {
      rs = undefined;
      val = this.currentFilter[key];
      switch (key) {
        case CONSTANT.KEY_FILTER.KEY_HT:
        case CONSTANT.KEY_FILTER.KEY_ADV:
        case CONSTANT.KEY_FILTER.KEY_AME:
          {
            this.addIdsArrToShowData(key, val);
            break;
          }
        case CONSTANT.KEY_FILTER.KEY_PRICE_MIN:
        case CONSTANT.KEY_FILTER.KEY_RADIUS:
          {
            this.addIdToShowData(key, val);
            break;
          }
        case CONSTANT.KEY_FILTER.KEY_IS_VERIFIED:
          {
            if (val) {
              rs = 'Xác thực';
            }
            break;
          }
      }
      if (rs) {
        this.showData = _.union(this.showData, [rs]);
      }
    }
    if (this.showData.length === 1 &&
      this.showData[0] === CONSTANT.RADIUS_ARR[0].name) {
      this.showData = [];
    }
  }
}
