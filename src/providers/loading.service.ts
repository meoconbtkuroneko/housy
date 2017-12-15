import { Injectable } from '@angular/core';
import {
  LoadingController,
  Events,
} from 'ionic-angular';

import { CONSTANT } from './constant.service';

@Injectable()
export class LoadingService {
  constructor(
    public loadingController: LoadingController,
    public events: Events,
  ) {
    this.createLoading();
  }

  loader;

  createLoading(duration ? ) {
    this.loader = this.loadingController.create({
      duration: duration || 6000000,
      dismissOnPageChange: true,
      content: CONSTANT.WAITING,
      cssClass: 'loading-class'
    });
  }

  toggleLoading(showLoading: boolean) {
    if (!this.loader) {
      this.createLoading();
    }
    showLoading ?
      this.loader.present() :
      this.loader.dismiss();

    this.loader.onDidDismiss(() => {
      this.loader = undefined;
    });

  }
}
