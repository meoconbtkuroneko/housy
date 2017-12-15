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
import { Validators, FormBuilder } from '@angular/forms';
import { ViewController, NavParams, } from 'ionic-angular';
import { PostService } from '../../services/post.service';
import { AnywhereService } from '../../services/anywhere.service';
import { FormService } from '../../services/form.service';
import { CONSTANT } from '../../services/constant.service';
import { FeedbackData } from '../../templates/feedback-data';
import { ReportService } from '../../services/report.service';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
var ReportPage = (function (_super) {
    __extends(ReportPage, _super);
    function ReportPage(postService, formBuilder, viewController, anywhereService, formService, reportService, navParams, coreServices) {
        var _this = _super.call(this, coreServices) || this;
        _this.postService = postService;
        _this.formBuilder = formBuilder;
        _this.viewController = viewController;
        _this.anywhereService = anywhereService;
        _this.formService = formService;
        _this.reportService = reportService;
        _this.navParams = navParams;
        _this.isDisabled = true;
        return _this;
    }
    ;
    ReportPage.prototype.ngOnInit = function () {
        this.initVals();
        this.buildForm();
    };
    ReportPage.prototype.initVals = function () {
        this.params = this.navParams.get('params');
        console.log("this.params", this.params);
        if (this.params.type === 'space') {
            this.title = CONSTANT.SPACE_FEEDBACK.TITLE;
            this.subTitle = CONSTANT.SPACE_FEEDBACK.SUB_TITLE;
            this.feedbacks = CONSTANT.SERVER.FEEDBACK_SPACE_VAL;
            this.type = CONSTANT.SERVER.REPORT_TYPE.REPORT_TYPE_RENTING;
            this.id = this.params.data.renting.id;
        }
        else {
            this.title = CONSTANT.USER_FEEDBACK.TITLE;
            this.subTitle = CONSTANT.USER_FEEDBACK.SUB_TITLE;
            this.feedbacks = CONSTANT.SERVER.FEEDBACK_USER_VAL;
            this.type = CONSTANT.SERVER.REPORT_TYPE.REPORT_TYPE_USER;
            this.id = this.params.data.id;
            this.hostInfo = this.reportService.CONTACT_HOST_INFO;
        }
    };
    ReportPage.prototype.buildForm = function () {
        var _this = this;
        this.feedbackForm = this.formBuilder.group({
            feedback: ['',
                Validators.required,
            ],
            feedback_string: ['', [
                    Validators.compose([
                        Validators.required,
                        this.formService.notEmptyValidation
                    ])
                ]],
        });
        this.feedbackForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    ReportPage.prototype.onValueChanged = function (data) {
        var valsObj = this.feedbackForm.value;
        var otherReason = '' + CONSTANT.SERVER.TYPE_REPORT_REASON.REPORT_REASON_OTHER;
        this.canSend = false;
        this.isHighLight = false;
        if (valsObj.feedback !== otherReason) {
            if (valsObj.feedback != '') {
                this.canSend = true;
            }
        }
        else {
            if (valsObj.feedback_string && valsObj.feedback_string.trim().length > 0) {
                this.canSend = true;
            }
            else {
                this.isHighLight = true;
            }
        }
        if (valsObj.feedback === otherReason) {
            this.isDisabled = false;
        }
        else {
            this.isDisabled = true;
        }
    };
    ReportPage.prototype.sendReport = function () {
        if (!this.canGo()) {
            return;
        }
        var data = new FeedbackData(this.type, this.id, this.feedbackForm.value.feedback, this.feedbackForm.value.feedback_string);
        this.postService.sendUserFeedback(data);
        this.closeModal();
    };
    ReportPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    ReportPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    return ReportPage;
}(CoreSimpleClass));
ReportPage = __decorate([
    Component({
        selector: 'report-page',
        templateUrl: 'report-page.html'
    }),
    __metadata("design:paramtypes", [PostService,
        FormBuilder,
        ViewController,
        AnywhereService,
        FormService,
        ReportService,
        NavParams,
        CoreServices])
], ReportPage);
export { ReportPage };
//# sourceMappingURL=report-page.js.map