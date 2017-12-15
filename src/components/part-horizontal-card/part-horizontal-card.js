var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, } from '@angular/core';
import * as _ from 'lodash';
var DEFAULT_OPTIONS = {
    SHOW_MORE: false
};
var PartHorizontalCard = (function () {
    function PartHorizontalCard() {
        this.defaultOpts = _.cloneDeep(DEFAULT_OPTIONS);
    }
    PartHorizontalCard.prototype.ngOnChanges = function (changes) {
        if (changes.options) {
            this.defaultOpts = _.assignIn(this.defaultOpts, this.options);
        }
    };
    return PartHorizontalCard;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartHorizontalCard.prototype, "listHouses", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartHorizontalCard.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartHorizontalCard.prototype, "highlightId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartHorizontalCard.prototype, "options", void 0);
__decorate([
    ViewChild('scroll'),
    __metadata("design:type", Object)
], PartHorizontalCard.prototype, "scroll", void 0);
PartHorizontalCard = __decorate([
    Component({
        selector: 'part-horizontal-card',
        templateUrl: './part-horizontal-card.html'
    })
], PartHorizontalCard);
export { PartHorizontalCard };
//# sourceMappingURL=part-horizontal-card.js.map