import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';

import * as _ from 'lodash';

const DEFAULT_OPTIONS = {
  SHOW_MORE: false
};

@Component({
  selector: 'part-horizontal-card',
  templateUrl: './part-horizontal-card.html'
})
export class PartHorizontalCard {
  @Input()
  listHouses;
  @Input()
  title;
  @Input()
  highlightId;

  @Input()
  options;

  @ViewChild('scroll') scroll;

  defaultOpts = _.cloneDeep(DEFAULT_OPTIONS);

  ngOnChanges(changes) {
    if (changes.options) {
      this.defaultOpts = _.assignIn(this.defaultOpts, this.options);
    }
  }
}
