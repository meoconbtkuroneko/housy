import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'housy-marker',
  templateUrl: 'housy-marker.html'
})

export class HousyMarker {
  constructor() {}

  @Input()
  label;

  @Input()
  map;

  @Input()
  position;

  @Input()
  moreInfo;

  @Output()
  currentMarker: EventEmitter < any > = new EventEmitter();

  marker;

  ngOnChanges(changes) {
    this.createMarker();
  }

  createMarker() {
    if (this.map) {
      if (!(this.position instanceof google.maps.LatLng)) {
        this.position = new google.maps.LatLng(
          this.position.lat,
          this.position.lng
        );
      }
      let options = {
        label: this.label,
        position: this.position,
        map: this.map
      }

      this.marker = new google.maps.Marker(options);
      if (!_.isEmpty(this.moreInfo)) {
        this.marker.id = this.moreInfo.id;
      }
      // console.log("this.markerthis.marker", this.marker);
    }
  }
}
