import {
  Component,
  Input,
} from '@angular/core';

import {
  NavController,
} from 'ionic-angular';
// import * as _ from 'lodash';

import { AnywhereService } from "../../providers/anywhere.service";
import { UserStorageService } from "../../providers/user-storage.service";
import { HostProfile } from "../../pages/host-profile/host-profile"
import { NoInternetService } from '../../providers/no-internet.service';

@Component({
  selector: 'review-card',
  templateUrl: './review-card.component.html'
})
export class ReviewCardComponent {
  @Input() reviewData;
  @Input() options;
  @Input() apartmentInfo;

  defaultOpts = {
    SHORT_PASSAGE: false
  };

  canEditReview;
  review;

  constructor(
    public navCtrl: NavController,
    private AnywhereService: AnywhereService,
    private UserStorageService: UserStorageService,
    public noInternetService: NoInternetService,
  ) {}

  ngOnChanges() {
    this.loadData();
  }

  loadData() {
    //   _.extend(this.defaultOpts, this.options);
    this.review = this.reviewData;

    // Check if this review is owner's and less than 5 minutes to edit
    if (this.review.user.id == this.UserStorageService.getProp('userInfo').id) {
      this.canEditReview = this.AnywhereService.checkLessThanFiveMinutes(this.review.created_time);
      console.log("++++++++++++++ this.canEditReview", this.canEditReview)
    }
  }

  goHostProfile() {
    // if (!this.noInternetService.hasInternet) {
    //   console.log("k co internet");
    //   return;
    // }
    this.navCtrl.push(HostProfile, {
      params: {
        id: this.review.user.id
      }
    });
  }

}
