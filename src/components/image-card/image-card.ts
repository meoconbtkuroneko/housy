import {
  Component,
  Input
} from '@angular/core';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition
// } from '@angular/animations';

import { NavController } from 'ionic-angular';
import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

import * as _ from 'lodash';

import { HomeDetail } from '../../pages/home-detail/home-detail';
import { ItemSpace } from '../../templates/item-space';
import { RecentViewService } from '../../providers/recent-view.service';
import { CONSTANT } from '../../providers/constant.service';

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
  selector: 'image-card',
  templateUrl: './image-card.html',
  // animations: [
  //   trigger('cardAnimation', [
  //     // state('active', style({ height: '*' })),
  //     // state('inactive', style({ height: 50 })),
  //     transition('void => *', [
  //       style({ height: 0 }),
  //       animate(250, style({ height: '*' }))
  //     ]),
  //     transition('* => void', [
  //       style({ height: '*' }),
  //       animate(250, style({ height: 0 }))
  //     ])
  //   ])
  // ],
})
export class ImageCard extends CoreSimpleClass {
  @Input()
  cardData;

  km: number;

  state: string = 'active';

  toggleMove() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');

    if (this.state === 'inactive') {
      setTimeout(() => {
        this.toggleMove();
      }, 1000);
    }
  }

  defaultOpts = _.clone(DEFAULT_OPTIONS);

  constructor(
    public coreServices: CoreServices,
    public navController: NavController,
    public recentViewService: RecentViewService,
  ) {
    super(coreServices);
  }

  ngOnChanges(changes) {
    if (this.km) {
      return;
    }
    this.initVals();
  }

  initVals() {
    this.km = this.coreServices.anywhereService.calDistance(
      this.cardData.latitude,
      this.cardData.longitude
    );
  }

  goToDetail(type, callback ? ) {
    // this.toggleMove();
    let id;
    if (type === CONSTANT.DETAIL_TYPE.SPACE) {
      id = this.cardData &&
        this.cardData.renting &&
        this.cardData.renting.id;

      if (id) {
        let tempData = new ItemSpace(id, this.cardData);
        this.recentViewService.addHouseToRecentViews(tempData);
        console.log("idid", tempData.id);

        let params = {
          id: id,
        }

        if (callback) {
          callback(id);
        }

        this.navController.push(HomeDetail, {
          params: params
        });
      }
      return;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
