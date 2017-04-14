import {
  Component,
  Input
} from '@angular/core';

import {
  NavController
} from 'ionic-angular';

import * as _ from 'lodash';
import { LocationDetailPage } from '../../pages/location-detail-page/location-detail-page';
import { TypeData, TYPE_DATA } from '../../templates/type-data';

@Component({
  selector: 'part-location',
  templateUrl: './part-location.html'
})
export class PartLocation {
  @Input()
  showData;
  constructor(
    private navController: NavController
  ) {}

  type;

  ngOnChanges(changes) {
    if (this.showData) {
      let tempVal: TypeData;
      for (let i in TYPE_DATA) {
        tempVal = TYPE_DATA[i];
        if (_.hasIn(this.showData, tempVal.keyword)) {
          this.type = tempVal.id;
          break;
        }
      }
    }
  }

  goToLocation(showDirection ? : boolean) {
    this.navController.push(LocationDetailPage, {
      params: {
        data: this.showData,
        showDirection: showDirection,
        type: this.type,
      }
    });
  }
  showDirectionClicked(e) {
    e.stopPropagation();
    this.goToLocation(true);
  }
}
