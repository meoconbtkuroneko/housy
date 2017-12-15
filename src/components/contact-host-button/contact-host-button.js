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
import { Component, Input, } from '@angular/core';
import { CONSTANT } from '../../services/constant.service';
import { ReportService } from '../../services/report.service';
import { ClickNeedShowLoginClass, CoreServices } from '../../templates/core-class';
var ContactHostButton = (function (_super) {
    __extends(ContactHostButton, _super);
    function ContactHostButton(reportService, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.reportService = reportService;
        _this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.CONTACT_HOST;
        _this.toggleSubscribeUser(true);
        return _this;
    }
    ContactHostButton.prototype.contactHostClicked = function (e) {
        var _this = this;
        if (e) {
            e.stopPropagation();
        }
        ;
        this.checkHasLogined(this.callbackType, function () {
            _this.contactHost();
        });
    };
    ContactHostButton.prototype.contactHost = function () {
        var contactData = {
            timeContact: new Date().getTime(),
            rentingId: this.data.renting.id,
            hostInfo: this.data.renting.user,
        };
        this.reportService.setContactHostInfo(contactData);
    };
    ContactHostButton.prototype.ngOnDestroy = function () {
        this.toggleSubscribeUser(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return ContactHostButton;
}(ClickNeedShowLoginClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContactHostButton.prototype, "data", void 0);
ContactHostButton = __decorate([
    Component({
        selector: "contact-host-button",
        templateUrl: "./contact-host-button.html"
    }),
    __metadata("design:paramtypes", [ReportService,
        CoreServices])
], ContactHostButton);
export { ContactHostButton };
//# sourceMappingURL=contact-host-button.js.map