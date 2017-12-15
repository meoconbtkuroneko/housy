import { Component } from '@angular/core';

import { AnywhereService } from '../../providers/anywhere.service';
import { OwnerHomeTabRenting } from '../owner-home-tab-renting/owner-home-tab-renting';
import { OwnerHomeTabTaken } from '../owner-home-tab-taken/owner-home-tab-taken';

@Component({
  selector: 'owner-home',
  templateUrl: 'owner-home.html'
})
export class OwnerHomePage {

  constructor(
    private anywhereService: AnywhereService,
  ) {}

  ownerTab1Root = OwnerHomeTabRenting;
  ownerTab2Root = OwnerHomeTabTaken;

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('show');
  }
}
