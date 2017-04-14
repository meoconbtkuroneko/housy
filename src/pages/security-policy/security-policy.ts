import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AnywhereService } from '../../services/anywhere.service';

@Component({
  selector: 'security-policy',
  templateUrl: 'security-policy.html'
})
export class SecurityPolicy {

  constructor(
    public viewController: ViewController,
    private anywhereService: AnywhereService,
  ) {};

  ngOnInit() {}

  closeModal() {
    this.viewController.dismiss();
  }
}
