var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, } from '@angular/core';
import { Events } from 'ionic-angular';
import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';
var NearbySearch = (function () {
    function NearbySearch(elementRef, events) {
        this.elementRef = elementRef;
        this.events = events;
        this.nearbyMarkers = {};
        this.barId = 'barId';
        // 0: an, 1: hien 1 nua, 2: an
        this.fullLevel = 0;
    }
    NearbySearch.prototype.ngAfterViewInit = function () {
        this.googleTypePlaces = _.cloneDeep(CONSTANT.GOOGLE_TYPE_PLACES);
        this.addEventDirection();
    };
    NearbySearch.prototype.addEventDirection = function () {
        var _this = this;
        this.elPanelBar = this.elementRef.nativeElement.querySelector('#' + this.barId);
        this.elPanelBar.addEventListener('touchmove', function (e) {
            _this.handleTouchMove(e);
        });
        this.elPanelBar.addEventListener('touchend', function (e) {
            _this.handleTouchEnd(e);
        });
    };
    NearbySearch.prototype.handleTouchMove = function (e) {
        var tempVal = e.touches && e.touches.item(0);
        this.oldVal = _.clone(this.newVal);
        this.newVal = tempVal && _.clone(tempVal.pageY) || undefined;
    };
    NearbySearch.prototype.handleTouchEnd = function (e) {
        var direction = this.detectMove();
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
        this.events.publish(CONSTANT.EVENTS_NAME.NEARBY_SEARCH_CLICKED, this.fullLevel);
        this.oldVal = this.newVal = undefined;
    };
    NearbySearch.prototype.detectMove = function () {
        if (this.oldVal > this.newVal) {
            return 'up';
        }
        else if (this.oldVal < this.newVal) {
            return 'down';
        }
        return 'click';
    };
    NearbySearch.prototype.toggleDisable = function (data) {
        var index = this.getTypePlaceIndex(data.id);
        if (index > -1) {
            this.googleTypePlaces[index].disable = _.clone(data.val);
            return this.googleTypePlaces;
        }
    };
    NearbySearch.prototype.searchChanged = function (e, item) {
        var typePlace = item.id;
        // this.broadcastToogleDisableItem({
        //   id: typePlace,
        //   val: true
        // });
        this.clearMarkers(typePlace, item.selecting);
        if (item.selecting) {
            this.doSearchNeighborPlaces(typePlace);
        }
    };
    NearbySearch.prototype.getTypePlaceIndex = function (typePlace) {
        return _.findIndex(this.googleTypePlaces, {
            id: typePlace
        });
    };
    NearbySearch.prototype.doSearchNeighborPlaces = function (typePlace) {
        var _this = this;
        if (this.map) {
            this.center = this.map.center;
            var ne = this.map.getBounds().getNorthEast();
            var sw = this.map.getBounds().getSouthWest();
            var service = new google.maps.places.PlacesService(this.map);
            var distanceFromNEToSW = google.maps.geometry.spherical.computeDistanceBetween(ne, sw);
            return service.nearbySearch({
                location: this.center,
                radius: distanceFromNEToSW / 2,
                type: typePlace
            }, function (result, status) {
                _this.doSearchNeighborPlacesCallback(result, status, typePlace);
            });
        }
    };
    NearbySearch.prototype.doSearchNeighborPlacesCallback = function (results, status, typePlace) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (_.isEmpty(this.nearbyMarkers[typePlace])) {
                this.nearbyMarkers[typePlace] = [];
            }
            return this.createNeighborPlacesMarkers(results, typePlace);
        }
        return;
    };
    NearbySearch.prototype.createNeighborPlacesMarkers = function (results, typePlace) {
        for (var i = 0; i < results.length; i++) {
            this.createNeighborPlacesMarker(results[i], typePlace);
            // if (i == results.length - 1) {
            //   this.broadcastToogleDisableItem({
            //     id: typePlace,
            //     val: false
            //   });
            // }
        }
    };
    NearbySearch.prototype.createNeighborPlacesMarker = function (place, typePlace) {
        var _this = this;
        var placeLoc = place.geometry.location;
        var iconObj = _.find(this.googleTypePlaces, {
            id: typePlace
        });
        var marker = new google.maps.Marker({
            map: this.map,
            position: placeLoc,
            icon: CONSTANT.IMAGE.ICON_NEARBY_PATH + iconObj.icon,
        });
        var content = "<b>" + place.name + "</b>" + "<br>" + place.vicinity;
        var infowindow = new google.maps.InfoWindow({
            content: content,
        });
        marker.addListener('click', function () {
            if (_this.currentInfoWindow) {
                _this.currentInfoWindow.close();
            }
            infowindow.open(_this.map, marker);
            _this.currentInfoWindow = infowindow;
        });
        var isExist = (_.indexOf(this.nearbyMarkers[typePlace], marker) > -1);
        if (!isExist) {
            this.nearbyMarkers[typePlace].push(marker);
        }
    };
    NearbySearch.prototype.clearMarkers = function (typePlace, isChecked) {
        if (this.nearbyMarkers[typePlace]) {
            if (isChecked) {
                var bound = this.map.getBounds();
                var tempVal = void 0;
                for (var i in this.nearbyMarkers[typePlace]) {
                    tempVal = this.nearbyMarkers[typePlace][i];
                    if (!bound.contains(tempVal.getPosition())) {
                        this.nearbyMarkers[typePlace][i].setMap(null);
                        this.nearbyMarkers[typePlace].splice(i, 1);
                    }
                }
            }
            else {
                for (var i in this.nearbyMarkers[typePlace]) {
                    this.nearbyMarkers[typePlace][i].setMap(null);
                }
                this.nearbyMarkers[typePlace] = undefined;
            }
            // this.broadcastToogleDisableItem({
            //   id: typePlace,
            //   val: false
            // });
        }
    };
    return NearbySearch;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], NearbySearch.prototype, "map", void 0);
NearbySearch = __decorate([
    Component({
        selector: 'nearby-search',
        templateUrl: 'nearby-search.html'
    }),
    __metadata("design:paramtypes", [ElementRef,
        Events])
], NearbySearch);
export { NearbySearch };
//# sourceMappingURL=nearby-search.js.map