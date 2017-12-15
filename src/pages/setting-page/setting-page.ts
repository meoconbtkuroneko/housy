import { Component } from '@angular/core';
import {
  ViewController,
  Events,
} from 'ionic-angular';

import { DeleteService } from '../../providers/delete.service';
import { PutService } from '../../providers/put.service';
import { CONSTANT } from '../../providers/constant.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { UserStorageService } from '../../providers/user-storage.service';
import { HistoryService } from '../../providers/history.service';
import { UserSetting } from '../../templates/user-setting';
import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

import * as _ from 'lodash';
@Component({
  selector: 'setting-page',
  templateUrl: 'setting-page.html'
})
export class SettingPage extends CoreSimpleClass {
  constructor(
    private viewController: ViewController,
    private deleteService: DeleteService,
    private putService: PutService,
    private anywhereService: AnywhereService,
    private userStorageService: UserStorageService,
    private historyService: HistoryService,
    public coreServices: CoreServices,
    public events: Events,
  ) {
    super(coreServices);
    this.currentSetting = _.cloneDeep(this.userStorageService.getSetting());
  };

  currentSetting: UserSetting;

  clearHistories() {
    if (!this.canGo()) {
      return;
    }
    this.toggleIsProcessing(true);
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

  finishLoading(message ? ) {
    this.toggleIsProcessing(false);
    if (message) {
      this.anywhereService.showToast(message);
    }
  }

  toggleVal(valName) {
    this.currentSetting[valName] = !this.currentSetting[valName];
  }

  ionViewWillLeave() {
    if (!this.canGo()) {
      return;
    }
    let hasChange: boolean;
    let oldVal = this.userStorageService.getSetting();
    for (let key in oldVal) {
      if (oldVal[key] !== this.currentSetting[key]) {
        hasChange = true;
        break;
      }
    }

    if (hasChange) {
      this.events.publish(CONSTANT.EVENTS_NAME.SETTING_CHANGED);
      this.putService.updateProfile(this.currentSetting)
        .then((res: any) => {
          if (res.reason == CONSTANT.REASONS.ER_OK) {
            this.userStorageService.setSetting(this.currentSetting);
          }
        })
    }
  }

  closeModal() {
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
