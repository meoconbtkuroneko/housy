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
import { LoadingController, Events, } from 'ionic-angular';
import { CONSTANT } from './constant.service';
var LoadingService = (function () {
    function LoadingService(loadingController, events) {
        this.loadingController = loadingController;
        this.events = events;
        this.createLoading();
    }
    LoadingService.prototype.createLoading = function (duration) {
        this.loader = this.loadingController.create({
            duration: duration || 6000000,
            dismissOnPageChange: true,
            content: CONSTANT.WAITING,
            cssClass: 'loading-class'
        });
    };
    LoadingService.prototype.toggleLoading = function (showLoading) {
        var _this = this;
        if (!this.loader) {
            this.createLoading();
        }
        showLoading ?
            this.loader.present() :
            this.loader.dismiss();
        this.loader.onDidDismiss(function () {
            _this.loader = undefined;
        });
    };
    return LoadingService;
}());
LoadingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoadingController,
        Events])
], LoadingService);
export { LoadingService };
//# sourceMappingURL=loading.service.js.map