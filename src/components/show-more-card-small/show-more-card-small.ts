import {
  Component,
} from '@angular/core';

import { Events } from 'ionic-angular';
import { CONSTANT } from '../../providers/constant.service';

@Component({
  selector: 'show-more-card-small',
  templateUrl: './show-more-card-small.html'
})
export class ShowMoreCardSmall {
  constructor(
    public events: Events,
  ) {
    this.toggleSubscribeFinishShowMore(true);
  }

  showSpinner: boolean;

  setShowSpinner(shouldShow: boolean) {
    this.showSpinner = shouldShow;
  }

  toggleSubscribeFinishShowMore(isSubscibe: boolean) {
    if (isSubscibe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.FINISH_SHOW_LOAD_MORE,
        this.handleSubscribeFinishShowMore
      )
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.FINISH_SHOW_LOAD_MORE,
        this.handleSubscribeFinishShowMore
      )
    }
  }

  private handleSubscribeFinishShowMore = () => {
    console.log("handleSubscribeFinishShowMore");
    this.setShowSpinner(false);
  }

  showMoreClicked() {
    if (this.showSpinner) {
      return;
    }
    this.setShowSpinner(true);
    this.events.publish(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED);
  }

  ngOnDestroy() {
    this.toggleSubscribeFinishShowMore(false);
  }
}
