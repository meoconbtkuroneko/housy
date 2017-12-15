import {
  Component,
  Input,
} from '@angular/core';

import { CONSTANT } from '../../providers/constant.service';
import { ReportService } from '../../providers/report.service';

import {
  ClickNeedShowLoginClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: "contact-host-button",
  templateUrl: "./contact-host-button.html"
})
export class ContactHostButton extends ClickNeedShowLoginClass {

  @Input()
  data;

  isLogined;

  constructor(
    private reportService: ReportService,
    coreServices: CoreServices,
  ) {
    super(coreServices);
    this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.CONTACT_HOST;
    this.toggleSubscribeUser(true);
  }

  contactHostClicked(e ? ) {
    if (e) {
      e.stopPropagation()
    };
    this.checkHasLogined(this.callbackType, () => {
      this.contactHost();
    });
  }

  private contactHost() {
    let contactData = {
      timeContact: new Date().getTime(),
      rentingId: this.data.renting.id,
      hostInfo: this.data.renting.user,
    }

    this.reportService.setContactHostInfo(contactData);
  }

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
    super.ngOnDestroy();
  }
}
