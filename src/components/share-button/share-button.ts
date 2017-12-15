import {
  Component,
  Input,
} from '@angular/core';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CONSTANT } from '../../providers/constant.service';

import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';


@Component({
  selector: "share-button",
  templateUrl: "./share-button.html"
})
export class ShareButton extends CoreSimpleClass {
  constructor(
    coreServices: CoreServices,
    private socialSharing: SocialSharing
  ) {
    super(coreServices);
  }

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
    if (!this.canGo()) {
      return;
    }
    let linkShare = this.getLinkToWeb();
    this.socialSharing.share(null, null, null, linkShare);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
