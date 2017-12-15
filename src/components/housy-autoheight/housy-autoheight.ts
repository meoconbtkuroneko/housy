import {
  ElementRef,
  Directive,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[housyAutoheight]'
})
export class HousyAutoheight {

  constructor(
    public elementRef: ElementRef
  ) {}

  @Input()
  maxLetter: number

  el;

  @HostListener('input') onInput() {
    this.startResize();
  }

  private startResize() {
    if (this.el) {
      this.checkMaxLetter();
      this.doResize();
    }
  }

  private checkMaxLetter() {
    let countletter: number;
    let val: string = this.el.value;
    val = val ? val.trim() : '';
    countletter = val ? val.length : 0;
    if (this.maxLetter && countletter > this.maxLetter) {
      val = val.substr(0, this.maxLetter);
      this.el.value = val;
    }
  }

  private doResize() {
    this.el.style.height = 'auto';
    this.el.style.height = this.el.scrollHeight + "px";
  }

  ngAfterViewInit() {
    this.el = this.elementRef.nativeElement;
    let initHeight = Math.max(this.el.scrollHeight, 60);
    if (this.el) {
      this.el.style.height = initHeight + "px";
    }
  }
}
