import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'read-more',
  templateUrl: './read-more.html'
})
export class ReadMore implements OnChanges {
  @Input()
  rmText;

  @Input()
  rmMoreText = 'Xem thêm';

  @Input()
  rmLessText = '-Thu gọn';

  @Input()
  rmLinkClass;

  @Input()
  rmLimit;

  containLessText: string;
  containFullText: string;
  containText: string;
  linkClass: string;
  toggle = {
    stateLess: true,
    text: ''
  };
  constructor() {}

  ngOnChanges() {
    this.loadData();
  }

  loadData() {
    this.setText();
  }

  setText() {
    if (this.rmText.length <= 30) {
      this.containText = this.rmText;
      return;
    }
    this.containFullText = this.rmText;
    this.containLessText = _.truncate(this.rmText, {
      'length': this.rmLimit,
      'separator': ' '
    });
    this.toggle.text = this.rmMoreText;
    this.containText = this.containLessText;

  }

  doToggle() {
    this.toggle.stateLess = !this.toggle.stateLess;
    this.containText = this.containLessText;
    this.toggle.text = this.rmMoreText;
    if (!this.toggle.stateLess) {
      this.containText = this.containFullText;
      this.toggle.text = this.rmLessText;
    }
  }
}
