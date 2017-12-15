import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'rating-star',
  templateUrl: './rating-star.component.html',

})
export class RatingStarComponent implements OnChanges {
  @Input() maxStar;
  @Input() nameRating: string;
  @Input() defaultRating;
  @Input() readOnly;

  @Output() returnValue = new EventEmitter < Object > ();

  ratingVal: number;
  numberStar;

  constructor() {}

  ngOnChanges() {
    this.loadData();
  }

  loadData() {
    this.setMaxStart(this.maxStar);
    this.setDefaultValue(this.defaultRating)
  }

  setRating(ratingVal) {
    if (this.readOnly) {
      return;
    }
    this.ratingVal = ratingVal;

    this.returnValue.emit({
      nameRating: this.nameRating,
      valueRating: this.ratingVal
    });
  };

  setMaxStart(max) {
    this.numberStar = [];
    for (var i = 0; i < max; i++) {
      this.numberStar[i] = i + 1;
    }
  }

  setDefaultValue(df) {
    if (df != undefined) {
      this.ratingVal = this.defaultRating;
    }
  }

}
