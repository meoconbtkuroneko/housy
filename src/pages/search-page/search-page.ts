import {
  Component,
  ElementRef,
} from '@angular/core';


import { NavController } from 'ionic-angular';
import { HistoryService } from '../../services/history.service';
import { AnywhereService } from '../../services/anywhere.service';
import { SearchResultPage } from '../search-result/search-result';
import { HistorySearch, POPULAR_SEARCHS } from '../../templates/history-search';

import * as _ from 'lodash';

@Component({
  selector: 'search-page',
  templateUrl: 'search-page.html'
})

export class SearchPage {
  allPopularSearchs = _.cloneDeep(POPULAR_SEARCHS);
  popularSearchs;
  showAllPopularSearchs: boolean = true;
  iconName;
  constructor(
    public navController: NavController,
    public historyService: HistoryService,
    private elementRef: ElementRef,
    private anywhereService: AnywhereService,
  ) {}

  ngOnInit() {
    this.getHistories();
    this.toggleDistrict();
    this.currentPosition();
  }

  ngAfterViewInit() {
    this.createGooglePlace();
  }

  createGooglePlace() {
    let inputSearch = this.elementRef.nativeElement.querySelector('.searchbar-input');
    let autocomplete = new google.maps.places.Autocomplete(inputSearch);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let tempPlace = autocomplete.getPlace();
      // console.log("placeplaceplaceplaceplaceplace", tempPlace);
      let history = new HistorySearch(
        tempPlace.formatted_address,
        tempPlace.geometry.location.lat(),
        tempPlace.geometry.location.lng(),
        tempPlace.place_id
      )
      google.maps.event.clearListeners(autocomplete);
      setTimeout(() => {
        this.goToSearch(history);

      }, 2000);
    });
  }

  listHistories;

  getHistories() {
    this.historyService.subscribeHistories(res => {
      this.listHistories = this.historyService.HISTORY;
    });
  }

  goToSearch(place: HistorySearch) {
    // console.log('goToSearchgoToSearchgoToSearch', place);
    this.historyService.setHistory(place);
    // console.log("paramssssssssssssss 11111111", place);
    // this.navController.push(SearchResultPage, {
    //   params: place
    // })

    this.navController.push(SearchResultPage);
  }

  currentPosition() {
    let history = new HistorySearch(
      "Can Tho",
      this.anywhereService.currentLocation.lat(),
      this.anywhereService.currentLocation.lng(),
    )
    setTimeout(() => {
      this.goToSearch(history);

    }, 100);
  }

  toggleDistrict() {
    this.showAllPopularSearchs = !this.showAllPopularSearchs;
    this.popularSearchs = this.showAllPopularSearchs ?
      this.allPopularSearchs :
      _.take(this.allPopularSearchs, 3);
    this.iconName = this.showAllPopularSearchs ? 'arrow-dropup' : 'arrow-dropdown';
  }
}
