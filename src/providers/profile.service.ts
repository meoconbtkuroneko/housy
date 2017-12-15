import {
  Injectable,
} from '@angular/core';
import { Events } from 'ionic-angular';

import { DataStorageService } from './data-storage.service';
import { UserStorageService } from './user-storage.service';
import { AnywhereService } from './anywhere.service';

import * as _ from 'lodash';

import { PutService } from './put.service';
import { CONSTANT } from './constant.service';

@Injectable()
export class ProfileService {
  PROFILE_DATA: any;

  saveData: any;

  hasChangedImages: any = {};

  isUpdating: boolean;

  cachedProfile: any = {
    pictureUrl: null,
    coverUrl: null,
    setPictureUrl: (url) => {
      this.cachedProfile.pictureUrl = url;
    },
    getPictureUrl: () => {
      return this.cachedProfile.pictureUrl;
    },
    setCoverUrl: (url) => {
      this.cachedProfile.coverUrl = url;
    },
    getCoverUrl: () => {
      return this.cachedProfile.coverUrl;
    },
  };

  USER = this.userStorageService.USER;

  constructor(
    private events: Events,
    private dataStorageService: DataStorageService,
    private putService: PutService,
    private userStorageService: UserStorageService,
    private anywhereService: AnywhereService,
  ) {
    this.initCachedProfile();
    this.toggleSubcribeUploadImageFinished(true);
  }

  initCachedProfile() {
    let profile = this.userStorageService.getProp('userInfo');
    this.cachedProfile.setPictureUrl(profile.picture);
    this.cachedProfile.setCoverUrl(profile.cover);
  }

  setHasChangedImages(type) {
    this.hasChangedImages[type] = true;
  }

  saveToServer() {
    if (this.hasUploadedImages()) {
      this.uploadNewImages();
      return;
    }
    return this._saveToServer()
  }

  hasUploadedImages() {
    return (this.hasChangedImages[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.COVER] ||
      this.hasChangedImages[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.PICTURE]);
  }

  uploadNewImages() {
    console.log("uploadNewImagesuploadNewImages")
    let type;
    let url;
    this.setCoverWillUpload();
    this.setPictureWillUpload();
    this.broadcastProfileDataUpdatingChange(true);

    if (!CONSTANT.REAL_DEVICE) {
      console.log("this.PROFILE_DATA broddddddd", this.PROFILE_DATA)
      let resultData: any = {
        getCurrentUploadObj: () => {
          return {
            idUploadDone: this.PROFILE_DATA.id,
            type: type,
            moreInfo: 'moreInfo',
            resultUpload: [{
              id: this.PROFILE_DATA.id,
              url: url
            }]
          };
        },
        getResultUpload: () => {
          return {
            id: this.PROFILE_DATA.id,
            url: url
          };
        }
      }
      setTimeout(() => {
        this.events.publish(CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES, resultData);
      }, 2000);
    }
  }

  setCoverWillUpload() {
    if (this.hasChangedImages[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.COVER]) {
      this.dataStorageService.setNewItemQueueUploading(
        this.PROFILE_DATA.id,
        CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_COVER, [this.PROFILE_DATA[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.COVER]],
        null
      );
    }
  }

  setPictureWillUpload() {
    if (this.hasChangedImages[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.PICTURE]) {
      this.dataStorageService.setNewItemQueueUploading(
        this.PROFILE_DATA.id,
        CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_USER, [this.PROFILE_DATA[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.PICTURE]],
        null
      );
    }
  }

  toggleSubcribeUploadImageFinished(isSubscribe: boolean) {
    if (isSubscribe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES,
        this.handleSubcribeUploadImageFinished
      )
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.FINISHED_UPLOAD_IMAGES,
        this.handleSubcribeUploadImageFinished
      )
    }
  }

  private handleSubcribeUploadImageFinished = (data: any) => {
    console.log("listenUploadImageFinished finishedUploadImages", data);
    let currentUploadObj = data.getCurrentUploadObj();
    let newImageData: any;
    // truong hop bi loi
    if (currentUploadObj.imgs_upload_err) {
      this.anywhereService.showToast(CONSTANT.UPDATE.UPDATING_IMAGE_ERROR);
      this.updateUserData({
        cover: this.cachedProfile.getCoverUrl(),
        picture: this.cachedProfile.getPictureUrl(),
      })
    } else {
      let rsUpload = data.getResultUpload();
      newImageData = {};
      newImageData.id = this.PROFILE_DATA.id;
      switch (currentUploadObj.type) {
        case CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_COVER:
          {
            newImageData[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.COVER] = rsUpload.url;
            break;
          }
        case CONSTANT.SERVER.TYPE_UPLOAD.UPLOAD_TYPE_USER:
          {
            newImageData[CONSTANT.KEY_TYPE_UPLOAD_IMAGES.PICTURE] = rsUpload.url;
            break;
          }
      }

      // luu hinh len server
      let tempSave = _.assignIn(this.saveData, newImageData)
      this.setSaveData(tempSave);
    }
    this._saveToServer();
  }

  setSaveData(data) {
    this.saveData = data;
  }

  updateUserData(data) {
    if (JSON.stringify(this.USER.userInfo) === JSON.stringify(data)) {
      console.log("k co gi thay doi het ===============================");
      return;
    }
    this.setProfileData(data);
    return this.userStorageService.setUpdateUserData(data);
  }

  setProfileData(data) {
    let tempVal = _.assignIn(this.PROFILE_DATA, data);
    this.PROFILE_DATA = _.cloneDeep(tempVal);
    console.log("setProfileData this.PROFILE_DATA", this.PROFILE_DATA);
  }

  private _saveToServer() {
    if (this.saveData) {
      // chua broadcast thi moi broadcast
      if (!this.hasUploadedImages()) {
        this.broadcastProfileDataUpdatingChange(true);
      }
      return this.putService.updateProfile(this.saveData)
        .then((res: any) => {
          console.log("_saveToServer", res);
          return this.handleSaveSuccess(res);
        })
    }
  }

  broadcastProfileDataUpdatingChange(val) {
    this.isUpdating = val;
    this.events.publish(CONSTANT.EVENTS_NAME.PROFLE_IS_UPDATING, val);
  }

  handleSaveSuccess(res ? : any) {
    console.log("handleSaveSuccesshandleSaveSuccess", res);
    this.broadcastProfileDataUpdatingChange(false);
    this.resetDataService();
  }


  resetDataService() {
    this.hasChangedImages = {};
    this.isUpdating = undefined;
    this.saveData = undefined;
  }

  ngOnDestroy() {
    this.toggleSubcribeUploadImageFinished(false)
  }
}
