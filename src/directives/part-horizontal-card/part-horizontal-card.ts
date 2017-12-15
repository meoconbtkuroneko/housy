import { Component, Input } from '@angular/core';
@Component({
  selector: 'part-horizontal-card',
  templateUrl: './part-horizontal-card.html'
})
export class PartHorizontalCard {
  @Input()
  listHouses;
  @Input()
  title;
  constructor() {}
}
