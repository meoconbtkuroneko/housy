import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrentItemService {
  constructor() {}

  CURRENT_ITEM = new BehaviorSubject({});

  broadcastChange(data: any) {
    this.CURRENT_ITEM.next(data);
  }
}
