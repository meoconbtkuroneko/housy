import {
  Component,
  ElementRef,
} from '@angular/core';


import { NavController } from 'ionic-angular';
import { HistoryService } from '../../providers/history.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { NoInternetService } from '../../providers/no-internet.service';
import { MapService } from '../../providers/map.service';
import { CONSTANT } from '../../providers/constant.service';
import { SearchResultPage } from '../search-result/search-result';
import { HistorySearch, POPULAR_SEARCHS } from '../../templates/history-search';

import {
  CoreClass,
  CoreServices
} from '../../templates/core-class';

import * as _ from 'lodash';

@Component({
  selector: 'search-page',
  templateUrl: 'search-page.html'
})

export class SearchPage extends CoreClass {
  allPopularSearchs = _.cloneDeep(POPULAR_SEARCHS);
  popularSearchs;
  showAllPopularSearchs: boolean = true;
  iconName;
  isProcessing: boolean;
  inputSearchEl;
  listHistories;
  showNoInternet;

  hasInternet: boolean;
  currentToast;

  currentSearchPlace;

  constructor(
    coreServices: CoreServices,
    public navController: NavController,
    public historyService: HistoryService,
    private elementRef: ElementRef,
    private anywhereService: AnywhereService,
    private noInternetService: NoInternetService,
    private mapService: MapService,
  ) {
    super(coreServices);
    console.log("this.hasInternet", this.hasInternet);
    this.checkHasInternet();
    this.toggleSubscribeHistoriesChanged(true);
  }

  // inherit from parent
  handleSubscribeInternet(res) {
    console.log("handleSubscribeInternet ssssssssssss", res);
    this.toggleProcessing(!this.hasInternet);
    if (res === false) {
      this.toggleShowNoInternet(this.hasInternet === false);
    }
  }

  // inherit from parent
  handleSubscribeReloadInternet() {}

  // inherit from parent
  handleSubscribeUser() {}

  // inherit from parent
  handleSubscribeRetryErrorLoad() {
    this.toggleShowNoInternet(this.hasInternet === false);
    this.getAllData();
  }

  checkShowNoInternet() {
    this.showNoInternet = this.noInternetService.hasInternet === false;
  }

  toggleSubscribeHistoriesChanged(isSubscibe: boolean) {
    if (isSubscibe) {
      this.coreServices.events.subscribe(
        CONSTANT.EVENTS_NAME.HISTORIES_CHANGED,
        this.handleSubscribeHistoriesChanged
      )
    } else {
      this.coreServices.events.unsubscribe(
        CONSTANT.EVENTS_NAME.HISTORIES_CHANGED,
        this.handleSubscribeHistoriesChanged
      )
    }
  };

  private handleSubscribeHistoriesChanged = () => {
    console.log("handleSubscribeHistoriesChanged", this.hasInternet);
    this.listHistories = this.historyService.getHistories();
  }

  ngAfterViewInit() {
    this.getAllData();
  }

  getAllData() {
    if (this.hasInternet) {
      this.toggleDistrict();
      // this.createGooglePlace();
      this.handleSubscribeHistoriesChanged();
    }
  }

  toggleDistrict() {
    this.showAllPopularSearchs = !this.showAllPopularSearchs;
    this.popularSearchs = this.showAllPopularSearchs ?
      this.allPopularSearchs :
      _.take(this.allPopularSearchs, 3);
    this.iconName = this.showAllPopularSearchs ? 'arrow-dropup' : 'arrow-dropdown';
  }

  // private createGooglePlace() {
  //   // .searchbar-input : create by ionic
  //   this.inputSearchEl = this.elementRef.nativeElement.querySelector('.searchbar-input');
  //   let autocomplete = new google.maps.places.Autocomplete(this.inputSearchEl);
  //   google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //     let tempPlace = autocomplete.getPlace();
  //     // console.log("placeplaceplaceplaceplaceplace", tempPlace);
  //     let place = new HistorySearch(
  //       tempPlace.formatted_address,
  //       tempPlace.geometry.location.lat(),
  //       tempPlace.geometry.location.lng(),
  //       tempPlace.place_id
  //     )
  //     this.goToSearch(place);
  //   });
  // }

  getAddress(addressObj) {
    console.log("getAddress aaaaaaaaaa", addressObj);
    if (!addressObj) {
      return;
    }
    this.goToSearch(addressObj);
  }

  goToSearch(place: HistorySearch) {
    if (this.isProcessing) {
      return;
    }
    this.currentSearchPlace = place;
    this.historyService.goToSearch(this.currentSearchPlace);
    this.navController.push(SearchResultPage, {
      params: this.currentSearchPlace
    });
  }

  // get and search house at currentPosition 
  currentPosition() {
    if (this.isProcessing) {
      return;
    }
    this.currentToast = this.anywhereService.showToast(CONSTANT.MAP.LOADING, 9999999999, true);
    this.toggleProcessing(true);
    this.mapService.init((pos) => {
      if (pos && pos.lat && pos.lng) {
        this.mapService.convertFromLatLngToAddress(pos.lat, pos.lng)
          .subscribe((res: any) => {
            // console.log("convertFromLatLngToAddress", res);
            let currentPlace = res[0];
            let place = new HistorySearch(
              currentPlace.formatted_address,
              this.anywhereService.currentLocation.lat(),
              this.anywhereService.currentLocation.lng(),
              currentPlace.place_id,
            )
            this.finishCurrentLocation();
            this.goToSearch(place);
          }, err => {
            this.handleErrCurrentLocation();
          })
      } else {
        this.handleErrCurrentLocation();
      }
    })
  }

  private handleErrCurrentLocation() {
    this.finishCurrentLocation();
    this.anywhereService.showToast(CONSTANT.MAP.POSITION_UNAVAILABLE);
  }

  private finishCurrentLocation() {
    this.currentToast.dismissAll();
    this.toggleProcessing(false);
  }

  private toggleProcessing(isProcessing: boolean) {
    this.isProcessing = isProcessing;
  }


  ngOnDestroy() {
    this.toggleSubscribeHistoriesChanged(false);
    // this.toggleSubscribeInternetChanged(false);
    super.ngOnDestroy();
  }
}
