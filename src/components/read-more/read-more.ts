import {
  Component,
  Input,
} from '@angular/core';

// import {
//   App
// } from 'ionic-angular';

import * as _ from 'lodash';

@Component({
  selector: 'read-more',
  templateUrl: './read-more.html'
})
export class ReadMore {
  @Input()
  rmText;

  @Input()
  rmMoreText = 'Xem thêm';

  @Input()
  rmLessText = '-Thu gọn';

  @Input()
  rmLinkClass;

  @Input()
  rmLimit = 100;

  containLessText: string = "";
  containFullText: string = "";
  containText: string;
  linkClass: string;
  showButton = false;
  toggle = {
    stateLess: true,
    text: ''
  };


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
    if (this.containFullText.length != this.containLessText.length && (this.containFullText.length > 0 && this.containLessText.length > 0)) {
      this.showButton = true;
    }
  }

  doToggle(e) {
    this.containText = this.containFullText;
    this.toggle.text = this.rmLessText;
    this.showButton = false;
  }

  // content;
  // oldScrollDimensions;
  // increaseWidth;

  // constructor(
  //   public app: App,
  // ) {}


  // ngAfterViewInit() {
  //   this.content = this.app.getActiveNav().getActive().getContent();
  // }

  // doToggle(e) {
  //   this.toggle.stateLess = !this.toggle.stateLess;
  //   console.log("$event", e, this.oldScrollDimensions);
  //   if (!this.toggle.stateLess) {
  //     // hien thi het
  //     this.oldScrollDimensions = this.getScrollDimensions();
  //     console.log("ooooooooooooooooooooooooo", this.oldScrollDimensions)
  //     this.containText = this.containFullText;
  //     this.toggle.text = this.rmLessText;
  //     setTimeout(() => {
  //       this.getIncreaseWidth();
  //     }, 100);
  //   }
  //    else {
  //     this.scrollToOldDimentions();
  //     // thu gon
  //     setTimeout(() => {
  //       this.containText = this.containLessText;
  //       this.toggle.text = this.rmMoreText;
  //     }, 100);
  //   }
  // }

  // getScrollDimensions() {
  //   return this.content.getContentDimensions();
  // }

  // getIncreaseWidth() {
  //   let newScrollDimensions = this.getScrollDimensions();
  //   this.increaseWidth = newScrollDimensions.scrollHeight -
  //     this.oldScrollDimensions.scrollHeight;
  //   console.log("this.increaseWidth", newScrollDimensions, this.increaseWidth);
  //   return this.increaseWidth;
  // }

  // scrollToOldDimentions() {
  //   let newScrollTop = this.adjustScrollTop();
  //   console.log("scrollToOldDimentionsscrollToOldDimentions", this.oldScrollDimensions)
  //   if (this.oldScrollDimensions) {
  //     this.content.scrollTo(
  //       this.oldScrollDimensions.scrollLeft,
  //       newScrollTop,
  //       0
  //     )
  //   }
  // }

  // adjustScrollTop() {
  //   let newScrollDimensions = this.getScrollDimensions();
  //   console.log("newScrollDimensionsnewScrollDimensions", newScrollDimensions);
  //   let newScrollTop = Math.max(newScrollDimensions.scrollTop - this.increaseWidth, 0);
  //   console.log("aaaaaaaaaaaaaaaaaaaa", newScrollTop);
  //   return newScrollTop;
  // }
}
