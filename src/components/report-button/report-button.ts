import {
  Component,
  Input,
} from '@angular/core';

import { ReportService } from '../../providers/report.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';

import {
  ClickNeedShowLoginClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: "report-button",
  templateUrl: "./report-button.html"
})
export class ReportButton extends ClickNeedShowLoginClass {
  constructor(
    coreServices: CoreServices,
    private anywhereService: AnywhereService,
    private reportService: ReportService,
  ) {
    super(coreServices);
    this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.REPORT;
  }

  @Input()
  data;

  @Input()
  type;

  reportButtonClicked(e) {
    e.stopPropagation();

    this.checkHasLogined(this.callbackType, () => {
      this.setReportData();
      this.showReport();
    }, () => {
      this.setReportData();
      this.finishLoading();
    });
  }

  setReportData() {
    this.reportService.setReportData(this.type, this.data);
  }

  showReport() {
    this.reportService.showReport();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
