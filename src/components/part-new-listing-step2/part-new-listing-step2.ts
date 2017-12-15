import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { HousyService } from '../../providers/housy.service'
import { FormService } from '../../providers/form.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { CONSTANT } from '../../providers/constant.service';
import { NewListingService } from '../../providers/new-listing.service';

import * as _ from 'lodash';

@Component({
  selector: "part-new-listing-step2",
  templateUrl: "./part-new-listing-step2.html"
})
export class PartNewListingStep2 {
  constructor(
    private anywhereService: AnywhereService,
    private housyService: HousyService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private newListingService: NewListingService,
  ) {}

  @Output()
  getNewListingForm = new EventEmitter();

  private newListingForm: FormGroup;
  rentersArr: any;
  bathroomsArr: any;
  bedRoomsArr: any;
  floorsArr: any;
  contractTypesArr: any;
  depositeTypesArr: any;

  stringCancel = CONSTANT.STRING_CANCEL;
  stringOk = CONSTANT.STRING_SELECT;

  placeholder = {
    area: CONSTANT.INFO.AREA,
    width: CONSTANT.INFO.WIDTH,
    height: CONSTANT.INFO.HEIGHT,
    price: CONSTANT.INFO.PRICE,
  }

  canSend;
  showData;

  formValidation = CONSTANT.FORM_VALIDATION;

  ionViewCanEnter() {
    this.anywhereService.toggleTabs('hide');
  };

  ngOnInit() {
    console.log("ngOnInit")
    this.initVals();
    this.buildForm();
  }

  buildForm() {
    this.newListingForm = this.formBuilder.group({
      max_renters: [this.showData.max_renters || this.rentersArr[9].id],
      number_of_bedroom: [this.showData.number_of_bedroom || this.bedRoomsArr[1].id],
      number_of_bathroom: [this.showData.number_of_bathroom || this.bathroomsArr[1].id],
      floor: [this.showData.floor || this.floorsArr[1].id],
      area: [this.showData.area || 0,
        Validators.compose([
          Validators.required,
          this.formService.minAreaValue
        ])
      ],
      // height: [this.showData.height || 0,
      //   this.formService.minHeightValue
      // ],
      // width: [this.showData.width || 0,
      //   this.formService.minWidthValue
      // ],
      renting_fee: [(this.showData.renting && this.showData.renting.renting_fee) ||
        this.showData.renting_fee || 0,
        Validators.compose([
          Validators.required,
          this.formService.minPriceValue
        ])
      ],
      policy_renting_time_id: [this.showData.policy_renting_time_id || this.showData.policy_renting_time_id],
      policy_deposit_time_id: [this.showData.policy_deposit_time_id || this.showData.policy_deposit_time_id],
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

  initVals() {
    this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
    console.log("this.showData 22222222", this.showData)
    this.rentersArr = _.cloneDeep(this.housyService.HOUSY_DATA.maxRenters);
    this.bedRoomsArr = _.cloneDeep(this.housyService.HOUSY_DATA.allBedrooms);
    this.bathroomsArr = _.cloneDeep(this.housyService.HOUSY_DATA.allBathrooms);
    this.floorsArr = _.cloneDeep(this.housyService.HOUSY_DATA.maxFloors);
    this.contractTypesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE]);
    this.depositeTypesArr = _.cloneDeep(this.housyService.HOUSY_DATA[CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME]);
  }

  showPrompt(e, type) {
    let currentType = type.toLowerCase();
    console.log("typeeeeeeeeeeeeeeeeee", type);
    let initVal = this.newListingForm.value[currentType];
    this.anywhereService.showPrompt(type, initVal, data => {
      this.handleShowPrompt(type, data);
    })
  }

  handleShowPrompt(type, data) {
    let currentType = type.toLowerCase();
    let tempFormVals = _.cloneDeep(this.newListingForm.value);
    tempFormVals[currentType] = data;
    this.newListingForm.setValue(tempFormVals);
    console.log("dataaaaaaaaaaaaaaaaa", data, this.newListingForm);
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
}
