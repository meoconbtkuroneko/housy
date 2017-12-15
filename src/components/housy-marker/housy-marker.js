var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { Events } from 'ionic-angular';
import { CONSTANT } from '../../services/constant.service';
import * as _ from 'lodash';
var HousyMarker = (function () {
    function HousyMarker(events) {
        this.events = events;
        this.currentMarker = new EventEmitter();
        this.createCustomMarker();
    }
    HousyMarker.prototype.setMarkerLabel = function () {
        this.markerLabel = 'marker';
        if (this.moreInfo &&
            this.moreInfo.renting &&
            this.moreInfo.renting[CONSTANT.KEY_SPACES.RENTING_FEE]) {
            var tempVal = parseFloat(this.moreInfo.renting[CONSTANT.KEY_SPACES.RENTING_FEE]);
            if (tempVal < CONSTANT.PRICE_HUNDRED_UNIT) {
                this.markerLabel = (tempVal / (CONSTANT.PRICE_HUNDRED_UNIT / 100)).toFixed(0) + ' ngàn';
            }
            else {
                this.markerLabel = (tempVal / CONSTANT.PRICE_UNIT).toFixed(2) + ' triệu';
            }
            // console.log("this.markerLabel", this.markerLabel);
            return this.markerLabel;
        }
    };
    HousyMarker.prototype.ngOnChanges = function (changes) {
        console.log("ngOnChanges", changes, this.marker);
        if (changes.selected != undefined) {
            this.setSelected();
        }
        if (this.map && this.position && !this.marker) {
            this.setMarkerLabel();
            if (this.moreInfo && this.moreInfo.renting) {
                this.createHousyMarker();
            }
            else {
                this.createMarker();
            }
        }
    };
    HousyMarker.prototype.createHousyMarker = function () {
        var _this = this;
        var addOptions = {
            label: this.markerLabel,
            selected: this.selected,
        };
        this.marker = new this.HousyMarker(this.map, this.position, _.assignIn(addOptions, this.moreInfo), function (e, data) {
            console.log("iiiiiiiiiiiiiiiiiii", e, data);
            if (e === 'click') {
                _this.handleMarkerClicked();
            }
        });
    };
    HousyMarker.prototype.createMarker = function () {
        var _this = this;
        if (this.map && this.position) {
            if (!(this.position instanceof google.maps.LatLng)) {
                this.position = new google.maps.LatLng(this.position.lat, this.position.lng);
            }
            var options = {
                position: this.position,
                map: this.map
            };
            if (this.icon) {
                options.icon = this.icon;
            }
            this.marker = new google.maps.Marker(options);
            if (!_.isEmpty(this.moreInfo)) {
                this.marker.id = this.moreInfo.id;
            }
            if (this.moreInfo && this.moreInfo.renting) {
                this.marker.addListener('click', function () {
                    _this.handleMarkerClicked();
                });
            }
        }
    };
    HousyMarker.prototype.broadcastMarkerClicked = function () {
        console.log("broadcastMarkerClicked", this.moreInfo.renting.id);
        this.events.publish(CONSTANT.EVENTS_NAME.MARKER_CLICKED, this.moreInfo.renting.id);
    };
    HousyMarker.prototype.handleMarkerClicked = function () {
        this.broadcastMarkerClicked();
        console.log("this.marker", this.marker);
    };
    HousyMarker.prototype.setSelected = function () {
        if (this.marker && this.marker.isHousyMarker) {
            this.marker.setSelected(this.selected);
            console.log("this.selected 1111111", this.selected);
        }
    };
    HousyMarker.prototype.createCustomMarker = function () {
        this.HousyMarker = CustomMarker;
        function CustomMarker(map, position, options, handleChanged) {
            var _options = {};
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
        CustomMarker.prototype.onAdd = function () {
            var options = this.get('options');
            var callback = this.get('callback');
            var container = document.createElement('div');
            container.classList.add('housy-marker');
            container.style.cssText = "position: absolute; overflow: hidden;";
            container.draggable = false;
            var content = document.createElement('div');
            content.classList.add('content');
            content.innerHTML = this.get('label');
            container.appendChild(content);
            var shadow = document.createElement('div');
            shadow.classList.add('triangle-down');
            container.appendChild(shadow);
            if (options && options.renting) {
                google.maps.event.addDomListener(container, 'click', function (e) {
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
        CustomMarker.prototype.draw = function () {
            if (this.get('container')) {
                var width = this.get('container').offsetWidth;
                var height = this.get('container').offsetHeight;
                var pos = this.getProjection().fromLatLngToDivPixel(this.get('position'));
                this.get('container').style.left = pos.x - width / 2 + 'px';
                this.get('container').style.top = pos.y - height + 'px';
            }
        };
        CustomMarker.prototype.onRemove = function () {
            this.get('container').parentNode.removeChild(this.get('container'));
            this.set('container', null);
        };
        CustomMarker.prototype.setSelected = function (isSelected) {
            var container = this.get('container');
            if (container) {
                var selectedName = 'selected';
                if (isSelected) {
                    if (!container.classList.contains(selectedName))
                        container.classList.add(selectedName);
                }
                else {
                    container.classList.remove(selectedName);
                }
            }
        };
    };
    return HousyMarker;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], HousyMarker.prototype, "map", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HousyMarker.prototype, "icon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HousyMarker.prototype, "position", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HousyMarker.prototype, "moreInfo", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HousyMarker.prototype, "selected", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], HousyMarker.prototype, "currentMarker", void 0);
HousyMarker = __decorate([
    Component({
        selector: 'housy-marker',
        templateUrl: 'housy-marker.html'
    }),
    __metadata("design:paramtypes", [Events])
], HousyMarker);
export { HousyMarker };
//# sourceMappingURL=housy-marker.js.map