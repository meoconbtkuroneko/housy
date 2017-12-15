import {
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';

import {
  Events,
  NavParams,
  ViewController,
  Content,
} from 'ionic-angular';

import { MapService } from '../../providers/map.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';

import { HistorySearch } from '../../templates/history-search';

import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: 'choose-address',
  templateUrl: 'choose-address.html'
})

export class ChooseAddress extends CoreSimpleClass {
  constructor(
    private anywhereService: AnywhereService,
    private viewController: ViewController,
    private navParams: NavParams,
    private events: Events,
    public coreServices: CoreServices,
    public elementRef: ElementRef,
    public mapService: MapService,
  ) {
    super(coreServices);
  }

  // khong duoc xoa, xai ngoai html
  @ViewChild(Content) content: Content;

  maxHeight;
  center;
  currentMap;
  params;
  markerSrc = CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.STATIC_MARKER;
  addressObj: HistorySearch;

  ngOnInit() {
    this.params = this.navParams.get('params');
    console.log("this.params", this.params);
    if (this.params &&
      this.params.name &&
      this.params.location) {
      this.center = new google.maps.LatLng(
        this.params.location.lat,
        this.params.location.lng
      );

      this.addressObj = new HistorySearch(
        this.params.name,
        this.params.location.lat,
        this.params.location.lng,
      );
    } else {
      this.center = new google.maps.LatLng(10.823099, 106.629664);
    }
  }

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('hide');
  }

  getMap(map) {
    if (!this.currentMap) {
      this.currentMap = map;
    }
    // this.center = this.currentMap.getCenter();
    // console.log("this.center", this.center.lat(), this.center.lng());
    // this.addressObj && (this.addressObj.location = {
    //   lat: this.center.lat(),
    //   lng: this.center.lng(),
    // });
  }

  saveAddress() {
    console.log("saveAddresssaveAddress")
    this.beforeSave();
    if (this.addressObj && this.addressObj.name) {
      this.broadcastSelectAddress(this.addressObj);
      this.closeModal();
    } else {
      this.anywhereService.showToast(CONSTANT.NOT_ENOUGH_ADDRESS);
    }
  }

  beforeSave() {
    let tempCenter = this.currentMap.getCenter();
    this.addressObj && (this.addressObj.location = {
      lat: tempCenter.lat(),
      lng: tempCenter.lng(),
    });
  }

  broadcastSelectAddress(addressObj) {
    this.events.publish(CONSTANT.EVENTS_NAME.SELECT_ADDRESS, addressObj);
  }

  closeModal() {
    this.viewController.dismiss();
  }

  getAddress(addressObj) {
    console.log("getAddress aaaaaaaaaa", addressObj);
    this.addressObj = addressObj;
    if (!this.addressObj) {
      return;
    }
    let currentCenter = new google.maps.LatLng(this.addressObj.location);
    this.currentMap.setCenter(currentCenter);
  }

  currentToast;

  // get and search house at currentPosition 
  currentPosition() {
    if (this.isProcessing) {
      return;
    }
    this.currentToast = this.anywhereService.showToast(CONSTANT.MAP.LOADING, 9999999999, true);
    this.toggleIsProcessing(true);
    this.mapService.init((pos) => {
      if (pos && pos.lat && pos.lng) {
        this.mapService.convertFromLatLngToAddress(pos.lat, pos.lng)
          .subscribe((res: any) => {
            // console.log("convertFromLatLngToAddress", res);
            let currentPlace = res[0];
            this.addressObj = new HistorySearch(
              currentPlace.formatted_address,
              this.anywhereService.currentLocation.lat(),
              this.anywhereService.currentLocation.lng(),
              currentPlace.place_id,
            )
            this.finishCurrentLocation();
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
    this.toggleIsProcessing(false);
  }
}
