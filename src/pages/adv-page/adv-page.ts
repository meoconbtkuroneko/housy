import { Component } from '@angular/core';
import {
  ViewController,
  NavParams,
} from 'ionic-angular';

import { AnywhereService } from '../../providers/anywhere.service';
import { CommonService } from '../../providers/common.service';

@Component({
  selector: 'adv-page',
  templateUrl: 'adv-page.html'
})
export class AdvPage {

  constructor(
    private viewController: ViewController,
    private anywhereService: AnywhereService,
    private commonService: CommonService,
    private navParams: NavParams,
  ) {};


  ngOnInit() {
    this.initVals();
  }

  showData;

  initVals() {
    this.showData = this.navParams.get('params');
    console.log("this.advantagesArr", this.showData);
  }


  closeModal() {
    this.viewController.dismiss();
  }
}
