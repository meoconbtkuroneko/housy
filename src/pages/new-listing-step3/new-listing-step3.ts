import {
  Component,
} from '@angular/core';

import {
  ViewController,
  NavController
} from 'ionic-angular';

import { HousyService } from '../../providers/housy.service'
import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { NewListingService } from '../../providers/new-listing.service';
import { UserStorageService } from '../../providers/user-storage.service';

import * as _ from 'lodash';

@Component({
  selector: "new-listing-step3",
  templateUrl: "./new-listing-step3.html"
})
export class NewListingStep3 {
  constructor(
    private anywhereService: AnywhereService,
    private housyService: HousyService,
    private newListingService: NewListingService,
    private viewController: ViewController,
    private userStorageService: UserStorageService,
    private navController: NavController,
  ) {}

  newListingForm: any;
  currentVals: any;

  stringCancel = CONSTANT.STRING_CANCEL;
  stringOk = CONSTANT.STRING_SELECT;

  canSend;
  showData;

  formValidation = CONSTANT.FORM_VALIDATION;

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('hide');
    this.viewController.setBackButtonText(CONSTANT.STRING_SAVE);
  };

  getNewListingStep3Form(data) {
    console.log("getNewListingForm", data);
    this.newListingForm = data.form;
    this.canSend = data.canSend;
  }

  getNewListingAdv(data) {
    console.log("getNewListingForm", data);
    this.currentVals = data;
  }

  beforeLeavePage() {
    let tempVal: any = {};
    tempVal = _.assignIn(tempVal, this.newListingForm.value);
    tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_ADV] = JSON.stringify(
      this.currentVals[CONSTANT.KEY_FILTER.KEY_ADV]
    );
    tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_AME] = JSON.stringify(
      this.currentVals[CONSTANT.KEY_FILTER.KEY_AME]);
    tempVal[CONSTANT.KEY_FILTER.KEY_SPACE_RULES] = JSON.stringify(
      this.currentVals[CONSTANT.KEY_FILTER.KEY_RULES]);
    this.newListingService.setNewListingData(tempVal);
  }

  nextStep() {
    this.beforeLeavePage();
    console.log("this.newListingForm", this.newListingForm.value, this.newListingForm);
    let phoneObj = CONSTANT.FORM_VALIDATION.PHONE_NUMBER;
    let phoneNumber = this.anywhereService.USER.userInfo[phoneObj.KEY];

    if (!phoneNumber || (phoneNumber.length < phoneObj.MIN)) {
      this.anywhereService.showPrompt(
        phoneObj.NAME,
        phoneNumber,
        data => {
          console.log("setPhoneNumbersetPhoneNumber", data);
          return this.userStorageService.setPhoneNumber(data);
        })
    }
    if (this.canSend) {
      this.doSaveToServer()
    }
    this.navController.popToRoot();
    console.log("this.navController", this.navController);
  }

  doSaveToServer() {
    this.newListingService.saveToServer(CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_PENDING);
  }

  previousStep() {
    // this.beforeLeavePage();
    this.viewController.dismiss();
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave step3");
    this.beforeLeavePage();
  }
}
