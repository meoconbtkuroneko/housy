import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AnywhereService } from '../../services/anywhere.service';
import { ApartmentDetail } from '../../pages/apartment-detail/apartment-detail';

@Component({
  selector: 'image-card-apartment',
  templateUrl: './image-card-apartment.html'
})
export class ImageCardApartment {
  @Input()
  cardData;

  km: number;

  constructor(
    private anywhereService: AnywhereService,
    public navController: NavController,
  ) {}

  goToDetail(id) {
    let params = {
      id: id
    };
    console.log("idid", id);
    this.navController.push(ApartmentDetail, {
      params: params
    });
  };

  ngOnInit() {
    this.km = this.anywhereService.calDistance(
      this.cardData.latitude,
      this.cardData.longitude
    );
  };
}
