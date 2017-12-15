import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoadingController } from 'ionic-angular';

import { CONSTANT } from './constant.service';

@Injectable()
export class LoadingService {
  constructor(
    public loadingController: LoadingController
  ) {
    this.createLoading();
    this.subscribeLoading();
  }

  LOADING = new BehaviorSubject(false);

  broadcastChange(data: boolean) {
    this.LOADING.next(data);
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

  toggleLoading(res) {
    if (!this.loader) {
      this.createLoading();
    }
    res ?
      this.loader.present() :
      this.loader.dismiss();

    this.loader.onDidDismiss(() => {
      this.loader = undefined;
    });

  }

  subscribeLoading() {
    this.LOADING
      .subscribe(res => {
        this.toggleLoading(res);
      })
  }
}
