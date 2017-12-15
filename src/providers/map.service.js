var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { CONSTANT } from './constant.service';
import { Events, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
var MapService = (function () {
    function MapService(events, platform, diagnostic, locationAccuracy, geolocation) {
        this.events = events;
        this.platform = platform;
        this.diagnostic = diagnostic;
        this.locationAccuracy = locationAccuracy;
        this.geolocation = geolocation;
        this.currentLocation = {
            lat: null,
            lng: null
        };
        this.callBack = null;
        this.callbackErr = null;
    }
    MapService.prototype.init = function (callBack) {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.detailsService = new google.maps.places.PlacesService(document.createElement('div'));
        this.geocoder = new google.maps.Geocoder();
        if (callBack) {
            this.callBack = callBack;
        }
        if (CONSTANT.REAL_DEVICE) {
            this.checkAvailability();
        }
        else {
            this.getCurrentPositionBrowser();
            console.log("---------------initializeApp MapService");
        }
    };
    MapService.prototype.getCurrentPositionBrowser = function () {
        var _this = this;
        console.log("----navigator.geolocation--------", navigator.geolocation);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (data) {
                _this.showPosition(data);
            }, function (err) {
                _this.showPosition(undefined);
                console.log("---errerrerrerrerrerrerrerrerrerr--------", err);
            });
        }
        else {
            this.showPosition(undefined);
        }
    };
    MapService.prototype.getCurrentPosition = function () {
        var _this = this;
        // console.log("----getCurrentPosition---START--------")
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
            // console.log('success(r) getting location', resp);
            _this.showPosition(resp);
        }).catch(function (error) {
            _this.showPosition(undefined);
            console.log('Error getting location', error);
        });
    };
    MapService.prototype.showPosition = function (position) {
        console.log("----showPosition-----------", position);
        if (position) {
            this.currentLocation.lat = position.coords.latitude;
            this.currentLocation.lng = position.coords.longitude;
            this.events.publish('setCurrentPosition', this.currentLocation);
            this.detectHCMCity(this.currentLocation.lat, this.currentLocation.lng);
        }
        if (this.callBack)
            this.callBack(this.currentLocation);
    };
    MapService.prototype.detectHCMCity = function (lat, lng) {
        var _this = this;
        this.convertFromLatLngToAddress(lat, lng).subscribe(function (results) {
            if (results) {
                _this._handleDetectLocation(results);
            }
        });
    };
    MapService.prototype._handleDetectLocation = function (addressComponents) {
        var isHCM = false;
        for (var i = 0; i < addressComponents.length; i++) {
            var formatted_address = addressComponents[i].formatted_address;
            if (formatted_address.indexOf(CONSTANT.DETECT_LOCATION.HCM.V1) > -1 ||
                formatted_address.indexOf(CONSTANT.DETECT_LOCATION.HCM.V2) > -1 ||
                formatted_address.indexOf(CONSTANT.DETECT_LOCATION.HCM.V2) > -1) {
                isHCM = true;
                console.log(">>>>>>>>isHCM>>>>>>>>>>>>  ", isHCM);
            }
        }
        this.events.publish('isHCMCity', isHCM);
    };
    /* ***********************************************************
     *    Yêu cầu sự cho phép sử dụng Location và bật tắt GPS
     *    Permission to use Location and GPS
    /* ***********************************************************/
    MapService.prototype.checkAvailability = function () {
        var _this = this;
        // console.log("----checkAvailability----------- START");
        this.diagnostic.isGpsLocationAvailable().then(function (available) {
            if (!available) {
                // console.log("----checkAvailability--NOT-available------- ", available);
                _this.checkAuthorization();
            }
            else {
                //GPS location is ready to use
                // console.log("----checkAvailability--ALREADY-available------- ", available);
                _this.checkDeviceSetting();
            }
        });
    };
    /* ***********************************************************
       * Asking for author use location
    /* ***********************************************************/
    MapService.prototype.checkAuthorization = function () {
        var _this = this;
        // console.log("----checkAuthorization- ----- START");
        this.diagnostic.isLocationAuthorized().then(function (authorized) {
            if (authorized) {
                _this.checkDeviceSetting();
                // console.log("----checkAuthorization- -authorized---- TRUE", authorized);
            }
            else {
                // console.log("----checkAuthorization- -authorized---- FALSE", authorized);
                _this.diagnostic.requestLocationAuthorization('always').then(function (status) {
                    // console.log("----requestLocationAuthorization- -authorized---- ", status);
                    switch (status) {
                        case _this.diagnostic.permissionStatus.GRANTED:
                            _this.checkDeviceSetting();
                            break;
                        case _this.diagnostic.permissionStatus.DENIED:
                            // User denied permission
                            _this.showPosition(undefined);
                            break;
                        case _this.diagnostic.permissionStatus.DENIED_ALWAYS:
                            // User denied ALWAYS permission
                            _this.showPosition(undefined);
                            break;
                    }
                });
            }
        });
    };
    MapService.prototype.checkDeviceSetting = function () {
        // console.log("----checkDeviceSetting- ----- START");
        var _this = this;
        this.diagnostic.isGpsLocationEnabled().then(function (enabled) {
            // console.log("----checkDeviceSetting- --isGpsLocationEnabled--", enabled);
            if (!enabled) {
                // console.log("----checkDeviceSetting- --isGpsLocationEnabled-FALSE--", enabled);
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function (success) {
                    // console.log("----checkDeviceSetting- --locationAccuracy.request-success--", success);
                    _this.checkLocationGPSEnabled();
                }, function (error) {
                    if (error.code !== _this.locationAccuracy.ERROR_USER_DISAGREED) {
                        if (confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                            _this.diagnostic.switchToLocationSettings();
                        }
                    }
                });
            }
            else {
                _this.checkLocationGPSEnabled();
            }
        });
    };
    MapService.prototype.checkLocationGPSEnabled = function () {
        // console.log("----checkLocationGPSEnabled----- START");
        var _this = this;
        this.diagnostic.isLocationAvailable().then(function (available) {
            // console.log("----isLocationAvailable----- START", available);
        }, function (error) {
            // console.log("----isLocationAvailable----- EEEEEEE", error);
        });
        this.diagnostic.isLocationEnabled().then(function (enabled) {
            var locationGPSEnabled = enabled;
            // console.log("----isLocationEnabled----- START", enabled);
            if (locationGPSEnabled) {
                _this.successCallback();
            }
            else {
                // console.log("----switchToLocationSettings----- START");
                _this.diagnostic.switchToLocationSettings();
            }
        });
    };
    MapService.prototype.successCallback = function () {
        // console.log("----successCallback----- START");
        this.getCurrentPosition();
    };
    /*---------------------------------------------------*/
    MapService.prototype.convertFromLatLngToAddress = function (lat, lng) {
        var _this = this;
        var latlng = { lat: lat, lng: lng };
        return Observable.create(function (observer) {
            _this.geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results);
                }
                else {
                    observer.next(null);
                }
            });
        });
    };
    MapService.prototype.convertFromStringToAddress = function (string) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.geocoder.geocode({
                'address': string
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results);
                }
                else {
                    observer.next(null);
                }
            });
        });
    };
    /*suggestAddress:
        + input: word of location need suggestion
      */
    MapService.prototype.suggestAddress = function (input) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.autocompleteService.getPlacePredictions({
                input: input
            }, function (result, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    observer.next(result);
                }
                else {
                    observer.next(status);
                }
            });
        });
    };
    /* Accepts a place ID, finds the corresponding address, and centers the map at that location. so on...  */
    MapService.prototype.getDetailsByPlaceId = function (placeId) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.detailsService.getDetails({ placeId: placeId }, function (result) {
                observer.next(result);
            });
        });
    };
    return MapService;
}());
MapService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Events,
        Platform,
        Diagnostic,
        LocationAccuracy,
        Geolocation])
], MapService);
export { MapService };
//# sourceMappingURL=map.service.js.map