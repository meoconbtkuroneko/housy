import {
  Component,
} from '@angular/core';

import {
  NavParams
} from 'ionic-angular';

import { AnywhereService } from '../../services/anywhere.service';

@Component({
  selector: 'search-map',
  templateUrl: 'search-map.html'
})

export class SearchMapPage {
  constructor(
    private anywhereService: AnywhereService,
    private navParams: NavParams,
  ) {}
  center;
  radius;
  currentMap;
  params;
  listHouses;
  listMarkers = [];
  mapCircle;

  mapContainerName = "container-map";
  houseContainerName = 'container-horizontal-card';
  ngOnInit() {
    this.params = this.navParams.get('params');
    this.center = new google.maps.LatLng(
      this.params.center.lat,
      this.params.center.lng
    );
    this.radius = this.params.radius || 10000;
    this.listHouses = this.params.listHouses;
  }

  getMap(map) {
    this.currentMap = map;
    console.log("this.currentMap", this.currentMap);
    this.setHouseInsideMap();
  }

  // 
  setHouseInsideMap() {
    if (!this.mapCircle) {
      this.mapCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        map: this.currentMap,
        center: this.center,
        radius: this.radius
      });
    }
  }

  getListMarkers(listMarkers) {
    console.log("getListMarkers listMarkerslistMarkers", listMarkers);
  }
}
