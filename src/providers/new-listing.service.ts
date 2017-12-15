import {
  Injectable,
} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CurrentItemService } from './current-item.service';
import { DataStorageService } from './data-storage.service';
import { AnywhereService } from './anywhere.service';

import * as _ from 'lodash';

import { PostService } from './post.service';
import { PutService } from './put.service';
import { CONSTANT } from './constant.service';

@Injectable()
export class NewListingService {

  NEW_LISTING_DATA: any;
  private NEW_LISTING_DATA_SUBSCRIBE = new BehaviorSubject(this.NEW_LISTING_DATA || {});
  key: string = 'NEW_LISTING';

  rentingId;
  rentingStatus;
  finishUploadImages: boolean;
  finishUpdateData: boolean;

  constructor(
    private storage: Storage,
    private postService: PostService,
    private currentItemService: CurrentItemService,
    private events: Events,
    private dataStorageService: DataStorageService,
    private putService: PutService,
    private anywhereService: AnywhereService,
  ) {
    this.subscribeNewListingData();
  }

  subscribeNewListingData(callback ? ) {
    this.NEW_LISTING_DATA_SUBSCRIBE.subscribe(res => {
      this.NEW_LISTING_DATA = _.cloneDeep(res);
      this.rentingId = this.NEW_LISTING_DATA &&
        this.NEW_LISTING_DATA.renting &&
        this.NEW_LISTING_DATA.renting.id || undefined;
      this.rentingStatus = this.NEW_LISTING_DATA &&
        this.NEW_LISTING_DATA.renting &&
        this.NEW_LISTING_DATA.renting.renting_status_type_id ||
        this.NEW_LISTING_DATA.renting_status_type_id ||
        CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_DRAFT;
      if (callback) {
        return callback(res);
      }
    })
  };

  unsubscribeNewListingData() {
    this.NEW_LISTING_DATA_SUBSCRIBE.unsubscribe();
  }

  startupServices() {
    this.broadcastNewListingDataChange({});
  }

  
  clearNewListingData() {
    return new Promise(res => {
      this.broadcastNewListingDataChange({});
    })
  }

  broadcastNewListingDataChange(data) {
    this.NEW_LISTING_DATA_SUBSCRIBE.next(data);
  }

  

  // gan flag dang cap nhat
  setUpdatingStatus(val: boolean) {
    this.setNewListingData({
      isUpdating: val
    })
  }

  statusRequest;

  // statusRequest: trang thai nha muon upload len: TYPE_STATUS 
  saveToServer(statusRequest ? ) {
    if (!this.rentingId) {
      return;
    };

    this.setUpdatingStatus(true);
    this.broadcastUpdateChange('isUpdating');

    if (statusRequest ) {
      if(!this.hasImgsUpload()) {
        this.setNewListingData({
          renting_status_type_id: statusRequest
        });
      } else {
        this.statusRequest = statusRequest;
      }
    }
    
    this.uploadNewImages();
    let promises = [this._saveToServer(), this.deleteImages()];

    return Promise.all(promises).then((res: any) => {
      console.log("Luu du lieu hoan tat", res);
      this.finishUpdateData = true;

      if (this.hasImgsUpload() && !this.finishUploadImages) {
        return;
      }

      for (let i in _.reverse(res)) {
        if (!res[i]) {
          continue;
        }
        if (res[i][CONSTANT.DETAIL_TYPE.SPACE]) {
          return this.handleSaveSuccess(res[i]);
        }
        return this.handleSaveSuccess(res[0]);
      }
    }) 
  }

  setNewListingData(data) {
    let tempVal = _.assignIn(this.NEW_LISTING_DATA, data);
    return new Promise(res => {
      this.broadcastNewListingDataChange(tempVal);
    })
  }


  uploadNewImages() {
    if (!this.hasImgsUpload() || !this.rentingId) {
      return;
    }
      this.dataStorageService.setNewItemQueueUploading(
        this.rentingId,
        CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_SPACE,
        this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD],
        null
      );
      this.listenUploadImageSuccess();
  }

  hasImgsUpload() {
    console.log("NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD]", this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD]);
    return this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD] &&
      (this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD].length > 0);
  }

  listenUploadImageSuccess() {
    this.events.subscribe(
      CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES,
      this.handleUploadImageSuccess
    )
  }

  unsubscibeUploadImageSuccess() {
    this.events.unsubscribe(
      CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES,
      this.handleUploadImageSuccess
    )
  }

  private handleUploadImageSuccess = (data: any) => {
    console.log("listenUploadImageSuccess FINISHED_UPLOAD_IMAGES", data);
    let currentUploadObj = data.getCurrentUploadObj();
    console.log("currentUploadObj", currentUploadObj);
    let newImageData: any;
    // truong hop bi loi
    if (currentUploadObj.imgs_upload_err) {
      console.log("co hinh bi loiiiiiiiiiii CHUA BIET LAM SAO", currentUploadObj.imgs_upload_err);
      this.anywhereService.showToast(CONSTANT.UPDATE.UPDATING_IMAGE_ERROR);
    } else {
      let rsUpload = data.getResultUpload();
      console.log("rsUploadrsUpload thanh cong hetssssssssss", rsUpload);
      newImageData = {};
      if (this.statusRequest) {
      this.setNewListingData({
        renting_status_type_id: this.statusRequest
      });
      return this.changeRentingStatus().then(res => {
        this.finishUploadImages = true;
        console.log("changeRentingStatus sau khi up hinh xong", res);
        if (this.finishUpdateData) {
          return this.handleSaveSuccess(res);
        }
        return res;
      })
    }
    }
  }

  changeRentingStatus() {
    let data: any = {};
    data[CONSTANT.KEY_SPACES.RENTING_STATUS] =
      this.NEW_LISTING_DATA[CONSTANT.KEY_SPACES.RENTING_STATUS];
    return this.putService.updateHouseDetail(
      this.rentingId, data
    );
    // .then(res => {
    //     console.log("changeRentingStatus", res);
    //     return this.handleSaveSuccess(res)
    // })
  }

  handleSaveSuccess(res: any) {
    console.log("handleSaveSuccesshandleSaveSuccess", res);
    if (res && res.reason === CONSTANT.REASONS.ER_OK) {
      console.log("hoannnnnnnnnn tatttttttt");
      let val = this.NEW_LISTING_DATA;
      if (res.space) {
        let val = this.prepareDefaultImg(res.space);
        this.setNewListingData(val);
      }
      this.checkFinishAll();

      if (this.rentingId) {
        this.broadcastUpdateChange('isUpdating');
      }

      console.log("this.NEW", this.NEW_LISTING_DATA);

      return val;
    } else {
      return this.handleNotOk();
    }
  }

  prepareDefaultImg(data) {
    let spaceData = _.cloneDeep(data);
    if (spaceData && spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT]) {
      return spaceData
    };
    if (spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES] &&
      spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES].length > 0) {
      let findObj: any = {};
      findObj[CONSTANT.KEY_IMAGES.KEY_IS_DEFAULT] = true;
      let defaultImageObj = _.find(
        spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES],
        findObj
      ) || spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES][0];
      spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT] = defaultImageObj.url;
    } else {
      spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT] =
        CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE;
    }
    return spaceData;
  }

   handleNotOk() {
    console.log("co van de roi nha");
    return false;
  }


  checkFinishAll() {
    let check: boolean;
    if (this.hasImgsUpload()) {
      check = this.finishUploadImages && this.finishUpdateData;
    } else {
      check = this.finishUpdateData;
    }
    console.log("checkFinishAllcheckFinishAll", check);
    if (check) {
      this.setUpdatingStatus(false);
      this.broadcastUpdateChange('isUpdating');
    }
    return check;
  }

  broadcastUpdateChange(statusName ? ) {
    let data: any = {
      type: 'space',
      id: this.NEW_LISTING_DATA.renting.id || this.rentingId,
      data: this.NEW_LISTING_DATA,
    };
    if (statusName) {
      data[statusName] = true;
    }
    this.currentItemService.broadcastChange(data);
  }


  private _saveToServer() {
    if (!this.rentingId) {
      return Promise.resolve(false);
    }
      let sendData = _.cloneDeep(this.NEW_LISTING_DATA);
      delete sendData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES];
      delete sendData.renting;
      return this.putService.updateHouseDetail(
        this.rentingId,
        sendData
      );
      // .then(res => {
      //   console.log("updateHouseDetailupdateHouseDetail", res);
      //   return res;
      // })
  }

   hasImgsDelete() {
    return this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID] &&
      (this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID].length > 0);
  }

  deleteImages() {
    if (!this.hasImgsDelete() || !this.rentingId) {
      return Promise.resolve(false);
    }
      return this.putService.deleteImages(
        this.rentingId,
        this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID]
      );
  }

  // listenUploadImageSuccess() {
  //   this.events.subscribe(CONSTANT.EVENTS_NAME.REMOVE_ITEM_QUEUE_UPLOADING, this.handleUploadImageSuccess)
  // }

  // unsubscibeUploadImageSuccess() {
  //   this.events.unsubscribe(CONSTANT.EVENTS_NAME.REMOVE_ITEM_QUEUE_UPLOADING, this.handleUploadImageSuccess)
  // }

  // private handleUploadImageSuccess = (data: any) => {
  //   this.finishUploadImages = true;
  //   console.log("listenUploadImageSuccess REMOVE_ITEM_QUEUE_UPLOADING", data);
  //   return this.changeRentingStatus().then(res => {
  //     console.log("ket qua cuoi cung 3333333333", res);
  //     if (this.finishUpdateData) {
  //       return this.handleSaveSuccess(res);
  //     }
  //     return res;
  //   })
  // }

  


  

  newHouse() {
    return this.postService.newHouse(this.NEW_LISTING_DATA)
      .then((res: any) => {
        return this.handleSaveSuccess(res);
      })
  }

  
  

 
  ngOnDestroy() {
    this.unsubscibeUploadImageSuccess();
  }
}

// import {
//   Injectable,
// } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { Events } from 'ionic-angular';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import { CurrentItemService } from './current-item.service';
// import { DataStorageService } from './data-storage.service';
// import { AnywhereService } from './anywhere.service';

// import * as _ from 'lodash';

// import { PostService } from './post.service';
// import { PutService } from './put.service';
// import { CONSTANT } from './constant.service';

// @Injectable()
// export class NewListingService {

//   NEW_LISTING_DATA: any;
//   private NEW_LISTING_DATA_SUBSCRIBE = new BehaviorSubject(this.NEW_LISTING_DATA || {});
//   key: string = 'NEW_LISTING';

//   rentingId;
//   rentingStatus;

//   constructor(
//     private storage: Storage,
//     private postService: PostService,
//     private currentItemService: CurrentItemService,
//     private events: Events,
//     private dataStorageService: DataStorageService,
//     private putService: PutService,
//     private anywhereService: AnywhereService,
//   ) {
//     this.subscribeNewListingData();
//   }

//   subscribeNewListingData(callback ? ) {
//     this.NEW_LISTING_DATA_SUBSCRIBE.subscribe(res => {
//       this.NEW_LISTING_DATA = _.cloneDeep(res);
//       this.rentingId = this.NEW_LISTING_DATA &&
//         this.NEW_LISTING_DATA.renting &&
//         this.NEW_LISTING_DATA.renting.id || undefined;
//       this.rentingStatus = this.NEW_LISTING_DATA &&
//         this.NEW_LISTING_DATA.renting &&
//         this.NEW_LISTING_DATA.renting.renting_status_type_id ||
//         this.NEW_LISTING_DATA.renting_status_type_id ||
//         CONSTANT.SERVER.TYPE_STATUS.RENTING_STATUS_DRAFT;
//       if (callback) {
//         return callback(res);
//       }
//     })
//   };

//   unsubscribeNewListingData() {
//     this.NEW_LISTING_DATA_SUBSCRIBE.unsubscribe();
//   }

//   startupServices() {
//     this.broadcastNewListingDataChange({});
//   }

//   clearNewListingData() {
//     return new Promise(res => {
//       this.broadcastNewListingDataChange({});
//     })
//   }

//   broadcastNewListingDataChange(data) {
//     this.NEW_LISTING_DATA_SUBSCRIBE.next(data);
//   }


//   // statusRequest: trang thai nha muon upload len: TYPE_STATUS 
//   saveToServer(statusRequest ? ) {
//     if (!this.rentingId) {
//       return;
//     }

//     if (statusRequest) {
//       this.setNewListingData({
//         renting_status_type_id: statusRequest
//       })
//     }
//     this.setUpdatingStatus(true);
//     this.broadcastUpdateChange('isUpdating');
//     if (this.hasImgsUpload()) {
//       this.uploadNewImages();
//     } else {
//       this.saveDataToServer();
//     }
//   }

//   setNewListingData(data) {
//     let tempVal = _.assignIn(this.NEW_LISTING_DATA, data);
//     return new Promise(res => {
//       this.broadcastNewListingDataChange(tempVal);
//     })
//   }

//   // gan flag dang cap nhat
//   setUpdatingStatus(val: boolean) {
//     this.setNewListingData({
//       isUpdating: val
//     })
//   }

//   broadcastUpdateChange(statusName ? ) {
//     let data: any = {
//       type: 'space',
//       id: this.NEW_LISTING_DATA.renting.id || this.rentingId,
//       data: this.NEW_LISTING_DATA,
//     };
//     if (statusName) {
//       data[statusName] = true;
//     }
//     this.currentItemService.broadcastChange(data);
//   }

//   hasImgsUpload() {
//     console.log("NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD]", this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD]);
//     return this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD] &&
//       (this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD].length > 0);
//   }


//   uploadNewImages() {
//     if (!this.hasImgsUpload() || !this.rentingId) {
//       return;
//     }
//     this.dataStorageService.setNewItemQueueUploading(
//       this.rentingId,
//       CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_SPACE,
//       this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_IMAGES_TO_UPLOAD],
//       this.NEW_LISTING_DATA,
//     );
//     this.listenUploadImageSuccess();
//   }

//   listenUploadImageSuccess() {
//     this.events.subscribe(
//       CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES,
//       this.handleUploadImageSuccess
//     )
//   }

//   unsubscibeUploadImageSuccess() {
//     this.events.unsubscribe(
//       CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES,
//       this.handleUploadImageSuccess
//     )
//   }

//   private handleUploadImageSuccess = (data: any) => {
//     // this.finishUploadImages = true;
//     console.log("listenUploadImageSuccess FINISHED_UPLOAD_IMAGES", data);
//     let currentUploadObj = data.getCurrentUploadObj();
//     console.log("currentUploadObj", currentUploadObj);
//     let newImageData: any;
//     // truong hop bi loi
//     if (currentUploadObj.imgs_upload_err) {
//       console.log("co hinh bi loiiiiiiiiiii CHUA BIET LAM SAO", currentUploadObj.imgs_upload_err);
//       this.anywhereService.showToast(CONSTANT.UPDATE.UPDATING_IMAGE_ERROR);
//     } else {
//       let rsUpload = data.getResultUpload();
//       console.log("rsUploadrsUpload", rsUpload);
//       newImageData = {};

//       this.setNewListingData({
//         space_images: rsUpload.url
//       })
//     }
//     this.saveDataToServer();
//   }

//   saveDataToServer() {
//     return this.deleteImages().then((res) => {
//       if (res && res.reason === CONSTANT.REASONS.ER_OK) {
//         this.removeDeleteImages();
//       }
//       this._saveDataToServerOnly();
//     }, err => {
//       this._saveDataToServerOnly();
//     })
//   }

//   deleteImages() {
//     if (!this.hasImgsDelete() || !this.rentingId) {
//       return Promise.resolve(false);
//     }
//     return this.putService.deleteImages(
//       this.rentingId,
//       this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID]
//     );
//   }

//   hasImgsDelete() {
//     return this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID] &&
//       (this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID].length > 0);
//   }

//   removeDeleteImages() {
//     let deleteImageIds = this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_DELETE_IMAGE_ID];
//     console.log("deleteImageIds", deleteImageIds);
//     let deleteImageObj;
//     for (let i in deleteImageIds) {
//       deleteImageObj = _.find(
//         this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES], {
//           id: deleteImageIds[i],
//         }
//       );
//       console.log("deleteImageObj", deleteImageObj);
//       this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES] = _.without(
//         this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES],
//         deleteImageObj
//       );
//     }

//     console.log("this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES]", this.NEW_LISTING_DATA[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES]);
//   }


//   private _saveDataToServerOnly() {
//     return this._saveToServer().then((res: any) => {
//       console.log("ket qua cuoi cung", res);
//       return this.handleSaveSuccess(res);
//     })
//   }

//   // saveDataToServer() {
//   //   this.removeDeleteImages();
//   //   // this.setUpdatingStatus(false);
//   //   // this.broadcastUpdateChange('isUpdating');
//   //   let promises = [this._saveToServer()];
//   //   if (this.hasImgsDelete()) {
//   //     promises.push(this.deleteImages());
//   //   }

//   //   return Promise.all(promises).then((res: any) => {
//   //     console.log("ket qua cuoi cung", res);
//   //     // this.finishUpdateData = true;
//   //     for (let i in _.reverse(res)) {
//   //       if (res[i].space) {
//   //         return this.handleSaveSuccess(res[i]);
//   //       }
//   //       return this.handleSaveSuccess(res[0]);
//   //     }
//   //   })
//   // }

//   private _saveToServer() {
//     if (!this.rentingId) {
//       return;
//     }
//     let sendData = _.cloneDeep(this.NEW_LISTING_DATA);
//     // delete sendData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES];
//     delete sendData.renting;
//     return this.putService.updateHouseDetail(
//       this.rentingId,
//       sendData
//     ).then(res => {
//       console.log("updateHouseDetailupdateHouseDetail", res);
//       return res;
//     })
//   }




//   handleSaveSuccess(res: any) {
//     console.log("handleSaveSuccesshandleSaveSuccess", res);
//     if (res && res.reason === CONSTANT.REASONS.ER_OK) {
//       console.log("hoannnnnnnnnn tatttttttt");
//       let val = this.NEW_LISTING_DATA;
//       if (res.space) {
//         res.space.renting_fee = res.space.renting.renting_fee;
//         let val = this.prepareDefaultImg(res.space);
//         this.setNewListingData(val);
//       }
//       // this.checkFinishAll();

//       this.setUpdatingStatus(false);
//       if (this.rentingId) {
//         this.broadcastUpdateChange('isUpdating');
//       }

//       // console.log("this.NEW", this.NEW_LISTING_DATA);

//       return val;
//     } else {
//       return this.handleNotOk();
//     }
//   }

//   prepareDefaultImg(data) {
//     let spaceData = _.cloneDeep(data);
//     if (spaceData && spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT]) {
//       return spaceData
//     };
//     if (spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES] &&
//       spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES].length > 0) {
//       let findObj: any = {};
//       findObj[CONSTANT.KEY_IMAGES.KEY_IS_DEFAULT] = true;
//       let defaultImageObj = _.find(
//         spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES],
//         findObj
//       ) || spaceData[CONSTANT.KEY_IMAGES.KEY_SPACE_IMAGES][0];
//       spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT] = defaultImageObj.url;
//     } else {
//       spaceData[CONSTANT.KEY_IMAGES.KEY_IMAGE_DEFAULT] =
//         CONSTANT.IMAGE.IMAGE_PATH + CONSTANT.IMAGE.DEFAULT_IMAGE;
//     }
//     return spaceData;
//   }

//   handleNotOk() {
//     console.log("co van de roi nha");
//     return false;
//   }

//   newHouse() {
//     return this.postService.newHouse(this.NEW_LISTING_DATA)
//       .then((res: any) => {
//         return this.handleSaveSuccess(res);
//       }, err => {
//         this.handleNotOk();
//       });
//   }

//   ngOnDestroy() {
//     this.unsubscibeUploadImageSuccess();
//   }

//   // finishUploadImages: boolean;
//   // finishUpdateData: boolean;

//   // checkFinishAll() {
//   //   let check: boolean;
//   //   if (this.hasImgsUpload()) {
//   //     check = this.finishUploadImages && this.finishUpdateData;
//   //   } else {
//   //     check = this.finishUpdateData;
//   //   }
//   //   console.log("checkFinishAllcheckFinishAll", check);
//   //   if (check) {
//   //     this.setUpdatingStatus(false);
//   //     this.broadcastUpdateChange('isUpdating');
//   //   }
//   //   return check;
//   // }

//   // changeRentingStatus(returnHandleSuccess ? ) {
//   //   let data: any = {};
//   //   data[CONSTANT.KEY_SPACES.RENTING_STATUS] =
//   //     this.NEW_LISTING_DATA[CONSTANT.KEY_SPACES.RENTING_STATUS];
//   //   return this.putService.updateHouseDetail(
//   //     this.rentingId, data
//   //   ).then(res => {
//   //     if (returnHandleSuccess) {
//   //       console.log("changeRentingStatus", res);
//   //       return this.handleSaveSuccess(res)
//   //     }
//   //     return res;
//   //   })
//   // }


// }
