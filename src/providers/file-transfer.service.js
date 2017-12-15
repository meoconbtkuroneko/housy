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
import { Events, Platform, } from 'ionic-angular';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { UserStorageService } from './user-storage.service';
import { DataStorageService } from './data-storage.service';
import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';
import * as _ from 'lodash';
var FileTransferService = (function () {
    function FileTransferService(transfer, file, events, userStorageService, dataStorageService, anywhereService, platform) {
        var _this = this;
        this.transfer = transfer;
        this.file = file;
        this.events = events;
        this.userStorageService = userStorageService;
        this.dataStorageService = dataStorageService;
        this.anywhereService = anywhereService;
        this.platform = platform;
        this.totalImgUploadSuc = 0;
        this.totalImgUploadErr = 0;
        this.resultUpImg = {
            type: null,
            id: null,
            totalImg: null,
            urlError: null,
            urlSuccses: null
        };
        this.platform.ready().then(function () {
            _this.init();
        });
    }
    FileTransferService.prototype.init = function () {
        var _this = this;
        this.dataStorageService.ALREALDY_DATA.subscribe(function () {
            console.log("dataStorageService.ALREALDY_DATA");
            _this.handleHaveItemUpload();
        });
        this.events.subscribe('setNewItemQueueUploading', function () {
            console.log("events.subscribe('setNewItemQueueUploading'");
            _this.handleHaveItemUpload();
        });
        this.events.subscribe('FileService.uploadImgFinished', function (result) {
            _this.handleFinishedUpload(result);
        });
    };
    /*
      Upload Files to server:
      - fileUrl: url của hình(file) upload
      - type: apartment, neighborhoods, hoac house
        + Type_Apartments: 3
        + TYPE_NEIGHBORHOOD: 4
      - objectId: id cua apartment, neighborhoods, review, hoac house của hình(file) cần upload
    */
    FileTransferService.prototype.uploadFilesToServer = function (fileUrl, type, objectId) {
        var serverPostImg = CONSTANT.SERVER.API_UPLOAD_IMAGE +
            CONSTANT.SERVER.APIS.UPLOAD_IMAGES(type, objectId);
        // console.log("uploadFilesToServer fileUrl, type, objectId serverPostImg", fileUrl, type, objectId, serverPostImg);
        return this._doUploadFilesToServer(fileUrl, serverPostImg);
    };
    ;
    FileTransferService.prototype._doUploadFilesToServer = function (fileUrl, urlServer) {
        // console.log("_doUploadFilesToServer fileUrl, urlServer", fileUrl, urlServer);
        var options = {
            fileKey: "file",
            fileName: "housyimg.jpg",
            mimeType: "image/jpeg",
            httpMethod: "POST"
        };
        var headers = { 'Authorization': 'Bearer ' + this.userStorageService.getProp('tokenImage') };
        options.headers = headers;
        var trustHosts = true;
        var result = {
            response: null,
            fileCount: null,
        };
        var fileTransfer = this.transfer.create();
        // console.log("_doUploadFilesToServer fileTransfer", fileTransfer);
        return fileTransfer.upload(fileUrl, urlServer, options, trustHosts)
            .then(function (rs) {
            // Success!
            var response = JSON.parse(rs.response);
            console.log(">>fileTransfer>>>>>>>>>>>> sau khi đã uphinh thành công ", response);
            result.response = response;
            result.fileCount = 1;
            return result;
        }, function (err) {
            console.log(">>fileTransfer>>>>>>>>>>>> sau khi đã uphinh loiiiiiiiiiiiii ", err);
        });
    };
    ;
    FileTransferService.prototype.resetVar = function () {
        console.log("resetVarresetVar");
        this.totalImgUploadSuc = 0;
        this.totalImgUploadErr = 0;
        this.resultUpImg = {
            type: null,
            id: null,
            totalImg: null,
            urlError: null,
            urlSuccses: null
        };
    };
    ;
    FileTransferService.prototype.upSinglePicture = function (imgUrl, type, objectId, timeUpload) {
        var _this = this;
        console.log("upSinglePicture imgUrl, type, objectId, timeUpload", imgUrl, type, objectId, timeUpload);
        this.resultUpImg.type = type;
        this.resultUpImg.id = objectId;
        console.log("upSinglePicture type: ", type);
        return this.uploadFilesToServer(imgUrl, type, objectId)
            .then(function (rs) {
            console.log("upSinglePicture uploadFilesToServer rs", rs);
            if (rs && rs.fileCount == 1) {
                console.log("Kết quả trả về resultUpImg copy: ", rs);
                _this.resultUpImg.urlSuccses = imgUrl;
                _this.events.publish("FileService.uploadImgFinished", {
                    resultUpImg: {
                        type: type,
                        id: objectId,
                        urlSuccses: imgUrl,
                        totalImg: _this.resultUpImg.totalImg
                    },
                    response: rs.response
                });
                return true;
            }
            else {
                if (timeUpload == 5) {
                    _this.resultUpImg.urlError = imgUrl;
                    _this.events.publish("FileService.uploadImgFinished", { resultUpImg: _this.resultUpImg });
                    return true;
                }
                else {
                    return _this.upSinglePicture(imgUrl, type, objectId, timeUpload + 1)
                        .then(function (rs) {
                        return rs;
                    });
                }
            }
        });
    };
    ;
    FileTransferService.prototype.doUploadPictures = function (imgsUp, type, objectId, index) {
        var _this = this;
        // console.log("doUploadPictures imgsUp, type, objectId, index", imgsUp, type, objectId, index);
        var totalImg = _.clone(imgsUp);
        this.resultUpImg.totalImg = totalImg.length;
        if (index < totalImg.length) {
            return this.upSinglePicture(totalImg[index], type, objectId, 1).then(function (rs) {
                if (rs) {
                    return _this.doUploadPictures(totalImg, type, objectId, index + 1);
                }
            });
        }
        else {
            var d = {
                id: null,
                type: null,
                totalImgs: null,
                content: null
            };
            d.id = objectId;
            d.type = type;
            d.totalImgs = totalImg.length;
            d.content = "Trả về sau khi xong hết";
            return d;
        }
    };
    ;
    // Now uploadPictures === doUploadPictures in Past
    // Start up load files(pictures)
    FileTransferService.prototype.uploadPictures = function (imgs, type, objectId) {
        console.log("uploadPictures imgs, type, objectId", imgs, type, objectId);
        this.resetVar();
        return this.doUploadPictures(imgs, type, objectId, 0);
    };
    FileTransferService.prototype.backgroundUpload = function (listingItem) {
        console.log("backgroundUpload listingItem", listingItem);
        if (listingItem != undefined &&
            (listingItem.status == CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_NEW) ||
            (listingItem.status == CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_FAILED)) {
            console.log("backgroundUpload listingItem status", listingItem.status);
            this.dataStorageService.setStatusUploading(listingItem.id, listingItem.type, CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_UPLOADING);
            this.uploadPictures(listingItem.imgs_upload, listingItem.type, listingItem.id);
        }
    };
    FileTransferService.prototype.handleHaveItemUpload = function () {
        var _this = this;
        var listingQueue = this.dataStorageService.getQueueUploading();
        console.log("handleHaveItemUpload listingQueue", listingQueue);
        _.forEach(listingQueue, function (value, key) {
            _this.backgroundUpload(value);
        });
    };
    FileTransferService.prototype.handleFinishedUpload = function (rs) {
        console.log("handleFinishedUploadhandleFinishedUpload", rs);
        var itemTmp = this.dataStorageService.getItemQueueUploadingByIdAndType(rs.resultUpImg.id, rs.resultUpImg.type);
        console.log("handleFinishedUpload getItemQueueUploadingByIdAndType", itemTmp);
        if (rs.resultUpImg.urlSuccses) {
            /* Delete img url upload success of Object*/
            this.dataStorageService.removeImageFromQueueUploading(rs.resultUpImg.id, rs.resultUpImg.type, rs.resultUpImg.urlSuccses);
        }
        else {
            /* Move img url upload Error of Object to array imgs_upload_err and del it in imgs_upload*/
            //      this.dataStorageService.ApartmentErrImageUploading.add(url); 
            this.dataStorageService.addErrImageQueueUploading(rs.resultUpImg.id, rs.resultUpImg.type, rs.resultUpImg.urlError);
            this.dataStorageService.removeImageFromQueueUploading(rs.resultUpImg.id, rs.resultUpImg.type, rs.resultUpImg.urlSuccses);
        }
        if (itemTmp.imgs_upload.length == 0) {
            /* CHeck isNext? true: false*/
            // var msg = '"' + itemTmp.data_upload.name + '"';
            if (!itemTmp.imgs_upload_err) {
                // this.anywhereService.showToast(msg + " đăng thành công", 5000, "center");
                this.dataStorageService.removeItemQueueUploadingByIdAndType(rs.resultUpImg.id, rs.resultUpImg.type, itemTmp.data_upload, rs.response);
            }
            else {
                // this.anywhereService.showToast(msg + " đăng có lỗi", 5000, "center");
                this.dataStorageService.setStatusUploading(rs.resultUpImg.id, rs.resultUpImg.type, CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_FAILED);
            }
        }
        var resultData = {
            getCurrentUploadObj: function () {
                return itemTmp;
            },
            getResultUpload: function () {
                return rs.response;
            }
        };
        this.events.publish('finishedUploadImages', resultData);
    };
    return FileTransferService;
}());
FileTransferService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Transfer,
        File,
        Events,
        UserStorageService,
        DataStorageService,
        AnywhereService,
        Platform])
], FileTransferService);
export { FileTransferService };
//# sourceMappingURL=file-transfer.service.js.map