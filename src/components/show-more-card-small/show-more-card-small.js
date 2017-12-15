var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, } from '@angular/core';
import { Events } from 'ionic-angular';
import { CONSTANT } from '../../services/constant.service';
var ShowMoreCardSmall = (function () {
    function ShowMoreCardSmall(events) {
        var _this = this;
        this.events = events;
        this.handleSubscribeFinishShowMore = function () {
            console.log("handleSubscribeFinishShowMore");
            _this.setShowSpinner(false);
        };
        this.toggleSubscribeFinishShowMore(true);
    }
    ShowMoreCardSmall.prototype.setShowSpinner = function (shouldShow) {
        this.showSpinner = shouldShow;
    };
    ShowMoreCardSmall.prototype.toggleSubscribeFinishShowMore = function (isSubscibe) {
        if (isSubscibe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.FINISH_SHOW_LOAD_MORE, this.handleSubscribeFinishShowMore);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.FINISH_SHOW_LOAD_MORE, this.handleSubscribeFinishShowMore);
        }
    };
    ShowMoreCardSmall.prototype.showMoreClicked = function () {
        if (this.showSpinner) {
            return;
        }
        this.setShowSpinner(true);
        this.events.publish(CONSTANT.EVENTS_NAME.SHOW_MORE_CLICKED);
    };
    ShowMoreCardSmall.prototype.ngOnDestroy = function () {
        this.toggleSubscribeFinishShowMore(false);
    };
    return ShowMoreCardSmall;
}());
ShowMoreCardSmall = __decorate([
    Component({
        selector: 'show-more-card-small',
        templateUrl: './show-more-card-small.html'
    }),
    __metadata("design:paramtypes", [Events])
], ShowMoreCardSmall);
export { ShowMoreCardSmall };
//# sourceMappingURL=show-more-card-small.js.map