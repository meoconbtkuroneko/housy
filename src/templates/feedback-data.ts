import * as _ from 'lodash';
export class FeedbackData {
  type;
  object_id: any;
  reason: string;
  note: string;
  constructor(type, object_id, reason, note ? ) {
    this.type = _.clone(type);
    this.object_id = _.clone(object_id);
    this.reason = _.clone(reason);
    this.note = _.clone(note)
  }
}
