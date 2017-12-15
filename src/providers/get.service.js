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
var GetService = (function () {
    function GetService(anywhereService) {
        this.anywhereService = anywhereService;
    }
    // lay thong tin chi tiet ve house, apartment, neighborhood, user
    GetService.prototype.getDetail = function (type, id, params) {
        var path = CONSTANT.SERVER.APIS.GET_DETAIL(type, id);
        return this.anywhereService.makeRequest(path, params);
    };
    // liet ke tat ca cac can nha da duoc duyet theo trang, 
    // moi trang 5 can nha
    GetService.prototype.listAllHouses = function (moreParams) {
        var path = CONSTANT.SERVER.APIS.ALLHOUSE;
        var params = { page: 1 };
        if (moreParams) {
            for (var i in moreParams) {
                params[i] = moreParams[i];
            }
        }
        ;
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    GetService.prototype.listAllHousesAroundLocation = function (params) {
        var path = CONSTANT.SERVER.APIS.SEARCH;
        // console.log("paramsparamsparamsparams", params);
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    // getDiscount(location, page ? ) {
    GetService.prototype.getDiscount = function (params) {
        var sendData = {
            center_lat: params.location.lat(),
            center_lng: params.location.lng(),
            all: true,
            discount: true
        };
        if (params.page) {
            sendData.page = params.page;
        }
        var path = CONSTANT.SERVER.APIS.ALLHOUSE;
        return this.anywhereService.makeRequest(path, sendData);
    };
    ;
    // hien thi cac can nha duoc danh dau theo trang
    GetService.prototype.listFavoritesByUser = function (params) {
        return this.anywhereService.makeRequest(CONSTANT.SERVER.APIS.FAVORITE, params);
    };
    // thong tin cua user dang dang nhap
    GetService.prototype.getProfile = function () {
        var userId = this.anywhereService.USER.userInfo.id;
        var path = CONSTANT.SERVER.APIS.PROFILE(userId);
        return this.anywhereService.makeRequest(path, null);
    };
    // thong tin cua mot nguoi nao do theo hostId
    GetService.prototype.getHostProfile = function (hostId) {
        return this.getComments('users', hostId);
    };
    GetService.prototype.listAllApartments = function (moreParams) {
        var path = CONSTANT.SERVER.APIS.APARTMENTS;
        var params = { page: 1 };
        if (moreParams) {
            for (var i in moreParams) {
                params[i] = moreParams[i];
            }
        }
        ;
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    // thong tin chi tiet cua mot can nha theo rentingId
    GetService.prototype.getHouseDetail = function (rentingId) {
        var path = CONSTANT.SERVER.APIS.HOUSE_DETAIL(rentingId);
        // let path = "listings/" + rentingId + '.json';
        return this.anywhereService.makeRequest(path, null);
    };
    ;
    // thong tin cua chung cu theo id
    GetService.prototype.getApartmentDetail = function (id) {
        var path = CONSTANT.SERVER.APIS.APARTMENT_DETAIL(id);
        return this.anywhereService.makeRequest(path, null);
    };
    ;
    // danh sach cac bai nhan xet cua mot chung cu theo id va trang
    GetService.prototype.getListReview = function (params) {
        var id = params.id;
        var type = params.type;
        var path = CONSTANT.SERVER.APIS.DOWNLOAD_LIST_REVIEW(type, id);
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    //  5 tim kiem gan day cua nguoi dung
    //  type: loai tim kiem: CONSTANT.RECENT_SEARCH_TYPE
    GetService.prototype.getRecentSearch = function (params) {
        var path = CONSTANT.SERVER.APIS.RECENT_SEARCH;
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    // tat ca cac thong bao cua user dang dang nhap
    GetService.prototype.listAllNotifications = function () {
        var path = CONSTANT.SERVER.APIS.NOTIFICATION;
        return this.anywhereService.makeRequest(path, null);
    };
    ;
    // thong tin cua khu dan cu theo id
    GetService.prototype.getNeighborhoodDetail = function (id) {
        var path = CONSTANT.SERVER.APIS.NEIGHBORHOOD_DETAIL(id);
        return this.anywhereService.makeRequest(path, null);
    };
    GetService.prototype.getHousesOf = function (params) {
        var path = CONSTANT.SERVER.APIS.GET_HOUSE_OF(params.type, params.id);
        return this.anywhereService.makeRequest(path, params);
    };
    GetService.prototype.listHostTop = function () {
        var path = CONSTANT.SERVER.APIS.HOST_TOP;
        return this.anywhereService.makeRequest(path, null);
    };
    ;
    // type: listing, neighborhoods, apartments
    GetService.prototype.getComments = function (type, id) {
        var path = CONSTANT.SERVER.APIS.GET_COMMENT(type, id);
        return this.anywhereService.makeRequest(path, null);
    };
    GetService.prototype.getTransactions = function () {
        var path = CONSTANT.SERVER.APIS.TRANSACTION;
        return this.anywhereService.makeRequest(path, null);
    };
    // hien thi cac can nha cua chu nha hien tai theo trang
    // params.status: trang thai cua loai nha muon lay: CONSTANT.TYPE_STATUS
    GetService.prototype.listAllHousesByUser = function (params) {
        params.page = params.page || 1;
        var path = CONSTANT.SERVER.APIS.ALLHOUSE_OWNER;
        return this.anywhereService.makeRequest(path, params);
    };
    ;
    return GetService;
}());
GetService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AnywhereService])
], GetService);
export { GetService };
//# sourceMappingURL=get.service.js.map