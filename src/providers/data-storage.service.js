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
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Events } from 'ionic-angular';
import { UserStorageService } from '../services/user-storage.service';
import { CONSTANT } from '../services/constant.service';
var DataStorageService = (function () {
    function DataStorageService(storage, UserStorageService, events) {
        var _this = this;
        this.storage = storage;
        this.UserStorageService = UserStorageService;
        this.events = events;
        this.LOCAL_DRAFT = new BehaviorSubject("");
        this.ALREALDY_DATA = new BehaviorSubject("");
        this.userCurrentId = -1;
        this.listCities = [
            { "id": 1, "name": "Hồ Chí Minh" },
            { "id": 2, "name": "Hà Nội" }
        ];
        this.listDistricts = [
            { "id": 1, "name": "Quận 1" },
            { "id": 2, "name": "Quận 2" },
            { "id": 3, "name": "Quận 3" },
            { "id": 4, "name": "Quận 4" },
            { "id": 5, "name": "Quận 5" },
            { "id": 6, "name": "Quận 6" },
            { "id": 7, "name": "Quận 7" },
            { "id": 8, "name": "Quận 8" },
            { "id": 9, "name": "Quận 9" },
            { "id": 10, "name": "Quận 10" },
            { "id": 11, "name": "Quận 11" },
            { "id": 12, "name": "Quận 12" },
            { "id": 13, "name": "Thủ Đức" },
            { "id": 14, "name": "Gò Vấp" },
            { "id": 15, "name": "Bình Thạnh" },
            { "id": 16, "name": "Tân Bình" },
            { "id": 17, "name": "Tân Phú" },
            { "id": 18, "name": "Phú Nhuận" },
            { "id": 19, "name": "Bình Tân" },
            { "id": 20, "name": "Củ Chi" },
            { "id": 21, "name": "Hóc Môn" },
            { "id": 22, "name": "Bình Chánh" },
            { "id": 23, "name": "Nhà Bè" },
            { "id": 24, "name": "Cần Giờ" }
        ];
        this._handleSubscribeUser = function (data) {
            console.log("_handleSubscribeUser DataStorage", data);
            if (data && data.userInfo && _this.userCurrentId != data.userInfo.id) {
                _this.userCurrentId = data.userInfo.id;
                _this.initService();
            }
        };
        this.toggleSubscribeUser(true);
    }
    DataStorageService.prototype.toggleSubscribeUser = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED, this._handleSubscribeUser);
        }
    };
    DataStorageService.prototype.initService = function () {
        var _this = this;
        this.storage.get(CONSTANT.NAME_LISTINGS).then(function (value) {
            _this.localListings = value;
            // console.log("+++++++ this.localListings", this.localListings)
            _this.switchUser(_this.userCurrentId);
        });
    };
    /*-----------------------------------------------------
     -------------------- Private methods -----------------
     ------------------------------------------------------*/
    DataStorageService.prototype.resetDraftListingObject = function () {
        var draftListingObject = {
            draftApartments: [],
            draftResidentialAreas: []
        };
        return draftListingObject;
    };
    DataStorageService.prototype.switchUser = function (userId) {
        if (this.localListings == undefined) {
            this.localListings = {};
        }
        var listings = this.localListings[userId + ''];
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> var listings", listings)
        if (listings == undefined || !listings) {
            listings = this.resetDraftListingObject();
            this.localListings[userId + ''] = listings;
        }
        if (_.isUndefined(listings.draftApartments))
            listings.draftApartments = [];
        if (_.isUndefined(listings.draftResidentialAreas))
            listings.draftResidentialAreas = [];
        /*queueUploading*/
        if (_.isUndefined(listings.queueUploading)) {
            // console.log("===>>> isUndefined", listings.queueUploading);
            listings.queueUploading = [];
        }
        /*if (_.isUndefined(listings.listApartmentsBookmark)) {
    
          listings.listApartmentsBookmark = {};
        }*/
        /*Recents search with name and avatar*/
        /*if (_.isUndefined(listings.recentsSearch)) {
          listings.recentsSearch = [];
        }*/
        // console.log("===>>> switchUser", listings);
        this.dataAction = listings;
        this.updateLocalData(CONSTANT.BROADCAST.DATA_UPDATE);
        return;
    };
    DataStorageService.prototype.saveDataToStorage = function (id, obj) {
        var _this = this;
        return this.storage.get(CONSTANT.NAME_LISTINGS).then(function (savedData) {
            if (!savedData) {
                savedData = {};
            }
            savedData[id] = obj;
            _this.storage.set(CONSTANT.NAME_LISTINGS, savedData);
            return true;
        });
    };
    DataStorageService.prototype.saveUserData = function (userId) {
        return this.saveDataToStorage(userId, this.dataAction);
    };
    DataStorageService.prototype.setDraftApartment = function (obj, index) {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        var rsSetDraftApart = false;
        if (index == -1) {
            this.dataAction.draftApartments.unshift(obj);
            rsSetDraftApart = true;
        }
        else {
            this.dataAction.draftApartments[index] = obj;
            rsSetDraftApart = true;
        }
        this.saveUserData(this.userCurrentId);
        return rsSetDraftApart;
    };
    DataStorageService.prototype.setDraftResidentialArea = function (obj, index) {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        var rsSetDraftRes = false;
        if (index == -1) {
            this.dataAction.draftResidentialAreas.unshift(obj);
            rsSetDraftRes = true;
        }
        else {
            this.dataAction.draftResidentialAreas[index] = obj;
            rsSetDraftRes = true;
        }
        this.saveUserData(this.userCurrentId);
        return rsSetDraftRes;
    };
    /*----------------------------------
     ------- Public methods ------------
     -----------------------------------*/
    DataStorageService.prototype.getDraftApartments = function () {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        return this.dataAction.draftApartments;
    };
    DataStorageService.prototype.getDraftResidentialAreas = function () {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        return this.dataAction.draftResidentialAreas;
    };
    /*Set Get and Remove   QueueUploading*/
    /*
      setNewItemQueueUploading Upload Pictures to server:
      - idUpload: id cua apartment, neighborhood, hoac house của hình cần upload
      - type: apartment, neighborhoods, hoac house
        + Type_Apartments: 3
        + TYPE_NEIGHBORHOOD: 4
      - arrayImage: mảng Url file hình upload
      - data: info của object cần upload
    */
    DataStorageService.prototype.setNewItemQueueUploading = function (idUpload, type, arrayImage, data) {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        if (arrayImage.length > 0) {
            var objTmp = {
                id: null,
                imgs_upload: null,
                data_upload: null,
                type: null,
                status: null,
            };
            objTmp.id = idUpload;
            objTmp.imgs_upload = _.clone(arrayImage);
            objTmp.data_upload = _.clone(data);
            objTmp.type = type;
            objTmp.status = CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_NEW;
            this.dataAction.queueUploading.push(objTmp);
            this.events.publish('setNewItemQueueUploading', this.dataAction.queueUploading);
            this.saveUserData(this.userCurrentId);
            console.log(">>>>>>>>>>>>>>>>>>>> setNewItem Queue queueUploading:", this.dataAction.queueUploading);
        }
    };
    DataStorageService.prototype.addErrImageQueueUploading = function (id, type, urlImg) {
        var objSetErrImage = this.getItemQueueUploadingByIdAndType(id, type);
        if (!objSetErrImage.imgs_upload_err) {
            objSetErrImage.imgs_upload_err = [];
        }
        objSetErrImage.imgs_upload_err.push(urlImg);
        this.saveUserData(this.userCurrentId);
    };
    /********************************
     * Uploading Status:
              - 1: failed
                0: uploading
                1: success
                2: pause
    / *********************************/
    DataStorageService.prototype.setStatusUploading = function (id, type, status) {
        // console.log(">>>>>>>>>>>>>>>>>>>> trước khi đổi:", this.dataAction.queueUploading)
        var objSetStatus;
        objSetStatus = this.getItemQueueUploadingByIdAndType(id, type);
        objSetStatus.status = status;
        this.saveUserData(this.userCurrentId);
        // $rootScope.$broadcast("setStatusUploading", { idSetStatus: id, status: status });
    };
    DataStorageService.prototype.getQueueUploading = function () {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        return this.dataAction.queueUploading;
    };
    DataStorageService.prototype.getItemQueueUploading = function (index) {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        return (index >= 0 && index < this.dataAction.queueUploading.length ?
            this.dataAction.queueUploading[index] :
            undefined);
    };
    DataStorageService.prototype.getItemQueueUploadingById = function (id) {
        var objGet;
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        for (var i = 0; i < this.dataAction.queueUploading.length; i++) {
            objGet = this.dataAction.queueUploading[i];
            if (objGet.id == id) {
                return objGet;
            }
        }
    };
    DataStorageService.prototype.getItemQueueUploadingByIdAndType = function (id, type) {
        var objGetTmp;
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        // console.log("getItemQueueUploadingByIdAndType this.dataAction.queueUploading", this.dataAction.queueUploading);
        for (var i = 0; i < this.dataAction.queueUploading.length; i++) {
            objGetTmp = this.dataAction.queueUploading[i];
            // console.log("objGetTmpobjGetTmpobjGetTmp", objGetTmp);
            if (objGetTmp.type == type && objGetTmp.id == id) {
                return objGetTmp;
            }
        }
    };
    DataStorageService.prototype.removeItemQueueUploadingByIdAndType = function (id, type, moreInfo, resultUpload) {
        var objRemove, indexRemove;
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        objRemove = this.getItemQueueUploadingByIdAndType(id, type);
        if (objRemove) {
            indexRemove = this.dataAction.queueUploading.indexOf(objRemove);
            this.dataAction.queueUploading.splice(indexRemove, 1);
        }
        this.saveUserData(this.userCurrentId);
        this.events.publish("removeItemQueueUploading", {
            idUploadDone: id,
            type: type,
            moreInfo: moreInfo,
            resultUpload: resultUpload
        });
    };
    DataStorageService.prototype.removeImageFromQueueUploading = function (id, type, urlRemove) {
        var objRemoveImage;
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        objRemoveImage = this.getItemQueueUploadingByIdAndType(id, type);
        var index = objRemoveImage.imgs_upload.indexOf(urlRemove);
        objRemoveImage.imgs_upload.splice(index, 1);
        console.log("Xóa hình khi up xong 1 tấm", this.dataAction);
        this.saveUserData(this.userCurrentId);
    };
    DataStorageService.prototype.removeDraftApartment = function (index) {
        this.getDraftApartments().splice(index, 1);
        this.saveUserData(this.userCurrentId);
    };
    DataStorageService.prototype.removeDraftResidentialArea = function (index) {
        this.getDraftResidentialAreas().splice(index, 1);
        this.saveUserData(this.userCurrentId);
    };
    //Lưu dữ liệu draft mới
    /*
    typeSave: loại neighborhoods hoặc apartments
    dataAction = {[draftListingObject.draftApartments],[draftListingObject.draftResidentialArea]}
    */
    DataStorageService.prototype.saveNewDraft = function (typeSave, value) {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        var rsSaveNew;
        switch (typeSave) {
            case "neighborhoods":
                if (this.dataAction.draftResidentialAreas) {
                    this.setDraftResidentialArea(value, -1);
                }
                break;
            case "apartments":
                if (this.dataAction.draftApartments) {
                    this.setDraftApartment(value, -1);
                }
                break;
        }
        rsSaveNew = this.saveUserData(this.userCurrentId);
        this.LOCAL_DRAFT.next(CONSTANT.BROADCAST.DATA_HAVED_STORAGE);
        return rsSaveNew;
    };
    // Update và lưu vào mảng đã tồn tại
    DataStorageService.prototype.saveUpdate = function (typeSave, value, index) {
        var rsSaveUpdate;
        switch (typeSave) {
            case "neighborhoods":
                this.setDraftResidentialArea(value, index);
                this.LOCAL_DRAFT.next(CONSTANT.BROADCAST.DATA_HAVED_STORAGE);
                break;
            case "apartments":
                this.setDraftApartment(value, index);
                this.LOCAL_DRAFT.next(CONSTANT.BROADCAST.DATA_HAVED_STORAGE);
                break;
        }
        rsSaveUpdate = this.saveUserData(this.userCurrentId);
        return rsSaveUpdate;
    };
    DataStorageService.prototype.updateLocalData = function (strs) {
        this.ALREALDY_DATA.next(strs);
    };
    /*=========================setCurrentPosition===========================*/
    DataStorageService.prototype.setCurrentPositionLatLng = function (currentLat, currentLng) {
        this.currentLatLng.currentLat = currentLat;
        this.currentLatLng.currentLng = currentLng;
        // $rootScope.$broadcast("setCurrentPositionLatLng");
    };
    DataStorageService.prototype.getCurrentPositionLatLng = function () {
        return this.currentLatLng;
    };
    /*=========================Bookmark House===========================*/
    DataStorageService.prototype.setItemApartmentBookmark = function (idApartment, objBookmark) {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        this.dataAction.listApartmentsBookmark[idApartment] = objBookmark;
        this.saveUserData(this.userCurrentId);
        return true;
    };
    DataStorageService.prototype.getListApartmentsBookmark = function () {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        return this.dataAction.listApartmentsBookmark;
    };
    DataStorageService.prototype.getApartmentBookmarkById = function (id) {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        return this.dataAction.listApartmentsBookmark[id];
    };
    DataStorageService.prototype.removeApartmentBookmarkById = function (id) {
        if (!this.UserStorageService.USER.logined) {
            return false;
        }
        delete this.dataAction.listApartmentsBookmark[id];
        this.saveUserData(this.userCurrentId);
    };
    /*=========================GET LIST Districts ID===========================*/
    DataStorageService.prototype.getListDistricts = function () {
        return this.listDistricts;
    };
    /*=========================GET LIST Cities ID===========================*/
    DataStorageService.prototype.getListCities = function () {
        return this.listCities;
    };
    /*=========================GET Districts ID===========================*/
    DataStorageService.prototype.getDistrictId = function (address_components) {
        for (var i = 0; i < address_components.length; i++) {
            for (var j = this.listDistricts.length - 1; j >= 0; j--) {
                if (this.listDistricts[j].name === address_components[i].long_name) {
                    return this.listDistricts[j].id;
                }
            }
        }
        return -1;
    };
    /*=========================GET City ID===========================*/
    DataStorageService.prototype.getCityId = function (address_components) {
        for (var i = 0; i < address_components.length; i++) {
            for (var j = this.listCities.length - 1; j >= 0; j--) {
                if (this.listCities[j].name === address_components[i].long_name) {
                    return this.listCities[j].id;
                }
            }
        }
        return -1;
    };
    /*==================Recents search with name and avatar=============*/
    DataStorageService.prototype.setRecentsSearch = function (address, avatar, lat, lng) {
        var newRecentsSearch = {
            address: address,
            image: avatar,
            lat: lat,
            lng: lng
        };
        for (var i = 0; i < this.dataAction.recentsSearch.length; i++) {
            if (this.dataAction.recentsSearch[i].lat == lat && this.dataAction.recentsSearch[i].lng == lng) {
                this.dataAction.recentsSearch.splice(i, 1);
            }
        }
        this.dataAction.recentsSearch.unshift(newRecentsSearch);
        if (this.dataAction.recentsSearch.length > CONSTANT.SERVER.VARIABLE.MAX_RECENT_SEARCH) {
            this.dataAction.recentsSearch.splice(CONSTANT.SERVER.VARIABLE.MAX_RECENT_SEARCH, 1);
        }
        this.saveUserData(this.userCurrentId);
    };
    DataStorageService.prototype.getListRecentsSearch = function () {
        return this.dataAction.recentsSearch;
    };
    DataStorageService.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
    };
    return DataStorageService;
}());
DataStorageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage,
        UserStorageService,
        Events])
], DataStorageService);
export { DataStorageService };
//# sourceMappingURL=data-storage.service.js.map