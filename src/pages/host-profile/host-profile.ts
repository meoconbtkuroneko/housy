import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetService } from '../../services/get.service';
import { CommonService } from '../../services/common.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';

@Component({
  selector: 'host-profile',
  templateUrl: 'host-profile.html'
})
export class HostProfile implements OnInit {
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
  ) {}

  ngOnInit(): void {
    this.params = this.navParams.get("params");
    this.getDetail();
    this.listAllHouses();
  };

  private getDetail() {
    this.getService.getHostProfile(this.params.id)
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
    this.getService.getHousesOf('users', this.params.id)
      .then(data => {
        this.listHouses = this.anywhereService.addIdToArr(data.spaces);
      }, err => {});
  };
}
