import { Injectable } from '@angular/core';

import { HousyService } from './housy.service';
import { AnywhereService } from './anywhere.service';


import * as _ from 'lodash';

@Injectable()
export class CommonService {
  constructor(
    private housyService: HousyService,
    private anywhereService: AnywhereService,
  ) {};

  allHousyService = this.housyService.allHousyService;
  allHomeTypes = this.allHousyService.allHomeTypes;
  allAmenities = this.allHousyService.allAmenities;
  allAdvantages = this.allHousyService.allAdvantages;
  allRules = this.allHousyService.allRules;

  // Tra ve mot doi tuong dua vao id
  getById(type, id) {
    id = _.toInteger(id);
    let obj;
    switch (type) {
      case "home_types":
        {
          obj = _.find(this.allHomeTypes, { id: id });
          break;
        }
      case "amenities":
        {
          obj = _.find(this.allAmenities, { id: id });
          break;
        }
      case "advantages":
        {
          obj = _.find(this.allAdvantages, { id: id });
          break;
        }
      case "rules":
        {
          obj = _.find(this.allRules, { id: id });
          break;
        }
    }
    return obj || false;
  }


  // nhan vao mot mang cac id va tra ve mot mang cac doi tuong dua theo id
  idsToObjs(type, idsArr) {
    let result = [];
    if (!_.isArray(idsArr)) {
      idsArr = JSON.parse(idsArr);
    }
    if (idsArr && idsArr.length > 0) {
      for (let i in idsArr) {
        let obj = this.getById(type, idsArr[i]);
        if (obj) {
          result.push(obj);
        }
      }
    }
    return result;
  }

  // nhan vao mot doi tuong va tra ve mang cac doi tuong dua vao ten thuoc tinh
  getCurrentFromObj(type, obj, propertyName) {
    propertyName = propertyName || type;
    if (obj.hasOwnProperty(propertyName)) {
      return this.idsToObjs(type, obj[propertyName]);
    }
    return [];
  }

  getMapPictureUrl(lat, lng) {
    return 'https://maps.googleapis.com/maps/api/staticmap?center=' +
      lat + ',' + lng +
      '&zoom=15&size=380x250&markers=' + lat + ',' + lng;
  }

  setHouseDetail(data) {
    let result = _.clone(data);
    let readMore;
    console.log("rrrrrrrrrrrrrrrrrrrrr", data);

    // chuyen tu  json sang mang
    result.space_amenities =
      JSON.parse(result.space_amenities);
    result.space_advantages =
      JSON.parse(result.space_advantages);
    result.space_limitations =
      JSON.parse(result.space_limitations);

    result.currentAmenities = this.getCurrentFromObj('amenities', result, 'space_amenities');
    result.currentAdvantages = this.getCurrentFromObj('advantages', result, 'space_advantages');
    result.currentRules = this.getCurrentFromObj('rules', result, 'space_limitations');

    let maxAdvance = 5;

    let someAdvances = result.currentAmenities;
    while (someAdvances.length > maxAdvance) {
      someAdvances.splice(someAdvances.length - 1);
    }

    let i = 0;
    while (someAdvances.length < maxAdvance) {
      if (!result.currentAdvantages[i]) {
        break;
      }
      someAdvances.push(result.currentAdvantages[i]);
      i++;
    }

    result.someAdvances = someAdvances;

    if (result.currentRules) {
      if (result.currentRules.length > 2) {
        result.shortCurrentRules = result.currentRules.slice(0, 2);
      } else {
        result.shortCurrentRules = result.currentRules;
      }
    }

    result.mapUrl = this.getMapPictureUrl(
      result.latitude,
      result.longitude
    );

    return {
      detail: result,
      readMoreDes: readMore
    }
  }

  setApartmentDetail(data) {
    let readMore;
    let result = _.clone(data);

    result.mapUrl = this.getMapPictureUrl(
      result.latitude,
      result.longitude
    );
    return {
      detail: result,
      readMoreDes: readMore
    }
  }
}
