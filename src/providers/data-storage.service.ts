import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Events } from 'ionic-angular';

import { UserStorageService } from '../providers/user-storage.service';
import { CONSTANT } from '../providers/constant.service';

@Injectable()
export class DataStorageService {
  constructor(private storage: Storage,
    private UserStorageService: UserStorageService,
    private events: Events) {
    console.log("DataStorageService runnnnnnnnnn");
    this.toggleSubscribeUser(true);
  }

  // public ALREALDY_DATA = new BehaviorSubject("");
  private dataAction;
  private userCurrentId = -1;
  private localListings;

  toggleSubscribeUser(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED,
        this._handleSubscribeUser
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.USER_STORAGE_CHANGED,
        this._handleSubscribeUser
      );
    }
  }

  private _handleSubscribeUser = (data ? ) => {
    console.log("_handleSubscribeUser DataStorage", data);
    if (data && data.userInfo && this.userCurrentId != data.userInfo.id) {
      this.userCurrentId = data.userInfo.id;
      this.initService()
    }
  }

  private initService() {
    this.storage.get(CONSTANT.NAME_LISTINGS).then((value) => {
      this.localListings = value;
      // console.log("+++++++ this.localListings", this.localListings)
      this.switchUser(this.userCurrentId);
    });
  }

  private switchUser(userId) {
    if (this.localListings == undefined) {
      this.localListings = {};
    }
    let listings = this.localListings[userId + ''];
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> var listings", listings)
    if (!listings) {
      listings = this.resetDraftListingObject();
      this.localListings[userId + ''] = listings;
    }
    if (_.isUndefined(listings.draftApartments))
      listings.draftApartments = [];

    if (_.isUndefined(listings.draftNeighborhoods))
      listings.draftNeighborhoods = [];

    if (_.isUndefined(listings.draftSpaces))
      listings.draftSpaces = [];

    /*queueUploading*/
    if (_.isUndefined(listings.queueUploading)) {
      // console.log("===>>> isUndefined", listings.queueUploading);

      listings.queueUploading = [];
    }

    this.dataAction = listings;
    this.updateLocalData(CONSTANT.BROADCAST.DATA_UPDATE);
    return;
  }

  private resetDraftListingObject() {
    let draftListingObject = {
      draftApartments: [],
      draftNeighborhoods: [],
      draftSpaces: [],
    };
    return draftListingObject;
  }

  private updateLocalData(strs) {
    // this.ALREALDY_DATA.next(strs);
    this.events.publish(CONSTANT.EVENTS_NAME.DATA_STORAGE_CHANGED, strs);
  }

  public removeDraft(type, index) {
    this.getDraft(type).splice(index, 1);
    this.saveUserData(this.userCurrentId);
  }

  public getDraft(type) {
    if (!this.UserStorageService.USER.logined) {
      return false;
    }
    let typeName = this.getDraftName(type);
    return this.dataAction[typeName];
  }

  private getDraftName(type) {
    return 'draft' + type.charAt(0).toUpperCase() + type.toLowerCase().slice(1);
  }

  // Update và lưu vào mảng đã tồn tại
  // Lưu dữ liệu draft mới
  /*
  type: loại neighborhoods hoặc apartments hoặc spaces
  dataAction = {
    [draftListingObject.draftApartments],
    [draftListingObject.draftResidentialArea], 
    [draftListingObject.draftSpaces]
  }
  */
  public saveDraft(type, value, index) {
    this.setDraft(type, value, index);
    // this.LOCAL_DRAFT.next(CONSTANT.BROADCAST.DATA_HAVED_STORAGE);
    let rsSaveUpdate = this.saveUserData(this.userCurrentId);
    return rsSaveUpdate;
  }

  private setDraft(type, obj, index) {
    if (!this.UserStorageService.USER.logined) {
      return false;
    }
    var rsSetDraft = false;
    let typeName = this.getDraftName(type);
    if (index == -1) {
      this.dataAction[typeName].unshift(obj);
      rsSetDraft = true;
    } else {
      this.dataAction[typeName][index] = obj;
      rsSetDraft = true;
    }
    this.saveUserData(this.userCurrentId);
    return rsSetDraft;
  }

  private saveUserData(userId) {
    return this.saveDataToStorage(userId, this.dataAction);
  }

  private saveDataToStorage(id, obj) {
    return this.storage.get(CONSTANT.NAME_LISTINGS).then(savedData => {
      if (!savedData) {
        savedData = {};
      }
      savedData[id] = obj;
      this.storage.set(CONSTANT.NAME_LISTINGS, savedData);
      return true;
    });
  }

  /*Set Get and Remove   QueueUploading*/
  /*
    setNewItemQueueUploading Upload Pictures to server:
    - idUpload: id cua apartment, neighborhood, hoac house của hình cần upload
    - type: apartment, neighborhoods, hoac house
      + Type_Apartments: 3
      + TYPE_NEIGHBORHOOD: 4
    - arrayImage: mảng Url file hình upload
    - data: info của object cần upload
  */
  public setNewItemQueueUploading(idUpload, type, arrayImage, data) {
    if (!this.UserStorageService.USER.logined) {
      return false;
    }
    if (arrayImage.length > 0) {
      let objTmp = {
        id: null,
        imgs_upload: null,
        data_upload: null,
        type: null,
        status: null,
      };
      objTmp.id = idUpload;
      objTmp.type = type;
      objTmp.imgs_upload = _.clone(arrayImage);
      objTmp.data_upload = _.clone(data);
      objTmp.status = CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_NEW;

      this.dataAction.queueUploading.push(objTmp);
      this.events.publish('setNewItemQueueUploading', this.dataAction.queueUploading);
      this.saveUserData(this.userCurrentId);
      console.log(">>>>>>>>>>>>>>>>>>>> setNewItem Queue queueUploading:", this.dataAction.queueUploading)
    }
  }

  public addErrImageQueueUploading(id, type, urlImg) {
    var objSetErrImage = this.getItemQueueUploadingByIdAndType(id, type);
    if (!objSetErrImage) {
      return;
    }
    if (!objSetErrImage.imgs_upload_err) {
      objSetErrImage.imgs_upload_err = [];
    }
    objSetErrImage.imgs_upload_err.push(urlImg);
    // le ra la can gan lai dataAction ne, nhung dua vao tinh chat obj nen chua can lam
    this.saveUserData(this.userCurrentId);
  }

  public getItemQueueUploadingByIdAndType(id, type) {
    if (!this.UserStorageService.USER.logined) {
      return false;
    }
    let objGetTmp;
    // console.log("getItemQueueUploadingByIdAndType this.dataAction.queueUploading", this.dataAction.queueUploading);
    for (let i = 0; i < this.dataAction.queueUploading.length; i++) {
      objGetTmp = this.dataAction.queueUploading[i];
      // console.log("objGetTmpobjGetTmpobjGetTmp", objGetTmp);
      if (objGetTmp.type == type && objGetTmp.id == id) {
        return objGetTmp;
      }
    }
  }

  /********************************
   * Uploading Status:
            - 1: failed
              0: uploading
              1: success
              2: pause
  / *********************************/

  public setStatusUploading(id, type, status) {
    // console.log(">>>>>>>>>>>>>>>>>>>> trước khi đổi:", this.dataAction.queueUploading)
    var objSetStatus = this.getItemQueueUploadingByIdAndType(id, type);
    if (!objSetStatus) {
      return;
    }
    objSetStatus.status = status;
    this.saveUserData(this.userCurrentId);
    // $rootScope.$broadcast("setStatusUploading", { idSetStatus: id, status: status });
  }

  public getQueueUploading() {
    if (!this.UserStorageService.USER.logined) {
      return false;
    }
    return this.dataAction.queueUploading;
  }

  public getItemQueueUploading(index) {
    if (!this.UserStorageService.USER.logined) {
      return false;
    }
    return (index >= 0 && index < this.dataAction.queueUploading.length ?
      this.dataAction.queueUploading[index] :
      undefined);
  }

  public getItemQueueUploadingById(id) {
    var objGet;
    if (!this.UserStorageService.USER.logined) {
      return false;
    }

    for (var i = 0; i < this.dataAction.queueUploading.length; i++) {
      objGet = this.dataAction.queueUploading[i];
      if (objGet.id == id) {
        return objGet;
      }
    }
  }

  public removeItemQueueUploadingByIdAndType(id, type, moreInfo, resultUpload) {
    if (!this.UserStorageService.USER.logined) {
      return false;
    }
    let objRemove = this.getItemQueueUploadingByIdAndType(id, type);
    if (objRemove) {
      let indexRemove = this.dataAction.queueUploading.indexOf(objRemove);
      this.dataAction.queueUploading.splice(indexRemove, 1);
    }
    this.saveUserData(this.userCurrentId);
    this.events.publish("removeItemQueueUploading", {
      idUploadDone: id,
      type: type,
      moreInfo: moreInfo,
      resultUpload: resultUpload
    });
  }

  public removeImageFromQueueUploading(id, type, urlRemove) {
    if (!this.UserStorageService.USER.logined) {
      return false;
    }
    let objRemoveImage = this.getItemQueueUploadingByIdAndType(id, type);
    if (!objRemoveImage) {
      return;
    }
    let index = objRemoveImage.imgs_upload.indexOf(urlRemove);
    objRemoveImage.imgs_upload.splice(index, 1);
    console.log("Xóa hình khi up xong 1 tấm", this.dataAction)
    this.saveUserData(this.userCurrentId);
  };

  ngOnDestroy() {
    this.toggleSubscribeUser(false);
  }

  // public LOCAL_DRAFT = new BehaviorSubject("");
  // private currentLatLng;

  // private listCities = [
  //   { "id": 1, "name": "Hồ Chí Minh" },
  //   { "id": 2, "name": "Hà Nội" }
  // ];
  // private listDistricts = [
  //   { "id": 1, "name": "Quận 1" },
  //   { "id": 2, "name": "Quận 2" },
  //   { "id": 3, "name": "Quận 3" },
  //   { "id": 4, "name": "Quận 4" },
  //   { "id": 5, "name": "Quận 5" },
  //   { "id": 6, "name": "Quận 6" },
  //   { "id": 7, "name": "Quận 7" },
  //   { "id": 8, "name": "Quận 8" },
  //   { "id": 9, "name": "Quận 9" },
  //   { "id": 10, "name": "Quận 10" },
  //   { "id": 11, "name": "Quận 11" },
  //   { "id": 12, "name": "Quận 12" },
  //   { "id": 13, "name": "Thủ Đức" },
  //   { "id": 14, "name": "Gò Vấp" },
  //   { "id": 15, "name": "Bình Thạnh" },
  //   { "id": 16, "name": "Tân Bình" },
  //   { "id": 17, "name": "Tân Phú" },
  //   { "id": 18, "name": "Phú Nhuận" },
  //   { "id": 19, "name": "Bình Tân" },
  //   { "id": 20, "name": "Củ Chi" },
  //   { "id": 21, "name": "Hóc Môn" },
  //   { "id": 22, "name": "Bình Chánh" },
  //   { "id": 23, "name": "Nhà Bè" },
  //   { "id": 24, "name": "Cần Giờ" }
  // ];
  // public saveNewDraft(typeSave, value) {
  //   if (!this.UserStorageService.USER.logined) {
  //     return false;
  //   }
  //   this.setDraft(typeSave , value, -1);
  //   let rsSaveNew = this.saveUserData(this.userCurrentId);
  // this.LOCAL_DRAFT.next(CONSTANT.BROADCAST.DATA_HAVED_STORAGE);
  //   return rsSaveNew;
  // }



  /*=========================setCurrentPosition===========================*/

  // public setCurrentPositionLatLng(currentLat, currentLng) {
  //   this.currentLatLng.currentLat = currentLat;
  //   this.currentLatLng.currentLng = currentLng;
  //   // $rootScope.$broadcast("setCurrentPositionLatLng");
  // }

  // public getCurrentPositionLatLng() {
  //   return this.currentLatLng;
  // }

  /*=========================Bookmark House===========================*/
  // public setItemApartmentBookmark(idApartment, objBookmark) {
  //   if (!this.UserStorageService.USER.logined) {
  //     return false;
  //   }
  //   this.dataAction.listApartmentsBookmark[idApartment] = objBookmark;
  //   this.saveUserData(this.userCurrentId);
  //   return true;
  // }

  // public getListApartmentsBookmark() {
  //   if (!this.UserStorageService.USER.logined) {
  //     return false;
  //   }
  //   return this.dataAction.listApartmentsBookmark;
  // }

  // public getApartmentBookmarkById(id) {
  //   if (!this.UserStorageService.USER.logined) {
  //     return false;
  //   }
  //   return this.dataAction.listApartmentsBookmark[id];
  // }

  // public removeApartmentBookmarkById(id) {
  //   if (!this.UserStorageService.USER.logined) {
  //     return false;
  //   }
  //   delete this.dataAction.listApartmentsBookmark[id];
  //   this.saveUserData(this.userCurrentId);

  // }

  /*=========================GET LIST Districts ID===========================*/
  // public getListDistricts() {
  //   return this.listDistricts;
  // }

  /*=========================GET LIST Cities ID===========================*/
  // public getListCities() {
  //   return this.listCities;
  // }

  /*=========================GET Districts ID===========================*/
  // public getDistrictId(address_components) {
  //   for (var i = 0; i < address_components.length; i++) {
  //     for (var j = this.listDistricts.length - 1; j >= 0; j--) {
  //       if (this.listDistricts[j].name === address_components[i].long_name) {
  //         return this.listDistricts[j].id;
  //       }
  //     }
  //   }
  //   return -1;
  // }

  /*=========================GET City ID===========================*/
  // public getCityId(address_components) {
  //   for (var i = 0; i < address_components.length; i++) {
  //     for (var j = this.listCities.length - 1; j >= 0; j--) {
  //       if (this.listCities[j].name === address_components[i].long_name) {
  //         return this.listCities[j].id;
  //       }
  //     }
  //   }
  //   return -1;
  // }

  /*==================Recents search with name and avatar=============*/

  // public setRecentsSearch(address, avatar, lat, lng) {
  //   var newRecentsSearch = {
  //     address: address,
  //     image: avatar,
  //     lat: lat,
  //     lng: lng
  //   }
  //   for (var i = 0; i < this.dataAction.recentsSearch.length; i++) {
  //     if (this.dataAction.recentsSearch[i].lat == lat && this.dataAction.recentsSearch[i].lng == lng) {
  //       this.dataAction.recentsSearch.splice(i, 1);
  //     }
  //   }
  //   this.dataAction.recentsSearch.unshift(newRecentsSearch);
  //   if (this.dataAction.recentsSearch.length > CONSTANT.SERVER.VARIABLE.MAX_RECENT_SEARCH) {
  //     this.dataAction.recentsSearch.splice(CONSTANT.SERVER.VARIABLE.MAX_RECENT_SEARCH, 1);
  //   }
  //   this.saveUserData(this.userCurrentId);
  // }

  // public getListRecentsSearch() {
  //   return this.dataAction.recentsSearch;
  // }



  /*=========================END Bookmark House===========================*/

  /*--------------------------SUBSCRIBE---------------------*/
  /*====>>>>> Sẽ chuyển sang subscribe từ Loginservice <<<<<====*/
  /*
  $rootScope.$on('userLoginSuccessful', function(e, userId) {
    dataAction = switchUser(userId.userId);
    userCurrentId = userId.userId;
    if ($ionicHistory.currentStateName() === 'auth.walkthrough') {
      $timeout(function() {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }, 500);
    }

  });

  $rootScope.$on('userLogoutSuccessful', function() {
    dataAction = switchUser(-1);
    userCurrentId = -1;
    $rootScope.idRecentWatched = [];
    $rootScope.apartmentsRecentlyWatched = undefined;
  });
  */
}
