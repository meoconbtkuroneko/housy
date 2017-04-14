import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

import { GetService } from '../../services/get.service';
import { CommonService } from '../../services/common.service';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';

@Component({
  selector: 'neighborhood-detail',
  templateUrl: 'neighborhood-detail.html'
})
export class NeighborhoodDetail implements OnInit {
  params;
  showData;
  listHouses;
  readMore: boolean;
  hostPhoneNumber: string;
  isShowContact: boolean;
  private description: string;

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
    console.log("this.params", this.params);
    this.getService.getNeighborhoodDetail(this.params.id)
      .then(res => {
        console.log("resresresresresresres", res);
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          let data = res.neighborhood;
          this.description = _.clone(data.description);

          let temp = this.commonService.setApartmentDetail(data);
          this.showData = temp.detail;
          this.readMore = temp.readMoreDes;
          console.log("this.showData", this.showData);
        }
      })
  }

  private listAllHouses(): void {
    this.getService.listAllHouses(null)
      .then(data => {
        this.listHouses = this.anywhereService.addIdToArr(data.spaces);
      }, err => {});
  };
}
