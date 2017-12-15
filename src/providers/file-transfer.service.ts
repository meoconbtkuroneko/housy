import { Injectable } from '@angular/core';
import {
  Events,
  Platform,
} from 'ionic-angular';
import {
  Transfer,
  FileUploadOptions,
  TransferObject
} from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { UserStorageService } from './user-storage.service';
import { DataStorageService } from './data-storage.service';
import { CONSTANT } from './constant.service';
import { AnywhereService } from './anywhere.service';
import * as _ from 'lodash';

@Injectable()
export class FileTransferService {
  constructor(private transfer: Transfer,
    private file: File,
    private events: Events,
    private userStorageService: UserStorageService,
    private dataStorageService: DataStorageService,
    private anywhereService: AnywhereService,
    private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.init();
    })
  }

  totalImgUploadSuc = 0;
  totalImgUploadErr = 0;
  resultUpImg = {
    type: null,
    id: null,
    totalImg: null,
    urlError: null,
    urlSuccses: null
  };

  init() {
    this.toggleSubscribeDataStorageChanged(true);
    this.toggleSubscribeSetNewItemQueueUploading(true);
    this.toggleSubscribeUploadImgFinished(true);
  }

  toggleSubscribeDataStorageChanged(isSubscirbe: boolean) {
    if (isSubscirbe) {
      this.events.subscribe(
        CONSTANT.EVENTS_NAME.DATA_STORAGE_CHANGED,
        this.handleHaveItemUpload
      );
    } else {
      this.events.unsubscribe(
        CONSTANT.EVENTS_NAME.DATA_STORAGE_CHANGED,
        this.handleHaveItemUpload
      );
    }
  }

  private handleHaveItemUpload = (res) => {
    let listingQueue = this.dataStorageService.getQueueUploading();
    console.log("handleHaveItemUpload listingQueue", listingQueue);

    _.forEach(listingQueue, (value, key) => {
      this.backgroundUpload(value);
    })
  }

  toggleSubscribeSetNewItemQueueUploading(isSubscirbe: boolean) {
    if (isSubscirbe) {
      this.events.subscribe(
        'setNewItemQueueUploading',
        this.handleHaveItemUpload
      );
    } else {
      this.events.unsubscribe(
        'setNewItemQueueUploading',
        this.handleHaveItemUpload
      );
    }
  }

  toggleSubscribeUploadImgFinished(isSubscirbe: boolean) {
    if (isSubscirbe) {
      this.events.subscribe(
        'FileService.uploadImgFinished',
        this.handleFinishedUpload
      );
    } else {
      this.events.unsubscribe(
        'FileService.uploadImgFinished',
        this.handleFinishedUpload
      );
    }
  }

  private handleFinishedUpload = (rs) => {
    console.log("handleFinishedUploadhandleFinishedUpload", rs);
    let itemTmp = this.dataStorageService.getItemQueueUploadingByIdAndType(
      rs.resultUpImg.id,
      rs.resultUpImg.type
    );

    console.log("handleFinishedUpload getItemQueueUploadingByIdAndType", itemTmp);

    if (rs.resultUpImg.urlSuccses) {
      /* Delete img url upload success of Object*/
      this.dataStorageService.removeImageFromQueueUploading(
        rs.resultUpImg.id,
        rs.resultUpImg.type,
        rs.resultUpImg.urlSuccses
      );
    } else {
      /* Move img url upload Error of Object to array imgs_upload_err and del it in imgs_upload*/

      //      this.dataStorageService.ApartmentErrImageUploading.add(url); 

      this.dataStorageService.addErrImageQueueUploading(
        rs.resultUpImg.id,
        rs.resultUpImg.type,
        rs.resultUpImg.urlError
      );
      this.dataStorageService.removeImageFromQueueUploading(
        rs.resultUpImg.id,
        rs.resultUpImg.type,
        rs.resultUpImg.urlSuccses
      );
    }



    if (itemTmp.imgs_upload.length == 0) {
      /* CHeck isNext? true: false*/
      // var msg = '"' + itemTmp.data_upload.name + '"';
      if (!itemTmp.imgs_upload_err) {
        // this.anywhereService.showToast(msg + " đăng thành công", 5000, "center");
        this.dataStorageService.removeItemQueueUploadingByIdAndType(
          rs.resultUpImg.id,
          rs.resultUpImg.type,
          itemTmp.data_upload,
          rs.response
        );
      } else {
        // this.anywhereService.showToast(msg + " đăng có lỗi", 5000, "center");
        this.dataStorageService.setStatusUploading(
          rs.resultUpImg.id,
          rs.resultUpImg.type,
          CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_FAILED
        );
      }
    }

    let resultData: any = {
      getCurrentUploadObj() {
        return itemTmp;
      },
      getResultUpload() {
        return rs.response;
      }
    }

    console.log("resultDataresultData", resultData.getCurrentUploadObj(), resultData.getResultUpload())

    this.events.publish('finishedUploadImages', resultData);
  }





  /*
    Upload Files to server:
    - fileUrl: url của hình(file) upload
    - type: apartment, neighborhoods, hoac house
      + Type_Apartments: 3
      + TYPE_NEIGHBORHOOD: 4
    - objectId: id cua apartment, neighborhoods, review, hoac house của hình(file) cần upload
  */
  private uploadFilesToServer(fileUrl, type, objectId) {
    let serverPostImg = CONSTANT.SERVER.API_UPLOAD_IMAGE +
      CONSTANT.SERVER.APIS.UPLOAD_IMAGES(type, objectId);
    // console.log("uploadFilesToServer fileUrl, type, objectId serverPostImg", fileUrl, type, objectId, serverPostImg);
    return this._doUploadFilesToServer(fileUrl, serverPostImg);
  };

  private _doUploadFilesToServer(fileUrl, urlServer) {
    // console.log("_doUploadFilesToServer fileUrl, urlServer", fileUrl, urlServer);
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: "housyimg.jpg",
      mimeType: "image/jpeg",
      httpMethod: "POST"
    }

    let headers = { 'Authorization': 'Bearer ' + this.userStorageService.getProp('tokenImage') };
    options.headers = headers;
    let trustHosts = true;
    let result = {
      response: null,
      fileCount: null,
    };

    let fileTransfer: TransferObject = this.transfer.create();

    // console.log("_doUploadFilesToServer fileTransfer", fileTransfer);

    return fileTransfer.upload(fileUrl, urlServer, options, trustHosts)
      .then((rs) => {
        // Success!
        let response = JSON.parse(rs.response);
        console.log(">>fileTransfer>>>>>>>>>>>> sau khi đã uphinh thành công ", response)
        result.response = response;
        result.fileCount = 1;
        return result;
      }, (err) => {
        console.log(">>fileTransfer>>>>>>>>>>>> sau khi đã uphinh loiiiiiiiiiiiii ", err)
      });

  };

  private resetVar() {
    console.log("resetVarresetVar");
    this.totalImgUploadSuc = 0;
    this.totalImgUploadErr = 0;
    this.resultUpImg = {
      type: null,
      id: null,
      totalImg: null,
      urlError: null,
      urlSuccses: null
    };
  };

  private upSinglePicture(imgUrl, type, objectId, timeUpload) {
    console.log("upSinglePicture imgUrl, type, objectId, timeUpload", imgUrl, type, objectId, timeUpload);
    this.resultUpImg.type = type;
    this.resultUpImg.id = objectId;
    console.log("upSinglePicture type: ", type);
    return this.uploadFilesToServer(imgUrl, type, objectId)
      .then((rs: any) => {
        console.log("upSinglePicture uploadFilesToServer rs", rs);
        if (rs && rs.fileCount == 1) {
          console.log("Kết quả trả về resultUpImg copy: ", rs);
          this.resultUpImg.urlSuccses = imgUrl;

          this.events.publish("FileService.uploadImgFinished", {
            resultUpImg: {
              type: type,
              id: objectId,
              urlSuccses: imgUrl,
              totalImg: this.resultUpImg.totalImg
            },
            response: rs.response
          });

          return true;
        } else {
          if (timeUpload == 5) {
            this.resultUpImg.urlError = imgUrl;
            this.events.publish("FileService.uploadImgFinished", { resultUpImg: this.resultUpImg });
            return true;
          } else {
            return this.upSinglePicture(imgUrl, type, objectId, timeUpload + 1)
              .then((rs) => {
                return rs;
              });
          }
        }
      });
  };

  private doUploadPictures(imgsUp, type, objectId, index) {
    // console.log("doUploadPictures imgsUp, type, objectId, index", imgsUp, type, objectId, index);
    let totalImg = _.clone(imgsUp);
    this.resultUpImg.totalImg = totalImg.length;
    if (index < totalImg.length) {
      return this.upSinglePicture(totalImg[index], type, objectId, 1).then((rs) => {
        if (rs) {
          return this.doUploadPictures(totalImg, type, objectId, index + 1);
        }
      })
    } else {
      let d = {
        id: null,
        type: null,
        totalImgs: null,
        content: null
      };
      d.id = objectId;
      d.type = type;
      d.totalImgs = totalImg.length;
      d.content = "Trả về sau khi xong hết";
      return d;
    }
  };

  // Now uploadPictures === doUploadPictures in Past
  // Start up load files(pictures)
  private uploadPictures(imgs, type, objectId) {
    console.log("uploadPictures imgs, type, objectId", imgs, type, objectId)
    this.resetVar();
    return this.doUploadPictures(imgs, type, objectId, 0);
  }

  private backgroundUpload(listingItem) {
    console.log("backgroundUpload listingItem", listingItem);
    if (listingItem != undefined &&
      (listingItem.status == CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_NEW) ||
      (listingItem.status == CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_FAILED)) {
      console.log("backgroundUpload listingItem status", listingItem.status);

      this.dataStorageService.setStatusUploading(
        listingItem.id,
        listingItem.type,
        CONSTANT.SERVER.STATUS_UPLOAD.STATUS_UPLOAD_UPLOADING
      );
      this.uploadPictures(listingItem.imgs_upload, listingItem.type, listingItem.id);
    }
  }

  ngOnDestroy() {
    this.toggleSubscribeDataStorageChanged(false);
    this.toggleSubscribeSetNewItemQueueUploading(false);
    this.toggleSubscribeUploadImgFinished(false);
  }
}
