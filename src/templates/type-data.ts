import * as _ from 'lodash';
import { CONSTANT } from '../services/constant.service';

export class TypeData {
  keyword: string;
  id: string;
  constructor(id, keyword) {
    this.id = id;
    this.keyword = keyword;
  }
}

export function getTypeData() {
  let rsArr = [];
  for (let i in CONSTANT.TYPE_DATA) {
    let item = _.cloneDeep(CONSTANT.TYPE_DATA[i]);
    rsArr.push(new TypeData(
      item.id,
      item.keyword,
    ))
  }
  return rsArr;
}

export const TYPE_DATA = getTypeData();
