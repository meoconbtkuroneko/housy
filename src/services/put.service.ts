import { Injectable } from '@angular/core';
import { AnywhereService } from './anywhere.service';

@Injectable()
export class PutService {
  constructor(
    private anywhereService: AnywhereService
  ) {}

  updateProfile(data) {
    let userId = this.anywhereService.USER.userInfo.id;
    let path = "users/" + userId + ".json";
    return this.anywhereService.makePutRequest(path, data);
  }
}
