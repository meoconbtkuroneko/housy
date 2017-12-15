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
import { Component, ElementRef, } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoryService } from '../../services/history.service';
import { AnywhereService } from '../../services/anywhere.service';
import { NoInternetService } from '../../services/no-internet.service';
import { MapService } from '../../services/map.service';
import { CONSTANT } from '../../services/constant.service';
import { SearchResultPage } from '../search-result/search-result';
import { HistorySearch, POPULAR_SEARCHS } from '../../templates/history-search';
import { CoreClass, CoreServices } from '../../templates/core-class';
import * as _ from 'lodash';
var SearchPage = (function (_super) {
    __extends(SearchPage, _super);
    function SearchPage(coreServices, navController, historyService, elementRef, anywhereService, noInternetService, mapService) {
        var _this = _super.call(this, coreServices) || this;
        _this.navController = navController;
        _this.historyService = historyService;
        _this.elementRef = elementRef;
        _this.anywhereService = anywhereService;
        _this.noInternetService = noInternetService;
        _this.mapService = mapService;
        _this.allPopularSearchs = _.cloneDeep(POPULAR_SEARCHS);
        _this.showAllPopularSearchs = true;
        _this.handleSubscribeHistoriesChanged = function () {
            console.log("handleSubscribeHistoriesChanged", _this.hasInternet);
            _this.listHistories = _this.historyService.getHistories();
        };
        console.log("this.hasInternet", _this.hasInternet);
        _this.checkHasInternet();
        _this.toggleSubscribeHistoriesChanged(true);
        return _this;
    }
    // inherit from parent
    SearchPage.prototype.handleSubscribeInternet = function (res) {
        console.log("handleSubscribeInternet ssssssssssss", res);
        this.toggleProcessing(!this.hasInternet);
        if (res === false) {
            this.toggleShowNoInternet(this.hasInternet === false);
        }
    };
    // inherit from parent
    SearchPage.prototype.handleSubscribeReloadInternet = function () { };
    // inherit from parent
    SearchPage.prototype.handleSubscribeUser = function () { };
    // inherit from parent
    SearchPage.prototype.handleSubscribeRetryErrorLoad = function () {
        this.toggleShowNoInternet(this.hasInternet === false);
        this.getAllData();
    };
    SearchPage.prototype.checkShowNoInternet = function () {
        this.showNoInternet = this.noInternetService.hasInternet === false;
    };
    SearchPage.prototype.toggleSubscribeHistoriesChanged = function (isSubscibe) {
        if (isSubscibe) {
            this.coreServices.events.subscribe(CONSTANT.EVENTS_NAME.HISTORIES_CHANGED, this.handleSubscribeHistoriesChanged);
        }
        else {
            this.coreServices.events.unsubscribe(CONSTANT.EVENTS_NAME.HISTORIES_CHANGED, this.handleSubscribeHistoriesChanged);
        }
    };
    ;
    SearchPage.prototype.ngAfterViewInit = function () {
        this.getAllData();
    };
    SearchPage.prototype.getAllData = function () {
        if (this.hasInternet) {
            this.toggleDistrict();
            this.createGooglePlace();
            this.handleSubscribeHistoriesChanged();
        }
    };
    SearchPage.prototype.toggleDistrict = function () {
        this.showAllPopularSearchs = !this.showAllPopularSearchs;
        this.popularSearchs = this.showAllPopularSearchs ?
            this.allPopularSearchs :
            _.take(this.allPopularSearchs, 3);
        this.iconName = this.showAllPopularSearchs ? 'arrow-dropup' : 'arrow-dropdown';
    };
    SearchPage.prototype.createGooglePlace = function () {
        var _this = this;
        // .searchbar-input : create by ionic
        this.inputSearchEl = this.elementRef.nativeElement.querySelector('.searchbar-input');
        var autocomplete = new google.maps.places.Autocomplete(this.inputSearchEl);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var tempPlace = autocomplete.getPlace();
            // console.log("placeplaceplaceplaceplaceplace", tempPlace);
            var place = new HistorySearch(tempPlace.formatted_address, tempPlace.geometry.location.lat(), tempPlace.geometry.location.lng(), tempPlace.place_id);
            _this.goToSearch(place);
        });
    };
    SearchPage.prototype.goToSearch = function (place) {
        if (this.isProcessing) {
            return;
        }
        this.currentSearchPlace = place;
        this.historyService.goToSearch(this.currentSearchPlace);
        this.navController.push(SearchResultPage, {
            params: this.currentSearchPlace
        });
    };
    // get and search house at currentPosition 
    SearchPage.prototype.currentPosition = function () {
        var _this = this;
        if (this.isProcessing) {
            return;
        }
        this.currentToast = this.anywhereService.showToast(CONSTANT.MAP.LOADING, 9999999999, true);
        this.toggleProcessing(true);
        this.mapService.init(function (pos) {
            if (pos && pos.lat && pos.lng) {
                _this.mapService.convertFromLatLngToAddress(pos.lat, pos.lng)
                    .subscribe(function (res) {
                    // console.log("convertFromLatLngToAddress", res);
                    var currentPlace = res[0];
                    var place = new HistorySearch(currentPlace.formatted_address, _this.anywhereService.currentLocation.lat(), _this.anywhereService.currentLocation.lng(), currentPlace.place_id);
                    _this.finishCurrentLocation();
                    _this.goToSearch(place);
                }, function (err) {
                    _this.handleErrCurrentLocation();
                });
            }
            else {
                _this.handleErrCurrentLocation();
            }
        });
    };
    SearchPage.prototype.handleErrCurrentLocation = function () {
        this.finishCurrentLocation();
        this.anywhereService.showToast(CONSTANT.MAP.POSITION_UNAVAILABLE);
    };
    SearchPage.prototype.finishCurrentLocation = function () {
        this.currentToast.dismissAll();
        this.toggleProcessing(false);
    };
    SearchPage.prototype.toggleProcessing = function (isProcessing) {
        this.isProcessing = isProcessing;
        this.toggleDisabledInput(isProcessing);
    };
    SearchPage.prototype.toggleDisabledInput = function (disabled) {
        if (disabled) {
            this.inputSearchEl.setAttribute("disabled", "true");
        }
        else {
            this.inputSearchEl.removeAttribute("disabled");
        }
    };
    SearchPage.prototype.ngOnDestroy = function () {
        this.toggleSubscribeHistoriesChanged(false);
        // this.toggleSubscribeInternetChanged(false);
        _super.prototype.ngOnDestroy.call(this);
    };
    return SearchPage;
}(CoreClass));
SearchPage = __decorate([
    Component({
        selector: 'search-page',
        templateUrl: 'search-page.html'
    }),
    __metadata("design:paramtypes", [CoreServices,
        NavController,
        HistoryService,
        ElementRef,
        AnywhereService,
        NoInternetService,
        MapService])
], SearchPage);
export { SearchPage };
//# sourceMappingURL=search-page.js.map