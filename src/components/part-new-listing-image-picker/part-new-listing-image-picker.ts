import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

import {
  NavController,
  ViewController,
} from 'ionic-angular';

import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { NewListingService } from '../../providers/new-listing.service';

import * as _ from 'lodash';

@Component({
  selector: "part-new-listing-image-picker",
  templateUrl: "./part-new-listing-image-picker.html"
})
export class PartNewListingImagePicker {
  constructor(
    private anywhereService: AnywhereService,
    private navController: NavController,
    private newListingService: NewListingService,
    private viewController: ViewController,
  ) {}

  @Output()
  getNewListingImage = new EventEmitter();

  imagesArr: any;
  hasDeleteImages;
  deleteImageIdArr;

  canSend;
  canSendForm;
  canSendImages;
  showData;

  minImages: number = 1;

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('hide');
  };

  ngOnInit() {
    console.log("ngOnInit")
    this.initVals();
  }

  initVals() {
    this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
    console.log("this.showData 22222222", this.showData)
    console.log("this.imagesArr", this.imagesArr, this.showData.imagesArr, this.showData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES])
    this.imagesArr = this.imagesArr ||
      (this.showData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES] &&
        this.showData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES].length > 0) ?
      this.showData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES] :
      (this.showData[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD] || []);
    this.checkCanSend();
    this.broadcastValue();
  }

  getImages(images) {
    this.imagesArr = _.cloneDeep(images[CONSTANT.KEY_IMAGES.KEY_CURRENT_IMAGES]);

    if (images.hasOwnProperty(CONSTANT.KEY_IMAGES.KEY_HAS_DELETE_IMAGES)) {
      this.checkSpaceImagesToDelete(images);
    } else {
      this.imagesToUpload = _.union(
        images[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD],
        this.imagesToUpload);
    }
    console.log("imagesimages", this.imagesArr);
    this.updataNewListingData();
    this.checkCanSend();
    this.broadcastValue();
  }

  checkSpaceImagesToDelete(objImageData) {
    let currentHasDeleteImage = objImageData[CONSTANT.KEY_IMAGES.KEY_HAS_DELETE_IMAGES];
    console.log("checkSpaceImagesToDelete objImageData", objImageData, currentHasDeleteImage);
    let tempObjImage = objImageData[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID];
    console.log("tempObjImage", tempObjImage);
    if (currentHasDeleteImage) {
      this.deleteImageIdArr = this.deleteImageIdArr || [];
      this.deleteImageIdArr.push(tempObjImage.id);
    }
    this.removeFromUpload(tempObjImage);
    console.log("deleteImageIdArr", this.deleteImageIdArr);
  }

  imagesToUpload: any;

  removeFromUpload(removeUrl) {
    console.log("removeFromUpload")
    if (this.imagesToUpload) {
      this.imagesToUpload = _.without(this.imagesToUpload, removeUrl);
      console.log('this.imagesToUpload', this.imagesToUpload, removeUrl);
    }
  }

  updataNewListingData() {
    let tempVal: any = {};
    tempVal.imagesArr = this.imagesArr;
    tempVal[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID] = this.deleteImageIdArr;
    tempVal[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD] = this.imagesToUpload;
    this.newListingService.setNewListingData(tempVal);
  }

  checkCanSend() {
    if (this.imagesArr && this.imagesArr.length > this.minImages) {
      this.canSend = true;
    } else {
      this.canSend = false;
    }
  }

  broadcastValue() {
    this.getNewListingImage.emit({
      canSend: this.canSend
    });
  }
}
