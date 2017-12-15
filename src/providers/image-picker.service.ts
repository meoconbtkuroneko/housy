import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import {
  Camera,
  // CameraOptions 
} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { CONSTANT } from './constant.service';
// import { Subscription } from 'rxjs';

import * as _ from 'lodash';

@Injectable()
export class ImagePickerService {

  private destinationType;
  private pictureSource;
  private captureCallback = null;
  private callbackSelImages = null;
  // private options = {
  //   maximumImagesCount: 10,
  //   quality: 75,
  //   width: 1024, // proportionally rescale image to this width, default no rescale
  //   height: 800
  // }
  constructor(
    private imagePicker: ImagePicker,
    private camera: Camera,
    private platform: Platform,
    private file: File
  ) {
    platform.ready().then(() => {
      //call a function when device already
      this.onDeviceReady();
    })

  }

  private onDeviceReady() {
    this.pictureSource = this.camera.PictureSourceType;
    this.destinationType = this.camera.DestinationType;
  }

  capturePhoto(callback) {
    this.captureCallback = callback;
    if (!CONSTANT.REAL_DEVICE) {
      let image = {
        nativeURL: 'http://kingofwallpapers.com/picture/picture-008.jpg'
      }
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
    }).then((uri) => {
      this.onPhotoURISuccess(uri);
    }, (err) => {
      this.onFail(err);
    });
  }

  private onFail(argument) {}

  // Called when a photo is successfully File URI
  private onPhotoURISuccess(imageURI) {
    if (imageURI.substring(0, 21) == "content://com.android") {
      let photo_split = imageURI.split("%3A");
      imageURI = "content://media/external/images/media/" + photo_split[1];
    }
    console.log('111 ===>>>>>>>>>>>>>>>onPhotoURISuccess:  imageURI', imageURI)
    this.copyPictureToApp(imageURI);
  }

  private copyPictureToApp(fileUrl) {
    this.file.resolveLocalFilesystemUrl(fileUrl).then((entrySuccess) => {
      this.resolveOnSuccess(entrySuccess);
    }, this.resOnError)
  }

  //Callback function when the file system uri has been resolved
  private resolveOnSuccess(entry) {
    console.log('----------------222 resolveOnSuccess: ', entry);
    this.successCopy(entry);
  }

  //Callback function when the file has been moved successfully - inserting the complete path
  private successCopy(entry) {
    console.log('------44----------SS captureCallback: ', entry);
    this.captureCallback([entry.nativeURL]);
  }

  private resOnError(error) {
    console.log('----------------SS resOnError: ', error);
  }

  /*
   *  Get images from device gallery
   *  - selImages: that mean is select Images
   *  - maxImage: max number when get images
   *  - callbackSelImg: callback function
   */
  selImages(maxImage, callbackSelImg) {
    this.callbackSelImages = callbackSelImg;
    if (!CONSTANT.REAL_DEVICE) {
      let image = [
        'http://www.uniwallpaper.com/static/images/beautiful-pictures-of-adorable-cute-bunnies-pics-pictures-images-photos-12-600x750.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwZI9ZC9vvOQD3kFHf_MDPfLDa-mf9DF6KPa30wvL6xNvtAH5'
      ]
      return this.callbackSelImages(image);
    }
    this.imagePicker.hasReadPermission().then((result) => {
      if (result === true) {
        this.doSelImages(maxImage);
      } else {
        this.trySelImages();
      }
    });
  };

  private doSelImages(maxImage ? ) {
    maxImage = maxImage || 15;
    this.imagePicker.getPictures({
      maximumImagesCount: maxImage
    }).then((results) => {
      this.callbackSelImages(results);
    }, (err) => {
      this.resOnError(err);
    });
  }

  private trySelImages() {
    this.imagePicker.getPictures(
      function(results) {
        if (results == 'OK') {
          this.attachPermissionListener();
        }
      }
    );
  }

  attachPermissionListener() {
    this.platform.resume.subscribe(() => {
      // do something meaningful when the app is put in the foreground
      this.checkCameraPhotoPermission();
    });
  }

  private dettachPermissionListener() {
    this.platform.resume.unsubscribe();
  }

  private checkCameraPhotoPermission() {
    this.dettachPermissionListener();
    this.imagePicker.hasReadPermission().then((result) => {
      if (result === true) {
        this.doSelImages();
      }
    });
  }

  removeImage(arrayUrlImages, urlImageRemove) {
    arrayUrlImages = _.without(arrayUrlImages, urlImageRemove);
    return arrayUrlImages;
  };

  hasReadPermission() {
    this.imagePicker.hasReadPermission().then((result) => {})
  }

  requestReadPermission() {
    this.imagePicker.requestReadPermission().then((result) => {
      console.log(">>>>>>>>result>>>>>>>>>>>>requestReadPermission ", result)
    });
  }

}
