import {
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

import { NavController } from 'ionic-angular';

import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
import { PostService } from '../../services/post.service';
import { CurrentItemService } from '../../services/current-item.service';
import { LoginPage } from '../../pages/login-page/login-page';


@Component({
  selector: "favourite-button",
  templateUrl: "./favourite-button.html"
})
export class FavouriteButton {
  constructor(
    private anywhereService: AnywhereService,
    private postService: PostService,
    private currentItemService: CurrentItemService,
    private navController: NavController,
  ) {}

  @Input()
  cardData;

  @Output()
  onFavouriteChanged = new EventEmitter < boolean > ();

  iconName;

  ngOnChanges(changes) {
    this.setIconName();
  }

  setIconName() {
    if (this.cardData) {
      this.iconName = this.anywhereService.getFavouriteIconName(this.cardData.isFavouriteAdded);
    }
  }

  isProcessing: boolean = false;

  favouriteButtonClicked(e) {
    e.stopPropagation();
    if (!this.isProcessing) {
      this.isProcessing = true;

      if (this.anywhereService.USER.logined) {
        let tempData = this.cardData;
        let spaceId = tempData.id;

        this.postService.addFavorite(spaceId)
          .then(result => {
              if (result.reason === CONSTANT.REASONS.ER_OK) {
                this.cardData.isFavouriteAdded = !this.cardData.isFavouriteAdded;
                let message;
                if (this.cardData.isFavouriteAdded) {
                  message = CONSTANT.FAVORITE.ADD;
                } else {
                  message = CONSTANT.FAVORITE.REMOVE;
                }
                this.currentItemService.broadcastChange({
                  type: 'space',
                  id: this.cardData.renting.id,
                  data: this.cardData
                });
                this.finishLoading(message);
              } else {
                this.finishLoading(CONSTANT.FAVORITE.ERR);
              }
            },
            error => {
              this.finishLoading(CONSTANT.FAVORITE.ERR);
            })
      } else {
        this.finishLoading();
        this.anywhereService.showModal(LoginPage);
      }
    }
  }

  private finishLoading(message ? ) {
    this.isProcessing = false;
    if (message) {
      this.anywhereService.showToast(message);
    }
  }
}
