import { Component, OnInit } from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';

import { GetService } from '../../services/get.service';
import { CommonService } from '../../services/common.service';
import { AnywhereService } from '../../services/anywhere.service';
import { UserStorageService } from '../../services/user-storage.service';
import { CONSTANT } from '../../services/constant.service';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile implements OnInit {
  params;
  showData;
  listHouses;
  pageCount;
  showMore;
  currentPage;
  fullUrlPicture;

  typeRole = CONSTANT.SERVER.TYPE_ROLE;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    private getService: GetService,
    private commonService: CommonService,
    private anywhereService: AnywhereService,
    private userStorageService: UserStorageService,
    private viewController: ViewController,
  ) {
    this.showData = this.userStorageService.getProp('userInfo');
  }

  ngOnInit(): void {
    this.getDetail();
    this.listAllHouses();
  };

  private getDetail() {
    this.getService.getHostProfile(this.showData.id)
      .then(res => {
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          console.log("this.showData", res);
          let data = res.user;
          this.showData = data;
          this.fullUrlPicture = this.anywhereService.getFullImgUrl(this.showData.picture, 'user');
        }
      })
  }

  private listAllHouses(): void {
    this.getService.getHousesOf('users', this.showData.id)
      .then(
        data => {
          console.log('datadata2121212121212121212121', data);
          this.listHouses = data.spaces;
        },
        err => {});
  };

  closeModal() {
    this.viewController.dismiss();
  }
}
