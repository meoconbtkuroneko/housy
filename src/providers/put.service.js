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
import { AnywhereService } from './anywhere.service';
import { CONSTANT } from './constant.service';
import * as _ from 'lodash';
var PutService = (function () {
    function PutService(anywhereService) {
        this.anywhereService = anywhereService;
    }
    PutService.prototype.updateProfile = function (data) {
        var userId = this.anywhereService.USER.userInfo.id;
        var path = CONSTANT.SERVER.APIS.PROFILE(userId);
        return this.anywhereService.makePutRequest(path, data);
    };
    PutService.prototype.deleteImages = function (rentingId, imageIds) {
        var path = CONSTANT.SERVER.APIS.DELETE_SPACE_IMAGES;
        var data = {
            delete_images: imageIds
        };
        console.log("deleteImages send data", data);
        return this.anywhereService.makePutRequest(path, data);
    };
    PutService.prototype.updateHouseDetail = function (rentingId, data) {
        var path = CONSTANT.SERVER.APIS.HOUSE_DETAIL(rentingId);
        var sendData = _.cloneDeep(data);
        sendData.renting = sendData.renting || {};
        sendData.renting.id = rentingId;
        console.log("updateHouseDetail senddddddddddddddd dataaaaaaaaaaaaa", _.cloneDeep(sendData));
        return this.anywhereService.makePutRequest(path, sendData);
    };
    ;
    PutService.prototype.toggleNotification = function (id, data) {
        var path = CONSTANT.SERVER.APIS.TOOGLE_NOTIFICATION(id);
        return this.anywhereService.makePutRequest(path, data);
    };
    return PutService;
}());
PutService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService])
], PutService);
export { PutService };
//# sourceMappingURL=put.service.js.map