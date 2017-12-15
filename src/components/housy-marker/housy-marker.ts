import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  Events
} from 'ionic-angular';

import { CONSTANT } from '../../providers/constant.service';
import * as _ from 'lodash';

@Component({
  selector: 'housy-marker',
  templateUrl: 'housy-marker.html'
})

export class HousyMarker {
  constructor(
    private events: Events
  ) {
    this.createCustomMarker();
  }

  @Input()
  map;

  @Input()
  icon

  @Input()
  position;

  @Input()
  moreInfo;

  @Input()
  selected;

  @Output()
  currentMarker: EventEmitter < any > = new EventEmitter();

  marker;
  markerLabel: any;

  setMarkerLabel() {
    this.markerLabel = 'marker';

    if (this.moreInfo &&
      this.moreInfo.renting &&
      this.moreInfo.renting[CONSTANT.KEY_SPACES.RENTING_FEE]) {
      let tempVal = parseFloat(this.moreInfo.renting[CONSTANT.KEY_SPACES.RENTING_FEE]);
      if (tempVal < CONSTANT.PRICE_HUNDRED_UNIT) {
        this.markerLabel = (tempVal / (CONSTANT.PRICE_HUNDRED_UNIT / 100)).toFixed(0) + ' ngàn';
      } else {
        this.markerLabel = (tempVal / CONSTANT.PRICE_UNIT).toFixed(2) + ' triệu';
      }
      // console.log("this.markerLabel", this.markerLabel);
      return this.markerLabel;
    }
  }

  ngOnChanges(changes) {
    console.log("ngOnChanges", changes, this.marker);
    if (changes.selected != undefined) {
      this.setSelected();
    }

    if (this.map && this.position && !this.marker) {
      this.setMarkerLabel();
      if (this.moreInfo && this.moreInfo.renting) {
        this.createHousyMarker();
      } else {
        this.createMarker();
      }
    }
  }

  createHousyMarker() {
    let addOptions: any = {
      label: this.markerLabel,
      selected: this.selected,
    }
    this.marker = new this.HousyMarker(
      this.map,
      this.position,
      _.assignIn(addOptions, this.moreInfo),
      (e, data) => {
        console.log("iiiiiiiiiiiiiiiiiii", e, data);
        if (e === 'click') {
          this.handleMarkerClicked();
        }
      }
    );
  }

  createMarker() {
    if (this.map && this.position) {
      if (!(this.position instanceof google.maps.LatLng)) {
        this.position = new google.maps.LatLng(
          this.position.lat,
          this.position.lng
        );
      }
      let options: any = {
        position: this.position,
        map: this.map
      }

      if (this.icon) {
        options.icon = this.icon;
      }

      this.marker = new google.maps.Marker(options);
      if (!_.isEmpty(this.moreInfo)) {
        this.marker.id = this.moreInfo.id;
      }

      if (this.moreInfo && this.moreInfo.renting) {
        this.marker.addListener('click', () => {
          this.handleMarkerClicked();
        });
      }
    }
  }

  broadcastMarkerClicked() {
    console.log("broadcastMarkerClicked", this.moreInfo.renting.id);
    this.events.publish(
      CONSTANT.EVENTS_NAME.MARKER_CLICKED,
      this.moreInfo.renting.id
    );
  }

  handleMarkerClicked() {
    this.broadcastMarkerClicked();
    console.log("this.marker", this.marker);
  }

  setSelected() {
    if (this.marker && this.marker.isHousyMarker) {
      this.marker.setSelected(this.selected);
      console.log("this.selected 1111111", this.selected);
    }
  }

  HousyMarker;

  createCustomMarker() {
    this.HousyMarker = CustomMarker;

    function CustomMarker(map, position, options ? : any, handleChanged ? ) {
      var _options: any = {};
      _options = _.assign(_options, options);

      if (!(position instanceof google.maps.LatLng)) {
        position = new google.maps.LatLng(position.lat, position.lng);
      }

      // console.log("_options_options_options", _options);
      this.set('map', map);
      this.set('position', position);
      this.set('options', _options);
      this.set('container', null);
      this.set('label', _options.label || 'marker');
      this.set('callback', handleChanged);
      this.set('isHousyMarker', true);
    }

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.onAdd = function() {
      let options = this.get('options');
      let callback = this.get('callback');

      let container = document.createElement('div');
      container.classList.add('housy-marker');
      container.style.cssText = "position: absolute; overflow: hidden;";
      container.draggable = false;

      let content = document.createElement('div');
      content.classList.add('content');
      content.innerHTML = this.get('label');
      container.appendChild(content);

      let shadow = document.createElement('div');
      shadow.classList.add('triangle-down');
      container.appendChild(shadow);

      if (options && options.renting) {
        google.maps.event.addDomListener(container, 'click', (e) => {
          if (callback) {
            callback('click');
          }
        });
      }

      this.set('container', container);
      if (options && options.selected) {
        this.setSelected(options.selected);
      }

      this.getPanes().floatPane.appendChild(container);
    };

    CustomMarker.prototype.draw = function() {
      if (this.get('container')) {
        let width = this.get('container').offsetWidth;
        let height = this.get('container').offsetHeight;

        var pos = this.getProjection().fromLatLngToDivPixel(this.get('position'));
        this.get('container').style.left = pos.x - width / 2 + 'px';
        this.get('container').style.top = pos.y - height + 'px';
      }
    };

    CustomMarker.prototype.onRemove = function() {
      this.get('container').parentNode.removeChild(this.get('container'));
      this.set('container', null)
    };

    CustomMarker.prototype.setSelected = function(isSelected: boolean) {
      let container = this.get('container');
      if (container) {
        let selectedName: string = 'selected';
        if (isSelected) {
          if (!container.classList.contains(selectedName))
            container.classList.add(selectedName);
        } else {
          container.classList.remove(selectedName);
        }
      }
    };
  }
}
