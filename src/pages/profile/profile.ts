import { Component } from '@angular/core';
import {
  ViewController,
  Events,
} from 'ionic-angular';

import * as _ from 'lodash';

import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

import { GetService } from '../../providers/get.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { ProfileService } from '../../providers/profile.service';
import { SelectImages } from '../../components/select-images/select-images';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile extends CoreSimpleClass {
  showData;
  profileForm;
  isProfileUpdating: boolean = this.profileService.isUpdating;

  formErrors;
  initFormValue;
  updatingString;

  constructor(
    private getService: GetService,
    private anywhereService: AnywhereService,
    private viewController: ViewController,
    public coreServices: CoreServices,
    private profileService: ProfileService,
    public events: Events,
  ) {
    super(coreServices);
    this.toggleSubscribeProfileUpdating(true);
    this.isProfileUpdating = this.profileService.isUpdating;
  }

  toggleSubscribeProfileUpdating(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.PROFLE_IS_UPDATING,
        this.handleSubscribeProfileUpdating)
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.PROFLE_IS_UPDATING,
        this.handleSubscribeProfileUpdating)
    }
  }

  private handleSubscribeProfileUpdating = (data) => {
    console.log("handleSubscribeProfileUpdating", data);
    this.isProfileUpdating = data;
    if (!this.showData) {
      this.getDetail();
    }
  }

  ngOnInit() {
    this.getDetail();
  }

  private getDetail() {
    if (this.isProfileUpdating) {
      return this.anywhereService.showToast(CONSTANT.UPDATING);
    }
    this.getService.getProfile()
      .then((res: any) => {
        console.log("lay veeeeeeeeeeeeeeee", res);
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          this.profileService.updateUserData(res.user)
            .then(data => {
              console.log("lay veeeeeeeeeeeeeeee gannnnnnnn", data);
              this.initVals(data);
            });
        } else {
          this.initVals();
        }
      }, err => {
        this.initVals();
      })
  }

  private initVals(res ? ) {
    this.showData = res ? _.cloneDeep(res) : this.anywhereService.USER.userInfo;
    console.log("this.showData", this.showData);
  }

  getProfileFormCore(formData) {
    this.profileForm = formData.form;
    this.formErrors = formData.formErrors;

    if (!this.initFormValue) {
      this.initFormValue = this.compactSendData(this.profileForm.value);
    }
  }

  showSelectImages(type) {
    let selectImagesModal = this.anywhereService.showModal(SelectImages);
    selectImagesModal.onDidDismiss(data => {
      this.handleGetImage(type, data);
    });
  }

  private handleGetImage(type, data) {
    console.log("selectImagesModal onDidDismiss", type, data);
    if (data) {
      this.profileService.setHasChangedImages(type);
      this.showData[type] = data;
    }
  }

  saveButtonClicked() {
    if (!this.canGo()) {
      console.log("k co internete");
      return;
    }
    let saveData = this.beforeLeavePage();
    this.profileService.setSaveData(saveData);
    this.showData = _.assignIn(this.showData, saveData);
    this.profileService.updateUserData(this.showData);
    this.profileService.saveToServer();
    this.closeModal();
  }

  private beforeLeavePage() {
    let tempVals = this.profileForm && this.compactSendData(this.profileForm.value);
    if (JSON.stringify(tempVals) === JSON.stringify(this.initFormValue)) {
      return;
    }
    return tempVals;
  }

  // xoa cac truong k co du lieu trong data 
  // hoac cac truong k hop le so voi formErrors, 
  private compactSendData(data) {
    let tempVals = _.cloneDeep(data);
    for (let key in this.formErrors) {
      if ((this.formErrors[key] && this.formErrors[key] != '') ||
        (!tempVals[key]) || tempVals[key] == '') {
        delete tempVals[key];
      }
    }
    return tempVals;
  }

  closeModal() {
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    this.toggleSubscribeProfileUpdating(false);
    super.ngOnDestroy();
  }
}
