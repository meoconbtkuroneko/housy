import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { AnywhereService } from '../../services/anywhere.service';

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

  @Output()
  currentMap: EventEmitter < any > = new EventEmitter();

  ngAfterViewInit() {
    this.createGooglePlace();
  }

  map;

  createGooglePlace() {
    let mapEl = this.elementRef.nativeElement.querySelector('#basic-map');
    let mapOptions = {
      center: this.center || this.anywhereService.currentLocation,
      zoom: this.zoom || 14,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false
    }
    this.map = new google.maps.Map(mapEl, mapOptions);
    this.currentMap.emit(this.map);
    google.maps.event.addListener(this.map, 'idle', () => {
      this.currentMap.emit(this.map);
    });
  }

  ngOnDestroy() {
    google.maps.event.clearListeners(this.map, 'idle');
  }
}
