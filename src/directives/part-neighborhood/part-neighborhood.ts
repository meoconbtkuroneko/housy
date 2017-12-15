import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NeighborhoodDetail } from '../../pages/neighborhood-detail/neighborhood-detail';


@Component({
  selector: 'part-neighborhood',
  templateUrl: './part-neighborhood.html'
})
export class PartNeighborhood {
  @Input()
  showData;
  constructor(
    public navController: NavController,
  ) {}

  openDetail() {
    let params = {
      id: this.showData.neighborhood.id,
      info: this.showData.neighborhood
    };
    this.navController.push(NeighborhoodDetail, { params: params });
  }
}
