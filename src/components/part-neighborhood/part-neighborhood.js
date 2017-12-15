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
import { NavController } from 'ionic-angular';
import { NeighborhoodDetail } from '../../pages/neighborhood-detail/neighborhood-detail';
import { NoInternetService } from '../../services/no-internet.service';
var PartNeighborhood = (function () {
    function PartNeighborhood(navController, noInternetService) {
        this.navController = navController;
        this.noInternetService = noInternetService;
    }
    PartNeighborhood.prototype.openDetail = function () {
        // if (!this.noInternetService.hasInternet) {
        //   console.log("k co internet");
        //   return;
        // }
        var params = {
            id: this.showData.neighborhood.id,
            info: this.showData.neighborhood
        };
        this.navController.push(NeighborhoodDetail, { params: params });
    };
    return PartNeighborhood;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], PartNeighborhood.prototype, "showData", void 0);
PartNeighborhood = __decorate([
    Component({
        selector: 'part-neighborhood',
        templateUrl: './part-neighborhood.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NoInternetService])
], PartNeighborhood);
export { PartNeighborhood };
//# sourceMappingURL=part-neighborhood.js.map