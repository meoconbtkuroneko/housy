import * as _ from 'lodash';
export class ItemSpace {
  id;
  data: any
  constructor(id ? , data ? ) {
    this.id = _.clone(id);
    this.data = _.cloneDeep(data);
  }
}
