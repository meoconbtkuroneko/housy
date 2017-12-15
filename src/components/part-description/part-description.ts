import { Component, Input } from '@angular/core';
@Component({
  selector: 'part-description',
  templateUrl: './part-description.html'
})
export class PartDescription {
  @Input()
  showData;
  constructor() {}
}
