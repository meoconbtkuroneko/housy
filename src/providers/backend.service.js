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
var AllSelectionsService = (function () {
    function AllSelectionsService(anywhereService) {
        this.anywhereService = anywhereService;
    }
    AllSelectionsService.prototype.getAllAdvantages = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    AllSelectionsService.prototype.getAllAmenities = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.AMENITIES
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    AllSelectionsService.prototype.getAllDepositTypes = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    AllSelectionsService.prototype.getAllContractTypes = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    AllSelectionsService.prototype.getAllRules = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.RULES
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    AllSelectionsService.prototype.getAllApartments = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.APARTMENTS
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    AllSelectionsService.prototype.getAllHomeTypes = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    AllSelectionsService.prototype.getAllSpacePositions = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    AllSelectionsService.prototype.getAllNeighborhoods = function () {
        var path = CONSTANT.SERVER.APIS.QUERY;
        var params = {
            cat: CONSTANT.SERVER.TYPE_QUERY.NEIGHBORHOODS
        };
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    return AllSelectionsService;
}());
AllSelectionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService])
], AllSelectionsService);
export { AllSelectionsService };
//# sourceMappingURL=backend.service.js.map