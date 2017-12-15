import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as _ from 'lodash';

import { HomeDetail } from '../../pages/home-detail/home-detail';
import { AnywhereService } from '../../services/anywhere.service';

const DEFAULT_OPTIONS = {
  PRICE_SHOWN: true,
  PAGENUM_SHOWN: false,
  FAVOURITE_SHOWN: true,
  VERIFY_SHOWN: true,
  AUTO_PLAY: true,
  VISIBLE_ONLY_FIRST_PAGE: false,
  AVATAR_SHOWN: true
};

@Component({
  selector: 'image-card-small',
  templateUrl: './image-card-small.html'
})
export class ImageCardSmall {
  @Input()
  cardData;

  isLogin: boolean;
  km: number;
  showKm: boolean;

  defaultOpts = _.clone(DEFAULT_OPTIONS);

  constructor(
    public navController: NavController,
    private anywhereService: AnywhereService
  ) {}

  goToDetail(rentingId) {
    let params = {
      id: rentingId
    };
    console.log("rentingIdrentingId", rentingId);
    this.navController.push(HomeDetail, {
      params: params
    });
  }

  ngOnInit() {
    this.cardData.fullImageUrl =
      this.anywhereService.getFullImgUrl(
        this.cardData.image_default, 'space'
      );
    this.cardData.fullAvatarUrl = this.anywhereService.getFullImgUrl(
      this.cardData.renting.user.picture, 'user'
    );
  }
}
