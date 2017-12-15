var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
var BasicMap = (function () {
    function BasicMap(elementRef, anywhereService) {
        this.elementRef = elementRef;
        this.anywhereService = anywhereService;
        this.currentMap = new EventEmitter();
        this.basicMapName = CONSTANT.BASIC_MAP_NAME;
    }
    BasicMap.prototype.ngAfterViewInit = function () {
        this.createGooglePlace();
    };
    BasicMap.prototype.createGooglePlace = function () {
        var _this = this;
        var mapEl = this.elementRef.nativeElement.querySelector('#' + this.basicMapName);
        var mapOptions = {
            center: this.center || this.anywhereService.currentLocation,
            zoom: this.zoom || 14,
            fullscreenControl: false,
            mapTypeControl: false,
            zoomControl: false
        };
        if (this.options && !_.isEmpty(this.options)) {
            _.assignIn(mapOptions, this.options);
        }
        this.map = new google.maps.Map(mapEl, mapOptions);
        // this.currentMap.emit(this.map);
        google.maps.event.addListener(this.map, 'idle', function () {
            _this.currentMap.emit(_this.map);
        });
    };
    BasicMap.prototype.ngOnDestroy = function () {
        google.maps.event.clearListeners(this.map, 'idle');
        this.map = undefined;
    };
    return BasicMap;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], BasicMap.prototype, "center", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BasicMap.prototype, "zoom", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BasicMap.prototype, "options", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BasicMap.prototype, "currentMap", void 0);
BasicMap = __decorate([
    Component({
        selector: 'basic-map',
        templateUrl: 'basic-map.html'
    }),
    __metadata("design:paramtypes", [ElementRef,
        AnywhereService])
], BasicMap);
export { BasicMap };
//# sourceMappingURL=basic-map.js.map