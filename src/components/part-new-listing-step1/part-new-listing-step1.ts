import {
  Component,
  Output,
  EventEmitter
}
from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { HousyService } from '../../providers/housy.service'
import { AllSelectionsService } from '../../providers/backend.service';
import { CONSTANT } from '../../providers/constant.service';
import { NewListingService } from '../../providers/new-listing.service';
import { HistorySearch } from '../../templates/history-search';

import { Events } from 'ionic-angular';

import * as _ from 'lodash';

@Component({
  selector: "part-new-listing-step1",
  templateUrl: "./part-new-listing-step1.html"
})
export class PartNewListingStep1 {
  constructor(
    private housyService: HousyService,
    private formBuilder: FormBuilder,
    private allSelectionsService: AllSelectionsService,
    private newListingService: NewListingService,
    private events: Events,
  ) {
    this.toggleSubscribeSelectAddress(true);
  }

  @Output()
  getNewListingForm = new EventEmitter();

  private newListingForm: FormGroup;
  homeTypesArr: any;
  positionsArr: any;
  neighborhoodsArr: any;
  apartmentsArr: any;

  stringCancel = CONSTANT.STRING_CANCEL;
  stringOk = CONSTANT.STRING_SELECT;

  canSend;
  showData;
  addressObj: HistorySearch;

  ngOnInit() {
    this.initVals();
    this.buildForm();
  }

  buildForm() {
    this.newListingForm = this.formBuilder.group({
      home_type_id: [this.showData.home_type_id || this.homeTypesArr[1].id,
        Validators.required,
      ],
      space_position_id: [this.showData.space_position_id || this.positionsArr[0].id, [
        Validators.required,
      ]],
      neighborhood_id: [this.showData.neighborhood_id || 0],
      apartment_id: [this.showData.apartment_id || 0],
      address: [this.showData.address, Validators.required, ],
      latitude: [this.showData.latitude, Validators.required, ],
      longitude: [this.showData.longitude, Validators.required, ]
    })

    console.log("00000000000000000", this.newListingForm.value);

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
    this.homeTypesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES]);
    this.positionsArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS]);
    this.allSelectionsService.getAllNeighborhoods()
      .then((res: any) => {
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          this.neighborhoodsArr = res[CONSTANT.SERVER.TYPE_QUERY.NEIGHBORHOODS];
        }
      });

    this.allSelectionsService.getAllApartments()
      .then((res: any) => {
        if (res.reason === CONSTANT.REASONS.ER_OK) {
          this.apartmentsArr = res[CONSTANT.SERVER.TYPE_QUERY.APARTMENTS];
        }
      });

    if (this.showData.address &&
      this.showData.latitude &&
      this.showData.longitude) {
      this.addressObj = new HistorySearch(
        this.showData.address,
        this.showData.latitude,
        this.showData.longitude,
      );
    }
  }

  toggleSubscribeSelectAddress(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.SELECT_ADDRESS,
        this._handleSubscribeSelectAddress
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.SELECT_ADDRESS,
        this._handleSubscribeSelectAddress
      );
    }
  }

  private _handleSubscribeSelectAddress = (res) => {
    console.log("_handleSubscribeSelectAddress", res);
    this.addressObj = res;
    let tempVals = _.cloneDeep(this.newListingForm.value);
    tempVals.address = this.addressObj.name;
    tempVals.latitude = this.addressObj.location.lat;
    tempVals.longitude = this.addressObj.location.lng;
    this.newListingForm.setValue(tempVals);
    console.log("this.newListingForm", this.newListingForm);
    this.broadcastValue();
  }

  ngOnDestroy() {
    this.toggleSubscribeSelectAddress(false);
  }
}
