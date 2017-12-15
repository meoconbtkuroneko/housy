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

import { AnywhereService } from '../../providers/anywhere.service';
import { NearbySearch } from '../../components/nearby-search/nearby-search';
import { ApartmentDetail } from '../apartment-detail/apartment-detail';
import { NeighborhoodDetail } from '../neighborhood-detail/neighborhood-detail';
import { CONSTANT } from '../../providers/constant.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'location-detail-page',
  templateUrl: 'location-detail-page.html'
})

export class LocationDetailPage {
  currentIcon = CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.CURRENT_POSITION;

  @ViewChild(Content) content: Content;
  @ViewChild(NearbySearch) nearbySearchView: NearbySearch;

  params;
  center;
  showData;
  currentMap;
  showDirection: boolean;
  type;

  hideNavBar;
  fullLevel;
  elMapContainer;
  mapContainerId = 'container-map';

  constructor(
    private elementRef: ElementRef,
    private anywhereService: AnywhereService,
    private navParams: NavParams,
    private events: Events,
    public navController: NavController,
    private launchNavigator: LaunchNavigator,
  ) {}

  ngOnInit() {
    this.params = this.navParams.get('params');
    this.showData = this.params.data;
    this.center = new google.maps.LatLng(
      this.showData.latitude,
      this.showData.longitude,
    );
    this.showDirection = this.params.showDirection;
    if (this.showDirection) {
      this.doShowDirection();
    }
    this.type = this.params.type;
    console.log("this.params", this.params);
  }

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('hide');
  }

  ngAfterViewInit() {
    this.elMapContainer = this.elementRef.nativeElement.querySelector('#' + this.mapContainerId);
    this.subscribeDirection();
    this.subscribeNearby();
  }

  subscribeDirection() {
    this.events.subscribe(CONSTANT.EVENTS_NAME.SHOW_DIRECTION_CLICKED, this.handleSubscribeDirection);
  }

  unsubscribeDirection() {
    this.events.unsubscribe(CONSTANT.EVENTS_NAME.SHOW_DIRECTION_CLICKED, this.handleSubscribeDirection);
  }

  private handleSubscribeDirection = (data) => {
    this.fullLevel = data;
    this.toggleNavBar();
    setTimeout(() => {
      this.adjustMapHeight();
    }, 10);
  }

  subscribeNearby() {
    this.events.subscribe(CONSTANT.EVENTS_NAME.NEARBY_SEARCH_CLICKED, this.handleSubscribeNearby);
  }

  unsubscribeNearby() {
    this.events.unsubscribe(CONSTANT.EVENTS_NAME.NEARBY_SEARCH_CLICKED, this.handleSubscribeNearby);
  }

  private handleSubscribeNearby = (data) => {
    this.adjustToFitScreen(data);
    // this.fullLevel = data;
    // this.toggleNavBar();
    // setTimeout(() => {
    //   this.adjustMapHeight();
    // }, 10);
  }

  toggleNavBar() {
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

  doShowDirection(e ? ) {
    this.showDirection = !this.showDirection;
    this.adjustToFitScreen();
    console.log("this.launchNavigator", this.launchNavigator);
    console.log("this.launchNavigator", this.launchNavigator.appSelection);

    this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS)
      .then((available: boolean) => {
        let options: LaunchNavigatorOptions = {
          appSelection: {
            dialogHeaderText: 'Chọn ứng dụng hiển thị chỉ đường',
            cancelButtonText: CONSTANT.STRING_CANCEL,
            rememberChoice: {
              enabled: true,
              prompt: {
                headerText: 'Ghi nhớ lựa chọn?',
                yesButtonText: 'Nhớ',
                noButtonText: 'Không',
              }
            }
          }
        };
        console.log("isAppAvailable GoogleMAp", available);
        if (available) {
          options.app = this.launchNavigator.APP.GOOGLE_MAPS;
        }
        this.launchNavigator.userSelect(
          [this.params.data.latitude, this.params.data.longitude],
          options
        )
      });
    // this.launchNavigator.navigate([this.params.data.latitude,this.params.data.longitude]);
  }

  adjustToFitScreen(fullLevel ? : number) {
    this.fullLevel = fullLevel || 0;
    this.nearbySearchView.fullLevel = this.fullLevel;
    this.toggleNavBar();
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
    this.unsubscribeDirection();
    this.unsubscribeNearby();
  }
}
