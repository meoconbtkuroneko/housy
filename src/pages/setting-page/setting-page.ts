import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { DeleteService } from '../../services/delete.service';
import { PutService } from '../../services/put.service';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
import { UserStorageService } from '../../services/user-storage.service';
import { HistoryService } from '../../services/history.service';
import { UserSetting } from '../../templates/user-setting';

import * as _ from 'lodash';
@Component({
  selector: 'setting-page',
  templateUrl: 'setting-page.html'
})
export class SettingPage {

  constructor(
    private viewController: ViewController,
    private deleteService: DeleteService,
    private putService: PutService,
    private anywhereService: AnywhereService,
    private userStorageService: UserStorageService,
    private historyService: HistoryService,
  ) {};
  currentSetting: UserSetting;

  isProcessing: boolean = false;

  ngOnInit() {
    this.userStorageService
      .subscribeUser(res => {
        this.currentSetting = _.cloneDeep(this.userStorageService.getSetting());
      });
  }

  clearHistories() {
    if (!this.isProcessing) {
      this.isProcessing = true;
      this.historyService.clearHistories();
      this.deleteService.deleteRecentSearch()
        .then((res: any) => {
          console.log("deleteService.deleteRecentSearch", res);
          if (res.reason == CONSTANT.REASONS.ER_OK) {
            this.finishLoading(CONSTANT.HISTORY.SUCCESS);
          } else {
            this.finishLoading(CONSTANT.HISTORY.ERR);
          }
        }, err => {
          this.finishLoading(CONSTANT.HISTORY.ERR);
        })
    }
  }

  finishLoading(message ? ) {
    this.isProcessing = false;
    if (message) {
      this.anywhereService.showToast(message);
    }
  }
  closeModal() {
    let hasChange: boolean;
    let oldVal = this.userStorageService.getSetting();
    for (let key in oldVal) {
      if (oldVal[key] !== this.currentSetting[key]) {
        hasChange = true;
        break;
      }
    }
    if (hasChange) {
      this.putService.updateProfile(this.currentSetting)
        .then((res: any) => {
          if (res.reason == CONSTANT.REASONS.ER_OK) {
            this.userStorageService.setSetting(this.currentSetting);
          }
        })
    }
    this.viewController.dismiss(hasChange);
  }
}
