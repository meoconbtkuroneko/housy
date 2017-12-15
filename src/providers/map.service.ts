import { Injectable } from '@angular/core';

import { CONSTANT } from './constant.service';
import {
  Events,
  Platform
} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class MapService {
  autocompleteService;
  detailsService;
  geocoder;

  currentLocation = {
    lat: null,
    lng: null
  }
  callBack = null;
  callbackErr = null;
  constructor(private events: Events,
    private platform: Platform,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation) {}

  init(callBack ? ) {
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.detailsService = new google.maps.places.PlacesService(document.createElement('div'));
    this.geocoder = new google.maps.Geocoder();

    if (callBack) {
      this.callBack = callBack;
    }

    if (CONSTANT.REAL_DEVICE) {
      this.checkAvailability();
    } else {
      this.getCurrentPositionBrowser();
      console.log("---------------initializeApp MapService")
    }
  }

  private getCurrentPositionBrowser() {
    console.log("----navigator.geolocation--------", navigator.geolocation)
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(data => {
        this.showPosition(data)
      }, err => {
        this.showPosition(undefined);

        console.log("---errerrerrerrerrerrerrerrerrerr--------", err)
      });
    } else {
      this.showPosition(undefined);
    }
  }

  private getCurrentPosition() {
    // console.log("----getCurrentPosition---START--------")
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      // console.log('success(r) getting location', resp);
      this.showPosition(resp);
    }).catch((error) => {
      this.showPosition(undefined);
      console.log('Error getting location', error);
    });

  }

  private showPosition(position) {
    console.log("----showPosition-----------", position)
    if (position) {
      this.currentLocation.lat = position.coords.latitude;
      this.currentLocation.lng = position.coords.longitude;
      this.events.publish('setCurrentPosition', this.currentLocation);
      this.detectHCMCity(this.currentLocation.lat, this.currentLocation.lng);
    }
    if (this.callBack)
      this.callBack(this.currentLocation);
  }

  detectHCMCity(lat, lng) {
    this.convertFromLatLngToAddress(lat, lng).subscribe(results => {
      if (results) {
        this._handleDetectLocation(results);
      }
    })
  }

  _handleDetectLocation(addressComponents) {
    let isHCM = false;
    for (let i = 0; i < addressComponents.length; i++) {
      let formatted_address = addressComponents[i].formatted_address;
      if (formatted_address.indexOf(CONSTANT.DETECT_LOCATION.HCM.V1) > -1 ||
        formatted_address.indexOf(CONSTANT.DETECT_LOCATION.HCM.V2) > -1 ||
        formatted_address.indexOf(CONSTANT.DETECT_LOCATION.HCM.V2) > -1) {
        isHCM = true;
        console.log(">>>>>>>>isHCM>>>>>>>>>>>>  ", isHCM)
      }
    }
    this.events.publish('isHCMCity', isHCM);

  }

  /* ***********************************************************
   *    Yêu cầu sự cho phép sử dụng Location và bật tắt GPS
   *    Permission to use Location and GPS
  /* ***********************************************************/
  checkAvailability() {
    // console.log("----checkAvailability----------- START");
    this.diagnostic.isGpsLocationAvailable().then((available) => {
      if (!available) {
        // console.log("----checkAvailability--NOT-available------- ", available);
        this.checkAuthorization();
      } else {
        //GPS location is ready to use
        // console.log("----checkAvailability--ALREADY-available------- ", available);
        this.checkDeviceSetting();
      }
    });
  }

  /* ***********************************************************
     * Asking for author use location
  /* ***********************************************************/
  private checkAuthorization() {
    // console.log("----checkAuthorization- ----- START");
    this.diagnostic.isLocationAuthorized().then((authorized) => {

      if (authorized) {
        this.checkDeviceSetting();
        // console.log("----checkAuthorization- -authorized---- TRUE", authorized);

      } else {
        // console.log("----checkAuthorization- -authorized---- FALSE", authorized);

        this.diagnostic.requestLocationAuthorization('always').then((status) => {
          // console.log("----requestLocationAuthorization- -authorized---- ", status);

          switch (status) {
            case this.diagnostic.permissionStatus.GRANTED:
              this.checkDeviceSetting();
              break;
            case this.diagnostic.permissionStatus.DENIED:
              // User denied permission
              this.showPosition(undefined);
              break;
            case this.diagnostic.permissionStatus.DENIED_ALWAYS:
              // User denied ALWAYS permission
              this.showPosition(undefined);
              break;
          }
        });
      }
    });
  }

  private checkDeviceSetting() {
    // console.log("----checkDeviceSetting- ----- START");

    this.diagnostic.isGpsLocationEnabled().then((enabled) => {
      // console.log("----checkDeviceSetting- --isGpsLocationEnabled--", enabled);
      if (!enabled) {
        // console.log("----checkDeviceSetting- --isGpsLocationEnabled-FALSE--", enabled);
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((success) => {
          // console.log("----checkDeviceSetting- --locationAccuracy.request-success--", success);
          this.checkLocationGPSEnabled();
        }, error => {
          if (error.code !== this.locationAccuracy.ERROR_USER_DISAGREED) {
            if (confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
              this.diagnostic.switchToLocationSettings();
            }
          }
        });
      } else {
        this.checkLocationGPSEnabled();
      }
    });

  }

  private checkLocationGPSEnabled() {
    // console.log("----checkLocationGPSEnabled----- START");

    this.diagnostic.isLocationAvailable().then(function(available) {
      // console.log("----isLocationAvailable----- START", available);
    }, function(error) {
      // console.log("----isLocationAvailable----- EEEEEEE", error);
    });

    this.diagnostic.isLocationEnabled().then((enabled) => {
      let locationGPSEnabled = enabled;
      // console.log("----isLocationEnabled----- START", enabled);

      if (locationGPSEnabled) {
        this.successCallback();
      } else {
        // console.log("----switchToLocationSettings----- START");
        this.diagnostic.switchToLocationSettings();
      }

    });
  }

  private successCallback() {
    // console.log("----successCallback----- START");
    this.getCurrentPosition();
  }

  /*---------------------------------------------------*/

  public convertFromLatLngToAddress(lat, lng) {
    let latlng = { lat: lat, lng: lng };
    return Observable.create((observer) => {
      this.geocoder.geocode({ 'location': latlng },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            observer.next(results);
          } else {
            observer.next(null);
          }
        }
      );
    });
  }

  public convertFromStringToAddress(string) {
    return Observable.create((observer) => {
      this.geocoder.geocode({
        'address': string
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results);
        } else {
          observer.next(null);
        }
      });
    });
  }

  /*suggestAddress:
      + input: word of location need suggestion
    */
  suggestAddress(input) {
    return Observable.create((observer) => {
      this.autocompleteService.getPlacePredictions({
        input: input
      }, (result, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          observer.next(result);
        } else {
          observer.next(status);
        }
      });
    })
  }

  /* Accepts a place ID, finds the corresponding address, and centers the map at that location. so on...  */
  getDetailsByPlaceId(placeId) {
    return Observable.create((observer) => {
      this.detailsService.getDetails({ placeId: placeId }, (result) => {
        observer.next(result);
      });
    })
  }

}
