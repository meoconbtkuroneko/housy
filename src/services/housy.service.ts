import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { CONSTANT } from './constant.service';
import { AllSelectionsService } from './backend.service';

@Injectable()
export class HousyService {
  allHousyService = {
    allAdvantages: {},
    allAmenities: {},
    allDepositTypes: {},
    allContractTypes: {},
    allRules: {},
    allApartments: {},
    allHomeTypes: {},
    allSpacePositions: {},
    allNeighborhoods: {}
  };

  constructor(
    private allSelectionsService: AllSelectionsService,
  ) {};

  startupServices() {
    this.allSelectionsService.getAllAdvantages()
      .then(res => {
        _.forEach(res.advantages, (val, key) => {
          val.selecting = false;
          val.url = CONSTANT.ICON_PATH + val.url;
        });
        this.allHousyService.allAdvantages = res.advantages;
      });

    this.allSelectionsService.getAllAmenities()
      .then(res => {
        _.forEach(res.amenities, (val, key) => {
          val.selecting = false;
          val.url = CONSTANT.ICON_PATH + val.url;
        });
        this.allHousyService.allAmenities = res.amenities;
      });

    this.allSelectionsService.getAllDepositTypes()
      .then(res => {
        this.allHousyService.allDepositTypes = res.policy_deposit_times;
      });


    this.allSelectionsService.getAllContractTypes()
      .then(res => {
        this.allHousyService.allContractTypes = res.policy_renting_times;
      });

    this.allSelectionsService.getAllRules()
      .then(res => {
        _.forEach(res.limitations, (val, key) => {
          val.selecting = false;
        });
        this.allHousyService.allRules = res.limitations;
      });

    this.allSelectionsService.getAllApartments()
      .then(res => {
        this.allHousyService.allApartments = res.apartments;
      });
    this.allSelectionsService.getAllHomeTypes()
      .then(res => {
        this.allHousyService.allHomeTypes = res.home_types;
      });

    this.allSelectionsService.getAllSpacePositions()
      .then(res => {
        this.allHousyService.allSpacePositions = res.space_positions;
      });

    this.allSelectionsService.getAllNeighborhoods()
      .then(res => {
        this.allHousyService.allNeighborhoods = res.neighborhoods;
      });


    // StaticValueService.getAll();
  }
}
