import {
  Component,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  Slides,
  ModalController,
  ViewController
} from 'ionic-angular';

import * as _ from 'lodash';

import { CONSTANT } from '../../providers/constant.service';
import { GalleryImages } from '../gallery-images/gallery-images';

const DEFAULT_OPTIONS = {
  PRICE_SHOWN: false,
  PAGENUM_SHOWN: false,
  FAVOURITE_SHOWN: false,
  VERIFY_SHOWN: true,
  AUTO_PLAY: false,
  SHOW_GALLERY: true,
  REMOVE_IMAGE_SHOW: false
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

  @Output() removeImageIndex = new EventEmitter();

  fetchedImages = [];
  numImages: number;
  currentImageShown: number;
  currentIndex;
  defaultOpts = DEFAULT_OPTIONS;

  constructor(
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,

  ) {

  }

  ngOnChanges(changes) {
    for (let propName in changes) {
      if (propName === 'sliderData') {
        let dataChange = changes['sliderData'].currentValue;
        console.log("CHANGEEEEEEEEEEE this.sliderData: ", dataChange);
        this.updateSlideImages(dataChange);

      }
    }
  }

  ngOnInit() {
    this.updateSlideImages(this.sliderData);
  }

  updateSlideImages = function(data) {
    _.assignIn(this.defaultOpts, this.options);

    this.fetchedImages = [];
    this.syncSetType();
  };

  ionSlideDidChange() {
    let currentSlidesLength = this.slides.length();
    this.currentIndex = this.slides.getActiveIndex();

    if (this.currentIndex > currentSlidesLength) {
      this.currentIndex--;
    }

    if (this.slides.getActiveIndex() == currentSlidesLength) {
      this.slides.slideTo(currentSlidesLength - 1);
    }
    this.currentImageShown = this.currentIndex + 1;

  }

  /**/
  syncSetType() {
    let typeUrl;
    if (_.isUndefined(this.sliderData) || this.sliderData == 0) {
      this.sliderData = [{ url: CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE }];
    } else {

      for (let i = 0; i < this.sliderData.length; i++) {
        let url = this.sliderData[i].url || this.sliderData[i];

        if (url.indexOf('space') != -1) {
          typeUrl = 'space';

        } else if (url.indexOf('apartment') != -1) {
          typeUrl = 'apartment';

        } else if (url.indexOf('neighborhood') != -1) {
          typeUrl = 'neighborhood';

        } else if (url.indexOf('user') != -1) {
          typeUrl = 'user';

        } else if (url.indexOf('review') != -1) {
          typeUrl = 'review';
        } else {
          typeUrl = 'new';
        }

        this.type = typeUrl;

        this.fetchedImages.push({
          type: typeUrl,
          fetched: true,
          url: url
        });

      }
      this.numImages = this.fetchedImages.length || 1;
      console.log(">>>>>>>>>>>>>>>>> this.numImages: ", this.numImages)
      setTimeout(() => {
        this.ionSlideDidChange();
        this.slides.update();
      }, 500)
    }
  }

  // ---------------gallery--------------

  showGallery() {
    let galleryModal = this.modalCtrl.create(GalleryImages, {
      params: {
        galleryData: this.fetchedImages,
        index: this.currentImageShown - 1,
        type: this.type,
      }
    });
    galleryModal.present();
  }

  /*---------Remove Image-------------*/
  removeImageButtonClicked() {
    let imgRemove = this.fetchedImages[this.currentIndex];
    console.log(">>>>>currentIndex>>>>>>>>>>>> removeImageButtonClicked: ", this.currentIndex)
    this.removeImageIndex.emit(imgRemove.url);

  }

  // fetchedImages = [];
  // numImages: number;
  // currentImageShown: number;

  // defaultOpts = _.clone(DEFAULT_OPTIONS);

  // constructor(
  //   private modalCtrl: ModalController,
  // ) {}

  // ngOnInit() {
  //   this.updateSlideImages();
  // }

  // updateSlideImages = function() {
  //   if (this.options) {
  //     this.defaultOpts = _.assign(this.defaultOpts, this.options);
  //   }
  //   this.currentImageShown = 1;
  //   this.sliderData = this.sliderData || [];

  //   let url = null;
  //   for (let i in this.sliderData) {
  //     url = this.sliderData[i].url;
  //     //   this.sliderData[i].url, this.type
  //     // );

  //     this.fetchedImages.push({
  //       url: url
  //     });
  //   }

  //   if (this.fetchedImages.length == 0) {
  //     this.fetchedImages.push({
  //       url: CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE
  //     });
  //   }

  //   this.numImages = this.fetchedImages.length || 1;
  // };

  // ionSlideDidChange() {
  //   let currentIndex = this.slides.getActiveIndex();
  //   if (currentIndex < this.numImages) {
  //     this.currentImageShown = currentIndex + 1;
  //   }
  // }

  // // ---------------gallery--------------

  // showGallery() {
  //   let galleryModal = this.modalCtrl.create(GalleryImages, {
  //     params: {
  //       galleryData: this.fetchedImages,
  //       index: this.currentImageShown - 1,
  //       type: this.type
  //     }
  //   });
  //   galleryModal.present();
  // }
}
