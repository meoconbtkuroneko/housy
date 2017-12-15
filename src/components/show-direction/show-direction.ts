import {
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { Events } from 'ionic-angular';

import * as _ from 'lodash';
import { AnywhereService } from '../../providers/anywhere.service';
import { MapService } from '../../providers/map.service';
import { CONSTANT } from '../../providers/constant.service';

@Component({
  selector: 'show-direction',
  templateUrl: 'show-direction.html'
})

export class ShowDirection {
  @Input()
  map;

  @Input()
  toLocation;

  @Input()
  showDirection: boolean;
  waiting: boolean;

  directionsService;
  directionsDisplay;

  hasCreatedRoute: boolean;

  elContainerAll;
  elPanelBar;
  elPanel;
  panelId = 'panel-detail';
  barId = 'barId';

  // 0: an, 1: hien 1 nua, 2: an
  fullLevel: number = 0;
  oldVal;
  newVal;

  request: any;
  errGetCurrentLocation: boolean;

  constructor(
    private elementRef: ElementRef,
    private anywhereService: AnywhereService,
    public events: Events,
    public mapService: MapService,
  ) {}

  ngAfterViewInit() {
    this.addEventDirection();
  }

  initDirectionBase() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });

    this.request = {
      origin: this.anywhereService.currentLocation,
      destination: this.toLocation,
      travelMode: 'DRIVING'
    };
  }

  ngOnChanges(changes) {
    console.log("ngOnChangesngOnChanges", changes);
    if (changes.showDirection &&
      changes.showDirection.currentValue != undefined) {
      if (!this.directionsService || !this.directionsDisplay) {
        this.initDirectionBase();
      }
      this.toggleDirection();

      if (this.showDirection) {
        if (!this.hasCreatedRoute) {
          this.createRoute();
        }
      }
    }
  }

  createRoute() {
    console.log("createRoute")
    if (!this.anywhereService.currentLocation) {
      if (!this.errGetCurrentLocation) {
        console.log("chua co currentLocation");
        return this.mapService.init((pos) => {
          if (pos && pos.lat && pos.lng) {
            this.request.origin = this.anywhereService.currentLocation;
            this.errGetCurrentLocation = undefined;
          } else {
            this.errGetCurrentLocation = true;
            console.log("this.errGetCurrentLocation", this.errGetCurrentLocation);
          }
          return this.createRoute();
        })
      } else {
        this.errGetCurrentLocation = undefined;
        console.log("chua co curen nhung loi roi")
        return this.anywhereService.showToast(CONSTANT.MAP.POSITION_UNAVAILABLE);
      }
    }

    this.directionsService.route(this.request, (result, status) => {
      console.log("this.directionsService.route", result, status)
      if (status == 'OK') {
        this.directionsDisplay.setDirections(result);
      }
      this.hasCreatedRoute = true;
      if (this.waiting) {
        this.waiting = undefined;
        this.toggleDirection();
      }

    });
    console.log("da cooooooooooooooo")
  }


  toggleDirection() {
    if (this.showDirection) {
      if (this.map && this.hasCreatedRoute) {
        console.log("toggleDirectiontoggleDirection 22222")
        if (this.showDirection) {
          this.directionsDisplay.setMap(this.map);
          this.directionsDisplay.setPanel(this.elPanel);
        }
      } else {
        this.waiting = true;
        console.log("chuaaaaaaaaaaaaaaaaaaaa")
      }
    } else {
      this.directionsDisplay.setMap(null);
      this.directionsDisplay.setPanel(null);
      this.fullLevel = 0;
    }
  }

  addEventDirection() {
    this.elPanel = this.elementRef.nativeElement.querySelector('#' + this.panelId);
    this.elPanelBar = this.elementRef.nativeElement.querySelector('#' + this.barId);

    this.elPanelBar.addEventListener('touchmove', (e) => {
      this.handleTouchMove(e);
    });
    this.elPanelBar.addEventListener('touchend', (e) => {
      this.handleTouchEnd(e);
    });
  }

  handleTouchMove(e) {
    e.stopPropagation();
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
          if (direction === "up") {
            this.fullLevel = 2;
            break;
          } else if (direction === "down" || direction === "click") {
            this.fullLevel = 0;
            break;
          }
          break;
        }
      case 2:
        {
          if (direction === "down" || direction === "click") {
            this.fullLevel = 0;
          }
          break;
        }
    }
    this.events.publish(CONSTANT.EVENTS_NAME.SHOW_DIRECTION_CLICKED, this.fullLevel);
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
}
