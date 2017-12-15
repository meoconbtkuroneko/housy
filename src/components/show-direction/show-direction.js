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
import { AnywhereService } from '../../services/anywhere.service';
import { MapService } from '../../services/map.service';
import { CONSTANT } from '../../services/constant.service';
var ShowDirection = (function () {
    function ShowDirection(elementRef, anywhereService, events, mapService) {
        this.elementRef = elementRef;
        this.anywhereService = anywhereService;
        this.events = events;
        this.mapService = mapService;
        this.panelId = 'panel-detail';
        this.barId = 'barId';
        // 0: an, 1: hien 1 nua, 2: an
        this.fullLevel = 0;
    }
    ShowDirection.prototype.ngAfterViewInit = function () {
        this.addEventDirection();
    };
    ShowDirection.prototype.initDirectionBase = function () {
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
        this.request = {
            origin: this.anywhereService.currentLocation,
            destination: this.toLocation,
            travelMode: 'DRIVING'
        };
    };
    ShowDirection.prototype.ngOnChanges = function (changes) {
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
    };
    ShowDirection.prototype.createRoute = function () {
        var _this = this;
        console.log("createRoute");
        if (!this.anywhereService.currentLocation) {
            if (!this.errGetCurrentLocation) {
                console.log("chua co currentLocation");
                return this.mapService.init(function (pos) {
                    if (pos && pos.lat && pos.lng) {
                        _this.request.origin = _this.anywhereService.currentLocation;
                        _this.errGetCurrentLocation = undefined;
                    }
                    else {
                        _this.errGetCurrentLocation = true;
                        console.log("this.errGetCurrentLocation", _this.errGetCurrentLocation);
                    }
                    return _this.createRoute();
                });
            }
            else {
                this.errGetCurrentLocation = undefined;
                console.log("chua co curen nhung loi roi");
                return this.anywhereService.showToast(CONSTANT.MAP.POSITION_UNAVAILABLE);
            }
        }
        this.directionsService.route(this.request, function (result, status) {
            console.log("this.directionsService.route", result, status);
            if (status == 'OK') {
                _this.directionsDisplay.setDirections(result);
            }
            _this.hasCreatedRoute = true;
            if (_this.waiting) {
                _this.waiting = undefined;
                _this.toggleDirection();
            }
        });
        console.log("da cooooooooooooooo");
    };
    ShowDirection.prototype.toggleDirection = function () {
        if (this.showDirection) {
            if (this.map && this.hasCreatedRoute) {
                console.log("toggleDirectiontoggleDirection 22222");
                if (this.showDirection) {
                    this.directionsDisplay.setMap(this.map);
                    this.directionsDisplay.setPanel(this.elPanel);
                }
            }
            else {
                this.waiting = true;
                console.log("chuaaaaaaaaaaaaaaaaaaaa");
            }
        }
        else {
            this.directionsDisplay.setMap(null);
            this.directionsDisplay.setPanel(null);
            this.fullLevel = 0;
        }
    };
    ShowDirection.prototype.addEventDirection = function () {
        var _this = this;
        this.elPanel = this.elementRef.nativeElement.querySelector('#' + this.panelId);
        this.elPanelBar = this.elementRef.nativeElement.querySelector('#' + this.barId);
        this.elPanelBar.addEventListener('touchmove', function (e) {
            _this.handleTouchMove(e);
        });
        this.elPanelBar.addEventListener('touchend', function (e) {
            _this.handleTouchEnd(e);
        });
    };
    ShowDirection.prototype.handleTouchMove = function (e) {
        e.stopPropagation();
        var tempVal = e.touches && e.touches.item(0);
        this.oldVal = _.clone(this.newVal);
        this.newVal = tempVal && _.clone(tempVal.pageY) || undefined;
    };
    ShowDirection.prototype.handleTouchEnd = function (e) {
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
                    if (direction === "up") {
                        this.fullLevel = 2;
                        break;
                    }
                    else if (direction === "down" || direction === "click") {
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
    };
    ShowDirection.prototype.detectMove = function () {
        if (this.oldVal > this.newVal) {
            return 'up';
        }
        else if (this.oldVal < this.newVal) {
            return 'down';
        }
        return 'click';
    };
    return ShowDirection;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ShowDirection.prototype, "map", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ShowDirection.prototype, "toLocation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ShowDirection.prototype, "showDirection", void 0);
ShowDirection = __decorate([
    Component({
        selector: 'show-direction',
        templateUrl: 'show-direction.html'
    }),
    __metadata("design:paramtypes", [ElementRef,
        AnywhereService,
        Events,
        MapService])
], ShowDirection);
export { ShowDirection };
//# sourceMappingURL=show-direction.js.map