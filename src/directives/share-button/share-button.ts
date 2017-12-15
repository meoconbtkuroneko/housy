import {
  Component,
  Input,
} from '@angular/core';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CONSTANT } from '../../services/constant.service';

@Component({
  selector: "share-button",
  templateUrl: "./share-button.html"
})
export class ShareButton {
  constructor(
    private socialSharing: SocialSharing
  ) {}

  @Input()
  id;

  @Input()
  type;

  private getLinkToWeb() {
    let linkType;
    if (this.type == CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_SPACE) {
      linkType = CONSTANT.TYPE_LINK_SOCIAL_CLICK.SPACE;
    }
    if (this.type == CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_APARTMENT) {
      linkType = CONSTANT.TYPE_LINK_SOCIAL_CLICK.APARTMENT;
    }
    return CONSTANT.HOUSY_VN + linkType + this.id;
  }

  shareButtonClicked(e) {
    e.stopPropagation();
    let linkShare = this.getLinkToWeb();
    this.socialSharing.share(null, null, null, linkShare);
  }
}
