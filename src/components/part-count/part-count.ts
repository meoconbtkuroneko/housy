import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'part-count',
  templateUrl: './part-count.html'
})
export class PartCount {
  @Input()
  showData;
  constructor() {}

  ngOnChanges(changes) {
    if (this.showData) {
      this.showData.viewCount = this.cutLongNumber(this.showData.viewCount);
      this.showData.likeCount = this.cutLongNumber(this.showData.likeCount);
    }
  }

  arrUnit = [{
    val: 1000000000,
    name: 'T'
  }, {
    val: 1000000,
    name: 'Tr'
  }, {
    val: 1000,
    name: 'k'
  }];

  cutLongNumber(numVal) {
    let result = numVal;
    console.log("cutLongNumber numValnumVal", numVal);
    if (!_.isNumber(numVal) || numVal < this.arrUnit[this.arrUnit.length - 1].val) {
      return result;
    };

    for (let i in this.arrUnit) {
      if (numVal < this.arrUnit[i].val) continue;
      result = (numVal / this.arrUnit[i].val).toFixed(1) +
        ' ' + this.arrUnit[i].name;
      result = result.replace('.0 ', ' ');
      console.log("iiiiiiiiiiiiiiiiiiiiiiiii", result);
      return result;
    }
    return result;
  }
}
