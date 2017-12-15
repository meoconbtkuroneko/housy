import {
  Component,
} from '@angular/core';

import {
  NavController,
  Events
} from 'ionic-angular';

import * as _ from 'lodash';

import { CONSTANT } from '../../providers/constant.service';

import { AllHomesPage } from '../all-homes/all-homes';
import { AllApartmentsPage } from '../all-apartments/all-apartments';
import { SearchResultPage } from '../search-result/search-result';
import { CurrentItemService } from '../../providers/current-item.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { HistoryService } from '../../providers/history.service';
import { RecentViewService } from '../../providers/recent-view.service';
import {
  CoreClassSubcribeUser,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'page-renter-home',
  templateUrl: 'renter-home.html'
})
export class RenterHomePage extends CoreClassSubcribeUser {
  listHouses;
  listApartments;
  listNewHouses;
  recentPlaces;
  recentViews;
  listOwners;

  recentSearchType = CONSTANT.RECENT_SEARCH_TYPE;

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


  constructor(
    public navController: NavController,
    public events: Events,
    private currentItemService: CurrentItemService,
    private anywhereService: AnywhereService,
    private historyService: HistoryService,
    private recentViewService: RecentViewService,
    coreServices: CoreServices,
  ) {
    super(coreServices);
    this.setPlaceHolder();
    this.toggleSubscribeRecentSearchPlaces(true);
    this.toggleSubscribeRecentViews(true);
    this.toggleSubscribeCurrentItem(true);
  }

  ionViewCanEnter() {
    console.log("ionViewCanEnterionViewCanEnter")
    this.anywhereService.toggleTabs('show');
  }

  getAllData() {
    console.log("getAllDatagetAllDatagetAllData")
    this.listAllHouses(this.getHouseParams);
    this.listAllHouses(this.getNewHouseParams);
    this.listAllApartments(this.getApartmentParams);
    this.listHostTop();
  }

  resetWhenDoRefresh() {}

  resetWhenLogout() {
    super.resetWhenLogout();
    this.listHouses = this.coreServices.anywhereService.unfavouriteHousesArrLogout(this.listHouses);
    this.listNewHouses = this.coreServices.anywhereService.unfavouriteHousesArrLogout(this.listNewHouses);
    this.recentViews = this.coreServices.anywhereService.unfavouriteHousesArrLogout(this.recentViews);
  }

  toggleSubscribeRecentSearchPlaces(isSubscibe: boolean) {
    if (isSubscibe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.HISTORIES_CHANGED,
        this.handleSubscribeRecentSearchPlaces
      )
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.HISTORIES_CHANGED,
        this.handleSubscribeRecentSearchPlaces
      )
    }
  };

  private handleSubscribeRecentSearchPlaces = () => {
    this.recentPlaces = this.historyService.getRecentSearch();
  }

  toggleSubscribeRecentViews(isSubscibe: boolean) {
    if (isSubscibe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.RECENT_VIEWS_CHANGED,
        this.handleSubscribeRecentViews
      )
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.RECENT_VIEWS_CHANGED,
        this.handleSubscribeRecentViews
      )
    }
  };

  private handleSubscribeRecentViews = (res) => {
    this.recentViews = res;
  }

  toggleSubscribeCurrentItem(isSubscribe: boolean) {
    if (isSubscribe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED,
        this.handleSubscribeCurrentItem
      );
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED,
        this.handleSubscribeCurrentItem
      );
    }
  }

  private handleSubscribeCurrentItem = (res) => {
    switch (res.type) {
      case "space":
        {
          this.checkAndChange(this.listNewHouses, res);
          this.checkAndChange(this.listHouses, res);
          this.checkAndChange(this.recentViews, res);
          break;
        }
    }
  }

  private checkAndChange(checkArr, newVal) {
    let index = _.findIndex(checkArr, { id: newVal.id });
    console.log("checkAndChangecheckAndChange 1111111", index, checkArr, newVal)
    if (index > -1) {
      checkArr[index].data = _.cloneDeep(newVal.data);
      console.log("checkAndChangecheckAndChange 33333333", index, checkArr, newVal)
    }
  }

  private setPlaceHolder() {
    this.listHouses = this.anywhereService.addIdToArr(
      [CONSTANT.PLACEHOLDER_HOUSE]
    );
    this.listApartments = this.anywhereService.addIdToArr(
      [CONSTANT.PLACEHOLDER_APARTMENT],
      'id'
    );
    this.listNewHouses = this.anywhereService.addIdToArr([
      CONSTANT.PLACEHOLDER_HOUSE,
      CONSTANT.PLACEHOLDER_HOUSE,
      CONSTANT.PLACEHOLDER_HOUSE,
      CONSTANT.PLACEHOLDER_HOUSE,
      CONSTANT.PLACEHOLDER_HOUSE,
    ]);
  }

  private listAllHouses(params) {
    this._listAllData('listAllHouses', params, (res: any) => {

      // console.log("listAllData 2222222222", res)
      let val = _.cloneDeep(res[CONSTANT.DETAIL_TYPE.SPACES]);
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
    });
  };

  private listAllApartments(params) {
    this._listAllData('listAllApartments', params, (res: any) => {
      // console.log("listAllData 2222222222", res)
      this.toggleLoading(false);
      this.listApartments = this.anywhereService.addIdToArr(
        res[CONSTANT.DETAIL_TYPE.APARTMENTS],
        'id'
      );
    });
  };

  private listHostTop() {
    this._listAllData('listHostTop', null, (res: any) => {
      // console.log("listAllData 2222222222", res)
      this.listOwners = res[CONSTANT.DETAIL_TYPE.USERS];
    });
  };

  seeAllHouses() {
    this.navController.push(AllHomesPage, {
      params: {
        topRenting: true,
      }
    });
  }

  seeAllNewHouses() {
    this.navController.push(AllHomesPage, {
      params: {
        new: true,
      }
    });
  }

  seeAllApartments() {
    this.navController.push(AllApartmentsPage);
  }

  goToSearch(place) {
    this.historyService.goToSearch(place);
    this.navController.push(SearchResultPage, {
      params: place
    });
  }

  ngOnDestroy() {
    this.toggleSubscribeRecentSearchPlaces(false);
    this.toggleSubscribeRecentViews(false);
    this.toggleSubscribeCurrentItem(false);
    super.ngOnDestroy();
  }
}
