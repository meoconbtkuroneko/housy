import {
  Component,
  Input
} from '@angular/core';
import {
  NavController,
} from 'ionic-angular';

import { DetailNewListing } from '../../pages/detail-new-listing/detail-new-listing';
import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { DeleteService } from '../../providers/delete.service';
import { CurrentItemService } from '../../providers/current-item.service';

@Component({
  selector: 'image-card-owner',
  templateUrl: './image-card-owner.html'
})
export class ImageCardOwner {
  @Input()
  cardData;

  rentingStatusIds = CONSTANT.RENTING_STATUS_ID;

  constructor(
    public navController: NavController,
    private anywhereService: AnywhereService,
    private currentItemService: CurrentItemService,
    private deleteService: DeleteService,
  ) {}

  goToDetail(rentingId) {
    if (!this.cardData.isUpdating) {
      let params = {
        id: rentingId
      };
      console.log("rentingIdrentingId", rentingId);
      this.navController.push(DetailNewListing, {
        params: params
      });
    } else {
      this.anywhereService.showToast(CONSTANT.UPLOADING);
    }
  }

  deleteButttonClick(e) {
    e.stopPropagation();
    let alert = this.anywhereService.alertController.create({
      title: CONSTANT.TITLE_HOUSY,
      subTitle: CONSTANT.UPDATE.DELETE_QUESTION,
      buttons: [{
        text: CONSTANT.STRING_CANCEL,
        role: 'cancel'
      }, {
        text: CONSTANT.STRING_DELETE,
        handler: () => {
          this.handleDeleteOK();
        }
      }]
    });
    alert.present();
  }

  handleDeleteOK() {
    this.deleteService.deleteHouse(this.cardData.renting.id)
      .then((res: any) => {
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          this.currentItemService.broadcastChange({
            type: 'space',
            id: this.cardData.renting.id,
            data: this.cardData,
            isDelete: true
          });
          this.anywhereService.showToast(CONSTANT.UPDATE.DELETE_OK);
        } else {
          this.anywhereService.showToast(CONSTANT.UPDATE.DELETE_ERROR);
        }
      })
  }
}
