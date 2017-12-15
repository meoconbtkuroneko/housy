import { Component, ViewChild } from '@angular/core';

import { NavParams, ViewController, Slides } from 'ionic-angular';
import { CONSTANT } from '../../providers/constant.service'

@Component({
  selector: "gallery-images",
  templateUrl: "./gallery-images.html"
})
export class GalleryImages {
  params;
  galleryData;
  type;
  currentImageShown: number;
  numImages: number;

  @ViewChild(Slides) slides: Slides;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {}
  ngOnInit() {
    this.params = this.navParams.get('params');
    this.galleryData = this.params.galleryData;
    this.type = this.params.type;
    this.currentImageShown = this.params.index + 1;
    this.numImages = this.galleryData && this.galleryData.length || 1;
  }

  closeGallery() {
    this.viewCtrl.dismiss();
  }

  ionSlideDidChange() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex < this.numImages) {
      this.currentImageShown = currentIndex + 1;
    }
  }

  swipeEvent(directionCode) {
    let direction = CONSTANT.DIRECTION_CODE[directionCode];
    console.log("swipeEventswipeEvent", directionCode, direction);
    if (direction === CONSTANT.DIRECTION_CODE['16']) {
      this.closeGallery();
    }
  }
}
