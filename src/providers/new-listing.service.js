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
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CurrentItemService } from './current-item.service';
import { DataStorageService } from './data-storage.service';
import * as _ from 'lodash';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { CONSTANT } from './constant.service';
var NewListingService = (function () {
    function NewListingService(storage, postService, currentItemService, events, dataStorageService, putService) {
        var _this = this;
        this.storage = storage;
        this.postService = postService;
        this.currentItemService = currentItemService;
        this.events = events;
        this.dataStorageService = dataStorageService;
        this.putService = putService;
        this.NEW_LISTING_DATA_SUBSCRIBE = new BehaviorSubject(this.NEW_LISTING_DATA || {});
        this.key = 'NEW_LISTING';
        this.handleUploadImageSuccess = function (data) {
            _this.finishUploadImages = true;
            console.log("listenUploadImageSuccess REMOVE_ITEM_QUEUE_UPLOADING", data);
            return _this.changeRentingStatus().then(function (res) {
                console.log("ket qua cuoi cung 3333333333", res);
                if (_this.finishUpdateData) {
                    return _this.handleSaveSuccess(res);
                }
                return res;
            });
        };
        this.subscribeNewListingData();
    }
    NewListingService.prototype.subscribeNewListingData = function (callback) {
        var _this = this;
        this.NEW_LISTING_DATA_SUBSCRIBE.subscribe(function (res) {
            _this.NEW_LISTING_DATA = _.cloneDeep(res);
            _this.rentingId = _this.NEW_LISTING_DATA &&
                _this.NEW_LISTING_DATA.renting &&
                _this.NEW_LISTING_DATA.renting.id || undefined;
            _this.rentingStatus = _this.NEW_LISTING_DATA &&
                _this.NEW_LISTING_DATA.renting &&
                _this.NEW_LISTING_DATA.renting.renting_status_type_id ||
                _this.NEW_LISTING_DATA.renting_status_type_id ||
                CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_DRAFT;
            if (callback) {
                return callback(res);
            }
        });
    };
    ;
    NewListingService.prototype.unsubscribeNewListingData = function () {
        this.NEW_LISTING_DATA_SUBSCRIBE.unsubscribe();
    };
    NewListingService.prototype.startupServices = function () {
        this.broadcastNewListingDataChange({});
    };
    NewListingService.prototype.setNewListingData = function (data) {
        var _this = this;
        var tempVal = _.assignIn(this.NEW_LISTING_DATA, data);
        return new Promise(function (res) {
            _this.broadcastNewListingDataChange(tempVal);
        });
    };
    NewListingService.prototype.clearNewListingData = function () {
        var _this = this;
        return new Promise(function (res) {
            _this.broadcastNewListingDataChange({});
        });
    };
    NewListingService.prototype.broadcastNewListingDataChange = function (data) {
        this.NEW_LISTING_DATA_SUBSCRIBE.next(data);
    };
    NewListingService.prototype._saveToServer = function () {
        if (this.rentingId) {
            var sendData = _.cloneDeep(this.NEW_LISTING_DATA);
            delete sendData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES];
            delete sendData.renting;
            return this.putService.updateHouseDetail(this.rentingId, sendData).then(function (res) {
                console.log("updateHouseDetailupdateHouseDetail", res);
                return res;
            });
        }
    };
    // gan flag dang cap nhat
    NewListingService.prototype.setUpdatingStatus = function (val) {
        this.setNewListingData({
            isUpdating: val
        });
    };
    // statusRequest: trang thai nha muon upload len: TYPE_STATUS 
    NewListingService.prototype.saveToServer = function (statusRequest) {
        var _this = this;
        if (statusRequest) {
            this.setNewListingData({
                renting_status_type_id: statusRequest
            });
        }
        this.uploadNewImages();
        if (this.rentingId) {
            this.setUpdatingStatus(true);
            this.broadcastUpdateChange('isUpdating');
            var promises = [this._saveToServer()];
            if (this.hasImgsDelete()) {
                promises.push(this.deleteImages());
            }
            if (statusRequest && !this.hasImgsUpload()) {
                promises.push(this.changeRentingStatus());
            }
            return Promise.all(promises).then(function (res) {
                console.log("ket qua cuoi cung", res);
                _this.finishUpdateData = true;
                if (_this.hasImgsUpload() && !_this.finishUploadImages) {
                    return res;
                }
                for (var i in _.reverse(res)) {
                    if (res[i].space) {
                        return _this.handleSaveSuccess(res[i]);
                    }
                    return _this.handleSaveSuccess(res[0]);
                }
            });
        }
    };
    NewListingService.prototype.uploadNewImages = function () {
        if (this.hasImgsUpload() && this.rentingId) {
            this.dataStorageService.setNewItemQueueUploading(this.rentingId, CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_SPACE, this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD], null);
            this.listenUploadImageSuccess();
        }
    };
    NewListingService.prototype.checkFinishAll = function () {
        var check;
        if (this.hasImgsUpload()) {
            check = this.finishUploadImages && this.finishUpdateData;
        }
        else {
            check = this.finishUpdateData;
        }
        console.log("checkFinishAllcheckFinishAll", check);
        if (check) {
            this.setUpdatingStatus(false);
            this.broadcastUpdateChange('isUpdating');
        }
        return check;
    };
    NewListingService.prototype.broadcastUpdateChange = function (statusName) {
        var data = {
            type: 'space',
            id: this.NEW_LISTING_DATA.renting.id || this.rentingId,
            data: this.NEW_LISTING_DATA,
        };
        if (statusName) {
            data[statusName] = true;
        }
        this.currentItemService.broadcastChange(data);
    };
    NewListingService.prototype.listenUploadImageSuccess = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.REMOVE_ITEM_QUEUE_UPLOADING, this.handleUploadImageSuccess);
    };
    NewListingService.prototype.unsubscibeUploadImageSuccess = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.REMOVE_ITEM_QUEUE_UPLOADING, this.handleUploadImageSuccess);
    };
    NewListingService.prototype.deleteImages = function () {
        if (this.hasImgsDelete() && this.rentingId) {
            return this.putService.deleteImages(this.rentingId, this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID]);
        }
    };
    NewListingService.prototype.changeRentingStatus = function (returnHandleSuccess) {
        var _this = this;
        var data = {};
        data[CONSTANT.KEY_SPACES.RENTING_STATUS] =
            this.NEW_LISTING_DATA[CONSTANT.KEY_SPACES.RENTING_STATUS];
        return this.putService.updateHouseDetail(this.rentingId, data).then(function (res) {
            if (returnHandleSuccess) {
                console.log("changeRentingStatus", res);
                return _this.handleSaveSuccess(res);
            }
            return res;
        });
    };
    NewListingService.prototype.newHouse = function () {
        var _this = this;
        return this.postService.newHouse(this.NEW_LISTING_DATA)
            .then(function (res) {
            return _this.handleSaveSuccess(res);
        });
    };
    NewListingService.prototype.handleSaveSuccess = function (res) {
        console.log("handleSaveSuccesshandleSaveSuccess", res);
        if (res && res.reason === CONSTANT.REASONS.ER_OK) {
            console.log("hoannnnnnnnnn tatttttttt");
            var val = this.NEW_LISTING_DATA;
            if (res.space) {
                var val_1 = this.prepareDefaultImg(res.space);
                this.setNewListingData(val_1);
            }
            this.checkFinishAll();
            if (this.rentingId) {
                this.broadcastUpdateChange('isUpdating');
            }
            console.log("this.NEW", this.NEW_LISTING_DATA);
            return val;
        }
        else {
            return this.handleNotOk();
        }
    };
    NewListingService.prototype.handleNotOk = function () {
        console.log("co van de roi nha");
        return false;
    };
    NewListingService.prototype.prepareDefaultImg = function (data) {
        var spaceData = _.cloneDeep(data);
        if (spaceData && spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT]) {
            return spaceData;
        }
        ;
        if (spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES] &&
            spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES].length > 0) {
            var findObj = {};
            findObj[CONSTANT.KEY_IMAGES.KEY_IS_DEFAULT] = true;
            var defaultImageObj = _.find(spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES], findObj) || spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES][0];
            spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT] = defaultImageObj.url;
        }
        else {
            spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT] =
                CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE;
        }
        return spaceData;
    };
    NewListingService.prototype.hasImgsUpload = function () {
        console.log("NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD]", this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD]);
        return this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD] &&
            (this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD].length > 0);
    };
    NewListingService.prototype.hasImgsDelete = function () {
        return this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID] &&
            (this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID].length > 0);
    };
    NewListingService.prototype.ngOnDestroy = function () {
        this.unsubscibeUploadImageSuccess();
    };
    return NewListingService;
}());
NewListingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage,
        PostService,
        CurrentItemService,
        Events,
        DataStorageService,
        PutService])
], NewListingService);
export { NewListingService };
//# sourceMappingURL=new-listing.service.js.map