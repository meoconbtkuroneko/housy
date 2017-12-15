import { Injectable } from '@angular/core';

import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';

@Injectable()
export class AllSelectionsService {
  constructor(
    private anywhereService: AnywhereService
  ) {}

  getAllAdvantages() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.ADVANTAGES
    };
    return this.anywhereService.makeRequest(path, params);
  };

  getAllAmenities() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.AMENITIES
    };
    return this.anywhereService.makeRequest(path, params);
  };

  getAllDepositTypes() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.POLICY_DEPOSIT_TIME
    };
    return this.anywhereService.makeRequest(path, params);
  };

  getAllContractTypes() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.POLICY_CONTRACT_TYPE
    };
    return this.anywhereService.makeRequest(path, params);
  };

  getAllRules() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.RULES
    };
    return this.anywhereService.makeRequest(path, params);
  };

  getAllApartments() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.APARTMENTS
    };
    return this.anywhereService.makeRequest(path, params);
  };

  getAllHomeTypes() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.HOME_TYPES
    };
    return this.anywhereService.makeRequest(path, params);
  };

  getAllSpacePositions() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.SPACE_POSITIONS
    };
    return this.anywhereService.makeRequest(path, params);
  };

  getAllNeighborhoods() {
    let path = CONSTANT.SERVER.APIS.QUERY
    let params = {
      cat: CONSTANT.SERVER.TYPE_QUERY.NEIGHBORHOODS
    };
    return this.anywhereService.makeRequest(path, params);
  };
}
