var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, } from '@angular/core';
import { NavParams, Events, } from 'ionic-angular';
import * as _ from 'lodash';
import { CONSTANT } from '../../services/constant.service';
import { AnywhereService } from '../../services/anywhere.service';
import { PartHorizontalCard } from '../../directives/part-horizontal-card/part-horizontal-card';
var SearchMapPage = (function () {
    function SearchMapPage(navParams, events, anywhereService) {
        var _this = this;
        this.navParams = navParams;
        this.events = events;
        this.anywhereService = anywhereService;
        this.listMarkers = [];
        this.mapContainerName = "container-map";
        this.houseContainerName = 'container-horizontal-card';
        this.handleSubscribeMarkerClickevent = function (data) {
            var index = _.findIndex(_this.allDataList, { id: data });
            if (index > -1) {
                _this.setHighlightIdByIndex(index);
                _this.scrollTo(index);
            }
            console.log("marker:clickedmarker:clicked", data, index, _this.highLightId);
        };
        this.handleGoToDetail = function (rentingId) {
            console.log("subscribeGoToDetailsubscribeGoToDetail", rentingId);
            _this.setHighlightIdById(rentingId);
        };
        this.handleSubscribeHousesChanged = function (data) {
            _this.changeVals(data);
        };
    }
    SearchMapPage.prototype.ionViewCanEnter = function () {
        console.log("ionicViewCanEnterionicViewCanEnter");
        this.anywhereService.toggleTabs('hide');
        this.toggleSubscribeGoToDetail(true);
    };
    SearchMapPage.prototype.ngOnInit = function () {
        this.params = this.navParams.get('params');
        this.initVals();
        this.subscribeMarkerClickEvent();
        this.subscribeHousesChanged();
    };
    SearchMapPage.prototype.ionViewCanLeave = function () {
        console.log("ionViewCanLeaveionViewCanLeave");
        this.toggleSubscribeGoToDetail(false);
    };
    // lang nghe su kien nhan vao marker
    SearchMapPage.prototype.subscribeMarkerClickEvent = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.MARKER_CLICKED, this.handleSubscribeMarkerClickevent);
    };
    SearchMapPage.prototype.unsubscribeMarkerClickEvent = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.MARKER_CLICKED, this.handleSubscribeMarkerClickevent);
    };
    // lang nghe su kien nhan vao nha
    SearchMapPage.prototype.toggleSubscribeGoToDetail = function (isSubcribe) {
        if (isSubcribe) {
            this.events.subscribe(CONSTANT.EVENTS_NAME.GO_TO_DETAIL, this.handleGoToDetail);
        }
        else {
            this.events.unsubscribe(CONSTANT.EVENTS_NAME.GO_TO_DETAIL, this.handleGoToDetail);
        }
    };
    // lang nghe su kien thay doi danh sach nha
    SearchMapPage.prototype.subscribeHousesChanged = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.HOUSES_CHANGED, this.handleSubscribeHousesChanged);
    };
    SearchMapPage.prototype.unsubscribeHousesChanged = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.HOUSES_CHANGED, this.handleSubscribeHousesChanged);
    };
    // khoi tao cac gia tri
    SearchMapPage.prototype.initVals = function (data) {
        this.center = new google.maps.LatLng(this.params.center.lat, this.params.center.lng);
        this.radius = this.params.radius;
        this.changeVals(this.params);
    };
    // thay doi cac gia tri
    SearchMapPage.prototype.changeVals = function (data) {
        this.allDataList = data.listHouses;
        this.currentPage = data.currentPage;
        this.totalPage = data.totalPage;
    };
    SearchMapPage.prototype.ngAfterViewInit = function () {
        var scrollEl = this.horizontalCard.scroll;
        scrollEl.addScrollEventListener(function (e) { });
        this.horizontalCardEl = this.horizontalCard.scroll._scrollContent.nativeElement;
        this.setHighlightIdByIndex(0);
    };
    SearchMapPage.prototype.scrollTo = function (index) {
        var scrollWidth = this.horizontalCardEl.scrollWidth;
        var totalItem = this.currentPage < this.totalPage ?
            this.allDataList.length + 1 : this.allDataList.length;
        var itemWidth = scrollWidth / totalItem;
        console.log("itemWidthitemWidth", itemWidth);
        if (!this.horizontalCardEl) {
            this.horizontalCardEl = this.horizontalCard &&
                this.horizontalCard.scroll &&
                this.horizontalCard.scroll._scrollContent &&
                this.horizontalCard.scroll._scrollContent.nativeElement;
        }
        if (this.horizontalCardEl) {
            this.horizontalCardEl.scrollLeft = index * itemWidth;
        }
        else {
            console.log("k co nghe");
        }
    };
    SearchMapPage.prototype.setHighlightIdByIndex = function (index) {
        this.highLightId = (this.allDataList[index] &&
            this.allDataList[index].id) || undefined;
    };
    SearchMapPage.prototype.setHighlightIdById = function (rentingId) {
        if (rentingId && _.find(this.allDataList, { id: rentingId })) {
            this.highLightId = rentingId;
        }
    };
    SearchMapPage.prototype.getMap = function (map) {
        this.currentMap = map;
        this.setHouseInsideMap();
    };
    SearchMapPage.prototype.setHouseInsideMap = function () {
        if (!this.mapCircle) {
            this.mapCircle = new google.maps.Circle({
                map: this.currentMap,
                center: this.center,
                radius: this.radius
            });
            this.mapCircle.setVisible(false);
            console.log("this.mapCircle", this.mapCircle);
        }
    };
    SearchMapPage.prototype.ngOnDestroy = function () {
        this.unsubscribeMarkerClickEvent();
        this.unsubscribeHousesChanged();
    };
    return SearchMapPage;
}());
__decorate([
    ViewChild(PartHorizontalCard),
    __metadata("design:type", PartHorizontalCard)
], SearchMapPage.prototype, "horizontalCard", void 0);
SearchMapPage = __decorate([
    Component({
        selector: 'search-map',
        templateUrl: 'search-map.html'
    }),
    __metadata("design:paramtypes", [NavParams,
        Events,
        AnywhereService])
], SearchMapPage);
export { SearchMapPage };
//# sourceMappingURL=search-map.js.map