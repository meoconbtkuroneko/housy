var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, } from '@angular/core';
import { Events } from 'ionic-angular';
import { DataStorageService } from './data-storage.service';
import { UserStorageService } from './user-storage.service';
import { AnywhereService } from './anywhere.service';
import * as _ from 'lodash';
import { PutService } from './put.service';
import { CONSTANT } from './constant.service';
var ProfileService = (function () {
    function ProfileService(events, dataStorageService, putService, userStorageService, anywhereService) {
        var _this = this;
        this.events = events;
        this.dataStorageService = dataStorageService;
        this.putService = putService;
        this.userStorageService = userStorageService;
        this.anywhereService = anywhereService;
        this.hasChangedImages = {};
        this.cachedProfile = {
            pictureUrl: null,
            coverUrl: null,
            setPictureUrl: function (url) {
                _this.cachedProfile.pictureUrl = url;
            },
            getPictureUrl: function () {
                return _this.cachedProfile.pictureUrl;
            },
            setCoverUrl: function (url) {
                _this.cachedProfile.coverUrl = url;
            },
            getCoverUrl: function () {
                return _this.cachedProfile.coverUrl;
            },
        };
        this.USER = this.userStorageService.USER;
        this.handleSubcribeUploadImageFinished = function (data) {
            console.log("listenUploadImageFinished finishedUploadImages", data);
            var currentUploadObj = data.getCurrentUploadObj();
            var newImageData;
            // truong hop bi loi
            if (currentUploadObj.imgs_upload_err) {
                _this.anywhereService.showToast(CONSTANT.UPDATE.UPDATING_IMAGE_ERROR);
                _this.updateUserData({
                    cover: _this.cachedProfile.getCoverUrl(),
                    picture: _this.cachedProfile.getPictureUrl(),
                });
            }
            else {
                var rsUpload = data.getResultUpload();
                newImageData = {};
                newImageData.id = _this.PROFILE_DATA.id;
                switch (currentUploadObj.type) {
                    case CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_COVER:
                        {
                            newImageData[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.COVER] = rsUpload.url;
                            break;
                        }
                    case CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_USER:
                        {
                            newImageData[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.PICTURE] = rsUpload.url;
                            break;
                        }
                }
                // luu hinh len server
                var tempSave = _.assignIn(_this.saveData, newImageData);
                _this.setSaveData(tempSave);
            }
            _this._saveToServer();
        };
        this.initCachedProfile();
        this.toggleSubcribeUploadImageFinished(true);
    }
    ProfileService.prototype.initCachedProfile = function () {
        var profile = this.userStorageService.getProp('userInfo');
        this.cachedProfile.setPictureUrl(profile.picture);
        this.cachedProfile.setCoverUrl(profile.cover);
    };
    ProfileService.prototype.setHasChangedImages = function (type) {
        this.hasChangedImages[type] = true;
    };
    ProfileService.prototype.saveToServer = function () {
        if (this.hasUploadedImages()) {
            this.uploadNewImages();
            return;
        }
        return this._saveToServer();
    };
    ProfileService.prototype.hasUploadedImages = function () {
        return (this.hasChangedImages[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.COVER] ||
            this.hasChangedImages[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.PICTURE]);
    };
    ProfileService.prototype.uploadNewImages = function () {
        var _this = this;
        console.log("uploadNewImagesuploadNewImages");
        var type;
        var url;
        this.setCoverWillUpload();
        this.setPictureWillUpload();
        this.broadcastProfileDataUpdatingChange(true);
        if (!CONSTANT.REAL_DEVICE) {
            console.log("this.PROFILE_DATA broddddddd", this.PROFILE_DATA);
            var resultData_1 = {
                getCurrentUploadObj: function () {
                    return {
                        idUploadDone: _this.PROFILE_DATA.id,
                        type: type,
                        moreInfo: 'moreInfo',
                        resultUpload: [{
                                id: _this.PROFILE_DATA.id,
                                url: url
                            }]
                    };
                },
                getResultUpload: function () {
                    return {
                        id: _this.PROFILE_DATA.id,
                        url: url
                    };
                }
            };
            setTimeout(function () {
                _this.events.publish(CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES, resultData_1);
            }, 2000);
        }
    };
    ProfileService.prototype.setCoverWillUpload = function () {
        if (this.hasChangedImages[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.COVER]) {
            this.dataStorageService.setNewItemQueueUploading(this.PROFILE_DATA.id, CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_COVER, [this.PROFILE_DATA[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.COVER]], null);
        }
    };
    ProfileService.prototype.setPictureWillUpload = function () {
        if (this.hasChangedImages[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.PICTURE]) {
            this.dataStorageService.setNewItemQueueUploading(this.PROFILE_DATA.id, CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_USER, [this.PROFILE_DATA[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.PICTURE]], null);
        }
    };
    ProfileService.prototype.toggleSubcribeUploadImageFinished = function (isSubscribe) {
        if (isSubscribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES, this.handleSubcribeUploadImageFinished);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES, this.handleSubcribeUploadImageFinished);
        }
    };
    ProfileService.prototype.setSaveData = function (data) {
        this.saveData = data;
    };
    ProfileService.prototype.updateUserData = function (data) {
        if (JSON.stringify(this.USER.userInfo) === JSON.stringify(data)) {
            console.log("k co gi thay doi het ===============================");
            return;
        }
        this.setProfileData(data);
        return this.userStorageService.setUpdateUserData(data);
    };
    ProfileService.prototype.setProfileData = function (data) {
        var tempVal = _.assignIn(this.PROFILE_DATA, data);
        this.PROFILE_DATA = _.cloneDeep(tempVal);
        console.log("setProfileData this.PROFILE_DATA", this.PROFILE_DATA);
    };
    ProfileService.prototype._saveToServer = function () {
        var _this = this;
        if (this.saveData) {
            // chua broadcast thi moi broadcast
            if (!this.hasUploadedImages()) {
                this.broadcastProfileDataUpdatingChange(true);
            }
            return this.putService.updateProfile(this.saveData)
                .then(function (res) {
                console.log("_saveToServer", res);
                return _this.handleSaveSuccess(res);
            });
        }
    };
    ProfileService.prototype.broadcastProfileDataUpdatingChange = function (val) {
        this.isUpdating = val;
        this.events.publish(CONSTANT.EVENTS_NAME.PROFLE_IS_UPDATING, val);
    };
    ProfileService.prototype.handleSaveSuccess = function (res) {
        console.log("handleSaveSuccesshandleSaveSuccess", res);
        this.broadcastProfileDataUpdatingChange(false);
        this.resetDataService();
    };
    ProfileService.prototype.resetDataService = function () {
        this.hasChangedImages = {};
        this.isUpdating = undefined;
        this.saveData = undefined;
    };
    ProfileService.prototype.ngOnDestroy = function () {
        this.toggleSubcribeUploadImageFinished(false);
    };
    return ProfileService;
}());
ProfileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Events,
        DataStorageService,
        PutService,
        UserStorageService,
        AnywhereService])
], ProfileService);
export { ProfileService };
//# sourceMappingURL=profile.service.js.map