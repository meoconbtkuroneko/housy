import {
  Component,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { NavController } from 'ionic-angular';
import { HistorySearch } from '../../templates/history-search';
import { MapService } from '../../providers/map.service';

import {
  CoreSimpleClass,
  CoreServices
} from '../../templates/core-class';
import * as _ from 'lodash';

@Component({
  selector: "searchbar-address",
  templateUrl: "./searchbar-address.html"
})
export class SearchbarAddress extends CoreSimpleClass {
  constructor(
    public coreServices: CoreServices,
    private elementRef: ElementRef,
    public navController: NavController,
    public mapService: MapService,
  ) {
    super(coreServices);
    this.checkShowNoInternet();
  }
  @Input() inputAddress;
  @Input() isDisable;
  @Output() addressChanged = new EventEmitter();

  showNoInternet: boolean;
  inputSearchEl;
  suggestionsArr;
  suggestionsErr;
  address;

  ngOnChanges(changes) {
    console.log("ngOnChanges", changes);
    this.address = this.inputAddress;
    if (changes.isDisable) {
      this.toggleDisabledInput(this.isDisable);
    }
  }

  ngAfterViewInit() {
    this.inputSearchEl = this.elementRef.nativeElement.querySelector('.searchbar-input');
  }

  private toggleDisabledInput(disabled: boolean) {
    if (!this.inputSearchEl) {
      this.inputSearchEl = this.elementRef.nativeElement.querySelector('.searchbar-input');
    }

    if (!this.inputSearchEl) {
      return;
    }

    if (disabled) {
      this.inputSearchEl.setAttribute("disabled", "true");
    } else {
      this.inputSearchEl.removeAttribute("disabled");
    }
  }

  handleSubscribeInternet() {
    if (this.hasInternet === false) {
      this.checkShowNoInternet();
    }
  }

  handleSubscribeReloadInternet() {
    this.checkShowNoInternet();
  }

  checkShowNoInternet() {
    this.showNoInternet = this.hasInternet === false;
  }

  onSearch(query) {
    if (!query || !query.target) {
      return;
    }

    let value = query.target.value;
    if (!value || value === '') {
      this.emitAddressChanged(undefined);
    }

    this.getSuggestLocation(value);
  }

  getSuggestLocation(words) {
    if (words && words != '') {
      this.mapService.suggestAddress(words).subscribe(result => {
        console.log(">>>> suggestAddress result:", result)
        this.handleSuggestSuccess(result);
      }, (err) => {
        this.handleSuggestErr();
      })
    } else {
      this.handleSuggestSuccess([]);
    }
  }

  handleSuggestSuccess(res) {
    if (_.isArray(res)) {
      this.suggestionsArr = res;
      this.suggestionsErr = undefined;
    } else {
      this.handleSuggestErr();
    }
  }

  handleSuggestErr() {
    console.log("loooooooooooooooooooooiiiiiiiiiii");
    this.suggestionsArr = [];
    this.suggestionsErr = 'Không tìm thấy kết quả';
  }

  addressObj: HistorySearch;

  selectSuggestion(suggestion) {
    console.log("selectSuggestionselectSuggestion", suggestion);
    this.address = suggestion.description;
    this.mapService.getDetailsByPlaceId(suggestion.place_id)
      .subscribe((res) => {
        this.addressObj = new HistorySearch(
          this.address,
          res.geometry.location.lat(),
          res.geometry.location.lng(),
          suggestion.place_id
        );
        this.emitAddressChanged(this.addressObj);
      }, (err) => {});
    this.handleSuggestSuccess([]);
  }

  emitAddressChanged(data) {
    this.addressChanged.emit(data);
  }
}
