var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, } from '@angular/core';
import { Events, NavParams, ViewController, Content, } from 'ionic-angular';
import { MapService } from '../../services/map.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { HistorySearch } from '../../templates/history-search';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
var ChooseAddress = (function (_super) {
    __extends(ChooseAddress, _super);
    function ChooseAddress(anywhereService, viewController, navParams, events, coreServices, elementRef, mapService) {
        var _this = _super.call(this, coreServices) || this;
        _this.anywhereService = anywhereService;
        _this.viewController = viewController;
        _this.navParams = navParams;
        _this.events = events;
        _this.coreServices = coreServices;
        _this.elementRef = elementRef;
        _this.mapService = mapService;
        _this.markerSrc = CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.STATIC_MARKER;
        return _this;
    }
    ChooseAddress.prototype.ngOnInit = function () {
        this.params = this.navParams.get('params');
        console.log("this.params", this.params);
        if (this.params &&
            this.params.name &&
            this.params.location) {
            this.center = new google.maps.LatLng(this.params.location.lat, this.params.location.lng);
            this.addressObj = new HistorySearch(this.params.name, this.params.location.lat, this.params.location.lng);
        }
        else {
            this.center = new google.maps.LatLng(10.823099, 106.629664);
        }
    };
    ChooseAddress.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('hide');
    };
    ChooseAddress.prototype.getMap = function (map) {
        if (!this.currentMap) {
            this.currentMap = map;
        }
        // this.center = this.currentMap.getCenter();
        // console.log("this.center", this.center.lat(), this.center.lng());
        // this.addressObj && (this.addressObj.location = {
        //   lat: this.center.lat(),
        //   lng: this.center.lng(),
        // });
    };
    ChooseAddress.prototype.saveAddress = function () {
        console.log("saveAddresssaveAddress");
        this.beforeSave();
        if (this.addressObj && this.addressObj.name) {
            this.broadcastSelectAddress(this.addressObj);
            this.closeModal();
        }
        else {
            this.anywhereService.showToast(CONSTANT.NOT_ENOUGH_ADDRESS);
        }
    };
    ChooseAddress.prototype.beforeSave = function () {
        var tempCenter = this.currentMap.getCenter();
        this.addressObj && (this.addressObj.location = {
            lat: tempCenter.lat(),
            lng: tempCenter.lng(),
        });
    };
    ChooseAddress.prototype.broadcastSelectAddress = function (addressObj) {
        this.events.publish(CONSTANT.EVENTS_NAME.SELECT_ADDRESS, addressObj);
    };
    ChooseAddress.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    ChooseAddress.prototype.getAddress = function (addressObj) {
        console.log("getAddress aaaaaaaaaa", addressObj);
        this.addressObj = addressObj;
        if (!this.addressObj) {
            return;
        }
        var currentCenter = new google.maps.LatLng(this.addressObj.location);
        this.currentMap.setCenter(currentCenter);
    };
    // get and search house at currentPosition 
    ChooseAddress.prototype.currentPosition = function () {
        var _this = this;
        if (this.isProcessing) {
            return;
        }
        this.currentToast = this.anywhereService.showToast(CONSTANT.MAP.LOADING, 9999999999, true);
        this.toggleIsProcessing(true);
        this.mapService.init(function (pos) {
            if (pos && pos.lat && pos.lng) {
                _this.mapService.convertFromLatLngToAddress(pos.lat, pos.lng)
                    .subscribe(function (res) {
                    // console.log("convertFromLatLngToAddress", res);
                    var currentPlace = res[0];
                    _this.addressObj = new HistorySearch(currentPlace.formatted_address, _this.anywhereService.currentLocation.lat(), _this.anywhereService.currentLocation.lng(), currentPlace.place_id);
                    _this.finishCurrentLocation();
                }, function (err) {
                    _this.handleErrCurrentLocation();
                });
            }
            else {
                _this.handleErrCurrentLocation();
            }
        });
    };
    ChooseAddress.prototype.handleErrCurrentLocation = function () {
        this.finishCurrentLocation();
        this.anywhereService.showToast(CONSTANT.MAP.POSITION_UNAVAILABLE);
    };
    ChooseAddress.prototype.finishCurrentLocation = function () {
        this.currentToast.dismissAll();
        this.toggleIsProcessing(false);
    };
    return ChooseAddress;
}(CoreSimpleClass));
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], ChooseAddress.prototype, "content", void 0);
ChooseAddress = __decorate([
    Component({
        selector: 'choose-address',
        templateUrl: 'choose-address.html'
    }),
    __metadata("design:paramtypes", [AnywhereService,
        ViewController,
        NavParams,
        Events,
        CoreServices,
        ElementRef,
        MapService])
], ChooseAddress);
export { ChooseAddress };
//# sourceMappingURL=choose-address.js.map