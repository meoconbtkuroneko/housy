import { Injectable } from '@angular/core';

import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';

@Injectable()
export class GetService {
  constructor(
    private anywhereService: AnywhereService
  ) {}

  // liet ke tat ca cac can nha da duoc duyet theo trang, 
  // moi trang 5 can nha
  listAllHouses(moreParams ? ) {
    let path = CONSTANT.SERVER.APIS.ALLHOUSE;
    let params = { page: 1 };
    if (moreParams) {
      for (let i in moreParams) {
        params[i] = moreParams[i];
      }
    };
    return this.anywhereService.makeRequest(path, params);
  };

  listAllHousesAroundLocation(params ? ) {
    let path = CONSTANT.SERVER.APIS.SEARCH;
    // console.log("paramsparamsparamsparams", params);
    return this.anywhereService.makeRequest(path, params);
  };

  getDiscount(location, page ? ) {
    let params: any = {
      center_lat: location.lat(),
      center_lng: location.lng(),
      all: true,
      discount: true
    }

    if (page) {
      params.page = page;
    }

    let path = CONSTANT.SERVER.APIS.ALLHOUSE;
    return this.anywhereService.makeRequest(path, params);
  };

  // hien thi cac can nha duoc danh dau theo trang
  listFavoritesByUser(params ? ) {
    return this.anywhereService.makeRequest(CONSTANT.SERVER.APIS.FAVORITE, params);
  }

  // thong tin cua user dang dang nhap
  // getProfile() {
  //   let userId = $userStorage.userInfo().id;
  //   let path = "users/" + userId + ".json";
  //   return this.anywhereService.makeRequest(path, null);
  // }

  // thong tin cua mot nguoi nao do theo hostId
  getHostProfile(hostId) {
    let path = "users/" + hostId + "/comments.json";
    return this.anywhereService.makeRequest(path, null);
  }

  listAllApartments(moreParams ? ) {
    let path = CONSTANT.SERVER.APIS.APARTMENTS;
    let params = { page: 1 };
    if (moreParams) {
      for (let i in moreParams) {
        params[i] = moreParams[i];
      }
    };
    return this.anywhereService.makeRequest(path, params);
  };

  // thong tin chi tiet cua mot can nha theo rentingId
  getHouseDetail(rentingId: number) {
    let path = "listings/" + rentingId + '.json';
    return this.anywhereService.makeRequest(path, null);
  };

  // thong tin cua chung cu theo id
  getApartmentDetail(id: number) {
    let path = "apartments/" + id + '.json';
    return this.anywhereService.makeRequest(path, null);
  };

  // danh sach cac bai nhan xet cua mot chung cu theo id va trang
  getListReview(type, id, params ? ) {
    let path = type + '/' + id + "/reviews.json";
    return this.anywhereService.makeRequest(path, params);
  };

  //  5 tim kiem gan day cua nguoi dung
  //  type: loai tim kiem: CONSTANT.RECENT_SEARCH_TYPE
  getRecentSearch(params ? ) {
    return this.anywhereService.makeRequest(CONSTANT.SERVER.APIS.RECENT_SEARCH, params);
  };

  // tat ca cac thong bao cua user dang dang nhap
  listAllNotifications() {
    return this.anywhereService.makeRequest(CONSTANT.SERVER.APIS.NOTIFICATION, null);
  };

  // thong tin cua khu dan cu theo id
  getNeighborhoodDetail(id) {
    let path = 'neighborhoods/' + id + ".json";
    return this.anywhereService.makeRequest(path, null)
  }

  getHousesOf(type, id, params ? ) {
    let path = type + '/' + id + "/listings.json";
    return this.anywhereService.makeRequest(path, params)
  }

  listHostTop() {
    return this.anywhereService.makeRequest(CONSTANT.SERVER.APIS.HOST_TOP, null);
  };

  // type: listing, neighborhoods, apartments
  getComments(type, id) {
    let path = type + '/' + id + "/comments.json";
    return this.anywhereService.makeRequest(path, null);
  }

  getTransactions() {
    let path = CONSTANT.SERVER.APIS.TRANSACTION;
    return this.anywhereService.makeRequest(path, null);
  }
}
