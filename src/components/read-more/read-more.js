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
import { App } from 'ionic-angular';
import * as _ from 'lodash';
var ReadMore = (function () {
    function ReadMore(app) {
        this.app = app;
        this.rmMoreText = 'Xem thêm';
        this.rmLessText = '-Thu gọn';
        this.rmLimit = 100;
        this.containLessText = "";
        this.containFullText = "";
        this.showButton = false;
        this.toggle = {
            stateLess: true,
            text: ''
        };
    }
    ReadMore.prototype.ngAfterViewInit = function () {
        this.content = this.app.getActiveNav().getActive().getContent();
    };
    ReadMore.prototype.ngOnChanges = function () {
        this.loadData();
    };
    ReadMore.prototype.loadData = function () {
        this.setText();
    };
    ReadMore.prototype.setText = function () {
        if (this.rmText.length <= 30) {
            this.containText = this.rmText;
            return;
        }
        this.containFullText = this.rmText;
        this.containLessText = _.truncate(this.rmText, {
            'length': this.rmLimit,
            'separator': ' '
        });
        this.toggle.text = this.rmMoreText;
        this.containText = this.containLessText;
        if (this.containFullText.length != this.containLessText.length && (this.containFullText.length > 0 && this.containLessText.length > 0)) {
            this.showButton = true;
        }
    };
    ReadMore.prototype.doToggle = function (e) {
        var _this = this;
        this.toggle.stateLess = !this.toggle.stateLess;
        console.log("$event", e, this.oldScrollDimensions);
        if (!this.toggle.stateLess) {
            // hien thi het
            this.oldScrollDimensions = this.getScrollDimensions();
            console.log("ooooooooooooooooooooooooo", this.oldScrollDimensions);
            this.containText = this.containFullText;
            this.toggle.text = this.rmLessText;
            setTimeout(function () {
                _this.getIncreaseWidth();
            }, 100);
        }
        else {
            this.scrollToOldDimentions();
            // thu gon
            setTimeout(function () {
                _this.containText = _this.containLessText;
                _this.toggle.text = _this.rmMoreText;
            }, 100);
        }
    };
    ReadMore.prototype.getScrollDimensions = function () {
        return this.content.getContentDimensions();
    };
    ReadMore.prototype.getIncreaseWidth = function () {
        var newScrollDimensions = this.getScrollDimensions();
        this.increaseWidth = newScrollDimensions.scrollHeight -
            this.oldScrollDimensions.scrollHeight;
        console.log("this.increaseWidth", newScrollDimensions, this.increaseWidth);
        return this.increaseWidth;
    };
    ReadMore.prototype.scrollToOldDimentions = function () {
        var newScrollTop = this.adjustScrollTop();
        console.log("scrollToOldDimentionsscrollToOldDimentions", this.oldScrollDimensions);
        if (this.oldScrollDimensions) {
            this.content.scrollTo(this.oldScrollDimensions.scrollLeft, newScrollTop, 0);
        }
    };
    ReadMore.prototype.adjustScrollTop = function () {
        var newScrollDimensions = this.getScrollDimensions();
        console.log("newScrollDimensionsnewScrollDimensions", newScrollDimensions);
        var newScrollTop = Math.max(newScrollDimensions.scrollTop - this.increaseWidth, 0);
        console.log("aaaaaaaaaaaaaaaaaaaa", newScrollTop);
        return newScrollTop;
    };
    return ReadMore;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReadMore.prototype, "rmText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReadMore.prototype, "rmMoreText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReadMore.prototype, "rmLessText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReadMore.prototype, "rmLinkClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ReadMore.prototype, "rmLimit", void 0);
ReadMore = __decorate([
    Component({
        selector: 'read-more',
        templateUrl: './read-more.html'
    }),
    __metadata("design:paramtypes", [App])
], ReadMore);
export { ReadMore };
//# sourceMappingURL=read-more.js.map