import { Component, Input, ViewChild } from '@angular/core';
import {
  Slides,
  ModalController,
} from 'ionic-angular';

import * as _ from 'lodash';

import { CONSTANT } from '../../services/constant.service';
import { GalleryImages } from '../gallery-images/gallery-images';

const DEFAULT_OPTIONS = {
  PRICE_SHOWN: false,
  PAGENUM_SHOWN: true,
  AUTO_PLAY: false,
  SHOW_GALLERY: true,
};

@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.html'
})
export class ImageSlider {
  @ViewChild(Slides) slides: Slides;

  @Input()
  sliderData;

  @Input()
  options;

  @Input()
  type;

  @Input()
  moreInfo;

  fetchedImages = [];
  numImages: number;
  currentImageShown: number;

  defaultOpts = _.clone(DEFAULT_OPTIONS);

  constructor(
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.updateSlideImages();
  }

  updateSlideImages = function() {
    if (this.options) {
      this.defaultOpts = _.assign(this.defaultOpts, this.options);
    }
    this.currentImageShown = 1;
    this.sliderData = this.sliderData || [];

    let url = null;
    for (let i in this.sliderData) {
      url = this.sliderData[i].url;
      //   this.sliderData[i].url, this.type
      // );

      this.fetchedImages.push({
        url: url
      });
    }

    if (this.fetchedImages.length == 0) {
      this.fetchedImages.push({
        url: CONSTANT.IMAGE.PREFIX_IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE
      });
    }

    this.numImages = this.fetchedImages.length || 1;
  };

  ionSlideDidChange() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex < this.numImages) {
      this.currentImageShown = currentIndex + 1;
    }
  }

  // ---------------gallery--------------

  showGallery() {
    let galleryModal = this.modalCtrl.create(GalleryImages, {
      params: {
        galleryData: this.fetchedImages,
        index: this.currentImageShown - 1,
        type: this.type
      }
    });
    galleryModal.present();
  }
}
