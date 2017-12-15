import { Component, Input } from '@angular/core';
import { CONSTANT } from '../../providers/constant.service';

import * as _ from 'lodash';

@Component({
  selector: 'part-utilities',
  templateUrl: './part-utilities.html'
})
export class PartUtilities {
  @Input()
  showData;

  @Input()
  type;

  utilities;
  constructor() {}

  ngOnChanges(changes) {
    if (!this.showData) {
      return;
    }
    this.initUltilities();
    this.addStateToUltilities();
  }

  initUltilities() {
    if (this.utilities) {
      return;
    }

    if (this.type == 'neighborhood') {
      this.utilities = CONSTANT.NEIGHBORHOOD_UTIILITES;
    } else {
      this.utilities = CONSTANT.APARTMENT_UTIILITES;
    }
  }

  addStateToUltilities() {
    try {
      this.showData.utilities = JSON.parse(this.showData.utilities);
    } catch (e) {}

    if (!_.isArray(this.showData.utilities)) {
      return;
    }

    _.forEach(this.utilities, (value, key) => {
      console.log("this.utilities aaa", value, key);
      if (this.exists(value.id))
        value.state = value.id;
      else
        value.state = -value.id;
    });
  }

  exists(id) {
    return this.showData.utilities.indexOf(id) > -1;
  };
}
