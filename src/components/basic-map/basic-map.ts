import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import * as _ from 'lodash';

import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';

@Component({
  selector: 'basic-map',
  templateUrl: 'basic-map.html'
})

export class BasicMap {
  constructor(
    private elementRef: ElementRef,
    private anywhereService: AnywhereService,
  ) {}

  @Input()
  center;

  @Input()
  zoom;

  @Input()
  options;

  @Output()
  currentMap: EventEmitter < any > = new EventEmitter();

  map;
  basicMapName = CONSTANT.BASIC_MAP_NAME;

  ngAfterViewInit() {
    this.createGooglePlace();
  }

  createGooglePlace() {
    let mapEl = this.elementRef.nativeElement.querySelector('#' + this.basicMapName);
    let mapOptions: any = {
      center: this.center || this.anywhereService.currentLocation,
      zoom: this.zoom || 14,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false
    }
    if (this.options && !_.isEmpty(this.options)) {
      _.assignIn(mapOptions, this.options);
    }

    this.map = new google.maps.Map(mapEl, mapOptions);
    // this.currentMap.emit(this.map);
    google.maps.event.addListener(this.map, 'idle', () => {
      this.currentMap.emit(this.map);
    });
  }

  ngOnDestroy() {
    google.maps.event.clearListeners(this.map, 'idle');
    this.map = undefined;
  }
}
