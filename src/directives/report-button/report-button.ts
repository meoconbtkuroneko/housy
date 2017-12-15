import {
  Component,
  Input,
} from '@angular/core';
import {
  NavController,
} from 'ionic-angular';

import * as _ from 'lodash';

import { AnywhereService } from '../../services/anywhere.service';
import { LoginPage } from '../../pages/login-page/login-page';
import { CONSTANT } from '../../services/constant.service';
import { ReportPage } from '../../pages/report-page/report-page';

@Component({
  selector: "report-button",
  templateUrl: "./report-button.html"
})
export class ReportButton {
  constructor(
    private navController: NavController,
    private anywhereService: AnywhereService,
  ) {}

  @Input()
  data;

  @Input()
  type;

  reportButtonClicked(e) {
    e.stopPropagation();
    if (this.anywhereService.USER.logined) {
      this.anywhereService.showModal(ReportPage, {
        type: this.type,
        data: this.data
      });
    } else {
      this.anywhereService.showModal(LoginPage);
    }
  }
}
