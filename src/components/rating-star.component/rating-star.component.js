var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var RatingStarComponent = (function () {
    function RatingStarComponent() {
        this.returnValue = new EventEmitter();
    }
    RatingStarComponent.prototype.ngOnChanges = function () {
        this.loadData();
    };
    RatingStarComponent.prototype.loadData = function () {
        this.setMaxStart(this.maxStar);
        this.setDefaultValue(this.defaultRating);
    };
    RatingStarComponent.prototype.setRating = function (ratingVal) {
        if (this.readOnly) {
            return;
        }
        this.ratingVal = ratingVal;
        this.returnValue.emit({
            nameRating: this.nameRating,
            valueRating: this.ratingVal
        });
    };
    ;
    RatingStarComponent.prototype.setMaxStart = function (max) {
        this.numberStar = [];
        for (var i = 0; i < max; i++) {
            this.numberStar[i] = i + 1;
        }
    };
    RatingStarComponent.prototype.setDefaultValue = function (df) {
        if (df != undefined) {
            this.ratingVal = this.defaultRating;
        }
    };
    return RatingStarComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], RatingStarComponent.prototype, "maxStar", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], RatingStarComponent.prototype, "nameRating", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], RatingStarComponent.prototype, "defaultRating", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], RatingStarComponent.prototype, "readOnly", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], RatingStarComponent.prototype, "returnValue", void 0);
RatingStarComponent = __decorate([
    Component({
        selector: 'rating-star',
        templateUrl: './rating-star.component.html',
    }),
    __metadata("design:paramtypes", [])
], RatingStarComponent);
export { RatingStarComponent };
//# sourceMappingURL=rating-star.component.js.map