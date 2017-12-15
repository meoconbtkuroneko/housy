import {
  Component,
} from '@angular/core';

import {
  NavController,
  ViewController,
} from 'ionic-angular';

import { AnywhereService } from '../../providers/anywhere.service';
import { NewListingService } from '../../providers/new-listing.service';
import { LoadingService } from '../../providers/loading.service';
import { NewListingStep2 } from '../../pages/new-listing-step2/new-listing-step2';
import { CONSTANT } from '../../providers/constant.service';
import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

import * as _ from 'lodash';

@Component({
  selector: "new-listing-step1",
  templateUrl: "./new-listing-step1.html"
})
export class NewListingStep1 extends CoreSimpleClass {
  constructor(
    private anywhereService: AnywhereService,
    private navController: NavController,
    private newListingService: NewListingService,
    public coreServices: CoreServices,
    public loadingService: LoadingService,
    public viewController: ViewController,
  ) {
    super(coreServices);
  }

  isProcessing: boolean;

  canSend: boolean;
  newListingForm;

  rentingId;
  showData;
  initSpaceData: any;

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('hide');
    // this.viewController.setBackButtonText(CONSTANT.STRING_SAVE);
  };

  ngOnInit() {
    this.resetNewListingService();
  }

  resetNewListingService() {
    this.newListingService.clearNewListingData();
  }

  getNewListingStep1Form(data) {
    // console.log("getNewListingForm", data);
    this.newListingForm = data.form;
    this.canSend = data.canSend;
  }

  nextStep() {
    if (this.isProcessing || !this.canSend) {
      return;
    }
    this.toggleIsProcessing(true);

    this.beforeLeavePage();
    console.log("rentinggggggggggggg idddddddddddd", this.rentingId);
    if (!this.rentingId) {
      this.loadingService.toggleLoading(true);
      this.newListingService.newHouse()
        .then(res => {
          console.log("resresresres", res);
          if (res && res.renting) {
            this.initSpaceData = _.cloneDeep(res);
            this.rentingId = res.renting.id;
            this.handleFinishSave();
          } else {
            this.handleErr(CONSTANT.ERR_GENERAL);
          }
        }, err => {
          this.handleErr(CONSTANT.ERR_GENERAL)
        });
    } else {
      this.handleFinishSave();
    }
  }



  handleErr(err ? ) {
    this.handleFinished();
    console.log("handleErrhandleErrhandleErr", err);
    this.anywhereService.showAlert(err);
  }

  handleFinished() {
    this.toggleIsProcessing(false);
    this.loadingService.toggleLoading(false);
  }

  beforeLeavePage() {
    this.newListingService.setNewListingData(this.newListingForm.value);
  }

  handleFinishSave() {
    this.handleFinished();
    this.navController.push(NewListingStep2);
  }

  backButtonClicked() {
    this.beforeLeavePage();
    let isSame = this.anywhereService.compareObj(this.initSpaceData, this.newListingService.NEW_LISTING_DATA);
    if (isSame || !this.rentingId) {
      return this.doGoBack();
    }
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
