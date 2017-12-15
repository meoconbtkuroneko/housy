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
import { Platform } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { CONSTANT } from './constant.service';
// import { Subscription } from 'rxjs';
import * as _ from 'lodash';
var ImagePickerService = (function () {
    // private options = {
    //   maximumImagesCount: 10,
    //   quality: 75,
    //   width: 1024, // proportionally rescale image to this width, default no rescale
    //   height: 800
    // }
    function ImagePickerService(imagePicker, camera, platform, file) {
        var _this = this;
        this.imagePicker = imagePicker;
        this.camera = camera;
        this.platform = platform;
        this.file = file;
        this.captureCallback = null;
        this.callbackSelImages = null;
        platform.ready().then(function () {
            //call a function when device already
            _this.onDeviceReady();
        });
    }
    ImagePickerService.prototype.onDeviceReady = function () {
        this.pictureSource = this.camera.PictureSourceType;
        this.destinationType = this.camera.DestinationType;
    };
    ImagePickerService.prototype.capturePhoto = function (callback) {
        var _this = this;
        this.captureCallback = callback;
        if (!CONSTANT.REAL_DEVICE) {
            var image = {
                nativeURL: 'http://kingofwallpapers.com/picture/picture-008.jpg'
            };
            return this.successCopy(image);
        }
        // Take picture using device camera and retrieve image as base64-encoded string
        this.camera.getPicture({
            quality: 50,
            destinationType: this.destinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 640,
            targetHeight: 768,
            correctOrientation: true,
            mediaType: this.camera.MediaType.PICTURE
            // popoverOptions: CameraPopoverOptions
        }).then(function (uri) {
            _this.onPhotoURISuccess(uri);
        }, function (err) {
            _this.onFail(err);
        });
    };
    ImagePickerService.prototype.onFail = function (argument) { };
    // Called when a photo is successfully File URI
    ImagePickerService.prototype.onPhotoURISuccess = function (imageURI) {
        if (imageURI.substring(0, 21) == "content://com.android") {
            var photo_split = imageURI.split("%3A");
            imageURI = "content://media/external/images/media/" + photo_split[1];
        }
        console.log('111 ===>>>>>>>>>>>>>>>onPhotoURISuccess:  imageURI', imageURI);
        this.copyPictureToApp(imageURI);
    };
    ImagePickerService.prototype.copyPictureToApp = function (fileUrl) {
        var _this = this;
        this.file.resolveLocalFilesystemUrl(fileUrl).then(function (entrySuccess) {
            _this.resolveOnSuccess(entrySuccess);
        }, this.resOnError);
    };
    //Callback function when the file system uri has been resolved
    ImagePickerService.prototype.resolveOnSuccess = function (entry) {
        console.log('----------------222 resolveOnSuccess: ', entry);
        this.successCopy(entry);
    };
    //Callback function when the file has been moved successfully - inserting the complete path
    ImagePickerService.prototype.successCopy = function (entry) {
        console.log('------44----------SS captureCallback: ', entry);
        this.captureCallback([entry.nativeURL]);
    };
    ImagePickerService.prototype.resOnError = function (error) {
        console.log('----------------SS resOnError: ', error);
    };
    /*
     *  Get images from device gallery
     *  - selImages: that mean is select Images
     *  - maxImage: max number when get images
     *  - callbackSelImg: callback function
     */
    ImagePickerService.prototype.selImages = function (maxImage, callbackSelImg) {
        var _this = this;
        this.callbackSelImages = callbackSelImg;
        if (!CONSTANT.REAL_DEVICE) {
            var image = [
                'http://www.uniwallpaper.com/static/images/beautiful-pictures-of-adorable-cute-bunnies-pics-pictures-images-photos-12-600x750.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwZI9ZC9vvOQD3kFHf_MDPfLDa-mf9DF6KPa30wvL6xNvtAH5'
            ];
            return this.callbackSelImages(image);
        }
        this.imagePicker.hasReadPermission().then(function (result) {
            if (result === true) {
                _this.doSelImages(maxImage);
            }
            else {
                _this.trySelImages();
            }
        });
    };
    ;
    ImagePickerService.prototype.doSelImages = function (maxImage) {
        var _this = this;
        maxImage = maxImage || 15;
        this.imagePicker.getPictures({
            maximumImagesCount: maxImage
        }).then(function (results) {
            _this.callbackSelImages(results);
        }, function (err) {
            _this.resOnError(err);
        });
    };
    ImagePickerService.prototype.trySelImages = function () {
        this.imagePicker.getPictures(function (results) {
            if (results == 'OK') {
                this.attachPermissionListener();
            }
        });
    };
    ImagePickerService.prototype.attachPermissionListener = function () {
        var _this = this;
        this.platform.resume.subscribe(function () {
            // do something meaningful when the app is put in the foreground
            _this.checkCameraPhotoPermission();
        });
    };
    ImagePickerService.prototype.dettachPermissionListener = function () {
        this.platform.resume.unsubscribe();
    };
    ImagePickerService.prototype.checkCameraPhotoPermission = function () {
        var _this = this;
        this.dettachPermissionListener();
        this.imagePicker.hasReadPermission().then(function (result) {
            if (result === true) {
                _this.doSelImages();
            }
        });
    };
    ImagePickerService.prototype.removeImage = function (arrayUrlImages, urlImageRemove) {
        arrayUrlImages = _.without(arrayUrlImages, urlImageRemove);
        return arrayUrlImages;
    };
    ;
    ImagePickerService.prototype.hasReadPermission = function () {
        this.imagePicker.hasReadPermission().then(function (result) { });
    };
    ImagePickerService.prototype.requestReadPermission = function () {
        this.imagePicker.requestReadPermission().then(function (result) {
            console.log(">>>>>>>>result>>>>>>>>>>>>requestReadPermission ", result);
        });
    };
    return ImagePickerService;
}());
ImagePickerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ImagePicker,
        Camera,
        Platform,
        File])
], ImagePickerService);
export { ImagePickerService };
//# sourceMappingURL=image-picker.service.js.map