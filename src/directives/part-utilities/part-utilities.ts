import { Component, Input } from '@angular/core';
import { CONSTANT } from '../../services/constant.service';

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

  ngOnInit() {
    if (this.type == 'neighborhood') {
      this.utilities = CONSTANT.NEIGHBORHOOD_UTIILITES;
    } else {
      this.utilities = CONSTANT.APARTMENT_UTIILITES;
    }
  }

  exists(item) {
    return this.showData.utilities.indexOf(item) > -1;
  };
}
