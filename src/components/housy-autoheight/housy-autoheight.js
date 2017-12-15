var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ElementRef, Directive, HostListener, Input } from '@angular/core';
var HousyAutoheight = (function () {
    function HousyAutoheight(elementRef) {
        this.elementRef = elementRef;
    }
    HousyAutoheight.prototype.onInput = function () {
        this.startResize();
    };
    HousyAutoheight.prototype.startResize = function () {
        if (this.el) {
            this.checkMaxLetter();
            this.doResize();
        }
    };
    HousyAutoheight.prototype.checkMaxLetter = function () {
        var countletter;
        var val = this.el.value;
        val = val ? val.trim() : '';
        countletter = val ? val.length : 0;
        if (this.maxLetter && countletter > this.maxLetter) {
            val = val.substr(0, this.maxLetter);
            this.el.value = val;
        }
    };
    HousyAutoheight.prototype.doResize = function () {
        this.el.style.height = 'auto';
        this.el.style.height = this.el.scrollHeight + "px";
    };
    HousyAutoheight.prototype.ngAfterViewInit = function () {
        this.el = this.elementRef.nativeElement;
        var initHeight = Math.max(this.el.scrollHeight, 60);
        if (this.el) {
            this.el.style.height = initHeight + "px";
        }
    };
    return HousyAutoheight;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], HousyAutoheight.prototype, "maxLetter", void 0);
__decorate([
    HostListener('input'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HousyAutoheight.prototype, "onInput", null);
HousyAutoheight = __decorate([
    Directive({
        selector: '[housyAutoheight]'
    }),
    __metadata("design:paramtypes", [ElementRef])
], HousyAutoheight);
export { HousyAutoheight };
//# sourceMappingURL=housy-autoheight.js.map