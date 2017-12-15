import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Validators,
  FormBuilder,
} from '@angular/forms';

import { FormService } from '../../providers/form.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { NewListingService } from '../../providers/new-listing.service';


import * as _ from 'lodash';

@Component({
  selector: "part-new-listing-title-description",
  templateUrl: "./part-new-listing-title-description.html"
})
export class PartNewListingTitleDescription {
  constructor(
    private anywhereService: AnywhereService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private newListingService: NewListingService,
  ) {}

  @Output()
  getNewListingForm = new EventEmitter();

  newListingForm;

  title: any;
  description: any;

  canSend;
  showData;

  formValidation = CONSTANT.FORM_VALIDATION;

  currentVals: any;

  ngOnInit() {
    this.initVals();
    this.buildForm();
  }

  buildForm() {
    this.newListingForm = this.formBuilder.group({
      title: [this.showData.title || '', [
        Validators.required,
        this.formService.minTitleValue,
      ]],

      description: [this.showData.description || '', [
        Validators.required,
        this.formService.minDescriptionValue,
      ]],
    })

    this.newListingForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data)
      });

    this.onValueChanged();
  }

  onValueChanged(data ? ) {
    this.checkCanSend();
    this.broadcastValue();
  }

  checkCanSend() {
    if (this.newListingForm &&
      this.newListingForm.valid) {
      this.canSend = true;
    } else {
      this.canSend = false;
    }
  }

  broadcastValue() {
    this.getNewListingForm.emit({
      form: this.newListingForm,
      canSend: this.canSend
    });
  }

  initVals() {
    this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
    // console.log("this.showData 333333333", this.showData);
  }
}
