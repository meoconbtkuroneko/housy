import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as _ from 'lodash';

import { GetService } from '../../services/get.service';
import { CONSTANT } from '../../services/constant.service';

import { AllHomesPage } from '../all-homes/all-homes';
import { AllNewHomesPage } from '../all-new-homes/all-new-homes';
import { AllApartmentsPage } from '../all-apartments/all-apartments';
import { HomeDetail } from '../home-detail/home-detail';

import { UserStorageService } from '../../services/user-storage.service';
import { CurrentItemService } from '../../services/current-item.service';
import { AnywhereService } from '../../services/anywhere.service';

@Component({
  selector: 'page-renter-home',
  templateUrl: 'renter-home.html'
})
export class RenterHomePage implements OnInit {
  listHouses;
  listApartments;
  listNewHouses;
  recentPlaces;
  recentViews;
  listOwners;

  recentSearchType = CONSTANT.RECENT_SEARCH_TYPE;
  getPlaceParams = {
    type: this.recentSearchType.PLACE
  };
  getViewParams = {
    type: this.recentSearchType.SPACE
  };
  getHouseParams = {
    topRenting: true
  };
  getNewHouseParams = {
    new: true,
    page: 1
  };
  getApartmentParams = {
    topReview: true
  };

  USER;

  constructor(
    public navController: NavController,
    private getService: GetService,
    private userStorageService: UserStorageService,
    private currentItemService: CurrentItemService,
    private anywhereService: AnywhereService,
  ) {
    this.setPlaceHolder();
  }

  ngOnInit() {
    this.subscribeUser();
    this.subscribeCurrentItem();
    this.navController.push(HomeDetail, {
      params: {
        id: 86
      }
    })
  };

  ionViewCanEnter() {
    this.anywhereService.toogleTabs('show');
  }

  private subscribeUser() {
    this.userStorageService.subscribeUser(res => {
      if (!_.isEmpty(res)) {
        this.USER = res;
        this.listAllHouses(this.getHouseParams);
        this.listAllHouses(this.getNewHouseParams);
        this.listAllApartments(this.getApartmentParams);
        this.listHostTop();
        if (this.USER.logined) {
          this.getRecentSearch(this.getPlaceParams);
          this.getRecentSearch(this.getViewParams);
        }
      }
    })
  }

  private subscribeCurrentItem() {
    this.currentItemService.CURRENT_ITEM
      .subscribe(res => {
        let rs: any = res;
        switch (rs.type) {
          case "space":
            {
              this.checkAndChange(this.listNewHouses, rs);
              this.checkAndChange(this.listHouses, rs);
              this.checkAndChange(this.recentViews, rs);
              break;
            }
          case "apartment":
            {

              break;
            }
        }
      })
  }

  private checkAndChange(checkArr, newVal) {
    let index = _.findIndex(checkArr, { id: newVal.id });
    if (index > -1) {
      checkArr[index].data = _.cloneDeep(newVal.data);
    }
  }

  ngOnDestroy() {
    console.log("ngOnDestroyngOnDestroyngOnDestroy");
    this.userStorageService.USER.unsubscribe();
  }


  setPlaceHolder() {
    this.listHouses = [CONSTANT.PLACEHOLDER_HOUSE];
    this.listApartments = [CONSTANT.PLACEHOLDER_APARTMENT];
    this.listNewHouses = [
      CONSTANT.PLACEHOLDER_HOUSE,
      CONSTANT.PLACEHOLDER_HOUSE,
      CONSTANT.PLACEHOLDER_HOUSE,
      CONSTANT.PLACEHOLDER_HOUSE,
      CONSTANT.PLACEHOLDER_HOUSE,
    ];
  }

  private listAllHouses(params) {
    this.getService.listAllHouses(params)
      .then(data => {
          if (data.reason === CONSTANT.REASONS.ER_OK) {
            let val = _.cloneDeep(data.spaces);
            switch (params) {
              case this.getHouseParams:
                {
                  this.listHouses = this.anywhereService.addIdToArr(val);
                  break;
                };
              case this.getNewHouseParams:
                {
                  this.listNewHouses = this.anywhereService.addIdToArr(val);
                  break;
                }
            }
          } else {
            this.handleNotOK();
          }
        },
        err => { this.handleErr() });
  };

  private listAllApartments(params) {
    this.getService.listAllApartments(params)
      .then(data => {
          if (data.reason === CONSTANT.REASONS.ER_OK) {
            // this.listApartments = data.apartments;
            this.listApartments = this.anywhereService.addIdToArr(data.apartments, 'id');
          } else {
            this.handleNotOK();
          }
        },
        err => { this.handleErr() });
  };

  private getRecentSearch(params) {
    this.getService.getRecentSearch(params)
      .then(data => {
          if (data.reason === CONSTANT.REASONS.ER_OK) {
            switch (params) {
              case this.getPlaceParams:
                {
                  this.recentPlaces = data.places;
                  break;
                };
              case this.getViewParams:
                {
                  this.recentViews = this.anywhereService.addIdToArr(data.spaces);
                  break;
                }
            }
          } else {
            this.handleNotOK();
          }
        },
        err => { this.handleErr() });
  };

  private listHostTop() {
    this.getService.listHostTop()
      .then(data => {
          if (data.reason === CONSTANT.REASONS.ER_OK) {
            this.listOwners = data.users;
          } else {
            this.handleNotOK();
          }
        },
        err => { this.handleErr() });
  };

  handleNotOK() {
    console.log("co van de roiiiiiiii");
  }

  handleErr(err ? ) {
    console.log("loi roi nhe", err);

  }

  finishLoading() {}

  seeAllHouses() {
    this.navController.push(AllHomesPage);
  }

  seeAllNewHouses() {
    this.navController.push(AllNewHomesPage);
  }

  seeAllApartments() {
    this.navController.push(AllApartmentsPage);
  }

  goToSearch(place) {

  }
}
