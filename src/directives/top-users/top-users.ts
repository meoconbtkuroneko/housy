import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CONSTANT } from '../../services/constant.service';
import { HostProfile } from '../../pages/host-profile/host-profile';

@Component({
  selector: 'top-users',
  templateUrl: './top-users.html'
})
export class TopUsers {
  @Input()
  cardData;

  constructor(
    private navController: NavController,
  ) {};

  typeRole = CONSTANT.SERVER.TYPE_ROLE;

  goToUser() {
    this.navController.push(HostProfile, { params: { id: this.cardData.id } });
  }
}
