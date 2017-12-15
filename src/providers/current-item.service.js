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
import { Events } from 'ionic-angular';
import { CONSTANT } from './constant.service';
var CurrentItemService = (function () {
    function CurrentItemService(events) {
        this.events = events;
    }
    CurrentItemService.prototype.broadcastChange = function (data) {
        this.events.publish(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, data);
    };
    return CurrentItemService;
}());
CurrentItemService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Events])
], CurrentItemService);
export { CurrentItemService };
//# sourceMappingURL=current-item.service.js.map