import {
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { Events } from 'ionic-angular';

import * as _ from 'lodash';
import { AnywhereService } from '../../services/anywhere.service';

@Component({
  selector: 'show-direction',
  templateUrl: 'show-direction.html'
})

export class ShowDirection {
  constructor(
    private elementRef: ElementRef,
    private anywhereService: AnywhereService,
    public events: Events,
  ) {}

  @Input()
  map;

  @Input()
  toLocation;

  @Input()
  showDirection: boolean;

  directionsService;
  directionsDisplay;

  elContainerAll;
  elPanelBar;
  elPanel;
  panelId = 'panel-detail';
  barId = 'barId';

  // 0: an, 1: hien 1 nua, 2: an
  fullLevel: number = 0;
  oldVal;
  newVal;

  ngAfterViewInit() {
    this.createDirection();
    this.addEventDirection();
  }

  ngOnChanges(changes) {
    this.toogleDirection();
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
    this.events.publish('showDirection:click', this.fullLevel);
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

  createDirection() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    let request = {
      origin: this.anywhereService.currentLocation,
      destination: this.toLocation,
      travelMode: 'DRIVING'
    };
    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsDisplay.setDirections(result);
      }
    });
  }

  toogleDirection() {
    if (this.map) {
      if (this.showDirection) {
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel(this.elPanel);
      } else {
        this.directionsDisplay.setMap(null);
        this.directionsDisplay.setPanel(null);
        this.fullLevel = 0;
      }
    }
  }

  ngOnDestroy() {
    this.events.unsubscribe('showDirection:click', () => {})
  }
}
