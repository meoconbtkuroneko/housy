import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  NavParams,
  Events,
  Content,
  NavController,
} from 'ionic-angular';

import { AnywhereService } from '../../services/anywhere.service';
import { NearbySearch } from '../../directives/nearby-search/nearby-search';
import { ApartmentDetail } from '../apartment-detail/apartment-detail';
import { NeighborhoodDetail } from '../neighborhood-detail/neighborhood-detail';

@Component({
  selector: 'location-detail-page',
  templateUrl: 'location-detail-page.html'
})

export class LocationDetailPage {

  constructor(
    private elementRef: ElementRef,
    private anywhereService: AnywhereService,
    private navParams: NavParams,
    private events: Events,
    public navController: NavController,
  ) {}

  @ViewChild(Content) content: Content;
  @ViewChild(NearbySearch) nearbySearchView: NearbySearch;

  params;
  center;
  showData;
  currentMap;
  showDirection: boolean;
  currentLocation = this.anywhereService.currentLocation;
  type;

  hideNavBar;
  fullLevel;
  elMapContainer;
  mapContainerId = 'container-map';

  ngOnInit() {
    this.params = this.navParams.get('params');
    this.showData = this.params.data;
    this.center = new google.maps.LatLng(
      this.showData.latitude,
      this.showData.longitude,
    );
    this.showDirection = this.params.showDirection;
    this.type = this.params.type;
    console.log("this.params", this.params);
  }

  ionViewCanEnter() {
    this.anywhereService.toogleTabs('hide');
  }

  ngAfterViewInit() {
    this.elMapContainer = this.elementRef.nativeElement.querySelector('#' + this.mapContainerId);
    this.subscribeDirection();
    this.subscribeNearby();
  }

  subscribeDirection() {
    this.events.subscribe('showDirection:click', (data) => {
      this.fullLevel = data;
      this.toogleNavBar();
      setTimeout(() => {
        this.adjustMapHeight();
      }, 10);
    });
  }

  subscribeNearby() {
    this.events.subscribe('nearbySearch:click', (data) => {
      this.fullLevel = data;
      this.toogleNavBar();
      setTimeout(() => {
        this.adjustMapHeight();
      }, 10);
    });
  }

  toogleNavBar() {
    switch (this.fullLevel) {
      case 0:
      case 1:
        {
          this.hideNavBar = undefined;
          break;
        }
      case 2:
        {
          this.hideNavBar = true;
        }
    }
    this.content.resize();
  }

  adjustMapHeight() {
    let amt;
    this.elMapContainer.classList.remove("half-full");
    switch (this.fullLevel) {
      case 0:
        {
          amt = '100%';
          break;
        }
      case 1:
        {
          amt = '50%';
          this.elMapContainer.classList.add("half-full");
          break;
        }
      case 2:
        {
          amt = 0;
        }
    }
    this.elMapContainer.style['height'] = amt;
  }

  getMap(map) {
    this.currentMap = map;
  }

  doShowDirection(e) {
    this.showDirection = !this.showDirection;
    this.fullLevel = 0;
    this.nearbySearchView.fullLevel = this.fullLevel;
    this.toogleNavBar();
    setTimeout(() => {
      this.adjustMapHeight();
    }, 10);
  }

  openDetail(type) {
    if (type === 'apartment') {
      this.navController.push(ApartmentDetail, {
        params: {
          id: this.showData.apartment.id
        },
      });
    } else if (type === 'neighborhood') {
      this.navController.push(NeighborhoodDetail, {
        params: {
          id: this.showData.neighborhood.id
        },
      });
    }
  }

  ngOnDestroy() {
    this.events.unsubscribe('showDirection:click', () => {})
  }
}
