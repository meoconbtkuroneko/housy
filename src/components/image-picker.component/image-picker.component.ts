import {
  Component,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import * as _ from 'lodash';
import { ImagePickerService } from '../../providers/image-picker.service';
import { CONSTANT } from '../../providers/constant.service';

const DEFAULT_OPTIONS = {
  SHOW_SLIDER: true,
  CLOSE_ON_SELECT: false,
  SHOW_REQUIRED: true,
  MAX_IMAGES: 10,
};

@Component({
  selector: 'image-picker',
  templateUrl: './image-picker.component.html',
})

export class ImagePickerComponent {
  @Input()
  currentImages;

  @Input()
  options;

  defaultOpts = _.clone(DEFAULT_OPTIONS);

  images = [];
  @Output() returnImages = new EventEmitter();

  constructor(
    private ImagePickerService: ImagePickerService
  ) {}

  capturePhoto() {
    this.ImagePickerService.capturePhoto((arrayImagesUrl) => {
      this.handleCallBackImages(arrayImagesUrl);
    })
  }

  ngOnInit() {
    this.addImages(this.currentImages);
    if (this.options) {
      this.defaultOpts = _.assignIn(this.options);
    }
  }

  selectImages() {
    let maxImages = this.defaultOpts.MAX_IMAGES;
    this.ImagePickerService.selImages(maxImages, (arrayImagesUrl) => {
      this.handleCallBackImages(arrayImagesUrl);
    })
  }

  handleCallBackImages(arrayImagesUrl) {
    let data: any = {};
    data[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD] = arrayImagesUrl;
    this.addImages(arrayImagesUrl);
    data[CONSTANT.KEY_IMAGES.KEY_CURRENT_IMAGES] = this.images;
    data[CONSTANT.KEY_IMAGES.KEY_IS_FINISHED] = this.defaultOpts.CLOSE_ON_SELECT;
    this.giveBackToParent(data);
  };

  giveBackToParent(data) {
    this.returnImages.emit(data);
  }

  addImages(newImagesArr) {
    if (newImagesArr && newImagesArr.length > 0) {
      this.images = _.union(newImagesArr, this.images);
    }
  }

  deleteImage(urlRemove) {
    let rsImage;
    let removeObj;
    let index = this.images.indexOf(urlRemove);
    if (index > -1) {
      this.images = this.ImagePickerService.removeImage(this.images, urlRemove);
      rsImage = urlRemove;
    } else {
      removeObj = _.find(this.images, { url: urlRemove });
      if (removeObj) {
        this.images = this.ImagePickerService.removeImage(this.images, removeObj);
        rsImage = removeObj.id;
      }
    }
    let data: any = {};
    data[CONSTANT.KEY_IMAGES.KEY_HAS_DELETE_IMAGES] = removeObj ? true : false;
    data[CONSTANT.KEY_IMAGES.KEY_CURRENT_IMAGES] = this.images;
    data[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID] = removeObj || urlRemove;

    this.giveBackToParent(data);
  }
}
