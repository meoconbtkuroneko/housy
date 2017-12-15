import {
  Component,
} from '@angular/core';

import { Platform } from 'ionic-angular';

@Component({
  selector: "button-close-modal",
  templateUrl: "./button-close-modal.html"
})
export class ButtonCloseModal {
  constructor(
    public platform: Platform,
  ) {}
}
