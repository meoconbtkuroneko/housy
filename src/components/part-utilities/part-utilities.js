var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { CONSTANT } from '../../services/constant.service';
var PartUtilities = (function () {
    function PartUtilities() {
    }
    PartUtilities.prototype.ngOnInit = function () {
        if (this.type == 'neighborhood') {
            this.utilities = CONSTANT.NEIGHBORHOOD_UTIILITES;
        }
        else {
            this.utilities = CONSTANT.APARTMENT_UTIILITES;
        }
    };
    PartUtilities.prototype.exists = function (item) {
        return this.showData.utilities.indexOf(item) > -1;
    };
    ;
    return PartUtilities;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartUtilities.prototype, "showData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartUtilities.prototype, "type", void 0);
PartUtilities = __decorate([
    Component({
        selector: 'part-utilities',
        templateUrl: './part-utilities.html'
    }),
    __metadata("design:paramtypes", [])
], PartUtilities);
export { PartUtilities };
//# sourceMappingURL=part-utilities.js.map