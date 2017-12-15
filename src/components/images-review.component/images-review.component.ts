import {
  Component,
  Input,
} from '@angular/core';

import {
  ModalController,
} from 'ionic-angular';

import { CONSTANT } from '../../providers/constant.service';
import { GalleryImages } from '../gallery-images/gallery-images';

import * as _ from 'lodash';

@Component({
  selector: 'images-review',
  templateUrl: './images-review.component.html'
})
export class ImagesReviewComponent {

  @Input()
  reviewImages;

  fetchedImages = [];
  numImages: number;
  currentImageShown: number;
  pictureReviewClass = "";

  typeUrl;

  constructor(
    public modalCtrl: ModalController,
  ) {}

  ngOnChanges(changes) {
    for (let propName in changes) {
      if (propName === 'reviewImages') {
        this.syncSetType();
      }
    }
  }

  /**/
  syncSetType() {
    if (this.reviewImages.length <= 1) {
      this.pictureReviewClass = 'full';
    } else if (this.reviewImages.length == 2) {
      this.pictureReviewClass = 'half-full';
    } else {
      this.pictureReviewClass = 'imgs-review-content';
    }
    this.typeUrl;
    if (_.isUndefined(this.reviewImages) || this.reviewImages == 0) {
      this.reviewImages = [{ url: CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE }];
    } else {

      for (let i = 0; i < this.reviewImages.length; i++) {
        let url = this.reviewImages[i].url || this.reviewImages[i];

        if (url.indexOf('space') != -1) {
          this.typeUrl = 'space';

        } else if (url.indexOf('apartment') != -1) {
          this.typeUrl = 'apartment';

        } else if (url.indexOf('neighborhood') != -1) {
          this.typeUrl = 'neighborhood';

        } else if (url.indexOf('user') != -1) {
          this.typeUrl = 'user';

        } else if (url.indexOf('review') != -1) {
          this.typeUrl = 'review';
        } else {
          this.typeUrl = 'new';
        }

        this.fetchedImages.push({
          type: this.typeUrl,
          fetched: true,
          url: url
        });

      }
      this.numImages = this.fetchedImages.length || 1;

    }
  }

  // ---------------gallery--------------

  showGallery(index) {
    let galleryModal = this.modalCtrl.create(GalleryImages, {
      params: {
        galleryData: this.fetchedImages,
        index: index,
        type: this.typeUrl,
      }
    });
    galleryModal.present();
  }
}
