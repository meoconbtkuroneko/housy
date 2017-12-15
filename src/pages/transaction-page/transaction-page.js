var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ViewController, } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
import { GetService } from '../../services/get.service';
import { CONSTANT } from '../../services/constant.service';
import { CoreClassNoSubcribeUser, CoreServices } from '../../templates/core-class';
import * as _ from 'lodash';
var TransactionPage = (function (_super) {
    __extends(TransactionPage, _super);
    function TransactionPage(viewController, anywhereService, getService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.viewController = viewController;
        _this.anywhereService = anywhereService;
        _this.getService = getService;
        _this.transactionTypes = CONSTANT.SERVER.TRASACTION_TYPE;
        return _this;
    }
    ;
    TransactionPage.prototype.getAllData = function () {
        this.listAllData();
    };
    // doRefresh(refresher ? ) {
    //   console.log("doRefreshdoRefreshdoRefresh")
    //   this._doRefresh(refresher, () => {
    //     this.listAllData();
    //   })
    // };
    TransactionPage.prototype.listAllData = function () {
        var _this = this;
        this._listAllData('getTransactions', null, function (res) {
            console.log("listAllData 2222222222", res);
            _this.totalItem = res.balanceUser;
            var tempArr = _.clone(res.transactions);
            for (var i in tempArr) {
                tempArr[i].dateTime = _this.convertDateTime(tempArr[i].created_time);
                tempArr[i].iconName = _this.getIconName(tempArr[i].type);
            }
            _this.allDataList = tempArr;
            console.log("this.allDataList", res);
        });
    };
    TransactionPage.prototype.convertDateTime = function (dateTime) {
        var tempDate = this.anywhereService.convertDate(dateTime);
        return tempDate.hour + ':' +
            tempDate.minutes + '  ' +
            tempDate.day + " tháng " +
            tempDate.month + " năm " +
            tempDate.year;
    };
    TransactionPage.prototype.getIconName = function (type) {
        var name = '';
        switch (type) {
            case this.transactionTypes.TRANSACTION_DEPOSIT:
                {
                    name = 'add';
                    break;
                }
            case this.transactionTypes.TRANSACTION_NOT_CALCULATE:
            case this.transactionTypes.TRANSACTION_TRANSFER_DISCOUNT:
                {
                    name = 'shuffle';
                    break;
                }
            case this.transactionTypes.TRANSACTION_WITHDRAW:
                {
                    name = 'remove';
                    break;
                }
        }
        return name;
    };
    TransactionPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    TransactionPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return TransactionPage;
}(CoreClassNoSubcribeUser));
TransactionPage = __decorate([
    Component({
        selector: 'transaction-page',
        templateUrl: 'transaction-page.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        AnywhereService,
        GetService,
        CoreServices])
], TransactionPage);
export { TransactionPage };
//# sourceMappingURL=transaction-page.js.map