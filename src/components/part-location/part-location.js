var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as _ from 'lodash';
import { NoInternetService } from '../../services/no-internet.service';
import { LocationDetailPage } from '../../pages/location-detail-page/location-detail-page';
import { TYPE_DATA } from '../../templates/type-data';
var PartLocation = (function () {
    function PartLocation(noInternetService, navController) {
        this.noInternetService = noInternetService;
        this.navController = navController;
    }
    PartLocation.prototype.getType = function () {
        if (this.showData) {
            var tempVal = void 0;
            for (var i in TYPE_DATA) {
                tempVal = TYPE_DATA[i];
                if (_.hasIn(this.showData, tempVal.keyword)) {
                    this.type = tempVal.id;
                    break;
                }
            }
        }
    };
    PartLocation.prototype.goToLocation = function (showDirection) {
        console.log("goToLocationgoToLocationgoToLocation");
        // if (!this.noInternetService.hasInternet) {
        //   console.log("k co internet");
        //   return;
        // }
        this.getType();
        this.navController.push(LocationDetailPage, {
            params: {
                data: this.showData,
                showDirection: showDirection,
                type: this.type,
            }
        });
    };
    PartLocation.prototype.showDirectionClicked = function (e) {
        e.stopPropagation();
        this.goToLocation(true);
    };
    return PartLocation;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartLocation.prototype, "showData", void 0);
PartLocation = __decorate([
    Component({
        selector: 'part-location',
        templateUrl: './part-location.html'
    }),
    __metadata("design:paramtypes", [NoInternetService,
        NavController])
], PartLocation);
export { PartLocation };
//# sourceMappingURL=part-location.js.map