import { Injectable } from '@angular/core';
import { AnywhereService } from './anywhere.service';
import { CONSTANT } from './constant.service';

import * as _ from 'lodash';

@Injectable()
export class PutService {
  constructor(
    private anywhereService: AnywhereService
  ) {}

  updateProfile(data) {
    let userId = this.anywhereService.USER.userInfo.id;
    let path = CONSTANT.SERVER.APIS.PROFILE(userId);
    return this.anywhereService.makePutRequest(path, data);
  }

  deleteImages(rentingId, imageIds) {
    let path = CONSTANT.SERVER.APIS.DELETE_SPACE_IMAGES;
    let data = {
      delete_images: imageIds,
      token_image: this.anywhereService.USER.userInfo.token_image,
    }
    console.log("deleteImages send data", data);
    return this.anywhereService.makePutRequest(path, data);
  }

  updateHouseDetail(rentingId, data) {
    let path = CONSTANT.SERVER.APIS.HOUSE_DETAIL(rentingId);
    let sendData = _.cloneDeep(data);
    sendData.renting = sendData.renting || {};
    sendData.renting.id = rentingId;

    console.log("updateHouseDetail senddddddddddddddd dataaaaaaaaaaaaa", _.cloneDeep(sendData));
    return this.anywhereService.makePutRequest(path, sendData);
  };

  toggleNotification(id, data) {
    let path = CONSTANT.SERVER.APIS.TOOGLE_NOTIFICATION(id);
    return this.anywhereService.makePutRequest(path, data);
  }
}
