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
import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';
var DeleteService = (function () {
    function DeleteService(anywhereService) {
        this.anywhereService = anywhereService;
    }
    DeleteService.prototype.deleteRecentSearch = function () {
        var path = CONSTANT.SERVER.APIS.DELETE_RECENT_SEARCH;
        return this.anywhereService.makeDeleteRequest(path);
    };
    DeleteService.prototype.deleteHouse = function (rentingId) {
        var path = CONSTANT.SERVER.APIS.HOUSE_DETAIL(rentingId);
        return this.anywhereService.makeDeleteRequest(path);
    };
    ;
    DeleteService.prototype.deleteUserComment = function (id) {
        var path = CONSTANT.SERVER.APIS.DELETE_COMMENT(id);
        return this.anywhereService.makeDeleteRequest(path).then(function (result) {
            console.log("resultresultresultresult", result);
            if (result.reason == CONSTANT.REASONS.ER_OK) {
                return result;
            }
            else {
                return false;
            }
        });
    };
    DeleteService.prototype.deleteNotification = function (id) {
        var path = CONSTANT.SERVER.APIS.DELETE_NOTIFICATION(id);
        return this.anywhereService.makeDeleteRequest(path);
    };
    ;
    return DeleteService;
}());
DeleteService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService])
], DeleteService);
export { DeleteService };
//# sourceMappingURL=delete.service.js.map