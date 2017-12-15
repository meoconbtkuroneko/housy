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
import { ViewController, NavParams, } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
import { CommonService } from '../../services/common.service';
var AdvPage = (function () {
    function AdvPage(viewController, anywhereService, commonService, navParams) {
        this.viewController = viewController;
        this.anywhereService = anywhereService;
        this.commonService = commonService;
        this.navParams = navParams;
    }
    ;
    AdvPage.prototype.ngOnInit = function () {
        this.initVals();
    };
    AdvPage.prototype.initVals = function () {
        this.showData = this.navParams.get('params');
        console.log("this.advantagesArr", this.showData);
    };
    AdvPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    return AdvPage;
}());
AdvPage = __decorate([
    Component({
        selector: 'adv-page',
        templateUrl: 'adv-page.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        AnywhereService,
        CommonService,
        NavParams])
], AdvPage);
export { AdvPage };
//# sourceMappingURL=adv-page.js.map