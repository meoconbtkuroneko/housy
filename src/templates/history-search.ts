import * as _ from 'lodash';
import { CONSTANT } from '../services/constant.service';

export class HistorySearch {
  name: string;
  place_id: string;
  location: any = {};
  constructor(name, lat, lng, place_id ? , moreParams ? : any) {
    this.name = name;
    this.location.lat = lat;
    this.location.lng = lng;
    this.place_id = place_id;
  }
}

export const POPULAR_SEARCHS = getPopularSearch();

export function getPopularSearch() {
  let rsArr = [];
  for (let i in CONSTANT.LIST_DISTRICTS) {
    let item = _.cloneDeep(CONSTANT.LIST_DISTRICTS[i]);
    rsArr.push(new HistorySearch(
      item.name,
      item.lat,
      item.lng
    ))
  }
  return rsArr;
}
