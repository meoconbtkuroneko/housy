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

  /*
  data = {
    space_id: boolean,
    addFavourite: boolean,
  }
  */
  addFavorite(data) {
    let path = CONSTANT.SERVER.APIS.FAVORITE;
    return this.anywhereService.makePostRequest(path, data)
  }

  resetPassword(data) {
    let path = CONSTANT.SERVER.APIS.FORGOT_PASSWORD;
    return this.anywhereService.makePostRequest(path, data);
  }

  getDiscount(rentingId: number) {
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

  newHouse(data) {
    let path = CONSTANT.SERVER.APIS.ALLHOUSE;
    return this.anywhereService.makePostRequest(path, data);
  };

  updateRecentSearch(data) {
    let path = CONSTANT.SERVER.APIS.RECENT_SEARCH;
    return this.anywhereService.makePostRequest(path, data);
  }

  sendUserComment(data) {
    let path = CONSTANT.SERVER.APIS.COMMENT;
    return this.anywhereService.makePostRequest(path, data);
  }
}
