import {
  Component,
} from '@angular/core';

import {
  ViewController,
  Platform
} from 'ionic-angular';

import { CONSTANT } from '../../providers/constant.service';

@Component({
  selector: 'select-images',
  templateUrl: 'select-images.html'
})
export class SelectImages {
  currentImages;

  title = CONSTANT.TITLE_HOUSY;
  subTitle = CONSTANT.SELECT_IMAGES.PLACEHOLDER;

  constructor(
    private viewController: ViewController,
    // k duoc xoa vi xai ngoai template
    public platform: Platform,
  ) {}

  getImages(images) {
    this.currentImages = images[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD][0];
    if (images[CONSTANT.KEY_IMAGES.KEY_IS_FINISHED]) {
      this.closeModal();
    }
  }

  closeModal() {
    this.viewController.dismiss(this.currentImages);
  }
}
