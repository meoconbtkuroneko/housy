var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild, } from '@angular/core';
import { NavParams, Events, Content, NavController, } from 'ionic-angular';
import { AnywhereService } from '../../services/anywhere.service';
import { NearbySearch } from '../../directives/nearby-search/nearby-search';
import { ShowDirection } from '../../directives/show-direction/show-direction';
import { ApartmentDetail } from '../apartment-detail/apartment-detail';
import { NeighborhoodDetail } from '../neighborhood-detail/neighborhood-detail';
import { CONSTANT } from '../../services/constant.service';
var LocationDetailPage = (function () {
    function LocationDetailPage(elementRef, anywhereService, navParams, events, navController) {
        var _this = this;
        this.elementRef = elementRef;
        this.anywhereService = anywhereService;
        this.navParams = navParams;
        this.events = events;
        this.navController = navController;
        this.currentIcon = CONSTANT.IMAGE.PREFIX_IMAGE_PATH + CONSTANT.IMAGE.CURRENT_POSITION;
        this.currentLocation = this.anywhereService.currentLocation;
        this.mapContainerId = 'container-map';
        this.handleSubscribeDirection = function (data) {
            _this.fullLevel = data;
            _this.toggleNavBar();
            setTimeout(function () {
                _this.adjustMapHeight();
            }, 10);
        };
        this.handleSubscribeNearby = function (data) {
            _this.fullLevel = data;
            _this.toggleNavBar();
            setTimeout(function () {
                _this.adjustMapHeight();
            }, 10);
        };
        this.anywhereService.subscribeCurrentLocation(function () {
            _this.currentLocation = _this.anywhereService.currentLocation;
        });
    }
    LocationDetailPage.prototype.ngOnInit = function () {
        this.params = this.navParams.get('params');
        this.showData = this.params.data;
        this.center = new google.maps.LatLng(this.showData.latitude, this.showData.longitude);
        this.showDirection = this.params.showDirection;
        this.type = this.params.type;
        console.log("this.params", this.params);
    };
    LocationDetailPage.prototype.ionViewCanEnter = function () {
        this.anywhereService.toggleTabs('hide');
    };
    LocationDetailPage.prototype.ngAfterViewInit = function () {
        this.elMapContainer = this.elementRef.nativeElement.querySelector('#' + this.mapContainerId);
        this.subscribeDirection();
        this.subscribeNearby();
    };
    LocationDetailPage.prototype.subscribeDirection = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.SHOW_DIRECTION_CLICKED, this.handleSubscribeDirection);
    };
    LocationDetailPage.prototype.unsubscribeDirection = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.SHOW_DIRECTION_CLICKED, this.handleSubscribeDirection);
    };
    LocationDetailPage.prototype.subscribeNearby = function () {
        this.events.subscribe(CONSTANT.EVENTS_NAME.NEARBY_SEARCH_CLICKED, this.handleSubscribeNearby);
    };
    LocationDetailPage.prototype.unsubscribeNearby = function () {
        this.events.unsubscribe(CONSTANT.EVENTS_NAME.NEARBY_SEARCH_CLICKED, this.handleSubscribeNearby);
    };
    LocationDetailPage.prototype.toggleNavBar = function () {
        switch (this.fullLevel) {
            case 0:
            case 1:
                {
                    this.hideNavBar = undefined;
                    break;
                }
            case 2:
                {
                    this.hideNavBar = true;
                }
        }
        this.content.resize();
    };
    LocationDetailPage.prototype.adjustMapHeight = function () {
        var amt;
        this.elMapContainer.classList.remove("half-full");
        switch (this.fullLevel) {
            case 0:
                {
                    amt = '100%';
                    break;
                }
            case 1:
                {
                    amt = '50%';
                    this.elMapContainer.classList.add("half-full");
                    break;
                }
            case 2:
                {
                    amt = 0;
                }
        }
        this.elMapContainer.style['height'] = amt;
    };
    LocationDetailPage.prototype.getMap = function (map) {
        this.currentMap = map;
    };
    LocationDetailPage.prototype.doShowDirection = function (e) {
        this.showDirection = !this.showDirection;
        this._doShowDirection();
    };
    LocationDetailPage.prototype._doShowDirection = function () {
        var _this = this;
        this.fullLevel = 0;
        this.nearbySearchView.fullLevel = this.fullLevel;
        this.showDirectionView.fullLevel = this.fullLevel;
        this.toggleNavBar();
        setTimeout(function () {
            _this.adjustMapHeight();
        }, 10);
    };
    LocationDetailPage.prototype.openDetail = function (type) {
        if (type === 'apartment') {
            this.navController.push(ApartmentDetail, {
                params: {
                    id: this.showData.apartment.id
                },
            });
        }
        else if (type === 'neighborhood') {
            this.navController.push(NeighborhoodDetail, {
                params: {
                    id: this.showData.neighborhood.id
                },
            });
        }
    };
    LocationDetailPage.prototype.ngOnDestroy = function () {
        this.unsubscribeDirection();
        this.unsubscribeNearby();
    };
    return LocationDetailPage;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], LocationDetailPage.prototype, "content", void 0);
__decorate([
    ViewChild(NearbySearch),
    __metadata("design:type", NearbySearch)
], LocationDetailPage.prototype, "nearbySearchView", void 0);
__decorate([
    ViewChild(ShowDirection),
    __metadata("design:type", ShowDirection)
], LocationDetailPage.prototype, "showDirectionView", void 0);
LocationDetailPage = __decorate([
    Component({
        selector: 'location-detail-page',
        templateUrl: 'location-detail-page.html'
    }),
    __metadata("design:paramtypes", [ElementRef,
        AnywhereService,
        NavParams,
        Events,
        NavController])
], LocationDetailPage);
export { LocationDetailPage };
//# sourceMappingURL=location-detail-page.js.map