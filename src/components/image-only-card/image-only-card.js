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
var ImageOnlyCard = (function () {
    function ImageOnlyCard() {
        this.cardClicked = new EventEmitter();
    }
    ImageOnlyCard.prototype.clickOnCard = function () {
        console.log("clickOnCardclickOnCardclickOnCard");
        this.cardClicked.emit(true);
    };
    return ImageOnlyCard;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageOnlyCard.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageOnlyCard.prototype, "info", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageOnlyCard.prototype, "imgSrc", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageOnlyCard.prototype, "type", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ImageOnlyCard.prototype, "cardClicked", void 0);
ImageOnlyCard = __decorate([
    Component({
        selector: 'image-only-card',
        templateUrl: './image-only-card.html'
    })
], ImageOnlyCard);
export { ImageOnlyCard };
//# sourceMappingURL=image-only-card.js.map