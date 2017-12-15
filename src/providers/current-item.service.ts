import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { CONSTANT } from './constant.service';

@Injectable()
export class CurrentItemService {
  constructor(
    private events: Events,
  ) {}

  broadcastChange(data: any) {
    this.events.publish(CONSTANT.EVENTS_NAME.CURRENT_ITEM_CHANGED, data);
  }
}
