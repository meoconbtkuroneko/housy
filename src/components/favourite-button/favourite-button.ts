import {
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

import { CONSTANT } from '../../providers/constant.service';
import { PostService } from '../../providers/post.service';
import { FavouriteService } from '../../providers/favourite.service';

import {
  ClickNeedShowLoginClass,
  CoreServices
} from '../../templates/core-class';

@Component({
  selector: "favourite-button",
  templateUrl: "./favourite-button.html"
})
export class FavouriteButton extends ClickNeedShowLoginClass {

  @Input()
  cardData;

  @Output()
  onFavouriteChanged = new EventEmitter < boolean > ();

  iconName;

  constructor(
    private favouriteService: FavouriteService,
    private postService: PostService,
    coreServices: CoreServices,
  ) {
    super(coreServices);
    this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.FAVOURITE;
  }

  ngOnChanges(changes) {
    this.setIconName();
  }

  setIconName() {
    if (this.cardData) {
      this.iconName = this.coreServices.anywhereService.getFavouriteIconName(this.cardData.isFavouriteAdded);
    }
  }



  favouriteButtonClicked(e ? ) {
    if (e) {
      e.stopPropagation();
    }

    console.log("favouriteButtonClickedfavouriteButtonClicked")

    if (!this.canGo()) {
      return;
    }

    this.checkHasLogined(this.callbackType, () => {
      this.toggleIsProcessing(true);
      this.setFavouriteData(false);
      this.doAddFavourite();
    }, () => {
      this.setFavouriteData(true);
      this.finishLoading();
    })
  }

  setFavouriteData(addAnyway: boolean) {
    this.favouriteService.setFavouriteData(this.cardData, addAnyway)
  }

  private doAddFavourite() {
    this.favouriteService.doAddFavourite(() => {
      this.toggleIsProcessing(false);
      // this.toggleClicked();
    })
  }

  // clicked: boolean;
  // toggleClicked() {
  //   this.clicked = true;
  //   setTimeout(() => {
  //     this.clicked = false;
  //   }, 2000)
  // }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
  // private doAddFavourite() {

  //   let tempData = _.cloneDeep(this.cardData);
  //   let data: any = {
  //     space_id: tempData.id
  //   };

  //   if (this.addAnyway) {
  //     data.isFavouriteAdded = true;
  //   }

  //   this.postService.addFavorite(data)
  //     .then((result: any) => {
  //         console.log("this.cardData", this.cardData.isFavouriteAdded, result);
  //         if (result.reason === CONSTANT.REASONS.ER_OK) {
  //           this.cardData.isFavouriteAdded = result.isFavouriteAdded;
  //           let message;
  //           if (this.cardData.isFavouriteAdded) {
  //             message = CONSTANT.FAVORITE.ADD;
  //           } else {
  //             message = CONSTANT.FAVORITE.REMOVE;
  //           }
  //           this.coreServices.currentItemService.broadcastChange({
  //             type: 'space',
  //             id: this.cardData.renting.id,
  //             data: this.cardData
  //           });
  //           this.finishLoading(message);
  //         } else {
  //           this.finishLoading(CONSTANT.FAVORITE.ERR);
  //         }
  //       },
  //       error => {
  //         this.finishLoading(CONSTANT.FAVORITE.ERR);
  //       })
  // }

  // finishLoading(message ? ) {
  //   this.toggleIsProcessing(false);
  //   if (message) {
  //     this.coreServices.anywhereService.showToast(message);
  //   }
  // }


}
