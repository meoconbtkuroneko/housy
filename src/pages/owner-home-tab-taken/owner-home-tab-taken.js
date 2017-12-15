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
// import * as _ from 'lodash';
import { GetService } from '../../services/get.service';
// import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
var OwnerHomeTabTaken = (function () {
    function OwnerHomeTabTaken(getService, anywhereService) {
        this.getService = getService;
        this.anywhereService = anywhereService;
        this.ownerTab1Root = this;
        this.ownerTab2Root = this;
    }
    OwnerHomeTabTaken.prototype.ngOnInit = function () {
        this.initTabs();
    };
    ;
    OwnerHomeTabTaken.prototype.initTabs = function () { };
    OwnerHomeTabTaken.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('show');
    };
    return OwnerHomeTabTaken;
}());
OwnerHomeTabTaken = __decorate([
    Component({
        selector: 'owner-home-tab-taken',
        templateUrl: 'owner-home-tab-taken.html'
    }),
    __metadata("design:paramtypes", [GetService,
        AnywhereService])
], OwnerHomeTabTaken);
export { OwnerHomeTabTaken };
//# sourceMappingURL=owner-home-tab-taken.js.map