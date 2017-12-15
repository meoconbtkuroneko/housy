import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { LoginPage } from '../../pages/login-page/login-page';
import { AnywhereService } from '../../services/anywhere.service';


@Component({
  selector: "not-login",
  templateUrl: "./not-login.html"
})
export class NotLogin implements OnChanges {
  @Input()
  showNow;

  constructor(
    private anywhereService: AnywhereService,
  ) {}

  ngOnChanges() {
    if (this.showNow) {
      this.showLogin();
    }
  }

  showLogin() {
    if (!this.anywhereService.USER.logined) {
      this.anywhereService.showModal(LoginPage);
    }
  }
}
