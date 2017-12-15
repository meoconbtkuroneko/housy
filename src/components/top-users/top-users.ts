import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CONSTANT } from '../../providers/constant.service';
import { HostProfile } from '../../pages/host-profile/host-profile';
import { NoInternetService } from '../../providers/no-internet.service';

@Component({
  selector: 'top-users',
  templateUrl: './top-users.html'
})
export class TopUsers {
  @Input()
  cardData;

  constructor(
    private navController: NavController,
    public noInternetService: NoInternetService,
  ) {};

  typeRole = CONSTANT.SERVER.TYPE_ROLE;

  goToUser() {
    // if (!this.noInternetService.hasInternet) {
    //   console.log("k co internet");
    //   return;
    // }
    this.navController.push(HostProfile, { params: { id: this.cardData.id } });
  }
}
