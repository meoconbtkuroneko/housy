import {
  Injectable,
} from '@angular/core';

import {
  Events,
} from 'ionic-angular';

import { Network } from '@ionic-native/network';

import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';

@Injectable()
export class NoInternetService {
  hasShowNotification: boolean;
  noInternetTitle = CONSTANT.NETWORK.NO_INTERNET_TITLE;
  hasInternet: boolean;
  toastInternet;

  constructor(
    private anywhereService: AnywhereService,
    private network: Network,
    public events: Events,
  ) {
    // test
    if (!CONSTANT.REAL_DEVICE) {
      // this.enableTestInternet();
    }
  }

  init(callback ? ) {
    console.log('init', this.network.type);
    this.onDisconnect();
    this.onConnect();
    let hasInternet = this.hasInternetConnection();
    this.broadcastHasInternetChange(hasInternet);

    if (hasInternet) {
      return this.addScriptGoogleMap(callback);
    }

    if (callback) {
      callback(hasInternet);
    }
  }

  // xoa do nhe
  private enableTestInternet() {
    setTimeout(() => {
      this.broadcastHasInternetChange(true);
    }, 1);
    setTimeout(() => {
      this.broadcastHasInternetChange(false);
    }, 10000);

    setTimeout(() => {
      this.broadcastHasInternetChange(true);
    }, 20000);

    setTimeout(() => {
      this.broadcastHasInternetChange(true);
    }, 25000)

    setTimeout(() => {
      this.broadcastHasInternetChange(false);
    }, 37000)

    setTimeout(() => {
      this.broadcastHasInternetChange(true);
    }, 47000)

    setTimeout(() => {
      this.broadcastHasInternetChange(false);
    }, 50000)

    setTimeout(() => {
      this.broadcastHasInternetChange(true);
    }, 52000)

    setTimeout(() => {
      this.broadcastHasInternetChange(false);
    }, 57000)

    setTimeout(() => {
      this.broadcastHasInternetChange(true);
    }, 60000)

    setTimeout(() => {
      this.broadcastHasInternetChange(false);
    }, 65000)

    setTimeout(() => {
      this.broadcastHasInternetChange(true);
    }, 80000)
  }

  broadcastHasInternetChange(hasInternet: boolean) {
    this.hasInternet = hasInternet;
    this.events.publish(CONSTANT.EVENTS_NAME.INTERNET_CHANGED, hasInternet);
  }

  hasInternetConnection() {
    let type = this.network.type;
    if (type === "unknown" || type === 'none') {
      return false;
    }
    return true;
  }

  private addScriptGoogleMap(callback ? ) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=AIzaSyAW8_BS3rnc0y5vgofEsS3eNfyCxOoty4c&language=vi";
    document.head.appendChild(script);
    script.onload = () => {
      console.log("Script loaded and ready");
      if (callback) {
        callback(true);
      }
    };
  }

  // watch network for a connection
  private onConnect() {
    this.network.onConnect()
      .subscribe(() => {
        console.log('network connected!');
        this.broadcastHasInternetChange(true);
      });
  }

  // watch network for a disconnect
  private onDisconnect() {
    this.network.onDisconnect()
      .subscribe(() => {
        console.log('network was disconnected :-(');
        this.broadcastHasInternetChange(false);

      });
  }

  createInternetNotification() {
    this.toastInternet = this.anywhereService.showToast(this.noInternetTitle);
  }
}
