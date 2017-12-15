import { Component, Input, OnInit } from '@angular/core';
import { CONSTANT } from '../../providers/constant.service';

import { AnywhereService } from '../../providers/anywhere.service';


@Component({
  selector: 'image-lazy',
  templateUrl: './image-lazy.html'
})
export class ImageLazy implements OnInit {
  constructor(
    public anywhereService: AnywhereService,
  ) {};

  @Input()
  imgSrc;

  @Input()
  fullSize;

  @Input()
  type;

  fetchedImageUrl;

  defaultOpts = {
    loading: CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.LOADING,
    waitingUrl: CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE,
    avatar: CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.NO_AVATAR,
  };

  defaultBackground = this.defaultOpts.loading;

  loadImage() {
    let src = this.anywhereService.getFullImgUrl(this.imgSrc, this.type, this.fullSize);
    this.fetchedImageUrl = src;
  }

  ngOnInit() {
    if (this.type == 'user') {
      this.defaultBackground = this.defaultOpts.avatar;
    }
    this.loadImage();
  }

  ngOnChanges(changes) {
    if (this.imgSrc) {
      this.loadImage();
    }
  }

  setImageUrl(imageUrl): void {}

  loading = true;

  imageLoaded() {
    this.loading = undefined;
  }
}
