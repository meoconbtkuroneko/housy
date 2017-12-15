import { Injectable } from '@angular/core';

import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';

@Injectable()
export class GetService {
  constructor(
    private anywhereService: AnywhereService
  ) {}

  // lay thong tin chi tiet ve house, apartment, neighborhood, user
  getDetail(type, id, params ? ) {
    let path = CONSTANT.SERVER.APIS.GET_DETAIL(type, id);
    return this.anywhereService.makeRequest(path, params);
  }

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

  // getDiscount(location, page ? ) {
  getDiscount(params) {
    let sendData: any = {
      center_lat: params.location.lat(),
      center_lng: params.location.lng(),
      all: true,
      discount: true
    }

    if (params.page) {
      sendData.page = params.page;
    }

    let path = CONSTANT.SERVER.APIS.ALLHOUSE;
    return this.anywhereService.makeRequest(path, sendData);
  };

  // hien thi cac can nha duoc danh dau theo trang
  listFavoritesByUser(params ? ) {
    return this.anywhereService.makeRequest(CONSTANT.SERVER.APIS.FAVORITE, params);
  }

  // thong tin cua user dang dang nhap
  getProfile() {
    let userId = this.anywhereService.USER.userInfo.id;
    let path = CONSTANT.SERVER.APIS.PROFILE(userId);
    return this.anywhereService.makeRequest(path, null);
  }

  // thong tin cua mot nguoi nao do theo hostId
  getHostProfile(hostId: number) {
    return this.getComments('users', hostId);
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
    let path = CONSTANT.SERVER.APIS.HOUSE_DETAIL(rentingId);
    // let path = "listings/" + rentingId + '.json';
    return this.anywhereService.makeRequest(path, null);
  };

  // thong tin cua chung cu theo id
  getApartmentDetail(id: number) {
    let path = CONSTANT.SERVER.APIS.APARTMENT_DETAIL(id);
    return this.anywhereService.makeRequest(path, null);
  };

  // danh sach cac bai nhan xet cua mot chung cu theo id va trang
  getListReview(params ? ) {
    let id = params.id;
    let type = params.type;
    let path = CONSTANT.SERVER.APIS.DOWNLOAD_LIST_REVIEW(type, id);
    return this.anywhereService.makeRequest(path, params);
  };

  //  5 tim kiem gan day cua nguoi dung
  //  type: loai tim kiem: CONSTANT.RECENT_SEARCH_TYPE
  getRecentSearch(params ? ) {
    let path = CONSTANT.SERVER.APIS.RECENT_SEARCH;
    return this.anywhereService.makeRequest(path, params);
  };

  // tat ca cac thong bao cua user dang dang nhap
  listAllNotifications() {
    let path = CONSTANT.SERVER.APIS.NOTIFICATION;
    return this.anywhereService.makeRequest(path, null);
  };

  // thong tin cua khu dan cu theo id
  getNeighborhoodDetail(id: number) {
    let path = CONSTANT.SERVER.APIS.NEIGHBORHOOD_DETAIL(id);
    return this.anywhereService.makeRequest(path, null)
  }

  getHousesOf(params ? ) {
    let path = CONSTANT.SERVER.APIS.GET_HOUSE_OF(params.type, params.id);
    return this.anywhereService.makeRequest(path, params)
  }

  listHostTop() {
    let path = CONSTANT.SERVER.APIS.HOST_TOP;
    return this.anywhereService.makeRequest(path, null);
  };

  // type: listing, neighborhoods, apartments
  getComments(type: string, id: number) {
    let path = CONSTANT.SERVER.APIS.GET_COMMENT(type, id);
    return this.anywhereService.makeRequest(path, null);
  }

  getTransactions() {
    let path = CONSTANT.SERVER.APIS.TRANSACTION;
    return this.anywhereService.makeRequest(path, null);
  }

  // hien thi cac can nha cua chu nha hien tai theo trang
  // params.status: trang thai cua loai nha muon lay: CONSTANT.TYPE_STATUS
  listAllHousesByUser(params) {
    params.page = params.page || 1;
    let path = CONSTANT.SERVER.APIS.ALLHOUSE_OWNER;
    return this.anywhereService.makeRequest(path, params);
  };
}
