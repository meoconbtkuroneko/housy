var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Output, EventEmitter, Input, } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistorySearch } from '../../templates/history-search';
import { MapService } from '../../services/map.service';
import { CoreSimpleClass, CoreServices } from '../../templates/core-class';
import * as _ from 'lodash';
var SearchbarAddress = (function (_super) {
    __extends(SearchbarAddress, _super);
    function SearchbarAddress(coreServices, elementRef, navController, mapService) {
        var _this = _super.call(this, coreServices) || this;
        _this.coreServices = coreServices;
        _this.elementRef = elementRef;
        _this.navController = navController;
        _this.mapService = mapService;
        _this.addressChanged = new EventEmitter();
        _this.checkShowNoInternet();
        return _this;
    }
    SearchbarAddress.prototype.ngOnChanges = function (changes) {
        console.log("ngOnChanges", changes);
        this.address = this.inputAddress;
    };
    SearchbarAddress.prototype.handleSubscribeInternet = function () {
        if (this.hasInternet === false) {
            this.checkShowNoInternet();
        }
    };
    SearchbarAddress.prototype.handleSubscribeReloadInternet = function () {
        this.checkShowNoInternet();
    };
    SearchbarAddress.prototype.checkShowNoInternet = function () {
        this.showNoInternet = this.hasInternet === false;
    };
    SearchbarAddress.prototype.onSearch = function (query) {
        if (!query || !query.target) {
            return;
        }
        var value = query.target.value;
        if (!value || value === '') {
            this.emitAddressChanged(undefined);
        }
        this.getSuggestLocation(value);
    };
    SearchbarAddress.prototype.getSuggestLocation = function (words) {
        var _this = this;
        if (words && words != '') {
            this.mapService.suggestAddress(words).subscribe(function (result) {
                console.log(">>>> suggestAddress result:", result);
                _this.handleSuggestSuccess(result);
            }, function (err) {
                _this.handleSuggestErr();
            });
        }
        else {
            this.handleSuggestSuccess([]);
        }
    };
    SearchbarAddress.prototype.handleSuggestSuccess = function (res) {
        if (_.isArray(res)) {
            this.suggestionsArr = res;
            this.suggestionsErr = undefined;
        }
        else {
            this.handleSuggestErr();
        }
    };
    SearchbarAddress.prototype.handleSuggestErr = function () {
        console.log("loooooooooooooooooooooiiiiiiiiiii");
        this.suggestionsArr = [];
        this.suggestionsErr = 'Không tìm thấy kết quả';
    };
    SearchbarAddress.prototype.selectSuggestion = function (suggestion) {
        var _this = this;
        console.log("selectSuggestionselectSuggestion", suggestion);
        this.address = suggestion.description;
        this.mapService.getDetailsByPlaceId(suggestion.place_id)
            .subscribe(function (res) {
            _this.addressObj = new HistorySearch(_this.address, res.geometry.location.lat(), res.geometry.location.lng(), suggestion.place_id);
            _this.emitAddressChanged(_this.addressObj);
        }, function (err) { });
        this.handleSuggestSuccess([]);
    };
    SearchbarAddress.prototype.emitAddressChanged = function (data) {
        this.addressChanged.emit(data);
    };
    return SearchbarAddress;
}(CoreSimpleClass));
__decorate([
    Input(),
    __metadata("design:type", Object)
], SearchbarAddress.prototype, "inputAddress", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SearchbarAddress.prototype, "addressChanged", void 0);
SearchbarAddress = __decorate([
    Component({
        selector: "searchbar-address",
        templateUrl: "./searchbar-address.html"
    }),
    __metadata("design:paramtypes", [CoreServices,
        ElementRef,
        NavController,
        MapService])
], SearchbarAddress);
export { SearchbarAddress };
//# sourceMappingURL=searchbar-address.js.map