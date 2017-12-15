import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApartmentDetail } from '../../pages/apartment-detail/apartment-detail';
import { ImageCard } from '../../components/image-card/image-card';
import { RecentViewService } from '../../providers/recent-view.service';
import { CONSTANT } from '../../providers/constant.service';

import {
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'image-card-apartment',
  templateUrl: './image-card-apartment.html'
})
export class ImageCardApartment extends ImageCard {
  constructor(
    public coreServices: CoreServices,
    public navController: NavController,
    public recentViewService: RecentViewService,
  ) {
    super(coreServices, navController, recentViewService);
  }

  goToDetail() {
    let type = CONSTANT.DETAIL_TYPE.APARTMENT;
    super.goToDetail(type);

    let id = this.cardData && this.cardData.id;

    if (id) {
      console.log("idid", id);
      let params = {
        id: id,
      }

      this.navController.push(ApartmentDetail, {
        params: params
      });
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
