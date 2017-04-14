import { Component, Input } from '@angular/core';
@Component({
  selector: 'part-count',
  templateUrl: './part-count.html'
})
export class PartCount {
  @Input()
  showData;
  constructor() {}
}
