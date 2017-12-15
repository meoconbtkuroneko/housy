import {
  Component,
} from '@angular/core';

import {
  NavController,
  ViewController,
} from 'ionic-angular';

import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { NewListingService } from '../../providers/new-listing.service';
import { NewListingStep3 } from '../../pages/new-listing-step3/new-listing-step3';
import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: "new-listing-step2",
  templateUrl: "./new-listing-step2.html"
})
export class NewListingStep2 extends CoreSimpleClass {
  constructor(
    private anywhereService: AnywhereService,
    private navController: NavController,
    private newListingService: NewListingService,
    private viewController: ViewController,
    public coreServices: CoreServices,
  ) {
    super(coreServices);
  }

  newListingForm;

  canSend: boolean;
  canSendForm: boolean;
  canSendImages: boolean;

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('hide');
    this.viewController.setBackButtonText(CONSTANT.STRING_SAVE);
  };

  getNewListingStep2Form(data) {
    console.log("getNewListingStep2Form", data);
    this.newListingForm = data.form;
    this.canSendForm = data.canSend;
    this.checkCanSend();
  }

  getNewListingImagePicker(data) {
    this.canSendImages = data.canSend;
    this.checkCanSend();
  }

  beforeLeavePage() {
    this.newListingService.setNewListingData(this.newListingForm.value);
  }

  nextStep() {
    console.log("this.newListingForm", this.canSend, this.newListingForm);
    if (this.canSend) {
      // this.beforeLeavePage();
      this.navController.push(NewListingStep3);
    }
  }

  previousStep() {
    console.log("this.newListingForm", this.newListingForm.value, this.newListingForm);
    // this.beforeLeavePage();
    this.viewController.dismiss();
  }

  checkCanSend() {
    if (this.canSendForm &&
      this.canSendImages) {
      this.canSend = true;
    } else {
      this.canSend = false;
    }
    console.log("this.canSend", this.canSend);
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave step2");
    this.beforeLeavePage();
  }
}
