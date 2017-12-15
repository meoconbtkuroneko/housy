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
import { CONSTANT } from '../../services/constant.service';
import { HostProfile } from '../../pages/host-profile/host-profile';
import { NoInternetService } from '../../services/no-internet.service';
var TopUsers = (function () {
    function TopUsers(navController, noInternetService) {
        this.navController = navController;
        this.noInternetService = noInternetService;
        this.typeRole = CONSTANT.SERVER.TYPE_ROLE;
    }
    ;
    TopUsers.prototype.goToUser = function () {
        // if (!this.noInternetService.hasInternet) {
        //   console.log("k co internet");
        //   return;
        // }
        this.navController.push(HostProfile, { params: { id: this.cardData.id } });
    };
    return TopUsers;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], TopUsers.prototype, "cardData", void 0);
TopUsers = __decorate([
    Component({
        selector: 'top-users',
        templateUrl: './top-users.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NoInternetService])
], TopUsers);
export { TopUsers };
//# sourceMappingURL=top-users.js.map