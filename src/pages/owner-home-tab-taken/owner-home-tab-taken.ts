import { Component } from '@angular/core';

// import * as _ from 'lodash';

import { GetService } from '../../providers/get.service';
// import { CONSTANT } from '../../providers/constant.service';

import { AnywhereService } from '../../providers/anywhere.service';

@Component({
  selector: 'owner-home-tab-taken',
  templateUrl: 'owner-home-tab-taken.html'
})
export class OwnerHomeTabTaken {
  constructor(
    private getService: GetService,
    private anywhereService: AnywhereService,
  ) {}

  ownerTab1Root = this;
  ownerTab2Root = this;

  ngOnInit() {
    this.initTabs()
  };

  initTabs() {}

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('show');
  }
}
