import {
  Component,
  ViewChild,
} from '@angular/core';

import {
  NavParams,
  Events,
} from 'ionic-angular';

import * as _ from 'lodash';

import { CONSTANT } from '../../providers/constant.service';
import { AnywhereService } from '../../providers/anywhere.service';
import { PartHorizontalCard } from '../../components/part-horizontal-card/part-horizontal-card';

@Component({
  selector: 'search-map',
  templateUrl: 'search-map.html'
})

export class SearchMapPage {
  @ViewChild(PartHorizontalCard) horizontalCard: PartHorizontalCard;

  center;
  radius;
  currentMap;
  params;
  allDataList;
  listMarkers = [];
  mapCircle;
  currentPage;
  totalPage;

  highLightId: number;
  horizontalCardEl;

  mapContainerName = "container-map";
  houseContainerName = 'container-horizontal-card';

  constructor(
    public navParams: NavParams,
    public events: Events,
    public anywhereService: AnywhereService,
  ) {}

  ionViewCanEnter() {
    console.log("ionicViewCanEnterionicViewCanEnter")
    this.anywhereService.toggleTabs('hide');
    this.toggleSubscribeGoToDetail(true);
  }

  ngOnInit() {
    this.params = this.navParams.get('params');
    this.initVals();
    this.subscribeMarkerClickEvent();
    this.subscribeHousesChanged();
  }

  ionViewCanLeave() {
    console.log("ionViewCanLeaveionViewCanLeave")
    this.toggleSubscribeGoToDetail(false);
  }

  // lang nghe su kien nhan vao marker
  subscribeMarkerClickEvent() {
    this.events.subscribe(CONSTANT.EVENTS_NAME.MARKER_CLICKED, this.handleSubscribeMarkerClickevent);
  }

  unsubscribeMarkerClickEvent() {
    this.events.unsubscribe(CONSTANT.EVENTS_NAME.MARKER_CLICKED, this.handleSubscribeMarkerClickevent);
  }

  private handleSubscribeMarkerClickevent = (data) => {
    let index = _.findIndex(this.allDataList, { id: data })
    if (index > -1) {
      this.setHighlightIdByIndex(index);
      this.scrollTo(index);
    }
    console.log("marker:clickedmarker:clicked", data, index, this.highLightId);
  }

  // lang nghe su kien nhan vao nha
  toggleSubscribeGoToDetail(isSubcribe: boolean) {
    if (isSubcribe) {
      this.events.subscribe(CONSTANT.EVENTS_NAME.GO_TO_DETAIL, this.handleGoToDetail)
    } else {
      this.events.unsubscribe(CONSTANT.EVENTS_NAME.GO_TO_DETAIL, this.handleGoToDetail)
    }
  }

  private handleGoToDetail = (rentingId) => {
    console.log("subscribeGoToDetailsubscribeGoToDetail", rentingId);
    this.setHighlightIdById(rentingId);
  };

  // lang nghe su kien thay doi danh sach nha
  subscribeHousesChanged() {
    this.events.subscribe(CONSTANT.EVENTS_NAME.HOUSES_CHANGED, this.handleSubscribeHousesChanged);
  }

  unsubscribeHousesChanged() {
    this.events.unsubscribe(CONSTANT.EVENTS_NAME.HOUSES_CHANGED, this.handleSubscribeHousesChanged);
  }

  private handleSubscribeHousesChanged = (data) => {
    this.changeVals(data);
  }

  // khoi tao cac gia tri
  initVals(data ? ) {
    this.center = new google.maps.LatLng(
      this.params.center.lat,
      this.params.center.lng
    );
    this.radius = this.params.radius;
    this.changeVals(this.params);
  }

  // thay doi cac gia tri
  changeVals(data) {
    this.allDataList = data.listHouses;
    this.currentPage = data.currentPage;
    this.totalPage = data.totalPage;
  }

  ngAfterViewInit() {
    let scrollEl = this.horizontalCard.scroll;
    scrollEl.addScrollEventListener((e) => {})
    this.horizontalCardEl = this.horizontalCard.scroll._scrollContent.nativeElement;
    this.setHighlightIdByIndex(0);
  }

  scrollTo(index) {
    let scrollWidth = this.horizontalCardEl.scrollWidth;
    let totalItem = this.currentPage < this.totalPage ?
      this.allDataList.length + 1 : this.allDataList.length;
    let itemWidth = scrollWidth / totalItem;
    console.log("itemWidthitemWidth", itemWidth);
    if (!this.horizontalCardEl) {
      this.horizontalCardEl = this.horizontalCard &&
        this.horizontalCard.scroll &&
        this.horizontalCard.scroll._scrollContent &&
        this.horizontalCard.scroll._scrollContent.nativeElement;
    }
    if (this.horizontalCardEl) {
      this.horizontalCardEl.scrollLeft = index * itemWidth;
    } else {
      console.log("k co nghe")
    }
  }

  setHighlightIdByIndex(index) {
    this.highLightId = (this.allDataList[index] &&
      this.allDataList[index].id) || undefined;
  }

  setHighlightIdById(rentingId) {
    if (rentingId && _.find(this.allDataList, { id: rentingId })) {
      this.highLightId = rentingId;
    }
  }

  getMap(map) {
    this.currentMap = map;
    this.setHouseInsideMap();
  }

  setHouseInsideMap() {
    if (!this.mapCircle) {
      this.mapCircle = new google.maps.Circle({
        map: this.currentMap,
        center: this.center,
        radius: this.radius
      });

      this.mapCircle.setVisible(false);
      console.log("this.mapCircle", this.mapCircle);
    }
  }

  ngOnDestroy() {
    this.unsubscribeMarkerClickEvent();
    this.unsubscribeHousesChanged();
  }
}
