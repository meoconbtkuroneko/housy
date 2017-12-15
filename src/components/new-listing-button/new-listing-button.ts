import {
  Component,
} from '@angular/core';

import { NavController } from 'ionic-angular';
import { NewListingStep1 } from '../../pages/new-listing-step1/new-listing-step1';
import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: "new-listing-button",
  templateUrl: "./new-listing-button.html"
})
export class NewListingButton extends CoreSimpleClass {
  constructor(
    public coreServices: CoreServices,
    public navController: NavController,
  ) {
    super(coreServices);
    this.checkShowNoInternet();
    setTimeout(() => {
      this.newButtonClicked();
    }, 1000);
  }

  showNoInternet: boolean;

  handleSubscribeInternet() {
    if (this.hasInternet === false) {
      this.checkShowNoInternet();
    }
  }

  handleSubscribeReloadInternet() {
    this.checkShowNoInternet();
  }

  checkShowNoInternet() {
    this.showNoInternet = this.hasInternet === false;
  }

  newButtonClicked(e ? ) {
    if (e) {
      e.stopPropagation();
    }
    if (this.isProcessing) {
      return;
    }
    this.toggleIsProcessing(true);
    this.navController.push(NewListingStep1);
    this.toggleIsProcessing(false);
  }
}
