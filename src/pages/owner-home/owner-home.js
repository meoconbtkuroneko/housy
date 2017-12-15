var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AnywhereService } from '../../services/anywhere.service';
import { OwnerHomeTabRenting } from '../owner-home-tab-renting/owner-home-tab-renting';
import { OwnerHomeTabTaken } from '../owner-home-tab-taken/owner-home-tab-taken';
var OwnerHomePage = (function () {
    function OwnerHomePage(anywhereService) {
        this.anywhereService = anywhereService;
        this.ownerTab1Root = OwnerHomeTabRenting;
        this.ownerTab2Root = OwnerHomeTabTaken;
    }
    OwnerHomePage.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('show');
    };
    return OwnerHomePage;
}());
OwnerHomePage = __decorate([
    Component({
        selector: 'owner-home',
        templateUrl: 'owner-home.html'
    }),
    __metadata("design:paramtypes", [AnywhereService])
], OwnerHomePage);
export { OwnerHomePage };
//# sourceMappingURL=owner-home.js.map