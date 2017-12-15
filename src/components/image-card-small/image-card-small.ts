import { Component } from '@angular/core';
import {
  NavController,
  Events,
} from 'ionic-angular';

import { RecentViewService } from '../../providers/recent-view.service';
import { CONSTANT } from '../../providers/constant.service';

import { ImageCard } from '../../components/image-card/image-card';
import {
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'image-card-small',
  templateUrl: './image-card-small.html'
})
export class ImageCardSmall extends ImageCard {
  constructor(
    public navController: NavController,
    public recentViewService: RecentViewService,
    public coreServices: CoreServices,
    public events: Events,
  ) {
    super(coreServices, navController, recentViewService);
  }

  ngOnInit() {
    this.cardData.fullImageUrl =
      this.coreServices.anywhereService.getFullImgUrl(
        this.cardData.image_default, 'space'
      );
    this.cardData.fullAvatarUrl = this.coreServices.anywhereService.getFullImgUrl(
      this.cardData.renting.user.picture, 'user'
    );
  }

  goToDetail() {
    super.goToDetail(CONSTANT.DETAIL_TYPE.SPACE, (id) => {
      this.events.publish(CONSTANT.EVENTS_NAME.GO_TO_DETAIL, id);
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
