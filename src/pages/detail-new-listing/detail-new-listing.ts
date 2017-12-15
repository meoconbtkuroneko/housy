import {
  Component,
} from '@angular/core';

import {
  NavController,
  NavParams,
} from 'ionic-angular';

import { AnywhereService } from '../../providers/anywhere.service';
import { NewListingService } from '../../providers/new-listing.service';
import { CONSTANT } from '../../providers/constant.service';
import { ChooseAddress } from '../../pages/choose-address/choose-address';
import { UserStorageService } from '../../providers/user-storage.service';
import { GetService } from '../../providers/get.service';

import * as _ from 'lodash';

@Component({
  selector: "detail-new-listing",
  templateUrl: "./detail-new-listing.html"
})
export class DetailNewListing {
  constructor(
    private anywhereService: AnywhereService,
    private navController: NavController,
    private newListingService: NewListingService,
    private getService: GetService,
    private userStorageService: UserStorageService,
    private navParams: NavParams,
  ) {}

  isProcessing: boolean;

  loading: boolean = true;

  canSend;
  newListingForm1;
  newListingForm2;
  newListingForm3;

  rentingId;
  showData;

  canSendForm1;
  canSendForm2;
  canSendForm3;
  canSendImages;

  currentVals: any;

  stringCancel = CONSTANT.STRING_CANCEL;
  stringOk = CONSTANT.STRING_SELECT;

  KEY_ADV = CONSTANT.KEY_FILTER.KEY_ADV;
  KEY_AME = CONSTANT.KEY_FILTER.KEY_AME;
  KEY_RULES = CONSTANT.KEY_FILTER.KEY_RULES;

  params;
  refresher;
  initSpaceData: any;

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('hide');
  };

  ngOnInit() {
    this.resetNewListingService();
    this.params = this.navParams.get('params');
    this.getDetail();
  }

  resetNewListingService() {
    this.newListingService.clearNewListingData();
  }

  private getDetail() {
    this.getService.getHouseDetail(this.params.id)
      .then((res: any) => {
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          this.newListingService.setNewListingData(res.space);
          console.log("this.dataaaaaaaaaaaaaaa", this.newListingService.NEW_LISTING_DATA);
          this.finishLoading();
        } else {
          this.handleNotOK();
        }
      }, err => {
        this.handleErr(err);
      })
  }

  finishLoading() {
    if (this.refresher) {
      this.refresher.complete();
      this.refresher = undefined;
    }
    this.loading = undefined;
  }

  handleNotOK() {
    console.log("co van de roiiiiiiii");
    this.finishLoading();
  }

  handleErr(err ? ) {
    console.log("loi roi nhe", err);
    this.finishLoading();
  }

  getNewListingStep1Form(data) {
    // console.log("getNewListingStep1Form", data);
    this.newListingForm1 = data.form;
    this.canSendForm1 = data.canSend;
    this.checkCanSend();
  }

  getNewListingStep2Form(data) {
    // console.log("getNewListingStep2Form", data);
    this.newListingForm2 = data.form;
    this.canSendForm2 = data.canSend;
    this.checkCanSend();
  }

  getNewListingImagePicker(data) {
    console.log("getNewListingImagePicker", data);
    this.canSendImages = data.canSend;
    this.checkCanSend();
  }

  getNewListingStep3Form(data) {
    // console.log("getNewListingStep3Form", data);
    this.newListingForm3 = data.form;
    this.canSendForm3 = data.canSend;
    this.checkCanSend();
  }

  getNewListingAdv(data) {
    // console.log("getNewListingAdv", data);
    this.currentVals = data;
  }

  checkCanSend() {
    if (this.canSendForm1 &&
      this.canSendForm2 &&
      this.canSendForm3 &&
      this.canSendImages) {
      this.canSend = true;
    } else {
      this.canSend = false;
    }
  }

  beforeLeavePage() {
    this.newListingService.setNewListingData(this.newListingForm1.value);
    this.newListingService.setNewListingData(this.newListingForm2.value);
    this.beforeLeavePage3();
  }

  beforeLeavePage3() {
    let tempVal: any = {};
    tempVal = _.assignIn(tempVal, this.newListingForm3.value);
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
  }

  doSaveToServer() {
    this.newListingService.saveToServer(CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_PENDING);
  }

  openMap() {
    this.navController.push(ChooseAddress);
  }

  backButtonClicked() {
    this.beforeLeavePage();
    // let isSame = this.anywhereService.compareObj(this.initSpaceData, this.newListingService.NEW_LISTING_DATA);
    // if (isSame || !this.rentingId) {
    //   return this.doGoBack();
    // }
    this.anywhereService.showConfirm(CONSTANT.TITLE_HOUSY, CONSTANT.QUESTION_SAVE, () => {
      this.newListingService.saveToServer();
      this.doGoBack();
    }, () => {
      this.doGoBack();
    })
  }

  doGoBack() {
    this.navController.popToRoot();
  }
}
