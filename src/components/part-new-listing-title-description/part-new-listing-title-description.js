var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { AnywhereService } from '../../services/anywhere.service';
import { CONSTANT } from '../../services/constant.service';
import { NewListingService } from '../../services/new-listing.service';
import * as _ from 'lodash';
var PartNewListingTitleDescription = (function () {
    function PartNewListingTitleDescription(anywhereService, formBuilder, formService, newListingService) {
        this.anywhereService = anywhereService;
        this.formBuilder = formBuilder;
        this.formService = formService;
        this.newListingService = newListingService;
        this.getNewListingForm = new EventEmitter();
        this.formValidation = CONSTANT.FORM_VALIDATION;
    }
    PartNewListingTitleDescription.prototype.ngOnInit = function () {
        this.initVals();
        this.buildForm();
    };
    PartNewListingTitleDescription.prototype.buildForm = function () {
        var _this = this;
        this.newListingForm = this.formBuilder.group({
            title: [this.showData.title || '', [
                    Validators.required,
                    this.formService.minTitleValue,
                ]],
            description: [this.showData.description || '', [
                    Validators.required,
                    this.formService.minDescriptionValue,
                ]],
        });
        this.newListingForm.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    PartNewListingTitleDescription.prototype.onValueChanged = function (data) {
        this.checkCanSend();
        this.broadcastValue();
    };
    PartNewListingTitleDescription.prototype.checkCanSend = function () {
        if (this.newListingForm &&
            this.newListingForm.valid) {
            this.canSend = true;
        }
        else {
            this.canSend = false;
        }
    };
    PartNewListingTitleDescription.prototype.broadcastValue = function () {
        this.getNewListingForm.emit({
            form: this.newListingForm,
            canSend: this.canSend
        });
    };
    PartNewListingTitleDescription.prototype.initVals = function () {
        this.showData = _.cloneDeep(this.newListingService.NEW_LISTING_DATA);
        console.log("this.showData 333333333", this.showData);
    };
    return PartNewListingTitleDescription;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], PartNewListingTitleDescription.prototype, "getNewListingForm", void 0);
PartNewListingTitleDescription = __decorate([
    Component({
        selector: "part-new-listing-title-description",
        templateUrl: "./part-new-listing-title-description.html"
    }),
    __metadata("design:paramtypes", [AnywhereService,
        FormBuilder,
        FormService,
        NewListingService])
], PartNewListingTitleDescription);
export { PartNewListingTitleDescription };
//# sourceMappingURL=part-new-listing-title-description.js.map