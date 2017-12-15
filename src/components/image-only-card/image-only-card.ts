import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'image-only-card',
  templateUrl: './image-only-card.html'
})
export class ImageOnlyCard {
  @Input()
  title;

  @Input()
  info;

  @Input()
  imgSrc;

  @Input()
  type;

  @Output()
  cardClicked = new EventEmitter();

  clickOnCard() {
    console.log("clickOnCardclickOnCardclickOnCard")
    this.cardClicked.emit(true);
  }
}
