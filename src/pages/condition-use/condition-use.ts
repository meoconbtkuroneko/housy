import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AnywhereService } from '../../providers/anywhere.service';

@Component({
  selector: 'condition-use',
  templateUrl: 'condition-use.html'
})
export class ConditionUse {

  constructor(
    public viewController: ViewController,
    private anywhereService: AnywhereService,
  ) {};

  ngOnInit() {}

  closeModal() {
    this.viewController.dismiss();
  }
}
