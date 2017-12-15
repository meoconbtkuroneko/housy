import {
  Component,
  Input,
} from '@angular/core';

import { ChooseAddress } from '../../pages/choose-address/choose-address';

import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: "open-map-address-button",
  templateUrl: "./open-map-address-button.html"
})
export class OpenMapAddressButton extends CoreSimpleClass {
  constructor(
    public coreServices: CoreServices,
  ) {
    super(coreServices);
    this.checkShowNoInternet();
  }
  @Input() addressObj;

  mapUrl;
  showNoInternet: boolean;

  ngOnChanges(changes) {
    console.log("OpenMapAddressButton changes", changes);
    if (this.addressObj && this.addressObj.location) {
      this.mapUrl = this.coreServices.commonService.getMapPictureUrl(
        this.addressObj.location.lat,
        this.addressObj.location.lng
      );
      console.log("this.mapUrl", this.mapUrl);
    }
  }

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

  openMap(e ? ) {
    if (e) {
      e.stopPropagation();
    }
    if (this.isProcessing) {
      return;
    }
    this.toggleIsProcessing(true);
    this.coreServices.anywhereService.showModal(ChooseAddress, this.addressObj);
    this.toggleIsProcessing(false);
  }
}
