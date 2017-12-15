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
import { ViewController } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
var ConditionUse = (function () {
    function ConditionUse(viewController, anywhereService) {
        this.viewController = viewController;
        this.anywhereService = anywhereService;
    }
    ;
    ConditionUse.prototype.ngOnInit = function () { };
    ConditionUse.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    return ConditionUse;
}());
ConditionUse = __decorate([
    Component({
        selector: 'condition-use',
        templateUrl: 'condition-use.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        AnywhereService])
], ConditionUse);
export { ConditionUse };
//# sourceMappingURL=condition-use.js.map