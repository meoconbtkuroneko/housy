import { Injectable } from '@angular/core';

import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';

@Injectable()
export class PostService {
  constructor(
    private anywhereService: AnywhereService
  ) {}

  registerNewAccount(data) {
    let path = CONSTANT.SERVER.APIS.REGISTER;
    return this.anywhereService.makePostRequest(path, data);
  }

  addFavorite(spaceId) {
    let path = CONSTANT.SERVER.APIS.FAVORITE;
    let data = {
      space_id: spaceId
    };
    return this.anywhereService.makePostRequest(path, data)
  }

  resetPassword(data) {
    let path = CONSTANT.SERVER.APIS.FORGOT_PASSWORD;
    return this.anywhereService.makePostRequest(path, data);
  }

  getDiscount(rentingId) {
    let path = CONSTANT.SERVER.APIS.DISCOUNT;
    let data = {
      renting_id: rentingId
    };
    return this.anywhereService.makePostRequest(path, data);
  }

  sendUserFeedback(data) {
    let path = CONSTANT.SERVER.APIS.FEEDBACK_USER;
    return this.anywhereService.makePostRequest(path, data);
  };
}
