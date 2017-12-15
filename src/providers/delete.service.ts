import { Injectable } from '@angular/core';

import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';

@Injectable()
export class DeleteService {
  constructor(
    private anywhereService: AnywhereService
  ) {}

  deleteRecentSearch() {
    let path = CONSTANT.SERVER.APIS.DELETE_RECENT_SEARCH;
    return this.anywhereService.makeDeleteRequest(path);
  }

  deleteHouse(rentingId) {
    let path = CONSTANT.SERVER.APIS.HOUSE_DETAIL(rentingId);
    return this.anywhereService.makeDeleteRequest(path);
  };

  deleteUserComment(id) {
    let path = CONSTANT.SERVER.APIS.DELETE_COMMENT(id);
    return this.anywhereService.makeDeleteRequest(path).then(function(result) {
      console.log("resultresultresultresult", result);
      if (result.reason == CONSTANT.REASONS.ER_OK) {
        return result;
      } else {
        return false;
      }
    })
  }

  deleteNotification(id) {
    let path = CONSTANT.SERVER.APIS.DELETE_NOTIFICATION(id);
    return this.anywhereService.makeDeleteRequest(path);
  };

}
