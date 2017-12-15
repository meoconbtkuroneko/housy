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
import { ReportService } from '../../services/report.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { ClickNeedShowLoginClass, CoreServices } from '../../templates/core-class';
var ReportButton = (function (_super) {
    __extends(ReportButton, _super);
    function ReportButton(coreServices, anywhereService, reportService) {
        var _this = _super.call(this, coreServices) || this;
        _this.anywhereService = anywhereService;
        _this.reportService = reportService;
        _this.callbackType = CONSTANT.CALLBACK_TYPE_ACTION.REPORT;
        return _this;
    }
    ReportButton.prototype.reportButtonClicked = function (e) {
        var _this = this;
        e.stopPropagation();
        this.checkHasLogined(this.callbackType, function () {
            _this.setReportData();
            _this.showReport();
        }, function () {
            _this.setReportData();
            _this.finishLoading();
        });
    };
    ReportButton.prototype.setReportData = function () {
        this.reportService.setReportData(this.type, this.data);
    };
    ReportButton.prototype.showReport = function () {
        this.reportService.showReport();
    };
    ReportButton.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return ReportButton;
}(ClickNeedShowLoginClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReportButton.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReportButton.prototype, "type", void 0);
ReportButton = __decorate([
    Component({
        selector: "report-button",
        templateUrl: "./report-button.html"
    }),
    __metadata("design:paramtypes", [CoreServices,
        AnywhereService,
        ReportService])
], ReportButton);
export { ReportButton };
//# sourceMappingURL=report-button.js.map