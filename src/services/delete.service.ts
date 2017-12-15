import { Injectable } from '@angular/core';

import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';

@Injectable()
export class DeleteService {
  constructor(
    private anywhereService: AnywhereService
  ) {}

  deleteRecentSearch() {
    var path = CONSTANT.SERVER.APIS.DELETE_RECENT_SEARCH;
    return this.anywhereService.makeDeleteRequest(path);
  }
}
