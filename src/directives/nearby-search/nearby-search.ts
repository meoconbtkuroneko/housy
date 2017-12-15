import {
  Component,
  ElementRef,
  Input,
} from '@angular/core';

import { Events } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';

@Component({
  selector: 'nearby-search',
  templateUrl: 'nearby-search.html'
})

export class NearbySearch {
  constructor(
    private elementRef: ElementRef,
    public events: Events,
  ) {}

  @Input()
  map;

  center;
  googleTypePlaces;
  currentTypePlace;
  nearbyMarkers = {};
  currentInfoWindow;

  elContainerAll;
  elPanelBar;
  elPanel;
  barId = 'barId';

  // 0: an, 1: hien 1 nua, 2: an
  fullLevel: number = 0;
  oldVal;
  newVal;

  private TOOGLE_DISABLE_ITEM = new BehaviorSubject(false);

  ngAfterViewInit() {
    this.googleTypePlaces = _.cloneDeep(CONSTANT.GOOGLE_TYPE_PLACES);
    this.addEventDirection();
    // this.subscribeToogleDisableItem();
  }

  addEventDirection() {
    this.elPanelBar = this.elementRef.nativeElement.querySelector('#' + this.barId);

    this.elPanelBar.addEventListener('touchmove', (e) => {
      this.handleTouchMove(e);
    });
    this.elPanelBar.addEventListener('touchend', (e) => {
      this.handleTouchEnd(e);
    });
  }

  handleTouchMove(e) {
    let tempVal = e.touches && e.touches.item(0);
    this.oldVal = _.clone(this.newVal);
    this.newVal = tempVal && _.clone(tempVal.pageY) || undefined;
  }

  handleTouchEnd(e) {
    let direction = this.detectMove();
    switch (this.fullLevel) {
      case 0:
        {
          if (direction === "up" || direction === "click") {
            this.fullLevel = 1;
          }
          break;
        }
      case 1:
        {
          if (direction === "down" || direction === "click") {
            this.fullLevel = 0;
          }
          break;
        }
    }
    this.events.publish('nearbySearch:click', this.fullLevel);
    this.oldVal = this.newVal = undefined;
  }

  detectMove() {
    if (this.oldVal > this.newVal) {
      return 'up';
    } else if (this.oldVal < this.newVal) {
      return 'down';
    }
    return 'click';
  }

  subscribeToogleDisableItem(callback ? ) {
    this.TOOGLE_DISABLE_ITEM.subscribe((res: any) => {
      if (res) {
        this.toogleDisable(res);
      }
    })
  };

  broadcastToogleDisableItem(data) {
    this.TOOGLE_DISABLE_ITEM.next(data);
  }

  toogleDisable(data) {
    let index = this.getTypePlaceIndex(data.id);
    if (index > -1) {
      this.googleTypePlaces[index].disable = _.clone(data.val);
      return this.googleTypePlaces;
    }
  }

  searchChanged(e, item) {
    let typePlace = item.id;
    this.broadcastToogleDisableItem({
      id: typePlace,
      val: true
    });
    this.clearMarkers(typePlace, item.selecting);
    if (item.selecting) {
      this.doSearchNeighborPlaces(typePlace);
    }
  }

  getTypePlaceIndex(typePlace) {
    return _.findIndex(this.googleTypePlaces, {
      id: typePlace
    })
  }

  doSearchNeighborPlaces(typePlace) {
    if (this.map) {
      this.center = this.map.center;
      let ne = this.map.getBounds().getNorthEast();
      let sw = this.map.getBounds().getSouthWest();
      let service = new google.maps.places.PlacesService(this.map);
      let distanceFromNEToSW =
        google.maps.geometry.spherical.computeDistanceBetween(ne, sw);

      return service.nearbySearch({
        location: this.center,
        radius: distanceFromNEToSW / 2,
        type: typePlace
      }, (result, status) => {
        this.doSearchNeighborPlacesCallback(result, status, typePlace);
      });
    }
  }

  doSearchNeighborPlacesCallback(results, status, typePlace) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      if (_.isEmpty(this.nearbyMarkers[typePlace])) {
        this.nearbyMarkers[typePlace] = [];
      }
      return this.createNeighborPlacesMarkers(results, typePlace);
    }
    return;
  }

  createNeighborPlacesMarkers(results, typePlace) {
    for (let i = 0; i < results.length; i++) {
      this.createNeighborPlacesMarker(results[i], typePlace);
      if (i == results.length - 1) {
        this.broadcastToogleDisableItem({
          id: typePlace,
          val: false
        });
      }
    }
  }

  createNeighborPlacesMarker(place, typePlace) {
    let placeLoc = place.geometry.location;
    let iconObj = _.find(this.googleTypePlaces, {
      id: typePlace
    })
    let marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc,
      icon: CONSTANT.IMAGE.ICON_NEARBY_PATH + iconObj.icon,
    });

    let content = "<b>" + place.name + "</b>" + "<br>" + place.vicinity;
    let infowindow = new google.maps.InfoWindow({
      content: content,
    });

    marker.addListener('click', () => {
      if (this.currentInfoWindow) {
        this.currentInfoWindow.close();
      }

      infowindow.open(this.map, marker);
      this.currentInfoWindow = infowindow;
    });

    let isExist = (_.indexOf(this.nearbyMarkers[typePlace], marker) > -1);
    if (!isExist) {
      this.nearbyMarkers[typePlace].push(marker);
    }
  }

  clearMarkers(typePlace, isChecked) {
    if (this.nearbyMarkers[typePlace]) {
      if (isChecked) {
        let bound = this.map.getBounds();
        let tempVal;
        for (let i in this.nearbyMarkers[typePlace]) {
          tempVal = this.nearbyMarkers[typePlace][i];
          if (!bound.contains(tempVal.getPosition())) {
            this.nearbyMarkers[typePlace][i].setMap(null);
            this.nearbyMarkers[typePlace].splice(i, 1);
          }
        }
      } else {
        for (let i in this.nearbyMarkers[typePlace]) {
          this.nearbyMarkers[typePlace][i].setMap(null);
        }
        this.nearbyMarkers[typePlace] = undefined;
      }
      this.broadcastToogleDisableItem({
        id: typePlace,
        val: false
      });
    }
  }
}
